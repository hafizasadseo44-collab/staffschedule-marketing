import React from "react";
import { Metadata } from "next";
import FeatureHero from "@/components/features/FeatureHero";
import ChaosVsCalm from "@/components/features/ChaosVsCalm";
import AeoSection from "@/components/features/AeoSection";
import Image from "next/image";

export const metadata: Metadata = {
  title: "AI Demand Forecasting & Predictive Scheduling | StaffSchedule.io",
  description: "Stop guessing your staffing needs. StaffSchedule.io uses advanced AI to predict labor demand with 98% accuracy based on historical sales and foot traffic.",
  keywords: ["AI forecasting", "predictive scheduling", "labor demand modeling", "machine learning workforce management", "AI workforce tools"],
  alternates: { canonical: "https://staffschedule.io/features/ai" },
  openGraph: {
    title: "AI Demand Forecasting | StaffSchedule.io",
    description: "Predict your staffing needs with 98% accuracy. Powered by advanced AI.",
    url: "https://staffschedule.io/features/ai",
    images: [{ url: "https://staffschedule.io/staffschedule-dashboard.png", width: 1200, height: 630, alt: "AI Scheduling Forecasting — StaffSchedule.io" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Demand Forecasting | StaffSchedule.io",
    description: "98% accurate labor demand prediction. Eliminate scheduling guesswork.",
    images: ["https://staffschedule.io/staffschedule-dashboard.png"],
  },
};

const FAQS = [
  {
    question: "How accurate is the AI forecasting?",
    answer: "Our neural engine typically achieves 98% accuracy after analyzing just 4 weeks of historical POS or foot traffic data."
  },
  {
    question: "Does it take external factors into account?",
    answer: "Yes. Our AI models analyze local weather patterns, holidays, and community events to predict how they will impact your specific business traffic."
  }
];

export default function AiFeaturePage() {
  return (
    <main className="min-h-screen bg-brand-dark text-white">
      <FeatureHero
        badge="Neural Engine"
        title={
          <>
            Predict the future <br />
            <span className="text-brand-primary text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              of your workforce.
            </span>
          </>
        }
        description="Eliminate the guesswork in staffing. Our advanced AI analyzes historical data and external variables to predict your labor needs with surgical precision."
        visual={
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.3)] border border-white/10 aspect-video bg-black">
            <Image 
              src="/images/features/ai-hero.jpg" 
              alt="AI Forecasting Dashboard" 
              fill 
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent pointer-events-none" />
          </div>
        }
      />

      <ChaosVsCalm />

      <section className="py-24 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tighter">
                Intelligent Demand Planning.
              </h2>
              <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                Move from reactive scheduling to proactive dominance with the world's most advanced workforce AI.
              </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "98% Accuracy",
                  desc: "Our models learn your business patterns to provide near-perfect staffing suggestions every single week.",
                  icon: "🎯"
                },
                {
                  title: "Pattern Recognition",
                  desc: "Identify hidden trends in your labor data that human managers might miss for years.",
                  icon: "🧠"
                },
                {
                  title: "Surge Prevention",
                  desc: "Get ahead of peak hours before they happen, ensuring your customer experience never suffers.",
                  icon: "⚡"
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

      <AeoSection 
        title="Command Your Capacity" 
        subtitle="Harness the power of the most advanced labor-forecasting engine ever built." 
        faqs={FAQS} 
      />
    </main>
  );
}
