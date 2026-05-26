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
  Stethoscope, HeartPulse, Clock, MessageSquare, ShieldPlus,
  Users, Calendar, Activity, Syringe, CalendarCheck, FileText, Smartphone, Hospital
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
   HERO — "Clinic Floor" Dashboard
   Trustworthy, organized healthcare (Teal & Soft Blue)
══════════════════════════════════ */
function HeroSection() {
  const [time, setTime] = useState(0);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const rotateX = useMotionSpring(useTransform(my, [-300, 300], [4, -4]), { stiffness: 100, damping: 30 });
  const rotateY = useMotionSpring(useTransform(mx, [-600, 600], [-4, 4]), { stiffness: 100, damping: 30 });

  const shifts = [
    { time: "08:00 AM", active: true },
    { time: "01:00 PM", active: false },
    { time: "06:00 PM", active: false },
  ];

  useEffect(() => {
    const id = setInterval(() => setTime(t => (t + 1) % shifts.length), 3000);
    return () => clearInterval(id);
  }, [shifts.length]);

  const assignments = [
    { role: "Veterinarian", name: "Dr. E. Smith", task: "Surgery Block A", status: "In Surgery", type: "med" },
    { role: "Vet Tech", name: "S. Miller", task: "Triage & Vitals", status: "On Floor", type: "tech" },
    { role: "Reception", name: "J. Davis", task: "Client Intake", status: "Front Desk", type: "admin" },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 bg-slate-50"
      onMouseMove={e => { mx.set(e.clientX - window.innerWidth / 2); my.set(e.clientY - window.innerHeight / 2); }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-teal-100 rounded-full blur-[100px]" />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[100px]" />
        
        {/* Soft grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">

        {/* Left copy */}
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            <Stethoscope className="w-3.5 h-3.5" />
            Veterinary Scheduling Software
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl xl:text-[3.5rem] font-black leading-[1.07] tracking-tight mb-5 text-slate-900">
            Care for Pets.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
              We'll Care for the Schedule.
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
            Coordinate your entire animal hospital seamlessly. From multi-doctor surgical blocks to 24/7 on-call emergency rotations for vet techs, keep your clinic running without the spreadsheet chaos.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-start mb-7">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-bold rounded-xl transition-all duration-200 shadow-[0_4px_14px_0_rgba(13,148,136,0.39)] hover:shadow-[0_6px_20px_rgba(13,148,136,0.23)] hover:-translate-y-0.5 bg-gradient-to-r from-teal-500 to-teal-600">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-xl transition-all duration-200 shadow-sm">
              See Clinic Workflows
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {["Multi-Doctor Sync", "On-Call Rotations", "Mobile App"].map(t => (
              <span key={t} className="flex items-center gap-1.5"><HeartPulse className="w-4 h-4 text-rose-500" />{t}</span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — "Clinic Floor" dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div style={{ rotateX, rotateY, transformPerspective: 1400 }} className="relative w-full max-w-lg">

            {/* Main dashboard card */}
            <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden relative">
              
              {/* Header */}
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center border border-teal-100">
                    <Hospital className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Main Clinic Floor</h3>
                    <p className="text-xs text-slate-500 font-medium">Daily Roster · {shifts[time].time}</p>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-teal-100 flex items-center justify-center text-xs font-bold text-teal-700">ES</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">SM</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-700">JD</div>
                </div>
              </div>

              {/* Status Board */}
              <div className="px-5 py-5 bg-slate-50/50">
                <div className="flex justify-between items-end mb-4">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Staff Assignments</p>
                  <p className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-full border border-teal-100">LIVE SYNC</p>
                </div>
                <div className="space-y-3">
                  {assignments.map((a, i) => (
                    <div key={i} className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-10 rounded-full ${a.type === 'med' ? 'bg-teal-500' : a.type === 'tech' ? 'bg-blue-500' : 'bg-purple-500'}`} />
                        <div>
                          <p className="text-sm font-bold text-slate-900">{a.name}</p>
                          <p className="text-xs font-medium text-slate-500">{a.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded mb-1">{a.task}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{a.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency On-Call Alert Mockup */}
              <div className="px-5 pb-5">
                <div className="bg-rose-50 rounded-xl border border-rose-100 p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldPlus className="w-4 h-4 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-rose-900">Emergency On-Call Request</p>
                    <p className="text-xs text-rose-700 mt-1 mb-2 leading-relaxed">Dr. Martinez requested emergency surgical coverage for incoming trauma case.</p>
                    <button className="text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 px-3 py-1.5 rounded-lg shadow-sm transition-colors">
                      Accept Coverage
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Floating UI Badges */}
            <motion.div initial={{ opacity: 0, x: -40, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.3, ...spring }}
              className="absolute -left-8 top-32 bg-white rounded-xl shadow-xl border border-slate-100 px-4 py-3 flex items-center gap-3 z-30">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Shift Swap</p>
                <p className="text-sm font-bold text-slate-900">Approved for Techs</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 2.2, ...spring }}
              className="absolute -right-6 bottom-24 bg-white rounded-xl shadow-xl border border-slate-100 px-4 py-3 flex items-center gap-3 z-30">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Coverage</p>
                <p className="text-sm font-bold text-slate-900">Weekend Fully Staffed</p>
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
    { v: 12, s: " hrs", l: "saved per week on scheduling" },
    { v: 100, s: "%", l: "on-call coverage visibility" },
    { v: 0, s: "", l: "shift confusion incidents" },
    { v: 98, s: "%", l: "staff adoption rate" },
  ];
  return (
    <div ref={ref} className="border-y border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-slate-100">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.09 }} className="flex flex-col items-center gap-2 px-6 text-center">
            <p className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {inView ? <Counter to={s.v} suffix={s.s} /> : `0${s.s}`}
            </p>
            <p className="text-sm font-semibold text-slate-500 leading-tight">{s.l}</p>
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
      icon: CalendarCheck, title: "Spreadsheet Chaos",
      body: "Managing multi-doctor rotations, tech shifts, and front desk hours on a whiteboard or Excel sheet leads to double-booking and burnout.",
      fix: "Unified digital roster. See every role, room assignment, and overlapping shift in one perfectly organized view.",
      color: "#0ea5e9",
    },
    {
      icon: ShieldPlus, title: "The Emergency On-Call Panic",
      body: "When an overnight emergency hits and the scheduled vet is unavailable, practice managers waste precious time calling down a printed list.",
      fix: "Instant mobile broadcast. Ping available, qualified vets instantly to claim the emergency shift right from their phones.",
      color: "#f43f5e",
    },
    {
      icon: Users, title: "Role Imbalance on the Floor",
      body: "You accidentally schedule three surgeons but only one vet tech to support them, creating a bottleneck that slows down the entire clinic.",
      fix: "Smart coverage rules. The system warns you if your Vet-to-Tech ratio falls below your required threshold for a shift.",
      color: "#0d9488",
    },
    {
      icon: MessageSquare, title: "Lost Time-Off Requests",
      body: "Staff write time-off requests on sticky notes that get lost on the manager's desk, leading to angry employees and understaffed Saturdays.",
      fix: "In-app request management. Staff request time off via the app, managers approve it, and it blocks them from the schedule automatically.",
      color: "#8b5cf6",
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Animal Care is Hard Enough. <br />
            <span className="text-teal-600">Scheduling Shouldn't Be.</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Veterinary practice managers face unique challenges that generic scheduling apps simply can't handle. We built a platform that understands how your clinic actually works.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pains.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.09 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300" style={{ backgroundColor: `${p.color}15`, border: `1px solid ${p.color}30` }}>
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
      icon: Calendar, title: "1. Build Your Roster Templates",
      body: "Create reusable scheduling templates for your standard clinic hours. Define how many DVMs, RVTs, and Assistants you need for every day of the week.",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop",
      color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200"
    },
    {
      icon: Users, title: "2. Assign Roles & Zones",
      body: "Don't just schedule a time; schedule an assignment. Put Dr. A in Surgery, Dr. B on Routine Exams, and assign specific techs to support them.",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop",
      color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200"
    },
    {
      icon: Smartphone, title: "3. Publish to Mobile App",
      body: "Hit publish and instantly notify your entire pet care team via push notification. They always have the most up-to-date roster in their pocket.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
      color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200"
    },
    {
      icon: Activity, title: "4. Manage Swaps & Time-Off",
      body: "When life happens, staff can request shift swaps or time off in the app. You get an alert, approve it with one tap, and the schedule updates itself.",
      image: "https://images.unsplash.com/photo-1596272875886-f6313ed6c99f?q=80&w=800&auto=format&fit=crop",
      color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200"
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
            A Better Workflow for Your Clinic
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            From the front desk to the surgery suite, coordinate your team in four simple steps.
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
    { icon: Clock, t: "Mobile Clock-In & Out", d: "Staff clock in directly from their phones using GPS geofencing to ensure they are actually at the clinic.", grad: "from-teal-500 to-emerald-500" },
    { icon: Activity, t: "Overtime Prevention", d: "Get alerts before assigning a shift that will trigger overtime pay for a vet tech or assistant.", grad: "from-blue-500 to-cyan-500" },
    { icon: ShieldPlus, t: "On-Call Rotations", d: "Build specific on-call schedules for weekends and after-hours separate from the daily operational roster.", grad: "from-rose-500 to-pink-500" },
    { icon: Users, t: "Role-Based Filtering", d: "Instantly filter your view to see only Veterinarians, only RVTs, or only Receptionists.", grad: "from-indigo-500 to-purple-500" },
    { icon: Syringe, t: "Credential Tracking", d: "Store state licenses and DEA numbers. Get automated warnings 30 days before a doctor's credentials expire.", grad: "from-amber-500 to-orange-500" },
    { icon: MessageSquare, t: "Team Announcements", d: "Send push notifications to the whole clinic (e.g., 'Protocol update for Parvo cases') and track who read it.", grad: "from-teal-600 to-blue-600" },
  ];
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Everything Your Practice Needs
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Tools designed specifically for the fast-paced, high-stress environment of veterinary medicine.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feats.map((f, i) => (
            <motion.div key={f.t}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-300">
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
    <section className="py-24 bg-teal-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <HeartPulse className="w-12 h-12 text-teal-400 mx-auto mb-8 opacity-80" />
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-relaxed tracking-tight mb-10">
            &ldquo;Managing a 24-hour emergency animal hospital means constant schedule changes. Before StaffSchedule.io, our practice manager spent 10 hours a week just fixing the rota. Now? It takes an hour, and our vets love managing their own shift swaps on their phones.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-4">
            <img src="https://images.unsplash.com/photo-1594824432466-2315fa764491?q=80&w=150&auto=format&fit=crop" alt="Dr. Sarah Jenkins" className="w-14 h-14 rounded-full border-2 border-teal-400 object-cover" />
            <div className="text-left">
              <p className="text-white font-bold text-lg">Dr. Sarah Jenkins, DVM</p>
              <p className="text-teal-300 text-sm font-medium">Medical Director · Oakwood Animal Hospital</p>
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
    { q: "Is this software suitable for small 1-doctor clinics as well as large animal hospitals?", a: "Yes. StaffSchedule.io scales perfectly. Whether you have 5 employees in a small general practice or 50+ staff running a 24/7 specialty center, our platform adapts to your complexity." },
    { q: "How does it handle on-call emergency vet scheduling?", a: "You can create dedicated 'On-Call' shift types that don't conflict with regular daily shifts. Doctors can view the on-call rotation months in advance, and request swaps if they have a scheduling conflict." },
    { q: "Can vet techs and receptionists swap shifts with each other?", a: "The system uses role-based permissions. A Vet Tech can only swap shifts with another qualified Vet Tech, preventing a receptionist from accidentally taking a clinical shift they aren't qualified for." },
    { q: "Does the time clock feature integrate with payroll?", a: "Yes. The GPS-verified time clock records exact punch-in and punch-out times, automatically calculates regular hours and overtime, and exports directly to popular payroll providers like Gusto, ADP, and QuickBooks." },
    { q: "Can I schedule staff across multiple clinic locations?", a: "Absolutely. If your practice operates multiple locations, you can view the schedule by specific clinic or see the master view. Staff can be assigned a 'home' clinic but easily scheduled at a different location if coverage is needed." },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Common Questions from Practice Managers
          </h2>
          <p className="text-slate-600 text-lg">Everything you need to know about implementing our veterinary scheduling software.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:border-teal-300 transition-colors">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left bg-white">
                <span className="font-bold text-slate-900 pr-4 text-base sm:text-lg">{f.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-5 h-5 text-teal-600 flex-shrink-0" />
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
            Ready to cure your scheduling headaches?
          </h2>
          <p className="text-slate-600 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of animal hospitals and veterinary clinics that trust StaffSchedule.io to manage their teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg">
              Start Your Free 14-Day Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 font-bold rounded-xl transition-all duration-200 text-lg">
              Book a Live Demo
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {["No credit card required", "Cancel anytime", "Setup takes 5 minutes"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
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
export default function VeterinaryPage() {
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
