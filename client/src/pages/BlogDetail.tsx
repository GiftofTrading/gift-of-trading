import { useEffect } from "react";
import { ArrowLeft, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { Link, useRoute } from "wouter";
import { Streamdown } from "streamdown";
import { updateMetaTags, addJsonLdSchema, createArticleSchema } from "@/lib/meta";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function BlogDetail() {
  const [match, params] = useRoute("/blog/:slug");
  const { data: post, isLoading, error } = trpc.blog.getBySlug.useQuery(
    { slug: params?.slug as string },
    { enabled: !!params?.slug }
  );

  useEffect(() => {
    if (post) {
      updateMetaTags({
        title: `${post.title} | Gift of Trading Blog`,
        description: post.excerpt || post.content?.substring(0, 160) || "Read this article on Gift of Trading blog.",
        keywords: `${post.category}, stock market, trading, ${post.title}`,
        ogTitle: post.title,
        ogDescription: post.excerpt || post.content?.substring(0, 160) || undefined,
        ogImage: post.coverImage || undefined,
        canonicalUrl: `https://giftoftrading.com/blog/${post.slug}`,
      });

      // Add article schema markup
      const articleSchema = createArticleSchema({
        headline: post.title,
        description: post.excerpt || post.content?.substring(0, 160) || "",
        image: post.coverImage || undefined,
        datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date().toISOString(),
        dateModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : new Date(post.publishedAt || new Date()).toISOString(),
        author: post.authorName || "Sounia Gill",
        url: `https://giftoftrading.com/blog/${post.slug}`,
      });
      addJsonLdSchema(articleSchema);
    }
  }, [post]);

  if (!match) return null;

  if (isLoading) {
    return (
      <Layout>
        <Breadcrumb items={[
          { name: "Home", url: "https://giftoftrading.com" },
          { name: "Blog", url: "https://giftoftrading.com/blog" },
          { name: "Loading...", url: "https://giftoftrading.com/blog" },
        ]} />
        <div className="min-h-screen bg-[oklch(97%_0.012_80)] py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="space-y-2 mt-8">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
  return (
    <Layout>
      <Breadcrumb items={[
        { name: "Home", url: "https://giftoftrading.com" },
        { name: "Blog", url: "https://giftoftrading.com/blog" },
        { name: post ? post.title : "Article", url: `https://giftoftrading.com/blog/${params?.slug || ''}` },
      ]} />
      <div className="min-h-screen bg-[oklch(97%_0.012_80)] py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-[oklch(13%_0.04_255)] mb-4">
              Post Not Found
            </h1>
            <p className="text-[oklch(55%_0.04_255)] mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/blog">
              <Button className="bg-[oklch(73%_0.14_72)] hover:bg-[oklch(65%_0.12_72)]">
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-[oklch(12%_0.04_255)] py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <Link href="/blog">
            <Button
              variant="ghost"
              className="mb-6 text-[oklch(73%_0.14_72)] hover:text-[oklch(73%_0.14_72)] hover:bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-1 bg-[oklch(73%_0.14_72)] text-[oklch(12%_0.04_255)] text-xs font-semibold rounded-full">
                {post.category}
              </span>
              {post.featured && (
                <span className="text-[oklch(73%_0.14_72)] text-sm font-semibold">
                  ★ Featured
                </span>
              )}
            </div>

            <h1
              className="text-4xl lg:text-5xl font-bold text-[oklch(97%_0.012_80)]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {post.title}
            </h1>

            <p className="text-[oklch(75%_0.02_80)] text-lg">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[oklch(26%_0.07_255)]">
              <div className="flex items-center gap-2 text-[oklch(75%_0.02_80)]">
                <div className="w-10 h-10 rounded-full bg-[oklch(73%_0.14_72)] flex items-center justify-center text-[oklch(12%_0.04_255)] text-xs font-bold">
                  SG
                </div>
                <div>
                  <div className="font-semibold">{post.authorName}</div>
                  <div className="text-sm text-[oklch(55%_0.04_255)]">Author</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[oklch(75%_0.02_80)] text-sm">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime} min read
                </span>
                <span>
                  {new Date(post.publishedAt || new Date()).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.coverImage && (
        <section className="bg-[oklch(97%_0.012_80)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-8">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full rounded-lg object-cover max-h-96"
            />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="bg-[oklch(97%_0.012_80)] py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          {/* PDF viewer — shown when a PDF is attached to this post */}
          {(post as any).pdfUrl ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[oklch(55%_0.04_255)]">This article is available as a PDF document.</p>
                <a
                  href={(post as any).pdfUrl.startsWith('http') ? (post as any).pdfUrl : window.location.origin + (post as any).pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[oklch(73%_0.14_72)] text-[oklch(12%_0.04_255)] text-sm font-semibold rounded-lg hover:bg-[oklch(65%_0.12_72)] transition-colors"
                >
                  ↓ Download PDF
                </a>
              </div>
              <iframe
                src={(((post as any).pdfUrl.startsWith('http') ? (post as any).pdfUrl : window.location.origin + (post as any).pdfUrl) + "#toolbar=1&navpanes=0&scrollbar=1")}
                className="w-full rounded-lg border border-[oklch(88%_0.025_80)]"
                style={{ height: "80vh", minHeight: 600 }}
                title={post.title}
              />
              {/* Also show any additional text content below the PDF if present */}
              {post.content && post.content.trim().length > 0 && (
                <article className="prose prose-lg max-w-none mt-8">
                  <Streamdown>{post.content}</Streamdown>
                </article>
              )}
            </div>
          ) : (
            <article className="prose prose-lg max-w-none">
              <Streamdown>{post.content}</Streamdown>
            </article>
          )}

          {/* Tags */}
          {post.tags && (
            <div className="mt-12 pt-8 border-t border-[oklch(88%_0.025_80)]">
              <h3 className="text-sm font-semibold text-[oklch(13%_0.04_255)] mb-4">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {(typeof post.tags === "string"
                  ? JSON.parse(post.tags)
                  : post.tags
                ).map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1 bg-[oklch(88%_0.025_80)] text-[oklch(13%_0.04_255)] text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-[oklch(12%_0.04_255)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-[oklch(97%_0.012_80)] mb-4">
            Never Miss a Market Insight
          </h2>
          <p className="text-[oklch(75%_0.02_80)] mb-8">
            Subscribe to our newsletter for weekly market analysis and trading tips.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-[oklch(16%_0.05_255)] border border-[oklch(26%_0.07_255)] rounded-lg text-[oklch(97%_0.012_80)] placeholder:text-[oklch(55%_0.04_255)]"
            />
            <Button className="bg-[oklch(73%_0.14_72)] hover:bg-[oklch(65%_0.12_72)]">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
