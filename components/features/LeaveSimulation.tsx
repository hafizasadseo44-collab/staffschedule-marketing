"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, AlertCircle, Calendar, Send, ShieldCheck } from "lucide-react";

export default function LeaveSimulation() {
  const [step, setStep] = useState(1);
  const [isSyncing, setIsSyncing] = useState(false);

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const startSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setStep(4);
    }, 2000);
  };

  const reset = () => {
    setStep(1);
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
                      <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white">
                         <Calendar className="w-5 h-5" />
                      </div>
                      <div className="text-xl font-black text-brand-dark dark:text-white">Workflow Simulator</div>
                   </div>
                   <div className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-[10px] font-black uppercase tracking-widest leading-none">
                      Live Preview
                   </div>
                </div>

                <div className="flex-1 relative flex flex-col justify-center items-center">
                   
                   <AnimatePresence mode="wait">
                      {step === 1 && (
                         <motion.div 
                           key="step1"
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           className="w-full space-y-4"
                         >
                            <div className="text-center mb-6">
                               <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Step 1: Staff Request</div>
                               <div className="text-lg font-black text-brand-dark dark:text-white">John requests 3 days off</div>
                            </div>
                            <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-border">
                               <div className="flex justify-between items-center mb-4">
                                  <span className="text-xs font-bold text-slate-500 italic">22 May - 25 May (Annual Leave)</span>
                                  <span className="px-2 py-1 bg-amber-500/10 text-amber-600 rounded-md text-[10px] font-black uppercase tracking-widest">Pending</span>
                               </div>
                               <button 
                                 onClick={nextStep}
                                 className="w-full py-4 bg-brand-primary text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                               >
                                  Submit Request <Send className="w-4 h-4" />
                               </button>
                            </div>
                         </motion.div>
                      )}

                      {step === 2 && (
                         <motion.div 
                           key="step2"
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           className="w-full space-y-4"
                         >
                            <div className="text-center mb-6">
                               <div className="text-xs font-black text-rose-500 uppercase tracking-widest mb-1">Step 2: Conflict Check</div>
                               <div className="text-lg font-black text-brand-dark dark:text-white">Engine detects a coverage risk</div>
                            </div>
                            <div className="p-6 bg-rose-50 dark:bg-rose-900/20 rounded-2xl border border-rose-200 dark:border-rose-900/30">
                               <div className="flex gap-4 items-start">
                                  <AlertCircle className="w-6 h-6 text-rose-500 shrink-0" />
                                  <div>
                                     <div className="text-sm font-black text-rose-600 mb-1 leading-none uppercase tracking-widest">Manning Alert</div>
                                     <p className="text-xs font-medium text-rose-500 mt-1">Approving this will leave the 'Kitchen' department under-staffed on Saturday night.</p>
                                  </div>
                               </div>
                            </div>
                            <div className="flex gap-4">
                               <button onClick={reset} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-xl font-black text-sm hover:bg-rose-100 hover:text-rose-600 transition-colors">Decline</button>
                               <button onClick={nextStep} className="flex-1 py-4 bg-brand-primary text-white rounded-xl font-black text-sm hover:scale-[1.02] transition-transform">Approve Anyway</button>
                            </div>
                         </motion.div>
                      )}

                      {step === 3 && (
                         <motion.div 
                           key="step3"
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           className="w-full flex flex-col items-center justify-center gap-6"
                         >
                            <motion.div 
                               animate={{ rotate: 360 }}
                               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                               className="w-24 h-24 rounded-full border-4 border-dashed border-emerald-500 flex items-center justify-center p-4"
                            >
                               <ShieldCheck className="w-10 h-10 text-emerald-500" />
                            </motion.div>
                            <div className="text-center">
                               <div className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-1">Step 3: Payroll Sync</div>
                               <div className="text-lg font-black text-brand-dark dark:text-white">Leave is approved and synced</div>
                            </div>
                            <button 
                               onClick={startSync}
                               disabled={isSyncing}
                               className={`w-full py-4 rounded-xl font-black text-sm flex items-center justify-center gap-3 transition-colors ${
                                  isSyncing ? 'bg-slate-100 text-slate-400' : 'bg-emerald-500 text-white hover:scale-[1.02]'
                               }`}
                            >
                               {isSyncing ? 'Processing Payroll Delta...' : 'Confirm Approval'}
                               {!isSyncing && <Check className="w-4 h-4" />}
                            </button>
                         </motion.div>
                      )}

                      {step === 4 && (
                         <motion.div 
                           key="step4"
                           initial={{ opacity: 0, scale: 0.9 }}
                           animate={{ opacity: 1, scale: 1 }}
                           className="w-full flex flex-col items-center text-center gap-6"
                         >
                            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-2xl">
                               <Check className="w-10 h-10" />
                            </div>
                            <div>
                               <div className="text-2xl font-black text-brand-dark dark:text-white mb-2">Workflow Perfected</div>
                               <p className="text-brand-slate dark:text-slate-400 font-medium text-sm">John was notified, shifts were blacked out, and payroll was adjusted automatically.</p>
                            </div>
                            <button onClick={reset} className="text-brand-primary font-black text-sm uppercase tracking-[0.2em] hover:underline underline-offset-8">Restart Demo</button>
                         </motion.div>
                      )}
                   </AnimatePresence>

                </div>
             </div>
          </div>

          <div className="flex-1">
             <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 font-bold text-xs uppercase tracking-widest mb-6"
             >
                <AlertCircle className="w-4 h-4" /> Smart Conflict Filter
             </motion.div>
             <h2 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight">
                Detect problems <br />
                <span className="text-brand-primary">before they happen.</span>
             </h2>
             <p className="text-lg text-brand-slate dark:text-slate-400 font-medium mb-10 leading-relaxed">
                Most leave systems only track days. We track your <strong>Entire Operation</strong>. If someone requests off, our engine instantly checks your minimum staffing levels for those dates to ensure you aren't left shorthanded.
             </p>
             <div className="space-y-6">
                {[
                   { title: "Department Min-Levels", desc: "Set minimum staff requirements per department to block over-scheduling." },
                   { title: "Automatic Shift Blocking", desc: "Approved leave automatically removes the employee from any active shift slots." },
                   { title: "Real-time Notifications", desc: "Staff are notified the instant their request is reviewed, no more back-and-forth." }
                ].map((item, i) => (
                   <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4"
                   >
                      <div className="mt-1 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                         <div className="w-2 h-2 rounded-full bg-emerald-500" />
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
