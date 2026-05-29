import React from "react";
import { Metadata } from "next";
import FeatureHero from "@/components/features/FeatureHero";
import ChaosVsCalm from "@/components/features/ChaosVsCalm";
import IndustryTabs from "@/components/features/IndustryTabs";
import AeoSection from "@/components/features/AeoSection";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Healthcare Workforce Scheduling Software | StaffSchedule.io",
  description: "Critical shift coverage for hospital systems and clinics. Manage nurse-to-patient ratios, track certifications, and ensure compliance with StaffSchedule.io.",
  keywords: ["healthcare scheduling", "nurse staffing software", "hospital rota management", "clinical workforce platform"],
  alternates: { canonical: "https://staffschedule.io/solutions/healthcare" },
  openGraph: {
    title: "Healthcare Staff Scheduling | StaffSchedule.io",
    description: "Critical shift coverage for hospitals and clinics. Nurse ratio tracking and certification alerts.",
    url: "https://staffschedule.io/solutions/healthcare",
    images: [{ url: "https://staffschedule.io/staffschedule-dashboard.png", width: 1200, height: 630, alt: "Healthcare Scheduling — StaffSchedule.io" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare Scheduling Software | StaffSchedule.io",
    description: "Ensure patient safety with intelligent shift mapping and compliance tracking.",
    images: ["https://staffschedule.io/staffschedule-dashboard.png"],
  },
};

const FAQS = [
  {
    question: "How do you handle credentialing and certifications?",
    answer: "Our system automatically alerts managers and staff when certifications (like BLS or nursing licenses) are nearing expiration, preventing compliance gaps."
  },
  {
    question: "Can we track nurse-to-patient ratios in real-time?",
    answer: "Yes. Our dashboard allows you to input patient volume and automatically calculates whether your current staffing levels meet mandated or internal safety ratios."
  }
];

export default function HealthcareSolutionPage() {
  return (
    <main className="min-h-screen bg-white">
      <FeatureHero
        badge="Healthcare & Clinical"
        title={
          <>
            Critical shift coverage <br />
            <span className="text-brand-primary text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
              for medical teams.
            </span>
          </>
        }
        description="Ensure patient safety with intelligent shift mapping, mandatory ratio tracking, and automated certification alerts. Built for the high-stakes environment of modern healthcare."
        visual={
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 aspect-video">
            <Image 
              src="/images/solutions/healthcare-hero.jpg" 
              alt="Healthcare Scheduling Dashboard" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 to-transparent pointer-events-none" />
          </div>
        }
      />

      <ChaosVsCalm />

      <section className="py-24 bg-teal-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black text-brand-dark mb-4 tracking-tighter">
                Patient Safety Through Staffing Excellence.
              </h2>
              <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                The healthcare environment never stops. Neither should your scheduling platform.
              </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Credential Guard",
                  desc: "Never worry about expired licenses. Automated alerts keep your team fully compliant and ready for shift.",
                  icon: "🛡️"
                },
                {
                  title: "Ratio Monitoring",
                  desc: "Real-time visibility into nurse-to-patient ratios across departments and individual wards.",
                  icon: "🌡️"
                },
                {
                  title: "On-Call Automation",
                  desc: "Instantly notify on-call pools when surge capacity is reached or emergency shifts open up.",
                  icon: "📟"
                }
              ].map((item) => (
                <div key={item.title} className="p-10 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-teal-200/20 hover:scale-105 transition-all">
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
        title="Ready for the Frontline" 
        subtitle="Empowering medical institutions to focus on care, not calendars." 
        faqs={FAQS} 
      />
    </main>
  );
}
