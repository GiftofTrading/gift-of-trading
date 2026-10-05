import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { CheckCircle2, Sparkles, Shield, ArrowRight, Loader2, BookOpen } from "lucide-react";
import { trackButtonClick } from "@/lib/analytics";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultCourse?: string;
}

export function WaitlistModal({
  open,
  onOpenChange,
  defaultCourse = "Beginner Options Course with Strategy",
}: WaitlistModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState(defaultCourse);
  const [experience, setExperience] = useState("Beginner — New to Trading");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (defaultCourse) {
      setCourse(defaultCourse);
    }
  }, [defaultCourse]);

  const waitlistMutation = trpc.leads.joinWaitlist.useMutation({
    onSuccess: () => {
      setIsSuccess(true);
      toast.success("You're on the priority waitlist!");
      trackButtonClick(`waitlist_success_${course.toLowerCase().replace(/\s+/g, "_")}`);
    },
    onError: (err: { message?: string }) => {
      toast.error(err.message || "Failed to join waitlist. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter a valid email address.");
      return;
    }

    waitlistMutation.mutate({
      name: name.trim() || undefined,
      email: email.trim(),
      courseTitle: course,
      source: `waitlist-modal:${course}`,
    });
  };

  const handleClose = () => {
    setIsSuccess(false);
    setName("");
    setEmail("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[500px] p-0 overflow-hidden border border-[#D4AF37]/30 bg-[#091C2D] text-white shadow-2xl rounded-2xl"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center text-emerald-400">
              <CheckCircle2 size={36} />
            </div>

            <DialogHeader className="space-y-2">
              <DialogTitle
                className="text-2xl font-bold text-white text-center"
                style={{ fontFamily: "'Newsreader', Georgia, serif" }}
              >
                You're On The Priority List!
              </DialogTitle>
              <DialogDescription className="text-white/80 text-sm leading-relaxed max-w-sm mx-auto text-center">
                We've reserved your priority spot for{" "}
                <strong className="text-[#E5B84A]">{course}</strong>. When cohort dates and curriculum schedules are announced, you'll be the first to receive early-bird registration and special tuition access.
              </DialogDescription>
            </DialogHeader>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white/70 space-y-1 text-center">
              <p className="font-semibold text-white">Confirmation sent to: <span className="text-[#E5B84A]">{email}</span></p>
              <p>Check your inbox for confirmation details.</p>
            </div>

            <Button
              onClick={handleClose}
              className="w-full py-3 bg-[#D4AF37] hover:bg-[#E5C358] text-[#091C2D] font-bold text-sm rounded-xl transition-all cursor-pointer"
            >
              Done
            </Button>
          </div>
        ) : (
          <div className="p-7 space-y-5">
            {/* Header pill */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#D4AF37]/15 text-[#E5B84A] border border-[#D4AF37]/35">
                <Sparkles size={13} />
                PRIORITY WAITLIST • COHORT OPEN
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                PRICE: TBD
              </span>
            </div>

            <DialogHeader className="text-left space-y-1.5">
              <DialogTitle
                className="text-2xl font-bold text-white tracking-tight"
                style={{ fontFamily: "'Newsreader', Georgia, serif" }}
              >
                Join the Course Waitlist
              </DialogTitle>
              <DialogDescription className="text-white/70 text-xs leading-relaxed">
                Be the first to know when enrollment opens. Priority waitlist members receive early schedule access and discounted early-bird tuition.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Course Selection */}
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5">
                  Select Course
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    "Beginner Options Course with Strategy",
                    "Long-Term Investing Course",
                  ].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCourse(c)}
                      className={`text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        course === c
                          ? "bg-[#D4AF37]/15 border-[#D4AF37] text-white ring-1 ring-[#D4AF37]"
                          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen size={14} className={course === c ? "text-[#E5B84A]" : "text-white/50"} />
                        <span>{c}</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-[#E5B84A] ml-2 shrink-0">
                        Price: TBD
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  Your Full Name
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Sounia Gill"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-[#D4AF37] focus:ring-[#D4AF37] h-10 rounded-xl text-sm"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  Email Address <span className="text-[#E5B84A]">*</span>
                </label>
                <Input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-[#D4AF37] focus:ring-[#D4AF37] h-10 rounded-xl text-sm"
                />
              </div>

              {/* Experience level */}
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  Current Experience Level
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full bg-[#06111D] border border-white/15 text-white text-xs h-10 px-3 rounded-xl focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="Beginner — New to Trading">Complete Beginner (Starting from Scratch)</option>
                  <option value="Some Stocks — Want Options Strategy">Some Stock Experience (Want Options Edge)</option>
                  <option value="Active Trader — Seeking Discipline">Active Trader (Looking for Risk Rules)</option>
                  <option value="Long Term Investor">Long-Term Investor (Wealth Compounding)</option>
                </select>
              </div>

              {/* Security info */}
              <div className="flex items-center gap-1.5 text-[11px] text-white/60 pt-1">
                <Shield size={13} className="text-[#E5B84A] shrink-0" />
                <span>Zero spam. No credit card required. Unsubscribe anytime.</span>
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                disabled={waitlistMutation.isPending}
                className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#E5C358] text-[#091C2D] font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {waitlistMutation.isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Reserving Spot...
                  </>
                ) : (
                  <>
                    JOIN PRIORITY WAITLIST <ArrowRight size={16} />
                  </>
                )}
              </Button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
