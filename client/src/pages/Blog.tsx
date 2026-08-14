import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Search, Clock, Tag, ArrowRight, BookOpen, TrendingUp, BarChart2, DollarSign, GraduationCap, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import Layout from "@/components/Layout";
import { updateMetaTags } from "@/lib/meta";
import { Breadcrumb } from "@/components/Breadcrumb";

const categoryConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  "market-news": { label: "Market News", icon: Newspaper, color: "bg-blue-100 text-blue-700" },
  "trading-tips": { label: "Trading Tips", icon: TrendingUp, color: "bg-green-100 text-green-700" },
  "options": { label: "Options", icon: BarChart2, color: "bg-purple-100 text-purple-700" },
  "investing": { label: "Investing", icon: DollarSign, color: "bg-yellow-100 text-yellow-700" },
  "portfolio": { label: "Portfolio", icon: BookOpen, color: "bg-orange-100 text-orange-700" },
  "education": { label: "Education", icon: GraduationCap, color: "bg-pink-100 text-pink-700" },
};

const samplePosts = [
  {
    id: 1,
    title: "Understanding Options Greeks: Delta, Gamma, Theta Explained",
    slug: "options-greeks-explained",
    excerpt: "Master the four essential options Greeks that every trader needs to understand before placing their first options trade. Learn how Delta, Gamma, Theta, and Vega affect your positions.",
    category: "options",
    readTime: 8,
    authorName: "Sounia Gill",
    publishedAt: new Date("2026-03-15"),
    featured: true,
    coverImage: null,
  },
  {
    id: 2,
    title: "FOMC Week Trading Strategy: How to Navigate Fed Decisions",
    slug: "fomc-week-trading-strategy",
    excerpt: "Federal Reserve meetings create volatility. Here's exactly how to position your portfolio before, during, and after FOMC announcements to protect capital and find opportunities.",
    category: "market-news",
    readTime: 6,
    authorName: "Sounia Gill",
    publishedAt: new Date("2026-03-22"),
    featured: true,
    coverImage: null,
  },
  {
    id: 3,
    title: "Supply and Demand Zones: The Foundation of Technical Analysis",
    slug: "supply-demand-zones-technical-analysis",
    excerpt: "Supply and demand zones are the most powerful tool in a technical trader's arsenal. Learn how to identify, draw, and trade these high-probability zones on any chart.",
    category: "trading-tips",
    readTime: 10,
    authorName: "Sounia Gill",
    publishedAt: new Date("2026-03-28"),
    featured: false,
    coverImage: null,
  },
  {
    id: 4,
    title: "Building a $10,000 Portfolio from Scratch: A Step-by-Step Guide",
    slug: "building-10k-portfolio-guide",
    excerpt: "Starting with $10,000 and no experience? This comprehensive guide walks you through every decision — from account setup to your first diversified portfolio.",
    category: "investing",
    readTime: 12,
    authorName: "Sounia Gill",
    publishedAt: new Date("2026-04-01"),
    featured: false,
    coverImage: null,
  },
  {
    id: 5,
    title: "Iron Condor Strategy: Generate Monthly Income with Options",
    slug: "iron-condor-monthly-income",
    excerpt: "The Iron Condor is one of the most popular income-generating options strategies. Learn how to set it up, manage it, and adjust when the market moves against you.",
    category: "options",
    readTime: 9,
    authorName: "Sounia Gill",
    publishedAt: new Date("2026-04-03"),
    featured: false,
    coverImage: null,
  },
  {
    id: 6,
    title: "Risk Management: The 2% Rule That Saved My Trading Account",
    slug: "2-percent-risk-management-rule",
    excerpt: "The single most important rule in trading is never risk more than 2% of your account on any single trade. Here's why this rule matters and how to implement it.",
    category: "education",
    readTime: 5,
    authorName: "Sounia Gill",
    publishedAt: new Date("2026-04-05"),
    featured: false,
    coverImage: null,
  },
];

function CategoryBadge({ category }: { category: string }) {
  const config = categoryConfig[category] || { label: category, icon: Tag, color: "bg-gray-100 text-gray-700" };
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${config.color}`} style={{ fontFamily: "Montserrat, sans-serif" }}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}

function PostCard({ post }: { post: typeof samplePosts[0] }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="bg-white rounded-2xl border border-[oklch(88%_0.025_80)] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col">
        {/* Cover image placeholder */}
        <div className="h-48 bg-gradient-to-br from-[oklch(12%_0.04_255)] to-[oklch(20%_0.06_255)] flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-10 h-10 text-[oklch(73%_0.14_72)] mx-auto mb-2" />
            <span className="text-[oklch(65%_0.04_255)] text-xs">Gift of Trading</span>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-3">
            <CategoryBadge category={post.category} />
            {post.featured && (
              <span className="text-xs font-semibold text-[oklch(73%_0.14_72)]" style={{ fontFamily: "Montserrat, sans-serif" }}>★ Featured</span>
            )}
          </div>
          <h3 className="text-[oklch(13%_0.04_255)] font-bold text-lg leading-tight mb-3 line-clamp-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
            {post.title}
          </h3>
          <p className="text-[oklch(48%_0.04_255)] text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-[oklch(93%_0.025_80)]">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[oklch(73%_0.14_72)] flex items-center justify-center text-[oklch(12%_0.04_255)] text-xs font-bold" style={{ fontFamily: "Montserrat, sans-serif" }}>
                SG
              </div>
              <span className="text-[oklch(55%_0.04_255)] text-xs">{post.authorName}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[oklch(65%_0.04_255)]">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime} min
              </span>
              <span>{new Date(post.publishedAt || new Date()).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Blog() {
  useEffect(() => {
    updateMetaTags({
      title: "Blog | Gift of Trading",
      description: "Read the latest articles on stock market investing, trading strategies, and financial education from Gift of Trading.",
      keywords: "stock market blog, investing articles, trading tips, financial education",
      ogTitle: "Blog | Gift of Trading",
      ogDescription: "Explore our blog for stock market investing tips and trading strategies.",
      canonicalUrl: "https://giftoftrading.com/blog",
    });
  }, []);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [blogEmail, setBlogEmail] = useState("");
  const [blogSubStatus, setBlogSubStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const blogSubscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => { setBlogSubStatus("success"); setBlogEmail(""); },
    onError: () => setBlogSubStatus("error"),
  });
  function handleBlogSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!blogEmail.trim()) return;
    setBlogSubStatus("loading");
    blogSubscribeMutation.mutate({ email: blogEmail });
  }

  const { data: dbPosts, isLoading } = trpc.blog.list.useQuery({ published: true });

  type PostItem = typeof samplePosts[0];

  // Merge DB posts with sample posts (DB takes priority)
  const allPosts: PostItem[] = (dbPosts && dbPosts.length > 0 ? dbPosts : samplePosts) as PostItem[];

  const filtered = allPosts.filter((p: PostItem) => {
    const matchesSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.excerpt || "").toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featured = filtered.filter((p: PostItem) => p.featured).slice(0, 2);
  const regular = filtered.filter((p: PostItem) => !p.featured);

  return (
    <Layout>
      <Breadcrumb items={[
        { name: "Home", url: "https://giftoftrading.com" },
        { name: "Blog & News", url: "https://giftoftrading.com/blog" },
      ]} />
      {/* Hero */}
      <section className="bg-[oklch(12%_0.04_255)] py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <p className="text-[oklch(73%_0.14_72)] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Blog & Market News
          </p>
          <h1 className="text-5xl lg:text-6xl font-bold text-[oklch(97%_0.012_80)] mb-6">
            Insights to Trade Smarter
          </h1>
          <p className="text-[oklch(75%_0.02_80)] text-xl max-w-2xl mx-auto mb-10">
            Stay ahead of the market with expert analysis, trading strategies, and educational content from Sounia Gill.
          </p>
          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[oklch(65%_0.04_255)]" />
            <Input
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 bg-[oklch(16%_0.05_255)] border-[oklch(26%_0.07_255)] text-[oklch(97%_0.012_80)] placeholder:text-[oklch(55%_0.04_255)] h-12 text-base"
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-[oklch(16%_0.05_255)] border-b border-[oklch(26%_0.07_255)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setActiveCategory("all")}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeCategory === "all"
                  ? "bg-[oklch(73%_0.14_72)] text-[oklch(12%_0.04_255)]"
                  : "bg-[oklch(20%_0.06_255)] text-[oklch(80%_0.02_80)] hover:bg-[oklch(26%_0.07_255)]"
              }`}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              All Articles
            </button>
            {Object.entries(categoryConfig).map(([key, { label, icon: Icon }]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeCategory === key
                    ? "bg-[oklch(73%_0.14_72)] text-[oklch(12%_0.04_255)]"
                    : "bg-[oklch(20%_0.06_255)] text-[oklch(80%_0.02_80)] hover:bg-[oklch(26%_0.07_255)]"
                }`}
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-[oklch(97%_0.012_80)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-[oklch(88%_0.025_80)] h-80 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-[oklch(73%_0.14_72)] mx-auto mb-4 opacity-50" />
              <h3 className="text-[oklch(13%_0.04_255)] text-xl font-bold mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>No articles found</h3>
              <p className="text-[oklch(55%_0.04_255)]">Try a different search term or category.</p>
            </div>
          ) : (
            <>
              {/* Featured Posts */}
              {featured.length > 0 && activeCategory === "all" && !search && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-[oklch(13%_0.04_255)] mb-6" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Featured Articles
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {featured.map((post) => (
                      <PostCard key={post.id} post={post as typeof samplePosts[0]} />
                    ))}
                  </div>
                </div>
              )}

              {/* All Posts */}
              <div>
                  {(activeCategory !== "all" || search || featured.length === 0) ? null : (
                  <h2 className="text-2xl font-bold text-[oklch(13%_0.04_255)] mb-6" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Latest Articles
                  </h2>
                )}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(activeCategory === "all" && !search ? regular : filtered).map((post: PostItem) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            </>
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
            Subscribe to get the latest trading strategies, market analysis, and educational content delivered to your inbox.
          </p>
          {blogSubStatus === "success" ? (
            <p className="text-lg" style={{ color: "oklch(73% 0.14 72)" }}>✓ You're subscribed! Watch your inbox for updates.</p>
          ) : (
            <form onSubmit={handleBlogSubscribe} className="flex gap-3 max-w-md mx-auto">
              <Input
                type="email"
                value={blogEmail}
                onChange={(e) => setBlogEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="bg-[oklch(16%_0.05_255)] border-[oklch(26%_0.07_255)] text-[oklch(97%_0.012_80)] placeholder:text-[oklch(55%_0.04_255)]"
              />
              <Button
                type="submit"
                disabled={blogSubStatus === "loading"}
                className="bg-[oklch(73%_0.14_72)] hover:bg-[oklch(65%_0.13_70)] text-[oklch(12%_0.04_255)] font-bold flex-shrink-0"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {blogSubStatus === "loading" ? "..." : "Subscribe"}
                {blogSubStatus !== "loading" && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </form>
          )}
          {blogSubStatus === "error" && (
            <p className="text-sm mt-2" style={{ color: "#ef4444" }}>Something went wrong. Please try again.</p>
          )}
        </div>
      </section>
    </Layout>
  );
}
