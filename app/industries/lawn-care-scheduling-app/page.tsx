"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion, useInView, AnimatePresence,
  type Variants, type Transition,
  useMotionValue, useTransform, useSpring as useMotionSpring
} from "framer-motion";

// ----------------------------------------------------------------------
// THEME CONSTANTS: "Lawn Care" - Emerald Green & Sunburst Orange
// ----------------------------------------------------------------------
const THEME = {
  primary: "from-emerald-500 to-green-600",
  secondary: "from-orange-400 to-amber-500",
  textBase: "text-slate-800",
  textMuted: "text-slate-500",
  bgBase: "bg-[#f8faf7]", // Very faint green tint
  cardBg: "bg-white",
  cardBorder: "border-emerald-100",
  accentText: "text-emerald-700",
  btnPrimary: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/25",
};

// ----------------------------------------------------------------------
// HERO COMPONENT: Route Optimization Map
// ----------------------------------------------------------------------
function HeroSection() {
  return (
    <section className={`relative min-h-[90vh] flex items-center justify-center overflow-hidden ${THEME.bgBase} pt-32 pb-20`}>
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-orange-100/30 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, -2, 2, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] -left-[20%] w-[60%] h-[60%] rounded-full bg-emerald-100/40 blur-[100px]"
        />
        {/* Topographic Lines Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/topography.png')" }}></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/60 border border-emerald-200 text-emerald-800 font-medium text-sm mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Intelligent Route Optimization
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]"
            >
              Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">Mowing Routes.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed max-w-xl"
            >
              Ditch the whiteboards. Automatically optimize driving routes, handle sudden rain delays in one click, and coordinate your landscaping crews effortlessly.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/signup">
                <button className={`h-14 px-8 rounded-xl font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 ${THEME.btnPrimary} w-full sm:w-auto`}>
                  Start Free Trial
                </button>
              </Link>
              <Link href="/demo">
                <button className="h-14 px-8 rounded-xl font-bold transition-all border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 w-full sm:w-auto">
                  See How It Works
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Interactive Visual: Route Optimization Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* Map Mockup Background */}
            <div className="absolute inset-4 rounded-3xl overflow-hidden shadow-2xl border border-emerald-100 bg-[#e8f4ed]">
              <div className="absolute inset-0 opacity-40 mix-blend-multiply" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cartographer.png')" }}></div>
              
              {/* Route Path SVG */}
              <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0px 4px 6px rgba(16, 185, 129, 0.3))' }}>
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
                  d="M100,100 C150,200 250,50 300,150 C350,250 150,350 200,450 C250,550 400,400 450,500" 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="4" 
                  strokeDasharray="8 8"
                />
              </svg>

              {/* Map Pins */}
              {[
                { x: "100px", y: "100px", status: "completed" },
                { x: "300px", y: "150px", status: "active" },
                { x: "200px", y: "450px", status: "pending" },
                { x: "450px", y: "500px", status: "pending" },
              ].map((pin, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + (i * 0.2), type: "spring" }}
                  className="absolute"
                  style={{ left: pin.x, top: pin.y, transform: "translate(-50%, -50%)" }}
                >
                  <div className={`w-6 h-6 rounded-full border-4 border-white shadow-lg ${pin.status === 'completed' ? 'bg-slate-400' : pin.status === 'active' ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                </motion.div>
              ))}
            </div>

            {/* Overlapping UI Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, type: "spring" }}
              className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Crew Alpha - North Route</h3>
                  <p className="text-emerald-600 font-medium text-sm">Optimization Active (Saved 42 mins)</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-2xl">☀️</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-4 h-4 rounded-full bg-slate-300"></div>
                  <span className="line-through text-sm font-medium">1. 402 Pine St (Mow & Trim)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative flex w-4 h-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full w-4 h-4 bg-orange-500"></span>
                  </div>
                  <span className="text-sm font-bold text-slate-800">2. 881 Oak Blvd (Fertilization) - Current</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                  <span className="text-sm font-medium text-slate-600">3. 102 Cedar Ln (Mow only)</span>
                </div>
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
      title: "One-Click Weather Delays",
      desc: "Rain washing out the day? Shift an entire route or crew's schedule to the next available day with a single button. Automatic texts alert your clients.",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    },
    {
      title: "Smart Route Optimization",
      desc: "Stop wasting gas driving back and forth. Our system automatically orders jobs geographically to minimize windshield time and maximize mowing time.",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    },
    {
      title: "Seasonal Crew Scaling",
      desc: "Easily manage the chaos of spring hiring. Onboard seasonal workers quickly, track their availability, and adjust crew sizes as the season demands.",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    }
  ];

  return (
    <section className="py-24 bg-white relative border-t border-emerald-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6">Built Specifically for Landscaping</h2>
          <p className="text-lg text-slate-500">
            You don't sit at a desk all day, and neither does your scheduling software. We built tools designed for the unpredictability of outdoor field service.
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
              className="p-8 rounded-2xl bg-[#f8faf7] border border-emerald-100 hover:shadow-xl hover:shadow-emerald-100/50 transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all">
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
// WORKFLOW / MOBILE SECTION
// ----------------------------------------------------------------------
function MobileSection() {
  return (
    <section className="py-24 bg-emerald-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-5 mix-blend-overlay"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-800/50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative">
            {/* Mobile App Stack */}
            <motion.div 
              initial={{ opacity: 0, rotate: -5, x: -30 }}
              whileInView={{ opacity: 1, rotate: 0, x: 0 }}
              viewport={{ once: true }}
              className="relative w-72 mx-auto"
            >
              <div className="absolute inset-0 bg-orange-500 rounded-[2rem] transform rotate-6 translate-x-4 translate-y-4 opacity-50 blur-sm"></div>
              <div className="relative bg-white rounded-[2rem] shadow-2xl border-[8px] border-emerald-950 overflow-hidden h-[550px] flex flex-col font-sans">
                {/* App Header */}
                <div className="bg-emerald-600 p-6 text-white pb-10 rounded-b-3xl">
                  <h3 className="font-bold text-xl mb-1">Today's Route</h3>
                  <p className="text-emerald-200 text-sm">4 Stops Remaining</p>
                </div>
                {/* App Content */}
                <div className="p-4 flex-1 -mt-6">
                  <div className="bg-white rounded-xl shadow-lg p-4 border border-slate-100 mb-4 text-slate-800">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-sm text-orange-600 uppercase tracking-wide">Next Stop</span>
                      <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-1 rounded">2.4 mi</span>
                    </div>
                    <h4 className="font-bold text-lg leading-tight mb-1">Greenwood Estate</h4>
                    <p className="text-sm text-slate-500 mb-4">Mow, Edge, Blow</p>
                    <button className="w-full bg-emerald-500 text-white py-2.5 rounded-lg font-bold text-sm shadow-md">
                      Get Directions
                    </button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Smith Yard", s: "Fertilizer" },
                      { name: "Oak Park", s: "Cleanup" }
                    ].map((item, i) => (
                      <div key={i} className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-slate-800 flex justify-between items-center">
                        <div>
                          <p className="font-bold text-sm">{item.name}</p>
                          <p className="text-xs text-slate-500">{item.s}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Empower Your Crews in the Field</h2>
            <p className="text-emerald-100 text-lg mb-8">
              Give your crews a simple mobile app that shows exactly where to go, what equipment they need, and what services the client paid for.
            </p>
            
            <ul className="space-y-6">
              {[
                "Turn-by-turn routing directly to the next property",
                "Digital capture of chemical application logs for compliance",
                "Clock in/out on-site with GPS verification",
                "Upload photos of completed yards for client disputes"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-lg text-emerald-50">{item}</span>
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
    { q: "How does this app handle rain delays and weather cancellations?", a: "When bad weather hits, you can pause entire routes or shift an entire day's schedule to the next available slot with a single click. The system automatically notifies your crews and updates the route plan." },
    { q: "Can I optimize driving routes for my landscaping crews?", a: "Yes, our intelligent route optimization engine automatically sequences jobs based on geographic location, minimizing drive time and reducing fuel costs for your trucks." },
    { q: "How do we manage recurring weekly or bi-weekly mows?", a: "You can easily set up recurring templates for specific client properties. Whether it's a weekly mow or a seasonal fertilization treatment, the system automatically populates the schedule." },
    { q: "Does the crew app work if they lose cell service?", a: "Yes, the mobile app caches their daily route. They can still view job details and mark tasks complete. Data syncs automatically once they regain an internet connection." }
  ];

  return (
    <section className="py-24 bg-[#f8faf7]">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-500">Answers to common questions from lawn care owners.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="group bg-white rounded-xl border border-emerald-100 open:border-emerald-400 transition-colors shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-slate-800 select-none">
                {faq.q}
                <span className="relative ml-4 flex h-5 w-5 shrink-0 items-center justify-center text-emerald-600">
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
        <div className="rounded-[2.5rem] bg-gradient-to-br from-emerald-600 to-green-800 px-8 py-16 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/leaves-pattern.png')] mix-blend-overlay"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Grow Your Landscaping Business.
            </h2>
            <p className="text-emerald-100 text-lg mb-10">
              Stop spending your evenings building routes. Let StaffSchedule.io automate your scheduling so you can focus on scaling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <button className="h-14 px-8 rounded-xl font-bold bg-white text-emerald-700 hover:bg-emerald-50 transition-all shadow-xl hover:-translate-y-1 w-full sm:w-auto">
                  Start Your Free Trial
                </button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-emerald-200">14-day free trial. Setup takes 5 minutes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LawnCarePage() {
  return (
    <main className="min-h-screen bg-[#f8faf7] font-sans selection:bg-emerald-200 selection:text-emerald-900">
      <HeroSection />
      <FeaturesSection />
      <MobileSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
