"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion, useInView, AnimatePresence,
  type Variants, type Transition,
} from "framer-motion";
import {
  ArrowRight, CheckCircle2, Star, ChevronDown,
  ShoppingBag, Store, Tag, ShoppingCart, Package,
  TrendingUp, Users, Clock, Calendar, Gift,
  Snowflake, Sun, Zap, BarChart3, CreditCard,
  Repeat, MessageSquare, Bell, ScanBarcode, Sparkles,
  Heart, Shirt, Layers,
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

/* Foot traffic data by hour (10am - 9pm) */
const TRAFFIC_HOURS = [
  { h: "10a", traffic: 0.32, staff: 4 },
  { h: "11a", traffic: 0.48, staff: 5 },
  { h: "12p", traffic: 0.78, staff: 8 },
  { h: "1p", traffic: 0.85, staff: 9 },
  { h: "2p", traffic: 0.62, staff: 7 },
  { h: "3p", traffic: 0.55, staff: 6 },
  { h: "4p", traffic: 0.72, staff: 8 },
  { h: "5p", traffic: 0.95, staff: 11 },
  { h: "6p", traffic: 1.0, staff: 12 },
  { h: "7p", traffic: 0.82, staff: 9 },
  { h: "8p", traffic: 0.45, staff: 5 },
  { h: "9p", traffic: 0.25, staff: 3 },
];

/* ══════════════════════════════════
   HERO — Foot Traffic Coverage
══════════════════════════════════ */
function HeroSection() {
  const [activeHour, setActiveHour] = useState(8); // 6p peak
  useEffect(() => {
    const id = setInterval(() => setActiveHour(h => (h + 1) % TRAFFIC_HOURS.length), 1600);
    return () => clearInterval(id);
  }, []);

  const active = TRAFFIC_HOURS[activeHour];

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#1a0820] via-[#2a0c2e] to-[#1a0820] overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.45, 0.25] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-pink-600/25 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1, 1.22, 1], opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left copy */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="text-center lg:text-left">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-pink-300/30 text-pink-200 text-xs font-bold tracking-widest uppercase mb-6">
            <ShoppingBag className="w-3.5 h-3.5" />
            For Stores · Boutiques · Multi-Store Chains
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl xl:text-[3.5rem] font-black text-white leading-[1.07] tracking-tight mb-6">
            Retail Scheduling That Matches Staff to{" "}
            <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-fuchsia-400 bg-clip-text text-transparent">
              Foot Traffic
            </span>
            .
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-pink-100/70 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            Cover peak hours without overstaffing slow ones. Fill last-minute callouts in 90 seconds.
            Onboard seasonal hires in 5 minutes. Built for boutiques, chains, and everything between.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-pink-900/50">
              Start Free for Your Store <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#coverage-demo"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              See Coverage Demo
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 justify-center lg:justify-start text-xs text-pink-200/60">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-pink-400" /> 14-day free trial</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-pink-400" /> Holiday templates</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-pink-400" /> POS sync ready</span>
          </motion.div>
        </motion.div>

        {/* Right — Foot Traffic Heat Map Dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative w-full"
        >
          <div className="relative bg-gradient-to-br from-[#2a0c2e] to-[#1a0820] rounded-2xl border border-pink-900/40 shadow-2xl shadow-pink-900/30 overflow-hidden">
            {/* Store header */}
            <div className="px-5 py-4 border-b border-pink-900/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                  <Store className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-tight">Flagship · Saturday</p>
                  <p className="text-pink-300/60 text-[10px]">Foot traffic + coverage live</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                LIVE
              </span>
            </div>

            {/* Big number — current hour */}
            <div className="px-5 pt-5 pb-3">
              <div className="flex items-end justify-between mb-3">
                <div>
                  <p className="text-pink-200/50 text-[10px] uppercase tracking-widest mb-1">Hour spotlight · {active.h}</p>
                  <p className="text-white text-3xl font-black">{Math.round(active.traffic * 312)} <span className="text-pink-300/50 text-lg">shoppers/hr</span></p>
                </div>
                <div className="text-right">
                  <p className="text-pink-200/50 text-[10px] uppercase tracking-widest mb-1">Coverage</p>
                  <p className="text-white text-2xl font-black">{active.staff}<span className="text-pink-300/50 text-base"> on floor</span></p>
                </div>
              </div>
            </div>

            {/* Hourly heat-map chart */}
            <div className="px-5 pb-4">
              <p className="text-pink-200/50 text-[10px] uppercase tracking-widest mb-2">Today&apos;s Foot Traffic</p>
              <div className="flex items-end gap-1 h-24 mb-2">
                {TRAFFIC_HOURS.map((h, i) => (
                  <button key={h.h} onClick={() => setActiveHour(i)} className="flex-1 relative group">
                    <motion.div
                      animate={{
                        height: `${h.traffic * 100}%`,
                        opacity: i === activeHour ? 1 : 0.4,
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className={`w-full rounded-t transition-all ${i === activeHour ? "bg-gradient-to-t from-rose-500 via-pink-400 to-pink-300 shadow-lg shadow-pink-500/40" : "bg-pink-900/40"}`}
                    />
                  </button>
                ))}
              </div>
              <div className="flex gap-1">
                {TRAFFIC_HOURS.map((h, i) => (
                  <span key={h.h} className={`flex-1 text-center text-[9px] font-bold transition-colors ${i === activeHour ? "text-pink-300" : "text-pink-200/30"}`}>
                    {h.h}
                  </span>
                ))}
              </div>
            </div>

            {/* Staff coverage row matching traffic */}
            <div className="px-5 pb-4">
              <p className="text-pink-200/50 text-[10px] uppercase tracking-widest mb-2">Staff Coverage Match</p>
              <div className="flex items-end gap-1 h-12">
                {TRAFFIC_HOURS.map((h, i) => (
                  <div key={h.h} className="flex-1 relative">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(h.staff / 12) * 100}%`, opacity: i === activeHour ? 1 : 0.5 }}
                      transition={{ delay: 0.5 + i * 0.04, duration: 0.5 }}
                      className={`w-full rounded-t ${i === activeHour ? "bg-gradient-to-t from-fuchsia-500 to-purple-400" : "bg-pink-800/40"}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom labor strip */}
            <div className="px-5 py-3 bg-gradient-to-r from-pink-950/40 to-rose-950/40 border-t border-pink-900/30 flex items-center justify-between">
              <div>
                <p className="text-pink-200/50 text-[9px] uppercase tracking-widest">Saturday Labor</p>
                <p className="text-white text-sm font-bold">$1,247 spent · $5,890 sales</p>
              </div>
              <p className="text-emerald-400 text-xs font-bold">21.2% labor ratio</p>
            </div>
          </div>

          {/* Floating: shift swap */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.4, ...spring }}
            className="hidden md:flex absolute -left-8 top-16 bg-white rounded-2xl shadow-2xl border border-pink-100 px-3.5 py-2.5 items-center gap-2.5 z-10">
            <div className="w-9 h-9 rounded-xl bg-pink-100 flex items-center justify-center">
              <Bell className="w-4 h-4 text-pink-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Coverage Match</p>
              <p className="text-xs font-bold text-gray-800">+2 cashiers · 6pm peak</p>
            </div>
          </motion.div>

          {/* Floating: seasonal hire */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.9, ...spring }}
            className="hidden md:flex absolute -right-4 bottom-20 bg-white rounded-2xl shadow-2xl border border-rose-100 px-3.5 py-2.5 items-center gap-2.5 z-10">
            <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center">
              <Gift className="w-4 h-4 text-rose-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Holiday Hire</p>
              <p className="text-xs font-bold text-gray-800">Ava onboarded · day 1</p>
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
    { v: 18, s: "%", l: "lower retail labor cost" },
    { v: 90, s: " sec", l: "average shift swap time" },
    { v: 5, s: " min", l: "to onboard seasonal hires" },
    { v: 200, s: "K+", l: "stores trust StaffSchedule" },
  ];
  return (
    <div ref={ref} className="border-y border-pink-100 bg-gradient-to-r from-pink-50/30 to-rose-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 divide-y-2 lg:divide-y-0 lg:divide-x divide-pink-100">
        {items.map((it, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08 }} className="flex flex-col items-center gap-1 px-6 py-4 text-center">
            <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
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
   BLACK FRIDAY COVERAGE — Scenario
══════════════════════════════════ */
function BlackFridayCoverage() {
  const [phase, setPhase] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  const phases = [
    { t: "T-7 Days", title: "Holiday template loaded", body: "Drag the Black Friday template onto the week. Coverage builds for door-opening at 5 AM through 11 PM close.", icon: Calendar, color: "#ec4899" },
    { t: "T-3 Days", title: "Seasonal hires invited", body: "Bulk-invite 12 holiday workers via SMS. They onboard via mobile app, sign the W-4 digitally, and get added to the schedule in minutes.", icon: Users, color: "#f43f5e" },
    { t: "T-1 Day", title: "Pre-event briefing sent", body: "One broadcast covers floor maps, register assignments, security positions, and break rotation. Read receipts confirm every associate saw it.", icon: MessageSquare, color: "#d946ef" },
    { t: "5:00 AM", title: "Doors open · all stations covered", body: "Every register has a cashier. Every department has a floor lead. Live labor cost displays against actual sales — no surprises.", icon: Zap, color: "#a855f7" },
    { t: "End of Day", title: "Payroll-ready timesheets", body: "Every hour clocked. Every swap logged. Holiday premium auto-calculated. Timesheets flow straight to payroll on Monday morning.", icon: CheckCircle2, color: "#10b981" },
  ];

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setPhase(p => (p + 1) % phases.length), 2400);
    return () => clearInterval(id);
  }, [inView, phases.length]);

  return (
    <section id="coverage-demo" className="py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold tracking-widest uppercase mb-5">
            <Gift className="w-3.5 h-3.5" />
            Built for Peak Days
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            From Holiday Template
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent"> to Black Friday Door-Open in 7 Days.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            A real one-week run-up to retail&apos;s biggest day. No spreadsheets. No panic phone trees.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-3">
          {phases.map((p, i) => (
            <motion.button key={i} onClick={() => setPhase(i)}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-300 ${phase === i ? "border-pink-300 bg-pink-50 shadow-lg shadow-pink-100 scale-[1.02]" : "border-gray-100 bg-white hover:border-gray-200"}`}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${p.color}20` }}>
                <p.icon className="w-5 h-5" style={{ color: p.color }} />
              </div>
              <p className="text-[10px] font-black tracking-widest uppercase mb-1.5" style={{ color: p.color }}>{p.t}</p>
              <p className="text-sm font-bold text-gray-900 mb-1.5 leading-tight">{p.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{p.body}</p>
              {phase === i && (
                <motion.div layoutId="activePhase"
                  className="absolute -bottom-1 left-4 right-4 h-1 rounded-full"
                  style={{ background: `linear-gradient(to right, ${p.color}, ${p.color}80)` }} />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   MULTI-STORE CONTROL PANEL
══════════════════════════════════ */
function MultiStorePanel() {
  const stores = [
    { name: "Downtown Flagship", revenue: 12480, staff: 24, labor: 19, alert: false, color: "#ec4899" },
    { name: "Mall North", revenue: 8920, staff: 18, labor: 22, alert: false, color: "#d946ef" },
    { name: "Outlet West", revenue: 6240, staff: 14, labor: 26, alert: true, color: "#a855f7" },
    { name: "Pop-Up SoHo", revenue: 4180, staff: 8, labor: 18, alert: false, color: "#f43f5e" },
  ];
  return (
    <section className="py-24 bg-gradient-to-br from-[#1a0820] via-[#2a0c2e] to-[#1a0820] relative overflow-hidden">
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/3 right-1/3 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-pink-300/30 text-pink-300 text-xs font-bold tracking-widest uppercase mb-6">
              <Layers className="w-3.5 h-3.5" />
              Multi-Store Command Center
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-5">
              Run Every Store From
              <br />
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">One Dashboard.</span>
            </h2>
            <p className="text-pink-100/70 text-lg leading-relaxed mb-6">
              Boutiques, big-box, outlets, pop-ups — see live sales, labor cost, and staffing across every location.
              Move associates between sister stores with a tap. District managers oversee 5 to 500 stores from one screen.
            </p>
            <div className="space-y-3">
              {[
                "Per-store labor cost as % of sales, live",
                "Cross-store associate transfers with one tap",
                "District/region-level performance rollups",
                "Alerts when any store drifts above labor budget",
              ].map((line, i) => (
                <motion.div key={line}
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-md bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-400" />
                  </div>
                  <p className="text-pink-100/80 text-sm">{line}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="bg-gradient-to-br from-[#2a0c2e] to-[#1a0820] rounded-2xl border border-pink-900/40 p-6 shadow-2xl shadow-pink-900/30">
            <div className="flex items-center justify-between mb-5">
              <p className="text-white text-sm font-bold">Today · 4 stores live</p>
              <span className="text-pink-300/60 text-[10px] uppercase tracking-wider">Group view</span>
            </div>
            <div className="space-y-2.5">
              {stores.map((s, i) => (
                <motion.div key={s.name}
                  initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-200">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${s.color}30` }}>
                    <Store className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-bold truncate">{s.name}</p>
                    <p className="text-pink-300/50 text-[10px]">${s.revenue.toLocaleString()} today · {s.staff} on floor</p>
                  </div>
                  {s.alert ? (
                    <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                      className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold">
                      labor {s.labor}%
                    </motion.span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                      {s.labor}%
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 mt-5">
              {[
                { l: "Total Sales", v: "$31.8K" },
                { l: "Staff Live", v: "64" },
                { l: "Avg Labor", v: "21%" },
              ].map((m, i) => (
                <motion.div key={m.l}
                  initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  className="bg-white/5 rounded-lg p-2.5 text-center">
                  <p className="text-pink-300/60 text-[9px] uppercase tracking-wider">{m.l}</p>
                  <p className="text-white text-lg font-black">{m.v}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   RETAIL FEATURES GRID
══════════════════════════════════ */
function FeaturesGrid() {
  const feats = [
    { icon: TrendingUp, t: "Foot-Traffic Coverage", d: "Pull traffic forecasts from your POS. Schedule to actual demand. Stop overstaffing slow mornings.", grad: "from-pink-500 to-rose-600" },
    { icon: Gift, t: "Holiday & Seasonal Templates", d: "Black Friday, Boxing Day, Mother&apos;s Day. Pre-built coverage drops in seconds.", grad: "from-rose-500 to-pink-600" },
    { icon: Users, t: "Seasonal Hire Onboarding", d: "Add a holiday worker in 5 minutes. Mobile app, digital W-4, schedule access — same day.", grad: "from-fuchsia-500 to-pink-600" },
    { icon: ScanBarcode, t: "POS Sales Sync", d: "Real-time labor as a % of revenue. See if you&apos;re overstaffed before close, not Monday.", grad: "from-purple-500 to-fuchsia-600" },
    { icon: Repeat, t: "Mobile Shift Swaps", d: "Cashier posts a swap, qualified peers see it instantly, manager approves in one tap.", grad: "from-pink-600 to-rose-700" },
    { icon: Tag, t: "Department & Role Templates", d: "Cashier, sales floor, fitting room, stock, visual merchandising — each role pre-configured.", grad: "from-rose-600 to-pink-700" },
    { icon: MessageSquare, t: "Floor Broadcasts", d: "Send markdowns, layout changes, or VIP arrival alerts to every associate in one push.", grad: "from-fuchsia-600 to-rose-600" },
    { icon: CreditCard, t: "Retail Payroll Sync", d: "ADP, Gusto, QuickBooks integrations. Holiday premium and overtime calculated automatically.", grad: "from-rose-500 to-fuchsia-500" },
  ];
  return (
    <section className="py-24 bg-pink-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-pink-700 text-xs font-bold tracking-widest uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Built for Retail
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Every Feature, Tuned for{" "}
            <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">How Stores Actually Run</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Not a generic scheduling tool with a store icon. Built ground-up for retail peaks, seasonal swings, and multi-store ops.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {feats.map((f, i) => (
            <motion.div key={f.t}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl border border-pink-100 p-5 shadow-sm hover:shadow-xl hover:border-pink-200 transition-all duration-300">
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
   RETAIL TYPES
══════════════════════════════════ */
function RetailTypes() {
  const types = [
    { icon: ShoppingBag, t: "Boutique Retail", d: "Independent stores, fashion, gifts, specialty" },
    { icon: Store, t: "Big-Box & Department Stores", d: "Multi-department, high-staff-count operations" },
    { icon: Layers, t: "Multi-Store Chains", d: "Regional, national chains with central control" },
    { icon: Snowflake, t: "Seasonal & Pop-Up Retail", d: "Holiday markets, summer pop-ups, brand activations" },
    { icon: Heart, t: "Beauty, Cosmetics & Fragrance", d: "Department counters, brand boutiques, sephora-style" },
    { icon: Shirt, t: "Apparel & Fashion", d: "Independent boutiques, multi-brand, outlet" },
    { icon: Package, t: "Hardware & Home Improvement", d: "Big-box hardware, paint, garden centers" },
    { icon: ShoppingCart, t: "Grocery & Convenience", d: "Independent grocers, neighborhood convenience" },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Trusted Across Every Type of Store
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From a 3-person boutique to a 500-store chain — the same platform scales.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {types.map((t, i) => (
            <motion.div key={t.t}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group p-5 rounded-2xl bg-gradient-to-br from-pink-50/40 to-rose-50/30 border border-pink-100 hover:border-pink-300 hover:shadow-md transition-all duration-200">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform duration-200">
                <t.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-bold text-gray-900 mb-1">{t.t}</p>
              <p className="text-xs text-gray-500">{t.d}</p>
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
    <section className="py-24 bg-gradient-to-br from-pink-600 via-rose-600 to-fuchsia-700 relative overflow-hidden">
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-pink-300/20 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-yellow-300 text-yellow-300" />)}
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white leading-relaxed tracking-tight mb-8">
            &ldquo;We run <span className="bg-white/20 px-2 py-0.5 rounded-lg">9 stores across 3 states</span>.
            StaffSchedule cut weekly scheduling from 10 hours to under one. Last holiday season, we onboarded
            14 seasonal hires in a single afternoon. Our labor ratio dropped 4 points.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-300 to-rose-400 flex items-center justify-center text-white text-base font-black shadow-lg">
              JD
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-lg">Jim D.</p>
              <p className="text-pink-100/80 text-sm">General Manager · 9-store apparel chain</p>
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
    { q: "What is retail employee scheduling software?", a: "Retail employee scheduling software digitizes the work of building, sharing, and adjusting staff schedules in stores. StaffSchedule.io is built for retail-specific challenges: matching coverage to hourly foot traffic, onboarding seasonal hires fast, handling Black Friday and holiday templates, and running multi-store operations from one dashboard. It replaces spreadsheets, paper rotas, and the late-night phone calls when a cashier no-shows." },
    { q: "How does it handle Black Friday and holiday peaks?", a: "Pre-built holiday templates cover Black Friday, Boxing Day, Mother's Day, Father's Day, Christmas Eve, and every other peak. Drop the template onto the week and every register, sales-floor, and stock position fills. Bulk-invite seasonal hires via SMS; they onboard via the mobile app in 5 minutes and join the schedule the same day." },
    { q: "Can I match staff coverage to foot traffic?", a: "Yes. Pull traffic counts from your POS or door counter and the platform suggests coverage by hour. Heavy 5 PM rush? More cashiers. Slow Tuesday morning? Lighter coverage. Live labor cost displays as a % of forecasted sales — you spot overstaffing in the moment, not at the Monday review." },
    { q: "Does it work for multi-store retail chains?", a: "Absolutely. The multi-store dashboard shows every location at once with live sales, labor cost %, and coverage status. Move associates between sister stores with one tap. District managers oversee 5 to 500 stores from one screen. Group-wide reports run in seconds." },
    { q: "Can my retail associates swap shifts in the app?", a: "Yes. An associate posts a swap; qualified coworkers in the same store get a push notification; the first to accept gets the shift after a one-tap manager approval. Average swap: 90 seconds. Auto-approve same-role swaps to remove the manager step entirely." },
    { q: "Does it integrate with my POS system?", a: "Yes. Major retail POS systems sync hourly sales, transaction counts, and traffic to drive scheduling recommendations. Labor cost shows as live % of sales. ADP, Gusto, QuickBooks, and Rippling payroll integrations sync approved timesheets — including holiday premiums and overtime — automatically." },
    { q: "What's the cost for a retail store?", a: "Pricing scales with team size — every plan includes every feature (multi-store, holiday templates, POS sync, mobile swaps, payroll integrations). Start with the 14-day free trial — no credit card — and pick the right plan when you're ready." },
    { q: "How fast can my retail business go live?", a: "Most stores publish their first schedule on day one. The setup wizard applies the retail industry preset (cashier, floor, stock positions, peak templates, break rules), imports your roster from a CSV or POS, and walks you through publishing the first week. Associates get the mobile app the same day; average team adoption is 2 days." },
  ];
  return (
    <section className="py-24 bg-pink-50/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Retail Scheduling, Answered
          </h2>
          <p className="text-gray-500 text-lg">Common questions from store managers, district managers, and retail owners.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="border border-pink-100 rounded-2xl overflow-hidden bg-white shadow-sm">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-pink-50/40 transition-colors duration-150">
                <span className="font-semibold text-gray-900 pr-4 text-sm sm:text-base">{f.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown className="w-5 h-5 text-pink-400 flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>
                    <div className="px-6 pb-5 pt-3 text-gray-600 leading-relaxed text-sm border-t border-pink-50">{f.a}</div>
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
    <section className="py-24 bg-gradient-to-br from-[#1a0820] via-[#2a0c2e] to-[#1a0820] relative overflow-hidden">
      <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-pink-600/30 to-rose-600/30 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-pink-900/50">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Match Staff to Sales.
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-fuchsia-400 bg-clip-text text-transparent">Cover Every Peak. Pay Right.</span>
          </h2>
          <p className="text-pink-100/70 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Start free. Run this week&apos;s store schedule on StaffSchedule.io. See the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl shadow-pink-900/50">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              Talk to a Retail Specialist
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {["No credit card", "14-day free trial", "Holiday templates", "Multi-store ready"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-pink-400 flex-shrink-0" />
                <span className="text-sm text-pink-200/70">{t}</span>
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
export default function RetailPage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <BlackFridayCoverage />
      <MultiStorePanel />
      <FeaturesGrid />
      <RetailTypes />
      <TestimonialSection />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
