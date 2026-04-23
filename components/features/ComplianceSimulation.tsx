"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Check, AlertTriangle, Scale, Lock, RefreshCw } from "lucide-react";

export default function ComplianceSimulation() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<Record<number, string>>({});

  const rules = [
    "Max Shift Duration (12h)",
    "Minimum Rest Period (11h)",
    "Sunday Work Premium",
    "Staff Training Verification",
    "Minor Employment Rules"
  ];

  const runAudit = () => {
    setIsRunning(true);
    setResults({});
    
    rules.forEach((_, i) => {
      setTimeout(() => {
        setResults(prev => ({ ...prev, [i]: i === 2 ? 'warning' : 'pass' }));
        if (i === rules.length - 1) setIsRunning(false);
      }, (i + 1) * 600);
    });
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
          
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
             <div className="relative aspect-[4/3] bg-white dark:bg-slate-900 rounded-[3rem] border border-border shadow-2xl overflow-hidden p-8 flex flex-col">
                
                {/* Simulation Header */}
                <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white">
                         <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                         <div className="text-sm font-black text-brand-dark dark:text-white uppercase tracking-tight">Audit Engine</div>
                         <div className="text-[10px] font-bold text-slate-400">Rule-Set: [UK Labor Law 2026]</div>
                      </div>
                   </div>
                   <button 
                     onClick={runAudit}
                     disabled={isRunning}
                     className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                       isRunning ? 'bg-slate-100 text-slate-400' : 'bg-rose-600 text-white hover:scale-105 shadow-lg'
                     }`}
                   >
                      {isRunning ? 'Auditing...' : 'Run Audit'}
                      <RefreshCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
                   </button>
                </div>

                <div className="flex-1 space-y-3">
                   {rules.map((rule, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-border">
                         <span className="text-xs font-bold text-brand-dark dark:text-white">{rule}</span>
                         <AnimatePresence mode="wait">
                            {results[i] === 'pass' && (
                               <motion.div key="pass" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase">
                                  <Check className="w-4 h-4" /> Compliant
                               </motion.div>
                            )}
                            {results[i] === 'warning' && (
                               <motion.div key="warn" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase">
                                  <AlertTriangle className="w-4 h-4" /> Warning
                               </motion.div>
                            )}
                            {!results[i] && isRunning && (
                               <motion.div key="loading" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity }} className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full" />
                            )}
                         </AnimatePresence>
                      </div>
                   ))}
                </div>

                {results[2] === 'warning' && (
                   <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 rounded-2xl">
                      <p className="text-[10px] font-medium text-amber-700 dark:text-amber-500 leading-tight italic">
                         * Sunday Premium not applied to Alex's shift. Suggested correction: +1.5x Multiplier.
                      </p>
                   </motion.div>
                )}

             </div>
          </div>

          <div className="flex-1">
             <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 font-bold text-xs uppercase tracking-widest mb-6"
             >
                <Scale className="w-4 h-4" /> Zero-Liability Protocol
             </motion.div>
             <h2 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight">
                Protect your brand <br />
                <span className="text-rose-600">with absolute certainty.</span>
             </h2>
             <p className="text-lg text-brand-slate dark:text-slate-400 font-medium mb-10 leading-relaxed">
                Manually checking every shift for labor law compliance is impossible at scale. StaffSchedule.io automates the audit process, ensuring your roster is legal, safe, and ready for inspection at any moment.
             </p>
             <div className="space-y-6">
                {[
                   { title: "Dynamic Rule Engine", desc: "Easily update your internal rules to match changing national or local labor regulations." },
                   { title: "Proactive Blocking", desc: "System locks the roster if critical safety or labor breaches are detected in the schedule." },
                   { title: "Historical Vault", desc: "Store every compliance check and manager override in a permanent, un-editable audit log." }
                ].map((item, i) => (
                   <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4"
                   >
                      <div className="mt-1 w-6 h-6 rounded-full bg-rose-600/10 flex items-center justify-center shrink-0">
                         <div className="w-2 h-2 rounded-full bg-rose-600" />
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
