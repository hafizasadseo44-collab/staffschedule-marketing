"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Clock } from "lucide-react";

export default function SchedulingHeroVisual() {
  return (
    <div className="relative group perspective-1000 h-full w-full flex items-center justify-center">
      <motion.div
        initial={{ rotateY: -5, rotateX: 2 }}
        animate={{ rotateY: 0, rotateX: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-full aspect-[4/3] sm:aspect-video rounded-[3rem] border border-border/50 shadow-2xl overflow-hidden group-hover:shadow-[0_20px_80px_-20px_rgba(79,70,229,0.3)] transition-all duration-700"
      >
        {/* 3D Isometric Background Render (HD Image from earlier prompt) */}
        <div className="absolute inset-0">
          <img 
            src="/images/isometric-scheduling-hero.jpg" 
            alt="3D Scheduling Interface" 
            className="w-full h-full object-cover relative z-0 scale-[1.02] group-hover:scale-100 transition-transform duration-1000" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent dark:from-brand-dark/80 dark:via-transparent z-10" />
        </div>

        {/* Floating Realistic UI Element 1: Scheduled Shift */}
        <motion.div
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[5%] shadow-blue-500/20 sm:top-[20%] sm:left-[10%] w-[240px] bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl border border-white/50 dark:border-slate-700/50 p-4 rounded-3xl shadow-2xl z-20"
        >
          <div className="flex items-center gap-3">
            <img src="https://i.pravatar.cc/100?img=33" alt="Sarah Jenkins" className="w-12 h-12 rounded-full shadow-md border-2 border-white" />
            <div>
              <div className="text-sm font-black text-brand-dark dark:text-white">Sarah Jenkins</div>
              <div className="text-xs font-bold text-brand-primary">Morning Barista</div>
            </div>
          </div>
          <div className="mt-3 bg-white/50 dark:bg-black/20 rounded-xl p-3 flex items-center justify-between border border-white/40 dark:border-slate-700/30">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5" /> 07:00 - 14:00
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          </div>
        </motion.div>

        {/* Floating Realistic UI Element 2: Quick Assignment */}
        <motion.div
          animate={{ y: [10, -10, 10], x: [-5, 5, -5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[10%] right-[5%] sm:right-[10%] bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl border border-white/50 dark:border-slate-700/50 p-5 rounded-3xl shadow-2xl shadow-indigo-500/20 z-20 flex items-center gap-4"
        >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center relative overflow-hidden shrink-0">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(79,70,229,1)_360deg)] opacity-20"
              />
              <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400 relative z-10" />
            </div>
            <div>
              <div className="text-sm font-black text-brand-dark dark:text-white">Auto-Schedule</div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Matching 24 shifts...</div>
            </div>
        </motion.div>
        
        {/* Floating Glass Metric */}
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[10%] right-[10%] sm:top-[15%] sm:right-[15%] bg-white/40 dark:bg-black/30 backdrop-blur-xl border border-white/40 rounded-2xl p-3 shadow-lg shadow-white/10 flex items-center gap-2 z-20"
        >
          <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
          <span className="text-[10px] font-black tracking-widest uppercase text-brand-dark dark:text-white">3D Render</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
