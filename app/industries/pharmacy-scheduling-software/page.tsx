"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion, useInView, AnimatePresence,
  type Variants, type Transition,
  useMotionValue, useTransform, useSpring as useMotionSpring,
} from "framer-motion";
import {
  ArrowRight, CheckCircle2, ChevronDown,
  Pill, Clock, ShieldCheck, MapPin,
  Activity, Users, ClipboardCheck, Store, Calendar,
  Bell, FileWarning
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
   HERO — "Store Coverage" Dashboard
   Deep Blue & Emerald Operational Aesthetic
══════════════════════════════════ */
function HeroSection() {
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const rotateX = useMotionSpring(useTransform(my, [-300, 300], [3, -3]), { stiffness: 100, damping: 30 });
  const rotateY = useMotionSpring(useTransform(mx, [-600, 600], [-3, 3]), { stiffness: 100, damping: 30 });

  const stores = [
    { name: "Downtown Store #142", status: "Covered", pharmacist: "J. Chen, PharmD", hours: "12h Shift" },
    { name: "Westside 24/7 #88", status: "Float Needed", pharmacist: "None Assigned", hours: "Night Shift" },
    { name: "North Clinic #45", status: "Covered", pharmacist: "A. Patel, PharmD", hours: "8h Shift" },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 bg-[#040f1a]" // Deep dark blue
      onMouseMove={e => { mx.set(e.clientX - window.innerWidth / 2); my.set(e.clientY - window.innerHeight / 2); }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[100px]" />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 -left-20 w-[600px] h-[600px] bg-emerald-600/15 rounded-full blur-[100px]" />
        
        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: "radial-gradient(rgba(16, 185, 129, 0.4) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">

        {/* Left copy */}
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-300 text-xs font-bold tracking-widest uppercase mb-6 font-mono">
            <Pill className="w-3.5 h-3.5" />
            Pharmacy Workforce Management
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl xl:text-[3.5rem] font-black leading-[1.07] tracking-tight mb-5 text-white">
            Precision Scheduling.{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Zero Compliance Gaps.
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-8 max-w-xl">
            Ensure every pharmacy counter is legally staffed. Manage pharmacist fatigue, dispatch float pools across multiple stores, and track licenses automatically.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-start mb-7">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-bold rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #2563eb, #10b981)" }}>
              Deploy Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold rounded-xl transition-all duration-200 backdrop-blur-sm">
              See Multi-Store Dashboard
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 text-xs font-mono text-slate-400 uppercase tracking-wider">
            {["License Tracking", "Float Dispatch", "Fatigue Warnings"].map(t => (
              <span key={t} className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />{t}</span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — "Coverage" dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div style={{ rotateX, rotateY, transformPerspective: 1400 }} className="relative w-full max-w-lg">

            {/* Main dashboard card */}
            <div className="bg-[#0b1727] rounded-2xl shadow-2xl shadow-blue-900/40 border border-slate-800 overflow-hidden relative">
              
              {/* Header */}
              <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-[#08121f]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-900/50 flex items-center justify-center border border-blue-800/50">
                    <Store className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">Regional Coverage</h3>
                    <p className="text-[10px] text-slate-500 font-mono">District 4 · Live Status</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-emerald-950/30 px-3 py-1 rounded border border-emerald-900/50">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald-400">COMPLIANT</span>
                </div>
              </div>

              {/* Status Board */}
              <div className="px-5 py-5">
                <div className="flex justify-between items-end mb-4">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Pharmacist-on-Duty Status</p>
                </div>
                <div className="space-y-3">
                  {stores.map((s, i) => (
                    <div key={i} className={`bg-[#0f1f33] rounded-lg p-3 border ${s.status === 'Float Needed' ? 'border-amber-500/50' : 'border-slate-800'} flex items-center justify-between`}>
                      <div className="flex items-start gap-3">
                        <MapPin className={`w-4 h-4 mt-0.5 ${s.status === 'Float Needed' ? 'text-amber-500' : 'text-blue-500'}`} />
                        <div>
                          <p className="text-sm font-bold text-slate-200">{s.name}</p>
                          <p className={`text-xs font-semibold ${s.status === 'Float Needed' ? 'text-amber-400' : 'text-emerald-400'}`}>{s.pharmacist}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-[10px] font-mono px-2 py-1 rounded mb-1 inline-block ${s.status === 'Float Needed' ? 'bg-amber-950/50 text-amber-500' : 'bg-slate-800 text-slate-400'}`}>
                          {s.hours}
                        </span>
                        <p className={`text-[10px] font-bold uppercase mt-1 ${s.status === 'Float Needed' ? 'text-amber-500 animate-pulse' : 'text-slate-500'}`}>{s.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Floating Notifications */}
            <motion.div initial={{ opacity: 0, x: -40, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.3, ...spring }}
              className="absolute -left-6 top-32 bg-[#08121f] rounded-xl shadow-xl border border-slate-700 px-4 py-3 flex items-center gap-3 z-30">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                <FileWarning className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-amber-500 uppercase tracking-wider">Fatigue Warning</p>
                <p className="text-sm font-bold text-slate-200">12h Shift Limit Reached</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 2.2, ...spring }}
              className="absolute -right-6 bottom-20 bg-[#08121f] rounded-xl shadow-xl border border-slate-700 px-4 py-3 flex items-center gap-3 z-30">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-blue-400 uppercase tracking-wider">Float Pool</p>
                <p className="text-sm font-bold text-slate-200">Float Dispatched to #88</p>
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
    { v: 100, s: "%", l: "pharmacist compliance" },
    { v: 40, s: "%", l: "reduction in overtime costs" },
    { v: 0, s: " hrs", l: "store closure due to staffing" },
    { v: 5, s: " min", l: "to fill an open float shift" },
  ];
  return (
    <div ref={ref} className="border-y border-slate-800 bg-[#040f1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-slate-800">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.09 }} className="flex flex-col items-center gap-2 px-6 text-center">
            <p className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent font-mono tracking-tight">
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
      icon: Store, title: "Multi-Store Blind Spots",
      body: "Regional managers can't see the full picture. One store might be overstaffed while another is forced to close the drive-thru because a pharmacist called in sick.",
      fix: "Unified regional dashboard. See coverage gaps across all your pharmacy locations instantly.",
      color: "#3b82f6", // Blue
    },
    {
      icon: FileWarning, title: "Dangerous Pharmacist Fatigue",
      body: "Scheduling a pharmacist for a 12-hour shift followed by an opening shift leads to dangerous dispensing errors and high burnout rates.",
      fix: "Automated fatigue rules. Set mandatory rest periods between shifts to ensure legal and safe coverage.",
      color: "#f59e0b", // Amber
    },
    {
      icon: Users, title: "The Float Pool Scramble",
      body: "When a shift opens up, managers waste hours texting the float pool list trying to find someone who isn't already scheduled elsewhere.",
      fix: "Smart float dispatch. Broadcast open shifts only to available, qualified float staff directly to their phones.",
      color: "#10b981", // Emerald
    },
    {
      icon: ClipboardCheck, title: "Expired License Liability",
      body: "A pharmacist's state license or immunization certification expires, but they are still scheduled, creating massive liability for the company.",
      fix: "Credential tracking blocks. The system physically prevents managers from scheduling staff with expired credentials.",
      color: "#ef4444", // Red
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            Operational Risk Management
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Pharmacy Staffing Has <span className="text-blue-600">Zero Margin for Error</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            A missed shift in retail is an inconvenience. A missed shift in a pharmacy is a compliance violation. StaffSchedule.io ensures your counters are always legally covered.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pains.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.09 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${p.color}15`, border: `1px solid ${p.color}30` }}>
                <p.icon className="w-6 h-6" style={{ color: p.color }} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{p.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">{p.body}</p>
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: p.color }} />
                  <p className="text-xs font-semibold text-slate-800 leading-relaxed">{p.fix}</p>
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
   HOW IT WORKS / WORKFLOW
══════════════════════════════════ */
function WorkflowSection() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  const steps = [
    {
      icon: Store, title: "Store-Level Templates",
      body: "Create schedule templates based on store volume. Define exact coverage requirements for the Pharmacist-in-Charge, staff pharmacists, and pharmacy techs.",
      image: "https://images.unsplash.com/photo-1587854692152-cbe668cd679a?q=80&w=800&auto=format&fit=crop",
      color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200"
    },
    {
      icon: Activity, title: "Compliance & Overtime Check",
      body: "Before publishing, the system scans the schedule for state law compliance, overtime violations, and adequate rest periods between shifts.",
      image: "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=800&auto=format&fit=crop",
      color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200"
    },
    {
      icon: Users, title: "Float Pool Dispatch",
      body: "If a store has an unfilled gap, instantly push the open shift to your regional float pool. The first available, qualified pharmacist claims it via mobile.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
      color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200"
    },
    {
      icon: Bell, title: "Mobile Execution",
      body: "Staff receive their schedules, clock in via geofenced GPS at the store, and handle swap requests all from the StaffSchedule.io app.",
      image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=800&auto=format&fit=crop",
      color: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-200"
    },
  ];

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActive(a => (a + 1) % steps.length), 4000);
    return () => clearInterval(id);
  }, [inView, steps.length]);

  return (
    <section id="how-it-works" className="py-24 bg-white border-t border-slate-100">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            A Clinical Approach to Scheduling
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Standardize your workforce management across a single pharmacy or a 50-store chain.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Interactive Steps */}
          <div className="space-y-4">
            {steps.map((s, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${active === i ? `${s.bg} ${s.border} shadow-md scale-[1.02]` : "bg-white border-transparent hover:bg-slate-50"}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${active === i ? "bg-white shadow-sm" : "bg-slate-100"}`}>
                    <s.icon className={`w-6 h-6 ${active === i ? s.color : "text-slate-400"}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold mb-2 ${active === i ? "text-slate-900" : "text-slate-600"}`}>{s.title}</h3>
                    <AnimatePresence initial={false}>
                      {active === i && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <p className="text-slate-600 leading-relaxed text-sm">{s.body}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Image Display */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={steps[active].image}
                alt={steps[active].title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none" />
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
    { icon: MapPin, t: "Multi-Store Management", d: "View the master schedule for your entire region. Easily drag-and-drop pharmacists between locations if coverage drops.", grad: "from-blue-500 to-indigo-600" },
    { icon: ShieldCheck, t: "License Verification", d: "Store state pharmacy licenses and immunization certs. The system automatically warns you before they expire.", grad: "from-emerald-500 to-teal-600" },
    { icon: Users, t: "Float Pool Broadcasting", d: "Post open shifts exclusively to your unassigned float pool list, filling gaps in minutes without manual calling.", grad: "from-blue-400 to-blue-600" },
    { icon: Clock, t: "Geofenced Clock-Ins", d: "Prevent time theft. Pharmacy techs can only clock in from the mobile app if their GPS verifies they are inside the store.", grad: "from-indigo-500 to-purple-600" },
    { icon: Activity, t: "Fatigue Management Rules", d: "Enforce company policy or state law regarding maximum shift lengths and mandatory rest periods between shifts.", grad: "from-rose-500 to-orange-500" },
    { icon: Calendar, t: "Automated Rotations", d: "Set up complex rotating schedules (e.g., every 3rd weekend on) that run automatically, ensuring fairness among staff.", grad: "from-teal-600 to-emerald-600" },
  ];
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Built for Clinical Precision
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Tools designed to keep your pharmacies open, compliant, and running smoothly.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feats.map((f, i) => (
            <motion.div key={f.t}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-gradient-to-br ${f.grad} shadow-inner`}>
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{f.t}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{f.d}</p>
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
    <section className="py-24 bg-[#040f1a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <Store className="w-12 h-12 text-blue-500 mx-auto mb-8 opacity-80" />
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-relaxed tracking-tight mb-10">
            &ldquo;We manage 15 retail pharmacies. Before StaffSchedule.io, covering a last-minute sick call meant closing a drive-thru. Now, the open shift broadcasts to our float pool, and we usually have coverage claimed within 10 minutes. It's transformed our operations.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-emerald-400 bg-slate-800 flex items-center justify-center font-bold text-slate-300 text-xl">
              MW
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-lg">Michael W.</p>
              <p className="text-emerald-400 text-sm font-medium">Regional Director · CityHealth Pharmacies</p>
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
    { q: "Can we group employees by store location or region?", a: "Yes. Our hierarchy allows you to create regions (e.g., 'Northwest District') containing multiple stores. You can then assign pharmacists to a 'home' store, but also allow them to view and claim open shifts at other stores within their district." },
    { q: "How does the system prevent a technician from taking a pharmacist shift?", a: "Every employee is assigned specific roles (e.g., Pharmacist, Pharm Tech, Cashier) and certifications. When creating a schedule or an open shift, you define the required role. The system strictly prevents unqualified staff from claiming it." },
    { q: "Does the time clock work if our store Wi-Fi goes down?", a: "Yes. The StaffSchedule.io mobile app supports offline clock-ins. If the network drops, the app securely stores the encrypted punch data locally and automatically syncs with the server as soon as connection is restored." },
    { q: "Can we track immunization certifications?", a: "Yes. The compliance module allows you to track multiple certifications per employee. You'll receive automated dashboard warnings 30 days before a CPR or Immunization cert expires." },
    { q: "How is overtime calculated for float staff working multiple locations?", a: "Because StaffSchedule.io centralizes your data, all hours worked by an employee across all store locations are aggregated. If assigning a shift at Store B pushes an employee into overtime (based on hours already worked at Store A), the manager is warned instantly." },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Common Questions from Pharmacy Directors
          </h2>
          <p className="text-slate-600 text-lg">Details on compliance, multi-store management, and deployment.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:border-blue-300 transition-colors">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left bg-white">
                <span className="font-bold text-slate-900 pr-4 text-base sm:text-lg">{f.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-5 h-5 text-blue-600 flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}>
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed">{f.a}</div>
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
    <section className="py-24 bg-[#040f1a] relative overflow-hidden border-t border-slate-800">
      <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight">
            Stop worrying about coverage.
          </h2>
          <p className="text-slate-400 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Join the pharmacies that use StaffSchedule.io to manage float pools, prevent fatigue, and ensure compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/50 text-lg">
              Start Your Free 14-Day Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold rounded-xl transition-all duration-200 text-lg">
              Talk to Sales
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {["No credit card required", "Cancel anytime", "Implementation support"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-400">{t}</span>
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
export default function PharmacyPage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <PainPoints />
      <WorkflowSection />
      <FeaturesGrid />
      <TestimonialSection />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
