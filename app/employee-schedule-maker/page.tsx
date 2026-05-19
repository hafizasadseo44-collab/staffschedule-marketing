"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, 
  Calendar, 
  Repeat, 
  Clock, 
  Smartphone, 
  Users, 
  ShieldCheck, 
  Plus,
  Play
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LinkPreview } from "@/components/ui/link-preview";
import PricingTable from "@/components/PricingTable";

// --- Data Definitions based on content.md ---

const FAQS = [
  {
    question: "What's the difference between a team scheduling app and a regular calendar?",
    answer: "A calendar shows dates. A team scheduling app manages people — their availability, shift preferences, and time-off requests. It also notifies your whole team when anything changes, catches conflicts before they happen, and lets employees swap shifts without calling you. A regular calendar does none of that."
  },
  {
    question: "Can a crew scheduling app work for teams across multiple locations?",
    answer: "Yes — that's exactly where it's most useful. A crew scheduling app lets you manage every job site from one dashboard. Assign shifts by location, filter by team, and make sure every site has the right coverage — without switching between different tools or spreadsheets."
  },
  {
    question: "Is team scheduling software only for large businesses?",
    answer: "Not at all. Small teams of 5–10 people often benefit the most. Every hour you save on scheduling is an hour back in your day. StaffSchedule.io works the same whether you have 8 employees or 800."
  },
  {
    question: "What kind of teams use workforce scheduling tools?",
    answer: "Any team that runs on shifts. Restaurants, retail stores, construction crews, HVAC technicians, landscaping teams, security guards, healthcare staff, sports teams, customer success teams, and appointment-based businesses — all use workforce scheduling tools to manage their people better."
  }
];

const INDUSTRIES = [
  {
    icon: <span className="text-4xl">🍽</span>,
    title: "Restaurants & Hospitality",
    desc: "Rotating shifts, weekend rushes, last-minute call-outs — hospitality scheduling is chaotic by nature. Manage front-of-house, back-of-house, and bar staff from one app."
  },
  {
    icon: <span className="text-4xl">🛍</span>,
    title: "Retail & Seasonal Teams",
    desc: "Peak season hits and suddenly you need 3x the staff. Add new employees in minutes, assign shifts instantly, and scale back down just as fast."
  },
  {
    icon: <span className="text-4xl">🔨</span>,
    title: "Construction & Field Crews",
    desc: "Your crew isn't sitting in an office. They're on job sites, in vans, across the city. Built for field-based workforce scheduling and multi-site coordination."
  },
  {
    icon: <span className="text-4xl">🏥</span>,
    title: "Healthcare & Security",
    desc: "Coverage gaps aren't just inconvenient — they're a real problem. Keep every shift covered, every role filled, and every manager informed with compliance-sensitive rotas."
  }
];

export default function EmployeeScheduleMakerPage() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#FAF9FF] text-slate-900 min-h-screen font-sans selection:bg-[#6C5CE7]/30 overflow-hidden">
      
      {/* =========================================================================
          SECTION 2: HERO
          ========================================================================= */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center pt-32 pb-20 px-4">
        {/* Background Mesh & Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(108,92,231,0.08)_0,transparent_50%)]" />
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[#6C5CE7]/5 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-[#8E7CFF]/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMDE1Ii8+Cjwvc3ZnPg==')] opacity-40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center w-full">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-[#6C5CE7] text-sm font-semibold tracking-wide shadow-sm"
          >
            <span className="text-amber-500">✦</span> Trusted by 20,000+ businesses
          </motion.div>

          {/* H1 Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6"
          >
            <span className="block text-slate-900">The Online Employee</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6C5CE7] via-[#8E7CFF] to-[#00CEC9] pb-2">
              Schedule Maker
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-slate-600 font-medium mb-4"
          >
            That saves you hours every week.
          </motion.p>

          {/* Body Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Build, share and manage your team schedules<br className="hidden md:block" />
            — without the Sunday night chaos.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-6 w-full sm:w-auto"
          >
            <LinkPreview url="https://app.staffschedule.io/onboarding.php?start_trial=1">
              <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF] text-white font-bold text-lg flex items-center justify-center gap-2 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(108,92,231,0.4)] transition-all">
                Start Free Today
                <ArrowRight className="w-5 h-5" />
              </button>
            </LinkPreview>
            
            <a href="#how-it-works" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-lg flex items-center justify-center gap-2 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm">
                <Play className="w-5 h-5 fill-current" />
                See How It Works
              </button>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-[13px] text-slate-500 font-medium"
          >
            No credit card · Setup in 10 minutes · Cancel anytime
          </motion.p>
        </div>

        {/* Hero Visual Mockup — always visible */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7, type: "spring", damping: 20 }}
          className="w-full max-w-6xl mx-auto mt-16 relative z-20 px-4 md:px-0"
        >
          <div className="relative rounded-2xl md:rounded-[2rem] border border-slate-200 bg-white/50 p-2 md:p-3 backdrop-blur-md shadow-[0_40px_120px_rgba(108,92,231,0.15)] hover:shadow-[0_50px_140px_rgba(108,92,231,0.25)] transition-shadow duration-700">
            <div className="rounded-xl md:rounded-[1.5rem] overflow-hidden bg-white border border-slate-100">
              <Image 
                src="/staffschedule-dashboard.png" 
                alt="StaffSchedule.io Dashboard — Weekly Shift Calendar" 
                width={1200}
                height={750}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Logo Strip */}
        <div className="w-full mt-24 overflow-hidden opacity-60">
           <p className="text-center text-sm font-semibold tracking-widest text-slate-400 uppercase mb-8">Trusted by teams at</p>
           <div className="flex gap-16 animate-marquee whitespace-nowrap items-center justify-center min-w-full">
              {/* Logos */}
              {['Vercel', 'OpenAI', 'Linear', 'Raycast', 'Notion', 'Supabase', 'Vercel', 'OpenAI'].map((name, i) => (
                 <span key={i} className="text-2xl font-black tracking-tighter text-slate-400">{name}</span>
              ))}
           </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: PROBLEM HOOK
          ========================================================================= */}
      <section className="py-24 bg-white relative border-y border-slate-100" id="how-it-works">
         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="flex flex-col gap-6">
               <h2 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900">
                  Still Managing Shifts on <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Spreadsheets?</span>
               </h2>
               <p className="text-slate-600 text-lg leading-relaxed">
                  You post the schedule. Someone misses it. Another person can't do Tuesday. 
                  By Monday morning, you're already fixing what should have been sorted days ago.
               </p>
               <p className="text-slate-600 text-lg leading-relaxed">
                  WhatsApp and spreadsheets weren't built for shift management. 
                  A proper team scheduling software keeps your whole team on the same page — 
                  shifts, swaps, and changes — all in one place, instantly.
               </p>
               <div className="flex flex-col gap-3 mt-4">
                  <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 w-fit">
                     <span className="text-red-500">❌</span> 
                     <span className="font-medium text-slate-700">3 hours wasted every Sunday</span>
                  </div>
                  <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 w-fit">
                     <span className="text-red-500">❌</span> 
                     <span className="font-medium text-slate-700">Wrong version screenshots</span>
                  </div>
                  <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 w-fit">
                     <span className="text-red-500">❌</span> 
                     <span className="font-medium text-slate-700">10pm shift change texts</span>
                  </div>
               </div>
               
               <div className="mt-8">
                   <LinkPreview url="https://app.staffschedule.io/onboarding.php?start_trial=1">
                      <button className="px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all flex items-center gap-2">
                         See How It Works <ArrowRight className="w-4 h-4" />
                      </button>
                   </LinkPreview>
                   <p className="text-sm text-slate-500 mt-3 ml-2">No credit card needed · Setup in under 10 minutes</p>
               </div>
            </div>

            <div className="relative">
               <div className="absolute inset-0 bg-[#6C5CE7]/10 blur-[100px] rounded-full" />
               <div className="relative rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl overflow-hidden">
                  <Image 
                     src="/staffschedule-dashboard.png"
                     alt="Spreadsheet chaos vs StaffSchedule.io clean scheduling"
                     width={800}
                     height={500}
                     className="w-full h-auto rounded-xl object-cover border border-slate-100"
                  />
               </div>
            </div>

         </div>
      </section>

      {/* =========================================================================
          SECTION 4: DEFINITION
          ========================================================================= */}
      <section className="py-24 bg-[#FAF9FF] relative">
         <div className="max-w-4xl mx-auto px-6 text-center">
            
            <div className="bg-white border border-slate-200 border-l-4 border-l-[#6C5CE7] rounded-2xl p-8 md:p-12 text-left relative overflow-hidden shadow-sm">
               <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
                  <ShieldCheck className="w-32 h-32 text-slate-900" />
               </div>
               <div className="inline-block px-3 py-1 bg-[#6C5CE7] text-white text-xs font-bold uppercase tracking-wider rounded-full mb-6 shadow-sm">
                  📌 Quick Answer
               </div>
               <h3 className="text-2xl font-bold mb-4 text-slate-900">What Is Team Scheduling Software?</h3>
               <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  Team scheduling software is a digital tool that helps managers build work schedules, 
                  assign shifts, track staff availability, and share updates in real time. Instead of chasing 
                  people on WhatsApp, your entire workforce scheduling happens in one place — and your team 
                  always knows when and where they're working.
               </p>
               <LinkPreview url="https://app.staffschedule.io/onboarding.php?start_trial=1">
                  <button className="text-[#6C5CE7] font-bold flex items-center gap-2 hover:text-[#8E7CFF] transition-colors">
                     Try It Free <ArrowRight className="w-4 h-4" />
                  </button>
               </LinkPreview>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
               {[
                  { title: "Fixed Schedules", icon: <Calendar className="w-6 h-6 text-[#6C5CE7]" /> },
                  { title: "Rotating Shifts", icon: <Repeat className="w-6 h-6 text-[#00CEC9]" /> },
                  { title: "Flexible Rotas", icon: <Clock className="w-6 h-6 text-[#FD79A8]" /> },
               ].map((item, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 text-left hover:border-[#6C5CE7]/50 transition-colors group shadow-sm">
                     <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        {item.icon}
                     </div>
                     <h4 className="font-bold text-lg text-slate-900">{item.title}</h4>
                  </div>
               ))}
            </div>

         </div>
      </section>

      {/* =========================================================================
          SECTION 5: FEATURES (Alternating Layout)
          ========================================================================= */}
      <section className="py-24 bg-white border-t border-slate-100">
         
         {/* Feature 1: Build in Minutes */}
         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center mb-32">
            <div>
               <div className="inline-block px-3 py-1 bg-[#6C5CE7]/10 text-[#6C5CE7] border border-[#6C5CE7]/20 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                  ⚡ FEATURE 01
               </div>
               <h2 className="text-3xl md:text-4xl font-black mb-8 text-slate-900">Build Your Team Schedule in Minutes, Not Hours</h2>
               
               <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                     <div className="flex gap-4">
                        <div className="mt-1"><Calendar className="w-5 h-5 text-[#6C5CE7]" /></div>
                        <div>
                           <h4 className="font-bold text-lg mb-1 text-slate-900">Drag-and-Drop Schedule Builder</h4>
                           <p className="text-slate-600 text-sm">Open the calendar, drag a shift, drop it on the right person. Done. No formulas, no color-coding.</p>
                        </div>
                     </div>
                  </div>
                  
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                     <div className="flex gap-4">
                        <div className="mt-1"><Repeat className="w-5 h-5 text-[#00CEC9]" /></div>
                        <div>
                           <h4 className="font-bold text-lg mb-1 text-slate-900">Reusable Shift Templates</h4>
                           <p className="text-slate-600 text-sm">Save your standard week as a template, load it next week, make small tweaks and publish instantly.</p>
                        </div>
                     </div>
                  </div>
               </div>
               
               <div className="mt-8">
                  <LinkPreview url="https://app.staffschedule.io/onboarding.php?start_trial=1">
                     <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF] text-white font-bold hover:shadow-[0_0_20px_rgba(108,92,231,0.3)] transition-all flex items-center gap-2">
                        Start Building Free <ArrowRight className="w-4 h-4" />
                     </button>
                  </LinkPreview>
               </div>
            </div>
            
            <div className="relative">
               <div className="absolute inset-0 bg-[#6C5CE7]/5 blur-[100px] rounded-full" />
               <div className="relative rounded-2xl border border-slate-200 bg-white shadow-2xl p-4 overflow-hidden">
                  <Image src="/staffschedule-dashboard.png" alt="StaffSchedule.io Drag-and-Drop Schedule Builder" width={600} height={400} className="rounded-xl w-full border border-slate-100" />
                  
                  {/* Floating Stat Overlay */}
                  <div className="absolute -bottom-6 -left-6 bg-white border border-slate-200 rounded-xl p-4 shadow-xl flex items-center gap-4 animate-bounce" style={{ animationDuration: '4s' }}>
                     <div className="w-10 h-10 rounded-full bg-[#6C5CE7]/10 flex items-center justify-center text-[#6C5CE7] font-bold">⏱</div>
                     <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Scheduling Time</p>
                        <p className="text-lg font-black text-slate-900">3 hrs → 15 mins</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         
         {/* Feature 2: Instant Sharing */}
         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center mb-32 bg-[#FAF9FF] py-16 rounded-3xl border border-slate-100">
            <div className="order-2 lg:order-1 relative flex justify-center">
               <div className="absolute inset-0 bg-[#00CEC9]/5 blur-[100px] rounded-full" />
               <div className="relative rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden w-72 h-auto">
                  <Image src="/staffschedule-mobile.png" alt="StaffSchedule.io Mobile App — Real-Time Notifications" width={400} height={800} className="w-full h-auto object-contain" />
               </div>
            </div>
            
            <div className="order-1 lg:order-2">
               <div className="inline-block px-3 py-1 bg-[#00CEC9]/10 text-[#00CEC9] border border-[#00CEC9]/20 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                  ⚡ FEATURE 02
               </div>
               <h2 className="text-3xl md:text-4xl font-black mb-8 text-slate-900">Share Schedules Instantly — No More "I Didn't See It"</h2>
               
               <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                     <div className="flex gap-4">
                        <div className="mt-1"><Smartphone className="w-5 h-5 text-[#00CEC9]" /></div>
                        <div>
                           <h4 className="font-bold text-lg mb-1 text-slate-900">Real-Time Notifications</h4>
                           <p className="text-slate-600 text-sm">Changed a shift at 9pm? Your employee knows by 9:01pm. Every change hits their phone automatically.</p>
                        </div>
                     </div>
                  </div>
                  
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                     <div className="flex gap-4">
                        <div className="mt-1"><Users className="w-5 h-5 text-[#FD79A8]" /></div>
                        <div>
                           <h4 className="font-bold text-lg mb-1 text-slate-900">Mobile App for Everyone</h4>
                           <p className="text-slate-600 text-sm">Managers build on laptops, field crews check on phones. One team schedule app. Zero confusion.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* =========================================================================
          SECTION 8: INDUSTRIES
          ========================================================================= */}
      <section className="py-24 bg-[#FAF9FF] border-t border-slate-100">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-16 text-slate-900">Works for Any Team, Any Industry</h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
               {INDUSTRIES.map((ind, i) => (
                  <div key={i} className="p-8 rounded-3xl bg-white border border-slate-200 hover:-translate-y-2 hover:border-[#6C5CE7]/50 hover:shadow-xl transition-all group shadow-sm">
                     <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        {ind.icon}
                     </div>
                     <h3 className="text-2xl font-bold mb-3 text-slate-900">{ind.title}</h3>
                     <p className="text-slate-600 leading-relaxed">{ind.desc}</p>
                  </div>
               ))}
            </div>
            
            <p className="text-slate-500 font-bold mt-12 uppercase tracking-widest text-sm">+ 20 more industries supported</p>
         </div>
      </section>

      {/* =========================================================================
          SECTION 9: PRICING (Uses the actual component now!)
          ========================================================================= */}
      <PricingTable />

      {/* =========================================================================
          SECTION 12: FAQ
          ========================================================================= */}
      <section className="py-24 bg-white border-t border-slate-100">
         <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black mb-12 text-center text-slate-900">People Also Ask</h2>
            
            <div className="space-y-2">
               {FAQS.map((faq, index) => {
                  const isActive = activeFaq === index;
                  return (
                     <div key={index} className="border-b border-slate-200">
                        <button 
                           onClick={() => setActiveFaq(isActive ? null : index)}
                           className="w-full flex items-center justify-between py-6 text-left focus:outline-none"
                        >
                           <span className={cn("text-lg font-bold transition-colors", isActive ? "text-[#6C5CE7]" : "text-slate-800")}>
                              {faq.question}
                           </span>
                           <span className={cn("ml-6 flex-shrink-0 transition-transform duration-300", isActive ? "rotate-45 text-[#6C5CE7]" : "text-slate-400")}>
                              <Plus className="w-6 h-6" />
                           </span>
                        </button>
                        <div 
                           className={cn("overflow-hidden transition-all duration-300 ease-in-out", isActive ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0")}
                        >
                           <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </section>

      {/* =========================================================================
          SECTION 13: FINAL CTA
          ========================================================================= */}
      <section className="py-32 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7] via-[#8E7CFF] to-[#00CEC9]" />
         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-30" />
         
         <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-sm">
               Ready to Make Your Employee Schedule the Easy Way?
            </h2>
            <p className="text-white/90 text-xl font-medium mb-12">
               One tool. Your whole team. Sorted.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
               <LinkPreview url="https://app.staffschedule.io/onboarding.php?start_trial=1">
                  <button className="px-8 py-4 rounded-xl bg-white text-slate-900 font-black text-lg hover:scale-105 transition-transform w-full sm:w-auto shadow-xl">
                     Start Free Today
                  </button>
               </LinkPreview>
               <button className="px-8 py-4 rounded-xl bg-transparent border-2 border-white/30 text-white font-bold text-lg hover:bg-white/10 transition-colors w-full sm:w-auto">
                  See All Features
               </button>
            </div>
            
            <p className="text-white/80 font-medium">No credit card needed · Setup in 10 minutes · Cancel anytime</p>
         </div>
      </section>
      
    </main>
  );
}
