"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Star, Users, Calendar, Clock,
  Smartphone, MessageSquare, MapPin, BarChart3, ShieldCheck,
  Repeat, Bell, UserPlus, CalendarCheck2, ChevronDown,
  AlertTriangle, XCircle, FileSpreadsheet, PhoneCall,
  Zap, TrendingUp, Heart, Building2, ChevronRight,
  Check, Play, RefreshCw,
} from "lucide-react";
import IndustryShowcase from "@/components/IndustryShowcase";

/* ─── helpers ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger: Variants = { visible: { transition: { staggerChildren: 0.1 } } };

/* ─── AVATARS ─── */
const AVATARS = [
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop", alt: "Restaurant manager" },
  { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop", alt: "Retail team lead" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop", alt: "Operations manager" },
  { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop", alt: "Business owner" },
];

/* ─── FEATURES ─── */
const FEATURES = [
  { icon: CalendarCheck2, color: "from-indigo-500 to-indigo-700", bg: "bg-indigo-50", text: "text-indigo-600", title: "Drag-and-Drop Scheduling", desc: "Build weekly and monthly shift schedules in minutes with an intuitive drag-and-drop editor. Publish to your whole team instantly." },
  { icon: Users, color: "from-purple-500 to-purple-700", bg: "bg-purple-50", text: "text-purple-600", title: "Employee Availability", desc: "Staff set their availability directly in the app. Schedules automatically reflect who is available so you never double-book again." },
  { icon: Repeat, color: "from-fuchsia-500 to-fuchsia-700", bg: "bg-fuchsia-50", text: "text-fuchsia-600", title: "Shift Swaps & Open Shifts", desc: "Let employees trade shifts and claim open shifts themselves. Managers get a one-click approval so coverage is always maintained." },
  { icon: Bell, color: "from-sky-500 to-sky-700", bg: "bg-sky-50", text: "text-sky-600", title: "Real-Time Notifications", desc: "Every schedule change, shift approval, and leave update is pushed to employees instantly via the mobile app." },
  { icon: BarChart3, color: "from-emerald-500 to-emerald-700", bg: "bg-emerald-50", text: "text-emerald-600", title: "Labor Cost Analytics", desc: "Monitor labor costs, overtime risks, and team productivity in real time. Make smarter scheduling decisions with live data." },
  { icon: MapPin, color: "from-rose-500 to-rose-700", bg: "bg-rose-50", text: "text-rose-600", title: "Multi-Location Management", desc: "Manage schedules for multiple business locations from a single dashboard. Each site has its own staff, shifts, and access controls." },
  { icon: ShieldCheck, color: "from-amber-500 to-amber-700", bg: "bg-amber-50", text: "text-amber-600", title: "Leave & Time-Off Requests", desc: "Employees request leave from the app. Managers approve in one tap. Schedules auto-update to reflect approved time off." },
  { icon: MessageSquare, color: "from-teal-500 to-teal-700", bg: "bg-teal-50", text: "text-teal-600", title: "Built-In Team Chat", desc: "Replace chaotic WhatsApp groups with a professional team messaging system built directly inside the scheduling platform." },
];

/* ─── HOW IT WORKS ─── */
const STEPS = [
  { num: "01", icon: UserPlus, color: "#6366f1", bg: "bg-indigo-50", text: "text-indigo-600", title: "Add Your Employees", desc: "Invite your entire team in seconds. Add names, roles, locations, and availability preferences. No technical setup required." },
  { num: "02", icon: CalendarCheck2, color: "#8b5cf6", bg: "bg-purple-50", text: "text-purple-600", title: "Build Your Schedule", desc: "Use the drag-and-drop editor to create shifts in minutes. The system shows availability conflicts before you publish." },
  { num: "03", icon: Bell, color: "#ec4899", bg: "bg-pink-50", text: "text-pink-600", title: "Share Shifts Instantly", desc: "Publish schedules with one click. Every employee gets an instant notification on their phone with their upcoming shifts." },
  { num: "04", icon: Repeat, color: "#10b981", bg: "bg-emerald-50", text: "text-emerald-600", title: "Manage Changes Live", desc: "Approve shift swaps, leave requests, and open shifts in real time from your phone or desktop — no back-and-forth required." },
  { num: "05", icon: BarChart3, color: "#f59e0b", bg: "bg-amber-50", text: "text-amber-600", title: "Track & Optimise", desc: "Monitor labor costs, attendance, and team performance with real-time analytics to keep operations running efficiently." },
];

/* ─── BENEFITS ─── */
const BENEFITS = [
  { value: "70%", label: "Less Time Building Schedules", desc: "Managers spend hours on spreadsheets. StaffSchedule.io cuts schedule creation time by up to 70%.", icon: Clock, color: "from-indigo-500 to-purple-600" },
  { value: "18%", label: "Average Labor Cost Savings", desc: "Real-time overtime alerts and smart shift planning help businesses reduce labour costs by an average of 18%.", icon: TrendingUp, color: "from-emerald-500 to-teal-600" },
  { value: "3×", label: "Faster Leave Approvals", desc: "One-tap approvals mean leave requests are processed 3× faster, keeping teams informed and managers stress-free.", icon: Zap, color: "from-fuchsia-500 to-pink-600" },
  { value: "98%", label: "Employee Satisfaction Score", desc: "When staff can see their schedules, swap shifts, and request leave from their phone, they are significantly more engaged.", icon: Heart, color: "from-rose-500 to-orange-500" },
];

/* ─── TESTIMONIALS ─── */
const TESTIMONIALS = [
  { name: "Sarah Mitchell", role: "Operations Manager", company: "UrbanBite Restaurants", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop", rating: 5, quote: "We tried everything — spreadsheets, WhatsApp groups, even sticky notes. Nothing worked until we found StaffSchedule.io. Now our entire employee scheduling runs on autopilot.", industry: "Restaurant · 45 Employees" },
  { name: "Dr. James Chen", role: "Medical Director", company: "PrimeCare Clinics", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop", rating: 5, quote: "Ensuring we have the right mix of nurses every day is critical. The employee schedule maker brought complete order to our rota management. Leave approvals alone save me two hours a week.", industry: "Healthcare · 82 Employees" },
  { name: "Alex Rivera", role: "Store Manager", company: "TrendyMart Retail", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop", rating: 5, quote: "From scheduling around college classes to tracking overtime, everything just runs seamlessly. The shift swap feature alone has eliminated so many manager headaches.", industry: "Retail · 120 Employees" },
  { name: "Emily Torres", role: "Studio Owner", company: "FitZone Fitness", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop", rating: 5, quote: "Managing different trainer availability and class times used to take hours every week. Now it takes minutes. I finally have my Sunday evenings back.", industry: "Fitness · 65 Employees" },
  { name: "Marcus Thompson", role: "Operations Lead", company: "FastWave Logistics", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop", rating: 5, quote: "Dispatching used to mean whiteboards and phone calls. Now everyone has their route on their phone the moment the schedule goes live. Productivity is up 40%.", industry: "Logistics · 200 Employees" },
  { name: "Carlos Mendez", role: "Site Foreman", company: "SteelBridge Construction", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop", rating: 5, quote: "Keeping track of who is on which site used to cause so many payroll arguments. With this employee schedule maker it is completely transparent now. No more disputes.", industry: "Construction · 310 Employees" },
];

/* ─── FAQs ─── */
const FAQS = [
  { q: "Can ChatGPT create a schedule?", a: "Yes, ChatGPT can help create employee schedules, suggest shift plans, and organize work schedules for teams. However, businesses usually need a dedicated employee schedule maker like StaffSchedule.io to manage staff scheduling, employee availability, leave requests, shift swaps, and real-time team updates in one organized dashboard." },
  { q: "What is the 7 3 7 4 shift pattern?", a: "The 7 3 7 4 shift pattern is a rotating work schedule where employees work 7 days, get 3 days off, then work another 7 days followed by 4 days off. Businesses often use this employee shift scheduling pattern in workplaces that need 24/7 coverage such as healthcare, security, and manufacturing." },
  { q: "Can AI make my work schedule?", a: "Yes, AI can help businesses create employee work schedules faster by organizing shifts, tracking employee availability, and reducing scheduling conflicts. Modern employee scheduling software like StaffSchedule.io makes scheduling easier by helping managers manage shifts, leave requests, notifications, and team communication from one place." },
  { q: "What is the best employee scheduling software?", a: "The best employee scheduling software is one that makes staff scheduling simple, keeps teams organized, and saves managers time. StaffSchedule.io is built for growing businesses that want an easy employee schedule maker with shift management, employee availability tracking, team communication, mobile access, and multi-location scheduling features." },
  { q: "What is a 5 2 5 3 work schedule?", a: "A 5 2 5 3 work schedule is a rotating shift pattern where employees work 5 days, get 2 days off, work another 5 days, then receive 3 days off. This type of employee shift planning helps businesses balance workloads while giving employees regular rest days." },
  { q: "Which AI is good for scheduling?", a: "Different AI scheduling tools help businesses automate scheduling tasks, but the best option depends on your business needs. Many growing teams use employee scheduling online software like StaffSchedule.io to simplify staff scheduling, manage employee shifts, track availability, and keep teams updated in real time." },
];

/* ═══════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════ */
export default function EmployeeScheduleMakerPage() {
  return (
    <div className="bg-white overflow-x-hidden font-sans">

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <HeroSection />

      {/* ══════════════════════════════════════════
          2. PROBLEM
      ══════════════════════════════════════════ */}
      <ProblemSection />

      {/* ══════════════════════════════════════════
          3. SOLUTION
      ══════════════════════════════════════════ */}
      <SolutionSection />

      {/* ══════════════════════════════════════════
          4. CTA BANNER
      ══════════════════════════════════════════ */}
      <CtaBanner />

      {/* ══════════════════════════════════════════
          5. FEATURES
      ══════════════════════════════════════════ */}
      <FeaturesSection />

      {/* ══════════════════════════════════════════
          6. HOW IT WORKS
      ══════════════════════════════════════════ */}
      <HowItWorksSection />

      {/* ══════════════════════════════════════════
          7. MOBILE APP
      ══════════════════════════════════════════ */}
      <MobileAppSection />

      {/* ══════════════════════════════════════════
          8. INDUSTRIES (reuse homepage component)
      ══════════════════════════════════════════ */}
      <IndustryShowcase />

      {/* ══════════════════════════════════════════
          9. BENEFITS
      ══════════════════════════════════════════ */}
      <BenefitsSection />

      {/* ══════════════════════════════════════════
          10. TESTIMONIALS
      ══════════════════════════════════════════ */}
      <TestimonialsSection />

      {/* ══════════════════════════════════════════
          11. FAQ
      ══════════════════════════════════════════ */}
      <FaqSection />

      {/* ══════════════════════════════════════════
          12. FINAL CTA
      ══════════════════════════════════════════ */}
      <FinalCtaSection />

    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex flex-col justify-start pt-28 sm:pt-32 pb-0 overflow-hidden bg-[#FDFBFF]">
      {/* Background */}
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[65%] bg-gradient-to-b from-[#F5EEFF] via-[#FAF5FF] to-transparent opacity-90" />
        <div className="absolute top-[30%] w-[140%] -left-[20%] h-[500px] z-0 overflow-visible">
          <div className="absolute inset-0 opacity-35 blur-[90px]">
            <svg className="w-full h-full" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M0,150 C240,350 480,50 720,200 C960,350 1200,50 1440,150 L1440,500 L0,500 Z" fill="url(#hero-wave)" />
              <defs>
                <linearGradient id="hero-wave" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="30%" stopColor="#8b5cf6" />
                  <stop offset="60%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="absolute top-[38%] left-[12%] w-[380px] h-[200px] bg-indigo-500/15 rounded-full blur-[70px] animate-[float_10s_ease-in-out_infinite]" />
        <div className="absolute top-[35%] right-[12%] w-[480px] h-[240px] bg-purple-500/15 rounded-full blur-[80px] animate-[floatReverse_12s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-0 w-full h-[25%] bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col items-center">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/70 backdrop-blur-md border border-purple-100 shadow-sm mb-8">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8b5cf6]">Free 14-Day Trial · No Credit Card Required</span>
        </motion.div>

        {/* H1 */}
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] font-black tracking-tight text-[#0f172a] text-center leading-[1.15] mb-6 max-w-5xl px-2">
          Employee Schedule Maker{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899]">
            for Busy Teams
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-[#475569] font-medium leading-relaxed text-center max-w-3xl mb-10 px-4">
          StaffSchedule.io is an easy-to-use online employee scheduling software that helps businesses create work schedules, manage employee availability, track shifts, approve leave requests, and keep teams connected from one organized dashboard.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full sm:w-auto">
          <Link href="https://app.staffschedule.io/onboarding.php?start_trial=1"
            className="w-full sm:w-auto flex items-center justify-center gap-3 h-14 px-10 rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white font-black text-sm uppercase tracking-widest shadow-[0_12px_40px_-8px_rgba(139,92,246,0.5)] hover:shadow-[0_16px_50px_-8px_rgba(139,92,246,0.6)] hover:scale-[1.02] transition-all group">
            Start Your Free Trial
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/pricing"
            className="w-full sm:w-auto flex items-center justify-center gap-2 h-14 px-10 rounded-2xl bg-white text-[#1c1236] border-2 border-[#e5e0f1] font-black text-sm uppercase tracking-widest hover:border-[#8b5cf6] hover:text-[#8b5cf6] transition-all">
            View Pricing Plans
          </Link>
        </motion.div>

        {/* Trust signals */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-10">
          {["No Credit Card Required", "14-Day Free Trial", "Setup in Under 10 Minutes"].map((t) => (
            <div key={t} className="flex items-center gap-2 text-[11px] font-black text-[#5b4f7a] uppercase tracking-wider">
              <CheckCircle2 size={13} className="text-[#8b5cf6]" />
              {t}
            </div>
          ))}
        </motion.div>

        {/* Social proof */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center gap-3 py-2 px-6 bg-white/60 rounded-full border border-[#e5e0f1] shadow-sm backdrop-blur-md mb-16">
          <div className="flex -space-x-2" aria-hidden>
            {AVATARS.map((a, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm">
                <Image src={a.src} alt={a.alt} width={32} height={32} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start pl-1">
            <div className="flex gap-0.5 mb-0.5">
              {[1,2,3,4,5].map(s => <Star key={s} size={10} className="fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-[10px] text-[#5b4f7a] font-bold uppercase tracking-wider">
              Loved by <span className="text-[#8b5cf6] font-black">10,000+</span> Managers
            </p>
          </div>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-5xl mx-auto mb-[-80px] sm:mb-[-100px] z-30 group"
        >
          <div className="absolute -inset-8 bg-gradient-to-b from-purple-500/8 to-transparent rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative rounded-2xl md:rounded-[2rem] border border-[#e5e0f1]/60 shadow-[0_40px_100px_-20px_rgba(139,92,246,0.18)] bg-white/40 backdrop-blur-2xl p-2 md:p-3 transition-transform duration-700 group-hover:scale-[1.005]">
            <div className="rounded-xl md:rounded-[1.5rem] overflow-hidden border border-[#f0ecf9] bg-white shadow-sm">
              <div className="h-10 bg-[#fdfcff] border-b border-[#f0ecf9] flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  {["#e2dbea","#e2dbea","#e2dbea"].map((c,i) => <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}
                </div>
                <div className="mx-auto bg-[#f5f3f9] rounded-md h-6 w-1/3 flex items-center justify-center border border-[#ece9f2]">
                  <span className="text-[9px] font-bold text-[#b4a9c6]">app.staffschedule.io</span>
                </div>
              </div>
              <Image
                src="/staffschedule-dashboard.png"
                alt="StaffSchedule.io employee schedule maker dashboard showing shift scheduling, employee availability, and team management"
                width={1400} height={800}
                className="w-full h-auto object-cover object-top"
                priority quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   PROBLEM
═══════════════════════════════════════════════════════ */
function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const problems = [
    { icon: FileSpreadsheet, color: "text-red-500", bg: "bg-red-50 border-red-100", title: "Spreadsheet Chaos", desc: "Hours wasted building schedules in Excel that break every time someone changes availability or calls in sick.", tag: "TIME WASTED" },
    { icon: PhoneCall, color: "text-orange-500", bg: "bg-orange-50 border-orange-100", title: "Phone Call Chaos", desc: "Endless back-and-forth calls and texts trying to fill shift gaps, confirm availability, and approve last-minute swaps.", tag: "COMMUNICATION BREAKDOWN" },
    { icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-50 border-yellow-100", title: "Missed Shift Updates", desc: "Employees miss schedule changes because updates get buried in group chats. No-shows, confusion, and angry customers follow.", tag: "COVERAGE GAPS" },
    { icon: XCircle, color: "text-rose-500", bg: "bg-rose-50 border-rose-100", title: "Leave Request Mess", desc: "Time-off requests in WhatsApp, email, and paper notes. Managers lose track and teams end up understaffed without warning.", tag: "SCHEDULING MISTAKES" },
  ];

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-[#0c0a1a] overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-purple-900/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-indigo-900/20 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
            <AlertTriangle size={13} className="text-red-400" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-red-400">The Problem</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15] mb-5">
            Why Employee Scheduling Becomes{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">So Difficult</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#94a3b8] text-base sm:text-lg leading-relaxed font-medium">
            Managing employee schedules manually can become stressful and confusing for managers and business owners. Shift changes, availability issues, missed updates, and last-minute changes can waste hours every day.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map((p, i) => (
            <motion.div key={i} variants={fadeUp}
              className={`relative rounded-2xl border p-6 ${p.bg} group hover:-translate-y-1 transition-all duration-300 overflow-hidden`}>
              <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-white/80 border border-current">
                <span className={`text-[8px] font-black tracking-widest ${p.color}`}>{p.tag}</span>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-white shadow-sm`}>
                <p.icon size={22} className={p.color} />
              </div>
              <h3 className="text-base font-black text-white mb-2">{p.title}</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed font-medium">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
          className="text-center text-[#64748b] text-sm sm:text-base font-medium mt-12 max-w-2xl mx-auto">
          Without the right employee schedule maker, managers spend hours creating schedules, updating shifts, and fixing mistakes instead of focusing on business growth.
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SOLUTION
═══════════════════════════════════════════════════════ */
function SolutionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const solutions = [
    { icon: CalendarCheck2, color: "from-indigo-500 to-purple-600", title: "One Dashboard, Total Control", desc: "All employee schedules, shifts, availability, and leave requests managed from a single clean dashboard — no more switching between tools." },
    { icon: Bell, color: "from-purple-500 to-fuchsia-600", title: "Real-Time Team Updates", desc: "Every schedule change is instantly pushed to employees. No missed shifts, no WhatsApp chaos, no phone-call marathons." },
    { icon: RefreshCw, color: "from-fuchsia-500 to-pink-600", title: "Automated Scheduling Workflow", desc: "Shift swaps, leave approvals, and open shift claims all happen automatically inside the app — managers only approve, they don't chase." },
  ];

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-[#FAFAFA] overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[600px] bg-purple-100/40 rounded-full blur-[130px] -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-indigo-100/30 rounded-full blur-[100px] -ml-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-6">
            <CheckCircle2 size={13} className="text-emerald-600" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-600">The Solution</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.15] mb-5">
            Easy-to-Use Employee Schedule Maker{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899]">
              for Growing Businesses
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#475569] text-base sm:text-lg leading-relaxed font-medium">
            StaffSchedule.io helps managers create employee schedules, manage shifts, approve leave requests, and update teams from one simple dashboard. Schedules, team communication, open shifts, and employee availability — all in one place.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: solution cards */}
          <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} className="flex flex-col gap-5">
            {solutions.map((s, i) => (
              <motion.div key={i} variants={fadeUp}
                className="flex gap-5 p-6 bg-white rounded-2xl border border-[#f0ecf9] shadow-sm hover:shadow-md hover:border-purple-200 transition-all group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
                  <s.icon size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#0f172a] mb-1.5">{s.title}</h3>
                  <p className="text-sm text-[#64748b] leading-relaxed font-medium">{s.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Inline CTA */}
            <motion.div variants={fadeUp}
              className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link href="https://app.staffschedule.io/onboarding.php?start_trial=1"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-all group">
                Start Free Trial <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/features"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-[#5b4f7a] border border-[#e5e0f1] font-black text-sm uppercase tracking-wider hover:border-purple-300 transition-all">
                See All Features
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: stats panel */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}
            className="relative">
            <div className="bg-white rounded-3xl border border-[#f0ecf9] shadow-xl shadow-purple-100/50 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full -mr-24 -mt-24 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/5 rounded-full -ml-20 -mb-20 blur-2xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-[#8b5cf6]">Live Dashboard Preview</span>
                </div>

                {/* Mini schedule preview */}
                <div className="space-y-3 mb-8">
                  {[
                    { name: "Sarah M.", role: "Morning Shift", time: "08:00 – 16:00", status: "Confirmed", color: "bg-emerald-100 text-emerald-700" },
                    { name: "James K.", role: "Evening Shift", time: "16:00 – 24:00", status: "Pending", color: "bg-amber-100 text-amber-700" },
                    { name: "Emma R.", role: "Night Shift", time: "00:00 – 08:00", status: "Confirmed", color: "bg-emerald-100 text-emerald-700" },
                    { name: "David L.", role: "Morning Shift", time: "08:00 – 16:00", status: "Swap Req.", color: "bg-purple-100 text-purple-700" },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-[#fafafa] rounded-xl border border-[#f0ecf9]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
                          <span className="text-white text-[10px] font-black">{row.name.split(" ").map(n => n[0]).join("")}</span>
                        </div>
                        <div>
                          <p className="text-[12px] font-bold text-[#0f172a]">{row.name}</p>
                          <p className="text-[10px] text-[#94a3b8] font-medium">{row.time}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${row.color}`}>{row.status}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { val: "12/12", label: "Shifts Filled", icon: CheckCircle2, color: "text-emerald-500" },
                    { val: "0", label: "Conflicts", icon: ShieldCheck, color: "text-purple-500" },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-[#fafafa] rounded-xl border border-[#f0ecf9]">
                      <stat.icon size={18} className={stat.color} />
                      <div>
                        <p className="text-lg font-black text-[#0f172a]">{stat.val}</p>
                        <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CTA BANNER
═══════════════════════════════════════════════════════ */
function CtaBanner() {
  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-r from-[#4338ca] via-[#7c3aed] to-[#9333ea]">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -top-20 left-1/3 w-[500px] h-[300px] bg-white/10 rounded-full blur-[100px]" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight mb-1">
            Ready to simplify your employee scheduling?
          </h2>
          <p className="text-white/70 font-medium text-sm sm:text-base">Join 10,000+ businesses already saving time with StaffSchedule.io</p>
        </div>
        <Link href="https://app.staffschedule.io/onboarding.php?start_trial=1"
          className="flex-shrink-0 flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#6d28d9] font-black text-sm uppercase tracking-widest shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all group">
          Get Started Free <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   FEATURES
═══════════════════════════════════════════════════════ */
function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_50%,transparent_100%)] opacity-30" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-purple-100/30 rounded-full blur-[120px] -mr-40 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200 mb-6">
            <Zap size={13} className="text-[#8b5cf6]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8b5cf6]">Powerful Features</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.15] mb-5">
            Everything You Need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]">Schedule Smarter</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#475569] text-base sm:text-lg font-medium leading-relaxed">
            One powerful employee schedule maker packed with every tool growing businesses need to manage shifts, track availability, and keep teams connected.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <motion.article key={i} variants={fadeUp}
              className="group relative bg-white rounded-2xl border border-[#f0ecf9] p-6 hover:shadow-xl hover:shadow-purple-100/60 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden cursor-default">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-indigo-500/0 group-hover:from-purple-500/[0.03] group-hover:to-indigo-500/[0.02] transition-all duration-500 rounded-2xl" />
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                <f.icon size={22} className="text-white" />
              </div>
              <h3 className="text-base font-black text-[#0f172a] mb-2 relative z-10">{f.title}</h3>
              <p className="text-sm text-[#64748b] leading-relaxed font-medium relative z-10">{f.desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   HOW IT WORKS
═══════════════════════════════════════════════════════ */
function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-[#FAFAFA] overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-[130px] -ml-40 -mt-40" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-100/20 rounded-full blur-[110px] -mr-40 -mb-40" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200 mb-6">
            <Play size={13} className="text-indigo-600" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-600">How It Works</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.15] mb-5">
            Your Employee Schedule Maker,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]">Up and Running in Minutes</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#475569] text-base sm:text-lg font-medium leading-relaxed">
            Five simple steps from team setup to fully automated scheduling. No training required.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-3">
          {STEPS.map((step, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActive(i)}
              className={`group relative rounded-2xl p-6 border cursor-pointer transition-all duration-300 ${active === i ? "bg-white border-purple-200 shadow-xl shadow-purple-100/50 scale-[1.02]" : "bg-white/60 border-[#f0ecf9] hover:bg-white hover:shadow-md"}`}
            >
              {/* Step number */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94a3b8]">{step.num}</span>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                    <ChevronRight size={16} className="text-[#c4b5d4]" />
                  </div>
                )}
              </div>
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ background: `${step.color}18` }}>
                <step.icon size={20} style={{ color: step.color }} />
              </div>
              <h3 className="text-[13px] font-black text-[#0f172a] mb-2 leading-snug">{step.title}</h3>
              <p className={`text-xs text-[#64748b] leading-relaxed font-medium transition-all duration-300 ${active === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0 lg:max-h-40 lg:opacity-100"}`}>
                {step.desc}
              </p>
              {active === i && (
                <motion.div layoutId="stepHighlight" className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl"
                  style={{ background: `linear-gradient(to right, ${step.color}, ${step.color}88)` }} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MOBILE APP
═══════════════════════════════════════════════════════ */
function MobileAppSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const features = [
    { icon: Calendar, color: "text-indigo-500", bg: "bg-indigo-50", title: "View Schedules Anywhere", desc: "Employees check their shifts, locations, and role details from their phone — no laptop needed." },
    { icon: Bell, color: "text-purple-500", bg: "bg-purple-50", title: "Instant Push Notifications", desc: "Every schedule update, swap approval, and leave decision is pushed to their phone in real time." },
    { icon: Repeat, color: "text-fuchsia-500", bg: "bg-fuchsia-50", title: "Request Swaps on the Go", desc: "Staff can offer shifts to teammates and managers approve in one tap — all from the mobile app." },
    { icon: MessageSquare, color: "text-emerald-500", bg: "bg-emerald-50", title: "Team Chat Built In", desc: "No personal numbers, no WhatsApp chaos. Direct messages and team channels live in the app." },
  ];

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[700px] bg-gradient-to-br from-indigo-100/40 to-purple-100/30 rounded-full blur-[130px] -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-gradient-to-tr from-purple-100/20 to-pink-100/20 rounded-full blur-[110px] -ml-20 -mb-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: content */}
          <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
            <motion.div variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200 mb-6">
              <Smartphone size={13} className="text-indigo-600" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-600">Mobile App</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.15] mb-5">
              Your Employee Schedule Maker{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]">in Your Pocket</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#475569] text-base sm:text-lg font-medium leading-relaxed mb-10">
              StaffSchedule.io makes staff scheduling easier with a simple mobile app built for busy managers and growing teams. Whether you are at work, at home, or travelling, you can create schedules, approve leave requests, manage shifts, and keep employees updated in real time.
            </motion.p>
            <motion.div variants={stagger} className="flex flex-col gap-4">
              {features.map((f, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="flex items-start gap-4 p-4 rounded-xl border border-[#f0ecf9] bg-white hover:shadow-md hover:border-purple-200 transition-all group">
                  <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                    <f.icon size={18} className={f.color} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#0f172a] mb-0.5">{f.title}</h3>
                    <p className="text-xs text-[#64748b] font-medium leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: phone mockup */}
          <motion.div initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center relative">
            {/* Glow behind phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500/15 rounded-full blur-[80px]" />

            {/* Floating notification cards */}
            <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 sm:-left-8 top-12 bg-white rounded-2xl shadow-xl border border-[#f0ecf9] p-3 z-20 w-44 sm:w-52">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center"><Check size={12} className="text-emerald-600" /></div>
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">Shift Approved</span>
              </div>
              <p className="text-[11px] font-bold text-[#0f172a]">Sarah — Morning Shift</p>
              <p className="text-[10px] text-[#94a3b8] font-medium">Tomorrow 08:00 – 16:00</p>
            </motion.div>

            <motion.div animate={{ y: [4, -4, 4] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -right-4 sm:-right-8 top-32 bg-white rounded-2xl shadow-xl border border-[#f0ecf9] p-3 z-20 w-40 sm:w-48">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center"><Bell size={12} className="text-purple-600" /></div>
                <span className="text-[10px] font-black text-purple-600 uppercase tracking-wider">New Shift</span>
              </div>
              <p className="text-[11px] font-bold text-[#0f172a]">Open Shift Available</p>
              <p className="text-[10px] text-[#94a3b8] font-medium">Friday 12:00 – 20:00</p>
            </motion.div>

            <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -left-2 sm:-left-6 bottom-20 bg-white rounded-2xl shadow-xl border border-[#f0ecf9] p-3 z-20 w-40 sm:w-48">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center"><MessageSquare size={12} className="text-sky-600" /></div>
                <span className="text-[10px] font-black text-sky-600 uppercase tracking-wider">Team Chat</span>
              </div>
              <p className="text-[11px] font-bold text-[#0f172a]">Manager: "Schedule updated"</p>
              <p className="text-[10px] text-[#94a3b8] font-medium">2 minutes ago</p>
            </motion.div>

            {/* Phone frame */}
            <div className="relative w-[220px] sm:w-[260px] aspect-[9/19] rounded-[2.5rem] sm:rounded-[3rem] border-[6px] sm:border-[8px] border-[#1c1236] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)] bg-white overflow-hidden z-10 animate-[float_7s_ease-in-out_infinite]">
              <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-[35%] h-4 sm:h-5 bg-[#1c1236] rounded-full z-30" />
              <div className="w-full h-full bg-[#fdfcff] flex flex-col pt-8 sm:pt-10 px-3 sm:px-4 relative z-20 overflow-hidden">
                {/* App header */}
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-[8px] sm:text-[9px] text-[#8f86a8] font-semibold">Good morning,</p>
                    <p className="text-[10px] sm:text-xs font-black text-[#1c1236]">Sarah Jenkins</p>
                  </div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-100 overflow-hidden border-2 border-white shadow-sm relative">
                    <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" alt="Staff manager" fill className="object-cover" />
                  </div>
                </div>
                {/* Next shift */}
                <div className="bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 shadow-lg shadow-purple-500/30 text-white">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">Next Shift</span>
                    <span className="text-[7px] sm:text-[8px] font-bold">Today</span>
                  </div>
                  <div className="text-sm sm:text-base font-black mb-0.5">Morning Crew</div>
                  <p className="text-[9px] sm:text-[10px] text-purple-100 font-medium">09:00 AM – 05:00 PM</p>
                </div>
                {/* Team list */}
                <p className="text-[8px] sm:text-[9px] font-black text-[#1c1236] mb-2 uppercase tracking-wider">Who&apos;s Working</p>
                <div className="flex flex-col gap-1.5 flex-1 overflow-hidden relative">
                  {[
                    { name: "Michael T.", role: "Manager", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" },
                    { name: "Emma W.", role: "Barista", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" },
                    { name: "David L.", role: "Cashier", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" },
                  ].map((u, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white p-1.5 rounded-lg sm:rounded-xl border border-[#f0ecf9] shadow-sm">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden relative flex-shrink-0">
                        <Image src={u.img} alt={u.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-[8px] sm:text-[9px] font-bold text-[#1c1236] leading-tight">{u.name}</p>
                        <p className="text-[7px] sm:text-[8px] text-[#8f86a8] font-medium">{u.role}</p>
                      </div>
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    </div>
                  ))}
                  <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#fdfcff] to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   BENEFITS
═══════════════════════════════════════════════════════ */
function BenefitsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-[#FAFAFA] overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[700px] h-[500px] bg-purple-100/30 rounded-full blur-[130px] -ml-40 -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[400px] bg-indigo-100/20 rounded-full blur-[110px] -mr-40 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200 mb-6">
            <TrendingUp size={13} className="text-[#8b5cf6]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8b5cf6]">Results You'll See</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.15] mb-5">
            Benefits of Using Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]">Employee Schedule Maker</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#475569] text-base sm:text-lg font-medium leading-relaxed">
            StaffSchedule.io helps businesses spend less time managing schedules and more time focusing on their teams and daily operations.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((b, i) => (
            <motion.div key={i} variants={fadeUp}
              className="group relative bg-white rounded-2xl border border-[#f0ecf9] p-7 overflow-hidden hover:shadow-xl hover:shadow-purple-100/50 hover:-translate-y-1.5 transition-all duration-300">
              <div className={`absolute inset-0 bg-gradient-to-br ${b.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-2xl`} />
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${b.color} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform relative z-10`}>
                <b.icon size={22} className="text-white" />
              </div>
              <div className={`text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-br ${b.color} relative z-10`}>{b.value}</div>
              <h3 className="text-sm font-black text-[#0f172a] mb-2 relative z-10">{b.label}</h3>
              <p className="text-xs text-[#64748b] font-medium leading-relaxed relative z-10">{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
          className="text-center text-[#64748b] font-medium mt-12 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Whether you manage a small business or multiple locations, our staff scheduling software helps reduce scheduling confusion, improve communication, and save hours every week.
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   TESTIMONIALS
═══════════════════════════════════════════════════════ */
function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-[#0c0a1a] overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute top-0 left-1/3 w-[700px] h-[500px] bg-purple-900/25 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 right-1/3 w-[600px] h-[400px] bg-indigo-900/20 rounded-full blur-[110px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Star size={13} className="text-yellow-400 fill-yellow-400" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/70">Trusted by Teams Worldwide</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15] mb-5">
            Why Teams Love Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#ec4899]">
              Employee Schedule Maker
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#94a3b8] text-base sm:text-lg font-medium leading-relaxed">
            From staff scheduling and employee availability to shift management and team communication, StaffSchedule.io helps growing businesses manage teams more easily.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.article key={i} variants={fadeUp}
              className="group relative rounded-2xl border border-white/8 bg-white/[0.04] backdrop-blur-md p-7 hover:bg-white/[0.07] hover:border-purple-500/25 hover:shadow-xl hover:shadow-purple-900/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-purple-500/10 transition-colors" />
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[1,2,3,4,5].map(s => <Star key={s} size={13} className="fill-yellow-400 text-yellow-400" />)}
              </div>
              {/* Quote */}
              <blockquote className="text-[#e2e8f0] text-sm leading-relaxed font-medium mb-6 relative z-10">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              {/* Author */}
              <div className="flex items-center gap-3 relative z-10">
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

/* ═══════════════════════════════════════════════════════
   FAQ
═══════════════════════════════════════════════════════ */
function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-purple-100/25 rounded-full blur-[120px] -mr-40 -mt-40" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200 mb-6">
            <ChevronDown size={13} className="text-[#8b5cf6]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8b5cf6]">Frequently Asked Questions</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.15] mb-5">
            Questions About Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]">Employee Schedule Maker</span>
          </motion.h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${open === i ? "border-purple-200 shadow-md shadow-purple-100/50 bg-white" : "border-[#f0ecf9] bg-[#FAFAFA] hover:border-purple-200"}`}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
                aria-expanded={open === i}
              >
                <h3 className={`text-sm sm:text-base font-black transition-colors ${open === i ? "text-[#6366f1]" : "text-[#0f172a]"}`}>{faq.q}</h3>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
                  <ChevronDown size={18} className={open === i ? "text-[#6366f1]" : "text-[#94a3b8]"} />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-sm text-[#64748b] font-medium leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   FINAL CTA
═══════════════════════════════════════════════════════ */
function FinalCtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-28 lg:py-40 bg-[#0c0a1a] overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:24px_24px]" />
        <motion.div animate={{ x: [0, 25, -20, 0], y: [0, -25, 20, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[20%] w-[600px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <motion.div animate={{ x: [0, -20, 25, 0], y: [0, 20, -20, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[15%] w-[500px] h-[350px] bg-purple-600/15 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}
          className="max-w-3xl mx-auto">
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/70">Start For Free Today</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-6">
            Stop Wasting Hours on{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] via-[#c084fc] to-[#ec4899]">
              Manual Scheduling
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#94a3b8] text-base sm:text-lg font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
            Join 10,000+ managers who switched from spreadsheets and group chats to a professional employee schedule maker. Set up in minutes, see results from day one.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link href="https://app.staffschedule.io/onboarding.php?start_trial=1"
              className="w-full sm:w-auto flex items-center justify-center gap-3 h-16 px-12 rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-white font-black text-sm uppercase tracking-widest shadow-[0_12px_50px_-8px_rgba(139,92,246,0.5)] hover:shadow-[0_16px_60px_-8px_rgba(139,92,246,0.6)] hover:scale-[1.02] transition-all group">
              Start Free Trial — No Credit Card
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/pricing"
              className="w-full sm:w-auto flex items-center justify-center gap-2 h-16 px-10 rounded-2xl bg-white/5 border border-white/15 text-white font-black text-sm uppercase tracking-widest hover:bg-white/10 hover:border-white/25 transition-all">
              View Pricing Plans
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {["14-Day Free Trial", "No Credit Card Required", "Setup in Under 10 Minutes", "Cancel Anytime"].map((t) => (
              <div key={t} className="flex items-center gap-2 text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider">
                <CheckCircle2 size={13} className="text-[#8b5cf6]" />
                {t}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
