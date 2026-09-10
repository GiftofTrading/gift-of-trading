import { useState, useEffect } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { updateMetaTags } from "@/lib/meta";
import { trackButtonClick } from "@/lib/analytics";
import { trpc } from "@/lib/trpc";
import { ArrowRight, ArrowUpRight, Star, CheckCircle, Shield, Users, Sparkles } from "lucide-react";
import "./HomeEditorial.css";

export default function Home() {
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [selectedCourseTitle, setSelectedCourseTitle] = useState("All Upcoming Courses & Sessions (Recommended)");
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifyName, setNotifyName] = useState("");
  const [notifySubmitted, setNotifySubmitted] = useState(false);

  useEffect(() => {
    updateMetaTags({
      title: "Gift of Trading: Stock & Options Trading Academy by Sounia Gill",
      description: "Learn to read the market at your own pace with beginner-friendly stock and options trading courses by Sounia Gill. Join the priority waitlist for upcoming cohorts.",
      keywords: "stock market courses, options trading, beginner trading, Sounia Gill, stock market education, learn to invest, priority waitlist",
      ogTitle: "Gift of Trading: Stock & Options Trading Academy by Sounia Gill",
      ogDescription: "Learn to read the market at your own pace with beginner-friendly stock and options trading courses by Sounia Gill. Join the priority waitlist for upcoming cohorts.",
      canonicalUrl: "https://giftoftrading.com/",
    });
  }, []);

  const handleOpenWaitlistModal = (courseTitle?: string) => {
    if (courseTitle) {
      setSelectedCourseTitle(courseTitle);
    }
    setNotifySubmitted(false);
    setNotifyModalOpen(true);
    trackButtonClick(`waitlist_modal_open_${courseTitle || "generic"}`);
  };

  const handleScrollToWaitlist = (courseTitle?: string) => {
    if (courseTitle) {
      setSelectedCourseTitle(courseTitle);
    }
    const el = document.getElementById("waitlist");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const waitlistMutation = trpc.leads.joinWaitlist.useMutation();

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail) return;
    setNotifySubmitted(true);
    trackButtonClick(`waitlist_submitted_${selectedCourseTitle}`);
    waitlistMutation.mutate({
      name: notifyName.trim() || undefined,
      email: notifyEmail.trim(),
      courseTitle: selectedCourseTitle,
      source: "course-waitlist",
    });
    setTimeout(() => {
      setNotifyModalOpen(false);
      setNotifySubmitted(false);
      setNotifyEmail("");
      setNotifyName("");
    }, 3500);
  };

  return (
    <Layout>
      <div className="editorial-body">
        {/* ── SECTION 1: HERO BANNER ── */}
        <section
          className="hero-banner-strip-container"
          style={{ backgroundImage: `url('/images/hero-trading-desk.jpg')` }}
        >
          <div className="hero-banner-overlay" />

          {/* Top/Left Content & Desk Quote */}
          <div className="hero-banner-body">
            <div className="hero-banner-left">
              <span className="hero-banner-eyebrow">LEARN, PRACTICE, TRADE, GROW</span>
              <h1 className="hero-banner-title">
                Learn to read the<br />
                market, <em className="gold-italic">at your own</em><br />
                pace.
              </h1>
              <p className="hero-banner-desc">
                Beginner-friendly stock and options courses taught step by step by Sounia Gill. No experience needed — start exactly where you are.
              </p>

              <div className="hero-banner-actions">
                <a
                  href="#waitlist"
                  className="btn-banner-gold"
                  onClick={(e) => {
                    e.preventDefault();
                    trackButtonClick("hero_banner_join_waitlist");
                    handleScrollToWaitlist();
                  }}
                >
                  Join Priority Waitlist <ArrowDownOrRight />
                </a>
              </div>
            </div>

            <div className="hero-desk-quote">
              A LITTLE LEARNING. A NEW PERSPECTIVE.
            </div>
          </div>

          {/* Bottom 3-Strip Bar */}
          <div className="hero-bottom-strip">
            <div className="hero-bottom-strip-wrap">
              <div
                className="hero-strip-item"
                onClick={() => {
                  trackButtonClick("hero_strip_stocks");
                  handleScrollToWaitlist("Stock Market Mastery & Wealth Building");
                }}
                role="button"
                tabIndex={0}
              >
                <div>
                  <span className="hero-strip-label">01 / FOUNDATIONS</span>
                  <h3 className="hero-strip-title" style={{ color: "#FFFFFF" }}>Stock market mastery</h3>
                </div>
                <span className="hero-strip-price" style={{ fontSize: "13px", fontWeight: 600, color: "var(--e-gold-light)" }}>
                  Join Waitlist <ArrowUpRight size={15} />
                </span>
              </div>

              <div
                className="hero-strip-item"
                onClick={() => {
                  trackButtonClick("hero_strip_options");
                  handleScrollToWaitlist("Options Trading & Strategy");
                }}
                role="button"
                tabIndex={0}
              >
                <div>
                  <span className="hero-strip-label">02 / STRATEGY</span>
                  <h3 className="hero-strip-title" style={{ color: "#FFFFFF" }}>Options + strategy</h3>
                </div>
                <span className="hero-strip-price" style={{ fontSize: "13px", fontWeight: 600, color: "var(--e-gold-light)" }}>
                  Join Waitlist <ArrowUpRight size={15} />
                </span>
              </div>

              <div
                className="hero-strip-item"
                onClick={() => {
                  trackButtonClick("hero_strip_mentorship");
                  handleScrollToWaitlist("Live Market Sessions & 1-on-1 Coaching");
                }}
                role="button"
                tabIndex={0}
              >
                <div>
                  <span className="hero-strip-label">03 / MENTORSHIP</span>
                  <h3 className="hero-strip-title" style={{ color: "#FFFFFF" }}>Live sessions & 1-on-1</h3>
                </div>
                <span className="hero-strip-price" style={{ fontSize: "13px", fontWeight: 600, color: "var(--e-gold-light)" }}>
                  Join Waitlist <ArrowUpRight size={15} />
                </span>
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

        {/* ── SECTION 3: PRIORITY WAITLIST FOR UPCOMING COURSES & SESSIONS ── */}
        <section id="waitlist" className="editorial-section" style={{ background: "#FFFFFF", borderTop: "1px solid var(--e-line)" }}>
          <div className="editorial-wrap">
            <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 36px" }}>
              <p className="section-label-gold">Priority Access</p>
              <h2 className="section-title-large">Upcoming Courses & Live Trading Sessions</h2>
              <p className="section-subtitle" style={{ margin: "0 auto" }}>
                We are currently preparing our next cohort schedules for stock market programs, advanced options workshops, and live market sessions. Join the priority waitlist below to get early-bird access, schedule announcements, and private registration links before public enrollment opens.
              </p>
            </div>

            {/* Embedded Generic Waitlist Form Card */}
            <div
              style={{
                maxWidth: 680,
                margin: "0 auto",
                background: "var(--e-paper)",
                border: "1px solid var(--e-line)",
                borderRadius: "14px",
                padding: "38px 34px",
                boxShadow: "0 15px 35px rgba(6, 17, 29, 0.05)",
              }}
            >
              {notifySubmitted ? (
                <div style={{ textAlign: "center", padding: "30px 10px" }}>
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: "var(--e-gold-bg)",
                      color: "var(--e-gold)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <CheckCircle size={34} />
                  </div>
                  <h3 style={{ fontSize: "24px", fontWeight: 700, color: "var(--e-navy)", marginBottom: "10px" }}>
                    You're on the priority waitlist!
                  </h3>
                  <p style={{ fontSize: "15px", color: "var(--e-muted)", maxWidth: 460, margin: "0 auto" }}>
                    We've saved your spot for <strong>{selectedCourseTitle}</strong>. We'll email you at <strong>{notifyEmail}</strong> as soon as registration opens.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit}>
                  <div style={{ marginBottom: "18px" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "var(--e-navy)", marginBottom: "8px" }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={notifyName}
                      onChange={(e) => setNotifyName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        border: "1px solid var(--e-line)",
                        background: "#FFFFFF",
                        fontSize: "15px",
                        color: "var(--e-navy)",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "18px" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "var(--e-navy)", marginBottom: "8px" }}>
                      Email Address <span style={{ color: "var(--e-rust)" }}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        border: "1px solid var(--e-line)",
                        background: "#FFFFFF",
                        fontSize: "15px",
                        color: "var(--e-navy)",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "26px" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "var(--e-navy)", marginBottom: "8px" }}>
                      Program of Interest
                    </label>
                    <select
                      value={selectedCourseTitle}
                      onChange={(e) => setSelectedCourseTitle(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        border: "1px solid var(--e-line)",
                        background: "#FFFFFF",
                        fontSize: "15px",
                        color: "var(--e-navy)",
                      }}
                    >
                      <option value="All Upcoming Courses & Sessions (Recommended)">
                        🌟 All Upcoming Courses & Live Sessions (Recommended)
                      </option>
                      <option value="Stock Market Mastery & Wealth Building">
                        📚 Stock Market Mastery & Long-Term Investing
                      </option>
                      <option value="Options Trading & Strategy">
                        ⚡ Options Trading & Defined-Risk Spreads
                      </option>
                      <option value="Live Market Sessions & 1-on-1 Coaching">
                        🎯 Live Trading Workshops & 1-on-1 Mentorship
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn-modal-submit"
                    disabled={waitlistMutation.isPending}
                    style={{ padding: "14px 24px", fontSize: "16px" }}
                  >
                    {waitlistMutation.isPending ? "Securing Your Spot..." : "Join Priority Waitlist"} <ArrowRight size={17} />
                  </button>

                  <p style={{ fontSize: "12px", color: "var(--e-muted)", textAlign: "center", marginTop: "14px" }}>
                    🔒 We respect your privacy. No spam, ever. Unsubscribe at any time.
                  </p>
                </form>
              )}

              {/* 3 Pillars Overview Inside Waitlist Card */}
              <div
                style={{
                  marginTop: "30px",
                  paddingTop: "22px",
                  borderTop: "1px solid var(--e-line)",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "16px",
                  textAlign: "center",
                }}
              >
                <div>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--e-gold)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    2,700+ Students
                  </span>
                  <p style={{ fontSize: "12px", color: "var(--e-muted)", marginTop: "4px" }}>Educated across North America</p>
                </div>
                <div>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--e-gold)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    First Cohort Access
                  </span>
                  <p style={{ fontSize: "12px", color: "var(--e-muted)", marginTop: "4px" }}>Exclusive early-bird invitation</p>
                </div>
                <div>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--e-gold)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Zero Spam
                  </span>
                  <p style={{ fontSize: "12px", color: "var(--e-muted)", marginTop: "4px" }}>Direct updates from Sounia Gill</p>
                </div>
              </div>
            </div>

            {/* Curriculum syllabus link */}
            <div style={{ textAlign: "center", marginTop: 36 }}>
              <Link href="/services">
                <span className="inline-flex items-center gap-2 font-medium text-sm text-[var(--e-navy)] hover:text-[var(--e-gold)] transition-colors underline underline-offset-4 cursor-pointer">
                  Explore our core educational curriculum pillars on the Courses page <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: STUDENT TESTIMONIALS ── */}
        <section id="testimonials" className="editorial-section" style={{ background: "var(--e-paper)", borderTop: "1px solid var(--e-line)" }}>
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
                    "I had tried three different courses before finding Sounia. Her approach is completely different—she actually explains the *why* behind every chart pattern rather than just telling you what to buy."
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
                    "The options framework alone saved me from a massive drawdown during earnings season. Sounia's emphasis on capital preservation is worth 10x the course cost."
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

        {/* ── SECTION 5: FAQS ── */}
        <section id="faq" className="editorial-section" style={{ background: "#FFFFFF", borderTop: "1px solid var(--e-line)" }}>
          <div className="editorial-wrap">
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
              <p className="section-label-gold">Common Inquiries</p>
              <h2 className="section-title-large">Frequently asked questions</h2>
              <p className="section-subtitle" style={{ margin: "0 auto" }}>
                Everything you need to know about upcoming courses, pacing, and learning format.
              </p>
            </div>

            <div className="faq-wrap">
              <details className="faq-detail">
                <summary>Are the programs self-paced or live?</summary>
                <div className="faq-answer">
                  We offer a combination of self-paced on-demand video curriculum and interactive live market sessions, allowing you to learn structured theory at your own pace and observe live market execution.
                </div>
              </details>

              <details className="faq-detail">
                <summary>What if I have never traded a stock in my life?</summary>
                <div className="faq-answer">
                  All programs begin from square one. We assume zero prior finance knowledge, starting with how brokerages work, what a share is, and how to read basic price charts before progressing to advanced setups.
                </div>
              </details>

              <details className="faq-detail">
                <summary>Which brokerages or platforms do you teach?</summary>
                <div className="faq-answer">
                  We provide direct step-by-step setup guides for Interactive Brokers (IBKR), Webull, and TradingView so you can easily analyze charts and place orders from anywhere in the world.
                </div>
              </details>

              <details className="faq-detail">
                <summary>When will upcoming cohorts and courses open?</summary>
                <div className="faq-answer">
                  New cohorts for our stock and options programs are announced directly to our priority waitlist. Join the waitlist above to be the first notified when seats open.
                </div>
              </details>

              <details className="faq-detail">
                <summary>How do I get access when registration opens?</summary>
                <div className="faq-answer">
                  Waitlist members receive an exclusive early-bird email with a private registration link and priority enrollment access before seats are opened to the general public.
                </div>
              </details>

              <details className="faq-detail">
                <summary>Do you offer investment or financial advice?</summary>
                <div className="faq-answer">
                  No. All content, webinars, and course materials are provided strictly for educational purposes. We teach technical analysis frameworks and market mechanics so you can make informed decisions independently.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* ── SECTION 6: FINANCIAL RISK DISCLAIMER ── */}
        <section className="editorial-wrap" style={{ paddingBottom: 70 }}>
          <div className="disclaimer-box">
            <p>
              <strong>Educational & Financial Disclaimer:</strong> Gift of Trading and Sounia Gill provide financial education, technical chart analysis training, and educational commentary only. We are not registered investment advisers, broker-dealers, or financial planners. Trading securities, equities, and options carries substantial risk of capital loss and is not suitable for all investors. Past performance is no guarantee of future returns. You alone are responsible for evaluating your risk tolerance and personal investment decisions.
            </p>
          </div>
        </section>

        {/* ── WAITLIST / NOTIFY MODAL (FOR DIRECT POPUP CALLS) ── */}
        {notifyModalOpen && (
          <div className="modal-backdrop" onClick={() => setNotifyModalOpen(false)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                onClick={() => setNotifyModalOpen(false)}
                aria-label="Close"
              >
                ×
              </button>

              {notifySubmitted ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: "var(--e-gold-bg)",
                      color: "var(--e-gold)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                    }}
                  >
                    <CheckCircle size={28} />
                  </div>
                  <h3 style={{ fontSize: "20px", marginBottom: "8px" }}>You're on the list!</h3>
                  <p style={{ fontSize: "14px", color: "var(--e-muted)" }}>
                    We'll email you at <strong>{notifyEmail}</strong> as soon as enrollment opens for <strong>{selectedCourseTitle}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit}>
                  <p className="section-label-gold">Priority Notification</p>
                  <h3 style={{ fontSize: "22px", marginBottom: "6px" }}>
                    Join the Priority Waitlist
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--e-muted)", marginBottom: "20px" }}>
                    Leave your details below. We'll send an exclusive early-bird notification with priority access when seats are available.
                  </p>

                  <div style={{ marginBottom: "14px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={notifyName}
                      onChange={(e) => setNotifyName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "6px",
                        border: "1px solid var(--e-line)",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "18px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                      Email Address <span style={{ color: "var(--e-rust)" }}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "6px",
                        border: "1px solid var(--e-line)",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                      Program of Interest
                    </label>
                    <select
                      value={selectedCourseTitle}
                      onChange={(e) => setSelectedCourseTitle(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "6px",
                        border: "1px solid var(--e-line)",
                        fontSize: "14px",
                      }}
                    >
                      <option value="All Upcoming Courses & Sessions (Recommended)">
                        All Upcoming Courses & Sessions (Recommended)
                      </option>
                      <option value="Stock Market Mastery & Wealth Building">
                        Stock Market Mastery & Wealth Building
                      </option>
                      <option value="Options Trading & Strategy">
                        Options Trading & Strategy
                      </option>
                      <option value="Live Market Sessions & 1-on-1 Coaching">
                        Live Market Sessions & 1-on-1 Coaching
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn-modal-submit"
                    disabled={waitlistMutation.isPending}
                  >
                    {waitlistMutation.isPending ? "Securing Your Spot..." : "Confirm Waitlist Spot"} <ArrowRight size={15} />
                  </button>

                  <p style={{ fontSize: "11px", color: "var(--e-muted)", textAlign: "center", marginTop: "12px" }}>
                    🔒 We respect your privacy. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

function ArrowDownOrRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <polyline points="19 12 12 19 5 12"></polyline>
    </svg>
  );
}
