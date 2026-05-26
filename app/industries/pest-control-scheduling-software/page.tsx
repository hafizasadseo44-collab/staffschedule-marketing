"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion, useInView, AnimatePresence,
  type Variants, type Transition,
  useMotionValue, useTransform, useSpring as useMotionSpring
} from "framer-motion";

// ----------------------------------------------------------------------
// THEME CONSTANTS: "Pest Control" - Deep Navy & Alert Red/Orange
// ----------------------------------------------------------------------
const THEME = {
  primary: "from-red-500 to-orange-500",
  textBase: "text-slate-800",
  textMuted: "text-slate-500",
  bgBase: "bg-slate-900", // Deep Navy/Slate
  cardBg: "bg-slate-800",
  cardBorder: "border-slate-700",
  accentText: "text-red-400",
  btnPrimary: "bg-red-500 hover:bg-red-600 text-white shadow-red-500/30",
};

// ----------------------------------------------------------------------
// HERO COMPONENT: Service Route & Compliance Dashboard
// ----------------------------------------------------------------------
function HeroSection() {
  return (
    <section className={`relative min-h-[90vh] flex items-center justify-center overflow-hidden ${THEME.bgBase} pt-32 pb-20`}>
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] right-[10%] w-[60%] h-[60%] rounded-full bg-red-500/20 blur-[150px]"
        />
        <motion.div
          animate={{ opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/20 blur-[120px]"
        />
        {/* Radar/Targeting Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[800px] h-[800px] rounded-full border border-slate-800/50 opacity-20" />
          <div className="absolute w-[600px] h-[600px] rounded-full border border-slate-800/50 opacity-20" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-slate-800/50 opacity-20" />
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-sm mb-6 tracking-wide uppercase"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Pest Control Scheduling
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
            >
              Eliminate <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Scheduling Headaches.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-slate-400 mb-8 leading-relaxed max-w-xl"
            >
              The ultimate software for exterminators and pest control businesses. Automate recurring quarterly treatments, enforce chemical compliance logs, and dispatch emergency calls instantly.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/signup">
                <button className={`h-14 px-8 rounded-lg font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 ${THEME.btnPrimary} uppercase tracking-wide w-full sm:w-auto`}>
                  Try It Free
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Interactive Visual: Compliance & Route Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative lg:h-[600px] flex items-center justify-center perspective-[1200px]"
          >
            {/* Main App Dashboard */}
            <div className={`relative w-full max-w-lg aspect-[4/3] rounded-xl ${THEME.cardBg} border ${THEME.cardBorder} shadow-2xl shadow-black/50 overflow-hidden transform rotate-y-[-10deg] rotate-x-[5deg] p-5 flex flex-col`}>
              {/* Header */}
              <div className="flex items-center justify-between mb-5 border-b border-slate-700 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-red-500/20 flex items-center justify-center text-red-500">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white uppercase tracking-wider text-sm">Service Routes</h3>
                    <p className="text-xs text-slate-400">Quarterly Maintenance - Route B</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">8<span className="text-sm text-slate-500">/10</span></p>
                  <p className="text-[10px] text-slate-400 uppercase">Jobs Completed</p>
                </div>
              </div>
              
              {/* Job List */}
              <div className="space-y-3 flex-1 overflow-hidden">
                {[
                  { client: "Evergreen Apts", type: "Quarterly Exterior", status: "COMPLETED", tech: "J. Davis", compliance: true },
                  { client: "Diner 24/7", type: "Roach Treatment", status: "IN PROGRESS", tech: "M. Smith", compliance: false },
                  { client: "Residential - 402 Elm", type: "Termite Insp.", status: "SCHEDULED", tech: "J. Davis", compliance: false }
                ].map((job, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + (idx * 0.2) }}
                    className="p-3 rounded bg-slate-900/50 border border-slate-700 flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-white text-sm">{job.client}</h4>
                        <p className="text-xs text-slate-400">{job.type} • {job.tech}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider ${job.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400' : job.status === 'IN PROGRESS' ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-700 text-slate-300'}`}>
                        {job.status}
                      </span>
                    </div>
                    {/* Compliance Indicator */}
                    <div className="flex items-center gap-2 mt-1 pt-2 border-t border-slate-800">
                      <div className={`w-2 h-2 rounded-full ${job.compliance ? 'bg-green-500' : job.status === 'COMPLETED' ? 'bg-red-500' : 'bg-slate-600'}`}></div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                        {job.compliance ? 'EPA Log Submitted' : job.status === 'COMPLETED' ? 'Missing Chem Log!' : 'Pending Chem Log'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating Alert Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.8, type: "spring" }}
              className="absolute -top-6 -right-6 lg:-right-12 bg-white p-4 rounded-lg shadow-xl shadow-red-500/20 border border-slate-200 flex items-center gap-4 z-20"
            >
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Emergency Dispatch</p>
                <p className="text-xs text-slate-500">Wasp nest at 104 Main St.</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// FEATURES SECTION
// ----------------------------------------------------------------------
function FeaturesSection() {
  const features = [
    {
      title: "Automated Recurring Services",
      desc: "Set it and forget it. Create templates for monthly, bi-monthly, or quarterly pest treatments. The system automatically populates your schedule and alerts clients via SMS.",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    },
    {
      title: "Digital Chemical Logging",
      desc: "Ensure strict compliance. Force technicians to fill out mandatory digital EPA chemical usage logs within the mobile app before they can mark a job as 'completed'.",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    },
    {
      title: "Emergency Dispatching",
      desc: "When a frantic client calls about a sudden infestation, use the live GPS map to find your closest technician and push the emergency job directly to their phone.",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Built to Handle the Bugs</h2>
          <p className="text-lg text-slate-600">
            Pest control scheduling isn't just about timeslots. It's about compliance, chemical logs, recurring revenue streams, and fast emergency response.
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
              className="p-8 rounded-xl bg-slate-50 border border-slate-100 hover:border-red-200 transition-colors group shadow-sm hover:shadow-lg hover:shadow-red-500/10"
            >
              <div className="w-14 h-14 rounded bg-red-100 text-red-600 flex items-center justify-center mb-6 group-hover:bg-red-500 group-hover:text-white transition-colors">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">{feature.icon}</svg>
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
// WORKFLOW / MOBILE SECTION
// ----------------------------------------------------------------------
function WorkflowSection() {
  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative border-t border-slate-800">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative h-[500px] flex items-center justify-center">
            {/* Mobile App View: Compliance Log */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-72 bg-slate-800 rounded-3xl border-8 border-slate-700 shadow-2xl overflow-hidden flex flex-col font-sans relative z-10"
            >
              <div className="bg-red-600 p-5 text-white">
                <h3 className="font-bold">Chemical Usage Log</h3>
                <p className="text-red-200 text-xs">Required before completion</p>
              </div>
              <div className="p-4 flex-1 bg-white space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Target Pest</label>
                  <select className="w-full border border-slate-200 rounded p-2 text-sm text-slate-800 bg-slate-50">
                    <option>German Cockroach</option>
                    <option>Subterranean Termite</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Chemical Applied</label>
                  <select className="w-full border border-slate-200 rounded p-2 text-sm text-slate-800 bg-slate-50">
                    <option>Alpine WSG (EPA #499-561)</option>
                    <option>Demand CS (EPA #100-1066)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Amount Used (oz)</label>
                  <input type="text" value="2.5" readOnly className="w-full border border-slate-200 rounded p-2 text-sm text-slate-800 bg-slate-50" />
                </div>
                <div className="pt-2">
                  <button className="w-full bg-slate-900 text-white py-2.5 rounded font-bold text-sm">
                    Submit & Complete Job
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Everything Your Technicians Need.</h2>
            <p className="text-slate-400 mb-8 text-lg">
              Replace messy paper clipboards with a powerful mobile app that guides your exterminators through their route and enforces compliance.
            </p>
            
            <div className="space-y-6">
              {[
                "Mandatory digital forms for EPA chemical tracking",
                "Client history views (past treatments and specific pest issues)",
                "Photo capture for finding entry points or damage",
                "Digital signature capture for billing and service validation"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded bg-red-500/20 text-red-500 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p className="text-slate-300">{item}</p>
                </div>
              ))}
            </div>
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
    { q: "How does this software handle recurring pest control treatments?", a: "Our system allows you to set up recurring schedules (e.g., quarterly exterior sprays, monthly commercial kitchen inspections) effortlessly. The software automatically populates future schedules, ensuring no client falls through the cracks." },
    { q: "Can technicians log chemical usage in the mobile app?", a: "Yes, you can require technicians to complete digital forms before a job is marked complete. This is perfect for EPA compliance, allowing techs to log exactly which chemicals were used and in what quantities." },
    { q: "Does it support emergency dispatching for sudden infestations?", a: "Absolutely. Our live GPS map shows where all your technicians are currently located. If an emergency bed bug or wasp call comes in, you can instantly route the closest available technician to the site." },
    { q: "Can we track which pests are found at which properties?", a: "Yes, the mobile app allows technicians to log specific pest activity (e.g., 'mice observed in boiler room'). This creates a historical record for that property, making future treatments much more effective." }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-500">Answers to common questions from pest control operators.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="group bg-white rounded border border-slate-200 open:border-red-500 transition-colors">
              <summary className="flex cursor-pointer items-center justify-between p-6 font-bold text-slate-800 select-none">
                {faq.q}
                <span className="relative ml-4 flex h-5 w-5 shrink-0 items-center justify-center text-red-500">
                  <svg className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  <svg className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-600 leading-relaxed text-sm">
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
    <section className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-900/20 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white">
          Take Control of Your Routes.
        </h2>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-medium">
          The most reliable scheduling and dispatch platform for serious pest control businesses.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <button className="h-14 px-10 rounded bg-red-600 text-white hover:bg-red-500 transition-all shadow-xl hover:-translate-y-1 w-full sm:w-auto font-bold uppercase tracking-wider">
              Start Free Trial
            </button>
          </Link>
          <Link href="/demo">
            <button className="h-14 px-10 rounded bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 transition-all w-full sm:w-auto font-bold uppercase tracking-wider">
              Book a Demo
            </button>
          </Link>
        </div>
        <p className="mt-8 text-sm text-slate-500">14-day free trial. Setup takes minutes.</p>
      </div>
    </section>
  );
}

export default function PestControlPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-red-200 selection:text-slate-900">
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
