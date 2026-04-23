"use client";

import React from "react";
import { motion } from "framer-motion";
import { RefreshCw, Users, ShieldCheck, Zap, Heart, MessageSquare } from "lucide-react";

export default function ShiftSwapsBento() {
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
            Peer-to-Peer Coverage
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 tracking-tight">
            Managers: <br />
            <span className="text-brand-primary">Get your time back.</span>
          </h2>
          <p className="text-lg text-brand-slate dark:text-slate-400 font-medium leading-relaxed">
            Staff and managers both love our simplified swap workflow. Employees handle the back-and-forth, and you only see the final request for approval.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* 1. Mobile First (Wide) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="col-span-1 md:col-span-2 row-span-1 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden group border border-border"
          >
             <div className="relative z-10 w-full md:w-1/2 h-full flex flex-col justify-center">
                <div className="w-12 h-12 bg-brand-secondary/10 rounded-2xl flex items-center justify-center text-brand-secondary mb-6">
                   <RefreshCw className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-brand-dark dark:text-white mb-3">One-Tap Swap Initiation</h3>
                <p className="text-brand-slate dark:text-slate-400 font-medium leading-relaxed">Staff can select a shift, browse available team members for trade, and send a swap request in seconds.</p>
             </div>
             
             {/* Visual: Swap Animation */}
             <div className="hidden md:flex absolute right-12 inset-y-0 items-center justify-center w-1/3">
                <div className="relative flex items-center gap-8">
                   <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full border border-border shadow-xl flex items-center justify-center">
                      <Users className="w-8 h-8 text-brand-primary" />
                   </div>
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                     className="text-brand-primary"
                   >
                      <RefreshCw className="w-8 h-8" />
                   </motion.div>
                   <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full border border-border shadow-xl flex items-center justify-center">
                      <Users className="w-8 h-8 text-brand-secondary" />
                   </div>
                </div>
             </div>
          </motion.div>

          {/* 2. Chat Integration (Square) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="col-span-1 row-span-1 bg-brand-secondary rounded-[2.5rem] p-8 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
             <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
             </div>
             <div>
                <h3 className="text-xl font-black mb-2">Integrated Chat</h3>
                <p className="text-sm font-medium opacity-80 leading-relaxed">Staff can message each other directly to discuss the swap without sharing personal phone numbers.</p>
             </div>
          </motion.div>

          {/* 3. Manager Approval (Square) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="col-span-1 row-span-1 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-border shadow-lg flex flex-col justify-between"
          >
             <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                <ShieldCheck className="w-6 h-6" />
             </div>
             <div>
                <h3 className="text-xl font-black text-brand-dark dark:text-white mb-2">The Final Word</h3>
                <p className="text-brand-slate dark:text-slate-400 text-sm font-medium leading-relaxed">Manager receives a final notification to Approve or Decline once both staff members agree.</p>
             </div>
          </motion.div>

          {/* 4. Auto-Update (Wide) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="col-span-1 md:col-span-2 row-span-1 bg-brand-dark rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden group border border-slate-800"
          >
             <div className="relative z-10 w-full md:w-1/2 h-full flex flex-col justify-center">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-6">
                   <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Zero-Rebuild Rota</h3>
                <p className="text-slate-400 font-medium leading-relaxed">Approved swaps update the roster across all devices instantly. No manual typing, no error risk.</p>
             </div>
             
             {/* Visual Overlay: Live Sync */}
             <div className="hidden md:flex absolute right-12 inset-y-0 w-1/3 items-center justify-center">
                <div className="relative">
                   <motion.div 
                     animate={{ x: [-20, 20, -20] }}
                     transition={{ duration: 5, repeat: Infinity }}
                     className="bg-brand-primary/10 text-brand-primary px-6 py-3 rounded-2xl border border-brand-primary/20 flex items-center gap-3 font-black text-xs uppercase tracking-widest"
                   >
                      <RefreshCw className="w-4 h-4 animate-spin-slow" /> Rota Synced
                   </motion.div>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
