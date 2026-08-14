import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith("fr") ? "fr" : "en";

  const toggle = () => {
    const next = current === "en" ? "fr" : "en";
    i18n.changeLanguage(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Switch language"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors"
      style={{
        fontFamily: "'Montserrat', sans-serif",
        letterSpacing: "0.06em",
        border: "1.5px solid rgba(212,175,55,0.4)",
        color: "oklch(73% 0.14 72)",
        background: "transparent",
        cursor: "pointer",
      }}
    >
      <span style={{ fontSize: "1rem", lineHeight: 1 }}>
        {current === "en" ? "🇫🇷" : "🇬🇧"}
      </span>
      {current === "en" ? "FR" : "EN"}
    </button>
  );
}
