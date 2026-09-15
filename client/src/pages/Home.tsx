import { useEffect } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { updateMetaTags, addJsonLdSchema, createEventSchema } from "@/lib/meta";
import { trackButtonClick } from "@/lib/analytics";
import {
  ArrowRight,
  Star,
  Shield,
  Users,
  Calendar,
  Clock,
  Video,
} from "lucide-react";
import "./HomeEditorial.css";

const WHOP_CHECKOUT_URL = "https://whop.com/checkout/plan_JkSf0M7mT7mrA";
const EVENT_DATE = new Date("2026-09-30T17:00:00-07:00");

export default function Home() {
  useEffect(() => {
    updateMetaTags({
      title: "Beyond 9 to 5 By Sounia — FREE Live Session | Gift of Trading",
      description:
        "Join Sonia Gill from Gift of Trading on September 30, 2026 at 5:00 PM Pacific for a FREE live session about exploring trading and side-hustle opportunities beyond your traditional 9-to-5.",
      keywords:
        "Beyond 9 to 5, Sonia Gill, Sounia Gill, Gift of Trading, free live session, trading education, stock market, options trading, beginner trading",
      ogTitle: "Beyond 9 to 5 By Sounia — FREE Live Session with Sonia Gill",
      ogDescription:
        "Build. Trade. Create. Grow. Reserve your free spot for September 30, 2026 at 5:00 PM Pacific Time.",
      ogImage: "https://giftoftrading.com/images/gift-logo_e37ab5cd.png",
      canonicalUrl: "https://giftoftrading.com/",
    });

    const eventSchema = createEventSchema({
      name: "Beyond 9 to 5 By Sounia",
      description:
        "Join Sonia Gill from Gift of Trading for a FREE live session about exploring trading and side-hustle opportunities beyond your traditional 9-to-5.",
      startDate: EVENT_DATE.toISOString(),
      url: "https://giftoftrading.com/",
      organizer: "Sonia Gill | Gift of Trading",
    });
    addJsonLdSchema(eventSchema);
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
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                FREE LIVE ONLINE SESSION
              </div>

              <span className="hero-banner-eyebrow">BEYOND 9 TO 5 BY SOUNIA</span>
              <h1 className="hero-banner-title">
                Build. Trade. Create.<br />
                <em className="gold-italic">Grow.</em>
              </h1>

              <p className="hero-banner-desc">
                Join Sonia Gill from Gift of Trading for a <strong>FREE live session</strong> about exploring trading and side-hustle opportunities beyond your traditional 9-to-5.
              </p>

              {/* Date & Time Highlights Strip */}
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
                  <Calendar size={14} /> Sept 30, 2026
                </span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>•</span>
                <span className="inline-flex items-center gap-1.5 text-white/90">
                  <Clock size={14} style={{ color: "#E5B84A" }} /> 5:00 PM Pacific Time (Vancouver)
                </span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>•</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Video size={14} /> 100% Free
                </span>
              </div>

              <div className="hero-banner-actions">
                <a
                  href={WHOP_CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-banner-gold cursor-pointer"
                  style={{
                    fontSize: "15px",
                    padding: "15px 32px",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                  }}
                  onClick={() => trackButtonClick("home_hero_reserve_spot")}
                >
                  RESERVE MY FREE SPOT <ArrowRight size={17} />
                </a>
                <Link href="/beyond-9-to-5">
                  <span
                    className="cursor-pointer font-medium text-sm text-white/90 hover:text-white transition-colors underline underline-offset-4"
                    style={{ padding: "12px 18px" }}
                    onClick={() => trackButtonClick("home_hero_explore_link")}
                  >
                    What You'll Explore →
                  </span>
                </Link>
              </div>
            </div>

            <div className="hero-desk-quote">
              SEPTEMBER 30, 2026 • 5:00 PM PACIFIC TIME
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

        {/* ── SECTION 5: STUDENT TESTIMONIALS ── */}
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

        {/* ── SECTION 6: FAQS ── */}
        <section id="faq" className="editorial-section" style={{ background: "var(--e-paper)", borderTop: "1px solid var(--e-line)" }}>
          <div className="editorial-wrap" style={{ maxWidth: 780 }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <p className="section-label-gold">Common Inquiries</p>
              <h2 className="section-title-large">Frequently Asked Questions</h2>
              <p className="section-subtitle" style={{ margin: "0 auto" }}>
                Everything you need to know about the upcoming live session.
              </p>
            </div>

            <div className="faq-wrap">
              <details className="faq-detail">
                <summary>Is the session free?</summary>
                <div className="faq-answer">
                  Yes. Beyond 9 to 5 is a FREE live session. There is no cost, no credit card required, and no hidden obligation to attend.
                </div>
              </details>

              <details className="faq-detail">
                <summary>Do I need trading experience?</summary>
                <div className="faq-answer">
                  No. The session is designed to be fully accessible to complete beginners. Sonia breaks down concepts into simple, everyday language without complex financial jargon.
                </div>
              </details>

              <details className="faq-detail">
                <summary>When is the session?</summary>
                <div className="faq-answer">
                  September 30, 2026 at 5:00 PM Pacific Time (Vancouver time). We recommend adding it to your calendar immediately after registering.
                </div>
              </details>

              <details className="faq-detail">
                <summary>How do I attend?</summary>
                <div className="faq-answer">
                  Register through the link to reserve your spot on Whop. Your access link and calendar invitation will be provided immediately upon reserving your spot.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* ── SECTION 7: FINAL CALL TO ACTION BANNER ── */}
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
              LIMITED LIVE CAPACITY
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
              Ready to Explore What’s Possible Beyond 9 to 5?
            </h2>

            <p
              style={{
                fontSize: "17px",
                color: "rgba(255, 255, 255, 0.8)",
                lineHeight: 1.6,
                marginBottom: "32px",
              }}
            >
              Seats for the live interactive Q&A are limited. Click below to lock in your free spot on Whop today.
            </p>

            <a
              href={WHOP_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-banner-gold"
              style={{
                fontSize: "18px",
                padding: "20px 48px",
                borderRadius: "8px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 8px 32px rgba(212, 168, 71, 0.5)",
              }}
              onClick={() => trackButtonClick("home_bottom_reserve_spot")}
            >
              RESERVE MY FREE SPOT <ArrowRight size={22} />
            </a>

            <p
              style={{
                fontSize: "13px",
                color: "rgba(255, 255, 255, 0.5)",
                marginTop: "18px",
              }}
            >
              September 30, 2026 | 5:00 PM Pacific Time | Free Registration via Whop
            </p>
          </div>
        </section>

        {/* ── SECTION 8: FINANCIAL RISK DISCLAIMER ── */}
        <section className="editorial-wrap" style={{ padding: "50px 24px 70px" }}>
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
