"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  MapPin, Clock, Route, CheckCircle2, Star, ChevronDown,
  Smartphone, Truck, Navigation, Settings, Users, ArrowRight,
  ClipboardCheck, BarChart3, Map, ShieldCheck
} from "lucide-react";

// ─── SECTION: HERO (ROUTE ANIMATION) ──────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-24 pb-16">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-teal-500/20 rounded-full blur-[150px]"
        />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(13,148,136,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(13,148,136,0.8) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-bold text-xs tracking-wider uppercase mb-6"
            >
              <Navigation size={14} className="text-teal-600" />
              Intelligent Route Optimization
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6"
            >
              Dispatch Smarter. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600">
                Service Faster.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl"
            >
              Stop paying your technicians to sit in traffic. StaffSchedule.io automatically optimizes driving routes, manages drag-and-drop dispatching, and syncs job details straight to your technicians' phones.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link href="/demo">
                <button className="h-14 px-8 rounded-xl font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-xl shadow-teal-600/20 hover:-translate-y-0.5 transition-all w-full sm:w-auto text-sm tracking-wide">
                  Start Your Free Trial
                </button>
              </Link>
              <Link href="/pricing">
                <button className="h-14 px-8 rounded-xl font-bold border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all w-full sm:w-auto text-sm">
                  View Pricing
                </button>
              </Link>
            </motion.div>

            {/* Trust logos */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="pt-6 border-t border-slate-100"
            >
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Trusted by field service teams</p>
              <div className="flex flex-wrap items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                 <div className="text-xl font-black tracking-tighter text-slate-800">ServeCo</div>
                 <div className="text-xl font-black tracking-tighter text-slate-800">ProTech Field</div>
                 <div className="text-xl font-black tracking-tighter text-slate-800">QuickDispatch</div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Route Map Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
            className="relative"
          >
            <div className="bg-slate-50 rounded-[2rem] border-8 border-white shadow-2xl shadow-teal-900/10 overflow-hidden relative aspect-[4/3] flex flex-col">
              {/* Map header */}
              <div className="bg-white px-5 py-4 border-b border-slate-100 flex items-center justify-between z-10">
                <div>
                  <h3 className="font-bold text-slate-800">Zone 1: North District</h3>
                  <p className="text-xs text-slate-500">Technician: Dave Miller</p>
                </div>
                <div className="flex items-center gap-2 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-100">
                  <CheckCircle2 size={14} className="text-teal-600" />
                  <span className="text-teal-700 text-xs font-bold">Route Optimized</span>
                </div>
              </div>

              {/* Map background */}
              <div className="flex-1 relative bg-[#e5e5f7]" style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
                
                {/* SVG Route Line */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                  <motion.path
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                    d="M 80,80 C 150,60 200,180 280,120 S 350,220 400,160"
                    fill="none" stroke="#0d9488" strokeWidth="4" strokeDasharray="8 8" strokeLinecap="round"
                  />
                </svg>

                {/* Stops */}
                {[
                  { x: 80, y: 80, label: "Start", delay: 1, status: "done" },
                  { x: 280, y: 120, label: "Job 1", delay: 1.5, status: "current" },
                  { x: 400, y: 160, label: "Job 2", delay: 2, status: "pending" },
                ].map((stop, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: stop.delay, type: "spring" }}
                    className="absolute" style={{ left: stop.x, top: stop.y, zIndex: 2, transform: "translate(-50%, -50%)" }}
                  >
                    <div className={`relative flex items-center justify-center w-8 h-8 rounded-full shadow-lg border-2 border-white ${stop.status === 'done' ? 'bg-slate-400' : stop.status === 'current' ? 'bg-teal-600' : 'bg-white'}`}>
                      {stop.status === 'current' && <span className="absolute inline-flex w-full h-full rounded-full bg-teal-400 opacity-50 animate-ping" />}
                      <span className={`text-[10px] font-bold ${stop.status === 'pending' ? 'text-slate-600' : 'text-white'}`}>{i + 1}</span>
                    </div>
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-[10px] font-bold whitespace-nowrap">
                      {stop.label}
                    </div>
                  </motion.div>
                ))}

                {/* Floating truck icon moving along path */}
                <motion.div
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "50%" }}
                  transition={{ duration: 3, delay: 2.5, ease: "easeInOut" }}
                  style={{ offsetPath: "path('M 80,80 C 150,60 200,180 280,120 S 350,220 400,160')", position: "absolute", zIndex: 3 }}
                  className="w-10 h-10 bg-white rounded-full shadow-xl border-2 border-teal-500 flex items-center justify-center -ml-5 -mt-5"
                >
                  <Truck size={18} className="text-teal-600" />
                </motion.div>
              </div>

              {/* Bottom drawer */}
              <div className="bg-white border-t border-slate-100 p-4 z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Estimated Drive Time Saved</p>
                    <p className="text-xl font-black text-teal-600 mt-0.5">1h 14m</p>
                  </div>
                  <div className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-lg">
                    Send Route to App
                  </div>
                </div>
              </div>
            </div>

            {/* Stat bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.8, type: "spring" }}
              className="absolute -right-6 -bottom-6 bg-white border border-slate-100 p-4 rounded-xl shadow-xl z-20 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <ShieldCheck size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Fuel Costs</p>
                <p className="font-black text-lg text-slate-800">-18% avg</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: PAIN POINTS ─────────────────────────────────────────────────────
function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              className="text-teal-600 font-bold text-sm uppercase tracking-widest mb-3"
            >
              The Field Service Problem
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight"
            >
              Your Techs Are Wasting 2 Hours a Day on Logistics
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 leading-relaxed mb-8"
            >
              When dispatchers use whiteboards and technicians rely on paper work orders, inefficiencies multiply. A tech drives from the north side to the south side, only to realize their next job is back up north. That's windshield time you're paying for, but can't bill for.
            </motion.p>

            <ul className="space-y-5">
              {[
                { title: "Unoptimized routing", desc: "Technicians crisscrossing town wastes fuel and limits the number of jobs they can complete." },
                { title: "Lost paperwork", desc: "Sloppy handwriting, missing signatures, and lost invoices delay your cash flow." },
                { title: "Blind dispatching", desc: "Dispatchers guessing who is closest to an emergency call, leading to slow response times." }
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-red-600 font-bold">✕</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-base">{item.title}</h4>
                    <p className="text-slate-600 text-sm mt-1">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-3xl transform rotate-3 scale-105 opacity-20 blur-xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop" 
              alt="Field service technician looking at phone" 
              className="relative z-10 rounded-3xl shadow-2xl border-4 border-white object-cover aspect-square md:aspect-[4/3] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: BENTO FEATURE GRID ──────────────────────────────────────────────
function BentoFeatures() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Everything You Need to Run the Field</h2>
          <p className="text-slate-600 text-lg">A complete toolkit for dispatchers in the office and technicians in the truck.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 auto-rows-[280px]">
          
          {/* Card 1: Route Optimization (Large) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            className="md:col-span-2 bg-slate-900 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-end group border border-slate-800"
          >
            <div className="absolute top-0 right-0 w-full h-full opacity-30 group-hover:opacity-50 transition-opacity duration-700 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-500 via-transparent to-transparent"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center mb-6">
                <Route size={24} className="text-teal-400" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">1-Click Route Optimization</h3>
              <p className="text-slate-300 max-w-md">Select a technician's jobs for the day and let our algorithm sequence them for the shortest drive time. Save fuel, reduce wear and tear, and fit more jobs into the day.</p>
            </div>
          </motion.div>

          {/* Card 2: Mobile App (Tall) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            className="md:row-span-2 bg-[#f0f4ff] rounded-3xl p-8 border border-blue-100 flex flex-col items-center text-center group overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-6 shrink-0">
              <Smartphone size={24} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2 shrink-0">Tech Mobile App</h3>
            <p className="text-slate-600 text-sm mb-8 shrink-0">Turn-by-turn directions, job notes, and time tracking in their pocket.</p>
            
            <div className="flex-1 w-full bg-white rounded-t-3xl border-x border-t border-slate-200 shadow-xl p-4 mt-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 relative">
               <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4"></div>
               <div className="space-y-3">
                 <div className="h-10 bg-slate-50 rounded-lg border border-slate-100 flex items-center px-3 gap-2">
                   <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center"><CheckCircle2 size={12} className="text-teal-600"/></div>
                   <div className="h-2 w-24 bg-slate-200 rounded"></div>
                 </div>
                 <div className="h-10 bg-slate-50 rounded-lg border border-slate-100 flex items-center px-3 gap-2">
                   <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                   <div className="h-2 w-32 bg-slate-200 rounded"></div>
                 </div>
               </div>
            </div>
          </motion.div>

          {/* Card 3: Signatures */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
              <ClipboardCheck size={20} className="text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Digital Signatures</h3>
            <p className="text-slate-600 text-sm">Techs can capture customer signatures and photos on-site. Invoices are generated automatically.</p>
          </motion.div>

          {/* Card 4: Live Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-4">
              <Map size={20} className="text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Live GPS Tracking</h3>
            <p className="text-slate-600 text-sm">See exactly where your fleet is at any moment. Dispatch emergency calls to the closest truck.</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── SECTION: DISPATCH WORKFLOW ────────────────────────────────────────────────
function DispatchWorkflow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const steps = [
    { n: "01", title: "Job Created & Assigned", desc: "A new work order comes in. You drag and drop it onto a technician's schedule on the visual dispatch board." },
    { n: "02", title: "Route Optimized", desc: "Click the optimize button. The system reorders the technician's stops to minimize driving distance and avoid crossing town twice." },
    { n: "03", title: "Tech Notified on Mobile", desc: "The technician receives a push notification. They open the app, click 'Navigate', and get turn-by-turn directions to the site." },
    { n: "04", title: "Job Completed & Signed", desc: "On-site, the tech logs notes, takes photos, and gets a digital signature. The office sees the status change to 'Complete' instantly." }
  ];

  return (
    <section ref={ref} className="py-24 bg-teal-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-teal-800 to-teal-950 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-4xl md:text-5xl font-black mb-6 leading-tight"
            >
              The Perfect Dispatch Workflow
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}
              className="text-teal-100 text-lg mb-10"
            >
              Seamless communication between the office and the field. Every step is tracked, every route is optimized, and nothing falls through the cracks.
            </motion.p>
            
            <div className="space-y-8">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-teal-800 border border-teal-600 flex items-center justify-center font-bold shrink-0 mt-1">
                    {step.n}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-teal-200/80 leading-relaxed text-sm">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8 }}
            className="relative h-[600px] flex items-center justify-center bg-slate-900 rounded-3xl border-8 border-slate-800 shadow-2xl p-6"
          >
             {/* Abstract representation of the dispatch board */}
             <div className="w-full h-full border border-slate-700 rounded-xl p-4 flex flex-col">
               <div className="flex justify-between items-center border-b border-slate-700 pb-4 mb-4">
                 <div className="h-4 w-32 bg-slate-700 rounded"></div>
                 <div className="h-8 w-24 bg-teal-600 rounded-lg"></div>
               </div>
               
               <div className="flex-1 flex gap-4">
                 <div className="w-1/3 flex flex-col gap-3 border-r border-slate-700 pr-4">
                   <div className="h-2 w-16 bg-slate-600 rounded mb-2"></div>
                   {[1,2,3,4].map(i => (
                     <div key={i} className="bg-slate-800 h-16 rounded border border-slate-700 flex items-center px-3 cursor-grab hover:border-teal-500">
                        <div className="w-2 h-2 rounded-full bg-teal-400 mr-2"></div>
                        <div className="space-y-2 flex-1">
                          <div className="h-2 w-3/4 bg-slate-600 rounded"></div>
                          <div className="h-2 w-1/2 bg-slate-700 rounded"></div>
                        </div>
                     </div>
                   ))}
                 </div>
                 
                 <div className="flex-1 grid grid-cols-2 gap-4">
                   <div className="border border-slate-700 rounded-lg p-3">
                     <div className="flex items-center gap-2 border-b border-slate-700 pb-2 mb-3">
                       <div className="w-6 h-6 rounded-full bg-slate-600"></div>
                       <div className="h-3 w-20 bg-slate-600 rounded"></div>
                     </div>
                     <div className="bg-teal-900/30 border border-teal-800 h-20 rounded mb-2 p-2 relative">
                        <div className="absolute top-0 right-0 w-1 h-full bg-teal-500 rounded-r"></div>
                        <div className="h-2 w-1/2 bg-teal-600 rounded mb-1"></div>
                        <div className="h-2 w-1/3 bg-teal-700 rounded"></div>
                     </div>
                     <div className="bg-slate-800 h-16 rounded border border-slate-700 border-dashed flex items-center justify-center text-slate-600 text-xs font-bold">
                        Drop Job Here
                     </div>
                   </div>
                   <div className="border border-slate-700 rounded-lg p-3">
                     <div className="flex items-center gap-2 border-b border-slate-700 pb-2 mb-3">
                       <div className="w-6 h-6 rounded-full bg-slate-600"></div>
                       <div className="h-3 w-20 bg-slate-600 rounded"></div>
                     </div>
                     <div className="bg-slate-800 h-24 rounded mb-2"></div>
                   </div>
                 </div>
               </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: FAQ ──────────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const faqs = [
    {
      q: "Does the field service scheduling software include route optimization?",
      a: "Yes. StaffSchedule.io includes an intelligent routing engine. Once you assign multiple jobs to a technician for the day, you can click 'Optimize Route'. The system automatically sequences the jobs based on map coordinates to minimize driving time and fuel consumption."
    },
    {
      q: "Can my technicians see their schedules on their phones?",
      a: "Yes, every technician gets access to the StaffSchedule.io mobile app (available on iOS and Android). They can see their assigned jobs, view customer notes, get turn-by-turn navigation, and clock in/out directly from their device."
    },
    {
      q: "Does the app work if the technician loses cell service?",
      a: "Yes. The mobile app features offline caching. If a technician drives into a dead zone or works in a basement, they can still view their job details, take notes, and complete the job. The app automatically syncs all data back to the office once they regain a connection."
    },
    {
      q: "Can dispatchers see where the field technicians are?",
      a: "Yes. The dispatch board includes a live map view. When technicians are clocked in on the mobile app, dispatchers can see their current location and status (e.g., traveling, on-site). This makes it easy to assign emergency jobs to the closest available truck."
    },
    {
      q: "How does the software handle recurring service agreements?",
      a: "You can easily set up recurring jobs for maintenance contracts (e.g., weekly, monthly, quarterly). The system will automatically generate the work orders and place them on the schedule based on your predefined rules."
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <p className="text-slate-500 text-lg">Common questions about managing field teams with StaffSchedule.io.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.05 }}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${open === i ? "border-teal-500 shadow-lg shadow-teal-100" : "border-slate-200 hover:border-teal-300"}`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left flex items-center justify-between p-6 font-bold text-slate-800 text-sm md:text-base"
              >
                <span className="pr-4">{faq.q}</span>
                <ChevronDown size={18} className={`shrink-0 text-teal-600 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: CTA ─────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-indigo-900 p-12 md:p-16 text-center shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-waves.png')] opacity-10 mix-blend-overlay"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Ready to Optimize Your Operations?
            </h2>
            <p className="text-teal-100 text-lg mb-10 max-w-2xl mx-auto">
              Stop guessing where your techs are. Start dispatching smarter, driving less, and billing more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <button className="h-14 px-10 rounded-xl font-black bg-white text-teal-900 hover:bg-teal-50 transition-all shadow-xl hover:-translate-y-1 text-sm w-full sm:w-auto">
                  Start Free 14-Day Trial
                </button>
              </Link>
              <Link href="/demo">
                <button className="h-14 px-10 rounded-xl font-bold border-2 border-white/30 text-white hover:bg-white/10 transition-all w-full sm:w-auto text-sm">
                  Schedule a Demo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function FieldServicePage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <HeroSection />
      <ProblemSection />
      <BentoFeatures />
      <DispatchWorkflow />
      <FAQSection />
      <CTASection />
    </main>
  );
}
