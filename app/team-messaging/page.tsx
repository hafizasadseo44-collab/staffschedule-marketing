"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion, useInView, AnimatePresence,
  type Variants, type Transition,
  useMotionValue, useTransform, useSpring as useMotionSpring,
} from "framer-motion";
import {
  ArrowRight, CheckCircle2, Star, Shield, Smartphone,
  Users, MessageSquare, Send, Bell, Lock, Globe,
  Zap, AlertCircle, ChevronDown, Phone,
  UserCheck, Building2, FileText, Eye, Timer,
  TrendingDown, TrendingUp, Clock, ShoppingBag,
  Heart, Wrench, Hash, Check,
} from "lucide-react";

/* ─── animation constants ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
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

/* ══════════════════════════════════
   DATA
══════════════════════════════════ */
const CHAT_STEPS = [
  { id: 1, sender: "Sarah (Manager)", initials: "SM", color: "#6366f1", msg: "Flash sale starts at 3pm! All hands needed today 🛍️", time: "9:02 AM", isManager: true },
  { id: 2, sender: "Alex R.", initials: "AR", color: "#8b5cf6", msg: "On it! I'll be there by 2:45 👍", time: "9:03 AM", isManager: false },
  { id: 3, sender: "Maria K.", initials: "MK", color: "#ec4899", msg: "Anyone able to cover my 4–6pm? Doctor appt 🙏", time: "9:04 AM", isManager: false },
  { id: 4, sender: "Jake T.", initials: "JT", color: "#10b981", msg: "I'll cover you Maria, no problem ✓", time: "9:04 AM", isManager: false },
  { id: 5, sender: "Sarah (Manager)", initials: "SM", color: "#6366f1", msg: "Schedule updated. Jake covers 4–6pm. Thanks team! 🎉", time: "9:05 AM", isManager: true },
];

const PAINS = [
  {
    icon: AlertCircle, grad: "from-red-500 to-rose-600", glow: "rgba(239,68,68,0.14)",
    pill: "bg-red-50 text-red-600", tag: "Problem",
    title: "Messages Buried in Group Texts",
    body: "Important shift updates get lost in WhatsApp threads. Employees claim they never saw it. Managers have no proof they ever sent it.",
    fix: "Dedicated channels, searchable history, and read receipts.",
  },
  {
    icon: Clock, grad: "from-orange-500 to-amber-600", glow: "rgba(245,158,11,0.14)",
    pill: "bg-orange-50 text-orange-600", tag: "Problem",
    title: "Shift Changes With No Warning",
    body: "Last-minute coverage requests sent to a personal group chat where half the team is muted. The shift goes unstaffed. Chaos follows.",
    fix: "Broadcast alerts, instant replies, shift swap done in seconds.",
  },
  {
    icon: Phone, grad: "from-yellow-500 to-orange-500", glow: "rgba(234,179,8,0.14)",
    pill: "bg-yellow-50 text-yellow-700", tag: "Problem",
    title: "Personal Numbers Shared at Work",
    body: "Managers and staff exchange private phone numbers because there is no professional alternative. Boundaries blur. Employees feel uncomfortable.",
    fix: "Private, in-app messaging only. Zero personal numbers shared.",
  },
  {
    icon: FileText, grad: "from-blue-500 to-indigo-600", glow: "rgba(59,130,246,0.14)",
    pill: "bg-blue-50 text-blue-600", tag: "Problem",
    title: "No Record of What Was Said",
    body: "When a dispute arises — 'I never got that message' — there is no audit trail. No proof of delivery. Just your word against theirs.",
    fix: "Full message history, delivery logs, and manager oversight.",
  },
];

const FEATURES = [
  { icon: MessageSquare, grad: "from-indigo-500 to-indigo-700", glow: "rgba(99,102,241,0.18)", title: "Group & Direct Messaging", desc: "Create channels for teams, departments, or locations. Every conversation stays organized — never buried in a personal group text again." },
  { icon: Users, grad: "from-purple-500 to-purple-700", glow: "rgba(139,92,246,0.18)", title: "Broadcast Announcements", desc: "Send one message that reaches your entire team, a specific location, or any custom group — instantly. See who has read it and who has not." },
  { icon: Lock, grad: "from-fuchsia-500 to-fuchsia-700", glow: "rgba(217,70,239,0.18)", title: "Privacy by Design", desc: "Employees never share personal phone numbers. Work conversations stay in the app, and personal life stays personal. Always." },
  { icon: Bell, grad: "from-sky-500 to-sky-700", glow: "rgba(14,165,233,0.18)", title: "Instant Push Notifications", desc: "Critical messages get through. Shift changes, coverage requests, and manager announcements arrive as push notifications on any device." },
  { icon: UserCheck, grad: "from-emerald-500 to-emerald-700", glow: "rgba(16,185,129,0.18)", title: "Manager Message Controls", desc: "Decide who can message whom, set read-only channels, and pin critical updates so nothing important ever gets buried again." },
  { icon: FileText, grad: "from-rose-500 to-rose-700", glow: "rgba(244,63,94,0.18)", title: "Files, Photos & Attachments", desc: "Share rotas, policy documents, or pre-shift briefing photos directly in chat. Everything stays findable in the right conversation." },
  { icon: Eye, grad: "from-amber-500 to-amber-700", glow: "rgba(245,158,11,0.18)", title: "Read Receipts & Delivery", desc: "Know exactly who has seen your message. No more 'I did not know' from staff who simply did not look. Full visibility, full accountability." },
  { icon: Globe, grad: "from-teal-500 to-teal-700", glow: "rgba(20,184,166,0.18)", title: "Cross-Location Messaging", desc: "Connect staff across multiple sites in one platform. A district manager can update all locations at once, or message any individual directly." },
];

const INDUSTRIES = [
  {
    icon: ShoppingBag, grad: "from-indigo-500 to-indigo-700", title: "Retail",
    headline: "Flash sale in 2 hours? Everyone knows in 10 seconds.",
    desc: "Send an instant broadcast before doors open. Staff confirm they received it. Manager sees all read receipts. No confusion, no excuses.",
    bullets: ["Instant flash sale and policy alerts", "Coverage requests filled in minutes", "Pre-shift briefings with photos attached"],
  },
  {
    icon: Clock, grad: "from-purple-500 to-purple-700", title: "Restaurants & Hospitality",
    headline: "Shift swap in 60 seconds. No phone tag required.",
    desc: "A server posts a swap request in the app, a colleague covers, the manager confirms — total time: under a minute. No calls, no texts.",
    bullets: ["Shift swaps handled entirely in-app", "Pre-service briefings sent to the whole team", "Inventory updates pushed to kitchen staff"],
  },
  {
    icon: Heart, grad: "from-rose-500 to-rose-700", title: "Healthcare & Clinics",
    headline: "Secure handover notes without personal devices.",
    desc: "Staff share patient updates, protocol changes, and shift reminders inside the app. No personal numbers. No compliance risk.",
    bullets: ["Zero personal numbers ever shared", "All messages encrypted and auditable", "Organized threads by department or unit"],
  },
  {
    icon: Wrench, grad: "from-emerald-500 to-emerald-700", title: "Construction & Field Teams",
    headline: "Every crew member arrives knowing the plan.",
    desc: "Foremen post site updates, attach photos, and confirm attendance before the crew shows up. No missed briefings, no wasted travel.",
    bullets: ["Site updates with photos shared instantly", "Multi-location crew coordination in one app", "Read receipts confirm every worker is informed"],
  },
];

const STATS = [
  { value: 20, suffix: "%", label: "Decrease in Labor Costs", desc: "Teams that communicate faster waste less time chasing coverage gaps.", icon: TrendingDown, grad: "from-indigo-500 to-purple-600", shadow: "shadow-indigo-100" },
  { value: 8, suffix: "×", label: "Faster Shift Coverage", desc: "Open shifts fill before they become a real problem.", icon: Zap, grad: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-100" },
  { value: 3, suffix: "×", label: "Fewer Employee No-Shows", desc: "Clear, confirmed communication means nobody is surprised by a shift.", icon: CheckCircle2, grad: "from-fuchsia-500 to-pink-600", shadow: "shadow-fuchsia-100" },
  { value: 200, suffix: "K+", label: "Workplaces Trust StaffSchedule", desc: "From single-site shops to multi-location enterprises.", icon: Users, grad: "from-rose-500 to-orange-500", shadow: "shadow-rose-100" },
];

const TESTIMONIALS = [
  {
    name: "Michael H.", role: "Restaurant Manager", since: "Customer since 2021",
    quote: "In my 34 years in the service industry, this is the most convenient way for a team to coordinate. No more chasing people on WhatsApp.",
    stars: 5, avatar: "MH", color: "#6366f1",
  },
  {
    name: "Rachel T.", role: "Retail Store Manager", since: "Customer since 2022",
    quote: "We cut no-shows by half in the first month just because messages actually reach people now. The read receipts alone changed everything.",
    stars: 5, avatar: "RT", color: "#8b5cf6",
  },
  {
    name: "Dana M.", role: "Clinic Practice Manager", since: "Customer since 2023",
    quote: "Staff now communicate entirely through the app. No personal numbers shared, no privacy issues, no messy group texts. It just works.",
    stars: 5, avatar: "DM", color: "#ec4899",
  },
];

const FAQS = [
  {
    q: "What is a team messaging app and how does it work?",
    a: "A team messaging app is a dedicated workplace communication platform where employees send direct messages, join group chats, and receive shift-related announcements — without using personal apps or phone numbers. Messages are organized by team, department, or location. Managers have full oversight and control. Everything is searchable, auditable, and accessible from any device.",
  },
  {
    q: "How does team messaging help reduce employee no-shows?",
    a: "Team messaging eliminates the 'I never saw it' excuse. Shift reminders, schedule updates, and coverage requests arrive as push notifications — and read receipts show exactly who confirmed. Teams using dedicated messaging see up to 3x fewer no-shows compared to those relying on personal group texts.",
  },
  {
    q: "How does workplace messaging protect employee privacy?",
    a: "All communication stays inside the StaffSchedule.io app. Employees never share personal phone numbers with managers or coworkers. Work messages don't arrive on personal accounts outside working hours unless they choose to. Personal and professional lives stay separated.",
  },
  {
    q: "Can managers control or monitor team messages?",
    a: "Yes. Managers configure who can message whom, create read-only announcement channels, pin critical updates, and review message history. Broadcast announcements reach the full team or a specific department with one tap, and read receipts confirm delivery in real time.",
  },
  {
    q: "Is the team messaging app mobile-friendly?",
    a: "Fully mobile-first. Employees get push notifications on iOS and Android, can send messages and share files, and access their schedule — all from the same app. No separate downloads, no context switching between apps.",
  },
  {
    q: "What is the difference between team messaging and a regular group text?",
    a: "Group texts have no structure, no oversight, and no privacy protection. Team messaging gives you organized channels, read receipts, message controls, audit trails, and file sharing — with zero personal numbers exposed. It is built specifically for work, not personal life.",
  },
  {
    q: "Can I try the team messaging app for free?",
    a: "Yes — 14-day free trial, no credit card required. Full access to team messaging, scheduling, time tracking, and every other feature. Set up your team and send your first group message in under 5 minutes.",
  },
];

/* ══════════════════════════════════
   SECTIONS
══════════════════════════════════ */

function HeroSection() {
  const [visibleCount, setVisibleCount] = useState(1);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionSpring(useTransform(mouseY, [-300, 300], [4, -4]), { stiffness: 120, damping: 30 });
  const rotateY = useMotionSpring(useTransform(mouseX, [-600, 600], [-4, 4]), { stiffness: 120, damping: 30 });

  useEffect(() => {
    if (visibleCount >= CHAT_STEPS.length) return;
    const id = setTimeout(() => setVisibleCount(v => v + 1), 1300);
    return () => clearTimeout(id);
  }, [visibleCount]);

  return (
    <section
      className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0c0a1a] via-[#110e2a] to-[#0c0a1a] overflow-hidden pt-24 pb-16"
      onMouseMove={e => { mouseX.set(e.clientX - window.innerWidth / 2); mouseY.set(e.clientY - window.innerHeight / 2); }}
    >
      {/* ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.45, 0.25] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1, 1.22, 1], opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.1, 0.25, 0.1] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-1/2 right-1/3 w-72 h-72 bg-fuchsia-600/15 rounded-full blur-3xl" />
      </div>

      {/* grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* ── Left: copy ── */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="text-center lg:text-left">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-6">
            <MessageSquare className="w-3.5 h-3.5" />
            Team Messaging App
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl xl:text-[3.6rem] font-black text-white leading-[1.07] tracking-tight mb-6">
            Keep Every Shift Connected.{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Without the Group Chat Chaos.
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            No more buried announcements, missed shift swaps, or personal phone numbers shared at work.
            StaffSchedule.io team messaging lives right next to your schedule — where work actually happens.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-900/50">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#features"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              See How It Works
            </Link>
          </motion.div>

          <motion.p variants={fadeUp} className="text-xs text-gray-500 mb-8">
            No credit card required &nbsp;&bull;&nbsp; 14-day free trial &nbsp;&bull;&nbsp; Cancel anytime
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-3 justify-center lg:justify-start">
            <div className="flex -space-x-2">
              {["#6366f1", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"].map((c, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-[#0c0a1a] flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ backgroundColor: c }}>
                  {["S", "A", "M", "J", "R"][i]}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400">
              <span className="text-white font-semibold">200,000+</span> workplaces use StaffSchedule
            </p>
          </motion.div>
        </motion.div>

        {/* ── Right: animated phone ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="flex justify-center lg:justify-end relative"
        >
          <motion.div style={{ rotateX, rotateY, transformPerspective: 1200 }} className="relative">

            {/* phone shell */}
            <div className="relative w-72 bg-[#1a1830] rounded-[3rem] border-[3px] border-[#2d2a4a] shadow-2xl shadow-indigo-900/50 overflow-hidden"
              style={{ height: 580 }}>

              {/* notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#1a1830] rounded-b-2xl z-20" />

              {/* status bar */}
              <div className="flex justify-between items-center px-7 pt-8 pb-1">
                <span className="text-white text-xs font-semibold">9:05</span>
                <div className="w-4 h-2.5 rounded-sm border border-gray-500 relative">
                  <div className="absolute inset-0.5 right-1 bg-gray-400 rounded-sm" />
                </div>
              </div>

              {/* chat header */}
              <div className="flex items-center gap-3 px-4 py-3 bg-[#13112a] border-b border-white/10">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Hash className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-bold">Morning Crew</p>
                  <p className="text-gray-400 text-[10px]">5 members · all active</p>
                </div>
                <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}>
                  <Bell className="w-4 h-4 text-indigo-400" />
                </motion.div>
              </div>

              {/* messages list */}
              <div className="px-3 py-3 space-y-3 overflow-hidden" style={{ height: 418 }}>
                <AnimatePresence initial={false}>
                  {CHAT_STEPS.slice(0, visibleCount).map((msg) => (
                    <motion.div key={msg.id}
                      initial={{ opacity: 0, y: 22, scale: 0.88 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 320, damping: 26 }}
                      className={`flex gap-2 ${msg.isManager ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold mt-1"
                        style={{ backgroundColor: msg.color }}>
                        {msg.initials}
                      </div>
                      <div className={`max-w-[72%] flex flex-col ${msg.isManager ? "items-end" : "items-start"}`}>
                        <p className="text-[9px] text-gray-500 mb-0.5 px-1">{msg.sender}</p>
                        <div className={`px-3 py-2 rounded-2xl text-[11px] text-white leading-relaxed ${msg.isManager
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 rounded-tr-sm"
                          : "bg-white/10 rounded-tl-sm"}`}>
                          {msg.msg}
                        </div>
                        <p className="text-[8px] text-gray-600 px-1 mt-0.5">{msg.time}{msg.isManager ? " · ✓✓" : ""}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* typing dots */}
                {visibleCount < CHAT_STEPS.length && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex gap-2 items-center px-1">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                      style={{ backgroundColor: CHAT_STEPS[visibleCount].color }}>
                      {CHAT_STEPS[visibleCount].initials}
                    </div>
                    <div className="bg-white/10 rounded-2xl rounded-tl-sm px-3 py-2.5 flex gap-1.5 items-center">
                      {[0, 1, 2].map(i => (
                        <motion.div key={i} animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.14 }}
                          className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* input bar */}
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-2 bg-[#1a1830] border-t border-white/10">
                <div className="flex gap-2 items-center bg-white/10 rounded-full px-4 py-2.5">
                  <p className="text-gray-500 text-xs flex-1">Message Morning Crew...</p>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Send className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* floating badge 1 — shift swap confirmed */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.6, type: "spring", stiffness: 280, damping: 22 }}
              className="hidden md:flex absolute -right-6 top-20 bg-white rounded-2xl shadow-2xl shadow-gray-200/60 border border-gray-100 px-3.5 py-2.5 items-center gap-2.5 min-w-max z-10"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Shift swap confirmed</p>
                <p className="text-[10px] text-gray-500">Jake covers 4–6pm · just now</p>
              </div>
            </motion.div>

            {/* floating badge 2 — broadcast sent */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 2.2, type: "spring", stiffness: 280, damping: 22 }}
              className="hidden md:flex absolute -right-8 bottom-32 bg-white rounded-2xl shadow-2xl shadow-gray-200/60 border border-gray-100 px-3.5 py-2.5 items-center gap-2.5 min-w-max z-10"
            >
              <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center">
                <Bell className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Broadcast delivered</p>
                <p className="text-[10px] text-gray-500">12 staff · 10 read · 2 pending</p>
              </div>
            </motion.div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Stats bar ── */
function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const items = [
    { value: 200, suffix: "K+", label: "Workplaces Trust StaffSchedule" },
    { value: 20, suffix: "%", label: "Decrease in Labor Costs" },
    { value: 8, suffix: "×", label: "Faster Shift Coverage" },
    { value: 3, suffix: "×", label: "Fewer Employee No-Shows" },
  ];
  return (
    <div ref={ref} className="border-y border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-0 divide-y-2 lg:divide-y-0 lg:divide-x divide-gray-100">
        {items.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="flex flex-col items-center gap-1 px-6 py-4">
            <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {inView ? <Counter to={s.value} suffix={s.suffix} /> : `0${s.suffix}`}
            </p>
            <p className="text-sm text-gray-500 text-center leading-tight">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Pain section ── */
function PainSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 w-[450px] h-[450px] bg-indigo-50 rounded-full blur-3xl opacity-70" />
        <motion.div animate={{ x: [0, -25, 0], y: [0, 22, 0] }} transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-24 -right-24 w-[400px] h-[400px] bg-purple-50 rounded-full blur-3xl opacity-70" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-14">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold tracking-widest uppercase mb-5">
            <AlertCircle className="w-3.5 h-3.5" />
            Why Most Teams Are Frustrated
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Group Texts Weren&apos;t Built for Work.
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Your Team Messaging Should Be.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-lg max-w-2xl mx-auto">
            For retail, hospitality, healthcare, and any shift-based team — these communication gaps cost real money every single week.
          </motion.p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PAINS.map((p) => (
            <SpotCard key={p.title} glow={p.glow} className="rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${p.grad} rounded-t-2xl`} />
              <motion.div variants={fadeUp} className="p-6 pt-7">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black tracking-widest uppercase mb-4 ${p.pill}`}>{p.tag}</span>
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${p.grad} flex items-center justify-center mb-4 shadow-sm`}>
                  <p.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{p.body}</p>
                <div className="flex items-start gap-2 bg-indigo-50 rounded-xl px-3 py-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs font-semibold text-indigo-700">{p.fix}</p>
                </div>
              </motion.div>
            </SpotCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Features section ── */
function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="features" className="py-24 bg-[#faf9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-14">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold tracking-widest uppercase mb-5">
            <Zap className="w-3.5 h-3.5" />
            Everything Your Team Needs
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Key Features That Simplify
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Workplace Communication</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-lg max-w-2xl mx-auto">
            Built specifically for shift-based teams — so every single feature solves a real problem you actually have.
          </motion.p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => (
            <SpotCard key={f.title} glow={f.glow} className="rounded-2xl border border-gray-100 bg-white shadow-sm">
              <motion.div variants={fadeUp} className="p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.grad} flex items-center justify-center mb-5 shadow-sm`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            </SpotCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Live chat showcase ── */
function LiveChatShowcase() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActive(a => (a + 1) % CHAT_STEPS.length), 2200);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left — explanation + step list */}
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold tracking-widest uppercase mb-5">
              <MessageSquare className="w-3.5 h-3.5" />
              Workplace Messaging in Action
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-5">
              Workplace Messaging That Fits
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">How Your Team Actually Works</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-lg leading-relaxed mb-8">
              This is a real morning for a retail team on StaffSchedule.io. One manager announcement. A shift swap handled. Everyone confirmed. Total time: three minutes. No phone calls, no group text chaos.
            </motion.p>
            <motion.div variants={stagger} className="space-y-2.5">
              {CHAT_STEPS.map((step, i) => (
                <motion.div key={step.id} variants={fadeUp}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-250 border-2 ${active === i
                    ? "bg-indigo-50 border-indigo-200 shadow-sm"
                    : "bg-gray-50 border-transparent hover:border-gray-200 hover:bg-white"}`}
                >
                  <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold shadow-sm"
                    style={{ backgroundColor: step.color }}>
                    {step.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-600 mb-0.5">{step.sender} &middot; {step.time}</p>
                    <p className="text-sm text-gray-700 truncate">{step.msg}</p>
                  </div>
                  {active === i && (
                    <motion.div layoutId="activeDot"
                      className="w-2.5 h-2.5 rounded-full bg-indigo-600 flex-shrink-0" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — phone with active message */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="flex justify-center"
          >
            <div className="relative w-64 bg-[#1a1830] rounded-[3rem] border-[3px] border-[#2d2a4a] shadow-2xl shadow-purple-900/30 overflow-hidden"
              style={{ height: 520 }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#1a1830] rounded-b-2xl z-10" />
              <div className="flex justify-between items-center px-6 pt-7 pb-1">
                <span className="text-white text-xs font-semibold">9:05</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2.5 bg-[#13112a] border-b border-white/10">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center">
                  <Hash className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="text-white text-xs font-bold">Morning Crew</p>
                  <p className="text-gray-400 text-[9px]">5 members</p>
                </div>
              </div>
              <div className="p-3 space-y-2.5 overflow-hidden" style={{ height: 360 }}>
                <AnimatePresence mode="popLayout">
                  {CHAT_STEPS.slice(0, active + 1).map((msg, mi) => (
                    <motion.div key={msg.id}
                      initial={{ opacity: 0, y: 18, scale: 0.9 }}
                      animate={{ opacity: mi === active ? 1 : 0.35, y: 0, scale: mi === active ? 1 : 0.97 }}
                      transition={spring}
                      className={`flex gap-2 ${msg.isManager ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[9px] font-bold"
                        style={{ backgroundColor: msg.color }}>
                        {msg.initials}
                      </div>
                      <div className={`max-w-[74%] flex flex-col ${msg.isManager ? "items-end" : "items-start"}`}>
                        <div className={`px-2.5 py-2 rounded-2xl text-[11px] text-white leading-relaxed ${msg.isManager
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 rounded-tr-sm"
                          : "bg-white/10 rounded-tl-sm"}`}>
                          {msg.msg}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              {/* progress dots */}
              <div className="absolute bottom-14 left-0 right-0 flex justify-center gap-1.5">
                {CHAT_STEPS.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    className={`rounded-full transition-all duration-300 ${i === active ? "w-5 h-1.5 bg-indigo-400" : "w-1.5 h-1.5 bg-white/20"}`} />
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-3 pb-4 pt-2 bg-[#1a1830] border-t border-white/10">
                <div className="flex gap-2 items-center bg-white/10 rounded-full px-3 py-2">
                  <p className="text-gray-500 text-[11px] flex-1">Reply to team...</p>
                  <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center">
                    <Send className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ── Industries section ── */
function IndustriesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section className="py-24 bg-[#faf9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-14">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold tracking-widest uppercase mb-5">
            <Building2 className="w-3.5 h-3.5" />
            Built for Every Industry
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Messaging for Any Industry,
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Built for People</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-lg max-w-2xl mx-auto">
            From retail floors to healthcare units — shift-based teams across every sector stay connected with StaffSchedule.io.
          </motion.p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="grid sm:grid-cols-2 gap-5">
          {INDUSTRIES.map((ind) => (
            <SpotCard key={ind.title} glow="rgba(16,185,129,0.12)" className="rounded-2xl border border-gray-100 bg-white shadow-sm">
              <motion.div variants={fadeUp} className="p-7">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ind.grad} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <ind.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900">{ind.title}</h3>
                </div>
                <p className="text-base font-bold text-gray-800 mb-2">{ind.headline}</p>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{ind.desc}</p>
                <div className="space-y-2">
                  {ind.bullets.map((b) => (
                    <div key={b} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                      <p className="text-sm text-gray-600">{b}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </SpotCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Privacy section ── */
function PrivacySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const PRIVACY = [
    { icon: Lock, title: "No Phone Numbers Required", desc: "All messaging stays inside the app. Employees never share personal contact info with managers or coworkers — ever." },
    { icon: Eye, title: "Manager Controls", desc: "Set who can message whom, create read-only channels, pin important updates, and monitor threads for compliance." },
    { icon: Shield, title: "Encrypted & Secure", desc: "All messages are encrypted in transit and at rest. Your team's conversations stay private and protected." },
    { icon: FileText, title: "Full Audit Trail", desc: "Every message is stored with a timestamp. When disputes arise, you have a complete record of who said what and when." },
  ];
  return (
    <section className="py-24 bg-[#0c0a1a] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.22, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.22, 0.1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left — text */}
          <div>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-purple-300 text-xs font-bold tracking-widest uppercase mb-6">
              <Shield className="w-3.5 h-3.5" />
              Private by Design
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-5">
              Protect Privacy Without
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Sacrificing Communication</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-lg leading-relaxed mb-10">
              When employees use personal apps for work, phone numbers get exposed, work invades private life, and accountability disappears.
              We built the professional alternative that your whole team will actually use.
            </motion.p>
            <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-4">
              {PRIVACY.map((pf) => (
                <motion.div key={pf.title} variants={fadeUp}
                  whileHover={{ scale: 1.02 }} transition={spring}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 hover:border-white/20 transition-colors duration-200">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3">
                    <pf.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">{pf.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{pf.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — visual */}
          <motion.div variants={fadeUp} className="flex justify-center">
            <div className="relative w-72 h-72">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-white/5" />
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-white/5" />

              {/* central lock icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-900/60"
                >
                  <Lock className="w-12 h-12 text-white" />
                </motion.div>
              </div>

              {/* orbiting feature pills */}
              {[
                { icon: Shield, label: "Encrypted", pos: "top-2 left-1/2 -translate-x-1/2" },
                { icon: Eye, label: "Auditable", pos: "top-1/2 -right-4 -translate-y-1/2" },
                { icon: FileText, label: "History kept", pos: "bottom-2 left-1/2 -translate-x-1/2" },
                { icon: MessageSquare, label: "In-app only", pos: "top-1/2 -left-4 -translate-y-1/2" },
              ].map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
                  transition={{ delay: 0.4 + i * 0.15, type: "spring", stiffness: 300, damping: 24 }}
                  className={`absolute ${item.pos} bg-white/10 border border-white/20 rounded-xl px-3 py-1.5 flex items-center gap-2`}
                >
                  <item.icon className="w-3.5 h-3.5 text-purple-300 flex-shrink-0" />
                  <span className="text-[10px] font-bold text-white whitespace-nowrap">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

/* ── Stats section ── */
function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-14">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold tracking-widest uppercase mb-5">
            <TrendingUp className="w-3.5 h-3.5" />
            Measurable Results
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Managers Who Use StaffSchedule.io
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Report Real, Measurable Results</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-lg max-w-xl mx-auto">
            When communication is clear and fast, your team performs better — and customers notice.
          </motion.p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((s) => (
            <SpotCard key={s.label} glow="rgba(99,102,241,0.12)" className={`rounded-2xl bg-white border border-gray-100 shadow-sm ${s.shadow}`}>
              <motion.div variants={fadeUp} className="p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.grad} flex items-center justify-center mb-5 shadow-sm`}>
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <p className={`text-4xl font-black bg-gradient-to-r ${s.grad} bg-clip-text text-transparent mb-1`}>
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="text-sm font-bold text-gray-800 mb-1.5">{s.label}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            </SpotCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Testimonials ── */
function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section className="py-24 bg-[#0c0a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-14">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-yellow-400 text-xs font-bold tracking-widest uppercase mb-5">
            <Star className="w-3.5 h-3.5 fill-current" />
            Trusted by 200,000+ Workplaces
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            When Communication Is Clear and Fast,
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent"> Your Team Performs Better</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-lg max-w-xl mx-auto">
            Higher accountability. Stronger morale. Fewer missed shifts. Real teams. Real results.
          </motion.p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <motion.div key={t.name} variants={fadeUp}
              whileHover={{ y: -6, scale: 1.02 }} transition={spring}
              className="relative bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-7 hover:bg-white/[0.07] hover:border-white/20 transition-colors duration-300">
              <div className="absolute top-5 right-6 flex gap-0.5">
                {[...Array(t.stars)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md"
                  style={{ backgroundColor: t.color }}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role} &bull; {t.since}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── CTA banner ── */
function CtaBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ x: [-120, 120, -120], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-black text-white mb-4">
          Clear Communication Shouldn&apos;t Slow You Down
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
          className="text-white/80 text-lg mb-8">
          Give your team a messaging app built for how they actually work. Start free — no credit card, no risk.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="https://app.staffschedule.io/register"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-xl">
            Start Free Trial <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="https://app.staffschedule.io/demo"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold rounded-xl transition-all duration-200">
            Schedule a Demo
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ── FAQ section ── */
function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-12">
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Frequently Asked Questions
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-lg">
            Everything you need to know about team messaging for shift-based workplaces.
          </motion.p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div key={i} variants={fadeUp} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-150">
                <span className="font-semibold text-gray-900 pr-4 text-sm sm:text-base">{faq.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0">
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  >
                    <div className="px-6 pb-5 pt-3 text-gray-500 leading-relaxed text-sm border-t border-gray-50">
                      {faq.a}
                    </div>
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

/* ── Final CTA ── */
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
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Get Started Today.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              No Credit Card Required.
            </span>
          </h2>
          <p className="text-gray-400 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Join 200,000+ workplaces who replaced group text chaos with professional team messaging.
            Your team&apos;s first message takes under 5 minutes to set up.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl shadow-indigo-900/50">
              Start Free — 14 Days <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="https://app.staffschedule.io/demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              Schedule a Demo
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {["No credit card", "14-day free trial", "Cancel anytime", "Full feature access"].map((t) => (
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
export default function TeamMessagingPage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <PainSection />
      <FeaturesSection />
      <LiveChatShowcase />
      <IndustriesSection />
      <PrivacySection />
      <StatsSection />
      <TestimonialsSection />
      <CtaBanner />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
