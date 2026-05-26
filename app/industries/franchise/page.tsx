"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion, useInView, AnimatePresence,
  type Variants, type Transition,
} from "framer-motion";
import {
  ArrowRight, CheckCircle2, Star, ChevronDown,
  Building2, MapPin, Layers, Users, Shield,
  TrendingUp, BarChart3, Lock, Globe, Zap,
  Calendar, Clock, MessageSquare, FileCheck,
  Briefcase, Network, Crown, Award, GitBranch,
  ShieldCheck, Bell, Settings,
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

/* sample franchise data */
const LOCATIONS = [
  { id: "001", name: "Downtown Flagship", region: "West", staff: 24, labor: 19, sales: 12.4, ok: true, c: "#6366f1" },
  { id: "002", name: "Riverside Plaza", region: "West", staff: 18, labor: 22, sales: 9.1, ok: true, c: "#8b5cf6" },
  { id: "003", name: "North Mall", region: "Central", staff: 21, labor: 26, sales: 8.7, ok: false, c: "#a855f7" },
  { id: "004", name: "Eastside Express", region: "East", staff: 12, labor: 18, sales: 6.4, ok: true, c: "#3b82f6" },
  { id: "005", name: "Harbor District", region: "East", staff: 16, labor: 20, sales: 7.9, ok: true, c: "#4f46e5" },
  { id: "006", name: "Airport Terminal", region: "Central", staff: 14, labor: 24, sales: 6.8, ok: true, c: "#7c3aed" },
];

/* ══════════════════════════════════
   HERO — Franchise Portfolio Map
══════════════════════════════════ */
function HeroSection() {
  const [activeLoc, setActiveLoc] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActiveLoc(l => (l + 1) % LOCATIONS.length), 2000);
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
      {/* Grid background pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(165,180,252,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(165,180,252,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left copy */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="text-center lg:text-left">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-indigo-300/30 text-indigo-200 text-xs font-bold tracking-widest uppercase mb-6">
            <Network className="w-3.5 h-3.5" />
            For Franchise · Multi-Unit · Enterprise
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl xl:text-[3.5rem] font-black text-white leading-[1.07] tracking-tight mb-6">
            Franchise Scheduling{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-blue-300 bg-clip-text text-transparent">
              Built for Brand Standards
            </span>
            {" "}and Local Reality.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-indigo-100/70 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            Multi-location workforce management for franchise brands. HQ gets portfolio visibility.
            Franchisees keep operational autonomy. Both work from one platform — at the scale of 5 units or 500.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-900/50">
              Start Free for Your Franchise <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#hq-vs-franchisee"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              See the Command Center
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 justify-center lg:justify-start text-xs text-indigo-200/60">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Enterprise-ready</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> SSO + audit trails</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Multi-tenant payroll</span>
          </motion.div>
        </motion.div>

        {/* Right — Portfolio Dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative w-full"
        >
          <div className="relative bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl border border-indigo-900/40 shadow-2xl shadow-indigo-900/30 overflow-hidden">
            {/* Brand HQ header */}
            <div className="px-5 py-4 border-b border-indigo-900/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                  <Crown className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-tight">Brand HQ · Portfolio View</p>
                  <p className="text-indigo-300/60 text-[10px]">42 locations · 3 regions · live</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                LIVE
              </span>
            </div>

            {/* Top KPI strip */}
            <div className="px-5 pt-5 pb-3 grid grid-cols-3 gap-2">
              {[
                { l: "Total Sales (today)", v: "$51.3K", g: "from-indigo-500 to-violet-500" },
                { l: "Staff On-Duty", v: "215", g: "from-violet-500 to-purple-500" },
                { l: "Brand Labor %", v: "21.4%", g: "from-blue-500 to-indigo-500" },
              ].map((m, i) => (
                <motion.div key={m.l}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                  <p className="text-indigo-300/50 text-[9px] uppercase tracking-wider mb-0.5">{m.l}</p>
                  <p className={`text-xl font-black bg-gradient-to-r ${m.g} bg-clip-text text-transparent`}>{m.v}</p>
                </motion.div>
              ))}
            </div>

            {/* Locations list */}
            <div className="px-5 pt-2 pb-3 space-y-1.5 max-h-[280px] overflow-hidden">
              {LOCATIONS.map((loc, i) => (
                <motion.div key={loc.id}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  animate-active={activeLoc === i}
                  className={`flex items-center gap-3 p-2.5 rounded-lg transition-all duration-300 ${activeLoc === i ? "bg-white/10 border border-indigo-500/40" : "bg-white/3 border border-transparent"}`}
                  style={activeLoc === i ? { transform: "scale(1.02)" } : {}}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[9px] font-mono font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: loc.c }}>
                    #{loc.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-bold truncate">{loc.name}</p>
                    <p className="text-indigo-300/50 text-[9px]">{loc.region} · {loc.staff} on duty · ${loc.sales}K</p>
                  </div>
                  {loc.ok ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold tabular-nums">
                      {loc.labor}%
                    </span>
                  ) : (
                    <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                      className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold tabular-nums">
                      ⚠ {loc.labor}%
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Regional rollup strip */}
            <div className="px-5 py-3 bg-gradient-to-r from-indigo-950/40 to-violet-950/40 border-t border-indigo-900/30">
              <p className="text-indigo-200/50 text-[9px] uppercase tracking-widest mb-1.5">Regions</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { r: "West", s: "$21.5K", c: "#6366f1" },
                  { r: "Central", s: "$15.5K", c: "#a855f7" },
                  { r: "East", s: "$14.3K", c: "#3b82f6" },
                ].map((r) => (
                  <div key={r.r} className="bg-white/5 rounded-md p-1.5 text-center">
                    <p className="text-white text-[10px] font-bold">{r.r}</p>
                    <p className="text-[9px] font-bold" style={{ color: r.c }}>{r.s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating: HQ broadcast */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.4, ...spring }}
            className="hidden md:flex absolute -left-8 top-16 bg-white rounded-2xl shadow-2xl border border-indigo-100 px-3.5 py-2.5 items-center gap-2.5 z-10">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Bell className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">HQ Broadcast</p>
              <p className="text-xs font-bold text-gray-800">42 locations · Q4 launch brief</p>
            </div>
          </motion.div>

          {/* Floating: new unit */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.9, ...spring }}
            className="hidden md:flex absolute -right-4 bottom-24 bg-white rounded-2xl shadow-2xl border border-violet-100 px-3.5 py-2.5 items-center gap-2.5 z-10">
            <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-violet-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">New Unit</p>
              <p className="text-xs font-bold text-gray-800">Unit #043 · Onboarded</p>
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
    { v: 2000, s: "+", l: "max locations supported" },
    { v: 80, s: "%", l: "unit adoption within 90 days" },
    { v: 18, s: "%", l: "avg portfolio labor savings" },
    { v: 99.9, s: "%", l: "enterprise uptime SLA" },
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
   HQ vs FRANCHISEE — Permission System
══════════════════════════════════ */
function HqVsFranchisee() {
  const HQ = [
    { icon: BarChart3, t: "Portfolio dashboard", d: "Every unit, every region, in one view" },
    { icon: Lock, t: "Brand standard templates", d: "Lock minimum coverage, break rules, labor budget ranges" },
    { icon: ShieldCheck, t: "Compliance & audit logs", d: "Per-unit and aggregated audit trails for any time period" },
    { icon: TrendingUp, t: "Performance benchmarking", d: "Top/bottom unit comparison; territory rollups" },
    { icon: MessageSquare, t: "All-network broadcasts", d: "Push announcements to every unit or specific regions" },
    { icon: Network, t: "Multi-tier permissions", d: "Brand → region → territory → franchisee → manager → staff" },
  ];
  const FRANCHISEE = [
    { icon: Calendar, t: "Local schedule control", d: "Build the unit's weekly schedule within brand bounds" },
    { icon: Users, t: "Local staff roster", d: "Hire, onboard, manage your own team" },
    { icon: Briefcase, t: "Local labor decisions", d: "Hours, swaps, time-off — all decided at the unit level" },
    { icon: FileCheck, t: "Own payroll provider", d: "Use your preferred payroll (ADP, Gusto, QuickBooks, local)" },
    { icon: Settings, t: "Local schedule adjustments", d: "Adapt brand templates for local demand patterns" },
    { icon: Award, t: "Recognition & performance", d: "Track your unit's KPIs against brand benchmarks" },
  ];

  return (
    <section id="hq-vs-franchisee" className="py-24 bg-gradient-to-br from-[#0f172a] to-[#020617]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-indigo-300/30 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-5">
            <GitBranch className="w-3.5 h-3.5" />
            Two-Tier Permission System
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            Brand Standards from Corporate.
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent"> Operational Reality from the Franchisee.</span>
          </h2>
          <p className="text-indigo-100/60 text-lg max-w-2xl mx-auto">
            One platform, two perspectives. HQ sees the portfolio. Franchisees run their unit. Permissions enforce both — no toggling, no double work.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* HQ Card */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }} className="relative bg-gradient-to-br from-indigo-950/60 to-violet-950/60 backdrop-blur border border-indigo-500/20 rounded-3xl p-7 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-500/30">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-indigo-300/60 text-[10px] font-bold tracking-widest uppercase">Corporate HQ</p>
                  <h3 className="text-xl font-black text-white">Brand-Level Control</h3>
                </div>
              </div>
              <div className="space-y-2.5">
                {HQ.map((f, i) => (
                  <motion.div key={f.t}
                    initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-200">
                    <div className="w-9 h-9 rounded-lg bg-indigo-500/15 flex items-center justify-center flex-shrink-0">
                      <f.icon className="w-4 h-4 text-indigo-300" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold mb-0.5">{f.t}</p>
                      <p className="text-indigo-200/60 text-xs leading-relaxed">{f.d}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Franchisee Card */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }} className="relative bg-gradient-to-br from-violet-950/60 to-blue-950/60 backdrop-blur border border-violet-500/20 rounded-3xl p-7 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet-500/15 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center shadow-xl shadow-violet-500/30">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-violet-300/60 text-[10px] font-bold tracking-widest uppercase">Franchisee</p>
                  <h3 className="text-xl font-black text-white">Unit-Level Autonomy</h3>
                </div>
              </div>
              <div className="space-y-2.5">
                {FRANCHISEE.map((f, i) => (
                  <motion.div key={f.t}
                    initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-200">
                    <div className="w-9 h-9 rounded-lg bg-violet-500/15 flex items-center justify-center flex-shrink-0">
                      <f.icon className="w-4 h-4 text-violet-300" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold mb-0.5">{f.t}</p>
                      <p className="text-violet-200/60 text-xs leading-relaxed">{f.d}</p>
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
   FEATURES GRID
══════════════════════════════════ */
function FeaturesGrid() {
  const feats = [
    { icon: Network, t: "Multi-Location Command Center", d: "Live view of every unit, every region, every alert — in one dashboard.", grad: "from-indigo-500 to-violet-600" },
    { icon: Lock, t: "Brand Template Lockdown", d: "HQ locks the minimum coverage, break rules, and labor budget ranges — franchisees adapt within bounds.", grad: "from-violet-500 to-purple-600" },
    { icon: Globe, t: "Cross-Unit Staff Sharing", d: "Move a manager, trainer, or float associate between units. Hours and overtime aggregate correctly.", grad: "from-blue-500 to-indigo-600" },
    { icon: ShieldCheck, t: "Per-Unit Audit Trails", d: "Every schedule, swap, and approval logged. Franchise-agreement audits are one report away.", grad: "from-indigo-600 to-blue-700" },
    { icon: Users, t: "Multi-Tier Permissions", d: "Brand → region → territory → franchisee → manager → staff. Each role sees exactly what they need.", grad: "from-purple-500 to-violet-600" },
    { icon: BarChart3, t: "Portfolio Reporting", d: "Roll up labor cost, sales, and KPIs across regions, territories, brands. Export to BI tools.", grad: "from-violet-600 to-indigo-700" },
    { icon: MessageSquare, t: "All-Network Broadcasts", d: "HQ pushes Q4 plans to every unit in one tap. Franchisees see brand updates without email chaos.", grad: "from-blue-600 to-violet-700" },
    { icon: Shield, t: "Enterprise SSO & Security", d: "SAML, OIDC, AES-256 encryption, SOC 2 infrastructure. Built for enterprise procurement.", grad: "from-indigo-700 to-violet-800" },
  ];
  return (
    <section className="py-24 bg-indigo-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-5">
            <Layers className="w-3.5 h-3.5" />
            Enterprise-Grade Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Built to Scale from{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">5 Units to 5,000</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Every feature designed for the unique structure of franchise brands: corporate visibility, franchisee autonomy, brand consistency, and compliance at scale.
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
   FRANCHISE VERTICALS
══════════════════════════════════ */
function FranchiseVerticals() {
  const verticals = [
    { icon: Briefcase, t: "Food Service Franchises", d: "QSR chains, casual dining, café franchises, juice bars" },
    { icon: Crown, t: "Fitness Franchises", d: "Gyms, boutique studios, yoga, pilates, climbing" },
    { icon: Award, t: "Education Franchises", d: "Tutoring, early learning, music schools, language" },
    { icon: Star, t: "Beauty Franchises", d: "Salon chains, barber franchises, nail bars, lash studios" },
    { icon: Building2, t: "Service Franchises", d: "Cleaning, pest control, lawn care, home services" },
    { icon: Globe, t: "Retail Franchises", d: "Specialty retail, convenience, automotive, pet" },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Built for Every Franchise Vertical
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From 5-unit emerging brands to nationwide franchise networks — the platform scales with your growth.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {verticals.map((v, i) => (
            <motion.div key={v.t}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-indigo-50/30 to-violet-50/30 border border-indigo-100 hover:border-indigo-300 transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-200">
                <v.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-base font-bold text-gray-900 mb-1">{v.t}</p>
                <p className="text-xs text-gray-500">{v.d}</p>
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
    <section className="py-24 bg-gradient-to-br from-indigo-700 via-violet-700 to-blue-800 relative overflow-hidden">
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-violet-300/20 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-yellow-300 text-yellow-300" />)}
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white leading-relaxed tracking-tight mb-8">
            &ldquo;Rolling out to <span className="bg-white/20 px-2 py-0.5 rounded-lg">62 franchise units</span> in 12 weeks was the smoothest enterprise launch we&apos;ve had.
            HQ gets the portfolio view we&apos;ve been begging for. Franchisees love that they keep control of their team and payroll.
            Best of both worlds, finally.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-300 to-violet-400 flex items-center justify-center text-white text-base font-black shadow-lg">
              RW
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-lg">Robert W.</p>
              <p className="text-indigo-100/80 text-sm">VP Franchise Operations · 60+ unit fitness franchise</p>
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
    { q: "What is franchise scheduling software?", a: "Franchise scheduling software is multi-location workforce management built for the unique two-tier structure of franchise brands. Corporate HQ gets portfolio-wide visibility and the ability to enforce brand standards. Franchisees keep operational autonomy over their unit — local schedules, local hiring, local payroll. Both work in one platform with role-appropriate permissions enforcing both perspectives." },
    { q: "How does multi-location scheduling work for franchises?", a: "Each franchise location operates independently with its own schedule, staff roster, and labor budget. Franchisees build their unit's schedule using brand-standard templates (with HQ-defined guardrails on minimum coverage, break rules, and labor budget). HQ sees every location in one dashboard with labor cost percentages, coverage status, sales, and compliance alerts." },
    { q: "Can corporate enforce brand-standard rules without micromanaging?", a: "Yes. HQ defines the bounds: minimum coverage by role, required break enforcement, certification requirements, labor budget ranges. Franchisees schedule freely within those bounds. The system stops a franchisee from going under coverage minimums or skipping required breaks — without HQ needing to review every shift." },
    { q: "Can staff work across multiple franchise locations?", a: "Yes. Cross-location staff sharing lets one employee be scheduled at multiple units with appropriate approvals. Hours, breaks, and overtime aggregate across all locations they work. Useful for traveling managers, regional trainers, multi-unit franchisees, and corporate field staff." },
    { q: "Does it support large franchise networks?", a: "Absolutely. The platform scales from 5 to 2,000+ locations with multi-tier reporting (brand → region → territory → franchisee), enterprise SSO (SAML, OIDC), AES-256 encryption, SOC 2-compliant infrastructure, and dedicated enterprise customer success. Used by franchise brands across food service, fitness, education, beauty, and home services." },
    { q: "Does each franchisee use their own payroll provider?", a: "Yes. Different franchisees often use different payroll providers (ADP, Gusto, QuickBooks, Rippling, local processors). Each location configures its own payroll integration; HQ still sees aggregated labor cost across the portfolio without needing access to individual payroll accounts." },
    { q: "How long does a franchise rollout take?", a: "Single-unit rollouts go live in a day. Brand-wide rollouts typically launch one region at a time over 4–12 weeks. Onboarding includes brand template configuration, train-the-trainer materials for franchisees, and dedicated customer success. Most brands report 80%+ unit adoption within 90 days of regional launch." },
    { q: "Does it handle franchise compliance and audits?", a: "Yes. Every location maintains complete audit trails for labor-law compliance, break enforcement, certification tracking, and shift documentation. HQ can run compliance reports across the portfolio for any date range — invaluable for franchise-agreement reviews, regulatory audits, M&A diligence, and FDD updates." },
  ];
  return (
    <section className="py-24 bg-indigo-50/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Franchise Scheduling, Answered
          </h2>
          <p className="text-gray-500 text-lg">Common questions from franchise development leaders, multi-unit operators, and corporate ops teams.</p>
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
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-900/50">
            <Network className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            One Brand. Every Unit.
            <br />
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-blue-300 bg-clip-text text-transparent">One Workforce Platform.</span>
          </h2>
          <p className="text-indigo-100/70 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Start with a single unit free. Roll out brand-wide on your timeline. Enterprise success team included.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl shadow-indigo-900/50">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              Talk to a Franchise Specialist
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {["Enterprise SSO", "SOC 2 ready", "Multi-tenant payroll", "Dedicated success team"].map((t) => (
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
export default function FranchisePage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <HqVsFranchisee />
      <FeaturesGrid />
      <FranchiseVerticals />
      <TestimonialSection />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
