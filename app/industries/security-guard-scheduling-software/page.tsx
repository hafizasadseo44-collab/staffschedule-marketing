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
  Shield, Clock, MessageSquare, Phone, MapPin,
  AlertTriangle, Navigation, Radio, CheckCircle,
  Eye, Bell, ShieldAlert, Crosshair, Users,
  Globe, Zap, FileText, ChevronRight, Activity, Building2
} from "lucide-react";

/* ─── animation constants ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };
const spring: Transition = { type: "spring", stiffness: 260, damping: 22 };

function Counter({ to, suffix = "", prefix = "", duration = 1.6 }: { to: number; suffix?: string; prefix?: string; duration?: number }) {
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
  return <span ref={ref}>{prefix}{n}{suffix}</span>;
}

/* ══════════════════════════════════
   HERO — "Command Center"
   Dark enterprise navy/cyan aesthetic
══════════════════════════════════ */
function HeroSection() {
  const [time, setTime] = useState(0);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const rotateX = useMotionSpring(useTransform(my, [-300, 300], [3, -3]), { stiffness: 120, damping: 30 });
  const rotateY = useMotionSpring(useTransform(mx, [-600, 600], [-3, 3]), { stiffness: 120, damping: 30 });

  const shifts = [
    { hour: "22:00", active: true },
    { hour: "02:00", active: false },
    { hour: "06:00", active: false },
  ];

  useEffect(() => {
    const id = setInterval(() => setTime(t => (t + 1) % shifts.length), 3500);
    return () => clearInterval(id);
  }, [shifts.length]);

  const posts = [
    { site: "Downtown Plaza", role: "Access Control", guard: "J. Miller", status: "On Post", alert: false },
    { site: "Westside Data Center", role: "Perimeter Patrol", guard: "A. Davis", status: "Patrolling", alert: false },
    { site: "Harbor Logistics", role: "Gate Guard", guard: "M. Chen", status: "Late Clock-in", alert: true },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
      style={{ background: "#020617" }} // Deep darkest navy/black
      onMouseMove={e => { mx.set(e.clientX - window.innerWidth / 2); my.set(e.clientY - window.innerHeight / 2); }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Radar sweep effect */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-1/4 w-[800px] h-[800px] rounded-full border border-cyan-900/20"
          style={{ background: "conic-gradient(from 0deg, transparent 70%, rgba(6,182,212,0.15) 100%)", transform: "translate(-50%, -50%)" }} />
        
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full border border-cyan-900/40" style={{ transform: "translate(-50%, -50%)" }} />
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] rounded-full border border-cyan-900/20" style={{ transform: "translate(-50%, -50%)" }} />

        {/* Tactical grid */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">

        {/* Left copy */}
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-800 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6">
            <Shield className="w-3.5 h-3.5" />
            Security Guard Scheduling
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl xl:text-[3.5rem] font-black leading-[1.07] tracking-tight mb-5 text-white">
            24/7 Post Coverage.{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Zero Blind Spots.
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-8 max-w-xl">
            Manage guard schedules, track GPS clock-ins, and fill emergency call-outs in minutes. Enterprise-grade command center software for security companies that can't afford gaps.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-start mb-7">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-bold rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #0891b2, #2563eb)" }}>
              Deploy Command Center <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold rounded-xl transition-all duration-200">
              View Tactical Features
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 text-xs font-mono text-slate-500 uppercase tracking-wider">
            {["Geofenced Clock-ins", "Live Guard Tracking", "Instant Shift Fill"].map(t => (
              <span key={t} className="flex items-center gap-1.5"><Crosshair className="w-3 h-3 text-cyan-500" />{t}</span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — "Command Center" dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div style={{ rotateX, rotateY, transformPerspective: 1400 }} className="relative w-full max-w-lg">

            {/* Main dashboard card */}
            <div className="bg-[#0b1120] rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-slate-800 overflow-hidden relative">
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-50 z-20" />
              
              {/* Header */}
              <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-[#0f172a] relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                    <Radio className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Sys_Com_01</p>
                    <p className="text-xs font-bold text-slate-200 uppercase tracking-wide">Live Command</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1 bg-black/50 rounded border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
                  <span className="text-[10px] font-mono text-cyan-400">SYS_ACTIVE</span>
                </div>
              </div>

              {/* Status Board */}
              <div className="px-5 py-4 relative z-10">
                <div className="flex justify-between items-end mb-4">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Post Status</p>
                  <p className="text-[10px] font-mono text-cyan-500">{shifts[time].hour} SHIFT</p>
                </div>
                <div className="space-y-2">
                  {posts.map((p, i) => (
                    <div key={i} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded bg-[#111827] border ${p.alert ? 'border-red-900/50 shadow-[inset_0_0_15px_rgba(220,38,38,0.15)]' : 'border-slate-800'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-8 rounded-full ${p.alert ? 'bg-red-500' : 'bg-cyan-500'}`} />
                        <div>
                          <p className="text-xs font-bold text-slate-200">{p.site}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Users className="w-3 h-3 text-slate-500" />
                            <p className="text-[10px] text-slate-400">{p.guard} · {p.role}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${p.alert ? 'bg-red-950/50 text-red-400 border-red-900' : 'bg-emerald-950/30 text-emerald-400 border-emerald-900/50'}`}>
                          {p.status}
                        </span>
                        {p.alert && (
                          <span className="text-[8px] text-red-500 font-mono mt-1 flex items-center gap-1">
                            <AlertTriangle className="w-2.5 h-2.5" /> REQ DISPATCH
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Geo-Map placeholder */}
              <div className="px-5 pb-5 pt-2 relative z-10">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2.5">Live Unit Tracking</p>
                <div className="h-32 w-full bg-[#020617] rounded border border-slate-800 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at center, rgba(34,211,238,0.1) 0%, transparent 70%)" }} />
                  <div className="w-full h-full opacity-30" style={{ backgroundImage: "linear-gradient(rgba(34,211,238,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.2) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                  
                  {/* Blips */}
                  <motion.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute top-1/3 left-1/4 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />
                  <motion.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />
                  <motion.div animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_15px_#ef4444]" />
                  
                  <div className="absolute bottom-2 left-2 flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-cyan-500" />
                    <span className="text-[8px] font-mono text-slate-500">GPS ACTIVE</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Floating tactical alerts */}
            <motion.div initial={{ opacity: 0, x: -40, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.3, ...spring }}
              className="hidden md:flex absolute -left-12 top-32 bg-[#0f172a] rounded shadow-2xl border border-red-900/50 px-3 py-2 items-center gap-2.5 z-30">
              <div className="w-8 h-8 rounded bg-red-950/50 flex items-center justify-center border border-red-900">
                <ShieldAlert className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <p className="text-[9px] font-mono text-red-500 uppercase tracking-wider">Exception Alert</p>
                <p className="text-xs font-bold text-white uppercase">Guard No-Show</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 2.2, ...spring }}
              className="hidden md:flex absolute -right-8 bottom-32 bg-[#0f172a] rounded shadow-2xl border border-cyan-900/50 px-3 py-2 items-center gap-2.5 z-30">
              <div className="w-8 h-8 rounded bg-cyan-950/50 flex items-center justify-center border border-cyan-900">
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <p className="text-[9px] font-mono text-cyan-500 uppercase tracking-wider">Dispatch System</p>
                <p className="text-xs font-bold text-white uppercase">Auto-Fill Executed</p>
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
  const stats = [
    { v: 100, s: "%", l: "post coverage visibility" },
    { v: 15, s: " min", l: "average emergency replacement time" },
    { v: 0, s: "", l: "unverified paper timesheets" },
    { v: 24, s: "/7", l: "system reliability" },
  ];
  return (
    <div ref={ref} className="border-y border-slate-800 bg-[#0b1120]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 divide-y-2 lg:divide-y-0 lg:divide-x divide-slate-800">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.09 }} className="flex flex-col items-center gap-1 px-6 py-4 text-center">
            <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {inView ? <Counter to={s.v} suffix={s.s} /> : `0${s.s}`}
            </p>
            <p className="text-sm font-semibold text-slate-400 leading-tight uppercase tracking-wide">{s.l}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════
   PAIN POINTS
══════════════════════════════════ */
function PainPoints() {
  const pains = [
    {
      icon: Eye, title: "Blind spots in coverage",
      body: "You assume a guard is at their post, but they're late or absent. You don't find out until the client calls complaining.",
      fix: "GPS geofencing ensures guards are on-site to clock in. You get instant alerts if a post is empty 5 minutes past start time.",
      color: "#0ea5e9",
    },
    {
      icon: Phone, title: "The 3 AM call-out scramble",
      body: "A night guard calls in sick. Your dispatcher spends an hour calling down a list of off-duty guards while the post sits empty.",
      fix: "One-tap emergency broadcast. Ping all qualified, nearby guards instantly. The shift fills in minutes.",
      color: "#3b82f6",
    },
    {
      icon: FileText, title: "Timesheet fraud & errors",
      body: "Guards text you their hours, or fill out paper sheets. 'Buddy punching' and padded hours eat directly into your margins.",
      fix: "Device-locked, location-verified clock-ins. Timesheets are generated automatically from hard data, not honor systems.",
      color: "#06b6d4",
    },
    {
      icon: ShieldAlert, title: "Expired licenses on post",
      body: "Sending an uncertified or expired guard to an armed post or specialized site creates massive liability for your company.",
      fix: "Automated license tracking. The system blocks managers from scheduling any guard with an expired certification.",
      color: "#ef4444",
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold font-mono tracking-widest uppercase mb-5">
            Mission Critical Failures
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Security Operations Don't Have{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Room for Error</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            In security, a missed shift isn't an inconvenience—it's a breach of contract. Here is how we eliminate the risk.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pains.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.09 }}
              className="group relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="w-11 h-11 rounded bg-slate-100 flex items-center justify-center mb-4 border border-slate-200">
                <p.icon className="w-5 h-5" style={{ color: p.color }} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">{p.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">{p.body}</p>
              <div className="flex items-start gap-2 p-3 rounded bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: p.color }} />
                <p className="text-[11px] font-semibold leading-relaxed text-slate-700">{p.fix}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   HOW IT WORKS — Tactical Dispatch
══════════════════════════════════ */
function TacticalWorkflow() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  const steps = [
    {
      icon: MapPin, label: "Define Post Parameters",
      title: "Set Geofences & Requirements",
      body: "Create client sites, define the exact GPS boundary for clock-ins, and specify required certifications (e.g., Armed, CPR, Guard Card) for the post.",
      visual: ["INIT SITE: Harbor Terminal", "SET GEOFENCE: 50m radius", "REQ: State Guard Card", "REQ: Armed Certification"],
      color: "#0ea5e9",
    },
    {
      icon: Calendar, label: "Deploy Schedules",
      title: "Build 24/7 Rotations Instantly",
      body: "Use templates to deploy complex 24/7 coverage patterns. The system flags overtime warnings and qualification mismatches before you publish.",
      visual: ["LOAD PATTERN: 24/7 3-Shift", "CHECK: Overtime limits (Clear)", "CHECK: Guard Certs (Clear)", "STATUS: Schedule Deployed"],
      color: "#3b82f6",
    },
    {
      icon: Zap, label: "Emergency Replacements",
      title: "Auto-Fill Empty Posts",
      body: "If a guard calls out or no-shows, trigger an auto-fill broadcast. It pings nearby off-duty guards with the right certs to claim the shift.",
      visual: ["ALERT: Post 4 Abandoned", "EXECUTE: Auto-Fill Protocol", "PING: 14 Qualified Guards", "RESULT: Filled in 4m 12s"],
      color: "#06b6d4",
    },
    {
      icon: Activity, label: "Live Monitoring",
      title: "The Command Center View",
      body: "Watch your entire operation from the live dashboard. See who is on post, who is late, and track mobile patrols in real-time.",
      visual: ["LIVE: 42 Guards On Post", "LIVE: 3 Mobile Patrols Active", "WARNING: 1 Late Clock-in", "All systems operational"],
      color: "#10b981",
    },
  ];

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActive(a => (a + 1) % steps.length), 3000);
    return () => clearInterval(id);
  }, [inView, steps.length]);

  return (
    <section id="how-it-works" className="py-24 bg-[#0b1120] border-t border-slate-800">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded border border-cyan-900 bg-cyan-950/30 text-cyan-500 text-xs font-bold font-mono tracking-widest uppercase mb-5">
            <Radio className="w-3.5 h-3.5" /> Operational Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            Flawless Execution. <span className="text-slate-500">Every Shift.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From scheduling to live monitoring, the system enforces compliance and ensures coverage.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Timeline */}
          <div className="space-y-4">
            {steps.map((s, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`w-full text-left p-5 rounded border transition-all duration-200 ${active === i ? "bg-slate-800/50 border-cyan-500/50" : "bg-transparent border-transparent hover:bg-slate-800/30"}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded flex items-center justify-center flex-shrink-0 ${active === i ? "bg-cyan-950/50 border border-cyan-500/50" : "bg-slate-800"}`}>
                    <s.icon className="w-5 h-5" style={{ color: active === i ? s.color : "#64748b" }} />
                  </div>
                  <div>
                    <p className={`text-sm font-bold uppercase tracking-wide ${active === i ? "text-white" : "text-slate-400"}`}>{s.title}</p>
                    {active === i && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-xs text-slate-400 mt-2 leading-relaxed">
                        {s.body}
                      </motion.p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Terminal Display */}
          <div className="bg-[#020617] rounded-lg border border-slate-800 overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-50 z-20" />
            <div className="px-4 py-2 border-b border-slate-800 flex items-center gap-2 bg-[#0b1120]">
              <span className="text-[10px] text-slate-500 font-mono">TERMINAL // SYSTEM_LOG</span>
            </div>
            <div className="p-6 font-mono text-sm space-y-3 min-h-[250px]">
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                  {steps[active].visual.map((line, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.15 }} className="flex gap-3">
                      <span className="text-slate-600">&gt;</span>
                      <span style={{ color: steps[active].color }}>{line}</span>
                    </motion.div>
                  ))}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: steps[active].visual.length * 0.15 }} className="w-2 h-4 bg-slate-500 mt-2" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
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
    { icon: Crosshair, t: "Geofenced Clock-Ins", d: "Set precise GPS perimeters for every post. Guards must be physically within the boundary to start their shift.", grad: "from-cyan-500 to-blue-600" },
    { icon: Bell, t: "Late & No-Show Alerts", d: "If a guard hasn't clocked in 5 minutes past shift start, supervisors receive an instant push notification.", grad: "from-blue-500 to-indigo-600" },
    { icon: ShieldAlert, t: "License & Cert Tracking", d: "Store guard cards, CPR certs, and firearms permits. Get alerts before they expire and block unqualified scheduling.", grad: "from-indigo-500 to-purple-600" },
    { icon: Users, t: "Client Portals", d: "Give property managers and clients read-only access to see schedule coverage and live guard status at their sites.", grad: "from-cyan-600 to-teal-600" },
    { icon: Zap, t: "Open Shift Bidding", d: "Post unassigned shifts to the board. Qualified guards can bid to pick up extra hours, saving dispatcher time.", grad: "from-blue-600 to-cyan-600" },
    { icon: Navigation, t: "Mobile Patrol Tracking", d: "Guards on mobile patrol drop GPS pins or scan checkpoints to verify rounds are completed on time.", grad: "from-indigo-600 to-blue-700" },
    { icon: Clock, t: "Overtime Prevention", d: "The system warns dispatchers before assigning a shift that will trigger overtime pay, protecting your margins.", grad: "from-cyan-500 to-indigo-500" },
    { icon: FileText, t: "Automated Timesheets", d: "GPS-verified clock-ins generate perfectly accurate timesheets ready for payroll export.", grad: "from-blue-500 to-indigo-700" },
  ];
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest mb-5">
            <Shield className="w-3.5 h-3.5" /> Security-Specific Tools
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Built for Guard Companies
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Generic scheduling apps don't understand post coverage or guard cards. We do.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {feats.map((f, i) => (
            <motion.div key={f.t}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300">
              <div className={`w-11 h-11 rounded flex items-center justify-center mb-4 bg-gradient-to-br ${f.grad}`}>
                <f.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">{f.t}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{f.d}</p>
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
    <section className="py-24 bg-[#020617] relative overflow-hidden border-y border-slate-800">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(#0891b2 1px, transparent 1px), linear-gradient(90deg, #0891b2 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <Shield className="w-12 h-12 text-cyan-500 mx-auto mb-6 opacity-50" />
          <p className="text-2xl sm:text-3xl font-black text-white leading-relaxed tracking-tight mb-8">
            &ldquo;We manage 150 guards across 40 posts. Before StaffSchedule.io, our night supervisor spent hours doing site checks. Now, the live dashboard shows us exactly who is on post via GPS. It's night and day for our operations.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-mono font-bold">
              RT
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-lg uppercase tracking-wide">Robert T.</p>
              <p className="text-cyan-500/80 text-xs font-mono uppercase tracking-widest">Operations Manager · Apex Security Group</p>
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
    { q: "How accurate is the GPS clock-in feature?", a: "Extremely accurate. The app uses the native location services on the guard's device. You define the acceptable radius (e.g., 50 meters from the guard shack), and the system will reject clock-in attempts outside that zone." },
    { q: "What happens if a guard's phone dies on post?", a: "If a guard cannot use their mobile device, supervisors have the ability to manually clock guards in and out from the admin dashboard or manager app, leaving a clear audit trail that a manager performed the action." },
    { q: "Can the system prevent us from scheduling guards into overtime?", a: "Yes. StaffSchedule.io tracks accumulated hours across all client sites. When a dispatcher attempts to assign a shift that pushes a guard past 40 hours (or your custom threshold), the system flashes an overtime warning and suggests available guards who aren't in OT." },
    { q: "How does it handle state guard licenses?", a: "You input the guard card or certification details and expiration dates into the guard's profile. The platform actively monitors these dates, sends warning notifications 30 days prior to expiration, and can hard-block scheduling if the cert expires." },
    { q: "Do we need to buy specialized hardware or scanners?", a: "No. Everything runs on the smartphones your guards and supervisors already own (iOS and Android). The mobile app handles schedules, GPS clock-ins, messaging, and shift claiming." },
    { q: "Can we use this for mobile patrols or event security?", a: "Yes. For mobile patrols, guards can drop location pins. For event security, you can create massive single-day shifts and bulk-assign dozens of guards at once, ensuring you meet headcount requirements." },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4 uppercase">
            Operational FAQs
          </h2>
          <p className="text-slate-500 text-lg">Details for security company owners and dispatchers.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="border border-slate-200 rounded overflow-hidden bg-white shadow-sm">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors duration-150">
                <span className="font-bold text-slate-900 pr-4 text-sm sm:text-base">{f.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown className="w-5 h-5 text-blue-600 flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>
                    <div className="px-6 pb-5 pt-3 text-slate-600 leading-relaxed text-sm border-t border-slate-100">{f.a}</div>
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
    <section className="py-24 bg-[#020617] relative overflow-hidden">
      <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-900/30 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="w-16 h-16 rounded bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-cyan-900/50">
            <Shield className="w-8 h-8 text-cyan-400" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight uppercase tracking-tight">
            Secure Your Operations.
          </h2>
          <p className="text-slate-400 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Eliminate ghosting, prevent overtime, and guarantee post coverage. Deploy StaffSchedule.io today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase tracking-wide rounded transition-all duration-200 shadow-[0_0_15px_rgba(8,145,178,0.5)]">
              Initiate Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold uppercase tracking-wide rounded transition-all duration-200">
              Contact Sales
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {["No credit card", "14-day trial", "Cancel anytime"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                <span className="text-sm text-slate-500 font-mono">{t}</span>
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
export default function SecurityGuardPage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <PainPoints />
      <TacticalWorkflow />
      <FeaturesGrid />
      <TestimonialSection />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
