"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion, useInView, AnimatePresence,
  type Variants, type Transition,
  useMotionValue, useTransform, useSpring as useMotionSpring,
} from "framer-motion";
import {
  ArrowRight, CheckCircle2, Star, Clock, MapPin, Shield,
  Smartphone, Camera, BarChart3, Zap, Users, Check,
  AlertTriangle, XCircle, FileText, ChevronDown,
  TrendingUp, DollarSign, Timer, Lock,
  Bell, CalendarCheck2, Building2, UserCheck,
  Navigation, CreditCard, RefreshCw, Eye,
} from "lucide-react";

/* ─── animation constants ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};
const stagger: Variants = { visible: { transition: { staggerChildren: 0.1 } } };
const spring: Transition = { type: "spring", stiffness: 260, damping: 22 };

/* ─── animated counter ─── */
function Counter({ to, suffix = "", duration = 1.8 }: { to: number; suffix?: string; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const steps = Math.round(duration * 60);
    const inc = to / steps;
    const id = setInterval(() => {
      v += inc;
      if (v >= to) { setN(to); clearInterval(id); }
      else setN(Math.round(v));
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [inView, to, duration]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ─── mouse-follow spotlight card ─── */
function SpotCard({ children, className = "", glow = "rgba(139,92,246,0.15)" }: { children: React.ReactNode; className?: string; glow?: string }) {
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const sx = useTransform(mx, v => `${v}px`); const sy = useTransform(my, v => `${v}px`);
  return (
    <motion.div
      className={`group relative overflow-hidden ${className}`}
      whileHover={{ y: -6, scale: 1.02 }} transition={spring}
      onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); mx.set(e.clientX - r.left); my.set(e.clientY - r.top); }}
    >
      <motion.div className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(180px circle at ${sx} ${sy}, ${glow}, transparent 70%)` }} />
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const FEATURES = [
  { icon: Smartphone, grad: "from-indigo-500 to-indigo-700", glow: "rgba(99,102,241,0.18)", title: "One-Tap Mobile Clock-In", desc: "Employees clock in from any phone, tablet, or browser in under two seconds. No app store downloads required — just open, tap, done." },
  { icon: Navigation, grad: "from-purple-500 to-purple-700", glow: "rgba(139,92,246,0.18)", title: "GPS Location Capture", desc: "Every clock-in automatically captures the exact GPS coordinates. Know precisely where your team is working, every single day." },
  { icon: MapPin, grad: "from-fuchsia-500 to-fuchsia-700", glow: "rgba(217,70,239,0.18)", title: "Geofencing Enforcement", desc: "Set a digital boundary around your workplace. The system blocks clock-ins from outside that radius — automatically, silently, every time." },
  { icon: Camera, grad: "from-sky-500 to-sky-700", glow: "rgba(14,165,233,0.18)", title: "Photo Verification", desc: "Require a selfie at clock-in to eliminate buddy punching instantly. Face-matched, timestamped, stored in your audit trail forever." },
  { icon: FileText, grad: "from-emerald-500 to-emerald-700", glow: "rgba(16,185,129,0.18)", title: "Auto-Generated Timesheets", desc: "Clock-ins become timesheets automatically. No manual entry, no transcription errors, no reconciliation calls on payday." },
  { icon: UserCheck, grad: "from-rose-500 to-rose-700", glow: "rgba(244,63,94,0.18)", title: "One-Tap Manager Approvals", desc: "Review and approve your whole team's hours in one screen. Flag anomalies, add notes, and approve with a single tap from your phone." },
  { icon: AlertTriangle, grad: "from-amber-500 to-amber-700", glow: "rgba(245,158,11,0.18)", title: "Real-Time Overtime Alerts", desc: "Get notified the moment anyone approaches overtime. Adjust shifts before it happens — not after it shows up on the invoice." },
  { icon: CreditCard, grad: "from-teal-500 to-teal-700", glow: "rgba(20,184,166,0.18)", title: "Payroll Sync in Seconds", desc: "Approved timesheets push directly to your payroll provider. No copy-paste, no CSV uploads, no correction emails on Friday afternoon." },
];

const STATS = [
  { value: 8, suffix: "hrs", label: "Saved per Week on Payroll", desc: "Managers get back an entire work day every single week.", icon: Timer, grad: "from-indigo-500 to-purple-600", shadow: "shadow-indigo-200" },
  { value: 20, suffix: "%", label: "Reduction in Labor Costs", desc: "Real-time overtime visibility stops budget overruns before they start.", icon: TrendingUp, grad: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-200" },
  { value: 99, suffix: "%", label: "Timesheet Accuracy", desc: "GPS + photo verification eliminates human error from every record.", icon: Shield, grad: "from-fuchsia-500 to-pink-600", shadow: "shadow-fuchsia-200" },
  { value: 3, suffix: "×", label: "Fewer Payroll Disputes", desc: "Digital audit trails mean every hour is provable, undeniable, clean.", icon: CheckCircle2, grad: "from-rose-500 to-orange-500", shadow: "shadow-rose-200" },
];

const TESTIMONIALS = [
  { name: "Rachel Kim", role: "Operations Director", co: "BrightPath Healthcare", industry: "Healthcare · 130 Staff", stars: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop", quote: "Before StaffSchedule.io we were manually reconciling timesheets every Friday. Now payroll takes 20 minutes instead of four hours. The GPS verification alone saved us hundreds in questionable overtime claims." },
  { name: "Marcus Webb", role: "General Manager", co: "Harbor Grill Group", industry: "Hospitality · 85 Staff", stars: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop", quote: "The geofencing feature stopped our clock-in problems on day one. We used to have staff clocking in from the car park five minutes early. That doesn't happen anymore and our labour cost is noticeably lower." },
  { name: "Priya Nair", role: "HR Manager", co: "Velociti Retail", industry: "Retail · 200+ Staff", stars: 5, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop", quote: "Running three locations from one dashboard changed everything. I can see who's clocked in, who's late, and who's heading into overtime — all in real time. The payroll export makes our accountant very happy." },
];

const FAQS = [
  { q: "What is time clock software?", a: "Time clock software is a digital tool that replaces paper time cards and spreadsheets. Employees clock in and out via their phone, tablet, or browser. The software automatically records every hour worked, tracks breaks, flags overtime, and generates accurate timesheets for payroll — with zero manual data entry on your part." },
  { q: "How does GPS time clock software work?", a: "GPS time clock software captures the employee's precise location every time they clock in or out. StaffSchedule.io can enforce geofencing rules that physically prevent a clock-in from anywhere outside a defined radius around your workplace. This eliminates off-site punches, remote buddy punching, and inaccurate location records." },
  { q: "What is buddy punching and how do you stop it?", a: "Buddy punching is when one employee clocks in on behalf of a colleague who hasn't arrived yet. StaffSchedule.io prevents it through photo verification (a selfie is required at clock-in), GPS location capture, and geofencing. Together these make it impossible for anyone to log hours they didn't actually work." },
  { q: "Can employees clock in from their phones?", a: "Yes — any iOS or Android phone, tablet, or desktop browser works instantly. The StaffSchedule.io mobile time clock records GPS location, captures a verification photo if you require it, and logs the exact timestamp automatically. No specialist hardware, no POS terminal, no IT setup required." },
  { q: "Does it integrate with payroll software?", a: "Yes. Approved timesheets in StaffSchedule.io sync directly with your payroll provider, eliminating manual re-entry, calculation errors, and the Friday-afternoon scramble. Once managers approve hours, the data moves to payroll automatically and accurately." },
  { q: "How quickly can my team start using it?", a: "Most teams are fully operational within 30 minutes. You add your employees, set up any geofencing rules you want, and share the app link. Staff can clock in from their phones immediately. There is no hardware to install, no IT configuration, and no training course to attend." },
];

const PAINS = [
  { icon: FileText, num: "01", grad: "from-indigo-500 to-purple-600", border: "border-indigo-100", bg: "bg-indigo-50/50", pill: "bg-indigo-100 text-indigo-700", tag: "TIME WASTED", title: "Spreadsheets That Break", desc: "Manual time cards get lost, altered, or just guessed. Every payroll cycle means hours of chasing, correcting, and arguing about who worked what." },
  { icon: Users, num: "02", grad: "from-purple-500 to-fuchsia-600", border: "border-purple-100", bg: "bg-purple-50/50", pill: "bg-purple-100 text-purple-700", tag: "BUDDY PUNCHING", title: "Friends Clocking In Friends", desc: "Without verification, any employee can tap in for a colleague. You pay for hours nobody worked — and you have no way to prove it happened." },
  { icon: AlertTriangle, num: "03", grad: "from-fuchsia-500 to-pink-600", border: "border-fuchsia-100", bg: "bg-fuchsia-50/50", pill: "bg-fuchsia-100 text-fuchsia-700", tag: "OVERTIME BLIND SPOTS", title: "Overtime You Never Saw Coming", desc: "By the time overtime shows up on a timesheet, it's already happened. No alerts, no visibility, no way to adjust — just a bigger invoice." },
  { icon: XCircle, num: "04", grad: "from-rose-500 to-orange-500", border: "border-rose-100", bg: "bg-rose-50/50", pill: "bg-rose-100 text-rose-700", tag: "PAYROLL ERRORS", title: "Wrong Pay, Angry Staff", desc: "Manual calculations introduce mistakes that damage trust, trigger disputes, and cost hours to resolve. One bad payday undoes months of good management." },
];

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */
export default function TimeClockPage() {
  return (
    <main className="bg-white overflow-x-hidden font-sans">
      <HeroSection />
      <StatsBar />
      <PainSection />
      <FeaturesSection />
      <ClockInShowcase />
      <GpsSection />
      <TestimonialsSection />
      <CtaBanner />
      <FaqSection />
      <FinalCta />
    </main>
  );
}

/* ══════════════════════════════════════════════
   1. HERO
══════════════════════════════════════════════ */
function HeroSection() {
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const rx = useMotionSpring(useTransform(my, [-300, 300], [5, -5]), { stiffness: 120, damping: 28 });
  const ry = useMotionSpring(useTransform(mx, [-600, 600], [-5, 5]), { stiffness: 120, damping: 28 });

  return (
    <section
      className="relative min-h-screen flex flex-col justify-start pt-28 sm:pt-32 pb-0 overflow-hidden bg-[#FDFBFF]"
      onMouseMove={e => { mx.set(e.clientX - window.innerWidth / 2); my.set(e.clientY - window.innerHeight / 2); }}
    >
      {/* bg decoration */}
      <div aria-hidden className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-[#F3EEFF] via-[#F8F5FF] to-transparent" />
        <motion.div animate={{ x: [0,18,-12,0], y: [0,-14,10,0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[8%] w-[500px] h-[300px] bg-indigo-400/12 rounded-full blur-[90px]" />
        <motion.div animate={{ x: [0,-16,14,0], y: [0,12,-10,0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[25%] right-[8%] w-[600px] h-[350px] bg-purple-400/12 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-white to-transparent z-10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col items-center">
        {/* eyebrow */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-purple-100 shadow-sm mb-8">
          <Clock size={12} className="text-[#8b5cf6]" />
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8b5cf6]">Time Clock Software</span>
          <span className="w-1 h-1 rounded-full bg-[#e5e0f1]" />
          <span className="text-[11px] font-bold text-[#64748b] tracking-wide">Free 14-Day Trial</span>
        </motion.div>

        {/* H1 */}
        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.08 }}
          className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.4rem] xl:text-[4rem] font-black tracking-tight text-[#0f172a] text-center leading-[1.12] mb-6 max-w-5xl">
          Time Clock Software That{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899]">
            Knows Where Your Team Is
          </span>
        </motion.h1>

        {/* subhead */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.18 }}
          className="text-base sm:text-lg md:text-xl text-[#475569] font-medium leading-relaxed text-center max-w-2xl mb-10 px-4">
          GPS-verified clock-ins, automatic digital timesheets, and one-click payroll sync — all from a mobile app your team will actually use.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.26 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-10">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={spring}>
            <Link href="https://app.staffschedule.io/onboarding.php?start_trial=1"
              className="flex items-center gap-3 h-14 px-10 rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white font-black text-sm uppercase tracking-widest shadow-[0_12px_40px_-8px_rgba(139,92,246,0.5)] hover:shadow-[0_16px_50px_-8px_rgba(139,92,246,0.65)] transition-shadow group">
              Start Free Trial <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spring}>
            <Link href="/features"
              className="flex items-center gap-2 h-14 px-10 rounded-2xl bg-white text-[#1c1236] border-2 border-[#e5e0f1] font-black text-sm uppercase tracking-widest hover:border-[#8b5cf6] hover:text-[#8b5cf6] transition-colors">
              See All Features
            </Link>
          </motion.div>
        </motion.div>

        {/* trust pills */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-12">
          {["No Credit Card Required", "GPS Verification Included", "Works on Any Device", "Payroll Sync Ready"].map(t => (
            <div key={t} className="flex items-center gap-2 text-[11px] font-black text-[#5b4f7a] uppercase tracking-wider">
              <CheckCircle2 size={12} className="text-[#8b5cf6]" /> {t}
            </div>
          ))}
        </motion.div>

        {/* Hero visual — dashboard with floating cards */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 1400 }}
          className="relative w-full max-w-5xl mx-auto mb-[-80px] sm:mb-[-100px] group"
        >
          {/* floating clock-in notification — left */}
          <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-2 sm:-left-12 top-10 z-40 bg-white rounded-2xl shadow-xl border border-[#f0ecf9] p-3 w-44 sm:w-52">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center"><Check size={12} className="text-emerald-600" /></div>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">Clocked In</span>
            </div>
            <p className="text-[11px] font-bold text-[#0f172a]">Sarah M. — Morning Shift</p>
            <p className="text-[10px] text-[#94a3b8]">📍 GPS verified · 08:02 AM</p>
          </motion.div>

          {/* floating overtime alert — right */}
          <motion.div animate={{ y: [5, -5, 5] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -right-2 sm:-right-12 top-16 z-40 bg-white rounded-2xl shadow-xl border border-amber-100 p-3 w-40 sm:w-48">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center"><AlertTriangle size={12} className="text-amber-600" /></div>
              <span className="text-[10px] font-black text-amber-600 uppercase tracking-wider">Overtime Alert</span>
            </div>
            <p className="text-[11px] font-bold text-[#0f172a]">James K. — 38.5 hrs</p>
            <p className="text-[10px] text-[#94a3b8]">1.5 hrs to overtime</p>
          </motion.div>

          {/* floating payroll card — bottom left */}
          <motion.div animate={{ y: [-3, 4, -3] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -left-2 sm:-left-10 bottom-20 z-40 bg-white rounded-2xl shadow-xl border border-[#f0ecf9] p-3 w-40 sm:w-48">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center"><CreditCard size={12} className="text-indigo-600" /></div>
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">Payroll Synced</span>
            </div>
            <p className="text-[11px] font-bold text-[#0f172a]">12 timesheets exported</p>
            <p className="text-[10px] text-[#94a3b8]">Zero errors · 0.3 seconds</p>
          </motion.div>

          {/* dashboard frame */}
          <div className="relative rounded-2xl md:rounded-[2rem] border border-[#e5e0f1]/60 shadow-[0_40px_100px_-20px_rgba(139,92,246,0.2)] bg-white/40 backdrop-blur-2xl p-2 md:p-3 group-hover:scale-[1.004] transition-transform duration-700">
            <div className="rounded-xl md:rounded-[1.5rem] overflow-hidden border border-[#f0ecf9]">
              <div className="h-10 bg-[#fdfcff] border-b border-[#f0ecf9] flex items-center px-4 gap-2">
                <div className="flex gap-1.5">{["#e2dbea","#e2dbea","#e2dbea"].map((c,i)=><div key={i} className="w-2.5 h-2.5 rounded-full" style={{background:c}}/>)}</div>
                <div className="mx-auto bg-[#f5f3f9] rounded-md h-6 w-1/3 flex items-center justify-center border border-[#ece9f2]">
                  <span className="text-[9px] font-bold text-[#b4a9c6]">app.staffschedule.io/time-clock</span>
                </div>
              </div>
              <Image src="/staffschedule-dashboard.png" alt="StaffSchedule.io time clock software dashboard — GPS tracking, timesheets, and payroll sync" width={1400} height={800} className="w-full h-auto object-cover object-top" priority quality={90} sizes="(max-width:768px) 100vw, 1400px" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   2. STATS BAR
══════════════════════════════════════════════ */
function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const items = [
    { val: 8, suf: " hrs", label: "Saved per week on payroll" },
    { val: 20, suf: "%", label: "Average labor cost reduction" },
    { val: 99, suf: "%", label: "Timesheet accuracy rate" },
    { val: 10000, suf: "+", label: "Teams already tracking" },
  ];
  return (
    <section ref={ref} className="relative bg-white border-y border-[#f0ecf9] py-10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.09, duration: 0.6, ease: [0.22,1,0.36,1] as [number,number,number,number] }}
              className="flex flex-col items-center text-center gap-1">
              <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]">
                <Counter to={s.val} suffix={s.suf} />
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#64748b] leading-tight">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   3. PAIN POINTS  (white / brand)
══════════════════════════════════════════════ */
function PainSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(#f1f5f9_1px,transparent_1px),linear-gradient(90deg,#f1f5f9_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_40%,transparent_100%)] opacity-50" />
        <motion.div animate={{ scale:[1,1.07,1], opacity:[0.18,0.32,0.18] }} transition={{ duration:14, repeat:Infinity, ease:"easeInOut" }}
          className="absolute -top-40 -left-40 w-[700px] h-[500px] bg-gradient-to-br from-indigo-200/50 to-purple-200/40 rounded-full blur-[110px]" />
        <motion.div animate={{ scale:[1,1.05,1], opacity:[0.12,0.22,0.12] }} transition={{ duration:18, repeat:Infinity, ease:"easeInOut", delay:3 }}
          className="absolute -bottom-40 -right-40 w-[600px] h-[400px] bg-gradient-to-tl from-fuchsia-200/40 to-pink-200/30 rounded-full blur-[100px]" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial="hidden" animate={inView?"visible":"hidden"} variants={stagger}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#6366f1]">The Problem</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.15] mb-5">
            Still Losing Hours to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899]">Paper Time Cards?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#475569] text-base sm:text-lg leading-relaxed font-medium">
            Manual time tracking costs businesses thousands every year in admin time, payroll errors, and hours worked that nobody can verify. Here is what that actually looks like.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" animate={inView?"visible":"hidden"} variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PAINS.map((p,i)=>(
            <motion.div key={i} variants={fadeUp} whileHover={{ y:-8, scale:1.02 }} transition={spring}
              className={`group relative rounded-2xl border ${p.border} ${p.bg} p-6 overflow-hidden cursor-default hover:shadow-2xl transition-shadow duration-300`}>
              <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${p.grad} rounded-t-2xl`} />
              <span className="absolute -bottom-4 -right-2 text-[7rem] font-black text-black/[0.03] leading-none select-none pointer-events-none">{p.num}</span>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black tracking-widest uppercase mb-4 ${p.pill}`}>{p.tag}</span>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${p.grad} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                <p.icon size={20} className="text-white" />
              </div>
              <h3 className="text-base font-black text-[#0f172a] mb-2">{p.title}</h3>
              <p className="text-sm text-[#64748b] leading-relaxed font-medium">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   4. FEATURES (spotlight cards)
══════════════════════════════════════════════ */
function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-[#FAFAFA] overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-purple-100/25 rounded-full blur-[120px] -mr-40 -translate-y-1/2" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-100/20 rounded-full blur-[100px] -ml-40 -translate-y-1/2" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial="hidden" animate={inView?"visible":"hidden"} variants={stagger}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200 mb-6">
            <Zap size={13} className="text-[#8b5cf6]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8b5cf6]">Features</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.15] mb-5">
            Everything Modern Time Tracking{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]">Needs to Be</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#475569] text-base sm:text-lg font-medium leading-relaxed">
            Eight features that work together so your team always gets paid right, your costs stay visible, and your payroll runs clean.
          </motion.p>
        </motion.div>
        <motion.div initial="hidden" animate={inView?"visible":"hidden"} variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f,i)=>(
            <SpotCard key={i} glow={f.glow}
              className="bg-white rounded-2xl border border-[#f0ecf9] p-6 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100/50 transition-shadow cursor-default">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.grad} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                <f.icon size={22} className="text-white" />
              </div>
              <h3 className="text-base font-black text-[#0f172a] mb-2 relative z-10">{f.title}</h3>
              <p className="text-sm text-[#64748b] leading-relaxed font-medium relative z-10">{f.desc}</p>
            </SpotCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   5. CLOCK-IN SHOWCASE  (animated 3-step)
══════════════════════════════════════════════ */
function ClockInShowcase() {
  const [step, setStep] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setStep(s => (s + 1) % 3), 3000);
    return () => clearInterval(id);
  }, [inView]);

  const steps = [
    { icon: Smartphone, color: "#6366f1", grad: "from-indigo-500 to-indigo-600", title: "Employee Opens App", sub: "One tap on their phone — that's all it takes.", detail: "Works on any iPhone or Android. No download friction, no PIN, no fumbling. The clock-in screen is the first thing they see." },
    { icon: Navigation, color: "#8b5cf6", grad: "from-purple-500 to-fuchsia-600", title: "GPS & Photo Captured", sub: "Location and identity verified in under a second.", detail: "The app silently captures GPS coordinates and — if you require it — a selfie. Geofencing checks happen instantly in the background." },
    { icon: CalendarCheck2, color: "#10b981", grad: "from-emerald-500 to-teal-600", title: "Timesheet Updated Live", sub: "Hours recorded instantly — no manual entry ever.", detail: "The moment they clock in, your dashboard updates. Managers see it in real time. Timesheets build themselves for payroll." },
  ];

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[600px] bg-gradient-to-br from-indigo-100/30 to-purple-100/20 rounded-full blur-[130px] -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-gradient-to-tr from-purple-100/20 to-pink-100/15 rounded-full blur-[110px] -ml-20 -mb-20" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial="hidden" animate={inView?"visible":"hidden"} variants={stagger}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200 mb-6">
            <Clock size={13} className="text-indigo-600" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-600">How Clock-In Works</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.15] mb-5">
            Three Steps. Under{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]">Ten Seconds.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#475569] text-base sm:text-lg font-medium leading-relaxed">
            The entire clock-in experience — GPS check, photo capture, timesheet update — completes before your employee puts their phone back in their pocket.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: step cards */}
          <div className="flex flex-col gap-4">
            {steps.map((s, i) => (
              <motion.button key={i} onClick={() => setStep(i)}
                initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22,1,0.36,1] as [number,number,number,number] }}
                whileHover={{ x: 4 }} whileTap={{ scale: 0.99 }}
                className={`text-left flex gap-5 p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${step===i ? "bg-white border-purple-200 shadow-xl shadow-purple-100/50" : "bg-white/60 border-[#f0ecf9] hover:bg-white hover:border-purple-100"}`}
              >
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.grad} flex items-center justify-center shadow-md`} style={{ opacity: step===i ? 1 : 0.6 }}>
                    <s.icon size={20} className="text-white" />
                  </div>
                  <span className="text-[10px] font-black text-[#94a3b8] tracking-widest">0{i+1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-base font-black mb-1 transition-colors ${step===i ? "text-[#0f172a]" : "text-[#475569]"}`}>{s.title}</h3>
                  <p className={`text-sm font-semibold mb-2 transition-colors ${step===i ? "text-[#8b5cf6]" : "text-[#94a3b8]"}`}>{s.sub}</p>
                  <AnimatePresence>
                    {step===i && (
                      <motion.p initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} exit={{ opacity:0, height:0 }}
                        transition={{ duration:0.3 }} className="text-sm text-[#64748b] leading-relaxed font-medium overflow-hidden">
                        {s.detail}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                {/* active indicator */}
                {step===i && <motion.div layoutId="stepActiveBar" className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl bg-gradient-to-b ${s.grad}`} />}
              </motion.button>
            ))}

            {/* progress dots */}
            <div className="flex items-center gap-2 pl-6 mt-2">
              {steps.map((_,i)=>(
                <button key={i} onClick={()=>setStep(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${step===i ? "w-6 bg-[#8b5cf6]" : "w-1.5 bg-[#e5e0f1]"}`} />
              ))}
              <span className="ml-2 text-[10px] text-[#94a3b8] font-bold uppercase tracking-widest">Auto-advancing</span>
            </div>
          </div>

          {/* Right: animated phone */}
          <motion.div initial={{ opacity:0, scale:0.9, y:40 }} animate={inView?{opacity:1,scale:1,y:0}:{}}
            transition={{ duration:1, delay:0.3, ease:[0.22,1,0.36,1] as [number,number,number,number] }}
            className="flex justify-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-400/15 rounded-full blur-[70px]" />

            {/* GPS verified card */}
            <AnimatePresence>
              {step>=1 && (
                <motion.div key="gps" initial={{opacity:0,x:20,scale:0.9}} animate={{opacity:1,x:0,scale:1}} exit={{opacity:0,scale:0.9}}
                  className="absolute -right-4 sm:-right-10 top-10 bg-white rounded-2xl shadow-xl border border-emerald-100 p-3 z-20 w-44">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center"><Check size={12} className="text-emerald-600" /></div>
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">GPS Verified</span>
                  </div>
                  <p className="text-[11px] font-bold text-[#0f172a]">Within geofence ✓</p>
                  <p className="text-[10px] text-[#94a3b8]">3.2m from entrance</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Timesheet updated card */}
            <AnimatePresence>
              {step===2 && (
                <motion.div key="ts" initial={{opacity:0,x:-20,scale:0.9}} animate={{opacity:1,x:0,scale:1}} exit={{opacity:0,scale:0.9}}
                  className="absolute -left-4 sm:-left-10 bottom-24 bg-white rounded-2xl shadow-xl border border-indigo-100 p-3 z-20 w-44">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center"><CalendarCheck2 size={12} className="text-indigo-600" /></div>
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">Timesheet</span>
                  </div>
                  <p className="text-[11px] font-bold text-[#0f172a]">08:04 AM recorded</p>
                  <p className="text-[10px] text-[#94a3b8]">Payroll ready ✓</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Phone frame */}
            <div className="relative w-[230px] sm:w-[270px] aspect-[9/19] rounded-[2.5rem] sm:rounded-[3rem] border-[6px] sm:border-[8px] border-[#1c1236] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)] bg-white overflow-hidden z-10 animate-[float_7s_ease-in-out_infinite]">
              <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-[35%] h-4 sm:h-5 bg-[#1c1236] rounded-full z-30" />
              <div className="w-full h-full bg-[#fdfcff] flex flex-col pt-10 sm:pt-12 px-4 sm:px-5 z-20 relative overflow-hidden">
                {/* App status bar */}
                <div className="flex justify-between items-center mb-5">
                  <span className="text-[9px] font-black text-[#1c1236]">9:41</span>
                  <span className="text-[8px] text-[#8f86a8] font-medium">StaffSchedule.io</span>
                  <div className="flex gap-1 items-center">
                    <Wifi size={8} className="text-[#8f86a8]" />
                  </div>
                </div>

                {/* Dynamic step content */}
                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div key="s0" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} className="flex flex-col items-center flex-1">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#6366f1] flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
                        <Clock size={28} className="text-white" />
                      </div>
                      <p className="text-[10px] text-[#8f86a8] font-medium mb-1">Good morning, Sarah</p>
                      <p className="text-sm font-black text-[#1c1236] mb-6">Ready to start?</p>
                      <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white text-[11px] font-black shadow-md shadow-purple-500/30">
                        CLOCK IN
                      </button>
                      <p className="text-[9px] text-[#94a3b8] mt-3">Morning Shift · 09:00 – 17:00</p>
                    </motion.div>
                  )}
                  {step === 1 && (
                    <motion.div key="s1" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} className="flex flex-col items-center flex-1">
                      <div className="relative w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                        <motion.div animate={{ scale:[1,1.25,1], opacity:[0.4,0.1,0.4] }} transition={{ duration:1.5, repeat:Infinity }} className="absolute inset-0 rounded-full border-2 border-[#8b5cf6]" />
                        <Navigation size={28} className="text-[#8b5cf6]" />
                      </div>
                      <p className="text-[10px] font-black text-[#8b5cf6] uppercase tracking-wider mb-1">Verifying location…</p>
                      <p className="text-xs font-bold text-[#1c1236] mb-4">GPS · Geofence check</p>
                      <div className="w-full bg-[#f0ecf9] rounded-full h-1.5 overflow-hidden">
                        <motion.div className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] rounded-full" initial={{width:"0%"}} animate={{width:"100%"}} transition={{duration:2.8}} />
                      </div>
                    </motion.div>
                  )}
                  {step === 2 && (
                    <motion.div key="s2" initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0}} className="flex flex-col items-center flex-1">
                      <motion.div initial={{scale:0.5,opacity:0}} animate={{scale:1,opacity:1}} transition={{ ...spring }}
                        className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-3 shadow-md">
                        <Check size={28} className="text-emerald-600" />
                      </motion.div>
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-wider mb-1">Clocked In!</p>
                      <p className="text-sm font-black text-[#1c1236] mb-4">09:02 AM</p>
                      <div className="w-full bg-[#fafafa] rounded-xl border border-[#f0ecf9] p-3 text-left">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[9px] font-black text-[#1c1236] uppercase tracking-wider">Today</span>
                          <span className="text-[9px] text-emerald-600 font-bold">Active</span>
                        </div>
                        <p className="text-[11px] font-bold text-[#1c1236]">Morning Shift</p>
                        <p className="text-[9px] text-[#94a3b8]">09:02 AM → ongoing</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   6. GPS & GEOFENCING
══════════════════════════════════════════════ */
function GpsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const points = [
    { x:"54%", y:"38%", name:"Alex R.", status:"In", delay:0.4 },
    { x:"43%", y:"57%", name:"Maya S.", status:"In", delay:0.7 },
    { x:"62%", y:"62%", name:"Jordan T.", status:"Out", delay:1.0, blocked:true },
  ];
  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-[#FAFAFA] overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[700px] h-[600px] bg-indigo-100/25 rounded-full blur-[130px] -ml-40 -mt-40" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-purple-100/20 rounded-full blur-[110px] -mr-40 -mb-40" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: GPS map visual */}
          <motion.div initial={{ opacity:0, x:-50, scale:0.95 }} animate={inView?{opacity:1,x:0,scale:1}:{}}
            transition={{ duration:1, delay:0.2, ease:[0.22,1,0.36,1] as [number,number,number,number] }}
            className="relative flex justify-center order-2 lg:order-1">
            {/* map card */}
            <div className="relative w-full max-w-[440px] aspect-square bg-white rounded-3xl border border-[#e2e8f0] shadow-2xl shadow-purple-100/40 overflow-hidden">
              {/* grid map background */}
              <div className="absolute inset-0 bg-[linear-gradient(#e8edf2_1px,transparent_1px),linear-gradient(90deg,#e8edf2_1px,transparent_1px)] bg-[size:36px_36px]" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#f8fafc]/60 via-transparent to-[#f0f4ff]/40" />

              {/* geofence rings */}
              <motion.div animate={{ scale:[1,1.18,1], opacity:[0.18,0.06,0.18] }} transition={{ duration:2.8, repeat:Infinity, ease:"easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full border-2 border-[#8b5cf6]" />
              <motion.div animate={{ scale:[1,1.35,1], opacity:[0.12,0.03,0.12] }} transition={{ duration:2.8, repeat:Infinity, ease:"easeInOut", delay:0.4 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-[#8b5cf6]" />
              {/* fill */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-[#8b5cf6]/8" />
              {/* center building */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#6366f1] flex items-center justify-center shadow-xl shadow-purple-500/30">
                  <Building2 size={22} className="text-white" />
                </div>
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-2 py-0.5 rounded-full shadow text-[9px] font-black text-[#8b5cf6] border border-purple-100">Your Workplace</div>
              </div>

              {/* employee pins */}
              {points.map((p,i)=>(
                <motion.div key={i} initial={{scale:0,opacity:0}} animate={inView?{scale:1,opacity:1}:{}}
                  transition={{ delay: p.delay + 0.5, ...spring }}
                  style={{ left:p.x, top:p.y }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-0.5">
                  <div className={`w-4 h-4 rounded-full shadow-md flex items-center justify-center ${p.blocked ? "bg-rose-500 ring-2 ring-rose-300" : "bg-emerald-500 ring-2 ring-emerald-200"}`}>
                    {p.blocked ? <XCircle size={9} className="text-white" /> : <Check size={9} className="text-white" />}
                  </div>
                  <div className="bg-white px-2 py-0.5 rounded-full shadow border border-[#f0ecf9]">
                    <span className="text-[8px] font-bold text-[#0f172a]">{p.name}</span>
                  </div>
                </motion.div>
              ))}

              {/* legend */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-xl border border-[#f0ecf9] p-3 flex items-center justify-between">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500" /><span className="text-[10px] font-bold text-[#0f172a]">Inside geofence</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-rose-500" /><span className="text-[10px] font-bold text-[#0f172a]">Blocked — outside</span></div>
              </div>
            </div>
          </motion.div>

          {/* Right: content */}
          <motion.div initial="hidden" animate={inView?"visible":"hidden"} variants={stagger}
            className="order-1 lg:order-2">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200 mb-6">
              <MapPin size={13} className="text-[#8b5cf6]" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8b5cf6]">GPS & Geofencing</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.15] mb-5">
              Know Exactly Where{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899]">Every Clock-In Happened</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#475569] text-base sm:text-lg leading-relaxed font-medium mb-8">
              Set a digital boundary around your workplace. StaffSchedule.io uses GPS to verify every clock-in and automatically blocks punches from outside that zone — no manager involvement required.
            </motion.p>

            <motion.div variants={stagger} className="flex flex-col gap-4 mb-10">
              {[
                { icon: MapPin, title: "GPS verified on every punch", desc: "Coordinates captured and stored with each clock-in. Full audit trail, forever." },
                { icon: Lock, title: "Geofencing blocks off-site punches", desc: "Set your boundary once. The system enforces it every clock-in, every day, automatically." },
                { icon: Eye, title: "Real-time location dashboard", desc: "See exactly where your team is working, right now, from any device." },
                { icon: Shield, title: "Tamper-proof digital records", desc: "Every timestamp and GPS coordinate is locked. No edits, no disputes, no guesswork." },
              ].map((f,i)=>(
                <motion.div key={i} variants={fadeUp} whileHover={{ x:5 }} transition={spring}
                  className="flex items-start gap-4 p-4 rounded-xl border border-[#f0ecf9] bg-white hover:shadow-md hover:border-purple-200 transition-all group cursor-default">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <f.icon size={16} className="text-[#8b5cf6]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#0f172a] mb-0.5">{f.title}</h3>
                    <p className="text-xs text-[#64748b] font-medium leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }} transition={spring} className="inline-block">
              <Link href="https://app.staffschedule.io/onboarding.php?start_trial=1"
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-purple-500/20 group">
                Try GPS Tracking Free <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   7. STATS (animated counters)
══════════════════════════════════════════════ */
function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[700px] h-[500px] bg-purple-100/20 rounded-full blur-[130px] -ml-40 -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[400px] bg-indigo-100/15 rounded-full blur-[110px] -mr-40 -translate-y-1/2" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial="hidden" animate={inView?"visible":"hidden"} variants={stagger}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200 mb-6">
            <BarChart3 size={13} className="text-[#8b5cf6]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8b5cf6]">Real Results</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.15] mb-5">
            Numbers That Show{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]">Why Teams Switch</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#475569] text-base sm:text-lg font-medium leading-relaxed">
            These are real averages reported by StaffSchedule.io customers after switching from spreadsheets and manual time cards.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" animate={inView?"visible":"hidden"} variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s,i)=>(
            <motion.div key={i} variants={fadeUp} whileHover={{ y:-10, scale:1.03 }} transition={spring}
              className={`group relative bg-white rounded-2xl border border-[#f0ecf9] p-7 overflow-hidden hover:shadow-2xl ${s.shadow} transition-shadow duration-300 cursor-default`}>
              <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${s.grad} rounded-t-2xl`} />
              <div className={`absolute inset-0 bg-gradient-to-br ${s.grad} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-2xl`} />
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.grad} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform relative z-10`}>
                <s.icon size={22} className="text-white" />
              </div>
              <div className={`text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-br ${s.grad} relative z-10`}>
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <h3 className="text-sm font-black text-[#0f172a] mb-2 relative z-10">{s.label}</h3>
              <p className="text-xs text-[#64748b] font-medium leading-relaxed relative z-10">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   8. TESTIMONIALS
══════════════════════════════════════════════ */
function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-[#0c0a1a] overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:28px_28px]" />
        <motion.div animate={{ x:[0,22,-18,0], y:[0,-16,12,0] }} transition={{ duration:22, repeat:Infinity, ease:"linear" }}
          className="absolute top-0 left-1/3 w-[700px] h-[500px] bg-purple-900/25 rounded-full blur-[130px]" />
        <motion.div animate={{ x:[0,-18,22,0], y:[0,16,-14,0] }} transition={{ duration:28, repeat:Infinity, ease:"linear" }}
          className="absolute bottom-0 right-1/3 w-[600px] h-[400px] bg-indigo-900/20 rounded-full blur-[110px]" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial="hidden" animate={inView?"visible":"hidden"} variants={stagger}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Star size={13} className="text-yellow-400 fill-yellow-400" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/70">Trusted by 10,000+ Teams</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15] mb-5">
            Real Teams.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#ec4899]">Real Results.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#94a3b8] text-base sm:text-lg font-medium leading-relaxed">
            From healthcare to hospitality, these managers switched from spreadsheets to StaffSchedule.io and never looked back.
          </motion.p>
        </motion.div>
        <motion.div initial="hidden" animate={inView?"visible":"hidden"} variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t,i)=>(
            <motion.article key={i} variants={fadeUp} whileHover={{ y:-8, scale:1.02 }} transition={spring}
              className="group relative rounded-2xl border border-white/8 bg-white/[0.04] backdrop-blur-md p-7 hover:bg-white/[0.08] hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-900/30 transition-colors duration-300 overflow-hidden cursor-default">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex gap-1 mb-5">{[1,2,3,4,5].map(s=><Star key={s} size={13} className="fill-yellow-400 text-yellow-400"/>)}</div>
              <blockquote className="text-[#e2e8f0] text-sm leading-relaxed font-medium mb-6">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/10 relative flex-shrink-0">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-black text-white">{t.name}</p>
                  <p className="text-xs text-[#94a3b8] font-medium">{t.role}</p>
                  <p className="text-[10px] text-[#6366f1] font-bold mt-0.5">{t.industry}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   9. CTA BANNER
══════════════════════════════════════════════ */
function CtaBanner() {
  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-r from-[#4338ca] via-[#7c3aed] to-[#9333ea]">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        <motion.div animate={{ x:[0,28,-20,0], y:[0,-18,14,0] }} transition={{ duration:20, repeat:Infinity, ease:"linear" }}
          className="absolute -top-20 left-1/3 w-[600px] h-[300px] bg-white/10 rounded-full blur-[100px]" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight mb-1">
            Ready to stop guessing where your team is?
          </h2>
          <p className="text-white/70 font-medium text-sm sm:text-base">GPS time tracking, digital timesheets, payroll sync — free for 14 days.</p>
        </div>
        <motion.div whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }} transition={spring} className="flex-shrink-0">
          <Link href="https://app.staffschedule.io/onboarding.php?start_trial=1"
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#6d28d9] font-black text-sm uppercase tracking-widest shadow-xl group">
            Start Free Trial <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   10. FAQ
══════════════════════════════════════════════ */
function FaqSection() {
  const [open, setOpen] = useState<number|null>(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div aria-hidden className="absolute top-0 right-0 w-[600px] h-[500px] bg-purple-100/20 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial="hidden" animate={inView?"visible":"hidden"} variants={stagger}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200 mb-6">
            <ChevronDown size={13} className="text-[#8b5cf6]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8b5cf6]">Frequently Asked Questions</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.15] mb-4">
            Questions About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]">Time Clock Software</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#64748b] text-base sm:text-lg font-medium">
            Everything you need to know before you start.
          </motion.p>
        </motion.div>

        <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.2 }}
          className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((f,i)=>(
            <motion.div key={i} whileHover={{ scale: open===i ? 1 : 1.005 }} transition={spring}
              className={`rounded-2xl border overflow-hidden transition-all duration-300 ${open===i ? "border-purple-200 shadow-lg shadow-purple-100/40 bg-white" : "border-[#f0ecf9] bg-[#FAFAFA] hover:border-purple-200"}`}>
              <button onClick={()=>setOpen(open===i?null:i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left" aria-expanded={open===i}>
                <h3 className={`text-sm sm:text-base font-black transition-colors ${open===i?"text-[#6366f1]":"text-[#0f172a]"}`}>{f.q}</h3>
                <motion.div animate={{ rotate: open===i ? 180 : 0 }} transition={{ duration:0.3 }} className="flex-shrink-0">
                  <ChevronDown size={18} className={open===i?"text-[#6366f1]":"text-[#94a3b8]"} />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open===i && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }}
                    transition={{ duration:0.35, ease:[0.22,1,0.36,1] as [number,number,number,number] }} className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm text-[#64748b] font-medium leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   11. FINAL CTA
══════════════════════════════════════════════ */
function FinalCta() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="relative py-28 lg:py-40 bg-[#0c0a1a] overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:24px_24px]" />
        <motion.div animate={{ x:[0,26,-20,0], y:[0,-26,20,0] }} transition={{ duration:20, repeat:Infinity, ease:"linear" }}
          className="absolute top-[10%] left-[20%] w-[600px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <motion.div animate={{ x:[0,-20,26,0], y:[0,20,-20,0] }} transition={{ duration:25, repeat:Infinity, ease:"linear" }}
          className="absolute bottom-[10%] right-[15%] w-[500px] h-[350px] bg-purple-600/15 rounded-full blur-[100px]" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div initial="hidden" animate={inView?"visible":"hidden"} variants={stagger} className="max-w-3xl mx-auto">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/70">Start Free — No Card Needed</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-6">
            Your Team Deserves Time Tracking{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] via-[#c084fc] to-[#ec4899]">That Actually Works</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#94a3b8] text-base sm:text-lg font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
            GPS clock-ins, automatic timesheets, overtime alerts, and payroll sync — all in one platform. Set up in 30 minutes. Results from day one.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <motion.div whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }} transition={spring}>
              <Link href="https://app.staffschedule.io/onboarding.php?start_trial=1"
                className="flex items-center gap-3 h-16 px-12 rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-white font-black text-sm uppercase tracking-widest shadow-[0_12px_50px_-8px_rgba(139,92,246,0.5)] hover:shadow-[0_16px_60px_-8px_rgba(139,92,246,0.65)] transition-shadow group">
                Start Free Trial <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }} transition={spring}>
              <Link href="/pricing"
                className="flex items-center gap-2 h-16 px-10 rounded-2xl bg-white/5 border border-white/15 text-white font-black text-sm uppercase tracking-widest hover:bg-white/10 hover:border-white/25 transition-colors">
                View Pricing
              </Link>
            </motion.div>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {["14-Day Free Trial", "GPS Verification Included", "No Credit Card", "Cancel Anytime"].map(t=>(
              <div key={t} className="flex items-center gap-2 text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider">
                <CheckCircle2 size={13} className="text-[#8b5cf6]" /> {t}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   WIRE SECTIONS TOGETHER
══════════════════════════════════════════════ */
// StatsSection is used after TestimonialsSection in the export order above
// but we define it after ClockInShowcase — that's fine for React.
// Re-export order in <main>:
function Wifi({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><circle cx="12" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}
