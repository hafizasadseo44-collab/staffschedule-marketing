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
  Users, Clock, MessageSquare, Shield, Phone,
  Zap, Building2, MapPin, Search, FileSignature,
  Briefcase, Activity, CheckCircle, Navigation,
  ChevronRight, Hotel, ShoppingBag, UtensilsCrossed,
  Code
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
   HERO — "Live Placement Board"
   Operational indigo/teal aesthetic
══════════════════════════════════ */
function HeroSection() {
  const [activeClient, setActiveClient] = useState(0);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const rotateX = useMotionSpring(useTransform(my, [-300, 300], [3, -3]), { stiffness: 120, damping: 30 });
  const rotateY = useMotionSpring(useTransform(mx, [-600, 600], [-3, 3]), { stiffness: 120, damping: 30 });

  const clients = [
    { name: "Oasis Logistics", roles: 12, filled: 12, status: "Fully Staffed", color: "#0d9488" },
    { name: "Memorial Hospital", roles: 8, filled: 6, status: "Filling", color: "#0ea5e9" },
    { name: "TechCon Event", roles: 25, filled: 22, status: "Filling", color: "#4f46e5" },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveClient(a => (a + 1) % clients.length), 3200);
    return () => clearInterval(id);
  }, [clients.length]);

  const placements = [
    { time: "07:00", role: "Forklift Operator", person: "Marcus T.", status: "En route", color: "#10b981" },
    { time: "08:00", role: "Warehouse Assoc.", person: "Sarah K.", status: "Clocked In", color: "#10b981" },
    { time: "08:00", role: "Warehouse Assoc.", person: "Pending", status: "Searching...", color: "#f59e0b" },
    { time: "14:00", role: "Shift Supervisor", person: "David L.", status: "Confirmed", color: "#6366f1" },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
      style={{ background: "linear-gradient(to bottom right, #0f172a, #1e1b4b, #0f172a)" }}
      onMouseMove={e => { mx.set(e.clientX - window.innerWidth / 2); my.set(e.clientY - window.innerHeight / 2); }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-indigo-500/15 rounded-full blur-3xl" />
        {/* Tech grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(45,212,191,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">

        {/* Left copy */}
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-bold tracking-widest uppercase mb-6">
            <Users className="w-3.5 h-3.5" />
            For Staffing & Temp Agencies
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl xl:text-[3.5rem] font-black leading-[1.07] tracking-tight mb-5 text-white">
            Fill Shifts Faster.{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Manage Multi-Client Operations.
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-xl">
            Stop making 50 phone calls to fill one shift. Broadcast open roles instantly, track placements across every client site, and automate your entire temp dispatch process.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-start mb-7">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-teal-500/30 hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #0d9488, #0ea5e9)" }}>
              Start Free for Your Agency <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-slate-700 text-slate-200 font-semibold rounded-xl transition-all duration-200 backdrop-blur-sm">
              See the Dispatch Board
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 text-xs text-slate-400">
            {["Push-notification dispatch", "Multi-client billing", "GPS clock-in tracking"].map(t => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />{t}</span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — "Live Placement Board" dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div style={{ rotateX, rotateY, transformPerspective: 1400 }} className="relative w-full max-w-lg">

            {/* Main dashboard card */}
            <div className="bg-slate-900 rounded-3xl shadow-2xl shadow-teal-900/40 border border-slate-700/50 overflow-hidden">
              {/* Header */}
              <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-800/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Live Operations</p>
                    <p className="text-xs font-bold text-slate-200">Dispatch Board</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-teal-500/10 rounded-full border border-teal-500/20">
                  <span className="text-[10px] font-bold text-teal-400">88% Fill Rate Today</span>
                </div>
              </div>

              {/* Active Clients */}
              <div className="px-5 py-4">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Client Orders (Today)</p>
                <div className="space-y-2">
                  {clients.map((c, i) => (
                    <motion.button key={c.name} onClick={() => setActiveClient(i)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all duration-200 ${i === activeClient ? "bg-slate-800" : "hover:bg-slate-800/50"}`}
                      style={i === activeClient ? { border: `1px solid ${c.color}40` } : { border: "1px solid transparent" }}>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                        <div>
                          <p className="text-xs font-bold text-slate-200">{c.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <div className="w-16 h-1 bg-slate-700 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${(c.filled / c.roles) * 100}%`, backgroundColor: c.color }} />
                            </div>
                            <p className="text-[9px] text-slate-400">{c.filled}/{c.roles} filled</p>
                          </div>
                        </div>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${c.status === "Fully Staffed" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                        {c.status}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Placements for Active Client */}
              <div className="px-5 pb-4 border-t border-slate-800">
                <div className="flex items-center justify-between mt-3 mb-2.5">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Placements</p>
                  <p className="text-[10px] text-teal-400">Oasis Logistics</p>
                </div>
                <div className="space-y-1.5">
                  {placements.map((p, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg bg-slate-800/30 border border-slate-700/50">
                      <span className="text-[9px] font-mono font-bold text-slate-400 w-8 flex-shrink-0">{p.time}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold text-slate-300 truncate">{p.role}</p>
                        <p className="text-[9px] text-slate-500 truncate">{p.person}</p>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border" style={{ borderColor: `${p.color}30`, backgroundColor: `${p.color}10` }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color, animation: p.status === "Searching..." ? "pulse 1.5s infinite" : "none" }} />
                        <span className="text-[8px] font-bold" style={{ color: p.color }}>{p.status}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer action */}
              <div className="px-5 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 flex items-center justify-between cursor-pointer hover:from-teal-500 hover:to-cyan-500 transition-colors">
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-white" />
                  <span className="text-white text-[10px] font-bold uppercase tracking-wide">Auto-Fill Remaining Shifts</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            {/* Floating cards */}
            <motion.div initial={{ opacity: 0, x: -40, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.3, ...spring }}
              className="hidden md:flex absolute -left-10 top-24 bg-slate-800 rounded-2xl shadow-xl border border-slate-700 px-3.5 py-2.5 items-center gap-2.5 z-10">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <FileSignature className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Shift Claimed</p>
                <p className="text-xs font-black text-white">James R. accepted</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.8, ...spring }}
              className="hidden md:flex absolute -right-8 bottom-28 bg-slate-800 rounded-2xl shadow-xl border border-slate-700 px-3.5 py-2.5 items-center gap-2.5 z-10">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-teal-400" />
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">GPS Verified</p>
                <p className="text-xs font-black text-white">Sarah K. clocked in</p>
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
    { v: 5, s: " min", l: "average time to fill a shift" },
    { v: 94, s: "%", l: "placement success rate" },
    { v: 0, s: "", l: "no-call/no-show rate drops to near zero" },
    { v: 3, s: "x", l: "faster payroll reconciliation" },
  ];
  return (
    <div ref={ref} className="border-y border-slate-800 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 divide-y-2 lg:divide-y-0 lg:divide-x divide-slate-800">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.09 }} className="flex flex-col items-center gap-1 px-6 py-4 text-center">
            <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
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
   PAIN POINTS — operational issues
══════════════════════════════════ */
function PainPoints() {
  const pains = [
    {
      icon: Phone, title: "Phone tag takes hours",
      body: "Calling through a list of 50 temp workers to fill 3 shifts is painfully slow. By the time someone says yes, the shift has already started.",
      fix: "Push-notification dispatch. Ping 50 qualified workers instantly. First to tap 'Accept' gets it.",
      color: "#0d9488",
    },
    {
      icon: Navigation, title: "Ghosting at client sites",
      body: "A worker says they're on their way, but the client calls saying nobody showed up. You look unprofessional and lose the billable hours.",
      fix: "GPS-verified clock-ins. If they aren't at the client site, they can't clock in. You get instant alerts for late arrivals.",
      color: "#0ea5e9",
    },
    {
      icon: FileSignature, title: "Timesheet nightmares",
      body: "Paper timesheets get lost, illegible, or submitted late. Reconciling them against client approvals takes your whole Monday.",
      fix: "Digital timesheets tied to shifts. Export cleanly to payroll and invoicing software instantly.",
      color: "#4f46e5",
    },
    {
      icon: Shield, title: "Compliance risks",
      body: "Sending an uncertified worker to a site requiring specific safety gear or licenses puts your agency at massive liability risk.",
      fix: "Certification tracking blocks unqualified workers from even seeing shifts they don't have the certs for.",
      color: "#0d9488",
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold tracking-widest uppercase mb-5">
            The Industry Problems
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Why Traditional Staffing is{" "}
            <span className="bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">Breaking Down</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            The speed of placement is everything. If you're still relying on SMS chains and paper timesheets, you're losing margins.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pains.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.09 }}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(160px circle at top left, ${p.color}08, transparent 70%)` }} />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${p.color}15` }}>
                <p.icon className="w-5 h-5" style={{ color: p.color }} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">{p.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">{p.body}</p>
              <div className="flex items-start gap-2 p-3 rounded-xl" style={{ backgroundColor: `${p.color}10` }}>
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: p.color }} />
                <p className="text-[11px] font-semibold leading-relaxed" style={{ color: p.color }}>{p.fix}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   HOW IT WORKS — Automated Dispatch
══════════════════════════════════ */
function AutomatedDispatch() {
  const [step, setStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });
  const steps = [
    { icon: Building2, time: "09:00 AM", title: "Client requests 5 workers", body: "Oasis Logistics needs 5 warehouse associates for the 2PM shift. You create the shift requirements.", color: "#0d9488", bg: "bg-teal-100", text: "text-teal-700" },
    { icon: Zap, time: "09:02 AM", title: "Smart broadcast sent", body: "The system identifies 40 available workers with the right tags and sends them a push notification.", color: "#0ea5e9", bg: "bg-sky-100", text: "text-sky-700" },
    { icon: CheckCircle, time: "09:07 AM", title: "Shifts claimed & confirmed", body: "Workers claim shifts via the mobile app. The first 5 are accepted; others are put on standby.", color: "#4f46e5", bg: "bg-indigo-100", text: "text-indigo-700" },
    { icon: MapPin, time: "01:50 PM", title: "Workers arrive & GPS clock-in", body: "Workers arrive at the Oasis Logistics site and clock in through the app. Geofencing ensures they are actually there.", color: "#10b981", bg: "bg-emerald-100", text: "text-emerald-700" },
    { icon: FileSignature, time: "10:00 PM", title: "Timesheets auto-generate", body: "Shifts end, workers clock out. Timesheets are instantly available for client approval and payroll export.", color: "#6366f1", bg: "bg-indigo-100", text: "text-indigo-700" },
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold tracking-widest uppercase mb-5">
            <Activity className="w-3.5 h-3.5" />
            The Dispatch Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            From Order to Placement in{" "}
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Minutes</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Automate the busywork. Spend your time building client relationships instead of dialing phone numbers.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-3">
          {steps.map((s, i) => (
            <motion.button key={i} onClick={() => setStep(i)}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-300 ${step === i ? "border-teal-400 bg-teal-50 shadow-lg shadow-teal-100 scale-[1.02]" : "border-slate-100 bg-white hover:border-slate-200"}`}
            >
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <p className={`text-[10px] font-black tracking-widest uppercase mb-1.5 ${s.text}`}>{s.time}</p>
              <p className="text-sm font-bold text-slate-900 mb-1.5 leading-tight">{s.title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{s.body}</p>
              {step === i && (
                <motion.div layoutId="activeDispatch"
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
   FEATURES GRID
══════════════════════════════════ */
function FeaturesGrid() {
  const feats = [
    { icon: Zap, t: "Smart Shift Broadcasting", d: "Send open shifts to workers based on their tags, location, and past reliability. Fill roles instantly.", grad: "from-teal-500 to-cyan-600" },
    { icon: Building2, t: "Multi-Client Management", d: "Organize schedules, workers, and billing data by client. Give top clients portal access to view their active placements.", grad: "from-cyan-500 to-blue-600" },
    { icon: MapPin, t: "Geofenced Clock-ins", d: "Workers must be physically present at the assigned client location to clock in, preventing buddy punching.", grad: "from-indigo-500 to-blue-600" },
    { icon: Search, t: "Worker Tagging & Search", d: "Tag workers with skills ('forklift', 'bilingual', 'certified'). Filter your database in seconds to find the perfect match.", grad: "from-teal-600 to-emerald-600" },
    { icon: Shield, t: "Credential Tracking", d: "Upload licenses and certs. The system automatically blocks workers from taking shifts if their credentials have expired.", grad: "from-blue-600 to-indigo-700" },
    { icon: MessageSquare, t: "In-App Messaging", d: "Stop using personal SMS. Send broadcast messages or 1-on-1 chats directly through the app with read receipts.", grad: "from-teal-500 to-indigo-500" },
    { icon: Clock, t: "Availability Tracking", d: "Workers update their availability in the app. You never waste time calling someone who is already busy.", grad: "from-cyan-600 to-teal-700" },
    { icon: FileSignature, t: "Payroll Integrations", d: "Export approved, client-verified timesheets directly to your payroll provider without manual data entry.", grad: "from-indigo-600 to-purple-600" },
  ];
  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold tracking-widest uppercase mb-5">
            <Building2 className="w-3.5 h-3.5" /> Core Agency Tools
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            Everything You Need to Run Your Desk
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Tools designed specifically for the high-volume, fast-paced environment of staffing and temp agencies.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {feats.map((f, i) => (
            <motion.div key={f.t}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="bg-slate-800/50 rounded-2xl border border-slate-700 p-5 shadow-sm hover:shadow-xl hover:border-teal-500/50 transition-all duration-300">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.grad} flex items-center justify-center mb-4 shadow-sm`}>
                <f.icon className="w-5 h-5 text-white" />
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
   AGENCY TYPES
══════════════════════════════════ */
function AgencyTypes() {
  const types = [
    { icon: Briefcase, t: "General Temp Agencies", d: "High-volume shift broadcasting, fast fills, huge worker pools." },
    { icon: UtensilsCrossed, t: "Event & Hospitality Staffing", d: "Banquet servers, bartenders, massive single-day events." },
    { icon: Activity, t: "Healthcare Staffing", d: "Nurse per-diem shifts, strict credential tracking, facility assignments." },
    { icon: Building2, t: "Light Industrial & Warehouse", d: "Forklift operators, pickers, heavy compliance tracking." },
    { icon: Shield, t: "Security Guard Agencies", d: "24/7 post coverage, mobile patrols, strict geofencing." },
    { icon: Navigation, t: "Logistics & Delivery", d: "Driver dispatch, multi-stop tracking, dynamic shift changes." },
  ];
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Built for Specialized Staffing Needs
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Whether you staff warehouses or hospitals, configure the platform to match your compliance rules.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {types.map((t, i) => (
            <motion.div key={t.t}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-300 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-200">
                <t.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 mb-1">{t.t}</p>
                <p className="text-xs text-slate-500">{t.d}</p>
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
    <section className="py-24 bg-gradient-to-br from-teal-700 via-cyan-800 to-indigo-900 relative overflow-hidden">
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-teal-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />)}
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white leading-relaxed tracking-tight mb-8">
            &ldquo;We used to have 3 dispatchers making calls all morning to fill 20 shifts. Now, we push a button and the shifts fill themselves in under 10 minutes. Our placement rate went from 82% to 98% in one month.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white text-base font-black shadow-lg">
              MS
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-lg">Michael S.</p>
              <p className="text-teal-100/80 text-sm">Director of Operations · Prime Staffing Agency</p>
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
    { q: "What is staffing agency scheduling software?", a: "It's a specialized platform that allows workforce management agencies to dispatch workers to multiple client sites. It handles bulk shift creation, instant worker notifications, credential tracking, and GPS clock-ins, replacing manual call sheets and paper timesheets." },
    { q: "How does the shift broadcasting feature work?", a: "When you have open shifts (e.g., 5 warehouse roles), you create the shift requirements in the system. StaffSchedule.io instantly sends a push notification to all your workers who meet those requirements (tags, availability, certs). The first 5 to accept get the shifts, and the rest are notified it's full." },
    { q: "Can I manage different pay rates for different clients?", a: "Yes. You can assign custom pay rules, bill rates, and job codes to specific clients or specific shifts. When workers clock in, the system automatically calculates the correct hours at the correct rate for both payroll and client invoicing." },
    { q: "Will workers actually use the mobile app?", a: "Yes, because it's how they get work. The app is simple: they receive notifications, claim shifts, and clock in. It empowers them to pick up more work without calling the office, leading to extremely high adoption rates." },
    { q: "How do you prevent workers from clocking in from home?", a: "StaffSchedule.io uses geofencing. You set a virtual perimeter (e.g., 100 meters) around the client's address. Workers can only clock in through the app when their phone's GPS verifies they are inside that boundary." },
    { q: "Can we track certifications like forklift licenses or nursing credentials?", a: "Absolutely. You can create custom certification types and upload expiration dates. The system will alert you before a cert expires and can automatically block that worker from claiming shifts that require that specific credential." },
    { q: "Does this integrate with our payroll provider?", a: "Yes. Once shifts are completed and approved, you can export perfectly formatted timesheet data directly to popular payroll platforms, eliminating manual data entry and calculation errors." },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Common Questions from Agency Leaders
          </h2>
          <p className="text-slate-500 text-lg">Everything you need to know about scaling your dispatch operations.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 shadow-sm hover:shadow-md transition-shadow">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-100 transition-colors duration-150">
                <span className="font-semibold text-slate-900 pr-4 text-sm sm:text-base">{f.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown className="w-5 h-5 text-teal-600 flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>
                    <div className="px-6 pb-5 pt-3 text-slate-600 leading-relaxed text-sm border-t border-slate-200">{f.a}</div>
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
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-teal-600/30 to-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-teal-900/50">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Stop Dialing.
            <br />
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">Start Dispatching.</span>
          </h2>
          <p className="text-slate-400 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Fill shifts instantly, track GPS clock-ins, and keep your clients happy. Try it free for 14 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl shadow-teal-900/50">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              Talk to Sales
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {["No credit card", "14-day free trial", "Cancel anytime"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
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
export default function StaffingAgencyPage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <PainPoints />
      <AutomatedDispatch />
      <FeaturesGrid />
      <AgencyTypes />
      <TestimonialSection />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
