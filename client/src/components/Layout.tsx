import Navigation from "./Navigation";
import Footer from "./Footer";
import { NewsletterPopup } from "./NewsletterPopup";
import { useEffect, useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [headerHeight, setHeaderHeight] = useState(108);

  useEffect(() => {
    // Listen for fraud alert visibility changes
    const handleHeaderHeightChange = (event: CustomEvent) => {
      setHeaderHeight(event.detail.height);
    };

    window.addEventListener("headerHeightChange", handleHeaderHeightChange as EventListener);
    return () => window.removeEventListener("headerHeightChange", handleHeaderHeightChange as EventListener);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--cream)' }}>
      <Navigation />
      <NewsletterPopup />
      {/* paddingTop: 40px (announcement) + 68px (nav) = 108px */}
      <main className="flex-1" style={{ paddingTop: `${headerHeight}px`, marginTop: 0 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
