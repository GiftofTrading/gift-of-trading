import { useState, useRef, useEffect } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { FraudAlert } from "./FraudAlert";

const LOGO_URL = "https://static.wixstatic.com/media/19e04d_5b3916fa625b4272b213150378dc7cd2~mv2.png/v1/fill/w_198,h_62,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GIFT-LOGO.png";

// HIDDEN: Stock Market Made Easy course
const hiddenStockMarketLink = { label: "Stock Market Made Easy", href: "/stock-market-made-easy" };

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "#", submenu: [
    { label: "Masterclass", href: "/masterclass" },
  ]},
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

  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleSubmenuToggle = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <>
      {/* ── FRAUD ALERT RUNNING HEADLINE ── */}
      <FraudAlert onVisibilityChange={setFraudAlertVisible} />

      {/* HIDDEN: Announcement bar removed - price now displayed in hero section */}

      <nav
        className={`left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-xl border-b border-gray-100"
            : "bg-white border-b border-gray-100"
        }`}
        style={{
          fontFamily: "'Inter', sans-serif",
          position: "fixed",
          top: fraudAlertVisible ? 28 : 0
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
                  {link.submenu ? (
                    <>
                      <span
                        className="px-3.5 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer text-[var(--text-body)] hover:text-[var(--navy)] flex items-center gap-1"
                      >
                        {link.label}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </span>
                      <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100">
                        {link.submenu.map((item: any) => (
                          <Link key={item.href} href={item.href}>
                            <span className="block px-4 py-3 text-sm text-[var(--text-body)] hover:bg-gray-50 hover:text-[var(--navy)] first:rounded-t-lg last:rounded-b-lg cursor-pointer">
                              {item.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
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
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons - Removed */}
            <div className="hidden lg:flex items-center gap-3">
              <LanguageSwitcher />
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg text-[var(--navy)] hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" style={{
          top: fraudAlertVisible ? 140 : 108
        }}>
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-white shadow-2xl" style={{
            maxHeight: fraudAlertVisible ? "calc(100vh - 140px)" : "calc(100vh - 108px)",
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
              <div className="pt-4 pb-2 border-t border-gray-100 mt-2 flex flex-col gap-2">
                <div className="flex justify-center pb-1">
                  <LanguageSwitcher />
                </div>
                {/* Stock Market Made Easy Whop enrollment link removed */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
