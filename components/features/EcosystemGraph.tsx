"use client";

import React from "react";
import { motion } from "framer-motion";
import { Share2, UserCheck, CreditCard, MessageCircle, BarChart, Bell } from "lucide-react";

interface NodeProps {
  icon: React.ReactNode;
  label: string;
  x: string;
  y: string;
  delay: number;
}

function Node({ icon, label, x, y, delay }: NodeProps) {
  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", delay, stiffness: 100 }}
      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
      style={{ left: x, top: y }}
    >
      <div className="flex flex-col items-center gap-3 group">
         <div className="w-16 h-16 bg-white dark:bg-slate-900 border-2 border-brand-primary rounded-2xl shadow-xl flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
            {icon}
         </div>
         <span className="text-[10px] font-black text-brand-dark dark:text-white uppercase tracking-widest whitespace-nowrap bg-white/80 dark:bg-slate-900/80 px-3 py-1 rounded-full backdrop-blur-md">
            {label}
         </span>
      </div>
    </motion.div>
  );
}

export default function EcosystemGraph() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
           <h2 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 tracking-tight">
             One platform. <br />
             <span className="text-brand-primary">Infinite connections.</span>
           </h2>
           <p className="text-lg text-brand-slate dark:text-slate-400 font-medium max-w-2xl mx-auto">
             Our modules don't just sit in silos. Data flows instantly between every feature to ensure your roster is always accurate, compliant, and paid.
           </p>
        </div>

        <div className="relative h-[600px] w-full max-w-4xl mx-auto">
           {/* Center Master Node */}
           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <div className="w-32 h-32 bg-brand-primary rounded-[2.5rem] shadow-2xl flex items-center justify-center text-white relative">
                 <Share2 className="w-12 h-12" />
                 <div className="absolute inset-0 bg-brand-primary rounded-[2.5rem] animate-ping opacity-20" />
              </div>
           </div>

           {/* Pulse Rings */}
           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-brand-primary/10 rounded-full" />
           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-brand-primary/20 rounded-full" />

           {/* Satelite Nodes */}
           <Node icon={<UserCheck className="w-6 h-6" />} label="Staff Bio" x="20%" y="30%" delay={0.2} />
           <Node icon={<CreditCard className="w-6 h-6" />} label="Payroll Sync" x="85%" y="40%" delay={0.3} />
           <Node icon={<MessageCircle className="w-6 h-6" />} label="Team Chat" x="15%" y="70%" delay={0.4} />
           <Node icon={<BarChart className="w-6 h-6" />} label="Reporting" x="50%" y="15%" delay={0.5} />
           <Node icon={<Bell className="w-6 h-6" />} label="Notifications" x="80%" y="80%" delay={0.6} />

           {/* Connecting Lines (SVG) */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
              <defs>
                 <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0" />
                    <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                 </linearGradient>
              </defs>
              {/* Lines from center to nodes */}
              <motion.line x1="50%" y1="50%" x2="20%" y2="30%" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="10 10" animate={{ strokeDashoffset: [-100, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
              <motion.line x1="50%" y1="50%" x2="85%" y2="40%" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="10 10" animate={{ strokeDashoffset: [-100, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
              <motion.line x1="50%" y1="50%" x2="15%" y2="70%" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="10 10" animate={{ strokeDashoffset: [-100, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
              <motion.line x1="50%" y1="50%" x2="50%" y2="15%" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="10 10" animate={{ strokeDashoffset: [-100, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
              <motion.line x1="50%" y1="50%" x2="80%" y2="80%" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="10 10" animate={{ strokeDashoffset: [-100, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
           </svg>
        </div>
      </div>
    </section>
  );
}
