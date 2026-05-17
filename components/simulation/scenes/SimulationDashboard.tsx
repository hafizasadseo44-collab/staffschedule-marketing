"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, ShieldCheck, Zap, CalendarDays, RefreshCw,
  TrendingUp, TrendingDown, Clock, AlertCircle, CheckCircle2,
  Bell, MoreHorizontal, ArrowUpRight, ArrowDownRight,
  MapPin, Coffee
} from "lucide-react";
import SimulationSidebar from "../SimulationSidebar";

interface Props { isActive: boolean; updateCursor?: (x: number, y: number, clicking?: boolean) => void; }

const CHART_DATA = {
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  scheduled: [32, 48, 56, 44, 60, 72, 40],
  actual:    [30, 46, 52, 42, 58, 68, 38],
};

const ACTIVITY = [
  { name: "Sarah Connor", action: "Clocked In", time: "2m ago", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
  { name: "Mike Johnson",  action: "Shift Swap Request", time: "8m ago", icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-50" },
  { name: "Emily Chen",    action: "Left for Break", time: "12m ago", icon: Coffee, color: "text-blue-500", bg: "bg-blue-50" },
  { name: "David Park",    action: "Clocked In Late", time: "18m ago", icon: Clock, color: "text-rose-500", bg: "bg-rose-50" },
  { name: "Lisa Wang",     action: "Approved Leave", time: "25m ago", icon: CheckCircle2, color: "text-indigo-500", bg: "bg-indigo-50" },
];

const ON_SHIFT = [
  { name: "Sarah Connor", role: "Manager", time: "09:00–17:00", initials: "SC", color: "bg-indigo-500" },
  { name: "John Smith",   role: "Cashier",  time: "10:00–18:00", initials: "JS", color: "bg-emerald-500" },
  { name: "Mike Johnson", role: "Stock",    time: "12:00–20:00", initials: "MJ", color: "bg-amber-500" },
  { name: "Emily Chen",   role: "Host",     time: "13:00–19:00", initials: "EC", color: "bg-pink-500" },
  { name: "David Park",   role: "Security", time: "08:00–16:00", initials: "DP", color: "bg-sky-500" },
];

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const prevRef = useRef(0);
  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    prevRef.current = end;
    if (start === end) return;
    const dur = 900;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.round(start + (end - start) * ease));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);
  return <>{display}{suffix}</>;
}

export default function SimulationDashboard({ isActive, updateCursor }: Props) {
  const [live, setLive] = useState({ staff: 42, coverage: 94, openShifts: 3, laborCost: 2840 });
  const [tick, setTick] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setTick(t => t + 1);
      // Simulate live data ticking
      setLive(prev => ({
        staff:      42 + Math.floor(Math.random() * 4),
        coverage:   92 + Math.floor(Math.random() * 8),
        openShifts: Math.max(0, prev.openShifts - (Math.random() > 0.7 ? 1 : 0)),
        laborCost:  2840 + Math.floor(Math.random() * 120),
      }));
      if (Math.random() > 0.6) {
        const msgs = [
          "🟢 David Park just clocked in",
          "🔄 Shift swap request from Mike Johnson",
          "⚠️ Coverage below 85% on Saturday",
          "✅ Open shift filled by Lisa Wang",
        ];
        setNotification(msgs[Math.floor(Math.random() * msgs.length)]);
        setTimeout(() => setNotification(null), 3500);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isActive]);

  const STATS = [
    { label: "Active Staff", value: live.staff, suffix: "", icon: Users, color: "text-indigo-600", bg: "from-indigo-50 to-indigo-100/50", trend: +3, up: true },
    { label: "Coverage", value: live.coverage, suffix: "%", icon: ShieldCheck, color: "text-emerald-600", bg: "from-emerald-50 to-emerald-100/50", trend: +2, up: true },
    { label: "Open Shifts", value: live.openShifts, suffix: "", icon: Zap, color: "text-amber-600", bg: "from-amber-50 to-amber-100/50", trend: -1, up: false },
    { label: "Labor Cost", value: live.laborCost, suffix: "", icon: TrendingUp, color: "text-purple-600", bg: "from-purple-50 to-purple-100/50", prefix: "$", trend: +2.4, up: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex pointer-events-none overflow-hidden bg-[#f4f3ff]"
    >
      <SimulationSidebar activeTab="dashboard" />

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <div className="h-14 flex-shrink-0 bg-white border-b border-slate-200 flex items-center px-6 gap-4">
          <div>
            <div className="text-base font-black text-slate-900 leading-tight">Real-Time Dashboard</div>
            <div className="text-[11px] text-slate-400 font-medium">Main Branch · Thursday, 15 May 2026</div>
          </div>
          <div className="flex-1" />
          {/* Live badge */}
          <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Live</span>
          </div>
          <div className="relative w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
            <Bell size={15} className="text-slate-500" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border border-white" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden p-5 space-y-4">

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-3">
            {STATS.map((s, i) => {
              const Icon = s.icon;
              const Trend = s.up ? ArrowUpRight : ArrowDownRight;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`bg-gradient-to-br ${s.bg} rounded-2xl p-4 border border-white shadow-sm`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-8 h-8 rounded-xl bg-white/80 flex items-center justify-center shadow-sm ${s.color}`}>
                      <Icon size={15} strokeWidth={2.5} />
                    </div>
                    <div className={`flex items-center gap-0.5 text-[10px] font-black ${s.up ? "text-emerald-600" : "text-rose-500"}`}>
                      <Trend size={11} />
                      {s.trend > 0 ? "+" : ""}{s.trend}%
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-800 leading-none mb-1">
                    {s.prefix}<AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{s.label}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Charts + On Shift */}
          <div className="grid grid-cols-3 gap-3">

            {/* Bar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm font-black text-slate-900">Weekly Hours Overview</div>
                  <div className="text-[10px] text-slate-400 font-medium">Scheduled vs Actual Hours</div>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm bg-indigo-500 inline-block" />Scheduled</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm bg-indigo-200 inline-block" />Actual</span>
                </div>
              </div>
              <div className="h-36 flex items-end gap-3">
                {CHART_DATA.days.map((day, i) => {
                  const h1 = CHART_DATA.scheduled[i];
                  const h2 = CHART_DATA.actual[i];
                  const max = 72;
                  const isToday = i === 3;
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div className="w-full flex items-end gap-0.5" style={{ height: "100%" }}>
                        <motion.div
                          animate={{ height: `${(h1 / max) * 100}%` }}
                          transition={{ type: "spring", stiffness: 80, damping: 14, delay: i * 0.05 }}
                          className={`flex-1 rounded-t-md ${isToday ? "bg-indigo-500" : "bg-indigo-200"}`}
                        />
                        <motion.div
                          animate={{ height: `${(h2 / max) * 100}%` }}
                          transition={{ type: "spring", stiffness: 80, damping: 14, delay: i * 0.05 + 0.1 }}
                          className={`flex-1 rounded-t-md ${isToday ? "bg-indigo-300" : "bg-slate-100"}`}
                        />
                      </div>
                      <span className={`text-[9px] font-black uppercase ${isToday ? "text-indigo-600" : "text-slate-400"}`}>{day}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* On Shift Now */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-black text-slate-900">On Shift Now</div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-emerald-600 font-bold">{ON_SHIFT.length} active</span>
                </div>
              </div>
              <div className="flex-1 space-y-2.5 overflow-hidden">
                <AnimatePresence>
                  {ON_SHIFT.map((s, i) => (
                    <motion.div
                      key={s.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.07 }}
                      className="flex items-center gap-2.5"
                    >
                      <div className={`w-7 h-7 rounded-full ${s.color} text-white text-[10px] font-black flex items-center justify-center flex-shrink-0 shadow-sm`}>
                        {s.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-bold text-slate-800 truncate">{s.name}</div>
                        <div className="text-[9px] text-slate-400 font-medium">{s.time} · {s.role}</div>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-black text-slate-900">Live Activity Feed</div>
              <div className="text-[10px] text-indigo-500 font-bold cursor-default">View All</div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-1">
              {ACTIVITY.map((a, i) => {
                const Icon = a.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.06 }}
                    className="flex-shrink-0 flex items-center gap-2.5 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5"
                  >
                    <div className={`w-6 h-6 rounded-full ${a.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={12} className={a.color} />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-800 whitespace-nowrap">{a.name}</div>
                      <div className="text-[9px] text-slate-400 font-medium whitespace-nowrap">{a.action} · {a.time}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Live notification toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute bottom-5 right-5 bg-[#0f0f1a] text-white text-[12px] font-bold px-4 py-3 rounded-2xl shadow-2xl border border-white/10 z-50 max-w-xs"
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
