"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Server, Lock, Fingerprint } from "lucide-react";

export default function SecuritySection() {
  return (
    <section className="py-24 lg:py-32 bg-[#0F172A] overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            <ShieldCheck className="w-4 h-4" /> Enterprise Security
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-8 leading-[1.1]"
          >
            Bank-grade security for your <span className="text-emerald-400">workforce data.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg lg:text-xl font-medium leading-relaxed"
          >
            We process millions of scheduled hours and sensitive payroll data. Our cloud infrastructure is built to exceed global enterprise compliance standards natively.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Lock className="w-6 h-6" />, title: "AES-256 Encryption", desc: "All sensitive data is heavily encrypted both at rest and in transit." },
            { icon: <Server className="w-6 h-6" />, title: "99.99% Uptime SLA", desc: "Multi-region redundant servers guarantee your team is always connected." },
            { icon: <ShieldCheck className="w-6 h-6" />, title: "GDPR Compliant", desc: "Full European privacy, CCPA, and strict data sovereignty compliance." },
            { icon: <Fingerprint className="w-6 h-6" />, title: "Secure POS Sync", desc: "Zero-knowledge routing for connecting your sales and wage data streams." }
          ].map((item, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 + 0.2 }}
               className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-8 rounded-3xl hover:bg-slate-800 transition-colors group relative overflow-hidden"
             >
               {/* Hover light effect */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               
               <div className="w-14 h-14 bg-slate-900/80 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20 mb-8 shadow-xl shadow-black/40 group-hover:scale-110 transition-transform duration-300">
                 {item.icon}
               </div>
               <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{item.title}</h3>
               <p className="text-slate-400 font-medium leading-relaxed text-sm md:text-base">{item.desc}</p>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
