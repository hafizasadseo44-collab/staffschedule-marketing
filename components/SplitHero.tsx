"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, Zap, CheckCircle2, Star, TrendingUp, BarChart3, MousePointer2 } from "lucide-react";
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
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
        
        {/* ── Ambient Background System (Linear/Stripe Style) ── */}
        <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Main Glow */}
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-500/[0.08] to-transparent rounded-full blur-[120px]" />
          
          {/* Subtle Grid */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzYzNjZmMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')] opacity-40" />

          {/* Floating Accents */}
          <motion.div 
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[10%] w-64 h-64 bg-violet-400/10 rounded-full blur-[80px]" 
          />
          <motion.div 
            animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-indigo-400/10 rounded-full blur-[100px]" 
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center max-w-5xl mx-auto text-center">
            
            {/* Top Badge - Soft & Modern */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 shadow-sm backdrop-blur-sm group cursor-default transition-all hover:border-indigo-200 hover:bg-white">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  Everything You Need for <span className="text-indigo-600">Better Staff Scheduling</span>
                </span>
                <ArrowRightIcon className="size-3 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </motion.div>

            {/* Headline - Refined & Balanced */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]"
            >
              Still Wasting Hours Managing <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 animate-gradient">
                Employee Shifts
              </span> Manually?
            </motion.h1>

            {/* Subheading - Human & Readable */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl text-lg sm:text-xl text-slate-500 font-medium leading-relaxed mb-10"
            >
              StaffSchedule simplifies workforce management by creating error-free schedules in minutes. 
              Reduce daily stress, eliminate confusion, and keep your entire team connected with one easy platform.
            </motion.p>

            {/* CTAs - Attractive & Interactive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-8"
            >
              <LinkPreview url="https://app.staffschedule.io/onboarding.php?start_trial=1">
                <button className="h-14 px-10 rounded-2xl bg-slate-900 text-white font-bold text-sm tracking-wide flex items-center gap-3 hover:bg-indigo-600 shadow-xl shadow-slate-900/10 hover:shadow-indigo-500/30 transition-all active:scale-95 group relative overflow-hidden">
                  Start Your Free Trial
                  <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </LinkPreview>
              
              <a href="#how-it-works">
                <button className="h-14 px-10 rounded-2xl bg-white text-slate-600 border border-slate-200 font-bold text-sm tracking-wide flex items-center gap-2 hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-100 transition-all active:scale-95">
                  See How It Works
                  <TrendingUp className="size-4 opacity-40" />
                </button>
              </a>
            </motion.div>

            {/* Trust Badges - Minimal & Clean */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-col items-center gap-8"
            >
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {[
                  "14-Day Free Trial",
                  "No Credit Card Required",
                  "Setup in Minutes"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    <CheckCircle2 size={12} className="text-emerald-500" />
                    {item}
                  </div>
                ))}
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4 py-2 px-6 bg-slate-50/50 rounded-full border border-slate-100 backdrop-blur-sm">
                <div className="flex -space-x-3">
                  {AVATARS.map((url, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm">
                      <Image src={url} alt="User" width={32} height={32} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="h-4 w-px bg-slate-200 mx-1" />
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} size={10} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold">
                    Trusted by <span className="text-slate-900">10,000+</span> Managers
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ── Product Preview - Floating Card Effect ── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-20 w-full relative group"
            >
              {/* Background Glow */}
              <div className="absolute -inset-10 bg-indigo-500/10 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12)] bg-white">
                {/* Browser Header Decor */}
                <div className="h-10 bg-slate-50/50 border-b border-slate-200 flex items-center px-4 gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                </div>
                
                <Image
                  src="/hero-master.png"
                  alt="StaffSchedule.io Dashboard"
                  width={1400}
                  height={1000}
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.01]"
                  priority
                  unoptimized
                />

                {/* Floating Micro-UI 1 */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-10 left-10 hidden lg:block"
                >
                  <div className="bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/50 w-[200px]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <TrendingUp size={16} />
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">Efficiency</p>
                        <h4 className="text-base font-black text-slate-900">+24.5%</h4>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="w-[75%] h-full bg-emerald-500 rounded-full" />
                    </div>
                  </div>
                </motion.div>

                {/* Floating Micro-UI 2 */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-20 right-10 hidden lg:block"
                >
                  <div className="bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/50 w-[180px]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <Zap size={16} />
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">Scheduling</p>
                        <h4 className="text-base font-black text-slate-900">3 Min Setup</h4>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Partner Logos Section ── */}
      <section className="relative py-12 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-10">
            Trusted by modern teams worldwide
          </p>
          <LogoCloud logos={logos} />
        </div>
      </section>
    </>
  );
}
