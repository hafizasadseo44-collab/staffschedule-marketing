"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, CheckCircle2 } from "lucide-react";

export default function AttendanceHeroVisual() {
  return (
    <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] border border-border shadow-2xl overflow-hidden p-8 aspect-square sm:aspect-video flex items-center justify-center group">
      {/* Background Map Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#4F46E5 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
      </div>

      {/* Radar Ping Animation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <motion.div 
           animate={{ scale: [1, 3], opacity: [0.5, 0] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
           className="absolute w-40 h-40 rounded-full border-2 border-brand-primary bg-brand-primary/10"
        />
        <motion.div 
           animate={{ scale: [1, 2], opacity: [0.8, 0] }}
           transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "easeOut" }}
           className="absolute w-24 h-24 rounded-full border border-emerald-400 bg-emerald-400/20"
        />
        
        {/* Core Map Pin Core */}
        <div className="relative z-10 w-16 h-16 bg-white dark:bg-brand-dark rounded-full shadow-2xl flex items-center justify-center border-4 border-emerald-500">
           <MapPin className="w-6 h-6 text-emerald-500" />
        </div>
      </div>

      {/* Mock Phone UI Overlay */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-6 right-6 sm:bottom-12 sm:right-12 w-[240px] bg-white dark:bg-brand-dark rounded-[2rem] shadow-2xl border-4 border-slate-100 dark:border-slate-800 p-4"
      >
        <div className="w-12 h-1 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-6" />
        <div className="text-center mb-6">
           <div className="text-3xl font-black text-brand-dark dark:text-white tracking-tighter mb-1">
             <Clock className="w-5 h-5 inline-block mr-2 text-brand-primary -mt-1" />
             08:59 <span className="text-base text-slate-400">AM</span>
           </div>
           <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Front Desk Shift</div>
        </div>
        
        <motion.div 
          animate={{ scale: [1, 0.98, 1], backgroundColor: ['#10B981', '#059669', '#10B981'] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-full h-12 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-emerald-500/40 relative overflow-hidden cursor-pointer"
        >
           <motion.div 
              animate={{ x: [-100, 300] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="absolute top-0 bottom-0 left-0 w-8 bg-white/20 skew-x-12"
           />
           Clock In
        </motion.div>
      </motion.div>

      {/* Floating Success Badge */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute top-8 left-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-border"
      >
         <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
         </div>
         <div>
            <div className="text-sm font-black text-brand-dark dark:text-white leading-none mb-1">Sarah J. Clocked In</div>
            <div className="text-[10px] font-bold text-brand-slate uppercase tracking-wider">Location Verified</div>
         </div>
      </motion.div>
    </div>
  );
}
