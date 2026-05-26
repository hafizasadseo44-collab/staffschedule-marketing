"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion, useInView, AnimatePresence,
  type Variants, type Transition,
} from "framer-motion";
import {
  ArrowRight, CheckCircle2, Star, ChevronDown,
  Hotel, Bed, ConciergeBell, UtensilsCrossed, Sparkles,
  Wrench, Shield, Users, Clock, MapPin, Bell,
  Building2, Coffee, Waves, KeySquare, ParkingCircle,
  Phone, MessageSquare, Calendar, Award, BarChart3,
  TrendingUp, Briefcase,
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

const DEPARTMENTS = [
  { id: "housekeeping", icon: Bed, name: "Housekeeping", color: "#0ea5e9", bg: "from-sky-500 to-cyan-600", staff: 24, shift: "6a–3p" },
  { id: "frontdesk", icon: ConciergeBell, name: "Front Desk", color: "#14b8a6", bg: "from-teal-500 to-cyan-600", staff: 8, shift: "24/7" },
  { id: "fb", icon: UtensilsCrossed, name: "Food & Beverage", color: "#10b981", bg: "from-emerald-500 to-teal-600", staff: 18, shift: "6a–11p" },
  { id: "spa", icon: Sparkles, name: "Spa & Wellness", color: "#06b6d4", bg: "from-cyan-500 to-blue-600", staff: 7, shift: "8a–8p" },
  { id: "maintenance", icon: Wrench, name: "Engineering", color: "#3b82f6", bg: "from-blue-500 to-indigo-600", staff: 5, shift: "24/7" },
  { id: "security", icon: Shield, name: "Security", color: "#6366f1", bg: "from-indigo-500 to-blue-600", staff: 6, shift: "24/7" },
];

/* ══════════════════════════════════
   HERO — Department Command Center
══════════════════════════════════ */
function HeroSection() {
  const [activeDept, setActiveDept] = useState("housekeeping");
  useEffect(() => {
    const id = setInterval(() => {
      setActiveDept(d => {
        const idx = DEPARTMENTS.findIndex(x => x.id === d);
        return DEPARTMENTS[(idx + 1) % DEPARTMENTS.length].id;
      });
    }, 2400);
    return () => clearInterval(id);
  }, []);

  const active = DEPARTMENTS.find(d => d.id === activeDept) ?? DEPARTMENTS[0];

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
            <Hotel className="w-3.5 h-3.5" />
            For Hotels · Resorts · Hospitality
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl xl:text-[3.5rem] font-black text-white leading-[1.07] tracking-tight mb-6">
            Hotel Scheduling{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              That Never Sleeps
            </span>
            .
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-indigo-100/70 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            24-hour coverage across housekeeping, front desk, F&amp;B, spa, and engineering — coordinated from one dashboard.
            Built for boutique inns, full-service hotels, and resort groups managing dozens of properties.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-900/50">
              Start Free for Your Property <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#departments"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              Tour the Property Dashboard
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 justify-center lg:justify-start text-xs text-indigo-200/60">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> 24/7 coverage views</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Multi-property ready</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Union-compliant</span>
          </motion.div>
        </motion.div>

        {/* Right — Property Dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative w-full"
        >
          <div className="relative bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl border border-indigo-900/40 shadow-2xl shadow-indigo-900/30 overflow-hidden">
            {/* Property header */}
            <div className="px-5 py-4 border-b border-indigo-900/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
                  <Hotel className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-tight">The Lakeside Resort</p>
                  <p className="text-indigo-300/60 text-[10px]">4 properties · 312 rooms · 86 staff on duty</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                LIVE
              </span>
            </div>

            {/* Departments grid */}
            <div className="p-5 grid grid-cols-3 gap-2">
              {DEPARTMENTS.map(d => (
                <motion.button key={d.id} onClick={() => setActiveDept(d.id)}
                  className={`text-left p-3 rounded-xl border transition-all ${activeDept === d.id ? "border-cyan-400/50 bg-white/10" : "border-white/5 bg-white/3 hover:bg-white/5"}`}
                  animate={{ scale: activeDept === d.id ? 1.03 : 1 }}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${d.bg} flex items-center justify-center mb-2`}>
                    <d.icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-white text-[10px] font-bold leading-tight">{d.name}</p>
                  <p className="text-indigo-300/50 text-[9px] mt-0.5">{d.staff} on · {d.shift}</p>
                </motion.button>
              ))}
            </div>

            {/* Active department detail */}
            <div className="px-5 pb-5">
              <AnimatePresence mode="wait">
                <motion.div key={active.id}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 border border-white/5 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${active.color}25` }}>
                        <active.icon className="w-4 h-4" style={{ color: active.color }} />
                      </div>
                      <span className="text-white text-xs font-bold">{active.name} · Now</span>
                    </div>
                    <span className="text-xs font-bold" style={{ color: active.color }}>{active.staff} on duty</span>
                  </div>

                  {/* Mini staff list */}
                  <div className="space-y-1.5">
                    {[
                      { name: "Sofia M.", role: active.id === "housekeeping" ? "Floors 3–4 · 8 rooms" : active.id === "frontdesk" ? "Reception · AM shift" : active.id === "fb" ? "Restaurant · Server" : active.id === "spa" ? "Therapist · 2 bookings" : active.id === "maintenance" ? "On-call · Engineering" : "Lobby patrol" },
                      { name: "Marcus T.", role: active.id === "housekeeping" ? "Floor 5 · 12 rooms" : active.id === "frontdesk" ? "Bell desk" : active.id === "fb" ? "Bar · Bartender" : active.id === "spa" ? "Therapist · 3 bookings" : active.id === "maintenance" ? "HVAC check" : "Floor patrol" },
                      { name: "Jenna R.", role: active.id === "housekeeping" ? "Public areas" : active.id === "frontdesk" ? "Concierge" : active.id === "fb" ? "Kitchen · Line" : active.id === "spa" ? "Manager · Floor" : active.id === "maintenance" ? "Pool service" : "CCTV monitor" },
                    ].map((p, i) => (
                      <motion.div key={p.name}
                        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center gap-2.5 py-1">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[8px] font-bold"
                          style={{ backgroundColor: active.color }}>
                          {p.name.split(" ").map(w => w[0]).join("")}
                        </div>
                        <span className="text-white text-[11px] font-semibold flex-1 truncate">{p.name}</span>
                        <span className="text-indigo-200/50 text-[9px] truncate max-w-[120px]">{p.role}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom 24h coverage bar */}
            <div className="px-5 pb-5 pt-1">
              <p className="text-indigo-200/50 text-[10px] uppercase tracking-widest mb-2">24-Hour Property Coverage</p>
              <div className="flex gap-0.5 h-3 rounded-full overflow-hidden bg-cyan-950/50">
                {Array.from({ length: 24 }).map((_, h) => {
                  const intensity = h >= 6 && h <= 22 ? 0.7 + Math.sin((h - 6) / 16 * Math.PI) * 0.3 : 0.3;
                  return (
                    <motion.div key={h}
                      initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                      transition={{ delay: 0.6 + h * 0.025, duration: 0.4 }}
                      className="flex-1 origin-bottom rounded-sm"
                      style={{ background: `linear-gradient(to top, ${active.color}, ${active.color}${Math.round(intensity * 100).toString(16)})` }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between mt-1 text-[8px] text-indigo-300/40 font-mono">
                <span>0h</span><span>6h</span><span>12h</span><span>18h</span><span>24h</span>
              </div>
            </div>
          </div>

          {/* Floating: checkout rush */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.4, ...spring }}
            className="hidden md:flex absolute -left-8 top-16 bg-white rounded-2xl shadow-2xl border border-indigo-100 px-3.5 py-2.5 items-center gap-2.5 z-10">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
              <KeySquare className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Check-out rush</p>
              <p className="text-xs font-bold text-gray-800">+4 housekeepers · 11 AM</p>
            </div>
          </motion.div>

          {/* Floating: shift handover */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.9, ...spring }}
            className="hidden md:flex absolute -right-6 bottom-24 bg-white rounded-2xl shadow-2xl border border-teal-100 px-3.5 py-2.5 items-center gap-2.5 z-10">
            <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center">
              <Clock className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Shift Handover</p>
              <p className="text-xs font-bold text-gray-800">Front desk · in 12 min</p>
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
    { v: 6, s: "+", l: "departments per property" },
    { v: 24, s: "/7", l: "live coverage view" },
    { v: 18, s: "%", l: "lower hotel labor cost" },
    { v: 200, s: "+", l: "multi-property groups served" },
  ];
  return (
    <div ref={ref} className="border-y border-indigo-100 bg-gradient-to-r from-indigo-50/30 to-violet-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 divide-y-2 lg:divide-y-0 lg:divide-x divide-indigo-100">
        {items.map((it, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08 }} className="flex flex-col items-center gap-1 px-6 py-4 text-center">
            <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
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
   DEPARTMENTS DEEP-DIVE
══════════════════════════════════ */
function DepartmentsDeepDive() {
  return (
    <section id="departments" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-5">
            <Building2 className="w-3.5 h-3.5" />
            Every Department, One Platform
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Hotels Run on Six Schedules.
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent"> We Coordinate Them All.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Each department gets its own templates, certifications, and shift rules — while property managers see the full picture in one dashboard.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: Bed, name: "Housekeeping", desc: "Room-count assignments based on occupancy. Stayover vs check-out workloads. Floor-by-floor routing.",
              features: ["Auto-assign by occupancy forecast", "Room-credit performance tracking", "Lost & found and request tickets"],
              bg: "from-sky-500 to-cyan-600", glow: "rgba(14,165,233,0.12)",
            },
            {
              icon: ConciergeBell, name: "Front Desk & Concierge", desc: "24/7 reception coverage with shift handover notes, VIP arrival prep, and overnight audit handoffs.",
              features: ["Shift-handover note system", "VIP arrival board", "Overnight audit checklist"],
              bg: "from-teal-500 to-cyan-600", glow: "rgba(20,184,166,0.12)",
            },
            {
              icon: UtensilsCrossed, name: "Food & Beverage", desc: "Restaurant, banquet, bar, room service, and pool deck — all on one F&B schedule with tip pooling.",
              features: ["Banquet event-day staffing", "Tip pool by outlet", "Allergen & cert tracking"],
              bg: "from-emerald-500 to-teal-600", glow: "rgba(16,185,129,0.12)",
            },
            {
              icon: Sparkles, name: "Spa & Wellness", desc: "Treatment-based scheduling. Therapist certifications by modality. Appointment-driven shifts.",
              features: ["Therapist certification routing", "Treatment-based shifts", "Booking integration ready"],
              bg: "from-cyan-500 to-blue-600", glow: "rgba(6,182,212,0.12)",
            },
            {
              icon: Wrench, name: "Engineering & Maintenance", desc: "Preventive maintenance windows, on-call rotations, guest-request response times tracked end-to-end.",
              features: ["On-call rotation builder", "Skill-matched ticket dispatch", "Response SLA tracking"],
              bg: "from-blue-500 to-indigo-600", glow: "rgba(59,130,246,0.12)",
            },
            {
              icon: Shield, name: "Security & Loss Prevention", desc: "Patrol routes, post coverage, incident logging, and overnight handoffs with full audit trails.",
              features: ["Patrol route scheduling", "Post check-in via GPS", "Incident log and reporting"],
              bg: "from-indigo-500 to-blue-600", glow: "rgba(99,102,241,0.12)",
            },
          ].map((d, i) => (
            <motion.div key={d.name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-2xl border border-indigo-100 p-6 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(circle, ${d.glow}, transparent 70%)` }} />
              <div className="relative">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${d.bg} flex items-center justify-center mb-4 shadow-md`}>
                  <d.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{d.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{d.desc}</p>
                <div className="space-y-1.5 pt-3 border-t border-indigo-50">
                  {d.features.map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" />
                      <p className="text-xs text-gray-600">{f}</p>
                    </div>
                  ))}
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
   MULTI-PROPERTY COMMAND CENTER
══════════════════════════════════ */
function MultiProperty() {
  const props = [
    { name: "The Lakeside Resort", rooms: 312, staff: 86, alert: 0, color: "#06b6d4" },
    { name: "Downtown Boutique", rooms: 48, staff: 22, alert: 0, color: "#14b8a6" },
    { name: "Coastal Villa", rooms: 96, staff: 41, alert: 1, color: "#0ea5e9" },
    { name: "Mountain Lodge", rooms: 124, staff: 52, alert: 0, color: "#3b82f6" },
  ];
  return (
    <section className="py-24 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden">
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/3 left-1/3 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Visual */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl border border-indigo-900/40 p-6 shadow-2xl shadow-indigo-900/30">
            <div className="flex items-center justify-between mb-5">
              <p className="text-white text-sm font-bold">Portfolio Overview</p>
              <span className="text-indigo-300/60 text-[10px] uppercase tracking-wider">4 properties</span>
            </div>
            <div className="space-y-2.5">
              {props.map((p, i) => (
                <motion.div key={p.name}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${p.color}30` }}>
                    <Hotel className="w-5 h-5" style={{ color: p.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-bold truncate">{p.name}</p>
                    <p className="text-indigo-300/50 text-[10px]">{p.rooms} rooms · {p.staff} staff on duty</p>
                  </div>
                  {p.alert > 0 ? (
                    <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                      className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold">
                      {p.alert} alert
                    </motion.span>
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  )}
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 mt-5">
              {[
                { l: "Total Rooms", v: "580" },
                { l: "Staff On-Duty", v: "201" },
                { l: "Labor %", v: "24%" },
              ].map((m, i) => (
                <motion.div key={m.l}
                  initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  className="bg-white/5 rounded-lg p-2.5 text-center">
                  <p className="text-indigo-300/60 text-[9px] uppercase tracking-wider">{m.l}</p>
                  <p className="text-white text-lg font-black">{m.v}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-indigo-300/30 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-6">
              <Building2 className="w-3.5 h-3.5" />
              Multi-Property Command Center
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-5">
              One Dashboard for Your
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Entire Hotel Portfolio.</span>
            </h2>
            <p className="text-indigo-100/70 text-lg leading-relaxed mb-6">
              Boutique inns, full-service properties, and resort destinations — see every property at once.
              Identify coverage gaps before they become guest issues. Move staff between sister properties with a tap.
              Run portfolio-wide labor reports without exporting a single spreadsheet.
            </p>
            <div className="space-y-3">
              {[
                "Live property cards with staff-on-duty count",
                "One-tap staff transfer between properties",
                "Portfolio labor cost percentage and revenue per available room",
                "Alert badges for coverage gaps and overtime warnings",
              ].map((line, i) => (
                <motion.div key={line}
                  initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-md bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <p className="text-indigo-100/80 text-sm">{line}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   PROPERTY TYPES
══════════════════════════════════ */
function PropertyTypes() {
  const types = [
    { icon: Hotel, t: "Full-Service Hotels", d: "All-department coordination with union compliance" },
    { icon: Briefcase, t: "Business Hotels", d: "Front desk-heavy with conference and event staffing" },
    { icon: Waves, t: "Resorts & Spas", d: "Multi-amenity (pool, spa, F&B, activities) staffing" },
    { icon: Coffee, t: "Boutique Inns", d: "Lean operations with cross-trained staff" },
    { icon: Building2, t: "Extended-Stay & Aparthotels", d: "Weekly housekeeping cycles and long-stay services" },
    { icon: ParkingCircle, t: "Resort Communities", d: "Multi-property portfolios with shared talent pools" },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Built for Every Property Type
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From a 12-room inn to a 1,200-room resort — the platform scales to your operation.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {types.map((t, i) => (
            <motion.div key={t.t}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-indigo-50/40 to-violet-50/30 border border-indigo-100 hover:border-cyan-300 transition-all duration-200">
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
    <section className="py-24 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-700 relative overflow-hidden">
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-300/20 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-yellow-300 text-yellow-300" />)}
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white leading-relaxed tracking-tight mb-8">
            &ldquo;Coordinating <span className="bg-white/20 px-2 py-0.5 rounded-lg">6 departments across 4 properties</span> used to mean six different spreadsheets
            and constant phone calls between GMs. Now I see everything in one dashboard. Coverage gaps surface before service breaks.
            Best operational decision we&apos;ve made in three years.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-300 to-violet-400 flex items-center justify-center text-white text-base font-black shadow-lg">
              KH
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-lg">Katherine H.</p>
              <p className="text-indigo-100/80 text-sm">VP Operations · 4-property boutique hotel group</p>
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
    { q: "How is hotel scheduling different from regular employee scheduling?", a: "Hotels run 24/7 across 6+ distinct departments with different shift patterns, certifications, and labor rules. Housekeeping schedules by room-count and occupancy forecast. Front desk needs continuous coverage with shift-handover notes. F&B includes tip pooling. Engineering runs on-call rotations. Generic scheduling tools can't handle all of these at once. StaffSchedule.io was built specifically for the multi-department, multi-property, 24/7 reality of hotels." },
    { q: "Can the system handle multiple hotel departments?", a: "Yes. Six core hotel departments are pre-configured (Housekeeping, Front Desk, F&B, Spa, Engineering, Security) with industry-specific templates, certifications, and shift rules. Add custom departments (Valet, Recreation, Sales) as needed. Department heads schedule independently; property managers see the full picture." },
    { q: "Does it support 24/7 hotel operations?", a: "Yes. The 24-hour coverage view shows exactly who is on-property every hour. Overnight shifts are tracked with handover notes. Night audit checklists, early-morning prep windows, and late-night arrivals are all built into the workflow. No coverage gaps, no missed handoffs." },
    { q: "Can I manage multiple properties from one account?", a: "Absolutely. The multi-property command center shows your entire portfolio at once. Move staff between sister properties with a tap. Run portfolio-wide labor reports. Built for boutique hotel groups (2–10 properties) up to enterprise chains (100+)." },
    { q: "Does it handle union shift rules and labor compliance?", a: "Yes. Union-specific rules (minimum-hour guarantees, seniority bidding, mandatory rest periods, holiday rotation, premium-pay triggers) are configurable per property or per department. Full audit logs prove compliance. Built with input from CBA-governed hotel operators." },
    { q: "Can housekeeping be scheduled by room-count and occupancy?", a: "Yes. Pull occupancy forecasts (manually or via PMS integration), and the system auto-suggests housekeeping coverage by floor and shift. Track room credits per housekeeper, stayover vs check-out workloads, and public-area coverage." },
    { q: "How fast can a hotel property launch on StaffSchedule.io?", a: "Most boutique hotels run their first week's schedule on day one. Full-service hotels with union compliance and 6+ departments typically need 3–5 days for the initial configuration. Multi-property groups roll out one property at a time, usually completing the portfolio within 2–4 weeks." },
    { q: "Does it integrate with hotel payroll providers?", a: "Yes. Approved timesheets flow to ADP, Gusto, QuickBooks, and major payroll providers. F&B tips, housekeeping room-based bonuses, on-call differentials, and overnight premiums are all calculated correctly. Payroll runs in under an hour instead of two days." },
  ];
  return (
    <section className="py-24 bg-indigo-50/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Hotel Scheduling, Answered
          </h2>
          <p className="text-gray-500 text-lg">Common questions from GMs, operations directors, and hotel owners.</p>
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
            <Hotel className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Your Property, Always Covered.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Every Department. Every Hour.</span>
          </h2>
          <p className="text-indigo-100/70 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Start free. Schedule your next week across every department. Live in under an hour.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl shadow-indigo-900/50">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              Talk to a Hospitality Specialist
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {["24/7 coverage", "Multi-property ready", "Union-compliant", "Live on day one"].map((t) => (
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
export default function HotelsResortsPage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <DepartmentsDeepDive />
      <MultiProperty />
      <PropertyTypes />
      <TestimonialSection />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
