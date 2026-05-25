import React from "react";
import { Metadata } from "next";
import FeatureHero from "@/components/features/FeatureHero";
import ChaosVsCalm from "@/components/features/ChaosVsCalm";
import ShiftSwapsBento from "@/components/features/ShiftSwapsBento";
import ShiftSwapsSimulation from "@/components/features/ShiftSwapsSimulation";
import AeoSection from "@/components/features/AeoSection";
import Image from "next/image";
import { ArrowRight, RefreshCw, MessageSquare, ShieldCheck, Zap, Heart, Clock } from "lucide-react";
import Link from "next/link";
import FeatureLifecycle from "@/components/features/FeatureLifecycle";
import MetricShowcase from "@/components/features/MetricShowcase";
import EcosystemGraph from "@/components/features/EcosystemGraph";
import StaffPulse from "@/components/features/StaffPulse";

export const metadata: Metadata = {
  title: "Employee Shift Swap Software | Roster Trades | StaffSchedule.io",
  description: "Stop the back-and-forth management of shift trades. StaffSchedule.io allows your employees to negotiate and swap shifts directly from their phones, with automated labor rule verification.",
  keywords: ["shift swap software", "employee roster trades", "workforce coverage app", "peer to peer shift swapping", "staff trade management", "SaaS scheduling portal"],
  alternates: { canonical: "https://staffschedule.io/features/shift-swaps" },
  openGraph: {
    title: "Shift Swap Software | StaffSchedule.io",
    description: "Delegated authority for shift trades. Managers save time, staff get flexibility.",
    url: "https://staffschedule.io/features/shift-swaps",
    images: [{ url: "https://staffschedule.io/staffschedule-dashboard.png", width: 1200, height: 630, alt: "StaffSchedule.io Shift Swap Management" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shift Swap Software | StaffSchedule.io",
    description: "Let staff swap shifts from their phones — with manager approval.",
    images: ["https://staffschedule.io/staffschedule-dashboard.png"],
  },
};

const FAQS = [
  {
    question: "Do managers have to approve every swap?",
    answer: "Yes. While staff handle the negotiation, the manager always has the final 'Approve' or 'Decline' button to ensure the roster remains balanced and compliant."
  },
  {
    question: "How does skill-matching work in swaps?",
    answer: "The system identifies the skills required for the original shift. It only allows the staff member to offer the swap to colleagues who possess those exact skills or are cleared for that department."
  },
  {
    question: "What happens if a swap creates overtime?",
    answer: "Our engine checks the weekly hours for both employees before the manager even sees the request. If a swap would cause overtime, it's either blocked or highlighted with a clear warning."
  },
  {
    question: "Is there a deadline for swaps?",
    answer: "Managers can configure rules, such as preventing swaps from being initiated less than 24 hours before a shift starts, ensuring stability in your planning."
  }
];

export default function ShiftSwapsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-brand-dark overflow-hidden">
      
      {/* 1. Hero with Generated Visual */}
      <FeatureHero
        badge="Manager-Free Coordination"
        title={
          <>
            Trading shifts <br />
            <span className="text-brand-secondary text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary">
               just got smarter.
            </span>
          </>
        }
        description="Empower your team to manage their own coverage gaps. Our P2P swap engine handles the negotiations, while you maintain absolute control over the final roster."
        ctaText="See Swap Tools in Action"
        visual={
          <div className="relative group perspective-1000">
             <div className="absolute -inset-4 bg-brand-secondary/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="relative bg-white dark:bg-slate-900 rounded-[3rem] border border-border shadow-2xl overflow-hidden transform group-hover:rotate-1 group-hover:scale-[1.02] transition-all duration-500">
                <Image 
                   src="/images/shift-swaps-hero-v1.png" 
                   alt="Shift Swap Management UI" 
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
      <ShiftSwapsBento />

      {/* 4. Interactive Simulation */}
      <ShiftSwapsSimulation />

      {/* 4.5 Swap Lifecycle */}
      <FeatureLifecycle 
         title="The art of the trade."
         subtitle="How staff-led negotiations keep your roster running."
         steps={[
            {
               title: "The Initial Offer",
               description: "An employee realizes they can't work a shift. They post a 'Swap Request' to the pool of qualified colleagues.",
               icon: <MessageSquare className="w-8 h-8" />
            },
            {
               title: "Skill & Rule Audit",
               description: "The system instantly verifies that the recipient has the right skills and isn't exceeding weekly hour limits.",
               icon: <ShieldCheck className="w-8 h-8" />
            },
            {
               title: "Mutual Acceptance",
               description: "A colleague accepts the trade. Both staff members confirm they are happy with the dynamic shift change.",
               icon: <RefreshCw className="w-8 h-8" />
            },
            {
               title: "Manager Approval",
               description: "The manager receives a final confirmation request. One tap approves the change and updates the roster globally.",
               icon: <Zap className="w-8 h-8" />
            }
         ]}
      />

      {/* 4.6 Swap Metrics */}
      <MetricShowcase 
         title="Flexibility verified."
         metrics={[
            {
               label: "Success Rate",
               value: "96%",
               sub: "Percentage of initiated swap requests that result in a successful shift trade.",
               icon: <Zap className="w-6 h-6" />
            },
            {
               label: "Response Time",
               value: "45m",
               sub: "Average time for a colleague to accept a swap request after it's posted.",
               icon: <Clock className="w-6 h-6" />
            },
            {
               label: "Manager Freedom",
               value: "+8h",
               sub: "Hours saved per manager per month by delegating swap coordination.",
               icon: <RefreshCw className="w-6 h-6" />
            },
            {
               label: "Staff Morale",
               value: "94%",
               sub: "Increase in staff sentiment regarding scheduling flexibility and autonomy.",
               icon: <Heart className="w-6 h-6" />
            }
         ]}
      />

      {/* 4.7 Ecosystem Graph */}
      <EcosystemGraph />

      {/* 4.8 Staff Pulse */}
      <StaffPulse 
         title="Life happens. We've got it."
         subtitle="Hear from staff who value the ability to manage their own time off-riddle."
         testimonials={[
            {
               name: "Alex Rivera",
               role: "Retail Sales Lead",
               content: "When my car broke down on a Friday, I thought I was in trouble. I posted a swap in the app and had it covered by a teammate within 20 minutes.",
               avatar: "https://i.pravatar.cc/150?u=alex",
               rating: 5
            },
            {
               name: "Jordan Smith",
               role: "Part-time Student",
               content: "I love that I can pick up shifts from people who want to swap. It's an easy way for me to get extra hours without waiting for the manager to call.",
               avatar: "https://i.pravatar.cc/150?u=jordan",
               rating: 5
            },
            {
               name: "Sarah Kim",
               role: "Operations Manager",
               content: "Since we started using P2P swaps, I've had zero phone calls on my day off about people needing coverage. The team just handles it.",
               avatar: "https://i.pravatar.cc/150?u=sarahk",
               rating: 5
            }
         ]}
      />

      {/* 5. High-Impact CTA */}
      <section className="py-24 bg-brand-secondary overflow-hidden relative">
         <div className="absolute inset-0 bg-brand-dark opacity-10" />
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
             <h2 className="text-4xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
                A roster that <br />
                <span className="text-brand-dark">manages itself.</span>
             </h2>
             <p className="text-xl text-indigo-50 font-medium max-w-2xl mx-auto mb-12">
                Join 2,500+ managers who delegated the headache of shift swaps to StaffSchedule.io.
             </p>
             <Link href="https://app.staffschedule.io/onboarding.php">
                <button className="h-16 px-10 bg-white text-brand-secondary rounded-2xl font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto">
                   Get Started Now
                   <ArrowRight className="w-6 h-6" />
                </button>
             </Link>
         </div>
      </section>

      {/* 6. AEO FAQs */}
      <AeoSection 
         title="Swapping FAQ" 
         subtitle="Everything you need to know about our peer-to-peer coverage engine." 
         faqs={FAQS} 
      />

      <div className="bg-slate-50 dark:bg-slate-900/50 h-24 w-full" />
    </main>
  );
}
