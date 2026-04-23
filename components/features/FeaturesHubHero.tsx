"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Rocket, ShieldCheck, Zap } from "lucide-react";

export default function FeaturesHubHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50 dark:bg-brand-dark">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-secondary/5 rounded-full blur-[120px] pointer-events-none translate-y-1/4 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-black text-xs uppercase tracking-[0.2em] mb-8"
          >
            <Rocket className="w-4 h-4" /> The Full Ecosystem
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-dark dark:text-white mb-8 tracking-tighter leading-[0.95]"
          >
            One Platform. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-indigo-500 to-brand-secondary">
              Infinite Possibilities.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-brand-slate dark:text-slate-400 font-medium max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Stop juggling 5 different apps to run your workforce. StaffSchedule.io is the modular, high-performance operating system built for modern teams.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6"
          >
             <a 
                href="https://app.staffschedule.io/signup.php" 
                className="px-10 py-5 bg-brand-dark dark:bg-brand-primary text-white rounded-2xl font-black text-lg shadow-2xl flex items-center gap-3 hover:scale-105 transition-all"
             >
                Start for Free <Zap className="w-5 h-5 fill-white" />
             </a>
             <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-border shadow-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-bold text-brand-dark dark:text-white">Rated 4.9/5 by 1,000+ Managers</span>
             </div>
          </motion.div>

        </div>
      </div>

      {/* Decorative Grid Pulse */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none">
         <svg width="100%" height="100%">
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
               <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
         </svg>
      </div>

    </section>
  );
}
