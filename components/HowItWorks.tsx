"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  UserPlus, CalendarCheck2, LayoutDashboard,
  MessageSquare, MapPin, BarChart3, Play, ChevronRight
} from "lucide-react";
import InteractiveAppViewer from "./simulation/InteractiveAppViewer";
import ScaleWrapper from "./simulation/ScaleWrapper";

const STEPS = [
  {
    num: "01",
    id: "team",
    shortTitle: "Onboard Your Staff",
    title: "Onboard Your Staff in Minutes",
    desc: "Getting started takes less time than your morning coffee. Import your existing roster, invite team members via magic links, assign roles, set wages, and define locations — all from one clean dashboard. Your employee scheduling software is ready before your next shift begins.",
    Icon: UserPlus,
    color: "#6366f1",
    gradient: "from-[#6366f1] to-[#4338ca]",
    bgLight: "bg-indigo-50",
    textColor: "text-indigo-600",
    ringColor: "ring-indigo-500/30",
  },
  {
    num: "02",
    id: "schedule",
    shortTitle: "Build Perfect Shifts",
    title: "Build Shifts That Actually Work",
    desc: "Drag, drop, done. Our shift scheduling software lets you build weekly schedules in minutes — not hours. It automatically flags overtime risks, availability conflicts, and time-off requests before you hit publish. No more last-minute surprises.",
    Icon: CalendarCheck2,
    color: "#8b5cf6",
    gradient: "from-[#8b5cf6] to-[#6d28d9]",
    bgLight: "bg-purple-50",
    textColor: "text-purple-600",
    ringColor: "ring-purple-500/30",
  },
  {
    num: "03",
    id: "dashboard",
    shortTitle: "Monitor in Real Time",
    title: "See Everything. Miss Nothing.",
    desc: "Your live dashboard shows who's clocked in, who's running late, open shifts, and daily labor spend — all updated in real time. It's the shift tracker app your managers didn't know they needed, until now.",
    Icon: LayoutDashboard,
    color: "#0ea5e9",
    gradient: "from-[#0ea5e9] to-[#0284c7]",
    bgLight: "bg-sky-50",
    textColor: "text-sky-600",
    ringColor: "ring-sky-500/30",
  },
  {
    num: "04",
    id: "chat",
    shortTitle: "Communicate Instantly",
    title: "Keep Your Team on the Same Page",
    desc: "No more scattered group chats or missed messages. Built-in team messaging lets managers broadcast announcements, confirm shift covers, and connect with any team member directly — all inside your staff scheduling app. Everyone stays informed, always.",
    Icon: MessageSquare,
    color: "#10b981",
    gradient: "from-[#10b981] to-[#059669]",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
    ringColor: "ring-emerald-500/30",
  },
  {
    num: "05",
    id: "locations",
    shortTitle: "Scale Every Location",
    title: "One Platform. Every Location.",
    desc: "Running more than one branch? No problem. Switch between locations instantly, share staff across sites, and manage every team from a single dashboard. Whether you have 3 stores or 300 — our workforce scheduling software scales with you, without the chaos.",
    Icon: MapPin,
    color: "#f59e0b",
    gradient: "from-[#f59e0b] to-[#d97706]",
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
    ringColor: "ring-amber-500/30",
  },
  {
    num: "06",
    id: "analytics",
    shortTitle: "Analyze & Optimize",
    title: "Schedule Smarter, Spend Less",
    desc: "Turn your scheduling data into real decisions. Track labor costs, spot overtime patterns, measure shift fill rates, and fine-tune your work scheduling strategy — week after week. Because great businesses don't just run schedules, they improve them.",
    Icon: BarChart3,
    color: "#ec4899",
    gradient: "from-[#ec4899] to-[#db2777]",
    bgLight: "bg-pink-50",
    textColor: "text-pink-600",
    ringColor: "ring-pink-500/30",
  },
];

const AUTO_ADVANCE_DURATION = 8000;

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  // manuallyPaused: user explicitly clicked pause — stays paused until they click play
  const [manuallyPaused, setManuallyPaused] = useState(false);
  // isHovering: mouse is over the step list — briefly pauses, resumes on mouse-leave
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-200px" });

  const step = STEPS[activeStep];
  // Combined pause — either manually stopped OR hovering over tabs
  const isPaused = manuallyPaused || isHovering;

  // Auto-advance logic
  useEffect(() => {
    if (!isInView || isPaused) return;

    setProgress(0);
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / AUTO_ADVANCE_DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        progressRef.current = setTimeout(tick, 50);
      }
    };
    progressRef.current = setTimeout(tick, 50);

    intervalRef.current = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, AUTO_ADVANCE_DURATION);

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      if (progressRef.current) clearTimeout(progressRef.current);
    };
  }, [activeStep, isInView, isPaused]);

  // When section comes back into view after user scrolled away, auto-resume
  useEffect(() => {
    if (isInView && !manuallyPaused) {
      setManuallyPaused(false);
    }
  }, [isInView]);

  const selectStep = (index: number) => {
    if (intervalRef.current) clearTimeout(intervalRef.current);
    if (progressRef.current) clearTimeout(progressRef.current);
    setActiveStep(index);
    setProgress(0);
    // Clicking a step resumes auto-advance from that step
    setManuallyPaused(false);
  };

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-36 overflow-hidden"
      id="how-it-works"
      style={{
        background: "linear-gradient(180deg, #f8f7ff 0%, #ffffff 40%, #f8f7ff 100%)",
      }}
    >
      {/* ── Ambient Background ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[900px] h-[900px] rounded-full opacity-40 blur-[150px]"
          style={{ background: `radial-gradient(circle, ${step.color}18, transparent 70%)`, transition: "background 0.8s ease" }} />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] rounded-full opacity-30 blur-[130px]"
          style={{ background: `radial-gradient(circle, ${step.color}12, transparent 70%)`, transition: "background 0.8s ease" }} />
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-purple-100 shadow-sm mb-6">
            <Play size={11} className="text-[#8b5cf6] fill-[#8b5cf6]" />
            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#8b5cf6]">
              Live Product Demo
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight leading-[1.1] mb-5">
            <span className="text-[#0f172a]">How </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899]">
              StaffSchedule.io
            </span>
            <span className="text-[#0f172a]"> Works</span>
          </h2>

          <p className="text-lg md:text-xl text-[#64748b] font-medium leading-relaxed">
            From your first hire to your fiftieth shift — our staff scheduling platform is built to make workforce management feel effortless, not exhausting.{" "}
            <strong className="text-[#0f172a] font-bold">Six simple steps. Zero confusion.</strong>
          </p>
        </motion.div>

        {/* ── Main Two-Column Layout ── */}
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 items-start">

          {/* ── LEFT: Step List ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="w-full xl:w-[400px] flex-shrink-0 flex flex-col gap-2"
          >
            {STEPS.map((s, i) => {
              const isActive = i === activeStep;
              const Icon = s.Icon;
              return (
                <button
                  key={s.id}
                  onClick={() => selectStep(i)}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className={`group relative text-left rounded-2xl transition-all duration-400 outline-none overflow-hidden ${
                    isActive
                      ? "bg-white shadow-xl ring-1 " + s.ringColor
                      : "bg-white/40 hover:bg-white/70 hover:shadow-md"
                  }`}
                  style={{
                    transform: isActive ? "translateX(6px)" : "translateX(0px)",
                    transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  {/* Active progress bar at top */}
                  {isActive && (
                    <div className="absolute top-0 left-0 h-0.5 rounded-t-2xl bg-gray-100 w-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${s.gradient}`}
                        style={{ width: `${progress}%` }}
                        transition={{ ease: "linear" }}
                      />
                    </div>
                  )}

                  <div className="p-4 lg:p-5">
                    <div className="flex items-center gap-4">
                      {/* Step number + icon badge */}
                      <div
                        className={`relative w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-400 ${
                          isActive
                            ? `bg-gradient-to-br ${s.gradient} shadow-lg`
                            : "bg-slate-100"
                        }`}
                        style={isActive ? { boxShadow: `0 6px 20px ${s.color}35` } : {}}
                      >
                        <Icon size={18} className={isActive ? "text-white" : "text-slate-400"} />
                        <div className={`absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full text-[8px] font-black flex items-center justify-center transition-all ${
                          isActive ? "bg-white text-slate-800 shadow-sm" : "bg-slate-200 text-slate-500"
                        }`}
                          style={{ width: "18px", height: "18px" }}
                        >
                          {s.num}
                        </div>
                      </div>

                      {/* Title */}
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-black text-base leading-snug transition-colors ${
                          isActive ? "text-[#0f172a]" : "text-[#64748b]"
                        }`}>
                          {s.shortTitle}
                        </h3>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`text-xs font-semibold mt-0.5 ${s.textColor}`}
                          >
                            Step {s.num} of {STEPS.length}
                          </motion.p>
                        )}
                      </div>

                      <ChevronRight size={16} className={`flex-shrink-0 transition-all ${
                        isActive ? s.textColor + " opacity-100" : "text-slate-300 opacity-0 group-hover:opacity-100"
                      }`} />
                    </div>

                    {/* Expanding description */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-[#64748b] font-medium text-sm leading-relaxed mt-3 pl-[3.75rem]">
                            {s.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              );
            })}

            {/* Navigation dots */}
            <div className="flex items-center justify-center gap-2 pt-2">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => selectStep(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeStep
                      ? "w-6 h-2 bg-gradient-to-r " + step.gradient
                      : "w-2 h-2 bg-slate-200 hover:bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Live App Simulation (Video-like) ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex-1 w-full"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Browser window frame */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                boxShadow: `0 40px 100px -20px ${step.color}25, 0 0 0 1px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.04)`,
                transition: "box-shadow 0.6s ease",
              }}
            >
              {/* Active color top bar */}
              <motion.div
                className={`h-1 w-full bg-gradient-to-r ${step.gradient}`}
                layoutId="active-bar"
                transition={{ duration: 0.5 }}
              />

              {/* Browser chrome bar */}
              <div className="h-11 bg-[#f8f8f8] border-b border-slate-200 flex items-center px-4 gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-md px-3 py-1 shadow-sm max-w-xs w-full">
                    <svg className="w-3 h-3 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={step.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="text-[11px] font-medium text-slate-500 truncate"
                      >
                        app.staffschedule.io/{step.id === "team" ? "team.php" : step.id === "schedule" ? "schedule.php" : step.id === "chat" ? "team-chat.php" : step.id === "locations" ? "locations.php" : step.id === "analytics" ? "analytics.php" : "dashboard.php"}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
                {/* Live indicator */}
                <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">Live</span>
                </div>
              </div>

              {/* The animated simulation — video-like */}
              <div className="relative bg-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, filter: "blur(8px) brightness(1.05)" }}
                    animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
                    exit={{ opacity: 0, filter: "blur(4px) brightness(0.98)" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <ScaleWrapper targetWidth={1100} targetHeight={660}>
                      <InteractiveAppViewer activeTab={step.id} isActive={isInView && !isPaused} />
                    </ScaleWrapper>
                  </motion.div>
                </AnimatePresence>

                {/* Step label overlay bottom-left */}
                <div className="absolute bottom-4 left-4 z-20">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.35 }}
                      className="flex items-center gap-2.5 bg-black/60 backdrop-blur-md text-white px-3 py-2 rounded-xl border border-white/10 shadow-lg"
                    >
                      <div
                        className={`w-6 h-6 rounded-lg bg-gradient-to-br ${step.gradient} flex items-center justify-center flex-shrink-0`}
                      >
                        <step.Icon size={12} className="text-white" />
                      </div>
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-widest opacity-60">Step {step.num}</p>
                        <p className="text-xs font-black leading-tight">{step.shortTitle}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Replay / pause hint bottom-right */}
                <div className="absolute bottom-4 right-4 z-20">
                  <button
                    onClick={() => setManuallyPaused(p => !p)}
                    className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md text-white px-3 py-2 rounded-xl border border-white/10 hover:bg-black/70 transition-all"
                  >
                    {manuallyPaused
                      ? <Play size={12} className="text-white fill-white" />
                      : <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                    }
                    <span className="text-[10px] font-bold">{manuallyPaused ? "Play" : "Pause"}</span>
                  </button>
                </div>
              </div>

              {/* Bottom progress bar showing auto-advance */}
              <div className="h-1 bg-slate-100">
                <motion.div
                  className={`h-full bg-gradient-to-r ${step.gradient}`}
                  style={{ width: isPaused ? `${progress}%` : `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
            </div>

            {/* Step quick-jump thumbnails below the viewer */}
            <div className="mt-4 hidden lg:flex items-center justify-center gap-2">
              {STEPS.map((s, i) => {
                const SIcon = s.Icon;
                const isActive = i === activeStep;
                return (
                  <button
                    key={s.id}
                    onClick={() => selectStep(i)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-r ${s.gradient} text-white shadow-md`
                        : "bg-white text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-slate-300"
                    }`}
                    style={isActive ? { boxShadow: `0 4px 14px ${s.color}40` } : {}}
                  >
                    <SIcon size={11} />
                    {s.shortTitle}
                  </button>
                );
              })}
            </div>
          </motion.div>

        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 relative"
        >
          {/* Outer glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1]/20 via-[#8b5cf6]/15 to-[#ec4899]/20 rounded-3xl blur-3xl" />

          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.12) 50%, rgba(236,72,153,0.08) 100%)",
              border: "1px solid rgba(139,92,246,0.2)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Shimmer sweep */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
            />

            {/* Top gradient accent bar */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#8b5cf6]/60 to-transparent" />

            <div className="px-8 py-10 md:px-14 md:py-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">

              {/* Left: Text */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-pulse" />
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#8b5cf6]">No Setup Fee · Cancel Anytime</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-[#0f172a] leading-tight mb-2">
                  Ready to simplify your
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#ec4899]"> staff scheduling</span>?
                </h3>
                <p className="text-[#64748b] font-medium text-base">
                  Join 2,000+ growing teams who've already made the switch.
                </p>

                {/* Mini trust row */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-5">
                  {[
                    { icon: "✓", label: "14-Day Free Trial" },
                    { icon: "✓", label: "No Credit Card" },
                    { icon: "✓", label: "Setup in Minutes" },
                  ].map((t, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs font-bold text-[#475569]">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-black">{t.icon}</span>
                      {t.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: CTA Button */}
              <div className="flex flex-col items-center gap-4 flex-shrink-0">
                <motion.a
                  href="https://app.staffschedule.io/onboarding.php?start_trial=1"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative group inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-white font-black text-sm uppercase tracking-[0.12em] overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)", boxShadow: "0 20px 50px -10px rgba(139,92,246,0.55), 0 0 0 1px rgba(255,255,255,0.15) inset" }}
                >
                  {/* Inner shimmer on hover */}
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15), transparent)" }} />
                  <span className="relative z-10">Start Your Free Trial</span>
                  <motion.span
                    className="relative z-10 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ChevronRight size={14} className="text-white" />
                  </motion.span>
                </motion.a>

                {/* Social proof */}
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {["#6366f1","#8b5cf6","#ec4899","#10b981"].map((c, i) => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-black text-white" style={{ background: c }}>
                        {["JD","SC","MR","KL"][i]}
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-[#94a3b8] font-semibold">
                    <strong className="text-[#475569]">2,000+</strong> teams already onboard
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom accent bar */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#8b5cf6]/40 to-transparent" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
