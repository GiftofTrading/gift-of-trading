import { useEffect } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { updateMetaTags } from "@/lib/meta";
import { trackButtonClick } from "@/lib/analytics";
import { ArrowRight, Star, Shield, Users } from "lucide-react";
import "./HomeEditorial.css";

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
                <Link href="/contact">
                  <span
                    className="btn-banner-gold cursor-pointer"
                    onClick={() => trackButtonClick("hero_banner_contact")}
                  >
                    Get In Touch <ArrowRight size={16} />
                  </span>
                </Link>
                <Link href="/about">
                  <span
                    className="cursor-pointer font-medium text-sm text-white/90 hover:text-white transition-colors underline underline-offset-4"
                    style={{ padding: "12px 18px" }}
                    onClick={() => trackButtonClick("hero_banner_about")}
                  >
                    About Sounia
                  </span>
                </Link>
              </div>
            </div>

            <div className="hero-desk-quote">
              A LITTLE LEARNING. A NEW PERSPECTIVE.
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
