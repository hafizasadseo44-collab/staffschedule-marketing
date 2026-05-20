"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, CheckCircle2, Star } from "lucide-react";
import { LinkPreview } from "@/components/ui/link-preview";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const waveY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={containerRef} className="relative min-h-[100vh] flex flex-col justify-start pt-32 pb-20 overflow-hidden font-sans selection:bg-purple-200 selection:text-purple-900 bg-[#FAFAFA]">

      {/* ── Homebase-Inspired Wavy Mesh Background ── */}
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#FDFBFF]">
        {/* Top Light Purple Gradient */}
        <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-[#F5EEFF] to-transparent opacity-80" />

        {/* Grain Texture */}
        <div className="absolute inset-0 opacity-[0.06] z-10 mix-blend-overlay bg-grain" />

        {/* Vibrant Wavy Band using overlapping blurred SVG and Divs */}
        <motion.div style={{ y: waveY }} className="absolute top-[35%] w-[140%] -left-[20%] h-[500px] z-0 overflow-visible transform-gpu">
          {/* Optimized CSS-based blurred wave */}
          <div className="absolute inset-0 opacity-40 blur-[80px] transform-gpu">
            <svg className="w-full h-full" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path
                d="M0,150 C240,350 480,50 720,200 C960,350 1200,50 1440,150 L1440,500 L0,500 Z"
                fill="url(#wave-grad-new)"
              />
              <defs>
                <linearGradient id="wave-grad-new" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="25%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="75%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>

        {/* Background orbs — CSS animation instead of Framer Motion for zero JS thread cost */}
        <div
          className="absolute top-[40%] left-[15%] w-[400px] h-[200px] bg-indigo-500/20 rounded-full blur-[70px] transform-gpu animate-[float_10s_ease-in-out_infinite]"
          aria-hidden="true"
        />
        <div
          className="absolute top-[35%] right-[15%] w-[500px] h-[250px] bg-blue-500/20 rounded-full blur-[80px] transform-gpu animate-[floatReverse_12s_ease-in-out_infinite]"
          aria-hidden="true"
        />

        {/* Bottom Solid White Cover (sharpens the bottom edge of the fade) */}
        <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-white via-white to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-[15%] bg-white z-10" />
      </div>

      {/* ── Main Content Container ── */}
      <div className="container mx-auto px-6 relative z-30 flex flex-col items-center flex-1">

        {/* Top Section: Headline (Positioned over the wave) */}
        <motion.div style={{ y: textY }} className="flex flex-col items-center max-w-6xl mx-auto text-center mt-4 sm:mt-12 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[2.1rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] font-black tracking-tight text-[#0f172a] mb-8 lg:mb-10 leading-[1.2] lg:leading-[1.1] drop-shadow-sm px-4"
          >
            What If Staff Scheduling Took <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899]">Minutes, Not Hours?</span>
          </motion.h1>
        </motion.div>

        {/* Bottom Section: Subheading, CTAs, and Social Proof */}
        <motion.div style={{ y: textY }} className="flex flex-col items-center text-center w-full max-w-4xl mx-auto mt-4 z-10 relative">

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#475569] font-medium leading-[1.8] mb-12 px-6 drop-shadow-sm"
          >
            Your time is too valuable for spreadsheets. StaffSchedule.io is the work scheduling and employee <strong className="text-[#8b5cf6] font-bold">staff scheduling</strong> software that automates your shifts, eliminates confusion, and keeps your whole team connected — in one place.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-5 mb-10 w-full sm:w-auto"
          >
            <LinkPreview url="https://app.staffschedule.io/onboarding.php?start_trial=1">
              <button className="w-full sm:w-auto h-16 px-12 rounded-2xl bg-[#8b5cf6] text-white font-black text-sm uppercase tracking-[0.1em] flex items-center justify-center gap-3 hover:bg-[#7c3aed] shadow-[0_10px_40px_-10px_rgba(139,92,246,0.5)] hover:scale-[1.03] transition-all active:scale-95 group">
                Get Started Free
                <ArrowRightIcon className="size-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </LinkPreview>

            <a href="#how-it-works" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto h-14 px-10 rounded-xl bg-white text-[#1c1236] border-2 border-[#e5e0f1] font-black text-sm uppercase tracking-widest flex items-center justify-center hover:border-[#8b5cf6] hover:text-[#8b5cf6] transition-all active:scale-95">
                See How It Works
              </button>
            </a>
          </motion.div>

          {/* Trust Points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-10"
          >
            {[
              "No Credit Card Required",
              "14-Day Free Trial",
              "Setup in Minutes"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-[11px] font-black text-[#5b4f7a] uppercase tracking-wider">
                <CheckCircle2 size={14} className="text-[#8b5cf6]" />
                {item}
              </div>
            ))}
          </motion.div>

          {/* Social Proof Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-3 py-2 px-6 bg-white/60 rounded-full border border-[#e5e0f1] shadow-sm backdrop-blur-md"
          >
            <div className="flex -space-x-2">
              {AVATARS.map((url, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm">
                  <Image src={url} alt="User" width={32} height={32} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex flex-col items-start pl-1">
              <div className="flex items-center gap-0.5 mb-0.5">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} size={10} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-[10px] text-[#5b4f7a] font-bold uppercase tracking-wider">
                Loved by <span className="text-[#8b5cf6] font-black">10,000+</span> Managers
              </p>
            </div>
          </motion.div>

        </motion.div>

        {/* ── Product Mockup Showcase ── */}
        <motion.div
          style={{ y: mockupY }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-5xl mx-auto mt-24 mb-[-100px] z-40 group"
        >
          {/* Background Glow for Dashboard */}
          <div className="absolute -inset-10 bg-gradient-to-b from-purple-500/10 to-transparent rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

          {/* Main Dashboard (Browser Frame) */}
          <div className="relative rounded-2xl md:rounded-[2rem] border border-[#e5e0f1]/60 shadow-[0_40px_100px_-20px_rgba(139,92,246,0.15)] bg-white/40 backdrop-blur-2xl p-2 md:p-3 transition-transform duration-700 group-hover:scale-[1.01]">
            <div className="rounded-xl md:rounded-[1.5rem] overflow-hidden border border-[#f0ecf9] relative bg-white shadow-sm">
              {/* Clean Browser Header */}
              <div className="h-10 md:h-12 bg-[#fdfcff] border-b border-[#f0ecf9] flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#e2dbea]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#e2dbea]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#e2dbea]" />
                </div>
                <div className="mx-auto bg-[#f5f3f9] rounded-md h-6 w-1/3 flex items-center justify-center border border-[#ece9f2]">
                  <span className="text-[9px] font-bold text-[#b4a9c6]">app.staffschedule.io</span>
                </div>
              </div>

              <Image
                src="/staffschedule-dashboard.png"
                alt="StaffSchedule Dashboard UI"
                width={1400}
                height={800}
                className="w-full h-auto object-cover object-top"
                priority
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
              />
            </div>
          </div>

          {/* Floating Mobile Mockup (iOS Frame) — CSS animation for zero JS cost */}
          <div
            className="absolute -bottom-16 -right-4 md:-right-12 w-[140px] md:w-[260px] aspect-[9/19] rounded-[2rem] md:rounded-[2.5rem] border-4 md:border-8 border-[#1c1236] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] bg-white overflow-hidden z-50 animate-[float_6s_ease-in-out_infinite]"
          >
            {/* iPhone Dynamic Island */}
            <div className="absolute top-2 md:top-3 left-1/2 -translate-x-1/2 w-[35%] h-4 md:h-6 bg-[#1c1236] rounded-full z-30" />

            {/* Mobile Screen Content (CSS UI) */}
            <div className="flex-1 w-full h-full bg-[#fdfcff] flex flex-col pt-8 md:pt-12 px-3 md:px-5 relative z-20">
              {/* 3D Animated Site Name */}
              <div className="flex justify-center items-center mb-3">
                <motion.div
                  animate={{ rotateX: [0, 8, 0, -8, 0], y: [0, -1, 0, 1, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ perspective: 1000 }}
                  className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-[0_5px_15px_-3px_rgba(139,92,246,0.3)] border border-[#f0ecf9]"
                >
                  <motion.div
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-3.5 h-3.5 md:w-4 md:h-4 bg-gradient-to-br from-indigo-500 to-fuchsia-500 rounded-[3px] flex items-center justify-center shadow-inner"
                  >
                    <div className="w-1.5 h-1.5 bg-white rounded-[1px]" />
                  </motion.div>
                  <span className="text-[9px] md:text-xs font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-indigo-600 bg-[length:200%_auto] animate-[pulse_3s_ease-in-out_infinite]">
                    StaffSchedule.io
                  </span>
                </motion.div>
              </div>

              {/* Greeting */}
              <div className="flex justify-between items-center mb-3 md:mb-5">
                <div>
                  <p className="text-[8px] md:text-xs text-[#8f86a8] font-semibold">Good morning,</p>
                  <p className="text-[10px] md:text-sm font-black text-[#1c1236]">Sarah Jenkins</p>
                </div>
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-purple-100 overflow-hidden border-2 border-white shadow-sm relative">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Next Shift Card */}
              <div className="bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] rounded-xl md:rounded-2xl p-3 md:p-4 mb-4 shadow-lg shadow-purple-500/30 text-white transform transition-transform hover:scale-[1.02]">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[7px] md:text-[9px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">Next Shift</span>
                  <span className="text-[7px] md:text-[9px] font-bold">Today</span>
                </div>
                <div className="text-sm md:text-lg font-black mb-1">Morning Crew</div>
                <p className="text-[9px] md:text-xs text-purple-100 font-medium">09:00 AM - 05:00 PM</p>
              </div>

              {/* Team Members List */}
              <div className="flex justify-between items-end mb-2 md:mb-3">
                <p className="text-[9px] md:text-xs font-bold text-[#1c1236]">Who's working</p>
                <p className="text-[7px] md:text-[9px] font-bold text-[#8b5cf6]">View All</p>
              </div>
              <div className="flex flex-col gap-2 md:gap-3 flex-1 overflow-hidden relative">
                {[
                  { name: "Michael T.", role: "Manager", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" },
                  { name: "Emma W.", role: "Barista", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" },
                  { name: "David L.", role: "Cashier", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" }
                ].map((user, i) => (
                  <div key={i} className="flex items-center gap-2 md:gap-3 bg-white p-1.5 md:p-2 rounded-lg md:rounded-xl border border-[#f0ecf9] shadow-sm relative">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden relative flex-shrink-0">
                      <Image src={user.img} alt={user.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-[8px] md:text-[11px] font-bold text-[#1c1236] leading-tight">{user.name}</p>
                      <p className="text-[7px] md:text-[9px] text-[#8f86a8] font-medium leading-tight mt-0.5">{user.role}</p>
                    </div>
                  </div>
                ))}
                {/* Bottom Fade */}
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#fdfcff] to-transparent pointer-events-none" />
              </div>
            </div>
          </div>



        </motion.div>

      </div>
    </section>


  );
}
