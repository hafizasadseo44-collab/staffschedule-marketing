"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion, useInView, AnimatePresence,
  type Variants, type Transition,
} from "framer-motion";
import {
  ArrowRight, CheckCircle2, Star, ChevronDown,
  PartyPopper, Mic2, Users, Truck, Package,
  Calendar, Clock, MessageSquare, MapPin, Sparkles,
  Music, Camera, Wine, Cake, Heart, Megaphone,
  Building2, Zap, Tag, Bell, ChefHat, Award,
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
   HERO — Event timeline visualization
══════════════════════════════════ */
function HeroSection() {
  const [playPos, setPlayPos] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPlayPos(p => (p + 1) % 100), 80);
    return () => clearInterval(id);
  }, []);

  const phases = [
    { label: "Load-In", start: 0, end: 18, color: "#a855f7", crew: 4 },
    { label: "Setup", start: 18, end: 38, color: "#d946ef", crew: 12 },
    { label: "Service", start: 38, end: 78, color: "#ec4899", crew: 22 },
    { label: "Breakdown", start: 78, end: 95, color: "#f43f5e", crew: 8 },
    { label: "Load-Out", start: 95, end: 100, color: "#8b5cf6", crew: 4 },
  ];
  const activePhase = phases.find(p => playPos >= p.start && playPos < p.end) ?? phases[0];

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
            <PartyPopper className="w-3.5 h-3.5" />
            For Events · Catering · Production
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl xl:text-[3.5rem] font-black text-white leading-[1.07] tracking-tight mb-6">
            Event Staff Scheduling{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              From Booking to Breakdown
            </span>
            .
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-indigo-100/70 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            Roster temp crews. Coordinate multi-venue events. Run day-of-event from your phone.
            Built for caterers, event producers, and venue operators who live by the next booking.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-900/50">
              Start Free for Your Event Business <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#event-lifecycle"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              See Event Lifecycle Demo
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 justify-center lg:justify-start text-xs text-indigo-200/60">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Built for temp crews</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> W-2 + 1099 support</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Multi-venue ready</span>
          </motion.div>
        </motion.div>

        {/* Right — animated event timeline */}
        <motion.div
          initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative w-full"
        >
          <div className="relative bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl border border-fuchsia-900/40 shadow-2xl shadow-indigo-900/30 overflow-hidden p-6">
            {/* Event header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-4 h-4 text-pink-400" />
                  <p className="text-indigo-200/60 text-[10px] font-bold tracking-widest uppercase">Tonight&apos;s Event</p>
                </div>
                <p className="text-white text-base font-black">Anderson Wedding Reception</p>
                <p className="text-indigo-300/50 text-xs">Lakefront Pavilion · 180 guests</p>
              </div>
              <div className="text-right">
                <p className="text-white text-xl font-black tabular-nums">{activePhase.label}</p>
                <p className="text-indigo-300/60 text-[10px] uppercase tracking-wider">Live now</p>
              </div>
            </div>

            {/* Phase timeline */}
            <div className="relative h-8 bg-fuchsia-950/40 rounded-full overflow-hidden mb-2">
              {phases.map(p => (
                <div key={p.label}
                  className="absolute top-0 bottom-0"
                  style={{
                    left: `${p.start}%`, width: `${p.end - p.start}%`,
                    background: `linear-gradient(to right, ${p.color}80, ${p.color}40)`,
                  }}
                />
              ))}
              {/* Playhead */}
              <motion.div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
                style={{ left: `${playPos}%` }}
                animate={{ boxShadow: ["0 0 8px rgba(255,255,255,0.6)", "0 0 16px rgba(255,255,255,1)", "0 0 8px rgba(255,255,255,0.6)"] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white" />
              </motion.div>
            </div>
            <div className="flex justify-between text-[9px] text-indigo-300/40 font-mono mb-5">
              <span>2:00 PM</span><span>4:00 PM</span><span>6:00 PM</span><span>10:00 PM</span><span>11:30 PM</span>
            </div>

            {/* Phase chips */}
            <div className="grid grid-cols-5 gap-1.5 mb-5">
              {phases.map((p) => (
                <motion.div key={p.label}
                  animate={{
                    scale: activePhase.label === p.label ? 1.05 : 1,
                    opacity: activePhase.label === p.label ? 1 : 0.4,
                  }}
                  className={`rounded-lg p-2 text-center transition-all ${activePhase.label === p.label ? "border" : "border border-transparent"}`}
                  style={activePhase.label === p.label ? { backgroundColor: `${p.color}25`, borderColor: `${p.color}80` } : { backgroundColor: "rgba(255,255,255,0.03)" }}
                >
                  <p className="text-[8px] font-black tracking-wider text-white truncate">{p.label.toUpperCase()}</p>
                  <p className="text-[10px] font-bold mt-0.5" style={{ color: activePhase.label === p.label ? p.color : "rgba(255,255,255,0.4)" }}>{p.crew}</p>
                </motion.div>
              ))}
            </div>

            {/* Active crew list */}
            <AnimatePresence mode="wait">
              <motion.div key={activePhase.label}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 border border-white/5 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white text-xs font-bold">{activePhase.label} Crew On-Site</p>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ backgroundColor: `${activePhase.color}30`, color: activePhase.color }}>
                    {activePhase.crew} confirmed
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "Alex K.", role: "Lead Server", color: "#ec4899" },
                    { name: "Marcus T.", role: "Bartender", color: "#a855f7" },
                    { name: "Jenna R.", role: "AV Tech", color: "#d946ef" },
                  ].map((p, i) => (
                    <motion.div key={p.name}
                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[9px] font-bold"
                        style={{ backgroundColor: p.color }}>
                        {p.name.split(" ").map(w => w[0]).join("")}
                      </div>
                      <span className="text-white text-[11px] font-semibold flex-1">{p.name}</span>
                      <span className="text-indigo-300/60 text-[10px]">{p.role}</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Floating: live message */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.4, ...spring }}
            className="hidden md:flex absolute -left-6 top-16 bg-white rounded-2xl shadow-2xl border border-indigo-100 px-3.5 py-2.5 items-center gap-2.5 z-10">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Event Chat</p>
              <p className="text-xs font-bold text-gray-800">Cake table moved to gazebo</p>
            </div>
          </motion.div>

          {/* Floating: GPS check-in */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.9, ...spring }}
            className="hidden md:flex absolute -right-4 -bottom-4 bg-white rounded-2xl shadow-2xl border border-violet-100 px-3.5 py-2.5 items-center gap-2.5 z-10">
            <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-violet-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">GPS Checked-in</p>
              <p className="text-xs font-bold text-gray-800">Jenna R. on-site · 14:02</p>
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
    { v: 10, s: "×", l: "faster crew rostering" },
    { v: 95, s: "%", l: "day-of crew show-up rate" },
    { v: 5, s: " min", l: "to confirm a new booking" },
    { v: 100, s: "+", l: "events per week supported" },
  ];
  return (
    <div ref={ref} className="border-y border-indigo-100 bg-gradient-to-r from-indigo-50/30 to-violet-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 divide-y-2 lg:divide-y-0 lg:divide-x divide-indigo-100">
        {items.map((it, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08 }} className="flex flex-col items-center gap-1 px-6 py-4 text-center">
            <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
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
   EVENT LIFECYCLE — 5 phases
══════════════════════════════════ */
function EventLifecycle() {
  const phases = [
    {
      icon: Calendar, color: "#a855f7", bg: "from-purple-500 to-violet-600",
      title: "Booking Confirmed", subtitle: "Day -14",
      desc: "Client signs the contract. Event auto-creates with timeline blocks (load-in, setup, service, breakdown).",
      action: "Crew positions defined by event type — 12 servers, 4 bartenders, 2 AV techs for a 180-person wedding.",
    },
    {
      icon: Users, color: "#d946ef", bg: "from-indigo-600 to-violet-600",
      title: "Crew Roster Built", subtitle: "Day -10 to -3",
      desc: "Available temp staff with matching skill tags get notified. They accept or decline from the mobile app.",
      action: "Roster fills automatically based on availability, skills, and proximity to venue.",
    },
    {
      icon: MessageSquare, color: "#ec4899", bg: "from-pink-500 to-rose-600",
      title: "Pre-Event Briefing", subtitle: "Day -1",
      desc: "Event chat opens 24 hours before. Coordinators share floor plans, run-of-show, dietary lists, special requests.",
      action: "Every confirmed crew member gets the brief — read receipts confirm they saw it.",
    },
    {
      icon: MapPin, color: "#f43f5e", bg: "from-rose-500 to-red-600",
      title: "Event Day Live", subtitle: "Day 0",
      desc: "Crews GPS-check-in at the venue. Live timeline runs. Real-time updates flow through the event chat.",
      action: "Coordinators see who's on-site, who's running late, and broadcast updates instantly.",
    },
    {
      icon: CheckCircle2, color: "#8b5cf6", bg: "from-violet-500 to-purple-600",
      title: "Payroll-Ready", subtitle: "Day +1",
      desc: "Timesheets auto-generate from GPS clock-outs. W-2 staff and 1099 freelancers both flow to payroll.",
      action: "Tips, overtime, and per-event rates calculated automatically. Pay out in days, not weeks.",
    },
  ];

  return (
    <section id="event-lifecycle" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            From Booking to Breakdown
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Every Event, Coordinated
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent"> Through One Continuous Workflow</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Five phases. One platform. No spreadsheets, no group texts, no panicked phone calls at 6 PM.
          </p>
        </motion.div>

        {/* Vertical timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-fuchsia-200 to-rose-200 sm:-translate-x-1/2" />

          {phases.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className={`relative flex mb-12 last:mb-0 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}
            >
              {/* Dot */}
              <div className="absolute left-6 sm:left-1/2 top-6 sm:-translate-x-1/2 z-10">
                <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.bg} flex items-center justify-center shadow-xl`}
                  style={{ boxShadow: `0 10px 30px ${p.color}40` }}>
                  <p.icon className="w-5 h-5 text-white" />
                </motion.div>
              </div>

              {/* Card */}
              <div className={`ml-20 sm:ml-0 sm:w-[calc(50%-3rem)] ${i % 2 === 0 ? "sm:mr-auto sm:pr-12" : "sm:ml-auto sm:pl-12"}`}>
                <div className="bg-gradient-to-br from-white to-fuchsia-50/30 border border-indigo-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
                  <p className="text-[10px] font-black tracking-widest uppercase mb-2" style={{ color: p.color }}>{p.subtitle}</p>
                  <h3 className="text-xl font-black text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{p.desc}</p>
                  <div className="flex items-start gap-2 pt-3 border-t border-indigo-50">
                    <Zap className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: p.color }} />
                    <p className="text-xs font-semibold text-gray-700 leading-relaxed">{p.action}</p>
                  </div>
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
   SKILL TAG ROSTERING
══════════════════════════════════ */
function SkillRostering() {
  const skills = [
    { icon: Wine, name: "Bartender", count: 18, color: "#a855f7" },
    { icon: Users, name: "Server", count: 42, color: "#d946ef" },
    { icon: ChefHat, name: "Prep Cook", count: 14, color: "#ec4899" },
    { icon: Mic2, name: "AV Tech", count: 6, color: "#f43f5e" },
    { icon: Camera, name: "Photographer", count: 4, color: "#fb7185" },
    { icon: Package, name: "Setup Crew", count: 22, color: "#8b5cf6" },
    { icon: Megaphone, name: "Event Lead", count: 8, color: "#9333ea" },
    { icon: Truck, name: "Logistics", count: 11, color: "#c026d3" },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden">
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/3 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-indigo-300/30 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-6">
              <Tag className="w-3.5 h-3.5" />
              Skill-Based Crew Matching
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-5">
              Right Crew, Right Skill,
              <br />
              <span className="bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Right Event.</span>
            </h2>
            <p className="text-indigo-100/70 text-lg leading-relaxed mb-7">
              Every crew member carries skill tags: bartender, AV tech, server, setup, security, photographer.
              When you book an event, the system suggests the perfect crew composition automatically.
              Cross-check availability, certifications, and venue proximity in one screen.
            </p>
            <div className="space-y-3">
              {[
                "Tag staff with unlimited skills and certifications",
                "Auto-suggest crew based on event type and size",
                "Filter by proximity to venue, certifications, or availability",
                "Save crew templates for repeat events (corporate, wedding, fundraiser)",
              ].map((line, i) => (
                <motion.div key={line}
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
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

          {/* Skill tag grid */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-3">
            {skills.map((s, i) => (
              <motion.div key={s.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.06 }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 cursor-pointer hover:bg-white/10 transition-colors duration-200">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${s.color}25` }}>
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <p className="text-white text-sm font-bold mb-1">{s.name}</p>
                <p className="text-indigo-200/50 text-xs">{s.count} available crew</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   EVENT TYPES
══════════════════════════════════ */
function EventTypes() {
  const types = [
    { icon: Heart, t: "Weddings", d: "Reception flow, vendor coordination, day-of timeline", grad: "from-pink-500 to-rose-600" },
    { icon: Building2, t: "Corporate Events", d: "Conferences, brand launches, executive meetings", grad: "from-purple-500 to-fuchsia-600" },
    { icon: Music, t: "Festivals & Concerts", d: "Multi-stage crews, security, hospitality", grad: "from-indigo-600 to-violet-600" },
    { icon: Award, t: "Fundraisers & Galas", d: "Auction support, sponsor handling, VIP service", grad: "from-violet-500 to-purple-600" },
    { icon: PartyPopper, t: "Private Parties", d: "Birthdays, anniversaries, milestones", grad: "from-rose-500 to-red-500" },
    { icon: Cake, t: "Catering Operations", d: "Off-site service, prep crews, drop-off logistics", grad: "from-amber-500 to-pink-500" },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Built for Every Type of Event
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From a 20-guest dinner to a 5,000-attendee festival — the platform scales without breaking a sweat.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {types.map((t, i) => (
            <motion.div key={t.t}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="group p-6 rounded-2xl bg-gradient-to-br from-indigo-50/40 to-violet-50/30 border border-indigo-100 hover:border-fuchsia-300 hover:shadow-xl transition-all duration-300">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.grad} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-200`}>
                <t.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-lg font-bold text-gray-900 mb-1.5">{t.t}</p>
              <p className="text-sm text-gray-500">{t.d}</p>
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
            &ldquo;We run <span className="bg-white/20 px-2 py-0.5 rounded-lg">25+ events a week</span> across four venues
            with a roster of 200 freelancers. StaffSchedule replaced the spreadsheets, the WhatsApp threads,
            and the 11 PM phone calls. Day-of coordination has never been smoother.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-fuchsia-300 to-pink-400 flex items-center justify-center text-white text-base font-black shadow-lg">
              DP
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-lg">David P.</p>
              <p className="text-indigo-100/80 text-sm">Founder · Premier Events Group · 200+ freelance crew</p>
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
    { q: "How is event staff scheduling different from regular employee scheduling?", a: "Event crews are temporary, freelance, and assignment-based — not recurring weekly shifts. StaffSchedule.io is built around the event lifecycle (booking → roster → briefing → service → payroll), not the standard work week. Crew members can be on multiple events per week across multiple venues, with different roles each time. The platform tracks all of it." },
    { q: "Can I manage a roster of freelance event staff?", a: "Yes. Build a roster of vetted freelancers tagged with skills (bartender, AV, security, server), certifications (alcohol service, ServSafe), and availability windows. When you book an event, the system suggests the right crew. They accept via mobile app, get paid as 1099 contractors, and you keep an audit trail." },
    { q: "How does day-of-event coordination work?", a: "24 hours before load-in, an event-specific group chat opens automatically. The coordinator shares the floor plan, run-of-show, special requests, and contact info. Crew members GPS-check-in at the venue. Updates flow through the chat in real time. Once the event ends, the chat archives and timesheets are payroll-ready." },
    { q: "Can I run multiple events at the same time across different venues?", a: "Absolutely. The multi-venue dashboard shows every event happening today. See who's on-site at each, broadcast updates to specific venues, and reassign crew between events if needed. Built for catering companies and event firms running 3–25 events on a Saturday." },
    { q: "Does it work for both W-2 employees and 1099 freelancers?", a: "Yes. Both classifications are supported. Hours flow to payroll with the right tax treatment. Tips, overtime, and per-event rates work for both. Most event companies have a hybrid workforce — the platform handles it natively." },
    { q: "Can I save crew templates for repeat events?", a: "Yes. Define a 'Wedding · 150 guest' template with 12 servers, 4 bartenders, 2 AV techs, 1 lead — and apply it to every wedding booking in seconds. Same for corporate events, festivals, fundraisers. The roster builds itself." },
    { q: "What does it cost for an event company?", a: "Plans scale with team size — every plan includes every feature. Most event companies fall in the mid-tier. Start with the 14-day free trial (no credit card) and pick the right plan when you're ready to scale." },
    { q: "How fast can my event business get set up?", a: "Most event firms run their first event on the platform within 48 hours. The setup wizard imports your crew roster, applies the event-industry preset (skill tags, common roles, GPS clock-in), and walks you through your first booking. Live training is included on every plan." },
  ];
  return (
    <section className="py-24 bg-indigo-50/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Event Scheduling, Answered
          </h2>
          <p className="text-gray-500 text-lg">Common questions from caterers, event producers, and venue operators.</p>
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
            <PartyPopper className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Your Next Event,
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Fully Coordinated.</span>
          </h2>
          <p className="text-indigo-100/70 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Start free. Run your next booking on StaffSchedule.io. See your team breathe easier.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl shadow-indigo-900/50">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              Talk to an Events Specialist
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {["W-2 + 1099 ready", "14-day free trial", "Multi-venue support", "Cancel anytime"].map((t) => (
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
export default function EventsCateringPage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <EventLifecycle />
      <SkillRostering />
      <EventTypes />
      <TestimonialSection />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
