import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { ArrowRight, CheckCircle, Clock, Video, BookOpen, ChevronDown, ChevronUp } from "lucide-react";

const IMGS = {
  sounia3: "/images/sounia-3_67fb747f.jpg",
};

const courseModules = [
  "Stock market fundamentals: how markets work",
  "Reading charts and understanding candlesticks",
  "Supply & Demand zones for precision entries",
  "Fibonacci retracements and market structure",
  "Introduction to options: calls and puts",
  "Risk management rules and position sizing",
  "Trading psychology and emotional discipline",
  "IBKR and Webull account setup walkthroughs",
  "Customizable trading journal templates",
  "Real trade breakdowns and post-market analysis",
  "Lifetime access to all course materials",
  "Step-by-step beginner-to-confident investor path",
];

const faqs = [
  { q: "Do I need any prior trading experience?", a: "No prior experience is needed. Stock Market Made Easy is designed to take you from zero to confident investor step by step." },
  { q: "Is the course pre-recorded or live?", a: "Stock Market Made Easy is a structured, pre-recorded program with lifetime access. You learn at your own pace and revisit any lesson whenever you need. Our Masterclass (Options Academy: Zero to Pro) features live group classes on Tuesdays & Thursdays 5:00-6:30 PM PST starting August 18, 2026." },
  { q: "What platform do I need for trading?", a: "We provide complete setup walkthroughs for both IBKR (Interactive Brokers) and Webull. You'll be fully set up and ready to invest before you begin." },
  { q: "Is there a payment plan available?", a: "Yes, payment plans are available. Contact us for details on installment options." },
  { q: "What if I have questions after enrolling?", a: "Our course materials are comprehensive with lifetime access. For additional support, you can reach out via our contact form and Sounia's team will assist you. Masterclass students also get dedicated Q&A time during live sessions." },
  { q: "When does the Masterclass start?", a: "The next cohort of Options Academy: Zero to Pro starts on August 18, 2026. Classes are held online via Zoom every Tuesday and Thursday from 5:00 to 6:30 PM PST for 4 months. Limited spots available—apply today!" },
  { q: "Is the Masterclass live or pre-recorded?", a: "The Masterclass features live group classes with Sounia every Tuesday and Thursday. You'll get real-time market analysis, interactive Q&A sessions, and personalized feedback on your trades." },
  { q: "Can I attend if I'm in a different time zone?", a: "Yes! Classes are held online via Zoom at 5:00 - 6:30 PM PST. You can join from anywhere. Recordings are also available for students who cannot attend live sessions." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b cursor-pointer" style={{ borderColor: "oklch(88% 0.018 80)" }} onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-between py-5 gap-4">
        <span className="text-base font-medium" style={{ fontFamily: "'Inter', sans-serif", color: "var(--navy)" }}>{q}</span>
        <span className="shrink-0" style={{ color: "var(--gold)" }}>
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </div>
      {open && <p className="pb-5 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>{a}</p>}
    </div>
  );
}

export default function Services() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  return (
    <Layout>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--navy)", paddingTop: 120, paddingBottom: 80 }}>
        <div className="container">
          <div className="max-w-2xl">
            <p className="section-label-gold mb-4">Our Programs</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem, 5vw, 4.5rem)", fontWeight: 500, lineHeight: 1.1, color: "var(--cream)", marginBottom: "1.25rem" }}>
              Options Academy: Zero to Pro
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "oklch(70% 0.02 255)", fontFamily: "'Inter', sans-serif", maxWidth: 520 }}>
              Master options trading with live group classes, real-time market analysis, and personalized guidance from Sounia. Starting August 18, 2026.
            </p>
          </div>
        </div>
      </section>

      {/* ── HIDDEN: STOCK MARKET MADE EASY ───────────────────────────────────────── */}
      {/* Stock Market Made Easy course section is hidden - will be re-enabled later */}

      {/* ── MASTERCLASS: OPTIONS ACADEMY ──────────────────────────────────────── */}
      <section className="section-py section-light">
        <div className="container">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Exclusive Program</p>
            <h2 className="editorial-heading mb-4">
              Options Academy: <span style={{ color: "var(--gold)" }}>Zero to Pro</span>
            </h2>
            <p className="body-text max-w-2xl mx-auto">
              Ready for an advanced, hands-on experience? Our exclusive masterclass offers personalized guidance and direct access to Sounia.
            </p>
            <div className="mt-6 p-4 rounded-lg max-w-2xl mx-auto" style={{ background: "rgba(201, 168, 76, 0.1)", borderLeft: "3px solid #c9a84c" }}>
              <p className="text-sm font-semibold" style={{ color: "#c9a84c", marginBottom: "0.5rem" }}>Next Cohort: August 18, 2026</p>
              <p className="text-sm" style={{ color: "var(--text-body)" }}>Tuesdays & Thursdays • 5:00 - 6:30 PM PST • Online (Zoom) • 4 Months</p>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="text-4xl font-bold mb-3" style={{ color: "var(--gold)" }}>1:1</div>
              <h3 className="font-semibold mb-2">Personalized Consultation</h3>
              <p className="text-sm text-gray-600">Direct Zoom call with Sounia to understand your goals and learning style.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="text-4xl font-bold mb-3" style={{ color: "var(--gold)" }}>∞</div>
              <h3 className="font-semibold mb-2">Lifetime Support</h3>
              <p className="text-sm text-gray-600">Ongoing access to resources, updates, and community support.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="text-4xl font-bold mb-3" style={{ color: "var(--gold)" }}>✓</div>
              <h3 className="font-semibold mb-2">Proven Results</h3>
              <p className="text-sm text-gray-600">Join 100+ traders who have mastered options with our guidance.</p>
            </div>
          </div>
          <div className="text-center">
            <div className="mb-6 p-6 rounded-lg max-w-md mx-auto" style={{ background: "var(--cream)", border: "2px solid #c9a84c" }}>
              <p className="text-sm text-gray-600 mb-2">Investment</p>
              <p className="text-5xl font-bold" style={{ color: "var(--navy)", fontFamily: "'Playfair Display', serif" }}>$3,000</p>
              <p className="text-sm text-gray-600 mt-2">4-month program with live group classes</p>
            </div>
            <p className="mb-2 text-sm" style={{ color: "var(--text-body)" }}>Limited spots available. Apply today to schedule your consultation.</p>
            <p className="mb-6 text-sm font-semibold" style={{ color: "#c9a84c" }}>Cohort starts August 18, 2026 • Tuesdays & Thursdays 5:00 - 6:30 PM PST</p>
            <button disabled className="btn-gold inline-flex items-center gap-2 opacity-50 cursor-not-allowed">
              Course is Sold Out
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="section-py section-light">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-14">
            <div>
              <p className="section-label mb-3">Questions?</p>
              <h2 className="editorial-heading mb-5">
                Frequently Asked{" "}
                <span style={{ color: "var(--gold)" }}>Questions</span>
              </h2>
              <p className="body-text mb-8">
                Have more questions? Book a free consultation and Sounia will personally walk you through everything.
              </p>
              <Link href="/contact">
                <span className="btn-primary">Book Free Consultation <ArrowRight size={16} /></span>
              </Link>
            </div>
            <div>
              {faqs.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="section-py section-dark">
        <div className="container text-center">
          <p className="section-label-gold mb-4">Ready to Take the Leap?</p>
          <h2 className="editorial-heading-light mb-5">Start Learning Today</h2>
          <p className="mb-8 text-sm" style={{ color: "oklch(65% 0.02 255)", maxWidth: 460, margin: "0 auto 2rem", fontFamily: "'Inter', sans-serif" }}>
            Join 2,700+ students who have already transformed their financial future with Gift of Trading.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button disabled className="btn-gold inline-flex items-center gap-2 opacity-50 cursor-not-allowed">
              Course is Sold Out
            </button>
            <Link href="/contact"><span className="btn-ghost-light">Ask a Question</span></Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
