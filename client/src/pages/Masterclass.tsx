import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
// REMOVED: MasterclassApplicationForm import - replaced with direct Whop checkout link
import { MasterclassCourseCard } from "@/components/MasterclassCourseCard";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { updateMetaTags } from "@/lib/meta";

export default function Masterclass() {
  useEffect(() => {
    updateMetaTags({
      title: "Options Academy: Zero to Pro | Masterclass by Sounia Gill",
      description: "Master options trading with personalized guidance from Sounia Gill. Group live classes, real-time market analysis, and dedicated Q&A sessions.",
      keywords: "options trading masterclass, options academy, live trading classes, options trading education, Sounia Gill masterclass",
      ogTitle: "Options Academy: Zero to Pro | Masterclass by Sounia Gill",
      ogDescription: "Learn options trading from an expert. Personalized guidance, live classes, and real-time market analysis.",
      canonicalUrl: "https://giftoftrading.com/masterclass",
    });
  }, []);

  // REMOVED: applicationFormOpen state - using direct Whop link instead

  return (
    <Layout>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--navy)", paddingTop: 120, paddingBottom: 80 }}>
        <div className="container">
          <div className="max-w-2xl">
            <p className="section-label-gold mb-4">Exclusive Program</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem, 5vw, 4.5rem)", fontWeight: 500, lineHeight: 1.1, color: "var(--cream)", marginBottom: "1.25rem" }}>
              Options Academy: Zero to Pro
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "oklch(70% 0.02 255)", fontFamily: "'Inter', sans-serif", maxWidth: 520 }}>
              Master options trading with personalized guidance from Sounia. Learn the tools, resources, and mindset hacks for long-term success.
            </p>
            <div className="mt-6 p-4 rounded-lg" style={{ background: "rgba(201, 168, 76, 0.1)", borderLeft: "3px solid #c9a84c" }}>
              <p className="text-sm font-semibold text-[#c9a84c] mb-2">Cohort Started August 18, 2026</p>
              <p className="text-sm" style={{ color: "oklch(70% 0.02 255)" }}>Tuesdays & Thursdays • 5:00 - 6:30 PM PST • Online (Zoom) • 4 Months</p>
              <p className="text-lg font-bold mt-3" style={{ color: "var(--gold)" }}>Price: $3,000</p>
            </div>
            <button 
              disabled
              className="btn-gold mt-8 inline-flex items-center gap-2 opacity-50 cursor-not-allowed"
            >
              Course is Sold Out
            </button>
          </div>
        </div>
      </section>

      {/* ── FOUNDER SECTION ─────────────────────────────────────────────────────────── */}
      <section className="section-py section-light">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden" style={{ height: 500, boxShadow: "0 24px 64px oklch(8% 0.04 255 / 0.4)" }}>
              <img src="/images/sounia-portrait.png" alt="Sounia Gill" className="w-full h-full object-cover object-top" />
            </div>
            <div>
              <h2 className="editorial-heading mb-6">Learn from Sounia</h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-body)" }}>
                Get personalized guidance from Sounia Gill, founder of Gift of Trading. With years of trading experience and a proven track record, she brings real-world insights to every session.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Group Live Classes</h3>
                    <p className="text-sm" style={{ color: "oklch(60% 0.02 255)" }}>Interactive sessions where you learn alongside other traders, ask questions in real-time, and see live market analysis.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Dedicated Q&A Time</h3>
                    <p className="text-sm" style={{ color: "oklch(60% 0.02 255)" }}>Sounia dedicates time in every session to answer your questions directly. No question is too basic or too advanced.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Personalized Feedback</h3>
                    <p className="text-sm" style={{ color: "oklch(60% 0.02 255)" }}>Share your trades and get direct feedback from Sounia to improve your strategy and decision-making.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COURSE CARD ─────────────────────────────────────────────────────────── */}
      <section className="section-py section-light">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <MasterclassCourseCard onApplyClick={() => {}} isSoldOut={true} />
          </div>
        </div>
      </section>

      {/* ── WHAT YOU'LL LEARN ─────────────────────────────────────────────────────────── */}
      <section className="section-py section-dark">
        <div className="container">
          <h2 className="editorial-heading-light mb-12 text-center">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="flex gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-[#c9a84c] flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Options Fundamentals</h3>
                  <p className="text-sm text-gray-300">Deep dive into calls, puts, and advanced strategies</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-[#c9a84c] flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Risk Management</h3>
                  <p className="text-sm text-gray-300">Protect your capital with proven techniques</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-[#c9a84c] flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Trading Psychology</h3>
                  <p className="text-sm text-gray-300">Master emotions and build discipline</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-[#c9a84c] flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Live Trading Sessions</h3>
                  <p className="text-sm text-gray-300">Real-time market analysis and trade execution</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="section-py section-light">
        <div className="container text-center">
          <h2 className="editorial-heading mb-5">Ready to Master Options Trading?</h2>
          <p className="mb-4 text-sm" style={{ color: "var(--text-body)", maxWidth: 460, margin: "0 auto", fontFamily: "'Inter', sans-serif" }}>
            This cohort is currently full and in progress. Stay tuned for future dates!
          </p>
          <p className="mb-8 text-sm font-semibold" style={{ color: "#c9a84c", maxWidth: 460, margin: "0 auto 2rem", fontFamily: "'Inter', sans-serif" }}>
            Cohort started August 18, 2026 • Tuesdays & Thursdays 5:00 - 6:30 PM PST
          </p>
          <button 
            disabled
            className="btn-gold inline-flex items-center gap-2 opacity-50 cursor-not-allowed"
          >
            Course is Sold Out
          </button>
        </div>
      </section>

      {/* ── APPLICATION FORM MODAL - REMOVED - Using direct Whop checkout instead ──────────────────────────────────────────────────────────── */}
    </Layout>
  );
}
