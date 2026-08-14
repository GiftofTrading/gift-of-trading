import Layout from "@/components/Layout";
import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, Star, Heart, Target, BookOpen, TrendingUp, Users, Lightbulb, Shield } from "lucide-react";
import { updateMetaTags } from "@/lib/meta";

const IMGS = {
  sounia1: "/images/sounia-1_470e99c3.jpg",
  sounia2: "/images/sounia-2_f0d34f15.jpg",
  sounia3: "/images/sounia-3_67fb747f.jpg",
  sounia4: "/images/sounia-4_e7722a5c.jpg",
  testimonialAhmad: "/images/testimonial-ahmad_874d9fc9.jpg",
  testimonialJim: "/images/testimonial-jim_c5862ebd.jpg",
  testimonialMatthew: "/images/testimonial-matthew_81761078.jpg",
};

const values = [
  { icon: Heart, title: "Genuine Care", desc: "Sounia does this because she genuinely enjoys helping others. Every student's success is a personal win." },
  { icon: Target, title: "Results-Focused", desc: "Every lesson is designed to produce real, measurable results — not just theory, but actionable strategies." },
  { icon: Lightbulb, title: "Clarity Over Complexity", desc: "Complex market concepts broken down into clear, actionable steps that even a complete beginner can understand." },
  { icon: TrendingUp, title: "Long-Term Thinking", desc: "Success isn't built on single trades. We teach the habits and discipline for sustainable wealth creation." },
];

const milestones = [
  { year: "2020", event: "Began trading the markets independently, mastering options through real-world experience" },
  { year: "2022", event: "Started teaching — founded Gift of Trading to share proven strategies and help others build wealth" },
  { year: "2023", event: "Launched a structured, self-paced trading curriculum with lifetime access for students worldwide" },
  { year: "2024", event: "Expanded to 2,700+ students worldwide, with 62+ students achieving millionaire milestones" },
  { year: "2026", event: "Launching Stock Market Made Easy — a complete beginner's guide to stocks and investing" },
];

const expertise = [
  { icon: TrendingUp, label: "Options Trading", detail: "Calls, Puts, Spreads, Iron Condors" },
  { icon: Shield, label: "Risk Management", detail: "Position sizing, Stop-loss strategies" },
  { icon: BookOpen, label: "Technical Analysis", detail: "Fibonacci, Supply/Demand, Level 2" },
  { icon: Users, label: "Student Success", detail: "Lifetime support and resources" },
];

const successStories = [
  {
    photo: IMGS.testimonialAhmad,
    name: "Ahmad B.",
    result: "Doubled account in 2 days",
    quote: "I am so glad that I found Gift of Trading. I learned more in one hour with Sounia than I did from watching hundreds of videos on YouTube. She helped boost my confidence and the second day of live trading I doubled my account size.",
    stars: 5,
  },
  {
    photo: IMGS.testimonialJim,
    name: "Jim Gakami",
    result: "Best trading community",
    quote: "What makes GIFT different? Simple — Sounia's brilliance! Her market expertise and teaching style are unmatched. I have been a part of two trading communities before GIFT and none of them can hold a candle to Gift of Trading.",
    stars: 5,
  },
  {
    photo: IMGS.testimonialMatthew,
    name: "Matthew Valentine",
    result: "Complete investor transformation",
    quote: "Finally, a trading teacher who truly cares about the success of her students! From beginner to millionaire trader, Sounia has the tools and strategies to improve every investor.",
    stars: 5,
  },
];

export default function About() {
  useEffect(() => {
    updateMetaTags({
      title: "About Sounia Gill | Gift of Trading",
      description: "Learn about Sounia Gill, founder of Gift of Trading. Discover her journey from independent trader to educator helping 2,700+ students master stock market investing.",
      keywords: "Sounia Gill, Gift of Trading founder, stock market educator, trading mentor",
      ogTitle: "About Sounia Gill | Gift of Trading",
      ogDescription: "Meet Sounia Gill, founder of Gift of Trading. Learn her story and how she's helping thousands master stock market investing.",
      canonicalUrl: "https://giftoftrading.com/about",
    });
  }, []);

  return (
    <Layout>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--navy)", paddingTop: 120, paddingBottom: 80 }}
      >
        <div className="container">
          <div className="max-w-2xl">
            <p className="section-label-gold mb-4">About Gift of Trading</p>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
                fontWeight: 500,
                lineHeight: 1.1,
                color: "var(--cream)",
                marginBottom: "1.25rem",
              }}
            >
              Meet Sounia Gill
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "oklch(70% 0.02 255)", fontFamily: "'Inter', sans-serif", maxWidth: 540 }}>
              Options trader, educator, and founder of Gift of Trading — on a mission to make financial literacy accessible to everyone.
            </p>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 hidden lg:block" style={{ width: "38%", overflow: "hidden" }}>
          <img src={IMGS.sounia1} alt="Sounia Gill" className="w-full h-full object-cover" style={{ opacity: 0.35 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, var(--navy) 0%, transparent 60%)" }} />
        </div>
      </section>

      {/* ── FOUNDER BIO ─────────────────────────────────────────────────── */}
      <section className="section-py" style={{ background: "white" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Photo collage */}
            <div className="relative hidden lg:block" style={{ height: 520 }}>
              <div className="absolute" style={{ left: 0, top: 0, width: "55%", height: "65%", borderRadius: "1.25rem", overflow: "hidden", boxShadow: "0 20px 60px oklch(15% 0.06 255 / 0.12)" }}>
                <img src={IMGS.sounia3} alt="Sounia Gill" className="w-full h-full object-cover" />
              </div>
              <div className="absolute" style={{ right: 0, top: "10%", width: "48%", height: "58%", borderRadius: "1.25rem", overflow: "hidden", boxShadow: "0 20px 60px oklch(15% 0.06 255 / 0.12)" }}>
                <img src={IMGS.sounia2} alt="Sounia Gill coaching" className="w-full h-full object-cover" />
              </div>
              <div className="absolute" style={{ left: "12%", bottom: 0, width: "50%", height: "40%", borderRadius: "1.25rem", overflow: "hidden", boxShadow: "0 20px 60px oklch(15% 0.06 255 / 0.12)" }}>
                <img src={IMGS.sounia4} alt="Sounia Gill" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="lg:hidden rounded-2xl overflow-hidden" style={{ height: 320 }}>
              <img src={IMGS.sounia3} alt="Sounia Gill" className="w-full h-full object-cover object-top" />
            </div>

            {/* Text */}
            <div>
              <p className="section-label mb-3">Her Story</p>
              <h2 className="editorial-heading mb-6">
                A Trader Who Became a{" "}
                <span style={{ color: "var(--gold)" }}>Teacher</span>
              </h2>
              <p className="body-text mb-5">
                Sounia Gill is an experienced options trader with a proven track record of navigating markets successfully and mentoring traders across all levels. Her coaching style is clear, empowering, and focused on building real-world trading confidence.
              </p>
              <p className="body-text mb-5">
                When she first started trading options, the journey was challenging — filled with learning, grit, and continuous adaptation. Over time, with each trade and each new strategy, she found a rhythm that led not only to profitability but also to a deeper understanding of market dynamics.
              </p>
              <p className="body-text mb-8">
                Sounia founded Gift of Trading with a simple but powerful belief: that financial education should be accessible, practical, and genuinely transformative. With Sounia, you're not just learning theory — you're developing a mindset and skillset built for real market success.
              </p>

              {/* Expertise grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {expertise.map(({ icon: Icon, label, detail }) => (
                  <div key={label} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "var(--cream)", border: "1px solid oklch(88% 0.018 80)" }}>
                    <Icon size={18} style={{ color: "var(--gold-dark)", flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--navy)", fontFamily: "'Inter', sans-serif" }}>{label}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {/* Stock Market Made Easy Whop enrollment link removed */}
                <Link href="/contact">
                  <span className="btn-ghost">Ask Questions</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VALUES ────────────────────────────────────────────── */}
      <section className="section-py section-dark">
        <div className="container">
          <div className="text-center mb-12">
            <p className="section-label-gold mb-3">Our Mission</p>
            <h2 className="editorial-heading-light mb-4">
              Invest Today. Build Wealth Tomorrow.
            </h2>
            <p className="text-sm leading-relaxed mx-auto" style={{ color: "oklch(65% 0.02 255)", maxWidth: 520, fontFamily: "'Inter', sans-serif" }}>
              At Gift of Trading, we believe that financial literacy is not a privilege — it's a right. Our mission is to make world-class trading education accessible to everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-2xl"
                style={{ background: "oklch(19% 0.055 255)", border: "1px solid oklch(28% 0.07 255)" }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "oklch(72% 0.12 75 / 0.15)" }}>
                  <Icon size={20} style={{ color: "var(--gold)" }} />
                </div>
                <h3 className="font-semibold mb-2 text-sm" style={{ color: "var(--cream)", fontFamily: "'Inter', sans-serif" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(65% 0.02 255)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ────────────────────────────────────────────────────── */}
      <section className="section-py" style={{ background: "white" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <p className="section-label mb-3">The Journey</p>
              <h2 className="editorial-heading mb-5">
                From Trader to{" "}
                <span style={{ color: "var(--gold)" }}>Trusted Educator</span>
              </h2>
              <p className="body-text mb-8">
                From a self-taught trader to a trusted educator with 2,700+ students — here's how Gift of Trading came to be.
              </p>
              <Link href="/contact">
                <span className="btn-primary">Join the Community <ArrowRight size={16} /></span>
              </Link>
            </div>

            <div className="space-y-0">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: "var(--navy)", color: "var(--gold)", fontFamily: "'Inter', sans-serif" }}
                    >
                      {m.year.slice(2)}
                    </div>
                    {i < milestones.length - 1 && (
                      <div className="w-px flex-1 my-1" style={{ background: "oklch(88% 0.018 80)", minHeight: 32 }} />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className="text-xs font-semibold mb-1" style={{ color: "var(--gold)", fontFamily: "'Inter', sans-serif" }}>{m.year}</p>
                    <p className="text-sm" style={{ color: "var(--text-body)" }}>{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SUCCESS STORIES ─────────────────────────────────────────────── */}
      <section id="success-stories" className="section-py section-dark">
        <div className="container">
          <div className="text-center mb-12">
            <p className="section-label-gold mb-3">Success Stories</p>
            <h2 className="editorial-heading-light mb-4">Real Results from Real Students</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((s) => (
              <div key={s.name} className="p-6 rounded-2xl flex flex-col" style={{ background: "oklch(19% 0.055 255)", border: "1px solid oklch(28% 0.07 255)" }}>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: s.stars }).map((_, i) => (
                    <Star key={i} size={13} fill="var(--gold)" style={{ color: "var(--gold)" }} />
                  ))}
                </div>
                <div className="tag-gold mb-4 self-start">{s.result}</div>
                <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "oklch(78% 0.015 255)", fontStyle: "italic" }}>
                  "{s.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid oklch(28% 0.07 255)" }}>
                  <img src={s.photo} alt={s.name} className="w-10 h-10 rounded-full object-cover" style={{ border: "2px solid var(--gold)" }} />
                  <p className="text-sm font-semibold" style={{ color: "var(--cream)", fontFamily: "'Inter', sans-serif" }}>{s.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY QUOTE ─────────────────────────────────────────────── */}
      <section className="section-py section-cream">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "5rem", color: "var(--gold)", lineHeight: 1, marginBottom: "1rem" }}>"</div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "var(--navy)", fontStyle: "italic", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              It's certain people in your life that are truly irreplaceable — Sounia is one of them. She is a blessing! She's authentic as they come; she does this because she genuinely enjoys helping others. Watching our community dive into financial literacy and investing fills me with so much joy.
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "var(--navy)", color: "var(--gold)" }}>Q</div>
              <div className="text-left">
                <p className="font-semibold text-sm" style={{ color: "var(--navy)", fontFamily: "'Inter', sans-serif" }}>Quincy</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>GIFT VIP Member</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT SOUNIA OFFERS ────────────────────────────────────────── */}
      <section className="section-py" style={{ background: "white" }}>
        <div className="container">
          <div className="text-center mb-12">
            <p className="section-label-gold mb-3">What Sounia Offers</p>
            <h2 className="editorial-heading">Beyond the Classroom</h2>
            <p className="text-sm mt-4" style={{ color: "var(--text-muted)", maxWidth: 520, margin: "1rem auto 0", fontFamily: "'Inter', sans-serif" }}>
              Sounia's work extends beyond teaching — she builds community, mentors students, and creates programs that give every trader the tools to succeed independently.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6" style={{ maxWidth: 720, margin: "0 auto" }}>
            {[
              {
                icon: "🆕",
                title: "Education & Coaching",
                desc: "Stock Market Made Easy is designed for complete beginners to learn the exact skills needed to invest confidently — with structured lessons, real-time market analysis, and lifetime access to all course materials.",
                detail: "9 modules, 39 lessons, lifetime access. Learn at your own pace with comprehensive video content and resources.",
                link: "/stock-market-made-easy",
                linkLabel: "Learn More",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-7 flex flex-col"
                style={{ border: "1px solid oklch(88% 0.025 80)", background: "oklch(97.5% 0.008 80)" }}
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3
                  className="text-lg font-bold mb-3"
                  style={{ color: "var(--navy)", fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-body)", fontFamily: "'Inter', sans-serif" }}>
                  {item.desc}
                </p>
                <p className="text-xs leading-relaxed mb-5" style={{ color: "var(--text-muted)", fontFamily: "'Inter', sans-serif", fontStyle: "italic" }}>
                  {item.detail}
                </p>
                <div className="mt-auto">
                  <Link href={item.link}>
                    <span
                      className="inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer"
                      style={{ color: "var(--gold)", fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {item.linkLabel} <ArrowRight size={14} />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
