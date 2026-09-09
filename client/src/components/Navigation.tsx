import { useState, useRef, useEffect } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link, useLocation } from "wouter";
import { Menu, X, Instagram, Youtube, Facebook } from "lucide-react";
import { FraudAlert } from "./FraudAlert";

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

const LOGO_URL = "https://static.wixstatic.com/media/19e04d_5b3916fa625b4272b213150378dc7cd2~mv2.png/v1/fill/w_198,h_62,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GIFT-LOGO.png";

// HIDDEN: Stock Market Made Easy course
const hiddenStockMarketLink = { label: "Stock Market Made Easy", href: "/stock-market-made-easy" };

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Webinars", href: "/webinars" },
  { label: "Blog & News", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [fraudAlertVisible, setFraudAlertVisible] = useState(true);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (href: string) => {
    if (href === "#") return false;
    return href === "/" ? location === "/" : location.startsWith(href);
  };

  return (
    <>
      {/* ── FRAUD ALERT RUNNING HEADLINE ── */}
      <FraudAlert onVisibilityChange={setFraudAlertVisible} />

      <nav
        className={`left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-xl border-b border-gray-100"
            : "bg-white border-b border-gray-100"
        }`}
        style={{
          fontFamily: "'Inter', sans-serif",
          position: "fixed",
          top: fraudAlertVisible ? 40 : 0
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between" style={{ height: 68 }}>
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center bg-[var(--navy)] rounded-xl px-3 py-1.5 cursor-pointer" style={{ height: 48 }}>
                <img
                  src={LOGO_URL}
                  alt="Gift of Trading"
                  className="object-contain"
                  style={{ height: 36, width: "auto", maxWidth: 160 }}
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link: any) => (
                <div key={link.label} className="relative group">
                  <Link href={link.href}>
                    <span
                      className={`px-3.5 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer ${
                        isActive(link.href)
                          ? "text-[var(--navy)] font-semibold"
                          : "text-[var(--text-body)] hover:text-[var(--navy)]"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </div>
              ))}
            </div>

            {/* Social Media Icons & Language Switcher (Desktop) */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="flex items-center gap-2 border-r border-gray-200 pr-3 mr-1">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/giftoftrading"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
                  style={{
                    background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                    boxShadow: "0 3px 10px rgba(214, 36, 159, 0.4)",
                  }}
                  aria-label="Instagram @giftoftrading"
                  title="Instagram @giftoftrading"
                >
                  <Instagram size={19} />
                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@giftoftrading"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
                  style={{
                    background: "#FF0000",
                    boxShadow: "0 3px 10px rgba(255, 0, 0, 0.4)",
                  }}
                  aria-label="YouTube @giftoftrading"
                  title="YouTube @giftoftrading"
                >
                  <Youtube size={19} />
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/GIFTofTrading"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
                  style={{
                    background: "#1877F2",
                    boxShadow: "0 3px 10px rgba(24, 119, 242, 0.4)",
                  }}
                  aria-label="Facebook @GIFTofTrading"
                  title="Facebook @GIFTofTrading"
                >
                  <Facebook size={19} />
                </a>

                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@giftoftrading"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                  style={{
                    background: "#010101",
                    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.4)",
                  }}
                  aria-label="TikTok @giftoftrading"
                  title="TikTok @giftoftrading"
                >
                  <TikTokColorIcon size={19} />
                </a>
              </div>
              <LanguageSwitcher />
            </div>

            {/* Mobile Actions: Social Icons + Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <div className="flex items-center gap-1.5 mr-1">
                <a
                  href="https://www.instagram.com/giftoftrading"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                  style={{
                    background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                  }}
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://www.youtube.com/@giftoftrading"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                  style={{ background: "#FF0000" }}
                  aria-label="YouTube"
                >
                  <Youtube size={16} />
                </a>
                <a
                  href="https://www.facebook.com/GIFTofTrading"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                  style={{ background: "#1877F2" }}
                  aria-label="Facebook"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="https://www.tiktok.com/@giftoftrading"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "#010101" }}
                  aria-label="TikTok"
                >
                  <TikTokColorIcon size={16} />
                </a>
              </div>

              <button
                className="p-2 rounded-lg text-[var(--navy)] hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" style={{
          top: fraudAlertVisible ? 108 : 68
        }}>
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-white shadow-2xl" style={{
            maxHeight: fraudAlertVisible ? "calc(100vh - 108px)" : "calc(100vh - 68px)",
            overflowY: "auto"
          }}>
            <div className="container py-5 space-y-1">
              {navLinks.map((link: any) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`block px-4 py-3 text-sm font-medium rounded-xl cursor-pointer transition-colors ${
                      isActive(link.href)
                        ? "text-[var(--navy)] bg-[var(--cream-dark)] font-semibold"
                        : "text-[var(--text-body)] hover:text-[var(--navy)] hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}

              {/* Mobile Social Links with brand styling */}
              <div className="pt-4 pb-2 border-t border-gray-100 mt-3">
                <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Follow Sounia Gill & Community
                </p>
                <div className="flex items-center gap-3 px-4 mb-4">
                  <a
                    href="https://www.instagram.com/giftoftrading"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                    style={{
                      background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                      boxShadow: "0 2px 8px rgba(214, 36, 159, 0.4)"
                    }}
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="https://www.youtube.com/@giftoftrading"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                    style={{
                      background: "#FF0000",
                      boxShadow: "0 2px 8px rgba(255, 0, 0, 0.4)"
                    }}
                  >
                    <Youtube size={20} />
                  </a>
                  <a
                    href="https://www.facebook.com/GIFTofTrading"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                    style={{
                      background: "#1877F2",
                      boxShadow: "0 2px 8px rgba(24, 119, 242, 0.4)"
                    }}
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href="https://www.tiktok.com/@giftoftrading"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: "#010101",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)"
                    }}
                  >
                    <TikTokColorIcon size={20} />
                  </a>
                </div>

                <div className="flex justify-center pt-2">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
