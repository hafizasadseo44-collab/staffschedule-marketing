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
  Code, Terminal, Clock, MessageSquare, Zap,
  Cpu, GitBranch, Globe, Server, Activity,
  Users, Calendar, Bell, ChevronRight, Hash,
  Database, ShieldCheck
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
   HERO — "Team Grid / Terminal"
   Modern dev-culture indigo/emerald aesthetic
══════════════════════════════════ */
function HeroSection() {
  const [time, setTime] = useState(0);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const rotateX = useMotionSpring(useTransform(my, [-300, 300], [3, -3]), { stiffness: 120, damping: 30 });
  const rotateY = useMotionSpring(useTransform(mx, [-600, 600], [-3, 3]), { stiffness: 120, damping: 30 });

  const rotations = [
    { team: "Frontend Platform", status: "Active", primary: "Alex J.", secondary: "Sam P.", color: "#10b981" },
    { team: "Database Ops", status: "Active", primary: "Mia C.", secondary: "Liam K.", color: "#6366f1" },
    { team: "Network Sec", status: "Escalated", primary: "Noah W.", secondary: "Emma B.", color: "#f59e0b" },
  ];

  useEffect(() => {
    const id = setInterval(() => setTime(t => (t + 1) % 4), 2500);
    return () => clearInterval(id);
  }, []);

  const terminalLines = [
    "[sys] Initializing StaffSchedule.io agent...",
    "[sys] Syncing with active directory...",
    "[ok]  42 engineers mapped to 6 rotations",
    "[ok]  PagerDuty webhook attached",
    `[run] Executing rotation shift for Frontend Platform`
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
      style={{ background: "#060913" }} // Very dark navy/indigo
      onMouseMove={e => { mx.set(e.clientX - window.innerWidth / 2); my.set(e.clientY - window.innerHeight / 2); }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-3xl" />
        
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: "radial-gradient(rgba(139, 92, 246, 0.4) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">

        {/* Left copy */}
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-6 font-mono">
            <Terminal className="w-3.5 h-3.5" />
            For Tech & Engineering Teams
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl xl:text-[3.5rem] font-black leading-[1.07] tracking-tight mb-5 text-white">
            Schedule Code.{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Schedule Humans.
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-8 max-w-xl">
            The modern scheduling platform for software teams. Manage on-call rotations, global support coverage, and hybrid engineer availability without the spreadsheet chaos.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-start mb-7">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #4f46e5, #10b981)" }}>
              Start Free for Your Team <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-slate-700 text-slate-200 font-semibold rounded-xl transition-all duration-200 backdrop-blur-sm">
              <Code className="w-4 h-4" /> View Developer API
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 text-xs text-slate-400 font-mono">
            {["On-call rotations", "Timezone aware", "SSO integration"].map(t => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />{t}</span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — "Team Grid" dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div style={{ rotateX, rotateY, transformPerspective: 1400 }} className="relative w-full max-w-lg">

            {/* Main dashboard card */}
            <div className="bg-[#0f172a] rounded-2xl shadow-2xl shadow-indigo-900/40 border border-slate-700 overflow-hidden relative font-sans">
              
              {/* Header */}
              <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 ml-2">app.staffschedule.io/eng/rotations</span>
                </div>
              </div>

              {/* On-Call Status */}
              <div className="px-5 py-4">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Live On-Call Rotations</p>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono bg-emerald-400/10 px-2 py-0.5 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> SYNCED
                  </span>
                </div>
                
                <div className="space-y-3">
                  {rotations.map((r, i) => (
                    <div key={i} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700 hover:border-indigo-500/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <Server className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-sm font-bold text-slate-200">{r.team}</span>
                        </div>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${r.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                          {r.status}
                        </span>
                      </div>
                      <div className="flex gap-4 mt-2">
                        <div>
                          <p className="text-[9px] text-slate-500 uppercase tracking-wide">Primary</p>
                          <p className="text-xs font-semibold text-slate-300">{r.primary}</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-slate-500 uppercase tracking-wide">Secondary</p>
                          <p className="text-xs font-semibold text-slate-400">{r.secondary}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terminal View */}
              <div className="px-5 pb-5 pt-2">
                <div className="bg-[#090e17] rounded-lg border border-slate-800 p-3 font-mono text-[10px] leading-relaxed">
                  <div className="text-slate-500 mb-1">Last Deployment Logs</div>
                  {terminalLines.map((line, idx) => (
                    <motion.div key={idx} 
                      initial={{ opacity: 0 }} animate={{ opacity: idx <= time ? 1 : 0 }} 
                      className={`${line.includes('[ok]') ? 'text-emerald-400' : line.includes('[run]') ? 'text-indigo-400' : 'text-slate-400'}`}>
                      {line}
                    </motion.div>
                  ))}
                  <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-3 bg-slate-400 inline-block align-middle ml-1" />
                </div>
              </div>

            </div>

            {/* Floating alerts */}
            <motion.div initial={{ opacity: 0, x: -40, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.3, ...spring }}
              className="hidden md:flex absolute -left-12 top-24 bg-slate-800 rounded-xl shadow-xl border border-slate-700 px-3.5 py-2 items-center gap-3 z-20">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <GitBranch className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Rotation Swap</p>
                <p className="text-xs font-bold text-slate-200">Alex ↔ Sam Approved</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.8, ...spring }}
              className="hidden md:flex absolute -right-8 bottom-32 bg-slate-800 rounded-xl shadow-xl border border-slate-700 px-3.5 py-2 items-center gap-3 z-20">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <Globe className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Support Coverage</p>
                <p className="text-xs font-bold text-slate-200">APAC Shift Online</p>
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
    { v: 99, s: ".9%", l: "rotation uptime guaranteed" },
    { v: 10, s: " hrs", l: "saved per engineering manager monthly" },
    { v: 100, s: "%", l: "timezone-aware scheduling" },
    { v: 0, s: " gap", l: "in critical support coverage" },
  ];
  return (
    <div ref={ref} className="border-y border-slate-800 bg-[#060913]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 divide-y-2 lg:divide-y-0 lg:divide-x divide-slate-800">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.09 }} className="flex flex-col items-center gap-1 px-6 py-4 text-center">
            <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent font-mono">
              {inView ? <Counter to={s.v} suffix={s.s} /> : `0${s.s}`}
            </p>
            <p className="text-sm font-semibold text-slate-400 leading-tight">{s.l}</p>
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
      icon: Database, title: "Spreadsheet Rotations",
      body: "Managing on-call schedules in Google Sheets means version control nightmares, broken formulas, and missed alerts when the sheet isn't updated.",
      fix: "Dynamic rotation engine. Build the pattern once, and it rolls out automatically forever.",
      color: "#4f46e5",
    },
    {
      icon: Globe, title: "Timezone Math Errors",
      body: "Scheduling a '9 AM' support shift for a globally distributed team always leads to someone waking up 3 hours early or missing a handoff.",
      fix: "Native timezone intelligence. Every engineer sees the schedule in their local time.",
      color: "#10b981",
    },
    {
      icon: MessageSquare, title: "Swap Coordination Chaos",
      body: "When an engineer needs to swap an on-call shift, it involves 15 Slack messages, asking the manager, and hoping the spreadsheet gets updated.",
      fix: "One-tap shift swapping. Engineers propose swaps in the app, and the schedule updates automatically upon approval.",
      color: "#0ea5e9",
    },
    {
      icon: Activity, title: "Burnout & Unfair Loads",
      body: "Without clear visibility, the same senior engineers end up taking the hardest weekend on-call shifts, leading to burnout and attrition.",
      fix: "Load balancing reports. See exactly how many weekend or holiday shifts each engineer has worked.",
      color: "#8b5cf6",
    },
  ];

  return (
    <section className="py-24 bg-[#0b1120]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold font-mono tracking-widest uppercase mb-5">
            System Failures
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            Why Spreadsheets Break <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">Tech Teams</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            You use sophisticated CI/CD pipelines for your code. Why use static spreadsheets for your humans?
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pains.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.09 }}
              className="group relative rounded-xl border border-slate-700 bg-slate-800/50 p-6 shadow-sm hover:border-indigo-500/50 transition-all duration-300 overflow-hidden">
              <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${p.color}15`, border: `1px solid ${p.color}30` }}>
                <p.icon className="w-5 h-5" style={{ color: p.color }} />
              </div>
              <h3 className="text-sm font-bold text-slate-200 mb-2">{p.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{p.body}</p>
              <div className="flex items-start gap-2 p-3 rounded-lg bg-slate-900 border border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: p.color }} />
                <p className="text-[11px] font-semibold leading-relaxed text-slate-300">{p.fix}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   HOW IT WORKS — Integration
══════════════════════════════════ */
function IntegrationWorkflow() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  const steps = [
    {
      icon: Terminal, label: "Define Rotations",
      title: "Set Pattern Rules",
      body: "Create complex rotation patterns—like 'follow-the-sun' support or primary/secondary weekend on-call. Set it up once, and let the engine schedule it infinitely.",
      code: `const rotation = new Rotation({\n  type: 'follow_the_sun',\n  handoffs: ['APAC', 'EMEA', 'AMER'],\n  duration: '1_week'\n});`,
      color: "#4f46e5",
    },
    {
      icon: Users, label: "Load Balancer",
      title: "Distribute the Load",
      body: "The system automatically analyzes past schedules to ensure nobody gets stuck with every major holiday or three consecutive weekends.",
      code: `engine.balanceLoad({\n  target: 'fairness',\n  factors: ['holidays', 'weekends'],\n  maxConsecutive: 2\n});`,
      color: "#10b981",
    },
    {
      icon: GitBranch, label: "Shift Swapping",
      title: "Frictionless Swaps",
      body: "Engineers manage their own swaps via the mobile app. Approvals happen instantly, and the master schedule updates automatically without manager intervention.",
      code: `shift.requestSwap({\n  from: 'alex_j',\n  to: 'sam_p',\n  autoApprove: true\n});`,
      color: "#0ea5e9",
    },
    {
      icon: Bell, label: "Alert Integration",
      title: "Connect Your Stack",
      body: "Sync your schedule with PagerDuty, Jira, or Slack. The right person gets alerted at the right time, based on the live StaffSchedule.io rotation.",
      code: `webhook.register({\n  target: 'pagerduty',\n  syncEvent: 'schedule.updated',\n  payload: current_on_call\n});`,
      color: "#8b5cf6",
    },
  ];

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActive(a => (a + 1) % steps.length), 3000);
    return () => clearInterval(id);
  }, [inView, steps.length]);

  return (
    <section id="how-it-works" className="py-24 bg-[#060913] border-t border-slate-800">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold font-mono tracking-widest uppercase mb-5">
            <Cpu className="w-3.5 h-3.5" /> Engine Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            Built Like Software. <span className="text-slate-500">For Software Teams.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A scheduling engine powerful enough to handle complex engineering constraints.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Timeline */}
          <div className="space-y-4">
            {steps.map((s, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`w-full text-left p-5 rounded-xl border transition-all duration-200 ${active === i ? "bg-slate-800/80 border-indigo-500/50" : "bg-transparent border-transparent hover:bg-slate-800/30"}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${active === i ? "bg-indigo-500/20 border border-indigo-500/30" : "bg-slate-800"}`}>
                    <s.icon className="w-5 h-5" style={{ color: active === i ? s.color : "#64748b" }} />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${active === i ? "text-white" : "text-slate-400"}`}>{s.title}</p>
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

          {/* IDE Mockup */}
          <div className="bg-[#0d1117] rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
            <div className="px-4 py-3 border-b border-slate-800 flex items-center gap-2 bg-[#161b22]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[10px] text-slate-500 font-mono ml-4">schedule_config.js</span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto min-h-[250px]">
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <pre className="text-slate-300">
                    <code dangerouslySetInnerHTML={{
                      __html: steps[active].code
                        .replace(/const|new|return/g, '<span class="text-indigo-400">$&</span>')
                        .replace(/true|false/g, '<span class="text-emerald-400">$&</span>')
                        .replace(/'[^']*'/g, '<span class="text-emerald-300">$&</span>')
                        .replace(/[{}]/g, '<span class="text-amber-300">$&</span>')
                    }} />
                  </pre>
                  <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-4 bg-slate-500 mt-2" />
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
    { icon: Globe, t: "Timezone Intelligence", d: "Build a schedule in UTC. Your team in London sees GMT, your team in SF sees PST. No math required.", grad: "from-indigo-500 to-blue-600" },
    { icon: Terminal, t: "Follow-The-Sun Support", d: "Easily map 8-hour support blocks across global regions to ensure true 24/7 coverage without night shifts.", grad: "from-emerald-500 to-teal-600" },
    { icon: Hash, t: "Slack/Teams Integration", d: "Post daily schedules to Slack channels automatically. Let the team know exactly who is on-call right now.", grad: "from-blue-500 to-indigo-600" },
    { icon: GitBranch, t: "Self-Serve Swapping", d: "Engineers can request coverage from peers via the app. Once accepted, the master schedule updates instantly.", grad: "from-indigo-600 to-purple-600" },
    { icon: Calendar, t: "Hybrid Office Scheduling", d: "Manage 'in-office' days vs 'remote' days alongside on-call rotations to optimize team collaboration.", grad: "from-teal-600 to-emerald-600" },
    { icon: Activity, t: "Fatigue Tracking", d: "Monitor how many after-hours incidents an engineer has handled and automatically adjust their future schedule.", grad: "from-rose-500 to-orange-500" },
    { icon: ShieldCheck, t: "SSO & Provisioning", d: "Enterprise-ready. Integrate with Okta, Azure AD, or Google Workspace for secure access and automated offboarding.", grad: "from-slate-600 to-slate-800" },
    { icon: Code, t: "Developer API", d: "Pull schedule data into your internal dashboards, or trigger deployments based on who is currently on call.", grad: "from-indigo-500 to-emerald-500" },
  ];
  return (
    <section className="py-24 bg-[#0b1120] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold font-mono tracking-widest uppercase mb-5">
            <Server className="w-3.5 h-3.5" /> Platform Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            Designed for Modern Tech Stacks
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Not just a calendar. A fully integrated workforce management platform.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {feats.map((f, i) => (
            <motion.div key={f.t}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="bg-slate-800/30 rounded-xl border border-slate-700 p-5 hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all duration-300">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br ${f.grad}`}>
                <f.icon className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-sm font-bold text-slate-200 mb-2">{f.t}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{f.d}</p>
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
    <section className="py-24 bg-gradient-to-br from-indigo-900 via-[#0f172a] to-emerald-950 relative overflow-hidden border-y border-slate-800">
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="flex justify-center gap-1 mb-6">
            <Terminal className="w-10 h-10 text-emerald-400 opacity-80" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-white leading-relaxed tracking-tight mb-8">
            &ldquo;We migrated our 80-person engineering org from a messy Google Sheet to StaffSchedule.io in a day. The timezone support alone saved our managers hours of headache, and the engineers love the self-serve swap feature.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-300 font-mono font-bold">
              JL
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-lg">Jason L.</p>
              <p className="text-emerald-400/80 text-sm font-mono tracking-wide">VP of Engineering · CloudScale Inc.</p>
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
    { q: "How is this different from PagerDuty?", a: "While PagerDuty is excellent for incident routing and immediate alerting, StaffSchedule.io is built for broad workforce management. We handle the complex scheduling of support shifts, hybrid office days, and standard rotations, and integrate with your alerting tools to ensure the right person is notified." },
    { q: "Does the schedule automatically adjust for Daylight Saving Time?", a: "Yes. Our timezone engine natively handles DST transitions across all global regions. If a shift crosses a DST boundary, the display adjusts perfectly for both the local worker and the remote manager." },
    { q: "Can we integrate StaffSchedule.io with our internal dashboards?", a: "Absolutely. We offer a robust REST API. You can query the active schedule to display 'Who's On Call' widgets on your internal wiki, or use webhooks to trigger automated actions in your CI/CD pipeline based on coverage." },
    { q: "Is there an approval workflow for shift swaps?", a: "Yes, and it's highly configurable. You can allow peer-to-peer swaps to auto-approve, or require manager sign-off. The mobile app handles the entire request/approval loop via push notifications." },
    { q: "Does it support Single Sign-On (SSO)?", a: "Yes, our Enterprise tier includes SAML/SSO integration with major providers like Okta, Azure Active Directory, Google Workspace, and OneLogin for secure, centralized access control." },
    { q: "How do you handle 'Follow The Sun' rotations?", a: "You define 'coverage blocks' (e.g., 8-hour segments) and assign teams based in different regions to those blocks. The system automatically creates the recurring pattern and adjusts for local holidays or unavailable team members." },
  ];
  return (
    <section className="py-24 bg-[#060913]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            Technical FAQs
          </h2>
          <p className="text-slate-400 text-lg">Details for engineering managers and DevOps teams.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="border border-slate-800 rounded-lg overflow-hidden bg-[#0f172a] shadow-sm">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-800 transition-colors duration-150">
                <span className="font-bold text-slate-200 pr-4 text-sm sm:text-base">{f.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>
                    <div className="px-6 pb-5 pt-3 text-slate-400 leading-relaxed text-sm border-t border-slate-800">{f.a}</div>
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
    <section className="py-24 bg-[#0f172a] relative overflow-hidden border-t border-slate-800">
      <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-900/50">
            <Code className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Delete the Spreadsheet.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">Deploy StaffSchedule.</span>
          </h2>
          <p className="text-slate-400 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Get your engineering, support, and IT teams on a modern scheduling platform today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-bold rounded-xl transition-all duration-200 shadow-xl shadow-indigo-900/50">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold rounded-xl transition-all duration-200">
              Talk to an Expert
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 font-mono">
            {["No credit card", "14-day trial", "API access included"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-sm text-slate-400">{t}</span>
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
export default function TechnologySoftwarePage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <PainPoints />
      <IntegrationWorkflow />
      <FeaturesGrid />
      <TestimonialSection />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
