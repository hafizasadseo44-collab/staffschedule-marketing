"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, Zap, CheckCircle2, Star, PhoneCallIcon, TrendingUp, BarChart3 } from "lucide-react";
import { LinkPreview } from "@/components/ui/link-preview";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { motion } from "framer-motion";

// --- Trust Avatars ---
const AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
];

// --- Partner Logo Data ---
const logos = [
  { src: "https://storage.efferd.com/logo/nvidia-wordmark.svg", alt: "Nvidia" },
  { src: "https://storage.efferd.com/logo/supabase-wordmark.svg", alt: "Supabase" },
  { src: "https://storage.efferd.com/logo/openai-wordmark.svg", alt: "OpenAI" },
  { src: "https://storage.efferd.com/logo/vercel-wordmark.svg", alt: "Vercel" },
  { src: "https://storage.efferd.com/logo/github-wordmark.svg", alt: "GitHub" },
  { src: "https://storage.efferd.com/logo/claude-wordmark.svg", alt: "Claude AI" },
  { src: "https://storage.efferd.com/logo/clerk-wordmark.svg", alt: "Clerk" },
];

export default function SplitHero() {
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white font-sans">
        {/* ── Premium Background System ── */}
        <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Radial Top Shade */}
          <div className="absolute inset-0 -top-14 isolate -z-10 bg-[radial-gradient(35%_80%_at_49%_0%,rgba(79,70,229,0.06),transparent)]" />

          {/* Dot Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: `radial-gradient(#4F46E5 0.5px, transparent 0.5px)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Animated Mesh Orbs */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-indigo-500/[0.05] rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], x: [0, -40, 0], y: [0, 30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-purple-500/[0.04] rounded-full blur-[100px]"
          />
        </div>

        {/* ── Faded Side Borders ── */}
        <div aria-hidden="true" className="absolute inset-0 mx-auto hidden min-h-screen w-full max-w-5xl lg:block pointer-events-none">
          <div className="absolute inset-y-0 left-0 z-10 h-full w-px bg-foreground/10" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }} />
          <div className="absolute inset-y-0 right-0 z-10 h-full w-px bg-foreground/10" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }} />
        </div>

        {/* ── Main Content ── */}
        <div className="mx-auto w-full max-w-5xl relative z-10">
          <div className="relative flex flex-col items-center justify-center gap-5 pt-32 pb-16 lg:pb-24 px-4 sm:px-6">
            {/* Inner Content Borders */}
            <div aria-hidden="true" className="absolute inset-0 -z-[1] size-full overflow-hidden pointer-events-none hidden md:block">
              <div className="absolute inset-y-0 left-4 w-px bg-gradient-to-b from-transparent via-slate-200 to-slate-200 md:left-8" />
              <div className="absolute inset-y-0 right-4 w-px bg-gradient-to-b from-transparent via-slate-200 to-slate-200 md:right-8" />
              <div className="absolute inset-y-0 left-8 w-px bg-gradient-to-b from-transparent via-slate-200/50 to-slate-200/50 md:left-12" />
              <div className="absolute inset-y-0 right-8 w-px bg-gradient-to-b from-transparent via-slate-200/50 to-slate-200/50 md:right-12" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <LinkPreview
                className={cn(
                  "group mx-auto flex w-fit items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm",
                  "hover:shadow-md transition-all"
                )}
                url="/features"
              >
                <Zap className="size-3 text-indigo-500 fill-indigo-500" />
                <span className="text-xs font-semibold text-slate-600">#1 AI-Powered Scheduler</span>
                <span className="block h-4 border-l border-slate-200" />
                <ArrowRightIcon className="size-3 text-slate-400 duration-150 ease-out group-hover:translate-x-1" />
              </LinkPreview>
            </motion.div>

            {/* Hero Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className={cn(
                "text-balance text-center text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-slate-900"
              )}
            >
              AI-Powered Staff Scheduling. <br className="hidden sm:block" />
              <span className="text-indigo-600">Effortless, Anytime.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="mx-auto max-w-xl text-center text-base text-slate-500 font-medium tracking-wide sm:text-lg md:text-xl leading-relaxed"
            >
              The all-in-one workforce platform to automate schedules, <br className="hidden md:block" />
              cut labor costs by 18%, and keep your entire team in sync.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-row flex-wrap items-center justify-center gap-3 pt-2"
            >
              <LinkPreview url="/contact">
                <button className="h-12 px-6 rounded-full bg-slate-100 text-slate-700 font-bold text-sm flex items-center gap-2 hover:bg-slate-200 transition-all active:scale-95">
                  <PhoneCallIcon className="size-4" />
                  Contact Sales
                </button>
              </LinkPreview>
              <LinkPreview url="https://app.staffschedule.io/signup.php">
                <button className="h-12 px-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center gap-2 hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all active:scale-95 group">
                  Start Free Trial
                  <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </LinkPreview>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="flex flex-col items-center gap-6 pt-6"
            >
              <div className="flex flex-wrap items-center justify-center gap-5">
                {["No Credit Card", "14-Day Free Trial", "Cancel Anytime"].map((label, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <CheckCircle2 size={12} className="text-indigo-400" />
                    {label}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {AVATARS.map((url, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm">
                      <img src={url} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} size={10} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold">
                    Trusted by <span className="text-slate-600">10,000+</span> managers
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Dashboard Mockup ── */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: [0.22, 1, 0.36, 1] as any }}
            className="relative px-4 sm:px-8 pb-16"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-500/[0.03] rounded-full blur-[120px] -z-10" />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <Image
                src="/hero-master.png"
                alt="AI Staff Scheduling Dashboard — StaffSchedule.io"
                width={1400}
                height={1000}
                className="w-full h-auto rounded-2xl shadow-[0_40px_80px_-20px_rgba(79,70,229,0.15)] [mask-image:linear-gradient(to_bottom,black_92%,transparent)]"
                priority
                unoptimized
              />
            </motion.div>

            {/* Floating Cost Card */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 2.0 }}
              className="absolute -left-2 sm:-left-6 bottom-20 z-20 scale-75 sm:scale-100 origin-bottom-left"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] border border-white/50 w-[220px]"
              >
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Labor Cost This Week</p>
                <div className="flex items-end justify-between gap-4 mb-3">
                  <h4 className="text-xl font-black text-slate-900">$16,450</h4>
                  <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs">
                    <TrendingUp size={12} /> 8%
                  </div>
                </div>
                <div className="h-8 w-full flex items-end gap-1">
                  {[30, 50, 40, 60, 45, 75, 50, 85].map((h, i) => (
                    <div key={i} className="flex-1 bg-indigo-500/10 rounded-t-[1px]" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Efficiency Card */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 scale-75 sm:scale-100 origin-right"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] border border-white/50 w-[170px]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <BarChart3 size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Efficiency</p>
                    <h4 className="text-lg font-black text-slate-900">98%</h4>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-emerald-500 font-bold text-[10px]">
                  <TrendingUp size={10} /> 12% increase
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Logos Section ── */}
      <section className="relative border-t border-slate-100 pt-6 pb-10 bg-white">
        <h2 className="text-center font-medium text-lg text-slate-400 tracking-tight md:text-xl mb-2">
          Trusted by <span className="text-slate-600 font-semibold">industry leaders</span>
        </h2>
        <div className="relative z-10 mx-auto max-w-4xl">
          <LogoCloud logos={logos} />
        </div>
      </section>
    </>
  );
}
