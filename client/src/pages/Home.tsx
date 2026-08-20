import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SpotifyPodcast } from "@/components/SpotifyPodcast";
import { ArrowRight, ExternalLink, Star, ChevronDown, ChevronUp, Play, TrendingUp, Users, BookOpen, CheckCircle, Quote, Youtube } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { updateMetaTags } from "@/lib/meta";
import { trackButtonClick, trackLinkClick } from "@/lib/analytics";

const LOGO = "https://static.wixstatic.com/media/19e04d_5b3916fa625b4272b213150378dc7cd2~mv2.png/v1/fill/w_198,h_62,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GIFT-LOGO.png";
const IMGS = {
  sounia1: "/images/sounia-1_470e99c3.jpg",
  sounia2: "/images/sounia-2_f0d34f15.jpg",
  sounia3: "/images/sounia-3_67fb747f.jpg",
  sounia4: "/images/sounia-4_e7722a5c.jpg",
  testimonialAhmad: "/images/testimonial-ahmad_874d9fc9.jpg",
  testimonialJim: "/images/testimonial-jim_c5862ebd.jpg",
  testimonialMatthew: "/images/testimonial-matthew_81761078.jpg",
};

// Stats labels are translated dynamically in the component

// WHOP URLs
const WHOP_SMME = "https://whop.com/discover/options-academy-zero-to-pro-6/stock-market-made-simple/";

// HIDDEN: Stock Market Made Easy course - will be re-enabled later
const hiddenStockMarketCourse = {
  icon: TrendingUp,
  title: "Stock Market Made Easy",
  desc: "From Zero to Investor — 9 modules, 39 lessons, lifetime access. The complete beginner's guide to stocks, ETFs, and long-term investing.",
  tag: "📚 Self-Paced Course",
  href: "/stock-market-made-easy",
  price: "$349",
  originalPrice: "$436.25",
  whopUrl: WHOP_SMME,
};

const services = [
  {
    icon: Users,
    title: "Options Academy: Zero to Pro",
    desc: "Master options trading with personalized guidance. Group live classes, real-time market analysis, and dedicated Q&A sessions with Sounia. Starts August 18, 2026 • Tuesdays & Thursdays 5-6:30 PM PST • Online via Zoom • 4 Months",
    tag: "🎓 Masterclass",
    href: "/masterclass",
    price: "$3,000",
    originalPrice: null,
    whopUrl: null,
    isSoldOut: true,
  },
];

const testimonials = [
  {
    initials: "SC",
    name: "Samitaa Chahal",
    handle: "@smitakc",
    result: "Best decision I ever made",
    quote: "Sounia is the kind of mentor who puts her heart and soul in her teachings. Her focus is on long-term learning (and not shortcuts) and good habits which build long term success. Highly recommended for anyone serious about learning trading.",
    stars: 5,
    date: "March 2026",
  },
  {
    initials: "M",
    name: "Manu",
    handle: "Whop Verified",
    result: "Teaches with integrity",
    quote: "Sounia Gill is rare in this space. She teaches with integrity and clarity and doesn't gatekeep a single thing. She genuinely wants her students to win — to think for themselves, trade with confidence, and build real independence.",
    stars: 5,
    date: "February 2026",
  },
  {
    initials: "KP",
    name: "Kamal Preet Singh",
    handle: "Whop Verified",
    result: "Most transparent mentor",
    quote: "Sounia ji is the most transparent and genuine mentor I've ever learned from. She explains option trading clearly, shares her trades openly, and truly cares about her students' growth. The only place where you actually learn option trading the right way.",
    stars: 5,
    date: "November 2025",
  },
  {
    initials: "GS",
    name: "Gurpartap Singh",
    handle: "Whop Verified",
    result: "Worth every penny",
    quote: "I really want to thank her for creating such a valuable course. Her way of teaching and explaining the stock market is so easy to grasp. Really worth the time and money spent on it. She is a wonderful mentor and a pure and positive soul.",
    stars: 5,
    date: "January 2026",
  },
  {
    initials: "MS",
    name: "Manvir Singh",
    handle: "Whop Verified",
    result: "Beginner to Advanced",
    quote: "Thank you very much Sounia for making such an amazing course — beginner friendly to advanced level. Recommended to everyone who wants to learn trading and investing in the market. She is the best.",
    stars: 5,
    date: "February 2026",
  },

];

const faqs = [
  { q: "Do I need prior trading experience?", a: "No prior experience is needed for Stock Market Made Easy. This program is designed to take you from zero to confident investor step by step." },
  { q: "Is the course pre-recorded or live?", a: "Stock Market Made Easy is a structured, pre-recorded program with lifetime access. You learn at your own pace and revisit any lesson as many times as you need." },
  { q: "What trading platform do I need?", a: "We provide complete setup walkthroughs for both IBKR (Interactive Brokers) and Webull. You'll be fully set up and ready to invest before you begin the course." },
  { q: "Is there a community I can join?", a: "Yes! All students get access to comprehensive course materials, lifetime resources, and direct support. You can reach out with questions anytime through our contact form." },
  { q: "Do I get lifetime access to the course materials?", a: "Yes — once enrolled, you have lifetime access to all course content, recordings, and future updates. Learn at your own pace with no expiry." },
  { q: "What if I have questions after enrolling?", a: "Our course materials are comprehensive with lifetime access. For additional support, you can reach out via our contact form and Sounia's team will assist you." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b cursor-pointer"
      style={{ borderColor: "oklch(88% 0.018 80)" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-5 gap-4">
        <span className="text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif", color: "var(--navy)" }}>{q}</span>
        <span className="shrink-0" style={{ color: "var(--gold)" }}>
          {open ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
        </span>
      </div>
      {open && <p className="pb-5 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>{a}</p>}
    </div>
  );
}

export default function Home() {
  const { t } = useTranslation();

  useEffect(() => {
    updateMetaTags({
      title: "Stock Market Made Easy | Beginner's Masterclass by Sounia Gill",
      description: "Learn stock market investing from zero with Stock Market Made Easy — a comprehensive 9-module masterclass by Sounia Gill. Lifetime access, beginner-friendly, no experience needed.",
      keywords: "stock market masterclass, learn stock trading, beginner investing, stock market education, how to invest in stocks, ETF investing, long-term investing, Sounia Gill, stock market course",
      ogTitle: "Stock Market Made Easy | Beginner's Masterclass by Sounia Gill",
      ogDescription: "Learn stock market investing from zero with Stock Market Made Easy — a comprehensive 9-module masterclass. Lifetime access, beginner-friendly, no experience needed.",
      canonicalUrl: "https://giftoftrading.com/",
    });
  }, []);

  const [videoPlaying, setVideoPlaying] = useState(false);
  const stats = [
    { number: "2,700+", label: t("home.statsStudents") },
    { number: "62+", label: t("home.statsMillionaires") },
    { number: "5+", label: t("home.statsExperience") },
    { number: "95%", label: t("home.statsSatisfaction") },
    { number: "$62M+", label: t("home.statsGains") },
  ];
  const { data: ytVideosRaw = [], isLoading: ytLoading } = trpc.youtube.latestVideos.useQuery();
  const ytVideos = ytVideosRaw as Array<{ id: string; url: string; thumbnail: string; title: string; publishedAt: string }>;

  return (
    <Layout>

      {/* ══════════════════════════════════════════════════════════════════
          HERO — split layout, photo right, headline left
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--navy)", minHeight: "92vh", display: "flex", alignItems: "center" }}
      >
        <div className="container relative z-10" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
                style={{ background: "oklch(72% 0.12 75 / 0.15)", border: "1px solid oklch(72% 0.12 75 / 0.35)" }}>
                <div className="w-2 h-2 rounded-full" style={{ background: "var(--gold)" }} />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--gold)", fontFamily: "'Inter', sans-serif" }}>
                  {t("home.badge")}
                </span>
              </div>

              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
                  fontWeight: 500,
                  lineHeight: 1.08,
                  color: "var(--cream)",
                  marginBottom: "1.5rem",
                }}
              >
                {t("home.heroTitle").split("Gift")[0]}
                <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Gift</em>
                {t("home.heroTitle").split("Gift")[1]}
              </h1>

              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: "oklch(68% 0.02 255)", fontFamily: "'Inter', sans-serif", maxWidth: 480 }}
              >
                {t("home.heroSubtitle")}
              </p>

              <div className="mb-8 flex items-center gap-3">
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.5rem", color: "var(--gold)" }}>$3,000</span>
                <span style={{ color: "oklch(60% 0.02 255)", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }}>Masterclass • Starts August 18</span>
              </div>

              {/* Social proof mini */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex -space-x-2">
                  {[IMGS.testimonialAhmad, IMGS.testimonialJim, IMGS.testimonialMatthew].map((src, i) => (
                    <img key={i} src={src} alt="student" className="w-9 h-9 rounded-full object-cover" style={{ border: "2px solid var(--navy)" }} />
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[1,2,3,4,5].map((i) => <Star key={i} size={11} fill="var(--gold)" style={{ color: "var(--gold)" }} />)}
                  </div>
                  <p className="text-xs" style={{ color: "oklch(60% 0.02 255)", fontFamily: "'Inter', sans-serif" }}>{t("home.trustedBy")}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/masterclass" onClick={() => trackButtonClick('home_start_learning')}>
                  <span className="btn-gold">Start Learning <ArrowRight size={16} /></span>
                </Link>
                <Link href="/about" onClick={() => trackButtonClick('home_meet_sounia')}>
                  <span className="btn-ghost-light">Meet Sounia</span>
                </Link>
              </div>
            </div>

            {/* Right: Photo */}
            <div className="relative hidden lg:block">
              <div
                className="rounded-2xl overflow-hidden"
                style={{ height: 560, boxShadow: "0 32px 80px oklch(8% 0.04 255 / 0.5)" }}
              >
                <img
                  src={IMGS.sounia1}
                  alt="Sounia Gill — Gift of Trading"
                  className="w-full h-full object-cover object-top"
                />
                {/* Overlay gradient at bottom */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--navy) 0%, transparent 40%)" }} />
              </div>


            </div>
          </div>
        </div>

        {/* Background texture */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, oklch(80% 0.05 80) 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "var(--gold)", padding: "2rem 0" }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                    fontWeight: 700,
                    color: "var(--navy)",
                    lineHeight: 1,
                    marginBottom: "0.35rem",
                  }}
                >
                  {s.number}
                </p>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "oklch(22% 0.07 255 / 0.7)", fontFamily: "'Inter', sans-serif" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PROGRAMS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="section-py" style={{ background: "white" }}>
        <div className="container">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Choose Your Learning Path</p>
            <h2 className="editorial-heading mb-4">
              Our Programs
            </h2>
            <p className="body-muted mx-auto" style={{ maxWidth: 480 }}>
              Select the program that best fits your goals and learning style.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="service-card h-full flex flex-col">
                  <div className="tag-gold mb-4 self-start text-xs">{s.tag}</div>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "var(--cream)" }}
                  >
                    <Icon size={20} style={{ color: "var(--navy)" }} />
                  </div>
                  <h3
                    className="font-semibold mb-3"
                    style={{ fontFamily: "'Inter', sans-serif", color: "var(--navy)", fontSize: "0.95rem" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-body)" }}>{s.desc}</p>
                  {s.price && (
                    <div className="mt-3 flex items-baseline gap-2">
                      <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--navy)" }}>{s.price}</span>
                      {s.originalPrice && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "var(--text-muted)", textDecoration: "line-through" }}>{s.originalPrice}</span>}
                    </div>
                  )}
                  <div className="mt-4 flex gap-2 flex-wrap">
                    {s.isSoldOut ? (
                      <button
                        disabled
                        style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", background: "var(--gold)", color: "var(--navy)", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.78rem", padding: "0.45rem 1rem", borderRadius: "0.375rem", opacity: 0.5, cursor: "not-allowed" }}
                      >
                        Course is Sold Out
                      </button>
                    ) : s.whopUrl ? (
                      <a
                        href={s.whopUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", background: "var(--gold)", color: "var(--navy)", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.78rem", padding: "0.45rem 1rem", borderRadius: "0.375rem", textDecoration: "none" }}
                      >
                        Enroll on Whop <ExternalLink size={12} />
                      </a>
                    ) : (
                      <a
                        href={s.href}
                        style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", background: "var(--gold)", color: "var(--navy)", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.78rem", padding: "0.45rem 1rem", borderRadius: "0.375rem", textDecoration: "none", cursor: "pointer" }}
                      >
                        Learn more <ArrowRight size={12} />
                      </a>
                    )}
                    <Link href={s.href}>
                      <span className="flex items-center gap-1" style={{ color: "var(--gold)", fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer" }}>
                        Learn more <ArrowRight size={13} />
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FOUNDER MESSAGE
      ══════════════════════════════════════════════════════════════════ */}
      <section className="section-py section-dark">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden" style={{ height: 500, boxShadow: "0 24px 64px oklch(8% 0.04 255 / 0.4)" }}>
                <img src="/images/sounia-portrait.png" alt="Sounia Gill — Trading" className="w-full h-full object-cover object-top" />
              </div>
              <div
                className="absolute -bottom-4 -right-4 px-5 py-4 rounded-2xl"
                style={{ background: "var(--gold)", boxShadow: "0 8px 24px oklch(72% 0.12 75 / 0.35)" }}
              >
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--navy)", fontFamily: "'Inter', sans-serif" }}>Founder</p>
                <p className="font-bold text-sm" style={{ color: "var(--navy)", fontFamily: "'Playfair Display', serif" }}>Sounia Gill</p>
              </div>
            </div>

            {/* Message */}
            <div>
              <p className="section-label-gold mb-3">Founder's Message</p>
              <h2 className="editorial-heading-light mb-6">
                A Message from{" "}
                <span style={{ color: "var(--gold)" }}>Sounia</span>
              </h2>

              <div className="mb-6" style={{ borderLeft: "3px solid var(--gold)", paddingLeft: "1.25rem" }}>
                <Quote size={24} style={{ color: "var(--gold)", marginBottom: "0.75rem", opacity: 0.7 }} />
                <p className="text-base leading-relaxed" style={{ color: "oklch(78% 0.015 255)", fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
                  "I started Gift of Trading because I wished someone had given me this knowledge when I was starting out. The markets can feel overwhelming — but they don't have to be. With the right guidance, anyone can learn to trade with confidence and build real wealth."
                </p>
              </div>

              <p className="text-sm leading-relaxed mb-5" style={{ color: "oklch(68% 0.02 255)", fontFamily: "'Inter', sans-serif" }}>
                After years of self-study, trial and error, and navigating multiple market cycles, I developed a disciplined, risk-first approach to trading that produces consistent results.
              </p>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "oklch(68% 0.02 255)", fontFamily: "'Inter', sans-serif" }}>
                Watching my students achieve financial independence — that's what drives me every single day. This isn't just a business. It's a mission.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/masterclass">
                  <span className="btn-gold">Explore Masterclass <ArrowRight size={16} /></span>
                </Link>
                <Link href="/about">
                  <span className="btn-ghost-light">My Full Story</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SPOTIFY PODCAST
      ══════════════════════════════════════════════════════════════════ */}
      <SpotifyPodcast />

      {/* ══════════════════════════════════════════════════════════════════
          LATEST YOUTUBE VIDEOS — auto-updates from RSS feed
      ══════════════════════════════════════════════════════════════════ */}
      <section className="section-py section-cream">
        <div className="container">
          <div className="text-center mb-10">
            <p className="section-label mb-3">Latest from YouTube</p>
            <h2 className="editorial-heading mb-4">
              {t("home.youtubeTitle")}
            </h2>
            <p className="body-muted mx-auto" style={{ maxWidth: 500 }}>
              {t("home.youtubeSubtitle")}
            </p>
          </div>

          {ytLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden animate-pulse" style={{ background: "oklch(92% 0.01 80)" }}>
                  <div style={{ paddingBottom: "56.25%", background: "oklch(88% 0.015 80)" }} />
                  <div className="p-4">
                    <div className="h-4 rounded mb-2" style={{ background: "oklch(85% 0.01 80)" }} />
                    <div className="h-3 rounded w-2/3" style={{ background: "oklch(88% 0.01 80)" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : ytVideos.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-6">
              {ytVideos.map((video) => (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl overflow-hidden block w-full md:w-[calc(33.333%-1rem)] max-w-sm"
                  style={{ background: "white", border: "1px solid oklch(88% 0.018 80)", boxShadow: "0 4px 24px oklch(15% 0.06 255 / 0.06)", textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px oklch(15% 0.06 255 / 0.12)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px oklch(15% 0.06 255 / 0.06)"; }}
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ transition: "transform 0.3s" }}
                    />
                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "oklch(15% 0.06 255 / 0.3)", opacity: 0, transition: "opacity 0.2s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "0"; }}
                    >
                      <div className="rounded-full flex items-center justify-center" style={{ width: 52, height: 52, background: "var(--gold)" }}>
                        <Play size={20} fill="white" color="white" />
                      </div>
                    </div>
                    {/* YouTube badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: "oklch(15% 0.06 255 / 0.75)", backdropFilter: "blur(4px)" }}>
                      <Youtube size={12} color="#ff0000" fill="#ff0000" />
                      <span style={{ color: "white", fontSize: 10, fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>YouTube</span>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-4">
                    <p className="font-semibold line-clamp-2" style={{ color: "var(--navy)", fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.4, marginBottom: 6 }}>
                      {video.title}
                    </p>
                    <p style={{ color: "var(--text-muted)", fontSize: 12, fontFamily: "'Inter', sans-serif" }}>
                      {new Date(video.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="body-muted">Videos loading… check back soon.</p>
            </div>
          )}

          <div className="text-center mt-10">
            <a
              href="https://www.youtube.com/@giftoftrading"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center gap-2"
            >
              <Youtube size={16} color="#ff0000" />
              {t("home.subscribeYoutube")} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="section-py section-dark">
        <div className="container">
          <div className="text-center mb-12">
            <p className="section-label-gold mb-3">Verified Whop Reviews • 4.96 / 5</p>
            <h2 className="editorial-heading-light mb-4">
              {t("home.reviewsTitle")}
            </h2>
            <p className="text-sm" style={{ color: "oklch(60% 0.02 255)", fontFamily: "'Inter', sans-serif", maxWidth: 420, margin: "0 auto" }}>
              {t("home.reviewsSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl flex flex-col"
                style={{ background: "oklch(19% 0.055 255)", border: "1px solid oklch(28% 0.07 255)" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-1">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} size={13} fill="var(--gold)" style={{ color: "var(--gold)" }} />
                    ))}
                  </div>
                  <span className="text-xs" style={{ color: "oklch(55% 0.02 255)", fontFamily: "'Inter', sans-serif" }}>{t.date}</span>
                </div>
                <div className="tag-gold mb-4 self-start text-xs">{t.result}</div>
                <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "oklch(75% 0.015 255)", fontStyle: "italic", fontFamily: "'Playfair Display', serif" }}>
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid oklch(28% 0.07 255)" }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                    style={{ background: "linear-gradient(135deg, var(--gold), oklch(65% 0.12 60))", color: "var(--navy)" }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--cream)", fontFamily: "'Inter', sans-serif" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "oklch(55% 0.02 255)", fontFamily: "'Inter', sans-serif" }}>{t.handle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="https://whop.com/discover/options-academy-zero-to-pro-6/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm"
              style={{ color: "var(--gold)", fontFamily: "'Inter', sans-serif", textDecoration: "none" }}
            >
              <Star size={14} fill="var(--gold)" style={{ color: "var(--gold)" }} />
              4.96 / 5 from 119 verified reviews on Whop
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SUCCESS STORIES — full-width photo feature
      ══════════════════════════════════════════════════════════════════ */}
      <section className="section-py" style={{ background: "white" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="section-label mb-3">Success Stories</p>
              <h2 className="editorial-heading mb-5">
                {t("home.successTitle")}
              </h2>
              <p className="body-text mb-8">
                {t("home.successSubtitle")}
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { name: "Sanyam Kohli", result: "Sounia is one of the best Mentors — a mix of Care and Intelligence." },
                  { name: "Sheena Goraya", result: "Great mentorship! Amazing and honest teacher." },
                  { name: "Harmesh Dhaliwal", result: "Her passion and expertise truly shine. Can't wait to dive deeper into the course!" },
                ].map((s) => (
                  <div key={s.name} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "var(--cream)", border: "1px solid oklch(88% 0.018 80)" }}>
                    <CheckCircle size={17} style={{ color: "var(--gold)", flexShrink: 0, marginTop: 1 }} />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--navy)", fontFamily: "'Inter', sans-serif" }}>{s.name}</p>
                      <p className="text-sm" style={{ color: "var(--text-body)" }}>{s.result}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://whop.com/discover/options-academy-zero-to-pro-6/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                {t("home.readAllStories")} <ExternalLink size={15} />
              </a>
            </div>

            {/* Photo grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden" style={{ height: 260 }}>
                <img src={IMGS.sounia2} alt="Sounia Gill" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden mt-6" style={{ height: 260 }}>
                <img src={IMGS.sounia4} alt="Sounia Gill" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════════════════ */}
      <section className="section-py section-cream">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-14">
            <div>
              <p className="section-label mb-3">Got Questions?</p>
              <h2 className="editorial-heading mb-5">
                {t("home.faqTitle")}
              </h2>
              <p className="body-text mb-8">
                {t("home.faqSubtitle")}
              </p>
              <Link href="/contact">
                <span className="btn-primary">Ask Us Anything <ArrowRight size={16} /></span>
              </Link>
            </div>
            <div>
              {faqs.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          READY TO TAKE THE LEAP — CTA
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--navy)", padding: "6rem 0" }}
      >
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label-gold mb-4">Ready to Take the Leap?</p>
              <h2 className="editorial-heading-light mb-5" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}>
                {t("home.ctaTitle")}
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "oklch(65% 0.02 255)", fontFamily: "'Inter', sans-serif", maxWidth: 440 }}>
                {t("home.ctaSubtitle")}
              </p>
              <div className="flex flex-wrap gap-3">
                {/* Stock Market Made Easy Whop enrollment link removed */}
                <Link href="/stock-market-made-easy">
                  <span className="btn-ghost-light">Learn More</span>
                </Link>
              </div>
            </div>

            {/* Right: checklist */}
            <div className="space-y-3">
              {[
                "Structured, self-paced curriculum",
                "Recorded lessons — learn at your own pace",
                "Lifetime access to all course materials",
                "Real trade breakdowns and analysis",
                "Comprehensive resources and guides",
                "Risk management and investing psychology",
                "Long-term wealth building strategies",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "oklch(19% 0.055 255)", border: "1px solid oklch(28% 0.07 255)" }}>
                  <CheckCircle size={16} style={{ color: "var(--gold)", flexShrink: 0 }} />
                  <span className="text-sm" style={{ color: "oklch(78% 0.015 255)", fontFamily: "'Inter', sans-serif" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Background texture */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, oklch(80% 0.05 80) 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }} />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          LIVE MARKET TICKER + NEWS
      ══════════════════════════════════════════════════════════════ */}
      <section className="section-py" style={{ background: "white" }}>
        <div className="container">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Live Market Data</p>
            <h2 className="editorial-heading" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
              {t("home.marketsTitle")}
            </h2>
            <p className="body-muted mx-auto mt-3" style={{ maxWidth: 480 }}>
              {t("home.marketsSubtitle")}
            </p>
          </div>

          {/* TradingView Market Overview Widget — free, no API key needed */}
          <div
            className="rounded-2xl overflow-hidden mb-10"
            style={{ border: "1px solid oklch(88% 0.018 80)", boxShadow: "0 4px 24px oklch(15% 0.06 255 / 0.06)" }}
          >
            <iframe
              src="https://s.tradingview.com/embed-widget/market-overview/?locale=en#%7B%22colorTheme%22%3A%22light%22%2C%22dateRange%22%3A%221D%22%2C%22showChart%22%3Atrue%2C%22isTransparent%22%3Afalse%2C%22showSymbolLogo%22%3Atrue%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22400%22%2C%22tabs%22%3A%5B%7B%22title%22%3A%22Indices%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22FOREXCOM%3ASPXUSD%22%2C%22d%22%3A%22S%26P+500%22%7D%2C%7B%22s%22%3A%22FOREXCOM%3ANSXUSD%22%2C%22d%22%3A%22Nasdaq+100%22%7D%2C%7B%22s%22%3A%22FOREXCOM%3ADJI%22%2C%22d%22%3A%22Dow+Jones%22%7D%2C%7B%22s%22%3A%22INDEX%3AVIX%22%2C%22d%22%3A%22VIX%22%7D%5D%7D%2C%7B%22title%22%3A%22Top+Stocks%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22NASDAQ%3AAAPL%22%7D%2C%7B%22s%22%3A%22NASDAQ%3AMSFT%22%7D%2C%7B%22s%22%3A%22NASDAQ%3ANVDA%22%7D%2C%7B%22s%22%3A%22NYSE%3ATSLA%22%7D%5D%7D%5D%7D"
              title="TradingView Market Overview — S&P 500, Nasdaq, Dow Jones"
              width="100%"
              height="400"
              style={{ border: "none", display: "block" }}
              loading="lazy"
            />
          </div>

          {/* Market News Cards */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-bold" style={{ color: "var(--navy)", fontFamily: "'Montserrat', sans-serif" }}>
              Latest Market News
            </h3>
            <a
              href="https://finance.yahoo.com/topic/stock-market-news/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold inline-flex items-center gap-1"
              style={{ color: "var(--gold)" }}
            >
              More news <ArrowRight size={13} />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                category: "Options",
                title: "How to trade options around earnings season: key strategies from Sounia's playbook",
                desc: "Earnings season creates volatility spikes that options traders can capitalise on with the right setup.",
                href: "https://finance.yahoo.com/topic/options/",
                source: "Yahoo Finance",
              },
              {
                category: "S&P 500",
                title: "S&P 500 technical levels to watch: support, resistance, and what the charts are saying",
                desc: "Key price levels every trader should have on their radar as the index navigates macro uncertainty.",
                href: "https://finance.yahoo.com/quote/%5EGSPC/",
                source: "Yahoo Finance",
              },
              {
                category: "Market Outlook",
                title: "Weekly market outlook: Nasdaq momentum, Fed watch, and sector rotation plays",
                desc: "A breakdown of the week ahead — the sectors showing strength and the risks worth managing.",
                href: "https://finance.yahoo.com/topic/stock-market-news/",
                source: "Yahoo Finance",
              },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-5 rounded-2xl transition-all hover:shadow-lg group"
                style={{ background: "var(--cream)", border: "1px solid oklch(88% 0.018 80)", textDecoration: "none" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="tag-gold text-xs">{item.category}</span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{item.source}</span>
                </div>
                <h3 className="text-sm font-semibold leading-snug mb-2 group-hover:text-[var(--gold)] transition-colors" style={{ color: "var(--navy)", fontFamily: "'Inter', sans-serif" }}>
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-muted)", fontFamily: "'Inter', sans-serif" }}>
                  {item.desc}
                </p>
                <div className="flex items-center gap-1" style={{ color: "var(--gold)" }}>
                  <span className="text-xs font-semibold">Read more</span>
                  <ArrowRight size={12} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM REELS */}
      <section className="section-py" style={{ background: "var(--navy)" }}>
        <div className="container">
          <div className="text-center mb-10">
            <p className="section-label mb-3" style={{ color: "var(--gold)" }}>@giftoftrading • 82K Followers</p>
            <h2 className="editorial-heading mb-4" style={{ color: "white" }}>
              Watch on{" "}
              <span style={{ color: "var(--gold)" }}>Instagram</span>
            </h2>
            <p className="body-muted mx-auto" style={{ maxWidth: 500, color: "oklch(85% 0.02 80)" }}>
              Market insights, trade breakdowns, and mindset lessons — straight from Sounia's trading desk.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { url: "https://www.instagram.com/reel/DVuWEMRD-1t/", label: "5 Biggest Options Trading Mistakes" },
              { url: "https://www.instagram.com/reel/DVWM_VCkjkF/", label: "Your 20s Are for Building" },
              { url: "https://www.instagram.com/reel/DVd77rLEhON/", label: "Risk Management Isn't Optional" },
            ].map((reel, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ background: "oklch(18% 0.04 255)", border: "1px solid oklch(28% 0.07 255)" }}>
                <div style={{ position: "relative", paddingBottom: "177.78%", height: 0, overflow: "hidden" }}>
                  <iframe
                    src={`${reel.url}embed/`}
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                    allowFullScreen
                    scrolling="no"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title={reel.label}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="https://www.instagram.com/giftoftrading/reels/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2"
              style={{ borderColor: "oklch(40% 0.06 255)", color: "var(--cream)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              See All Reels on Instagram
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
