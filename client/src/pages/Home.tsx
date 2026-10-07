import { useState, useEffect } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { updateMetaTags } from "@/lib/meta";
import { trackButtonClick } from "@/lib/analytics";
import {
  ArrowRight,
  Star,
  Shield,
  Users,
  CheckCircle2,
  Sparkles,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import { WaitlistModal } from "@/components/WaitlistModal";
import "./HomeEditorial.css";

export default function Home() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("Beginner Options Course with Strategy");

  useEffect(() => {
    updateMetaTags({
      title: "Gift of Trading — Stock & Options Education by Sounia Gill",
      description:
        "Learn to read the market with discipline. Beginner Options Course with Strategy and Long Term Investing Course now open for waitlist. Price: TBD.",
      keywords:
        "Gift of Trading, Sounia Gill, Beginner Options Course with Strategy, Long Term Investing Course, stock market education, options trading, priority waitlist",
      ogTitle: "Gift of Trading — Courses & Priority Waitlist with Sounia Gill",
      ogDescription:
        "Beginner Options Course with Strategy & Long Term Investing Course. Open for priority waitlist (Price: TBD).",
      ogImage: "https://giftoftrading.com/images/gift-logo_e37ab5cd.png",
      canonicalUrl: "https://giftoftrading.com/",
    });
  }, []);

  return (
    <Layout>
      <div className="editorial-body">
        {/* ── SECTION 1: HERO BANNER ── */}
        <section
          className="hero-banner-strip-container"
          style={{ backgroundImage: `url('/images/hero-trading-desk.jpg')` }}
        >
          <div className="hero-banner-overlay" />

          {/* Content & Desk Quote */}
          <div className="hero-banner-body">
            <div className="hero-banner-left">
              {/* Event Announcement Badge */}
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-4"
                style={{
                  background: "rgba(212, 175, 55, 0.22)",
                  border: "1px solid rgba(212, 175, 55, 0.55)",
                  color: "#E5B84A",
                  letterSpacing: "0.08em",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                }}
              >
                <Sparkles size={13} className="text-[#E5B84A]" />
                NEW COURSES • WAITLIST NOW OPEN
              </div>

              <span className="hero-banner-eyebrow">GIFT OF TRADING ACADEMY</span>
              <h1 className="hero-banner-title">
                Learn to read the market,<br />
                <em className="gold-italic">at your own</em> pace.
              </h1>

              <p className="hero-banner-desc">
                Beginner-friendly stock and options education taught step by step by <strong>Sounia Gill</strong>. No experience needed — start exactly where you are.
              </p>

              {/* Highlights Strip */}
              <div
                style={{
                  display: "inline-flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "12px",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.16)",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontSize: "13px",
                  color: "#FFFFFF",
                  marginBottom: "22px",
                }}
              >
                <span className="inline-flex items-center gap-1.5" style={{ color: "#E5B84A", fontWeight: 600 }}>
                  <BookOpen size={14} /> Options & Investing
                </span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>•</span>
                <span className="inline-flex items-center gap-1.5 text-white/90">
                  <Sparkles size={14} style={{ color: "#E5B84A" }} /> 100% Pre-Recorded
                </span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>•</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                  Price: TBD
                </span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>•</span>
                <span className="inline-flex items-center gap-1.5 text-white/90">
                  <Users size={14} style={{ color: "#E5B84A" }} /> Learn At Your Own Pace
                </span>
              </div>

              <div className="hero-banner-actions">
                <a
                  href="#courses"
                  className="btn-banner-gold cursor-pointer"
                  style={{
                    fontSize: "14px",
                    padding: "14px 28px",
                    fontWeight: 700,
                    letterSpacing: "0.03em",
                  }}
                  onClick={() => trackButtonClick("home_hero_explore_courses")}
                >
                  VIEW COURSES <ArrowRight size={17} />
                </a>
                <button
                  onClick={() => {
                    setSelectedCourse("Beginner Options Course with Strategy");
                    setWaitlistOpen(true);
                    trackButtonClick("home_hero_join_waitlist");
                  }}
                  className="cursor-pointer font-bold text-xs uppercase tracking-wider text-white hover:text-[#E5B84A] transition-colors px-4 py-3 rounded-lg border border-white/20 hover:border-[#D4AF37] bg-white/5 backdrop-blur-sm"
                >
                  Join Waitlist (Price: TBD) →
                </button>
              </div>
            </div>

            <div className="hero-desk-quote">
              CLARITY BEFORE CAPITAL • DISCIPLINE OVER IMPULSE
            </div>
          </div>
        </section>

        {/* ── SECTION 2: FEATURED COURSES & WAITLIST ── */}
        <section id="courses" className="editorial-section" style={{ background: "#FFFFFF", padding: "75px 20px" }}>
          <div className="editorial-wrap">
            <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#D4AF37]/15 text-[#9C6B14] border border-[#D4AF37]/35 mb-3 uppercase tracking-wider">
                <Sparkles size={13} />
                100% PRE-RECORDED VIDEO COURSES
              </div>
              <h2 className="section-title-large" style={{ marginBottom: "14px" }}>
                Pre-Recorded Courses • Learn at Your Own Pace
              </h2>
              <p className="section-subtitle" style={{ margin: "0 auto", fontSize: "16px", color: "var(--e-muted)" }}>
                All classes are completely pre-recorded video modules — no live classes and no Q&amp;A sessions. Watch on demand, rewatch anytime, and learn at your own pace without scheduling constraints. Join the priority waitlist to secure early access and special early-bird tuition.
              </p>
            </div>

            {/* Courses 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Course 1: Beginner Options Course with Strategy */}
              <div className="bg-[#FAF9F6] border-2 border-[#D4AF37]/50 rounded-2xl p-7 lg:p-9 flex flex-col justify-between shadow-md hover:shadow-xl transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

                <div>
                  {/* Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-500/15 text-emerald-800 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      100% RECORDED • WAITLIST OPEN
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#D4AF37]/20 text-[#9C6B14] border border-[#D4AF37]/40">
                      PRICE: TBD
                    </span>
                  </div>

                  <h3
                    className="text-2xl lg:text-3xl font-bold text-[#0B1E33] mb-3 group-hover:text-[#9C6B14] transition-colors"
                    style={{ fontFamily: "'Newsreader', Georgia, serif" }}
                  >
                    Beginner Options Course with Strategy
                  </h3>

                  <p className="text-sm text-[#5B6472] leading-relaxed mb-6">
                    A comprehensive, pre-recorded options curriculum tailored for beginners. Master calls, puts, and defined-risk spread strategies at your own speed — without live scheduling pressure or speculative guesswork.
                  </p>

                  {/* Highlights Box */}
                  <div className="bg-white border border-[#E5E2D9] rounded-xl p-5 mb-6 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0B1E33] flex items-center gap-1.5">
                      <BookOpen size={14} className="text-[#9C6B14]" />
                      What You'll Master:
                    </div>
                    <ul className="space-y-2 text-xs text-[#0B1E33]">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-[#2E6B47] shrink-0 mt-0.5" />
                        <span><strong>100% Pre-Recorded Video:</strong> Learn at your own pace with unlimited on-demand rewatches (no live classes, no Q&amp;A).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-[#2E6B47] shrink-0 mt-0.5" />
                        <span><strong>Options Fundamentals:</strong> Calls, puts, strike prices, expiration dates & exercise mechanics.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-[#2E6B47] shrink-0 mt-0.5" />
                        <span><strong>Defined-Risk Strategies:</strong> Credit spreads, covered calls, and cash-secured puts.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-[#2E6B47] shrink-0 mt-0.5" />
                        <span><strong>Risk Containment:</strong> Position sizing frameworks and strict maximum loss caps.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-[#2E6B47] shrink-0 mt-0.5" />
                        <span><strong>Brokerage Execution:</strong> Step-by-step order entry walkthrough recordings on IBKR and Webull.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-[#2E6B47] shrink-0 mt-0.5" />
                        <span><strong>Recorded Case Studies:</strong> Real-market chart breakdowns analyzed step-by-step by Sounia.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Footer / CTA */}
                <div className="pt-4 border-t border-[#E5E2D9] space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-xs text-[#5B6472] uppercase font-semibold">Course Tuition</div>
                      <div className="text-2xl font-bold text-[#0B1E33]" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                        Price: TBD
                      </div>
                    </div>
                    <span className="text-[11px] text-[#9C6B14] font-medium bg-[#FDF6E8] px-2.5 py-1 rounded border border-[#D4AF37]/30">
                      Early-bird rate on waitlist
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCourse("Beginner Options Course with Strategy");
                      setWaitlistOpen(true);
                      trackButtonClick("home_card_options_waitlist");
                    }}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-[#091C2D] bg-[#D4AF37] hover:bg-[#E5C358] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    JOIN WAITLIST — PRICE: TBD <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Course 2: Long Term Investing Course */}
              <div className="bg-[#FAF9F6] border-2 border-[#D4AF37]/50 rounded-2xl p-7 lg:p-9 flex flex-col justify-between shadow-md hover:shadow-xl transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#2E6B47]/10 rounded-full blur-2xl pointer-events-none" />

                <div>
                  {/* Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-500/15 text-emerald-800 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      100% RECORDED • WAITLIST OPEN
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#D4AF37]/20 text-[#9C6B14] border border-[#D4AF37]/40">
                      PRICE: TBD
                    </span>
                  </div>

                  <h3
                    className="text-2xl lg:text-3xl font-bold text-[#0B1E33] mb-3 group-hover:text-[#9C6B14] transition-colors"
                    style={{ fontFamily: "'Newsreader', Georgia, serif" }}
                  >
                    Long Term Investing Course
                  </h3>

                  <p className="text-sm text-[#5B6472] leading-relaxed mb-6">
                    A self-paced, pre-recorded video masterclass engineered to help you compound wealth across all market cycles. Learn fundamental stock screening, index allocation, and dividend growth on your own schedule.
                  </p>

                  {/* Highlights Box */}
                  <div className="bg-white border border-[#E5E2D9] rounded-xl p-5 mb-6 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0B1E33] flex items-center gap-1.5">
                      <TrendingUp size={14} className="text-[#2E6B47]" />
                      What You'll Master:
                    </div>
                    <ul className="space-y-2 text-xs text-[#0B1E33]">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-[#2E6B47] shrink-0 mt-0.5" />
                        <span><strong>100% Pre-Recorded Video:</strong> Complete self-paced access to all video lessons with zero scheduling conflicts or live Q&amp;A.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-[#2E6B47] shrink-0 mt-0.5" />
                        <span><strong>Fundamental Valuation:</strong> Reading corporate balance sheets, cash flows, and P/E ratios.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-[#2E6B47] shrink-0 mt-0.5" />
                        <span><strong>Portfolio Architecture:</strong> Index ETFs vs. individual equities for reliable compound growth.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-[#2E6B47] shrink-0 mt-0.5" />
                        <span><strong>Disciplined Dollar-Cost Averaging:</strong> Systematic rebalancing rules without timing anxiety.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-[#2E6B47] shrink-0 mt-0.5" />
                        <span><strong>Tax-Advantaged Compounding:</strong> Structuring TFSA, RRSP, 401(k), and dividend reinvestments.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-[#2E6B47] shrink-0 mt-0.5" />
                        <span><strong>Investor Psychology:</strong> Surviving market drawdowns calmly and capitalizing on bear markets.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Footer / CTA */}
                <div className="pt-4 border-t border-[#E5E2D9] space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-xs text-[#5B6472] uppercase font-semibold">Course Tuition</div>
                      <div className="text-2xl font-bold text-[#0B1E33]" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                        Price: TBD
                      </div>
                    </div>
                    <span className="text-[11px] text-[#9C6B14] font-medium bg-[#FDF6E8] px-2.5 py-1 rounded border border-[#D4AF37]/30">
                      Early-bird rate on waitlist
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCourse("Long-Term Investing Course");
                      setWaitlistOpen(true);
                      trackButtonClick("home_card_investing_waitlist");
                    }}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-[#091C2D] bg-[#D4AF37] hover:bg-[#E5C358] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    JOIN WAITLIST — PRICE: TBD <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: THE TEACHER STORY ── */}
        <section id="teacher" className="editorial-section" style={{ background: "var(--e-paper)" }}>
          <div className="editorial-wrap">
            <div className="teacher-grid">
              <div>
                <p className="section-label-gold">The Teacher</p>
                <h2 className="section-title-large">
                  From learning alone to teaching thousands.
                </h2>
                <p className="body-text" style={{ fontSize: "16px", color: "var(--e-muted)", marginBottom: "18px" }}>
                  Sounia Gill didn't come from a Wall Street background. She learned by reading charts late at night, making mistakes, and refining rules until the market stopped feeling unpredictable.
                </p>
                <p className="body-text" style={{ fontSize: "16px", color: "var(--e-muted)", marginBottom: "22px" }}>
                  Today, she teaches students across the United States, Canada, and beyond—not with get-rich-quick promises, but with repeatable frameworks and emotional discipline.
                </p>

                <div className="teacher-credentials">
                  <span className="credential-badge">
                    <Users size={14} style={{ color: "var(--e-gold)" }} /> 2,700+ Students Taught
                  </span>
                  <span className="credential-badge">
                    <Star size={14} style={{ color: "var(--e-gold)" }} /> 4.96 / 5 Rating
                  </span>
                  <span className="credential-badge">
                    <Shield size={14} style={{ color: "var(--e-gold)" }} /> Zero Jargon Framework
                  </span>
                </div>
              </div>

              <div className="teacher-photo-card">
                <img
                  src="/images/sounia-desk.jpg"
                  alt="Sounia Gill at trading desk"
                  loading="lazy"
                />
                <div className="teacher-quote-box">
                  "The goal isn't to be right on every trade. The goal is to survive every loss and let the math work for you."
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: STUDENT TESTIMONIALS ── */}
        <section id="testimonials" className="editorial-section" style={{ background: "#FFFFFF", borderTop: "1px solid var(--e-line)" }}>
          <div className="editorial-wrap">
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
              <p className="section-label-gold">Student Experiences</p>
              <h2 className="section-title-large">Real students. Real discipline.</h2>
              <p className="section-subtitle" style={{ margin: "0 auto" }}>
                Gift of Trading has taught over 2,700 students how to navigate the markets with calm, structured decision-making.
              </p>
            </div>

            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div>
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="var(--e-gold)" stroke="none" />
                    ))}
                  </div>
                  <p className="testimonial-quote">
                    "I had tried three different learning resources before finding Sounia. Her approach is completely different—she actually explains the *why* behind every chart pattern rather than just telling you what to buy."
                  </p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">MJ</div>
                  <div>
                    <h4 className="author-name">Marcus J.</h4>
                    <p className="author-detail">Trading Student • Calgary, AB</p>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div>
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="var(--e-gold)" stroke="none" />
                    ))}
                  </div>
                  <p className="testimonial-quote">
                    "As someone working a full-time job, I couldn't sit at a screen all day. Sounia taught me how to trade end-of-day charts with strict risk rules. Finally feel in control."
                  </p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">PR</div>
                  <div>
                    <h4 className="author-name">Priya R.</h4>
                    <p className="author-detail">Options Student • Seattle, WA</p>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div>
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="var(--e-gold)" stroke="none" />
                    ))}
                  </div>
                  <p className="testimonial-quote">
                    "The options framework alone saved me from a massive drawdown during earnings season. Sounia's emphasis on capital preservation is invaluable."
                  </p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">DK</div>
                  <div>
                    <h4 className="author-name">David K.</h4>
                    <p className="author-detail">Trading Student • Toronto, ON</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: 40 }}>
              <Link href="/success-stories">
                <span className="btn-editorial-outline cursor-pointer">
                  Read More Student Stories <ArrowRight size={15} />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: FAQS ── */}
        <section id="faq" className="editorial-section" style={{ background: "var(--e-paper)", borderTop: "1px solid var(--e-line)" }}>
          <div className="editorial-wrap" style={{ maxWidth: 780 }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <p className="section-label-gold">Common Inquiries</p>
              <h2 className="section-title-large">Frequently Asked Questions</h2>
              <p className="section-subtitle" style={{ margin: "0 auto" }}>
                Everything you need to know about upcoming pre-recorded video courses and waitlist enrollment.
              </p>
            </div>

            <div className="faq-wrap">
              <details className="faq-detail" open>
                <summary>Are these classes recorded or live? Is there a Q&amp;A?</summary>
                <div className="faq-answer">
                  All lessons in both courses are <strong>100% pre-recorded video classes</strong>. There are <strong>no live sessions and no live Q&amp;A</strong>. The curriculum is designed so you can learn entirely at your own pace, on your own schedule, with unlimited rewatches anytime you need.
                </div>
              </details>

              <details className="faq-detail">
                <summary>What is the price of the courses?</summary>
                <div className="faq-answer">
                  Pricing for both the Beginner Options Course with Strategy and the Long Term Investing Course is currently <strong>Price: TBD</strong> (To Be Determined). Joining the priority waitlist is 100% free and gives you first access to discounted early-bird tuition when the pre-recorded video modules are released.
                </div>
              </details>

              <details className="faq-detail">
                <summary>Who is the Beginner Options Course with Strategy for?</summary>
                <div className="faq-answer">
                  This course is specifically structured for complete beginners and intermediate traders who want to learn options safely. Sounia teaches defined-risk strategies, position sizing, strike selection, and risk management through detailed recorded walkthroughs without financial jargon.
                </div>
              </details>

              <details className="faq-detail">
                <summary>What will I learn in the Long Term Investing Course?</summary>
                <div className="faq-answer">
                  The Long Term Investing Course teaches you how to build a durable, compounding investment portfolio across stocks and index ETFs. Through pre-recorded modules, you will master fundamental company evaluation, dollar-cost averaging, asset allocation, and the psychology to stay calm through market cycles.
                </div>
              </details>

              <details className="faq-detail">
                <summary>Does joining the waitlist obligate me to enroll?</summary>
                <div className="faq-answer">
                  No. Joining the waitlist is completely free, carries zero obligation, and requires no credit card. It simply reserves your priority spot so you get notified first with early-bird access.
                </div>
              </details>

              <details className="faq-detail">
                <summary>Do I need prior trading experience to join?</summary>
                <div className="faq-answer">
                  No prior experience is necessary. All courses are taught from first principles with clear, step-by-step guidance by Sounia Gill.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* ── SECTION 6: FINAL CALL TO ACTION BANNER ── */}
        <section
          style={{
            padding: "85px 20px",
            background: "linear-gradient(180deg, #091C2D 0%, #040C15 100%)",
            textAlign: "center",
            position: "relative",
            color: "#FFFFFF",
          }}
        >
          <div className="editorial-wrap" style={{ maxWidth: "740px", margin: "0 auto" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#E5B84A",
                display: "block",
                marginBottom: "12px",
              }}
            >
              100% PRE-RECORDED VIDEO COURSES
            </span>

            <h2
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 500,
                color: "#FFFFFF",
                lineHeight: 1.15,
                marginBottom: "16px",
              }}
            >
              Ready to Learn the Market at Your Own Pace?
            </h2>

            <p
              style={{
                fontSize: "17px",
                color: "rgba(255, 255, 255, 0.8)",
                lineHeight: 1.6,
                marginBottom: "32px",
              }}
            >
              All classes are completely pre-recorded so you can learn on your own schedule with zero live classes, no Q&amp;A sessions, and unlimited on-demand rewatches. Join the priority waitlist today to lock in early-bird tuition (Price: TBD).
            </p>

            <button
              onClick={() => {
                setSelectedCourse("Beginner Options Course with Strategy");
                setWaitlistOpen(true);
                trackButtonClick("home_bottom_join_waitlist");
              }}
              className="btn-banner-gold cursor-pointer"
              style={{
                fontSize: "16px",
                padding: "18px 42px",
                borderRadius: "8px",
                fontWeight: 700,
                letterSpacing: "0.03em",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 8px 32px rgba(212, 168, 71, 0.45)",
              }}
            >
              JOIN THE WAITLIST (PRICE: TBD) <ArrowRight size={20} />
            </button>

            <p
              style={{
                fontSize: "13px",
                color: "rgba(255, 255, 255, 0.5)",
                marginTop: "18px",
              }}
            >
              Zero spam • No credit card required • Unsubscribe anytime
            </p>
          </div>
        </section>

        {/* ── SECTION 7: FINANCIAL RISK DISCLAIMER ── */}
        <section className="editorial-wrap" style={{ padding: "50px 24px 70px" }}>
          <div className="disclaimer-box">
            <p>
              <strong>Educational & Financial Disclaimer:</strong> Gift of Trading and Sounia Gill provide financial education, technical chart analysis training, and educational commentary only. We are not registered investment advisers, broker-dealers, or financial planners. Trading securities, equities, and options carries substantial risk of capital loss and is not suitable for all investors. Past performance is no guarantee of future returns. You alone are responsible for evaluating your risk tolerance and personal investment decisions.
            </p>
          </div>
        </section>
      </div>

      <WaitlistModal
        open={waitlistOpen}
        onOpenChange={setWaitlistOpen}
        defaultCourse={selectedCourse}
      />
    </Layout>
  );
}

