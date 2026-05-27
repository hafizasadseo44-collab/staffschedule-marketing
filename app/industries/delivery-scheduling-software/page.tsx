"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Truck, MapPin, Clock, CheckCircle2, Star, ChevronDown,
  Smartphone, BarChart3, Users, AlertTriangle, Navigation,
  Package, Zap, Shield, MessageSquare, TrendingUp, Radio,
  Calendar, ArrowRight, Bell, RouteIcon
} from "lucide-react";

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 pt-24 pb-16">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 right-[-5%] w-[700px] h-[700px] bg-blue-600/20 rounded-full blur-[140px]" />
        <motion.div animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 9, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 left-[-5%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.8) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 font-bold text-xs tracking-widest uppercase mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
              </span>
              Real-Time Dispatch Management
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Delivery Scheduling Software{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Built for Speed.
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-xl">
              Coordinating delivery drivers shouldn't feel like controlled chaos. StaffSchedule.io gives your dispatch team a live view of every driver, every shift, and every route change — so last-mile operations actually run last-minute-ready.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/signup">
                <button className="h-14 px-8 rounded-xl font-bold bg-blue-500 hover:bg-blue-600 text-white shadow-xl shadow-blue-500/30 hover:-translate-y-0.5 transition-all w-full sm:w-auto text-sm tracking-wide">
                  Start Free Trial
                </button>
              </Link>
              <Link href="/demo">
                <button className="h-14 px-8 rounded-xl font-bold border border-slate-600 bg-slate-800/60 text-slate-200 hover:bg-slate-700 transition-all w-full sm:w-auto text-sm">
                  Watch Demo
                </button>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                <span className="font-bold text-white ml-1">4.9</span>
                <span className="text-slate-400">· 1,038 reviews</span>
              </div>
              <span className="text-slate-400"><span className="text-white font-bold">2,000+</span> delivery businesses trust us</span>
            </motion.div>
          </div>

          {/* RIGHT: Live Dispatch Dashboard */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
            <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-slate-800 px-5 py-4 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Truck size={16} className="text-blue-400" />
                  <span className="text-white font-bold text-sm">Dispatch Command — Zone Central</span>
                </div>
                <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest animate-pulse">● LIVE</span>
              </div>

              {/* Live metrics */}
              <div className="grid grid-cols-4 divide-x divide-slate-700/60 border-b border-slate-700/60">
                {[
                  { label: "Active Drivers", val: "14", color: "text-green-400" },
                  { label: "On Route", val: "9", color: "text-blue-400" },
                  { label: "Pending", val: "5", color: "text-amber-400" },
                  { label: "Completed", val: "23", color: "text-slate-300" },
                ].map((m, i) => (
                  <div key={i} className="py-4 text-center">
                    <p className={`text-xl font-black ${m.color}`}>{m.val}</p>
                    <p className="text-slate-500 text-[10px] mt-1 font-medium">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Driver rows */}
              <div className="p-4 space-y-2.5">
                {[
                  { name: "Carlos Ruiz", route: "Downtown Loop · 12 stops", eta: "On Time", badge: "bg-green-500/15 text-green-400 border-green-500/30", dot: "bg-green-500" },
                  { name: "Priya Sharma", route: "North District · Emergency reroute", eta: "Delayed", badge: "bg-red-500/15 text-red-400 border-red-500/30", dot: "bg-red-500 animate-pulse" },
                  { name: "Tyler Brooks", route: "Airport Corridor · Last stop", eta: "Early", badge: "bg-blue-500/15 text-blue-400 border-blue-500/30", dot: "bg-blue-500" },
                  { name: "Aisha Nkomo", route: "Industrial Park · Loading", eta: "Standby", badge: "bg-slate-500/15 text-slate-400 border-slate-500/30", dot: "bg-slate-500" },
                ].map((d, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${d.dot}`} />
                      <div>
                        <p className="text-white font-semibold text-sm">{d.name}</p>
                        <p className="text-slate-500 text-[10px] mt-0.5">{d.route}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${d.badge}`}>{d.eta}</span>
                  </motion.div>
                ))}
              </div>

              {/* Bottom: New alert */}
              <div className="p-4 pt-0">
                <motion.div animate={{ opacity: [1, 0.7, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-3 flex items-center gap-3">
                  <Package size={14} className="text-blue-400 shrink-0" />
                  <p className="text-blue-300 text-xs font-medium">New urgent delivery: Medical supplies — Assign nearest driver</p>
                  <button className="ml-auto text-[10px] bg-blue-500 text-white px-3 py-1 rounded-lg font-bold shrink-0 hover:bg-blue-600 transition-colors">Assign</button>
                </motion.div>
              </div>
            </div>

            {/* Floating stat */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }}
              className="absolute -right-4 bottom-8 bg-white rounded-xl shadow-xl border border-slate-100 p-3.5 flex items-center gap-3 z-20">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center"><TrendingUp size={18} className="text-green-600" /></div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">On-Time Rate</p>
                <p className="font-black text-slate-800 text-lg">+31%</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── STATS BAR ────────────────────────────────────────────────────────────────
function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const stats = [
    { val: "34%", label: "Reduction in driver idle time with smart scheduling", icon: Clock },
    { val: "2.4hrs", label: "Average time saved weekly on dispatch coordination", icon: Radio },
    { val: "91%", label: "Of drivers prefer digital shift notifications over calls", icon: Smartphone },
    { val: "2,000+", label: "Delivery businesses run on StaffSchedule.io daily", icon: Truck },
  ];
  return (
    <section ref={ref} className="py-14 bg-blue-950 border-y border-blue-900/50">
      <div className="container mx-auto px-6 max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }} className="text-center">
              <Icon size={20} className="mx-auto mb-3 text-blue-400" />
              <p className="text-3xl font-black text-white mb-1">{s.val}</p>
              <p className="text-blue-300/70 text-sm leading-snug">{s.label}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ─── PAIN POINTS ──────────────────────────────────────────────────────────────
function PainPointsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const points = [
    { icon: Radio, title: "Dispatch still runs on phone calls", desc: "Your dispatcher calls Driver A — busy. Calls Driver B — voicemail. Meanwhile the customer's window is closing. Every uncoordinated dispatch costs you a delivery and your reputation." },
    { icon: Clock, title: "Shift changes create delivery gaps", desc: "When a driver calls in sick 20 minutes before their shift, you scramble to find a replacement. Without a live availability view and instant messaging, you're guessing and calling — not dispatching." },
    { icon: MapPin, title: "No visibility into who's where", desc: "You have 14 drivers on the road and zero idea who finished their route, who is running late, or who just became available. Without a live dispatch view, you can't optimize the fleet you're already paying for." },
  ];
  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-3">The Real Problem</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            Why Delivery Scheduling Breaks Down at Scale
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} className="text-lg text-slate-600 leading-relaxed">
            Every delivery operation hits the same wall. As the fleet grows, the spreadsheets and phone calls that worked for 5 drivers completely collapse at 15. Here's what's really costing you.
          </motion.p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + i * 0.1 }}
                className="p-8 rounded-2xl bg-red-50/70 border border-red-100">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-5"><Icon size={22} className="text-red-600" /></div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{p.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURES (BENTO GRID) ────────────────────────────────────────────────────
function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Everything Dispatch Needs in One Dashboard</motion.h2>
          <p className="text-slate-600 text-lg">Designed for dispatchers who need answers in seconds, not minutes.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 auto-rows-[260px]">
          {/* Large card: Driver Availability */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            className="md:col-span-2 bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden group">
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.8),transparent_60%)]" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-5"><Users size={24} className="text-blue-300" /></div>
              <h3 className="text-2xl font-black text-white mb-2">Live Driver Availability Board</h3>
              <p className="text-slate-300 text-sm max-w-lg">See every driver's current status — on route, available, off-shift, or on break — on one live dashboard. No more guessing who to call when an urgent job comes in.</p>
            </div>
          </motion.div>

          {/* Small: Mobile Notifications */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm flex flex-col">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4"><Bell size={20} className="text-blue-600" /></div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Instant Driver Notifications</h3>
            <p className="text-slate-600 text-sm leading-relaxed flex-1">Push schedule updates, new jobs, and route changes directly to drivers' phones. No more group texts or missed calls.</p>
          </motion.div>

          {/* Small: Shift Management */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm flex flex-col">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-4"><Calendar size={20} className="text-green-600" /></div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Drag-and-Drop Shift Builder</h3>
            <p className="text-slate-600 text-sm leading-relaxed flex-1">Build weekly driver schedules visually. Assign early, mid, and late shifts across your entire fleet with drag-and-drop simplicity.</p>
          </motion.div>

          {/* Large: Overtime tracking */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}
            className="md:col-span-2 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden group">
            <div className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.8),transparent_60%)]" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-5"><BarChart3 size={24} className="text-indigo-300" /></div>
              <h3 className="text-2xl font-black text-white mb-2">Overtime Alerts & Payroll-Ready Reports</h3>
              <p className="text-slate-300 text-sm max-w-lg">Track every driver's hours in real time. Get alerted before anyone hits overtime. Export clean payroll reports — no spreadsheet reconciliation needed at the end of the week.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── WORKFLOW ─────────────────────────────────────────────────────────────────
function WorkflowSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const steps = [
    { n: "01", title: "Build the Weekly Driver Schedule", desc: "Create shifts for your entire fleet in minutes. Set recurring routes, assign depot start times, and ensure every delivery window has a driver assigned before the week begins." },
    { n: "02", title: "Drivers Get Notified Instantly", desc: "As soon as you publish or update a schedule, every driver gets an instant notification on their phone. They see their shift times, assigned routes, and any special instructions — before they even leave home." },
    { n: "03", title: "Dispatch Manages the Day Live", desc: "The dispatcher monitors the live board all day. They can reassign an incoming urgent delivery to the nearest available driver, fill a callout in seconds, and see real-time status updates without picking up the phone." },
    { n: "04", title: "Drivers Log Time on Mobile", desc: "Drivers clock in and out directly in the app. Time is logged against the right shift and route automatically, giving you accurate records for payroll and compliance." },
    { n: "05", title: "Export Payroll & Performance", desc: "End of week, export a clean payroll report showing hours worked, overtime, and any missed shifts. Review on-time performance by driver, route, and shift type — all in one place." },
  ];
  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-3">How It Works</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">From Schedule to Delivery — Fully Coordinated</motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 leading-relaxed mb-10">
              StaffSchedule.io handles every step of the delivery workforce cycle — from building the weekly roster to tracking payroll. Here's how a modern delivery operation runs on our platform.
            </motion.p>
            <div className="space-y-8">
              {steps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shrink-0">{step.n}</div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1.5">{step.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Mobile App Mockup */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
            className="flex justify-center sticky top-32">
            <div className="relative">
              <div className="w-64 bg-slate-900 rounded-[3rem] border-4 border-slate-700 shadow-2xl overflow-hidden">
                <div className="bg-blue-600 p-5 pt-10">
                  <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest mb-1">Today's Route</p>
                  <p className="text-white font-black text-lg">Downtown Loop</p>
                  <p className="text-blue-200 text-xs mt-1">12 stops · 6:00 AM – 2:00 PM</p>
                </div>
                <div className="bg-slate-900 p-4 space-y-3">
                  {[
                    { stop: "Stop 1", addr: "14 Market St", status: "Delivered ✓", c: "text-green-400" },
                    { stop: "Stop 2", addr: "89 Oak Avenue", status: "En Route →", c: "text-blue-400" },
                    { stop: "Stop 3", addr: "205 Pine Rd", status: "Pending", c: "text-slate-400" },
                  ].map((s, i) => (
                    <div key={i} className="bg-slate-800 rounded-xl p-3 border border-slate-700">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-bold text-xs">{s.stop}</p>
                          <p className="text-slate-400 text-[10px] mt-0.5">{s.addr}</p>
                        </div>
                        <span className={`text-[10px] font-bold ${s.c}`}>{s.status}</span>
                      </div>
                    </div>
                  ))}
                  <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-xs mt-2">Navigate to Next Stop</button>
                </div>
              </div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 1 }}
                className="absolute -left-12 top-1/3 bg-white rounded-xl shadow-xl border border-slate-100 p-3.5">
                <p className="text-[9px] text-slate-400 font-bold uppercase">Today's Hours</p>
                <p className="text-slate-900 font-black text-base mt-0.5">5h 20m</p>
                <div className="w-full h-1 bg-slate-100 rounded mt-1.5"><div className="h-1 bg-blue-500 rounded" style={{ width: "67%" }} /></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── INDUSTRY SHOWCASE ────────────────────────────────────────────────────────
function IndustryShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const scenarios = [
    { icon: "🚚", title: "Last-Mile Courier Services", desc: "Schedule daily delivery windows, coordinate handoffs between shifts, and keep drivers updated on route changes in real time." },
    { icon: "📦", title: "E-Commerce Fulfillment", desc: "Match driver headcount to daily order volume. Scale up quickly on high-demand days without the scheduling bottleneck." },
    { icon: "🏥", title: "Medical & Pharmaceutical Delivery", desc: "Ensure certified drivers are assigned to sensitive deliveries, track chain-of-custody handoffs, and maintain compliance logs." },
    { icon: "🍽️", title: "Restaurant & Food Delivery", desc: "Coordinate multiple shifts throughout service hours. Manage split shifts, on-call drivers, and surge coverage during meal peaks." },
    { icon: "🏗️", title: "Construction Material Supply", desc: "Schedule heavy freight drivers around job-site delivery windows. Track equipment certifications and weight compliance." },
    { icon: "🛒", title: "Grocery & Retail Delivery", desc: "Handle time-slot-based delivery scheduling, substitute driver assignments, and same-day coverage when volume spikes." },
  ];
  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-950 to-blue-950 text-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl md:text-5xl font-black mb-4">Built for Every Type of Delivery Operation</motion.h2>
          <p className="text-slate-400 text-lg">Whether you run 5 drivers or 500, StaffSchedule.io scales to match your operation.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-7 hover:border-blue-500/40 hover:bg-slate-800 transition-all group">
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const testimonials = [
    { name: "Derek Paulson", title: "Fleet Manager, SwiftRoute Delivery", location: "Seattle, WA", avatar: "https://i.pravatar.cc/100?img=11", rating: 5, quote: "We went from managing 22 drivers on a whiteboard to having real-time visibility across the whole fleet. My dispatchers stopped making 40 phone calls a day and started actually dispatching. Our on-time rate went from 71% to 94% in the first quarter." },
    { name: "Jennifer Wu", title: "Operations Director, CityBox Couriers", location: "Chicago, IL", avatar: "https://i.pravatar.cc/100?img=32", rating: 5, quote: "The shift-cover tool is what I didn't know I needed. When a driver calls out sick, we used to spend 20 minutes finding a replacement. Now the system auto-alerts available drivers and we have a confirmation back in under 4 minutes. That's a game changer at 6 AM." },
    { name: "Marcus Osei", title: "Owner, Osei Last-Mile Logistics", location: "Atlanta, GA", avatar: "https://i.pravatar.cc/100?img=57", rating: 5, quote: "The payroll export alone saves me 3 hours every single Friday. Before, I was manually adding up hours from driver check-ins on paper. Now everything is tracked automatically and I can literally see which drivers are approaching overtime before it happens." },
  ];
  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Delivery Managers Love What They Can Now See</motion.h2>
          <p className="text-slate-500 text-lg">Real results from delivery businesses that switched from spreadsheets to StaffSchedule.io.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.12 }}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-8 flex flex-col hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="flex mb-4">{[...Array(t.rating)].map((_, si) => <Star key={si} size={14} className="text-amber-400 fill-amber-400" />)}</div>
              <p className="text-slate-700 leading-relaxed text-sm flex-1 mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" loading="lazy" />
                <div>
                  <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.title} · {t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const faqs = [
    { q: "What is delivery scheduling software and why do I need it?", a: "Delivery scheduling software is a platform that replaces spreadsheets, phone trees, and whiteboards with a centralized tool for managing driver shifts, dispatch assignments, and route coordination. If you have more than 5 drivers, you need it — because manual scheduling breaks down fast and costs you in missed deliveries, overtime disputes, and driver confusion." },
    { q: "How does the software handle last-minute driver callouts?", a: "When a driver calls out, StaffSchedule.io immediately shows you all available qualified drivers for that shift window. You can send an open shift request to one or all of them with a single click. The first driver to accept gets the shift, and both you and the driver get instant confirmation. Average fill time drops from 20+ minutes to under 5." },
    { q: "Can I manage drivers across multiple depots or locations?", a: "Yes. StaffSchedule.io supports multi-depot operations. Each location has its own scheduling board, availability roster, and reporting. Regional managers can view across all depots simultaneously, and drivers can be shared between locations when needed — with automatic conflict detection to prevent double-booking." },
    { q: "Does it work for both employed drivers and gig/contract workers?", a: "Yes. You can designate workers as full-time, part-time, or contract and configure different availability rules and pay rate tracking for each type. This is particularly useful for delivery operations that maintain a core employed team but supplement with contracted drivers during peak periods." },
    { q: "How do delivery drivers receive and acknowledge their schedules?", a: "Drivers download the free StaffSchedule.io mobile app. When a schedule is published or updated, they receive an instant push notification. They can view their shifts, request time off, swap shifts with colleagues, and clock in/out — all from their phone. You get a read-receipt so you know they saw the schedule." },
    { q: "Can the software track driver hours for compliance purposes?", a: "Yes. Every clock-in and clock-out is logged with a timestamp. You can configure alerts for Hours-of-Service thresholds. The system tracks daily driving hours, rest periods, and weekly maximums. At audit time, you can export detailed logs for any driver, any date range." },
    { q: "How long does it take to set up for a delivery team?", a: "Most delivery operations are fully running within 30 minutes. You import your driver roster, configure your shifts and zones, and publish your first schedule. Drivers download the app and are live immediately. Our onboarding team is available to help if you need it — no lengthy implementation process." },
    { q: "Does StaffSchedule.io integrate with delivery management or routing software?", a: "StaffSchedule.io focuses on workforce scheduling — the people side of your delivery operation. It integrates with popular payroll platforms (QuickBooks, Gusto, ADP) and supports API access for connecting to delivery management systems. Contact our team for specific integration questions." },
  ];
  return (
    <section ref={ref} className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-14">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Questions About Delivery Scheduling Software</motion.h2>
          <p className="text-slate-500 text-lg">Answers for fleet managers, dispatchers, and delivery business owners.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.04 }}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${open === i ? "border-blue-500 shadow-lg shadow-blue-50" : "border-slate-200 hover:border-blue-300"}`}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left flex items-center justify-between p-6 font-bold text-slate-800 text-sm md:text-base">
                <span className="pr-4">{faq.q}</span>
                <ChevronDown size={18} className={`shrink-0 text-blue-500 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">{faq.a}</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── RELATED INDUSTRIES ───────────────────────────────────────────────────────
function RelatedSection() {
  const links = [
    { label: "Logistics Scheduling", href: "/industries/logistics-scheduling-software" },
    { label: "Field Service", href: "/industries/field-service-scheduling-software" },
    { label: "Construction Crews", href: "/industries/construction-crew-scheduling-software" },
    { label: "Plumbing Teams", href: "/industries/plumbing-scheduling-software" },
  ];
  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <p className="text-slate-500 font-semibold text-sm mb-5">Related Industries</p>
        <div className="flex flex-wrap gap-3">
          {links.map((l, i) => (
            <Link key={i} href={l.href}><span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:border-blue-400 hover:text-blue-600 transition-colors">{l.label} <ArrowRight size={13} /></span></Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 p-12 md:p-16 text-center shadow-2xl">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.4) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(59,130,246,0.4) 0%, transparent 60%)" }} />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-blue-200 text-xs font-bold uppercase tracking-widest mb-6"><Truck size={12} />Built for Delivery Operations</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">Your Drivers Are Ready. Is Your Scheduling?</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">Join 2,000+ delivery businesses that replaced phone calls and spreadsheets with StaffSchedule.io. Set up in 30 minutes. See the difference in Week 1.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup"><button className="h-14 px-10 rounded-xl font-black bg-white text-blue-800 hover:bg-blue-50 transition-all shadow-xl hover:-translate-y-1 text-sm w-full sm:w-auto">Start Free 14-Day Trial</button></Link>
              <Link href="/demo"><button className="h-14 px-10 rounded-xl font-bold border-2 border-white/30 text-white hover:bg-white/10 transition-all w-full sm:w-auto text-sm">Book a Live Demo</button></Link>
            </div>
            <p className="mt-6 text-blue-300 text-sm">No credit card required · Free 14-day trial · Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DeliverySchedulingSoftwarePage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <HeroSection />
      <StatsBar />
      <PainPointsSection />
      <FeaturesSection />
      <WorkflowSection />
      <IndustryShowcase />
      <TestimonialsSection />
      <FAQSection />
      <RelatedSection />
      <CTASection />
    </main>
  );
}
