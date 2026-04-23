"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Download, FileText, Check, Database, PieChart } from "lucide-react";

export default function ReportingSimulation() {
  const [isExporting, setIsExporting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const startExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
             <div className="relative aspect-[4/3] bg-white dark:bg-slate-900 rounded-[3rem] border border-border shadow-2xl overflow-hidden p-8 flex flex-col">
                
                {/* Simulation Header */}
                <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                         <BarChart3 className="w-5 h-5" />
                      </div>
                      <div>
                         <div className="text-sm font-black text-brand-dark dark:text-white uppercase tracking-tight">Reporting Hub</div>
                         <div className="text-[10px] font-bold text-slate-400">Payroll Period: May 01 - May 07</div>
                      </div>
                   </div>
                   <button 
                     onClick={startExport}
                     disabled={isExporting}
                     className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                       isExporting ? 'bg-slate-100 text-slate-400' : 'bg-brand-primary text-white hover:scale-105 shadow-lg'
                     }`}
                   >
                      {isExporting ? 'Preparing...' : 'Export CSV'}
                      {!isExporting && <Download className="w-3.5 h-3.5" />}
                   </button>
                </div>

                <div className="flex-1 flex flex-col justify-end gap-1 relative">
                   <AnimatePresence>
                      {showSuccess && (
                         <motion.div 
                           initial={{ opacity: 0, y: -20, scale: 0.9 }}
                           animate={{ opacity: 1, y: 0, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.9 }}
                           className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-black text-xs"
                         >
                            <Check className="w-4 h-4" /> Download Complete
                         </motion.div>
                      )}
                   </AnimatePresence>

                   {/* Simulated Chart Bars */}
                   <div className="flex items-end gap-3 h-48 mb-8">
                      {[
                         { label: "Mon", val: 80, color: "bg-indigo-500" },
                         { label: "Tue", val: 65, color: "bg-indigo-500" },
                         { label: "Wed", val: 95, color: "bg-brand-primary" },
                         { label: "Thu", val: 70, color: "bg-indigo-500" },
                         { label: "Fri", val: 100, color: "bg-brand-secondary" },
                         { label: "Sat", val: 85, color: "bg-indigo-500" },
                         { label: "Sun", val: 40, color: "bg-slate-300" }
                      ].map((bar, i) => (
                         <div key={i} className="flex-1 flex flex-col items-center gap-2">
                            <motion.div 
                               initial={{ height: 0 }}
                               whileInView={{ height: `${bar.val}%` }}
                               transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                               className={`w-full rounded-t-lg ${bar.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                            />
                            <span className="text-[10px] font-black text-slate-400">{bar.label}</span>
                         </div>
                      ))}
                   </div>

                   {/* Key Stat Cards */}
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-border">
                         <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Labor</div>
                         <div className="text-xl font-black text-brand-dark dark:text-white">$14,282.50</div>
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-border">
                         <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Labor %</div>
                         <div className="text-xl font-black text-brand-primary">18.4%</div>
                      </div>
                   </div>

                </div>
             </div>
          </div>

          <div className="flex-1">
             <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-6"
             >
                <PieChart className="w-4 h-4" /> Live Business Pulse
             </motion.div>
             <h2 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight">
                Visibility at <br />
                <span className="text-indigo-600">every level.</span>
             </h2>
             <p className="text-lg text-brand-slate dark:text-slate-400 font-medium mb-10 leading-relaxed">
                Whether you're a single-unit manager checking daily sales-to-labor, or an executive running district-wide comparisons, our reporting suite provides the high-fidelity data you need to scale profitably.
             </p>
             <div className="space-y-6">
                {[
                   { title: "Custom Column Views", desc: "Build reports your way. Choose exactly which data points to include in your exports." },
                   { title: "One-Click Payroll", desc: "Reduce payroll admin from hours to minutes with formatted CSV and PDF downloads." },
                   { title: "Historical Trends", desc: "Compare this week's performance against last year with automated seasonal indexing." }
                ].map((item, i) => (
                   <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4"
                   >
                      <div className="mt-1 w-6 h-6 rounded-full bg-indigo-600/10 flex items-center justify-center shrink-0">
                         <div className="w-2 h-2 rounded-full bg-indigo-600" />
                      </div>
                      <div>
                         <div className="text-brand-dark dark:text-white font-black text-xl mb-1">{item.title}</div>
                         <div className="text-brand-slate dark:text-slate-400 font-medium">{item.desc}</div>
                      </div>
                   </motion.div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
