"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingDown, Zap, CreditCard } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const FinalCTA = () => {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white dark:bg-[#020617] overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-[#0F172A] rounded-[3rem] md:rounded-[4rem] p-10 md:p-16 lg:p-24 overflow-hidden text-center border-t border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] z-10"
        >
          {/* --- AMBIENT ATMOSPHERICS --- */}
          <div className="absolute inset-0 pointer-events-none">
             <motion.div 
               animate={{ 
                 scale: [1, 1.2, 1],
                 opacity: [0.2, 0.3, 0.2],
                 x: [0, 50, 0],
               }}
               transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-indigo-500/30 rounded-full blur-[140px]" 
             />
             <motion.div 
               animate={{ 
                 scale: [1, 1.3, 1],
                 opacity: [0.15, 0.25, 0.15],
                 x: [0, -30, 0],
               }}
               transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
               className="absolute -bottom-1/2 -left-1/4 w-[700px] h-[700px] bg-purple-500/20 rounded-full blur-[140px]" 
             />
             {/* Subtle noise grain */}
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
          </div>

          <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center">
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2 bg-white/[0.03] rounded-full text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-10 border border-white/5 backdrop-blur-xl"
             >
                <Sparkles className="w-3.5 h-3.5" />
                Stop the scheduling chaos
             </motion.div>

             <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-5xl font-black text-white mb-8 leading-[1.1] tracking-tight"
             >
                Stop wasting hours on spreadsheets. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-[length:200%_auto] animate-gradient">
                   Automate your operations.
                </span>
             </motion.h2>

             <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-slate-400 font-medium mb-14 max-w-2xl mx-auto leading-relaxed"
             >
                Cut labor costs. Eliminate no-shows. Join thousands of high-performing locations using StaffSchedule.io to perfectly staff every shift.
             </motion.p>

             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto"
             >
                <Link 
                  href="https://app.staffschedule.io/onboarding.php?start_trial=1"
                  className="h-16 px-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-base font-black transition-all shadow-[0_20px_40px_-10px_rgba(79,70,229,0.4)] hover:shadow-[0_25px_50px_-10px_rgba(79,70,229,0.5)] hover:-translate-y-1 flex items-center justify-center gap-3 group"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/contact"
                  className="h-16 px-10 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl text-base font-black hover:-translate-y-1 transition-all flex items-center justify-center"
                >
                  Contact Sales
                </Link>
             </motion.div>

             <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="mt-12 flex flex-wrap justify-center items-center gap-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]"
             >
                <span className="flex items-center gap-2"><div className="w-1 h-1 bg-indigo-500 rounded-full" /> No Credit Card Required</span>
                <span className="flex items-center gap-2"><div className="w-1 h-1 bg-indigo-500 rounded-full" /> Free 15-Day Trial</span>
                <span className="flex items-center gap-2"><div className="w-1 h-1 bg-indigo-500 rounded-full" /> Setup In Minutes</span>
             </motion.div>
          </div>
        </motion.div>

        {/* --- FLOATING STATUS BADGES --- */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          animate={{ y: [0, -12, 0] }}
          transition={{ 
            opacity: { delay: 0.8 },
            x: { delay: 0.8 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute hidden xl:flex items-center gap-4 top-16 right-0 z-20 bg-[#0F172A]/80 backdrop-blur-2xl border border-white/10 pl-4 pr-6 py-3 rounded-2xl shadow-2xl"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <TrendingDown className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Efficiency</span>
            <span className="text-white font-bold text-sm">Reduce Overtime</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          animate={{ y: [0, 15, 0] }}
          transition={{ 
            opacity: { delay: 0.9 },
            x: { delay: 0.9 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
          className="absolute hidden xl:flex items-center gap-4 bottom-32 left-0 z-20 bg-[#0F172A]/80 backdrop-blur-2xl border border-white/10 pl-4 pr-6 py-3 rounded-2xl shadow-2xl"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Attendance</span>
            <span className="text-white font-bold text-sm">Zero No-Shows</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ 
            opacity: { delay: 1 },
            y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }
          }}
          className="absolute hidden xl:flex items-center gap-4 bottom-12 right-12 z-20 bg-[#0F172A]/80 backdrop-blur-2xl border border-white/10 pl-4 pr-6 py-3 rounded-2xl shadow-2xl"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
            <CreditCard className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Operations</span>
            <span className="text-white font-bold text-sm">POS Syncing</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
