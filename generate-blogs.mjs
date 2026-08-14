/**
 * Auto-generate blog posts from YouTube videos using the built-in LLM.
 * Reads the YouTube RSS feed, skips videos already in DB, generates posts via AI.
 */
import mysql from "mysql2/promise";

const CHANNEL_ID = "UCEkK2eeKkEITYBAEYSkFHbQ";
const LLM_URL = process.env.BUILT_IN_FORGE_API_URL + "/v1/chat/completions";
const LLM_KEY = process.env.BUILT_IN_FORGE_API_KEY;

// ── Helpers ──────────────────────────────────────────────────────────────────

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

async function fetchRSS() {
  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`);
  const xml = await res.text();
  const videos = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;
  while ((match = entryRegex.exec(xml)) !== null) {
    const block = match[1];
    const videoIdMatch = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const titleMatch = block.match(/<media:title>([^<]*)<\/media:title>/) || block.match(/<title>([^<]*)<\/title>/);
    const linkMatch = block.match(/<link rel="alternate" href="([^"]+)"/);
    const descMatch = block.match(/<media:description>([\s\S]*?)<\/media:description>/);
    const pubMatch = block.match(/<published>([^<]+)<\/published>/);
    if (videoIdMatch && titleMatch) {
      const videoId = videoIdMatch[1].trim();
      const title = titleMatch[1].replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim();
      const url = linkMatch ? linkMatch[1] : `https://www.youtube.com/watch?v=${videoId}`;
      const description = descMatch ? descMatch[1].replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").trim() : "";
      const publishedAt = pubMatch ? pubMatch[1] : new Date().toISOString();
      videos.push({ videoId, title, url, description, publishedAt });
    }
  }
  return videos;
}

async function generatePost(video) {
  const prompt = `You are a financial education content writer for Gift of Trading, a stock market education brand run by Sounia Gill.

Generate a detailed, engaging blog post based on this YouTube video:
Title: "${video.title}"
URL: ${video.url}
Description: ${video.description || "(no description)"}

The blog post should:
- Be educational and practical for beginner to intermediate stock market learners
- Be written in Sounia's warm, encouraging, empowering voice (she teaches women and beginners)
- Include actionable tips and clear explanations
- Be 400-600 words of content
- Have a compelling title (can be different/expanded from the video title)
- Include a 1-2 sentence excerpt/summary

Return ONLY valid JSON with these exact keys:
{
  "title": "Blog post title",
  "slug": "url-friendly-slug",
  "excerpt": "1-2 sentence summary",
  "content": "Full markdown content (400-600 words)",
  "category": one of: "market-news" | "trading-tips" | "options" | "investing" | "portfolio" | "education",
  "readTime": estimated read time in minutes (number),
  "metaDescription": "SEO meta description under 160 chars"
}`;

  const response = await fetch(LLM_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${LLM_KEY}`,
    },
    body: JSON.stringify({
      model: "auto",
      messages: [
        { role: "system", content: "You are a financial education content writer. Always respond with valid JSON only." },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    throw new Error(`LLM API error: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("No content in LLM response");
  return JSON.parse(content);
}

// ── Main ─────────────────────────────────────────────────────────────────────

const db = await mysql.createConnection(process.env.DATABASE_URL);

// Get existing videoIds
const [existing] = await db.query("SELECT videoId FROM blog_posts WHERE videoId IS NOT NULL");
const existingIds = new Set(existing.map(r => r.videoId));
console.log(`Existing posts with videoId: ${existingIds.size}`);

// Fetch RSS
const videos = await fetchRSS();
console.log(`Videos in RSS: ${videos.length}`);

// Filter to only new videos
const newVideos = videos.filter(v => !existingIds.has(v.videoId));
console.log(`New videos to generate: ${newVideos.length}`);

let created = 0;
let failed = 0;

for (const video of newVideos) {
  console.log(`\nGenerating post for: ${video.title.substring(0, 60)}...`);
  try {
    const post = await generatePost(video);

    // Ensure slug is unique
    let slug = post.slug || slugify(post.title);
    const [slugCheck] = await db.query("SELECT id FROM blog_posts WHERE slug = ?", [slug]);
    if (slugCheck.length > 0) {
      slug = slug + "-" + video.videoId.substring(0, 6);
    }

    // Determine youtubeUrl (use embed format for shorts, watch for regular)
    const youtubeUrl = video.url.includes("/shorts/")
      ? `https://www.youtube.com/shorts/${video.videoId}`
      : `https://www.youtube.com/watch?v=${video.videoId}`;

    await db.query(
      `INSERT INTO blog_posts 
        (title, slug, excerpt, content, category, published, featured, authorName, readTime, metaDescription, youtubeUrl, videoId, publishedAt, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, 1, 0, 'Sounia Gill', ?, ?, ?, ?, NOW(), NOW(), NOW())`,
      [
        post.title,
        slug,
        post.excerpt || "",
        post.content || "",
        post.category || "education",
        post.readTime || 3,
        post.metaDescription || "",
        youtubeUrl,
        video.videoId,
      ]
    );

    console.log(`  ✓ Created: "${post.title.substring(0, 60)}"`);
    created++;

    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 2000));
  } catch (err) {
    console.error(`  ✗ Failed: ${err.message}`);
    failed++;
  }
}

await db.end();
console.log(`\n✅ Done! Created: ${created}, Failed: ${failed}`);
