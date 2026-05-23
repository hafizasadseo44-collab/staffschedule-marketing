"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Calendar, Clock, DollarSign, Bell, Smartphone, Shield,
  Zap, MessageSquare, ArrowLeftRight, ChevronRight,
  BarChart3, Users, CheckCircle, Layers, Activity
} from "lucide-react";

// ─── Feature Card Data ───
const FEATURES = [
  {
    id: "scheduling",
    label: "Scheduling",
    icon: Calendar,
    color: "#8b5cf6",
    gradient: "from-violet-500 to-purple-600",
    glowColor: "rgba(139, 92, 246, 0.4)",
    description: "Drag-and-drop shift builder with AI auto-fill and conflict detection.",
    dashboardArea: "calendar",
  },
  {
    id: "timeclock",
    label: "Time Clock",
    icon: Clock,
    color: "#06b6d4",
    gradient: "from-cyan-500 to-teal-500",
    glowColor: "rgba(6, 182, 212, 0.4)",
    description: "GPS-verified punch-in/out with automatic overtime calculation.",
    dashboardArea: "timeclock",
  },
  {
    id: "payroll",
    label: "Payroll",
    icon: DollarSign,
    color: "#10b981",
    gradient: "from-emerald-500 to-green-500",
    glowColor: "rgba(16, 185, 129, 0.4)",
    description: "Seamless payroll integration with hours synced in real-time.",
    dashboardArea: "payroll",
  },
  {
    id: "notifications",
    label: "Alerts",
    icon: Bell,
    color: "#f59e0b",
    gradient: "from-amber-500 to-yellow-500",
    glowColor: "rgba(245, 158, 11, 0.4)",
    description: "Instant alerts for schedule changes, swaps, and open shifts.",
    dashboardArea: "notifications",
  },
  {
    id: "mobileapp",
    label: "Mobile App",
    icon: Smartphone,
    color: "#ec4899",
    gradient: "from-pink-500 to-rose-500",
    glowColor: "rgba(236, 72, 153, 0.4)",
    description: "Full access from any device — view, swap, and clock in on the go.",
    dashboardArea: "mobile",
  },
  {
    id: "compliance",
    label: "Compliance",
    icon: Shield,
    color: "#6366f1",
    gradient: "from-indigo-500 to-violet-500",
    glowColor: "rgba(99, 102, 241, 0.4)",
    description: "Auto-enforce labor laws, break rules, and maximum hour limits.",
    dashboardArea: "compliance",
  },
  {
    id: "automation",
    label: "Automation",
    icon: Zap,
    color: "#f97316",
    gradient: "from-orange-500 to-amber-500",
    glowColor: "rgba(249, 115, 22, 0.4)",
    description: "Auto-assign shifts based on availability, skills, and fairness.",
    dashboardArea: "automation",
  },
  {
    id: "messaging",
    label: "Messaging",
    icon: MessageSquare,
    color: "#3b82f6",
    gradient: "from-blue-500 to-indigo-500",
    glowColor: "rgba(59, 130, 246, 0.4)",
    description: "Built-in team chat channels with shift-specific conversations.",
    dashboardArea: "messaging",
  },
];

const LEFT_FEATURES = FEATURES.slice(0, 4);
const RIGHT_FEATURES = FEATURES.slice(4, 8);

// ─── Ambient Background Particles ───
function BackgroundParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-indigo-500/10 blur-[2px]"
          style={{
            width: Math.random() * 6 + 2 + "px",
            height: Math.random() * 6 + 2 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
          animate={{
            y: [0, -30 - Math.random() * 50, 0],
            x: [0, (Math.random() - 0.5) * 50, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: 5 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// ─── Animated SVG Connection Lines ───
function ConnectionLines({ activeId, side }: { activeId: string | null; side: "left" | "right" }) {
  const features = side === "left" ? LEFT_FEATURES : RIGHT_FEATURES;
  const count = features.length;

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`lineGrad-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={side === "left" ? "rgba(139,92,246,0.05)" : "rgba(139,92,246,0.5)"} />
          <stop offset="50%" stopColor="rgba(139,92,246,0.3)" />
          <stop offset="100%" stopColor={side === "left" ? "rgba(139,92,246,0.5)" : "rgba(139,92,246,0.05)"} />
        </linearGradient>
      </defs>
      {features.map((f, i) => {
        const yPercent = ((i + 0.5) / count) * 100;
        const isActive = activeId === f.id;
        const isDimmed = activeId !== null && !isActive;
        const startX = side === "left" ? "0%" : "100%";
        const endX = side === "left" ? "100%" : "0%";

        return (
          <g key={f.id}>
            {/* Background solid line */}
            <motion.line
              x1={startX} y1={`${yPercent}%`}
              x2={endX} y2={`${yPercent}%`}
              stroke={`url(#lineGrad-${side})`}
              strokeWidth="2"
              animate={{ opacity: isDimmed ? 0.1 : 0.4 }}
              transition={{ duration: 0.4 }}
            />
            {/* Animated dashed overlay (continuous flow) */}
            <motion.line
              x1={startX} y1={`${yPercent}%`}
              x2={endX} y2={`${yPercent}%`}
              stroke={isActive ? f.color : `url(#lineGrad-${side})`}
              strokeWidth={isActive ? "3" : "1.5"}
              strokeDasharray="8 8"
              animate={{
                strokeDashoffset: side === "left" ? [0, -30] : [0, 30],
                opacity: isActive ? 1 : (isDimmed ? 0.05 : 0.3)
              }}
              transition={{
                strokeDashoffset: { repeat: Infinity, duration: isActive ? 0.8 : 2, ease: "linear" },
                opacity: { duration: 0.4 }
              }}
            />
            {/* Glowing particle on active */}
            <AnimatePresence>
              {isActive && (
                <>
                  <motion.circle r="4" fill={f.color} filter="blur(2px)">
                    <animateMotion
                      dur="1.2s"
                      repeatCount="indefinite"
                      path={side === "left" ? `M0,${yPercent * 5} L500,${yPercent * 5}` : `M500,${yPercent * 5} L0,${yPercent * 5}`}
                    />
                  </motion.circle>
                  <motion.circle r="2" fill="#fff">
                    <animateMotion
                      dur="1.2s"
                      repeatCount="indefinite"
                      path={side === "left" ? `M0,${yPercent * 5} L500,${yPercent * 5}` : `M500,${yPercent * 5} L0,${yPercent * 5}`}
                    />
                  </motion.circle>
                </>
              )}
            </AnimatePresence>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Feature Card Component ───
function FeatureCard({
  feature,
  index,
  side,
  activeId,
  onHover,
}: {
  feature: typeof FEATURES[0];
  index: number;
  side: "left" | "right";
  activeId: string | null;
  onHover: (id: string | null) => void;
}) {
  const Icon = feature.icon;
  const isActive = activeId === feature.id;
  const isDimmed = activeId !== null && !isActive;

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.1 * index, type: "spring", stiffness: 100 }}
      onMouseEnter={() => onHover(feature.id)}
      onMouseLeave={() => onHover(null)}
      className="relative group cursor-pointer"
      animate={{ opacity: isDimmed ? 0.4 : 1 }}
    >
      <motion.div
        animate={{
          scale: isActive ? 1.05 : 1,
          y: isActive ? -2 : 0,
          backgroundColor: isActive ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.4)",
          borderColor: isActive ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative flex items-center gap-3 px-4 py-3.5 rounded-2xl border shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-md dark:bg-slate-900/40 dark:border-slate-800"
        style={{
          boxShadow: isActive ? `0 15px 40px -10px ${feature.glowColor}` : undefined,
        }}
      >
        <motion.div
          animate={{
            backgroundColor: isActive ? feature.color : "#f1f5f9",
          }}
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 dark:bg-slate-800 relative z-10 overflow-hidden"
        >
          {isActive && (
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-100`} />
          )}
          <Icon size={18} className={`relative z-10 transition-colors duration-300 ${isActive ? "text-white" : "text-slate-500"}`} />
        </motion.div>

        <div className="flex-1 min-w-0 z-10">
          <p className={`text-[13px] font-bold transition-colors duration-300 ${isActive ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>
            {feature.label}
          </p>
          <AnimatePresence>
            {isActive && (
              <motion.p
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 4 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[11px] text-slate-500 leading-snug overflow-hidden"
              >
                {feature.description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Live Dashboard Mockup ───
function DashboardMockup({ activeId, autoCycleTime }: { activeId: string | null; autoCycleTime: number }) {
  const activeFeature = FEATURES.find((f) => f.id === activeId);
  const glowColor = activeFeature?.color || "#8b5cf6";

  // Dummy animation for live UI feel
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const int = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(int);
  }, []);

  const scheduleRows = [
    { name: "Sarah", shifts: ["", "9a-5p", "9a-5p", "", "1p-9p", "9a-5p", ""], color: "#8b5cf6" },
    { name: "James", shifts: ["1p-9p", "", "1p-9p", "1p-9p", "", "1p-9p", ""], color: "#06b6d4" },
    { name: "Alex", shifts: ["9a-5p", "9a-5p", "", "9a-5p", "", "", "9a-5p"], color: "#10b981" },
    { name: "Mia", shifts: ["", "1p-9p", "9a-5p", "", "1p-9p", "9a-5p", ""], color: "#f59e0b" },
    { name: "David", shifts: ["9a-5p", "", "", "9a-5p", "9a-5p", "", "1p-9p"], color: "#ec4899" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
      className="relative w-full max-w-[650px] mx-auto z-20"
      animate={{ y: [-5, 5, -5] }} // Floating animation
      style={{
        transition: "all 6s ease-in-out",
      }}
    >
      {/* Outer Breathing Glow */}
      <motion.div
        className="absolute -inset-10 rounded-[3rem] blur-[50px] opacity-30 pointer-events-none"
        animate={{
          backgroundColor: `${glowColor}40`,
          scale: [0.95, 1.05, 0.95],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          backgroundColor: { duration: 0.5 },
          scale: { repeat: Infinity, duration: 4, ease: "easeInOut" },
          opacity: { repeat: Infinity, duration: 4, ease: "easeInOut" },
        }}
      />

      {/* Laptop Frame */}
      <div className="relative">
        <div className="relative rounded-2xl overflow-hidden border border-white/40 dark:border-slate-700/60 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.2)] bg-slate-900 ring-1 ring-black/5">
          {/* Top Browser Bar */}
          <div className="bg-slate-100/95 dark:bg-slate-800/95 backdrop-blur-xl px-4 py-3 flex items-center gap-4 border-b border-white/20 dark:border-slate-700">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 bg-white/60 dark:bg-slate-900/50 rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-inner">
              <motion.div
                animate={{ opacity: pulse ? 1 : 0.4 }}
                transition={{ duration: 1 }}
                className="w-2 h-2 rounded-full bg-emerald-500"
              />
              <span className="text-[10px] font-medium text-slate-500">app.staffschedule.io / live</span>
            </div>
          </div>

          {/* Main UI Area */}
          <div className="bg-white dark:bg-slate-900 h-[380px] p-5 relative overflow-hidden flex flex-col">
            {/* Live Data Sparkles (Background) */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[slide_20s_linear_infinite]" />

            {/* Header */}
            <div className="flex justify-between items-center mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                  <Activity size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Schedule Viewer</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-[9px] text-slate-500 font-medium">8 Updates recently</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <motion.div animate={{ scale: activeId === "automation" ? 1.05 : 1 }} className="h-6 w-20 bg-orange-100 dark:bg-orange-900/30 rounded flex items-center justify-center border border-orange-200">
                  <span className="text-[9px] font-bold text-orange-600">Auto-Fill Active</span>
                </motion.div>
              </div>
            </div>

            {/* Grid Area */}
            <div className="flex-1 relative z-10">
              <div className="grid grid-cols-8 gap-2 mb-3">
                <div />
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <div key={i} className="text-[10px] font-bold text-slate-400 text-center">{d}</div>
                ))}
              </div>
              
              <div className="space-y-2">
                {scheduleRows.map((row, ri) => (
                  <div key={row.name} className="grid grid-cols-8 gap-2 items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-sm" style={{ backgroundColor: row.color }}>
                        {row.name[0]}
                      </div>
                      <span className="text-[10px] font-semibold text-slate-700 hidden sm:block">{row.name}</span>
                    </div>
                    {row.shifts.map((shift, si) => (
                      <motion.div
                        key={si}
                        animate={{
                          scale: activeId === "scheduling" && shift ? [1, 1.03, 1] : 1,
                          opacity: activeId && activeId !== "scheduling" ? (shift ? 0.6 : 1) : 1
                        }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: si * 0.1 }}
                        className={`
                          h-8 rounded-lg flex items-center justify-center text-[9px] font-bold transition-all duration-300
                          ${shift ? "text-white shadow-md shadow-black/5" : "bg-slate-50 border border-slate-100"}
                        `}
                        style={{
                          backgroundColor: shift ? row.color : undefined,
                        }}
                      >
                        {shift}
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Live Metrics */}
            <div className="grid grid-cols-4 gap-3 mt-6 pt-4 border-t border-slate-100 relative z-10">
              {[
                { label: "Compliance Status", val: "100%", id: "compliance" },
                { label: "Est. Payroll", val: "$4,250", id: "payroll" },
                { label: "Open Shifts", val: "2", id: "notifications" },
                { label: "Active Clocks", val: "8/12", id: "timeclock" },
              ].map(stat => (
                <motion.div
                  key={stat.id}
                  animate={{
                    y: activeId === stat.id ? -4 : 0,
                    backgroundColor: activeId === stat.id ? `${glowColor}15` : "rgba(248, 250, 252, 0.8)",
                    borderColor: activeId === stat.id ? `${glowColor}40` : "rgba(226, 232, 240, 0.8)",
                  }}
                  className="rounded-xl border p-2 flex flex-col items-center justify-center text-center transition-colors"
                >
                  <span className="text-[9px] text-slate-500 font-medium">{stat.label}</span>
                  <span className={`text-xs font-black ${activeId === stat.id ? "text-slate-900" : "text-slate-700"}`}>
                    {stat.val}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Dynamic Overlays (Notifications, Mobile, Messaging) */}
            <AnimatePresence>
              {activeId === "notifications" && (
                <motion.div
                  initial={{ opacity: 0, x: 20, y: -10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  className="absolute top-16 right-6 bg-white shadow-2xl rounded-xl border border-amber-100 p-3 w-48 z-30"
                >
                  <div className="flex gap-2 items-start">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <Bell size={12} className="text-amber-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-800">Shift Alert</p>
                      <p className="text-[9px] text-slate-500 mt-0.5 leading-tight">Sarah requested to drop her Friday evening shift.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeId === "mobileapp" && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className="absolute bottom-0 right-10 w-28 h-48 bg-slate-900 rounded-t-[20px] shadow-2xl border-4 border-slate-800 border-b-0 z-40 overflow-hidden flex flex-col"
                >
                  <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mt-2 mb-2" />
                  <div className="flex-1 bg-white m-1 rounded-t-xl p-2 flex flex-col gap-2">
                    <div className="h-6 bg-pink-100 rounded-lg animate-pulse" />
                    <div className="h-4 bg-slate-100 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-slate-100 rounded animate-pulse" />
                    <div className="h-10 bg-slate-100 rounded animate-pulse mt-auto" />
                  </div>
                </motion.div>
              )}

              {activeId === "messaging" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  className="absolute bottom-20 left-6 bg-white shadow-2xl rounded-xl border border-blue-100 p-3 w-48 z-30"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare size={12} className="text-blue-500" />
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider">Team Chat</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg text-[9px] text-slate-600 mb-1">
                    <span className="font-bold text-blue-600">Alex:</span> Can anyone cover Saturday?
                  </div>
                  <div className="bg-blue-50 p-2 rounded-lg text-[9px] text-slate-600 ml-4">
                    <span className="font-bold text-emerald-600">David:</span> I got you!
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Laptop Base */}
        <div className="mx-auto w-[75%] h-3.5 bg-gradient-to-b from-slate-200 to-slate-400 dark:from-slate-700 dark:to-slate-800 rounded-b-xl shadow-lg" />
        <div className="mx-auto w-[50%] h-1 bg-slate-300 dark:bg-slate-900 rounded-b-md" />
      </div>
    </motion.div>
  );
}

// ─── Mobile Card ───
function MobileCard({ feature, activeId, onHover, isInView, index }: any) {
  const isActive = activeId === feature.id;
  const Icon = feature.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 * index }}
      onClick={() => onHover(isActive ? null : feature.id)}
      className="cursor-pointer mb-3"
    >
      <motion.div
        animate={{
          scale: isActive ? 1.02 : 1,
          borderColor: isActive ? feature.color : "rgba(226, 232, 240, 0.8)",
        }}
        className={`
          flex items-center gap-4 px-4 py-3.5 rounded-2xl border bg-white/80 backdrop-blur-xl shadow-sm transition-all
        `}
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? `bg-gradient-to-br ${feature.gradient} text-white` : "bg-slate-100 text-slate-500"}`}>
          <Icon size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-900">{feature.label}</p>
          <AnimatePresence>
            {isActive && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-slate-500 mt-1"
              >
                {feature.description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <ChevronRight size={16} className={`transition-transform ${isActive ? "rotate-90 text-slate-900" : "text-slate-300"}`} />
      </motion.div>
    </motion.div>
  );
}

// ─── Main Section ───
export default function EcosystemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeId, setActiveId] = useState<string | null>("scheduling");
  const [autoCycle, setAutoCycle] = useState(true);
  const cycleRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-cycle through features
  useEffect(() => {
    if (!isInView || !autoCycle) return;
    let i = 0;
    cycleRef.current = setInterval(() => {
      i = (i + 1) % FEATURES.length;
      setActiveId(FEATURES[i].id);
    }, 3000);
    return () => {
      if (cycleRef.current) clearInterval(cycleRef.current);
    };
  }, [isInView, autoCycle]);

  const handleHover = (id: string | null) => {
    if (id) {
      setAutoCycle(false);
      setActiveId(id);
    } else {
      setAutoCycle(true); // resume on leave
    }
  };

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-36 overflow-hidden bg-white" id="ecosystem">
      {/* ── Background Elements ── */}
      <BackgroundParticles />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.03)_0%,transparent_70%)]" />
        {/* Soft grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-100/50 rounded-full blur-[150px] -mr-[400px] -mt-[400px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/60 rounded-full blur-[120px] -ml-[300px] -mb-[300px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-xl px-4 py-1.5 rounded-full mb-6 border border-purple-100 shadow-sm"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-700">
              The Connected Ecosystem
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-slate-900"
          >
            Everything Your Team Needs in <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">One Simple Dashboard</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4 text-base md:text-lg text-slate-500 font-medium leading-relaxed"
          >
            <p>
              StaffSchedule.io helps businesses manage staff scheduling, employee availability, shift calendars, overtime tracking, leave requests, open shifts and team communication from one simple dashboard designed to keep your workforce organized and easy to manage.
            </p>
            <p>
              Whether you manage a café, restaurant, retail store, or call center our online employee scheduling software provides real-time scheduling updates and instant notifications to keep your team aligned, informed and productive.
            </p>
          </motion.div>
        </div>



        {/* ── Additional Content & Testimonial ── */}
        <div className="mt-24 md:mt-32 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
              Helping Teams Work Smarter Every Day
            </h3>
            <p className="text-slate-500 text-lg mb-6 leading-relaxed">
              Manual scheduling, missed updates, team confusion, and messy communication can slow businesses down and create unnecessary stress for managers and business owners.
            </p>
            <p className="text-slate-500 text-lg leading-relaxed">
              That’s where StaffSchedule.io helps. Our employee scheduling software makes it easy to manage schedules, team communication, shift updates, and workforce organization from one simple dashboard that keeps everyone connected and informed in real time.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full max-w-md"
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-purple-500/10 border border-purple-100 relative">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
                <Quote size={24} className="text-white fill-current" />
              </div>
              <div className="flex gap-1 mb-6 mt-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 text-lg font-medium leading-relaxed mb-8 italic">
                "We switched from messy spreadsheets to StaffSchedule.io and it instantly changed how we run things. Everything is in one place, shifts are covered, and communication is clear."
              </p>
              <div className="flex items-center gap-4">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" alt="Customer" className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100" />
                <div>
                  <div className="font-bold text-slate-900">Emily R.</div>
                  <div className="text-sm text-slate-500">Store Manager, Retail Co.</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
