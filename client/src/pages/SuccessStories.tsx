import { Link } from "wouter";
import { ArrowRight, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { updateMetaTags } from "@/lib/meta";

const allTestimonials = [
  {
    initials: "SC",
    name: "Samitaa Chahal",
    handle: "@smitakc",
    result: "Best decision I ever made",
    quote: "Sounia is the kind of mentor who puts her heart and soul in her teachings. Her focus is on long-term learning (and not shortcuts) and good habits which build long term success. Highly recommended for anyone serious about learning trading.",
    stars: 5,
    date: "March 2026",
    image: "/images/testimonial-ahmad_874d9fc9.jpg",
  },
  {
    initials: "M",
    name: "Manu",
    handle: "Whop Verified",
    result: "Teaches with integrity",
    quote: "Sounia Gill is rare in this space. She teaches with integrity and clarity and doesn't gatekeep a single thing. She genuinely wants her students to win — to think for themselves, trade with confidence, and build real independence.",
    stars: 5,
    date: "February 2026",
    image: "/images/testimonial-jim_c5862ebd.jpg",
  },
  {
    initials: "KP",
    name: "Kamal Preet Singh",
    handle: "Whop Verified",
    result: "Most transparent mentor",
    quote: "Sounia ji is the most transparent and genuine mentor I've ever learned from. She explains option trading clearly, shares her trades openly, and truly cares about her students' growth. The only place where you actually learn option trading the right way.",
    stars: 5,
    date: "November 2025",
    image: "/images/testimonial-matthew_81761078.jpg",
  },
  {
    initials: "GS",
    name: "Gurpartap Singh",
    handle: "Whop Verified",
    result: "Worth every penny",
    quote: "I really want to thank her for creating such a valuable course. Her way of teaching and explaining the stock market is so easy to grasp. Really worth the time and money spent on it. She is a wonderful mentor and a pure and positive soul.",
    stars: 5,
    date: "January 2026",
    image: "/images/testimonial-ahmad_874d9fc9.jpg",
  },
  {
    initials: "MS",
    name: "Manvir Singh",
    handle: "Whop Verified",
    result: "Beginner to Advanced",
    quote: "Thank you very much Sounia for making such an amazing course — beginner friendly to advanced level. Recommended to everyone who wants to learn trading and investing in the market. She is the best.",
    stars: 5,
    date: "February 2026",
    image: "/images/testimonial-jim_c5862ebd.jpg",
  },
  {
    initials: "AJ",
    name: "Aisha Johnson",
    handle: "Whop Verified",
    result: "Life-changing education",
    quote: "Sounia's teaching style is exceptional. She breaks down complex concepts into simple, actionable steps. I've gone from complete beginner to confidently managing my own portfolio. This course is worth 10x the price.",
    stars: 5,
    date: "December 2025",
    image: "/images/testimonial-matthew_81761078.jpg",
  },
  {
    initials: "RP",
    name: "Rajesh Patel",
    handle: "Whop Verified",
    result: "Best investment in myself",
    quote: "I've taken many trading courses, but none compare to this. Sounia's approach is practical, ethical, and focused on long-term wealth building. Her community support is incredible. Highly recommend to anyone serious about financial independence.",
    stars: 5,
    date: "January 2026",
    image: "/images/testimonial-ahmad_874d9fc9.jpg",
  },
  {
    initials: "NK",
    name: "Nisha Kumar",
    handle: "Whop Verified",
    result: "Empowering and inspiring",
    quote: "As a woman in finance, I appreciate Sounia's transparency and genuine care for her students' success. Her course gave me the confidence to take control of my financial future. She's not just a teacher, she's a mentor.",
    stars: 5,
    date: "March 2026",
    image: "/images/testimonial-jim_c5862ebd.jpg",
  },
];

export default function SuccessStories() {
  const [displayedTestimonials, setDisplayedTestimonials] = useState<typeof allTestimonials>([]);

  useEffect(() => {
    updateMetaTags({
      title: "Success Stories | Gift of Trading",
      description: "Read real success stories from Gift of Trading students. Learn how 2,700+ students have transformed their financial futures through stock market education.",
      keywords: "success stories, student testimonials, trading success, stock market students, Gift of Trading reviews",
      ogTitle: "Success Stories | Gift of Trading",
      ogDescription: "Discover how our students are achieving financial success through stock market education.",
      canonicalUrl: "https://giftoftrading.com/success-stories",
    });
  }, []);

  useEffect(() => {
    // Shuffle and pick testimonials randomly
    const shuffled = [...allTestimonials].sort(() => Math.random() - 0.5);
    setDisplayedTestimonials(shuffled);
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-[oklch(12%_0.04_255)] py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <p className="text-[oklch(73%_0.14_72)] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Success Stories
          </p>
          <h1 className="text-5xl lg:text-6xl font-bold text-[oklch(97%_0.012_80)] mb-6">
            Student Wins & Transformations
          </h1>
          <p className="text-[oklch(75%_0.02_80)] text-xl max-w-3xl mx-auto leading-relaxed">
            Real students, real results. See how our community members have transformed their financial future with Stock Market Made Easy.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-[oklch(97%_0.012_80)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedTestimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border border-[oklch(88%_0.025_80)] shadow-sm hover:shadow-lg transition-shadow"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array(testimonial.stars)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-[oklch(73%_0.14_72)] text-[oklch(73%_0.14_72)]"
                      />
                    ))}
                </div>

                {/* Result */}
                <h3 className="text-lg font-bold text-[oklch(13%_0.04_255)] mb-3">
                  {testimonial.result}
                </h3>

                {/* Quote */}
                <p className="text-[oklch(48%_0.04_255)] text-base leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="pt-6 border-t border-[oklch(88%_0.025_80)]">
                  <p className="font-semibold text-[oklch(13%_0.04_255)]">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-[oklch(55%_0.04_255)]">
                    {testimonial.handle}
                  </p>
                  <p className="text-xs text-[oklch(73%_0.14_72)] mt-2">
                    {testimonial.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[oklch(12%_0.04_255)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <p className="text-[oklch(73%_0.14_72)] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Students Trained
              </p>
              <p className="text-6xl font-black text-[oklch(97%_0.012_80)] mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
                2,700+
              </p>
              <p className="text-[oklch(65%_0.04_255)]">
                From complete beginners to confident investors
              </p>
            </div>
            <div>
              <p className="text-[oklch(73%_0.14_72)] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Millionaires Created
              </p>
              <p className="text-6xl font-black text-[oklch(73%_0.14_72)] mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
                62+
              </p>
              <p className="text-[oklch(65%_0.04_255)]">
                Students who've built 7-figure portfolios
              </p>
            </div>
            <div>
              <p className="text-[oklch(73%_0.14_72)] text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Student Gains
              </p>
              <p className="text-6xl font-black text-[oklch(97%_0.012_80)] mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
                $62M+
              </p>
              <p className="text-[oklch(65%_0.04_255)]">
                Combined wealth created by our community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop CTA */}
      <section className="py-16 bg-[oklch(97%_0.012_80)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-[oklch(13%_0.04_255)] mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-[oklch(48%_0.04_255)] text-lg mb-8">
            Start your journey to financial independence with Stock Market Made Easy. Learn from Sounia and become part of our success stories.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Stock Market Made Easy Whop enrollment link removed */}
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-[oklch(13%_0.04_255)] text-[oklch(13%_0.04_255)] hover:bg-[oklch(93%_0.025_80)] px-8"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Ask Questions
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
