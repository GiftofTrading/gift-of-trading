import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router, adminProcedure } from "./_core/trpc";
import { storagePut } from "./storage";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { getDb } from "./db";
import { z } from "zod/v4";
import { invokeLLM } from "./_core/llm";
import { Resend } from "resend";
import { eq, desc, and } from "drizzle-orm";
import { blogPosts, webinars, leads, testimonials, users, newsletterSubscribers } from "../drizzle/schema";
import { ENV } from "./_core/env";
import { TRPCError } from "@trpc/server";
import { verifyAdminCredentials, isValidAdminEmail } from "./adminCredentials";

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const OWNER_EMAIL = process.env.OWNER_EMAIL ?? "giftoftrading@gmail.com";

// ── Owner-Only Procedure ──────────────────────────────────────────────────────
const ownerOnlyProcedure = adminProcedure.use(({ ctx, next }) => {
  if (ctx.user.openId !== ENV.ownerOpenId) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Only the owner can perform this action" });
  }
  return next({ ctx });
});

async function sendLeadEmail(lead: {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  inquiryType: string;
  message: string;
}) {
  if (!RESEND_API_KEY) {
    console.warn("[Resend] RESEND_API_KEY not set — skipping email notification");
    return;
  }
  const resend = new Resend(RESEND_API_KEY);
  const inquiryLabels: Record<string, string> = {
    "stock-market-made-easy": "Stock Market Made Easy",
    "webinar": "Webinar",
    "general": "General Inquiry",
  };
  const inquiryLabel = inquiryLabels[lead.inquiryType] ?? lead.inquiryType;
  await resend.emails.send({
    from: "Gift of Trading <noreply@giftoftrading.com>",
    to: [OWNER_EMAIL],
    replyTo: lead.email,
    subject: `New Lead: ${lead.firstName} ${lead.lastName ?? ""} — ${inquiryLabel}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #0a1628; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <img src="https://static.wixstatic.com/media/19e04d_5b3916fa625b4272b213150378dc7cd2~mv2.png/v1/fill/w_198,h_62,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GIFT-LOGO.png" alt="Gift of Trading" style="height: 48px;" />
        </div>
        <div style="background: #fff; border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #0a1628; margin-top: 0;">New Lead Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600; color: #111827;">${lead.firstName} ${lead.lastName ?? ""}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0;"><a href="mailto:${lead.email}" style="color: #c9a84c;">${lead.email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Phone</td><td style="padding: 8px 0; color: #111827;">${lead.phone ?? "Not provided"}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Inquiry</td><td style="padding: 8px 0;"><span style="background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 4px; font-size: 13px;">${inquiryLabel}</span></td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 6px; border-left: 3px solid #c9a84c;">
            <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6;">${lead.message.replace(/\n/g, "<br/>")}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">Submitted via giftoftrading.com contact form. Reply directly to this email to respond to ${lead.firstName}.</p>
        </div>
      </div>
    `,
  });
}

// ── Blog Router ──────────────────────────────────────────────────────────────
const blogRouter = router({
  list: publicProcedure
    .input(z.object({ published: z.boolean().optional() }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      
      if (input?.published !== undefined) {
        const rows = await db.select().from(blogPosts).where(eq(blogPosts.published, input.published)).orderBy(desc(blogPosts.createdAt));
        return rows;
      }
      const rows = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
      return rows;
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;
      
      const rows = await db
        .select()
        .from(blogPosts)
        .where(and(eq(blogPosts.slug, input.slug), eq(blogPosts.published, true)))
        .limit(1);
      
      return rows.length > 0 ? rows[0] : null;
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        excerpt: z.string().optional(),
        content: z.string().optional().default(""),
        category: z.enum(["market-news", "trading-tips", "options", "investing", "portfolio", "education"]).optional(),
        published: z.boolean().optional(),
        featured: z.boolean().optional(),
        readTime: z.number().optional(),
        metaDescription: z.string().optional(),
        youtubeUrl: z.string().optional(),
        videoId: z.string().optional(),
        pdfUrl: z.string().optional(),
        pdfKey: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.log("[Blog] Create endpoint called");
      console.log("[Blog] User:", ctx.user);
      const db = await getDb();
      if (!db) {
        console.error("[Blog] Database not available");
        throw new Error("Database not available");
      }
      if (ctx.user?.role !== "admin") {
        console.error("[Blog] User is not admin:", ctx.user?.role);
        throw new Error("Admin only");
      }

      console.log("[Blog] Creating post:", input.title);
      const result = await db.insert(blogPosts).values({
        title: input.title,
        slug: input.slug,
        excerpt: input.excerpt,
        content: input.content,
        category: input.category ?? "education",
        published: input.published ?? false,
        featured: input.featured ?? false,
        readTime: input.readTime ?? 5,
        metaDescription: input.metaDescription,
        youtubeUrl: input.youtubeUrl,
        videoId: input.videoId,
        pdfUrl: input.pdfUrl ?? null,
        pdfKey: input.pdfKey ?? null,
      });

      const insertId = (result as unknown as { insertId: number }).insertId;
      console.log("[Blog] Post created successfully:", insertId);
      return { success: true, id: insertId };
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1),
        slug: z.string().min(1),
        excerpt: z.string().optional(),
        content: z.string().optional().default(""),
        category: z.enum(["market-news", "trading-tips", "options", "investing", "portfolio", "education"]).optional(),
        published: z.boolean().optional(),
        featured: z.boolean().optional(),
        readTime: z.number().optional(),
        metaDescription: z.string().optional(),
        youtubeUrl: z.string().optional(),
        videoId: z.string().optional(),
        pdfUrl: z.string().optional(),
        pdfKey: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      if (ctx.user?.role !== "admin") throw new Error("Admin only");

      const { id, ...fields } = input;
      await db
        .update(blogPosts)
        .set({
          title: fields.title,
          slug: fields.slug,
          excerpt: fields.excerpt,
          content: fields.content,
          category: fields.category ?? "education",
          published: fields.published ?? false,
          featured: fields.featured ?? false,
          readTime: fields.readTime ?? 5,
          metaDescription: fields.metaDescription,
          youtubeUrl: fields.youtubeUrl,
          videoId: fields.videoId,
          pdfUrl: fields.pdfUrl ?? null,
          pdfKey: fields.pdfKey ?? null,
        })
        .where(eq(blogPosts.id, id));

      return { success: true };
    }),

  uploadPdf: protectedProcedure
    .input(
      z.object({
        fileName: z.string().min(1),
        fileBase64: z.string().min(1), // base64-encoded PDF bytes
        postId: z.number().optional(), // if provided, immediately attach to this post
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Admin only");

      const buffer = Buffer.from(input.fileBase64, "base64");
      const safeName = input.fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
      const key = `blog-pdfs/${Date.now()}-${safeName}`;
      const { url } = await storagePut(key, buffer, "application/pdf");

      // If a postId was supplied, attach the PDF to that post immediately
      if (input.postId) {
        const db = await getDb();
        if (db) {
          await db.update(blogPosts).set({ pdfUrl: url, pdfKey: key }).where(eq(blogPosts.id, input.postId));
        }
      }

      return { url, key };
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      if (ctx.user?.role !== "admin") throw new Error("Admin only");

      await db.delete(blogPosts).where(eq(blogPosts.id, input.id));
      return { success: true };
    }),
});

// ── Webinars Router ──────────────────────────────────────────────────────────
const webinarsRouter = router({
  list: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    
    const rows = await db
      .select()
      .from(webinars)
      .orderBy(desc(webinars.scheduledAt));
    
    return rows;
  }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        description: z.string().min(1),
        scheduledAt: z.date(),
        durationMinutes: z.number().optional(),
        isFree: z.boolean().optional(),
        maxAttendees: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      if (ctx.user?.role !== "admin") throw new Error("Admin only");

      const result = await db.insert(webinars).values({
        title: input.title,
        slug: input.slug,
        description: input.description,
        scheduledAt: input.scheduledAt,
        durationMinutes: input.durationMinutes ?? 90,
        isFree: input.isFree ?? true,
        maxAttendees: input.maxAttendees ?? 100,
      });

      return { success: true, id: (result as unknown as { insertId: number }).insertId };
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        slug: z.string().min(1).optional(),
        description: z.string().optional(),
        scheduledAt: z.date().optional(),
        durationMinutes: z.number().optional(),
        isFree: z.boolean().optional(),
        maxAttendees: z.number().optional(),
        registrationUrl: z.string().optional(),
        videoUrl: z.string().optional(),
        hostName: z.string().optional(),
        status: z.enum(["upcoming", "live", "completed", "cancelled"]).optional(),
        topics: z.string().optional(),
        price: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      if (ctx.user?.role !== "admin") throw new Error("Admin only");

      const { id, ...fields } = input;
      await db.update(webinars).set(fields).where(eq(webinars.id, id));
      return { success: true };
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      if (ctx.user?.role !== "admin") throw new Error("Admin only");

      await db.delete(webinars).where(eq(webinars.id, input.id));
      return { success: true };
    }),
});

// ── Leads Router ──────────────────────────────────────────────────────────────
const leadsRouter = router({
  submit: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(1),
        lastName: z.string().optional(),
        email: z.string().email(),
        phone: z.string().optional(),
        inquiryType: z.enum(["stock-market-made-easy", "webinar", "general"]).optional(),
        message: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const result = await db.insert(leads).values({
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        phone: input.phone,
        inquiryType: input.inquiryType ?? "general",
        message: input.message,
      });

      // Send email notification
      await sendLeadEmail({
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        phone: input.phone,
        inquiryType: input.inquiryType ?? "general",
        message: input.message,
      });

      return { success: true, id: (result as unknown as { insertId: number }).insertId };
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    if (ctx.user?.role !== "admin") throw new Error("Admin only");

    const rows = await db
      .select()
      .from(leads)
      .orderBy(desc(leads.createdAt));
    
    return rows;
  }),
});

// ── Testimonials Router ──────────────────────────────────────────────────────
const testimonialsRouter = router({
  list: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    
    const rows = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.published, true))
      .orderBy(desc(testimonials.createdAt));
    
    return rows;
  }),
});

// ── AI Router ────────────────────────────────────────────────────────────────
const aiRouter = router({
  youtubeToPost: protectedProcedure
    .input(z.object({ youtubeUrl: z.string().url() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Admin only");

      // Extract video ID from multiple YouTube URL formats:
      // https://www.youtube.com/watch?v=VIDEO_ID
      // https://youtu.be/VIDEO_ID
      // https://www.youtube.com/embed/VIDEO_ID
      // https://www.youtube.com/shorts/VIDEO_ID
      let videoId: string | null = null;
      try {
        const parsed = new URL(input.youtubeUrl);
        if (parsed.hostname === "youtu.be") {
          videoId = parsed.pathname.slice(1).split("?")[0] || null;
        } else if (parsed.hostname.includes("youtube.com")) {
          videoId = parsed.searchParams.get("v") ||
            (parsed.pathname.startsWith("/embed/") ? parsed.pathname.split("/embed/")[1]?.split("?")[0] : null) ||
            (parsed.pathname.startsWith("/shorts/") ? parsed.pathname.split("/shorts/")[1]?.split("?")[0] : null) ||
            null;
        }
      } catch {
        throw new Error("Invalid YouTube URL");
      }
      if (!videoId) throw new Error("Invalid YouTube URL — please use a standard YouTube link (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...)");

      const prompt = `
        You are a financial education content expert. Analyze this YouTube video and create a blog post.
        
        Video URL: ${input.youtubeUrl}
        Video ID: ${videoId}
        
        Generate a blog post with:
        1. An engaging title (max 60 chars)
        2. A URL-friendly slug (lowercase, hyphens)
        3. A brief excerpt (max 160 chars)
        4. Full blog post content (markdown format, 800-1200 words)
        5. Estimated read time in minutes
        6. Meta description (max 160 chars)
        
        Return as JSON with keys: title, slug, excerpt, content, readTime, metaDescription, youtubeUrl, videoId
      `;

      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: "You are a financial education content expert who creates blog posts from YouTube videos.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "blog_post",
            strict: true,
            schema: {
              type: "object",
              properties: {
                title: { type: "string" },
                slug: { type: "string" },
                excerpt: { type: "string" },
                content: { type: "string" },
                readTime: { type: "number" },
                metaDescription: { type: "string" },
                youtubeUrl: { type: "string" },
                videoId: { type: "string" },
              },
              required: ["title", "slug", "excerpt", "content", "readTime", "metaDescription", "youtubeUrl", "videoId"],
            },
          },
        },
      });

      const rawContent = response.choices[0]?.message.content;
      if (!rawContent) throw new Error("Failed to generate blog post");
      const content = typeof rawContent === 'string' ? rawContent : JSON.stringify(rawContent);

      const parsed = JSON.parse(content);
      return {
        title: parsed.title,
        slug: parsed.slug,
        excerpt: parsed.excerpt,
        content: parsed.content,
        readTime: parsed.readTime,
        metaDescription: parsed.metaDescription,
        youtubeUrl: input.youtubeUrl,
        videoId: videoId,
      };
    }),
});

// ── YouTube Router ───────────────────────────────────────────────────────────
const YOUTUBE_CHANNEL_ID = "UCEkK2eeKkEITYBAEYSkFHbQ"; // Gift of Trading channel

const youtubeRouter = router({
  latestVideos: publicProcedure.query(async () => {
    try {
      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
      const res = await fetch(rssUrl, { signal: AbortSignal.timeout(8000) });
      if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`);
      const xml = await res.text();

      // Parse video entries from the RSS XML
      const entries: Array<{ id: string; title: string; url: string; thumbnail: string; publishedAt: string }> = [];
      const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
      let match;
      while ((match = entryRegex.exec(xml)) !== null && entries.length < 6) {
        const block = match[1];
        const videoIdMatch = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
        const titleMatch = block.match(/<media:title>([^<]*)<\/media:title>/) || block.match(/<title>([^<]*)<\/title>/);
        const thumbMatch = block.match(/<media:thumbnail url="([^"]+)"/);
        const pubMatch = block.match(/<published>([^<]+)<\/published>/);
        const linkMatch = block.match(/<link rel="alternate" href="([^"]+)"/);

        if (videoIdMatch && titleMatch) {
          const videoId = videoIdMatch[1].trim();
          const title = titleMatch[1].replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
          const thumbnail = thumbMatch ? thumbMatch[1] : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
          const publishedAt = pubMatch ? pubMatch[1] : new Date().toISOString();
          const url = linkMatch ? linkMatch[1] : `https://www.youtube.com/watch?v=${videoId}`;
          entries.push({ id: videoId, title, url, thumbnail, publishedAt });
        }
      }
      return entries;
    } catch (err) {
      console.warn("[YouTube] Failed to fetch RSS feed:", err);
      return [];
    }
  }),
});

// ── Newsletter Router ────────────────────────────────────────────────────────
const newsletterRouter = router({
  subscribe: publicProcedure
    .input(z.object({ email: z.string().email(), name: z.string().optional() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      
      const { newsletterSubscribers } = await import("../drizzle/schema");
      
      try {
        // Check if email already exists
        const existing = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, input.email)).limit(1);
        if (existing.length) {
          return { success: true, message: "Already subscribed" };
        }
        
        // Add to database
        await db.insert(newsletterSubscribers).values({
          email: input.email,
          name: input.name || null,
          subscribed: true,
        });
      } catch (err) {
        console.warn("[Newsletter] Failed to save subscriber:", err);
      }
      
      // Notify owner of new newsletter subscriber
      if (RESEND_API_KEY) {
        const resend = new Resend(RESEND_API_KEY);
        try {
          await resend.emails.send({
            from: "Gift of Trading <noreply@giftoftrading.com>",
            to: [OWNER_EMAIL],
            subject: `New Newsletter Subscriber: ${input.email}`,
            html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: #0a1628; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
                <img src="https://static.wixstatic.com/media/19e04d_5b3916fa625b4272b213150378dc7cd2~mv2.png/v1/fill/w_198,h_62,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GIFT-LOGO.png" alt="Gift of Trading" style="height: 48px;" />
              </div>
              <div style="background: #fff; border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
                <h2 style="color: #0a1628; margin-top: 0;">New Newsletter Subscriber</h2>
                <p style="color: #374151;"><strong>${input.name || input.email}</strong> (${input.email}) has subscribed to your newsletter.</p>
                <p style="font-size: 12px; color: #9ca3af;">Subscribed via giftoftrading.com</p>
              </div>
            </div>`,
          });
        } catch (err) {
          console.warn("[Newsletter] Failed to send owner notification:", err);
        }
      } else {
        console.warn("[Newsletter] RESEND_API_KEY not set — skipping email notification");
      }
      return { success: true };
    }),
  
  list: ownerOnlyProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    
    const { newsletterSubscribers } = await import("../drizzle/schema");
    return db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.createdAt));
  }),
});

// ── Users Router (Owner-Only Admin Management) ───────────────────────────────
const usersRouter = router({
  list: ownerOnlyProcedure
    .input(z.object({ search: z.string().optional() }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      
      const rows = await db
        .select()
        .from(users)
        .orderBy(desc(users.createdAt));
      
      if (input?.search) {
        const searchLower = input.search.toLowerCase();
        return rows.filter(u => 
          u.email?.toLowerCase().includes(searchLower) || 
          u.name?.toLowerCase().includes(searchLower)
        );
      }
      return rows;
    }),

  promoteToAdmin: ownerOnlyProcedure
    .input(z.object({ userId: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      
      const user = await db.select().from(users).where(eq(users.id, input.userId)).limit(1);
      if (!user.length) throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      
      await db.update(users).set({ role: "admin" }).where(eq(users.id, input.userId));
      return { success: true };
    }),

  demoteFromAdmin: ownerOnlyProcedure
    .input(z.object({ userId: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      
      const user = await db.select().from(users).where(eq(users.id, input.userId)).limit(1);
      if (!user.length) throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      if (user[0].openId === ENV.ownerOpenId) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Cannot demote the owner" });
      }
      
      await db.update(users).set({ role: "user" }).where(eq(users.id, input.userId));
      return { success: true };
    }),

  createAdmin: ownerOnlyProcedure
    .input(z.object({ email: z.string().email(), name: z.string().optional() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      
      const existingUser = await db.select().from(users).where(eq(users.email, input.email)).limit(1);
      if (existingUser.length) {
        throw new TRPCError({ code: "CONFLICT", message: "User with this email already exists" });
      }
      
      const tempOpenId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      await db.insert(users).values({
        openId: tempOpenId,
        email: input.email,
        name: input.name || null,
        role: "admin",
        loginMethod: null,
        lastSignedIn: new Date(),
      });
      
      return { success: true, email: input.email };
    }),
});

// ── Masterclass Router ──────────────────────────────────────────────────────
const masterclassRouter = router({
  submit: publicProcedure
    .input(z.object({
      firstName: z.string().min(1),
      lastName: z.string().optional(),
      email: z.string().email(),
      phone: z.string().min(7),
      experienceLevel: z.enum(["beginner", "intermediate", "advanced"]),
      whyInterested: z.string().min(1),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      
      const { masterclassApplications } = await import("../drizzle/schema");
      
      try {
        await db.insert(masterclassApplications).values({
          firstName: input.firstName,
          lastName: input.lastName || null,
          email: input.email,
          phone: input.phone,
          experienceLevel: input.experienceLevel,
          whyInterested: input.whyInterested || null,
          status: "new",
        });
      } catch (err) {
        console.warn("[Masterclass] Failed to save application:", err);
      }
      
      if (RESEND_API_KEY) {
        const resend = new Resend(RESEND_API_KEY);
        try {
          await resend.emails.send({
            from: "Gift of Trading <noreply@giftoftrading.com>",
            to: [OWNER_EMAIL],
            replyTo: input.email,
            subject: `New Masterclass Application: ${input.firstName} ${input.lastName || ""} — ${input.experienceLevel}`,
            html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"><div style="background: #0a1628; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;"><img src="https://static.wixstatic.com/media/19e04d_5b3916fa625b4272b213150378dc7cd2~mv2.png/v1/fill/w_198,h_62,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GIFT-LOGO.png" alt="Gift of Trading" style="height: 48px;" /></div><div style="background: #fff; border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;"><h2 style="color: #0a1628; margin-top: 0;">New Masterclass Application</h2><table style="width: 100%; border-collapse: collapse;"><tr><td style="padding: 8px 0; color: #6b7280; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600; color: #111827;">${input.firstName} ${input.lastName || ""}</td></tr><tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0;"><a href="mailto:${input.email}" style="color: #c9a84c;">${input.email}</a></td></tr><tr><td style="padding: 8px 0; color: #6b7280;">Phone</td><td style="padding: 8px 0; color: #111827;">${input.phone}</td></tr><tr><td style="padding: 8px 0; color: #6b7280;">Experience</td><td style="padding: 8px 0;"><span style="background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 4px; font-size: 13px;">${input.experienceLevel}</span></td></tr></table><p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">Submitted via giftoftrading.com masterclass application form. Reply directly to this email to respond to ${input.firstName}.</p></div></div>`,
          });
        } catch (err) {
          console.warn("[Masterclass] Failed to send owner notification:", err);
        }
      }
      return { success: true, message: "Application submitted successfully. Someone will reach out to schedule a Zoom call." };
    }),
  
  list: ownerOnlyProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    
    const { masterclassApplications } = await import("../drizzle/schema");
    return db.select().from(masterclassApplications).orderBy(desc(masterclassApplications.createdAt));
  }),
});

// ── Main Router ──────────────────────────────────────────────────────────────
export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    login: publicProcedure
      .input(z.object({ email: z.string().email(), password: z.string() }))
      .mutation(async ({ input, ctx }) => {
        // Verify admin credentials
        const isValidEmail = isValidAdminEmail(input.email);
        if (!isValidEmail) {
          throw new TRPCError({ code: "FORBIDDEN", message: "Invalid credentials" });
        }

        const isValidPassword = await verifyAdminCredentials(input.email, input.password);
        if (!isValidPassword) {
          throw new TRPCError({ code: "FORBIDDEN", message: "Invalid credentials" });
        }

        // Set session cookie
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, `admin-session:${input.email}`, { ...cookieOptions, maxAge: 24 * 60 * 60 * 1000 });

        return { success: true, email: input.email };
      }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
    sendVerificationEmail: protectedProcedure.mutation(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      
      if (!ctx.user.email) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User email not found" });
      }
      
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
      
      await db.update(users)
        .set({ verificationToken: verificationCode, verificationTokenExpiry: expiryTime })
        .where(eq(users.id, ctx.user.id));
      
      if (RESEND_API_KEY) {
        const resend = new Resend(RESEND_API_KEY);
        await resend.emails.send({
          from: "Gift of Trading <noreply@giftoftrading.com>",
          to: [ctx.user.email],
          subject: "Verify Your Email - Gift of Trading",
          html: `<p>Your email verification code is: <strong>${verificationCode}</strong></p><p>This code expires in 24 hours.</p>`,
        });
      }
      
      return { success: true, message: "Verification code sent to your email" };
    }),
    verifyEmail: protectedProcedure
      .input(z.object({ code: z.string() }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
        
        const user = await db.select().from(users).where(eq(users.id, ctx.user.id)).limit(1);
        if (!user.length) throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
        
        const userData = user[0];
        if (!userData.verificationToken || !userData.verificationTokenExpiry) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "No verification code requested" });
        }
        
        if (new Date() > userData.verificationTokenExpiry) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Verification code expired" });
        }
        
        if (userData.verificationToken !== input.code) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid verification code" });
        }
        
        await db.update(users)
          .set({ emailVerified: true, verificationToken: null, verificationTokenExpiry: null })
          .where(eq(users.id, ctx.user.id));
        
        return { success: true, message: "Email verified successfully" };
      }),
  }),
  blog: blogRouter,
  webinars: webinarsRouter,
  leads: leadsRouter,
  testimonials: testimonialsRouter,
  ai: aiRouter,
  youtube: youtubeRouter,
  newsletter: newsletterRouter,
  masterclass: masterclassRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
