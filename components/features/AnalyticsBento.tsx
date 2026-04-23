"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gauge, Download, RotateCcw, TrendingUp, DollarSign, Clock } from "lucide-react";

export default function AnalyticsBento() {
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
            Financial Insights
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight"
          >
            See where every <br />
            <span className="text-brand-primary">dime is spent.</span>
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-lg text-brand-slate dark:text-slate-400 font-medium"
          >
            Stop guessing your margins. View live labor costs, export to payroll, and prevent overtime before it happens.
          </motion.p>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[320px]">
          
          {/* 1. Overtime Prevention (Wide, Row 1, Col 1-2) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 lg:p-8 relative overflow-hidden group shadow-xl flex flex-col justify-center border border-border"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl" />
             
             <div className="relative z-10 w-full sm:w-1/2">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-rose-100 dark:bg-rose-900/30 rounded-xl lg:rounded-2xl flex items-center justify-center text-rose-500 mb-4 lg:mb-6">
                   <Clock className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <h3 className="text-xl lg:text-2xl font-black text-brand-dark dark:text-white mb-2 lg:mb-3">Overtime Prevention</h3>
                <p className="text-brand-slate dark:text-slate-400 font-medium text-sm sm:text-base leading-relaxed">The system automatically flags employees who are approaching their 40-hour limit, giving you time to swap their shift.</p>
             </div>
             
             {/* Animated Gauge Component */}
             <div className="hidden sm:flex absolute right-4 lg:right-12 inset-y-0 w-1/2 items-center justify-center">
                <div className="relative w-48 h-48 bg-slate-50 dark:bg-slate-800 rounded-full shadow-inner border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
                   
                   {/* Progress Ring */}
                   <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" strokeWidth="6" className="stroke-slate-200 dark:stroke-slate-700" strokeDasharray="283" strokeDashoffset="0" />
                      <motion.circle 
                         cx="50" cy="50" r="45" fill="none" strokeWidth="6" strokeLinecap="round" className="stroke-rose-500"
                         strokeDasharray="283"
                         initial={{ strokeDashoffset: 283 }}
                         animate={{ strokeDashoffset: 283 - (283 * 0.95) }} // 95% full
                         transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                      />
                   </svg>
                   
                   <Gauge className="w-6 h-6 text-rose-500 mb-1" />
                   <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2 }}
                      className="text-4xl font-black text-brand-dark dark:text-white tracking-tighter"
                   >
                      39.5
                   </motion.div>
                   <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Hours Logged</div>
                   
                   {/* Warning Pill */}
                   <motion.div 
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -bottom-3 bg-rose-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg shadow-rose-500/40"
                   >
                      OT RISK ⚠️
                   </motion.div>
                </div>
             </div>
          </motion.div>

          {/* 2. Labor % of Sales (Square, Row 1, Col 3) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="col-span-1 row-span-1 bg-brand-primary rounded-[2.5rem] border border-brand-primary shadow-xl p-6 lg:p-8 relative overflow-hidden group flex flex-col"
          >
             <div className="flex-1 relative flex items-center justify-center min-h-[120px]">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-inner text-center">
                   <div className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Labor vs Sales</div>
                   <motion.div 
                       initial={{ opacity: 0, scale: 0.5 }}
                       animate={{ opacity: 1, scale: 1 }}
                       transition={{ type: "spring", bounce: 0.5, delay: 0.5 }}
                       className="text-5xl font-black text-white"
                   >
                      18%
                   </motion.div>
                </div>
             </div>
             <div className="relative z-10 mt-auto">
                <h3 className="text-lg lg:text-xl font-black text-white mb-2">Labor Percentages</h3>
                <p className="text-xs sm:text-sm font-medium text-indigo-100 line-clamp-3">Automatically calculate your labor burden against projected revenue in real-time.</p>
             </div>
          </motion.div>

          {/* 3. Payroll Export (Square, Row 2, Col 1) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="col-span-1 row-span-1 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-border shadow-xl p-6 lg:p-8 relative overflow-hidden group flex flex-col"
          >
             <div className="flex-1 flex items-center justify-center min-h-[100px]">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-[1.5rem] bg-emerald-100 dark:bg-emerald-900/30 border-4 border-emerald-200 dark:border-emerald-800 flex items-center justify-center relative shadow-lg">
                   <motion.div 
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                   >
                      <Download className="w-8 h-8 text-emerald-500" />
                   </motion.div>
                   <div className="absolute -bottom-2 bg-emerald-500 rounded text-white text-[8px] font-black px-1 shadow">.CSV</div>
                </div>
             </div>
             <div className="relative z-10 mt-auto">
                <h3 className="text-lg lg:text-xl font-black text-brand-dark dark:text-white mb-2">1-Click Export</h3>
                <p className="text-xs sm:text-sm font-bold text-brand-slate dark:text-slate-400 line-clamp-3">Download approved timesheets tailored directly for your specific payroll provider.</p>
             </div>
          </motion.div>

          {/* 4. Live Tracking (Wide, Row 2, Col 2-3) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] border border-border shadow-xl p-6 lg:p-8 relative overflow-hidden group flex flex-col justify-center"
          >
             <div className="relative z-10 w-full sm:w-1/2 min-h-[120px]">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white dark:bg-slate-900 rounded-xl lg:rounded-2xl flex items-center justify-center text-slate-800 dark:text-slate-200 mb-4 lg:mb-6 shadow">
                   <RotateCcw className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <h3 className="text-lg lg:text-xl font-black text-brand-dark dark:text-white mb-2">Real-Time Refresh</h3>
                <p className="text-xs sm:text-sm font-bold text-brand-slate dark:text-slate-400">Every time a staff member clocks in or out, your financial dashboards update instantly. No more waiting until the end of the pay period.</p>
             </div>
             
             {/* Mini Dashboard Flow */}
             <div className="hidden sm:block absolute right-0 inset-y-0 w-1/2 p-6 pointer-events-none">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col gap-2 p-4 translate-x-[10%] group-hover:translate-x-[0%] transition-transform duration-700">
                   <div className="flex justify-between items-center mb-2">
                       <div className="w-1/2 h-2 bg-slate-200 dark:bg-slate-800 rounded" />
                       <div className="w-1/4 h-2 bg-emerald-200 dark:bg-emerald-900/50 rounded" />
                   </div>
                   {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg">
                         <div className="flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30" />
                             <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded" />
                         </div>
                         <div className="text-[10px] font-black text-brand-dark dark:text-white">$120</div>
                      </div>
                   ))}
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
