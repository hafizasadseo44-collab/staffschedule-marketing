"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smartphone, CheckCircle2 } from "lucide-react";

export default function MobileAppShowcase() {
  return (
    <section className="py-24 lg:py-32 bg-brand-primary dark:bg-brand-dark overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs uppercase tracking-widest mb-8 backdrop-blur-sm"
             >
               <Smartphone className="w-4 h-4" /> Native Mobile App
             </motion.div>

             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-8 leading-[1.1]"
             >
               Your business in <br className="hidden lg:block" />
               <span className="text-emerald-300">their pocket.</span>
             </motion.h2>

             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-lg lg:text-xl text-white/80 font-medium max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
             >
               StaffSchedule isn't just a clunky web portal. Our native iOS & Android apps give your team lightning-fast access to their shifts, timecards, and team chat 24/7.
             </motion.p>

             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="flex flex-col gap-5 mb-12"
             >
               {[
                 "Seamless Shift Swapping",
                 "Instant Push Notifications",
                 "GPS-Enabled Clock In/Out"
               ].map((feature, i) => (
                 <div key={i} className="flex items-center justify-center lg:justify-start gap-4 text-white">
                   <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                     <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                   </div>
                   <span className="text-lg font-bold">{feature}</span>
                 </div>
               ))}
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
               className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
             >
               <button className="flex items-center gap-3 bg-white text-slate-900 px-6 py-4 rounded-xl font-bold hover:scale-105 transition-transform active:scale-95 shadow-xl text-sm tracking-wide">
                 GET IT FOR iOS
               </button>
               <button className="flex items-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-xl font-bold hover:scale-105 transition-transform active:scale-95 border border-white/20 shadow-xl text-sm tracking-wide">
                 GET IT FOR ANDROID
               </button>
             </motion.div>
          </div>

          {/* Right Mobile Visuals */}
          <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[700px] flex items-center justify-center pointer-events-none">
             <div className="absolute inset-0 bg-white/5 rounded-full blur-[100px]" />
             
             <motion.div 
               initial={{ opacity: 0, y: 50, rotate: -5 }}
               whileInView={{ opacity: 1, y: 0, rotate: -5 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, type: "spring" }}
               className="absolute z-20 left-4 lg:left-0 top-10 lg:top-20 w-[240px] lg:w-[280px] aspect-[1/2] bg-[#0F172A] rounded-[2.5rem] border-[12px] border-slate-900 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] overflow-hidden"
             >
                <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 rounded-b-2xl w-1/2 mx-auto z-10" />
                <div className="p-5 pt-10 flex flex-col gap-4 relative h-full">
                  <div className="w-full h-32 bg-brand-primary/20 rounded-2xl" />
                  <div className="w-full h-16 bg-slate-800 rounded-xl" />
                  <div className="w-full h-16 bg-slate-800 rounded-xl" />
                  <div className="w-full h-16 bg-slate-800 rounded-xl" />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-slate-700 rounded-full" />
                </div>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, y: 100, rotate: 5 }}
               whileInView={{ opacity: 1, y: 20, rotate: 5 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
               className="absolute z-10 right-4 lg:right-0 bottom-10 lg:bottom-20 w-[240px] lg:w-[280px] aspect-[1/2] bg-white rounded-[2.5rem] border-[12px] border-slate-200 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] overflow-hidden"
             >
               <div className="p-5 pt-8 flex flex-col gap-4">
                 <div className="w-full h-12 bg-slate-100 rounded-xl flex items-center px-4">
                   <div className="w-8 h-8 rounded-full bg-emerald-500" />
                   <div className="h-3 w-1/2 bg-slate-200 rounded-full ml-3" />
                 </div>
                 <div className="w-full h-32 bg-slate-50 border border-slate-100 rounded-xl shadow-sm" />
                 <div className="w-full h-20 bg-slate-50 border border-slate-100 rounded-xl shadow-sm" />
               </div>
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
