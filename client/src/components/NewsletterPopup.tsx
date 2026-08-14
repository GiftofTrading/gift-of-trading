import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subscribeMutation = trpc.newsletter.subscribe.useMutation();

  // Show popup after 3 seconds, but only if not already shown in this session
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('newsletterPopupSeen');
    if (hasSeenPopup) {
      return;
    }
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await subscribeMutation.mutateAsync({ email, name });
      setIsSuccess(true);
      sessionStorage.setItem('newsletterPopupSeen', 'true');
      setTimeout(() => {
        setIsOpen(false);
        setEmail("");
        setName("");
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Newsletter signup error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('newsletterPopupSeen', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-2xl max-h-screen md:max-h-none">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Right side - Image (Top on mobile) */}
          <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-4 md:p-8">
            <img
              src="/images/sounia-masterclass.jpg"
              alt="Sounia Gill"
              className="h-64 w-64 md:h-full md:w-full object-cover rounded-lg md:rounded-none"
            />
          </div>

          {/* Left side - Content */}
          <div className="flex flex-col justify-center bg-gradient-to-br from-blue-400 to-blue-500 p-6 md:p-8 text-white w-full md:w-1/2">
            <h2 className="mb-2 text-2xl md:text-3xl font-bold">
              Join Our Community Newsletter
            </h2>
            <p className="mb-6 text-base md:text-lg opacity-90">
              Get frequent updates from Sounia on stock market investing, trading tips, and exclusive masterclass content.
            </p>

            {isSuccess ? (
              <div className="rounded-lg bg-green-100 p-4 text-green-800">
                <p className="font-semibold">✓ Successfully subscribed!</p>
                <p className="text-sm">Check your email for confirmation.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border-2 border-white bg-white/10 px-4 py-2 md:py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white text-sm md:text-base"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border-2 border-white bg-white/10 px-4 py-2 md:py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white text-sm md:text-base"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="w-full bg-white text-blue-500 hover:bg-gray-100 text-sm md:text-base"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe Now"}
                </Button>
              </form>
            )}

            <p className="mt-4 text-xs opacity-75">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
