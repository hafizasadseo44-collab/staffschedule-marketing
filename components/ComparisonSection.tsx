"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Building2, Store, Users, Zap, TrendingDown, Activity, Sparkles, ShieldCheck, MousePointer2 } from "lucide-react";

const COMPARISONS = [
  {
    id: 1,
    feature: "Scheduling Speed",
    legacy: "Hours of manual spreadsheet entry",
    staffschedule: "Under 2 minutes with AI-Assist",
    legacyIcon: <MousePointer2 className="w-5 h-5" />,
    ssIcon: <Zap className="w-5 h-5" />,
    legacyColor: "text-red-400",
    ssColor: "text-indigo-600",
    desc: "Our AI engine analyzes availability, seniority, and labor laws to suggest the perfect schedule instantly."
  },
  {
    id: 2,
    feature: "Communication",
    legacy: "Fragmented (WhatsApp, SMS, Phone)",
    staffschedule: "Centralized Real-time Chat",
    legacyIcon: <Users className="w-5 h-5" />,
    ssIcon: <Activity className="w-5 h-5" />,
    legacyColor: "text-orange-400",
    ssColor: "text-purple-600",
    desc: "Keep work and life separate. Built-in chat keeps all team communication in one secure place."
  },
  {
    id: 3,
    feature: "Accuracy & Errors",
    legacy: "Prone to human error & conflicts",
    staffschedule: "AI-Verified Error-Free Shifts",
    legacyIcon: <X className="w-5 h-5" />,
    ssIcon: <ShieldCheck className="w-5 h-5" />,
    legacyColor: "text-rose-400",
    ssColor: "text-emerald-600",
    desc: "Automatically detects double-bookings, overtime violations, and qualification mismatches."
  },
  {
    id: 4,
    feature: "Labor Intelligence",
    legacy: "Spreadsheet guesswork",
    staffschedule: "Real-time Labor Forecasting",
    legacyIcon: <TrendingDown className="w-5 h-5" />,
    ssIcon: <TrendingDown className="w-5 h-5 rotate-180" />,
    legacyColor: "text-slate-400",
    ssColor: "text-sky-600",
    desc: "See exactly how much you're spending on labor before the week even starts. Optimize for ROI."
  },
];

export default function ComparisonSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-36 bg-white overflow-hidden relative font-sans">
      {/* Soft Mesh Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.4]">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] mb-8 border border-slate-800 shadow-xl"
          >
            <Sparkles size={12} className="text-yellow-400" /> The Competitive Edge
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.95]"
          >
            The difference is <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 italic">Day & Night.</span>
          </motion.h2>
          
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Legacy tools were built for the 90s. StaffSchedule.io was built for the <span className="text-slate-900 font-black">future of work</span>.
          </p>
        </div>

        {/* Interactive Comparison Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Legacy Side Pain Points */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50/50 rounded-[3rem] p-10 lg:p-16 border border-slate-100 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-600 font-black text-[10px] uppercase tracking-widest mb-12 border border-red-100">
              <X size={12} /> Legacy Methods
            </div>
            
            <div className="space-y-12">
              {COMPARISONS.map((c) => (
                <div 
                  key={c.id}
                  onMouseEnter={() => setHoveredId(c.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`group transition-all duration-300 ${hoveredId !== null && hoveredId !== c.id ? 'opacity-30 blur-[2px]' : 'opacity-100'}`}
                >
                  <div className="flex items-center gap-6 mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center ${c.legacyColor}`}>
                      {c.legacyIcon}
                    </div>
                    <h3 className="text-xl font-black text-slate-400 group-hover:text-red-500 transition-colors">{c.feature}</h3>
                  </div>
                  <p className="text-lg text-slate-400 font-bold ml-[4.5rem]">
                    {c.legacy}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* StaffSchedule.io Premium Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[3rem] p-10 lg:p-16 border border-indigo-100 shadow-[0_32px_80px_-20px_rgba(79,70,229,0.1)] relative overflow-hidden flex flex-col justify-center"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-50/50 to-transparent opacity-50 pointer-events-none" />
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest mb-12 border border-indigo-500 shadow-lg shadow-indigo-500/20 relative z-10">
              <Check size={12} strokeWidth={4} /> StaffSchedule.io
            </div>
            
            <div className="space-y-12 relative z-10">
              {COMPARISONS.map((c) => (
                <div 
                  key={c.id}
                  onMouseEnter={() => setHoveredId(c.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`group transition-all duration-300 ${hoveredId !== null && hoveredId !== c.id ? 'opacity-30 blur-[2px]' : 'opacity-100'}`}
                >
                  <div className="flex items-center gap-6 mb-4">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-white to-slate-50 shadow-md border border-slate-100 flex items-center justify-center ${c.ssColor}`}
                    >
                      {c.ssIcon}
                    </motion.div>
                    <h3 className="text-2xl font-black text-slate-900">{c.feature}</h3>
                  </div>
                  <div className="ml-[5rem]">
                    <p className={`text-xl font-black mb-3 ${c.ssColor}`}>
                      {c.staffschedule}
                    </p>
                    
                    <AnimatePresence>
                      {hoveredId === c.id && (
                        <motion.p
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -10 }}
                          className="text-slate-500 font-medium text-base leading-relaxed overflow-hidden"
                        >
                          {c.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Footer Statistics */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
           {[
             { label: "Onboarding", value: "Instant" },
             { label: "Cost Saving", value: "35% Avg" },
             { label: "Accuracy", value: "99.9%" },
             { label: "Support", value: "24/7 Live" }
           ].map((stat, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="text-center"
             >
               <div className="text-3xl font-black text-slate-900 mb-2">{stat.value}</div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
             </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
}
