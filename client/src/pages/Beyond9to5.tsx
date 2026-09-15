import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { updateMetaTags, addJsonLdSchema, createEventSchema } from "@/lib/meta";
import { trackButtonClick } from "@/lib/analytics";
import {
  Calendar,
  Clock,
  Video,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  Brain,
  Compass,
  Users,
  ShieldCheck,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import "./HomeEditorial.css";

const WHOP_CHECKOUT_URL = "https://whop.com/checkout/plan_JkSf0M7mT7mrA";
const EVENT_DATE = new Date("2026-09-30T17:00:00-07:00");

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const diff = EVENT_DATE.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    calculate();
    const id = setInterval(calculate, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 my-6">
      {[
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Minutes" },
        { value: timeLeft.seconds, label: "Seconds" },
      ].map(({ value, label }) => (
        <div
          key={label}
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            borderRadius: "10px",
            minWidth: "68px",
            padding: "8px 10px",
            textAlign: "center",
            backdropFilter: "blur(6px)",
          }}
        >
          <div
            style={{
              fontFamily: "'Newsreader', Georgia, serif",
              fontSize: "clamp(22px, 3.5vw, 32px)",
              fontWeight: 600,
              color: "#E5B84A",
              lineHeight: 1,
            }}
          >
            {String(value).padStart(2, "0")}
          </div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "rgba(255, 255, 255, 0.65)",
              marginTop: "4px",
            }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Beyond9to5() {
  useEffect(() => {
    updateMetaTags({
      title: "Beyond 9 to 5 By Sounia | FREE Live Session with Sounia Gill",
      description: "Join Sounia Gill from Gift of Trading on September 30, 2026 at 5:00 PM Pacific for a FREE live session about exploring trading and side-hustle opportunities beyond your traditional 9-to-5.",
      keywords: "Beyond 9 to 5, Sounia Gill, Gift of Trading, free trading webinar, side hustle, stock trading for beginners, wealth building, trading live session",
      ogTitle: "Beyond 9 to 5 By Sounia — FREE Live Session with Sounia Gill",
      ogDescription: "Build. Trade. Create. Grow. Reserve your free spot for September 30, 2026 at 5:00 PM Pacific Time.",
      ogImage: "https://giftoftrading.com/images/gift-logo_e37ab5cd.png",
      canonicalUrl: "https://giftoftrading.com/beyond-9-to-5",
    });

    const eventSchema = createEventSchema({
      name: "Beyond 9 to 5 By Sounia",
      description: "Join Sounia Gill from Gift of Trading for a FREE live session about exploring trading and side-hustle opportunities beyond your traditional 9-to-5.",
      startDate: EVENT_DATE.toISOString(),
      url: "https://giftoftrading.com/beyond-9-to-5",
      organizer: "Sounia Gill | Gift of Trading",
    });
    addJsonLdSchema(eventSchema);
  }, []);

  const handleCtaClick = (location: string) => {
    trackButtonClick(`beyond9to5_whop_cta_${location}`);
  };

  return (
    <Layout>
      <div className="editorial-body" style={{ background: "#06111D", color: "#FFFFFF" }}>
        {/* ── SECTION 1: HERO BANNER ── */}
        <section
          style={{
            position: "relative",
            background: "linear-gradient(180deg, #091C2D 0%, #06111D 100%)",
            padding: "80px 20px 70px",
            overflow: "hidden",
            borderBottom: "1px solid rgba(212, 175, 55, 0.18)",
          }}
        >
          {/* Subtle Ambient Glow Background */}
          <div
            style={{
              position: "absolute",
              top: "-10%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "750px",
              height: "450px",
              background: "radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(9, 28, 45, 0) 70%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          <div
            className="editorial-wrap"
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: "860px",
              textAlign: "center",
              margin: "0 auto",
            }}
          >
            {/* Live Event Pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(212, 175, 55, 0.12)",
                border: "1px solid rgba(212, 175, 55, 0.35)",
                borderRadius: "9999px",
                padding: "6px 18px",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#E5B84A",
                marginBottom: "22px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#10B981",
                  boxShadow: "0 0 8px #10B981",
                }}
              />
              FREE LIVE SESSION • HOSTED BY SOUNIA GILL
            </div>

            {/* Eyebrow & Headline */}
            <p
              style={{
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255, 255, 255, 0.6)",
                marginBottom: "12px",
              }}
            >
              BEYOND 9 TO 5 BY SOUNIA
            </p>

            <h1
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: "clamp(42px, 7vw, 68px)",
                fontWeight: 500,
                lineHeight: 1.08,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
                marginBottom: "18px",
              }}
            >
              Build. Trade. Create.{" "}
              <em style={{ fontStyle: "italic", color: "#E5B84A" }}>Grow.</em>
            </h1>

            <p
              style={{
                fontSize: "clamp(16px, 2.5vw, 19px)",
                lineHeight: 1.6,
                color: "rgba(255, 255, 255, 0.85)",
                maxWidth: "680px",
                margin: "0 auto 24px",
              }}
            >
              Join Sounia Gill from Gift of Trading for a <strong>FREE live session</strong> about exploring trading and side-hustle opportunities beyond your traditional 9-to-5.
            </p>

            {/* Date & Time Highlights Strip */}
            <div
              style={{
                display: "inline-flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "18px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "12px",
                padding: "12px 24px",
                marginBottom: "10px",
              }}
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "#E5B84A" }}>
                <Calendar size={17} /> September 30, 2026
              </span>
              <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>•</span>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/90">
                <Clock size={17} style={{ color: "#E5B84A" }} /> 5:00 PM Pacific Time (Vancouver)
              </span>
              <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>•</span>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400">
                <Video size={17} /> 100% FREE Access
              </span>
            </div>

            {/* Countdown Component */}
            <CountdownTimer />

            {/* Primary CTA Button */}
            <div style={{ marginTop: "16px", marginBottom: "24px" }}>
              <a
                href={WHOP_CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-banner-gold"
                style={{
                  fontSize: "17px",
                  padding: "18px 40px",
                  borderRadius: "8px",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: "0 8px 30px rgba(212, 168, 71, 0.45)",
                }}
                onClick={() => handleCtaClick("hero")}
              >
                RESERVE MY FREE SPOT <ArrowRight size={20} />
              </a>
            </div>

            {/* Proof Badges */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "24px",
                fontSize: "13px",
                color: "rgba(255, 255, 255, 0.65)",
              }}
            >
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={16} style={{ color: "#E5B84A" }} /> No Credit Card Required
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users size={16} style={{ color: "#E5B84A" }} /> Beginners Welcome
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles size={16} style={{ color: "#E5B84A" }} /> Live Q&A with Sounia
              </span>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: WHAT YOU'LL EXPLORE ── */}
        <section
          style={{
            padding: "85px 20px",
            background: "#081624",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="editorial-wrap" style={{ maxWidth: "1100px" }}>
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 52px" }}>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#E5B84A",
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                SESSION AGENDA
              </span>
              <h2
                style={{
                  fontFamily: "'Newsreader', Georgia, serif",
                  fontSize: "clamp(30px, 4.5vw, 44px)",
                  fontWeight: 500,
                  color: "#FFFFFF",
                  letterSpacing: "-0.01em",
                  marginBottom: "14px",
                }}
              >
                What You’ll Explore
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.6 }}>
                A structured, high-energy session designed to give you practical clarity without confusing financial jargon or get-rich-quick hype.
              </p>
            </div>

            {/* 4 Visual Cards Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "24px",
              }}
            >
              {/* Card 1: TRADING */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(212, 175, 55, 0.25)",
                  borderRadius: "14px",
                  padding: "32px 26px",
                  position: "relative",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "rgba(212, 175, 55, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#E5B84A",
                    marginBottom: "20px",
                  }}
                >
                  <TrendingUp size={24} />
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#E5B84A",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  01 • FOUNDATIONAL SKILL
                </span>
                <h3
                  style={{
                    fontFamily: "'Newsreader', Georgia, serif",
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    marginBottom: "12px",
                  }}
                >
                  TRADING
                </h3>
                <p style={{ fontSize: "15px", lineHeight: 1.6, color: "rgba(255, 255, 255, 0.75)" }}>
                  Understand the basics of trading and how people approach it as a potential additional income skill with structured risk control.
                </p>
              </div>

              {/* Card 2: SIDE HUSTLES */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(212, 175, 55, 0.25)",
                  borderRadius: "14px",
                  padding: "32px 26px",
                  position: "relative",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "rgba(212, 175, 55, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#E5B84A",
                    marginBottom: "20px",
                  }}
                >
                  <Briefcase size={24} />
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#E5B84A",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  02 • DIVERSIFICATION
                </span>
                <h3
                  style={{
                    fontFamily: "'Newsreader', Georgia, serif",
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    marginBottom: "12px",
                  }}
                >
                  SIDE HUSTLES
                </h3>
                <p style={{ fontSize: "15px", lineHeight: 1.6, color: "rgba(255, 255, 255, 0.75)" }}>
                  Explore different ways to develop skills and income opportunities outside your traditional job that fit into busy everyday schedules.
                </p>
              </div>

              {/* Card 3: MINDSET */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(212, 175, 55, 0.25)",
                  borderRadius: "14px",
                  padding: "32px 26px",
                  position: "relative",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "rgba(212, 175, 55, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#E5B84A",
                    marginBottom: "20px",
                  }}
                >
                  <Brain size={24} />
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#E5B84A",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  03 • PSYCHOLOGY & CLARITY
                </span>
                <h3
                  style={{
                    fontFamily: "'Newsreader', Georgia, serif",
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    marginBottom: "12px",
                  }}
                >
                  MINDSET
                </h3>
                <p style={{ fontSize: "15px", lineHeight: 1.6, color: "rgba(255, 255, 255, 0.75)" }}>
                  Learn how to start thinking beyond a single source of income and cultivate the emotional discipline required for wealth expansion.
                </p>
              </div>

              {/* Card 4: NEXT STEPS */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(212, 175, 55, 0.25)",
                  borderRadius: "14px",
                  padding: "32px 26px",
                  position: "relative",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "rgba(212, 175, 55, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#E5B84A",
                    marginBottom: "20px",
                  }}
                >
                  <Compass size={24} />
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#E5B84A",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  04 • ACTIONABLE ROADMAP
                </span>
                <h3
                  style={{
                    fontFamily: "'Newsreader', Georgia, serif",
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    marginBottom: "12px",
                  }}
                >
                  NEXT STEPS
                </h3>
                <p style={{ fontSize: "15px", lineHeight: 1.6, color: "rgba(255, 255, 255, 0.75)" }}>
                  Walk away with concrete, practical ideas and actionable steps you can explore immediately after the session concludes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: WHO IS THIS FOR? ── */}
        <section
          style={{
            padding: "85px 20px",
            background: "#06111D",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="editorial-wrap" style={{ maxWidth: "960px" }}>
            <div style={{ textAlign: "center", marginBottom: "44px" }}>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#E5B84A",
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                IS THIS FOR YOU?
              </span>
              <h2
                style={{
                  fontFamily: "'Newsreader', Georgia, serif",
                  fontSize: "clamp(30px, 4.5vw, 42px)",
                  fontWeight: 500,
                  color: "#FFFFFF",
                }}
              >
                Who Is This Session For?
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "18px",
              }}
            >
              {[
                {
                  title: "People Working a Traditional 9-to-5",
                  desc: "Looking for sustainable ways to build financial security without quitting their primary career.",
                },
                {
                  title: "Anyone Curious About Trading",
                  desc: "Intrigued by the stock and options market but overwhelmed by jargon, formulas, and bad online advice.",
                },
                {
                  title: "People Exploring Side-Hustle Ideas",
                  desc: "Ready to develop high-leverage digital and investment skills that scale over time.",
                },
                {
                  title: "Beginners Who Want to Learn",
                  desc: "Starting with zero prior finance background and desiring a calm, step-by-step mentor.",
                },
                {
                  title: "Anyone Seeking Additional Income",
                  desc: "Committed to creating multiple streams of revenue and achieving personal financial independence.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.09)",
                    borderRadius: "12px",
                    padding: "24px 22px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "rgba(212, 175, 55, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#E5B84A",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: "17px",
                        fontWeight: 600,
                        color: "#FFFFFF",
                        marginBottom: "6px",
                      }}
                    >
                      {item.title}
                    </h4>
                    <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.65)", lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mid-page CTA */}
            <div style={{ textAlign: "center", marginTop: "44px" }}>
              <a
                href={WHOP_CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-banner-gold"
                style={{
                  fontSize: "16px",
                  padding: "16px 36px",
                  borderRadius: "8px",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onClick={() => handleCtaClick("who_is_this_for")}
              >
                RESERVE MY FREE SPOT <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: MEET YOUR HOST ── */}
        <section
          style={{
            padding: "85px 20px",
            background: "#081624",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="editorial-wrap" style={{ maxWidth: "960px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "40px",
                alignItems: "center",
              }}
            >
              {/* Photo Card */}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    inset: "-6px",
                    background: "linear-gradient(135deg, rgba(212, 175, 55, 0.4) 0%, rgba(9, 28, 45, 0) 70%)",
                    borderRadius: "16px",
                    zIndex: 0,
                  }}
                />
                <img
                  src="/images/sounia-desk.jpg"
                  alt="Sounia Gill at trading desk"
                  style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    height: "380px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                  }}
                  loading="lazy"
                />
              </div>

              {/* Bio Details */}
              <div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#E5B84A",
                    display: "block",
                    marginBottom: "10px",
                  }}
                >
                  MEET YOUR INSTRUCTOR
                </span>
                <h2
                  style={{
                    fontFamily: "'Newsreader', Georgia, serif",
                    fontSize: "clamp(28px, 4vw, 38px)",
                    fontWeight: 500,
                    color: "#FFFFFF",
                    marginBottom: "14px",
                  }}
                >
                  Sounia Gill <span style={{ fontSize: "20px", color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>| Gift of Trading</span>
                </h2>
                <p style={{ fontSize: "15px", lineHeight: 1.65, color: "rgba(255, 255, 255, 0.8)", marginBottom: "16px" }}>
                  Sounia Gill is the founder of Gift of Trading and has taught more than 2,700 students across North America how to navigate financial markets with clarity, structured risk rules, and emotional discipline.
                </p>
                <p style={{ fontSize: "15px", lineHeight: 1.65, color: "rgba(255, 255, 255, 0.8)", marginBottom: "24px" }}>
                  In "Beyond 9 to 5", Sounia shares the exact mental shifts and practical frameworks that allowed her to build real financial freedom—showing everyday professionals how to think beyond a single paycheck.
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(212, 175, 55, 0.3)",
                      borderRadius: "6px",
                      padding: "6px 12px",
                      fontSize: "13px",
                      color: "#E5B84A",
                      fontWeight: 600,
                    }}
                  >
                    2,700+ Students Mentored
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(212, 175, 55, 0.3)",
                      borderRadius: "6px",
                      padding: "6px 12px",
                      fontSize: "13px",
                      color: "#E5B84A",
                      fontWeight: 600,
                    }}
                  >
                    4.96/5 Student Satisfaction
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: FAQS ── */}
        <section
          style={{
            padding: "85px 20px",
            background: "#06111D",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="editorial-wrap" style={{ maxWidth: "780px" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#E5B84A",
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                COMMON QUESTIONS
              </span>
              <h2
                style={{
                  fontFamily: "'Newsreader', Georgia, serif",
                  fontSize: "clamp(28px, 4vw, 38px)",
                  fontWeight: 500,
                  color: "#FFFFFF",
                }}
              >
                Frequently Asked Questions
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                {
                  q: "Is the session free?",
                  a: "Yes. Beyond 9 to 5 is a FREE live session. There is no cost, no credit card required, and no hidden obligation to attend.",
                },
                {
                  q: "Do I need trading experience?",
                  a: "No. The session is designed to be fully accessible to complete beginners. Sounia breaks down concepts into simple, everyday language without complex financial jargon.",
                },
                {
                  q: "When is the session?",
                  a: "September 30, 2026 at 5:00 PM Pacific Time (Vancouver time). We recommend adding it to your calendar immediately after registering.",
                },
                {
                  q: "How do I attend?",
                  a: "Register through the Whop registration link. Your access link and calendar invitation will be provided immediately upon reserving your spot.",
                },
              ].map((faq, idx) => (
                <details
                  key={idx}
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    padding: "18px 22px",
                    cursor: "pointer",
                  }}
                >
                  <summary
                    style={{
                      fontSize: "17px",
                      fontWeight: 600,
                      color: "#FFFFFF",
                      listStyle: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} style={{ color: "#E5B84A" }} />
                  </summary>
                  <div
                    style={{
                      marginTop: "12px",
                      fontSize: "15px",
                      color: "rgba(255, 255, 255, 0.75)",
                      lineHeight: 1.6,
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      paddingTop: "12px",
                    }}
                  >
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 6: FINAL CONVERSION BANNER ── */}
        <section
          style={{
            padding: "90px 20px",
            background: "linear-gradient(180deg, #091C2D 0%, #040C15 100%)",
            textAlign: "center",
            position: "relative",
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
              onClick={() => handleCtaClick("bottom_banner")}
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

        {/* ── MOBILE STICKY FLOATING CTA BAR ── */}
        <div
          className="lg:hidden"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(6, 17, 29, 0.96)",
            borderTop: "1px solid rgba(212, 175, 55, 0.3)",
            padding: "12px 18px",
            zIndex: 40,
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#E5B84A" }}>
              BEYOND 9 TO 5
            </div>
            <div style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.7)" }}>
              Sept 30 • 5:00 PM PT • FREE
            </div>
          </div>

          <a
            href={WHOP_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-banner-gold"
            style={{
              padding: "10px 20px",
              fontSize: "13px",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
            onClick={() => handleCtaClick("mobile_sticky")}
          >
            RESERVE FREE SPOT <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </Layout>
  );
}
