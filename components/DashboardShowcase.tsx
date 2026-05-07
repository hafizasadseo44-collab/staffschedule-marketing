"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Zap, 
  TrendingDown, 
  BarChart3, 
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

const FEATURE_CARDS = [
  {
    side: "left",
    top: "15%",
    left: "0",
    icon: <Sparkles className="text-purple-600" size={24} />,
    title: "AI-Powered Suggestions",
    desc: "Auto-assign the right people to the right shifts.",
    delay: 0.2
  },
  {
    side: "left",
    top: "65%",
    left: "5%",
    icon: <Zap className="text-amber-500" size={24} />,
    title: "Real-time Updates",
    desc: "Changes reflect instantly across all devices.",
    delay: 0.4
  },
  {
    side: "right",
    top: "15%",
    right: "0",
    icon: <TrendingDown className="text-emerald-500" size={24} />,
    title: "Reduce Labor Costs",
    desc: "Optimize schedules & save up to 15% on labor costs.",
    delay: 0.6
  },
  {
    side: "right",
    top: "65%",
    right: "5%",
    icon: <BarChart3 className="text-indigo-600" size={24} />,
    title: "Increase Efficiency",
    desc: "Improve team productivity with smarter scheduling.",
    delay: 0.8
  }
];

export default function DashboardShowcase() {
  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden relative font-sans">
      
      {/* ── Premium Background System ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* 1. Subtle Dot Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.1]" 
          style={{ 
            backgroundImage: `radial-gradient(#4F46E5 0.5px, transparent 0.5px)`, 
            backgroundSize: '32px 32px' 
          }} 
        />

        {/* 2. Large Soft Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-indigo-500/[0.03] rounded-full blur-[120px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6"
          >
            SEE STAFFSCHEDULE.IO IN ACTION
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight"
          >
            Everything You Need in One Dashboard
          </motion.h2>
        </div>

        {/* Dashboard & Floating Features Container */}
        <div className="relative max-w-[1200px] mx-auto flex flex-col items-center">
          
          {/* Central Dashboard Image (Borderless & Blended) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as any }}
            className="relative z-10 w-full lg:w-[75%] mb-12 lg:mb-0"
          >
            {/* Underlying Glow */}
            <div className="absolute inset-0 bg-indigo-500/10 blur-[80px] -z-10 opacity-40" />

            <Image 
              src="/hero-master.png"
              alt="StaffSchedule.io Dashboard Showcase"
              width={1600}
              height={1100}
              className="w-full h-auto rounded-[1.5rem] shadow-[0_30px_60px_-15px_rgba(79,70,229,0.15)] md:shadow-[0_50px_100px_-30px_rgba(79,70,229,0.15)] [mask-image:linear-gradient(to_bottom,black_95%,transparent)]"
              priority
              unoptimized
            />
          </motion.div>

          {/* Feature Cards Grid (Mobile/Tablet) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full xl:hidden">
            {FEATURE_CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="bg-white p-6 rounded-3xl shadow-[0_15px_30px_-5px_rgba(0,0,0,0.05)] border border-slate-50 flex flex-col items-start text-left"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-5">
                  {card.icon}
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-2 tracking-tight">{card.title}</h4>
                <p className="text-sm text-slate-500 font-bold leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Floating Feature Cards (Desktop Only) */}
          {FEATURE_CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: card.side === "left" ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: card.delay }}
              className="absolute hidden xl:block z-20"
              style={{
                top: card.top,
                left: card.side === "left" ? card.left : "auto",
                right: card.side === "right" ? card.right : "auto",
              }}
            >
              <div className="bg-white p-6 rounded-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] border border-slate-50 w-[280px] group hover:shadow-2xl transition-all duration-500">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                  {card.icon}
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-2 tracking-tight">{card.title}</h4>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">{card.desc}</p>
                
                {/* Visual Connector (Conceptual Squiggly Arrow) */}
                <div className={`absolute top-1/2 -translate-y-1/2 w-16 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent ${card.side === 'left' ? '-right-16' : '-left-16'} opacity-50`}>
                   <div className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-200 ${card.side === 'left' ? 'right-0' : 'left-0'}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>


        {/* ── Logos Section ── */}
        <div className="mt-32 mb-20 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-10">
            TRUSTED BY LEADING BUSINESSES
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10 opacity-60">
             {[
               { name: "Café Central", Icon: Zap },
               { name: "GreenBowl", Icon: CheckCircle2 },
               { name: "UrbanFuel", Icon: Sparkles },
               { name: "QuickMart", Icon: TrendingDown },
               { name: "HealthyLife", Icon: BarChart3 },
               { name: "BrightSide", Icon: Zap },
             ].map((logo, i) => (
               <div key={i} className="flex items-center gap-3 text-slate-900 group cursor-default">
                  <logo.Icon className="w-6 h-6 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  <span className="text-xl font-black tracking-tighter uppercase grayscale group-hover:grayscale-0 transition-all">
                    {logo.name}
                  </span>
               </div>
             ))}
          </div>
        </div>

        {/* ── CTA Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[1200px] mx-auto bg-[#F7F8FF] rounded-[3.5rem] p-10 lg:p-14 border border-indigo-100/50 relative overflow-hidden"
        >
          {/* Background Highlight */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/[0.03] rounded-full blur-3xl -z-10" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-[500px] text-center lg:text-left">
              <h3 className="text-4xl lg:text-[2.75rem] font-black text-slate-900 mb-6 tracking-tighter leading-tight">
                Start scheduling <span className="text-indigo-600">smarter</span> today
              </h3>
              <p className="text-base text-slate-500 font-bold leading-relaxed">
                Join thousands of teams saving time, reducing costs, and simplifying workforce management.
              </p>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-8">
              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-5">
                <Link href="https://app.staffschedule.io/onboarding.php">
                  <button className="h-16 px-12 rounded-2xl bg-indigo-600 text-white font-black text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-indigo-500/30 transition-all active:scale-95 group">
                    Start Free Trial
                    <ArrowRight size={18} className="inline-block ml-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="h-16 px-10 rounded-2xl bg-white border border-slate-200 text-slate-900 font-black text-sm uppercase tracking-widest flex items-center gap-4 hover:bg-slate-50 transition-all active:scale-95 group">
                    <Play size={20} className="fill-indigo-600 text-indigo-600" />
                    Contact Sales
                  </button>
                </Link>
              </div>

              {/* Mini Trust Row */}
              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-8">
                {[
                  { label: "No Credit Card", icon: CheckCircle2 },
                  { label: "14-Day Free Trial", icon: CheckCircle2 },
                  { label: "Cancel Anytime", icon: CheckCircle2 }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    <item.icon size={16} className="text-indigo-500/60" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
