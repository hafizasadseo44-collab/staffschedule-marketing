"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion, useInView, AnimatePresence,
  type Variants, type Transition,
} from "framer-motion";
import {
  ArrowRight, CheckCircle2, Star, ChevronDown,
  Headphones, PhoneCall, PhoneOff, Coffee, Pause,
  Users, Clock, Calendar, MessageSquare, Bell,
  TrendingUp, BarChart3, Zap, Globe, Shield,
  Repeat, Smartphone, Timer, AlertCircle, Activity,
  Building2, GraduationCap,
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

/* Agent statuses for live floor grid */
const STATUSES = [
  { key: "call", label: "On Call", color: "#10b981", icon: PhoneCall },
  { key: "ready", label: "Available", color: "#6366f1", icon: Headphones },
  { key: "break", label: "Break", color: "#f59e0b", icon: Coffee },
  { key: "aux", label: "Aux", color: "#8b5cf6", icon: Pause },
  { key: "off", label: "Off", color: "#475569", icon: PhoneOff },
];

const AGENTS_INITIAL = [
  { name: "Alex K.", st: "call", t: "4:21" },
  { name: "Maya R.", st: "call", t: "1:55" },
  { name: "Jordan T.", st: "ready", t: "0:08" },
  { name: "Riley P.", st: "call", t: "7:42" },
  { name: "Sofia D.", st: "break", t: "12:00" },
  { name: "Marcus L.", st: "call", t: "2:13" },
  { name: "Aiko N.", st: "ready", t: "0:24" },
  { name: "Lena W.", st: "aux", t: "Coaching" },
  { name: "Carlos M.", st: "call", t: "0:51" },
  { name: "Priya S.", st: "call", t: "5:09" },
  { name: "Diego F.", st: "ready", t: "0:02" },
  { name: "Hana T.", st: "off", t: "—" },
];

/* ══════════════════════════════════
   HERO — Live agent floor grid
══════════════════════════════════ */
function HeroSection() {
  const [tick, setTick] = useState(0);
  const [agents, setAgents] = useState(AGENTS_INITIAL);

  // simulate live status changes
  useEffect(() => {
    const id = setInterval(() => {
      setTick(t => t + 1);
      setAgents(prev => {
        const next = [...prev];
        const i = Math.floor(Math.random() * (next.length - 2));
        const transitions: Record<string, string> = { call: "ready", ready: "call", break: "ready", aux: "ready" };
        if (transitions[next[i].st]) {
          next[i] = { ...next[i], st: transitions[next[i].st], t: "0:00" };
        }
        return next;
      });
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const counts = agents.reduce<Record<string, number>>((acc, a) => {
    acc[a.st] = (acc[a.st] || 0) + 1;
    return acc;
  }, {});
  const inQueue = 7 + (tick % 4);
  const sla = Math.min(98, 88 + (tick % 11));

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.45, 0.25] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/25 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1, 1.22, 1], opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left copy */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="text-center lg:text-left">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-indigo-300/30 text-indigo-200 text-xs font-bold tracking-widest uppercase mb-6">
            <Headphones className="w-3.5 h-3.5" />
            For Inbound · Outbound · BPO · Remote Support
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl xl:text-[3.5rem] font-black text-white leading-[1.07] tracking-tight mb-6">
            Call Center Scheduling That Hits{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Service Levels
            </span>
            {" "}Every Hour.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-indigo-100/70 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            Forecast-driven shift coverage. Real-time adherence. Mobile shift swaps in 90 seconds.
            Built for teams that get judged on AHT, SLA, and how fast you cover a callout at 6 AM.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-900/50">
              Start Free for Your Call Center <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#floor-view"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              Tour the Floor View
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 justify-center lg:justify-start text-xs text-indigo-200/60">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> 14-day free trial</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Remote-team ready</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Multi-timezone</span>
          </motion.div>
        </motion.div>

        {/* Right — Live floor dashboard */}
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
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-tight">Sales Queue · Tier 2</p>
                  <p className="text-indigo-300/60 text-[10px]">12 agents · live · {tick}s ago</p>
                </div>
              </div>
              <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
                className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                LIVE
              </motion.span>
            </div>

            {/* KPI strip */}
            <div className="px-5 pt-4 pb-3 grid grid-cols-3 gap-2">
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <p className="text-indigo-200/50 text-[9px] uppercase tracking-wider mb-0.5">In Queue</p>
                <p className="text-white text-2xl font-black tabular-nums">{inQueue}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <p className="text-indigo-200/50 text-[9px] uppercase tracking-wider mb-0.5">Service Level</p>
                <motion.p key={sla} initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                  className={`text-2xl font-black tabular-nums ${sla >= 92 ? "text-emerald-300" : "text-amber-300"}`}>{sla}%</motion.p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <p className="text-indigo-200/50 text-[9px] uppercase tracking-wider mb-0.5">Avg AHT</p>
                <p className="text-white text-2xl font-black tabular-nums">4:21</p>
              </div>
            </div>

            {/* Agent grid */}
            <div className="px-5 pb-4">
              <p className="text-indigo-200/50 text-[10px] uppercase tracking-widest mb-2">Floor · 12 agents</p>
              <div className="grid grid-cols-3 gap-1.5">
                {agents.map((a) => {
                  const s = STATUSES.find(x => x.key === a.st)!;
                  return (
                    <motion.div key={a.name}
                      animate={{ scale: 1 }}
                      className="bg-white/5 rounded-lg p-2 border border-white/5 hover:bg-white/10 transition-colors duration-200">
                      <div className="flex items-center gap-1.5 mb-1">
                        <motion.div
                          animate={a.st === "call" ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 1.8, repeat: Infinity }}
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: s.color }}
                        />
                        <p className="text-white text-[10px] font-bold truncate flex-1">{a.name}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-bold uppercase tracking-wider" style={{ color: s.color }}>{s.label}</span>
                        <span className="text-[9px] text-indigo-200/40 font-mono">{a.t}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Status breakdown */}
            <div className="px-5 py-3 bg-gradient-to-r from-indigo-950/40 to-violet-950/40 border-t border-indigo-900/30">
              <p className="text-indigo-200/50 text-[9px] uppercase tracking-widest mb-2">Status Mix</p>
              <div className="flex gap-1.5">
                {STATUSES.filter(s => counts[s.key]).map(s => (
                  <div key={s.key} className="flex items-center gap-1.5 text-[10px]">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-indigo-100/80 font-bold">{counts[s.key]}</span>
                    <span className="text-indigo-200/50">{s.label.toLowerCase()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating: adherence alert */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.4, ...spring }}
            className="hidden md:flex absolute -left-8 top-16 bg-white rounded-2xl shadow-2xl border border-indigo-100 px-3.5 py-2.5 items-center gap-2.5 z-10">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Zap className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Adherence</p>
              <p className="text-xs font-bold text-gray-800">96% on plan</p>
            </div>
          </motion.div>

          {/* Floating: callout filled */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.9, ...spring }}
            className="hidden md:flex absolute -right-4 bottom-20 bg-white rounded-2xl shadow-2xl border border-violet-100 px-3.5 py-2.5 items-center gap-2.5 z-10">
            <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-violet-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Callout Filled</p>
              <p className="text-xs font-bold text-gray-800">Diego covering 6am shift</p>
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
    { v: 96, s: "%", l: "adherence average for active customers" },
    { v: 5, s: " min", l: "median time to fill a callout" },
    { v: 18, s: "%", l: "lower call center labor cost" },
    { v: 4.8, s: "/5", l: "agent mobile app rating" },
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
   THE 6 AM CALLOUT — Scenario
══════════════════════════════════ */
function CalloutScenario() {
  const [step, setStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });
  const steps = [
    { t: "5:47 AM", title: "Agent reports out sick", body: "Carlos texts in. The 6 AM opening shift for Sales Tier 2 is suddenly short one agent.", icon: AlertCircle, c: "#a855f7" },
    { t: "5:48 AM", title: "Open shift goes live", body: "The shift drops to the marketplace. Every qualified Tier-2 agent gets a push notification with one-tap claim.", icon: Zap, c: "#8b5cf6" },
    { t: "5:51 AM", title: "Diego claims the shift", body: "Diego, an experienced overtime-eligible agent, accepts. Manager auto-approves based on pre-set rules.", icon: CheckCircle2, c: "#6366f1" },
    { t: "5:52 AM", title: "Floor gets the update", body: "Team lead and floor supervisor see the change in real time. Coverage plan stays intact.", icon: Bell, c: "#4f46e5" },
    { t: "6:00 AM", title: "Queue opens · SLA protected", body: "Diego logs in on schedule. Service level holds at 95%. No customer waits longer than 30 seconds.", icon: PhoneCall, c: "#7c3aed" },
  ];

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setStep(s => (s + 1) % steps.length), 2600);
    return () => clearInterval(id);
  }, [inView, steps.length]);

  return (
    <section id="floor-view" className="py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-5">
            <Timer className="w-3.5 h-3.5" />
            13 Minutes to Queue Open
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            What Happens When an Agent
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"> Calls Out at 5:47 AM</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            A real Tuesday morning. Five steps. Thirteen minutes. SLA protected.
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
                <motion.div layoutId="activeCallout"
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
   FEATURES — call center specific
══════════════════════════════════ */
function FeaturesGrid() {
  const feats = [
    { icon: TrendingUp, t: "Forecast-Driven Coverage", d: "Pull volume forecasts from your WFM or POS, schedule to actual demand by half-hour.", grad: "from-indigo-600 to-violet-600" },
    { icon: Activity, t: "Real-Time Adherence", d: "See exactly who's on plan, who's late, who's on aux. Catch drift before it hits SLA.", grad: "from-violet-600 to-purple-600" },
    { icon: Globe, t: "Multi-Timezone Scheduling", d: "Build once in your timezone; agents see their shifts in local time. Follow-the-sun support, sorted.", grad: "from-blue-600 to-indigo-600" },
    { icon: Repeat, t: "Mobile Shift Marketplace", d: "Agent posts a swap; qualified peers claim it; manager approves in one tap. Average swap time: 90 seconds.", grad: "from-purple-600 to-violet-700" },
    { icon: Coffee, t: "Smart Break Rotation", d: "Lunches and breaks staggered automatically so SLA never dips. Auto-respect state-by-state break laws.", grad: "from-indigo-500 to-blue-600" },
    { icon: Smartphone, t: "Remote-Agent Time Clock", d: "Clock in from home, hot desk, or office. GPS, IP, or trust-based — your call.", grad: "from-violet-500 to-fuchsia-600" },
    { icon: AlertCircle, t: "Overtime Threshold Alerts", d: "Get notified the moment any agent approaches OT. Adjust before the premium hits.", grad: "from-purple-500 to-violet-600" },
    { icon: MessageSquare, t: "Floor-Wide Broadcasts", d: "Send shift announcements, coaching reminders, or system-down alerts to the floor in one push.", grad: "from-fuchsia-500 to-purple-600" },
  ];
  return (
    <section className="py-24 bg-indigo-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-5">
            <BarChart3 className="w-3.5 h-3.5" />
            Built for Call Center Realities
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Every Feature, Tuned for{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">How Call Centers Actually Run</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Not a generic scheduling tool with a headset icon. Built for SLA pressure, queue volatility, and remote workforces.
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
   CENTER TYPES
══════════════════════════════════ */
function CenterTypes() {
  const types = [
    { icon: PhoneCall, t: "Inbound Support", d: "Customer service, tech support, claims" },
    { icon: Headphones, t: "Outbound & Sales", d: "Telesales, collections, lead qualification" },
    { icon: Building2, t: "BPO Operations", d: "Multi-client BPOs, contract centers" },
    { icon: Smartphone, t: "Remote-First Teams", d: "Fully distributed, work-from-home agents" },
    { icon: Globe, t: "Global / Follow-the-Sun", d: "Multi-region, multi-timezone coverage" },
    { icon: GraduationCap, t: "Coaching & Training", d: "Training cohorts, nesting groups, QA teams" },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Built for Every Type of Contact Center
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From a 10-seat boutique support team to a 5,000-agent BPO across three continents.
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
            &ldquo;We run a <span className="bg-white/20 px-2 py-0.5 rounded-lg">200-agent inbound center across 4 time zones</span>.
            Switching to StaffSchedule cut callout-to-coverage from 45 minutes to under 5.
            Our SLA used to dip every Monday at open — now it doesn&apos;t.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-300 to-violet-400 flex items-center justify-center text-white text-base font-black shadow-lg">
              AM
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-lg">Ashley M.</p>
              <p className="text-indigo-100/80 text-sm">Workforce Manager · 200-agent inbound support</p>
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
    { q: "What is call center scheduling software?", a: "Call center scheduling software is a workforce management platform that plans, publishes, and adjusts agent shifts based on forecasted call volume, queue requirements, and skill mix. StaffSchedule.io adds real-time adherence monitoring, mobile shift swaps, and payroll-ready timesheets — purpose-built for inbound, outbound, BPO, and remote customer support teams." },
    { q: "How does it help hit service levels?", a: "Pre-built templates match staffing to call-volume forecasts hour by hour. When adherence dips, the system flags it instantly so floor leads can reassign or call in coverage before service levels drop. Average response time for a callout: under five minutes." },
    { q: "Does it work for remote and hybrid agents?", a: "Yes. Native iOS and Android apps let agents clock in from home, request shift swaps, message coworkers, and see their next shift — anywhere. Geofencing and IP-based clock-in rules keep things compliant for fully remote, hybrid, or on-site teams." },
    { q: "Can agents manage their own swaps and time-off?", a: "Yes. Agents request PTO, swap shifts, and update availability from the mobile app. Manager approval is one tap. You can also auto-approve same-skill swaps to eliminate the middle step entirely." },
    { q: "Does it support multi-timezone scheduling?", a: "Yes. Build schedules in any timezone; agents see their shifts in their local time. Manage queues that span timezones with one unified view. Built for follow-the-sun support models and global BPOs." },
    { q: "Does it integrate with WFM and payroll?", a: "Yes. Approved timesheets sync directly to ADP, Gusto, QuickBooks, Rippling, and major payroll providers. CSV exports work with NICE, Genesys, Five9, and other WFM/CCaaS platforms for adherence and forecast data." },
    { q: "How fast can a call center get set up?", a: "Most call centers publish their first schedule on day one. The setup wizard applies the call center industry preset (agent positions, queue tags, peak templates, break rules), imports your roster from CSV or your WFM, and walks you through publishing. Agents get the mobile app the same day — average team adoption is 2 days." },
    { q: "What's the cost for a call center?", a: "Plans scale with agent count — every plan includes every feature (real-time adherence, mobile swaps, payroll integrations, multi-timezone). Start with the 14-day free trial — no credit card — and pick the right plan when you're ready." },
  ];
  return (
    <section className="py-24 bg-indigo-50/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">Call Center Scheduling, Answered</h2>
          <p className="text-gray-500 text-lg">Common questions from workforce managers and floor supervisors.</p>
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
            <Headphones className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Hit SLA Every Hour.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Cover Every Callout. Pay Right.</span>
          </h2>
          <p className="text-indigo-100/70 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Start free. Run next week&apos;s schedule on StaffSchedule.io. Watch adherence rise.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl shadow-indigo-900/50">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              Talk to a WFM Specialist
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {["No credit card", "14-day free trial", "Remote-team ready", "Multi-timezone"].map((t) => (
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
export default function CallCenterPage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <CalloutScenario />
      <FeaturesGrid />
      <CenterTypes />
      <TestimonialSection />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
