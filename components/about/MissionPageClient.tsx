"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Sparkles, Star, Zap, ShieldCheck, Target, Eye, Heart,
  Rocket, Users, BarChart3, Globe, Lock, Clock, CheckCircle, Award,
  Lightbulb, Handshake, TrendingUp, CalendarRange, Shield, MessageSquare,
  ChevronRight, Play
} from "lucide-react";

/* ─── SHARED ANIMATION HELPERS ─── */
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.12 },
};

const staggerChild = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

/* ═══════════════════════════════════════════════════════════════════
   1. HERO SECTION
   ═══════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-32 pb-24">
      {/* Animated Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -30, 20, 0], y: [0, 30, -30, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[10%] w-[600px] h-[400px] bg-purple-600/15 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, 20, -10, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[100px]"
        />
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div {...fadeUp} className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-indigo-300 text-[11px] font-black uppercase tracking-[0.25em] mb-10">
          <Sparkles className="w-3.5 h-3.5" />
          Our Story & Mission
        </motion.div>

        <motion.h1
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black text-white tracking-tight leading-[1.05] mb-8 text-balance"
        >
          We believe work
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-sky-400">
            should work for everyone.
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed text-balance"
        >
          StaffSchedule.io was founded on a single belief: every business deserves
          scheduling that's fast, fair, and effortless. We're building the future of workforce management.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="https://app.staffschedule.io/signup.php"
            className="h-14 px-10 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:shadow-[0_0_40px_-10px_rgba(124,58,237,0.6)] transition-all hover:scale-[1.02] active:scale-95 group"
          >
            Start Free Trial
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#our-story"
            className="h-14 px-10 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-white/10 transition-all"
          >
            <Play size={16} /> Our Story
          </Link>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-20" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   2. MISSION SECTION
   ═══════════════════════════════════════════════════════════════════ */
function MissionSection() {
  return (
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-50" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Text */}
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[11px] font-black uppercase tracking-[0.2em] mb-8">
              <Target size={14} /> Our Mission
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
              Replacing chaos with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> clarity.</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Before StaffSchedule.io, managers spent hours juggling spreadsheets, group chats, and sticky notes 
              to build a single weekly schedule. Employees never knew when they were working until the last minute. 
              It was broken.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              We set out to fix it — building an AI-powered platform that creates optimized schedules in minutes, 
              gives teams real-time visibility, and cuts labor costs by up to 22%.
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Clock, label: "12hrs saved/week" },
                { icon: TrendingUp, label: "22% cost reduction" },
                { icon: Users, label: "10,000+ teams" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-bold text-slate-700 shadow-sm">
                  <item.icon size={16} className="text-indigo-500" />
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="relative"
          >
            <div className="w-full aspect-square rounded-[3rem] bg-gradient-to-br from-indigo-100 via-purple-50 to-sky-50 border border-white shadow-[0_40px_80px_-20px_rgba(79,70,229,0.15)] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#4F46E5 1px, transparent 0)", backgroundSize: "30px 30px" }} />
              {/* Floating Schedule Cards */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[15%] left-[10%] bg-white rounded-2xl p-5 shadow-xl border border-slate-100 w-48"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center"><CalendarRange size={16} /></div>
                  <span className="text-xs font-black text-slate-900">Old Way</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-red-100 rounded-full" />
                  <div className="h-2 w-3/4 bg-red-100 rounded-full" />
                  <div className="h-2 w-1/2 bg-red-100 rounded-full" />
                </div>
                <div className="mt-3 text-[10px] font-bold text-red-400">⚠ Conflicts detected</div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[15%] right-[10%] bg-white rounded-2xl p-5 shadow-xl border border-slate-100 w-52"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center"><Sparkles size={16} /></div>
                  <span className="text-xs font-black text-slate-900">StaffSchedule.io</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-emerald-200 rounded-full" />
                  <div className="h-2 w-full bg-emerald-200 rounded-full" />
                  <div className="h-2 w-full bg-emerald-200 rounded-full" />
                </div>
                <div className="mt-3 text-[10px] font-bold text-emerald-500">✓ AI-optimized</div>
              </motion.div>
              {/* Center Icon */}
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-2xl shadow-indigo-500/30 z-10">
                <Zap size={40} className="text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   3. VISION SECTION
   ═══════════════════════════════════════════════════════════════════ */
function VisionSection() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-500/[0.04] rounded-full blur-[120px]" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div {...fadeUp}>
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-purple-500/30 relative">
            <Eye size={36} className="text-white" />
            <div className="absolute inset-0 rounded-3xl bg-purple-400/20 animate-ping" />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-[11px] font-black uppercase tracking-[0.2em] mb-8">
            <Eye size={14} /> Our Vision
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6 text-balance">
            A world where scheduling is invisible — and every shift just <span className="italic text-purple-600">works.</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
            We envision a future where AI handles the complexity of workforce management end-to-end —
            predicting demand, optimizing costs, ensuring compliance — so leaders can focus on what matters: their people.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   4. CORE VALUES
   ═══════════════════════════════════════════════════════════════════ */
const values = [
  { icon: Lightbulb, title: "Innovation First", description: "We push boundaries with AI and automation to solve problems others haven't touched.", color: "from-amber-400 to-orange-500", bg: "bg-amber-50" },
  { icon: Heart, title: "People-Centric", description: "Every feature is designed for real teams — managers and employees equally.", color: "from-rose-400 to-pink-500", bg: "bg-rose-50" },
  { icon: Shield, title: "Radical Trust", description: "Enterprise-grade security, transparent pricing, and zero vendor lock-in.", color: "from-emerald-400 to-teal-500", bg: "bg-emerald-50" },
  { icon: Rocket, title: "Speed Matters", description: "We ship fast, iterate faster, and never let our platform become slow.", color: "from-blue-400 to-indigo-500", bg: "bg-blue-50" },
  { icon: Handshake, title: "Customer Obsession", description: "Our support team responds in under 2 minutes. Your success is our KPI.", color: "from-violet-400 to-purple-500", bg: "bg-violet-50" },
  { icon: Globe, title: "Global by Design", description: "Built for 50+ countries with multi-language, multi-timezone, and compliance support.", color: "from-cyan-400 to-sky-500", bg: "bg-cyan-50" },
];

function CoreValues() {
  return (
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-50" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[11px] font-black uppercase tracking-[0.2em] mb-6">
            <Heart size={14} /> Core Values
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-4">
            What drives us <span className="text-indigo-600">every day.</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">Six principles that shape every product decision, every hire, and every customer interaction.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              {...staggerChild}
              transition={{ ...staggerChild.transition, delay: i * 0.1 }}
              className="group bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-[0_20px_40px_-12px_rgba(79,70,229,0.15)] hover:-translate-y-1 hover:border-indigo-200 transition-all duration-500 cursor-default"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <value.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">{value.title}</h3>
              <p className="text-slate-500 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   5. STORY SECTION ("Why We Built This")
   ═══════════════════════════════════════════════════════════════════ */
function StorySection() {
  return (
    <section id="our-story" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-[20%] right-0 w-[600px] h-[400px] bg-indigo-500/[0.03] rounded-full blur-[120px]" />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 text-[11px] font-black uppercase tracking-[0.2em] mb-6">
            <Sparkles size={14} /> Our Story
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
            Born from frustration. <br />
            <span className="text-indigo-600">Built with obsession.</span>
          </h2>
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="space-y-8 text-lg text-slate-600 leading-relaxed">
          <p>
            In 2022, our founder was managing a 200-person hospitality operation across 6 locations.
            Every Sunday night was the same ritual: 4 hours hunched over a spreadsheet, juggling availability
            requests on WhatsApp, and praying nobody called in sick on Monday.
          </p>
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
            <p className="text-xl font-black text-slate-900 italic pl-6">
              "I thought — there has to be a better way. If AI can drive cars,
              why can't it build a schedule?"
            </p>
            <p className="text-sm font-bold text-slate-400 mt-4 pl-6">— Founder, StaffSchedule.io</p>
          </div>
          <p>
            Six months later, the first version of StaffSchedule.io was live. Within a year,
            over 2,000 businesses had signed up. Today, we serve 10,000+ teams across 50 countries —
            from single-location cafés to 500+ location enterprise retailers.
          </p>
          <p>
            We didn't set out to build "just another scheduling tool." We built the platform we
            wished existed — one that respects managers' time, gives employees real control,
            and uses AI to make better decisions than any spreadsheet ever could.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   6. STATS SECTION
   ═══════════════════════════════════════════════════════════════════ */
const stats = [
  { value: "10,000+", label: "Teams Worldwide", icon: Users },
  { value: "50+", label: "Countries Served", icon: Globe },
  { value: "2M+", label: "Shifts Scheduled Monthly", icon: CalendarRange },
  { value: "99.99%", label: "Platform Uptime", icon: ShieldCheck },
];

function StatsSection() {
  return (
    <section className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[20%] w-[500px] h-[300px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-[20%] w-[400px] h-[250px] bg-purple-600/15 rounded-full blur-[100px]" />
      </div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            The numbers <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">speak louder.</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              {...staggerChild}
              transition={{ ...staggerChild.transition, delay: i * 0.1 }}
              className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <stat.icon size={22} className="text-indigo-400" />
              </div>
              <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   7. HOW WE WORK — Timeline
   ═══════════════════════════════════════════════════════════════════ */
const steps = [
  { number: "01", title: "Listen", description: "We start by deeply understanding the scheduling pain points of every industry we serve.", icon: MessageSquare },
  { number: "02", title: "Design", description: "Our design team crafts intuitive interfaces that anyone can master in under 5 minutes.", icon: Lightbulb },
  { number: "03", title: "Build", description: "Engineers ship features weekly using cutting-edge AI and real customer feedback loops.", icon: Rocket },
  { number: "04", title: "Measure", description: "We track every metric — adoption, time saved, NPS — and iterate relentlessly.", icon: BarChart3 },
];

function HowWeWork() {
  return (
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-40" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[11px] font-black uppercase tracking-[0.2em] mb-6">
            <Rocket size={14} /> How We Work
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Our <span className="text-indigo-600">process.</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-[28px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-200 via-purple-200 to-sky-200 hidden md:block" />
          
          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                {...staggerChild}
                transition={{ ...staggerChild.transition, delay: i * 0.15 }}
                className={`flex flex-col md:flex-row items-start md:items-center gap-6 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={`flex-1 ${i % 2 === 1 ? 'md:text-right' : ''}`}>
                  <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <span className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em]">Step {step.number}</span>
                    <h3 className="text-2xl font-black text-slate-900 mt-2 mb-3">{step.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{step.description}</p>
                  </div>
                </div>
                {/* Center Dot */}
                <div className="hidden md:flex w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0 z-10">
                  <step.icon size={22} className="text-white" />
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   8. TRUST / SECURITY
   ═══════════════════════════════════════════════════════════════════ */
const trustItems = [
  { icon: Lock, title: "AES-256 Encryption", description: "All data encrypted at rest and in transit." },
  { icon: ShieldCheck, title: "SOC 2 Type II", description: "Independently audited security controls." },
  { icon: Globe, title: "GDPR Compliant", description: "Full data sovereignty and privacy controls." },
  { icon: Award, title: "99.99% Uptime SLA", description: "Enterprise-grade reliability guaranteed." },
];

function TrustSection() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeUp} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-black uppercase tracking-[0.2em] mb-6">
            <Shield size={14} /> Trust & Security
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Your data is <span className="text-emerald-600">our priority.</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">Built with bank-grade security from day one — not bolted on as an afterthought.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              {...staggerChild}
              transition={{ ...staggerChild.transition, delay: i * 0.1 }}
              className="bg-slate-50 rounded-3xl p-8 text-center border border-slate-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                <item.icon size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   9. CULTURE SECTION
   ═══════════════════════════════════════════════════════════════════ */
function CultureSection() {
  return (
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-40" />
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-purple-500/[0.04] rounded-full blur-[120px]" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-[11px] font-black uppercase tracking-[0.2em] mb-8">
              <Star size={14} /> Our Culture
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
              Remote-first. <br />
              <span className="text-purple-600">Human-always.</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              We're a globally distributed team of 60+ engineers, designers, and support specialists
              across 12 countries. We believe the best ideas come from diverse perspectives,
              async communication, and a culture of radical ownership.
            </p>
            <div className="space-y-4">
              {[
                "Ship weekly — small bets, fast feedback.",
                "Default to async — deep work over meetings.",
                "Everyone supports — leadership answers tickets too.",
                "Celebrate learning — failure is data, not shame.",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-purple-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { emoji: "🚀", label: "Ship Fast" },
                { emoji: "🌍", label: "12 Countries" },
                { emoji: "💬", label: "Async First" },
                { emoji: "❤️", label: "Human Core" },
              ].map((card, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="text-4xl mb-3">{card.emoji}</div>
                  <p className="text-sm font-black text-slate-900 uppercase tracking-wider">{card.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   10. SOCIAL PROOF
   ═══════════════════════════════════════════════════════════════════ */
const testimonials = [
  { quote: "StaffSchedule.io cut our scheduling time from 6 hours to 15 minutes. It's transformed how we operate.", name: "Sarah Mitchell", role: "Operations Director, NorthGroup Healthcare", rating: 5 },
  { quote: "The AI suggestions are genuinely useful — not gimmicky. Our labor costs dropped 18% in the first quarter.", name: "James Chen", role: "VP Operations, Urban Retail Partners", rating: 5 },
  { quote: "Best onboarding I've ever experienced for a SaaS tool. Our entire team was up and running in 2 days.", name: "Maria Rodriguez", role: "HR Manager, Global Coffee House", rating: 5 },
];

function SocialProof() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Loved by <span className="text-indigo-600">10,000+ teams.</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              {...staggerChild}
              transition={{ ...staggerChild.transition, delay: i * 0.1 }}
              className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={16} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 font-medium leading-relaxed italic mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-black text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   11. FINAL CTA
   ═══════════════════════════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] left-[10%] w-[600px] h-[400px] bg-indigo-600/25 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -20, 30, 0], y: [0, 20, -20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[15%] w-[500px] h-[350px] bg-purple-600/20 rounded-full blur-[120px]"
        />
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div {...fadeUp}>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6 text-balance">
            Ready to schedule{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              smarter?
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed">
            Join 10,000+ teams who replaced spreadsheets with StaffSchedule.io.
            Free for 14 days. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://app.staffschedule.io/signup.php"
              className="h-16 px-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-black text-base uppercase tracking-widest flex items-center justify-center gap-3 hover:shadow-[0_0_60px_-10px_rgba(124,58,237,0.7)] transition-all hover:scale-[1.02] active:scale-95 group"
            >
              Start Free Trial
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="h-16 px-12 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-base uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
            >
              Talk to Sales
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE ASSEMBLY
   ═══════════════════════════════════════════════════════════════════ */

export default function MissionPageClient() {
  return (
    <div>
      <HeroSection />
      <MissionSection />
      <VisionSection />
      <CoreValues />
      <StorySection />
      <StatsSection />
      <HowWeWork />
      <SocialProof />
      <TrustSection />
      <CultureSection />
      <FinalCTA />
    </div>
  );
}

