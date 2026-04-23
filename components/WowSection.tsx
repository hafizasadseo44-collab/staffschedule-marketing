"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  MousePointer2 
} from "lucide-react";

const WowSection = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-brand-dark">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-primary/10 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl lg:text-7xl font-black text-white mb-8 tracking-tighter">
            Experience workforce management <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
               that feels alive.
            </span>
          </h2>
          <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            StaffSchedule.io isn't just a tool; it's a living ecosystem designed to grow with your business.
          </p>
        </div>

        <div className="relative h-[600px] w-full max-w-4xl mx-auto">
          {/* Central Hub Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-80 h-80 bg-white rounded-[3rem] shadow-[0_32px_128px_-16px_rgba(79,70,229,0.4)] flex items-center justify-center border-8 border-brand-primary/10 group overflow-hidden"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <Zap className="w-32 h-32 text-brand-primary fill-brand-primary group-hover:scale-110 transition-transform duration-500" />
             <div className="absolute bottom-8 text-center px-6">
                <p className="font-black text-brand-dark uppercase tracking-widest text-xs">Real-time Engine</p>
             </div>
          </motion.div>

          {/* Floating UI Elements */}
          <motion.div
            initial={{ opacity: 0, x: -100, y: -100 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            className="absolute top-0 left-0 z-30 bg-slate-800 border border-white/10 p-6 rounded-3xl shadow-2xl w-60"
          >
             <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                   <TrendingUp className="w-6 h-6" />
                </div>
                <p className="text-white font-black text-sm">Labor Efficiency</p>
             </div>
             <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div 
                   initial={{ width: 0 }}
                   whileInView={{ width: "92%" }}
                   transition={{ duration: 1.5, delay: 0.5 }}
                   className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                />
             </div>
             <p className="text-[10px] text-slate-400 mt-2 font-black uppercase tracking-widest">+12% vs last week</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100, y: -80 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            className="absolute top-20 right-0 z-10 bg-white p-6 rounded-3xl shadow-2xl w-64 border border-border"
          >
             <div className="flex -space-x-3 mb-4">
                {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-indigo-100 flex items-center justify-center font-black text-brand-primary text-xs">
                      JD
                   </div>
                ))}
                <div className="w-10 h-10 rounded-full border-4 border-white bg-brand-primary flex items-center justify-center font-black text-white text-xs">
                   +18
                </div>
             </div>
             <p className="text-brand-dark font-black text-sm">Active Now</p>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Global Locations</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -150, y: 150 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            className="absolute bottom-10 left-10 z-10 bg-indigo-600 p-6 rounded-3xl shadow-2xl w-64"
          >
             <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="text-white w-6 h-6" />
                <span className="text-white font-black">Secure Sync</span>
             </div>
             <p className="text-indigo-100 text-xs font-medium">Auto-backups triggered every 15 mins. Your data is always protected.</p>
          </motion.div>

          <motion.div
             animate={{ 
                x: [0, 20, 0],
                y: [0, -20, 0]
             }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="absolute bottom-0 right-10 z-30"
          >
             <div className="bg-white p-4 rounded-2xl shadow-2xl border border-border flex items-center gap-3">
                <MousePointer2 className="w-5 h-5 text-brand-primary" />
                <span className="font-black text-brand-dark text-sm">Live Edit</span>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WowSection;
