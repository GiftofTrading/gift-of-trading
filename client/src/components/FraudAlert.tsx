import { X } from "lucide-react";
import { useState } from "react";

interface FraudAlertProps {
  onVisibilityChange?: (visible: boolean) => void;
}

// Alert height matches the enrollment bar
const ALERT_HEIGHT = 40;

export function FraudAlert({ onVisibilityChange }: FraudAlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onVisibilityChange?.(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[70] w-full flex items-center justify-center text-center px-4"
      style={{
        background: "#fee2e2", // light red
        height: 40,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="w-full max-w-7xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-red-600 text-sm font-semibold flex-shrink-0">⚠️</span>
          <p className="text-red-700 text-sm font-medium leading-tight">
            Fraud Alert: We never message you first or ask for money. Use the Contact Us form only to reach us.
          </p>
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 text-red-500 hover:text-red-700 transition-colors p-1"
          aria-label="Close alert"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
