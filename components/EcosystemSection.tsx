"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Calendar, Clock, DollarSign, Bell, Smartphone, Shield,
  Zap, MessageSquare, ArrowLeftRight, ChevronRight,
  BarChart3, Users, CheckCircle, Layers
} from "lucide-react";

// ─── Feature Card Data ───
const FEATURES = [
  {
    id: "scheduling",
    label: "Scheduling",
    icon: Calendar,
    color: "#8b5cf6",
    gradient: "from-violet-500 to-purple-600",
    glowColor: "rgba(139, 92, 246, 0.3)",
    description: "Drag-and-drop shift builder with AI auto-fill and conflict detection.",
    dashboardArea: "calendar",
  },
  {
    id: "timeclock",
    label: "Time Clock",
    icon: Clock,
    color: "#06b6d4",
    gradient: "from-cyan-500 to-teal-500",
    glowColor: "rgba(6, 182, 212, 0.3)",
    description: "GPS-verified punch-in/out with automatic overtime calculation.",
    dashboardArea: "timeclock",
  },
  {
    id: "payroll",
    label: "Payroll",
    icon: DollarSign,
    color: "#10b981",
    gradient: "from-emerald-500 to-green-500",
    glowColor: "rgba(16, 185, 129, 0.3)",
    description: "Seamless payroll integration with hours synced in real-time.",
    dashboardArea: "payroll",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    color: "#f59e0b",
    gradient: "from-amber-500 to-yellow-500",
    glowColor: "rgba(245, 158, 11, 0.3)",
    description: "Instant alerts for schedule changes, swaps, and open shifts.",
    dashboardArea: "notifications",
  },
  {
    id: "mobileapp",
    label: "Mobile App",
    icon: Smartphone,
    color: "#ec4899",
    gradient: "from-pink-500 to-rose-500",
    glowColor: "rgba(236, 72, 153, 0.3)",
    description: "Full access from any device — view, swap, and clock in on the go.",
    dashboardArea: "mobile",
  },
  {
    id: "compliance",
    label: "Compliance",
    icon: Shield,
    color: "#6366f1",
    gradient: "from-indigo-500 to-violet-500",
    glowColor: "rgba(99, 102, 241, 0.3)",
    description: "Auto-enforce labor laws, break rules, and maximum hour limits.",
    dashboardArea: "compliance",
  },
  {
    id: "automation",
    label: "Automation",
    icon: Zap,
    color: "#f97316",
    gradient: "from-orange-500 to-amber-500",
    glowColor: "rgba(249, 115, 22, 0.3)",
    description: "Auto-assign shifts based on availability, skills, and fairness.",
    dashboardArea: "automation",
  },
  {
    id: "messaging",
    label: "Team Messaging",
    icon: MessageSquare,
    color: "#3b82f6",
    gradient: "from-blue-500 to-indigo-500",
    glowColor: "rgba(59, 130, 246, 0.3)",
    description: "Built-in team chat channels with shift-specific conversations.",
    dashboardArea: "messaging",
  },
  {
    id: "shiftswaps",
    label: "Shift Swaps",
    icon: ArrowLeftRight,
    color: "#a855f7",
    gradient: "from-purple-500 to-fuchsia-500",
    glowColor: "rgba(168, 85, 247, 0.3)",
    description: "Let employees swap shifts effortlessly with manager approval flows.",
    dashboardArea: "swaps",
  },
];

// Left side (indices 0-4), right side (indices 5-8)
const LEFT_FEATURES = FEATURES.slice(0, 5);
const RIGHT_FEATURES = FEATURES.slice(5, 9);

// ─── SVG Connection Lines ───
function ConnectionLines({ activeId, side }: { activeId: string | null; side: "left" | "right" }) {
  const count = side === "left" ? LEFT_FEATURES.length : RIGHT_FEATURES.length;
  const features = side === "left" ? LEFT_FEATURES : RIGHT_FEATURES;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`lineGrad-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={side === "left" ? "rgba(139,92,246,0.05)" : "rgba(99,102,241,0.4)"} />
          <stop offset="50%" stopColor="rgba(139,92,246,0.25)" />
          <stop offset="100%" stopColor={side === "left" ? "rgba(99,102,241,0.4)" : "rgba(139,92,246,0.05)"} />
        </linearGradient>
        {features.map((f) => (
          <linearGradient key={f.id} id={`activeGrad-${f.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={f.color} stopOpacity="0.1" />
            <stop offset="50%" stopColor={f.color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={f.color} stopOpacity="0.1" />
          </linearGradient>
        ))}
      </defs>
      {features.map((f, i) => {
        const yPercent = ((i + 0.5) / count) * 100;
        const isActive = activeId === f.id;
        const startX = side === "left" ? "0%" : "100%";
        const endX = side === "left" ? "100%" : "0%";
        const midX = "50%";

        return (
          <g key={f.id}>
            {/* Glow behind active line */}
            {isActive && (
              <line
                x1={startX} y1={`${yPercent}%`}
                x2={endX} y2={`${yPercent}%`}
                stroke={f.color}
                strokeWidth="6"
                opacity="0.15"
                strokeLinecap="round"
              />
            )}
            {/* Dashed line */}
            <line
              x1={startX} y1={`${yPercent}%`}
              x2={endX} y2={`${yPercent}%`}
              stroke={isActive ? `url(#activeGrad-${f.id})` : `url(#lineGrad-${side})`}
              strokeWidth={isActive ? "2.5" : "1.5"}
              strokeDasharray={isActive ? "0" : "6 6"}
              opacity={isActive ? 1 : 0.4}
              style={{
                transition: "all 0.5s ease",
              }}
            />
            {/* Animated pulse dot */}
            {isActive && (
              <>
                <circle r="4" fill={f.color} opacity="0.9">
                  <animateMotion
                    dur="1.5s"
                    repeatCount="indefinite"
                    path={side === "left"
                      ? `M0,${yPercent * 3} L300,${yPercent * 3}`
                      : `M300,${yPercent * 3} L0,${yPercent * 3}`}
                  />
                </circle>
                <circle r="8" fill={f.color} opacity="0.2">
                  <animateMotion
                    dur="1.5s"
                    repeatCount="indefinite"
                    path={side === "left"
                      ? `M0,${yPercent * 3} L300,${yPercent * 3}`
                      : `M300,${yPercent * 3} L0,${yPercent * 3}`}
                  />
                </circle>
              </>
            )}
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
  isInView,
}: {
  feature: typeof FEATURES[0];
  index: number;
  side: "left" | "right";
  activeId: string | null;
  onHover: (id: string | null) => void;
  isInView: boolean;
}) {
  const Icon = feature.icon;
  const isActive = activeId === feature.id;
  const delay = 0.15 + index * 0.1;

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -60 : 60, y: 10 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => onHover(feature.id)}
      onMouseLeave={() => onHover(null)}
      className="relative group cursor-pointer"
    >
      <div
        className={`
          relative flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-500
          ${isActive
            ? "bg-white/95 dark:bg-slate-800/95 border-transparent shadow-xl scale-[1.04]"
            : "bg-white/60 dark:bg-slate-900/40 border-white/40 dark:border-slate-700/40 shadow-lg shadow-black/[0.03] hover:bg-white/90 hover:shadow-xl hover:scale-[1.02]"
          }
          backdrop-blur-xl
        `}
        style={{
          boxShadow: isActive ? `0 8px 40px -10px ${feature.glowColor}, 0 0 0 1px ${feature.color}30` : undefined,
        }}
      >
        {/* Icon */}
        <div
          className={`
            w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500
            ${isActive ? `bg-gradient-to-br ${feature.gradient} shadow-lg` : "bg-slate-100 dark:bg-slate-800"}
          `}
          style={{
            boxShadow: isActive ? `0 4px 20px -4px ${feature.glowColor}` : undefined,
          }}
        >
          <Icon
            size={20}
            className={`transition-colors duration-300 ${isActive ? "text-white" : "text-slate-500 dark:text-slate-400"}`}
          />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-bold transition-colors duration-300 ${isActive ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>
            {feature.label}
          </p>
          <AnimatePresence>
            {isActive && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1 overflow-hidden"
              >
                {feature.description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Arrow */}
        <ChevronRight
          size={16}
          className={`shrink-0 transition-all duration-300 ${isActive ? "text-slate-900 dark:text-white translate-x-0.5" : "text-slate-300 dark:text-slate-600"}`}
        />

        {/* Active indicator glow */}
        {isActive && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at ${side === "left" ? "right" : "left"} center, ${feature.color}08, transparent 70%)`,
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

// ─── Fake Dashboard UI ───
function DashboardMockup({ activeId, isInView }: { activeId: string | null; isInView: boolean }) {
  const activeFeature = FEATURES.find((f) => f.id === activeId);
  const glowColor = activeFeature?.color || "#8b5cf6";

  // Fake schedule rows
  const scheduleRows = [
    { name: "Sarah M.", shifts: ["", "9-5", "9-5", "", "9-5", "9-5", ""], color: "#8b5cf6" },
    { name: "James C.", shifts: ["1-9", "", "1-9", "1-9", "", "1-9", ""], color: "#06b6d4" },
    { name: "Alex R.", shifts: ["9-5", "9-5", "", "9-5", "", "", "9-5"], color: "#10b981" },
    { name: "Mia T.", shifts: ["", "1-9", "9-5", "", "1-9", "9-5", ""], color: "#f59e0b" },
    { name: "David P.", shifts: ["9-5", "", "", "9-5", "9-5", "", "1-9"], color: "#ec4899" },
  ];

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className="relative w-full max-w-[520px] mx-auto"
    >
      {/* Outer glow */}
      <div
        className="absolute -inset-6 rounded-[2.5rem] transition-all duration-700 blur-2xl opacity-40"
        style={{ background: `radial-gradient(ellipse, ${glowColor}30, transparent 70%)` }}
      />

      {/* Laptop frame */}
      <div className="relative">
        {/* Screen */}
        <div
          className="relative rounded-2xl overflow-hidden border border-white/30 dark:border-slate-700/50 shadow-2xl transition-shadow duration-700"
          style={{
            boxShadow: `0 25px 80px -15px ${glowColor}20, 0 10px 30px -10px rgba(0,0,0,0.1)`,
          }}
        >
          {/* Browser Chrome */}
          <div className="bg-slate-100/95 dark:bg-slate-800/95 backdrop-blur-xl px-4 py-2.5 flex items-center gap-3 border-b border-slate-200/50 dark:border-slate-700/50">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 bg-white/70 dark:bg-slate-700/50 rounded-lg px-3 py-1 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400/60" />
              <span className="text-[10px] font-medium text-slate-400">app.staffschedule.io/dashboard</span>
            </div>
            <div className="flex gap-2">
              <div className="w-4 h-4 rounded bg-slate-200/60 dark:bg-slate-600/40" />
              <div className="w-4 h-4 rounded bg-slate-200/60 dark:bg-slate-600/40" />
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-4 min-h-[340px] relative overflow-hidden">
            {/* Animated background glow */}
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-1000"
              style={{
                background: activeId
                  ? `radial-gradient(circle at 50% 50%, ${glowColor}08, transparent 70%)`
                  : "none",
              }}
            />

            {/* Top bar */}
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <Layers size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-800 dark:text-white">Weekly Schedule</p>
                  <p className="text-[9px] text-slate-400">May 19 — May 25, 2026</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <div className="px-2 py-1 rounded-md bg-violet-50 dark:bg-violet-900/30 text-[9px] font-bold text-violet-600 dark:text-violet-400">
                  This Week
                </div>
                <div className="px-2 py-1 rounded-md bg-slate-50 dark:bg-slate-800 text-[9px] font-medium text-slate-400">
                  Next
                </div>
              </div>
            </div>

            {/* Schedule Grid */}
            <div className="relative z-10">
              {/* Header */}
              <div className="grid grid-cols-8 gap-1 mb-2">
                <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider py-1 pl-1">Team</div>
                {days.map((d) => (
                  <div key={d} className="text-[8px] font-bold text-slate-400 uppercase tracking-wider text-center py-1">
                    {d}
                  </div>
                ))}
              </div>

              {/* Rows */}
              {scheduleRows.map((row, ri) => (
                <motion.div
                  key={row.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + ri * 0.08 }}
                  className="grid grid-cols-8 gap-1 mb-1"
                >
                  <div className="flex items-center gap-1.5 pl-1">
                    <div
                      className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center text-[7px] font-bold text-white"
                      style={{ backgroundColor: row.color }}
                    >
                      {row.name[0]}
                    </div>
                    <span className="text-[9px] font-semibold text-slate-600 dark:text-slate-300 truncate">
                      {row.name}
                    </span>
                  </div>
                  {row.shifts.map((shift, si) => (
                    <div
                      key={si}
                      className={`
                        h-7 rounded-md flex items-center justify-center text-[8px] font-bold transition-all duration-300
                        ${shift
                          ? "text-white shadow-sm"
                          : "bg-slate-50 dark:bg-slate-800/50 text-slate-300 dark:text-slate-600"
                        }
                      `}
                      style={{
                        backgroundColor: shift ? `${row.color}` : undefined,
                        opacity: shift ? (activeId ? 0.7 : 0.85) : 1,
                        transform: activeId === "scheduling" && shift ? "scale(1.05)" : "scale(1)",
                        boxShadow: activeId === "scheduling" && shift ? `0 2px 8px ${row.color}40` : "none",
                      }}
                    >
                      {shift || "—"}
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Bottom Stats */}
            <div className="flex items-center gap-3 mt-4 relative z-10">
              {[
                { icon: Users, label: "12 Active", color: "#8b5cf6", areaId: "scheduling" },
                { icon: Clock, label: "182 Hrs", color: "#06b6d4", areaId: "timeclock" },
                { icon: BarChart3, label: "96% Fill", color: "#10b981", areaId: "payroll" },
                { icon: CheckCircle, label: "Compliant", color: "#6366f1", areaId: "compliance" },
              ].map((stat) => {
                const StatIcon = stat.icon;
                const isStatActive = activeId === stat.areaId;
                return (
                  <div
                    key={stat.label}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all duration-500 ${isStatActive
                      ? "bg-white dark:bg-slate-700 shadow-md scale-105"
                      : "bg-slate-50/80 dark:bg-slate-800/40"
                    }`}
                    style={{
                      boxShadow: isStatActive ? `0 4px 15px ${stat.color}25` : "none",
                    }}
                  >
                    <StatIcon size={11} style={{ color: stat.color }} />
                    <span className="text-[9px] font-bold text-slate-600 dark:text-slate-300">{stat.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Notification popup */}
            <AnimatePresence>
              {activeId === "notifications" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute top-12 right-4 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-700 p-3 w-44 z-30"
                >
                  <p className="text-[9px] font-bold text-amber-600 mb-1">🔔 New Notification</p>
                  <p className="text-[8px] text-slate-500">Sarah requested a shift swap for Thursday.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat popup */}
            <AnimatePresence>
              {activeId === "messaging" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute bottom-14 right-4 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-700 p-3 w-44 z-30"
                >
                  <p className="text-[9px] font-bold text-blue-600 mb-1">💬 Team Chat</p>
                  <p className="text-[8px] text-slate-500">Alex: Hey can anyone cover my Saturday?</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Automation spark */}
            <AnimatePresence>
              {activeId === "automation" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-2xl shadow-orange-500/30">
                    <Zap size={28} className="text-white" />
                  </div>
                  <p className="text-center text-[9px] font-bold text-orange-600 mt-2">Auto-filling shifts...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Laptop base */}
        <div className="mx-auto w-[60%] h-3 bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-b-xl" />
        <div className="mx-auto w-[40%] h-1 bg-slate-300/50 dark:bg-slate-700/50 rounded-b-lg" />
      </div>
    </motion.div>
  );
}

// ─── Mobile Feature Card ───
function MobileCard({ feature, index, isInView }: { feature: typeof FEATURES[0]; index: number; isInView: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.06 }}
      onClick={() => setExpanded(!expanded)}
      className="cursor-pointer"
    >
      <div
        className={`
          flex items-center gap-3.5 px-4 py-3.5 rounded-2xl border backdrop-blur-xl transition-all duration-400
          ${expanded
            ? "bg-white/95 dark:bg-slate-800/95 border-transparent shadow-xl"
            : "bg-white/50 dark:bg-slate-900/30 border-white/30 dark:border-slate-700/30 shadow-md"
          }
        `}
        style={{
          boxShadow: expanded ? `0 6px 30px -8px ${feature.glowColor}` : undefined,
        }}
      >
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-400 ${expanded ? `bg-gradient-to-br ${feature.gradient} shadow-lg` : "bg-slate-100 dark:bg-slate-800"}`}
          style={{ boxShadow: expanded ? `0 4px 16px ${feature.glowColor}` : undefined }}
        >
          <Icon size={18} className={expanded ? "text-white" : "text-slate-500"} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-bold ${expanded ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>{feature.label}</p>
          <AnimatePresence>
            {expanded && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1"
              >
                {feature.description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <ChevronRight
          size={16}
          className={`shrink-0 transition-transform duration-300 ${expanded ? "rotate-90 text-slate-900 dark:text-white" : "text-slate-300"}`}
        />
      </div>
    </motion.div>
  );
}

// ─── Main Section ───
export default function EcosystemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [activeId, setActiveId] = useState<string | null>(null);

  // Auto-cycle when no user hover
  const [autoCycle, setAutoCycle] = useState(true);
  const cycleRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isInView) return;

    if (autoCycle) {
      let i = 0;
      cycleRef.current = setInterval(() => {
        setActiveId(FEATURES[i % FEATURES.length].id);
        i++;
      }, 2500);
    }

    return () => {
      if (cycleRef.current) clearInterval(cycleRef.current);
    };
  }, [isInView, autoCycle]);

  const handleHover = (id: string | null) => {
    if (id) {
      setAutoCycle(false);
      if (cycleRef.current) clearInterval(cycleRef.current);
      setActiveId(id);
    } else {
      setActiveId(null);
      // Resume auto-cycle after a short delay
      setTimeout(() => setAutoCycle(true), 1000);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-36 overflow-hidden"
      id="ecosystem"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9FF] via-[#f3f0ff] to-[#FAF9FF]" />

        {/* Radial accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-violet-400/[0.04] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-indigo-300/[0.05] rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-purple-300/[0.04] rounded-full blur-[100px]" />

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#8b5cf6_0.8px,transparent_0.8px)] [background-size:24px_24px]" />

        {/* Fades */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#FAF9FF] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#FAF9FF] to-transparent" />
      </div>

      {/* Container */}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-xl px-5 py-2 rounded-full mb-8 border border-purple-100/60 shadow-sm"
          >
            <Layers size={14} className="text-[#8b5cf6]" />
            <span className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-[#8b5cf6]">
              ALL-IN-ONE PLATFORM
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-[3.5rem] font-black tracking-tight leading-[1.1] mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1c1236] via-[#4c1d95] to-[#8b5cf6]">
              One Platform.{" "}
            </span>
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#6d28d9] to-[#4c1d95]">
              Every Workforce Tool.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-[#5b4f7a] font-medium leading-relaxed max-w-3xl"
          >
            Stop juggling disconnected tools. Scheduling, time tracking, payroll, compliance, and team communication — all connected in one intelligent ecosystem.
          </motion.p>
        </div>

        {/* ── Desktop Layout ── */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] gap-0 items-center max-w-[1200px] mx-auto">
          {/* Left Cards */}
          <div className="flex flex-col gap-3 pr-2">
            {LEFT_FEATURES.map((f, i) => (
              <FeatureCard
                key={f.id}
                feature={f}
                index={i}
                side="left"
                activeId={activeId}
                onHover={handleHover}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Center Dashboard with connection lines */}
          <div className="relative px-4 w-[540px]">
            {/* Left connection lines */}
            <div className="absolute left-0 top-0 bottom-0 w-4 z-0">
              <ConnectionLines activeId={activeId} side="left" />
            </div>

            <DashboardMockup activeId={activeId} isInView={isInView} />

            {/* Right connection lines */}
            <div className="absolute right-0 top-0 bottom-0 w-4 z-0">
              <ConnectionLines activeId={activeId} side="right" />
            </div>
          </div>

          {/* Right Cards */}
          <div className="flex flex-col gap-3 pl-2">
            {RIGHT_FEATURES.map((f, i) => (
              <FeatureCard
                key={f.id}
                feature={f}
                index={i}
                side="right"
                activeId={activeId}
                onHover={handleHover}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* ── Mobile Layout ── */}
        <div className="lg:hidden space-y-8">
          {/* Dashboard first on mobile */}
          <DashboardMockup activeId={null} isInView={isInView} />

          {/* Feature cards stacked */}
          <div className="space-y-2.5 max-w-md mx-auto">
            {FEATURES.map((f, i) => (
              <MobileCard key={f.id} feature={f} index={i} isInView={isInView} />
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col items-center mt-16 lg:mt-20"
        >
          <a
            href="/features"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white rounded-2xl font-bold text-sm shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            Explore All Features
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="mt-4 text-xs text-slate-400 font-medium">
            No credit card required · Free 14-day trial
          </p>
        </motion.div>
      </div>
    </section>
  );
}
