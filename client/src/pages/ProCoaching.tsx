import Layout from "@/components/Layout";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, Clock, Users, Video, Star, Zap, Target, Shield, MessageCircle } from "lucide-react";

const IMGS = {
  sounia1: "/images/sounia-1_470e99c3.jpg",
  sounia3: "/images/sounia-3_67fb747f.jpg",
  testimonialJim: "/images/testimonial-jim_c5862ebd.jpg",
  testimonialMatthew: "/images/testimonial-matthew_81761078.jpg",
};

const coachingBenefits = [
  "6 weekly 1-hour Zoom sessions with Sounia",
  "Personalized strategy based on your goals & schedule",
  "Real-time trade analysis and live feedback",
  "Smart money management and position sizing",
  "Trading psychology and emotional discipline coaching",
  "Homework and trade journaling guidance",
  "Follow-up support between sessions via Discord",
  "Long-term investment strategy for 10–20+ year growth",
  "IBKR and Webull account setup assistance",
  "Recorded session replays for review",
];

const weeklyPlan = [
  { week: "Week 1", title: "Foundation & Goal Setting", desc: "Understand your current level, set clear goals, and build a personalized trading plan." },
  { week: "Week 2", title: "Strategy Development", desc: "Design a trading strategy that fits your lifestyle, risk tolerance, and financial goals." },
  { week: "Week 3", title: "Live Trade Analysis", desc: "Analyze real trades together. Identify patterns, refine entries and exits." },
  { week: "Week 4", title: "Risk Management Mastery", desc: "Deep dive into position sizing, stop-loss placement, and capital preservation." },
  { week: "Week 5", title: "Psychology & Discipline", desc: "Build the mental resilience to trade without fear, greed, or emotional decisions." },
  { week: "Week 6", title: "Long-Term Wealth Plan", desc: "Create a sustainable wealth-building roadmap combining trading and long-term investing." },
];

const testimonials = [
  {
    photo: IMGS.testimonialJim,
    name: "Jim Gakami",
    quote: "What makes GIFT different? Simple — Sounia's brilliance! Her ability to break down complex market strategies into manageable content is remarkable. Best decision I ever made.",
    stars: 5,
  },
  {
    photo: IMGS.testimonialMatthew,
    name: "Matthew Valentine",
    quote: "Finally, a trading teacher who truly cares about the success of her students! From beginner to millionaire trader, Sounia has the tools and strategies to improve every investor.",
    stars: 5,
  },
];

export default function ProCoaching() {
  return (
    <Layout>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--navy)", paddingTop: 120, paddingBottom: 80 }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="tag-gold mb-5">Most Personalized</div>
              <p className="section-label-gold mb-3">1-on-1 Program</p>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 4.5vw, 4rem)", fontWeight: 500, lineHeight: 1.1, color: "var(--cream)", marginBottom: "1.25rem" }}>
                Pro Coaching:{" "}
                <em style={{ color: "var(--gold)" }}>Just You & Sounia</em>
              </h1>
              <p className="text-base leading-relaxed mb-8" style={{ color: "oklch(70% 0.02 255)", fontFamily: "'Inter', sans-serif", maxWidth: 500 }}>
                Six weeks of personalized weekly Zoom sessions tailored entirely to your goals, experience level, and schedule. The most direct path to trading mastery.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact">
                  <span className="btn-gold">Apply for Coaching <ArrowRight size={16} /></span>
                </Link>
                <Link href="/contact">
                  <span className="btn-ghost-light">Book Free Consultation</span>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Clock, label: "6 Weeks", sub: "Intensive program" },
                { icon: Video, label: "Weekly Zoom", sub: "1-hour sessions" },
                { icon: MessageCircle, label: "Discord Access", sub: "Between sessions" },
                { icon: Target, label: "100% Custom", sub: "Built for you" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="p-5 rounded-2xl" style={{ background: "oklch(19% 0.055 255)", border: "1px solid oklch(28% 0.07 255)" }}>
                  <Icon size={22} style={{ color: "var(--gold)", marginBottom: 10 }} />
                  <p className="font-semibold text-sm" style={{ color: "var(--cream)", fontFamily: "'Inter', sans-serif" }}>{label}</p>
                  <p className="text-xs" style={{ color: "oklch(60% 0.02 255)" }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ──────────────────────────────────────────────── */}
      <section className="section-py" style={{ background: "white" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden" style={{ height: 460, boxShadow: "0 24px 64px oklch(15% 0.06 255 / 0.12)" }}>
                <img src={IMGS.sounia3} alt="Sounia Gill 1-on-1 coaching" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 px-5 py-4 rounded-2xl" style={{ background: "var(--navy)", boxShadow: "0 8px 24px oklch(15% 0.06 255 / 0.25)" }}>
                <div className="flex gap-1 mb-1">
                  {[1,2,3,4,5].map((i) => <Star key={i} size={12} fill="var(--gold)" style={{ color: "var(--gold)" }} />)}
                </div>
                <p className="text-sm font-semibold" style={{ color: "var(--cream)", fontFamily: "'Playfair Display', serif" }}>Trusted by 2,700+ Students</p>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <p className="section-label mb-3">What's Included</p>
              <h2 className="editorial-heading mb-6">
                Everything You Need to{" "}
                <span style={{ color: "var(--gold)" }}>Succeed</span>
              </h2>
              <div className="space-y-3 mb-8">
                {coachingBenefits.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <CheckCircle size={16} style={{ color: "var(--gold)", flexShrink: 0, marginTop: 2 }} />
                    <span className="text-sm" style={{ color: "var(--text-body)", fontFamily: "'Inter', sans-serif" }}>{b}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact">
                <span className="btn-primary">Apply Now <ArrowRight size={16} /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6-WEEK PLAN ──────────────────────────────────────────────────── */}
      <section className="section-py section-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="section-label mb-3">The Program</p>
            <h2 className="editorial-heading mb-4">
              Your 6-Week{" "}
              <span style={{ color: "var(--gold)" }}>Transformation Plan</span>
            </h2>
            <p className="body-muted mx-auto" style={{ maxWidth: 500 }}>
              Each week is designed to build on the last, taking you from where you are now to where you want to be.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {weeklyPlan.map((w, i) => (
              <div
                key={w.week}
                className="p-6 rounded-2xl"
                style={{ background: "white", border: "1px solid oklch(88% 0.018 80)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: "var(--navy)", color: "var(--gold)", fontFamily: "'Inter', sans-serif" }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--gold)", fontFamily: "'Inter', sans-serif" }}>{w.week}</span>
                </div>
                <h3 className="font-semibold mb-2" style={{ fontFamily: "'Inter', sans-serif", color: "var(--navy)", fontSize: "0.95rem" }}>{w.title}</h3>
                <p className="text-sm" style={{ color: "var(--text-body)" }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="section-py section-dark">
        <div className="container">
          <div className="text-center mb-12">
            <p className="section-label-gold mb-3">Student Results</p>
            <h2 className="editorial-heading-light mb-4">What Students Say</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 rounded-2xl" style={{ background: "oklch(19% 0.055 255)", border: "1px solid oklch(28% 0.07 255)" }}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => <Star key={i} size={13} fill="var(--gold)" style={{ color: "var(--gold)" }} />)}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "oklch(78% 0.015 255)", fontStyle: "italic" }}>"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid oklch(28% 0.07 255)" }}>
                  <img src={t.photo} alt={t.name} className="w-10 h-10 rounded-full object-cover" style={{ border: "2px solid var(--gold)" }} />
                  <p className="text-sm font-semibold" style={{ color: "var(--cream)", fontFamily: "'Inter', sans-serif" }}>{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="section-py section-cream">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="section-label mb-4">Ready to Begin?</p>
            <h2 className="editorial-heading mb-5">
              Apply for 1-on-1{" "}
              <span style={{ color: "var(--gold)" }}>Pro Coaching</span>
            </h2>
            <p className="body-text mb-8">
              Spots are limited. Apply today to secure your place and start your personalized trading transformation with Sounia.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <span className="btn-primary">Apply for Coaching <ArrowRight size={16} /></span>
              </Link>
              <Link href="/services">
                <span className="btn-ghost">Compare All Programs</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
