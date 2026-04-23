"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, ShieldCheck, Database, Zap, ArrowRightLeft } from "lucide-react";

export default function PlatformArchitecture() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden relative border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1 w-full max-w-lg lg:max-w-none relative min-h-[500px] flex items-center justify-center">
             {/* Central Core */}
             <div className="relative z-10 w-32 h-32 md:w-48 md:h-48 bg-brand-dark rounded-[2.5rem] shadow-[0_0_50px_rgba(79,70,229,0.3)] flex items-center justify-center p-6 border-4 border-brand-primary/20">
                <div className="relative text-center">
                   <div className="text-white font-black text-2xl md:text-4xl leading-none">CORE</div>
                   <div className="text-brand-primary font-black text-[10px] md:text-xs uppercase tracking-[0.3em] mt-2">OS ENGNE</div>
                </div>
                {/* Orbital Rings */}
                <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-[-10px] border border-dashed border-brand-primary/40 rounded-[2.5rem]" 
                />
                <motion.div 
                   animate={{ rotate: -360 }}
                   transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-[-25px] border border-dashed border-brand-primary/20 rounded-[3rem]" 
                />
             </div>

             {/* Satellite Nodes */}
             <div className="absolute inset-0 flex items-center justify-center">
                {[
                   { icon: <Database />, label: "DB Engine", angle: 0 },
                   { icon: <ShieldCheck />, label: "Security", angle: 90 },
                   { icon: <Cpu />, label: "Worker API", angle: 180 },
                   { icon: <Zap />, label: "Real-time", angle: 270 },
                ].map((node, i) => (
                   <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                      style={{
                         transform: `rotate(${node.angle}deg) translate(clamp(120px, 20vw, 200px)) rotate(-${node.angle}deg)`
                      }}
                      className="absolute bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center gap-2"
                   >
                      <div className="text-brand-primary">{node.icon}</div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{node.label}</span>
                   </motion.div>
                ))}
             </div>

             {/* Connection Lines (SVG) */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-brand-primary" />
                <line x1="50" y1="50" x2="50" y2="20" stroke="currentColor" strokeWidth="0.1" className="text-brand-primary" />
                <line x1="50" y1="50" x2="50" y2="80" stroke="currentColor" strokeWidth="0.1" className="text-brand-primary" />
                <line x1="50" y1="50" x2="20" y2="50" stroke="currentColor" strokeWidth="0.1" className="text-brand-primary" />
                <line x1="50" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="0.1" className="text-brand-primary" />
             </svg>
          </div>

          <div className="flex-1">
             <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 font-bold text-xs uppercase tracking-widest mb-6"
             >
                <ArrowRightLeft className="w-3.5 h-3.5" /> Platform Architecture
             </motion.div>
             <h2 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight">
                An ecosystem built <br />
                <span className="text-brand-primary text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">for high-performance.</span>
             </h2>
             <p className="text-lg text-brand-slate dark:text-slate-400 font-medium mb-10">
                StaffSchedule.io isn't just a collection of features—it's a synchronized neural network. Every time a shift is swapped, every database node and security protocol verifies the transaction in milliseconds.
             </p>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                   { title: "Zero Latency", desc: "Global edge-caching ensures sub-100ms response times for all staff." },
                   { title: "Military Grade", desc: "End-to-end encryption for all workforce and identity data." },
                   { title: "Modular Engine", desc: "Each feature runs as an isolated microservice for maximum uptime." },
                   { title: "Real-time Sync", desc: "No manual refreshing. See updates as they happen across all devices." },
                ].map((item, i) => (
                   <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                   >
                      <div className="text-brand-dark dark:text-white font-black text-xl mb-1">{item.title}</div>
                      <div className="text-slate-500 dark:text-slate-400 text-sm font-medium">{item.desc}</div>
                   </motion.div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
