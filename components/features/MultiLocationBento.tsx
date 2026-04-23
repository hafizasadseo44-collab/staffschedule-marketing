"use client";

import React from "react";
import { motion } from "framer-motion";
import { Network, Users2, ShieldCheck, Globe, Clock, Layers, LayoutGrid, Database, BarChart3 } from "lucide-react";

export default function MultiLocationBento() {
  return (
    <section className="py-24 lg:py-32 bg-slate-50 dark:bg-brand-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6"
          >
            Enterprise Infrastructure
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight"
          >
            Built for your <br />
            <span className="text-brand-primary">expanding empire.</span>
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-lg text-brand-slate dark:text-slate-400 font-medium"
          >
            Whether you run 3 stores or 3,000, StaffSchedule.io provides the structural integrity to manage them all from one professional dashboard.
          </motion.p>
        </div>

        {/* 3x3 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[320px]">
          
          {/* 1. Regional Hierarchy (Wide, Row 1, Col 1-2) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 lg:p-8 relative overflow-hidden group shadow-xl flex flex-col justify-center border border-border"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl" />
             
             <div className="relative z-10 w-full sm:w-1/2">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-brand-primary/10 rounded-xl lg:rounded-2xl flex items-center justify-center text-brand-primary mb-4 lg:mb-6">
                   <Layers className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <h3 className="text-xl lg:text-2xl font-black text-brand-dark dark:text-white mb-2 lg:mb-3">Regional Permissions</h3>
                <p className="text-brand-slate dark:text-slate-400 font-medium text-sm sm:text-base leading-relaxed">Define multiple management layers. Branch managers, Area Managers, and Global Owners see exactly what's relevant to them.</p>
             </div>
             
             {/* Animated Hierarchy Tree */}
             <div className="hidden sm:flex absolute right-4 lg:right-12 inset-y-0 w-1/2 items-center justify-center pointer-events-none">
                <div className="relative flex flex-col items-center gap-8">
                   <div className="w-16 h-16 bg-brand-dark rounded-xl border border-slate-800 flex items-center justify-center text-white shadow-xl">
                      <Globe className="w-6 h-6" />
                   </div>
                   <div className="flex gap-12 relative">
                      {/* Connecting lines */}
                      <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 h-[30px] w-px bg-slate-200 dark:bg-slate-700" />
                      <div className="absolute top-[-30px] left-[-30px] right-[-30px] h-px bg-slate-200 dark:bg-slate-700" />
                      
                      <motion.div 
                         animate={{ y: [0, -5, 0] }}
                         transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                         className="w-12 h-12 bg-white dark:bg-slate-800 rounded-lg border border-border flex items-center justify-center shadow-md relative"
                      >
                         <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 h-[30px] w-px bg-slate-200 dark:bg-slate-700" />
                         <LayoutGrid className="w-5 h-5 text-brand-primary" />
                      </motion.div>
                      <motion.div 
                         animate={{ y: [0, 5, 0] }}
                         transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                         className="w-12 h-12 bg-white dark:bg-slate-800 rounded-lg border border-border flex items-center justify-center shadow-md relative"
                      >
                         <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 h-[30px] w-px bg-slate-200 dark:bg-slate-700" />
                         <LayoutGrid className="w-5 h-5 text-brand-primary" />
                      </motion.div>
                   </div>
                </div>
             </div>
          </motion.div>

          {/* 2. Global Compliance (Square, Row 1, Col 3) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="col-span-1 row-span-1 bg-brand-primary rounded-[2.5rem] border border-brand-primary shadow-xl p-6 lg:p-8 relative overflow-hidden group flex flex-col"
          >
             <div className="flex-1 relative flex items-center justify-center min-h-[120px]">
                <div className="relative">
                   <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 flex items-center justify-center"
                   >
                      <ShieldCheck className="w-10 h-10 text-white" />
                   </motion.div>
                   <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-lg px-2 py-0.5 text-[10px] font-black text-white shadow-lg">100% OK</div>
                </div>
             </div>
             <div className="relative z-10 mt-auto">
                <h3 className="text-lg lg:text-xl font-black text-white mb-2">Cross-Site Compliance</h3>
                <p className="text-xs sm:text-sm font-medium text-indigo-100 line-clamp-3">Enforce labor laws and company policies uniformly across every region with one settings update.</p>
             </div>
          </motion.div>

          {/* 3. Global Database (Square, Row 2, Col 1) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="col-span-1 row-span-1 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-border shadow-xl p-6 lg:p-8 relative overflow-hidden group flex flex-col"
          >
             <div className="flex-1 flex items-center justify-center min-h-[100px]">
                <div className="relative">
                   <motion.div 
                      animate={{ rotateY: 180 }}
                      transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                      className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-border flex items-center justify-center"
                   >
                      <Database className="w-8 h-8 text-brand-primary" />
                   </motion.div>
                </div>
             </div>
             <div className="relative z-10 mt-auto">
                <h3 className="text-lg lg:text-xl font-black text-brand-dark dark:text-white mb-2">Centralized Records</h3>
                <p className="text-xs sm:text-sm font-bold text-brand-slate dark:text-slate-400 line-clamp-3">Employee data travels with them. No more duplicate profiles for staff working multiple locations.</p>
             </div>
          </motion.div>

          {/* 4. Multi-Zone Support (Wide, Row 2, Col 2-3) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-brand-dark rounded-[2.5rem] border border-slate-800 shadow-xl p-6 lg:p-8 relative overflow-hidden group flex flex-col justify-center"
          >
             <div className="relative z-10 w-full sm:w-1/2 min-h-[120px]">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 rounded-xl lg:rounded-2xl flex items-center justify-center text-white mb-4 lg:mb-6">
                   <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-brand-primary" />
                </div>
                <h3 className="text-lg lg:text-xl font-black text-white mb-2">Infinite Timezones</h3>
                <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Globally Syncronized</p>
                <p className="text-xs sm:text-sm font-medium text-slate-300">StaffSchedule.io handles the math for different timezones and regional labor laws automatically. Perfect for interstate or international teams.</p>
             </div>
             
             {/* Animated Clocks */}
             <div className="hidden sm:flex absolute right-0 inset-y-0 w-1/2 p-6 flex-col justify-center gap-4">
                {[
                   { city: 'New York', color: 'bg-brand-primary' },
                   { city: 'London', color: 'bg-indigo-500' },
                   { city: 'Dubai', color: 'bg-emerald-500' },
                ].map((item, i) => (
                   <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                      className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 flex justify-between items-center"
                   >
                      <span className="text-xs font-bold text-white uppercase tracking-widest">{item.city}</span>
                      <div className={`px-2 py-0.5 rounded ${item.color} text-[10px] font-black text-white uppercase`}>Sync'd</div>
                   </motion.div>
                ))}
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
