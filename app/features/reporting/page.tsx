import React from "react";
import { Metadata } from "next";
import FeatureHero from "@/components/features/FeatureHero";
import ChaosVsCalm from "@/components/features/ChaosVsCalm";
import ReportingBento from "@/components/features/ReportingBento";
import ReportingSimulation from "@/components/features/ReportingSimulation";
import AeoSection from "@/components/features/AeoSection";
import Image from "next/image";
import { ArrowRight, BarChart3, Database, Zap, ShieldCheck, Heart, PieChart, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import FeatureLifecycle from "@/components/features/FeatureLifecycle";
import MetricShowcase from "@/components/features/MetricShowcase";
import EcosystemGraph from "@/components/features/EcosystemGraph";
import StaffPulse from "@/components/features/StaffPulse";

export const metadata: Metadata = {
  title: "Business Intelligence & Labor Reporting | StaffSchedule.io",
  description: "Get total visibility into your labor costs. StaffSchedule.io provides advanced reporting, automated payroll exports, and real-time business intelligence for multi-unit managers.",
  keywords: ["labor reporting software", "workforce business intelligence", "payroll export tools", "scheduling analytics", "manager productivity reports", "SaaS BI tools"],
  openGraph: {
    title: "Insightful Labor Reporting | StaffSchedule.io",
    description: "Data-driven decisions start with high-fidelity reporting. Export your success instantly.",
    url: "https://staffschedule.io/features/reporting",
    images: [{ url: "/images/reporting-hero-v1.png", width: 1200, height: 630, alt: "StaffSchedule.io Reporting Dashboard" }],
    type: "website",
  },
};

const FAQS = [
  {
    question: "Can I customize the data columns in my exports?",
    answer: "Yes. Our 'Data Designer' allows you to drag and drop columns, rename fields, and format dates and currency to match your payroll software's specific import requirements."
  },
  {
    question: "Is there a limit to how much historical data I can store?",
    answer: "No. StaffSchedule.io keeps your operational data indefinitely, allowing you to run Year-over-Year comparisons and audit your labor history at any time."
  },
  {
    question: "Do reports update in real-time?",
    answer: "Absolutely. As soon as a manager publishes a shift or a staff member clocks out, the data is instantly recalculated and reflected in your dashboards."
  },
  {
    question: "Can I limit who can see specific reports?",
    answer: "Yes. We have granular 'Reporting Permissions'. You can ensure department managers only see their own labor costs, while executives see the full site-wide overview."
  }
];

export default function ReportingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-brand-dark overflow-hidden">
      
      {/* 1. Hero with Generated Visual */}
      <FeatureHero
        badge="Intelligent Business Ops"
        title={
          <>
            Data that drives <br />
            <span className="text-indigo-600 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-brand-primary">
               actual growth.
            </span>
          </>
        }
        description="Stop guessing your profitability. Get the high-fidelity data you need to manage labor costs, optimize staff performance, and scale your business with confidence."
        ctaText="Start Scaling for Free"
        visual={
          <div className="relative group perspective-1000">
             <div className="absolute -inset-4 bg-indigo-500/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="relative bg-white dark:bg-slate-900 rounded-[3rem] border border-border shadow-2xl overflow-hidden transform group-hover:rotate-1 group-hover:scale-[1.02] transition-all duration-500">
                <Image 
                   src="/images/reporting-hero-v1.png" 
                   alt="Reporting Intelligence UI" 
                   width={800} 
                   height={600} 
                   className="w-full h-auto"
                />
             </div>
          </div>
        }
      />

      {/* 2. Problem/Solution */}
      <ChaosVsCalm />

      {/* 3. The Grid (Bento) */}
      <ReportingBento />

      {/* 4. Interactive Simulation */}
      <ReportingSimulation />

      {/* 4.5 Data Lifecycle */}
      <FeatureLifecycle 
         title="From signal to strategy."
         subtitle="How we turn daily activity into executive-ready insights."
         steps={[
            {
               title: "Touchpoint Capture",
               description: "Every clock-in, shift swap, and holiday request is instantly timestamped and recorded for perfect accuracy.",
               icon: <Database className="w-8 h-8" />
            },
            {
               title: "Real-time Aggregation",
               description: "Our engine calculates labor-to-sales ratios and overtime risks every second, giving you a live business pulse.",
               icon: <Zap className="w-8 h-8" />
            },
            {
               title: "Insightful Visualization",
               description: "Complex data is transformed into beautiful, high-contrast dashboards that anyone can understand at a glance.",
               icon: <PieChart className="w-8 h-8" />
            },
            {
               title: "Automated Delivery",
               description: "Scheduled reports land in your inbox every Monday morning. Compliance and payroll are ready before you are.",
               icon: <CheckCircle2 className="w-8 h-8" />
            }
         ]}
      />

      {/* 4.6 Reporting Metrics */}
      <MetricShowcase 
         title="Precision at every level."
         metrics={[
            {
               label: "Data Accuracy",
               value: "100%",
               sub: "Reliable, audit-proof data that matches your raw operational activity exactly.",
               icon: <ShieldCheck className="w-6 h-6" />
            },
            {
               label: "Admin Savings",
               value: "20h",
               sub: "Average hours saved per month by automating weekly payroll and labor reports.",
               icon: <Database className="w-6 h-6" />
            },
            {
               label: "Labor Efficiency",
               value: "+15%",
               sub: "Improvement in staffing efficiency by identifying and cutting labor cost bleed.",
               icon: <Zap className="w-6 h-6" />
            },
            {
               label: "Staff Trust",
               value: "99%",
               sub: "Percentage of staff who report higher trust in payroll accuracy since digitizing.",
               icon: <Heart className="w-6 h-6" />
            }
         ]}
      />

      {/* 4.7 Ecosystem Graph */}
      <EcosystemGraph />

      {/* 4.8 Staff Pulse */}
      <StaffPulse 
         title="Truth you can trust."
         subtitle="Accurate reporting doesn't just benefit the boss—it protects the team too."
         testimonials={[
            {
               name: "Greg Stevens",
               role: "Bar Manager",
               content: "I used to spend my entire Sunday night on spreadsheets. Now I just click 'Export' and my payroll is done in 30 seconds.",
               avatar: "https://i.pravatar.cc/150?u=greg",
               rating: 5
            },
            {
               name: "Mila Kunis",
               role: "Waitress",
               content: "I love being able to see my own performance stats. It's nice to know exactly how many hours I've worked without having to argue about it.",
               avatar: "https://i.pravatar.cc/150?u=mila",
               rating: 5
            },
            {
               name: "Victor Hugo",
               role: "Regional Director",
               content: "Having a bird's-eye view of all 12 locations from my phone is invaluable. I can spot a labor surge before it ruins my weekly margin.",
               avatar: "https://i.pravatar.cc/150?u=victor",
               rating: 5
            }
         ]}
      />

      {/* 5. Trust & Scale Strip */}
      <section className="py-24 bg-indigo-600 overflow-hidden relative">
         <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl animate-pulse" />
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
               <div>
                  <h2 className="text-4xl lg:text-7xl font-black text-white mb-4 tracking-tighter">
                     Master your <br />
                     <span className="text-indigo-900">operating speed.</span>
                  </h2>
                  <p className="text-xl text-indigo-100 font-medium max-w-xl">
                     Automate your weekly data sync and cut payroll admin time by 75% starting today.
                  </p>
               </div>
               <Link href="https://app.staffschedule.io/signup.php">
                  <button className="h-20 px-12 bg-white text-indigo-600 rounded-[2rem] font-black text-2xl shadow-2xl hover:scale-105 transition-all flex items-center gap-4">
                     Claim Your Data
                     <ArrowRight className="w-8 h-8" />
                  </button>
               </Link>
            </div>
         </div>
      </section>

      {/* 6. AEO FAQs */}
      <AeoSection 
         title="Intelligence Answered" 
         subtitle="Everything you need to know about the power of our reporting suite." 
         faqs={FAQS} 
      />

      <div className="bg-slate-50 dark:bg-slate-900/50 h-24 w-full" />
    </main>
  );
}
