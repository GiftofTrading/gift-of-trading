import { useState, useEffect } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { updateMetaTags } from "@/lib/meta";
import { trackButtonClick } from "@/lib/analytics";
import { trpc } from "@/lib/trpc";
import { ArrowRight, CheckCircle, BookOpen, Shield, Users, Sparkles, TrendingUp, Compass, Award } from "lucide-react";
import "./HomeEditorial.css";

const CURRICULUM_PILLARS = [
  {
    id: "stocks",
    number: "01",
    label: "FOUNDATIONS",
    title: "Stock Market Mastery & Long-Term Investing",
    desc: "From zero to self-sufficient investor. Master capital market dynamics, balance sheet reading, low-cost ETF portfolio design, and technical price-action fundamentals.",
    topics: [
      "Capital Markets & Exchange Mechanics",
      "Candlestick Reading, Trends & Support/Resistance",
      "Decoding Balance Sheets, Free Cash Flow & 10-K Reports",
      "Supply & Demand Zone Mapping",
      "Core & Satellite ETF Portfolio Allocation",
      "Dividend Compounding & Wealth Preservation Systems",
    ],
  },
  {
    id: "options",
    number: "02",
    label: "STRATEGY",
    title: "Options Trading & Defined-Risk Spreads",
    desc: "Understand options contracts from the ground up without confusing jargon. Learn high-probability vertical credit and debit spreads, volatility rank, and strict capital protection rules.",
    topics: [
      "Calls & Puts Mechanics Demystified",
      "Intrinsic vs. Extrinsic Value & Time Decay (Theta)",
      "The Option Greeks Explained (Delta, Gamma, Vega, IV)",
      "Vertical Credit & Debit Spreads Architecture",
      "Implied Volatility Rank (IVR) & Edge Identification",
      "Defensive Trade Management & Risk Checklists",
    ],
  },
  {
    id: "mentorship",
    number: "03",
    label: "MENTORSHIP",
    title: "Live Market Sessions & 1-on-1 Mentorship",
    desc: "Observe real-time market analysis and execution with Sounia Gill. Review real trades, refine personal trading psychology, and build a repeatable trading routine.",
    topics: [
      "Live Pre-Market Preparation & Chart Scans",
      "Real-Time Technical Level Identification",
      "Trade Journaling & Post-Trade Analysis",
      "Emotional Discipline & Psychology Management",
      "One-on-One Portfolio & Strategy Alignment",
      "Interactive Q&A and Practical Execution Coaching",
    ],
  },
];

const FAQS = [
  {
    q: "Why are individual course registrations currently waitlisted?",
    a: "We periodically update our educational curriculum, live case studies, and trading software walkthroughs between cohorts to ensure students receive the highest quality education. Join the priority waitlist below to get early access when the next cohort opens.",
  },
  {
    q: "Do I need any prior finance or trading experience to join?",
    a: "Not at all. Sounia Gill designs all curriculum starting from first principles. We assume zero prior finance knowledge, beginning with platform basics, market terminology, and candlestick reading before moving to advanced strategy.",
  },
  {
    q: "Which charting and broker platforms do you teach?",
    a: "We provide comprehensive step-by-step walkthroughs for TradingView (free version works great), Interactive Brokers (IBKR), and Webull, so students can analyze and trade seamlessly from anywhere in the world.",
  },
  {
    q: "How will I be notified when registration opens?",
    a: "Waitlist members receive an exclusive email notification with early enrollment access and private registration details before cohort seats are released to the public.",
  },
  {
    q: "Do you offer investment or financial advice?",
    a: "No. All programs, workshops, and materials are strictly educational. We teach technical frameworks, chart reading, and risk management principles so you can make disciplined, independent financial decisions.",
  },
];

export default function Services() {
  const [selectedTrack, setSelectedTrack] = useState("All Upcoming Courses & Sessions (Recommended)");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    updateMetaTags({
      title: "Upcoming Courses & Sessions — Gift of Trading Academy",
      description: "Explore the Gift of Trading curriculum pillars and join the priority waitlist for upcoming beginner-friendly stock and options courses with Sounia Gill.",
      keywords: "trading courses, stock market education, options waitlist, learn options trading, Sounia Gill",
      ogTitle: "Upcoming Courses & Sessions — Gift of Trading Academy",
      ogDescription: "Explore the Gift of Trading curriculum pillars and join the priority waitlist for upcoming beginner-friendly stock and options courses with Sounia Gill.",
      canonicalUrl: "https://giftoftrading.com/services",
    });
  }, []);

  const waitlistMutation = trpc.leads.joinWaitlist.useMutation();

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    trackButtonClick(`services_waitlist_submit_${selectedTrack}`);
    waitlistMutation.mutate({
      name: name.trim() || undefined,
      email: email.trim(),
      courseTitle: selectedTrack,
      source: "course-waitlist",
    });
  };

  return (
    <Layout>
      <div className="editorial-body">
        {/* ── HERO BANNER ── */}
        <section
          className="services-hero-banner"
          style={{
            background: "#091c2d",
            padding: "80px 20px 70px",
            textAlign: "center",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="editorial-wrap" style={{ maxWidth: 780, margin: "0 auto" }}>
            <span
              style={{
                display: "inline-block",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--e-gold-light)",
                marginBottom: "14px",
              }}
            >
              ACADEMY CURRICULUM
            </span>
            <h1
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: "clamp(32px, 5vw, 48px)",
                color: "#FFFFFF",
                fontWeight: 400,
                lineHeight: 1.2,
                marginBottom: "18px",
              }}
            >
              Learn with clarity, structure, and{" "}
              <em style={{ fontStyle: "italic", color: "var(--e-gold-light)" }}>zero noise</em>.
            </h1>
            <p
              style={{
                fontSize: "16px",
                color: "rgba(255, 255, 255, 0.75)",
                lineHeight: 1.6,
                maxWidth: 640,
                margin: "0 auto 28px",
              }}
            >
              Explore our core curriculum pillars below and join the priority waitlist to get early-bird registration and syllabus announcements before upcoming cohort seats open.
            </p>

            <a
              href="#waitlist-form"
              className="btn-banner-gold"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{ display: "inline-flex" }}
            >
              Join Priority Waitlist <ArrowRight size={16} />
            </a>
          </div>
        </section>

        {/* ── CURRICULUM PILLARS SECTION ── */}
        <section className="editorial-section" style={{ background: "#FFFFFF", padding: "70px 20px" }}>
          <div className="editorial-wrap">
            <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 50px" }}>
              <p className="section-label-gold">Core Pillars</p>
              <h2 className="section-title-large">What you will master</h2>
              <p className="section-subtitle" style={{ margin: "0 auto" }}>
                A structured, disciplined pathway designed to take you from market uncertainty to confident execution.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px" }}>
              {CURRICULUM_PILLARS.map((pillar) => (
                <div
                  key={pillar.id}
                  style={{
                    background: "var(--e-paper)",
                    border: "1px solid var(--e-line)",
                    borderRadius: "12px",
                    padding: "32px 28px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 4px 14px rgba(6, 17, 29, 0.04)",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "var(--e-gold)" }}>
                        {pillar.number} / {pillar.label}
                      </span>
                      <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--e-muted)", background: "#FFFFFF", padding: "3px 8px", borderRadius: "4px", border: "1px solid var(--e-line)" }}>
                        Upcoming Cohort
                      </span>
                    </div>

                    <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--e-navy)", marginBottom: "10px", lineHeight: 1.3 }}>
                      {pillar.title}
                    </h3>
                    <p style={{ fontSize: "14px", color: "var(--e-muted)", lineHeight: 1.5, marginBottom: "20px" }}>
                      {pillar.desc}
                    </p>

                    <div style={{ borderTop: "1px solid var(--e-line)", paddingTop: "18px" }}>
                      <h4 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--e-navy)", marginBottom: "12px" }}>
                        Key Curriculum Modules
                      </h4>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "9px" }}>
                        {pillar.topics.map((t, idx) => (
                          <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#374151" }}>
                            <CheckCircle size={15} style={{ color: "var(--e-gold)", flexShrink: 0, marginTop: "2px" }} />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div style={{ marginTop: "28px" }}>
                    <button
                      onClick={() => {
                        setSelectedTrack(pillar.title);
                        document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="btn-card-action btn-card-enroll"
                      style={{ width: "100%" }}
                    >
                      Join Waitlist for this Track <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRIORITY WAITLIST FORM SECTION ── */}
        <section id="waitlist-form" className="editorial-section" style={{ background: "var(--e-paper)", borderTop: "1px solid var(--e-line)", borderBottom: "1px solid var(--e-line)" }}>
          <div className="editorial-wrap">
            <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 36px" }}>
              <p className="section-label-gold">Early-Bird Access</p>
              <h2 className="section-title-large">Join the Upcoming Cohort Waitlist</h2>
              <p className="section-subtitle" style={{ margin: "0 auto" }}>
                Reserve your spot on the priority list. You will receive exclusive early access, curriculum previews, and special early-bird enrollment options.
              </p>
            </div>

            <div
              style={{
                maxWidth: 640,
                margin: "0 auto",
                background: "#FFFFFF",
                border: "1px solid var(--e-line)",
                borderRadius: "14px",
                padding: "36px 32px",
                boxShadow: "0 15px 35px rgba(6, 17, 29, 0.05)",
              }}
            >
              {submitted ? (
                <div style={{ textAlign: "center", padding: "28px 10px" }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: "var(--e-gold-bg)",
                      color: "var(--e-gold)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                    }}
                  >
                    <CheckCircle size={30} />
                  </div>
                  <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--e-navy)", marginBottom: "8px" }}>
                    You're on the priority waitlist!
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--e-muted)", maxWidth: 440, margin: "0 auto" }}>
                    We've saved your spot for <strong>{selectedTrack}</strong>. We'll email you at <strong>{email}</strong> the moment registration opens.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit}>
                  <div style={{ marginBottom: "18px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--e-navy)", marginBottom: "6px" }}>
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "6px",
                        border: "1px solid var(--e-line)",
                        fontSize: "14px",
                        color: "var(--e-navy)",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "18px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--e-navy)", marginBottom: "6px" }}>
                      Email Address <span style={{ color: "var(--e-rust)" }}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "6px",
                        border: "1px solid var(--e-line)",
                        fontSize: "14px",
                        color: "var(--e-navy)",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--e-navy)", marginBottom: "6px" }}>
                      Preferred Program / Interest
                    </label>
                    <select
                      value={selectedTrack}
                      onChange={(e) => setSelectedTrack(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "6px",
                        border: "1px solid var(--e-line)",
                        fontSize: "14px",
                        color: "var(--e-navy)",
                        background: "#FFFFFF",
                      }}
                    >
                      <option value="All Upcoming Courses & Sessions (Recommended)">
                        🌟 All Upcoming Courses & Live Sessions (Recommended)
                      </option>
                      <option value="Stock Market Mastery & Long-Term Investing">
                        📚 Stock Market Mastery & Long-Term Investing
                      </option>
                      <option value="Options Trading & Defined-Risk Spreads">
                        ⚡ Options Trading & Defined-Risk Spreads
                      </option>
                      <option value="Live Market Sessions & 1-on-1 Mentorship">
                        🎯 Live Trading Sessions & 1-on-1 Mentorship
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn-modal-submit"
                    disabled={waitlistMutation.isPending}
                    style={{ padding: "14px 20px", fontSize: "15px" }}
                  >
                    {waitlistMutation.isPending ? "Securing Your Spot..." : "Join Priority Waitlist"} <ArrowRight size={16} />
                  </button>

                  <p style={{ fontSize: "11px", color: "var(--e-muted)", textAlign: "center", marginTop: "12px" }}>
                    🔒 We respect your privacy. No spam, ever. Unsubscribe at any time.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── FAQ SECTION ── */}
        <section className="editorial-section" style={{ background: "#FFFFFF", padding: "60px 20px" }}>
          <div className="editorial-wrap" style={{ maxWidth: 760, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <p className="section-label-gold">Questions & Answers</p>
              <h2 className="section-title-large">Frequently Asked Questions</h2>
            </div>

            <div className="faq-wrap" style={{ marginTop: 0 }}>
              {FAQS.map((faq, i) => (
                <details key={i} className="faq-detail">
                  <summary>{faq.q}</summary>
                  <div className="faq-answer">{faq.a}</div>
                </details>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 40 }}>
              <p style={{ fontSize: "15px", color: "var(--e-muted)", marginBottom: "16px" }}>
                Have specific questions about curriculum prerequisites or formats?
              </p>
              <Link href="/contact">
                <span className="btn-hero-action" style={{ background: "transparent", border: "1px solid var(--e-navy)", color: "var(--e-navy)", boxShadow: "none" }}>
                  Contact Our Student Support Team <ArrowRight size={15} />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
