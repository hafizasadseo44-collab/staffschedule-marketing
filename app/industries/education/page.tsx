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
  GraduationCap, Clock, ShieldAlert, BookOpen,
  Activity, Users, Calendar, Megaphone,
  School, Bell, CheckCircle, Shield
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
   HERO — "Campus Deployment" Dashboard
   Indigo & Slate Collaborative Aesthetic
══════════════════════════════════ */
function HeroSection() {
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const rotateX = useMotionSpring(useTransform(my, [-300, 300], [3, -3]), { stiffness: 100, damping: 30 });
  const rotateY = useMotionSpring(useTransform(mx, [-600, 600], [-3, 3]), { stiffness: 100, damping: 30 });

  const shifts = [
    { name: "Substitute Needed", role: "11th Grade History", time: "07:30 AM", status: "Broadcasting", alert: true },
    { name: "M. Rodriguez", role: "Campus Security", time: "08:00 AM", status: "On Post", alert: false },
    { name: "A. Thompson", role: "Admin Staff", time: "08:00 AM", status: "Clocked In", alert: false },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 bg-[#0f172a]" // Deep indigo/slate
      onMouseMove={e => { mx.set(e.clientX - window.innerWidth / 2); my.set(e.clientY - window.innerHeight / 2); }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[100px]" />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-slate-500/20 rounded-full blur-[100px]" />
        
        <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">

        {/* Left copy */}
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-900/40 border border-indigo-500/30 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-6 font-mono">
            <School className="w-3.5 h-3.5" />
            Education Staff Scheduling
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl xl:text-[3.5rem] font-black leading-[1.07] tracking-tight mb-5 text-white">
            Connect the Campus.{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
              End the Morning Scramble.
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-8 max-w-xl">
            Coordinate your entire educational workforce in one place. Dispatch substitute teachers instantly, manage campus security patrols, and schedule administrative staff without the chaos.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-start mb-7">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-bold rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #4f46e5, #3b82f6)" }}>
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold rounded-xl transition-all duration-200 backdrop-blur-sm">
              See Campus Workflow
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 text-xs font-mono text-slate-400 uppercase tracking-wider">
            {["Substitute Dispatch", "Security Patrols", "Admin Staff"].map(t => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />{t}</span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — "Campus" dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div style={{ rotateX, rotateY, transformPerspective: 1400 }} className="relative w-full max-w-lg">

            {/* Main dashboard card */}
            <div className="bg-[#1e293b] rounded-2xl shadow-2xl shadow-indigo-900/40 border border-slate-700 overflow-hidden relative">
              
              {/* Header */}
              <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between bg-[#0f172a]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-900/50 flex items-center justify-center border border-indigo-800/50">
                    <GraduationCap className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">Campus Deployment</h3>
                    <p className="text-[10px] text-slate-500 font-mono">North High School · Live Status</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-white">06:45 AM</p>
                  <p className="text-[10px] text-slate-400">Roll Call</p>
                </div>
              </div>

              {/* Status Board */}
              <div className="px-5 py-5">
                <div className="space-y-3">
                  {shifts.map((s, i) => (
                    <div key={i} className={`bg-[#0f172a] rounded-lg p-3 border ${s.alert ? 'border-indigo-500/50' : 'border-slate-700'} flex items-center justify-between`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-10 rounded-full ${s.alert ? 'bg-indigo-500 animate-pulse' : 'bg-slate-500'}`} />
                        <div>
                          <p className="text-sm font-bold text-slate-200">{s.name}</p>
                          <p className={`text-xs font-semibold ${s.alert ? 'text-indigo-400' : 'text-slate-400'}`}>{s.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono px-2 py-1 rounded mb-1 inline-block bg-slate-800 text-slate-400">
                          {s.time}
                        </span>
                        <p className={`text-[10px] font-bold uppercase mt-1 ${s.alert ? 'text-indigo-400' : 'text-slate-500'}`}>{s.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Floating Notifications */}
            <motion.div initial={{ opacity: 0, x: -40, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.3, ...spring }}
              className="absolute -left-6 top-32 bg-[#0f172a] rounded-xl shadow-xl border border-slate-600 px-4 py-3 flex items-center gap-3 z-30">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-blue-400 uppercase tracking-wider">Substitute Found</p>
                <p className="text-sm font-bold text-slate-200">D. Evans accepted job</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 2.2, ...spring }}
              className="absolute -right-6 bottom-16 bg-[#0f172a] rounded-xl shadow-xl border border-slate-600 px-4 py-3 flex items-center gap-3 z-30">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
                <Shield className="w-5 h-5 text-slate-300" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Security Shift</p>
                <p className="text-sm font-bold text-slate-200">South Gate Covered</p>
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
    { v: 80, s: "%", l: "faster substitute placement" },
    { v: 15, s: " hrs", l: "saved by school admins weekly" },
    { v: 100, s: "%", l: "visibility across the district" },
    { v: 0, s: "", l: "missed communication alerts" },
  ];
  return (
    <div ref={ref} className="border-y border-slate-800 bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-slate-800">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.09 }} className="flex flex-col items-center gap-2 px-6 text-center">
            <p className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent tracking-tight">
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
      icon: Bell, title: "The 6 AM Call-Out Panic",
      body: "A teacher wakes up sick and leaves a voicemail at 6 AM. The principal scrambles to call 10 different substitute teachers while students wait outside the classroom.",
      fix: "Instant mobile broadcasting. Send the open assignment to all approved substitutes simultaneously and fill it in minutes.",
      color: "#4f46e5", // Indigo
    },
    {
      icon: Shield, title: "Uncoordinated Campus Security",
      body: "Security guards patrol different zones, but administrators don't know who is where, making incident response slow and disorganized.",
      fix: "Zone-based deployment. Assign security to specific gates or buildings and verify their location with GPS clock-ins.",
      color: "#3b82f6", // Blue
    },
    {
      icon: Users, title: "Siloed Admin Scheduling",
      body: "The cafeteria staff is on a whiteboard, janitorial is in an Excel file, and paraprofessionals are scheduled via email. It's impossible to see the big picture.",
      fix: "Unified district dashboard. Manage all non-instructional and support staff in one centralized, real-time platform.",
      color: "#0ea5e9", // Sky
    },
    {
      icon: Megaphone, title: "Lost Campus Announcements",
      body: "Important updates (like severe weather delays or policy changes) are sent via email, but staff members checking their phones on the go miss them.",
      fix: "In-app push notifications. Send urgent announcements directly to staff phones and track who has read them.",
      color: "#8b5cf6", // Purple
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-800 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            Campus Administration
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Schools Are Complex. <span className="text-indigo-600">Scheduling Shouldn't Be.</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            From the front office to the cafeteria, coordinate every moving part of your educational workforce effortlessly.
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
      icon: Users, title: "1. Organize by Department",
      body: "Separate your staff into logical groups: Substitutes, Security, Custodial, Admin, and Aides. Manage their schedules independently or view them all together.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop",
      color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200"
    },
    {
      icon: BookOpen, title: "2. Handle Teacher Absences",
      body: "When a teacher submits an absence in the app, it automatically creates an 'Open Shift' for a substitute to claim, requiring zero administrative effort.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
      color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200"
    },
    {
      icon: Calendar, title: "3. Schedule Support Staff",
      body: "Build recurring schedules for the cafeteria and maintenance teams based on the school's bell schedule and facility needs.",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop",
      color: "text-sky-600", bg: "bg-sky-50", border: "border-sky-200"
    },
    {
      icon: Activity, title: "4. Track District Labor",
      body: "District administrators can pull centralized reports to see which schools are understaffed and track total hours for hourly campus employees.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
      color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200"
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
            A Smarter Workflow for Your Campus
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            From the district office to the classroom, keep every staff member aligned.
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
    { icon: Users, t: "Substitute Management", d: "Instantly broadcast open assignments to your pool of approved substitute teachers directly to their mobile devices.", grad: "from-indigo-500 to-blue-500" },
    { icon: Clock, t: "GPS Time Clock", d: "Ensure hourly support staff are physically on campus when they clock in using geofenced mobile tracking.", grad: "from-blue-500 to-sky-500" },
    { icon: Shield, t: "Security Dispatching", d: "Assign security personnel to specific campus zones and track coverage dynamically throughout the day.", grad: "from-slate-600 to-slate-800" },
    { icon: Megaphone, t: "District Announcements", d: "Send emergency alerts, weather delays, or policy updates via push notification to all staff simultaneously.", grad: "from-purple-500 to-pink-500" },
    { icon: Calendar, t: "Time-Off Requests", d: "Staff can request personal days through the app. Managers approve digitally, automatically updating the roster.", grad: "from-indigo-400 to-indigo-600" },
    { icon: Activity, t: "Overtime Tracking", d: "Prevent budget overruns by getting alerted before an hourly paraprofessional or custodian hits overtime.", grad: "from-rose-500 to-orange-500" },
  ];
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Everything Your District Needs
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Tools designed specifically to manage the complex, multi-role workforce of modern education.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feats.map((f, i) => (
            <motion.div key={f.t}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300">
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
    <section className="py-24 bg-[#0f172a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#6366f1 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <School className="w-12 h-12 text-indigo-500 mx-auto mb-8 opacity-80" />
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-relaxed tracking-tight mb-10">
            &ldquo;Managing the support staff for three different campuses used to be a nightmare of group texts and spreadsheets. StaffSchedule.io centralized everything. Now, when a teacher is out, a sub is booked before I even sit down at my desk.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-indigo-400 bg-slate-800 flex items-center justify-center font-bold text-slate-300 text-xl">
              PT
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-lg">Principal Thompson</p>
              <p className="text-indigo-400 text-sm font-medium">Westlake Independent School District</p>
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
    { q: "Is this meant for teachers or support staff?", a: "Both. While teachers usually have fixed class schedules, StaffSchedule.io is perfect for managing their time-off requests and automatically routing those absences to your substitute teacher pool. It's also ideal for actively scheduling hourly staff like security, aides, and administration." },
    { q: "How does the substitute teacher dispatch work?", a: "When an absence is created, the system generates an 'open shift' for that assignment. It immediately sends a push notification to your designated pool of substitute teachers. The first one to accept it in the app claims the assignment, and the principal is notified." },
    { q: "Can we use this across an entire school district?", a: "Yes. The platform is built for multi-location management. District admins can view staffing levels across all schools, while individual principals only see and manage their specific campus." },
    { q: "Do staff members have to pay for the mobile app?", a: "No, the StaffSchedule.io mobile app is completely free for all your employees to download on iOS and Android devices." },
    { q: "Can we track hours for student workers or part-time aides?", a: "Absolutely. The built-in GPS time clock allows hourly staff to punch in and out from their phones. The system tracks their hours, calculates overtime, and exports directly to your payroll software." },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Common Questions from School Admins
          </h2>
          <p className="text-slate-600 text-lg">Details on campus deployment, substitute management, and more.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:border-indigo-300 transition-colors">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left bg-white">
                <span className="font-bold text-slate-900 pr-4 text-base sm:text-lg">{f.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-5 h-5 text-indigo-600 flex-shrink-0" />
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
    <section className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Ready to organize your campus?
          </h2>
          <p className="text-slate-600 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Join the schools and districts that use StaffSchedule.io to manage substitutes, security, and support staff.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg">
              Start Your Free 14-Day Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 font-bold rounded-xl transition-all duration-200 text-lg">
              Book a District Demo
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {["No credit card required", "Cancel anytime", "Implementation support"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-600">{t}</span>
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
export default function EducationPage() {
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
