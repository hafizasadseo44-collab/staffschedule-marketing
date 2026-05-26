"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion, useInView, AnimatePresence,
  type Variants, type Transition,
} from "framer-motion";
import {
  ArrowRight, CheckCircle2, Star, ChevronDown,
  MapPin, Navigation, Home, Car, Clock,
  Users, Calendar, MessageSquare, Bell, Shield,
  FileCheck, Smartphone, Heart, Activity, Zap,
  Building2, Pill, AlertCircle, Briefcase,
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

/* Sample caregiver route — 5 visits across the day */
const VISITS = [
  { time: "8:00a", client: "Mrs. Davis", svc: "Personal Care · 60 min", x: 18, y: 28, status: "done" },
  { time: "9:30a", client: "Mr. Walker", svc: "Med Reminder · 30 min", x: 38, y: 42, status: "done" },
  { time: "11:00a", client: "Mrs. Lee", svc: "Companion · 90 min", x: 55, y: 35, status: "live" },
  { time: "1:30p", client: "Mr. Russo", svc: "Personal Care · 60 min", x: 72, y: 52, status: "next" },
  { time: "3:00p", client: "Mrs. Patel", svc: "Hospice Support · 120 min", x: 86, y: 68, status: "scheduled" },
];

/* ══════════════════════════════════
   HERO — Caregiver day route map
══════════════════════════════════ */
function HeroSection() {
  const [highlight, setHighlight] = useState(2); // start on live
  useEffect(() => {
    const id = setInterval(() => setHighlight(h => (h + 1) % VISITS.length), 2200);
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
            <Home className="w-3.5 h-3.5" />
            For In-Home Care · Home Health · Hospice
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl xl:text-[3.5rem] font-black text-white leading-[1.07] tracking-tight mb-6">
            Home Care Scheduling for the{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Whole Caregiver Day
            </span>
            .
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-indigo-100/70 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            Visit-based scheduling, GPS clock-in at every client home, route coordination,
            and EVV-friendly timesheets. Built for agencies that send care into the field every day.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-900/50">
              Start Free for Your Agency <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#route-demo"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              See the Route View
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 justify-center lg:justify-start text-xs text-indigo-200/60">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> EVV-ready</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> GPS clock-in at homes</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Route coordination</span>
          </motion.div>
        </motion.div>

        {/* Right — caregiver day route */}
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
                  <Navigation className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-tight">Sarah&apos;s Route · Tuesday</p>
                  <p className="text-indigo-300/60 text-[10px]">5 visits · 6 hrs · 22 mi planned</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">LIVE</span>
            </div>

            {/* Map view */}
            <div className="relative h-64 bg-[#0a1226] overflow-hidden">
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: "linear-gradient(rgba(99,102,241,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.2) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

              {/* Connecting route lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 80" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <motion.path
                  d={`M ${VISITS[0].x} ${VISITS[0].y} ${VISITS.slice(1).map(v => `L ${v.x} ${v.y}`).join(" ")}`}
                  stroke="url(#routeGrad)"
                  strokeWidth="0.6"
                  strokeDasharray="2 2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
              </svg>

              {/* Visit pins */}
              {VISITS.map((v, i) => {
                const isHl = highlight === i;
                const color = v.status === "done" ? "#10b981" : v.status === "live" ? "#a855f7" : v.status === "next" ? "#6366f1" : "#475569";
                return (
                  <motion.div key={i}
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.12, ...spring }}
                    className="absolute"
                    style={{ left: `${v.x}%`, top: `${v.y}%`, transform: "translate(-50%, -50%)" }}
                  >
                    <motion.div animate={isHl ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                      transition={{ duration: 1.5, repeat: isHl ? Infinity : 0 }}
                      className="relative">
                      {v.status === "live" && (
                        <motion.div
                          animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      )}
                      <div className="relative w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-black border-2 border-white/30 shadow-lg"
                        style={{ backgroundColor: color }}>
                        {i + 1}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Caregiver position (live indicator) */}
              <motion.div
                animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}
                className="absolute z-10"
                style={{ left: `${VISITS[2].x}%`, top: `${VISITS[2].y}%`, transform: "translate(-50%, -50%)" }}
              >
                <div className="w-3 h-3 rounded-full bg-white shadow-lg ring-4 ring-violet-400/40" />
              </motion.div>

              {/* Legend overlay */}
              <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur rounded-lg px-2 py-1.5 flex items-center gap-2 text-[9px]">
                <span className="flex items-center gap-1 text-emerald-300"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Done</span>
                <span className="flex items-center gap-1 text-violet-300"><div className="w-1.5 h-1.5 rounded-full bg-violet-400" /> Live</span>
                <span className="flex items-center gap-1 text-indigo-300"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Next</span>
              </div>
            </div>

            {/* Visit list */}
            <div className="p-5 space-y-1.5">
              {VISITS.map((v, i) => {
                const isHl = highlight === i;
                const color = v.status === "done" ? "#10b981" : v.status === "live" ? "#a855f7" : v.status === "next" ? "#6366f1" : "#475569";
                return (
                  <motion.div key={i}
                    animate={{ scale: isHl ? 1.02 : 1 }}
                    className={`flex items-center gap-2.5 p-2 rounded-lg border transition-all ${isHl ? "border-indigo-400/50 bg-white/10" : "border-white/5 bg-white/3"}`}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                      style={{ backgroundColor: color }}>
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[11px] font-bold truncate">{v.client}</p>
                      <p className="text-indigo-200/50 text-[9px] truncate">{v.svc}</p>
                    </div>
                    <span className="text-indigo-200/60 text-[10px] font-mono">{v.time}</span>
                    {v.status === "done" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />}
                    {v.status === "live" && (
                      <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <Activity className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Floating: GPS check-in */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.4, ...spring }}
            className="hidden md:flex absolute -left-8 top-16 bg-white rounded-2xl shadow-2xl border border-indigo-100 px-3.5 py-2.5 items-center gap-2.5 z-10">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">GPS Check-In</p>
              <p className="text-xs font-bold text-gray-800">Mrs. Lee&apos;s home · verified</p>
            </div>
          </motion.div>

          {/* Floating: EVV ready */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.9, ...spring }}
            className="hidden md:flex absolute -right-4 bottom-24 bg-white rounded-2xl shadow-2xl border border-violet-100 px-3.5 py-2.5 items-center gap-2.5 z-10">
            <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
              <FileCheck className="w-4 h-4 text-violet-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">EVV Export</p>
              <p className="text-xs font-bold text-gray-800">Sent to state aggregator</p>
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
    { v: 100, s: "%", l: "visits GPS-verified" },
    { v: 30, s: " min", l: "average daily drive saved" },
    { v: 0, s: "", l: "missed-visit billing errors" },
    { v: 95, s: "%", l: "caregiver app adoption" },
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
   VISIT LIFECYCLE
══════════════════════════════════ */
function VisitLifecycle() {
  const [step, setStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  const steps = [
    { t: "7:55 AM", title: "Today&apos;s route loads", body: "Caregiver opens the app. Five visits, ordered by time, with turn-by-turn directions between each stop.", icon: Navigation, c: "#6366f1" },
    { t: "8:00 AM", title: "GPS clock-in at first home", body: "Arriving at Mrs. Davis&apos;s house, the caregiver taps clock-in. GPS confirms the address. Visit starts.", icon: MapPin, c: "#8b5cf6" },
    { t: "8:55 AM", title: "Care notes logged", body: "During or after the visit, caregiver logs personal-care tasks, medication observations, family-contact updates.", icon: FileCheck, c: "#a855f7" },
    { t: "9:00 AM", title: "Clock-out and en route", body: "Tap clock-out. Visit ends with verified end time. App routes to the next client with live ETA.", icon: Car, c: "#7c3aed" },
    { t: "End of day", title: "EVV submission ready", body: "Every visit captured with caregiver ID, client ID, GPS location, start/end times, service type. Push to your state EVV aggregator.", icon: Shield, c: "#4f46e5" },
  ];

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setStep(s => (s + 1) % steps.length), 2600);
    return () => clearInterval(id);
  }, [inView, steps.length]);

  return (
    <section id="route-demo" className="py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-5">
            <Activity className="w-3.5 h-3.5" />
            One Visit · Start to Finish
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            How a Single Home Visit
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"> Becomes Audit-Ready Billing</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Five steps. One mobile app. Every visit verified, billed, and paid correctly.
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
                <motion.div layoutId="activeHomeStep"
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
    { icon: Calendar, t: "Visit-Based Scheduling", d: "Book recurring or one-off visits. Match caregivers to clients by skill, proximity, and preference.", grad: "from-indigo-600 to-violet-600" },
    { icon: MapPin, t: "GPS Clock-In at Client Homes", d: "Caregiver arrives, taps clock-in. GPS confirms the address. Visit starts. Audit-trail builds itself.", grad: "from-violet-600 to-purple-600" },
    { icon: Navigation, t: "Route Optimization", d: "Daily routes show on a map with drive-time between stops. Cut wasted miles and missed visits.", grad: "from-blue-600 to-indigo-600" },
    { icon: Shield, t: "EVV-Friendly Exports", d: "Capture every EVV data point. Export in formats your state aggregator accepts. Stay compliant.", grad: "from-purple-600 to-violet-700" },
    { icon: Heart, t: "Client Preferences & Care Notes", d: "Allergies, preferred caregivers, family contacts, special routines — visible before every visit.", grad: "from-indigo-500 to-blue-600" },
    { icon: Smartphone, t: "Caregiver Mobile App", d: "Routes, clock-in, care notes, messages, payroll status. Rated 4.8/5. English and Spanish.", grad: "from-violet-500 to-fuchsia-600" },
    { icon: AlertCircle, t: "Late & Missed-Visit Alerts", d: "Caregiver late? Office gets notified immediately. Reassign before the client calls.", grad: "from-purple-500 to-violet-600" },
    { icon: Briefcase, t: "Billing + Payroll Sync", d: "Bill-rate vs pay-rate per service and client. Mileage reimbursement. Direct sync to home care billing.", grad: "from-fuchsia-500 to-purple-600" },
  ];
  return (
    <section className="py-24 bg-indigo-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-5">
            <Home className="w-3.5 h-3.5" />
            Built for the Field
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Every Feature Designed
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"> for Caregivers in Cars, Not at Desks</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Home care happens on the road. Your scheduling software should be built for that — not a desktop-first afterthought.
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
   AGENCY TYPES
══════════════════════════════════ */
function AgencyTypes() {
  const types = [
    { icon: Home, t: "Personal Care Agencies", d: "Daily living assistance, bathing, dressing" },
    { icon: Heart, t: "Home Health Agencies", d: "Skilled nursing visits, therapy, wound care" },
    { icon: Activity, t: "Hospice Care Agencies", d: "End-of-life support, family coordination" },
    { icon: Users, t: "Companion Care Services", d: "Companionship, light housekeeping, meals" },
    { icon: Pill, t: "Medication Management", d: "Med reminders, vitals tracking, follow-up" },
    { icon: Building2, t: "Multi-Location Agencies", d: "Multiple branches, shared caregiver pool" },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            For Every Type of Home Care Agency
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From a 15-caregiver agency to a regional multi-branch operation — the platform scales with you.
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
            &ldquo;We coordinate <span className="bg-white/20 px-2 py-0.5 rounded-lg">85 caregivers across 320 weekly visits</span>.
            EVV used to mean two hours of manual data entry every night.
            Now it&apos;s a single export. My schedulers got their evenings back. So did I.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-300 to-violet-400 flex items-center justify-center text-white text-base font-black shadow-lg">
              RM
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-lg">Renee M.</p>
              <p className="text-indigo-100/80 text-sm">Owner · Mid-Atlantic home care agency</p>
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
    { q: "What is home care scheduling software?", a: "Home care scheduling software is a workforce platform built for agencies that send caregivers into client homes. It coordinates visit-based schedules, captures GPS-verified clock-ins at client addresses, manages caregiver routes, and feeds accurate hours into payroll and billing. StaffSchedule.io serves in-home care, home health, hospice, and personal-care agencies of every size." },
    { q: "How does the GPS clock-in work at client homes?", a: "When a caregiver arrives at a client's home, they open the mobile app and clock in. The system captures their GPS location and confirms it matches the client's address. The visit start and end times are timestamped, geo-verified, and ready for payroll and EVV reporting." },
    { q: "Is this EVV compliant?", a: "StaffSchedule.io captures the data points EVV programs require (caregiver identity, client identity, location, start time, end time, service type) and exports them in formats compatible with state EVV aggregators. Pair with your billing/EVV vendor of choice for full compliance — or use our managed EVV export to your state aggregator directly." },
    { q: "Does it help with caregiver route planning?", a: "Yes. The route view shows each caregiver's daily visits on a map, ordered by time, with estimated drive between stops. Schedulers can rebalance to reduce drive time and miss-rate. Caregivers see their route in the mobile app with turn-by-turn directions." },
    { q: "How does it reduce missed visits?", a: "Caregivers get visit reminders 60, 30, and 10 minutes before each appointment. Late clock-ins trigger immediate alerts to the office so coverage can be reassigned. Daily completion dashboards track miss rate by caregiver, client, and zip code — so you spot patterns before they become complaints." },
    { q: "Does it handle caregiver availability and preferences?", a: "Yes. Caregivers set availability windows, preferred clients, blackout days, and travel limits via the mobile app. Schedulers see availability when building routes; the system warns when assignments conflict. Reduces caregiver churn by respecting their boundaries." },
    { q: "Does it integrate with home care billing and payroll?", a: "Yes. Approved visit hours flow to home care billing platforms and to major payroll providers (ADP, Gusto, QuickBooks, Rippling). Bill-rate vs pay-rate is configurable per service type, client, or caregiver. Mileage reimbursement is supported." },
    { q: "How fast can a home care agency get started?", a: "Most home care agencies are running their first week of visits on day one. The setup wizard imports your caregiver roster and client list, applies home care industry presets (visit-based scheduling, GPS clock-in, route view), and walks you through publishing. Caregivers get the mobile app the same day." },
  ];
  return (
    <section className="py-24 bg-indigo-50/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">Home Care Scheduling, Answered</h2>
          <p className="text-gray-500 text-lg">Common questions from home care owners, schedulers, and DONs.</p>
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
            <Home className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Every Visit, Verified.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Every Hour, Paid Right.</span>
          </h2>
          <p className="text-indigo-100/70 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Start free. Schedule tomorrow&apos;s visits this afternoon. Watch your billing get cleaner overnight.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl shadow-indigo-900/50">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              Talk to a Home Care Specialist
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
export default function HomeCarePage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <VisitLifecycle />
      <FeaturesGrid />
      <AgencyTypes />
      <TestimonialSection />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
