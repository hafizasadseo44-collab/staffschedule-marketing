"use client";

import React from "react";
import { motion } from "framer-motion";
import { XCircle, CheckCircle2, MessageSquare, FileText, Smartphone, Calendar } from "lucide-react";

export default function ChaosVsCalm() {
  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-brand-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-black text-brand-dark dark:text-white mb-6"
          >
            Say goodbye to <span className="text-rose-500 underline decoration-rose-500/30 underline-offset-8">chaos.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-brand-slate dark:text-slate-400 font-medium max-w-2xl mx-auto"
          >
            Most managers spend 8+ hours a week fighting with spreadsheets and WhatsApp. 
            We replaced that with a single, automated source of truth.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-stretch rounded-[3rem] overflow-hidden border border-border shadow-2xl">
          {/* Chaos Side */}
          <div className="relative p-10 lg:p-16 bg-slate-50 dark:bg-slate-900 border-b lg:border-b-0 lg:border-r border-border">
            <div className="absolute top-8 left-8">
              <XCircle className="w-10 h-10 text-rose-500 opacity-20" />
            </div>
            
            <h3 className="text-2xl font-black text-slate-400 mb-12 uppercase tracking-widest">The Old Way</h3>
            
            <div className="space-y-8">
              {[
                { icon: <MessageSquare />, text: "WhatsApp group chat chaos", sub: "Important messages get lost in the noise." },
                { icon: <FileText />, text: "Excel spreadsheets & Paper rotas", sub: "Manual updates that are out-of-date instantly." },
                { icon: <Smartphone />, text: "Constant phone calls & texts", sub: "Mediation between staff swaps manually." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-5 items-start opacity-60 grayscale hover:grayscale-0 transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-500">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-black text-lg text-slate-600 dark:text-slate-400">{item.text}</div>
                    <div className="text-sm font-bold text-slate-400">{item.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Premium Photographic Visual - Chaos Side */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-rose-500/20 group grayscale hover:grayscale-0 transition-all duration-700"
            >
               <img 
                 src="/images/manager-chaos-v2.jpg" 
                 alt="Stressed Manager" 
                 className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
               <div className="absolute bottom-6 left-6 text-white font-black text-xl flex items-center gap-3">
                 <div className="w-3 h-3 rounded-full bg-rose-500" />
                 Lost messages, high stress.
               </div>
            </motion.div>
          </div>

          {/* Calm Side (StaffSchedule) */}
          <div className="relative p-10 lg:p-16 bg-white dark:bg-brand-dark overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-brand-primary/5 to-transparent pointer-events-none" />
            
            <div className="absolute top-8 right-8">
              <CheckCircle2 className="w-10 h-10 text-brand-primary" />
            </div>
            
            <h3 className="text-2xl font-black text-brand-primary mb-12 uppercase tracking-widest">The StaffSchedule Way</h3>
            
            <div className="space-y-8 relative z-10">
              {[
                { icon: <Calendar />, text: "One-click Publishing", sub: "Staff receive push notifications instantly." },
                { icon: <CheckCircle2 />, text: "Auto-Assign & Compliance", sub: "Match staff to shifts based on role and availability." },
                { icon: <Smartphone />, text: "Self-Service Swaps", sub: "Staff request and swap in the app. You just approve." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-5 items-start group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center shrink-0 text-brand-primary group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-black text-xl text-brand-dark dark:text-white">{item.text}</div>
                    <div className="text-sm font-bold text-brand-slate dark:text-slate-400">{item.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Premium Photographic Visual */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-border group"
            >
               <img 
                 src="/images/manager-calm-v2.jpg" 
                 alt="Calm Manager Using StaffSchedule" 
                 className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-black/10 to-transparent" />
               <div className="absolute bottom-6 left-6 text-white font-black text-xl flex items-center gap-3">
                 <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                 Total control, zero stress.
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
