"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ShieldCheck, Globe, CheckCircle2, RefreshCw } from "lucide-react";

export default function MultiLocationCompliance() {
  const [syncState, setSyncState] = React.useState("idle");

  const handleSync = () => {
    setSyncState("syncing");
    setTimeout(() => setSyncState("complete"), 2500);
    setTimeout(() => setSyncState("idle"), 5000);
  };

  return (
    <section className="py-24 bg-brand-dark overflow-hidden relative border-t border-slate-800">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[3rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden"
             >
                <div className="mb-8 flex justify-between items-start">
                   <div>
                      <h3 className="text-2xl font-black text-white mb-2">Policy Propagation</h3>
                      <p className="text-slate-400 text-sm font-medium">Update branch rules globally.</p>
                   </div>
                   <div className="px-3 py-1 bg-brand-primary/20 text-brand-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-brand-primary/30">
                      Global Control
                   </div>
                </div>

                {/* HQ Panel */}
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-8 relative">
                   <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg">
                         <Globe className="w-5 h-5" />
                      </div>
                      <div className="text-white font-black">Corporate HQ</div>
                   </div>
                   <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-white/5">
                         <span className="text-xs text-slate-400 font-bold">Standard OT Threshold</span>
                         <span className="text-xs text-white font-black px-2 py-1 bg-white/5 rounded">40.0 Hours</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                         <span className="text-xs text-slate-400 font-bold">Minimum Rest Period</span>
                         <span className="text-xs text-white font-black px-2 py-1 bg-white/5 rounded">11.0 Hours</span>
                      </div>
                   </div>
                </div>

                {/* The "Sync" Action */}
                <div className="relative mb-12 flex justify-center">
                   <motion.button 
                      onClick={handleSync}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative z-10 px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 transition-colors ${
                         syncState === 'complete' ? 'bg-emerald-500 text-white' : 'bg-brand-primary text-white'
                      }`}
                   >
                      {syncState === 'idle' && <><RefreshCw className="w-4 h-4" /> Push Policy Update</>}
                      {syncState === 'syncing' && <><RefreshCw className="w-4 h-4 animate-spin" /> Propagating...</>}
                      {syncState === 'complete' && <><CheckCircle2 className="w-4 h-4" /> Global Sync'd</>}
                   </motion.button>
                   
                   {/* Propagation Signal (Mobile and Desktop) */}
                   <AnimatePresence>
                      {syncState === 'syncing' && (
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-24 sm:gap-48 pointer-events-none">
                            {[1, 2].map((dir, i) => (
                               <motion.div 
                                  key={i}
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: [1, 2, 4], opacity: [0, 0.5, 0] }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                  className="absolute w-20 h-20 bg-brand-primary/30 rounded-full blur-xl"
                               />
                            ))}
                         </div>
                      )}
                   </AnimatePresence>
                </div>

                {/* Units List */}
                <div className="grid grid-cols-2 gap-4">
                   {[
                      { city: 'New York Store', status: syncState === 'complete' ? '12.0 Law Applied' : 'Legacy Rule' },
                      { city: 'London Branch', status: syncState === 'complete' ? "GPDR Sync'd" : 'Pending' },
                   ].map((unit, i) => (
                      <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
                         <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{unit.city}</div>
                         <div className={`text-xs font-black ${syncState === 'complete' ? 'text-emerald-400' : 'text-slate-300'}`}>{unit.status}</div>
                      </div>
                   ))}
                </div>

             </motion.div>
          </div>

          <div className="flex-1">
             <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6"
              >
                <Zap className="w-4 h-4" /> Instant Propagation
              </motion.div>
              <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
              >
                 Enforce standards <br />
                 <span className="text-brand-primary text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">across 500 locations.</span>
              </motion.h2>
              <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="text-lg text-slate-400 font-medium mb-10"
              >
                 Don't rely on individual store managers to manualy update labor rules. Our "Global Policy Engine" allows you to push regional or global updates to every site in your empire with a single click. Compliance, standardized.
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {[
                   { title: "One-Click Sync", desc: "Push labor law updates across state lines instantly.", icon: <Globe className="w-5 h-5" /> },
                   { title: "Centralized Audit", desc: "Every policy change is logged for legal accountability.", icon: <CheckCircle2 className="w-5 h-5" /> },
                   { title: "Regional Logic", desc: "Group sites by state/region to apply localized rules.", icon: <ShieldCheck className="w-5 h-5" /> },
                   { title: "Brand Alignment", desc: "Ensure every branch follows your corporate guidelines.", icon: <Zap className="w-5 h-5" /> },
                 ].map((item, i) => (
                    <motion.div 
                       key={i}
                       initial={{ opacity: 0, y: 10 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.1 }}
                       className="flex items-start gap-4"
                    >
                       <div className="mt-1 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-brand-primary">
                          {item.icon}
                       </div>
                       <div>
                          <div className="text-white font-black text-lg mb-1">{item.title}</div>
                          <div className="text-slate-400 text-sm font-medium leading-relaxed">{item.desc}</div>
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
