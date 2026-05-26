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
  Briefcase, Users, Clock, Calendar, MessageSquare,
  DollarSign, TrendingUp, BarChart3, Shield, Globe,
  Building2, Layers, Zap, Phone, Mail, FileText,
  UserCheck, Target, Award, Sparkles, ChevronRight,
  Code, ShoppingBag, Hotel, UtensilsCrossed,
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
   HERO — "Client Engagement Calendar"
   Corporate violet/slate premium aesthetic
══════════════════════════════════ */
function HeroSection() {
  const [activeProject, setActiveProject] = useState(0);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const rotateX = useMotionSpring(useTransform(my, [-300, 300], [3, -3]), { stiffness: 120, damping: 30 });
  const rotateY = useMotionSpring(useTransform(mx, [-600, 600], [-3, 3]), { stiffness: 120, damping: 30 });

  const projects = [
    { client: "Meridian Capital", type: "Strategy Review", team: 4, status: "Active", color: "#8b5cf6" },
    { client: "Apex Consulting", type: "M&A Due Diligence", team: 7, status: "Active", color: "#6366f1" },
    { client: "TechCorp Group", type: "IT Audit", team: 3, status: "Upcoming", color: "#a78bfa" },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveProject(a => (a + 1) % projects.length), 2800);
    return () => clearInterval(id);
  }, [projects.length]);

  const schedule = [
    { time: "9:00", person: "Sarah K.", task: "Client strategy session · Meridian", hours: "3h", billable: true },
    { time: "10:00", person: "James L.", task: "Due diligence review · Apex", hours: "4h", billable: true },
    { time: "2:00 PM", person: "Maya R.", task: "IT audit prep · TechCorp", hours: "2h", billable: true },
    { time: "4:00 PM", person: "David M.", task: "Internal meeting", hours: "1h", billable: false },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
      style={{ background: "linear-gradient(135deg, #faf9ff 0%, #f3f0ff 40%, #ede9fe 70%, #e8e3ff 100%)" }}
      onMouseMove={e => { mx.set(e.clientX - window.innerWidth / 2); my.set(e.clientY - window.innerHeight / 2); }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-violet-200/40 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-3xl" />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(109,40,217,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(109,40,217,0.8) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">

        {/* Left copy */}
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 border border-violet-200 text-violet-700 text-xs font-bold tracking-widest uppercase mb-6">
            <Briefcase className="w-3.5 h-3.5" />
            For Professional Service Firms
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl xl:text-[3.5rem] font-black leading-[1.07] tracking-tight mb-5" style={{ color: "#1e1147" }}>
            Schedule Your Team.{" "}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Protect Every Billable Hour.
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
            Consulting firms, agencies, and professional service teams use StaffSchedule.io to coordinate staff across client projects — without the spreadsheet chaos or missed billable time.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-start mb-7">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-violet-300/60 hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)" }}>
              Start Free for Your Firm <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/80 hover:bg-white border border-violet-200 text-violet-700 font-semibold rounded-xl transition-all duration-200 shadow-sm">
              See How It Works
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 text-xs text-slate-500">
            {["14-day free trial", "No credit card needed", "Works for any service firm"].map(t => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-violet-500" />{t}</span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — "Client Engagement Calendar" dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div style={{ rotateX, rotateY, transformPerspective: 1400 }} className="relative w-full max-w-lg">

            {/* Main dashboard card */}
            <div className="bg-white rounded-3xl shadow-2xl shadow-violet-200/50 border border-violet-100 overflow-hidden">
              {/* Header */}
              <div className="px-5 py-3.5 border-b border-violet-50 flex items-center justify-between bg-gradient-to-r from-violet-50 to-indigo-50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">StaffSchedule.io</p>
                    <p className="text-xs font-bold text-slate-800">Professional Services</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-600">Live</span>
                </div>
              </div>

              {/* Active projects */}
              <div className="px-5 py-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Active Client Engagements</p>
                <div className="space-y-2">
                  {projects.map((p, i) => (
                    <motion.button key={p.client} onClick={() => setActiveProject(i)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all duration-200 ${i === activeProject ? "shadow-sm" : "hover:bg-slate-50"}`}
                      style={i === activeProject ? { backgroundColor: `${p.color}12`, border: `1px solid ${p.color}30` } : { border: "1px solid transparent" }}>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-black" style={{ backgroundColor: p.color }}>
                          {p.client.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{p.client}</p>
                          <p className="text-[10px] text-slate-400">{p.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold text-slate-500">{p.team} staff</span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${p.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                          {p.status}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Today's schedule */}
              <div className="px-5 pb-4 border-t border-violet-50">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-3 mb-2.5">Today's Team Schedule</p>
                <div className="space-y-1.5">
                  {schedule.map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg hover:bg-slate-50 transition-colors duration-150">
                      <span className="text-[9px] font-mono font-bold text-slate-400 w-12 flex-shrink-0">{s.time}</span>
                      <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[8px] font-black">{s.person.split(" ").map(w => w[0]).join("")}</span>
                      </div>
                      <p className="text-[10px] text-slate-600 flex-1 truncate">{s.task}</p>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <span className="text-[9px] font-bold text-slate-500">{s.hours}</span>
                        {s.billable && <span className="text-[8px] font-bold px-1.5 py-0.5 bg-violet-50 text-violet-600 rounded-md">$$$</span>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer stat */}
              <div className="px-5 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-between">
                <span className="text-violet-100 text-[10px] font-semibold">Today's billable hours</span>
                <span className="text-white text-sm font-black">87% captured ↑</span>
              </div>
            </div>

            {/* Floating cards */}
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.85 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.3, ...spring }}
              className="hidden md:flex absolute -left-10 top-20 bg-white rounded-2xl shadow-xl border border-slate-100 px-3.5 py-2.5 items-center gap-2.5 z-10">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Billable Hours</p>
                <p className="text-xs font-black text-slate-800">+$12,400 this week</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -20, scale: 0.85 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.8, ...spring }}
              className="hidden md:flex absolute -right-8 bottom-24 bg-white rounded-2xl shadow-xl border border-slate-100 px-3.5 py-2.5 items-center gap-2.5 z-10">
              <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-violet-600" />
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Shift Approved</p>
                <p className="text-xs font-black text-slate-800">Maya → Apex project</p>
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
    { v: 80, s: "%", l: "less time spent on scheduling admin" },
    { v: 98, s: "%", l: "billable hour capture accuracy" },
    { v: 12, s: " hrs", l: "saved per manager, per week" },
    { v: 4.9, s: "/5", l: "average customer rating" },
  ];
  return (
    <div ref={ref} className="border-y border-violet-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 divide-y-2 lg:divide-y-0 lg:divide-x divide-violet-100">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.09 }} className="flex flex-col items-center gap-1 px-6 py-4 text-center">
            <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              {inView ? <Counter to={s.v} suffix={s.s} /> : `0${s.s}`}
            </p>
            <p className="text-sm font-semibold text-slate-600 leading-tight">{s.l}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════
   PAIN POINTS — real problems
══════════════════════════════════ */
function PainPoints() {
  const pains = [
    {
      icon: FileText, title: "Timesheets are always wrong",
      body: "Staff forget to log hours. Managers spend Friday afternoons chasing approvals. Clients get inaccurate invoices — and trust erodes every time.",
      fix: "Automatic clock-in tied to the schedule. Timesheets are pre-filled and waiting for approval.",
      color: "#7c3aed",
    },
    {
      icon: Users, title: "Nobody knows who's available",
      body: "Coordinating consultants across different projects feels like solving a puzzle blindfolded. You email, wait, and hope for the best.",
      fix: "Live availability calendar. See every team member's capacity in real time before you commit to a client.",
      color: "#6366f1",
    },
    {
      icon: Calendar, title: "Schedule conflicts embarrass you",
      body: "You've double-booked a senior consultant. The client meeting is tomorrow. The scramble starts — and professionalism takes a hit.",
      fix: "Conflict detection flags overlaps instantly before the schedule publishes. No more surprise double-books.",
      color: "#8b5cf6",
    },
    {
      icon: MessageSquare, title: "Last-minute changes cause chaos",
      body: "A consultant gets sick. You're calling people at 7am. Half don't pick up. The client doesn't hear about the change until it's too late.",
      fix: "One-tap broadcast to your whole team. Coverage confirmed in minutes, not hours.",
      color: "#7c3aed",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold tracking-widest uppercase mb-5">
            The Real Problems
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            What Scheduling Chaos Costs{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Professional Firms</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Missed billable hours, staff conflicts, and scrambled last-minute coverage. Sound familiar? Here's how we fix all of it.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pains.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.09 }}
              className="group relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(160px circle at top left, ${p.color}08, transparent 70%)` }} />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${p.color}12` }}>
                <p.icon className="w-5 h-5" style={{ color: p.color }} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">{p.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">{p.body}</p>
              <div className="flex items-start gap-2 p-3 rounded-xl" style={{ backgroundColor: `${p.color}08` }}>
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
   HOW IT WORKS — horizontal timeline
══════════════════════════════════ */
function HowItWorks() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  const steps = [
    {
      icon: UserCheck, label: "Build your roster",
      title: "Import your entire team in minutes",
      body: "Add consultants, project managers, and support staff from a CSV or connect your HR system. Set roles, rates, and certifications once — the platform handles the rest.",
      visual: ["Sarah K. — Senior Consultant", "James L. — Project Manager", "Maya R. — Associate", "David M. — Admin"],
      color: "#7c3aed",
    },
    {
      icon: Calendar, label: "Create client schedules",
      title: "Assign teams to projects without conflicts",
      body: "Pick a client engagement, drag in the right team members based on availability and skill. The system flags conflicts before they happen — so your published schedule is always clean.",
      visual: ["Meridian Capital · 4 consultants", "Mon–Thu · 9am–5pm", "No conflicts detected ✓", "Publish with one click"],
      color: "#6366f1",
    },
    {
      icon: Phone, label: "Notify automatically",
      title: "Staff see their schedule on their phone",
      body: "Push notifications go out the moment a schedule publishes or changes. Consultants confirm shifts, request changes, or swap with colleagues — all without calling the office.",
      visual: ["Push: You're on Apex project Tue", "Confirm shift → done in 1 tap", "Swap with colleague → approved", "Updates sync instantly"],
      color: "#8b5cf6",
    },
    {
      icon: DollarSign, label: "Track billable hours",
      title: "Every hour captured, payroll-ready",
      body: "Staff clock in and out from the app. Hours sync to your timesheet view, tagged by client and project. Approve, export, and bill — without hunting for missing time.",
      visual: ["Sarah K. · Meridian · 6.5h ✓", "James L. · Apex · 7h ✓", "Maya R. · TechCorp · 4h ✓", "Export to payroll in 1 click"],
      color: "#7c3aed",
    },
  ];

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActive(a => (a + 1) % steps.length), 3000);
    return () => clearInterval(id);
  }, [inView, steps.length]);

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-violet-950 via-indigo-950 to-slate-950">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-violet-200 text-xs font-bold tracking-widest uppercase mb-5">
            <Zap className="w-3.5 h-3.5" /> How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            From Roster to Revenue.{" "}
            <span className="bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">Four Simple Steps.</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Most professional service firms are live in under an hour. Here's what that journey looks like.
          </p>
        </motion.div>

        {/* Step tabs */}
        <div className="flex flex-col sm:flex-row gap-2 justify-center mb-10">
          {steps.map((s, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${active === i ? "text-white shadow-lg" : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"}`}
              style={active === i ? { background: `linear-gradient(135deg, ${s.color}cc, ${s.color}99)`, boxShadow: `0 8px 24px ${s.color}40` } : {}}>
              <s.icon className="w-4 h-4" />
              {s.label}
            </button>
          ))}
        </div>

        {/* Active step content */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5"
                style={{ backgroundColor: `${steps[active].color}20`, color: steps[active].color }}>
                Step {active + 1} of {steps.length}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">
                {steps[active].title}
              </h3>
              <p className="text-white/70 leading-relaxed text-lg mb-6">{steps[active].body}</p>
              <Link href="https://app.staffschedule.io/register"
                className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-200 hover:gap-3"
                style={{ color: steps[active].color }}>
                Try this now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Visual "terminal" mockup */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
                {["#ef4444", "#f59e0b", "#22c55e"].map(c => <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />)}
                <span className="text-[10px] text-white/30 font-mono ml-2">staffschedule.io / professional-services</span>
              </div>
              <div className="p-5 space-y-3">
                {steps[active].visual.map((line, i) => (
                  <motion.div key={line}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.12 }}
                    className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: steps[active].color }} />
                    <span className="text-sm font-medium text-white/80">{line}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   FEATURES GRID
══════════════════════════════════ */
function FeaturesGrid() {
  const feats = [
    { icon: Calendar, t: "Project-Based Scheduling", d: "Build schedules around client engagements, not generic shifts. Assign the right consultant to the right project with full availability visibility.", grad: "from-violet-600 to-purple-700" },
    { icon: DollarSign, t: "Billable Hour Tracking", d: "Every clock-in is timestamped and project-tagged. Approve timesheets in bulk. Export billable hours directly to your invoicing tool.", grad: "from-indigo-600 to-violet-600" },
    { icon: Users, t: "Availability Management", d: "Staff set their availability and time-off preferences. You see real-time capacity before you make promises to clients.", grad: "from-purple-600 to-fuchsia-600" },
    { icon: MessageSquare, t: "Team Messaging", d: "Message your whole firm, a project team, or one person. Read receipts confirm your briefing was seen before the client meeting.", grad: "from-violet-500 to-indigo-600" },
    { icon: Shield, t: "Role & Certification Tracking", d: "Track credentials, clearances, and specialist certifications. Only schedule qualified staff on sensitive engagements.", grad: "from-indigo-500 to-blue-600" },
    { icon: BarChart3, t: "Capacity Reports", d: "See utilization rates across your team. Know who's overloaded and who has capacity — before you take on new work.", grad: "from-violet-600 to-indigo-700" },
    { icon: Zap, t: "One-Tap Shift Swaps", d: "Consultant unavailable? Broadcast to your team. The first qualified person to accept gets the slot. No phone tag.", grad: "from-purple-500 to-violet-700" },
    { icon: Globe, t: "Multi-Office & Remote Support", d: "Schedule in-office, remote, and hybrid arrangements. Timezone-aware views so you're never confused about who's where.", grad: "from-indigo-600 to-violet-600" },
  ];
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-bold tracking-widest uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5" /> Built for Professional Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Every Feature Your Firm Needs.{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Nothing You Don't.</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Built for service firms where every hour counts and every client interaction matters.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {feats.map((f, i) => (
            <motion.div key={f.t}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-xl hover:border-violet-100 transition-all duration-300">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.grad} flex items-center justify-center mb-4 shadow-sm`}>
                <f.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">{f.t}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   SERVICE FIRM TYPES
══════════════════════════════════ */
function FirmTypes() {
  const types = [
    { icon: Briefcase, t: "Management Consulting", d: "Project-based scheduling, utilization tracking, multi-client coordination" },
    { icon: FileText, t: "Legal & Law Firms", d: "Case-based availability, counsel assignments, deadline-driven scheduling" },
    { icon: BarChart3, t: "Accounting & Finance", d: "Tax season surges, audit team deployment, hourly billing accuracy" },
    { icon: Target, t: "Marketing & Creative Agencies", d: "Campaign staffing, freelancer management, client retainer scheduling" },
    { icon: Building2, t: "Architecture & Engineering", d: "Project milestones, field crew coordination, multi-site management" },
    { icon: Award, t: "HR & Recruitment Firms", d: "Consultant availability, candidate screening scheduling, client visits" },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Built for Every Kind of Professional Service Firm
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            From boutique consultancies to large multi-office firms — the same platform adapts to how you work.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {types.map((t, i) => (
            <motion.div key={t.t}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-violet-50/60 to-indigo-50/40 border border-violet-100 hover:border-violet-300 hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-200">
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
function Testimonial() {
  return (
    <section className="py-24 bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 relative overflow-hidden">
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-yellow-300 text-yellow-300" />)}
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white leading-relaxed tracking-tight mb-8">
            &ldquo;We used to lose 8–10% of billable hours to bad tracking and scheduling gaps. Since switching to StaffSchedule.io, our consultants log{" "}
            <span className="bg-white/20 px-2 py-0.5 rounded-lg">every hour automatically</span>{" "}
            and we bill more accurately than we ever have. It paid for itself in the first week.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-300 to-indigo-400 flex items-center justify-center text-white font-black shadow-lg">
              AR
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-lg">Amanda R.</p>
              <p className="text-violet-100/80 text-sm">Managing Partner · Strategic Advisory Firm · 28 consultants</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   MOBILE APP SECTION
══════════════════════════════════ */
function MobileAppSection() {
  const notifications = [
    { icon: Calendar, msg: "New project assigned: Apex Q3 audit", time: "2m ago", color: "#7c3aed" },
    { icon: CheckCircle2, msg: "Sarah approved your Monday shift swap", time: "15m ago", color: "#10b981" },
    { icon: DollarSign, msg: "Timesheet ready: 38.5h this week", time: "1h ago", color: "#6366f1" },
    { icon: MessageSquare, msg: "James: 'Client meeting moved to 3PM'", time: "2h ago", color: "#8b5cf6" },
  ];
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-bold tracking-widest uppercase mb-6">
            <Phone className="w-3.5 h-3.5" /> Mobile App
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-5">
            Your Consultants Manage Everything{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">From Their Phones</span>
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg mb-8">
            No one logs into a desktop to check their schedule. Your team gets the StaffSchedule.io app — and manages their entire work life from a device they already carry everywhere.
          </p>
          <ul className="space-y-3 mb-8">
            {["View schedule and upcoming client assignments", "Clock in and out with one tap", "Request time off or availability changes", "Message teammates and managers instantly", "Review and approve timesheets on the go"].map(item => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-violet-500 flex-shrink-0" />
                <span className="text-slate-600 text-sm">{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex gap-3">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)" }}>
              Get the App <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Notification stack */}
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative">
          <div className="bg-slate-900 rounded-3xl p-5 max-w-sm mx-auto shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-white/40 text-xs font-mono">StaffSchedule.io · Notifications</p>
              <span className="bg-violet-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">{notifications.length} new</span>
            </div>
            <div className="space-y-3">
              {notifications.map((n, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${n.color}25` }}>
                    <n.icon className="w-4 h-4" style={{ color: n.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-semibold leading-tight mb-0.5">{n.msg}</p>
                    <p className="text-white/40 text-[10px]">{n.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   OTHER INDUSTRIES LINKS
══════════════════════════════════ */
function OtherIndustries() {
  const industries = [
    { icon: UtensilsCrossed, label: "Restaurants", href: "/industries/restaurants", color: "#ea580c" },
    { icon: Hotel, label: "Hotels & Hospitality", href: "/industries/hotels-resorts", color: "#f59e0b" },
    { icon: ShoppingBag, label: "Retail", href: "/industries/retail", color: "#ec4899" },
    { icon: Code, label: "Technology Teams", href: "/industries/technology-software", color: "#6366f1" },
  ];
  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-slate-900 mb-2">Explore Other Industries</h2>
          <p className="text-slate-500">StaffSchedule.io powers teams across 30+ sectors.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {industries.map(ind => (
            <Link key={ind.label} href={ind.href}
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md bg-white transition-all duration-200 text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: `${ind.color}15` }}>
                <ind.icon className="w-6 h-6" style={{ color: ind.color }} />
              </div>
              <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">{ind.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/industries" className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors">
            View all 30+ industries <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
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
    { q: "What is professional services scheduling software?", a: "Professional services scheduling software helps consulting firms, agencies, and service-based businesses manage staff schedules, track billable hours, assign people to client projects, and coordinate teams efficiently. It replaces spreadsheets and email chains with a centralized platform that gives everyone real-time visibility." },
    { q: "How does StaffSchedule.io help firms track billable hours?", a: "When staff clock in via the app, their time is automatically tagged to the client project they're scheduled on. Hours flow directly into your timesheet view, where managers can review and approve them. Payroll-ready exports eliminate manual entry and capture hours that might otherwise be forgotten." },
    { q: "Can I see who's available before assigning them to a client project?", a: "Yes — the availability dashboard shows you every team member's schedule at a glance. You can see who's free, who's at capacity, and who has upcoming time off. This means you can commit to client timelines with confidence, not guesswork." },
    { q: "What types of professional service firms use StaffSchedule.io?", a: "Management consultants, law firms, accounting practices, marketing agencies, architecture firms, engineering consultancies, HR firms, IT service companies, and more. If you have a team of professionals serving clients who bill by the hour or project, StaffSchedule.io is built for you." },
    { q: "Does it work for remote and hybrid professional service teams?", a: "Absolutely. StaffSchedule.io is designed for teams that aren't all in one place. Remote consultants, hybrid workers, and field staff all manage their schedules through the mobile app. Managers see a unified view of who's working regardless of location." },
    { q: "How long does setup take for a consulting firm?", a: "Most firms are live within an hour. You import your roster, configure client engagements as project templates, set billing rules, and publish your first schedule. Staff download the mobile app and get immediate access. No lengthy implementation or IT involvement needed." },
    { q: "Is there a free trial for professional service firms?", a: "Yes. Every plan comes with a 14-day free trial — no credit card required. You can run your full team on it, schedule client engagements, and evaluate the billable hour tracking before paying a cent. Support is included from day one." },
  ];
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Common Questions from Service Firm Leaders
          </h2>
          <p className="text-slate-500 text-lg">Answers to what consultants, partners, and operations managers ask most.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="border border-violet-100 rounded-2xl overflow-hidden bg-white shadow-sm">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-violet-50/40 transition-colors duration-150">
                <span className="font-semibold text-slate-900 pr-4 text-sm sm:text-base">{f.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown className="w-5 h-5 text-violet-400 flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>
                    <div className="px-6 pb-5 pt-3 text-slate-600 leading-relaxed text-sm border-t border-violet-50">{f.a}</div>
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
    <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #faf9ff 0%, #ede9fe 50%, #e0d9ff 100%)" }}>
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 9, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-violet-300/50">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-5 leading-tight" style={{ color: "#1e1147" }}>
            Stop Losing Billable Time to{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Scheduling Chaos</span>
          </h2>
          <p className="text-slate-600 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Join professional service firms that run tighter teams, bill more accurately, and spend less time managing schedules.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl hover:shadow-violet-300/60 hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)" }}>
              Start Your Free 14-Day Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-violet-50 border border-violet-200 text-violet-700 font-semibold rounded-xl transition-all duration-200 shadow-sm">
              Talk to Our Team
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {["No credit card required", "14-day free trial", "Live on day one", "Cancel anytime"].map(t => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-violet-500 flex-shrink-0" />
                <span className="text-sm text-slate-600">{t}</span>
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
export default function ProfessionalServicesPage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <PainPoints />
      <HowItWorks />
      <FeaturesGrid />
      <FirmTypes />
      <Testimonial />
      <MobileAppSection />
      <OtherIndustries />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
