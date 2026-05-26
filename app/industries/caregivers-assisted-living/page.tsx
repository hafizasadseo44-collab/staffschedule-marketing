"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion, useInView, AnimatePresence,
  type Variants, type Transition,
} from "framer-motion";
import {
  ArrowRight, CheckCircle2, Star, ChevronDown,
  Heart, Users, Clock, Calendar, MessageSquare,
  Bell, Shield, BarChart3, Zap, Building2,
  FileCheck, Smartphone, Pill, Activity, Sparkles,
  Home, AlertCircle, BookHeart, Stethoscope,
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

/* Resident care board data */
const RESIDENTS = [
  { room: "203", name: "Mrs. Patterson", caregiver: "Maria S.", notes: "Morning meds OK", color: "#6366f1", flag: false },
  { room: "204", name: "Mr. Cohen", caregiver: "James T.", notes: "PT at 2pm", color: "#8b5cf6", flag: false },
  { room: "207", name: "Mrs. Okafor", caregiver: "Maria S.", notes: "Family visit 4pm", color: "#6366f1", flag: false },
  { room: "211", name: "Mr. Schmidt", caregiver: "Devon R.", notes: "BP elevated · alert", color: "#a855f7", flag: true },
  { room: "215", name: "Mrs. Tanaka", caregiver: "James T.", notes: "Memory care · stable", color: "#8b5cf6", flag: false },
  { room: "218", name: "Mr. Russo", caregiver: "Devon R.", notes: "Hospice protocol", color: "#a855f7", flag: false },
];

/* ══════════════════════════════════
   HERO — Resident care board
══════════════════════════════════ */
function HeroSection() {
  const [highlight, setHighlight] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setHighlight(h => (h + 1) % RESIDENTS.length), 2200);
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
            <Heart className="w-3.5 h-3.5" />
            For Assisted Living · Memory Care · Senior Living
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl xl:text-[3.5rem] font-black text-white leading-[1.07] tracking-tight mb-6">
            Caregiver Scheduling{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              That Puts Residents First
            </span>
            .
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-indigo-100/70 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            Coordinate 24/7 caregiver coverage with certifications, structured handoffs,
            and resident-aware assignments. Built for the people doing the most important work.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-900/50">
              Start Free for Your Community <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#care-flow"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              See the Care Board
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 justify-center lg:justify-start text-xs text-indigo-200/60">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> 24/7 caregiver coverage</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> CNA & HHA cert tracking</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Structured handoffs</span>
          </motion.div>
        </motion.div>

        {/* Right — Resident Care Board */}
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
                  <BookHeart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-tight">Maplewood · East Wing</p>
                  <p className="text-indigo-300/60 text-[10px]">3 caregivers on · 18 residents</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">DAY SHIFT</span>
            </div>

            {/* Caregiver chips */}
            <div className="px-5 pt-4 pb-3">
              <p className="text-indigo-200/50 text-[10px] uppercase tracking-widest mb-2">On-Duty Caregivers</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: "Maria S.", role: "CNA · Lead", color: "#6366f1", res: 6 },
                  { name: "James T.", role: "CNA", color: "#8b5cf6", res: 6 },
                  { name: "Devon R.", role: "Med Tech", color: "#a855f7", res: 6 },
                ].map((cg, i) => (
                  <motion.div key={cg.name}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[9px] font-bold"
                        style={{ backgroundColor: cg.color }}>
                        {cg.name.split(" ").map(w => w[0]).join("")}
                      </div>
                      <span className="text-white text-[10px] font-bold truncate">{cg.name}</span>
                    </div>
                    <p className="text-indigo-200/50 text-[9px]">{cg.role} · {cg.res} residents</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Resident assignments */}
            <div className="px-5 pb-3">
              <p className="text-indigo-200/50 text-[10px] uppercase tracking-widest mb-2">Resident Assignments</p>
              <div className="space-y-1.5">
                {RESIDENTS.map((r, i) => {
                  const isHl = highlight === i;
                  return (
                    <motion.div key={r.room}
                      animate={{ scale: isHl ? 1.02 : 1 }}
                      className={`flex items-center gap-2.5 p-2 rounded-lg border transition-all ${isHl ? "border-indigo-400/50 bg-white/10" : "border-white/5 bg-white/3"}`}
                    >
                      <div className="w-9 h-7 rounded-md flex items-center justify-center font-mono text-[10px] font-bold text-white/70 flex-shrink-0"
                        style={{ backgroundColor: `${r.color}30` }}>
                        {r.room}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-[11px] font-bold leading-tight truncate">{r.name}</p>
                        <p className="text-indigo-200/50 text-[9px] truncate">{r.caregiver} · {r.notes}</p>
                      </div>
                      {r.flag ? (
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                          <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        </motion.div>
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Handoff strip */}
            <div className="px-5 py-3 bg-gradient-to-r from-indigo-950/40 to-violet-950/40 border-t border-indigo-900/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-indigo-300" />
                <span className="text-indigo-200/70 text-[10px]">Next handoff: 3:00 PM · 6 acknowledgments pending</span>
              </div>
            </div>
          </div>

          {/* Floating: certification */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.4, ...spring }}
            className="hidden md:flex absolute -left-8 top-16 bg-white rounded-2xl shadow-2xl border border-indigo-100 px-3.5 py-2.5 items-center gap-2.5 z-10">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
              <FileCheck className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">CNA Renewal</p>
              <p className="text-xs font-bold text-gray-800">Maria · 28 days left</p>
            </div>
          </motion.div>

          {/* Floating: handoff complete */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.9, ...spring }}
            className="hidden md:flex absolute -right-4 bottom-24 bg-white rounded-2xl shadow-2xl border border-violet-100 px-3.5 py-2.5 items-center gap-2.5 z-10">
            <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
              <Heart className="w-4 h-4 text-violet-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Family Note</p>
              <p className="text-xs font-bold text-gray-800">Mrs. Tanaka · visit logged</p>
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
    { v: 24, s: "/7", l: "caregiver coverage planning" },
    { v: 100, s: "%", l: "certification compliance" },
    { v: 10, s: " hrs", l: "weekly admin saved per facility" },
    { v: 20, s: "%", l: "lower overtime spend" },
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
   CARE-FIRST FLOW — Shift handoff process
══════════════════════════════════ */
function CareFlow() {
  const [step, setStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  const steps = [
    { t: "2:55 PM", title: "Day shift wraps up", body: "Outgoing CNAs review their resident notes and prepare structured handoff cards in the app.", icon: BookHeart, c: "#6366f1" },
    { t: "2:58 PM", title: "Handoffs sent to evening team", body: "Each resident's status, medication changes, mood notes, and family contact updates flow to incoming caregivers automatically.", icon: MessageSquare, c: "#8b5cf6" },
    { t: "3:00 PM", title: "Evening shift acknowledges", body: "Incoming caregivers tap to acknowledge every handoff before they start. No verbal pass-down lost in translation.", icon: CheckCircle2, c: "#a855f7" },
    { t: "3:05 PM", title: "Coverage map confirmed", body: "Charge nurse sees full coverage map for the wing. Any gaps trigger an instant float-pool alert.", icon: Users, c: "#7c3aed" },
    { t: "Through the shift", title: "Audit trail builds itself", body: "Every check-in, medication log, and resident interaction timestamped. State surveys are a one-click report.", icon: FileCheck, c: "#4f46e5" },
  ];

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setStep(s => (s + 1) % steps.length), 2600);
    return () => clearInterval(id);
  }, [inView, steps.length]);

  return (
    <section id="care-flow" className="py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-5">
            <Heart className="w-3.5 h-3.5" />
            How a Shift Handoff Actually Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            From Day Shift to Evening Shift
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"> Without a Single Detail Slipping</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Sticky notes and verbal pass-downs miss things. Structured digital handoffs catch them.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-3">
          {steps.map((p, i) => (
            <motion.button key={i} onClick={() => setStep(i)}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-300 ${step === i ? "border-indigo-300 bg-indigo-50/60 shadow-lg shadow-indigo-100 scale-[1.02]" : "border-gray-100 bg-white hover:border-gray-200"}`}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${p.c}20` }}>
                <p.icon className="w-5 h-5" style={{ color: p.c }} />
              </div>
              <p className="text-[10px] font-black tracking-widest uppercase mb-1.5" style={{ color: p.c }}>{p.t}</p>
              <p className="text-sm font-bold text-gray-900 mb-1.5 leading-tight">{p.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{p.body}</p>
              {step === i && (
                <motion.div layoutId="activeCare"
                  className="absolute -bottom-1 left-4 right-4 h-1 rounded-full"
                  style={{ background: `linear-gradient(to right, ${p.c}, ${p.c}80)` }} />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   FEATURES
══════════════════════════════════ */
function FeaturesGrid() {
  const feats = [
    { icon: Clock, t: "24/7 Caregiver Coverage", d: "Day, evening, NOC — every shift covered. Float pool flags gaps before they happen.", grad: "from-indigo-600 to-violet-600" },
    { icon: FileCheck, t: "CNA, HHA, Med Tech Tracking", d: "Every certification tracked with 60/30/7-day renewal alerts. Block expired schedules automatically.", grad: "from-violet-600 to-purple-600" },
    { icon: BookHeart, t: "Structured Shift Handoffs", d: "Resident status, mood, medication, family — captured digitally. Acknowledged before shift starts.", grad: "from-blue-600 to-indigo-600" },
    { icon: Users, t: "Resident-to-Caregiver Assignment", d: "Match caregivers to residents by familiarity, certification, and care plan. Continuity matters.", grad: "from-purple-600 to-violet-700" },
    { icon: Building2, t: "Multi-Facility Coordination", d: "Single community or 50-property portfolio. Float caregivers move with one tap.", grad: "from-indigo-500 to-blue-600" },
    { icon: Smartphone, t: "Caregiver Mobile App", d: "Schedule, swap shifts, message coworkers, log care notes — all from a phone. English + Spanish.", grad: "from-violet-500 to-fuchsia-600" },
    { icon: AlertCircle, t: "Real-Time Overtime Alerts", d: "Get notified the moment a caregiver approaches OT. Float or rebalance before the premium kicks in.", grad: "from-purple-500 to-violet-600" },
    { icon: Shield, t: "State Survey Audit Trails", d: "Every shift, handoff, and credential check timestamped. Pull state survey reports in one click.", grad: "from-fuchsia-500 to-purple-600" },
  ];
  return (
    <section className="py-24 bg-indigo-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Built for Senior Care Operators
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            The Tools Senior Care
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"> Has Been Asking For</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Not a generic scheduler with a heart icon. Built around the rhythms of assisted living, memory care, and nursing-home operations.
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
   COMMUNITY TYPES
══════════════════════════════════ */
function CommunityTypes() {
  const types = [
    { icon: BookHeart, t: "Assisted Living", d: "Day-to-day support, medication assistance" },
    { icon: Heart, t: "Memory Care", d: "Dementia-trained caregivers, specialized routines" },
    { icon: Stethoscope, t: "Skilled Nursing", d: "RN/LPN/CNA coverage, complex medical care" },
    { icon: Home, t: "Independent Living", d: "Wellness staff, activities team, light-touch care" },
    { icon: Building2, t: "CCRC Campuses", d: "All levels of care in one community" },
    { icon: Pill, t: "Adult Day Programs", d: "Daytime caregiver scheduling, transport coordination" },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            For Every Senior Care Setting
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From a 20-bed memory care home to a 300-unit CCRC campus — the platform adapts to your model of care.
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
            &ldquo;Handoffs used to live on sticky notes and verbal pass-downs.
            Now my evening team starts every shift with full context on every resident.
            <span className="bg-white/20 px-2 py-0.5 rounded-lg"> Falls dropped 30% in six months</span>.
            That's the kind of outcome that matters.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-300 to-violet-400 flex items-center justify-center text-white text-base font-black shadow-lg">
              AH
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-lg">April H.</p>
              <p className="text-indigo-100/80 text-sm">Executive Director · 4-community assisted living group</p>
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
    { q: "What is caregiver scheduling software?", a: "Caregiver scheduling software is a workforce platform built for assisted living, senior care, nursing homes, and memory care communities. It coordinates around-the-clock caregiver coverage, tracks certifications and renewals, manages shift handoffs, and keeps resident-to-caregiver assignments organized — all while staying compliant with state senior care regulations." },
    { q: "Does it work for assisted living, nursing homes, and memory care?", a: "Yes. All long-term care and senior living settings are supported: assisted living, skilled nursing facilities, memory care, independent living, CCRCs, and adult day programs. Templates adapt to your model — from a 20-bed memory care home to a 300-unit CCRC campus." },
    { q: "How does the system track caregiver certifications?", a: "Every caregiver's credentials (CNA, HHA, Med Tech, dementia training, CPR, first aid) are stored with expiration dates. The system sends renewal alerts 60, 30, and 7 days out — and blocks scheduling anyone with expired credentials. State compliance becomes automatic." },
    { q: "How are shift handoffs managed?", a: "Outgoing caregivers leave structured handoff notes (resident updates, medication observations, mood changes, family communication) that incoming staff acknowledge before starting their shift. Audit-ready records prove continuity of care." },
    { q: "Can I manage multiple senior living facilities?", a: "Yes. The multi-facility dashboard shows every community at once with live coverage, labor cost percentages, and compliance alerts. Float caregivers move between sister facilities with one tap. Regional directors oversee 5 to 200 communities from one screen." },
    { q: "Does it control caregiver overtime?", a: "Yes. Real-time alerts fire the moment a caregiver approaches overtime — so you can swap or call in float coverage before the premium kicks in. Most senior care operators cut overtime spend by 20%+ within the first 90 days." },
    { q: "How easy is it for caregivers to use?", a: "Caregivers learn the mobile app in under 5 minutes. They see their schedule, swap shifts, message coworkers, and clock in from their phone. Works in English and Spanish. Rated 4.8/5 by frontline care staff." },
    { q: "Does it integrate with senior care payroll?", a: "Yes. Approved timesheets sync with ADP, Gusto, QuickBooks, Rippling, and major payroll providers. Shift differentials (night, weekend, holiday) and overtime calculate automatically. Payroll runs in under an hour." },
  ];
  return (
    <section className="py-24 bg-indigo-50/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">Caregiver Scheduling, Answered</h2>
          <p className="text-gray-500 text-lg">Common questions from executive directors, DONs, and senior-care administrators.</p>
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
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Better Coverage.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Better Care.</span>
          </h2>
          <p className="text-indigo-100/70 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Start free. Schedule next week&apos;s caregivers in an afternoon. Watch handoffs get better immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl shadow-indigo-900/50">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              Talk to a Senior Care Specialist
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
export default function CaregiversPage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <CareFlow />
      <FeaturesGrid />
      <CommunityTypes />
      <TestimonialSection />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
