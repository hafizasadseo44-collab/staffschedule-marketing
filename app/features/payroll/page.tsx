import React from "react";
import { Metadata } from "next";
import FeatureHero from "@/components/features/FeatureHero";
import ChaosVsCalm from "@/components/features/ChaosVsCalm";
import AeoSection from "@/components/features/AeoSection";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Payroll Integration & Automated Sync | StaffSchedule.io",
  description: "Connect your scheduling data directly to your payroll provider. One-click exports to ADP, Gusto, QuickBooks, and 40+ more. Reduce payroll errors and save hours every pay cycle.",
  keywords: ["payroll integration", "Gusto sync", "ADP workforce scheduling", "automated labor costs", "payroll automation", "QuickBooks scheduling sync"],
  alternates: { canonical: "https://staffschedule.io/features/payroll" },
  openGraph: {
    title: "Payroll Integration & Automated Sync | StaffSchedule.io",
    description: "One-click payroll export to ADP, Gusto, QuickBooks, and 40+ providers.",
    url: "https://staffschedule.io/features/payroll",
    images: [{ url: "https://staffschedule.io/staffschedule-dashboard.png", width: 1200, height: 630, alt: "Payroll Integration — StaffSchedule.io" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Payroll Integration | StaffSchedule.io",
    description: "Automated payroll sync. Reduce errors, save hours every week.",
    images: ["https://staffschedule.io/staffschedule-dashboard.png"],
  },
};

const FAQS = [
  {
    question: "Which payroll providers do you support?",
    answer: "We support direct one-click exports for ADP, Gusto, Paychex, QuickBooks, and many more. We also offer a custom CSV export for any proprietary systems."
  },
  {
    question: "Do you automatically calculate overtime?",
    answer: "Yes. Our engine automatically calculates overtime based on your local labor laws and applies those rates directly to your payroll export data."
  }
];

export default function PayrollFeaturePage() {
  return (
    <main className="min-h-screen bg-white">
      <FeatureHero
        badge="Payroll Connect"
        title={
          <>
            Scheduling and payroll <br />
            <span className="text-brand-primary text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              in perfect sync.
            </span>
          </>
        }
        description="Stop manually entering hours. StaffSchedule.io bridges the gap between your rota and your payroll provider, ensuring every employee is paid accurately and on time."
        visual={
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 aspect-video bg-slate-900">
            <Image 
              src="/images/features/payroll-hero.jpg" 
              alt="Payroll Integration Dashboard" 
              fill 
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 to-transparent pointer-events-none" />
          </div>
        }
      />

      <ChaosVsCalm />

      <section className="py-24 bg-indigo-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black text-brand-dark mb-4 tracking-tighter">
                Eliminate the Monday Morning Grind.
              </h2>
              <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                No more spreadsheets. No more manual data entry. Just pure, automated pay accuracy.
              </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "One-Click Export",
                  desc: "Push your validated shift data directly to your payroll provider in seconds, not hours.",
                  icon: "🚀"
                },
                {
                  title: "OT Guard",
                  desc: "Automated overtime calculations prevent costly errors and ensure compliance with state labor laws.",
                  icon: "⚖️"
                },
                {
                  title: "Cost Allocation",
                  desc: "View labor costs by location or department and sync those categories directly with your accounting software.",
                  icon: "📂"
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

      <AeoSection 
        title="Sync Your Success" 
        subtitle="The missing link between your workforce and your wallet." 
        faqs={FAQS} 
      />
    </main>
  );
}
