"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, User, Clock, Check, Zap, MapPin } from "lucide-react";

export default function OpenShiftsSimulation() {
  const [claimed, setClaimed] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  const handleClaim = () => {
    setIsClaiming(true);
    setTimeout(() => {
      setIsClaiming(false);
      setClaimed(true);
    }, 1500);
  };

  const reset = () => {
    setClaimed(false);
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
                         <Zap className="w-5 h-5 fill-white" />
                      </div>
                      <div>
                         <div className="text-sm font-black text-brand-dark dark:text-white uppercase tracking-tight">Shift Marketplace</div>
                         <div className="text-[10px] font-bold text-slate-400">Available Near You</div>
                      </div>
                   </div>
                   <div className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-[10px] font-black uppercase tracking-widest leading-none">
                      Mobile App View
                   </div>
                </div>

                <div className="flex-1 relative flex flex-col justify-center">
                   
                   <AnimatePresence mode="wait">
                      {!claimed ? (
                         <motion.div 
                           key="market"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, scale: 0.95 }}
                           className="space-y-4"
                         >
                            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-border relative overflow-hidden group">
                               <div className="flex justify-between items-start mb-4">
                                  <div>
                                     <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Saturday Night</div>
                                     <div className="text-xl font-black text-brand-dark dark:text-white leading-none">Server / Waiter</div>
                                  </div>
                                  <div className="px-3 py-1 bg-brand-primary text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                                     +$2.50 / hr
                                  </div>
                               </div>
                               <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-6">
                                  <div className="flex items-center gap-1.5">
                                     <Clock className="w-3.5 h-3.5" /> 18:00 - 23:00
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                     <MapPin className="w-3.5 h-3.5" /> Downtown Hub
                                  </div>
                               </div>
                               <button 
                                 onClick={handleClaim}
                                 disabled={isClaiming}
                                 className={`w-full py-4 rounded-xl font-black text-sm flex items-center justify-center gap-3 transition-all ${
                                    isClaiming 
                                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                                    : 'bg-brand-primary text-white hover:scale-[1.02] shadow-xl hover:shadow-brand-primary/40'
                                 }`}
                               >
                                  {isClaiming ? 'Claiming Shift...' : 'Claim Shift Now'}
                                  {!isClaiming && <Check className="w-4 h-4" />}
                               </button>
                            </div>

                            <div className="p-6 bg-slate-50/50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-border opacity-50 grayscale">
                               <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-700 rounded-full mb-4" />
                               <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded-full" />
                            </div>
                         </motion.div>
                      ) : (
                         <motion.div 
                           key="success"
                           initial={{ opacity: 0, scale: 0.9 }}
                           animate={{ opacity: 1, scale: 1 }}
                           className="flex flex-col items-center text-center gap-6"
                         >
                            <motion.div 
                               initial={{ rotate: -180, scale: 0 }}
                               animate={{ rotate: 0, scale: 1 }}
                               className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-2xl"
                            >
                               <Check className="w-10 h-10" />
                            </motion.div>
                            <div>
                               <div className="text-2xl font-black text-brand-dark dark:text-white mb-2">Shift Claimed!</div>
                               <p className="text-brand-slate dark:text-slate-400 font-medium text-sm">You are now scheduled for the 'Saturday Night' shift. Your calendar has been updated.</p>
                            </div>
                            <button onClick={reset} className="text-brand-primary font-black text-sm uppercase tracking-[0.2em] hover:underline underline-offset-8">Browse More Shifts</button>
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
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6"
             >
                <Bell className="w-4 h-4" /> Infinite Coverage
             </motion.div>
             <h2 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight">
                Empower your team <br />
                <span className="text-brand-primary">to cover the gaps.</span>
             </h2>
             <p className="text-lg text-brand-slate dark:text-slate-400 font-medium mb-10">
                Shift coverage doesn't have to be a manager's burden. Give your staff the tools to pick up extra hours and earn incentives, leading to a more engaged and flexible workforce.
             </p>
             <div className="space-y-6">
                {[
                   { title: "Smart Rewards", desc: "Attach hourly bonuses to difficult-to-fill shifts to ensure coverage without manual calls." },
                   { title: "One-Tap Claim", desc: "Reduce friction. Staff can claim a shift in seconds, with instant manager notification." },
                   { title: "Real-time Update", desc: "The second a shift is claimed, it disappears from the marketplace and updates the rota." }
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
