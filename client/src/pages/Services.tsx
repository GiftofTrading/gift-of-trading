import { useEffect } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { updateMetaTags } from "@/lib/meta";
import { trackButtonClick } from "@/lib/analytics";
import { ArrowRight, CheckCircle, Shield } from "lucide-react";
import "./HomeEditorial.css";

interface Pillar {
  id: string;
  step: string;
  badge: string;
  title: string;
  headline: string;
  description: string;
  topics: string[];
}

const PILLARS: Pillar[] = [
  {
    id: "stocks",
    step: "PILLAR 01",
    badge: "FOUNDATIONS & WEALTH BUILDING",
    title: "Stock Market Mastery & Long-Term Investing",
    headline: "Build sustainable wealth without staring at screens all day.",
    description:
      "A complete ground-up framework for equities, index ETFs, compound growth, and corporate valuation. Learn how to identify blue-chip opportunities, build a resilient portfolio, and protect your capital in volatile market regimes.",
    topics: [
      "Market Fundamentals: Shares, Exchanges, Orders & Brokerage Setup",
      "ETF & Index Investing: Dollar-Cost Averaging & Asset Allocation",
      "Technical Charting: Support, Resistance, Moving Averages & Volume",
      "Fundamental Screening: P/E Ratios, Free Cash Flow & Sector Cycles",
      "Risk Mitigation: Position Sizing, Stop Rules & Drawdown Defense",
      "Tax-Advantaged Growth: TFSA, RRSP, 401(k) & Long-Term Compound Growth",
    ],
  },
  {
    id: "options",
    step: "PILLAR 02",
    badge: "ADVANCED STRATEGY & INCOME",
    title: "Options Trading & Defined-Risk Spreads",
    headline: "Generate consistent income and hedge volatility with mathematical edge.",
    description:
      "Demystify calls, puts, credit spreads, and the Greeks with zero jargon. Learn how defined-risk structures allow you to profit whether the market goes up, down, or sideways—while keeping maximum risk strictly capped.",
    topics: [
      "Options Mechanics: Contract Specs, Calls vs. Puts & Exercise Rules",
      "The Greeks Simplified: Delta, Theta, Vega & Implied Volatility (IVR)",
      "Defined-Risk Credit Spreads: Bull Put & Bear Call Spreads",
      "Market-Neutral Cashflow: Iron Condors & Strangle Alterations",
      "Earnings Season Frameworks & High Volatility Playbooks",
      "Defensive Trade Management: Rolling, Adjusting & Wing Defense",
    ],
  },
  {
    id: "mentorship",
    step: "PILLAR 03",
    badge: "PRACTICAL EXECUTION & MENTORSHIP",
    title: "Live Market Sessions & 1-on-1 Mentorship",
    headline: "Bridge the gap between theoretical knowledge and real-time execution.",
    description:
      "Observe live market tape, trade setups, and execution breakdowns directly with Sounia Gill. Receive direct feedback, build a personalized trading journal, and develop the emotional discipline required for lifetime trading success.",
    topics: [
      "Live Chart Breakdown & Pre-Market Routine Walkthroughs",
      "Real-Time Trade Ideation & Risk-to-Reward Structuring",
      "Trade Journaling & Post-Trade Analysis",
      "Emotional Discipline & Psychology Management",
      "One-on-One Portfolio & Strategy Alignment",
      "Interactive Q&A and Practical Execution Coaching",
    ],
  },
];

const FAQS = [
  {
    q: "Are the educational programs suitable for complete beginners?",
    a: "Yes. Sounia Gill designs all curriculum starting from first principles. We assume zero prior finance knowledge, beginning with platform basics, market terminology, and candlestick reading before moving to advanced strategy.",
  },
  {
    q: "Which charting and broker platforms do you teach?",
    a: "We provide comprehensive step-by-step walkthroughs for TradingView, Interactive Brokers (IBKR), and Webull, so students can analyze and trade seamlessly from anywhere in the world.",
  },
  {
    q: "How can I inquire about upcoming learning opportunities?",
    a: "Reach out directly through our Contact Us page or join one of our live webinars. We'll be happy to provide guidance on upcoming sessions.",
  },
  {
    q: "Do you offer investment or financial advice?",
    a: "No. All programs, workshops, and materials are strictly educational. We teach technical frameworks, chart reading, and risk management principles so you can make disciplined, independent financial decisions.",
  },
];

export default function Services() {
  useEffect(() => {
    updateMetaTags({
      title: "Educational Curriculum Pillars — Gift of Trading Academy",
      description: "Explore the Gift of Trading curriculum pillars and foundational frameworks for stocks and options education with Sounia Gill.",
      keywords: "trading education, stock market education, options strategy, Sounia Gill",
      ogTitle: "Educational Curriculum Pillars — Gift of Trading Academy",
      ogDescription: "Explore the Gift of Trading curriculum pillars and foundational frameworks for stocks and options education with Sounia Gill.",
      canonicalUrl: "https://giftoftrading.com/services",
    });
  }, []);

  return (
    <Layout>
      <div className="editorial-body">
        {/* ── HERO BANNER ── */}
        <section
          className="services-hero-banner"
          style={{
            background: "#091c2d",
            padding: "85px 20px 75px",
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
              Explore our core educational curriculum pillars and foundational frameworks taught step by step by Sounia Gill.
            </p>

            <Link href="/contact">
              <span
                className="btn-banner-gold cursor-pointer"
                onClick={() => trackButtonClick("services_hero_contact")}
                style={{ display: "inline-flex" }}
              >
                Get In Touch <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </section>

        {/* ── CURRICULUM PILLARS SECTION ── */}
        <section className="editorial-section" style={{ background: "#FFFFFF", padding: "70px 20px" }}>
          <div className="editorial-wrap">
            <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 50px" }}>
              <p className="section-label-gold">Core Learning Structure</p>
              <h2 className="section-title-large">Three Pillars of Trading Literacy</h2>
              <p className="section-subtitle" style={{ margin: "0 auto" }}>
                Our educational framework is engineered to transition students from complete market novices into calm, mathematically disciplined market participants.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.id}
                  style={{
                    background: "var(--e-paper)",
                    border: "1px solid var(--e-line)",
                    borderRadius: "14px",
                    padding: "36px 32px",
                    boxShadow: "0 10px 30px rgba(6, 17, 29, 0.04)",
                  }}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "var(--e-gold)" }}>
                        {pillar.step}
                      </span>
                      <span style={{ fontSize: "11px", fontWeight: 600, padding: "3px 8px", background: "var(--e-gold-bg)", color: "var(--e-gold)", borderRadius: "4px" }}>
                        {pillar.badge}
                      </span>
                    </div>
                  </div>

                  <h3 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "28px", fontWeight: 500, color: "var(--e-navy)", marginBottom: "8px" }}>
                    {pillar.title}
                  </h3>
                  <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--e-gold)", marginBottom: "12px" }}>
                    {pillar.headline}
                  </p>
                  <p style={{ fontSize: "15px", color: "var(--e-muted)", lineHeight: 1.6, marginBottom: "24px" }}>
                    {pillar.description}
                  </p>

                  <div style={{ background: "#FFFFFF", border: "1px solid var(--e-line)", borderRadius: "10px", padding: "24px" }}>
                    <h4 style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--e-navy)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <Shield size={15} style={{ color: "var(--e-gold)" }} /> Core Syllabus Topics
                    </h4>
                    <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px", padding: 0, margin: 0, listStyle: "none" }}>
                      {pillar.topics.map((t, idx) => (
                        <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "var(--e-navy)" }}>
                          <CheckCircle size={16} style={{ color: "var(--e-gold)", flexShrink: 0, marginTop: "2px" }} />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginTop: "28px" }}>
                    <Link href="/contact">
                      <span
                        className="btn-card-action btn-card-enroll cursor-pointer"
                        style={{ width: "100%", display: "inline-flex", justifyContent: "center", alignItems: "center", gap: "8px" }}
                        onClick={() => trackButtonClick(`services_inquire_${pillar.id}`)}
                      >
                        Inquire About This Track <ArrowRight size={14} />
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
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
                <span className="btn-hero-action cursor-pointer" style={{ background: "transparent", border: "1px solid var(--e-navy)", color: "var(--e-navy)", boxShadow: "none" }}>
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
