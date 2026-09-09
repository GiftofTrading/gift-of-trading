import { useState, useEffect } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { updateMetaTags } from "@/lib/meta";
import { trackButtonClick } from "@/lib/analytics";
import { ArrowRight, CheckCircle, Clock, Video, BookOpen, ChevronDown, ChevronUp, Shield, Star, Users } from "lucide-react";
import "./HomeEditorial.css";

// External Whop URLs
const WHOP_COMMUNITY = "https://whop.com/discover/options-academy-zero-to-pro-6/";
const WHOP_SMME = "https://whop.com/discover/options-academy-zero-to-pro-6/stock-market-made-simple/";

interface CourseDetail {
  id: string;
  title: string;
  category: string;
  badge: "Enrolling Now" | "Sold Out" | "Coming Soon";
  badgeType: "enrolling" | "sold_out" | "coming_soon";
  price?: string;
  originalPrice?: string;
  duration: string;
  format: string;
  desc: string;
  modules: string[];
  actionType: "enroll" | "waitlist";
  actionLabel: string;
  whopUrl?: string;
}

const ALL_COURSES: CourseDetail[] = [
  {
    id: "stock-market-made-easy",
    title: "Stock Market Made Easy",
    category: "📚 Foundational Beginner Course",
    badge: "Enrolling Now",
    badgeType: "enrolling",
    price: "$349",
    originalPrice: "$436.25",
    duration: "9 Modules • 39 Lessons • Lifetime Access",
    format: "Self-Paced Video Curriculum + Community",
    desc: "From Zero to Investor — Sounia's complete foundational beginner curriculum covering stock investing, ETFs, balance sheets, candlestick reading, supply & demand zones, and disciplined wealth building.",
    modules: [
      "Stock Market Fundamentals: How Capital Markets Work",
      "How to Read Candlestick Charts & Price Action",
      "Analyzing Company Financials & 10-K Reports",
      "Identifying High-Probability Supply & Demand Zones",
      "ETF Selection & Core/Satellite Portfolio Allocation",
      "Dividend Growth Investing & Compounding Systems",
      "Trendlines, Breakouts & Support/Resistance Levels",
      "Moving Averages & Key Technical Momentum Indicators",
      "Risk Management, Position Sizing & Drawdown Rules",
      "Interactive Brokers (IBKR) & Webull Setup Guides",
    ],
    actionType: "enroll",
    actionLabel: "Enroll on Whop ($349)",
    whopUrl: WHOP_SMME,
  },
  {
    id: "options-beginner",
    title: "Option Beginner Course",
    category: "🎯 Options Fundamentals",
    badge: "Coming Soon",
    badgeType: "coming_soon",
    duration: "Self-Paced Video Lessons",
    format: "Video Lessons + Strategy Worksheets",
    desc: "Understand calls, puts, strike selection, and risk management from the ground up with zero confusing jargon.",
    modules: [
      "Options 101: Understanding Calls and Puts",
      "Option Pricing: Intrinsic vs. Extrinsic Value",
      "The Option Greeks Explained Simply (Delta, Theta, IV)",
      "How to Choose the Right Strike & Expiration",
      "Broker Walkthrough: Executing Your First Option Trade",
      "Essential Risk Rules to Protect Your Capital",
    ],
    actionType: "waitlist",
    actionLabel: "Join Waitlist",
  },
  {
    id: "options-strategy",
    title: "Option Strategy",
    category: "⚡ Advanced Options",
    badge: "Coming Soon",
    badgeType: "coming_soon",
    duration: "Self-Paced Video Lessons",
    format: "Video Lessons + Real Trade Case Studies",
    desc: "Advanced vertical spreads, iron condors, implied volatility rank analysis, and disciplined risk-to-reward frameworks.",
    modules: [
      "Vertical Credit & Debit Spreads Architecture",
      "Iron Condors & Market-Neutral Income Strategies",
      "Implied Volatility Rank (IVR) & Volatility Sizing",
      "Trade Management: When to Take Profit vs. Cut Loss",
      "Defensive Adjustments & Rolling Techniques",
      "Developing Your Personal Trading Plan & Journal",
    ],
    actionType: "waitlist",
    actionLabel: "Join Waitlist",
  },
  {
    id: "recorded-masterclass",
    title: "Recorded Masterclass",
    category: "🎥 On-Demand Series",
    badge: "Coming Soon",
    badgeType: "coming_soon",
    duration: "100+ Hours of Lessons",
    format: "On-Demand Video Archive",
    desc: "Full comprehensive library of past live cohort lessons, market case studies, and advanced technical workshops with lifetime replay access.",
    modules: [
      "Comprehensive Archive of Past Cohort Live Sessions",
      "In-Depth Chart Case Studies Across Bull & Bear Markets",
      "Step-by-Step Breakdown of Real Winning & Losing Trades",
      "Advanced Risk Mitigation & Position Scaling Lessons",
      "Searchable Video Transcripts & Strategy Cheatsheets",
      "Ongoing Resource Updates & Supplementary Materials",
    ],
    actionType: "waitlist",
    actionLabel: "Notify Me When Available",
  },
];

const FAQS = [
  {
    q: "Which course should I take if I am a complete beginner?",
    a: "If you are starting from zero, Stock Market Made Easy is the best starting point. It provides foundational market literacy, teaches how businesses create value, explains candlestick reading, and guides you through establishing your first portfolio safely.",
  },
  {
    q: "Why are some courses listed as Coming Soon?",
    a: "Courses listed as Coming Soon are currently in curriculum preparation. You can join the priority waitlist for any course above to be notified first when enrollment opens.",
  },
  {
    q: "How does enrollment through Whop work?",
    a: "Whop is our secure student portal. When you enroll, you create your student login and gain immediate access to all course modules, videos, downloads, and Discord community privileges.",
  },
  {
    q: "What brokerages or charting software do I need?",
    a: "We recommend TradingView for charting (free version works fine) and Interactive Brokers (IBKR) or Webull for execution. Step-by-step setup tutorials are provided in the courses.",
  },
  {
    q: "Can I get a refund if the course isn't right for me?",
    a: "Due to the immediate digital nature and proprietary proprietary intellectual property of our educational materials, purchases are non-refundable. Please review course syllabi carefully or contact us before purchasing.",
  },
];

export default function Services() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("Stock Market Made Easy");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    updateMetaTags({
      title: "All Courses & Programs | Gift of Trading Academy",
      description: "Explore all trading courses by Sounia Gill: Stock Market Made Easy, Options Beginner, Options Strategy, and Masterclasses.",
      canonicalUrl: "https://giftoftrading.com/services",
    });
  }, []);

  const openWaitlist = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setSubmitted(false);
    setModalOpen(true);
    trackButtonClick(`services_waitlist_open_${courseTitle}`);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    trackButtonClick(`services_waitlist_submit_${selectedCourse}`);
    setTimeout(() => {
      setModalOpen(false);
      setSubmitted(false);
      setEmail("");
      setName("");
    }, 2800);
  };

  return (
    <Layout>
      <div className="editorial-body">
        {/* ── HEADER HERO ── */}
        <section
          style={{
            background: "linear-gradient(180deg, #0B1E33 0%, #06111D 100%)",
            color: "#FFFFFF",
            padding: "80px 24px 70px",
            textAlign: "center",
          }}
        >
          <div className="editorial-wrap" style={{ maxWidth: 840 }}>
            <span className="carousel-eyebrow">GIFT OF TRADING ACADEMY</span>
            <h1
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
                fontWeight: 500,
                color: "#FFFFFF",
                lineHeight: 1.18,
                margin: "16px auto 20px",
              }}
            >
              Curriculum & Learning Programs
            </h1>
            <p
              style={{
                fontSize: "17px",
                lineHeight: 1.65,
                color: "rgba(248, 246, 240, 0.88)",
                maxWidth: 640,
                margin: "0 auto",
              }}
            >
              Structured, transparent financial education taught by Sounia Gill. Master the markets with repeatable rules, risk discipline, and zero hype.
            </p>
          </div>
        </section>

        {/* ── COURSES LIST ── */}
        <section className="editorial-section" style={{ background: "var(--e-paper)" }}>
          <div className="editorial-wrap">
            <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              {ALL_COURSES.map((course) => (
                <div
                  key={course.id}
                  style={{
                    background: "#FFFFFF",
                    border: course.badgeType === "enrolling" ? "2px solid var(--e-gold-light)" : "1px solid var(--e-line)",
                    borderRadius: "10px",
                    padding: "36px 32px",
                    boxShadow: course.badgeType === "enrolling" ? "0 10px 30px rgba(201, 168, 76, 0.12)" : "0 4px 20px rgba(11, 30, 51, 0.04)",
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          {course.category}
                        </span>
                        {course.badgeType === "enrolling" && (
                          <span className="course-badge badge-enrolling">{course.badge}</span>
                        )}
                        {course.badgeType === "sold_out" && (
                          <span className="course-badge badge-sold-out">{course.badge}</span>
                        )}
                        {course.badgeType === "coming_soon" && (
                          <span className="course-badge badge-coming-soon">{course.badge}</span>
                        )}
                      </div>

                      <h2
                        style={{
                          fontFamily: "'Newsreader', Georgia, serif",
                          fontSize: "28px",
                          fontWeight: 500,
                          color: "var(--e-navy)",
                          marginBottom: "8px",
                        }}
                      >
                        {course.title}
                      </h2>
                      <p style={{ fontSize: "15px", color: "var(--e-muted)", maxWidth: 650, lineHeight: 1.6 }}>
                        {course.desc}
                      </p>
                    </div>

                    {/* Price & Action */}
                    <div style={{ minWidth: 200, textAlign: "left" }} className="md:text-right">
                      {course.price ? (
                        <div style={{ marginBottom: "14px" }}>
                          <span
                            style={{
                              fontFamily: "'Newsreader', Georgia, serif",
                              fontSize: "36px",
                              fontWeight: 600,
                              color: "var(--e-navy)",
                            }}
                          >
                            {course.price}
                          </span>
                          {course.originalPrice && (
                            <span className="text-sm line-through text-slate-400 ml-2">
                              {course.originalPrice}
                            </span>
                          )}
                          <p style={{ fontSize: "12px", color: "var(--e-muted)", marginTop: "2px" }}>
                            One-time • Lifetime access
                          </p>
                        </div>
                      ) : (
                        <div style={{ marginBottom: "14px" }}>
                          <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--e-navy)" }}>
                            Coming Soon
                          </span>
                          <p style={{ fontSize: "12px", color: "var(--e-muted)", marginTop: "2px" }}>
                            {course.duration}
                          </p>
                        </div>
                      )}

                      {course.actionType === "enroll" && course.whopUrl ? (
                        <a
                          href={course.whopUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-card-action btn-card-enroll"
                          style={{ padding: "12px 24px", fontSize: "15px" }}
                        >
                          {course.actionLabel} <ArrowRight size={15} />
                        </a>
                      ) : (
                        <button
                          onClick={() => openWaitlist(course.title)}
                          className={`btn-card-action ${course.badgeType === "sold_out" ? "btn-card-waitlist" : "btn-card-coming"}`}
                          style={{ padding: "12px 24px", fontSize: "15px" }}
                        >
                          {course.actionLabel}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Modules Syllabus */}
                  <div style={{ paddingTop: "24px" }}>
                    <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--e-gold)", marginBottom: "14px" }}>
                      Curriculum Highlights
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.modules.map((mod, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <CheckCircle size={16} className="text-[var(--e-gold)] shrink-0 mt-0.5" />
                          <span style={{ fontSize: "14px", color: "var(--e-navy)" }}>{mod}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ SECTION ── */}
        <section className="editorial-section" style={{ background: "#FFFFFF", borderTop: "1px solid var(--e-line)" }}>
          <div className="editorial-wrap" style={{ maxWidth: 840 }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <p className="section-label-gold">Got Questions?</p>
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
                Need personalized advice on which course fits your current experience level?
              </p>
              <Link href="/contact">
                <span className="btn-hero-action" style={{ background: "transparent", border: "1px solid var(--e-navy)", color: "var(--e-navy)", boxShadow: "none" }}>
                  Contact Our Student Support Team <ArrowRight size={15} />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── WAITLIST MODAL ── */}
        {modalOpen && (
          <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setModalOpen(false)} aria-label="Close">
                ×
              </button>

              {submitted ? (
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
                    We'll email you at <strong>{email}</strong> as soon as enrollment opens for <strong>{selectedCourse}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit}>
                  <p className="section-label-gold">Priority Notification</p>
                  <h3 style={{ fontSize: "22px", marginBottom: "6px" }}>
                    Join the {selectedCourse} Waitlist
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--e-muted)", marginBottom: "20px" }}>
                    Leave your contact info below to receive early-bird cohort access and priority seat reservation.
                  </p>

                  <div style={{ marginBottom: "14px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "6px",
                        border: "1px solid var(--e-line)",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-hero-action"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Confirm Waitlist Spot <ArrowRight size={15} />
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
