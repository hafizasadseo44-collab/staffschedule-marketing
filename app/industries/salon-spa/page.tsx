"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion, useInView, AnimatePresence,
  type Variants, type Transition,
} from "framer-motion";
import {
  ArrowRight, CheckCircle2, Star, ChevronDown,
  Scissors, Sparkles, Flower2, Wand2, Palette,
  Heart, Users, Calendar, Clock, DollarSign,
  Award, Shield, Bell, MessageSquare, Repeat,
  TrendingUp, ShoppingBag, Crown, Gem,
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

/* Sample appointment book data — stylist columns */
const STYLISTS = [
  { name: "Isabella", role: "Senior Stylist", color: "#d4af37", initials: "IS" },
  { name: "Maya", role: "Color Specialist", color: "#10b981", initials: "MA" },
  { name: "Aiden", role: "Stylist", color: "#0d9488", initials: "AI" },
  { name: "Sofia", role: "Therapist", color: "#059669", initials: "SO" },
];

const APPOINTMENTS = [
  // [stylistIdx, startHour(0-7 covering 9am-5pm), durationHours, service, client]
  { si: 0, s: 0, d: 1.5, svc: "Cut & Color", client: "J. Park" },
  { si: 0, s: 2, d: 1, svc: "Blowout", client: "L. Chen" },
  { si: 0, s: 4, d: 2, svc: "Full Highlights", client: "VIP" },
  { si: 1, s: 0.5, d: 2, svc: "Balayage", client: "R. Singh" },
  { si: 1, s: 3, d: 1.5, svc: "Color Touch-up", client: "M. Diaz" },
  { si: 1, s: 5.5, d: 1, svc: "Toner", client: "Walk-in" },
  { si: 2, s: 1, d: 1, svc: "Men's Cut", client: "T. Kim" },
  { si: 2, s: 2.5, d: 0.75, svc: "Buzz Cut", client: "J. Lee" },
  { si: 2, s: 4, d: 1, svc: "Beard Trim", client: "D. Ng" },
  { si: 2, s: 5.5, d: 1, svc: "Men's Cut", client: "K. Sato" },
  { si: 3, s: 0, d: 1.5, svc: "Facial · Room 2", client: "S. Vega" },
  { si: 3, s: 2, d: 1, svc: "Brow Wax", client: "C. Mori" },
  { si: 3, s: 3.5, d: 2, svc: "90-min Massage", client: "VIP" },
];

const TIME_SLOTS = ["9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p"];

/* ══════════════════════════════════
   HERO — Appointment Book
══════════════════════════════════ */
function HeroSection() {
  const [highlight, setHighlight] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setHighlight(h => (h + 1) % APPOINTMENTS.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0a1a14] via-[#0f2820] to-[#0a1a14] overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.18, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1, 1.22, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl" />
      </div>
      {/* gold accent gradient overlay */}
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-amber-500/[0.03] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left copy */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="text-center lg:text-left">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-amber-300/40 text-amber-200 text-xs font-bold tracking-widest uppercase mb-6">
            <Scissors className="w-3.5 h-3.5" />
            For Salons · Spas · Barbershops · Med Spas
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl xl:text-[3.5rem] font-black text-white leading-[1.07] tracking-tight mb-6">
            Salon Scheduling, as{" "}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-300 bg-clip-text text-transparent">
              Considered as Your Craft
            </span>
            .
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-emerald-100/70 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            Beautifully designed scheduling for stylists, therapists, and beauty teams.
            Commission-aware. Appointment-aware. Treatment-room-aware. Built for businesses where every minute on the chair matters.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-900/40">
              Start Free for Your Salon <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#chair-view"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              Tour the Chair View
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 justify-center lg:justify-start text-xs text-amber-200/60">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> 14-day free trial</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Commission-ready</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Treatment room support</span>
          </motion.div>
        </motion.div>

        {/* Right — Appointment Book Dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative w-full"
        >
          <div className="relative bg-gradient-to-br from-[#0f2820] to-[#0a1a14] rounded-2xl border border-emerald-900/40 shadow-2xl shadow-emerald-900/30 overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-emerald-900/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-emerald-600 flex items-center justify-center">
                  <Crown className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-tight">Maison Belle · Today</p>
                  <p className="text-amber-200/50 text-[10px]">4 stylists · 13 bookings · 87% chair time</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold tracking-widest">
                LIVE
              </span>
            </div>

            {/* Stylist column headers */}
            <div className="grid grid-cols-[40px_repeat(4,1fr)] border-b border-emerald-900/30">
              <div></div>
              {STYLISTS.map(s => (
                <div key={s.name} className="px-2 py-2.5 border-l border-emerald-900/20 text-center">
                  <div className="w-7 h-7 rounded-full mx-auto flex items-center justify-center text-white text-[10px] font-bold mb-0.5"
                    style={{ backgroundColor: s.color }}>
                    {s.initials}
                  </div>
                  <p className="text-white text-[10px] font-bold truncate">{s.name}</p>
                  <p className="text-emerald-200/40 text-[8px] truncate">{s.role}</p>
                </div>
              ))}
            </div>

            {/* Time grid */}
            <div className="grid grid-cols-[40px_repeat(4,1fr)] relative" style={{ height: 280 }}>
              {/* time labels */}
              {TIME_SLOTS.map((t, i) => (
                <div key={t} className="absolute left-0 w-10 text-right pr-1.5 text-[9px] font-mono text-emerald-300/40"
                  style={{ top: `${(i / TIME_SLOTS.length) * 100}%` }}>
                  {t}
                </div>
              ))}

              {/* stylist columns with grid lines */}
              {STYLISTS.map((s, si) => (
                <div key={s.name} className="relative border-l border-emerald-900/20 col-start-[var(--col)]"
                  style={{ gridColumn: si + 2 }}>
                  {TIME_SLOTS.map((_, ti) => (
                    <div key={ti} className="absolute left-0 right-0 border-t border-emerald-900/10"
                      style={{ top: `${(ti / TIME_SLOTS.length) * 100}%` }} />
                  ))}
                </div>
              ))}

              {/* appointment blocks */}
              {APPOINTMENTS.map((apt, ai) => {
                const stylist = STYLISTS[apt.si];
                const top = (apt.s / TIME_SLOTS.length) * 100;
                const height = (apt.d / TIME_SLOTS.length) * 100;
                const isHighlight = ai === highlight;
                return (
                  <motion.div key={ai}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: isHighlight ? 1 : 0.55,
                      scale: isHighlight ? 1.03 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                    className={`absolute mx-0.5 rounded-md overflow-hidden cursor-pointer transition-shadow`}
                    style={{
                      left: `calc(40px + ${(apt.si / 4) * (100 - 40 / 5)}% + ${apt.si * 0}px)`,
                      width: `calc((100% - 40px) / 4 - 4px)`,
                      top: `${top}%`,
                      height: `${height}%`,
                      background: `linear-gradient(135deg, ${stylist.color}40, ${stylist.color}25)`,
                      border: `1px solid ${stylist.color}${isHighlight ? "ff" : "50"}`,
                      boxShadow: isHighlight ? `0 8px 20px ${stylist.color}40` : "none",
                    }}
                  >
                    <div className="px-1.5 py-1">
                      <p className="text-white text-[9px] font-bold truncate leading-tight">{apt.svc}</p>
                      <p className="text-white/70 text-[8px] truncate leading-tight">{apt.client}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom utilization bar */}
            <div className="px-5 py-3 bg-gradient-to-r from-emerald-950/40 to-amber-950/30 border-t border-emerald-900/30 flex items-center justify-between">
              <div>
                <p className="text-amber-200/50 text-[9px] uppercase tracking-widest">Today&apos;s Chair Utilization</p>
                <p className="text-white text-sm font-bold">87% booked · $4,280 service revenue</p>
              </div>
              <Gem className="w-4 h-4 text-amber-300" />
            </div>
          </div>

          {/* Floating: commission earned */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.4, ...spring }}
            className="hidden md:flex absolute -left-8 top-16 bg-white rounded-2xl shadow-2xl border border-amber-100 px-3.5 py-2.5 items-center gap-2.5 z-10">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Commission</p>
              <p className="text-xs font-bold text-gray-800">Isabella: $312 today</p>
            </div>
          </motion.div>

          {/* Floating: VIP client */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.9, ...spring }}
            className="hidden md:flex absolute -right-4 bottom-20 bg-white rounded-2xl shadow-2xl border border-emerald-100 px-3.5 py-2.5 items-center gap-2.5 z-10">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Crown className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">VIP Client</p>
              <p className="text-xs font-bold text-gray-800">Allergies noted · Room 2</p>
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
    { v: 87, s: "%", l: "average chair utilization" },
    { v: 12, s: " hrs", l: "saved on weekly admin" },
    { v: 100, s: "%", l: "commission tracking accuracy" },
    { v: 4.9, s: "/5", l: "salon team adoption rating" },
  ];
  return (
    <div ref={ref} className="border-y border-emerald-100 bg-gradient-to-r from-emerald-50/30 to-amber-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 divide-y-2 lg:divide-y-0 lg:divide-x divide-emerald-100">
        {items.map((it, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08 }} className="flex flex-col items-center gap-1 px-6 py-4 text-center">
            <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-emerald-600 via-amber-500 to-amber-600 bg-clip-text text-transparent">
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
   STYLIST'S DAY — Interactive Timeline
══════════════════════════════════ */
function StylistDayTimeline() {
  const [moment, setMoment] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  const moments = [
    { t: "9:00 AM", title: "Day opens with a tap", body: "Stylist sees today's appointments on her phone before she walks in. Commission target, VIP arrivals, and product targets all visible.", icon: Calendar, color: "#d4af37" },
    { t: "10:30 AM", title: "Walk-in arrives", body: "Front desk checks availability across all stylists in one view. Books the walk-in into Aiden's open 11 AM slot. No paper diary needed.", icon: Sparkles, color: "#10b981" },
    { t: "1:15 PM", title: "Color formula recorded", body: "Maya logs the exact color formula for J. Park against the appointment. Next visit, the formula is right there in the booking notes.", icon: Palette, color: "#0d9488" },
    { t: "3:00 PM", title: "Mid-shift swap request", body: "Aiden needs to leave early. Posts a swap. Sofia accepts the 4-5 PM gap, gets the appointment context, and seamlessly takes over.", icon: Repeat, color: "#059669" },
    { t: "End of Day", title: "Commission settled, payroll-ready", body: "Service revenue, retail upsells, tips, and hours all auto-calculated. Sunday timesheet sync to payroll is a one-click affair.", icon: DollarSign, color: "#d4af37" },
  ];

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setMoment(m => (m + 1) % moments.length), 2600);
    return () => clearInterval(id);
  }, [inView, moments.length]);

  return (
    <section id="chair-view" className="py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold tracking-widest uppercase mb-5">
            <Wand2 className="w-3.5 h-3.5" />
            A Day in the Chair
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            One Stylist&apos;s Day
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-amber-600 to-emerald-600 bg-clip-text text-transparent"> From Tap-In to Tap-Out.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            How appointment-aware scheduling, commission tracking, and on-the-fly swaps feel from a stylist&apos;s point of view.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-3">
          {moments.map((m, i) => (
            <motion.button key={i} onClick={() => setMoment(i)}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-300 ${moment === i ? "border-amber-300 bg-amber-50/50 shadow-lg shadow-amber-100 scale-[1.02]" : "border-gray-100 bg-white hover:border-gray-200"}`}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${m.color}20` }}>
                <m.icon className="w-5 h-5" style={{ color: m.color }} />
              </div>
              <p className="text-[10px] font-black tracking-widest uppercase mb-1.5" style={{ color: m.color }}>{m.t}</p>
              <p className="text-sm font-bold text-gray-900 mb-1.5 leading-tight">{m.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{m.body}</p>
              {moment === i && (
                <motion.div layoutId="activeStylistMoment"
                  className="absolute -bottom-1 left-4 right-4 h-1 rounded-full"
                  style={{ background: `linear-gradient(to right, ${m.color}, ${m.color}80)` }} />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   COMMISSION & SERVICE TRACKING
══════════════════════════════════ */
function CommissionSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#0a1a14] via-[#0f2820] to-[#0a1a14] relative overflow-hidden">
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }} transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/3 right-1/3 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Visual */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="bg-gradient-to-br from-[#0f2820] to-[#0a1a14] rounded-2xl border border-emerald-900/40 p-6 shadow-2xl shadow-emerald-900/30">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-white text-sm font-bold">Weekly Commission · Isabella</p>
                <p className="text-emerald-300/50 text-[10px]">Senior Stylist · 38 hrs · 22 services</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
                40% TIER
              </span>
            </div>

            <div className="space-y-2.5 mb-5">
              {[
                { label: "Cut & Color services", amount: "$2,140", commission: "$856", color: "#d4af37" },
                { label: "Highlight services", amount: "$1,680", commission: "$672", color: "#10b981" },
                { label: "Blowouts", amount: "$420", commission: "$168", color: "#059669" },
                { label: "Retail product (10%)", amount: "$340", commission: "$34", color: "#fbbf24" },
              ].map((row, i) => (
                <motion.div key={row.label}
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: row.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-semibold truncate">{row.label}</p>
                    <p className="text-emerald-300/50 text-[10px]">Revenue: {row.amount}</p>
                  </div>
                  <p className="text-amber-300 text-sm font-bold tabular-nums">{row.commission}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-center">
                <p className="text-amber-300/70 text-[9px] uppercase tracking-wider">Commission Total</p>
                <p className="text-amber-200 text-2xl font-black">$1,730</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-center">
                <p className="text-emerald-300/70 text-[9px] uppercase tracking-wider">Hourly Wage</p>
                <p className="text-emerald-200 text-2xl font-black">$760</p>
              </motion.div>
            </div>
            <p className="text-center text-emerald-200/60 text-[10px] mt-3">Both flow to payroll automatically · Friday sync</p>
          </motion.div>

          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-amber-300/30 text-amber-300 text-xs font-bold tracking-widest uppercase mb-6">
              <DollarSign className="w-3.5 h-3.5" />
              Commission, Done Right
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-5">
              Hourly Wages + Service Commissions
              <br />
              <span className="bg-gradient-to-r from-amber-300 to-emerald-300 bg-clip-text text-transparent">Calculated Automatically.</span>
            </h2>
            <p className="text-emerald-100/70 text-lg leading-relaxed mb-6">
              Every salon and spa has its own pay model — commission tiers per stylist, service category, or seniority level.
              StaffSchedule.io handles all of them and syncs both wages and commission to payroll on the same line.
            </p>
            <div className="space-y-3">
              {[
                "Commission tiers by stylist or service type (cut, color, treatment)",
                "Retail product commission tracked alongside service",
                "Tip pooling for back-bar and front-desk staff",
                "Auto-sync to payroll with W-2 or 1099 classification",
              ].map((line, i) => (
                <motion.div key={line}
                  initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-md bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <p className="text-emerald-100/80 text-sm">{line}</p>
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
   FEATURES GRID
══════════════════════════════════ */
function FeaturesGrid() {
  const feats = [
    { icon: Calendar, t: "Appointment-Aware Scheduling", d: "Coverage matches your booking density. No overstaffing slow afternoons, no understaffing Saturday morning.", grad: "from-amber-500 to-yellow-600" },
    { icon: DollarSign, t: "Commission & Tip Tracking", d: "Service commissions, retail product commissions, and tip pools — all calculated and synced to payroll.", grad: "from-emerald-500 to-teal-600" },
    { icon: Shield, t: "Service Certification Gating", d: "Only certified colorists are scheduled for color services. Med-spa licenses respected. Audit-ready.", grad: "from-teal-500 to-emerald-600" },
    { icon: Sparkles, t: "Treatment Room Assignment", d: "Schedule rooms and chairs as resources. No double-bookings. Utilization reports show what&apos;s working.", grad: "from-yellow-500 to-amber-600" },
    { icon: Heart, t: "Client Preferences & VIP Notes", d: "Allergies, formulas, preferred products — visible to whoever takes the appointment.", grad: "from-rose-500 to-amber-500" },
    { icon: Repeat, t: "Appointment-Safe Shift Swaps", d: "Stylist swaps respect existing bookings. A client booked with Maya won&apos;t accidentally be reassigned to a different stylist.", grad: "from-emerald-600 to-teal-700" },
    { icon: ShoppingBag, t: "Retail Upsell Tracking", d: "See which stylists drive product sales. Recognize top performers with data, not guesswork.", grad: "from-amber-600 to-yellow-700" },
    { icon: MessageSquare, t: "Front-Desk to Back-Bar Chat", d: "Pre-service notes from reception to stylists. Walk-in capacity shared instantly. No more sticky-note systems.", grad: "from-teal-600 to-emerald-700" },
  ];
  return (
    <section className="py-24 bg-emerald-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-700 text-xs font-bold tracking-widest uppercase mb-5">
            <Award className="w-3.5 h-3.5" />
            Built for Beauty Businesses
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Every Feature, Designed for{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">How Salons Actually Run</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Not generic SaaS scheduling. Built for the unique rhythm of appointment-based, commission-driven beauty businesses.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {feats.map((f, i) => (
            <motion.div key={f.t}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl border border-emerald-100 p-5 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all duration-300">
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
   SALON/SPA TYPES
══════════════════════════════════ */
function SalonTypes() {
  const types = [
    { icon: Scissors, t: "Hair Salons", d: "Full-service stylist commission models" },
    { icon: Flower2, t: "Day Spas & Med Spas", d: "Therapist licensing and room scheduling" },
    { icon: Wand2, t: "Nail Salons", d: "Chair-based scheduling, walk-in queues" },
    { icon: Heart, t: "Lash & Brow Studios", d: "Treatment-time precision, client prefs" },
    { icon: Crown, t: "Luxury & VIP Salons", d: "Concierge-level service notes, VIP rooms" },
    { icon: Sparkles, t: "Barbershops", d: "Walk-in flow, chair rotation, tip pools" },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            For Every Type of Beauty Business
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From a 2-chair barbershop to a multi-suite med spa — the platform scales to your craft.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {types.map((t, i) => (
            <motion.div key={t.t}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-emerald-50/30 to-amber-50/30 border border-emerald-100 hover:border-amber-300 transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-200">
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
    <section className="py-24 bg-gradient-to-br from-emerald-700 via-teal-700 to-amber-700 relative overflow-hidden">
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-300/20 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-yellow-300 text-yellow-300" />)}
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white leading-relaxed tracking-tight mb-8">
            &ldquo;We finally have scheduling, commission, and tips on <span className="bg-white/20 px-2 py-0.5 rounded-lg">one platform</span>.
            My stylists love seeing real-time commission on their phones. My front desk loves not playing
            phone tag for walk-ins. It feels designed for us, not bolted on.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-300 to-emerald-400 flex items-center justify-center text-white text-base font-black shadow-lg">
              EL
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-lg">Elena L.</p>
              <p className="text-amber-100/80 text-sm">Owner · 3-location boutique salon</p>
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
    { q: "What is salon scheduling software?", a: "Salon scheduling software coordinates the rotas of stylists, colorists, assistants, receptionists, and back-bar staff — while respecting appointment bookings, treatment room availability, and service certifications. StaffSchedule.io is built specifically for beauty businesses, handling commission-based pay, retail product upsells, and the unique daily rhythm of appointment-based operations." },
    { q: "How is this different from my salon booking software?", a: "Your booking software manages client appointments. StaffSchedule.io manages your team — who's working when, how much they're earning in commission, where they're stationed, when they swap shifts, and how their hours flow to payroll. The two work together: booking data informs staffing, and staffing data flows back to coverage decisions." },
    { q: "Does it track stylist commissions automatically?", a: "Yes. Configure commission tiers per stylist (e.g., 40% senior, 30% junior) or per service category (cut, color, treatment, retail). The system tracks hours, services performed, and retail product sold, then calculates commission alongside hourly wages. All syncs to payroll on the same line — no spreadsheet reconciliation." },
    { q: "Can I schedule treatment rooms and chairs?", a: "Yes. Treatment rooms, chairs, and stations are resources you schedule alongside staff. The system prevents double-booking (one stylist into two chairs, one therapist into two rooms). Utilization reports show which spaces are over- or under-used so you can rebalance." },
    { q: "Does it work for spas and med spas?", a: "Absolutely. Spa staff scheduling, med spa staff scheduling, and salon staff scheduling are all native use cases. Therapist licenses, esthetician certifications, and med-spa physician oversight rules are all configurable. Treatment-room scheduling is built-in." },
    { q: "Can stylists swap shifts without breaking client appointments?", a: "Yes. The system is appointment-aware. When a stylist posts a swap, only shifts that don't have client appointments booked are eligible. If a swap is approved, clients are protected and the swap simply covers open service time." },
    { q: "Does it integrate with salon booking and payroll?", a: "Yes. StaffSchedule.io connects to major salon booking platforms (pulling appointment data) and major payroll providers (pushing approved timesheets with commission, tips, and overtime). Common integrations include ADP, Gusto, QuickBooks, and Rippling." },
    { q: "What does it cost for a salon?", a: "Plans scale with team size — every plan includes every feature (commission tracking, treatment rooms, payroll sync, mobile app). Start with the 14-day free trial — no credit card — and pick the right plan when you're ready." },
  ];
  return (
    <section className="py-24 bg-emerald-50/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Salon Scheduling, Answered
          </h2>
          <p className="text-gray-500 text-lg">Common questions from salon owners, spa managers, and beauty operators.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="border border-emerald-100 rounded-2xl overflow-hidden bg-white shadow-sm">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-emerald-50/40 transition-colors duration-150">
                <span className="font-semibold text-gray-900 pr-4 text-sm sm:text-base">{f.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>
                    <div className="px-6 pb-5 pt-3 text-gray-600 leading-relaxed text-sm border-t border-emerald-50">{f.a}</div>
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
    <section className="py-24 bg-gradient-to-br from-[#0a1a14] via-[#0f2820] to-[#0a1a14] relative overflow-hidden">
      <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-amber-500/20 to-emerald-600/20 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-emerald-600 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-900/50">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Beautiful Scheduling.
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-300 bg-clip-text text-transparent">Beautifully Paid.</span>
          </h2>
          <p className="text-emerald-100/70 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Start free. Run this week&apos;s rota on StaffSchedule.io. Watch your stylists smile when they see commission tracked in real time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl shadow-emerald-900/50">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              Talk to a Salon Specialist
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {["Commission-ready", "Treatment rooms", "Live on day one", "Cancel anytime"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-sm text-amber-200/70">{t}</span>
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
export default function SalonSpaPage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <StylistDayTimeline />
      <CommissionSection />
      <FeaturesGrid />
      <SalonTypes />
      <TestimonialSection />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
