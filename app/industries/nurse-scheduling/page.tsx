"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion, useInView, AnimatePresence,
  type Variants, type Transition,
} from "framer-motion";
import {
  ArrowRight, CheckCircle2, Star, ChevronDown,
  HeartPulse, Activity, Users, Clock, Calendar,
  MessageSquare, Bell, Shield, BarChart3, Zap,
  AlertCircle, Smartphone, FileCheck, Sun, Moon,
  Repeat, Stethoscope, Building2, Brain,
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

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const NURSES = [
  { name: "Sarah K.", role: "RN · Charge", color: "#6366f1" },
  { name: "Maya R.", role: "RN", color: "#8b5cf6" },
  { name: "Jordan T.", role: "RN", color: "#a855f7" },
  { name: "Diego F.", role: "LPN", color: "#7c3aed" },
];
type ShiftKey = "D" | "N" | "O" | "P";
// Day shift / Night shift / Off / PRN
const SHIFT_GRID: ShiftKey[][] = [
  ["D", "D", "D", "O", "O", "N", "N"],
  ["O", "O", "D", "D", "D", "O", "O"],
  ["N", "N", "O", "O", "D", "D", "D"],
  ["D", "O", "N", "N", "P", "O", "O"],
];

const SHIFT_META: Record<ShiftKey, { label: string; bg: string; text: string; icon: typeof Sun }> = {
  D: { label: "Day · 7a-7p", bg: "bg-indigo-500/30", text: "text-indigo-200", icon: Sun },
  N: { label: "Night · 7p-7a", bg: "bg-violet-500/30", text: "text-violet-200", icon: Moon },
  O: { label: "Off", bg: "bg-white/5", text: "text-indigo-300/40", icon: Calendar },
  P: { label: "PRN On-Call", bg: "bg-fuchsia-500/25", text: "text-fuchsia-200", icon: Bell },
};

/* ══════════════════════════════════
   HERO — 7-day rotation grid
══════════════════════════════════ */
function HeroSection() {
  const [highlight, setHighlight] = useState<[number, number]>([0, 0]);
  useEffect(() => {
    const id = setInterval(() => {
      setHighlight(([r, c]) => {
        const nc = (c + 1) % 7;
        const nr = nc === 0 ? (r + 1) % 4 : r;
        return [nr, nc];
      });
    }, 600);
    return () => clearInterval(id);
  }, []);

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
            <HeartPulse className="w-3.5 h-3.5" />
            For Nurse Managers · Clinical Units · Health Systems
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl xl:text-[3.5rem] font-black text-white leading-[1.07] tracking-tight mb-6">
            Nurse Scheduling Software That{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Protects Your Unit
            </span>
            .
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-indigo-100/70 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            Built for nurse managers running 12-hour rotations, float pools, PRN coverage, and ratio compliance.
            Stop the callout chaos. Stop the burnout. Stop the spreadsheets.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-900/50">
              Start Free for Your Unit <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#rotation-demo"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              See the Rotation Builder
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 justify-center lg:justify-start text-xs text-indigo-200/60">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> 3x12 + 4x10 templates</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Float pool support</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Ratio compliance</span>
          </motion.div>
        </motion.div>

        {/* Right — rotation grid */}
        <motion.div
          initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative w-full"
        >
          <div className="relative bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl border border-indigo-900/40 shadow-2xl shadow-indigo-900/30 overflow-hidden">
            <div className="px-5 py-3.5 border-b border-indigo-900/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
                  <HeartPulse className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-tight">ICU Week 3 · 3x12 Rotation</p>
                  <p className="text-indigo-300/60 text-[10px]">4 RNs · 84 hrs each · ratio 1:2</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">PUBLISHED</span>
            </div>

            {/* Grid */}
            <div className="p-5">
              {/* Day header */}
              <div className="grid grid-cols-[80px_repeat(7,1fr)] gap-1 mb-2">
                <div></div>
                {DAYS.map(d => (
                  <div key={d} className="text-center text-[10px] font-bold text-indigo-200/60">{d}</div>
                ))}
              </div>

              {/* Rotation grid */}
              {NURSES.map((nurse, r) => (
                <div key={nurse.name} className="grid grid-cols-[80px_repeat(7,1fr)] gap-1 mb-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0"
                      style={{ backgroundColor: nurse.color }}>
                      {nurse.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                    </div>
                    <span className="text-white text-[10px] font-bold truncate">{nurse.name.split(" ")[0]}</span>
                  </div>
                  {SHIFT_GRID[r].map((s, c) => {
                    const isHl = highlight[0] === r && highlight[1] === c;
                    const meta = SHIFT_META[s];
                    return (
                      <motion.div key={c}
                        animate={isHl ? { scale: 1.08 } : { scale: 1 }}
                        className={`rounded-md flex flex-col items-center justify-center py-2 text-center transition-all ${meta.bg} ${isHl ? "ring-2 ring-indigo-400" : ""}`}
                      >
                        <span className={`text-[10px] font-black ${meta.text}`}>{s}</span>
                      </motion.div>
                    );
                  })}
                </div>
              ))}

              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-3 pt-3 border-t border-indigo-900/30">
                {(Object.entries(SHIFT_META) as [ShiftKey, typeof SHIFT_META[ShiftKey]][]).filter(([k]) => k !== "O").map(([k, m]) => (
                  <div key={k} className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded ${m.bg}`} />
                    <span className="text-[9px] text-indigo-200/70 font-semibold">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom strip */}
            <div className="px-5 py-3 bg-gradient-to-r from-indigo-950/40 to-violet-950/40 border-t border-indigo-900/30 flex items-center justify-between">
              <span className="text-indigo-200/60 text-[10px]">Hours/nurse · 36 base + 12 PRN</span>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="text-emerald-400 font-bold">Ratio 1:2 ✓</span>
                <span className="text-emerald-400 font-bold">All certs current</span>
              </div>
            </div>
          </div>

          {/* Floating: burnout alert */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.4, ...spring }}
            className="hidden md:flex absolute -left-8 top-16 bg-white rounded-2xl shadow-2xl border border-indigo-100 px-3.5 py-2.5 items-center gap-2.5 z-10">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Brain className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Burnout Watch</p>
              <p className="text-xs font-bold text-gray-800">All nurses below threshold</p>
            </div>
          </motion.div>

          {/* Floating: float pool */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.9, ...spring }}
            className="hidden md:flex absolute -right-4 bottom-20 bg-white rounded-2xl shadow-2xl border border-violet-100 px-3.5 py-2.5 items-center gap-2.5 z-10">
            <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
              <Users className="w-4 h-4 text-violet-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Float Pool</p>
              <p className="text-xs font-bold text-gray-800">3 floats available</p>
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
    { v: 8, s: "×", l: "faster schedule building" },
    { v: 3, s: "×", l: "fewer shift gaps" },
    { v: 12, s: " hrs", l: "weekly admin reclaimed" },
    { v: 100, s: "%", l: "ratio compliance enforced" },
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
   ROTATION BUILDER — 4 features
══════════════════════════════════ */
function RotationBuilder() {
  const pillars = [
    { icon: Calendar, t: "Templates That Fit Real Units", body: "3x12, 4x10, 8s, weekend-only, day-night rotation. Pre-built. Drop into the calendar. Done.", c: "#6366f1" },
    { icon: Users, t: "Float Pool, Made Visible", body: "Every float nurse's credentials, availability, and unit history visible in one click. Match by need.", c: "#8b5cf6" },
    { icon: Shield, t: "Ratios That Can't Be Broken", body: "Set ICU 1:2, Med-Surg 1:5. System blocks publishing if you violate. Compliance becomes automatic.", c: "#a855f7" },
    { icon: Brain, t: "Burnout Indicators · Built-In", body: "Consecutive shifts, weekly hours, hard-shift fairness. Flags early. Rebalance before someone breaks.", c: "#7c3aed" },
  ];
  return (
    <section id="rotation-demo" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-5">
            <Activity className="w-3.5 h-3.5" />
            Built for the Charge Nurse
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Four Things Every Unit Needs.
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"> Four Things We Got Right.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Not a generic calendar with shift colors. Built around how clinical units actually run — by nurses who&apos;ve done the job.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {pillars.map((p, i) => (
            <motion.div key={p.t}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-indigo-50/30 to-violet-50/20 border border-indigo-100 rounded-2xl p-7 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md"
                  style={{ background: `linear-gradient(135deg, ${p.c}, ${p.c}cc)`, boxShadow: `0 10px 30px ${p.c}30` }}>
                  <p.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">{p.t}</h3>
                  <p className="text-base text-gray-600 leading-relaxed">{p.body}</p>
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
    { icon: Clock, t: "12-Hour Rotation Templates", d: "3x12, 4x10, weekend-only, day-night. Build once, drop in, the unit fills.", grad: "from-indigo-600 to-violet-600" },
    { icon: Users, t: "Float Pool Coordination", d: "Match floats to units by credential and recent assignment. One-tap deployment.", grad: "from-violet-600 to-purple-600" },
    { icon: Bell, t: "PRN & On-Call Marketplace", d: "Open shifts post to qualified PRN staff. First-to-claim, manager approves in one tap.", grad: "from-blue-600 to-indigo-600" },
    { icon: Shield, t: "Patient-to-Nurse Ratio Lock", d: "Block schedules that violate. Flag understaffing live. Keep your unit safe.", grad: "from-purple-600 to-violet-700" },
    { icon: FileCheck, t: "Credential & License Audit", d: "RN, LPN, CNA, BLS, ACLS tracked with 60/30/7-day alerts. Block expired schedules.", grad: "from-indigo-500 to-blue-600" },
    { icon: BarChart3, t: "Shift Differential Tracking", d: "Night, weekend, holiday, charge, on-call differentials calculated automatically.", grad: "from-violet-500 to-fuchsia-600" },
    { icon: Smartphone, t: "Nurse Self-Scheduling", d: "Bid on shifts, request time-off, swap shifts — from the mobile app. Manager approves in seconds.", grad: "from-purple-500 to-violet-600" },
    { icon: Brain, t: "Burnout-Aware Warnings", d: "Track consecutive shifts and hour totals. Flag risk early. Distribute hard shifts fairly.", grad: "from-fuchsia-500 to-purple-600" },
  ];
  return (
    <section className="py-24 bg-indigo-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-5">
            <HeartPulse className="w-3.5 h-3.5" />
            Nurse-First Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Tools That Actually Help
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"> Nurse Managers Sleep at Night</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Designed with input from charge nurses, DONs, and CNOs running real units.
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
   UNIT TYPES
══════════════════════════════════ */
function UnitTypes() {
  const types = [
    { icon: Activity, t: "ICU & Critical Care", d: "1:2 ratios, charge nurses, on-call rotation" },
    { icon: HeartPulse, t: "Emergency Department", d: "Triage staffing, surge response, fast-track" },
    { icon: Stethoscope, t: "Med-Surg & Telemetry", d: "5:1 ratios, float-friendly, shift handoffs" },
    { icon: Building2, t: "Surgery & Recovery", d: "OR teams, PACU rotation, on-call surgery" },
    { icon: Bell, t: "L&D & NICU", d: "Specialty certs, on-call delivery teams" },
    { icon: Users, t: "Outpatient & Clinic Nursing", d: "Day-shift heavy, predictable patterns" },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            For Every Clinical Unit
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From a 12-bed ICU to a 40-station ED. From single-unit clinics to multi-hospital systems.
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
            &ldquo;Building <span className="bg-white/20 px-2 py-0.5 rounded-lg">a 6-week ICU rotation</span> used to take an entire weekend.
            Now I drag the 3x12 template, drop in PRN coverage, and publish in an afternoon.
            My nurses can see the schedule on their phone and bid on overtime. Game changer.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-300 to-violet-400 flex items-center justify-center text-white text-base font-black shadow-lg">
              AF
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-lg">Ashley F.</p>
              <p className="text-indigo-100/80 text-sm">Charge Nurse · 18-bed ICU</p>
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
    { q: "What is nurse scheduling software?", a: "Nurse scheduling software is a workforce platform built for the specific demands of clinical units: 12-hour rotations, float pools, PRN coverage, certification gating, staffing-ratio enforcement, and shift differentials. StaffSchedule.io is designed for nurse managers running 24/7 units in hospitals, surgery centers, and health systems." },
    { q: "Does it handle 12-hour rotating shifts?", a: "Yes. Pre-built templates cover 3x12 (three 12-hour shifts per week), 4x10, day-night rotations, weekend-only patterns, and on-call rotations. Templates respect fatigue rules, mandatory rest periods, and union agreements. Drag the template onto the calendar and the unit fills in." },
    { q: "How does float pool coordination work?", a: "Float nurses are visible across every unit they're credentialed for. When a unit needs coverage, the system suggests available floats based on skill match, recent assignments, and overtime status. Floats accept via mobile app. Skills and unit credentials transfer automatically." },
    { q: "Can it enforce patient-to-nurse staffing ratios?", a: "Yes. Set state-mandated or facility-specific ratios per unit (ICU 1:2, Med-Surg 1:5, etc.). The system prevents publishing schedules that violate ratios and flags real-time understaffing during shifts. Compliance reports are one click away." },
    { q: "How does it help prevent nurse burnout?", a: "The system tracks consecutive shifts, weekly hour totals, and overtime trends per nurse. Burnout-risk indicators flag when someone is approaching unsafe workload. Auto-balanced schedules distribute hard shifts (weekends, holidays, nights) fairly across the team." },
    { q: "Does it track shift differentials?", a: "Yes. Night, weekend, holiday, on-call, and charge nurse differentials all calculate automatically based on shift type. Differentials flow through to payroll with the right hourly rate applied to each segment." },
    { q: "Can nurses self-schedule via the app?", a: "Yes. Open shifts post to the marketplace; qualified nurses claim them via the mobile app. Self-scheduling windows let staff bid on shifts during designated periods. Manager approval is one tap. Nurses love the control; managers love the time saved." },
    { q: "Is it audit-ready for Joint Commission and state regulators?", a: "Yes. Every schedule change, swap approval, credential update, and overtime decision is logged with timestamps. Reports filter by date range, unit, or individual for surveys, audits, and regulatory inspections." },
  ];
  return (
    <section className="py-24 bg-indigo-50/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">Nurse Scheduling, Answered</h2>
          <p className="text-gray-500 text-lg">Common questions from nurse managers, charge nurses, and CNOs.</p>
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
            <HeartPulse className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Protect Your Unit.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Protect Your Nurses.</span>
          </h2>
          <p className="text-indigo-100/70 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Start free. Build next month&apos;s rotation in an afternoon. Your team will thank you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl shadow-indigo-900/50">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              Talk to a Nursing Specialist
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   PAGE
══════════════════════════════════ */
export default function NurseSchedulingPage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <RotationBuilder />
      <FeaturesGrid />
      <UnitTypes />
      <TestimonialSection />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
