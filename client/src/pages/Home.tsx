import { useState, useEffect } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { updateMetaTags } from "@/lib/meta";
import { trackButtonClick } from "@/lib/analytics";
import { ArrowRight, ArrowUpRight, Star, CheckCircle, Shield, Users, Clock, BookOpen } from "lucide-react";
import "./HomeEditorial.css";

// External Whop URLs
const WHOP_COMMUNITY = "https://whop.com/discover/options-academy-zero-to-pro-6/";
const WHOP_SMME = "https://whop.com/discover/options-academy-zero-to-pro-6/stock-market-made-simple/";
const WHOP_MASTERCLASS = "https://whop.com/discover/options-academy-zero-to-pro-6/";

interface CourseItem {
  id: string;
  title: string;
  category: string;
  status: "enrolling" | "sold_out" | "coming_soon";
  statusLabel: string;
  price?: string;
  originalPrice?: string;
  description: string;
  actionType: "enroll" | "waitlist";
  actionLabel: string;
  url?: string;
  featured?: boolean;
}

interface CourseStory {
  id: string;
  stepLabel: string;
  title: string;
  category: string;
  price?: string;
  originalPrice?: string;
  status: "enrolling" | "coming_soon";
  statusLabel: string;
  duration: string;
  format: string;
  overview: string;
  highlights: string[];
  modules: string[];
  actionType: "enroll" | "waitlist";
  actionLabel: string;
  whopUrl?: string;
}

const COURSE_STORIES: Record<string, CourseStory> = {
  "options-beginner": {
    id: "options-beginner",
    stepLabel: "01 / START HERE",
    title: "Option Beginner Course",
    category: "🎯 Options Fundamentals",
    status: "coming_soon",
    statusLabel: "Coming Soon",
    duration: "Self-Paced Video Lessons",
    format: "On-Demand Curriculum + Cheatsheets",
    overview:
      "The complete zero-to-one guide to options trading. Understand calls, puts, strike selection, and capital protection from the ground up with zero confusing jargon.",
    highlights: [
      "Zero prior trading knowledge required",
      "Interactive risk calculation templates",
      "Direct broker walkthroughs on Webull & IBKR",
      "Lifetime access to future updates",
    ],
    modules: [
      "Module 1: Options 101 — Understanding Calls, Puts & Contract Mechanics",
      "Module 2: Option Pricing — Intrinsic vs. Extrinsic Value & Time Decay",
      "Module 3: The Greeks Simplified — Delta, Theta, Vega & Implied Volatility",
      "Module 4: Strike & Expiration Selection — How to Choose the Right Trade",
      "Module 5: Broker Execution — Placing Your First Real Options Order",
      "Module 6: Capital Preservation — Strict Risk Management & Position Sizing",
    ],
    actionType: "waitlist",
    actionLabel: "Join Priority Waitlist",
  },
  "options-strategy": {
    id: "options-strategy",
    stepLabel: "02 / GO DEEPER",
    title: "Options Beginner + Strategy",
    category: "⚡ Advanced Options & Multi-Leg Spreads",
    status: "coming_soon",
    statusLabel: "Coming Soon",
    duration: "Self-Paced Video Lessons",
    format: "Advanced Spread Frameworks + Case Studies",
    overview:
      "Go beyond single contracts. Master vertical credit/debit spreads, iron condors, implied volatility rank (IVR), and disciplined trade management under real market volatility.",
    highlights: [
      "High-probability defined-risk strategies",
      "Volatility-based position sizing formulas",
      "Defensive adjustments & rolling mechanics",
      "Trade journal templates and risk checklist",
    ],
    modules: [
      "Module 1: Vertical Credit & Debit Spreads Architecture",
      "Module 2: Market-Neutral Income Strategies & Iron Condors",
      "Module 3: Implied Volatility Rank (IVR) & Statistical Edge",
      "Module 4: Trade Management — Profit Targets vs. Stop Rules",
      "Module 5: Defensive Adjustments & Managing Tested Wings",
      "Module 6: Building Your Personal Weekly Options Trading Plan",
    ],
    actionType: "waitlist",
    actionLabel: "Join Priority Waitlist",
  },
  "stock-market-made-easy": {
    id: "stock-market-made-easy",
    stepLabel: "03 / THINK LONG TERM",
    title: "Stock Market Made Easy",
    category: "📚 Wealth Creation & Portfolio Building",
    price: "$349",
    originalPrice: "$436.25",
    status: "enrolling",
    statusLabel: "Enrolling Now",
    duration: "9 Modules • Lifetime Access",
    format: "Comprehensive Video Lessons + Community",
    overview:
      "From zero to investor. Build a resilient, compound-growth stock portfolio. Master business fundamentals, 10-K financial reading, ETF selection, and disciplined wealth preservation strategies.",
    highlights: [
      "Complete 9-module beginner-friendly curriculum",
      "Understand financial balance sheets & cash flow",
      "Smart ETF selection & sector diversification",
      "Direct enrollment via Whop with instant access",
    ],
    modules: [
      "Module 1: Capital Market Dynamics & How Stocks Work",
      "Module 2: Decoding Company Financials, P/E & Free Cash Flow",
      "Module 3: Candlestick Reading & Price Action Fundamentals",
      "Module 4: Core & Satellite Portfolio Allocation with Low-Cost ETFs",
      "Module 5: Dividend Growth Investing & Compounding Systems",
      "Module 6: Position Sizing, DCA Strategies & Drawdown Protection",
    ],
    actionType: "enroll",
    actionLabel: "Enroll on Whop ($349)",
    whopUrl: WHOP_SMME,
  },
};

const COURSES: CourseItem[] = [
  {
    id: "stock-market-made-easy",
    title: "Stock Market Made Easy",
    category: "📚 Foundational Course",
    status: "enrolling",
    statusLabel: "Enrolling Now",
    price: "$349",
    originalPrice: "$436.25",
    description: "From zero to investor — Sounia's signature 9-module curriculum covering market mechanics, candlestick patterns, supply & demand zones, ETF investing, and risk rules.",
    actionType: "enroll",
    actionLabel: "Enroll on Whop ($349)",
    url: WHOP_SMME,
    featured: true,
  },
  {
    id: "options-beginner",
    title: "Option Beginner Course",
    category: "🎯 Options Fundamentals",
    status: "coming_soon",
    statusLabel: "Coming Soon",
    description: "The complete zero-to-one guide to options trading. Learn calls, puts, strike mechanics, and contract selection without confusing jargon.",
    actionType: "waitlist",
    actionLabel: "Join Waitlist",
  },
  {
    id: "options-strategy",
    title: "Option Strategy",
    category: "⚡ Advanced Options",
    status: "coming_soon",
    statusLabel: "Coming Soon",
    description: "Advanced options strategies for systematic execution: credit spreads, iron condors, implied volatility analysis, and defensive adjustments.",
    actionType: "waitlist",
    actionLabel: "Join Waitlist",
  },
  {
    id: "recorded-masterclass",
    title: "Recorded Masterclass",
    category: "🎥 On-Demand Series",
    status: "coming_soon",
    statusLabel: "Coming Soon",
    description: "Full on-demand library of past live cohort lessons, market case studies, and advanced technical workshops with lifetime replay access.",
    actionType: "waitlist",
    actionLabel: "Notify Me When Available",
  },
];

export default function Home() {
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [selectedCourseTitle, setSelectedCourseTitle] = useState("Stock Market Made Easy");
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifyName, setNotifyName] = useState("");
  const [notifySubmitted, setNotifySubmitted] = useState(false);

  // Course Story Modal State
  const [selectedStoryCourse, setSelectedStoryCourse] = useState<CourseStory | null>(null);
  const [courseStoryModalOpen, setCourseStoryModalOpen] = useState(false);

  useEffect(() => {
    updateMetaTags({
      title: "Gift of Trading: Learn Stock & Options Courses Online",
      description: "Learn to read the market at your own pace with beginner-friendly stock and options trading courses by Sounia Gill. Start from zero—no experience needed.",
      keywords: "stock market courses, options trading, beginner trading, Sounia Gill, stock market education, learn to invest, long term investing",
      ogTitle: "Gift of Trading: Learn Stock & Options Courses Online",
      ogDescription: "Learn to read the market at your own pace with beginner-friendly stock and options trading courses by Sounia Gill. Start from zero—no experience needed.",
      canonicalUrl: "https://giftoftrading.com/",
    });
  }, []);

  const handleOpenWaitlist = (courseTitle: string) => {
    setSelectedCourseTitle(courseTitle);
    setNotifySubmitted(false);
    setNotifyModalOpen(true);
    trackButtonClick(`waitlist_open_${courseTitle}`);
  };

  const handleOpenCourseStory = (courseId: string) => {
    const story = COURSE_STORIES[courseId];
    if (story) {
      setSelectedStoryCourse(story);
      setCourseStoryModalOpen(true);
      trackButtonClick(`open_course_story_${courseId}`);
    }
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail) return;
    setNotifySubmitted(true);
    trackButtonClick(`waitlist_submitted_${selectedCourseTitle}`);
    setTimeout(() => {
      setNotifyModalOpen(false);
      setNotifySubmitted(false);
      setNotifyEmail("");
      setNotifyName("");
    }, 2800);
  };

  return (
    <Layout>
      <div className="editorial-body">
        {/* ── SECTION 1: HERO BANNER MATCHING USER REFERENCE ── */}
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
                <Link href="/services">
                  <span
                    className="btn-banner-gold"
                    onClick={() => trackButtonClick("hero_banner_view_all_courses")}
                  >
                    View all courses <ArrowUpRight size={17} />
                  </span>
                </Link>
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
                onClick={() => handleOpenCourseStory("options-beginner")}
                role="button"
                tabIndex={0}
              >
                <div>
                  <span className="hero-strip-label">01 / START HERE</span>
                  <h3 className="hero-strip-title" style={{ color: "#FFFFFF" }}>Options beginner</h3>
                </div>
                <span className="hero-strip-price" style={{ fontSize: "13px", fontWeight: 600 }}>Coming Soon <ArrowUpRight size={15} /></span>
              </div>

              <div
                className="hero-strip-item"
                onClick={() => handleOpenCourseStory("options-strategy")}
                role="button"
                tabIndex={0}
              >
                <div>
                  <span className="hero-strip-label">02 / GO DEEPER</span>
                  <h3 className="hero-strip-title" style={{ color: "#FFFFFF" }}>Options + strategy</h3>
                </div>
                <span className="hero-strip-price" style={{ fontSize: "13px", fontWeight: 600 }}>Coming Soon <ArrowUpRight size={15} /></span>
              </div>

              <div
                className="hero-strip-item"
                onClick={() => handleOpenCourseStory("stock-market-made-easy")}
                role="button"
                tabIndex={0}
              >
                <div>
                  <span className="hero-strip-label">03 / THINK LONG TERM</span>
                  <h3 className="hero-strip-title" style={{ color: "#FFFFFF" }}>Stock market made easy</h3>
                </div>
                <span className="hero-strip-price">$349 <ArrowUpRight size={16} /></span>
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

        {/* ── SECTION 3: COURSE CATALOG GRID ── */}
        <section id="courses" className="editorial-section" style={{ background: "#FFFFFF", borderTop: "1px solid var(--e-line)" }}>
          <div className="editorial-wrap">
            <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 10px" }}>
              <p className="section-label-gold">Curriculum & Programs</p>
              <h2 className="section-title-large">Choose your learning path</h2>
              <p className="section-subtitle" style={{ margin: "0 auto" }}>
                From foundational wealth-building to options mastery. Structured, transparent education designed for real-world execution.
              </p>
            </div>

            <div className="catalog-grid">
              {COURSES.map((course) => (
                <div
                  key={course.id}
                  className={`course-card ${course.featured ? "featured" : ""}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-500">{course.category}</span>
                      {course.status === "enrolling" && (
                        <span className="course-badge badge-enrolling">{course.statusLabel}</span>
                      )}
                      {course.status === "sold_out" && (
                        <span className="course-badge badge-sold-out">{course.statusLabel}</span>
                      )}
                      {course.status === "coming_soon" && (
                        <span className="course-badge badge-coming-soon">{course.statusLabel}</span>
                      )}
                    </div>

                    <h3 className="course-card-title">{course.title}</h3>
                    <p className="course-card-desc">{course.description}</p>
                  </div>

                  <div className="course-meta-box">
                    {course.price ? (
                      <div className="course-price-wrap">
                        <span className="course-price-current">{course.price}</span>
                        {course.originalPrice && (
                          <span className="text-sm line-through text-slate-400">{course.originalPrice}</span>
                        )}
                        <span className="course-price-label">Lifetime access</span>
                      </div>
                    ) : (
                      <div className="course-price-wrap">
                        <span className="text-sm font-semibold text-slate-700">
                          {course.status === "sold_out" ? "Cohort Filled" : "Coming Soon"}
                        </span>
                      </div>
                    )}

                    {course.actionType === "enroll" && course.url ? (
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-card-action btn-card-enroll"
                        onClick={() => trackButtonClick(`enroll_whop_${course.id}`)}
                      >
                        {course.actionLabel} <ArrowRight size={14} />
                      </a>
                    ) : course.status === "sold_out" ? (
                      <button
                        onClick={() => handleOpenWaitlist(course.title)}
                        className="btn-card-action btn-card-waitlist"
                      >
                        {course.actionLabel}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleOpenWaitlist(course.title)}
                        className="btn-card-action btn-card-coming"
                      >
                        {course.actionLabel}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* View Full Curriculum Link */}
            <div style={{ textAlign: "center", marginTop: 44 }}>
              <Link href="/services">
                <span className="inline-flex items-center gap-2 font-medium text-sm text-[var(--e-navy)] hover:text-[var(--e-gold)] transition-colors underline underline-offset-4 cursor-pointer">
                  View full course syllabi and detailed comparison on the Courses page <ArrowRight size={14} />
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
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <p className="testimonial-text">
                    "Before this course, I bought stocks based on Twitter hype and lost constantly. Sounia taught me how to read supply and demand. I finally have a plan every single morning."
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-[var(--e-line)]">
                  <div className="w-9 h-9 rounded-full bg-[var(--e-gold-bg)] text-[var(--e-gold)] font-bold text-xs flex items-center justify-center flex-shrink-0">
                    AK
                  </div>
                  <div>
                    <p className="testimonial-author flex items-center gap-1.5">
                      Ahmad K.
                      <span className="inline-flex items-center text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-medium">✓ Verified</span>
                    </p>
                    <p className="testimonial-tag">Long-Term & Options Student</p>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div>
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <p className="testimonial-text">
                    "Options used to look like Greek to me. Sounia breaks down the mechanics so simply that within three weeks I was executing defined-risk spreads with total confidence."
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-[var(--e-line)]">
                  <div className="w-9 h-9 rounded-full bg-[var(--e-gold-bg)] text-[var(--e-gold)] font-bold text-xs flex items-center justify-center flex-shrink-0">
                    JM
                  </div>
                  <div>
                    <p className="testimonial-author flex items-center gap-1.5">
                      Jim M.
                      <span className="inline-flex items-center text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-medium">✓ Verified</span>
                    </p>
                    <p className="testimonial-tag">Options Academy Graduate</p>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div>
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <p className="testimonial-text">
                    "The psychology module alone saved me thousands. She doesn't teach you how to gamble; she teaches you how to manage risk like a business."
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-[var(--e-line)]">
                  <div className="w-9 h-9 rounded-full bg-[var(--e-gold-bg)] text-[var(--e-gold)] font-bold text-xs flex items-center justify-center flex-shrink-0">
                    MS
                  </div>
                  <div>
                    <p className="testimonial-author flex items-center gap-1.5">
                      Matthew S.
                      <span className="inline-flex items-center text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-medium">✓ Verified</span>
                    </p>
                    <p className="testimonial-tag">Stock Market Made Easy Student</p>
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
                Everything you need to know about our courses, pacing, and learning format.
              </p>
            </div>

            <div className="faq-wrap">
              <details className="faq-detail">
                <summary>Are the courses self-paced or live?</summary>
                <div className="faq-answer">
                  Our core course, Stock Market Made Easy, is completely self-paced with pre-recorded modules and lifetime access, allowing you to learn at your own speed from anywhere.
                </div>
              </details>

              <details className="faq-detail">
                <summary>What if I have never traded a stock in my life?</summary>
                <div className="faq-answer">
                  All courses begin from square one. We assume zero prior finance knowledge, starting with how brokerages work, what a share is, and how to read basic price charts before progressing to advanced setups.
                </div>
              </details>

              <details className="faq-detail">
                <summary>Which brokerages or platforms do you teach?</summary>
                <div className="faq-answer">
                  We provide direct step-by-step setup guides for Interactive Brokers (IBKR), Webull, and TradingView so you can easily analyze charts and place orders from anywhere in the world.
                </div>
              </details>

              <details className="faq-detail">
                <summary>How do I access the materials after enrolling?</summary>
                <div className="faq-answer">
                  Once enrolled, you receive instant access through the Whop student portal, compatible across desktop, tablet, and mobile devices.
                </div>
              </details>

              <details className="faq-detail">
                <summary>When will the Sold Out courses reopen?</summary>
                <div className="faq-answer">
                  New cohorts for Stock Market Made Easy are released periodically. Join the waitlist using the buttons above to be the first notified when seats open.
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

        {/* ── COURSE STORY & DETAILS MODAL ── */}
        {courseStoryModalOpen && selectedStoryCourse && (
          <div className="modal-backdrop" onClick={() => setCourseStoryModalOpen(false)}>
            <div className="story-modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                onClick={() => setCourseStoryModalOpen(false)}
                aria-label="Close"
              >
                ×
              </button>

              <div className="story-modal-header">
                <span className="hero-strip-label">{selectedStoryCourse.stepLabel}</span>
                <div className="flex items-center justify-between gap-3 mt-1 mb-2">
                  <h2 className="story-modal-title">{selectedStoryCourse.title}</h2>
                  {selectedStoryCourse.price ? (
                    <span className="story-modal-price">{selectedStoryCourse.price}</span>
                  ) : (
                    <span className="story-modal-price" style={{ fontSize: "16px", color: "var(--e-gold)" }}>Coming Soon</span>
                  )}
                </div>
                <p className="story-modal-subtitle">{selectedStoryCourse.overview}</p>
              </div>

              <div className="story-meta-row">
                <div className="story-meta-pill">
                  <Clock size={14} className="text-amber-600" />
                  <span>{selectedStoryCourse.duration}</span>
                </div>
                <div className="story-meta-pill">
                  <BookOpen size={14} className="text-amber-600" />
                  <span>{selectedStoryCourse.format}</span>
                </div>
                <div className="story-meta-pill">
                  <Shield size={14} className="text-amber-600" />
                  <span>Zero Experience Needed</span>
                </div>
              </div>

              <div className="story-curriculum-box">
                <h4 className="story-curriculum-heading">What You Will Learn</h4>
                <div className="story-modules-grid">
                  {selectedStoryCourse.modules.map((mod, idx) => (
                    <div key={idx} className="story-module-item">
                      <CheckCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="story-modal-actions">
                {selectedStoryCourse.actionType === "enroll" && selectedStoryCourse.whopUrl ? (
                  <a
                    href={selectedStoryCourse.whopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-banner-gold w-full justify-center"
                    onClick={() => trackButtonClick(`enroll_whop_story_${selectedStoryCourse.id}`)}
                  >
                    {selectedStoryCourse.actionLabel} <ArrowUpRight size={17} />
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      setCourseStoryModalOpen(false);
                      handleOpenWaitlist(selectedStoryCourse.title);
                    }}
                    className="btn-banner-gold w-full justify-center"
                  >
                    {selectedStoryCourse.actionLabel} <ArrowRight size={17} />
                  </button>
                )}

                <div className="text-center mt-3">
                  <Link href="/services">
                    <span
                      className="text-xs font-medium text-slate-500 hover:text-slate-800 underline underline-offset-4 cursor-pointer"
                      onClick={() => setCourseStoryModalOpen(false)}
                    >
                      View complete syllabus & compare all courses on Courses page →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── WAITLIST / NOTIFY MODAL ── */}
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
                    Join the {selectedCourseTitle} Waitlist
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
