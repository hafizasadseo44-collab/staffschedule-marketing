"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion, useInView, AnimatePresence,
  type Variants, type Transition,
  useMotionValue, useTransform, useSpring as useMotionSpring,
} from "framer-motion";
import {
  ArrowRight, CheckCircle2, Star, ChevronDown,
  UtensilsCrossed, ChefHat, Wine, Coffee, Pizza,
  Flame, Users, Clock, MessageSquare, Bell,
  TrendingDown, DollarSign, Receipt, Calendar,
  Repeat, Zap, Shield, Phone, MapPin,
  Sparkles, Timer, AlertCircle, Soup,
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

/* ══════════════════════════════════
   HERO — "Tonight's Floor" dashboard
══════════════════════════════════ */
function HeroSection() {
  const [time, setTime] = useState(0);
  const slots = [
    { label: "Lunch", hour: "11a", level: 0.55 },
    { label: "Prep", hour: "3p", level: 0.30 },
    { label: "Service", hour: "5p", level: 0.78 },
    { label: "Rush", hour: "7p", level: 1.0 },
    { label: "Late", hour: "10p", level: 0.45 },
  ];
  useEffect(() => {
    const id = setInterval(() => setTime(t => (t + 1) % slots.length), 2200);
    return () => clearInterval(id);
  }, [slots.length]);

  const mx = useMotionValue(0); const my = useMotionValue(0);
  const rotateX = useMotionSpring(useTransform(my, [-300, 300], [4, -4]), { stiffness: 120, damping: 30 });
  const rotateY = useMotionSpring(useTransform(mx, [-600, 600], [-4, 4]), { stiffness: 120, damping: 30 });

  return (
    <section
      className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden pt-24 pb-16"
      onMouseMove={e => { mx.set(e.clientX - window.innerWidth / 2); my.set(e.clientY - window.innerHeight / 2); }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1, 1.22, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-600/25 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,200,150,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,200,150,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left copy */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="text-center lg:text-left">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-indigo-300/30 text-indigo-200 text-xs font-bold tracking-widest uppercase mb-6">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            For Restaurants · Cafés · Bars · QSR
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl xl:text-[3.5rem] font-black text-white leading-[1.07] tracking-tight mb-6">
            Restaurant Scheduling Built for the{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              7 PM Rush
            </span>
            .
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-indigo-100/70 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            Front-of-house and back-of-house in one platform. Shift swaps in 60 seconds.
            Tips tracked automatically. Payroll-ready timesheets every Sunday night.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-900/50">
              Start Free for Your Restaurant <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              See Tonight&apos;s Floor Demo
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 justify-center lg:justify-start text-xs text-indigo-200/60">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> 14-day free trial</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Restaurant industry preset</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Built for FOH + BOH</span>
          </motion.div>
        </motion.div>

        {/* Right — "Tonight's Floor" dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div style={{ rotateX, rotateY, transformPerspective: 1500 }} className="relative w-full max-w-md">
            <div className="relative bg-gradient-to-br from-[#1f0f14] to-[#15090d] rounded-2xl border border-indigo-900/40 shadow-2xl shadow-indigo-900/40 overflow-hidden">
              {/* Header */}
              <div className="px-5 py-3.5 border-b border-indigo-900/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-indigo-400" />
                  <span className="text-white text-xs font-bold">Tonight&apos;s Floor</span>
                </div>
                <span className="text-indigo-300/70 text-[10px] font-mono">Fri · May 25 · {slots[time].hour}</span>
              </div>

              {/* Demand timeline */}
              <div className="px-5 pt-4 pb-3">
                <p className="text-indigo-200/50 text-[10px] uppercase tracking-widest mb-2">Demand Forecast</p>
                <div className="flex items-end gap-1.5 h-16 mb-2">
                  {slots.map((s, i) => (
                    <button key={s.label} onClick={() => setTime(i)} className="flex-1 group">
                      <motion.div
                        animate={{ height: `${s.level * 100}%`, opacity: i === time ? 1 : 0.45 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className={`w-full rounded-t transition-all ${i === time ? "bg-gradient-to-t from-violet-500 to-indigo-400" : "bg-indigo-900/40"}`} />
                    </button>
                  ))}
                </div>
                <div className="flex gap-1.5">
                  {slots.map((s, i) => (
                    <span key={s.label} className={`flex-1 text-center text-[9px] font-bold ${i === time ? "text-indigo-300" : "text-indigo-200/30"}`}>
                      {s.hour}
                    </span>
                  ))}
                </div>
              </div>

              {/* FOH section */}
              <div className="px-5 pt-3 pb-2 border-t border-indigo-900/30">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-indigo-200/60 text-[10px] uppercase tracking-widest">Front of House</p>
                  <span className="text-white text-xs font-bold">8 on floor</span>
                </div>
                {[
                  { name: "Sarah M.", role: "Lead Server · Sections 1–3", color: "#8b5cf6", status: "in" },
                  { name: "Marcus T.", role: "Bartender · Main Bar", color: "#6366f1", status: "in" },
                  { name: "Jenny K.", role: "Host · Front", color: "#ec4899", status: "soon" },
                ].map((p, i) => (
                  <motion.div key={p.name}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-center gap-2.5 py-1.5">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                      style={{ backgroundColor: p.color }}>
                      {p.name.split(" ").map(w => w[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[11px] font-semibold truncate">{p.name}</p>
                      <p className="text-indigo-200/40 text-[9px] truncate">{p.role}</p>
                    </div>
                    <span className={`w-1.5 h-1.5 rounded-full ${p.status === "in" ? "bg-emerald-400" : "bg-amber-400"}`} />
                  </motion.div>
                ))}
              </div>

              {/* BOH section */}
              <div className="px-5 pt-3 pb-4 border-t border-indigo-900/30">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-indigo-200/60 text-[10px] uppercase tracking-widest">Back of House</p>
                  <span className="text-white text-xs font-bold">6 in kitchen</span>
                </div>
                {[
                  { name: "Chef Diaz", role: "Head Chef · Pass", color: "#7c3aed", status: "in" },
                  { name: "Tomas R.", role: "Line · Grill", color: "#b91c1c", status: "in" },
                  { name: "Aiko L.", role: "Prep · Sauté", color: "#991b1b", status: "in" },
                ].map((p, i) => (
                  <motion.div key={p.name}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                    className="flex items-center gap-2.5 py-1.5">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                      style={{ backgroundColor: p.color }}>
                      {p.name.split(" ").map(w => w[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[11px] font-semibold truncate">{p.name}</p>
                      <p className="text-indigo-200/40 text-[9px] truncate">{p.role}</p>
                    </div>
                    <span className={`w-1.5 h-1.5 rounded-full ${p.status === "in" ? "bg-emerald-400" : "bg-amber-400"}`} />
                  </motion.div>
                ))}
              </div>

              {/* Bottom labor */}
              <div className="px-5 pb-5 pt-2 bg-gradient-to-r from-indigo-950/40 to-violet-950/40 border-t border-indigo-900/30">
                <div className="flex items-center justify-between">
                  <span className="text-indigo-200/60 text-[10px] uppercase tracking-widest">Tonight&apos;s Labor</span>
                  <span className="text-emerald-400 text-xs font-bold">28% of forecast revenue</span>
                </div>
              </div>
            </div>

            {/* Floating: shift swap */}
            <motion.div
              initial={{ opacity: 0, x: -40, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.4, ...spring }}
              className="hidden md:flex absolute -left-8 top-32 bg-white rounded-2xl shadow-2xl border border-indigo-100 px-3.5 py-2.5 items-center gap-2.5 z-10">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
                <Repeat className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Swap Approved</p>
                <p className="text-xs font-bold text-gray-800">Marcus → Jenny · bar</p>
              </div>
            </motion.div>

            {/* Floating: tip pool */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.9, ...spring }}
              className="hidden md:flex absolute -right-6 bottom-28 bg-white rounded-2xl shadow-2xl border border-violet-100 px-3.5 py-2.5 items-center gap-2.5 z-10">
              <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-violet-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tip Pool</p>
                <p className="text-xs font-bold text-gray-800">$847 distributed</p>
              </div>
            </motion.div>
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
    { v: 15, s: " hrs", l: "saved on scheduling weekly" },
    { v: 22, s: "%", l: "lower restaurant labor cost" },
    { v: 60, s: " sec", l: "average shift swap time" },
    { v: 4.8, s: "/5", l: "mobile app rating" },
  ];
  return (
    <div ref={ref} className="border-y border-indigo-100 bg-gradient-to-r from-indigo-50/40 to-violet-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-0 divide-y-2 lg:divide-y-0 lg:divide-x divide-indigo-100">
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
   "Friday at 7PM" — Dinner Rush Scenario
══════════════════════════════════ */
function DinnerRushScenario() {
  const [step, setStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });
  const steps = [
    { icon: AlertCircle, time: "4:42 PM", title: "Server calls out", body: "Maria texts she's sick. You have 18 minutes until first reservation.", color: "#6366f1", bg: "bg-indigo-100", text: "text-indigo-700" },
    { icon: Zap, time: "4:43 PM", title: "Auto-broadcast sent", body: "The shift drops into the swap board. All qualified servers get a push notification with one-tap claim.", color: "#8b5cf6", bg: "bg-indigo-100", text: "text-indigo-700" },
    { icon: CheckCircle2, time: "4:47 PM", title: "Jordan claims it", body: "Jordan is closest to the restaurant. He confirms. Manager approves with one tap from her phone.", color: "#10b981", bg: "bg-emerald-100", text: "text-emerald-700" },
    { icon: Bell, time: "4:49 PM", title: "FOH team notified", body: "Updated schedule pushes to every server, host, and bartender. The kitchen knows who's running food.", color: "#8b5cf6", bg: "bg-purple-100", text: "text-purple-700" },
    { icon: UtensilsCrossed, time: "5:00 PM", title: "Service starts on time", body: "Doors open. Every section is covered. The dinner rush hits — and you're ready for it.", color: "#7c3aed", bg: "bg-indigo-100", text: "text-indigo-700" },
  ];
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setStep(s => (s + 1) % steps.length), 2600);
    return () => clearInterval(id);
  }, [inView, steps.length]);

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-indigo-600 text-xs font-bold tracking-widest uppercase mb-5">
            <Flame className="w-3.5 h-3.5" />
            18 Minutes to Service
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            What Actually Happens
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"> When a Server Calls Out at 4:42 PM</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            A real Friday night scenario. Five steps. Eighteen minutes. Zero panic.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-3">
          {steps.map((s, i) => (
            <motion.button key={i} onClick={() => setStep(i)}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-300 ${step === i ? "border-indigo-300 bg-indigo-50 shadow-lg shadow-indigo-100 scale-[1.02]" : "border-gray-100 bg-white hover:border-gray-200"}`}
            >
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <p className={`text-[10px] font-black tracking-widest uppercase mb-1.5 ${s.text}`}>{s.time}</p>
              <p className="text-sm font-bold text-gray-900 mb-1.5 leading-tight">{s.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{s.body}</p>
              {step === i && (
                <motion.div layoutId="activeRush"
                  className="absolute -bottom-1 left-4 right-4 h-1 rounded-full"
                  style={{ background: `linear-gradient(to right, ${s.color}, ${s.color}80)` }} />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   FOH vs BOH — split feature comparison
══════════════════════════════════ */
function FohBohSplit() {
  const FOH = [
    { icon: Users, label: "Section assignments", desc: "Map servers to sections, sweep zones, and patio coverage" },
    { icon: Wine, label: "Bar shift templates", desc: "Bartender, barback, cocktail server rotations on autopilot" },
    { icon: Receipt, label: "Tip pool & tip-out", desc: "Auto-calculated by role and shift, ready for payroll" },
    { icon: Repeat, label: "Server shift swaps", desc: "Same-role swaps auto-approved if you choose" },
  ];
  const BOH = [
    { icon: ChefHat, label: "Station rotations", desc: "Sauté, grill, fry, pantry, garde manger — all assignable" },
    { icon: Flame, label: "Prep-day templates", desc: "Mise-en-place schedules separate from service shifts" },
    { icon: Shield, label: "Cert & allergen tracking", desc: "Food handler, ServSafe, allergen training all logged" },
    { icon: Soup, label: "Kitchen brigade roles", desc: "Sous chef, line cook, dishwasher templates pre-built" },
  ];
  return (
    <section className="py-24 bg-gradient-to-br from-[#1a0a0e] to-[#0c0506]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-indigo-300/30 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-5">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            Built for the Whole Restaurant
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            One Platform for{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Front of House</span>
            {" "}AND{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Back of House</span>
          </h2>
          <p className="text-indigo-100/60 text-lg max-w-2xl mx-auto">
            Most scheduling tools treat servers and chefs the same. We don&apos;t. Both sides get the right tools for the job.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* FOH */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }} className="relative bg-gradient-to-br from-indigo-950/60 to-violet-950/60 backdrop-blur border border-indigo-500/20 rounded-3xl p-7 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-xl shadow-indigo-500/30">
                  <Wine className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-indigo-300/60 text-[10px] font-bold tracking-widest uppercase">Front of House</p>
                  <h3 className="text-xl font-black text-white">Servers, Hosts, Bar</h3>
                </div>
              </div>
              <div className="space-y-3">
                {FOH.map((f, i) => (
                  <motion.div key={f.label}
                    initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-200">
                    <div className="w-9 h-9 rounded-lg bg-indigo-500/15 flex items-center justify-center flex-shrink-0">
                      <f.icon className="w-4.5 h-4.5 text-indigo-300" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold mb-0.5">{f.label}</p>
                      <p className="text-indigo-200/60 text-xs leading-relaxed">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* BOH */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }} className="relative bg-gradient-to-br from-violet-950/60 to-purple-950/60 backdrop-blur border border-violet-500/20 rounded-3xl p-7 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet-500/15 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-xl shadow-violet-600/30">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-violet-300/60 text-[10px] font-bold tracking-widest uppercase">Back of House</p>
                  <h3 className="text-xl font-black text-white">Chefs, Line, Prep</h3>
                </div>
              </div>
              <div className="space-y-3">
                {BOH.map((f, i) => (
                  <motion.div key={f.label}
                    initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-200">
                    <div className="w-9 h-9 rounded-lg bg-violet-500/15 flex items-center justify-center flex-shrink-0">
                      <f.icon className="w-4.5 h-4.5 text-violet-300" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold mb-0.5">{f.label}</p>
                      <p className="text-violet-200/60 text-xs leading-relaxed">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   FEATURES GRID — restaurant-specific
══════════════════════════════════ */
function FeaturesGrid() {
  const feats = [
    { icon: Calendar, t: "Demand-Based Templates", d: "Pre-build coverage for brunch, lunch rush, Friday dinner, late-night. Drag and the whole week fills.", grad: "from-indigo-600 to-violet-600" },
    { icon: Repeat, t: "Shift Swap Marketplace", d: "Servers post swaps. Qualified peers claim. Managers approve with one tap. Average swap: 60 seconds.", grad: "from-violet-500 to-fuchsia-600" },
    { icon: Receipt, t: "Tip Pool & Tip-Out", d: "Configure tip rules by role. System calculates pools by shift and syncs distributions to payroll.", grad: "from-violet-500 to-purple-600" },
    { icon: Timer, t: "Break Enforcement", d: "California, New York, and every other state&apos;s break rules built in. Reminders prevent compliance fines.", grad: "from-fuchsia-500 to-pink-600" },
    { icon: Phone, t: "Server Mobile App", d: "Check schedule, swap shifts, message coworkers, clock in — all from a phone the whole staff already uses.", grad: "from-indigo-600 to-blue-700" },
    { icon: TrendingDown, t: "Real-Time Labor %", d: "Live labor cost vs revenue forecast. Get warned the moment you&apos;re over budget — not on Monday morning.", grad: "from-purple-500 to-fuchsia-600" },
    { icon: MessageSquare, t: "Pre-Service Briefings", d: "Send 86&apos;d items, VIP reservations, and shift notes as one broadcast. Read receipts confirm every server saw it.", grad: "from-violet-600 to-indigo-700" },
    { icon: Shield, t: "Food-Safe Cert Tracking", d: "ServSafe, food handler, alcohol service — every cert logged with expiry alerts. Audit-ready every day.", grad: "from-indigo-500 to-violet-700" },
  ];
  return (
    <section className="py-24 bg-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Built for Restaurants
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Every Feature, Tuned for{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">How Restaurants Actually Run</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Not generic SaaS scheduling with a restaurant logo bolted on. Built ground-up for tipped wages, kitchen brigades, and the chaos of service.
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
   RESTAURANT TYPES
══════════════════════════════════ */
function RestaurantTypes() {
  const types = [
    { icon: UtensilsCrossed, t: "Full-Service Restaurants", d: "FOH/BOH split, tip pooling, section management" },
    { icon: Pizza, t: "Quick-Service (QSR)", d: "Counter shifts, drive-thru lanes, fast turnover staffing" },
    { icon: Wine, t: "Bars & Pubs", d: "Bartender rotations, last-call coverage, bar-back schedules" },
    { icon: Coffee, t: "Cafés & Coffee Shops", d: "Open-to-close rotation, barista training tracking, weekend rush" },
    { icon: ChefHat, t: "Fine Dining", d: "Brigade structure, sommelier rotations, multi-course service" },
    { icon: Soup, t: "Catering Operations", d: "Off-site event staffing, prep-day scheduling, mobile crew updates" },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Trusted Across Every Restaurant Type
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From a single-location café to a 50-restaurant group — the same platform scales.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {types.map((t, i) => (
            <motion.div key={t.t}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-indigo-50/50 to-violet-50/30 border border-indigo-100 hover:border-indigo-300 transition-all duration-200">
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
   TESTIMONIAL (single big quote)
══════════════════════════════════ */
function TestimonialSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-700 relative overflow-hidden">
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-300/20 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-yellow-300 text-yellow-300" />)}
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white leading-relaxed tracking-tight mb-8">
            &ldquo;We cut weekly scheduling from <span className="bg-white/20 px-2 py-0.5 rounded-lg">12 hours to 25 minutes</span>.
            Server callouts get covered before service starts. And tip pools just <em>work</em>.
            For a 4-restaurant group, this is the platform we wish existed five years ago.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-300 to-violet-400 flex items-center justify-center text-white text-base font-black shadow-lg">
              MR
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-lg">Maria R.</p>
              <p className="text-indigo-100/80 text-sm">Operations Director · 4-location Italian group</p>
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
    { q: "How is restaurant scheduling different from regular employee scheduling?", a: "Restaurants run two distinct teams (FOH and BOH) with different roles, certifications, tip rules, and shift patterns. Generic scheduling tools treat everyone the same. StaffSchedule.io has FOH/BOH presets, tip pool calculations, section assignments, kitchen brigade templates, and break enforcement tuned to food service from day one." },
    { q: "How does StaffSchedule.io handle last-minute server callouts?", a: "A callout opens an instant shift swap to all qualified servers via push notification. The first to claim gets the shift after a one-tap manager approval. Average resolution: under 5 minutes. You can also pre-build a list of preferred on-call staff who get notified first." },
    { q: "Can I track tip pools and tip-outs automatically?", a: "Yes. Configure tip-out percentages per role (busser 2%, food runner 3%, etc.), define the pool grouping (by shift, by section, or pooled across), and the system calculates distributions automatically. Tips sync to approved timesheets and flow to payroll." },
    { q: "Does it work for multi-location restaurant groups?", a: "Absolutely. View labor across every location in one dashboard, move staff between sites with a single tap, and run group-wide reports on labor cost percentages. Built specifically for restaurant groups managing 2 to 500 locations." },
    { q: "Will my kitchen team actually use the app?", a: "Yes. The mobile app is rated 4.8/5 by line cooks, dishwashers, and chefs who use it daily. It works in English and Spanish, runs on cheap Android phones, and the entire BOH workflow takes under 30 seconds to learn." },
    { q: "How does break tracking work for tipped employees?", a: "State-specific break rules (California 30-min meal break, New York spread-of-hours, etc.) are built in. The system flags missed breaks, prevents shift schedules that would create compliance issues, and stores full audit trails for labor-board inquiries." },
    { q: "What does it cost for a restaurant?", a: "Pricing scales with team size — every plan includes every feature (FOH/BOH, tip pooling, shift swaps, payroll sync, GPS clock-in). Start with the 14-day free trial — no credit card required — and we&apos;ll help you pick the right plan when you&apos;re ready." },
    { q: "How long does setup take?", a: "Most restaurants are running their first schedule on day one. The setup wizard applies the restaurant industry preset (FOH/BOH structure, tip rules, common positions), imports your roster from a CSV or your POS, and walks you through publishing the first week. Staff get the mobile app the same day." },
  ];
  return (
    <section className="py-24 bg-indigo-50/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Restaurant Scheduling, Answered
          </h2>
          <p className="text-gray-500 text-lg">Common questions from chefs, GMs, and restaurant owners.</p>
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
      <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-indigo-600/30 to-violet-600/30 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-900/50">
            <UtensilsCrossed className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Cover the Dinner Rush.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Track Tips. Stop Chasing Call-Outs.</span>
          </h2>
          <p className="text-indigo-100/70 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Start free. Run this Friday&apos;s schedule on StaffSchedule.io. See for yourself.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl shadow-indigo-900/50">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              Talk to a Restaurant Specialist
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {["No credit card", "14-day free trial", "Restaurant preset", "Live on day one"].map((t) => (
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
export default function RestaurantsPage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <DinnerRushScenario />
      <FohBohSplit />
      <FeaturesGrid />
      <RestaurantTypes />
      <TestimonialSection />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
