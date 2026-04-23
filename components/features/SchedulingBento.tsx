"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, RefreshCw, ShieldCheck, Smartphone, CheckCircle2, Copy } from "lucide-react";

export default function SchedulingBento() {
  return (
    <section className="py-24 lg:py-32 bg-slate-50 dark:bg-brand-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6"
          >
            The Toolbox
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight"
          >
            Every tool you need to <span className="text-brand-primary block mt-2">lead with precision.</span>
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-lg text-brand-slate dark:text-slate-400 font-medium"
          >
            We didn't just build a calendar. We built an operational engine heavily automated by AI to cut hours off your work week.
          </motion.p>
        </div>

        {/* 3x3 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[320px]">
          
          {/* 1. AI Auto-Schedule (Wide, Row 1, Col 1-2) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-brand-primary rounded-[2.5rem] p-6 lg:p-8 relative overflow-hidden group shadow-xl flex flex-col justify-center"
          >
             <div className="relative z-10 w-full sm:w-2/3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center text-white mb-4 lg:mb-6 backdrop-blur-md">
                   <Zap className="w-5 h-5 lg:w-6 lg:h-6 fill-white" />
                </div>
                <h3 className="text-xl lg:text-2xl font-black text-white mb-2 lg:mb-3">AI Auto-Schedule</h3>
                <p className="text-indigo-100 font-medium text-sm sm:text-base leading-relaxed">Our AI analyzes staff availability, seniority, and skill requirements to automatically build the perfect weekly pattern in seconds.</p>
             </div>
             
             {/* Animated Internal UI */}
             <div className="hidden sm:flex absolute right-0 top-0 bottom-0 w-1/3 min-w-[200px] items-center justify-center">
                <div className="translate-x-12 rotate-[-5deg] group-hover:rotate-0 group-hover:translate-x-8 transition-transform duration-700 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-3xl w-[250px] shadow-2xl flex flex-col gap-3">
                   {[...Array(4)].map((_, i) => (
                      <motion.div 
                         key={i}
                         initial={{ x: 50, opacity: 0 }}
                         animate={{ x: 0, opacity: 1 }}
                         transition={{ delay: i * 0.2, repeat: Infinity, repeatType: "reverse", duration: 2, repeatDelay: 3 }}
                         className="h-8 lg:h-10 bg-white/20 rounded-xl w-full flex items-center px-3 gap-3 border border-white/10"
                      >
                         <div className="w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-emerald-400" />
                         <div className="flex-1 h-2 lg:h-3 bg-white/30 rounded-full" />
                      </motion.div>
                   ))}
                </div>
             </div>
          </motion.div>

          {/* 2. Self-Service Swaps (Square, Row 1, Col 3) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="col-span-1 row-span-1 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-border shadow-xl p-6 lg:p-8 relative overflow-hidden group flex flex-col"
          >
             <div className="flex-1 relative flex items-center justify-center min-h-[100px]">
                <div className="relative w-28 h-14">
                   <motion.div animate={{ x: [0, 40, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute left-0 top-0 w-14 h-14 rounded-full border-4 border-white dark:border-brand-dark bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center z-20 shadow-lg">
                      <img src="https://i.pravatar.cc/100?img=1" className="w-full h-full rounded-full object-cover" />
                   </motion.div>
                   <motion.div animate={{ x: [0, -40, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute right-0 top-0 w-14 h-14 rounded-full border-4 border-white dark:border-brand-dark bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center z-10 shadow-lg">
                      <img src="https://i.pravatar.cc/100?img=2" className="w-full h-full rounded-full object-cover" />
                   </motion.div>
                </div>
             </div>
             <div className="relative z-10 mt-auto">
                <h3 className="text-lg lg:text-xl font-black text-brand-dark dark:text-white mb-2">Self-Service Swaps</h3>
                <p className="text-xs sm:text-sm font-bold text-brand-slate dark:text-slate-400 line-clamp-3">Staff handle their own swap requests locally. You just tap to approve.</p>
             </div>
          </motion.div>

          {/* 3. Smart Conflict Detection (Square, Row 2, Col 1) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="col-span-1 row-span-1 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-border shadow-xl p-6 lg:p-8 relative overflow-hidden group flex flex-col"
          >
             <div className="flex-1 flex items-center justify-center min-h-[100px]">
                <motion.div 
                   animate={{ scale: [1, 1.1, 1], borderColor: ['rgba(244,63,94,0.5)', 'rgba(16,185,129,0.5)', 'rgba(244,63,94,0.5)'], backgroundColor: ['rgba(244,63,94,0.1)', 'rgba(16,185,129,0.1)', 'rgba(244,63,94,0.1)'] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-4 flex items-center justify-center relative shadow-inner"
                >
                   <ShieldCheck className="w-8 h-8 text-brand-dark dark:text-white" />
                   <motion.div 
                      animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-emerald-500/20"
                   />
                </motion.div>
             </div>
             <div className="relative z-10 mt-auto">
                <h3 className="text-lg lg:text-xl font-black text-brand-dark dark:text-white mb-2">Pattern Conflicts</h3>
                <p className="text-xs sm:text-sm font-bold text-brand-slate dark:text-slate-400 line-clamp-3">Instantly flags double-bookings or overlapping leave requests.</p>
             </div>
          </motion.div>

          {/* 4. Instant Mobile Publish (Square, Row 2, Col 2) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="col-span-1 row-span-1 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] border border-border shadow-xl p-6 lg:p-8 relative overflow-hidden group flex flex-col"
          >
             <div className="absolute top-[-20%] right-[-10%] w-48 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all" />
             <div className="flex-1 relative flex items-start justify-center min-h-[120px] pt-4">
                <div className="w-28 h-32 bg-white dark:bg-slate-900 rounded-t-3xl border-x-4 border-t-4 border-slate-300 dark:border-slate-700 shadow-2xl relative overflow-hidden translate-y-2 group-hover:translate-y-0 transition-transform duration-500 p-2">
                   <div className="w-8 h-1 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-3" />
                   <motion.div 
                      initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, repeat: Infinity, duration: 3, repeatDelay: 1 }}
                      className="bg-brand-primary p-2 flex items-center gap-2 rounded-lg text-white shadow-lg shadow-brand-primary/40"
                   >
                      <div className="w-5 h-5 rounded bg-white/20 flex flex-center text-[8px] items-center justify-center font-black">NEW</div>
                      <div className="text-[9px] font-bold">Shift Published</div>
                   </motion.div>
                </div>
             </div>
             <div className="relative z-10 mt-auto">
                <h3 className="text-lg lg:text-xl font-black text-brand-dark dark:text-white mb-2">Mobile Publishing</h3>
                <p className="text-xs sm:text-sm font-bold text-brand-slate dark:text-slate-400 line-clamp-3">Publish from anywhere. Staff are notified immediately.</p>
             </div>
          </motion.div>

          {/* 5. Live Coverage Tracking (Tall, Row 2-3, Col 3) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="col-span-1 lg:row-span-2 bg-brand-dark rounded-[2.5rem] p-6 lg:p-8 relative overflow-hidden shadow-2xl flex flex-col group border border-slate-800"
          >
             <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 rounded-xl lg:rounded-2xl flex items-center justify-center text-white mb-4 lg:mb-6">
                <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-400" />
             </div>
             <div className="relative z-10 mb-6 lg:mb-8">
                <h3 className="text-xl lg:text-2xl font-black text-white mb-2 lg:mb-3">Live Tracking</h3>
                <p className="text-slate-400 font-medium text-xs sm:text-sm leading-relaxed">Ensure you never understaff a busy shift. Track coverage graphs in real-time.</p>
             </div>
             
             {/* Animated Coverage Bars */}
             <div className="flex-1 mt-auto flex items-end justify-center gap-2 md:gap-4 min-h-[100px]">
                {[50, 80, 40, 100, 70].map((h, i) => (
                   <div key={i} className="w-8 lg:w-10 bg-slate-800 rounded-t-xl h-full flex items-end relative overflow-hidden group-hover:bg-slate-700 transition-colors">
                      <motion.div 
                         initial={{ height: "0%" }}
                         animate={{ height: `${h}%` }}
                         transition={{ duration: 2, delay: i * 0.1, ease: "easeOut" }}
                         className={`w-full rounded-t-lg ${h < 50 ? 'bg-rose-500' : h >= 100 ? 'bg-emerald-500' : 'bg-brand-primary'} relative`}
                      >
                         <div className="absolute top-0 w-full h-1 bg-white/30" />
                      </motion.div>
                   </div>
                ))}
             </div>
          </motion.div>

          {/* 6. Reusable Templates (Wide, Row 3, Col 1-2) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="col-span-1 md:col-span-2 row-span-1 bg-slate-50 dark:bg-slate-900 border border-border rounded-[2.5rem] p-6 lg:p-8 relative overflow-hidden group flex flex-col sm:flex-row items-center gap-6 lg:gap-8 shadow-xl"
          >
             <div className="flex-1 relative z-10 w-full">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl lg:rounded-2xl flex items-center justify-center text-brand-primary mb-4 lg:mb-6">
                   <Copy className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <h3 className="text-xl lg:text-2xl font-black text-brand-dark dark:text-white mb-2 lg:mb-3">Save as Templates</h3>
                <p className="text-brand-slate dark:text-slate-400 text-xs sm:text-sm font-bold max-w-sm line-clamp-3">Save your perfectly optimized weeks as master templates and deploy them across all locations.</p>
             </div>
             
             {/* Animated Stamp Effect */}
             <div className="hidden sm:flex flex-1 relative items-center justify-center min-h-[120px]">
                <motion.div 
                   animate={{ scale: [1.2, 0.9, 1], opacity: [0, 1, 1, 0] }}
                   transition={{ duration: 3, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
                   className="absolute border-4 lg:border-[6px] border-emerald-500/80 rounded-xl lg:rounded-2xl p-2 lg:p-4 rotate-[-12deg]"
                >
                   <div className="text-emerald-500/80 font-black text-xl lg:text-3xl tracking-widest uppercase">Copied</div>
                </motion.div>
                <div className="grid grid-cols-3 grid-rows-3 gap-1 lg:gap-2 w-24 h-24 lg:w-32 lg:h-32 opacity-20">
                   {[...Array(9)].map((_, i) => (
                      <div key={i} className="bg-brand-dark dark:bg-white rounded-sm lg:rounded-md" />
                   ))}
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
