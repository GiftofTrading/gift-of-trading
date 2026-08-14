import Layout from "@/components/Layout";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Check, Star, ArrowRight, ExternalLink, Clock, Users, BookOpen, Award } from "lucide-react";
import { updateMetaTags } from "@/lib/meta";

// Real 9-module curriculum from Whop course
const modules = [
  {
    id: 1,
    title: "The Stock Market",
    description: "Understand what the stock market is, how it works, and why it's the most powerful wealth-building tool available to everyday investors.",
    topics: ["What is the stock market?", "How markets operate", "Bull vs bear markets", "Market hours & key exchanges"],
  },
  {
    id: 2,
    title: "How to Get Started",
    description: "Set up your brokerage account, learn the tools you need, and take your first confident steps as an investor.",
    topics: ["Choosing a brokerage", "Account types and how to choose the right one", "Placing your first order", "Reading a stock quote"],
  },
  {
    id: 3,
    title: "Stocks — Owning a Piece of a Business",
    description: "Learn what stocks really are, how companies grow your wealth, and how to evaluate a business before investing.",
    topics: ["What a share represents", "Dividends & capital gains", "Growth vs value stocks", "Reading financial statements", "How to research a company"],
  },
  {
    id: 4,
    title: "ETFs — The Smart Investor's Shortcut",
    description: "Discover why ETFs are the preferred vehicle for smart, low-cost investing and how to build a diversified portfolio with just a few holdings.",
    topics: ["What is an ETF?", "Index funds vs actively managed", "Top ETFs for beginners", "Sector & thematic ETFs", "Building an ETF portfolio"],
  },
  {
    id: 5,
    title: "Long Term Investing",
    description: "Master the mindset and mechanics of building real wealth over time through compounding, patience, and disciplined strategy.",
    topics: ["Power of compounding", "Dollar-cost averaging", "Time in market vs timing the market", "Rebalancing your portfolio", "Setting investment goals"],
  },
  {
    id: 6,
    title: "Reports",
    description: "Learn how to read and interpret the key financial reports that reveal the true health of any company.",
    topics: ["Earnings reports & what they mean", "How to use reports to make decisions"],
  },
  {
    id: 7,
    title: "Mindset, Greed & Emotional Discipline",
    description: "The most overlooked part of investing — your psychology. Learn to control fear, greed, and impulse so emotions never cost you money.",
    topics: ["Fear & greed cycle", "Common investor mistakes", "Developing a rules-based approach", "Journaling your trades", "Building long-term discipline"],
  },
  {
    id: 8,
    title: "Options — What They Are and When to Use Them",
    description: "Get a clear, beginner-friendly introduction to options — what they are, how they work, and when they make sense as part of your strategy.",
    topics: ["Calls vs puts explained simply", "When options make sense", "Risk vs reward overview", "Options as insurance for your portfolio"],
  },
  {
    id: 9,
    title: "Building Your Personal Investment Plan",
    description: "Bring everything together and create a personalized investment plan that matches your goals, timeline, and risk tolerance.",
    topics: ["Defining your financial goals", "Risk tolerance assessment", "Asset allocation strategy", "Creating your investment policy statement", "Next steps & ongoing education"],
  },
];


const faqs = [
  {
    q: "What is the refund policy?",
    a: "Once enrolled, you get lifetime access to all course materials including any future updates. You can learn at your own pace with no time limit.",
  },
  {
    q: "Do I need any prior experience to take this course?",
    a: "Absolutely not. Stock Market Made Easy is designed specifically for complete beginners with no prior trading or investing experience. Sounia starts from the very basics and builds your knowledge step by step.",
  },
  {
    q: "Is this course live or pre-recorded?",
    a: "Stock Market Made Easy is pre-recorded so you can learn at your own pace, on your own schedule. You get lifetime access to all materials and any future updates at no additional cost.",
  },
  {
    q: "How long is the course, and how much time do I need to commit?",
    a: "The course has 9 modules with 39 lessons total. Most students complete it in 4–6 weeks spending a few hours per week, but you can go faster or slower — there's no deadline.",
  },
  {
    q: "Will this help me actually make money in the stock market?",
    a: "This course gives you the knowledge, framework, and mindset to make informed investment decisions about stocks and ETFs. Sounia teaches real strategies and principles she uses herself. Results depend on your consistency and application of what you learn.",
  },
  {
    q: "Is this course available in multiple languages?",
    a: "The course is taught in English with comprehensive materials designed for English-speaking learners worldwide.",
  },
];

const WHOP_URL = "https://whop.com/discover/options-academy-zero-to-pro-6/stock-market-made-simple/";

const navy = "var(--navy)";
const gold = "var(--gold)";
const cream = "var(--cream)";
const textBody = "var(--text-body)";
const textMuted = "var(--text-muted)";
const white = "#ffffff";

export default function StockMarketMadeEasy() {
  useEffect(() => {
    updateMetaTags({
      title: "Stock Market Made Easy | 9-Module Beginner's Course by Sounia Gill",
      description: "Learn stock market investing from zero with Stock Market Made Easy. 9 modules, 39 lessons, lifetime access. Perfect for complete beginners. No experience needed.",
      keywords: "stock market course, beginner investing, stock market education, ETF investing, long-term investing, Sounia Gill course",
      ogTitle: "Stock Market Made Easy | 9-Module Beginner's Course",
      ogDescription: "Complete beginner's guide to stock market investing. 9 modules covering stocks, ETFs, and long-term wealth building.",
      canonicalUrl: "https://giftoftrading.com/stock-market-made-easy",
    });
  }, []);

  const [openModule, setOpenModule] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section style={{ background: navy, paddingTop: "6rem", paddingBottom: "5rem" }}>
        <div className="container" style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.4)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.5rem" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: gold, display: "inline-block" }} />
            <span style={{ color: gold, fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>New Course — Now Enrolling</span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 700, color: white, lineHeight: 1.15, marginBottom: "1.5rem" }}>
            Stock Market Made <span style={{ color: gold, fontStyle: "italic" }}>Easy</span>
          </h1>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.15rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: "640px", margin: "0 auto 2rem" }}>
            From Zero to Investor — a complete beginner's course taught by Sounia Gill. 9 modules, and a clear roadmap to understanding the stock market with confidence.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem", marginBottom: "2.5rem" }}>
            {[
              { icon: <BookOpen size={18} />, label: "9 Modules" },
              { icon: <Clock size={18} />, label: "Self-Paced" },
              { icon: <Users size={18} />, label: "119 Reviews" },
              { icon: <Star size={18} />, label: "5.0 Rating" },
              { icon: <Award size={18} />, label: "Lifetime Access" },
            ].map(({ icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.7)", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }}>
                <span style={{ color: gold }}>{icon}</span>
                {label}
              </div>
            ))}
          </div>

          {/* Price + CTA */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.4)", textDecoration: "line-through" }}>$436.25</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: gold }}>$349</span>
              <span style={{ background: "rgba(212,175,55,0.2)", color: gold, fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.8rem", padding: "0.25rem 0.6rem", borderRadius: "4px" }}>20% OFF</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <a
                href={WHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: gold, color: navy, fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "1rem", padding: "0.9rem 2.2rem", borderRadius: "0.5rem", textDecoration: "none", transition: "opacity 0.2s" }}
              >
                Enroll Now on Whop <ExternalLink size={16} />
              </a>
              <a
                href="#curriculum"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.9rem 2rem", borderRadius: "0.5rem", border: "1.5px solid rgba(255,255,255,0.3)", color: white, fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none" }}
              >
                View Curriculum
              </a>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", marginTop: "0.25rem" }}>
              Lifetime access · No prior experience needed
            </p>
          </div>
        </div>
      </section>

      {/* ─── SOUNIA'S MESSAGE ────────────────────────────────────────────── */}
      <section style={{ background: navy, padding: "4rem 1.5rem" }}>
        <div className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 700, color: white, marginBottom: "0.5rem" }}>
              Watch this message from Sounia
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.7)", maxWidth: "560px", margin: "0 auto" }}>
              Hear directly from Sounia about why she created this course and what you'll learn.
            </p>
          </div>
          <div style={{ borderRadius: "0.75rem", overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.3)", maxWidth: "800px", margin: "0 auto" }}>
            <video
              width="100%"
              height="auto"
              controls
              style={{ display: "block", width: "100%", height: "auto", backgroundColor: "#000" }}
              poster="/images/sounia-masterclass.jpg"
            >
              <source src="/manus-storage/video2254598160_5d6033ce.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* ─── WHO THIS IS FOR ──────────────────────────────────────────── */}
      <section style={{ background: cream, padding: "5rem 1.5rem" }}>
        <div className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, color: navy, marginBottom: "1rem" }}>
              Who This Course Is For
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: textBody, maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
              This course was designed for anyone who wants to take control of their financial future — no experience required.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {[
              { title: "Complete Beginners", desc: "You've never bought a stock and don't know where to start. This course is your starting line." },
              { title: "Cautious Savers", desc: "Your money is sitting in a savings account losing value to inflation. It's time to put it to work." },
              { title: "New Investors", desc: "You want to understand the stock market and start building wealth with confidence, no matter where you are." },
              { title: "Busy Professionals", desc: "You have income but no time to waste. Learn at your own pace with clear, structured modules." },
            ].map(({ title, desc }) => (
              <div key={title} style={{ background: white, borderRadius: "0.75rem", padding: "1.75rem", border: `1px solid rgba(0,0,0,0.06)`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div style={{ width: "36px", height: "3px", background: gold, borderRadius: "2px", marginBottom: "1rem" }} />
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "1rem", color: navy, marginBottom: "0.5rem" }}>{title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: textBody, lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT'S INCLUDED ──────────────────────────────────────────── */}
      <section style={{ background: navy, padding: "5rem 1.5rem" }}>
        <div className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, color: white, marginBottom: "1rem" }}>
              What's Included
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
            {[
              { label: "9 Comprehensive Modules" },
              { label: "Self-Paced Learning" },
              { label: "Lifetime Course Access" },
              { label: "Future Updates Included" },
              { label: "Beginner-Friendly Language" },
              { label: "Real-World Examples" },
            ].map(({ label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "rgba(255,255,255,0.05)", borderRadius: "0.5rem", padding: "1rem 1.25rem" }}>
                <Check size={16} style={{ color: gold, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.85)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CURRICULUM ───────────────────────────────────────────────── */}
      <section id="curriculum" style={{ background: cream, padding: "5rem 1.5rem" }}>
        <div className="container" style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, color: navy, marginBottom: "0.75rem" }}>
              Course Curriculum
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: textMuted }}>
              {modules.length} modules · Self-paced
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {modules.map((mod) => (
              <div
                key={mod.id}
                style={{ background: white, borderRadius: "0.75rem", border: `1px solid ${openModule === mod.id ? gold : "rgba(0,0,0,0.08)"}`, overflow: "hidden", transition: "border-color 0.2s" }}
              >
                <button
                  onClick={() => setOpenModule(openModule === mod.id ? null : mod.id)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: openModule === mod.id ? gold : "rgba(212,175,55,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: openModule === mod.id ? navy : gold, flexShrink: 0, transition: "all 0.2s" }}>
                      {mod.id}
                    </span>
                    <div>
                      <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: navy, display: "block" }}>{mod.title}</span>                    </div>
                  </div>
                  <span style={{ color: gold, flexShrink: 0 }}>
                    {openModule === mod.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>

                {openModule === mod.id && (
                  <div style={{ padding: "0 1.5rem 1.5rem" }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: textBody, lineHeight: 1.7, marginBottom: "1rem", borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "1rem" }}>
                      {mod.description}
                    </p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      {mod.topics.map((topic) => (
                        <li key={topic} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: textBody }}>
                          <Check size={14} style={{ color: gold, marginTop: "2px", flexShrink: 0 }} />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING / ENROLL ─────────────────────────────────────────── */}
      <section style={{ background: navy, padding: "5rem 1.5rem" }}>
        <div className="container" style={{ maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 700, color: white, marginBottom: "0.75rem" }}>
            Ready to Start Investing?
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.65)", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            Join 119+ students who have already started their investing journey with Sounia Gill.
          </p>

          {/* Rating */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
            {[1,2,3,4,5].map(i => <Star key={i} size={20} fill={gold} color={gold} />)}
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "1rem", color: white, marginLeft: "0.25rem" }}>5.0</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>(119 reviews)</span>
          </div>

          {/* Price card */}
          <div style={{ background: "rgba(255,255,255,0.05)", border: `1px solid rgba(212,175,55,0.3)`, borderRadius: "1rem", padding: "2.5rem 2rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.35)", textDecoration: "line-through" }}>$436.25</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "3rem", fontWeight: 700, color: gold }}>$349</span>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: "2rem" }}>One-time payment · Lifetime access</p>

            <a
              href={WHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", width: "100%", background: gold, color: navy, fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "1.05rem", padding: "1rem", borderRadius: "0.5rem", textDecoration: "none", marginBottom: "1rem" }}
            >
              Enroll on Whop <ExternalLink size={16} />
            </a>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {["Instant access after purchase", "All future updates included"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}>
                  <Check size={14} style={{ color: gold }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.55)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>
            Secure checkout powered by Whop · Trusted by 2,700+ students
          </p>
        </div>
      </section>

      {/* ─── INSTRUCTOR ───────────────────────────────────────────────── */}
      <section style={{ background: cream, padding: "5rem 1.5rem" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ background: white, borderRadius: "1rem", padding: "3rem", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: "240px" }}>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: gold, marginBottom: "0.5rem" }}>Your Instructor</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: navy, marginBottom: "0.75rem" }}>Sounia Gill</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: textBody, lineHeight: 1.7, marginBottom: "1rem" }}>
                  Sounia Gill is the founder of GIFT of Trading — Gill Investment Futures Trading. She began trading in 2020, mastered her craft, and started teaching in 2022. Since then she has built a global community of 2,700+ students, with 62+ achieving millionaire milestones.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: textBody, lineHeight: 1.7 }}>
                  Known for her clarity, integrity, and no-gatekeeping teaching style, Sounia breaks down complex financial concepts into actionable steps that anyone can follow — regardless of their background.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", minWidth: "180px" }}>
                {[
                  { num: "2,700+", label: "Students Taught" },
                  { num: "5.0★", label: "Average Rating" },
                  { num: "119", label: "Course Reviews" },
                  { num: "10+", label: "Years Experience" },
                ].map(({ num, label }) => (
                  <div key={label} style={{ textAlign: "center", background: "rgba(212,175,55,0.07)", borderRadius: "0.5rem", padding: "0.75rem 1rem" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: navy }}>{num}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: textMuted }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────── */}
      <section style={{ background: navy, padding: "5rem 1.5rem" }}>
        <div className="container" style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 700, color: white }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: "0.75rem", border: `1px solid ${openFaq === i ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.08)"}`, overflow: "hidden", transition: "border-color 0.2s" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                >
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: white }}>{faq.q}</span>
                  <span style={{ color: gold, flexShrink: 0, marginLeft: "1rem" }}>
                    {openFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 1.5rem 1.5rem" }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1rem", margin: 0 }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
      <section style={{ background: cream, padding: "5rem 1.5rem" }}>
        <div className="container" style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, color: navy, marginBottom: "1rem" }}>
            Start Your Investing Journey Today
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: textBody, lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "520px", margin: "0 auto 2.5rem" }}>
            The best time to start was yesterday. The second best time is now. Join 119+ students who are already building their financial future with Sounia Gill.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <a
              href={WHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: navy, color: white, fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "1rem", padding: "0.9rem 2.2rem", borderRadius: "0.5rem", textDecoration: "none" }}
            >
              Enroll Now — $349 <ExternalLink size={16} />
            </a>
            <Link href="/contact">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.9rem 2rem", borderRadius: "0.5rem", border: `1.5px solid ${navy}`, color: navy, fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none", cursor: "pointer" }}>
                Ask a Question <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
