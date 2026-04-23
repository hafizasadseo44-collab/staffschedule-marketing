import React from "react";
import { Metadata } from "next";
import FeatureHero from "@/components/features/FeatureHero";
import ChaosVsCalm from "@/components/features/ChaosVsCalm";
import SchedulingBento from "@/components/features/SchedulingBento";
import IndustryTabs from "@/components/features/IndustryTabs";
import StickyScrollDaily from "@/components/features/StickyScrollDaily";
import AeoSection from "@/components/features/AeoSection";
import SchedulingHeroVisual from "@/components/features/SchedulingHeroVisual";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// 🚀 SEO & AEO Meta Data Layer
export const metadata: Metadata = {
  title: "AI Auto-Scheduling Software | StaffSchedule.io",
  description: "Stop fighting spreadsheets. StaffSchedule.io uses AI to auto-assign shifts, cut scheduling time by 80%, and mediate swaps instantly. Loved by 2,500+ managers.",
  keywords: ["auto scheduling software", "AI employee scheduling", "staff rota tool", "shift swapping app", "employee scheduling platform", "StaffSchedule"],
  alternates: {
    canonical: "/features/scheduling",
  },
  openGraph: {
    title: "AI Auto-Scheduling Software | StaffSchedule.io",
    description: "Intelligent auto-assigning and drag-and-drop simplicity to cut your scheduling time by 80%.",
    url: "https://staffschedule.io/features/scheduling",
    type: "website",
    images: [
      {
        url: "https://staffschedule.io/images/og-scheduling.jpg",
        width: 1200,
        height: 630,
        alt: "StaffSchedule.io Scheduling Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Auto-Scheduling Software | StaffSchedule.io",
    description: "Intelligent auto-assigning and drag-and-drop simplicity to cut your scheduling time by 80%.",
  },
};

const FAQS = [
  {
    question: "How long does it take to build a weekly schedule?",
    answer: "With StaffSchedule.io, most managers can build and publish a full weekly rota in under 10 minutes by using our AI-powered auto-schedule and cloning tools."
  },
  {
    question: "How much can I save on labor costs?",
    answer: "Our automated overtime alerts and real-time cost tracking help businesses reduce labor expenses by an average of 12-18% per month."
  },
  {
    question: "Does it work for multiple locations?",
    answer: "Yes! Our enterprise-grade architecture allows you to manage hundreds of locations from a single dashboard, including shared staff pools."
  },
  {
    question: "Can staff manage their own leave and swaps?",
    answer: "Absolutely. Staff use the mobile app to request leave and swap shifts. You simply receive a notification to approve or deny."
  }
];

export default function SchedulingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-brand-dark overflow-hidden">
      {/* 1. Immersive Hero */}
      <FeatureHero
        badge="AI-Powered Scheduling"
        title={
          <>
            Scheduling that <br />
            <span className="text-brand-primary text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
              builds itself.
            </span>
          </>
        }
        description="Stop fighting with spreadsheets. StaffSchedule.io uses intelligent auto-assigning and drag-and-drop simplicity to cut your scheduling time by 80%."
        ctaText="Start Scaling for Free"
        visual={<SchedulingHeroVisual />}
      />

      {/* 2. Problem/Solution Section */}
      <ChaosVsCalm />

      {/* 3. Feature Bento Grid */}
      <SchedulingBento />

      {/* 4. Sticky Scroll Journey */}
      <StickyScrollDaily />

      {/* 5. Industry Vertical Tabs */}
      <IndustryTabs />

      {/* 6. Value Proposition Strip */}
      <section className="py-24 bg-brand-primary overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="grid grid-cols-12 h-full gap-4 rotate-12 scale-150">
               {[...Array(24)].map((_, i) => (
                  <div key={i} className="h-full bg-white/20 rounded-full" />
               ))}
            </div>
         </div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
               <div>
                  <h2 className="text-4xl lg:text-6xl font-black text-white mb-4">
                     Save 8 hours a week.
                  </h2>
                  <p className="text-xl text-indigo-100 font-medium max-w-2xl">
                     Join over 2,500 managers who chose StaffSchedule.io to simplify their workforce.
                  </p>
               </div>
               <Link href="https://app.staffschedule.io/signup.php">
                  <button className="h-16 px-10 bg-white text-brand-primary rounded-2xl font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                     Get Started Now
                     <ArrowRight className="w-6 h-6" />
                  </button>
               </Link>
            </div>
         </div>
      </section>

      {/* 7. FAQ (AEO) */}
      <AeoSection 
         title="Scheduling Redefined" 
         subtitle="Got questions? We've got answers about the world's most powerful scheduling tool." 
         faqs={FAQS} 
      />

      {/* Small design polish to footer connectivity */}
      <div className="bg-slate-50 dark:bg-slate-900/50 h-24 w-full" />
    </main>
  );
}
