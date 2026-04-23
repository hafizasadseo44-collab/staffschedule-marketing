"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, ShieldCheck, Globe, Cpu, 
  Layers, Cloud, Workflow, Bot
} from "lucide-react";

const ghostLogos = [
  { name: "Café Central", Icon: Zap },
  { name: "GreenBowl", Icon: ShieldCheck },
  { name: "UrbanFuel", Icon: Globe },
  { name: "QuickMart", Icon: Cpu },
  { name: "HealthyLife", Icon: Layers },
  { name: "BrightSide", Icon: Cloud },
  { name: "MetroStaff", Icon: Workflow },
  { name: "PrimeCare", Icon: Bot },
];

const LogosMarquee = () => {
  return (
    <section className="py-12 bg-white dark:bg-brand-dark/50 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 mb-10 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 mb-6"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
             Elite Global Teams
          </span>
        </motion.div>
        
        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">
           Trusted by leading businesses worldwide
        </h2>
      </div>

      <div className="relative flex overflow-x-hidden group py-6">
        <motion.div
           animate={{ x: ["0%", "-50%"] }}
           transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
           className="flex whitespace-nowrap min-w-max gap-24 items-center px-12"
        >
           {[...ghostLogos, ...ghostLogos].map((logo, i) => (
             <motion.div
               key={i}
               whileHover={{ scale: 1.05, y: -5 }}
               className="flex items-center gap-4 text-slate-300 dark:text-slate-700 hover:text-brand-primary transition-all cursor-pointer group/logo"
             >
                <div className="p-3 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm group-hover/logo:shadow-brand-primary/10 transition-all">
                   <logo.Icon className="w-8 h-8 group-hover/logo:scale-110 transition-transform" />
                </div>
                <span className="text-2xl font-black tracking-tighter uppercase grayscale group-hover/logo:grayscale-0 transition-all">
                  {logo.name}
                </span>
             </motion.div>
           ))}
        </motion.div>
        
        {/* Glass Edge Overlays */}
        <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-white dark:from-brand-dark to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-white dark:from-brand-dark to-transparent z-20 pointer-events-none"></div>
      </div>

      {/* Subtle Bottom Separator */}
      <div className="max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent mt-8 opacity-50"></div>
    </section>
  );
};

export default LogosMarquee;
