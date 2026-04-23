"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Users, BarChart3, Clock, ShieldCheck, Layers, Zap, TrendingUp, ArrowUpRight } from "lucide-react";

/**
 * Enhanced Counter Component
 * Uses framer-motion's useSpring and useTransform for silky smooth value changes.
 */
function AnimatedNumber({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const spring = useSpring(0, {
    stiffness: 45,
    damping: 15,
    mass: 1,
  });

  const displayValue = useTransform(spring, (latest) => {
    if (latest < 10 && latest > 0 && value % 1 !== 0) {
      return latest.toFixed(1);
    }
    return Math.floor(latest).toLocaleString();
  });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}<motion.span>{displayValue}</motion.span>{suffix}
    </span>
  );
}

/**
 * Micro-Visual: Sparkline component for metric charts
 */
const Sparkline = ({ color }: { color: string }) => {
  const points = [15, 35, 25, 45, 30, 60, 45, 75, 65, 85];
  const pathData = points.map((p, i) => `${i * 12},${100 - p}`).join(" L ");

  return (
    <svg width="120" height="40" viewBox="0 0 120 40" className="opacity-40 group-hover:opacity-100 transition-opacity duration-700">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`M 0,100 L ${pathData}`}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <path d={`M 0,100 L ${pathData} V 100 H 0 Z`} fill={`url(#grad-${color})`} />
    </svg>
  );
};

const STATS = [
  { 
    id: "managers",
    value: 10000, 
    suffix: "+", 
    label: "Managers Worldwide", 
    description: "Empowering leadership across 40 countries.",
    color: "#4F46E5", 
    icon: <Users className="w-5 h-5" />,
    span: "col-span-2 lg:col-span-2"
  },
  { 
    id: "shifts",
    value: 250000, 
    suffix: "+", 
    label: "Shifts Scheduled", 
    description: "Automated reliability at massive scale.",
    color: "#7C3AED", 
    icon: <BarChart3 className="w-5 h-5" />,
    span: "col-span-2 lg:col-span-1",
    showSpark: true
  },
  { 
    id: "savings",
    value: 18, 
    suffix: "%", 
    label: "Avg. Time Saved", 
    description: "Reclaiming your most valuable asset.",
    color: "#059669", 
    icon: <TrendingUp className="w-5 h-5" />,
    span: "col-span-2 lg:col-span-1"
  },
  { 
    id: "uptime",
    value: 99.9, 
    suffix: "%", 
    label: "Platform Uptime", 
    description: "Mission-critical reliability for enterprise.",
    color: "#F59E0B", 
    icon: <ShieldCheck className="w-5 h-5" />,
    span: "col-span-2 lg:col-span-2"
  },
  { 
    id: "industries",
    value: 40, 
    suffix: "+", 
    label: "Industries Served", 
    description: "From healthcare to hospitality giants.",
    color: "#0EA5E9", 
    icon: <Layers className="w-5 h-5" />,
    span: "col-span-2 lg:col-span-1"
  },
  { 
    id: "trial",
    value: 14, 
    suffix: " Days", 
    label: "Risk Free Trial", 
    description: "No credit card required. Cancel anytime.",
    color: "#EF4444", 
    icon: <Zap className="w-5 h-5" />,
    span: "col-span-2 lg:col-span-1"
  },
];

export default function CompanyStats() {
  return (
    <section className="py-24 lg:py-36 bg-white overflow-hidden relative selection:bg-indigo-100 selection:text-indigo-900">
      {/* Background Decorative Mesh */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-50/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-50/50 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-indigo-600 bg-indigo-50 border border-indigo-100 font-black text-[10px] uppercase tracking-[0.2em] mb-6"
            >
              <Zap className="w-3 h-3 fill-current" />
              Scale & Reliability
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl lg:text-7xl font-black text-slate-900 tracking-[-0.04em] leading-[0.9] mb-4"
            >
              Enterprise growth, <br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#4F46E5 0%, #7C3AED 100%)" }}>
                measured in impact.
              </span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 font-medium max-w-sm ml-auto lg:text-right hidden lg:block"
          >
            We help teams reclaim 10+ hours a week through automated logic and intelligent forecasting.
          </motion.p>
        </div>

        {/* ── BENTO GRID ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className={`${s.span} relative group overflow-hidden p-8 lg:p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:border-indigo-100 transition-all duration-500 shadow-sm hover:shadow-[0_25px_50px_-12px_rgba(79,70,229,0.08)]`}
            >
              {/* Card Glow Effect */}
              <div className="absolute -inset-px bg-gradient-to-br from-transparent via-transparent to-indigo-500/0 group-hover:to-indigo-500/10 transition-colors duration-700 pointer-events-none" />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-sm group-hover:shadow-lg" style={{ background: `${s.color}10`, color: s.color }}>
                      {s.icon}
                    </div>
                    {s.showSpark && <Sparkline color={s.color} />}
                    <ArrowUpRight className="w-5 h-5 text-slate-200 group-hover:text-indigo-400 transition-colors" />
                  </div>

                  <div className="text-4xl lg:text-6xl font-black tracking-[-0.05em] text-slate-900 mb-2">
                    <AnimatedNumber value={s.value} suffix={s.suffix} />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors mb-1 uppercase tracking-tight">
                    {s.label}
                  </h3>
                  <p className="text-sm text-slate-400 font-medium leading-snug">
                    {s.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-[2rem] bg-slate-950 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[80px] -z-0" />
          <p className="text-white text-xl font-bold relative z-10 text-center md:text-left">
            Experience the platform that’s saving teams <span className="text-indigo-400">10+ hours a week in scheduling overhead.</span>
          </p>
          <button className="px-8 py-4 bg-white text-slate-950 font-black rounded-2xl hover:bg-indigo-50 transition-colors relative z-10 whitespace-nowrap">
            Launch Your Trial →
          </button>
        </motion.div>
      </div>
    </section>
  );
}

