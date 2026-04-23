"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Clock, MapPin, ShieldCheck, XCircle } from "lucide-react";

export default function TimeTheftVsVerified() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight"
          >
            Stop Paying for <span className="text-rose-500">Unworked Hours.</span>
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-lg text-brand-slate dark:text-slate-400 font-medium"
          >
            Manual rounding and buddy punching bleed up to 5% of gross payroll. Switch to verifiable GPS punch data.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* THE OLD WAY */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] p-8 lg:p-12 border border-slate-200 dark:border-slate-700 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent pointer-events-none" />
            
            <div className="mb-8 relative z-10 flex items-center justify-between">
               <h3 className="text-2xl font-black text-slate-800 dark:text-slate-200">The Old Way</h3>
               <div className="px-3 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-widest rounded-full flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Expensive
               </div>
            </div>

            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 shadow-inner shadow-slate-300 dark:shadow-slate-900">
               <img src="/images/attendance-paper-v1.jpg" alt="Messy timesheets" className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute inset-0 bg-slate-900/40" />
               <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="bg-rose-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm font-black mb-3 -rotate-3 shadow-xl">
                     Buddy Punching Occurring
                  </div>
                  <div className="bg-white/90 text-slate-900 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-black rotate-2 shadow-xl">
                     "I forgot what time I came in"
                  </div>
               </div>
            </div>

            <ul className="space-y-4 relative z-10">
               {[
                 "Staff clocking in for their friends",
                 "Rounding up shifts to the nearest 15 mins",
                 "Arguments over hours actually worked",
                 "Zero proof of physical location"
               ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                     <div className="mt-1 w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center shrink-0">
                        <XCircle className="w-3.5 h-3.5 text-rose-500" />
                     </div>
                     <span className="text-slate-600 dark:text-slate-400 font-medium">{item}</span>
                  </li>
               ))}
            </ul>
          </motion.div>

          {/* VS Divider */}
          <div className="hidden lg:flex flex-col items-center justify-center -mx-10 z-20">
             <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-full shadow-2xl flex items-center justify-center border-4 border-slate-50 dark:border-slate-800 font-black text-slate-400 text-xl tracking-tighter">
                VS
             </div>
          </div>

          {/* THE NEW WAY */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 lg:p-12 border-2 border-emerald-500/20 shadow-2xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors"
          >
            <div className="absolute lg:top-[-20%] lg:right-[-20%] w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="mb-8 relative z-10 flex items-center justify-between">
               <h3 className="text-2xl font-black text-brand-dark dark:text-white">With Verification</h3>
               <div className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest rounded-full flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> 100% Accurate
               </div>
            </div>

            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 shadow-xl">
               <img src="/images/attendance-manager-v1.jpg" alt="Manager verifying data" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-brand-dark/90 backdrop-blur-md rounded-xl p-3 flex items-center gap-4 shadow-lg border border-border">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center shrink-0">
                     <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                     <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">Punch Verified</div>
                     <div className="text-sm font-black text-brand-dark dark:text-white">Main Branch • 08:58 AM</div>
                  </div>
               </div>
            </div>

            <ul className="space-y-4 relative z-10">
               {[
                 "GPS geofencing ensures staff are on-site",
                 "Exact down-to-the-minute timestamping",
                 "Biometric Kiosk mode blocks buddy punching",
                 "Immutable, payroll-ready digital records"
               ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                     <div className="mt-1 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                     </div>
                     <span className="text-brand-dark dark:text-slate-300 font-bold">{item}</span>
                  </li>
               ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// Internal icon import fix
import { CheckCircle } from "lucide-react";
