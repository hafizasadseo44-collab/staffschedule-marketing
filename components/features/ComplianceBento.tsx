"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Scale, Clock, Lock, FileCheck, AlertTriangle } from "lucide-react";

export default function ComplianceBento() {
  return (
    <section className="py-24 bg-white dark:bg-brand-dark overflow-hidden relative border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 font-bold text-xs uppercase tracking-widest mb-6"
          >
            Zero-Risk Roster
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 tracking-tight">
            Labor Compliance, <br />
            <span className="text-rose-600">baked into every shift.</span>
          </h2>
          <p className="text-lg text-brand-slate dark:text-slate-400 font-medium leading-relaxed">
            Stop worrying about labor law violations and rest-period fines. Our automated compliance engine audits every shift assignment in real-time, 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* 1. Automated Guardrails (Wide) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="col-span-1 md:col-span-2 row-span-1 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden group border border-border"
          >
             <div className="relative z-10 w-full md:w-1/2 h-full flex flex-col justify-center">
                <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 mb-6">
                   <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-brand-dark dark:text-white mb-3">Hard-Coded Constraints</h3>
                <p className="text-brand-slate dark:text-slate-400 font-medium leading-relaxed">Set your regional labor rules—like maximum shift length or minimum rest between days—and the system will block any compliant breach before it happens.</p>
             </div>
             
             {/* Visual Decor: Block Interaction */}
             <div className="hidden md:flex absolute right-12 inset-y-0 items-center justify-center w-1/3">
                <div className="relative">
                   <div className="w-32 h-32 bg-rose-500/10 rounded-full blur-3xl animate-pulse" />
                   <div className="relative bg-white dark:bg-slate-800 p-6 rounded-3xl border border-rose-500/30 shadow-2xl flex flex-col items-center gap-3">
                      <Lock className="w-8 h-8 text-rose-500" />
                      <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest text-center">Rule Enforcement<br/>Active</span>
                   </div>
                </div>
             </div>
          </motion.div>

          {/* 2. Audit Trail (Square) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="col-span-1 row-span-1 bg-rose-600 rounded-[2.5rem] p-8 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
             <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <FileCheck className="w-6 h-6" />
             </div>
             <div>
                <h3 className="text-xl font-black mb-2">Legal Audit Trail</h3>
                <p className="text-sm font-medium opacity-80 leading-relaxed">Every shift edit, approval, and override is stamped and logged forever. Perfect for protecting your business during regulatory audits.</p>
             </div>
          </motion.div>

          {/* 3. Rest Periods (Square) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="col-span-1 row-span-1 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-border shadow-lg flex flex-col justify-between"
          >
             <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                <Clock className="w-6 h-6" />
             </div>
             <div>
                <h3 className="text-xl font-black text-brand-dark dark:text-white mb-2">Rest Day Logic</h3>
                <p className="text-brand-slate dark:text-slate-400 text-sm font-medium leading-relaxed">System-wide monitoring to ensure employees have their mandatory 48-hour or weekly rest periods according to their contract.</p>
             </div>
          </motion.div>

          {/* 4. Instant Warnings (Wide) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="col-span-1 md:col-span-2 row-span-1 bg-slate-900 rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden group border border-slate-800"
          >
             <div className="relative z-10 w-full md:w-1/2 h-full flex flex-col justify-center">
                <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-6">
                   <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Predictive Breach Warnings</h3>
                <p className="text-slate-400 font-medium leading-relaxed">We don't just find errors—we predict them. Managers get a warning <strong>before</strong> publishing a schedule that contains potential compliance issues.</p>
             </div>
             
             {/* Visual Overlay: Warning HUD */}
             <div className="hidden md:flex absolute right-12 inset-y-0 w-1/3 items-center justify-center">
                <div className="relative">
                   <motion.div 
                     animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                     transition={{ duration: 3, repeat: Infinity }}
                     className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-3xl flex flex-col items-center gap-3 backdrop-blur-md"
                   >
                       <AlertTriangle className="w-8 h-8 text-amber-500" />
                       <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest text-center italic">Potential Breach<br/>on Sunday Night</span>
                   </motion.div>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
