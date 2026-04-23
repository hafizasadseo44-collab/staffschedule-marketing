"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Users, Bell, Rocket, ShieldCheck, Heart } from "lucide-react";

export default function OpenShiftsBento() {
  return (
    <section className="py-24 bg-white dark:bg-brand-dark overflow-hidden relative border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6"
          >
            The Marketplace
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 tracking-tight">
            Fill every shift <br />
            <span className="text-brand-primary text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
               without making a single call.
            </span>
          </h2>
          <p className="text-lg text-brand-slate dark:text-slate-400 font-medium leading-relaxed">
            Stop the panic of last-minute cancellations. Post unfilled shifts to the Marketplace and watch them disappear as staff claim them instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* 1. Instant Push (Wide) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="col-span-1 md:col-span-2 row-span-1 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden group border border-border"
          >
             <div className="relative z-10 w-full md:w-1/2 h-full flex flex-col justify-center">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-6">
                   <Bell className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-brand-dark dark:text-white mb-3">Instant Push Broadcast</h3>
                <p className="text-brand-slate dark:text-slate-400 font-medium leading-relaxed">The second you post an open shift, qualified staff receive a push notification instantly. No texts, no calls, just results.</p>
             </div>
             
             {/* Visual: Floating Notifications */}
             <div className="hidden md:flex absolute right-12 inset-y-0 items-center justify-center w-1/3">
                <div className="flex flex-col gap-4">
                   {[1,2,3].map(i => (
                      <motion.div 
                        key={i}
                        animate={{ x: [0, 5, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
                        className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-border shadow-xl flex items-center gap-4"
                      >
                         <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white">
                            <Zap className="w-4 h-4 fill-white" />
                         </div>
                         <div className="text-xs font-black text-brand-dark dark:text-white">Shift Available!</div>
                      </motion.div>
                   ))}
                </div>
             </div>
          </motion.div>

          {/* 2. Urgent Rewards (Square) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="col-span-1 row-span-1 bg-brand-primary rounded-[2.5rem] p-8 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
             <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <Rocket className="w-6 h-6" />
             </div>
             <div>
                <h3 className="text-xl font-black mb-2">Incentive Modifiers</h3>
                <p className="text-sm font-medium opacity-80 leading-relaxed">Need a shift filled urgently? Add a temporary bonus or reward to the shift to make it more attractive.</p>
             </div>
          </motion.div>

          {/* 3. Qualified Staff (Square) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="col-span-1 row-span-1 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-border shadow-lg flex flex-col justify-between"
          >
             <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500">
                <Users className="w-6 h-6" />
             </div>
             <div>
                <h3 className="text-xl font-black text-brand-dark dark:text-white mb-2">Qualified Only</h3>
                <p className="text-brand-slate dark:text-slate-400 text-sm font-medium leading-relaxed">Open shifts are only shown to staff who have the correct training, department, and skills.</p>
             </div>
          </motion.div>

          {/* 4. Auto-Approval (Wide) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="col-span-1 md:col-span-2 row-span-1 bg-slate-900 rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden group border border-slate-800"
          >
             <div className="relative z-10 w-full md:w-1/2 h-full flex flex-col justify-center">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-6">
                   <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Compliance Guardrails</h3>
                <p className="text-slate-400 font-medium leading-relaxed">The system automatically blocks staff from claiming shifts if it would result in overtime or breach labor laws.</p>
             </div>
             
             {/* Visual Overlay: Compliance Check */}
             <div className="hidden md:flex absolute right-12 inset-y-0 w-1/3 items-center justify-center">
                <div className="relative">
                   <div className="w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl absolute inset-0" />
                   <div className="relative bg-emerald-500 p-6 rounded-3xl border border-white/20 shadow-2xl flex flex-col items-center gap-2">
                       <CheckCircle2 className="w-8 h-8 text-white" />
                       <span className="text-[10px] font-black text-white uppercase tracking-widest text-center">Compliance<br/>Passed</span>
                   </div>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
