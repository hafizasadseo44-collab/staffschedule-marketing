import React from "react";
import { Metadata } from "next";
import FeatureHero from "@/components/features/FeatureHero";
import ChaosVsCalm from "@/components/features/ChaosVsCalm";
import ComplianceBento from "@/components/features/ComplianceBento";
import ComplianceSimulation from "@/components/features/ComplianceSimulation";
import AeoSection from "@/components/features/AeoSection";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Scale, Zap, Heart, Database, AlertCircle } from "lucide-react";
import Link from "next/link";
import ComplianceHeroVisual from "@/components/features/ComplianceHeroVisual";
import FeatureLifecycle from "@/components/features/FeatureLifecycle";
import MetricShowcase from "@/components/features/MetricShowcase";
import EcosystemGraph from "@/components/features/EcosystemGraph";
import StaffPulse from "@/components/features/StaffPulse";

export const metadata: Metadata = {
  title: "Labor Law Compliance Software | Risk Management | StaffSchedule.io",
  description: "Protect your business with automated labor law compliance. StaffSchedule.io proactively monitors rest periods, shift limits, and employment rules to ensure your roster is always legal.",
  keywords: ["labor compliance software", "staff rest period tracker", "employment law auditing", "workforce risk management", "SaaS compliance portal"],
  openGraph: {
    title: "Proactive Labor Compliance | StaffSchedule.io",
    description: "Zero-risk scheduling with automated law auditing baked into every shift.",
    url: "https://staffschedule.io/features/compliance",
    images: [{ url: "/images/attendance-manager-v1.jpg", width: 1200, height: 630, alt: "StaffSchedule.io Compliance Audit" }],
    type: "website",
  },
};

const FAQS = [
  {
    question: "How does the system know local labor laws?",
    answer: "During setup, you can select from pre-configured rule-sets (like UK Working Time Regulations or US FLSA) or build your own custom constraints based on your specific union or regional requirements."
  },
  {
    question: "Can shift managers override compliance warnings?",
    answer: "You can configure this! You can allow 'Executive Overrides' which require a text reason for the audit log, or set 'Hard Blocks' that prevent any user from publishing a non-compliant schedule."
  },
  {
    question: "Does the system track rest periods between shifts?",
    answer: "Yes. Our engine calculates the time between the end of one shift and the start of the next. If that gap is less than your required minimum (e.g., 11 hours), a violation alert is instantly generated."
  },
  {
    question: "Is the audit log legally admissible?",
    answer: "Our audit logs are permanent, time-stamped, and tamper-proof. They provide a clear record of your proactive attempts to maintain compliance, which is highly valuable during regulatory reviews."
  }
];

export default function CompliancePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-brand-dark overflow-hidden">
      
      {/* 1. Hero with Icon Visual */}
      <FeatureHero
        badge="Regulatory Excellence"
        title={
          <>
            Scheduling that <br />
            <span className="text-rose-600 text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-brand-primary">
               follows the law.
            </span>
          </>
        }
        description="Take the legal guesswork out of managing your workforce. Our automated audit engine monitor every shift, everyday, to ensure your business remains 100% compliant."
        ctaText="Protect Your Business"
        visual={<ComplianceHeroVisual />}
      />

      {/* 2. Problem/Solution */}
      <ChaosVsCalm />

      {/* 3. The Details (Bento) */}
      <ComplianceBento />

      {/* 4. Interactive Simulation */}
      <ComplianceSimulation />

      {/* 4.5 Compliance Lifecycle */}
      <FeatureLifecycle 
         title="Zero-risk execution."
         subtitle="How we maintain your legal safety net in the background."
         steps={[
            {
               title: "Regional Rule Setup",
               description: "Define your local labor laws, rest-period requirements, and age-specific working limits for every employee.",
               icon: <Database className="w-8 h-8" />
            },
            {
               title: "Real-time Auditing",
               description: "As shifts are built or swapped, the engine checks every assignment against your master rule-set instantly.",
               icon: <Zap className="w-8 h-8" />
            },
            {
               title: "Proactive Warning",
               description: "If a breach is detected, the system flags it immediately, preventing the roster from being published until resolved.",
               icon: <AlertCircle className="w-8 h-8" />
            },
            {
               title: "Timestamped Vault",
               description: "Every decision is logged in a permanent, un-editable audit trail, protecting you from future legal disputes.",
               icon: <ShieldCheck className="w-8 h-8" />
            }
         ]}
      />

      {/* 4.6 Compliance Metrics */}
      <MetricShowcase 
         title="Accountability by default."
         metrics={[
            {
               label: "Audit Pass Rate",
               value: "100%",
               sub: "Reliability of the roster meeting all pre-defined labor constraints before publishing.",
               icon: <ShieldCheck className="w-6 h-6" />
            },
            {
               label: "Fine Exposure",
               value: "-100%",
               sub: "Reduction in regulatory fines due to automated rest-period and shift-limit monitoring.",
               icon: <Scale className="w-6 h-6" />
            },
            {
               label: "Legal Protection",
               value: "High",
               sub: "Admissibility of the tamper-proof digital audit log in regulatory reviews.",
               icon: <Database className="w-6 h-6" />
            },
            {
               label: "Staff Fairness",
               value: "Top",
               sub: "Score for ensuring all employees receive their mandatory weekly rest days.",
               icon: <Heart className="w-6 h-6" />
            }
         ]}
      />

      {/* 4.7 Ecosystem Graph */}
      <EcosystemGraph />

      {/* 4.8 Staff Pulse */}
      <StaffPulse 
         title="Safety for the team."
         subtitle="Compliance isn't just a corporate shield—it's a promise of fair treatment for staff."
         testimonials={[
            {
               name: "Arthur Dent",
               role: "Site Manager",
               content: "I never have to worry about accidentally scheduling a minor for too many hours. The system just doesn't let it happen.",
               avatar: "https://i.pravatar.cc/150?u=arthur",
               rating: 5
            },
            {
               name: "Fiona Gallagher",
               role: "Retail Worker",
               content: "I know that my rest days are protected. My boss can't pressure me into a shift that the system says is illegal for me to work.",
               avatar: "https://i.pravatar.cc/150?u=fiona",
               rating: 5
            },
            {
               name: "Kevin Mitnick",
               role: "Compliance Officer",
               content: "Having a centralized, digital audit trail for 50 locations has transformed our quarterly reviews. No more chasing paper rosters.",
               avatar: "https://i.pravatar.cc/150?u=kevin",
               rating: 5
            }
         ]}
      />

      {/* 5. Enterprise High-Trust CTA */}
      <section className="py-24 bg-brand-dark relative overflow-hidden">
         <div className="absolute inset-0 bg-rose-500/5" />
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-4xl lg:text-7xl font-black text-white mb-8 tracking-tighter">
               Zero Lawsuits. <br />
               <span className="text-rose-600">Total Peace.</span>
            </h2>
            <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-12">
               Don't wait for an inspection to find your errors. Invest in automated compliance and protect your operations history today.
            </p>
            <Link href="https://app.staffschedule.io/signup.php">
               <button className="h-20 px-12 bg-rose-600 text-white rounded-[2rem] font-black text-2xl shadow-2xl shadow-rose-600/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-4 mx-auto">
                  Audit My Roster Free
                  <ArrowRight className="w-8 h-8" />
               </button>
            </Link>
         </div>
      </section>

      {/* 6. AEO FAQs */}
      <AeoSection 
         title="Compliance Answered" 
         subtitle="Everything you need to know about our legal auditing framework." 
         faqs={FAQS} 
      />

      <div className="bg-slate-50 dark:bg-slate-900/50 h-24 w-full" />
    </main>
  );
}

function Check(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
