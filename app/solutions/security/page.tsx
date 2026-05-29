import React from "react";
import { Metadata } from "next";
import FeatureHero from "@/components/features/FeatureHero";
import ChaosVsCalm from "@/components/features/ChaosVsCalm";
import IndustryTabs from "@/components/features/IndustryTabs";
import AeoSection from "@/components/features/AeoSection";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Security Guard Scheduling Software | StaffSchedule.io",
  description: "Precision scheduling for patrol and site security. Track guards in real-time, validate post attendance, and reduce incident response times with StaffSchedule.io.",
  keywords: ["security scheduling", "guard management software", "patrol tracking", "workforce staffing for security", "security guard rota"],
  alternates: { canonical: "https://staffschedule.io/solutions/security" },
  openGraph: {
    title: "Security Guard Scheduling | StaffSchedule.io",
    description: "Real-time guard tracking, post attendance validation, and compliance for security teams.",
    url: "https://staffschedule.io/solutions/security",
    images: [{ url: "https://staffschedule.io/staffschedule-dashboard.png", width: 1200, height: 630, alt: "Security Scheduling — StaffSchedule.io" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Security Workforce Scheduling | StaffSchedule.io",
    description: "GPS-verified guard attendance and precision scheduling for security teams.",
    images: ["https://staffschedule.io/staffschedule-dashboard.png"],
  },
};

const FAQS = [
  {
    question: "Do you support real-time GPS tracking?",
    answer: "Yes. Our mobile app provides live GPS validation for every clock-in and can track guard movement during active patrol shifts."
  },
  {
    question: "Can we manage guard certifications and licenses?",
    answer: "Absolutely. You can store guard cards and firearms certifications, and the system will prevent scheduling any guard whose credentials have expired."
  }
];

export default function SecuritySolutionPage() {
  return (
    <main className="min-h-screen bg-white">
      <FeatureHero
        badge="Security & Protection"
        title={
          <>
            Precision scheduling <br />
            <span className="text-brand-primary text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-brand-dark">
              for patrol teams.
            </span>
          </>
        }
        description="Empower your security operations with real-time GPS validation, automated post assignments, and incident reporting maps. Built for the frontlines of protection."
        visual={
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 aspect-video">
            <Image 
              src="/images/solutions/security-hero.jpg" 
              alt="Security Scheduling Dashboard" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 to-transparent pointer-events-none" />
          </div>
        }
      />

      <ChaosVsCalm />

      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black mb-4 tracking-tighter">
                Tactical Workforce Management.
              </h2>
              <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                In security, every second counts. Your scheduling shouldn't slow you down.
              </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Post Validation",
                  desc: "Ensure every post is manned. Real-time alerts notify managers immediately if a guard misses a check-in.",
                  icon: "📍"
                },
                {
                  title: "Incident Mapping",
                  desc: "Overlay guard positions with incident reports to optimize coverage and response in high-risk zones.",
                  icon: "🗺️"
                },
                {
                  title: "Patrol Flow",
                  desc: "Automate patrol routes and track completion rates through our integrated mobile guard app.",
                  icon: "👣"
                }
              ].map((item) => (
                <div key={item.title} className="p-10 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  <div className="text-4xl mb-6">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm font-medium text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <IndustryTabs />

      <AeoSection 
        title="Command Room Performance" 
        subtitle="The mission-critical platform for commercial and private security firms." 
        faqs={FAQS} 
      />
    </main>
  );
}
