"use client";

import React from "react";
import { motion } from "framer-motion";
import { XCircle, ShieldCheck, AlertTriangle, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export default function AnalyticsCostBleed() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-widest mb-6"
          >
            <AlertTriangle className="w-4 h-4" /> Stop the Leakage
          </motion.div>
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight"
          >
            Manual labor tracking is <br className="hidden md:block" />
            <span className="text-rose-500">bleeding your profits.</span>
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-lg text-brand-slate dark:text-slate-400 font-medium"
          >
             Business owners lose an average of 4-8% of total gross revenue annually to "invisible" labor leaks. Stop paying for errors and inefficiency.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* THE LEAK (Manual) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] p-8 lg:p-12 border border-slate-200 dark:border-slate-700 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent pointer-events-none" />
            
            <div className="mb-8 relative z-10 flex items-center justify-between">
               <h3 className="text-2xl font-black text-slate-800 dark:text-slate-200">Manual Methods</h3>
               <div className="px-3 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-widest rounded-full flex items-center gap-2 text-wrap">
                  <TrendingUp className="w-4 h-4" /> Rising Costs
               </div>
            </div>

            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-8 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-xl p-6 flex flex-col justify-center gap-4">
                <div className="flex justify-between items-center opacity-40">
                    <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="h-4 w-12 bg-rose-100 dark:bg-rose-950/30 rounded" />
                </div>
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800 relative">
                            <div className="h-2 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
                            <div className="font-bold text-rose-500 text-sm">$480.00</div>
                            <motion.div 
                                animate={{ y: [0, 5, 0], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                                className="absolute bottom-0 right-0 text-[10px] text-rose-400 font-black"
                            >
                                -$$$ Leak
                            </motion.div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 p-3 bg-rose-500/10 rounded-xl border border-rose-500/20 text-center">
                    <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1">Untracked Overtime</div>
                    <div className="text-2xl font-black text-rose-600">$1,420.00</div>
                </div>
            </div>

            <ul className="space-y-4 relative z-10">
               {[
                 "Inaccurate rounding (paying for 15m extra)",
                 "Unexpected and unapproved overtime",
                 "Labor-to-sales ratios calculated weeks late",
                 "Zero visibility into real-time shift costs"
               ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                     <div className="mt-1 w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center shrink-0">
                        <XCircle className="w-3.5 h-3.5 text-rose-500" />
                     </div>
                     <span className="text-slate-600 dark:text-slate-400 font-medium">{item}</span>
                  </li>
               ))}
            </ul>
          </motion.div>

          {/* THE SHIELD (StaffSchedule.io) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 lg:p-12 border-2 border-emerald-500/20 shadow-2xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors"
          >
            <div className="absolute lg:top-[-20%] lg:right-[-20%] w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="mb-8 relative z-10 flex items-center justify-between">
               <h3 className="text-2xl font-black text-brand-dark dark:text-white">With StaffSchedule</h3>
               <div className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest rounded-full flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Protected
               </div>
            </div>

            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-8 shadow-xl bg-slate-50 dark:bg-slate-800 border-2 border-emerald-500/20 p-6 flex flex-col justify-center gap-4">
                <div className="flex justify-between items-center mb-2">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-Time Protection</div>
                    <div className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">SECURE</div>
                </div>
                
                <div className="space-y-3">
                   {[
                     { label: "Scheduled vs Actual", value: "99.2% Match" },
                     { label: "OT Prevented Today", value: "4.5 Hours" },
                     { label: "Margin Safeguard", value: "ACTIVE" }
                   ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white dark:bg-slate-950 border border-border">
                         <div className="text-xs font-bold text-slate-500">{item.label}</div>
                         <div className="text-sm font-black text-emerald-500">{item.value}</div>
                      </div>
                   ))}
                </div>

                <div className="mt-4 p-4 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-500/30 flex justify-between items-center overflow-hidden relative">
                   <motion.div 
                       animate={{ x: [-100, 300] }}
                       transition={{ duration: 2, repeat: Infinity }}
                       className="absolute top-0 bottom-0 left-0 w-12 bg-white/20 skew-x-12"
                   />
                   <div>
                       <div className="text-[10px] font-black opacity-80 uppercase tracking-widest">Profit Recovered</div>
                       <div className="text-2xl font-black">$4,860.00 <span className="text-xs opacity-60">/mo</span></div>
                   </div>
                   <TrendingDown className="w-8 h-8 opacity-40 shrink-0" />
                </div>
            </div>

            <ul className="space-y-4 relative z-10">
               {[
                 "Down-to-the-minute payroll accuracy",
                 "Automated overtime flagging and blocking",
                 "Live labor-to-sales ratios as sales happen",
                 "100% visibility into every dollar scheduled"
               ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                     <div className="mt-1 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                     </div>
                     <span className="text-brand-dark dark:text-slate-300 font-bold">{item}</span>
                  </li>
               ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
