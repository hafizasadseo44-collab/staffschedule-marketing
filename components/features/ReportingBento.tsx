"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Database, FileText, Download, TrendingUp, PieChart } from "lucide-react";

export default function ReportingBento() {
  return (
    <section className="py-24 bg-white dark:bg-brand-dark overflow-hidden relative border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-6"
          >
            Big Data Insights
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 tracking-tight">
            Data-driven decisions, <br />
            <span className="text-brand-primary">not best guesses.</span>
          </h2>
          <p className="text-lg text-brand-slate dark:text-slate-400 font-medium leading-relaxed">
            StaffSchedule.io collects thousands of operational data points every day. Our reporting engine turns that raw data into clear, actionable business intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* 1. Labor Cost Analysis (Wide) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="col-span-1 md:col-span-2 row-span-1 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden group border border-border"
          >
             <div className="relative z-10 w-full md:w-1/2 h-full flex flex-col justify-center">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 mb-6">
                   <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-brand-dark dark:text-white mb-3">Labor vs. Revenue</h3>
                <p className="text-brand-slate dark:text-slate-400 font-medium leading-relaxed">Import your sales data to see your labor percentage in real-time. Optimize your staffing to match your busiest hours precisely.</p>
             </div>
             
             {/* Visual Decor: Mini Charts */}
             <div className="hidden md:flex absolute right-12 inset-y-0 items-center justify-center w-1/3">
                <div className="grid grid-cols-2 gap-3">
                   {[60, 80, 40, 100].map((h, i) => (
                      <div key={i} className="w-12 h-24 bg-slate-200 dark:bg-slate-800 rounded-xl relative overflow-hidden">
                         <motion.div 
                           initial={{ height: 0 }}
                           whileInView={{ height: `${h}%` }}
                           transition={{ duration: 1.5, delay: i * 0.1 }}
                           className={`absolute bottom-0 left-0 w-full ${i % 2 === 0 ? 'bg-brand-primary' : 'bg-brand-secondary'}`}
                         />
                      </div>
                   ))}
                </div>
             </div>
          </motion.div>

          {/* 2. Payroll Export (Square) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="col-span-1 row-span-1 bg-brand-primary rounded-[2.5rem] p-8 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
             <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <Download className="w-6 h-6" />
             </div>
             <div>
                <h3 className="text-xl font-black mb-2">Payroll-Ready</h3>
                <p className="text-sm font-medium opacity-80 leading-relaxed">Export weekly timesheets as CSV, PDF, or XLSX formatted perfectly for Xero, Quickbooks, or ADP.</p>
             </div>
          </motion.div>

          {/* 3. Shift Heatmaps (Square) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="col-span-1 row-span-1 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-border shadow-lg flex flex-col justify-between"
          >
             <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                <PieChart className="w-6 h-6" />
             </div>
             <div>
                <h3 className="text-xl font-black text-brand-dark dark:text-white mb-2">Punctuality Heatmaps</h3>
                <p className="text-brand-slate dark:text-slate-400 text-sm font-medium leading-relaxed">Identify chronic lateness or over-stayed shifts across departments with visual attendance heatmaps.</p>
             </div>
          </motion.div>

          {/* 4. Automated Delivery (Wide) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="col-span-1 md:col-span-2 row-span-1 bg-slate-900 rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden group border border-slate-800"
          >
             <div className="relative z-10 w-full md:w-1/2 h-full flex flex-col justify-center">
                <div className="w-12 h-12 bg-brand-secondary/10 rounded-2xl flex items-center justify-center text-brand-secondary mb-6">
                   <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Scheduled Reporting</h3>
                <p className="text-slate-400 font-medium leading-relaxed">Don't log in to find data. Have critical reports delivered to your inbox every Monday morning automatically.</p>
             </div>
             
             {/* Visual Overlay: Email Pulse */}
             <div className="hidden md:flex absolute right-12 inset-y-0 w-1/3 items-center justify-center">
                <div className="relative">
                   <motion.div 
                     animate={{ y: [-10, 10, -10] }}
                     transition={{ duration: 4, repeat: Infinity }}
                     className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center gap-4"
                   >
                       <div className="w-10 h-10 bg-brand-secondary rounded-full flex items-center justify-center">
                          <Download className="w-5 h-5 text-white" />
                       </div>
                       <div className="h-2 w-24 bg-white/20 rounded-full" />
                       <div className="h-2 w-16 bg-white/10 rounded-full" />
                   </motion.div>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
