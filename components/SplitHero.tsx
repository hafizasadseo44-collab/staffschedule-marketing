"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Star,
  Zap,
  TrendingUp,
  BarChart3
} from "lucide-react";
import Link from "next/link";

// --- Mock Avatars ---
const AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
];

export default function SplitHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-24 overflow-hidden bg-white font-sans">
      {/* ── Premium Background System ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* 1. Subtle Dot Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: `radial-gradient(#4F46E5 0.5px, transparent 0.5px)`, 
            backgroundSize: '24px 24px' 
          }} 
        />

        {/* 2. Large Animated Mesh Orbs */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-indigo-500/[0.05] rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, -40, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-purple-500/[0.04] rounded-full blur-[100px]"
        />

        {/* 3. Central Glow Wash */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.02)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* ── Left Column: Fixed Typography ── */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left z-20">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.15em] mb-8"
            >
              <Zap className="w-3 h-3 fill-current" />
              The #1 AI-Powered Staff Scheduler
            </motion.div>

            {/* Fixed Headline (Wide container, balanced lines) */}
            <div className="w-full max-w-[850px]">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.6rem] font-black leading-[1.2] sm:leading-[1.1] tracking-tight text-slate-900 mb-6 sm:mb-8"
              >
                AI-Powered Staff Scheduling. <br className="hidden sm:block" />
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                  className="text-indigo-600 italic"
                >
                  Effortless, anytime.
                </motion.span>
              </motion.h1>
            </div>


            {/* SEO Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
              className="text-base sm:text-lg lg:text-xl text-slate-500 font-medium leading-relaxed max-w-[600px] mb-8 sm:mb-10"
            >
              The all-in-one AI workforce platform to automate complex shift schedules, track real-time labor costs, and optimize your team performance — in minutes, not hours.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 2.0, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10"
            >
              <Link href="https://app.staffschedule.io/signup.php">
                <button className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-indigo-600 text-white font-black text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-indigo-500/30 transition-all hover:-translate-y-1 active:scale-95 group">
                  Start Free Trial
                  <ArrowRight size={18} className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <button className="h-14 px-8 rounded-2xl bg-white border border-slate-200 text-slate-600 font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-95 group">
                <Play size={18} className="fill-slate-400 group-hover:fill-slate-900 transition-colors" />
                Watch Demo
              </button>
            </motion.div>


            {/* Trust Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.2 }}
              className="space-y-10"
            >
              <div className="flex flex-wrap items-center gap-6">
                {["No Credit Card", "14-Day Free Trial", "Cancel Anytime"].map((label, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <CheckCircle2 size={14} className="text-indigo-500/50" />
                    {label}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {AVATARS.map((url, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
                      <img src={url} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-0.5 mb-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} size={11} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 font-bold tracking-tight">
                    Trusted by <span className="text-slate-600">10,000+</span> managers worldwide
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Right Column: Adjusted Spacing ── */}
          <div className="lg:col-span-6 xl:col-span-6 relative mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 2.4, ease: [0.22, 1, 0.36, 1] as any }}
              className="relative"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-indigo-500/[0.04] rounded-full blur-[100px] -z-10" />

              {/* Main Dashboard UI (Borderless & Blended) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* Edge Glow for blending */}
                <div className="absolute inset-0 bg-indigo-500/10 blur-[60px] -z-10 opacity-30" />
                
                <Image 
                  src="/hero-master.png"
                  alt="AI Staff Scheduling Dashboard"
                  width={1400}
                  height={1000}
                  className="w-full h-auto rounded-[1.5rem] shadow-[0_30px_60px_-15px_rgba(79,70,229,0.15)] md:shadow-[0_50px_100px_-30px_rgba(79,70,229,0.15)] [mask-image:linear-gradient(to_bottom,black_95%,transparent)]"
                  priority
                  unoptimized
                />
              </motion.div>

              {/* Floating Cost Card - Adjusted for Mobile */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 2.8 }}
                className="absolute -left-4 sm:-left-10 -bottom-6 z-20 scale-75 sm:scale-100 origin-bottom-left"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] border border-white/50 w-[180px] sm:w-[220px]"
                >
                  <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 sm:mb-2">Labor Cost This Week</p>
                  <div className="flex items-end justify-between gap-2 sm:gap-4 mb-2 sm:mb-3">
                    <h4 className="text-lg sm:text-xl font-black text-slate-900">$16,450</h4>
                    <div className="flex items-center gap-1 text-emerald-500 font-bold text-[10px] sm:text-xs">
                      <TrendingUp size={12} />
                      8%
                    </div>
                  </div>
                  <div className="h-6 sm:h-8 w-full flex items-end gap-0.5 sm:gap-1">
                    {[30, 50, 40, 60, 45, 75, 50, 85].map((h, i) => (
                      <div key={i} className="flex-1 bg-indigo-500/10 rounded-t-[1px]" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Efficiency Card - Adjusted for Mobile */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 3.0 }}
                className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 scale-75 sm:scale-100 origin-right"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] border border-white/50 w-[140px] sm:w-[170px]"
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <BarChart3 size={14} className="sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest">Efficiency</p>
                      <h4 className="text-base sm:text-lg font-black text-slate-900">98%</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-500 font-bold text-[9px] sm:text-[10px]">
                    <TrendingUp size={10} />
                    12% increase
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
