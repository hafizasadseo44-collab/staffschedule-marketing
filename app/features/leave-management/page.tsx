import React from "react";
import { Metadata } from "next";
import FeatureHero from "@/components/features/FeatureHero";
import ChaosVsCalm from "@/components/features/ChaosVsCalm";
import LeaveBento from "@/components/features/LeaveBento";
import LeaveSimulation from "@/components/features/LeaveSimulation";
import AeoSection from "@/components/features/AeoSection";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Calendar, ShieldCheck, Zap, Heart } from "lucide-react";
import Link from "next/link";
import FeatureLifecycle from "@/components/features/FeatureLifecycle";
import MetricShowcase from "@/components/features/MetricShowcase";
import EcosystemGraph from "@/components/features/EcosystemGraph";
import StaffPulse from "@/components/features/StaffPulse";

export const metadata: Metadata = {
  title: "Employee Leave Management Software | StaffSchedule.io",
  description: "Automate your employee time off requests, holiday tracking, and sick leave. Smart conflict detection ensures your shifts are always covered. Syncs perfectly with payroll.",
  keywords: ["leave management software", "holiday tracking app", "employee time off system", "sick leave management", "staff holiday planner", "SaaS leave tools"],
  alternates: { canonical: "https://staffschedule.io/features/leave-management" },
  openGraph: {
    title: "Employee Leave Management Software | StaffSchedule.io",
    description: "Digital leave management that detects scheduling conflicts before they happen.",
    url: "https://staffschedule.io/features/leave-management",
    images: [{ url: "https://staffschedule.io/staffschedule-dashboard.png", width: 1200, height: 630, alt: "StaffSchedule.io Leave Management" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Employee Leave Management | StaffSchedule.io",
    description: "Automated leave tracking with smart conflict detection.",
    images: ["https://staffschedule.io/staffschedule-dashboard.png"],
  },
};

const FAQS = [
  {
    question: "Can I set different leave balances for different employees?",
    answer: "Yes. You can configure custom accrual policies for each employee or department, allowing for carry-over days, tenure-based increases, and varied leave types (Annual, Sick, Personal)."
  },
  {
    question: "Does the system prevent everyone from taking off at once?",
    answer: "Absolutely. Our 'Minimum Staffing' rules allow you to set a baseline of required employees per role or department. If a request would drop coverage below this line, the system flags a conflict for the manager manually."
  },
  {
    question: "Do staff need an app to request leave?",
    answer: "Staff can request leave through the native mobile app (iOS & Android) or via the web portal. They get push notifications the second their request is approved or denied."
  },
  {
    question: "How does it connect to my payroll?",
    answer: "Leave data can be exported as a payroll-ready CSV or synced via our API to popular accounting systems like Xero, QuickBooks, or ADP, ensuring staff are paid accurately."
  }
];

export default function LeaveManagementPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-brand-dark overflow-hidden">
      
      {/* 1. Hero with Generated Visual */}
      <FeatureHero
        badge="Enterprise Leave Management"
        title={
          <>
            Holiday tracking <br />
            <span className="text-brand-primary text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
               built for humans.
            </span>
          </>
        }
        description="Ditch the messy spreadsheets. Manage every holiday request, sick day, and personal absence in one unified, professional dashboard with zero data entry errors."
        ctaText="Start Scaling for Free"
        visual={
          <div className="relative group perspective-1000">
             <div className="absolute -inset-4 bg-brand-primary/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="relative bg-white dark:bg-slate-900 rounded-[3rem] border border-border shadow-2xl overflow-hidden transform group-hover:rotate-1 group-hover:scale-[1.02] transition-all duration-500">
                <Image 
                   src="/images/leave-hero-v1.png" 
                   alt="Leave Management UI" 
                   width={800} 
                   height={600} 
                   className="w-full h-auto"
                />
             </div>
          </div>
        }
      />

      {/* 2. Problem/Solution (Universal) */}
      <ChaosVsCalm />

      {/* 3. The Details (Bento) */}
      <LeaveBento />

      {/* 4. Interactive Simulation */}
      <LeaveSimulation />

      {/* 4.5 New Lifecycle Section */}
      <FeatureLifecycle 
        title="The life of a holiday request."
        subtitle="Automated, transparent, and sync'd in real-time."
        steps={[
          {
            title: "Staff Request",
            description: "Employees suggest time-off via the mobile app in seconds. They can see their personal balance instantly.",
            icon: <Zap className="w-8 h-8" />
          },
          {
            title: "Automatic Conflict Check",
            description: "The system immediately checks staffing levels and existing requests. If levels are too low, it flags a warning.",
            icon: <ShieldCheck className="w-8 h-8" />
          },
          {
            title: "One-Click Approval",
            description: "Managers review the clear conflict data and approve or deny with a single tap. No paperwork required.",
            icon: <CheckCircle2 className="w-8 h-8" />
          },
          {
            title: "Roster Logic Sync",
            description: "Once approved, the roster is automatically locked for those dates, and staff receive a push notification.",
            icon: <Calendar className="w-8 h-8" />
          }
        ]}
      />

      {/* 4.6 New Metrics Showcase */}
      <MetricShowcase 
        title="Leave by the numbers."
        metrics={[
          {
            label: "Time Saved",
            value: "85%",
            sub: "Reduction in manual holiday paperwork and spreadsheets.",
            icon: <Zap className="w-6 h-6" />
          },
          {
            label: "Conflict Free",
            value: "100%",
            sub: "Accuracy in preventing under-staffing due to excessive time-off.",
            icon: <ShieldCheck className="w-6 h-6" />
          },
          {
            label: "Staff Happiness",
            value: "4.9/5",
            sub: "Average rating for the staff mobile leave experience.",
            icon: <Heart className="w-6 h-6" />
          },
          {
            label: "Processing Speed",
            value: "< 2min",
            sub: "Average time for a manager to review and approve a request.",
            icon: <Zap className="w-6 h-6" />
          }
        ]}
      />

      {/* 4.7 Ecosystem Graph */}
      <EcosystemGraph />

      {/* 4.8 Staff Pulse (Testimonials) */}
      <StaffPulse 
        title="Staff love the freedom."
        subtitle="Don't just take our word for it—see how employees feel about booked holidays."
        testimonials={[
          {
            name: "Sarah Jenkins",
            role: "Waitress @ The Hub",
            content: "I used to have to ask three different managers to book a Saturday off. Now I just tap my app and I know exactly when I'm free.",
            avatar: "https://i.pravatar.cc/150?u=sarah",
            rating: 5
          },
          {
            name: "Michael Chen",
            role: "Retail Associate",
            content: "The balance tracker is a lifesaver. I always know how many days I have left for my summer trip without asking HR.",
            avatar: "https://i.pravatar.cc/150?u=michael",
            rating: 5
          },
          {
            name: "Emma Watson",
            role: "Care Assistant",
            content: "Being able to see if my colleagues have booked leave helps me plan my own breaks better. It's so transparent.",
            avatar: "https://i.pravatar.cc/150?u=emma",
            rating: 5
          }
        ]}
      />

      {/* 5. High-Impact CTA */}
      <section className="py-24 bg-brand-dark relative overflow-hidden">
         <div className="absolute inset-0 bg-brand-primary/5 opacity-50" />
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[4rem] p-12 lg:p-20 flex flex-col items-center text-center">
               <div className="w-20 h-20 bg-brand-primary rounded-3xl flex items-center justify-center text-white mb-8 shadow-2xl shadow-brand-primary/40">
                  <CheckCircle2 className="w-10 h-10" />
               </div>
               <h2 className="text-4xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
                  Ready to simplify <br />
                  <span className="text-brand-primary">your workforce?</span>
               </h2>
               <p className="text-xl text-slate-400 font-medium max-w-2xl mb-12">
                  Take the headache out of time-off. Join 2,500+ managers who trust StaffSchedule.io for their operational clarity.
               </p>
               <div className="flex flex-col sm:flex-row gap-6">
                  <Link href="https://app.staffschedule.io/onboarding.php">
                     <button className="h-16 px-10 bg-brand-primary text-white rounded-2xl font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4">
                        Get Started Now
                        <ArrowRight className="w-6 h-6" />
                     </button>
                  </Link>
               </div>
            </div>
         </div>
      </section>

      {/* 6. AEO FAQs */}
      <AeoSection 
         title="Leave Management Simplified" 
         subtitle="Everything you need to know about the world's smartest holiday tracking system." 
         faqs={FAQS} 
      />

      <div className="bg-slate-50 dark:bg-slate-900/50 h-24 w-full" />
    </main>
  );
}
