"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion, useInView, AnimatePresence,
  type Variants, type Transition,
} from "framer-motion";
import {
  ArrowRight, CheckCircle2, Star, ChevronDown,
  Stethoscope, Heart, HeartPulse, Pill, Activity,
  Users, Clock, Calendar, MessageSquare, Bell,
  Shield, BarChart3, Zap, Briefcase, Building2,
  Repeat, AlertCircle, Smile, FileCheck, GraduationCap,
  Smartphone,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const spring: Transition = { type: "spring", stiffness: 260, damping: 22 };

function Counter({ to, suffix = "", duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  useEffect(() => {
    if (!inView) return;
    let v = 0; const steps = Math.round(duration * 60); const inc = to / steps;
    const id = setInterval(() => {
      v += inc;
      if (v >= to) { setN(to); clearInterval(id); } else setN(Math.round(v));
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [inView, to, duration]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* Hospital departments — each has staff count, ratio target, status */
const DEPARTMENTS = [
  { id: "ed", name: "Emergency", short: "ED", icon: HeartPulse, target: 12, current: 12, status: "ok" },
  { id: "icu", name: "ICU", short: "ICU", icon: Activity, target: 8, current: 8, status: "ok" },
  { id: "ms", name: "Med-Surg", short: "M/S", icon: Stethoscope, target: 18, current: 15, status: "low" },
  { id: "or", name: "Operating Room", short: "OR", icon: Briefcase, target: 10, current: 10, status: "ok" },
  { id: "lnd", name: "Labor & Delivery", short: "L&D", icon: Heart, target: 6, current: 7, status: "over" },
  { id: "rx", name: "Pharmacy", short: "Rx", icon: Pill, target: 4, current: 4, status: "ok" },
];

/* ══════════════════════════════════
   HERO — Hospital ward grid
══════════════════════════════════ */
function HeroSection() {
  const [activeDept, setActiveDept] = useState("ed");
  useEffect(() => {
    const id = setInterval(() => {
      setActiveDept(d => {
        const i = DEPARTMENTS.findIndex(x => x.id === d);
        return DEPARTMENTS[(i + 1) % DEPARTMENTS.length].id;
      });
    }, 2300);
    return () => clearInterval(id);
  }, []);
  const active = DEPARTMENTS.find(d => d.id === activeDept) ?? DEPARTMENTS[0];

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.45, 0.25] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/25 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1, 1.22, 1], opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="text-center lg:text-left">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-indigo-300/30 text-indigo-200 text-xs font-bold tracking-widest uppercase mb-6">
            <Stethoscope className="w-3.5 h-3.5" />
            For Hospitals · Clinics · Medical Groups
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl xl:text-[3.5rem] font-black text-white leading-[1.07] tracking-tight mb-6">
            Healthcare Staff Scheduling for{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Every Shift, Every Unit, Every Hour
            </span>
            .
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-indigo-100/70 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            Coordinate clinicians across departments, sites, and rotations — with credentials respected,
            ratios protected, and HIPAA-aware messaging built in. Live in days. Loved by your team.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-900/50">
              Start Free for Your Facility <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#departments"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              See the Unit Dashboard
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 justify-center lg:justify-start text-xs text-indigo-200/60">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> 24/7 coverage views</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Credential gating</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> HIPAA-aware messaging</span>
          </motion.div>
        </motion.div>

        {/* Right — hospital units grid */}
        <motion.div
          initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative w-full"
        >
          <div className="relative bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl border border-indigo-900/40 shadow-2xl shadow-indigo-900/30 overflow-hidden">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-indigo-900/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
                  <Stethoscope className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-tight">Sunrise Regional · Day Shift</p>
                  <p className="text-indigo-300/60 text-[10px]">6 units · 57 clinicians on duty</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">LIVE</span>
            </div>

            {/* Departments grid */}
            <div className="p-5 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {DEPARTMENTS.map(d => {
                const isActive = activeDept === d.id;
                const ratio = d.current / d.target;
                const color = d.status === "ok" ? "#10b981" : d.status === "low" ? "#f59e0b" : "#6366f1";
                return (
                  <motion.button key={d.id} onClick={() => setActiveDept(d.id)}
                    animate={{ scale: isActive ? 1.04 : 1 }}
                    className={`text-left p-3 rounded-xl border transition-all ${isActive ? "border-indigo-400/60 bg-white/10" : "border-white/5 bg-white/3 hover:bg-white/5"}`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${color}20` }}>
                        <d.icon className="w-4 h-4" style={{ color }} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-white/60">{d.short}</span>
                    </div>
                    <p className="text-white text-xs font-bold leading-tight mb-1.5">{d.name}</p>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-indigo-200/50">{d.current}/{d.target} on</span>
                      <span style={{ color }} className="font-bold">{Math.round(ratio * 100)}%</span>
                    </div>
                    <div className="mt-1.5 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(ratio * 100, 100)}%` }}
                        transition={{ duration: 0.6 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Active dept detail */}
            <div className="px-5 pb-5">
              <AnimatePresence mode="wait">
                <motion.div key={active.id}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 border border-white/5 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <active.icon className="w-4 h-4 text-indigo-300" />
                      <p className="text-white text-xs font-bold">{active.name} · Day Shift</p>
                    </div>
                    <span className="text-indigo-300/70 text-[10px]">Ratio target {active.target}</span>
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { name: "RN Sarah K.", role: "Charge · 7a-7p", color: "#6366f1" },
                      { name: "RN Marcus T.", role: "Bedside · 7a-7p", color: "#8b5cf6" },
                      { name: "LPN Aiko D.", role: "Bedside · 7a-3p", color: "#a855f7" },
                    ].map((p, i) => (
                      <motion.div key={p.name}
                        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center gap-2.5 py-1">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[8px] font-bold"
                          style={{ backgroundColor: p.color }}>
                          {p.name.split(" ").slice(-1)[0][0]}
                        </div>
                        <span className="text-white text-[11px] font-semibold flex-1 truncate">{p.name}</span>
                        <span className="text-indigo-200/50 text-[9px] truncate max-w-[110px]">{p.role}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 24h coverage */}
            <div className="px-5 py-3 bg-gradient-to-r from-indigo-950/40 to-violet-950/40 border-t border-indigo-900/30">
              <p className="text-indigo-200/50 text-[9px] uppercase tracking-widest mb-2">24-Hour Coverage</p>
              <div className="flex gap-0.5 h-3 rounded-full overflow-hidden bg-indigo-950/50">
                {Array.from({ length: 24 }).map((_, h) => {
                  const intensity = 0.5 + Math.sin((h / 24) * Math.PI * 2) * 0.3 + Math.random() * 0.2;
                  return (
                    <motion.div key={h}
                      initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                      transition={{ delay: 0.6 + h * 0.025, duration: 0.4 }}
                      className="flex-1 origin-bottom rounded-sm"
                      style={{ background: `linear-gradient(to top, #6366f1, #8b5cf6${Math.round(intensity * 100).toString(16)})` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Floating: credential alert */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.4, ...spring }}
            className="hidden md:flex absolute -left-8 top-16 bg-white rounded-2xl shadow-2xl border border-indigo-100 px-3.5 py-2.5 items-center gap-2.5 z-10">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
              <FileCheck className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Credential</p>
              <p className="text-xs font-bold text-gray-800">All RNs current · 0 alerts</p>
            </div>
          </motion.div>

          {/* Floating: handoff */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.9, ...spring }}
            className="hidden md:flex absolute -right-4 bottom-20 bg-white rounded-2xl shadow-2xl border border-violet-100 px-3.5 py-2.5 items-center gap-2.5 z-10">
            <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
              <Repeat className="w-4 h-4 text-violet-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Handoff</p>
              <p className="text-xs font-bold text-gray-800">Night shift signed in</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   STATS BAR
══════════════════════════════════ */
function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const items = [
    { v: 100, s: "%", l: "credential compliance enforced" },
    { v: 10, s: " hrs", l: "weekly admin time saved" },
    { v: 24, s: "/7", l: "live unit coverage views" },
    { v: 0, s: "", l: "expired licenses scheduled" },
  ];
  return (
    <div ref={ref} className="border-y border-indigo-100 bg-gradient-to-r from-indigo-50/30 to-violet-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 divide-y-2 lg:divide-y-0 lg:divide-x divide-indigo-100">
        {items.map((it, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08 }} className="flex flex-col items-center gap-1 px-6 py-4 text-center">
            <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              {inView ? <Counter to={it.v} suffix={it.s} /> : `0${it.s}`}
            </p>
            <p className="text-sm font-semibold text-gray-700 leading-tight">{it.l}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════
   PROBLEMS → SOLUTIONS section
══════════════════════════════════ */
function ProblemsSolutions() {
  const rows = [
    { problem: "Nurses double-booked across units when float pool is opaque", solution: "Float pool is visible to every charge nurse with one tap to assign", icon: Repeat },
    { problem: "Schedules get published with expired licenses or missing certs", solution: "System blocks publishing any shift where credentials don't match", icon: Shield },
    { problem: "Handoffs happen on sticky notes and verbal pass-down — things slip", solution: "Structured digital handoffs with acknowledgement before shift starts", icon: FileCheck },
    { problem: "Overtime piles up before anyone notices on Monday", solution: "Real-time OT alerts trigger before the threshold — and managers can rebalance immediately", icon: AlertCircle },
    { problem: "Staff share personal phone numbers to coordinate — HIPAA risk", solution: "In-app messaging, no personal numbers exposed, all audit-logged", icon: MessageSquare },
    { problem: "Multi-site systems run on 4+ scheduling tools that don't talk", solution: "One platform across hospitals, clinics, and outpatient sites — clinicians, float, PRN", icon: Building2 },
  ];
  return (
    <section id="departments" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-5">
            <Activity className="w-3.5 h-3.5" />
            Six Healthcare Problems · Solved
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            The Real Reasons Hospitals Switch
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"> to a Modern Scheduling Platform</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Not the marketing pitch. The actual problems nurse managers, schedulers, and DONs solve in week one.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-4">
          {rows.map((r, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="bg-gradient-to-br from-indigo-50/40 to-violet-50/20 border border-indigo-100 rounded-2xl p-5 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <r.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-500 mt-0.5">Problem</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">{r.problem}</p>
                  <div className="flex items-start gap-2 pt-3 border-t border-indigo-100">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold text-gray-900 leading-relaxed">{r.solution}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   FEATURES GRID
══════════════════════════════════ */
function FeaturesGrid() {
  const feats = [
    { icon: Clock, t: "Rotating Shift Templates", d: "3x12, 4x10, day-night rotations, weekend-only — pre-built and ready to drag onto the calendar.", grad: "from-indigo-600 to-violet-600" },
    { icon: FileCheck, t: "Credential & License Tracking", d: "RN, LPN, CNA, BLS, ACLS — every cert tracked with 60/30/7-day expiry alerts. Auto-block expired schedules.", grad: "from-violet-600 to-purple-600" },
    { icon: Building2, t: "Multi-Facility Scheduling", d: "Hospitals, clinics, urgent care, outpatient sites — all in one dashboard with float pool rules.", grad: "from-blue-600 to-indigo-600" },
    { icon: MessageSquare, t: "HIPAA-Aware Messaging", d: "Secure team chat. No personal numbers shared. End-to-end encrypted. Audit-logged.", grad: "from-purple-600 to-violet-700" },
    { icon: Shield, t: "Staffing Ratio Enforcement", d: "Set ICU 1:2, Med-Surg 1:5 etc. System blocks schedules that violate; flags real-time understaffing.", grad: "from-indigo-500 to-blue-600" },
    { icon: Smartphone, t: "Clinician Mobile App", d: "Schedule, swaps, time-off, messages, clock-in. iOS and Android. Rated 4.8/5 by clinical staff.", grad: "from-violet-500 to-fuchsia-600" },
    { icon: AlertCircle, t: "Overtime & Fatigue Alerts", d: "Real-time OT warnings. Consecutive-shift tracking. Burnout-risk indicators. Stop OT before it happens.", grad: "from-purple-500 to-violet-600" },
    { icon: BarChart3, t: "Audit-Ready Reporting", d: "Compliance reports for Joint Commission, state regulators, and CMS audits — one click away.", grad: "from-fuchsia-500 to-purple-600" },
  ];
  return (
    <section className="py-24 bg-indigo-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-5">
            <Stethoscope className="w-3.5 h-3.5" />
            Healthcare-Native Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Every Feature, Built for{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">How Clinical Teams Actually Work</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Generic scheduling tools force healthcare into a box. We&apos;re built for the box.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {feats.map((f, i) => (
            <motion.div key={f.t}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl border border-indigo-100 p-5 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.grad} flex items-center justify-center mb-4 shadow-sm`}>
                <f.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-2">{f.t}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   FACILITY TYPES
══════════════════════════════════ */
function FacilityTypes() {
  const types = [
    { icon: Building2, t: "Hospitals & Health Systems", d: "Multi-department, multi-site, union-aware" },
    { icon: Stethoscope, t: "Outpatient Clinics", d: "Primary care, specialty, FQHCs" },
    { icon: HeartPulse, t: "Urgent Care", d: "Walk-in coverage, peak-hour staffing" },
    { icon: Smile, t: "Dental Practices", d: "Hygienist rotations, assistant coverage" },
    { icon: Pill, t: "Pharmacies", d: "Retail and hospital pharmacy scheduling" },
    { icon: Heart, t: "Specialty Practices", d: "Vet, physical therapy, mental health" },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            For Every Type of Healthcare Facility
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From a 5-provider clinic to a 30-hospital health system — the platform scales to your operation.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {types.map((t, i) => (
            <motion.div key={t.t}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-indigo-50/40 to-violet-50/30 border border-indigo-100 hover:border-indigo-300 transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-200">
                <t.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-base font-bold text-gray-900 mb-1">{t.t}</p>
                <p className="text-xs text-gray-500">{t.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   TESTIMONIAL
══════════════════════════════════ */
function TestimonialSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 relative overflow-hidden">
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-300/20 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-yellow-300 text-yellow-300" />)}
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white leading-relaxed tracking-tight mb-8">
            &ldquo;Coordinating <span className="bg-white/20 px-2 py-0.5 rounded-lg">120 clinicians across 3 sites</span> used to take 20 hours a week.
            Now my charge nurses spend that time on patients, not spreadsheets.
            And our credential audits went from a week of dread to a one-click report.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-300 to-violet-400 flex items-center justify-center text-white text-base font-black shadow-lg">
              JW
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-lg">Jenessa W.</p>
              <p className="text-indigo-100/80 text-sm">Director of Nursing · 3-site health system</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   FAQ
══════════════════════════════════ */
function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    { q: "What is healthcare staff scheduling software?", a: "Healthcare staff scheduling software is a workforce management platform that handles the unique demands of medical environments: rotating shifts, certification gating, 24/7 coverage, multi-department coordination, and HIPAA-aware communication. StaffSchedule.io is purpose-built for hospitals, clinics, dental groups, urgent care, and outpatient facilities." },
    { q: "Does it handle rotating shifts and 12-hour patterns?", a: "Yes. Pre-built templates cover 3x12, 4x10, day-night rotations, weekend-only patterns, on-call rotations, and PRN coverage. Schedules respect rest periods, fatigue rules, and union agreements. Build once, drag into the calendar, and the entire department fills in." },
    { q: "Does it track licenses and certifications?", a: "Yes. Every clinician's credentials (RN, LPN, CNA, BLS, ACLS, state license) are tracked with expiration alerts 60, 30, and 7 days out. The system blocks scheduling anyone with expired credentials — making compliance automatic." },
    { q: "Is the messaging HIPAA-friendly?", a: "Yes. All team communication stays inside the StaffSchedule.io platform with end-to-end encryption. No personal phone numbers shared. Audit logs track every message. Suitable as part of a HIPAA-compliant workflow when configured per your compliance officer's requirements." },
    { q: "Can it manage staff across multiple facilities?", a: "Yes. Multi-site scheduling shows every facility from one dashboard. Float pool nurses move between sites with one tap. Multi-facility reports roll up to organization-level for system administrators." },
    { q: "Does it integrate with healthcare payroll?", a: "Yes. Approved timesheets sync to ADP, Gusto, QuickBooks, Rippling, and major payroll providers. Shift differentials (night, weekend, on-call), overtime, and PTO all calculate correctly. Payroll runs in under an hour." },
    { q: "How does it support compliance and audits?", a: "Every schedule change, swap, credential renewal, and overtime decision is timestamped and logged. Compliance reports for Joint Commission, CMS, and state surveys are available in a click. Document storage keeps signed acknowledgements and policies in one place." },
    { q: "How fast can a clinic or hospital get started?", a: "Most clinics go live in 1–2 days. Multi-department hospitals usually take 1–2 weeks for full rollout including credential import and template configuration. Dedicated healthcare onboarding is included on every plan." },
  ];
  return (
    <section className="py-24 bg-indigo-50/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">Healthcare Scheduling, Answered</h2>
          <p className="text-gray-500 text-lg">Common questions from nurse managers, DONs, and clinic administrators.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="border border-indigo-100 rounded-2xl overflow-hidden bg-white shadow-sm">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-indigo-50/40 transition-colors duration-150">
                <span className="font-semibold text-gray-900 pr-4 text-sm sm:text-base">{f.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>
                    <div className="px-6 pb-5 pt-3 text-gray-600 leading-relaxed text-sm border-t border-indigo-50">{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   FINAL CTA
══════════════════════════════════ */
function FinalCta() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden">
      <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-indigo-600/30 to-violet-600/30 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-900/50">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Give Your Clinical Team
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Their Hours Back.</span>
          </h2>
          <p className="text-indigo-100/70 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Start free. Schedule a unit this week. Watch your charge nurses smile.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl shadow-indigo-900/50">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              Talk to a Healthcare Specialist
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {["Credential gating", "HIPAA-aware messaging", "24/7 coverage", "Live in 1–2 days"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span className="text-sm text-indigo-200/70">{t}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   PAGE
══════════════════════════════════ */
export default function HealthcarePage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <ProblemsSolutions />
      <FeaturesGrid />
      <FacilityTypes />
      <TestimonialSection />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
