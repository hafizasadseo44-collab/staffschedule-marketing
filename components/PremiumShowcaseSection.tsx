"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import {
  Clock,
  MessageSquare,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Users,
  Calendar,
  Star,
  Zap,
  Globe,
  ArrowRight,
  Shield,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Quote,
} from "lucide-react";

/* ─── Animated Counter ─── */
function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: string; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const numericPart = value.replace(/[^0-9.]/g, "");
    const target = parseFloat(numericPart);
    if (isNaN(target)) { setDisplay(value); return; }
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      const current = Math.round(target * ease * 10) / 10;
      // Preserve formatting like commas
      if (value.includes(",")) {
        setDisplay(Math.round(current).toLocaleString());
      } else if (value.includes(".")) {
        setDisplay(current.toFixed(1));
      } else {
        setDisplay(Math.round(current).toString());
      }
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

/* ─── Floating Particle Field ─── */
function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `rgba(${99 + Math.random() * 60}, ${102 + Math.random() * 50}, ${241}, ${0.15 + Math.random() * 0.2})`,
          }}
          animate={{
            y: [0, -30 - Math.random() * 50, 0],
            x: [0, (Math.random() - 0.5) * 30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Testimonials Data ─── */
const testimonials = [
  {
    quote: "Since switching to StaffSchedule.io, we've completely eliminated scheduling conflicts and our team communication has never been better. It's the best investment we've made.",
    name: "Sarah Jenkins",
    title: "Operations Manager",
    company: "Daily Grind Coffee",
    avatar: "SJ",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    quote: "Our overtime costs plummeted by 20% in the first month. The automated alerts and real-time shift updates are an absolute game-changer for our logistics team.",
    name: "Marcus Thorne",
    title: "Fleet Director",
    company: "FastWave Transport",
    avatar: "MT",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    quote: "Managing 15 retail locations used to take days of spreadsheets and emails. Now, it takes minutes. I finally have my weekends back.",
    name: "Elena Rodriguez",
    title: "Regional Director",
    company: "Bloom Boutique",
    avatar: "ER",
    gradient: "from-pink-500 to-rose-600",
  },
];

/* ─── Feature Cards Data ─── */
const FEATURES = [
  {
    icon: Clock,
    title: "Real-time Updates",
    desc: "Instant shift notifications keep everyone synchronized",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    glow: "rgba(99,102,241,0.15)",
  },
  {
    icon: CheckCircle2,
    title: "Zero Scheduling Errors",
    desc: "Smart conflict detection eliminates double-bookings",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    glow: "rgba(16,185,129,0.15)",
  },
  {
    icon: MessageSquare,
    title: "Team Communication",
    desc: "Built-in chat keeps your team connected",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    glow: "rgba(236,72,153,0.15)",
  },
  {
    icon: MapPin,
    title: "Multi-location Control",
    desc: "Manage all branches from a single dashboard",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    glow: "rgba(168,85,247,0.15)",
  },
];

/* ─── Pain Points Data ─── */
const PAIN_POINTS = [
  {
    icon: Calendar,
    title: "Manual Scheduling Creates Conflicts",
    desc: "Using spreadsheets leads to overlapping shifts, scheduling gaps, and frustrated employees who lose trust in the process.",
    color: "text-rose-500",
    bg: "from-rose-500/10 to-rose-500/5",
    iconBg: "bg-rose-500/10",
    number: "01",
  },
  {
    icon: MessageSquare,
    title: "Communication Breakdown",
    desc: "Important shift updates get buried in messy WhatsApp groups. Staff miss changes, leading to no-shows and confusion.",
    color: "text-amber-500",
    bg: "from-amber-500/10 to-amber-500/5",
    iconBg: "bg-amber-500/10",
    number: "02",
  },
  {
    icon: TrendingUp,
    title: "Uncontrolled Overtime Costs",
    desc: "Without real-time tracking, businesses bleed money on accidental overtime that could have been easily avoided.",
    color: "text-orange-500",
    bg: "from-orange-500/10 to-orange-500/5",
    iconBg: "bg-orange-500/10",
    number: "03",
  },
];

/* ─── Stats Data ─── */
const STATS = [
  { icon: Users, val: "10,000", suffix: "+", label: "Happy Businesses", color: "from-indigo-500 to-indigo-600" },
  { icon: Globe, val: "120", suffix: "+", label: "Countries Served", color: "from-purple-500 to-purple-600" },
  { icon: Shield, val: "0", suffix: "", label: "Missed Shifts", color: "from-emerald-500 to-emerald-600" },
  { icon: Zap, val: "99.9", suffix: "%", label: "Platform Uptime", color: "from-pink-500 to-pink-600" },
];

export default function PremiumShowcaseSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const sectionRef = useRef(null);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Mouse parallax for Part 1 dashboard
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white text-slate-900 pt-28 pb-36"
      id="premium-showcase"
    >
      {/* ── Ambient Background Mesh ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-[-10%] w-[900px] h-[900px] bg-gradient-to-br from-indigo-100/60 to-purple-100/40 rounded-full blur-[150px]" />
        <div className="absolute top-[50%] left-[-15%] w-[700px] h-[700px] bg-pink-100/40 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 right-[20%] w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[120px]" />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <ParticleField />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* ═══════════════════════════════════════════════════════════ */}
        {/* PART 1: PROBLEM + SOLUTION SHOWCASE                       */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-14 items-center mb-40">
          
          {/* Left Column: Text & Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/60 text-purple-600 w-max mb-7"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles size={14} />
              </motion.div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Smarter Workforce Management</span>
            </motion.div>
            
            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight leading-[1.08] mb-7 text-slate-900">
              How Does StaffSchedule.io Simplify{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                  Workforce Scheduling?
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </h2>

            {/* Description */}
            <div className="text-lg text-slate-500 font-medium leading-relaxed mb-10 space-y-4">
              <p>
                StaffSchedule.io helps businesses centralize staff scheduling, employee availability, shift planning, leave management, overtime tracking, and workforce communication in one employee scheduling SaaS platform designed for shift-based teams.
              </p>
              <p>
                Whether you manage a café, restaurant, retail store, or call center, our shift management software provides real-time shift updates, instant notifications, and multi-location workforce management tools that help teams stay informed and operations run more efficiently.
              </p>
            </div>

            {/* Feature Cards — 2x2 grid with hover glow */}
            <div className="grid sm:grid-cols-2 gap-3">
              {FEATURES.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`group relative flex items-start gap-4 p-4 rounded-2xl bg-white border ${feat.border} hover:shadow-lg transition-all duration-300 cursor-default overflow-hidden`}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: `radial-gradient(circle at 30% 50%, ${feat.glow}, transparent 70%)` }}
                  />
                  <div className={`relative size-10 rounded-xl ${feat.bg} ${feat.color} flex items-center justify-center flex-shrink-0`}>
                    <feat.icon size={18} strokeWidth={2.2} />
                  </div>
                  <div className="relative">
                    <span className="text-sm font-black text-slate-800 leading-tight block mb-0.5">{feat.title}</span>
                    <span className="text-[11px] text-slate-400 font-medium leading-snug">{feat.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:h-[620px] flex items-center justify-center"
            style={{ perspective: 1200 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Multi-layer glow behind dashboard */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-tr from-indigo-500/15 to-purple-500/15 rounded-[3rem] blur-[60px]"
              />
              <div className="absolute inset-0 bg-gradient-to-bl from-pink-500/8 to-indigo-500/8 rounded-[3rem] blur-[80px]" />
            </div>

            {/* The Dashboard — with mouse-follow 3D tilt */}
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative z-10 w-full max-w-[580px]"
            >
              <div className="rounded-[1.5rem] overflow-hidden border border-slate-200/60 shadow-[0_50px_120px_-25px_rgba(99,102,241,0.25),0_25px_60px_-15px_rgba(0,0,0,0.06)] bg-white">
                {/* Browser chrome */}
                <div className="h-9 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/80 flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="size-2.5 rounded-full bg-[#FF5F56]" />
                    <div className="size-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="size-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-md px-3 py-0.5 text-[10px] text-slate-400 font-medium">
                      <svg className="w-2.5 h-2.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      app.staffschedule.io/dashboard
                    </div>
                  </div>
                </div>
                <Image
                  src="/staffschedule-dashboard.png"
                  alt="StaffSchedule.io — Employee Scheduling Dashboard showing real-time shift management"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </motion.div>

            {/* Floating Cards — orbiting with stagger */}
            <motion.div
              animate={{ y: [-6, 8, -6], x: [-2, 3, -2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 sm:-left-8 top-[15%] z-20"
            >
              <div className="bg-white/95 backdrop-blur-xl px-4 py-3 rounded-2xl border border-slate-100 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.1)] flex items-center gap-3">
                <div className="size-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm">
                  <AlertCircle size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Alert</p>
                  <p className="text-xs font-black text-slate-800">Overtime Risk — 2h</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [8, -6, 8], x: [3, -2, 3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-4 sm:-right-10 bottom-[25%] z-20"
            >
              <div className="bg-white/95 backdrop-blur-xl px-4 py-3 rounded-2xl border border-slate-100 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.1)] flex items-center gap-3">
                <div className="size-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
                  <Users size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Team</p>
                  <p className="text-xs font-black text-slate-800">4 Shift Swaps</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [-4, 10, -4] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute right-4 top-[8%] z-20"
            >
              <div className="bg-white/95 backdrop-blur-xl px-3 py-2 rounded-xl border border-slate-100 shadow-lg flex items-center gap-2">
                <div className="size-7 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                  <CheckCircle2 size={12} className="text-white" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-emerald-600">Schedule Published ✓</p>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>


        {/* ═══════════════════════════════════════════════════════════ */}
        {/* PART 2: WHY BUSINESSES STRUGGLE — With numbered cards      */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-40">
          
          {/* Left Column: 3D Illustration with enhanced effects */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:order-1 order-2 flex items-center justify-center"
          >
            <div className="relative w-full max-w-[520px] aspect-square">
              {/* Animated ring behind the image */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-20px] rounded-full border-2 border-dashed border-rose-200/50 pointer-events-none"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-40px] rounded-full border border-dashed border-amber-200/30 pointer-events-none"
              />

              {/* Main container */}
              <div className="relative w-full h-full rounded-[3rem] bg-gradient-to-br from-rose-50 via-orange-50/50 to-purple-50 border border-slate-100/80 flex items-center justify-center overflow-hidden shadow-[0_30px_80px_-20px_rgba(244,63,94,0.1)]">
                {/* Inner mesh */}
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:24px_24px]" />
                
                <Image
                  src="/stressed_manager_3d.png"
                  alt="Stressed Manager struggling with manual employee scheduling"
                  fill
                  className="object-contain p-8 scale-110 drop-shadow-2xl"
                />
                
                {/* Floating Warning Tags — enhanced */}
                <motion.div
                  animate={{ y: [-10, 10, -10], rotate: [-1, 1, -1] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-8 right-6 z-10"
                >
                  <div className="bg-white/95 backdrop-blur-md text-rose-600 text-[10px] font-black uppercase px-4 py-2 rounded-xl shadow-lg border border-rose-100 flex items-center gap-2">
                    <div className="size-5 rounded-md bg-rose-100 flex items-center justify-center">
                      <Calendar size={11} />
                    </div>
                    Shift Conflicts
                  </div>
                </motion.div>
                
                <motion.div
                  animate={{ y: [8, -8, 8], rotate: [1, -1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-12 left-6 z-10"
                >
                  <div className="bg-white/95 backdrop-blur-md text-amber-600 text-[10px] font-black uppercase px-4 py-2 rounded-xl shadow-lg border border-amber-100 flex items-center gap-2">
                    <div className="size-5 rounded-md bg-amber-100 flex items-center justify-center">
                      <AlertCircle size={11} />
                    </div>
                    Missed Updates
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-[45%] right-4 z-10"
                >
                  <div className="bg-white/95 backdrop-blur-md text-orange-500 text-[10px] font-black uppercase px-3 py-1.5 rounded-lg shadow-md border border-orange-100 flex items-center gap-1.5">
                    <TrendingUp size={11} />
                    +$4.2K OT
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Text & Pain Point Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col lg:order-2 order-1"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black tracking-tight leading-[1.1] mb-6 text-slate-900">
              Why Do Businesses Struggle With{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                  Employee Scheduling?
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-rose-500 to-orange-500"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </h2>

            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">
              Businesses often struggle with employee scheduling because manual systems like spreadsheets, phone calls, and group chats create confusion, missed updates, and overtime issues. StaffSchedule.io introduces scheduling automation designed to keep teams connected and daily operations running smoothly.
            </p>

            {/* Pain Point Cards — numbered with left accent */}
            <div className="flex flex-col gap-4">
              {PAIN_POINTS.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 6, scale: 1.01 }}
                  className="group relative flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-400 cursor-default overflow-hidden"
                >
                  {/* Left accent line */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b ${point.bg}`} />
                  
                  {/* Number */}
                  <div className={`relative flex-shrink-0 size-11 rounded-xl ${point.iconBg} ${point.color} flex items-center justify-center`}>
                    <point.icon size={18} strokeWidth={2.2} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[9px] font-black ${point.color} uppercase tracking-wider opacity-60`}>{point.number}</span>
                      <h4 className="text-[15px] font-black text-slate-800">{point.title}</h4>
                    </div>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{point.desc}</p>
                  </div>

                  {/* Hover arrow */}
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>


        {/* ═══════════════════════════════════════════════════════════ */}
        {/* PART 3: TRUST & TESTIMONIALS — Premium Glassmorphism        */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto flex flex-col items-center text-center"
        >
          {/* Stars */}
          <div className="flex items-center gap-1.5 mb-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, scale: 0, rotate: -90 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + s * 0.08, type: "spring", stiffness: 200, damping: 12 }}
              >
                <Star size={18} className="text-amber-400 fill-amber-400 drop-shadow-sm" />
              </motion.div>
            ))}
          </div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-14">
            Trusted by Managers & Loved by Teams
          </h3>

          {/* Testimonial Card — Premium Glass */}
          <div className="relative w-full max-w-3xl">
            {/* Outer animated glow */}
            <motion.div
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-[2.5rem] blur-2xl pointer-events-none"
            />

            <div className="relative p-8 sm:p-12 rounded-[2rem] bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_30px_80px_-20px_rgba(99,102,241,0.12),0_0_0_1px_rgba(255,255,255,0.8)] overflow-hidden">
              {/* Inner gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/60 via-white/0 to-purple-50/60 pointer-events-none z-0" />
              
              {/* Decorative quote icon */}
              <div className="absolute top-6 left-8 z-0">
                <Quote className="size-14 text-indigo-500/[0.07] rotate-180" />
              </div>

              {/* Testimonial content */}
              <div className="relative z-10 min-h-[160px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.96 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center"
                  >
                    <p className="text-xl sm:text-2xl font-medium text-slate-700 leading-relaxed mb-8 max-w-2xl">
                      &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-4">
                      <div className={`size-12 rounded-full bg-gradient-to-br ${testimonials[activeTestimonial].gradient} p-[2px] shadow-lg`}>
                        <div className="size-full rounded-full bg-white flex items-center justify-center text-indigo-600 font-black text-sm">
                          {testimonials[activeTestimonial].avatar}
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-black text-slate-900">{testimonials[activeTestimonial].name}</div>
                        <div className="text-[11px] font-bold text-slate-500">
                          {testimonials[activeTestimonial].title}, {testimonials[activeTestimonial].company}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress indicator pills */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveTestimonial(i); }}
                    className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
                    style={{ width: i === activeTestimonial ? 32 : 8 }}
                  >
                    <div className="absolute inset-0 bg-slate-200 rounded-full" />
                    {i === activeTestimonial && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 6, ease: "linear" }}
                      />
                    )}
                    {i < activeTestimonial && (
                      <div className="absolute inset-0 bg-indigo-400 rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Row — Premium cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-16">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="group relative flex flex-col items-center justify-center py-8 px-4 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300 cursor-default overflow-hidden"
              >
                {/* Hover gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 pointer-events-none`} />
                
                <div className={`size-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-sm`}>
                  <stat.icon size={18} className="text-white" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-slate-800 mb-1 tabular-nums">
                  <AnimatedCounter value={stat.val} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
