import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { useLocation } from "wouter";

export default function VerifyEmail() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [verificationCode, setVerificationCode] = useState("");
  const [codesSent, setCodesSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Send verification email on mount
  useEffect(() => {
    if (user && !user.emailVerified && !codesSent) {
      sendCode();
    }
  }, [user, codesSent]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const sendVerificationEmail = trpc.auth.sendVerificationEmail.useMutation({
    onSuccess: () => {
      setCodesSent(true);
      setTimeLeft(60);
      toast.success("Verification code sent to your email");
    },
    onError: (e) => {
      toast.error("Failed to send code: " + e.message);
    },
  });

  const verifyEmail = trpc.auth.verifyEmail.useMutation({
    onSuccess: () => {
      toast.success("Email verified successfully!");
      setTimeout(() => {
        setLocation("/");
      }, 1500);
    },
    onError: (e) => {
      toast.error("Verification failed: " + e.message);
    },
  });

  const sendCode = () => {
    sendVerificationEmail.mutate();
  };

  const handleVerify = () => {
    if (!verificationCode.trim()) {
      toast.error("Please enter the verification code");
      return;
    }
    verifyEmail.mutate({ code: verificationCode });
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[oklch(73%_0.14_72)]" />
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-[oklch(55%_0.04_255)]">Please sign in first</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (user.emailVerified) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h1 className="text-2xl font-bold text-[oklch(13%_0.04_255)]">Email Already Verified</h1>
            <p className="text-[oklch(55%_0.04_255)]">Your email has already been verified. Redirecting...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[oklch(97%_0.012_80)] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg border border-[oklch(88%_0.025_80)] p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <Mail className="w-12 h-12 text-[oklch(73%_0.14_72)] mx-auto" />
            <h1 className="text-2xl font-bold text-[oklch(13%_0.04_255)]">Verify Your Email</h1>
            <p className="text-[oklch(55%_0.04_255)] text-sm">
              We sent a verification code to<br />
              <strong>{user.email}</strong>
            </p>
          </div>

          {/* Verification Code Input */}
          <div className="space-y-2">
            <Label className="text-[oklch(13%_0.04_255)] font-semibold">Verification Code</Label>
            <Input
              type="text"
              placeholder="Enter 6-digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              maxLength={6}
              className="text-center text-lg tracking-widest"
              disabled={verifyEmail.isPending}
            />
            <p className="text-xs text-[oklch(55%_0.04_255)]">Code expires in 24 hours</p>
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            disabled={verifyEmail.isPending || verificationCode.length !== 6}
            className="w-full bg-[oklch(73%_0.14_72)] hover:bg-[oklch(65%_0.12_72)] text-white"
          >
            {verifyEmail.isPending ? "Verifying..." : "Verify Email"}
          </Button>

          {/* Resend Code */}
          <div className="text-center">
            <p className="text-sm text-[oklch(55%_0.04_255)] mb-2">Didn't receive the code?</p>
            <Button
              onClick={sendCode}
              disabled={sendVerificationEmail.isPending || timeLeft > 0}
              variant="outline"
              className="w-full"
            >
              {timeLeft > 0 ? `Resend in ${timeLeft}s` : "Resend Code"}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
