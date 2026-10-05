import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Calendar, Clock, Users, Play, ArrowRight, Video, CheckCircle2, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import Layout from "@/components/Layout";
import { updateMetaTags, addJsonLdSchema, createEventSchema } from "@/lib/meta";

// Sample webinar data
const upcomingWebinars = [
  {
    id: 1,
    title: "Options Trading: Advanced Strategies Live Session",
    description: "Join Sounia for an intensive session covering advanced options strategies, real-time market analysis, and Q&A. This session is perfect for Stock Market Made Easy students and anyone wanting to see professional options trading in action.",
    scheduledAt: new Date("2026-05-06T21:00:00Z"),
    durationMinutes: 90,
    status: "upcoming" as const,
    isFree: false,
    hostName: "Sounia Gill",
    maxAttendees: 50,
    registeredCount: 32,
    topics: ["Advanced options strategies", "Live market analysis", "Risk management Q&A", "Trade setups for the week"],
  },
  {
    id: 2,
    title: "Free Intro: How to Start Trading Options with $1,000",
    description: "A completely free introductory webinar for beginners. Learn the basics of options trading, how to set up your brokerage account, and the first three strategies every new trader should know. No experience required.",
    scheduledAt: new Date("2026-04-15T22:00:00Z"),
    durationMinutes: 60,
    status: "upcoming" as const,
    isFree: true,
    hostName: "Sounia Gill",
    maxAttendees: 200,
    registeredCount: 147,
    topics: ["Options basics", "Account setup guide", "First 3 strategies", "Live Q&A"],
  },
];

const pastWebinars = [
  {
    id: 3,
    title: "FOMC Week Strategy: Navigating Fed Decisions",
    description: "How to position your portfolio around Federal Reserve meetings and protect capital during high-volatility periods.",
    scheduledAt: new Date("2026-03-20T21:00:00Z"),
    durationMinutes: 75,
    status: "completed" as const,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    hostName: "Sounia Gill",
    topics: ["FOMC strategy", "Volatility trading", "Portfolio protection"],
  },
  {
    id: 4,
    title: "Supply & Demand Zones: Precision Entry Deep Dive",
    description: "Deep dive into identifying and trading supply and demand zones on any timeframe with high probability.",
    scheduledAt: new Date("2026-02-28T21:00:00Z"),
    durationMinutes: 90,
    status: "completed" as const,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    hostName: "Sounia Gill",
    topics: ["Supply/demand zones", "Entry precision", "Multi-timeframe analysis"],
  },
];

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const diff = targetDate.getTime() - Date.now();
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
  }, [targetDate]);

  return (
    <div className="flex gap-3">
      {[
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hrs" },
        { value: timeLeft.minutes, label: "Min" },
        { value: timeLeft.seconds, label: "Sec" },
      ].map(({ value, label }) => (
        <div key={label} className="bg-[oklch(20%_0.06_255)] rounded-xl px-3 py-2 text-center min-w-[52px]">
          <p className="text-[oklch(73%_0.14_72)] text-xl font-black" style={{ fontFamily: "Montserrat, sans-serif" }}>
            {String(value).padStart(2, "0")}
          </p>
          <p className="text-[oklch(65%_0.04_255)] text-xs">{label}</p>
        </div>
      ))}
    </div>
  );
}

export default function Webinars() {
  useEffect(() => {
    updateMetaTags({
      title: "Webinars | Gift of Trading",
      description: "Join live webinars with Sounia Gill. Learn advanced trading strategies, options trading, and market analysis. Free and paid webinars available.",
      keywords: "trading webinars, options trading live, stock market webinars, Sounia Gill",
      ogTitle: "Webinars | Gift of Trading",
      ogDescription: "Attend live trading webinars with expert instruction and real-time market analysis.",
      canonicalUrl: "https://giftoftrading.com/webinars",
    });
  }, []);

  const { data: dbWebinars, isLoading: webinarsLoading } = trpc.webinars.list.useQuery();
  const allUpcoming = dbWebinars?.filter((w) => w.status === "upcoming") ?? [];
  const allPast = dbWebinars?.filter((w) => w.status === "completed") ?? [];

  useEffect(() => {
    if (webinarsLoading) return;
    if (allUpcoming && allUpcoming.length > 0) {
      const targetWebinar = allUpcoming[0];
      const webinarSchema = createEventSchema({
        name: targetWebinar.title,
        description: targetWebinar.description,
        startDate: typeof targetWebinar.scheduledAt === 'string' ? targetWebinar.scheduledAt : new Date(targetWebinar.scheduledAt).toISOString(),
        url: "https://giftoftrading.com/webinars",
        organizer: targetWebinar.hostName || "Sounia Gill",
      });
      addJsonLdSchema(webinarSchema);
    }
  }, [allUpcoming, webinarsLoading]);

  const [email, setEmail] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [registered, setRegistered] = useState<number | null>(null);
  const [webinarEmail, setWebinarEmail] = useState("");
  const [webinarSubStatus, setWebinarSubStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const webinarSubscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => { setWebinarSubStatus("success"); setWebinarEmail(""); },
    onError: () => setWebinarSubStatus("error"),
  });
  function handleWebinarSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!webinarEmail.trim()) return;
    setWebinarSubStatus("loading");
    webinarSubscribeMutation.mutate({ email: webinarEmail });
  }

  const handleRegister = (webinarId: number) => {
    if (!regEmail || !regName) {
      alert("Please fill in all fields");
      return;
    }
    setRegistered(webinarId);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-[oklch(12%_0.04_255)] py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <p className="text-[oklch(73%_0.14_72)] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Live Events
          </p>
          <h1 className="text-5xl lg:text-6xl font-bold text-[oklch(97%_0.012_80)] mb-6">
            Webinars & Recorded Sessions
          </h1>
          <p className="text-[oklch(75%_0.02_80)] text-xl max-w-3xl mx-auto">
            Learn with Sounia through recorded sessions covering market analysis, strategy deep-dives, and Q&A — available to watch at your own pace.
          </p>
        </div>
      </section>

      {/* Upcoming Webinars */}
      <section className="py-20 bg-[oklch(97%_0.012_80)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-[oklch(73%_0.14_72)] text-sm font-semibold uppercase tracking-widest mb-1" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Coming Up
              </p>
              <h2 className="text-3xl font-bold text-[oklch(13%_0.04_255)]">Upcoming Sessions</h2>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-[oklch(55%_0.04_255)]">
              <Bell className="w-4 h-4" />
              Register to get reminders
            </div>
          </div>

          <div className="space-y-8">
            {allUpcoming.map((webinar) => (
              <div key={webinar.id} className="bg-white rounded-3xl border border-[oklch(88%_0.025_80)] overflow-hidden shadow-sm">
                <div className="grid lg:grid-cols-3">
                  {/* Info */}
                  <div className="lg:col-span-2 p-8">
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          webinar.isFree
                            ? "bg-green-100 text-green-700"
                            : "bg-[oklch(73%_0.14_72)/10] text-[oklch(55%_0.13_70)]"
                        }`}
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {webinar.isFree ? "FREE" : "PAID"}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700" style={{ fontFamily: "Montserrat, sans-serif" }}>
                        <Video className="w-3 h-3" />
                        Live Webinar
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-[oklch(13%_0.04_255)] mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      {webinar.title}
                    </h3>
                    <p className="text-[oklch(48%_0.04_255)] leading-relaxed mb-5">{webinar.description}</p>

                    <div className="flex flex-wrap gap-5 text-sm text-[oklch(55%_0.04_255)] mb-5">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[oklch(73%_0.14_72)]" />
                        {webinar.scheduledAt.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[oklch(73%_0.14_72)]" />
                        {webinar.scheduledAt.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZoneName: "short" })}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[oklch(73%_0.14_72)]" />
                        {webinar.durationMinutes} minutes
                      </span>
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[oklch(73%_0.14_72)]" />
                        {webinar.registeredCount}/{webinar.maxAttendees} registered
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {((webinar.topics as string[] | null) ?? []).map((topic) => (
                        <span key={topic} className="flex items-center gap-1.5 px-3 py-1 bg-[oklch(93%_0.025_80)] rounded-full text-xs text-[oklch(35%_0.04_255)]">
                          <CheckCircle2 className="w-3 h-3 text-[oklch(73%_0.14_72)]" />
                          {topic}
                        </span>
                      ))}
                    </div>

                    <div>
                      <p className="text-xs text-[oklch(65%_0.04_255)] mb-2">Starts in:</p>
                      <CountdownTimer targetDate={webinar.scheduledAt} />
                    </div>
                  </div>

                  {/* Registration */}
                  <div className="bg-[oklch(12%_0.04_255)] p-8 flex flex-col justify-center">
                    {registered === webinar.id ? (
                      <div className="text-center">
                        <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
                        <h4 className="text-[oklch(97%_0.012_80)] font-bold text-lg mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          You're Registered!
                        </h4>
                        <p className="text-[oklch(65%_0.04_255)] text-sm">
                          Check your email for confirmation and joining instructions.
                        </p>
                      </div>
                    ) : (
                      <>
                        <h4 className="text-[oklch(97%_0.012_80)] font-bold text-lg mb-5" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          Reserve Your Spot
                        </h4>
                        <div className="space-y-3 mb-5">
                          <Input
                            placeholder="Your name"
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                            className="bg-[oklch(16%_0.05_255)] border-[oklch(26%_0.07_255)] text-[oklch(97%_0.012_80)] placeholder:text-[oklch(55%_0.04_255)]"
                          />
                          <Input
                            type="email"
                            placeholder="Your email"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            className="bg-[oklch(16%_0.05_255)] border-[oklch(26%_0.07_255)] text-[oklch(97%_0.012_80)] placeholder:text-[oklch(55%_0.04_255)]"
                          />
                        </div>
                        <Button
                          onClick={() => handleRegister(webinar.id)}
                          className="w-full bg-[oklch(73%_0.14_72)] hover:bg-[oklch(65%_0.13_70)] text-[oklch(12%_0.04_255)] font-bold"
                          style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                          {webinar.isFree ? "Register for Free" : "Register Now"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <p className="text-[oklch(55%_0.04_255)] text-xs text-center mt-3">
                          {(webinar.maxAttendees ?? 0) - (webinar.registeredCount ?? 0)} spots remaining
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Webinars / Replays */}
      <section className="py-20 bg-[oklch(16%_0.05_255)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-10">
            <p className="text-[oklch(73%_0.14_72)] text-sm font-semibold uppercase tracking-widest mb-1" style={{ fontFamily: "Montserrat, sans-serif" }}>
              On-Demand
            </p>
            <h2 className="text-3xl font-bold text-[oklch(97%_0.012_80)]">Past Session Replays</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {allPast.map((webinar) => (
              <div key={webinar.id} className="bg-[oklch(12%_0.04_255)] rounded-2xl border border-[oklch(26%_0.07_255)] overflow-hidden">
                {/* Video embed */}
                <div className="relative aspect-video bg-[oklch(10%_0.04_255)] flex items-center justify-center">
                  {webinar.videoUrl ? (
                    <iframe
                      src={webinar.videoUrl}
                      title={webinar.title}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  ) : (
                    <div className="text-center">
                      <Play className="w-12 h-12 text-[oklch(73%_0.14_72)] mx-auto mb-2" />
                      <p className="text-[oklch(65%_0.04_255)] text-sm">Replay Available</p>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-[oklch(97%_0.012_80)] font-bold text-lg mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    {webinar.title}
                  </h3>
                  <p className="text-[oklch(65%_0.04_255)] text-sm leading-relaxed mb-4">{webinar.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {((webinar.topics as string[] | null) ?? []).map((topic) => (
                      <span key={topic} className="px-2.5 py-1 bg-[oklch(20%_0.06_255)] rounded-full text-xs text-[oklch(75%_0.02_80)]">
                        {topic}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[oklch(55%_0.04_255)]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {webinar.scheduledAt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {webinar.durationMinutes} min
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter — Stay Informed */}
      <section className="py-16 bg-[oklch(97%_0.012_80)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
          <p className="text-[oklch(73%_0.14_72)] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Stay Informed
          </p>
          <h2 className="text-3xl font-bold text-[oklch(13%_0.04_255)] mb-4">
            Never Miss an Upcoming Session
          </h2>
          <p className="text-[oklch(48%_0.04_255)] mb-8">
            Join the newsletter and be the first to know when Sounia announces new live sessions, Q&amp;As, and market events.
          </p>
          {webinarSubStatus === "success" ? (
            <p className="text-lg font-semibold" style={{ color: "oklch(40% 0.12 72)" }}>✓ You're on the list! We'll notify you of upcoming sessions.</p>
          ) : (
            <form onSubmit={handleWebinarSubscribe} className="flex gap-3 max-w-md mx-auto">
              <Input
                type="email"
                value={webinarEmail}
                onChange={(e) => setWebinarEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="bg-white border-[oklch(82%_0.02_80)] text-[oklch(12%_0.04_255)] placeholder:text-[oklch(55%_0.04_255)]"
              />
              <Button
                type="submit"
                disabled={webinarSubStatus === "loading"}
                size="lg"
                className="bg-[oklch(73%_0.14_72)] hover:bg-[oklch(65%_0.13_70)] text-[oklch(12%_0.04_255)] font-bold px-8"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {webinarSubStatus === "loading" ? "..." : "Notify Me"}
                {webinarSubStatus !== "loading" && <ArrowRight className="w-5 h-5 ml-2" />}
              </Button>
            </form>
          )}
          {webinarSubStatus === "error" && (
            <p className="text-sm mt-2" style={{ color: "#ef4444" }}>Something went wrong. Please try again.</p>
          )}
          <p className="text-xs text-[oklch(60%_0.04_255)] mt-4">No spam. Unsubscribe any time.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[oklch(12%_0.04_255)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-[oklch(97%_0.012_80)] mb-4">
            Ready to Go Deeper?
          </h2>
          <p className="text-[oklch(75%_0.02_80)] mb-8">
            Enroll in Stock Market Made Easy — a structured, self-paced program with lifetime access to all content and live trading sessions.
          </p>
          <Link href="/stock-market-made-easy">
            <Button
              size="lg"
              className="bg-[oklch(73%_0.14_72)] hover:bg-[oklch(65%_0.13_70)] text-[oklch(12%_0.04_255)] font-bold px-10"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Enroll Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
