"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Wrench, Clock, MapPin, Smartphone, CheckCircle2, Star,
  ChevronDown, AlertTriangle, Users, TrendingUp, Shield,
  Zap, BarChart3, Calendar, MessageSquare, ArrowRight,
  Phone, FileText, Truck
} from "lucide-react";

// ─── THEME ────────────────────────────────────────────────────────────────────
const ACCENT = "#2563eb";
const ACCENT_DARK = "#1d4ed8";

// ─── SECTION: HERO ────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f0f4ff] pt-24 pb-16">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.08, 1], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 right-[-10%] w-[700px] h-[700px] rounded-full bg-blue-400/20 blur-[140px]"
        />
        <motion.div
          animate={{ scale: [1, 1.05, 1], x: [0, 20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-400/15 blur-[120px]"
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(37,99,235,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.6) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT: Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-800 font-semibold text-xs tracking-wider uppercase mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
              </span>
              Live Dispatch Available 24/7
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6"
            >
              Plumbing Scheduling{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Built for the Field.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl"
            >
              Stop managing your plumbing crews through phone calls and sticky notes. StaffSchedule.io gives dispatchers a real-time view of every technician, every job, and every emergency — so you can assign the right plumber in seconds, not minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link href="/demo">
                <button className="h-14 px-8 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all w-full sm:w-auto text-sm tracking-wide">
                  Start Free Trial — No Card Needed
                </button>
              </Link>
              <Link href="/demo">
                <button className="h-14 px-8 rounded-xl font-bold border-2 border-blue-200 bg-white text-blue-700 hover:bg-blue-50 transition-all w-full sm:w-auto text-sm">
                  Watch Demo
                </button>
              </Link>
            </motion.div>

            {/* Social proof strip */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center gap-6 text-sm"
            >
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                </div>
                <span className="font-bold text-slate-800">4.9/5</span>
                <span className="text-slate-500">from 1,038 reviews</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500">
                <Users size={14} className="text-blue-500" />
                <span>Trusted by <strong className="text-slate-700">1,500+</strong> plumbing contractors</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Dispatch Dashboard Mock */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
            className="relative"
          >
            {/* Main dashboard card */}
            <div className="bg-white rounded-2xl border border-blue-100 shadow-2xl shadow-blue-900/10 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest">Dispatch Center</p>
                  <h3 className="text-white font-bold text-lg">Monday, Active Crews</h3>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                  </span>
                  <span className="text-white text-xs font-bold">4 Active</span>
                </div>
              </div>

              {/* Crew rows */}
              <div className="p-4 space-y-3">
                {[
                  { name: "Mike Torres", job: "Water Heater Install — Oak St.", eta: "In Progress", color: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
                  { name: "James Carter", job: "Emergency Burst Pipe — 4th Ave", eta: "En Route · 8 min", color: "bg-red-100 text-red-700", dot: "bg-red-500 animate-pulse" },
                  { name: "Dana Reyes", job: "Drain Inspection — Market Blvd", eta: "Completed ✓", color: "bg-green-100 text-green-700", dot: "bg-green-500" },
                  { name: "Sam Park", job: "Sewer Line Repair — Elm Drive", eta: "Available", color: "bg-slate-100 text-slate-600", dot: "bg-slate-400" },
                ].map((crew, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.15 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${crew.dot}`} />
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{crew.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{crew.job}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${crew.color}`}>{crew.eta}</span>
                  </motion.div>
                ))}
              </div>

              {/* Bottom action bar */}
              <div className="px-4 pb-4">
                <div className="bg-blue-600 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-blue-700 transition-colors">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className="text-amber-300" />
                    <span className="text-white text-sm font-bold">New Emergency: Frozen Pipe, Downtown</span>
                  </div>
                  <span className="text-xs bg-white text-blue-700 font-bold px-3 py-1 rounded-lg">Dispatch Now</span>
                </div>
              </div>
            </div>

            {/* Floating notification */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.8, type: "spring", stiffness: 200 }}
              className="absolute -top-8 -right-6 bg-white rounded-xl shadow-xl border border-slate-100 p-3.5 flex items-center gap-3 z-10 max-w-[200px]"
            >
              <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <CheckCircle2 size={18} className="text-green-600" />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-xs">Shift Published</p>
                <p className="text-[10px] text-slate-500">4 techs notified instantly</p>
              </div>
            </motion.div>

            {/* Floating stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.1, type: "spring" }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl border border-slate-100 p-3.5 z-10"
            >
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Avg Dispatch Time</p>
              <p className="text-2xl font-black text-blue-600">47 sec</p>
              <p className="text-[10px] text-green-600 font-semibold">↓ 82% vs phone dispatching</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: STATS BAR ───────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { value: "2.1hrs", label: "Average time wasted daily on manual scheduling", icon: Clock },
    { value: "38%", label: "Of emergency call-outs are mis-assigned initially", icon: AlertTriangle },
    { value: "23%", label: "Revenue lost annually from scheduling inefficiencies", icon: TrendingUp },
    { value: "1,500+", label: "Plumbing contractors trust StaffSchedule.io", icon: Users },
  ];

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-14 bg-slate-900 border-y border-slate-800">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <Icon size={22} className="mx-auto mb-3 text-blue-400" />
                <p className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</p>
                <p className="text-slate-400 text-sm leading-snug">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: PAIN POINTS ─────────────────────────────────────────────────────
function PainPointsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const problems = [
    {
      icon: Phone,
      title: "Dispatching via phone calls and text chains",
      desc: "You call Technician A, who is busy. You call Technician B, no answer. Meanwhile, the customer's basement is flooding. Manual dispatching in emergencies costs you jobs — and your reputation.",
    },
    {
      icon: Clock,
      title: "Tracking overtime with spreadsheets",
      desc: "End-of-week payroll becomes a detective story. Which hours were regular? Which were on-call? Which were emergency after-hours? Spreadsheets can't keep up with a plumbing crew's unpredictable schedule.",
    },
    {
      icon: FileText,
      title: "Lost job notes and miscommunications",
      desc: "The dispatcher told the plumber verbally, the plumber forgot, and the customer is furious. When job instructions live in someone's head or a notebook, critical information falls through the cracks.",
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3"
          >
            Real Challenges. Real Costs.
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight"
          >
            The Scheduling Chaos Behind Every Plumbing Business
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            Running a plumbing company means managing unpredictable emergencies, multiple field crews, varying shift lengths, and tight customer windows — all at once. Here's what's holding most plumbing businesses back.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + i * 0.12 }}
                className="p-8 rounded-2xl bg-red-50/50 border border-red-100"
              >
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-5">
                  <Icon size={22} className="text-red-600" />
                </div>
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

// ─── SECTION: FEATURES (TABBED) ────────────────────────────────────────────────
function FeaturesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const tabs = [
    {
      label: "Dispatch",
      icon: Truck,
      title: "Dispatch the Right Plumber in Seconds",
      desc: "See every technician's live status and location on a single dashboard. When a burst pipe call comes in at 2 AM, you'll know in five seconds who is nearest, who is available, and who has the right equipment on their truck. One click sends the job details directly to their phone.",
      points: [
        "Real-time availability and location overview",
        "One-click emergency job assignment",
        "Automatic SMS/push notification to the dispatched tech",
        "Equipment and certification tracking per technician",
      ],
      visual: (
        <div className="bg-slate-900 rounded-xl p-5 h-full min-h-[320px]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-bold text-sm">Live Dispatch Board</span>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded font-bold">● 3 Online</span>
          </div>
          {[
            { n: "Mike Torres", s: "On Job — 14 Oak St", t: "Sewer Repair", c: "text-blue-400" },
            { n: "James Carter", s: "En Route — 8 min ETA", t: "Emergency Call", c: "text-red-400" },
            { n: "Sam Park", s: "Available — Zone North", t: "Ready to Dispatch", c: "text-green-400" },
          ].map((t, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-slate-700/50 last:border-0">
              <div>
                <p className="text-white font-semibold text-sm">{t.n}</p>
                <p className="text-slate-400 text-xs">{t.t}</p>
              </div>
              <span className={`text-xs font-medium ${t.c}`}>{t.s}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "Scheduling",
      icon: Calendar,
      title: "Build Smarter Weekly Schedules",
      desc: "Drag-and-drop shift building designed for plumbing's unpredictable nature. Set rotating on-call schedules, block out time for recurring maintenance contracts, and ensure you always have emergency coverage — even on weekends and holidays.",
      points: [
        "Drag-and-drop weekly and monthly scheduling",
        "Recurring shift templates for maintenance contracts",
        "On-call rotation management with fairness tracking",
        "Conflict detection for overlapping jobs or certifications",
      ],
      visual: (
        <div className="bg-white rounded-xl border border-blue-100 p-5 min-h-[320px]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-800 font-bold text-sm">Week Schedule — Jan 8-14</span>
            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold border border-blue-200">4 Techs</span>
          </div>
          {["Mike T.", "James C.", "Dana R.", "Sam P."].map((name, i) => (
            <div key={i} className="mb-3">
              <p className="text-xs text-slate-500 font-semibold mb-1.5">{name}</p>
              <div className="flex gap-1">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, di) => (
                  <div key={di}
                    className={`flex-1 h-8 rounded text-[9px] font-bold flex items-center justify-center ${di < 5 ? (i === 1 && di === 2 ? "bg-red-100 text-red-700" : "bg-blue-600 text-white") : "bg-slate-100 text-slate-300"}`}
                  >
                    {d}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "Mobile",
      icon: Smartphone,
      title: "Your Plumbers Always Have What They Need",
      desc: "The StaffSchedule.io mobile app puts full job details in every plumber's pocket. They can view instructions, check equipment lists, navigate to the job site, clock in and out, and even capture photos — all from one app. And it works offline in basements and dead zones.",
      points: [
        "Offline mode for basements and low-signal areas",
        "Turn-by-turn navigation to job sites",
        "Photo and digital signature capture on-site",
        "Real-time chat with dispatch and other techs",
      ],
      visual: (
        <div className="flex justify-center items-center min-h-[320px]">
          <div className="w-56 bg-slate-900 rounded-3xl p-4 border-4 border-slate-700 shadow-2xl">
            <div className="bg-blue-600 rounded-2xl p-4 mb-3">
              <p className="text-blue-200 text-[10px] font-bold uppercase mb-1">Current Job</p>
              <p className="text-white font-bold text-sm">Water Heater — 4th Ave</p>
              <p className="text-blue-200 text-[10px] mt-1">Client: Brown Residence</p>
            </div>
            {[
              { label: "Equipment needed", val: "1/2\" copper fittings, torch kit" },
              { label: "Access code", val: "Gate: 4892" },
            ].map((item, i) => (
              <div key={i} className="bg-slate-800 rounded-xl p-3 mb-2">
                <p className="text-slate-400 text-[9px] uppercase font-bold">{item.label}</p>
                <p className="text-white text-xs font-medium mt-0.5">{item.val}</p>
              </div>
            ))}
            <button className="w-full bg-white rounded-xl py-2.5 font-bold text-slate-900 text-xs mt-2">
              ✓ Mark Job Complete
            </button>
          </div>
        </div>
      ),
    },
    {
      label: "Overtime & Pay",
      icon: BarChart3,
      title: "Payroll-Ready Overtime Tracking",
      desc: "Stop spending hours reconciling timesheets every Friday. StaffSchedule.io automatically separates regular hours from on-call time and emergency overtime. Export one clean report and hand it straight to payroll — no guesswork, no disputes, no headaches.",
      points: [
        "Automatic regular vs. overtime hour separation",
        "On-call and emergency rate tracking",
        "One-click payroll export (QuickBooks, Gusto, etc.)",
        "Overtime alerts before thresholds are reached",
      ],
      visual: (
        <div className="bg-white rounded-xl border border-slate-200 p-5 min-h-[320px]">
          <p className="text-slate-800 font-bold text-sm mb-4">Weekly Hours Summary</p>
          {[
            { name: "Mike Torres", reg: 40, ot: 6, color: "bg-blue-500" },
            { name: "James Carter", reg: 38, ot: 12, color: "bg-indigo-500" },
            { name: "Dana Reyes", reg: 40, ot: 2, color: "bg-blue-400" },
            { name: "Sam Park", reg: 35, ot: 0, color: "bg-slate-400" },
          ].map((emp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>{emp.name}</span>
                <span>{emp.reg + emp.ot}h total {emp.ot > 0 ? <span className="text-red-600">({emp.ot}h OT)</span> : ""}</span>
              </div>
              <div className="flex h-4 rounded-lg overflow-hidden gap-0.5">
                <div className={`${emp.color} h-full rounded-l-lg`} style={{ width: `${(emp.reg / 52) * 100}%` }} />
                {emp.ot > 0 && <div className="bg-red-400 h-full" style={{ width: `${(emp.ot / 52) * 100}%` }} />}
              </div>
            </div>
          ))}
          <div className="mt-4 pt-4 border-t border-slate-200 flex gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-blue-500" />Regular</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-red-400" />Overtime</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-[#f0f4ff]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight"
          >
            Everything a Plumbing Business Needs to Run Smoothly
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            Purpose-built features for dispatchers, field technicians, and plumbing business owners — not generic workforce software repurposed for your industry.
          </motion.p>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            return (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === i ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300"}`}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="grid lg:grid-cols-2 gap-10 items-center bg-white rounded-3xl border border-blue-100 shadow-xl p-8 md:p-12">
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-5 leading-tight">
              {tabs[activeTab].title}
            </h3>
            <p className="text-slate-600 leading-relaxed mb-7 text-base">
              {tabs[activeTab].desc}
            </p>
            <ul className="space-y-3">
              {tabs[activeTab].points.map((pt, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 size={17} className="text-blue-500 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>{tabs[activeTab].visual}</div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: WORKFLOW ─────────────────────────────────────────────────────────
function WorkflowSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const steps = [
    { n: "01", title: "Emergency Call Received", desc: "A customer calls with a burst pipe or flooded basement. The dispatcher sees all available technicians on the live board and their current locations." },
    { n: "02", title: "Instant Tech Assignment", desc: "The dispatcher selects the nearest available plumber with the right equipment and pushes the job to their phone in one click. The tech gets an instant push notification." },
    { n: "03", title: "Tech Gets Full Job Details", desc: "The plumber opens the app and sees the client address, access notes, required equipment list, and customer history — even offline in a basement." },
    { n: "04", title: "Real-Time Status Updates", desc: "As the tech travels, clocks in, and works, the dispatcher sees live status updates. No phone calls needed. The customer can also be automatically notified of ETA." },
    { n: "05", title: "Job Closed & Payroll Ready", desc: "The tech marks the job complete, captures a photo, and the system automatically logs the hours — including any overtime — ready for payroll export." },
  ];

  return (
    <section ref={ref} className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-slate-900 to-slate-900 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl md:text-5xl font-black mb-4 leading-tight"
          >
            From Emergency Call to Closed Job — in Minutes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg"
          >
            See exactly how StaffSchedule.io handles a real-world plumbing emergency from the first customer call to the final payroll entry.
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-blue-500/30 hidden md:block" style={{ transform: "translateX(-50%)" }} />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                className={`md:flex items-start gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} mb-6 md:mb-0`}>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
                {/* Circle */}
                <div className="flex-none w-14 h-14 rounded-full bg-blue-600 border-4 border-slate-900 flex items-center justify-center font-black text-white text-sm z-10 mx-auto md:mx-0">
                  {step.n}
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: TESTIMONIALS ────────────────────────────────────────────────────
function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const testimonials = [
    {
      name: "Kevin Marsh",
      title: "Owner, Marsh Plumbing & Drain",
      location: "Austin, TX",
      avatar: "https://i.pravatar.cc/100?img=12",
      rating: 5,
      quote: "Before StaffSchedule.io, I was dispatching emergencies via group text. Chaos doesn't even begin to describe it. Now I can see all my guys on one screen and assign an emergency job in literally 30 seconds. My response times dropped from 45 minutes to under 10.",
    },
    {
      name: "Laura Sandoval",
      title: "Operations Manager, BluePipe Plumbing",
      location: "Denver, CO",
      avatar: "https://i.pravatar.cc/100?img=25",
      rating: 5,
      quote: "Overtime disputes used to eat up 2–3 hours every payroll cycle. My guys would argue their on-call hours weren't counted. Now the system tracks everything automatically, and I can show anyone exactly what was worked, when, and at what rate. No more arguments.",
    },
    {
      name: "Ryan Nguyen",
      title: "Field Supervisor, ProFlow Services",
      location: "Atlanta, GA",
      avatar: "https://i.pravatar.cc/100?img=52",
      rating: 5,
      quote: "The offline mode is huge for us. Half my jobs are in apartment basements with zero signal. My guys used to miss job notes all the time. Now everything loads before they leave the shop, and they've got everything they need — even underground.",
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
          >
            Plumbers Love It. Dispatchers Swear By It.
          </motion.h2>
          <p className="text-slate-500 text-lg">Real results from real plumbing contractors across North America.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.12 }}
              className="bg-[#f0f4ff] rounded-2xl border border-blue-100 p-8 flex flex-col"
            >
              <div className="flex mb-4">
                {[...Array(t.rating)].map((_, si) => <Star key={si} size={15} className="text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-slate-700 leading-relaxed text-sm flex-1 mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-blue-100">
                <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" loading="lazy" />
                <div>
                  <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.title} · {t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: FAQ ──────────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const faqs = [
    {
      q: "What is the best plumbing scheduling software for small contractors?",
      a: "StaffSchedule.io is designed to scale from a 2-person operation to a multi-crew commercial plumbing company. Small contractors get the same powerful dispatching, overtime tracking, and mobile tools as large operations — without paying enterprise prices. The free 14-day trial lets you test every feature before committing.",
    },
    {
      q: "How does the dispatch board handle emergency plumbing calls after hours?",
      a: "Emergency dispatching in StaffSchedule.io works 24/7. When an emergency comes in, your on-call dispatcher can open the live board from any device, see which technician is nearest and available, and push the job to their phone instantly. The tech gets the client address, access notes, and any special instructions right in the app.",
    },
    {
      q: "Can plumbers use the app in basements where there's no cell signal?",
      a: "Yes. The mobile app caches all job details, client notes, and instructions locally when the plumber is online. In low-signal areas like basements, crawlspaces, or underground utility tunnels, they can still access everything they need. All time logs, notes, and photos sync automatically when signal is restored.",
    },
    {
      q: "How does StaffSchedule.io handle on-call and overtime pay for plumbers?",
      a: "The system tracks regular hours, on-call hours, and emergency overtime separately for every technician. You set the overtime rules once (daily overtime, weekly overtime, on-call rates), and the platform applies them automatically. At the end of each pay period, you get a clean export ready for your payroll software — QuickBooks, Gusto, Paychex, or whatever you use.",
    },
    {
      q: "Can I track which equipment is on each plumbing truck?",
      a: "Yes. Each technician profile includes an equipment and certification field. You can log which specialized tools (drain snakes, jetters, pipe cameras) are assigned to each truck. When dispatching, the system warns you if a job requires equipment that the nearest available tech doesn't have on hand.",
    },
    {
      q: "How long does it take to set up scheduling software for a plumbing business?",
      a: "Most plumbing businesses are fully operational in under 30 minutes. You import your technician roster, configure your work zones and shift types, and start scheduling. Your field techs download the mobile app and can start receiving jobs immediately. There's no complex implementation or IT required.",
    },
    {
      q: "Does the software integrate with QuickBooks and other payroll tools?",
      a: "Yes. StaffSchedule.io exports payroll-ready timesheets in formats compatible with QuickBooks, Gusto, ADP, Paychex, and most major payroll platforms. You can also set up automated exports so your accountant or payroll processor always has the latest data.",
    },
    {
      q: "Can I manage multiple plumbing crews across different service areas?",
      a: "Absolutely. You can define service zones, assign techs to specific zones or allow cross-zone dispatching when needed. Multi-location plumbing operations can manage separate crews, zones, and schedules from a single dashboard, with role-based access so each dispatcher only sees their assigned region.",
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-[#f0f4ff]">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
          >
            Common Questions About Plumbing Scheduling Software
          </motion.h2>
          <p className="text-slate-500 text-lg">Everything plumbing contractors ask before switching to StaffSchedule.io.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.06 }}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${open === i ? "border-blue-500 shadow-lg shadow-blue-100" : "border-slate-200 hover:border-blue-300"}`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left flex items-center justify-between p-6 font-bold text-slate-800 text-sm md:text-base"
              >
                <span className="pr-4">{faq.q}</span>
                <ChevronDown size={18} className={`shrink-0 text-blue-500 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: CTA ─────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 p-12 md:p-16 text-center shadow-2xl shadow-blue-900/30">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)" }}
          />
          {/* Floating orbs */}
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-12 right-12 w-24 h-24 rounded-full bg-white/10 blur-2xl"
          />
          <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-12 left-12 w-32 h-32 rounded-full bg-indigo-400/20 blur-2xl"
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-blue-200 text-xs font-bold uppercase tracking-widest mb-6">
              <Zap size={12} />
              Stop Leaking Time & Money
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Your Plumbing Business Deserves Better Than Spreadsheets
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Join 1,500+ plumbing contractors who use StaffSchedule.io to dispatch faster, reduce overtime disputes, and keep every technician coordinated — on every job, every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <button className="h-14 px-10 rounded-xl font-black bg-white text-blue-800 hover:bg-blue-50 transition-all shadow-xl hover:-translate-y-1 text-sm tracking-wide w-full sm:w-auto">
                  Start Free 14-Day Trial
                </button>
              </Link>
              <Link href="/demo">
                <button className="h-14 px-10 rounded-xl font-bold border-2 border-white/30 text-white hover:bg-white/10 transition-all w-full sm:w-auto text-sm">
                  Book a Live Demo
                </button>
              </Link>
            </div>
            <p className="mt-6 text-blue-300 text-sm">No credit card required · Setup in under 30 minutes · Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE EXPORT ──────────────────────────────────────────────────────────────
export default function PlumbingSchedulingSoftwarePage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <HeroSection />
      <StatsBar />
      <PainPointsSection />
      <FeaturesSection />
      <WorkflowSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
