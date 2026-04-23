"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const UltimateHero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-background">
      {/* Dynamic Background Blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 45, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-32 -top-32 w-[800px] h-[800px] bg-brand-primary/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -left-32 top-1/2 w-[600px] h-[600px] bg-brand-secondary/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-brand-primary/10 shadow-sm mb-8">
               <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" />
                  ))}
               </div>
               <span className="text-xs font-black uppercase tracking-widest text-brand-slate dark:text-slate-400 flex items-center gap-2">
                 <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                 Join 5,000+ top-tier managers
               </span>
            </div>

            <h1 className="text-6xl lg:text-[5.5rem] font-black leading-[0.95] tracking-tight text-brand-dark dark:text-white mb-8">
              Workforce <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                Simplified.
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-brand-slate dark:text-slate-400 font-medium mb-12 max-w-xl leading-relaxed">
              The premium hub for modern teams. Schedule faster, track efficiency, 
              and build a workforce that never stops growing.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 mb-12">
               <Link 
                 href="https://app.staffschedule.io/signup.php"
                 className={cn(
                   buttonVariants({ variant: "default" }),
                   "w-full sm:w-auto h-16 px-10 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-2xl text-xl font-black shadow-2xl shadow-brand-primary/30 transition-all hover:scale-[1.05] active:scale-[0.98] flex items-center justify-center pt-0 pb-0"
                 )}
               >
                 Start Free Trial
                 <ArrowRight className="w-6 h-6 ml-2" />
               </Link>
               <Link 
                 href="#demo"
                 className={cn(
                   buttonVariants({ variant: "ghost" }),
                   "w-full sm:w-auto h-16 px-10 border border-border bg-white dark:bg-slate-800 rounded-2xl text-xl font-black hover:bg-slate-50 transition-all flex items-center justify-center pt-0 pb-0"
                 )}
               >
                 Watch Demo
               </Link>
            </div>

            <div className="flex flex-wrap items-center gap-8">
               {[
                 { icon: <ShieldCheck className="w-5 h-5" />, text: "Enterprise Security" },
                 { icon: <Zap className="w-5 h-5" />, text: "Lightning Fast" }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-2.5">
                    <div className="text-brand-success">{item.icon}</div>
                    <span className="text-sm font-black text-brand-slate dark:text-slate-500">{item.text}</span>
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Visual Column */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            {/* The Main Mockup */}
            <div className="relative z-10 p-4 bg-white/50 backdrop-blur rounded-[3.5rem] border-2 border-white dark:border-slate-800 shadow-[0_64px_128px_-16px_rgba(79,70,229,0.15)] overflow-hidden">
               <div className="relative group rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-900 border border-border aspect-[13/10]">
                  {/* Browser Bar */}
                  <div className="absolute top-0 left-0 right-0 h-12 bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur border-b border-border z-20 flex items-center px-6 gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-rose-400 shadow-lg shadow-rose-400/20"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400 shadow-lg shadow-amber-400/20"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/20"></div>
                    </div>
                    <div className="flex-1 max-w-[200px] mx-auto h-7 bg-white dark:bg-slate-900 rounded-lg border border-border flex items-center px-3 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                      app.staffschedule.io / dashboard
                    </div>
                  </div>

                  <img 
                    src="/images/dashboard.png" 
                    alt="StaffSchedule Dashboard" 
                    className="w-full h-full object-cover object-top pt-12 hover:scale-[1.03] transition-transform duration-1000 ease-out"
                  />
               </div>
            </div>

            {/* Floating UI Elements */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 z-20 bg-white/90 backdrop-blur p-6 rounded-3xl shadow-2xl border border-border hidden sm:block"
            >
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-success/10 flex items-center justify-center text-brand-success">
                     <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Efficiency</p>
                     <p className="text-lg font-black text-brand-dark">+24% Monthly</p>
                  </div>
               </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 z-20 bg-brand-dark p-6 rounded-3xl shadow-2xl border border-white/10 hidden sm:block"
            >
               <div className="flex items-center gap-4">
                  <div className="bg-brand-primary/20 p-3 rounded-xl border border-brand-primary/20">
                     <Zap className="w-6 h-6 text-brand-primary fill-brand-primary" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Real-time Sync</p>
                     <p className="text-lg font-black text-white">100% Active</p>
                  </div>
               </div>
            </motion.div>

            {/* Glowing Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-primary/10 rounded-full blur-[120px] -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UltimateHero;
