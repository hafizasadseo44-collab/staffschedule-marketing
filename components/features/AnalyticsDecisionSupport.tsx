"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Lightbulb, CheckCircle2 } from "lucide-react";

export default function AnalyticsDecisionSupport() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1 w-full max-w-lg lg:max-w-none relative aspect-square flex items-center justify-center">
             
             {/* Glowing Glow */}
             <div className="absolute inset-0 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
             
             {/* Suggestion Card UI */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 w-full max-w-sm bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border-2 border-brand-primary/20 p-6 flex flex-col"
             >
                <div className="flex items-center gap-2 mb-6">
                   <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                      <Sparkles className="w-5 h-5 fill-brand-primary/20" />
                   </div>
                   <div>
                      <div className="text-[10px] font-black text-brand-primary uppercase tracking-widest leading-none mb-1">AI Decision Support</div>
                      <div className="text-sm font-black text-brand-dark dark:text-white leading-none">Smart Suggestion</div>
                   </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 mb-6">
                   <p className="text-brand-dark dark:text-brand-slate font-bold text-sm leading-relaxed mb-4">
                      "I've detected a projected $245.00 in unnecessary overtime for the Kitchen Team this Friday."
                   </p>
                   <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                         <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                         Action: Shift John D. to Wednesday
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                         Net Saving: + $245.00
                      </div>
                   </div>
                </div>

                <motion.button 
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   className="w-full py-4 bg-brand-primary text-white font-black rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-brand-primary/20"
                >
                   Apply Optimization <CheckCircle2 className="w-4 h-4" />
                </motion.button>

                <div className="mt-4 text-center">
                   <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Confidence: 99.8%</span>
                </div>
             </motion.div>

          </div>

          <div className="flex-1">
             <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest mb-6"
              >
                <Lightbulb className="w-4 h-4" /> Not Just Data, Answers
              </motion.div>
              <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight"
              >
                 Stop looking at charts. <br />
                 <span className="text-indigo-500">Start seeing solutions.</span>
              </motion.h2>
              <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="text-lg text-brand-slate dark:text-slate-400 font-medium mb-8"
              >
                 Most analytics tools dump a list of numbers on your desk. StaffSchedule.io analyzes your historical data and current roster in real-time to suggest the exact changes that will save you the most money.
              </motion.p>
              
              <ul className="space-y-6">
                 {[
                   { title: "Proactive Notifications", desc: "Get alerted to financial waste before the shift even starts." },
                   { title: "One-Click Fixes", desc: "Accept software-driven suggestions and update the schedule instantly." },
                   { title: "Pattern Recognition", desc: "Identify which departments are consistently over-budgeting." },
                 ].map((item, i) => (
                    <motion.li 
                       key={i} 
                       initial={{ opacity: 0, x: 20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.1 }}
                       className="flex items-start gap-4"
                    >
                       <div className="mt-1 w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                          <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />
                       </div>
                       <div>
                          <div className="text-brand-dark dark:text-white font-black text-xl mb-1">{item.title}</div>
                          <div className="text-brand-slate dark:text-slate-400 font-medium">{item.desc}</div>
                       </div>
                    </motion.li>
                 ))}
              </ul>
          </div>
          
        </div>
      </div>
    </section>
  );
}
