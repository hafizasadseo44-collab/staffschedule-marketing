import React from "react";
import AeoSection from "@/components/features/AeoSection";
import FeaturesHubHero from "@/components/features/FeaturesHubHero";
import MegaFeaturesGrid from "@/components/features/MegaFeaturesGrid";
import FeaturePillarShowcase from "@/components/features/FeaturePillarShowcase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Powerful Features | StaffSchedule.io - The Ultimate Workforce OS",
  description: "Explore the complete StaffSchedule.io feature set: From world-class scheduling and leave management to enterprise-grade analytics and multi-location control.",
  keywords: ["scheduling features", "team chat for work", "leave management system", "automated shift swaps", "workforce analytics tools", "multi-site scheduling features"],
  openGraph: {
    title: "Everything you need to lead your team | StaffSchedule.io",
    description: "One platform. Infinite possibilities. Discover the tools driving efficiency for thousands of teams.",
    images: ["/images/features-reporting-v1.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StaffSchedule.io Features Hub",
    description: "The all-in-one operating system for the modern workforce.",
    images: ["/images/features-reporting-v1.jpg"],
  }
};

const FAQS = [
  {
    question: "How long does it take to learn the system?",
    answer: "Most managers are fully operational within 30 minutes. Our 'Command Center' interface is designed to be intuitive—if you can use a calendar, you can use StaffSchedule.io."
  },
  {
    question: "Do you have mobile apps for staff?",
    answer: "Absolutely. We have professional, native mobile apps for both iOS and Android. Staff can check schedules, swap shifts, and clock in via the app."
  },
  {
    question: "Can I try all features during my trial?",
    answer: "Yes! Your trial gives you 'God Mode' access to every single feature, including Enterprise analytics and Multi-location hubs, so you can see exactly how they fit your business."
  },
  {
    question: "Is my data secure?",
    answer: "Enterprise security is baked into our core. We use AES-256 bit encryption and OIDC/SAML protocols to ensure your workforce data remains private and protected."
  }
];

export default function FeaturesPage() {
  // FAQ Schema for SEO / AEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <main className="pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <FeaturesHubHero />
      <MegaFeaturesGrid />
      
      <section className="py-24 bg-brand-dark overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Built for scale, <span className="text-brand-primary">styled for impact.</span></h2>
            <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">Our features aren't just powerful—they're designed to be the best-looking tools your team will ever use.</p>
         </div>
      </section>

      <FeaturePillarShowcase />

      <AeoSection faqs={FAQS} />
    </main>
  );
}
