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
  Stethoscope, Clock, ShieldCheck,
  Activity, Users, Calendar,
  Bell, FileWarning, Briefcase, Smile, CheckCircle
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
   HERO — "Operatory View" Dashboard
   Cyan & Crisp White Aesthetic
══════════════════════════════════ */
function HeroSection() {
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const rotateX = useMotionSpring(useTransform(my, [-300, 300], [3, -3]), { stiffness: 100, damping: 30 });
  const rotateY = useMotionSpring(useTransform(mx, [-600, 600], [-3, 3]), { stiffness: 100, damping: 30 });

  const operatories = [
    { name: "Operatory 1", role: "Dentist", staff: "Dr. A. Lee", status: "Exam", color: "bg-cyan-500" },
    { name: "Operatory 2", role: "Hygienist", staff: "S. Johnson, RDH", status: "Cleaning", color: "bg-blue-500" },
    { name: "Operatory 3", role: "Assistant", staff: "M. Davis, RDA", status: "Prep", color: "bg-teal-500" },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 bg-white"
      onMouseMove={e => { mx.set(e.clientX - window.innerWidth / 2); my.set(e.clientY - window.innerHeight / 2); }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-cyan-100 rounded-full blur-[100px]" />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-sky-100 rounded-full blur-[100px]" />
        
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#0891b2 1px, transparent 1px), linear-gradient(90deg, #0891b2 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">

        {/* Left copy */}
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            <Smile className="w-3.5 h-3.5" />
            Dental Office Scheduling
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl xl:text-[3.5rem] font-black leading-[1.07] tracking-tight mb-5 text-slate-900">
            Keep the Chairs Full.{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Keep the Team Happy.
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
            Coordinate dentists, hygienists, and front desk staff effortlessly. Maximize your daily appointments without overbooking or burning out your clinical team.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-start mb-7">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-bold rounded-xl transition-all duration-200 shadow-[0_4px_14px_0_rgba(8,145,178,0.39)] hover:shadow-[0_6px_20px_rgba(8,145,178,0.23)] hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #06b6d4, #3b82f6)" }}>
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-xl transition-all duration-200 shadow-sm">
              View Clinic Setup
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {["Role-Based Shifts", "Multi-Chair Sync", "Mobile Swaps"].map(t => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-cyan-500" />{t}</span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — "Operatory View" dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div style={{ rotateX, rotateY, transformPerspective: 1400 }} className="relative w-full max-w-lg">

            {/* Main dashboard card */}
            <div className="bg-white rounded-2xl shadow-2xl shadow-cyan-900/10 border border-slate-200 overflow-hidden relative">
              
              {/* Header */}
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center border border-cyan-100">
                    <Stethoscope className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Operatory Assignments</h3>
                    <p className="text-xs text-slate-500 font-medium">Morning Block · Live Status</p>
                  </div>
                </div>
              </div>

              {/* Status Board */}
              <div className="px-5 py-5 bg-slate-50/50">
                <div className="space-y-3">
                  {operatories.map((op, i) => (
                    <div key={i} className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-10 rounded-full ${op.color}`} />
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase">{op.name}</p>
                          <p className="text-sm font-bold text-slate-900">{op.staff}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{op.role}</p>
                        <p className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded">{op.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Notifications */}
            <motion.div initial={{ opacity: 0, x: -40, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.3, ...spring }}
              className="absolute -left-6 top-32 bg-white rounded-xl shadow-xl border border-slate-100 px-4 py-3 flex items-center gap-3 z-30">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100">
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Late Arrival</p>
                <p className="text-sm font-bold text-slate-900">Hygienist 5m Late</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 2.2, ...spring }}
              className="absolute -right-6 bottom-16 bg-white rounded-xl shadow-xl border border-slate-100 px-4 py-3 flex items-center gap-3 z-30">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                <Users className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Coverage</p>
                <p className="text-sm font-bold text-slate-900">Front Desk Fully Staffed</p>
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
    { v: 15, s: "%", l: "increase in chair utilization" },
    { v: 10, s: " hrs", l: "saved per week on scheduling" },
    { v: 0, s: "", l: "double-booked staff members" },
    { v: 95, s: "%", l: "faster shift swap approvals" },
  ];
  return (
    <div ref={ref} className="border-y border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-slate-100">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.09 }} className="flex flex-col items-center gap-2 px-6 text-center">
            <p className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
              {inView ? <Counter to={s.v} suffix={s.s} /> : `0${s.s}`}
            </p>
            <p className="text-sm font-semibold text-slate-500 leading-tight uppercase tracking-wide">{s.l}</p>
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
      icon: Users, title: "The Hygienist Bottleneck",
      body: "You schedule a full day of cleanings but only have one hygienist on the floor. Chairs sit empty, and patients wait longer.",
      fix: "Role-specific forecasting. The schedule warns you if your hygienist-to-patient ratio is off before you publish.",
      color: "#06b6d4", // Cyan
    },
    {
      icon: Calendar, title: "The Morning Call-Out Scramble",
      body: "An assistant calls out sick at 7 AM. The office manager spends the first hour of the day texting off-duty staff instead of greeting patients.",
      fix: "Instant mobile broadcast. Push the open shift to available assistants instantly and fill the gap before the first appointment.",
      color: "#3b82f6", // Blue
    },
    {
      icon: Briefcase, title: "Multi-Role Confusion",
      body: "Using a generic spreadsheet makes it hard to see who is assigned to which operatory, leading to staff wandering the halls asking where they belong.",
      fix: "Zone assignments. Schedule staff directly to specific chairs or zones (e.g., Operatory 2, Front Desk, Sterilization).",
      color: "#10b981", // Emerald
    },
    {
      icon: ShieldCheck, title: "Lost Time-Off Requests",
      body: "A hygienist asks for next Friday off verbally. It gets forgotten, they are scheduled anyway, and now you are short-staffed on a busy day.",
      fix: "In-app request tracking. Staff request time off in the app, it's approved digitally, and they are automatically blocked from the schedule.",
      color: "#6366f1", // Indigo
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 border border-cyan-200 text-cyan-800 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            Practice Management
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Empty Chairs <span className="text-cyan-600">Cost You Money</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Your schedule shouldn't be the reason your practice loses revenue. Coordinate your clinical and admin teams flawlessly.
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
      icon: Briefcase, title: "1. Define Clinic Roles",
      body: "Set up specific roles for Dentists, RDHs, RDAs, and Front Desk coordinators. The system ensures you never schedule an assistant as a hygienist.",
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop",
      color: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-200"
    },
    {
      icon: Calendar, title: "2. Build Operatory Blocks",
      body: "Create your schedule not just by time, but by chair. Assign staff directly to Operatory 1, Hygiene 2, or Sterilization so everyone knows where to be.",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop",
      color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200"
    },
    {
      icon: Bell, title: "3. Publish & Notify",
      body: "Hit publish and the schedule goes straight to everyone's mobile phone via the StaffSchedule.io app. Push notifications alert them to any changes.",
      image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=800&auto=format&fit=crop",
      color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200"
    },
    {
      icon: Activity, title: "4. Manage Swaps on the Go",
      body: "When life happens, staff can request shift swaps or time off in the app. You get an alert, approve it with one tap, and the schedule updates itself.",
      image: "https://images.unsplash.com/photo-1596272875886-f6313ed6c99f?q=80&w=800&auto=format&fit=crop",
      color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200"
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
            A Smarter Workflow for Your Clinic
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            From the front desk to the operatory, coordinate your team in four simple steps.
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
    { icon: Clock, t: "Mobile Clock-In & Out", d: "Staff clock in directly from their phones using GPS geofencing to ensure they are actually at the clinic.", grad: "from-cyan-500 to-blue-500" },
    { icon: Activity, t: "Overtime Warnings", d: "Get alerted before assigning a shift that will trigger overtime pay for an assistant or hygienist.", grad: "from-blue-500 to-indigo-500" },
    { icon: Briefcase, t: "Role-Based Scheduling", d: "Ensure you always have the right mix of dentists, hygienists, and front desk staff scheduled for the day.", grad: "from-indigo-500 to-purple-500" },
    { icon: ShieldCheck, t: "Credential Tracking", d: "Store state licenses and CPR certifications. Get automated warnings before a credential expires.", grad: "from-emerald-500 to-teal-500" },
    { icon: Users, t: "Shift Swapping", d: "Allow staff to propose shift swaps with other qualified team members, requiring manager approval before finalizing.", grad: "from-teal-500 to-cyan-500" },
    { icon: Calendar, t: "Template Builder", d: "Save your perfect weekly schedule as a template and apply it to future weeks with a single click.", grad: "from-sky-500 to-blue-600" },
  ];
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Everything Your Practice Needs
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Tools designed specifically for the flow of a modern dental clinic.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feats.map((f, i) => (
            <motion.div key={f.t}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-cyan-200 transition-all duration-300">
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
    <section className="py-24 bg-cyan-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <Smile className="w-12 h-12 text-cyan-400 mx-auto mb-8 opacity-80" />
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-relaxed tracking-tight mb-10">
            &ldquo;We run a busy 8-chair clinic. Managing the hygienists, assistants, and front desk used to take me hours every weekend on Excel. StaffSchedule.io completely eliminated that. The team loves having the app on their phones.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-4">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" alt="Jessica R." className="w-14 h-14 rounded-full border-2 border-cyan-400 object-cover" />
            <div className="text-left">
              <p className="text-white font-bold text-lg">Jessica R.</p>
              <p className="text-cyan-300 text-sm font-medium">Practice Manager · Premier Dental Care</p>
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
    { q: "Can we use this for multiple clinic locations?", a: "Yes. If your practice operates across multiple offices, you can view the master schedule or filter by location. Staff can be assigned to a home clinic but scheduled at another if coverage is needed." },
    { q: "How does the system prevent a receptionist from taking a hygienist shift?", a: "Every employee is assigned specific roles (e.g., Dentist, RDH, RDA, Front Desk). When creating a shift, you define the required role. The system strictly prevents unqualified staff from claiming or being assigned to it." },
    { q: "Does the time clock integrate with our payroll software?", a: "Yes. The GPS-verified time clock records exact punch times, calculates regular and overtime hours, and exports directly to popular payroll providers like Gusto, ADP, and QuickBooks." },
    { q: "Can staff view their schedules on their phones?", a: "Absolutely. We provide native iOS and Android apps. Staff receive push notifications for new schedules, shift changes, and open shift opportunities." },
    { q: "Is there a limit to how many staff members we can add?", a: "Our pricing plans scale based on your needs. We offer tiers suitable for small single-dentist practices up to large multi-location corporate groups." },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Common Questions from Practice Managers
          </h2>
          <p className="text-slate-600 text-lg">Everything you need to know about implementing our dental scheduling software.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:border-cyan-300 transition-colors">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left bg-white">
                <span className="font-bold text-slate-900 pr-4 text-base sm:text-lg">{f.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-5 h-5 text-cyan-600 flex-shrink-0" />
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
            Ready to optimize your clinic?
          </h2>
          <p className="text-slate-600 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Join the dental practices that use StaffSchedule.io to keep chairs full and teams happy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg">
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
                <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0" />
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
export default function DentalPage() {
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
