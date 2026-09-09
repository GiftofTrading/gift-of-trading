import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Instagram, Youtube, Facebook, Mail, MapPin, ArrowRight } from "lucide-react";
import { trpc } from "@/lib/trpc";

function TikTokColorIcon({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Cyan layer */}
      <path
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"
        fill="#00F2FE"
        transform="translate(-1, -0.5)"
      />
      {/* Magenta layer */}
      <path
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"
        fill="#FE2C55"
        transform="translate(1, 0.5)"
      />
      {/* Crisp White core */}
      <path
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

const LOGO_URL = "/images/gift-logo_e37ab5cd.png";

export default function Footer() {
  const [location] = useLocation();
  const isContactPage = location === "/contact";
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => { setNewsletterStatus("success"); setNewsletterEmail(""); },
    onError: () => setNewsletterStatus("error"),
  });
  function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterStatus("loading");
    subscribeMutation.mutate({ email: newsletterEmail });
  }

  return (
    <footer style={{ background: "var(--navy-deep)", fontFamily: "'Inter', sans-serif" }}>
      {/* CTA Banner - hidden on /contact page */}
      {!isContactPage && (
        <div style={{ background: "var(--navy)", borderBottom: "1px solid oklch(28% 0.07 255)" }}>
          <div className="container py-14 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="section-label-gold mb-2">Ready to start?</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 500, lineHeight: 1.15, color: "var(--cream)" }}>
                Begin Your Trading Journey Today
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/contact">
                <span className="btn-ghost-light text-sm">Ask Questions</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Grid */}
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src={LOGO_URL}
              alt="Gift of Trading"
              className="object-contain mb-5"
              style={{ height: 42, width: "auto" }}
            />
            <p className="text-sm leading-relaxed mb-6" style={{ color: "oklch(65% 0.02 255)" }}>
              Empowering traders and investors to build real wealth through education, strategy, and a thriving community.
            </p>
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/giftoftrading"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram @giftoftrading"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
                style={{
                  background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                  boxShadow: "0 3px 10px rgba(214, 36, 159, 0.4)",
                }}
              >
                <Instagram size={19} />
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@giftoftrading"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                title="YouTube @giftoftrading"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
                style={{
                  background: "#FF0000",
                  boxShadow: "0 3px 10px rgba(255, 0, 0, 0.4)",
                }}
              >
                <Youtube size={19} />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/GIFTofTrading"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
                style={{
                  background: "#1877F2",
                  boxShadow: "0 3px 10px rgba(24, 119, 242, 0.4)",
                }}
              >
                <Facebook size={19} />
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@giftoftrading"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                title="TikTok @giftoftrading"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                style={{
                  background: "#010101",
                  boxShadow: "0 3px 10px rgba(0, 0, 0, 0.4)",
                }}
              >
                <TikTokColorIcon size={19} />
              </a>
            </div>
          </div>

          {/* Course */}
          <div>
            <h4 className="text-xs font-semibold mb-5 tracking-widest uppercase" style={{ color: "var(--gold)" }}>
              Programs
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Courses & Curriculum", href: "/services" },
                { label: "Webinars & Sessions", href: "/webinars" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span
                      className="text-sm flex items-center gap-1.5 cursor-pointer transition-colors"
                      style={{ color: "oklch(60% 0.02 255)" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "oklch(60% 0.02 255)")}
                    >
                      <ArrowRight size={11} />
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold mb-5 tracking-widest uppercase" style={{ color: "var(--gold)" }}>
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Sounia", href: "/about" },
                { label: "Blog & News", href: "/blog" },
                { label: "Success Stories", href: "/success-stories" },
                { label: "Contact Us", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span
                      className="text-sm flex items-center gap-1.5 cursor-pointer transition-colors"
                      style={{ color: "oklch(60% 0.02 255)" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "oklch(60% 0.02 255)")}
                    >
                      <ArrowRight size={11} />
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="text-xs font-semibold mb-5 tracking-widest uppercase" style={{ color: "var(--gold)" }}>
              Get In Touch
            </h4>
            <ul className="space-y-4 mb-7">
              <li className="flex items-start gap-3">
                <Mail size={14} className="mt-0.5 shrink-0" style={{ color: "var(--gold)" }} />
                <a
                  href="mailto:giftoftrading@gmail.com"
                  className="text-sm transition-colors"
                  style={{ color: "oklch(60% 0.02 255)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "oklch(60% 0.02 255)")}
                >
                  giftoftrading@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: "var(--gold)" }} />
                <span className="text-sm" style={{ color: "oklch(60% 0.02 255)" }}>
                  Vancouver, BC, Canada
                </span>
              </li>
            </ul>

            {/* Newsletter */}
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "oklch(50% 0.02 255)" }}>
              Market Insights Newsletter
            </p>
            {newsletterStatus === "success" ? (
              <p className="text-sm" style={{ color: "var(--gold)" }}>✓ You're subscribed! We'll be in touch.</p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="flex-1 text-sm px-3 py-2.5 rounded-xl outline-none"
                  style={{
                    background: "oklch(20% 0.06 255)",
                    border: `1px solid ${newsletterStatus === "error" ? "#ef4444" : "oklch(28% 0.07 255)"}`,
                    color: "var(--cream)",
                  }}
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "loading"}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                  style={{ background: "var(--gold)", color: "var(--navy)", opacity: newsletterStatus === "loading" ? 0.7 : 1 }}
                >
                  {newsletterStatus === "loading" ? "..." : "Join"}
                </button>
              </form>
            )}
            {newsletterStatus === "error" && (
              <p className="text-xs mt-1" style={{ color: "#ef4444" }}>Something went wrong. Please try again.</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid oklch(20% 0.06 255)" }}>
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "oklch(42% 0.02 255)" }}>
            © {currentYear} Gift of Trading. All rights reserved. Educational purposes only — not financial advice.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service", "Disclaimer"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs transition-colors"
                style={{ color: "oklch(42% 0.02 255)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "oklch(42% 0.02 255)")}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
