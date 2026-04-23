"use client";

import React from "react";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Tablet, BadgeDollarSign } from "lucide-react";

export default function AttendanceHardware() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1">
             <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-brand-slate dark:text-slate-300 font-bold text-xs uppercase tracking-widest mb-6"
              >
                No Hardware Costs
              </motion.div>
              <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight"
              >
                 Turn any device into a <span className="text-brand-primary">secure punch clock.</span>
              </motion.h2>
              <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="text-lg text-brand-slate dark:text-slate-400 font-medium mb-8"
              >
                 Stop wasting thousands of dollars on proprietary biometric scanners that break down. StaffSchedule.io runs securely on the hardware you already own.
              </motion.p>
              
              <ul className="space-y-6">
                 {[
                   { icon: <Tablet className="w-5 h-5 text-indigo-500" />, title: "Tablets & iPads", desc: "Wall-mount an iPad at your entrance for Kiosk mode." },
                   { icon: <Smartphone className="w-5 h-5 text-emerald-500" />, title: "Personal Smartphones", desc: "Staff use their own phones, strictly verified by GPS." },
                   { icon: <Monitor className="w-5 h-5 text-rose-500" />, title: "Desktop Browsers", desc: "Perfect for office workers and managers reviewing timesheets." },
                 ].map((item, i) => (
                    <motion.li 
                       key={i} 
                       initial={{ opacity: 0, x: -20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.1 }}
                       className="flex items-start gap-4"
                    >
                       <div className="mt-1 w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow flex items-center justify-center shrink-0 border border-border">
                          {item.icon}
                       </div>
                       <div>
                          <div className="text-brand-dark dark:text-white font-black text-xl mb-1">{item.title}</div>
                          <div className="text-brand-slate dark:text-slate-400 font-medium">{item.desc}</div>
                       </div>
                    </motion.li>
                 ))}
              </ul>
          </div>

          <div className="flex-1 w-full max-w-lg lg:max-w-none relative aspect-square flex items-center justify-center pointer-events-none">
             <div className="absolute inset-0 bg-brand-primary/5 rounded-full blur-[100px]" />
             
             {/* iPad Layout */}
             <motion.div 
                animate={{ y: [-10, 10] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="absolute z-10 w-64 h-80 bg-slate-900 rounded-3xl border-8 border-slate-800 shadow-2xl overflow-hidden flex flex-col pt-8 pb-4 px-4 translate-x-[-20%] translate-y-[10%]"
             >
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-700" />
                <div className="w-full h-8 bg-slate-800 rounded mb-4" />
                <div className="w-full flex-1 bg-brand-primary/20 rounded-xl border border-brand-primary/30 flex items-center justify-center">
                   <div className="text-brand-primary font-black opacity-50">KIOSK</div>
                </div>
                <div className="w-full grid grid-cols-3 gap-2 mt-4">
                   {[...Array(9)].map((_,i) => <div key={i} className="h-6 bg-slate-800 rounded" />)}
                </div>
             </motion.div>

             {/* iPhone Layout */}
             <motion.div 
                animate={{ y: [10, -10] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1, ease: "easeInOut" }}
                className="absolute z-20 w-40 h-80 bg-white dark:bg-brand-dark rounded-[2.5rem] border-8 border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col pt-6 pb-2 px-3 translate-x-[40%] translate-y-[-10%]"
             >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-slate-100 dark:bg-slate-800 rounded-b-xl" />
                <div className="w-full h-1/2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 flex flex-col items-center justify-center gap-2 mb-3">
                   <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-emerald-500 rounded-full animate-ping" />
                   </div>
                   <div className="w-16 h-2 bg-emerald-500/40 rounded-full" />
                </div>
                <div className="w-full flex-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl" />
                <div className="w-12 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mt-2" />
             </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
