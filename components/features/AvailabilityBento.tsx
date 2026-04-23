"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Zap, CheckCircle2, Layout, Smartphone } from "lucide-react";

export default function AvailabilityBento() {
  return (
    <section className="py-24 bg-white dark:bg-brand-dark overflow-hidden relative border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 font-bold text-xs uppercase tracking-widest mb-6"
          >
            Staff-Led Planning
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 tracking-tight">
            Built for staff, <br />
            <span className="text-emerald-500">trusted by managers.</span>
          </h2>
          <p className="text-lg text-brand-slate dark:text-slate-400 font-medium leading-relaxed">
            Eliminate scheduling conflicts by putting staff in control of their own time. When staff provide availability, the system ensures they are only ever scheduled when they want to be.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* 1. Universal Sync (Wide Top) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="col-span-1 md:col-span-2 row-span-1 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden group border border-border"
          >
             <div className="relative z-10 w-full md:w-1/2 h-full flex flex-col justify-center">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-6">
                   <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-brand-dark dark:text-white mb-3">Instant Rota Integration</h3>
                <p className="text-brand-slate dark:text-slate-400 font-medium leading-relaxed">Staff availability is reflected directly on the manager's scheduler. See green 'Preferred' and red 'Unavailable' indicators as you build.</p>
             </div>
             
             {/* Visual: Floating Grid Items */}
             <div className="hidden md:flex absolute right-4 lg:right-12 inset-y-0 items-center justify-center w-1/3">
                <div className="grid grid-cols-3 gap-2 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-border shadow-2xl">
                   {[1,2,3,4,5,6,7,8,9].map(i => (
                      <motion.div 
                        key={i}
                        animate={i % 3 === 0 ? { scale: [1, 1.1, 1], opacity: [0.3, 1, 0.3] } : {}}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        className={`w-10 h-10 rounded-lg ${i % 3 === 0 ? 'bg-emerald-500' : 'bg-slate-100 dark:bg-slate-700'}`}
                      />
                   ))}
                </div>
             </div>
          </motion.div>

          {/* 2. Mobile Friendly (Square) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="col-span-1 row-span-1 bg-brand-dark rounded-[2.5rem] p-8 flex flex-col justify-between border border-slate-800 relative overflow-hidden"
          >
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-primary/10 rounded-full blur-3xl" />
             <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-primary">
                <Smartphone className="w-6 h-6" />
             </div>
             <div>
                <h3 className="text-xl font-black text-white mb-2">Submit on the go</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">Staff can update their recurring availability or one-off 'Unavailables' directly from our iOS & Android apps.</p>
             </div>
          </motion.div>

          {/* 3. Repeating Patterns (Square) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="col-span-1 row-span-1 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-border shadow-lg flex flex-col justify-between"
          >
             <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                <Layout className="w-6 h-6" />
             </div>
             <div>
                <h3 className="text-xl font-black text-brand-dark dark:text-white mb-2">Repeating Patterns</h3>
                <p className="text-brand-slate dark:text-slate-400 text-sm font-medium leading-relaxed">Save time by setting 'Standard' weekly hours that repeat automatically until changed.</p>
             </div>
          </motion.div>

          {/* 4. Manager Oversight (Wide Bottom) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="col-span-1 md:col-span-2 row-span-1 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden group border border-border"
          >
             <div className="relative z-10 w-full md:w-1/2 h-full flex flex-col justify-center">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-6">
                   <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-brand-dark dark:text-white mb-3">Lock & Approval Control</h3>
                <p className="text-brand-slate dark:text-slate-400 font-medium leading-relaxed">Managers retain ultimate control. Lock availability dates or require manual approval for specific staff groups.</p>
             </div>
             
             {/* Visual Overlay: Lock Interaction */}
             <div className="hidden md:flex absolute right-12 inset-y-0 w-1/3 items-center justify-center">
                <div className="relative">
                   <div className="w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl absolute inset-0" />
                   <div className="relative bg-white dark:bg-slate-800 p-6 rounded-3xl border border-border shadow-2xl flex flex-col items-center gap-2">
                       <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                       <span className="text-xs font-black text-slate-500 uppercase tracking-widest text-center">Manager<br/>Verified</span>
                   </div>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
