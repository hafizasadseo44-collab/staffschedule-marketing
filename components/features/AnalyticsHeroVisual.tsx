"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingDown, Coins, Target } from "lucide-react";

export default function AnalyticsHeroVisual() {
  return (
    <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] border border-border shadow-2xl overflow-hidden p-6 aspect-square sm:aspect-[4/3] flex flex-col justify-between group">
      
      {/* KPI Header */}
      <div className="flex justify-between items-start mb-6">
         <div>
            <div className="text-[10px] font-black text-brand-slate uppercase tracking-widest mb-1">Total Labor Spend</div>
            <div className="flex items-baseline gap-2">
               <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="text-3xl font-black text-brand-dark dark:text-white"
               >
                  $8,420.50
               </motion.div>
               <div className="px-2 py-0.5 rounded text-[10px] font-black tracking-wider bg-emerald-100 text-emerald-600 flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" /> 12%
               </div>
            </div>
         </div>
         <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
            <Coins className="w-5 h-5 text-brand-primary" />
         </div>
      </div>

      {/* Animated SVG Chart */}
      <div className="flex-1 w-full relative mt-4 border-b border-l border-slate-200 dark:border-slate-800 flex items-end">
         
         {/* Y-Axis Labels */}
         <div className="absolute -left-10 top-0 bottom-0 flex flex-col justify-between text-[8px] font-bold text-slate-400 py-2">
            <span>$10k</span>
            <span>$8k</span>
            <span>$6k</span>
            <span>$4k</span>
            <span>0</span>
         </div>

         {/* Chart Area */}
         <div className="w-full h-full relative overflow-hidden px-2">
            {/* Grid lines */}
            {[1, 2, 3, 4].map(i => (
               <div key={i} className="absolute left-0 right-0 h-px bg-slate-100 dark:bg-slate-800/50" style={{ top: `${i * 25}%` }} />
            ))}

            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pb-[1px] pl-[1px]">
               {/* Budget Line (Red/Dashed) */}
               <path 
                  d="M0,80 L20,70 L40,65 L60,50 L80,55 L100,45"
                  fill="none" 
                  stroke="#ef4444" 
                  strokeWidth="2" 
                  strokeDasharray="4"
                  className="opacity-50"
               />
               
               {/* Actual Spend Line (Emerald/Solid) */}
               <motion.path 
                  d="M0,85 L20,75 L40,60 L60,40 L80,25 L100,20"
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
               />

               {/* Fill beneath Actual Spend */}
               <motion.path 
                  d="M0,85 L20,75 L40,60 L60,40 L80,25 L100,20 L100,100 L0,100 Z"
                  fill="url(#chart-gradient)" 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2.2 }}
               />

               <defs>
                  <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                     <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
               </defs>
            </svg>
            
            {/* Target Marker */}
            <motion.div 
               initial={{ opacity: 0, scale: 0 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5, type: "spring", delay: 2 }}
               className="absolute right-0 top-[20%] -translate-x-1/2 -translate-y-1/2"
            >
               <div className="bg-emerald-500 rounded p-1 shadow-lg shadow-emerald-500/50">
                  <Target className="w-3 h-3 text-white" />
               </div>
               <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                  Beat target
               </div>
            </motion.div>
         </div>

      </div>

      {/* X-Axis Labels */}
      <div className="w-full flex justify-between px-2 pt-2 text-[8px] font-bold text-slate-400">
         <span>Mon</span>
         <span>Tue</span>
         <span>Wed</span>
         <span>Thu</span>
         <span>Fri</span>
         <span>Sat</span>
      </div>

    </div>
  );
}
