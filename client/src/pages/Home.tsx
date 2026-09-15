import { useEffect } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { updateMetaTags } from "@/lib/meta";
import { trackButtonClick } from "@/lib/analytics";
import { ArrowRight, Star, Shield, Users, Calendar, Clock, Video, Sparkles } from "lucide-react";
import "./HomeEditorial.css";

const WHOP_CHECKOUT_URL = "https://whop.com/checkout/plan_JkSf0M7mT7mrA";

export default function Home() {
  useEffect(() => {
    updateMetaTags({
      title: "Gift of Trading: Stock & Options Trading Academy by Sounia Gill",
      description: "Learn to read the market at your own pace with beginner-friendly stock and options trading education by Sounia Gill. Ethical, structured, and zero-jargon.",
      keywords: "trading education, stock market, options trading, beginner trading, Sounia Gill, learn to invest, trading webinars",
      ogTitle: "Gift of Trading: Stock & Options Trading Academy by Sounia Gill",
      ogDescription: "Learn to read the market at your own pace with beginner-friendly stock and options trading education by Sounia Gill.",
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
              <Link href="/beyond-9-to-5">
                <div
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all hover:scale-105 mb-4"
                  style={{
                    background: "rgba(212, 175, 55, 0.2)",
                    border: "1px solid rgba(212, 175, 55, 0.55)",
                    color: "#E5B84A",
                    letterSpacing: "0.05em",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                  }}
                  onClick={() => trackButtonClick("home_hero_event_pill")}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  FREE LIVE SESSION • SEPT 30: BEYOND 9 TO 5
                  <ArrowRight size={13} />
                </div>
              </Link>

              <span className="hero-banner-eyebrow">LEARN, PRACTICE, TRADE, GROW</span>
              <h1 className="hero-banner-title">
                Learn to read the<br />
                market, <em className="gold-italic">at your own</em><br />
                pace.
              </h1>
              <p className="hero-banner-desc">
                Beginner-friendly stock and options education taught step by step by Sounia Gill. No experience needed — start exactly where you are.
              </p>

              <div className="hero-banner-actions">
                <a
                  href={WHOP_CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-banner-gold cursor-pointer"
                  onClick={() => trackButtonClick("hero_banner_reserve_spot")}
                >
                  RESERVE MY FREE SPOT <ArrowRight size={16} />
                </a>
                <Link href="/beyond-9-to-5">
                  <span
                    className="cursor-pointer font-medium text-sm text-white/90 hover:text-white transition-colors underline underline-offset-4"
                    style={{ padding: "12px 18px" }}
                    onClick={() => trackButtonClick("hero_banner_session_details")}
                  >
                    Event Details
                  </span>
                </Link>
              </div>
            </div>

            <div className="hero-desk-quote">
              A LITTLE LEARNING. A NEW PERSPECTIVE.
            </div>
          </div>
        </section>

        {/* ── FEATURED EVENT: BEYOND 9 TO 5 ── */}
        <section
          style={{
            background: "linear-gradient(180deg, #091C2D 0%, #06111D 100%)",
            borderTop: "2px solid rgba(212, 175, 55, 0.4)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            padding: "54px 20px",
            color: "#FFFFFF",
          }}
        >
          <div className="editorial-wrap" style={{ maxWidth: "1080px", margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "36px",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "rgba(212, 175, 55, 0.15)",
                    border: "1px solid rgba(212, 175, 55, 0.4)",
                    borderRadius: "9999px",
                    padding: "4px 14px",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#E5B84A",
                    marginBottom: "14px",
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  UPCOMING FREE LIVE SESSION
                </div>

                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: "6px",
                  }}
                >
                  BEYOND 9 TO 5 BY SOUNIA
                </p>

                <h2
                  style={{
                    fontFamily: "'Newsreader', Georgia, serif",
                    fontSize: "clamp(32px, 4.5vw, 44px)",
                    fontWeight: 500,
                    lineHeight: 1.15,
                    color: "#FFFFFF",
                    marginBottom: "12px",
                  }}
                >
                  Build. Trade. Create.{" "}
                  <em style={{ fontStyle: "italic", color: "#E5B84A" }}>Grow.</em>
                </h2>

                <p
                  style={{
                    fontSize: "15px",
                    color: "rgba(255, 255, 255, 0.8)",
                    lineHeight: 1.6,
                    marginBottom: "20px",
                  }}
                >
                  Join Sonia Gill from Gift of Trading for a <strong>FREE live session</strong> about exploring trading and side-hustle opportunities beyond your traditional 9-to-5.
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "14px",
                    fontSize: "13px",
                    marginBottom: "26px",
                  }}
                >
                  <span className="inline-flex items-center gap-1.5" style={{ color: "#E5B84A" }}>
                    <Calendar size={15} /> Sept 30, 2026
                  </span>
                  <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>•</span>
                  <span className="inline-flex items-center gap-1.5 text-white/90">
                    <Clock size={15} style={{ color: "#E5B84A" }} /> 5:00 PM Pacific Time
                  </span>
                  <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>•</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <Video size={15} /> 100% Free
                  </span>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}>
                  <a
                    href={WHOP_CHECKOUT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-banner-gold"
                    style={{
                      fontSize: "15px",
                      padding: "14px 28px",
                      borderRadius: "6px",
                      fontWeight: 700,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    onClick={() => trackButtonClick("home_featured_reserve_spot")}
                  >
                    RESERVE MY FREE SPOT <ArrowRight size={17} />
                  </a>

                  <Link href="/beyond-9-to-5">
                    <span
                      className="cursor-pointer text-sm font-semibold transition-colors underline underline-offset-4"
                      style={{ color: "#E5B84A" }}
                      onClick={() => trackButtonClick("home_featured_details")}
                    >
                      View Session Agenda & Details →
                    </span>
                  </Link>
                </div>
              </div>

              {/* 4 Pillars preview */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                }}
              >
                {[
                  { title: "Trading", desc: "Foundational rules for additional income skills." },
                  { title: "Side Hustles", desc: "Leveraging skills outside your traditional job." },
                  { title: "Mindset", desc: "Psychology & thinking beyond a single paycheck." },
                  { title: "Next Steps", desc: "Concrete roadmap you can implement right away." },
                ].map((pill, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(212, 175, 55, 0.2)",
                      borderRadius: "10px",
                      padding: "16px 14px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Newsreader', Georgia, serif",
                        fontSize: "17px",
                        fontWeight: 600,
                        color: "#E5B84A",
                        marginBottom: "4px",
                      }}
                    >
                      {pill.title}
                    </div>
                    <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.4 }}>
                      {pill.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: THE TEACHER STORY ── */}
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

        {/* ── SECTION 3: STUDENT TESTIMONIALS ── */}
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
                <span className="btn-editorial-outline">
                  Read More Student Stories <ArrowRight size={15} />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: FAQS ── */}
        <section id="faq" className="editorial-section" style={{ background: "var(--e-paper)", borderTop: "1px solid var(--e-line)" }}>
          <div className="editorial-wrap">
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
              <p className="section-label-gold">Common Inquiries</p>
              <h2 className="section-title-large">Frequently asked questions</h2>
              <p className="section-subtitle" style={{ margin: "0 auto" }}>
                Everything you need to know about our trading education, pacing, and approach.
              </p>
            </div>

            <div className="faq-wrap">
              <details className="faq-detail">
                <summary>Are the sessions self-paced or live?</summary>
                <div className="faq-answer">
                  We offer a combination of self-paced on-demand curriculum and interactive live market sessions, allowing you to learn structured theory at your own pace and observe live market execution.
                </div>
              </details>

              <details className="faq-detail">
                <summary>What if I have never traded a stock in my life?</summary>
                <div className="faq-answer">
                  All teaching begins from square one. We assume zero prior finance knowledge, starting with how brokerages work, what a share is, and how to read basic price charts before progressing to advanced setups.
                </div>
              </details>

              <details className="faq-detail">
                <summary>Which brokerages or platforms do you teach?</summary>
                <div className="faq-answer">
                  We provide step-by-step guidance for Interactive Brokers (IBKR), Webull, and TradingView so you can easily analyze charts and execute orders from anywhere in the world.
                </div>
              </details>

              <details className="faq-detail">
                <summary>How can I get started or ask questions?</summary>
                <div className="faq-answer">
                  Reach out directly via our Contact page or join one of our upcoming live webinars. Sounia and the team will help you determine the best path forward for your experience level.
                </div>
              </details>

              <details className="faq-detail">
                <summary>Do you offer 1-on-1 mentorship or coaching?</summary>
                <div className="faq-answer">
                  Yes, personalized 1-on-1 coaching and private sessions are available. Contact us directly to inquire about scheduling and availability.
                </div>
              </details>

              <details className="faq-detail">
                <summary>Do you offer investment or financial advice?</summary>
                <div className="faq-answer">
                  No. All content, webinars, and educational materials are provided strictly for educational purposes. We teach technical analysis frameworks and market mechanics so you can make informed decisions independently.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: FINANCIAL RISK DISCLAIMER ── */}
        <section className="editorial-wrap" style={{ paddingBottom: 70 }}>
          <div className="disclaimer-box">
            <p>
              <strong>Educational & Financial Disclaimer:</strong> Gift of Trading and Sounia Gill provide financial education, technical chart analysis training, and educational commentary only. We are not registered investment advisers, broker-dealers, or financial planners. Trading securities, equities, and options carries substantial risk of capital loss and is not suitable for all investors. Past performance is no guarantee of future returns. You alone are responsible for evaluating your risk tolerance and personal investment decisions.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
