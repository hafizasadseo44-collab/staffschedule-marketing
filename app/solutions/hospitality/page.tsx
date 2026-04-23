import React from "react";
import { Metadata } from "next";
import FeatureHero from "@/components/features/FeatureHero";
import ChaosVsCalm from "@/components/features/ChaosVsCalm";
import IndustryTabs from "@/components/features/IndustryTabs";
import AeoSection from "@/components/features/AeoSection";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Hospitality Staff Scheduling Software | StaffSchedule.io",
  description: "Elite scheduling for restaurants, hotels, and bars. Reduce turnover, manage kitchen rotas, and stay compliant with StaffSchedule.io.",
  keywords: ["restaurant scheduling", "hospitality workforce management", "hotel staff rota", "kitchen scheduling software"],
};

const FAQS = [
  {
    question: "Can I manage multiple kitchen departments?",
    answer: "Yes. StaffSchedule.io allows you to create separate rotas for Front of House, Back of House, and Bar, and even share staff between departments."
  },
  {
    question: "How does the mobile app help with hospitality?",
    answer: "Staff can view their shifts, swap with colleagues, and request time off directly from their phones, reducing administrative overhead for managers."
  }
];

export default function HospitalitySolutionPage() {
  return (
    <main className="min-h-screen bg-white">
      <FeatureHero
        badge="Hospitality & Dining"
        title={
          <>
            Staffing flow for <br />
            <span className="text-brand-primary text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
              busy kitchens.
            </span>
          </>
        }
        description="Elite scheduling for restaurants, hotels, and bars. Reduce turnover by 40%, manage complex rotas, and ensure every shift is covered with our intelligent hospitality suite."
        visual={
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 aspect-video">
            <Image 
              src="/images/solutions/hospitality-hero.png" 
              alt="Hospitality Scheduling Dashboard" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 to-transparent pointer-events-none" />
          </div>
        }
      />

      <ChaosVsCalm />

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black text-brand-dark mb-4 tracking-tighter">
                Built for the Heat of the Kitchen.
              </h2>
              <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                Discover the specific hospitality tools that set us apart from generic scheduling apps.
              </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Shift Swapping",
                  desc: "Let staff swap shifts with manager approval, keeping your floor covered instantly.",
                  icon: "🔄"
                },
                {
                  title: "Tips Tracking",
                  desc: "Integrate with your POS to track and distribute tips across shifts accurately.",
                  icon: "💰"
                },
                {
                  title: "Labor Cost Control",
                  desc: "View real-time labor percentages against sales to prevent overstaffing.",
                  icon: "📈"
                }
              ].map((item) => (
                <div key={item.title} className="p-10 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:scale-105 transition-all">
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
        title="Elevate Your Hospitality Ops" 
        subtitle="The industry's most trusted partner for restaurant and hotel management." 
        faqs={FAQS} 
      />
    </main>
  );
}
