"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  Clock,
  MessageSquare,
  TrendingUp,
  ShieldAlert,
  MapPin,
  Filter,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Menu,
  X,
  Plus,
  Play,
  RotateCcw,
  Sparkles,
  ChevronDown,
  DollarSign,
  Smartphone,
  Check
} from "lucide-react";
import Image from "next/image";

// SEO Metadata Configuration (Represented in Client Components via standard head tags or metadata exports)
const SEO_TITLE = "Team Scheduling Software | StaffSchedule.io";
const SEO_DESC = "Replace spreadsheets and WhatsApp rosters with the best workforce scheduling tool. Create, share, and manage employee shifts, swaps, and availability in minutes.";

export default function TeamSchedulingSoftware() {
  // Navigation State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Industry Tab Selector State
  const [activeTab, setActiveTab] = useState(0);

  // Interactive Live Scheduler State
  const [schedulerHours, setSchedulerHours] = useState(24);
  const [conflictChecked, setConflictChecked] = useState(true);
  const [scheduleSuccess, setScheduleSuccess] = useState(false);
  const [shifts, setShifts] = useState([
    { id: 1, name: "Roxana M.", role: "Server", shift: "08:00 AM - 04:00 PM", hours: 8, day: "Mon", status: "assigned", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" },
    { id: 2, name: "Dr. Chen", role: "Clinician", shift: "09:00 AM - 05:00 PM", hours: 8, day: "Mon", status: "assigned", color: "bg-violet-500/20 text-violet-400 border-violet-500/30" },
    { id: 3, name: "Sarah Kim", role: "Supervisor", shift: "12:00 PM - 08:00 PM", hours: 8, day: "Mon", status: "assigned", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    { id: 4, name: "Carlos M.", role: "Foreman", shift: "Time-Off (Blocked)", hours: 0, day: "Mon", status: "unavailable", color: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
  ]);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const hourlyRate = 22; // USD/hour
  const totalCost = schedulerHours * hourlyRate;

  // Add shift in demo
  const handleAssignShift = (id: number) => {
    setShifts(prevShifts => 
      prevShifts.map(s => {
        if (s.id === id) {
          if (s.status === "unavailable" && conflictChecked) {
            // Alert user of conflict simulation
            alert("⚠️ Conflict Flagged! Staff member Carlos M. requested Time-Off. Double-booking prevented.");
            return s;
          }
          if (s.status === "open") {
            setSchedulerHours(prev => prev + 8);
            return { ...s, status: "assigned", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" };
          }
          if (s.status === "assigned") {
            setSchedulerHours(prev => Math.max(0, prev - s.hours));
            return { ...s, status: "open", shift: "Shift Unassigned", hours: 0, color: "bg-dashed border-2 border-slate-700/50 text-slate-500" };
          }
        }
        return s;
      })
    );
  };

  // Auto-schedule simulator
  const handleAutoSchedule = () => {
    setScheduleSuccess(true);
    setSchedulerHours(32);
    setShifts([
      { id: 1, name: "Roxana M.", role: "Server", shift: "08:00 AM - 04:00 PM", hours: 8, day: "Mon", status: "assigned", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" },
      { id: 2, name: "Dr. Chen", role: "Clinician", shift: "09:00 AM - 05:00 PM", hours: 8, day: "Mon", status: "assigned", color: "bg-violet-500/20 text-violet-400 border-violet-500/30" },
      { id: 3, name: "Sarah Kim", role: "Supervisor", shift: "12:00 PM - 08:00 PM", hours: 8, day: "Mon", status: "assigned", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
      { id: 4, name: "Carlos M.", role: "Foreman", shift: "08:00 AM - 04:00 PM", hours: 8, day: "Tue", status: "assigned", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    ]);
    setTimeout(() => setScheduleSuccess(false), 4000);
  };

  const handleResetDemo = () => {
    setSchedulerHours(24);
    setShifts([
      { id: 1, name: "Roxana M.", role: "Server", shift: "08:00 AM - 04:00 PM", hours: 8, day: "Mon", status: "assigned", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" },
      { id: 2, name: "Dr. Chen", role: "Clinician", shift: "09:00 AM - 05:00 PM", hours: 8, day: "Mon", status: "assigned", color: "bg-violet-500/20 text-violet-400 border-violet-500/30" },
      { id: 3, name: "Sarah Kim", role: "Supervisor", shift: "12:00 PM - 08:00 PM", hours: 8, day: "Mon", status: "assigned", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
      { id: 4, name: "Carlos M.", role: "Foreman", shift: "Time-Off (Blocked)", hours: 0, day: "Mon", status: "unavailable", color: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
    ]);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-brand-primary selection:text-white overflow-hidden relative">
      
      {/* ── Global Animated Mesh Background ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[30rem] -left-[10rem] w-[70rem] h-[70rem] rounded-full bg-gradient-to-br from-indigo-600/10 to-violet-600/5 blur-[120px] opacity-70 animate-pulse duration-10000" />
        <div className="absolute top-[40rem] -right-[20rem] w-[80rem] h-[80rem] rounded-full bg-gradient-to-bl from-purple-600/5 to-pink-600/5 blur-[150px] opacity-50" />
        <div className="absolute bottom-[-20rem] left-[10rem] w-[60rem] h-[60rem] rounded-full bg-gradient-to-tr from-brand-primary/10 to-emerald-500/5 blur-[120px] opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.12),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* ── Sticky Top Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/70 backdrop-blur-xl border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                StaffSchedule<span className="text-indigo-500">.io</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#whats-is" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">What It Is</a>
              <a href="#features" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Features</a>
              <a href="#interactive-demo" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Live Rota Demo</a>
              <a href="#industries" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Industries</a>
              <a href="#faq" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">FAQ</a>
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden md:block">
              <Link 
                href="https://app.staffschedule.io/onboarding.php"
                className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-950 rounded-xl text-sm font-black transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-white/5 flex items-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 border border-white/10 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden border-b border-white/5 bg-slate-950 px-4 pt-4 pb-6 space-y-4 shadow-2xl"
            >
              <a 
                href="#whats-is" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-bold text-slate-400 hover:text-white px-3 py-2 rounded-xl hover:bg-white/5"
              >
                What It Is
              </a>
              <a 
                href="#features" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-bold text-slate-400 hover:text-white px-3 py-2 rounded-xl hover:bg-white/5"
              >
                Features
              </a>
              <a 
                href="#interactive-demo" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-bold text-slate-400 hover:text-white px-3 py-2 rounded-xl hover:bg-white/5"
              >
                Live Rota Demo
              </a>
              <a 
                href="#industries" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-bold text-slate-400 hover:text-white px-3 py-2 rounded-xl hover:bg-white/5"
              >
                Industries
              </a>
              <a 
                href="#faq" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-bold text-slate-400 hover:text-white px-3 py-2 rounded-xl hover:bg-white/5"
              >
                FAQ
              </a>
              <Link 
                href="https://app.staffschedule.io/onboarding.php"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 bg-white text-slate-950 rounded-xl text-center font-black block shadow-lg shadow-white/5"
              >
                Start Free Trial
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Section 1: Hero Section ── */}
      <header className="relative pt-40 pb-24 lg:pt-52 lg:pb-36 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          
          {/* Tagline Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8 shadow-inner shadow-indigo-500/5"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-black uppercase tracking-widest text-indigo-300">
              Transforming Shift Scheduling Forever
            </span>
          </motion.div>

          {/* Large H1 Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.95] mb-8"
          >
            Team Scheduling Software <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-500">
              That Actually Works
            </span>
          </motion.h1>

          {/* H2 Subheading */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl font-bold text-indigo-300/80 mb-6 max-w-4xl mx-auto"
          >
            Still Managing Shifts on WhatsApp and Spreadsheets?
          </motion.h2>

          {/* Subtitle / Intro Paragraph */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto mb-12"
          >
            There's a better way to run your team schedule — without the Sunday night chaos.
            You post the schedule. Someone misses it. Another person can't do Tuesday.
            By Monday morning, you're already fixing what should have been sorted days ago.
            WhatsApp and spreadsheets weren't built for shift management. A proper team scheduling software keeps your whole team on the same page — shifts, swaps, and changes — all in one place, instantly.
          </motion.p>

          {/* Call To Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
          >
            <a 
              href="#interactive-demo"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-lg font-black transition-all hover:scale-[1.03] active:scale-[0.98] shadow-2xl shadow-indigo-600/30 flex items-center gap-2 group w-full sm:w-auto justify-center"
            >
              See How It Works
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link 
              href="https://app.staffschedule.io/onboarding.php"
              className="px-8 py-4 bg-slate-900 border border-white/10 hover:bg-slate-800 text-white rounded-2xl text-lg font-black transition-all hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto justify-center"
            >
              Start Free Trial
            </Link>
          </motion.div>

          {/* Supporting Trust copy */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xs font-bold text-slate-500 uppercase tracking-widest"
          >
            No credit card needed · Setup in under 10 minutes
          </motion.p>

          {/* Floating Dashboard Rota Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="mt-20 max-w-5xl mx-auto p-4 rounded-[2.5rem] bg-white/5 border border-white/10 shadow-[0_32px_128px_-16px_rgba(99,102,241,0.15)] relative overflow-hidden group backdrop-blur"
          >
            <div className="absolute top-0 left-0 right-0 h-10 bg-slate-900/80 border-b border-white/5 z-20 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></div>
              </div>
              <div className="flex-1 max-w-[240px] mx-auto h-6 bg-slate-950 rounded-md border border-white/5 flex items-center px-3 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                app.staffschedule.io / schedule
              </div>
            </div>

            <div className="relative aspect-[16/10] pt-10 rounded-[2rem] overflow-hidden bg-slate-950">
              <Image 
                src="/dashboard.png" 
                alt="StaffSchedule.io Team Scheduling Software Dashboard Mockup" 
                fill 
                className="object-cover object-top hover:scale-[1.02] transition-transform duration-1000"
                sizes="(max-width: 1200px) 100vw, 1024px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </header>

      {/* ── Section 2: What Is Section ── */}
      <section id="whats-is" className="py-24 border-t border-white/5 relative z-10 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                <HelpCircle className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-xs font-black uppercase tracking-widest text-violet-300">Definition Engine</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
                What Is <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500">
                  Team Scheduling Software?
                </span>
              </h2>

              <h3 className="text-lg font-black text-slate-300 leading-relaxed italic">
                "Short answer — it's the tool that replaces your group chat and spreadsheet, for good."
              </h3>

              <p className="text-slate-400 leading-relaxed font-medium">
                Team scheduling software is a digital tool that helps managers build work schedules, assign shifts, track staff availability, and share updates in real time. Instead of chasing people on WhatsApp, your entire workforce scheduling happens in one place — and your team always knows when and where they're working.
              </p>

              <p className="text-slate-400 leading-relaxed font-medium">
                Think of it like a team schedule app that works for everyone — the manager who builds the rota, the employee who needs to swap a shift, and the business owner who wants to see who's working without making a single phone call.
              </p>

              <p className="text-slate-400 leading-relaxed font-medium">
                Whether you manage a restaurant, a construction crew, a retail store, or a security team — a good team scheduling tool solves the same core problem: getting the right people in the right place at the right time, without the back-and-forth.
              </p>

              <div className="pt-6 flex items-center gap-4">
                <Link 
                  href="https://app.staffschedule.io/onboarding.php"
                  className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-black text-sm transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-violet-600/20"
                >
                  Try It Free
                </Link>
                <span className="text-xs font-bold text-slate-500 leading-tight max-w-[240px]">
                  Used by teams across hospitality, retail, healthcare, and field services.
                </span>
              </div>
            </motion.div>

            {/* Right: Rich Featured Callout Mockup */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden backdrop-blur"
            >
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-violet-500/10 blur-[80px] -mr-10 -mt-10" />
              
              <div className="space-y-8 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-black text-white">Spreadsheets vs StaffSchedule.io</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                    <X className="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-rose-200">The Spreadsheet Method</p>
                      <p className="text-xs text-rose-300/70 mt-1">Formula errors, lost cells, printed rotas that get ignored, endless WhatsApp swap negotiations, and labor budget surprises on payroll day.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                    <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-emerald-200">The StaffSchedule.io Method</p>
                      <p className="text-xs text-emerald-300/70 mt-1">100% cloud-synced rosters, automatic double-booking blockages, self-managed shift swaps, automated SMS reminders, and built-in budget cost controls.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Section 3: Interactive Shift Scheduling Demo (High Conversions!) ── */}
      <section id="interactive-demo" className="py-24 border-t border-white/5 relative z-10 bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-black uppercase tracking-widest text-emerald-300">Interactive Sandbox</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none mb-4">
              Try Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">Scheduling Demo</span>
            </h2>
            <p className="text-slate-400 font-medium">
              Interact with our live Next.js sandbox below! Add/remove shifts, watch conflicts flag in real-time, and see how labor costs calculate instantly before publishing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Controller Panel (4 Cols) */}
            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between backdrop-blur">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="text-sm font-black text-white uppercase tracking-wider">Demo Controls</span>
                  <button 
                    onClick={handleResetDemo}
                    className="p-2 rounded-lg bg-slate-900 border border-white/10 hover:bg-slate-800 text-slate-400 hover:text-white transition-all flex items-center gap-2 text-xs font-bold"
                  >
                    <RotateCcw size={12} /> Reset
                  </button>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Safety Features</label>
                  <div className="flex items-center justify-between p-4 bg-slate-950 rounded-2xl border border-white/5">
                    <div>
                      <p className="text-sm font-bold text-white">Conflict Checker</p>
                      <p className="text-[10px] text-slate-500">Block double-bookings & time-off</p>
                    </div>
                    <button 
                      onClick={() => setConflictChecked(!conflictChecked)}
                      className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${conflictChecked ? "bg-indigo-600" : "bg-slate-700"}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${conflictChecked ? "translate-x-6" : "translate-x-0"}`} />
                    </button>
                  </div>
                </div>

                {/* Real-time Budget Metrics */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Live Labor Math</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-white/5 text-center">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">Scheduled Hours</span>
                      <span className="text-2xl font-black text-white">{schedulerHours} Hrs</span>
                    </div>
                    <div className="p-4 bg-slate-950 rounded-2xl border border-white/5 text-center">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">Estimated Cost</span>
                      <span className="text-2xl font-black text-emerald-400">${totalCost}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 space-y-3">
                <button 
                  onClick={handleAutoSchedule}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-sm transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25"
                >
                  <Sparkles size={16} /> Auto-Schedule Shifts
                </button>
                <p className="text-[10px] text-center font-bold text-slate-500 uppercase tracking-wider">
                  Tapping assigns safe pattern automatically
                </p>
              </div>
            </div>

            {/* Right Rota Sandbox (8 Cols) */}
            <div className="lg:col-span-8 bg-slate-950 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
              
              {/* Notification Overlay simulation */}
              <AnimatePresence>
                {scheduleSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="absolute inset-x-6 top-6 z-30 p-4 bg-emerald-500/20 backdrop-blur border border-emerald-500/30 rounded-2xl flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                      <Check size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Push Alert Broadcasted!</p>
                      <p className="text-[11px] text-emerald-300">"Shift roster generated & pushed to employee mobile devices."</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-white">Active Shift Rota</h3>
                    <p className="text-xs text-slate-500">Interactive live scheduling grid. Click shifts to toggle assignment state.</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400">
                    Day View: Monday
                  </span>
                </div>

                <div className="space-y-3">
                  {shifts.map(staff => (
                    <div 
                      key={staff.id}
                      className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-xs font-black text-indigo-400 border border-white/5">
                          {staff.name.substring(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-white">{staff.name}</p>
                          <p className="text-xs text-slate-500">{staff.role}</p>
                        </div>
                      </div>

                      {/* Rota Block button */}
                      <button 
                        onClick={() => handleAssignShift(staff.id)}
                        className={`px-4 py-3 rounded-xl border text-xs font-black text-left flex items-center justify-between sm:w-64 transition-all hover:scale-[1.01] ${staff.color}`}
                      >
                        <span className="tracking-wide">{staff.shift}</span>
                        {staff.status === "assigned" && <Check className="w-4 h-4 text-indigo-400" />}
                        {staff.status === "open" && <Plus className="w-4 h-4 text-slate-500" />}
                        {staff.status === "unavailable" && <ShieldAlert className="w-4 h-4 text-rose-400" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Sandbox State Online
                </p>
                <a 
                  href="https://app.staffschedule.io/onboarding.php"
                  className="text-xs font-black text-indigo-400 hover:text-white uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  Create Custom Schedule <ArrowRight size={12} />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── Section 4: Features Showcase Grid (6 Core Features) ── */}
      <section id="features" className="py-24 border-t border-white/5 relative z-10 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-black uppercase tracking-widest text-indigo-300">Feature Architect</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none mb-4">
              Build Your Team Schedule <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                In Minutes, Not Hours
              </span>
            </h2>
            <p className="text-slate-400 font-medium">
              No training needed. If you can drag a box, you can build a schedule. Discover features engineered to remove complexity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1: Drag-and-Drop Schedule Builder */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:border-indigo-500/50 hover:shadow-[0_20px_50px_-20px_rgba(99,102,241,0.15)] transition-all duration-500 relative group backdrop-blur"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white mb-4 group-hover:text-indigo-400 transition-colors">Drag-and-Drop Schedule Builder</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                Open the calendar, drag a shift, drop it on the right person. Done. No formulas, no color-coding, no accidentally deleting someone's row. Your team scheduling software shows you who's available in real time — so you're never guessing who can work Friday evening.
              </p>
            </motion.div>

            {/* Feature 2: Reusable Shift Templates */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:border-violet-500/50 hover:shadow-[0_20px_50px_-20px_rgba(139,92,246,0.15)] transition-all duration-500 relative group backdrop-blur"
            >
              <div className="w-12 h-12 rounded-2xl bg-violet-500/20 flex items-center justify-center text-violet-400 mb-6 group-hover:scale-110 transition-transform">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white mb-4 group-hover:text-violet-400 transition-colors">Reusable Shift Templates</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                If your schedule looks similar every week, stop rebuilding it from scratch. Save it as a template, load it next week, make small tweaks and publish. Most managers using a team scheduling tool cut their scheduling time by half — just from this one feature alone.
              </p>
            </motion.div>

            {/* Feature 3: Auto-Scheduling for Recurring Shifts */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:border-purple-500/50 hover:shadow-[0_20px_50px_-20px_rgba(168,85,247,0.15)] transition-all duration-500 relative group backdrop-blur"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white mb-4 group-hover:text-purple-400 transition-colors">Auto-Scheduling for Recurring Shifts</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                Got employees with fixed hours every week? Set it once. The crew scheduling app handles the rest automatically — same shifts, same people, same times — without you touching anything. Perfect for businesses with stable rotas and field-based teams who follow the same pattern week after week.
              </p>
            </motion.div>

            {/* Feature 4: Real-Time Notifications for Every Shift Change */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:border-emerald-500/50 hover:shadow-[0_20px_50px_-20px_rgba(16,185,129,0.15)] transition-all duration-500 relative group backdrop-blur"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white mb-4 group-hover:text-emerald-400 transition-colors">Real-Time Notifications</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                Changed a shift at 9pm? Your employee knows by 9:01pm. StaffSchedule.io sends instant notifications the moment you update anything — no printing, no forwarding, no "did you check the schedule?" texts. Every change hits their phone automatically. Your team scheduling app does the follow-up for you.
              </p>
            </motion.div>

            {/* Feature 5: Mobile App for Managers and Employees Both */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:border-indigo-500/50 hover:shadow-[0_20px_50px_-20px_rgba(99,102,241,0.15)] transition-all duration-500 relative group backdrop-blur"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white mb-4 group-hover:text-indigo-400 transition-colors">Mobile App for All</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                Your office manager is on a laptop. Your field crew is on their phones. Doesn't matter — it works the same on both. Managers build and edit schedules on the go. Employees check shifts, request time off, and swap with teammates — all from their phone. One team schedule app. Zero confusion.
              </p>
            </motion.div>

            {/* Feature 6: Employee-Initiated Shift Swapping */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:border-violet-500/50 hover:shadow-[0_20px_50px_-20px_rgba(139,92,246,0.15)] transition-all duration-500 relative group backdrop-blur"
            >
              <div className="w-12 h-12 rounded-2xl bg-violet-500/20 flex items-center justify-center text-violet-400 mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white mb-4 group-hover:text-violet-400 transition-colors">Collaborative Swapping</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                Someone can't make their shift? They open the app, offer it to a qualified teammate, and wait for approval. You're not in the middle of 6 different conversations. You just tap approve — or deny. Done. That's collaborative scheduling done right.
              </p>
            </motion.div>

          </div>

          <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="https://app.staffschedule.io/onboarding.php"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-base font-black transition-all hover:scale-[1.03]"
            >
              Start Building Free
            </Link>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              No setup fees · Works on mobile and desktop
            </span>
          </div>

        </div>
      </section>

      {/* ── Section 5: Share Schedules & Collaborative Swapping Split ── */}
      <section className="py-24 border-t border-white/5 relative z-10 bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Alternating Part 1: Text Left, Mockup Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                <Users className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-xs font-black uppercase tracking-widest text-violet-300">Empower Teams</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
                Let Your Team Handle <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                  Shift Swaps Themselves
                </span>
              </h2>
              <h3 className="text-lg font-bold text-slate-300">
                You approve. They sort it out. That's collaborative scheduling done right.
              </h3>
              
              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center flex-shrink-0 font-black text-xs mt-1">1</div>
                  <div>
                    <p className="text-base font-bold text-white">Time-Off Requests Without the Back-and-Forth</p>
                    <p className="text-sm text-slate-400 mt-1">No more "I texted you about Friday" moments. Employees submit time-off requests directly in the app. You see it, action it, and the schedule updates automatically. Every request is logged. Nothing gets lost in a chat.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center flex-shrink-0 font-black text-xs mt-1">2</div>
                  <div>
                    <p className="text-base font-bold text-white">Open Shifts Your Team Can Pick Up</p>
                    <p className="text-sm text-slate-400 mt-1">Need extra coverage? Post an open shift. Whoever wants the hours picks it up themselves. No calls down a list. No begging. Your workforce scheduling tool handles it — and notifies the right people instantly.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link 
                  href="https://app.staffschedule.io/onboarding.php"
                  className="px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl text-base font-black transition-all hover:scale-[1.03] inline-block shadow-lg shadow-violet-600/25"
                >
                  Try Collaborative Scheduling Free
                </Link>
                <p className="text-xs text-slate-500 mt-3 font-bold uppercase tracking-widest">
                  Your team sorts the swaps. You just approve.
                </p>
              </div>
            </motion.div>

            {/* Right: Mockup of Collaborative Swap on Phone */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden backdrop-blur flex justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-transparent pointer-events-none" />
              
              {/* Phone Layout Mockup */}
              <div className="w-full max-w-[280px] bg-slate-950 rounded-[3rem] border-8 border-slate-900 shadow-2xl p-4 space-y-6 relative">
                {/* Speaker */}
                <div className="w-16 h-4 bg-slate-900 rounded-full mx-auto mb-4" />
                
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block">Notification Hub</span>
                
                <div className="p-3 bg-white/5 rounded-2xl border border-white/5 text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-slate-500">SHIFT SWAP REQUEST</span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold">Pending Approval</span>
                  </div>
                  <p className="text-xs font-black text-white">Roxana M. → Sarah Kim</p>
                  <p className="text-[10px] text-slate-400 leading-tight">Server Rota Shift swap for Monday evening. Qualified match confirmed.</p>
                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 py-1.5 bg-indigo-600 rounded-lg text-[10px] font-black text-white">Approve</button>
                    <button className="px-3 py-1.5 bg-slate-900 rounded-lg text-[10px] font-black text-slate-400 border border-white/5">Decline</button>
                  </div>
                </div>

                <div className="p-3 bg-white/5 rounded-2xl border border-white/5 text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-slate-500">OPEN SHIFT OFFER</span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold">4 Spots Open</span>
                  </div>
                  <p className="text-xs font-black text-white">Chef Cover: Friday Evening</p>
                  <p className="text-[10px] text-slate-400 leading-tight">Broadcasted to all back-of-house qualified employees.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Alternating Part 2: Mockup Left, Text Right (Conflict Check) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Conflict warning panel */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden backdrop-blur"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-[80px]" />
              
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400 shadow-lg">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                
                <h3 className="text-2xl font-black text-white">StaffSchedule.io Guard Mode</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-white/5 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest">Overlap Detected</span>
                      <span className="text-[8px] text-slate-500">ROTA COMPLIANCE</span>
                    </div>
                    <p className="text-sm font-black text-white">Double Booking Blocked</p>
                    <p className="text-xs text-slate-400">Dr. Chen already assigned to Clinic Site A shift at this hour slot.</p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-white/5 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest">Unavailability block</span>
                      <span className="text-[8px] text-slate-500">LEAVE POLICY</span>
                    </div>
                    <p className="text-sm font-black text-white">Requested Time-Off Guarded</p>
                    <p className="text-xs text-slate-400">Sarah Kim requested leave on Monday 12pm. Calendar cell locked.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Text */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-xs font-black uppercase tracking-widest text-rose-300">Conflict Mitigation</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
                No More Scheduling Conflicts <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-400">
                  or Double Bookings
                </span>
              </h2>
              <h3 className="text-lg font-bold text-slate-300">
                The system checks availability before you publish — so you never get surprised.
              </h3>

              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0 font-black text-xs mt-1">✓</div>
                  <div>
                    <p className="text-base font-bold text-white">Automatic Availability Checking</p>
                    <p className="text-sm text-slate-400 mt-1 font-medium">Before you assign anyone a shift, StaffSchedule.io already knows their availability. Days off, blocked hours, existing shifts — all checked automatically. No more scheduling someone who already told you they're unavailable.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0 font-black text-xs mt-1">✓</div>
                  <div>
                    <p className="text-base font-bold text-white">Conflict Detection Before You Publish</p>
                    <p className="text-sm text-slate-400 mt-1 font-medium">About to double-book someone? The system flags it instantly. Overlap, overtime, or unavailability — it catches it before it becomes your Monday morning problem. Publish your schedule knowing it's clean. No guesswork. No last-minute fixes.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link 
                  href="https://app.staffschedule.io/onboarding.php"
                  className="px-8 py-4 bg-slate-900 border border-white/10 hover:bg-slate-800 text-white rounded-2xl text-base font-black transition-all hover:scale-[1.03] inline-block shadow-lg"
                >
                  Build Conflict-Free Schedules
                </Link>
                <p className="text-xs text-slate-500 mt-3 font-bold uppercase tracking-widest">
                  Availability tracking built in — no manual checking needed.
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ── Section 6: Manage Entire Workforce / Dashboard Features ── */}
      <section className="py-24 border-t border-white/5 relative z-10 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-black uppercase tracking-widest text-indigo-300">Centralized Command</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none mb-4">
              Manage Your Entire Workforce <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                from One Dashboard
              </span>
            </h2>
            <p className="text-slate-400 font-medium">
              One screen. Every team. Every location. Always up to date. Control complexity and view operational layers globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Dash feature 1: Multi-Location */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:border-indigo-500/30 transition-all backdrop-blur"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                <MapPin size={20} />
              </div>
              <h3 className="text-lg font-black text-white mb-3">Multi-Location & Multi-Team</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                Running teams across different sites or locations? You don't need a separate schedule for each one. StaffSchedule.io shows every location in one view. This is where most workforce scheduling tools fall short — we built multi-location in from day one. Perfect for construction teams, HVAC technicians, or retail brands with more than one store.
              </p>
            </motion.div>

            {/* Dash feature 2: Filter by Role */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:border-indigo-500/30 transition-all backdrop-blur"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                <Filter size={20} />
              </div>
              <h3 className="text-lg font-black text-white mb-3">Filter by Role or Location</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                Don't want to see everyone at once? Filter it down. View only your kitchen staff, only your security team, or only your crew at Site B. Your crew scheduling app gives you the view you need — without scrolling through people who aren't relevant. Filter and segment instantly in one click.
              </p>
            </motion.div>

            {/* Dash feature 3: Real-Time Visibility */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:border-indigo-500/30 transition-all backdrop-blur"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                <Clock size={20} />
              </div>
              <h3 className="text-lg font-black text-white mb-3">Real-Time Visibility</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                At any point in the day, you can see exactly who's on shift, who's coming in next, and who's already clocked out. No calls to supervisors. No checking spreadsheets. Just open the dashboard and you know. Real-time updates across every single team member.
              </p>
            </motion.div>

          </div>

          <div className="mt-12 text-center">
            <Link 
              href="https://app.staffschedule.io/onboarding.php"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-base font-black transition-all hover:scale-[1.03] inline-block shadow-lg shadow-indigo-600/25"
            >
              See the Dashboard Live
            </Link>
            <p className="text-xs text-slate-500 mt-3 font-bold uppercase tracking-widest">
              Real-time updates across every team and location.
            </p>
          </div>

        </div>
      </section>

      {/* ── Section 7: Built-In Team Communication ── */}
      <section className="py-24 border-t border-white/5 relative z-10 bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column Text */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                <MessageSquare className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-xs font-black uppercase tracking-widest text-violet-300">Unified Comms</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
                Built-In Team Communication <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500">
                  — No Extra App Needed
                </span>
              </h2>
              <h3 className="text-lg font-bold text-slate-300">
                Message your whole team without sharing personal numbers or switching apps.
              </h3>

              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center flex-shrink-0 font-black text-xs mt-1">✓</div>
                  <div>
                    <p className="text-base font-bold text-white">Direct Messages & Group Announcements</p>
                    <p className="text-sm text-slate-400 mt-1 font-medium">Need to tell everyone about a policy change? Send a group announcement — everyone on the team sees it. Need to talk to one person about their shift? Send a direct message, right inside the team scheduling app. No WhatsApp. No personal numbers. No "wrong group" moments.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center flex-shrink-0 font-black text-xs mt-1">✓</div>
                  <div>
                    <p className="text-base font-bold text-white">Shift Reminders Sent Automatically</p>
                    <p className="text-sm text-slate-400 mt-1 font-medium">StaffSchedule.io reminds your employees about upcoming shifts automatically — so you're not the one doing it manually. Fewer no-shows. Less chasing. That's what good collaborative scheduling looks like when communication is built into the tool.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link 
                  href="https://app.staffschedule.io/onboarding.php"
                  className="px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl text-base font-black transition-all hover:scale-[1.03] inline-block shadow-lg shadow-violet-600/25"
                >
                  Stop Chasing Your Team
                </Link>
                <p className="text-xs text-slate-500 mt-3 font-bold uppercase tracking-widest">
                  Reminders go out automatically — you don't lift a finger.
                </p>
              </div>
            </motion.div>

            {/* Right Column: Chat Hub Interface Mockup */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden backdrop-blur"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/10 rounded-full blur-[90px]" />
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-sm font-black text-white">Staff Messenger</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SECURE CHANNEL</span>
                </div>

                {/* Simulated messages */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-left">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-black">OP</div>
                    <div className="bg-slate-900 p-4 rounded-2xl border border-white/5 max-w-[80%]">
                      <p className="text-[10px] font-bold text-slate-400 mb-1">OFFICE BROADCAST</p>
                      <p className="text-xs text-white font-medium">Hello team, Monday's rota schedule has been finalized and published. Please verify your slots inside the portal!</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 justify-end text-right">
                    <div className="bg-indigo-600 p-4 rounded-2xl max-w-[80%] text-left">
                      <p className="text-[10px] font-bold text-indigo-200 mb-1">ROXANA MARTINEZ (YOU)</p>
                      <p className="text-xs text-white font-medium">Thanks! I got the automated shift reminder text on my phone. The schedule looks great!</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center text-xs font-black">RM</div>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-white/5 flex items-center justify-between text-xs text-slate-500">
                  <span>Type message to broadcast to team...</span>
                  <ArrowRight size={14} className="text-slate-400" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Section 8: Labor Costs & Hourly Cost Tracking ── */}
      <section className="py-24 border-t border-white/5 relative z-10 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left visual cost widgets */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden backdrop-blur"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[80px]" />
              
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white">Live Labor Budget Matrix</h3>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Normal Regular Hours</p>
                      <p className="text-lg font-black text-white">160 Hrs Scheduled</p>
                    </div>
                    <span className="text-sm font-black text-indigo-400">$3,520 Regular</span>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black text-rose-400 uppercase tracking-widest mb-1">Overtime Limit Flagged</p>
                      <p className="text-lg font-black text-white">12 Hrs Overtime</p>
                    </div>
                    <span className="text-sm font-black text-rose-400">$396 Overtime</span>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Direct Payroll Export</p>
                      <p className="text-sm font-black text-emerald-400">CSV/XLSX Organized</p>
                    </div>
                    <span className="text-xs font-bold text-slate-400">Ready to Send</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right text details */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-black uppercase tracking-widest text-emerald-300">Financial Control</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
                See Your Labor Costs <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">
                  as You Schedule
                </span>
              </h2>
              <h3 className="text-lg font-bold text-slate-300">
                Know what the schedule costs before you publish it — not after payday.
              </h3>

              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 font-black text-xs mt-1">✓</div>
                  <div>
                    <p className="text-base font-bold text-white">Track Hours and Overtime in Real Time</p>
                    <p className="text-sm text-slate-400 mt-1 font-medium">As you assign shifts, StaffSchedule.io calculates total hours and flags overtime automatically. You see the cost of the schedule as you build it — so there are no surprises at the end of the week. Best staff scheduling software for hourly teams tracks every hour worked, in real time, without manual input.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 font-black text-xs mt-1">✓</div>
                  <div>
                    <p className="text-base font-bold text-white">Payroll-Ready Time Tracking</p>
                    <p className="text-sm text-slate-400 mt-1 font-medium">When the week ends, your hours data is already organized. Export it straight to payroll — no retyping, no reconciling, no wondering if the numbers are right. Your workforce scheduling tool does the admin. You focus on the business.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link 
                  href="https://app.staffschedule.io/onboarding.php"
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-base font-black transition-all hover:scale-[1.03] inline-block shadow-lg shadow-emerald-600/20"
                >
                  Control Your Labor Costs
                </Link>
                <p className="text-xs text-slate-500 mt-3 font-bold uppercase tracking-widest">
                  Real-time cost tracking built into every schedule.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Section 9: Works for Any Industry (Interactive Selector) ── */}
      <section id="industries" className="py-24 border-t border-white/5 relative z-10 bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-black uppercase tracking-widest text-indigo-300">Industry Versatility</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none mb-4">
              Works for Any Team, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                Any Industry
              </span>
            </h2>
            <p className="text-slate-400 font-medium">
              From restaurant floors to construction sites — if you manage shifts, this works for you. Select your category below:
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {[
              "🍽️ Restaurants & Hospitality",
              "🛍️ Retail & Seasonal Teams",
              "🏗️ Construction & Field Crews",
              "🏥 Healthcare & Security Teams"
            ].map((tabName, index) => (
              <button 
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === index ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"}`}
              >
                {tabName}
              </button>
            ))}
          </div>

          {/* Active Tab Panel details */}
          <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden backdrop-blur">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[80px]" />
            
            <AnimatePresence mode="wait">
              {activeTab === 0 && (
                <motion.div 
                  key={0}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 text-left"
                >
                  <h3 className="text-2xl font-black text-white">Restaurants and Hospitality</h3>
                  <p className="text-slate-400 font-medium leading-relaxed">
                    Rotating shifts, weekend rushes, last-minute call-outs — hospitality scheduling is chaotic by nature. StaffSchedule.io was built for exactly this. Manage front-of-house, back-of-house, and bar staff from one team schedule app — and handle swaps without picking up the phone. Eliminate no-shows automatically.
                  </p>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-white/5 text-xs text-indigo-400 font-bold uppercase tracking-wider">
                    ⭐️ reduction in scheduling time + self-swapping rota activation.
                  </div>
                </motion.div>
              )}

              {activeTab === 1 && (
                <motion.div 
                  key={1}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 text-left"
                >
                  <h3 className="text-2xl font-black text-white">Retail and Seasonal Teams</h3>
                  <p className="text-slate-400 font-medium leading-relaxed">
                    Peak season hits and suddenly you need 3x the staff. Add new employees in minutes, assign shifts instantly, and scale back down just as fast. The best staff scheduling software for hourly teams adapts to your headcount — whether that's 8 people or 80. Flexibly resize active segments instantly.
                  </p>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-white/5 text-xs text-indigo-400 font-bold uppercase tracking-wider">
                    ⭐️ Fast roster templates + instant shift propagation.
                  </div>
                </motion.div>
              )}

              {activeTab === 2 && (
                <motion.div 
                  key={2}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 text-left"
                >
                  <h3 className="text-2xl font-black text-white">Construction, HVAC, and Field Crews</h3>
                  <p className="text-slate-400 font-medium leading-relaxed">
                    Your crew isn't sitting in an office. They're on job sites, in vans, across the city. StaffSchedule.io is built for field-based workforce scheduling — construction teams managing multiple sites, HVAC teams with technicians spread thin, landscaping crews that change location every day. Software for construction teams with scheduling, time tracking, and communication — all in one place. No juggling 3 different apps.
                  </p>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-white/5 text-xs text-indigo-400 font-bold uppercase tracking-wider">
                    ⭐️ Multi-location filter maps + technician availability slots.
                  </div>
                </motion.div>
              )}

              {activeTab === 3 && (
                <motion.div 
                  key={3}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 text-left"
                >
                  <h3 className="text-2xl font-black text-white">Healthcare and Security Teams</h3>
                  <p className="text-slate-400 font-medium leading-relaxed">
                    Coverage gaps in healthcare or security aren't just inconvenient — they're a real problem. StaffSchedule.io's team software security guard scheduling features keep every shift covered, every role filled, and every manager informed. Compliance-sensitive rotas handled without the manual headache.
                  </p>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-white/5 text-xs text-indigo-400 font-bold uppercase tracking-wider">
                    ⭐️ Gap alerts + compliance verification + audit-ready logs.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="https://app.staffschedule.io/onboarding.php"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-base font-black transition-all hover:scale-[1.03] inline-block shadow-lg"
            >
              Find Your Industry
            </Link>
            <p className="text-xs text-slate-500 mt-3 font-bold uppercase tracking-widest">
              Also used by sports teams, customer success teams, call centers, and appointment-based businesses.
            </p>
          </div>

        </div>
      </section>

      {/* ── Section 10: Scale & Trust Metrics ── */}
      <section className="py-24 border-t border-white/5 relative z-10 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                <TrendingUp className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-xs font-black uppercase tracking-widest text-violet-300">Scalable Architecture</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
                Scales with Your Business <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                  — From 5 Employees to 500
                </span>
              </h2>
              <p className="text-slate-400 font-medium leading-relaxed">
                Most teams start StaffSchedule.io with under 10 people. Some of them now manage 300+. The platform doesn't change — it just handles more. More employees, more locations, more shifts. Same simple interface. Same real-time updates.
              </p>
              <p className="text-slate-400 font-medium leading-relaxed">
                Whether you're a small retail store or a multi-site construction operation, this team scheduling software grows with you — without forcing you to switch tools every time your business levels up.
              </p>

              <div className="pt-6">
                <Link 
                  href="https://app.staffschedule.io/onboarding.php"
                  className="px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl text-base font-black transition-all hover:scale-[1.03] inline-block shadow-lg"
                >
                  Start Free — Scale When Ready
                </Link>
                <p className="text-xs text-slate-500 mt-3 font-bold uppercase tracking-widest">
                  No per-location fees · Unlimited schedule publishing
                </p>
              </div>
            </motion.div>

            {/* Right: Premium Analytics Roster Mockup */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden backdrop-blur"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-[80px]" />
              
              <div className="space-y-8 relative z-10 text-left">
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Growth Analytics</span>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">Small Team Tier</p>
                    <span className="text-2xl font-black text-white">5-10 Staff</span>
                    <p className="text-[9px] text-violet-400 mt-1 font-bold">100% Free Trial Setup</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">Enterprise Tier</p>
                    <span className="text-2xl font-black text-white">500+ Staff</span>
                    <p className="text-[9px] text-violet-400 mt-1 font-bold">Dedicated Node Sync</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-white/5 text-center">
                  <p className="text-xs font-bold text-slate-400">Total shifts generated globally</p>
                  <p className="text-3xl font-black text-indigo-400 mt-1">1,249,582 Shifts</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Section 11: Stepper 3-Step Setup Onboarding ── */}
      <section className="py-24 border-t border-white/5 relative z-10 bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-black uppercase tracking-widest text-emerald-300">Rapid Deployment</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none mb-4">
              Set Up in Under 10 Minutes <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">
                — No IT Team Needed
              </span>
            </h2>
            <p className="text-slate-400 font-medium">
              No implementation calls. No onboarding docs. Just sign up and start scheduling.
            </p>
          </div>

          {/* 3 Step Stepper Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
            
            {/* Step 1 */}
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 relative flex flex-col justify-between backdrop-blur">
              <div className="space-y-4">
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Step 01</span>
                <h3 className="text-xl font-black text-white">Create your account</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  Takes less than 2 minutes. Enter your business details, name your locations, and select your industry segment to auto-configure layouts.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-8 block">Duration: 2 mins</span>
            </div>

            {/* Step 2 */}
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 relative flex flex-col justify-between backdrop-blur">
              <div className="space-y-4">
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Step 02</span>
                <h3 className="text-xl font-black text-white">Add your team members</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  Add employees by name, role category, or custom email address. Staff members download the mobile team app to connect.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-8 block">Duration: 3 mins</span>
            </div>

            {/* Step 3 */}
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 relative flex flex-col justify-between backdrop-blur">
              <div className="space-y-4">
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Step 03</span>
                <h3 className="text-xl font-black text-white">Build & publish first rota</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  Drag and drop shifts in our clean builder, configure recurring patterns, and click Publish. Staff receive instant text notifications.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-8 block">Duration: 5 mins</span>
            </div>

          </div>

          <div className="mt-16 text-center">
            <Link 
              href="https://app.staffschedule.io/onboarding.php"
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-base font-black transition-all hover:scale-[1.03] inline-block shadow-lg"
            >
              Get Started Free
            </Link>
            <p className="text-xs text-slate-500 mt-3 font-bold uppercase tracking-widest">
              No credit card · No IT team · No long setup calls
            </p>
          </div>

        </div>
      </section>

      {/* ── Section 12: People Also Ask About Team Scheduling Software (FAQ) ── */}
      <section id="faq" className="py-24 border-t border-white/5 relative z-10 bg-slate-950/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-black uppercase tracking-widest text-indigo-300">FAQ Engine</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none mb-4">
              People Also Ask About <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                Team Scheduling Software
              </span>
            </h2>
            <p className="text-slate-400 font-medium">
              Real questions. Straight answers. No fluff.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            
            {[
              {
                q: "What's the difference between a team scheduling app and a regular calendar?",
                a: "A calendar shows dates. A team scheduling app manages people — their availability, shift preferences, and time-off requests. It also notifies your whole team when anything changes, catches conflicts before they happen, and lets employees swap shifts without calling you. A regular calendar does none of that."
              },
              {
                q: "Can a crew scheduling app work for teams across multiple locations?",
                a: "Yes — that's exactly where it's most useful. A crew scheduling app lets you manage every job site from one dashboard. Assign shifts by location, filter by team, and make sure every site has the right coverage — without switching between different tools or spreadsheets."
              },
              {
                q: "Is team scheduling software only for large businesses?",
                a: "Not at all. Small teams of 5–10 people often benefit the most. Every hour you save on scheduling is an hour back in your day. StaffSchedule.io works the same whether you have 8 employees or 800."
              },
              {
                q: "What kind of teams use workforce scheduling tools?",
                a: "Any team that runs on shifts. Restaurants, retail stores, construction crews, HVAC technicians, landscaping teams, security guards, healthcare staff, sports teams, customer success teams, and appointment-based businesses — all use workforce scheduling tools to manage their people better."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur transition-all"
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-black text-white hover:text-indigo-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeFaq === index ? "rotate-180 text-indigo-400" : "text-slate-500"}`} />
                </button>
                
                <AnimatePresence initial={false}>
                  {activeFaq === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/5 bg-slate-950/40"
                    >
                      <div className="px-6 py-5 text-sm text-slate-400 leading-relaxed font-medium">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ── Section 13: Final Conversion CTA Section ── */}
      <section className="py-24 border-t border-white/5 relative z-10 bg-slate-900/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-indigo-900/40 to-violet-900/20 border border-indigo-500/20 rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden backdrop-blur shadow-[0_32px_128px_-16px_rgba(99,102,241,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />
            <div className="absolute -top-[10rem] -left-[10rem] w-64 h-64 rounded-full bg-indigo-500/10 blur-[80px] pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
                Stop Rebuilding Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                  Schedule Every Week
                </span>
              </h2>

              <p className="text-lg font-bold text-indigo-200">
                One tool. Your whole team. Sorted.
              </p>

              <p className="text-sm text-indigo-300/70 font-medium max-w-2xl mx-auto leading-relaxed">
                You've been managing shifts the hard way for long enough. StaffSchedule.io is the team scheduling software that actually fits how your team works — whether you're running a restaurant, managing a construction crew, or coordinating a customer experience team across multiple locations.
              </p>

              <p className="text-sm font-bold text-white uppercase tracking-widest max-w-xl mx-auto pt-4">
                Build schedules in minutes. Share them instantly. Let your team handle the rest.
              </p>

              <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="https://app.staffschedule.io/onboarding.php"
                  className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-950 rounded-2xl text-lg font-black transition-all hover:scale-[1.03] shadow-lg shadow-white/10 w-full sm:w-auto"
                >
                  Start Free Today
                </Link>
                <Link 
                  href="#features"
                  className="px-8 py-4 bg-slate-900 border border-white/10 hover:bg-slate-800 text-white rounded-2xl text-lg font-black transition-all hover:scale-[1.03] w-full sm:w-auto"
                >
                  See All Features
                </Link>
              </div>

              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest pt-4">
                No credit card needed · Setup in 10 minutes · Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Global Footer Footprint ── */}
      <footer className="border-t border-white/5 py-12 relative z-10 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-xs">
              S
            </div>
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              StaffSchedule.io
            </span>
          </div>
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} StaffSchedule.io. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
