"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion, useInView, AnimatePresence,
  type Variants, type Transition,
  useMotionValue, useTransform, useSpring as useMotionSpring
} from "framer-motion";

// ----------------------------------------------------------------------
// THEME CONSTANTS: "Plumbing" - Deep Water Blue & Indigo
// ----------------------------------------------------------------------
const THEME = {
  primary: "from-blue-600 to-indigo-600",
  textBase: "text-slate-800",
  textMuted: "text-slate-500",
  bgBase: "bg-[#f4f7fa]", // Cool light blue-gray
  cardBg: "bg-white",
  cardBorder: "border-blue-100",
  accentText: "text-blue-700",
  btnPrimary: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30",
};

// ----------------------------------------------------------------------
// HERO COMPONENT: Live Technician Dispatch Map
// ----------------------------------------------------------------------
function HeroSection() {
  return (
    <section className={`relative min-h-[90vh] flex items-center justify-center overflow-hidden ${THEME.bgBase} pt-32 pb-20`}>
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] right-[5%] w-[50%] h-[50%] rounded-[100%] bg-blue-400/20 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.05, 1], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[40%] -left-[10%] w-[60%] h-[60%] rounded-[100%] bg-indigo-400/20 blur-[100px]"
        />
        {/* Wavy lines pattern representing water flow */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/wave-cut.png')" }}></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/60 border border-blue-200 text-blue-800 font-medium text-sm mb-6 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Intelligent Plumbing Dispatch
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]"
            >
              Keep Your Plumbing Crews <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Flowing.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed max-w-xl"
            >
              The most advanced scheduling software for plumbing contractors. Handle emergency burst pipes, manage on-call overtime, and coordinate field technicians seamlessly.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/demo">
                <button className={`h-14 px-8 rounded-xl font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 ${THEME.btnPrimary} w-full sm:w-auto`}>
                  Start Dispatching
                </button>
              </Link>
              <Link href="/pricing">
                <button className="h-14 px-8 rounded-xl font-bold transition-all border border-blue-200 bg-white text-blue-800 hover:bg-blue-50 shadow-sm w-full sm:w-auto">
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
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#f4f7fa] bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 30}`} alt="User" />
                  </div>
                ))}
              </div>
              <p>Trusted by over 1,500 plumbing contractors</p>
            </motion.div>
          </div>

          {/* Interactive Visual: Live Map Dispatch */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative lg:h-[600px] flex items-center justify-center perspective-[1000px]"
          >
            {/* Map Dashboard Frame */}
            <div className={`relative w-full max-w-lg aspect-[4/3] rounded-2xl ${THEME.cardBg} border ${THEME.cardBorder} shadow-2xl shadow-blue-900/15 overflow-hidden transform rotate-y-[-5deg] rotate-x-[2deg] flex flex-col`}>
              
              {/* Map UI Area */}
              <div className="h-48 bg-blue-50 border-b border-blue-100 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>
                
                {/* Connecting Line */}
                <svg className="absolute inset-0 w-full h-full">
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                    d="M100,100 C150,80 200,120 250,90" 
                    fill="none" stroke="#2563eb" strokeWidth="3" strokeDasharray="6 6"
                  />
                </svg>

                {/* Pins */}
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }}
                  className="absolute left-[100px] top-[100px] transform -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="w-4 h-4 rounded-full bg-blue-600 shadow-lg shadow-blue-600/50 border-2 border-white"></div>
                </motion.div>
                
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.8, type: "spring" }}
                  className="absolute left-[250px] top-[90px] transform -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative flex w-6 h-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full w-6 h-6 bg-red-500 border-2 border-white shadow-lg"></span>
                  </div>
                </motion.div>
              </div>

              {/* Jobs List UI */}
              <div className="flex-1 p-4 bg-white flex flex-col gap-3">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-slate-800 text-sm">Active Dispatch</h3>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">3 Technicians Online</span>
                </div>
                
                {[
                  { name: "John Stevens", location: "Commercial Job (80%)", status: "Busy", badge: "bg-slate-200 text-slate-600" },
                  { name: "Mark Wilson", location: "En Route to Emergency", status: "Dispatched", badge: "bg-blue-100 text-blue-700" },
                  { name: "Dave Harris", location: "Zone 3 / North Side", status: "Available", badge: "bg-green-100 text-green-700" }
                ].map((tech, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + (idx * 0.2) }}
                    className={`p-3 rounded-lg border ${tech.status === 'Dispatched' ? 'border-blue-200 bg-blue-50/50' : 'border-slate-100 bg-slate-50'} flex justify-between items-center`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${tech.badge}`}>
                        {tech.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{tech.name}</p>
                        <p className="text-xs text-slate-500">{tech.location}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${tech.badge}`}>
                      {tech.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating Alert Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 2.2, type: "spring" }}
              className="absolute top-1/4 -left-10 bg-white p-4 rounded-xl shadow-xl shadow-blue-900/10 border border-slate-100 flex items-center gap-4 z-20 backdrop-blur-md"
            >
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Emergency Leak</p>
                <p className="text-xs text-slate-500">Auto-dispatching nearest tech...</p>
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
      title: "Emergency Dispatch Mapping",
      desc: "When a burst pipe floods a basement, seconds matter. View all technicians on a live map and instantly push the emergency job to the closest available plumber.",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    },
    {
      title: "On-Call & Overtime Tracking",
      desc: "Plumbing doesn't stop at 5 PM. Automatically track who is on-call, record emergency after-hours dispatch times, and export precise overtime data for payroll.",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    },
    {
      title: "Offline Mobile Access",
      desc: "Plumbers work in basements and concrete buildings where cell signals die. Our app caches jobs offline so techs can view instructions and take notes without the internet.",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3" />
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6">Designed for Plumbing Professionals</h2>
          <p className="text-lg text-slate-600">
            Stop trying to adapt generic scheduling software. Get a platform built for the unpredictable, high-stakes nature of plumbing field service.
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
              className="p-8 rounded-2xl bg-[#f4f7fa] border border-blue-100 hover:shadow-xl hover:shadow-blue-100 transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">{feature.icon}</svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
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
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative h-[550px] flex items-center justify-center">
            {/* Mobile App View: Offline Sync & Job Details */}
            <motion.div
              initial={{ opacity: 0, rotate: -5, y: 30 }}
              whileInView={{ opacity: 1, rotate: 0, y: 0 }}
              viewport={{ once: true }}
              className="w-72 bg-slate-800 rounded-[2.5rem] shadow-2xl border-8 border-slate-700 overflow-hidden flex flex-col font-sans relative z-10"
            >
              {/* App Header */}
              <div className="bg-blue-600 p-6 pt-10 text-white relative">
                <h3 className="font-bold text-xl">Job #4092</h3>
                <p className="text-blue-200 text-sm">Water Heater Replace</p>
                
                {/* Offline Indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 bg-slate-900/40 rounded text-[10px] font-bold uppercase tracking-wider">
                  <svg className="w-3 h-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3" /></svg>
                  Offline Mode
                </div>
              </div>
              
              <div className="p-4 flex-1 bg-slate-50 space-y-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Client Notes</label>
                  <p className="text-sm text-slate-700 font-medium leading-tight mt-1">Water is turned off at main. Tank is located in the crawlspace.</p>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Required Equipment</label>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">Dolly</span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">Torch Kit</span>
                  </div>
                </div>

                <div className="pt-4 mt-auto">
                  <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Capture Final Photo
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Equip Your Field Technicians</h2>
            <p className="text-blue-100 mb-8 text-lg">
              The ultimate mobile companion for plumbers. Streamline communication between the dispatcher and the field, eliminating miscommunications and missed appointments.
            </p>
            
            <ul className="space-y-6">
              {[
                "Offline caching for basements and dead zones",
                "Direct navigation routing to the client's address",
                "Digital signature capture for estimates and approvals",
                "Instant photo uploads of completed work for liability protection"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-slate-300 font-medium">{item}</span>
                </li>
              ))}
            </ul>
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
    { q: "How does the dispatch board handle emergency plumbing calls?", a: "When an emergency call like a burst pipe comes in, our live GPS dispatch board allows you to instantly locate your nearest available plumber. You can dispatch the job directly to their mobile app with a single click." },
    { q: "Can plumbers access job details offline?", a: "Yes, we know plumbers often work in basements or areas with poor cellular reception. Our mobile app caches job details offline so technicians can view instructions and take notes, syncing automatically when they regain connection." },
    { q: "Does the software help manage on-call overtime?", a: "Absolutely. The platform automatically tracks regular hours versus emergency/on-call overtime, ensuring accurate payroll exports and preventing technician burnout through fair rotation management." },
    { q: "Can dispatchers see which equipment is on which truck?", a: "Yes, you can track specialized equipment (like drain snakes or jetters) and ensure jobs that require specific tools are only dispatched to trucks carrying that inventory." }
  ];

  return (
    <section className="py-24 bg-[#f4f7fa]">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-500">Everything you need to know about plumbing dispatch and scheduling.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="group bg-white rounded-xl border border-blue-100 open:border-blue-500 transition-colors shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between p-6 font-bold text-slate-800 select-none">
                {faq.q}
                <span className="relative ml-4 flex h-5 w-5 shrink-0 items-center justify-center text-blue-600">
                  <svg className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  <svg className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-600 leading-relaxed">
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
        <div className="rounded-[2rem] bg-gradient-to-br from-blue-700 to-indigo-900 px-8 py-16 text-center shadow-2xl shadow-blue-900/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-waves.png')] opacity-20 mix-blend-overlay"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Stop Leaking Time & Money.
            </h2>
            <p className="text-blue-100 text-lg mb-10">
              Join thousands of plumbing contractors who use StaffSchedule.io to streamline dispatching, track technicians, and grow their revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <button className="h-14 px-8 rounded-xl font-bold bg-white text-blue-800 hover:bg-blue-50 transition-all shadow-xl hover:-translate-y-1 w-full sm:w-auto">
                  Start Your Free Trial
                </button>
              </Link>
              <Link href="/demo">
                <button className="h-14 px-8 rounded-xl font-bold border border-blue-400 bg-blue-800/40 text-white hover:bg-blue-800/60 transition-all w-full sm:w-auto">
                  Schedule a Demo
                </button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-blue-200">No credit card required. 14-day free trial.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PlumbingPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fa] font-sans selection:bg-blue-200 selection:text-blue-900">
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
