"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion, useInView, AnimatePresence,
  type Variants, type Transition,
  useMotionValue, useTransform, useSpring as useMotionSpring,
} from "framer-motion";
import {
  ArrowRight, CheckCircle2, Star, Calendar, Clock, MapPin,
  Smartphone, MessageSquare, Users, Bell, Zap, Shield,
  BarChart3, FileText, Repeat, UserCheck, Sparkles,
  Building2, CreditCard, ClipboardCheck, Megaphone,
  Layers, ChevronDown, Globe, Lock, TrendingUp,
  Activity, Target, PieChart, Workflow,
} from "lucide-react";

/* ─── animation constants ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
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

/* ─── mouse-follow spotlight wrapper ─── */
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

/* ══════════════════════════════════
   DATA
══════════════════════════════════ */
const CATEGORIES = [
  { id: "scheduling", label: "Scheduling", icon: Calendar, color: "indigo" },
  { id: "time", label: "Time & Attendance", icon: Clock, color: "purple" },
  { id: "people", label: "People Management", icon: Users, color: "fuchsia" },
  { id: "comms", label: "Communication", icon: MessageSquare, color: "sky" },
  { id: "insights", label: "Insights & Payroll", icon: BarChart3, color: "emerald" },
];

const ALL_FEATURES = [
  // Scheduling
  { cat: "scheduling", icon: Calendar, grad: "from-indigo-500 to-indigo-700", glow: "rgba(99,102,241,0.18)", title: "Employee Scheduling", desc: "Drag-and-drop shift planning, color-coded role assignments, and instant publishing to every device.", href: "/employee-schedule-maker", featured: true },
  { cat: "scheduling", icon: Sparkles, grad: "from-violet-500 to-violet-700", glow: "rgba(124,58,237,0.18)", title: "AI-Powered Scheduling", desc: "Auto-generate optimized schedules based on demand, availability, skills, and labor budget.", href: "/features/ai", featured: true },
  { cat: "scheduling", icon: Layers, grad: "from-purple-500 to-purple-700", glow: "rgba(168,85,247,0.18)", title: "Scheduling Templates", desc: "Save recurring patterns as reusable templates. Build next week's schedule in under sixty seconds.", href: "/employee-schedule-maker" },
  { cat: "scheduling", icon: Repeat, grad: "from-fuchsia-500 to-fuchsia-700", glow: "rgba(217,70,239,0.18)", title: "Shift Swaps", desc: "Employees swap shifts in the app with manager approval. No phone tag, no missed coverage.", href: "/features/shift-swaps" },
  { cat: "scheduling", icon: Target, grad: "from-pink-500 to-pink-700", glow: "rgba(236,72,153,0.18)", title: "Open Shifts Marketplace", desc: "Post open shifts that qualified staff can claim instantly. Coverage gaps closed in minutes.", href: "/features/open-shifts" },
  { cat: "scheduling", icon: Building2, grad: "from-rose-500 to-rose-700", glow: "rgba(244,63,94,0.18)", title: "Multi-Location Management", desc: "Manage every site from one dashboard. Move staff between locations with a single tap.", href: "/features/multi-location" },

  // Time & Attendance
  { cat: "time", icon: Clock, grad: "from-purple-500 to-purple-700", glow: "rgba(168,85,247,0.18)", title: "GPS Time Clock", desc: "Mobile clock-in with GPS, geofencing, and photo verification. Eliminate buddy punching forever.", href: "/time-clock-software", featured: true },
  { cat: "time", icon: ClipboardCheck, grad: "from-violet-500 to-violet-700", glow: "rgba(124,58,237,0.18)", title: "Attendance Tracking", desc: "Real-time attendance dashboard. Flag late arrivals, no-shows, and early outs automatically.", href: "/features/attendance" },
  { cat: "time", icon: Shield, grad: "from-indigo-500 to-indigo-700", glow: "rgba(99,102,241,0.18)", title: "Compliance Tracking", desc: "Built-in break, overtime, and labor law enforcement. Stay audit-ready in every jurisdiction.", href: "/features/compliance" },

  // People Management
  { cat: "people", icon: UserCheck, grad: "from-fuchsia-500 to-fuchsia-700", glow: "rgba(217,70,239,0.18)", title: "Leave Management", desc: "Time-off requests, approvals, and accrual tracking in one workflow. No more spreadsheets.", href: "/features/leave-management", featured: true },
  { cat: "people", icon: Activity, grad: "from-pink-500 to-pink-700", glow: "rgba(236,72,153,0.18)", title: "Employee Availability", desc: "Staff submit availability and time-off in-app. Schedules respect it automatically.", href: "/features/availability" },

  // Communication
  { cat: "comms", icon: MessageSquare, grad: "from-sky-500 to-sky-700", glow: "rgba(14,165,233,0.18)", title: "Team Messaging", desc: "Direct messages, group chats, and broadcast announcements. Built for shift-based work.", href: "/team-messaging", featured: true },
  { cat: "comms", icon: Megaphone, grad: "from-cyan-500 to-cyan-700", glow: "rgba(6,182,212,0.18)", title: "Team Announcements", desc: "Send pinned, read-receipt-tracked updates to your whole team or specific groups.", href: "/features/announcements" },
  { cat: "comms", icon: Bell, grad: "from-blue-500 to-blue-700", glow: "rgba(59,130,246,0.18)", title: "Real-Time Notifications", desc: "Push, SMS, and email alerts for schedule changes, shift offers, and approvals.", href: "/features/communication" },

  // Insights & Payroll
  { cat: "insights", icon: BarChart3, grad: "from-emerald-500 to-emerald-700", glow: "rgba(16,185,129,0.18)", title: "Workforce Analytics", desc: "Labor cost dashboards, attendance trends, and overtime forecasts. Make data-driven decisions.", href: "/features/analytics", featured: true },
  { cat: "insights", icon: PieChart, grad: "from-teal-500 to-teal-700", glow: "rgba(20,184,166,0.18)", title: "Custom Reports", desc: "Export-ready reports for every metric you track. Schedule them, share them, automate them.", href: "/features/reporting" },
  { cat: "insights", icon: CreditCard, grad: "from-green-500 to-green-700", glow: "rgba(34,197,94,0.18)", title: "Payroll Integration", desc: "Sync approved timesheets directly with your payroll provider. Zero manual entry.", href: "/features/payroll" },
];

const PILLARS = [
  {
    icon: Calendar, grad: "from-indigo-500 to-purple-600",
    glow: "rgba(99,102,241,0.18)",
    title: "Schedule Smarter",
    pitch: "AI-built rotas, drag-and-drop shifts, and templates that turn a half-day of planning into ten minutes.",
    bullets: ["AI-optimized schedule generation", "Drag-and-drop shift builder", "Reusable templates and patterns", "Conflict detection and warnings"],
    cta: "Explore Scheduling",
    href: "/employee-schedule-maker",
  },
  {
    icon: Clock, grad: "from-purple-500 to-fuchsia-600",
    glow: "rgba(168,85,247,0.18)",
    title: "Track Time Accurately",
    pitch: "GPS-verified clock-ins, geofencing, and automatic timesheets that survive every payroll audit.",
    bullets: ["GPS and geofence clock-in", "Photo verification at clock-in", "Auto-generated timesheets", "Real-time overtime alerts"],
    cta: "Explore Time Clock",
    href: "/time-clock-software",
  },
  {
    icon: MessageSquare, grad: "from-fuchsia-500 to-pink-600",
    glow: "rgba(217,70,239,0.18)",
    title: "Communicate Cleanly",
    pitch: "Direct messages, group chats, and announcements — without personal phone numbers ever shared.",
    bullets: ["Private in-app messaging", "Broadcast announcements", "Pinned and read-only channels", "Cross-location chat"],
    cta: "Explore Team Messaging",
    href: "/team-messaging",
  },
  {
    icon: BarChart3, grad: "from-emerald-500 to-teal-600",
    glow: "rgba(16,185,129,0.18)",
    title: "Decide With Data",
    pitch: "Labor cost analytics, attendance patterns, and payroll-ready reports that turn data into decisions.",
    bullets: ["Live labor cost dashboards", "Attendance and overtime trends", "Custom report builder", "Payroll-ready exports"],
    cta: "Explore Analytics",
    href: "/features/analytics",
  },
];

const TRUST_STATS = [
  { value: 200, suffix: "K+", label: "Workplaces", desc: "Trust StaffSchedule.io daily" },
  { value: 4.9, suffix: "/5", label: "Average Rating", desc: "Across 1000+ verified reviews", isFloat: true },
  { value: 99.9, suffix: "%", label: "Uptime SLA", desc: "Enterprise-grade reliability", isFloat: true },
  { value: 24, suffix: "/7", label: "Live Support", desc: "Real humans, every time zone" },
];

const TESTIMONIALS = [
  { name: "Priya N.", role: "Operations Director · Retail Chain", quote: "We replaced four separate tools with one StaffSchedule account. Every feature works together — that is the part you don't appreciate until you have it.", avatar: "PN", color: "#6366f1", stars: 5 },
  { name: "Marcus L.", role: "Restaurant Group Owner", quote: "Schedules, time tracking, and team chat in one place means our managers actually have time to manage. Game changer for multi-location operations.", avatar: "ML", color: "#8b5cf6", stars: 5 },
  { name: "Sofia R.", role: "HR Lead · Healthcare Network", quote: "The compliance and audit trail features alone are worth the subscription. Add the rest of the platform and it's an absolute no-brainer.", avatar: "SR", color: "#ec4899", stars: 5 },
];

const FAQS = [
  { q: "What features does StaffSchedule.io include?", a: "Every feature — scheduling, AI-powered shift planning, GPS time clock, team messaging, leave management, shift swaps, open shifts, availability, multi-location management, analytics, payroll integration, compliance tracking, and a full mobile app — included in every plan." },
  { q: "How long does it take to set up?", a: "Most teams are live within an hour. The setup wizard imports your employees, builds your first schedule from a template, and sends mobile invites — all guided. Manager training takes about 30 minutes." },
  { q: "Do you have mobile apps for staff?", a: "Yes. Native iOS and Android apps with full functionality: check schedules, clock in with GPS, swap shifts, request leave, message coworkers, and receive push notifications for every update." },
  { q: "Can I try every feature during my trial?", a: "Absolutely. The 14-day free trial includes every feature on every plan — including enterprise analytics and multi-location hubs. No credit card required to start." },
  { q: "Is my workforce data secure?", a: "Enterprise security is built into the core. AES-256 encryption in transit and at rest, OIDC/SAML authentication, role-based access controls, and full audit logs. SOC 2 compliant infrastructure." },
  { q: "Does StaffSchedule integrate with payroll?", a: "Yes. Approved timesheets sync directly with major payroll providers. No copy-paste, no CSV exports, no reconciliation errors. Pay your team accurately every cycle." },
];

/* ══════════════════════════════════
   HERO SECTION
══════════════════════════════════ */
function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionSpring(useTransform(mouseY, [-300, 300], [5, -5]), { stiffness: 120, damping: 30 });
  const rotateY = useMotionSpring(useTransform(mouseX, [-600, 600], [-5, 5]), { stiffness: 120, damping: 30 });

  return (
    <section
      className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0c0a1a] via-[#110e2a] to-[#0c0a1a] overflow-hidden pt-24 pb-20"
      onMouseMove={e => { mouseX.set(e.clientX - window.innerWidth / 2); mouseY.set(e.clientY - window.innerHeight / 2); }}
    >
      {/* ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.45, 0.25] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1, 1.22, 1], opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.12, 0.28, 0.12] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-1/2 right-1/3 w-80 h-80 bg-fuchsia-600/15 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left copy */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="text-center lg:text-left">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            One Platform · Every Feature
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl xl:text-[3.6rem] font-black text-white leading-[1.07] tracking-tight mb-6">
            Everything Your Team Needs.{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              All in One Platform.
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            Scheduling, time tracking, messaging, leave, analytics, and payroll — built to work together,
            priced to replace the four tools you're stitching together today.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-900/50">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#features-grid"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              Browse All Features
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 justify-center lg:justify-start text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> No credit card</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> 14-day free trial</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Full feature access</span>
          </motion.div>
        </motion.div>

        {/* Right: 3D dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div style={{ rotateX, rotateY, transformPerspective: 1500 }} className="relative w-full max-w-md">

            {/* Dashboard panel */}
            <div className="relative bg-gradient-to-br from-[#1a1830] to-[#13112a] rounded-2xl border border-white/10 shadow-2xl shadow-indigo-900/40 overflow-hidden">
              {/* Header bar */}
              <div className="px-5 py-3.5 border-b border-white/5 flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-[10px] text-gray-500 font-mono">app.staffschedule.io / dashboard</span>
                </div>
              </div>

              {/* Top stats row */}
              <div className="p-5 grid grid-cols-3 gap-2.5 border-b border-white/5">
                {[
                  { label: "On Shift", v: "24", g: "from-indigo-500 to-purple-500" },
                  { label: "Pending", v: "3", g: "from-amber-500 to-orange-500" },
                  { label: "Hours", v: "186", g: "from-emerald-500 to-teal-500" },
                ].map((m, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                    <p className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">{m.label}</p>
                    <p className={`text-xl font-black bg-gradient-to-r ${m.g} bg-clip-text text-transparent`}>{m.v}</p>
                  </motion.div>
                ))}
              </div>

              {/* Schedule rows */}
              <div className="p-5 space-y-2.5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-white">Today's Schedule</p>
                  <p className="text-[10px] text-gray-500">Mon, May 25</p>
                </div>
                {[
                  { name: "Alex R.", role: "Front · 9–5", color: "#6366f1", status: "active", offset: 0 },
                  { name: "Maya S.", role: "Floor · 10–6", color: "#8b5cf6", status: "active", offset: 12 },
                  { name: "Jordan T.", role: "Stock · 11–7", color: "#ec4899", status: "break", offset: 24 },
                  { name: "Riley P.", role: "Front · 1–9", color: "#10b981", status: "soon", offset: 38 },
                ].map((emp, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + i * 0.12, ...spring }}
                    className="flex items-center gap-3 bg-white/5 rounded-lg p-2.5 border border-white/5">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                      style={{ backgroundColor: emp.color }}>
                      {emp.name.split(" ").map(w => w[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{emp.name}</p>
                      <p className="text-[9px] text-gray-500">{emp.role}</p>
                    </div>
                    {/* Animated shift bar */}
                    <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }} animate={{ width: `${50 + i * 12}%` }}
                        transition={{ delay: 1.2 + i * 0.1, duration: 0.7, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(to right, ${emp.color}, ${emp.color}88)` }} />
                    </div>
                    <div className={`w-1.5 h-1.5 rounded-full ${emp.status === "active" ? "bg-emerald-400" : emp.status === "break" ? "bg-amber-400" : "bg-gray-500"}`} />
                  </motion.div>
                ))}
              </div>

              {/* Bottom labor bar */}
              <div className="px-5 pb-5">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Labor Cost Today</p>
                    <p className="text-xs font-bold text-emerald-400">-18% vs last week</p>
                  </div>
                  <div className="flex items-end gap-1 h-12">
                    {[40, 65, 55, 80, 45, 70, 90, 60, 75, 50, 85, 95].map((h, i) => (
                      <motion.div key={i}
                        initial={{ height: 0 }} animate={{ height: `${h}%` }}
                        transition={{ delay: 1.5 + i * 0.04, duration: 0.5, ease: "easeOut" }}
                        className="flex-1 rounded-t bg-gradient-to-t from-indigo-600 to-purple-500" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card 1 — AI suggestion */}
            <motion.div
              initial={{ opacity: 0, x: -40, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.4, ...spring }}
              className="absolute -left-6 top-32 bg-white rounded-2xl shadow-2xl shadow-gray-300/30 border border-gray-100 px-3.5 py-3 min-w-max z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">AI Suggestion</p>
                  <p className="text-xs font-bold text-gray-800">Save $480 this week</p>
                </div>
              </div>
            </motion.div>

            {/* Floating card 2 — clock in */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.9, ...spring }}
              className="absolute -right-4 top-72 bg-white rounded-2xl shadow-2xl shadow-gray-300/30 border border-gray-100 px-3.5 py-3 min-w-max z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">Maya S. clocked in</p>
                  <p className="text-[10px] text-gray-500">GPS verified · 9:58 AM</p>
                </div>
              </div>
            </motion.div>

            {/* Floating card 3 — new message */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.85 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 2.3, ...spring }}
              className="absolute -right-2 -bottom-4 bg-white rounded-2xl shadow-2xl shadow-gray-300/30 border border-gray-100 px-3.5 py-3 min-w-max z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">3 new messages</p>
                  <p className="text-[10px] text-gray-500">Morning Crew · just now</p>
                </div>
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
  return (
    <div ref={ref} className="border-y border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-0 divide-y-2 lg:divide-y-0 lg:divide-x divide-gray-100">
        {TRUST_STATS.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="flex flex-col items-center gap-1 px-6 py-4">
            <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {inView ? <Counter to={s.value} suffix={s.suffix} /> : `0${s.suffix}`}
            </p>
            <p className="text-sm font-bold text-gray-800">{s.label}</p>
            <p className="text-xs text-gray-500 text-center">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════
   FEATURES GRID (with category filter)
══════════════════════════════════ */
function FeaturesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<string | null>(null);
  const filtered = active ? ALL_FEATURES.filter(f => f.cat === active) : ALL_FEATURES;

  return (
    <section id="features-grid" className="py-24 bg-[#faf9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-10">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold tracking-widest uppercase mb-5">
            <Layers className="w-3.5 h-3.5" />
            Every Tool, Every Feature
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Browse the Complete
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> StaffSchedule.io Feature Library</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-lg max-w-2xl mx-auto">
            Filter by category or browse them all. Every feature is included in every plan — no upsell, no add-ons.
          </motion.p>
        </motion.div>

        {/* Category pills */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-2 mb-10">
          <button onClick={() => setActive(null)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${active === null ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-200" : "bg-white border border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600"}`}>
            All Features
          </button>
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setActive(c.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${active === c.id ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-200" : "bg-white border border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600"}`}>
              <c.icon className="w-3.5 h-3.5" />
              {c.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((f) => (
              <motion.div key={f.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={spring}
              >
                <Link href={f.href}>
                  <SpotCard glow={f.glow} className={`rounded-2xl border bg-white shadow-sm cursor-pointer h-full ${f.featured ? "border-indigo-200 ring-1 ring-indigo-100" : "border-gray-100"}`}>
                    {f.featured && (
                      <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-[9px] font-black text-indigo-700 tracking-widest uppercase z-10">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        Popular
                      </div>
                    )}
                    <div className="p-6 h-full flex flex-col">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.grad} flex items-center justify-center mb-4 shadow-sm`}>
                        <f.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1">{f.desc}</p>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:gap-2 transition-all duration-200">
                        Learn more <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </SpotCard>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   CONNECTED PLATFORM VISUALIZATION
══════════════════════════════════ */
function ConnectedPlatform() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const NODES = [
    { icon: Calendar, label: "Scheduling", color: "#6366f1", angle: 0 },
    { icon: Clock, label: "Time Clock", color: "#8b5cf6", angle: 51 },
    { icon: MessageSquare, label: "Messaging", color: "#d946ef", angle: 102 },
    { icon: UserCheck, label: "Leave", color: "#ec4899", angle: 154 },
    { icon: BarChart3, label: "Analytics", color: "#10b981", angle: 205 },
    { icon: CreditCard, label: "Payroll", color: "#14b8a6", angle: 257 },
    { icon: Smartphone, label: "Mobile App", color: "#0ea5e9", angle: 308 },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.12, 0.05] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-14">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold tracking-widest uppercase mb-5">
            <Workflow className="w-3.5 h-3.5" />
            All Features. Connected.
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            One Platform.
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Powering Your Entire Workforce.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-lg max-w-2xl mx-auto">
            Every feature talks to every other feature. Clock-in data flows to payroll. Schedule changes trigger messages.
            Leave requests update availability. No integrations to wire, no data silos to bridge.
          </motion.p>
        </motion.div>

        {/* Visual */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative mx-auto" style={{ width: "100%", maxWidth: 720, height: 560 }}>

          {/* SVG connecting lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 720 560">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            {NODES.map((node, i) => {
              const rad = (node.angle * Math.PI) / 180;
              const cx = 360, cy = 280, r = 220;
              const x = cx + r * Math.cos(rad);
              const y = cy + r * Math.sin(rad);
              return (
                <motion.line key={i}
                  x1={cx} y1={cy} x2={x} y2={y}
                  stroke="url(#lineGrad)" strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "easeOut" }} />
              );
            })}
          </svg>

          {/* Animated pulse rings around center */}
          {[0, 1, 2].map(i => (
            <motion.div key={i}
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-2 border-indigo-400/40" />
          ))}

          {/* Center hub */}
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={inView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 18 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 flex flex-col items-center justify-center shadow-2xl shadow-indigo-400/40 z-10"
          >
            <Sparkles className="w-8 h-8 text-white mb-2" />
            <p className="text-white text-xs font-black tracking-wider">STAFFSCHEDULE</p>
            <p className="text-white/70 text-[9px] uppercase tracking-widest">Unified Platform</p>
          </motion.div>

          {/* Orbiting nodes */}
          {NODES.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const cx = 50, cy = 50;
            const r = 39;
            const x = cx + r * Math.cos(rad);
            const y = cy + r * Math.sin(rad);
            return (
              <motion.div key={node.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.12, type: "spring", stiffness: 250, damping: 20 }}
                whileHover={{ scale: 1.12, y: -4 }}
                style={{ position: "absolute", left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                className="z-20"
              >
                <div className="relative group cursor-pointer">
                  <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}>
                    <div className="w-16 h-16 rounded-2xl bg-white border-2 border-gray-100 shadow-xl shadow-gray-300/30 flex items-center justify-center group-hover:shadow-2xl transition-shadow duration-200"
                      style={{ borderColor: `${node.color}40` }}>
                      <node.icon className="w-7 h-7" style={{ color: node.color }} />
                    </div>
                    {/* pulse dot */}
                    <motion.div
                      animate={{ scale: [1, 1.6, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                      style={{ backgroundColor: node.color }}
                    />
                  </motion.div>
                  <p className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-800 whitespace-nowrap">{node.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   PILLARS SHOWCASE
══════════════════════════════════ */
function PillarsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section className="py-24 bg-[#faf9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-14">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fuchsia-50 border border-fuchsia-100 text-fuchsia-600 text-xs font-bold tracking-widest uppercase mb-5">
            <Target className="w-3.5 h-3.5" />
            Four Pillars · Infinite Capability
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            The Four Things Every
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent"> Workforce Manager Actually Needs</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-lg max-w-2xl mx-auto">
            Built around the real jobs of running a shift-based team — not a vague checklist of buzzwords.
          </motion.p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-5">
          {PILLARS.map(p => (
            <SpotCard key={p.title} glow={p.glow} className="rounded-2xl bg-white border border-gray-100 shadow-sm">
              <motion.div variants={fadeUp} className="p-7">
                <div className="flex items-start gap-4 mb-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.grad} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <p.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-gray-900 mb-1.5">{p.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{p.pitch}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-5 pl-4">
                  {p.bullets.map(b => (
                    <div key={b} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{b}</p>
                    </div>
                  ))}
                </div>
                <Link href={p.href}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-200 text-sm font-semibold text-gray-800 hover:border-indigo-300 hover:text-indigo-700 transition-all duration-200 group">
                  {p.cta}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </motion.div>
            </SpotCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   MOBILE SHOWCASE
══════════════════════════════════ */
function MobileShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section className="py-24 bg-[#0c0a1a] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.32, 0.15] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/3 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left — text */}
          <div>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-6">
              <Smartphone className="w-3.5 h-3.5" />
              Mobile App · iOS & Android
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-5">
              Your Entire Workforce
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">In Their Pocket</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-lg leading-relaxed mb-8">
              Native iOS and Android apps so every employee can check their schedule, swap shifts, clock in with GPS,
              message coworkers, request leave, and get instant push alerts — without a single email or paper schedule.
            </motion.p>
            <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-3 mb-8">
              {[
                { icon: Calendar, label: "Schedule view" },
                { icon: Clock, label: "GPS clock-in" },
                { icon: Repeat, label: "Shift swaps" },
                { icon: MessageSquare, label: "Team chat" },
                { icon: UserCheck, label: "Leave requests" },
                { icon: Bell, label: "Push notifications" },
              ].map(item => (
                <motion.div key={item.label} variants={fadeUp}
                  className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-indigo-300" />
                  </div>
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <Link href="https://app.staffschedule.io/register"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-900/50">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right — phone mockup */}
          <motion.div variants={fadeUp} className="relative flex justify-center">
            <div className="relative">
              <div className="relative w-72 bg-[#1a1830] rounded-[3rem] border-[3px] border-[#2d2a4a] shadow-2xl shadow-indigo-900/50 overflow-hidden"
                style={{ height: 580 }}>
                {/* notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#1a1830] rounded-b-2xl z-20" />
                {/* status bar */}
                <div className="flex justify-between items-center px-7 pt-8 pb-1">
                  <span className="text-white text-xs font-semibold">9:41</span>
                  <div className="flex gap-1.5 items-center">
                    <div className="w-3 h-2 bg-white/70 rounded-sm" />
                    <div className="w-4 h-2.5 rounded-sm border border-gray-500 relative">
                      <div className="absolute inset-0.5 right-1 bg-gray-400 rounded-sm" />
                    </div>
                  </div>
                </div>

                {/* greeting */}
                <div className="px-5 pt-2 pb-3">
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider">Good morning</p>
                  <p className="text-white text-lg font-black">Alex</p>
                </div>

                {/* Next shift card */}
                <div className="px-4 mb-3">
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, ...spring }}
                    className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-4 shadow-lg">
                    <p className="text-white/70 text-[10px] uppercase tracking-wider mb-1">Next Shift</p>
                    <p className="text-white text-xl font-black mb-2">9:00a – 5:00p</p>
                    <div className="flex items-center gap-2 text-white/80 text-xs">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Downtown Store</span>
                    </div>
                  </motion.div>
                </div>

                {/* Quick actions */}
                <div className="px-4 mb-3">
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-2">Quick Actions</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { icon: Clock, label: "Clock In", c: "from-emerald-500 to-teal-500" },
                      { icon: Repeat, label: "Swap", c: "from-violet-500 to-fuchsia-500" },
                      { icon: UserCheck, label: "Leave", c: "from-amber-500 to-orange-500" },
                    ].map((a, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.6 + i * 0.1, ...spring }}
                        className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col items-center gap-1">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${a.c} flex items-center justify-center`}>
                          <a.icon className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-white text-[10px] font-semibold">{a.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Inbox */}
                <div className="px-4">
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-2">Recent</p>
                  <div className="space-y-2">
                    {[
                      { icon: MessageSquare, c: "#6366f1", title: "Morning Crew · 3 new", time: "now" },
                      { icon: CheckCircle2, c: "#10b981", title: "Shift swap approved", time: "8m" },
                      { icon: Bell, c: "#f59e0b", title: "Schedule updated", time: "2h" },
                    ].map((item, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.9 + i * 0.1 }}
                        className="flex items-center gap-3 bg-white/5 rounded-xl p-2.5">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${item.c}25` }}>
                          <item.icon className="w-4 h-4" style={{ color: item.c }} />
                        </div>
                        <p className="text-white text-xs font-semibold flex-1 truncate">{item.title}</p>
                        <p className="text-gray-500 text-[10px]">{item.time}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating notification cards */}
              <motion.div
                initial={{ opacity: 0, x: -40, scale: 0.85 }}
                animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ delay: 1.2, ...spring }}
                className="absolute -left-8 top-24 bg-white rounded-2xl shadow-2xl shadow-indigo-900/40 border border-gray-100 px-3 py-2.5 z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <Bell className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Push alert</p>
                    <p className="text-xs font-bold text-gray-800">Shift starts in 30 min</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40, scale: 0.85 }}
                animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ delay: 1.6, ...spring }}
                className="absolute -right-6 bottom-32 bg-white rounded-2xl shadow-2xl shadow-purple-900/40 border border-gray-100 px-3 py-2.5 z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Approved</p>
                    <p className="text-xs font-bold text-gray-800">Leave: May 30</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   TESTIMONIALS
══════════════════════════════════ */
function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-14">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-50 border border-yellow-100 text-yellow-700 text-xs font-bold tracking-widest uppercase mb-5">
            <Star className="w-3.5 h-3.5 fill-current" />
            Loved by 200,000+ Workplaces
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Built for Real Teams.
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Trusted by Real Operators.</span>
          </motion.h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <motion.div key={t.name} variants={fadeUp}
              whileHover={{ y: -6, scale: 1.02 }} transition={spring}
              className="relative bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="absolute top-5 right-6 flex gap-0.5">
                {[...Array(t.stars)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md"
                  style={{ backgroundColor: t.color }}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section className="py-24 bg-[#faf9ff]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-12">
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">Frequently Asked Questions</motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-lg">Everything you need to know about the StaffSchedule.io platform.</motion.p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div key={i} variants={fadeUp} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-150">
                <span className="font-semibold text-gray-900 pr-4 text-sm sm:text-base">{faq.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>
                    <div className="px-6 pb-5 pt-3 text-gray-500 leading-relaxed text-sm border-t border-gray-50">{faq.a}</div>
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

/* ══════════════════════════════════
   FINAL CTA
══════════════════════════════════ */
function FinalCta() {
  return (
    <section className="py-24 bg-[#0c0a1a] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.18, 0.38, 0.18] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-900/50">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            One Platform.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Every Feature. Zero Add-Ons.</span>
          </h2>
          <p className="text-gray-400 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Try every feature free for 14 days. Your team will be up and running in under an hour.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl shadow-indigo-900/50">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              See Pricing
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {["No credit card", "14-day free trial", "Every feature included", "Cancel anytime"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span className="text-sm text-gray-400">{t}</span>
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
export default function FeaturesPage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <FeaturesGrid />
      <ConnectedPlatform />
      <PillarsSection />
      <MobileShowcase />
      <TestimonialsSection />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
