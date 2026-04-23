"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, User, Check, X, MessageCircle, ShieldCheck } from "lucide-react";

export default function ShiftSwapsSimulation() {
  const [step, setStep] = useState(1);
  const [isApproving, setIsApproving] = useState(false);

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const managerApprove = () => {
    setIsApproving(true);
    setTimeout(() => {
      setIsApproving(false);
      setStep(4);
    }, 2000);
  };

  const reset = () => setStep(1);

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
          
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
             <div className="relative aspect-[4/3] bg-white dark:bg-slate-900 rounded-[3rem] border border-border shadow-2xl overflow-hidden p-8 flex flex-col">
                
                {/* Simulation Header */}
                <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-secondary rounded-xl flex items-center justify-center text-white">
                         <RefreshCw className="w-5 h-5" />
                      </div>
                      <div>
                         <div className="text-sm font-black text-brand-dark dark:text-white uppercase tracking-tight">Swap Engine</div>
                         <div className="text-[10px] font-bold text-slate-400">P2P Coverage Active</div>
                      </div>
                   </div>
                </div>

                <div className="flex-1 relative flex flex-col justify-center">
                   
                   <AnimatePresence mode="wait">
                      {step === 1 && (
                         <motion.div 
                           key="s1"
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.95 }}
                           className="space-y-4"
                         >
                            <div className="text-center mb-6">
                               <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Step 1: Initiation</div>
                               <div className="text-lg font-black text-brand-dark dark:text-white">Alex wants to swap Saturday</div>
                            </div>
                            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-border">
                               <div className="flex items-center gap-4 mb-4">
                                  <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-white font-black text-xs">A</div>
                                  <div className="text-sm font-bold text-brand-dark dark:text-white">Trade for: Sunday Morning?</div>
                               </div>
                               <button 
                                 onClick={nextStep}
                                 className="w-full py-4 bg-brand-primary text-white rounded-xl font-black text-sm flex items-center justify-center gap-2"
                               >
                                  Send Request <MessageCircle className="w-4 h-4" />
                               </button>
                            </div>
                         </motion.div>
                      )}

                      {step === 2 && (
                         <motion.div 
                           key="s2"
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           className="space-y-4"
                         >
                            <div className="text-center mb-6">
                               <div className="text-xs font-black text-brand-secondary uppercase tracking-widest mb-1">Step 2: Peer Agreement</div>
                               <div className="text-lg font-black text-brand-dark dark:text-white">Jordan receives notification</div>
                            </div>
                            <div className="p-6 bg-brand-secondary/5 rounded-3xl border border-brand-secondary/20 flex flex-col items-center">
                               <div className="w-16 h-16 bg-brand-secondary/20 rounded-full flex items-center justify-center text-brand-secondary mb-4">
                                  <User className="w-8 h-8" />
                               </div>
                               <div className="text-sm font-medium text-brand-dark dark:text-white mb-6 text-center">Jordan accepts the trade.</div>
                               <button onClick={nextStep} className="w-full py-4 bg-brand-secondary text-white rounded-xl font-black text-sm">Accept Trade</button>
                            </div>
                         </motion.div>
                      )}

                      {step === 3 && (
                         <motion.div 
                           key="s3"
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -10 }}
                           className="space-y-4 text-center"
                         >
                            <div className="text-xs font-black text-brand-primary uppercase tracking-widest mb-1">Step 3: Manager Review</div>
                            <div className="text-lg font-black text-brand-dark dark:text-white mb-6">Manager final approval</div>
                            <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-border shadow-2xl flex flex-col gap-4">
                               <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-400">
                                  <span>Alex</span> ↔ <span>Jordan</span>
                               </div>
                               <div className="h-0.5 w-full bg-slate-100 dark:bg-slate-700" />
                               <div className="flex gap-4">
                                  <button onClick={reset} className="flex-1 py-4 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded-xl font-black text-sm">Deny</button>
                                  <button onClick={managerApprove} className="flex-1 py-4 bg-brand-primary text-white rounded-xl font-black text-sm shadow-xl shadow-brand-primary/40">Approve</button>
                               </div>
                            </div>
                            {isApproving && (
                               <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity }} className="text-[10px] font-black text-brand-primary tracking-widest">VALIDATING LABOR RULES...</motion.div>
                            )}
                         </motion.div>
                      )}

                      {step === 4 && (
                         <motion.div 
                           key="s4"
                           initial={{ opacity: 0, scale: 0.9 }}
                           animate={{ opacity: 1, scale: 1 }}
                           className="flex flex-col items-center text-center gap-6"
                         >
                            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-2xl">
                               <Check className="w-10 h-10" />
                            </div>
                            <div className="text-2xl font-black text-brand-dark dark:text-white">Swap Synchronized</div>
                            <p className="text-brand-slate dark:text-slate-400 font-medium text-sm max-w-[80%]">Alex is now on Sunday, Jordan is on Saturday. Both staff pool updated instantly.</p>
                            <button onClick={reset} className="text-brand-primary font-black text-sm uppercase tracking-[0.2em] hover:underline underline-offset-8">Restart Simulation</button>
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
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary font-bold text-xs uppercase tracking-widest mb-6"
             >
                <RefreshCw className="w-4 h-4" /> Manager-Free Control
             </motion.div>
             <h2 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight">
                Delegated authority, <br />
                <span className="text-brand-secondary">zero risk.</span>
             </h2>
             <p className="text-lg text-brand-slate dark:text-slate-400 font-medium mb-10">
                Shift swaps don't have to be a headache. Our engine handles the negotiations between staff, verifies the training levels of both parties, and only reaches out to you for the final green light.
             </p>
             <div className="space-y-6">
                {[
                   { title: "Skill-Matching", desc: "System only allows swaps between staff with identical training or department clears." },
                   { title: "Private Messaging", desc: "Built-in chat window for staff to finalize the details of their trade safely." },
                   { title: "Smart Constraints", desc: "Prevent swaps that would cause overtime or violate rest-period requirements." }
                ].map((item, i) => (
                   <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4"
                   >
                      <div className="mt-1 w-6 h-6 rounded-full bg-brand-secondary/10 flex items-center justify-center shrink-0">
                         <div className="w-2 h-2 rounded-full bg-brand-secondary" />
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
