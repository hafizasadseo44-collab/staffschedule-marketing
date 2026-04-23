import React from "react";
import { Metadata } from "next";
import FeatureHero from "@/components/features/FeatureHero";
import ChaosVsCalm from "@/components/features/ChaosVsCalm";
import AnnouncementsBento from "@/components/features/AnnouncementsBento";
import AnnouncementsSimulation from "@/components/features/AnnouncementsSimulation";
import AeoSection from "@/components/features/AeoSection";
import Image from "next/image";
import { ArrowRight, Bell, FileText, Globe, CheckCircle2, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";
import FeatureLifecycle from "@/components/features/FeatureLifecycle";
import MetricShowcase from "@/components/features/MetricShowcase";
import EcosystemGraph from "@/components/features/EcosystemGraph";
import StaffPulse from "@/components/features/StaffPulse";

export const metadata: Metadata = {
  title: "Staff Announcements & Digital Noticeboard | StaffSchedule.io",
  description: "Ditch the group texts. Communicate officially with your workforce using digital announcements, read-receipts, and mandatory acknowledgment signatures. Ensure compliance across all locations.",
  keywords: ["staff announcements app", "digital noticeboard for work", "employee internal communications", "workplace news portal", "compliance communication software", "SaaS team hub"],
  openGraph: {
    title: "Official Staff Announcements | StaffSchedule.io",
    description: "Digital accountability for every team update. See who read what, instantly.",
    url: "https://staffschedule.io/features/announcements",
    images: [{ url: "/images/announcements-hero-v1.png", width: 1200, height: 630, alt: "StaffSchedule.io Announcements Dashboard" }],
    type: "website",
  },
};

const FAQS = [
  {
    question: "How do I know if someone has actually read an announcement?",
    answer: "Our system tracks 'Digital Engagement'. You get a real-time heatmap showing exactly who opened the announcement, when they opened it, and if they completed the mandatory signature."
  },
  {
    question: "Can I schedule announcements for later?",
    answer: "Yes. You can draft announcements and set them to publish at a specific time and date, perfect for pre-planned policy rollouts or holiday greetings."
  },
  {
    question: "Can staff reply to announcements?",
    answer: "Announcements are designed for 'Official News'. If you want two-way conversation, staff can use the integrated 'Team Chat' feature for specific discussions around a topic."
  },
  {
    question: "Can I send media like PDF or Images?",
    answer: "Absolutely. You can attach safety manuals (PDF), training videos, or company photos to any announcement to ensure your team has all the resources they need."
  }
];

export default function AnnouncementsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-brand-dark overflow-hidden">
      
      {/* 1. Hero with Generated Visual */}
      <FeatureHero
        badge="Official Team Pulse"
        title={
          <>
            Communication that <br />
            <span className="text-brand-primary text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-indigo-500">
               actually reaches them.
            </span>
          </>
        }
        description="Stop shouting into the void. Master your corporate communication with a digital noticeboard that provides total visibility, read-receipts, and audit-ready signatures."
        ctaText="Start Scaling for Free"
        visual={
          <div className="relative group perspective-1000">
             <div className="absolute -inset-4 bg-brand-primary/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="relative bg-white dark:bg-slate-900 rounded-[4rem] border border-border shadow-2xl overflow-hidden transform group-hover:rotate-1 group-hover:scale-[1.02] transition-all duration-500">
                <Image 
                   src="/images/announcements-hero-v1.png" 
                   alt="Announcements Management UI" 
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
      <AnnouncementsBento />

      {/* 4. Interactive Simulation */}
      <AnnouncementsSimulation />

      {/* 4.5 Announcements Lifecycle */}
      <FeatureLifecycle 
         title="Broadcast with confidence."
         subtitle="How your message travels from HQ to every handheld."
         steps={[
            {
               title: "Dynamic Content Creation",
               description: "Draft your announcement. Attach videos, PDFs, or high-res images to ensure the message is clear and engaging.",
               icon: <FileText className="w-8 h-8" />
            },
            {
               title: "Segmented Targeting",
               description: "Choose to blast the whole company, or target specific locations, roles, or seniority levels for relevant news only.",
               icon: <Globe className="w-8 h-8" />
            },
            {
               title: "Real-time Blast",
               description: "Staff receive an instant push notification on their phones, overriding the noise of messy group chats.",
               icon: <Bell className="w-8 h-8" />
            },
            {
               title: "Compliance Sign-off",
               description: "Track read-receipts and digital signatures in your dashboard. See exactly who hasn't opened the update yet.",
               icon: <CheckCircle2 className="w-8 h-8" />
            }
         ]}
      />

      {/* 4.6 Communication Metrics */}
      <MetricShowcase 
         title="Visibility at scale."
         metrics={[
            {
               label: "Reach Rate",
               value: "100%",
               sub: "Reliability of message delivery to every active employee via the native mobile app.",
               icon: <Zap className="w-6 h-6" />
            },
            {
               label: "Open Rate",
               value: "82%",
               sub: "Average percentage of staff who open and read announcements within the first 4 hours.",
               icon: <Bell className="w-6 h-6" />
            },
            {
               label: "Policy Adoption",
               value: "+40%",
               sub: "Increase in compliance agreement signatures compared to paper noticeboards.",
               icon: <ShieldCheck className="w-6 h-6" />
            },
            {
               label: "Manager Peace",
               value: "0",
               sub: "Number of 'I didn't see the message' excuses from staff after digitizing comms.",
               icon: <CheckCircle2 className="w-6 h-6" />
            }
         ]}
      />

      {/* 4.7 Ecosystem Graph */}
      <EcosystemGraph />

      {/* 4.8 Staff Pulse */}
      <StaffPulse 
         title="In the loop, always."
         subtitle="See why staff prefer official channels over chaotic social media groups."
         testimonials={[
            {
               name: "Tiffany Brooks",
               role: "Store Associate",
               content: "I used to hate group texts because my phone wouldn't stop buzzing on my day off. Now I just check the announcements when I'm at work.",
               avatar: "https://i.pravatar.cc/150?u=tiffany",
               rating: 5
            },
            {
               name: "Ben Harrison",
               role: "Operations Director",
               content: "Managing 15 locations meant news got lost in translation. With Announcements, I can blast a policy change and see who's signed it within minutes.",
               avatar: "https://i.pravatar.cc/150?u=ben",
               rating: 5
            },
            {
               name: "Rochelle Vance",
               role: "Safety Officer",
               content: "The ability to attach the safety manual PDF and see that everyone has acknowledged it is a huge weight off my shoulders during audits.",
               avatar: "https://i.pravatar.cc/150?u=rochelle",
               rating: 5
            }
         ]}
      />

      {/* 5. High-Impact CTA Strip */}
      <section className="py-24 bg-brand-dark overflow-hidden relative border-y border-white/5">
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg width="100%" height="100%">
               <pattern id="ann-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
               </pattern>
               <rect width="100%" height="100%" fill="url(#ann-grid)" />
            </svg>
         </div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
               <div>
                  <h2 className="text-4xl lg:text-6xl font-black text-white mb-4">
                     Total Reach. <span className="text-brand-primary">Total Trust.</span>
                  </h2>
                  <p className="text-xl text-slate-400 font-medium max-w-2xl">
                     Join thousands of operations that choosing digital noticeboards over messy group chats.
                  </p>
               </div>
               <Link href="https://app.staffschedule.io/signup.php">
                  <button className="h-16 px-10 bg-brand-primary text-white rounded-2xl font-black text-xl shadow-2xl shadow-brand-primary/40 hover:scale-105 transition-all flex items-center gap-3">
                     Get Started Now
                     <ArrowRight className="w-6 h-6" />
                  </button>
               </Link>
            </div>
         </div>
      </section>

      {/* 6. AEO FAQs */}
      <AeoSection 
         title="Communication Answers" 
         subtitle="Everything you need to know about professional staff announcements." 
         faqs={FAQS} 
      />

      <div className="bg-slate-50 dark:bg-slate-900/50 h-24 w-full" />
    </main>
  );
}
