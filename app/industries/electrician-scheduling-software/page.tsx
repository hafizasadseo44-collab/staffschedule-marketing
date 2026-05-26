"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion, useInView, AnimatePresence,
  type Variants, type Transition,
  useMotionValue, useTransform, useSpring as useMotionSpring
} from "framer-motion";

// ----------------------------------------------------------------------
// THEME CONSTANTS: "Electrician" - Electric Yellow & Slate Gray
// ----------------------------------------------------------------------
const THEME = {
  primary: "from-yellow-400 to-amber-500",
  textBase: "text-slate-800",
  textMuted: "text-slate-500",
  bgBase: "bg-[#0f172a]", // Very dark slate for high contrast
  cardBg: "bg-slate-800",
  cardBorder: "border-slate-700",
  accentText: "text-yellow-400",
  btnPrimary: "bg-yellow-500 hover:bg-yellow-400 text-slate-900 shadow-yellow-500/20",
};

// ----------------------------------------------------------------------
// HERO COMPONENT: Emergency Dispatch Board
// ----------------------------------------------------------------------
function HeroSection() {
  return (
    <section className={`relative min-h-[90vh] flex items-center justify-center overflow-hidden ${THEME.bgBase} pt-32 pb-20`}>
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[20%] w-px h-64 bg-gradient-to-b from-transparent via-yellow-400 to-transparent shadow-[0_0_15px_rgba(250,204,21,0.5)]"
        />
        <motion.div
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[40%] right-[30%] w-px h-48 bg-gradient-to-b from-transparent via-yellow-400 to-transparent shadow-[0_0_15px_rgba(250,204,21,0.5)]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black opacity-80" />
        {/* Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] opacity-20" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-mono text-sm mb-6 uppercase tracking-wider"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              Live Dispatch System
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
            >
              Power Up Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Electrician Dispatch.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-slate-400 mb-8 leading-relaxed max-w-xl"
            >
              Coordinate emergency calls, manage specialized certifications, and dispatch field technicians instantly. Built for the high-voltage demands of modern electrical contractors.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/demo">
                <button className={`h-14 px-8 rounded-md font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${THEME.btnPrimary} uppercase tracking-wide w-full sm:w-auto`}>
                  Start Dispatching
                </button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-10 flex items-center gap-6 border-t border-slate-800 pt-6"
            >
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">99.9%</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-mono">Uptime Reliability</span>
              </div>
              <div className="w-px h-10 bg-slate-800"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">2.4x</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-mono">Faster Dispatch</span>
              </div>
            </motion.div>
          </div>

          {/* Interactive Visual: Emergency Dispatch Board */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* Main Dashboard Mockup */}
            <div className={`relative w-full max-w-lg aspect-[4/3] rounded-xl ${THEME.cardBg} border ${THEME.cardBorder} shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col font-mono text-sm`}>
              
              {/* Header Bar */}
              <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-slate-400 text-xs uppercase tracking-widest ml-2">DISPATCH_TERMINAL_v2.0</span>
                </div>
                <div className="text-green-400 text-xs font-bold animate-pulse">
                  ● SYSTEM ONLINE
                </div>
              </div>
              
              {/* Active Jobs Area */}
              <div className="p-4 space-y-3 flex-1 bg-slate-900/50">
                <div className="text-xs text-slate-500 mb-2 uppercase tracking-wider">Active Assignments</div>
                
                {[
                  { id: "JOB-4892", type: "Emergency Repair", location: "Sector 4 Industrial", tech: "Mike T.", status: "EN_ROUTE", cert: "High Voltage" },
                  { id: "JOB-4893", type: "Panel Upgrade", location: "Residential - Oak St", tech: "Sarah K.", status: "ON_SITE", cert: "Residential" },
                  { id: "JOB-4894", type: "Generator Install", location: "Data Center Beta", tech: "David L.", status: "WIRING", cert: "Master" },
                ].map((job, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + (idx * 0.2) }}
                    className="group border border-slate-700 bg-slate-800/80 p-3 rounded flex flex-col gap-2 hover:border-yellow-500/50 transition-colors"
                  >
                    <div className="flex justify-between items-center border-b border-slate-700/50 pb-2">
                      <span className="text-yellow-400 font-bold">{job.id}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${job.status === 'EN_ROUTE' ? 'bg-blue-500/20 text-blue-400' : job.status === 'ON_SITE' ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'}`}>
                        {job.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-slate-300 text-xs">{job.type}</div>
                        <div className="text-slate-500 text-[10px] truncate w-32">{job.location}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white text-xs">{job.tech}</div>
                        <div className="text-slate-500 text-[10px] uppercase">Req: {job.cert}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating Incoming Call Alert */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.8, type: "spring" }}
              className="absolute -bottom-6 -right-6 lg:-right-12 bg-red-950/90 border border-red-500/50 p-4 rounded-lg shadow-[0_0_30px_rgba(239,68,68,0.3)] flex items-center gap-4 z-20 backdrop-blur-md"
            >
              <div className="w-12 h-12 rounded bg-red-500 flex items-center justify-center text-white shrink-0 animate-pulse">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div className="font-mono">
                <p className="text-sm font-bold text-red-400 uppercase tracking-wider">Incoming Emergency</p>
                <p className="text-xs text-white">Commercial Power Loss</p>
                <p className="text-[10px] text-red-300 mt-1">Locating nearest Master Tech...</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// FEATURES SECTION: Problem/Solution
// ----------------------------------------------------------------------
function FeaturesSection() {
  const features = [
    {
      title: "Smart Emergency Dispatch",
      desc: "When a high-priority call comes in, instantly view a live map of all field technicians. Dispatch the closest available electrician with a single click.",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    },
    {
      title: "Certification Tracking",
      desc: "Don't accidentally send an apprentice to a high-voltage commercial job. Track licenses and enforce certification requirements before a job can be assigned.",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    },
    {
      title: "Equipment & Tool Management",
      desc: "Attach specific equipment requirements (e.g., thermal imagers, scissor lifts) to jobs so technicians know exactly what to load onto their trucks.",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    }
  ];

  return (
    <section className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Built for Electrical Contractors</h2>
          <p className="text-lg text-slate-600">
            Generic scheduling tools don't cut it when you're dealing with life-safety compliance, emergency after-hours calls, and complex commercial installations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="p-8 rounded-xl bg-white border border-slate-200 hover:border-yellow-400 transition-colors group shadow-sm hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded bg-slate-900 text-yellow-400 flex items-center justify-center mb-6 group-hover:bg-yellow-500 group-hover:text-slate-900 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">{feature.icon}</svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// WORKFLOW SECTION
// ----------------------------------------------------------------------
function WorkflowSection() {
  return (
    <section className="py-24 bg-white border-t border-slate-100 overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Seamless Field-to-Office Communication</h2>
            <p className="text-slate-600 mb-8 text-lg">
              Equip your electricians with a mobile app that acts as their digital job folder. No more lost paperwork or missed texts.
            </p>
            
            <div className="space-y-6">
              {[
                "Push notifications for new emergency dispatch jobs",
                "Digital capture of client signatures and completion photos",
                "Direct messaging between the field and the dispatch office",
                "Real-time clock-in with geofencing verification"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p className="text-slate-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[500px] flex items-center justify-center bg-slate-50 rounded-2xl border border-slate-200">
            {/* Minimal Mobile App Mockup */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="w-72 bg-slate-900 rounded-[2rem] shadow-2xl border-[6px] border-slate-800 overflow-hidden flex flex-col font-sans"
            >
              <div className="bg-yellow-500 p-6 pt-10 text-slate-900">
                <h3 className="font-bold text-xl">Job #8492</h3>
                <p className="text-yellow-900 text-sm font-medium">Commercial Wiring</p>
              </div>
              <div className="p-5 flex-1 bg-white space-y-4">
                <div>
                  <label className="text-xs text-slate-400 font-bold uppercase">Location</label>
                  <p className="text-slate-800 font-medium">402 West Industrial Ave.</p>
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-bold uppercase">Notes</label>
                  <p className="text-slate-600 text-sm">Main breaker box access is via the loading dock. Bring the thermal imager.</p>
                </div>
                <div className="pt-4 mt-auto">
                  <button className="w-full py-3 rounded-lg bg-green-500 text-white font-bold shadow-lg shadow-green-500/30">
                    Mark On-Site
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// FAQ SECTION
// ----------------------------------------------------------------------
function FAQSection() {
  const faqs = [
    { q: "How does this software help with emergency electrical calls?", a: "Our live dispatch board allows you to see the real-time GPS locations of all your technicians. When an emergency call comes in, you can instantly assign the job to the closest available electrician with the right certifications." },
    { q: "Can I track which electrician has specific certifications?", a: "Yes, StaffSchedule.io includes a robust certification tracking system. You can tag technicians with their specific licenses (e.g., Master Electrician, High Voltage) and the system will alert you if you try to assign an unqualified tech to a specialized job." },
    { q: "Do electricians get mobile notifications for new jobs?", a: "Absolutely. Field technicians receive instant push notifications on our mobile app whenever a new job is dispatched or a schedule changes, along with all the necessary client details and site notes." },
    { q: "Does it integrate with our payroll system?", a: "Yes, our precise GPS-verified time tracking allows you to export accurate timesheets directly to popular payroll software, accounting for overtime and double-time rates automatically." }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400">Everything you need to know about managing electrical contractors.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="group bg-slate-800 rounded-lg border border-slate-700 open:border-yellow-500 transition-colors">
              <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-white select-none">
                {faq.q}
                <span className="relative ml-4 flex h-5 w-5 shrink-0 items-center justify-center text-yellow-500">
                  <svg className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  <svg className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-300 leading-relaxed text-sm">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// CTA SECTION
// ----------------------------------------------------------------------
function CTASection() {
  return (
    <section className="py-24 bg-yellow-500 text-slate-900">
      <div className="container mx-auto px-6 max-w-5xl text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase">
          Stop Guessing. Start Dispatching.
        </h2>
        <p className="text-xl text-yellow-900 mb-10 max-w-2xl mx-auto font-medium">
          Equip your electrical business with the most advanced, reliable scheduling and dispatch platform available.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <button className="h-14 px-10 rounded bg-slate-900 text-white hover:bg-black transition-all shadow-xl hover:-translate-y-1 w-full sm:w-auto font-bold uppercase tracking-wider">
              Start Free Trial
            </button>
          </Link>
          <Link href="/demo">
            <button className="h-14 px-10 rounded bg-transparent border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all w-full sm:w-auto font-bold uppercase tracking-wider">
              Book a Demo
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ElectricianPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-yellow-200 selection:text-slate-900">
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
