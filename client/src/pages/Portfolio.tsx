import { Link } from "wouter";
import { ArrowRight, TrendingUp, Shield, BarChart2, PieChart, Clock, DollarSign, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const strategies = [
  {
    icon: TrendingUp,
    title: "Growth Investing",
    description: "Identify high-potential growth stocks and build positions for long-term capital appreciation over 5–20+ years.",
    timeframe: "5–20+ years",
    risk: "Medium-High",
  },
  {
    icon: DollarSign,
    title: "Dividend Income",
    description: "Build a portfolio of dividend-paying stocks that generate consistent passive income while preserving capital.",
    timeframe: "3–10 years",
    risk: "Low-Medium",
  },
  {
    icon: Shield,
    title: "Defensive Positioning",
    description: "Protect your portfolio during market downturns using hedging strategies, options, and sector rotation.",
    timeframe: "Ongoing",
    risk: "Low",
  },
  {
    icon: PieChart,
    title: "Diversification",
    description: "Spread risk across sectors, asset classes, and geographies to reduce volatility and improve risk-adjusted returns.",
    timeframe: "Ongoing",
    risk: "Low-Medium",
  },
];

const riskPrinciples = [
  { title: "Never Risk More Than 2%", desc: "Cap your risk per trade at 2% of your total account value to survive losing streaks." },
  { title: "Position Sizing Formula", desc: "Calculate exact share quantities based on your stop-loss distance and risk tolerance." },
  { title: "Stop-Loss Discipline", desc: "Set stop-losses before entering every trade. Never move them against your position." },
  { title: "Risk/Reward Minimum 1:2", desc: "Only take trades where potential profit is at least twice the potential loss." },
  { title: "Diversify Across Sectors", desc: "Avoid concentrating too much capital in a single sector or correlated positions." },
  { title: "Cash is a Position", desc: "Holding cash during uncertainty is a valid strategy. Not every day requires a trade." },
];

const wealthTimeline = [
  { period: "Year 1–2", focus: "Foundation", actions: ["Learn fundamentals", "Build small account", "Master risk management", "Develop trading plan"] },
  { period: "Year 3–5", focus: "Growth", actions: ["Scale position sizes", "Add dividend stocks", "Compound returns", "Diversify strategies"] },
  { period: "Year 5–10", focus: "Acceleration", actions: ["Portfolio rebalancing", "Tax optimization", "Options income strategies", "Real estate consideration"] },
  { period: "Year 10+", focus: "Wealth", actions: ["Passive income streams", "Legacy planning", "Mentor others", "Financial freedom"] },
];

export default function Portfolio() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-[oklch(12%_0.04_255)] py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <p className="text-[oklch(73%_0.14_72)] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Portfolio Management
          </p>
          <h1 className="text-5xl lg:text-6xl font-bold text-[oklch(97%_0.012_80)] mb-6">
            Build Wealth That Lasts
          </h1>
          <p className="text-[oklch(75%_0.02_80)] text-xl max-w-3xl mx-auto leading-relaxed">
            Long-term wealth isn't built on single trades. It's built on disciplined strategies, smart risk management, and the patience to let compounding work for you.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-[oklch(97%_0.012_80)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-[oklch(73%_0.14_72)] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Investment Philosophy
              </p>
              <h2 className="text-4xl font-bold text-[oklch(13%_0.04_255)] mb-6">
                Manage Risk First — Not Profits
              </h2>
              <div className="space-y-4 text-[oklch(35%_0.04_255)] text-base leading-relaxed">
                <p>
                  Most new investors focus on profits. Experienced investors focus on risk. When you control your downside, the upside takes care of itself. This is the foundational principle behind every strategy we teach at Gift of Trading.
                </p>
                <p>
                  Portfolio management isn't just about picking stocks — it's about building a system that protects your capital during bad times and maximizes growth during good times. It's about thinking in decades, not days.
                </p>
                <p>
                  Whether you're building a retirement portfolio, generating passive income, or growing a trading account, the principles of smart portfolio management apply at every level.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, value: "Capital First", label: "Protection Priority" },
                { icon: BarChart2, value: "1:3+", label: "Risk/Reward Ratio" },
                { icon: Clock, value: "10–20 Yrs", label: "Wealth Horizon" },
                { icon: TrendingUp, value: "Compound", label: "Growth Strategy" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="bg-[oklch(12%_0.04_255)] rounded-2xl p-6 text-center">
                  <Icon className="w-8 h-8 text-[oklch(73%_0.14_72)] mx-auto mb-3" />
                  <p className="text-[oklch(97%_0.012_80)] text-xl font-black mb-1" style={{ fontFamily: "Montserrat, sans-serif" }}>{value}</p>
                  <p className="text-[oklch(65%_0.04_255)] text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Investment Strategies */}
      <section className="py-20 bg-[oklch(16%_0.05_255)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-14">
            <p className="text-[oklch(73%_0.14_72)] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Strategies
            </p>
            <h2 className="text-4xl font-bold text-[oklch(97%_0.012_80)] mb-4">
              Investment Approaches We Teach
            </h2>
            <p className="text-[oklch(75%_0.02_80)] text-lg max-w-2xl mx-auto">
              No single strategy works for everyone. We teach multiple approaches so you can build a portfolio that fits your goals and risk tolerance.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {strategies.map(({ icon: Icon, title, description, timeframe, risk }) => (
              <div key={title} className="bg-[oklch(12%_0.04_255)] rounded-2xl p-6 border border-[oklch(26%_0.07_255)] hover:border-[oklch(73%_0.14_72)/50] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[oklch(73%_0.14_72)/15] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[oklch(73%_0.14_72)]" />
                </div>
                <h3 className="text-[oklch(97%_0.012_80)] font-bold mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>{title}</h3>
                <p className="text-[oklch(65%_0.04_255)] text-sm leading-relaxed mb-4">{description}</p>
                <div className="space-y-2 pt-4 border-t border-[oklch(26%_0.07_255)]">
                  <div className="flex justify-between text-xs">
                    <span className="text-[oklch(55%_0.04_255)]">Timeframe</span>
                    <span className="text-[oklch(73%_0.14_72)] font-semibold">{timeframe}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[oklch(55%_0.04_255)]">Risk Level</span>
                    <span className="text-[oklch(80%_0.02_80)] font-semibold">{risk}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Management */}
      <section className="py-20 bg-[oklch(97%_0.012_80)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-14">
            <p className="text-[oklch(73%_0.14_72)] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Risk Management
            </p>
            <h2 className="text-4xl font-bold text-[oklch(13%_0.04_255)] mb-4">
              The Rules That Protect Your Capital
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {riskPrinciples.map(({ title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-[oklch(88%_0.025_80)] shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="w-5 h-5 text-[oklch(73%_0.14_72)] flex-shrink-0 mt-0.5" />
                  <h3 className="text-[oklch(13%_0.04_255)] font-bold text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>{title}</h3>
                </div>
                <p className="text-[oklch(48%_0.04_255)] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wealth Building Timeline */}
      <section className="py-20 bg-[oklch(12%_0.04_255)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-14">
            <p className="text-[oklch(73%_0.14_72)] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
              The Roadmap
            </p>
            <h2 className="text-4xl font-bold text-[oklch(97%_0.012_80)] mb-4">
              Your 10–20 Year Wealth Building Journey
            </h2>
            <p className="text-[oklch(75%_0.02_80)] text-lg max-w-2xl mx-auto">
              Financial freedom doesn't happen overnight. Here's the proven roadmap we guide every student through.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wealthTimeline.map(({ period, focus, actions }, i) => (
              <div key={period} className="relative">
                <div className="bg-[oklch(16%_0.05_255)] rounded-2xl p-6 border border-[oklch(26%_0.07_255)] h-full">
                  <div className="w-8 h-8 rounded-full bg-[oklch(73%_0.14_72)] flex items-center justify-center text-[oklch(12%_0.04_255)] font-black text-sm mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    {i + 1}
                  </div>
                  <p className="text-[oklch(73%_0.14_72)] text-xs font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "Montserrat, sans-serif" }}>{period}</p>
                  <h3 className="text-[oklch(97%_0.012_80)] font-bold text-lg mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>{focus}</h3>
                  <div className="space-y-2">
                    {actions.map((a) => (
                      <div key={a} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[oklch(73%_0.14_72)] flex-shrink-0" />
                        <span className="text-[oklch(65%_0.04_255)] text-xs">{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[oklch(97%_0.012_80)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-[oklch(13%_0.04_255)] mb-4">
            Ready to Build Your Portfolio?
          </h2>
          <p className="text-[oklch(48%_0.04_255)] text-lg mb-8">
            Learn portfolio management strategies as part of our Stock Market Made Easy program.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/stock-market-made-easy">
              <Button
                size="lg"
                className="bg-[oklch(13%_0.04_255)] hover:bg-[oklch(20%_0.06_255)] text-[oklch(97%_0.012_80)] font-bold px-8"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                View Course
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-[oklch(73%_0.14_72)] text-[oklch(73%_0.14_72)] hover:bg-[oklch(93%_0.025_80)] px-8"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Get a Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
