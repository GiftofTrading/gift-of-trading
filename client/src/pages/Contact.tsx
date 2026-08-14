import { useEffect, useState } from "react";
import { Mail, Phone, Clock, CheckCircle2, Send, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import Layout from "@/components/Layout";
import { updateMetaTags } from "@/lib/meta";

const inquiryTypes = [
  { value: "stock-market-made-easy", label: "Stock Market Made Easy" },
  { value: "general", label: "General Inquiry" },
];

export default function Contact() {
  useEffect(() => {
    updateMetaTags({
      title: "Contact Us | Gift of Trading",
      description: "Get in touch with Gift of Trading. Have questions about Stock Market Made Easy or need support? Contact us today.",
      keywords: "contact Gift of Trading, stock market course support, Sounia Gill contact",
      ogTitle: "Contact Us | Gift of Trading",
      ogDescription: "Reach out to Gift of Trading for questions or support.",
      canonicalUrl: "https://giftoftrading.com/contact",
    });
  }, []);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiryType: "general" as "stock-market-made-easy" | "webinar" | "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const submitLead = trpc.leads.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Message sent! We'll be in touch within 24 hours.");
    },
    onError: (err) => {
      toast.error("Failed to send message. Please try again.");
      console.error(err);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    submitLead.mutate(form);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-[oklch(12%_0.04_255)] py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <p className="text-[oklch(73%_0.14_72)] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Get in Touch
          </p>
          <h1 className="text-5xl lg:text-6xl font-bold text-[oklch(97%_0.012_80)] mb-6">
            Start Your Trading Journey
          </h1>
          <p className="text-[oklch(75%_0.02_80)] text-xl max-w-2xl mx-auto">
            Have questions about Stock Market Made Easy? Ready to enroll? We'd love to hear from you. Reach out and we'll respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[oklch(97%_0.012_80)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Info */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[oklch(13%_0.04_255)] mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Contact Information
                </h2>
                <p className="text-[oklch(48%_0.04_255)] leading-relaxed">
                  We're here to help you take the next step. Whether you have questions about Stock Market Made Easy or are ready to enroll, reach out and we'll be happy to assist.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Mail, title: "Email", value: "giftoftrading@gmail.com", sub: "We respond within 24 hours" },
                  { icon: MapPin, title: "Location", value: "North America", sub: "Online support worldwide" },
                ].map(({ icon: Icon, title, value, sub }) => (
                  <div key={title} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-[oklch(88%_0.025_80)]">
                    <div className="w-10 h-10 rounded-lg bg-[oklch(73%_0.14_72)/10] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[oklch(73%_0.14_72)]" />
                    </div>
                    <div>
                      <p className="text-[oklch(13%_0.04_255)] font-semibold text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>{title}</p>
                      <p className="text-[oklch(35%_0.04_255)] text-sm">{value}</p>
                      <p className="text-[oklch(65%_0.04_255)] text-xs">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-white rounded-3xl border border-[oklch(88%_0.025_80)] p-12 text-center shadow-sm">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[oklch(13%_0.04_255)] mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Message Received!
                  </h3>
                  <p className="text-[oklch(48%_0.04_255)] text-lg mb-2">
                    Thank you for reaching out, {form.firstName}!
                  </p>
                  <p className="text-[oklch(55%_0.04_255)]">
                    We'll review your inquiry and get back to you within 24 hours. Check your email for a confirmation.
                  </p>
                  <Button
                    onClick={() => { setSubmitted(false); setForm({ firstName: "", lastName: "", email: "", phone: "", inquiryType: "general", message: "" }); }}
                    variant="outline"
                    className="mt-8 border-[oklch(73%_0.14_72)] text-[oklch(73%_0.14_72)]"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-[oklch(88%_0.025_80)] p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-[oklch(13%_0.04_255)] mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Send Us a Message
                  </h2>
                  <p className="text-[oklch(55%_0.04_255)] text-sm mb-8">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="firstName" className="text-[oklch(35%_0.04_255)] font-medium text-sm">
                          First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={form.firstName}
                          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                          required
                          className="border-[oklch(88%_0.025_80)] focus:border-[oklch(73%_0.14_72)]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="lastName" className="text-[oklch(35%_0.04_255)] font-medium text-sm">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={form.lastName}
                          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                          className="border-[oklch(88%_0.025_80)] focus:border-[oklch(73%_0.14_72)]"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-[oklch(35%_0.04_255)] font-medium text-sm">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          required
                          className="border-[oklch(88%_0.025_80)] focus:border-[oklch(73%_0.14_72)]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-[oklch(35%_0.04_255)] font-medium text-sm">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="border-[oklch(88%_0.025_80)] focus:border-[oklch(73%_0.14_72)]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-[oklch(35%_0.04_255)] font-medium text-sm">
                        I'm Interested In <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={form.inquiryType}
                        onValueChange={(v) => setForm({ ...form, inquiryType: v as typeof form.inquiryType })}
                      >
                        <SelectTrigger className="border-[oklch(88%_0.025_80)] focus:border-[oklch(73%_0.14_72)]">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((t) => (
                            <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-[oklch(35%_0.04_255)] font-medium text-sm">
                        Your Message <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your trading experience, goals, and any questions you have..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        required
                        rows={5}
                        className="border-[oklch(88%_0.025_80)] focus:border-[oklch(73%_0.14_72)] resize-none"
                      />
                    </div>

                    <div className="bg-[oklch(93%_0.025_80)] rounded-xl p-4 text-sm text-[oklch(48%_0.04_255)]">
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[oklch(73%_0.14_72)] flex-shrink-0 mt-0.5" />
                        Your information is secure and will never be shared with third parties. We'll only use it to respond to your inquiry.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={submitLead.isPending}
                      className="w-full bg-[oklch(13%_0.04_255)] hover:bg-[oklch(20%_0.06_255)] text-[oklch(97%_0.012_80)] font-bold py-4 text-base"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {submitLead.isPending ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-16 bg-[oklch(12%_0.04_255)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { value: "< 24hrs", label: "Average Response Time" },
              { value: "2,700+", label: "Students Helped" },
              { value: "Free", label: "Initial Consultation" },
            ].map(({ value, label }) => (
              <div key={label} className="bg-[oklch(16%_0.05_255)] rounded-2xl p-6 border border-[oklch(26%_0.07_255)]">
                <p className="text-[oklch(73%_0.14_72)] text-3xl font-black mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>{value}</p>
                <p className="text-[oklch(65%_0.04_255)] text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
