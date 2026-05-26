"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion, useInView, AnimatePresence,
  type Variants, type Transition,
  useMotionValue, useTransform, useSpring as useMotionSpring
} from "framer-motion";

// ----------------------------------------------------------------------
// THEME CONSTANTS: "Cleaning Service" - Soft Cyan & Crisp White
// ----------------------------------------------------------------------
const THEME = {
  primary: "from-cyan-500 to-teal-400",
  textBase: "text-slate-800",
  textMuted: "text-slate-500",
  bgBase: "bg-slate-50",
  cardBg: "bg-white",
  cardBorder: "border-slate-200",
  accentText: "text-cyan-600",
  btnPrimary: "bg-cyan-600 hover:bg-cyan-700 text-white shadow-cyan-500/25",
};

// ----------------------------------------------------------------------
// HERO COMPONENT: Crew Deployment Dashboard
// ----------------------------------------------------------------------
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-50 pt-32 pb-20">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-cyan-100/40 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, -3, 3, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] -right-[15%] w-[50%] h-[50%] rounded-full bg-teal-100/40 blur-[120px]"
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-100/50 border border-cyan-200 text-cyan-700 font-medium text-sm mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Built for Modern Cleaning Crews
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-5xl lg:text-7xl font-bold tracking-tight ${THEME.textBase} mb-6 leading-[1.1]`}
            >
              Flawless <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-500">Cleaning Schedules</span> That Sparkle.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-lg lg:text-xl ${THEME.textMuted} mb-8 leading-relaxed max-w-xl`}
            >
              Say goodbye to messy spreadsheets and missed appointments. Coordinate your maids, janitors, and specialized cleaning crews with intelligent location-based scheduling and real-time field updates.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/demo">
                <button className={`h-14 px-8 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${THEME.btnPrimary} w-full sm:w-auto`}>
                  Start Free Trial
                </button>
              </Link>
              <Link href="/pricing">
                <button className={`h-14 px-8 rounded-xl font-semibold transition-all border ${THEME.cardBorder} bg-white text-slate-700 hover:bg-slate-50 w-full sm:w-auto`}>
                  View Pricing
                </button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-8 flex items-center gap-4 text-sm text-slate-500 font-medium"
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-50 bg-slate-200 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="User" />
                  </div>
                ))}
              </div>
              <p>Trusted by 2,000+ top-rated cleaning services</p>
            </motion.div>
          </div>

          {/* Interactive Visual: Crew Deployment Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative lg:h-[600px] flex items-center justify-center perspective-[1000px]"
          >
            {/* Main App Window Mockup */}
            <div className={`relative w-full max-w-lg aspect-[4/3] rounded-2xl ${THEME.cardBg} border ${THEME.cardBorder} shadow-2xl shadow-cyan-900/10 overflow-hidden transform rotate-y-[-5deg] rotate-x-[5deg] p-6 flex flex-col`}>
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Crew Deployment</h3>
                    <p className="text-xs text-slate-500">Today, Oct 14 • 8 Active Jobs</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  All Crews On Schedule
                </div>
              </div>
              
              {/* Job List */}
              <div className="space-y-4 flex-1">
                {[
                  { client: "Smith Residence", time: "09:00 AM - 12:00 PM", status: "In Progress", crew: "Team Alpha", progress: 65, color: "bg-blue-500" },
                  { client: "Oakwood Offices", time: "01:00 PM - 04:00 PM", status: "En Route", crew: "Team Beta", progress: 10, color: "bg-cyan-500" },
                  { client: "The Heights Apts", time: "02:30 PM - 05:00 PM", status: "Scheduled", crew: "Team Gamma", progress: 0, color: "bg-slate-300" }
                ].map((job, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + (idx * 0.2) }}
                    className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col gap-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-slate-800 text-sm">{job.client}</h4>
                        <p className="text-xs text-slate-500">{job.time} • {job.crew}</p>
                      </div>
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${job.status === 'In Progress' ? 'bg-cyan-100 text-cyan-700' : job.status === 'En Route' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-600'}`}>
                        {job.status}
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${job.progress}%` }}
                        transition={{ duration: 1.5, delay: 1.2 + (idx * 0.2), ease: "easeOut" }}
                        className={`h-full ${job.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating Notification */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 1.8, type: "spring" }}
              className="absolute -right-8 top-1/4 bg-white p-4 rounded-xl shadow-xl shadow-cyan-900/10 border border-slate-100 flex items-center gap-4 z-20 backdrop-blur-md"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Job Complete</p>
                <p className="text-xs text-slate-500">Team Alpha finished Smith Residence</p>
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
      title: "Location-Based Scheduling",
      desc: "Stop sending crews back and forth across town. Group cleaning jobs geographically and optimize travel routes to reduce windshield time and fuel costs.",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    },
    {
      title: "Recurring Client Visits",
      desc: "Set up complex recurring schedules (e.g., 'every 2nd Tuesday' or 'bi-weekly on Fridays') in seconds. Never miss a regular client cleaning again.",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    },
    {
      title: "Mobile Checklists",
      desc: "Ensure consistent quality. Require crews to complete mandatory digital checklists and upload photos of specific rooms before marking a job complete.",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6">Designed for the Realities of the Cleaning Industry</h2>
          <p className="text-lg text-slate-500">
            Scheduling cleaners isn't like scheduling office workers. You deal with client keys, alarm codes, specific chemical requirements, and traffic delays. We built tools specifically for that.
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
              className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-cyan-100/50 transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">{feature.icon}</svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// WORKFLOW SECTION: Step-by-Step
// ----------------------------------------------------------------------
function WorkflowSection() {
  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/40 via-slate-900 to-slate-900"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative">
            {/* Abstract Mobile UI */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative w-full max-w-sm mx-auto aspect-[9/19] rounded-[2.5rem] bg-slate-800 border-8 border-slate-700 shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="bg-cyan-600 p-6 pt-12 text-white">
                <h3 className="text-xl font-bold">Today's Route</h3>
                <p className="text-cyan-100 text-sm">3 Locations assigned</p>
              </div>
              <div className="p-4 space-y-4 bg-slate-100 flex-1">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-white p-4 rounded-xl shadow-sm text-slate-800 flex gap-4">
                    <div className="w-2 h-full bg-cyan-500 rounded-full shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm">Commercial Clean</h4>
                      <p className="text-xs text-slate-500">123 Business Pkwy • {item + 8}:00 AM</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Floating Badges */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute top-1/4 -left-8 lg:-left-16 bg-white text-slate-800 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <span className="font-bold text-sm">Clocked In via GPS</span>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Empower Your Cleaners in the Field</h2>
            <div className="space-y-8">
              {[
                { title: "Instant Mobile Schedules", desc: "Crews view their daily routes directly on their phones. No more morning huddles or printed spreadsheets." },
                { title: "GPS Time Tracking", desc: "Ensure staff are actually at the client's property before they can clock in, eliminating time theft and confusion." },
                { title: "Client Instructions & Codes", desc: "Securely attach alarm codes, lockbox locations, and special client requests directly to the shift." }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-900/50 border border-cyan-500 text-cyan-400 flex items-center justify-center font-bold text-xl shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
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
    { q: "How does cleaning service scheduling software help my business?", a: "It eliminates manual coordination by giving you a unified dashboard to assign jobs, track cleaning crew locations, manage recurring client visits, and seamlessly handle shift changes without text-message chaos." },
    { q: "Can my cleaning crews access their schedules on mobile?", a: "Yes, our dedicated iOS and Android apps allow your field teams to instantly view their schedules, clock in with GPS verification, and communicate job updates directly from their phones." },
    { q: "Is it possible to schedule recurring cleaning jobs?", a: "Absolutely. You can easily set up recurring daily, weekly, or monthly cleaning assignments, ensuring your clients receive consistent service without needing to recreate schedules from scratch." },
    { q: "How do we handle last-minute sick calls from maids?", a: "Our platform features an open-shift broadcast system. If a staff member calls out, you can instantly push a notification to all available, qualified staff to claim the shift, filling coverage gaps in minutes." }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-500">Everything you need to know about managing your cleaning crews.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="group bg-white rounded-xl border border-slate-200 open:border-cyan-300 transition-colors">
              <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-slate-800">
                {faq.q}
                <span className="relative ml-4 flex h-5 w-5 shrink-0 items-center justify-center">
                  <svg className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  <svg className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-500 leading-relaxed">
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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-cyan-600 to-teal-700 overflow-hidden px-8 py-16 md:py-20 text-center shadow-2xl shadow-cyan-900/20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to sweep away scheduling chaos?
            </h2>
            <p className="text-xl text-cyan-100 mb-10">
              Join thousands of cleaning businesses streamlining their crews with StaffSchedule.io. Setup takes minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <button className="h-14 px-8 rounded-xl font-bold bg-white text-cyan-700 hover:bg-slate-50 transition-all shadow-xl hover:-translate-y-1 w-full sm:w-auto">
                  Start Your Free Trial
                </button>
              </Link>
              <Link href="/demo">
                <button className="h-14 px-8 rounded-xl font-bold bg-cyan-800/50 text-white border border-cyan-400/30 hover:bg-cyan-800/70 transition-all w-full sm:w-auto">
                  Book a Demo
                </button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-cyan-200">No credit card required. 14-day free trial.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CleaningServicePage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-cyan-200 selection:text-cyan-900">
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
