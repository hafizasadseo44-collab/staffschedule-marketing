"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckSquare, Eye, Users, ShieldCheck, Send } from "lucide-react";

export default function AnnouncementsSimulation() {
  const [hasRead, setHasRead] = useState(false);
  const [readCount, setReadCount] = useState(14);

  const handleRead = () => {
    setHasRead(true);
    setTimeout(() => {
      setReadCount(15);
    }, 1000);
  };

  const reset = () => {
    setHasRead(false);
    setReadCount(14);
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
                      <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-black text-xl">
                         <Bell className="w-5 h-5 fill-white" />
                      </div>
                      <div>
                         <div className="text-sm font-black text-brand-dark dark:text-white uppercase tracking-tight">Compliance Tracker</div>
                         <div className="text-[10px] font-bold text-slate-400">Noticeboard Reach</div>
                      </div>
                   </div>
                </div>

                <div className="flex-1 relative">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                      
                      {/* Left Side: The Announcement */}
                      <div className="space-y-4">
                         <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-border shadow-sm">
                            <div className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-2">Safety Update</div>
                            <h4 className="text-sm font-black text-brand-dark dark:text-white mb-2 leading-tight">New Closing Hazards Policy</h4>
                            <p className="text-[10px] font-medium text-slate-500 leading-relaxed mb-6">
                               Please ensure all back-door exits are clear by 9 PM. Fire risk assessment updated...
                            </p>
                            
                            {!hasRead ? (
                               <button 
                                 onClick={handleRead}
                                 className="w-full py-3 bg-brand-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                               >
                                  Confirm Read & Sign <CheckSquare className="w-3.5 h-3.5" />
                               </button>
                            ) : (
                               <div className="w-full py-3 bg-emerald-500/10 text-emerald-600 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                                  Signed & Compliant <ShieldCheck className="w-3.5 h-3.5" />
                               </div>
                            )}
                         </div>
                      </div>

                      {/* Right Side: Manager View */}
                      <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 flex flex-col items-center justify-center text-center">
                         <div className="relative w-24 h-24 mb-6">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                               <circle 
                                 cx="50" cy="50" r="45" 
                                 fill="none" 
                                 stroke="rgba(255,255,255,0.05)" 
                                 strokeWidth="10" 
                               />
                               <motion.circle 
                                 cx="50" cy="50" r="45" 
                                 fill="none" 
                                 stroke="#4F46E5" 
                                 strokeWidth="10" 
                                 strokeDasharray="283"
                                 animate={{ strokeDashoffset: 283 - (283 * (readCount / 15)) }}
                                 transition={{ duration: 1 }}
                                 strokeLinecap="round"
                               />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                               <span className="text-xl font-black text-white">{Math.round((readCount / 15) * 100)}%</span>
                               <span className="text-[8px] font-bold text-slate-400">Total Read</span>
                            </div>
                         </div>
                         <div className="text-xs font-black text-white mb-1">{readCount} / 15 Staff</div>
                         <p className="text-[8px] font-medium text-slate-500 uppercase tracking-widest mb-6 leading-none">Compliant Readiness</p>
                         
                         <div className="w-full space-y-2 text-left">
                            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg">
                               <div className={`w-1.5 h-1.5 rounded-full ${hasRead ? 'bg-emerald-500' : 'bg-slate-600'}`} />
                               <span className="text-[10px] font-bold text-slate-300">Your Receipt</span>
                               <span className={`ml-auto text-[8px] font-black uppercase ${hasRead ? 'text-emerald-500' : 'text-slate-500'}`}>{hasRead ? 'SIGNED' : 'MISSING'}</span>
                            </div>
                         </div>
                      </div>

                   </div>
                </div>

                {hasRead && (
                   <div className="mt-8 flex justify-center">
                      <button onClick={reset} className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] hover:underline underline-offset-8">Reset Simulation</button>
                   </div>
                )}
             </div>
          </div>

          <div className="flex-1">
             <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6"
             >
                <ShieldCheck className="w-4 h-4" /> Compliance Guaranteed
             </motion.div>
             <h2 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight">
                Accountability <br />
                <span className="text-brand-primary">by design.</span>
             </h2>
             <p className="text-lg text-brand-slate dark:text-slate-400 font-medium mb-10 leading-relaxed">
                Stop wondering if your team saw the update. Our announcements engine provides real-time reach metrics and digital signatures, so you can focus on building your business instead of chasing staff for confirmation.
             </p>
             <div className="space-y-6">
                {[
                   { title: "Reach Heatmaps", desc: "Instantly identify which departments or locations haven't engaged with critical news." },
                   { title: "Bulk Reminder", desc: "One tap to 'Nudge' all staff who haven't acknowledged an announcement yet." },
                   { title: "Permanent Archive", desc: "Every announcement and its receipt history is stored indefinitely for legal auditing." }
                ].map((item, i) => (
                   <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4"
                   >
                      <div className="mt-1 w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                         <div className="w-2 h-2 rounded-full bg-brand-primary" />
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
