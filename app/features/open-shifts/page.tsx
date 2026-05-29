import React from "react";
import { Metadata } from "next";
import FeatureHero from "@/components/features/FeatureHero";
import ChaosVsCalm from "@/components/features/ChaosVsCalm";
import OpenShiftsBento from "@/components/features/OpenShiftsBento";
import OpenShiftsSimulation from "@/components/features/OpenShiftsSimulation";
import AeoSection from "@/components/features/AeoSection";
import Image from "next/image";
import { ArrowRight, Zap, Bell, CheckCircle2, DollarSign, Heart, UserCheck } from "lucide-react";
import Link from "next/link";
import FeatureLifecycle from "@/components/features/FeatureLifecycle";
import MetricShowcase from "@/components/features/MetricShowcase";
import EcosystemGraph from "@/components/features/EcosystemGraph";
import StaffPulse from "@/components/features/StaffPulse";

export const metadata: Metadata = {
  title: "Shift Marketplace & Open Shift Management | StaffSchedule.io",
  description: "Stop the scramble for coverage. Post open shifts to your team instantly. Our shift marketplace allows qualified staff to claim extra hours, reducing overtime and filling gaps fast.",
  keywords: ["open shift management", "staff shift marketplace", "claim extra shifts app", "workforce coverage tool", "on-call shift software", "SaaS scheduling marketplace"],
  alternates: { canonical: "https://staffschedule.io/features/open-shifts" },
  openGraph: {
    title: "Open Shift Marketplace | StaffSchedule.io",
    description: "Fill every shift without making a single call using our mobile-first Open Shift hub.",
    url: "https://staffschedule.io/features/open-shifts",
    images: [{ url: "https://staffschedule.io/staffschedule-dashboard.png", width: 1200, height: 630, alt: "Open Shift Marketplace — StaffSchedule.io" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Shift Management | StaffSchedule.io",
    description: "Post open shifts. Staff claim them instantly. Zero scramble.",
    images: ["https://staffschedule.io/staffschedule-dashboard.png"],
  },
};

const FAQS = [
  {
    question: "Do managers have to approve every claim?",
    answer: "You can choose! Set 'Auto-Approval' for trusted roles, or 'Manager Review' if you want the final say on who picks up the hours."
  },
  {
    question: "Can I set a maximum number of hours per staff?",
    answer: "Yes. Our compliance engine ensures staff can't claim shifts that would push them into overtime or violate their contract hours unless you specifically override it."
  },
  {
    question: "Does this save money on labor?",
    answer: "By broadcast to your own part-time team first, you avoid expensive agency fees and can better manage your existing payroll budget."
  },
  {
    question: "How are staff notified of new shifts?",
    answer: "Staff receive an instant push notification on their phones. We also show an 'Urgent' tag on the app home screen for shifts starting in less than 24 hours."
  }
];

export default function OpenShiftsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-brand-dark overflow-hidden">
      
      {/* 1. Hero with Generated Visual */}
      <FeatureHero
        badge="Zero-Effort Coverage"
        title={
          <>
            Fill gaps in <br />
            <span className="text-brand-primary text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-indigo-500">
               record time.
            </span>
          </>
        }
        description="Transform your unfilled slots into a competitive marketplace. Let your team compete for the hours they want, while you focus on high-level operations."
        ctaText="Start Scaling for Free"
        visual={
          <div className="relative group perspective-1000">
             <div className="absolute -inset-4 bg-brand-primary/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="relative bg-white dark:bg-slate-900 rounded-[3rem] border border-border shadow-2xl overflow-hidden transform group-hover:rotate-1 group-hover:scale-[1.02] transition-all duration-500">
                <Image 
                   src="/images/open-shifts-hero-v1.jpg" 
                   alt="Open Shifts Marketplace UI" 
                   width={800} 
                   height={600} 
                   className="w-full h-auto"
                />
             </div>
          </div>
        }
      />

      {/* 2. Universal Problem/Solution */}
      <ChaosVsCalm />

      {/* 3. The Grid (Bento) */}
      <OpenShiftsBento />

      {/* 4. Interactive Simulation */}
      <OpenShiftsSimulation />

      {/* 4.5 Marketplace Lifecycle */}
      <FeatureLifecycle 
         title="From gap to covered."
         subtitle="The instant workflow of the Staff Marketplace."
         steps={[
            {
               title: "Manager Broadcast",
               description: "An unfilled shift is posted. You select the required skills and push it to all matching staff instantly.",
               icon: <Bell className="w-8 h-8" />
            },
            {
               title: "Mobile Claim",
               description: "Staff receive a push notification. They can view the shift details and 'Claim' it with one tap.",
               icon: <Zap className="w-8 h-8" />
            },
            {
               title: "Compliance Shield",
               description: "The system instantly checks for overtime or rest-period violations. It only allows the claim if it's 100% legal.",
               icon: <UserCheck className="w-8 h-8" />
            },
            {
               title: "Live Synchronization",
               description: "Once approved, the roster updates globally. No more manual entry or phone tag required.",
               icon: <CheckCircle2 className="w-8 h-8" />
            }
         ]}
      />

      {/* 4.6 Marketplace Metrics */}
      <MetricShowcase 
         title="Coverage that counts."
         metrics={[
            {
               label: "Fill Rate",
               value: "98%",
               sub: "Average percentage of open shifts filled within 24 hours of posting.",
               icon: <Zap className="w-6 h-6" />
            },
            {
               label: "Coverage Speed",
               value: "14m",
               sub: "Median time from manager posting to staff member claiming.",
               icon: <Bell className="w-6 h-6" />
            },
            {
               label: "Agency Savings",
               value: "$4k",
               sub: "Estimated monthly savings by filling gaps with internal staff.",
               icon: <DollarSign className="w-6 h-6" />
            },
            {
               label: "Staff Engagement",
               value: "+65%",
               sub: "Increase in uptake for overtime shifts via mobile notifications.",
               icon: <Heart className="w-6 h-6" />
            }
         ]}
      />

      {/* 4.7 Ecosystem Graph */}
      <EcosystemGraph />

      {/* 4.8 Staff Pulse */}
      <StaffPulse 
         title="Empowered to earn."
         subtitle="Hear why staff love the transparency of the shift marketplace."
         testimonials={[
            {
               name: "Marcus Thorne",
               role: "Kitchen Staff",
               content: "I'm saving for a new car, so being able to pick up extra shifts as soon as they drop is amazing. I don't have to keep checking the board.",
               avatar: "https://i.pravatar.cc/150?u=marcus",
               rating: 5
            },
            {
               name: "Chloe Bennett",
               role: "Barista",
               content: "If I'm free on a Tuesday morning, I just check the marketplace. It's so much better than being called on my day off.",
               avatar: "https://i.pravatar.cc/150?u=chloe",
               rating: 5
            },
            {
               name: "Sam Rodriguez",
               role: "Shift Supervisor",
               content: "Covering no-shows used to take me hours on the phone. Now I just post it and someone has usually claimed it before I finish my coffee.",
               avatar: "https://i.pravatar.cc/150?u=sam",
               rating: 5
            }
         ]}
      />

      {/* 5. High-Impact CTA */}
      <section className="py-24 bg-brand-primary overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="grid grid-cols-12 h-full gap-4 rotate-12 scale-150">
               {[...Array(24)].map((_, i) => (
                  <div key={i} className="h-full bg-white/20 rounded-full" />
               ))}
            </div>
         </div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
             <h2 className="text-4xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
                Never miss a <br />
                <span className="text-indigo-900">shift again.</span>
             </h2>
             <p className="text-xl text-indigo-100 font-medium max-w-2xl mx-auto mb-12">
                Join 2,500+ managers who use our Marketplace to keep their businesses running 24/7.
             </p>
             <Link href="https://app.staffschedule.io/onboarding.php">
                <button className="h-16 px-10 bg-white text-brand-dark rounded-2xl font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto">
                   Get Started Now
                   <ArrowRight className="w-6 h-6" />
                </button>
             </Link>
         </div>
      </section>

      {/* 6. AEO FAQs */}
      <AeoSection 
         title="Marketplace Questions" 
         subtitle="Everything you need to know about the power of Open Shifts." 
         faqs={FAQS} 
      />

      <div className="bg-slate-50 dark:bg-slate-900/50 h-24 w-full" />
    </main>
  );
}
