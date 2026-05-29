import React from "react";
import { Metadata } from "next";
import FeatureHero from "@/components/features/FeatureHero";
import ChaosVsCalm from "@/components/features/ChaosVsCalm";
import IndustryTabs from "@/components/features/IndustryTabs";
import AeoSection from "@/components/features/AeoSection";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Retail Staff Scheduling Software | StaffSchedule.io",
  description: "Scale your storefront workforce with ease. StaffSchedule.io offers multi-location management, sales surge forecasting, and peak-season scheduling for retail leaders.",
  keywords: ["retail scheduling", "storefront management", "retail workforce software", "multi-location staffing", "retail rota planner"],
  alternates: { canonical: "https://staffschedule.io/solutions/retail" },
  openGraph: {
    title: "Retail Workforce Scheduling | StaffSchedule.io",
    description: "Multi-location management and peak-season scheduling for retail leaders.",
    url: "https://staffschedule.io/solutions/retail",
    images: [{ url: "https://staffschedule.io/staffschedule-dashboard.png", width: 1200, height: 630, alt: "Retail Scheduling — StaffSchedule.io" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Retail Staff Scheduling | StaffSchedule.io",
    description: "Scale your retail workforce across multiple locations with ease.",
    images: ["https://staffschedule.io/staffschedule-dashboard.png"],
  },
};

const FAQS = [
  {
    question: "How do you handle seasonal staff surges?",
    answer: "Our platform allows you to rapidly onboard hundreds of temporary staff and clone successful schedules across multiple locations in minutes."
  },
  {
    question: "Can I track sales performance against hours scheduled?",
    answer: "Yes. Integration with your POS system allows us to show labor-to-sales ratios, ensuring you have the right amount of staff for every customer surge."
  }
];

export default function RetailSolutionPage() {
  return (
    <main className="min-h-screen bg-white">
      <FeatureHero
        badge="Retail Excellence"
        title={
          <>
            Scale your <br />
            <span className="text-brand-primary text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-indigo-600">
              storefront workforce.
            </span>
          </>
        }
        description="Transform your retail operations with multi-location management, peak-season demand forecasting, and real-time labor optimization. Built for modern retail leaders."
        visual={
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 aspect-video">
            <Image 
              src="/images/solutions/retail-hero.jpg" 
              alt="Retail Scheduling Dashboard" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 to-transparent pointer-events-none" />
          </div>
        }
      />

      <ChaosVsCalm />

      <section className="py-24 bg-indigo-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black text-brand-dark mb-4 tracking-tighter">
                Engineered for Multi-Location Growth.
              </h2>
              <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                Stop managing stores in silos. StaffSchedule.io brings your entire retail footprint into a single source of truth.
              </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Demand Forecasting",
                  desc: "Predict foot traffic and sales surges to ensure you're never understaffed during peak hours.",
                  icon: "📊"
                },
                {
                  title: "Cross-Store Pool",
                  desc: "Share high-performing staff between nearby locations to fill gaps without overtime.",
                  icon: "🏪"
                },
                {
                  title: "Inventory Sync",
                  desc: "Align your stocking schedules with shipment deliveries for maximum operational efficiency.",
                  icon: "📦"
                }
              ].map((item) => (
                <div key={item.title} className="p-10 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-indigo-200/20 hover:scale-105 transition-all">
                  <div className="text-4xl mb-6">{item.icon}</div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3">{item.title}</h3>
                  <p className="text-sm font-medium text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <IndustryTabs />

      <AeoSection 
        title="Command Your Retail Empire" 
        subtitle="The unified workforce platform for mid-market and enterprise retail brands." 
        faqs={FAQS} 
      />
    </main>
  );
}
