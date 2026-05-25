import React from "react";
import { Metadata } from "next";
import FeatureHero from "@/components/features/FeatureHero";
import ChaosVsCalm from "@/components/features/ChaosVsCalm";
import AvailabilityBento from "@/components/features/AvailabilityBento";
import AvailabilitySimulation from "@/components/features/AvailabilitySimulation";
import AeoSection from "@/components/features/AeoSection";
import Image from "next/image";
import { ArrowRight, Star, Clock, UserCheck, Zap, Heart, Database } from "lucide-react";
import Link from "next/link";
import FeatureLifecycle from "@/components/features/FeatureLifecycle";
import MetricShowcase from "@/components/features/MetricShowcase";
import EcosystemGraph from "@/components/features/EcosystemGraph";
import StaffPulse from "@/components/features/StaffPulse";

export const metadata: Metadata = {
  title: "Staff Availability Software | Employee Planning | StaffSchedule.io",
  description: "Reduce no-shows and scheduling conflicts. StaffSchedule.io allows your employees to set their own availability from their phones, giving you the perfect layout for every shift.",
  keywords: ["staff availability software", "employee scheduling preferences", "workforce availability app", "shift planning tools", "availability tracking system"],
  alternates: { canonical: "https://staffschedule.io/features/availability" },
  openGraph: {
    title: "Staff Availability Management | StaffSchedule.io",
    description: "Empower your team and simplify your scheduling with staff-led availability.",
    url: "https://staffschedule.io/features/availability",
    images: [{ url: "https://staffschedule.io/staffschedule-dashboard.png", width: 1200, height: 630, alt: "Staff Availability Software — StaffSchedule.io" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Staff Availability Software | StaffSchedule.io",
    description: "Reduce no-shows. Let staff set their own availability from their phones.",
    images: ["https://staffschedule.io/staffschedule-dashboard.png"],
  },
};

const FAQS = [
  {
    question: "Can staff change their availability last minute?",
    answer: "Managers can set 'Lockout' periods. For example, you can prevent staff from changing their availability after the schedule has been published or within 48 hours of a shift."
  },
  {
    question: "How does recurring availability work?",
    answer: "Staff can set a 'Standard Week' (e.g., they are never available Tuesday mornings). These settings will apply to every schedule automatically unless they specifically request a one-off change."
  },
  {
    question: "Can I require availability for fixed shifts?",
    answer: "Yes. You can override availability settings for fixed-contract employees ensure they are always scheduled for their required hours regardless of personal preference."
  },
  {
    question: "Does this work with Team Chat?",
    answer: "Yes! If a staff member marks themselves as unavailable, you can instantly message them through the integrated Chat to discuss shift coverage if necessary."
  }
];

export default function AvailabilityPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-brand-dark overflow-hidden">
      
      {/* 1. Hero with Generated Visual */}
      <FeatureHero
        badge="Proactive Shift Planning"
        title={
          <>
            Scheduling that <br />
            <span className="text-emerald-500 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-400">
               respects their time.
            </span>
          </>
        }
        description="Stop guessing who can work. Put your staff in the driver's seat and build schedules around their life. Higher staff happiness leads to zero no-shows and better retention."
        ctaText="Explore Availability Tools"
        visual={
          <div className="relative group perspective-1000">
             <div className="absolute -inset-4 bg-emerald-500/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="relative bg-white dark:bg-slate-900 rounded-[3rem] border border-border shadow-2xl overflow-hidden transform group-hover:rotate-1 group-hover:scale-[1.02] transition-all duration-500">
                <Image 
                   src="/images/availability-hero-v1.png" 
                   alt="Availability Management UI" 
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
      <AvailabilityBento />

      {/* 4. Interactive Simulation */}
      <AvailabilitySimulation />

      {/* 4.5 Lifecycle Walkthrough */}
      <FeatureLifecycle 
        title="The road to a perfect roster."
        subtitle="How staff preferences turn into operational success."
        steps={[
          {
            title: "Preferred Hours Entry",
            description: "Staff use the mobile time-grid to paint their available and busy windows for the coming weeks.",
            icon: <Clock className="w-8 h-8" />
          },
          {
            title: "Live Availability Map",
            description: "Managers see a heatmap of who can work which shifts, identifying potential gaps before they even start building.",
            icon: <Database className="w-8 h-8" />
          },
          {
            title: "Conflict-Free Assigning",
            description: "As you drag-and-drop shifts, the system only suggests staff who have marked themselves as available for that slot.",
            icon: <UserCheck className="w-8 h-8" />
          },
          {
            title: "Published Stability",
            description: "Once published, staff receive their roster. Because it matches their availability, no-shows drop by over 90%.",
            icon: <Zap className="w-8 h-8" />
          }
        ]}
      />

      {/* 4.6 Impact Metrics */}
      <MetricShowcase 
        title="Predictable productivity."
        metrics={[
          {
            label: "No-Show Rate",
            value: "-92%",
            sub: "Reduction in employee absences by scheduling around their life.",
            icon: <Zap className="w-6 h-6" />
          },
          {
            label: "Manager Time",
            value: "12h",
            sub: "Average time saved per month by not chasing staff for availability.",
            icon: <Clock className="w-6 h-6" />
          },
          {
            label: "Plan Fidelity",
            value: "99%",
            sub: "Accuracy in matching staff skills to available shifts.",
            icon: <UserCheck className="w-6 h-6" />
          },
          {
            label: "Retention",
            value: "+40%",
            sub: "Increase in employee satisfaction scores regarding work-life balance.",
            icon: <Heart className="w-6 h-6" />
          }
        ]}
      />

      {/* 4.7 Ecosystem Graph */}
      <EcosystemGraph />

      {/* 4.8 Staff Pulse */}
      <StaffPulse 
        title="Built for the team."
        subtitle="See why employees prefer a workplace that respects their schedule."
        testimonials={[
          {
            name: "David Miller",
            role: "Marketing Student / Part-time Server",
            content: "As a student, my hours change every semester. Being able to update my availability in the app means I never get scheduled during lectures.",
            avatar: "https://i.pravatar.cc/150?u=david",
            rating: 5
          },
          {
            name: "Lisa Thompson",
            role: "Parent / Retail Manager",
            content: "I need to coordinate childcare around my shifts. StaffSchedule lets me set my preferences months in advance so I can plan my family life.",
            avatar: "https://i.pravatar.cc/150?u=lisa",
            rating: 5
          },
          {
            name: "James Wilson",
            role: "Shift Lead",
            content: "I love that I don't have to constanty text my team to find out if they can cover a busy Friday. I can see it all in the grid.",
            avatar: "https://i.pravatar.cc/150?u=james",
            rating: 5
          }
        ]}
      />

      {/* 5. Trust Section Overlay */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
               <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />)}
               </div>
               <h2 className="text-3xl lg:text-5xl font-black text-brand-dark dark:text-white mb-8 tracking-tighter">
                  "No more texting 20 people to find a replacement."
               </h2>
               <p className="text-lg text-slate-500 font-medium max-w-2xl mb-12">
                  StaffSchedule.io availability tools helped us reduce scheduling errors by 90% and improved our staff satisfaction score overnight.
               </p>
               <div className="flex flex-col sm:flex-row gap-6">
                  <Link href="https://app.staffschedule.io/onboarding.php">
                     <button className="h-16 px-10 bg-brand-primary text-white rounded-2xl font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4">
                        Join the Revolution
                        <ArrowRight className="w-6 h-6" />
                     </button>
                  </Link>
               </div>
            </div>
         </div>
      </section>

      {/* 6. AEO FAQs */}
      <AeoSection 
         title="Availability Answered" 
         subtitle="Everything you need to know about the power of staff-led planning." 
         faqs={FAQS} 
      />

      <div className="bg-slate-50 dark:bg-slate-900/50 h-24 w-full" />
    </main>
  );
}
