"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Siren, Shield, Radio, Clock, Users, AlertTriangle,
  CheckCircle2, Star, ChevronDown, Smartphone, BarChart3,
  Calendar, ArrowRight, Zap, RefreshCw, Bell, Lock
} from "lucide-react";

// ─── SECTION: HERO (DARK COMMAND CENTER) ──────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0e1a] pt-24 pb-16">
      {/* Dark atmospheric gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-red-900/30 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-indigo-900/40 rounded-full blur-[100px]"
        />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "linear-gradient(rgba(239,68,68,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.8) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-xs tracking-widest uppercase mb-6"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
              </span>
              Command Center · Active
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6"
            >
              Emergency Worker{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
                Schedule.
              </span>{" "}
              <br className="hidden lg:block" />
              Built for 24/7.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-xl"
            >
              When your team runs around the clock and every coverage gap is a risk, you need more than a spreadsheet. StaffSchedule.io gives emergency services commanders a real-time roster view, automated rotation scheduling, and instant callout management — built for the pace of emergency work.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link href="/demo">
                <button className="h-14 px-8 rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-600/30 hover:-translate-y-0.5 transition-all w-full sm:w-auto text-sm tracking-wide">
                  Start Free Trial — Command Ready
                </button>
              </Link>
              <Link href="/demo">
                <button className="h-14 px-8 rounded-xl font-bold border border-slate-600 bg-slate-800/60 text-slate-200 hover:bg-slate-700 transition-all w-full sm:w-auto text-sm">
                  Watch Live Demo
                </button>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center gap-6 text-sm"
            >
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} className="text-amber-400 fill-amber-400" />)}
                </div>
                <span className="font-bold text-white">4.9</span>
                <span className="text-slate-400">from 1,038 reviews</span>
              </div>
              <div className="text-slate-400">
                <span className="text-white font-bold">800+</span> emergency organizations worldwide
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Command Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
            className="relative"
          >
            <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-slate-800 px-5 py-4 flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <Siren size={16} className="text-red-500" />
                  <span className="text-white font-bold text-sm">Shift Command — Station 7</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest animate-pulse">● LIVE</span>
                </div>
              </div>

              {/* Current shift status */}
              <div className="p-5 grid grid-cols-3 gap-3 border-b border-slate-700/50">
                {[
                  { label: "On Shift", val: "8", color: "text-green-400" },
                  { label: "On Call", val: "3", color: "text-amber-400" },
                  { label: "Coverage Gap", val: "1", color: "text-red-500" },
                ].map((s, i) => (
                  <div key={i} className="bg-slate-800 rounded-xl p-3 text-center border border-slate-700">
                    <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
                    <p className="text-slate-400 text-[10px] mt-1 font-medium">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Alert */}
              <div className="mx-4 mt-4">
                <motion.div
                  animate={{ opacity: [1, 0.7, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  className="bg-red-900/40 border border-red-500/40 rounded-xl p-3 flex items-center gap-3"
                >
                  <Bell size={15} className="text-red-400 shrink-0" />
                  <div>
                    <p className="text-red-300 font-bold text-xs">Coverage Alert — Night Shift A</p>
                    <p className="text-slate-400 text-[10px] mt-0.5">Unit 4 called out · 3 qualified responders available</p>
                  </div>
                  <span className="ml-auto text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-2.5 py-1 rounded-lg font-bold shrink-0">Fill Now</span>
                </motion.div>
              </div>

              {/* Roster rows */}
              <div className="p-4 space-y-2">
                {[
                  { name: "Lt. Rodriguez", unit: "Engine 7A", shift: "Day — 06:00–18:00", status: "On Duty", c: "text-green-400" },
                  { name: "Paramedic Singh", unit: "Medic 3", shift: "Night — 18:00–06:00", status: "Standby", c: "text-amber-400" },
                  { name: "FF Johnson", unit: "Ladder 7", shift: "Night — 18:00–06:00", status: "Called Out", c: "text-red-400" },
                  { name: "FF Martinez", unit: "Engine 7B", shift: "Day — 06:00–18:00", status: "On Duty", c: "text-green-400" },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-700/40 last:border-0">
                    <div>
                      <p className="text-white text-xs font-bold">{r.name}</p>
                      <p className="text-slate-500 text-[10px]">{r.unit} · {r.shift}</p>
                    </div>
                    <span className={`text-[10px] font-bold ${r.c}`}>{r.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating: instant fill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, type: "spring" }}
              className="absolute -bottom-5 -left-5 bg-slate-900 border border-slate-700 rounded-xl p-3.5 shadow-xl z-10"
            >
              <p className="text-slate-400 text-[10px] font-bold mb-0.5">Avg. Callout Fill Time</p>
              <p className="text-2xl font-black text-red-400">4 min</p>
              <p className="text-[10px] text-green-400 font-semibold">↓ 91% vs manual calls</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: STATS ────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { value: "47%", label: "Of EMS agencies use paper or spreadsheet scheduling", icon: AlertTriangle },
    { value: "3.2hrs", label: "Average time lost per week to manual callout management", icon: Clock },
    { value: "91%", label: "Faster callout fill time with StaffSchedule.io automation", icon: Zap },
    { value: "800+", label: "Emergency organizations trust StaffSchedule.io", icon: Shield },
  ];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-14 bg-slate-800 border-y border-slate-700">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <Icon size={20} className="mx-auto mb-3 text-red-400" />
                <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
                <p className="text-slate-400 text-sm leading-snug">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: PAIN POINTS ─────────────────────────────────────────────────────
function PainSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const problems = [
    {
      icon: Radio,
      title: "Coverage gaps that only appear at shift start",
      desc: "Your overnight shift supervisor shows up to discover two people called out — and finds out via text at 11:55 PM. By then, you're scrambling to find replacements while the incoming unit is already stretched thin.",
    },
    {
      icon: RefreshCw,
      title: "Rotating schedules that nobody can keep track of",
      desc: "Panama, 24-48, 2-2-3 — rotating emergency schedules are complex. When they're managed on spreadsheets or whiteboards, someone always has the wrong date, and you end up with an understaffed shift or an angry employee who thought they were off.",
    },
    {
      icon: Clock,
      title: "Mandatory overtime that creates compliance risks",
      desc: "Forcing overtime on fatigued first responders is both a legal risk and a safety one. Without automated tracking and alerts, supervisors often don't realize they've pushed someone into mandatory overtime territory until after the fact.",
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-[#0d1117] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-[#0d1117] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            className="text-red-400 font-bold text-sm uppercase tracking-widest mb-3"
          >
            What's Really at Stake
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
          >
            When Scheduling Fails, Emergency Teams Pay the Price
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 leading-relaxed"
          >
            Emergency services scheduling isn't just about filling time slots. An understaffed shift in a fire department or EMS agency isn't a business inconvenience — it's a public safety risk. Here's what most emergency organizations are still struggling with.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + i * 0.12 }}
                className="p-8 rounded-2xl bg-slate-800/60 border border-red-900/30 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-red-950/50 border border-red-800/40 flex items-center justify-center mb-5">
                  <Icon size={20} className="text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: SHIFT PATTERNS ───────────────────────────────────────────────────
function ShiftPatternsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const patterns = [
    {
      name: "24-48 Rotation",
      desc: "Work 24 hours, off 48. Perfect for fire departments. StaffSchedule.io automatically manages rotation cycles so you never manually count who's next on.",
      badge: "Fire Dept.",
      color: "border-red-500/40 bg-red-950/20",
    },
    {
      name: "Panama Schedule",
      desc: "2-2-3 day/night rotation covering every hour of every week. Complex to build manually — StaffSchedule.io generates it automatically with one click.",
      badge: "EMS / Police",
      color: "border-orange-500/40 bg-orange-950/20",
    },
    {
      name: "12-Hour Rotating",
      desc: "Day and night shifts alternating on a defined cycle. Supports 4-platoon or 3-platoon configurations with automatic fairness tracking.",
      badge: "Hospitals",
      color: "border-amber-500/40 bg-amber-950/20",
    },
    {
      name: "Fixed Day / Night",
      desc: "Some responders prefer fixed shifts. Manage fixed assignments alongside rotating staff in the same roster without conflicts.",
      badge: "All Types",
      color: "border-indigo-500/40 bg-indigo-950/20",
    },
    {
      name: "On-Call Roster",
      desc: "Manage a pool of on-call responders with fair rotation, automatic alert sending, and response tracking — all from one view.",
      badge: "On-Call",
      color: "border-blue-500/40 bg-blue-950/20",
    },
    {
      name: "Overtime Management",
      desc: "Track mandatory and voluntary overtime separately. Set limits, get alerts before thresholds are hit, and export compliance-ready reports.",
      badge: "Compliance",
      color: "border-green-500/40 bg-green-950/20",
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-[#0a0e1a]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight"
          >
            Handle Every Emergency Shift Pattern Your Organization Uses
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg"
          >
            Emergency services run on complex rotating schedules. StaffSchedule.io supports all of them — automatically, without spreadsheets.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patterns.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}
              className={`p-6 rounded-2xl border backdrop-blur-sm ${p.color} hover:scale-[1.02] transition-transform`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-white font-bold text-lg">{p.name}</h3>
                <span className="text-[10px] font-bold bg-white/10 text-slate-300 px-2.5 py-1 rounded-lg border border-white/10">{p.badge}</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: FEATURES ─────────────────────────────────────────────────────────
function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const features = [
    {
      icon: Bell,
      title: "Instant Callout Alerts",
      desc: "When a responder calls out sick, StaffSchedule.io immediately identifies all qualified available replacements and sends them an instant shift request via push notification and SMS. No phone tree. No manual calling. The system does it in seconds.",
    },
    {
      icon: RefreshCw,
      title: "Automated Rotation Scheduling",
      desc: "Build your entire 90-day rotating schedule in minutes, not hours. The system handles the complexity of 24-48, Panama, and 2-2-3 patterns automatically — no manual counting, no spreadsheet errors.",
    },
    {
      icon: Shield,
      title: "Minimum Staffing Enforcement",
      desc: "Set minimum staffing requirements for every shift and unit. The system blocks schedules that would violate minimums and alerts supervisors before gaps happen — not after the shift starts.",
    },
    {
      icon: BarChart3,
      title: "Overtime & Compliance Reporting",
      desc: "Track mandatory and voluntary overtime separately for every responder. Generate compliance-ready reports showing hours by responder, shift type, and unit — ready for department administrators and union review.",
    },
    {
      icon: Smartphone,
      title: "First Responder Mobile App",
      desc: "Every responder carries their schedule, shift notes, team contact list, and certification reminders in their pocket. They can accept shift requests, request time off, and message their crew directly in the app.",
    },
    {
      icon: Lock,
      title: "Role-Based Access Control",
      desc: "Chiefs see everything. Lieutenants see their platoon. Responders see their schedule. Set granular permissions so the right people see the right information — and nothing they shouldn't.",
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-slate-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight"
          >
            Everything Emergency Commanders Need to Stay in Control
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg"
          >
            Designed specifically for the 24/7, high-stakes scheduling demands of emergency services — not adapted from generic HR software.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
                className="bg-slate-800/60 border border-slate-700 rounded-2xl p-7 hover:border-red-500/40 hover:bg-slate-800 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-red-950/50 border border-red-700/40 flex items-center justify-center mb-5 group-hover:bg-red-600 group-hover:border-red-600 transition-all">
                  <Icon size={20} className="text-red-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: MOBILE ───────────────────────────────────────────────────────────
function MobileSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 bg-[#0d1117]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-64 bg-slate-900 rounded-[2.5rem] border-4 border-slate-700 shadow-2xl overflow-hidden">
                <div className="bg-red-700 p-5 pt-10">
                  <p className="text-red-200 text-[10px] font-bold uppercase tracking-widest mb-1">YOUR NEXT SHIFT</p>
                  <p className="text-white font-black text-xl">Today, 18:00 – 06:00</p>
                  <p className="text-red-200 text-xs mt-1">Engine 7B · Night Shift</p>
                </div>
                <div className="bg-slate-900 p-4 space-y-3">
                  <div className="bg-slate-800 rounded-xl p-3 border border-slate-700">
                    <p className="text-slate-400 text-[9px] uppercase font-bold">Crew on Shift</p>
                    <div className="flex -space-x-2 mt-2">
                      {[12, 25, 33, 45].map((n, i) => (
                        <img key={i} src={`https://i.pravatar.cc/40?img=${n}`} alt="crew" className="w-7 h-7 rounded-full border-2 border-slate-800" loading="lazy" />
                      ))}
                      <div className="w-7 h-7 rounded-full bg-slate-600 border-2 border-slate-800 flex items-center justify-center text-[9px] text-white font-bold">+3</div>
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-xl p-3 border border-slate-700">
                    <p className="text-slate-400 text-[9px] uppercase font-bold">Shift Notes</p>
                    <p className="text-slate-300 text-xs mt-1">Equipment check required before rollout. New apparatus in Bay 2.</p>
                  </div>
                  <motion.div
                    animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 2, repeat: Infinity }}
                    className="bg-red-900/40 border border-red-700/40 rounded-xl p-3"
                  >
                    <p className="text-red-300 font-bold text-xs">⚡ Shift Request</p>
                    <p className="text-slate-400 text-[10px] mt-0.5">Night Shift A · Tonight 22:00 — accept?</p>
                    <div className="flex gap-2 mt-2">
                      <button className="flex-1 bg-green-600 text-white text-[10px] font-bold py-1.5 rounded-lg">Accept</button>
                      <button className="flex-1 bg-slate-700 text-slate-300 text-[10px] font-bold py-1.5 rounded-lg">Decline</button>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.5 }}
                className="absolute -left-12 top-1/3 bg-slate-800 border border-slate-600 rounded-xl p-3 shadow-xl"
              >
                <p className="text-slate-400 text-[9px] font-bold">Hours This Week</p>
                <p className="text-white font-black text-lg">36 / 48h</p>
                <div className="w-full h-1.5 bg-slate-700 rounded-full mt-1">
                  <div className="h-1.5 bg-amber-500 rounded-full" style={{ width: "75%" }} />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Copy */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
            >
              Give Every Responder Their Command Center in Their Pocket
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}
              className="text-slate-400 text-lg leading-relaxed mb-8"
            >
              First responders have enough to think about before a shift. The StaffSchedule.io mobile app gives them everything they need — their upcoming schedule, crew assignments, shift notes, and instant alerts — without any extra effort from supervisors or dispatchers.
            </motion.p>
            <ul className="space-y-4">
              {[
                "Instant push notifications for shift requests and changes",
                "Accept or decline shift requests directly from the app",
                "View full shift details, crew list, and notes before arrival",
                "Certifications and expiry tracking with reminder alerts",
                "Secure in-app messaging with command and crew",
                "View hours worked vs. overtime thresholds in real time",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.15 + i * 0.07 }}
                  className="flex items-start gap-3 text-sm text-slate-300"
                >
                  <CheckCircle2 size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: TESTIMONIALS ────────────────────────────────────────────────────
function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const testimonials = [
    {
      name: "Chief Aaron Briggs",
      title: "Fire Chief, Station 12",
      location: "Phoenix, AZ",
      avatar: "https://i.pravatar.cc/100?img=15",
      rating: 5,
      quote: "Our 24-48 schedule was a nightmare to manage manually. We had the wrong guys showing up, callouts we couldn't fill fast enough, and overtime abuse we couldn't catch. StaffSchedule.io automated the whole rotation and cut our scheduling time by 80%. I actually get weekends back now.",
    },
    {
      name: "Director Maria Chen",
      title: "EMS Operations Director",
      location: "Chicago, IL",
      avatar: "https://i.pravatar.cc/100?img=29",
      rating: 5,
      quote: "When a paramedic calls out 30 minutes before shift, we used to spend 20 minutes calling down a list. Now the system auto-sends a shift request to every qualified available responder and we have a fill confirmed in 4 minutes. That's a real difference in emergency response capacity.",
    },
    {
      name: "Sgt. Darnell Webb",
      title: "Shift Supervisor, Metro Security",
      location: "Dallas, TX",
      avatar: "https://i.pravatar.cc/100?img=61",
      rating: 5,
      quote: "We cover a 24/7 operation with 45 officers across rotating Panama schedules. Before this platform, someone was always working the wrong day. After 6 months with StaffSchedule.io, we have had zero scheduling errors. None. That used to be unthinkable.",
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-slate-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            Trusted by Emergency Leaders Who Can't Afford Mistakes
          </motion.h2>
          <p className="text-slate-400 text-lg">Real results from fire departments, EMS agencies, and security operations.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.12 }}
              className="bg-slate-800/60 border border-slate-700 rounded-2xl p-8 flex flex-col hover:border-red-500/40 transition-colors"
            >
              <div className="flex mb-4">
                {[...Array(t.rating)].map((_, si) => <Star key={si} size={14} className="text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-slate-300 leading-relaxed text-sm flex-1 mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-700">
                <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" loading="lazy" />
                <div>
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.title} · {t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: FAQ ──────────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const faqs = [
    {
      q: "What emergency worker schedule patterns does StaffSchedule.io support?",
      a: "StaffSchedule.io supports all major emergency scheduling patterns including 24-48 fire department rotations, Panama (2-2-3) schedules, 12-hour rotating day/night shifts, Kelly schedules, 4-platoon systems, and custom on-call rosters. Each pattern can be automated so the system generates future schedules without manual input.",
    },
    {
      q: "How does the software handle last-minute callouts for EMS or fire shifts?",
      a: "When a responder calls out, the system immediately identifies every qualified available replacement based on role, certification, and current hours. It sends an instant shift request to all of them simultaneously. You get a confirmation in minutes instead of making 10 phone calls. The roster updates automatically when someone accepts.",
    },
    {
      q: "Can StaffSchedule.io enforce minimum staffing levels for emergency units?",
      a: "Yes. You set minimum staffing requirements per unit and shift type. If a schedule would drop below the minimum, the system alerts supervisors immediately and blocks publication until the gap is addressed. This prevents understaffed shifts before they happen, not after.",
    },
    {
      q: "Does the software track mandatory overtime for first responders?",
      a: "Absolutely. StaffSchedule.io tracks mandatory overtime (MDOT) separately from voluntary overtime. It alerts supervisors when a responder is approaching mandatory overtime thresholds and generates compliance-ready reports that you can share with department administrators, union reps, and legal counsel.",
    },
    {
      q: "Is the mobile app suitable for first responders in the field?",
      a: "Yes. The app is designed for fast, simple use on the go. Responders can view their schedule, accept shift requests, message their crew, and check certification expiry dates — all from their phone. The interface works on slow mobile data connections, which matters when responders are out on calls.",
    },
    {
      q: "How does StaffSchedule.io handle certification tracking for emergency workers?",
      a: "Each responder profile includes their certifications (paramedic license, HAZMAT, EMT-B, etc.) and expiry dates. The system sends automatic reminders before certifications expire and can be configured to prevent scheduling uncertified responders for shifts that require specific credentials.",
    },
    {
      q: "Can the software be used for security operations and law enforcement scheduling?",
      a: "Yes. Beyond fire and EMS, StaffSchedule.io is actively used by security operations centers, correctional facilities, law enforcement agencies, and private security firms — any organization running 24/7 rotating shift operations. The platform is flexible enough to handle any roster configuration.",
    },
    {
      q: "Is there a way for responders to request time off or trade shifts?",
      a: "Yes. Responders can submit time-off requests directly in the app. Supervisors get a notification and can approve or decline with one tap. Shift trades are managed through the system with automatic eligibility checking — the platform confirms that a trade won't create coverage gaps or put either responder into overtime before approving it.",
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-[#0a0e1a]">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            Common Questions About Emergency Worker Scheduling
          </motion.h2>
          <p className="text-slate-400 text-lg">Answers for EMS, fire, and emergency operations leaders.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.05 }}
              className={`bg-slate-800/60 rounded-2xl border transition-all ${open === i ? "border-red-500/50" : "border-slate-700 hover:border-slate-500"}`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left flex items-center justify-between p-6 font-bold text-white text-sm md:text-base"
              >
                <span className="pr-4">{faq.q}</span>
                <ChevronDown size={18} className={`shrink-0 text-red-400 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-slate-700 pt-4">
                  {faq.a}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: CTA ─────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-slate-900 p-12 md:p-16 text-center shadow-2xl shadow-red-900/40">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(255,100,100,0.3) 0%, transparent 60%)" }}
          />
          <motion.div animate={{ opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-0 left-0 w-64 h-64 bg-red-500/20 rounded-full blur-[80px]"
          />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-red-200 text-xs font-bold uppercase tracking-widest mb-6">
              <Siren size={12} />
              Built for 24/7 Emergency Operations
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Build a Workforce Ready for Anything
            </h2>
            <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Join 800+ emergency organizations using StaffSchedule.io to eliminate scheduling gaps, automate rotations, and keep their teams protected and prepared — around the clock.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <button className="h-14 px-10 rounded-xl font-black bg-white text-red-900 hover:bg-red-50 transition-all shadow-xl hover:-translate-y-1 text-sm w-full sm:w-auto">
                  Start Free 14-Day Trial
                </button>
              </Link>
              <Link href="/demo">
                <button className="h-14 px-10 rounded-xl font-bold border-2 border-white/30 text-white hover:bg-white/10 transition-all w-full sm:w-auto text-sm">
                  Book a Live Demo
                </button>
              </Link>
            </div>
            <p className="mt-6 text-red-300 text-sm">No credit card required · Full access for 14 days · Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE EXPORT ───────────────────────────────────────────────────────────────
export default function EmergencyWorkerPage() {
  return (
    <main className="min-h-screen bg-[#0a0e1a] font-sans">
      <HeroSection />
      <StatsBar />
      <PainSection />
      <ShiftPatternsSection />
      <FeaturesSection />
      <MobileSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
