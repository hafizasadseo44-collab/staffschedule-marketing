"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Calendar, MessageSquare, MapPin, Megaphone,
  BarChart3, Users, Clock, ArrowUpRight, ArrowDownRight,
  Bell, Check, ChevronRight, TrendingUp, Shield, Zap,
  MousePointer2, Send, Plus, Building2, RefreshCw
} from "lucide-react";

// ──────────────────── SCENE DATA ────────────────────

const scenesMeta = [
  { name: "Dashboard", icon: LayoutDashboard, duration: 5000 },
  { name: "Schedule", icon: Calendar, duration: 5500 },
  { name: "Team Chat", icon: MessageSquare, duration: 5000 },
  { name: "Locations", icon: MapPin, duration: 4500 },
  { name: "Announcements", icon: Megaphone, duration: 4500 },
  { name: "Analytics", icon: BarChart3, duration: 5000 },
  { name: "Departments", icon: Building2, duration: 4500 },
  { name: "Shift Swaps", icon: RefreshCw, duration: 5000 },
];

// ──────────────────── SIDEBAR ────────────────────

const Sidebar = ({ active }: { active: number }) => (
  <div className="w-[52px] bg-[#0F172A] flex flex-col items-center py-3 gap-1 flex-shrink-0">
    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center mb-4">
      <span className="text-white font-black text-[8px]">SS</span>
    </div>
    {scenesMeta.map((s, i) => (
      <motion.div
        key={i}
        animate={i === active ? { scale: 1, backgroundColor: "rgba(79,70,229,0.2)" } : { scale: 1, backgroundColor: "transparent" }}
        className={`w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-colors ${
          i === active ? "text-[#818CF8]" : "text-slate-500 hover:text-slate-300"
        }`}
      >
        <s.icon className="w-4 h-4" />
      </motion.div>
    ))}
  </div>
);

// ──────────────────── DASHBOARD SCENE ────────────────────

const DashboardScene = () => {
  const [countUp, setCountUp] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setCountUp(p => Math.min(p + 3, 100)), 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-black text-slate-900">Welcome back, Admin 👋</h2>
          <p className="text-[10px] text-slate-400">Downtown HQ · Today</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Bell className="w-4 h-4 text-slate-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 flex items-center justify-center text-[6px] text-white font-bold">3</div>
          </div>
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center text-white text-[8px] font-bold">AD</div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { label: "Total Shifts", value: "48", change: "+12%", up: true, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Hours", value: `${Math.round(countUp * 1.56)}h`, change: "+8%", up: true, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "On Leave", value: "3", change: "-2", up: false, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Efficiency", value: `${Math.min(countUp, 94)}%`, change: "+5%", up: true, color: "text-violet-600", bg: "bg-violet-50" },
        ].map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="bg-white rounded-xl p-2.5 border border-slate-100 shadow-sm"
          >
            <div className={`w-6 h-6 rounded-lg ${kpi.bg} flex items-center justify-center ${kpi.color} mb-1.5`}>
              {[Calendar, Clock, Users, TrendingUp][i] && React.createElement([Calendar, Clock, Users, TrendingUp][i], { className: "w-3 h-3" })}
            </div>
            <p className="text-base font-black text-slate-900 leading-none">{kpi.value}</p>
            <p className="text-[8px] text-slate-400 font-semibold mt-0.5">{kpi.label}</p>
            <div className={`flex items-center gap-0.5 mt-1 ${kpi.up ? "text-emerald-500" : "text-red-500"}`}>
              {kpi.up ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
              <span className="text-[7px] font-bold">{kpi.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mini Chart + Upcoming */}
      <div className="grid grid-cols-2 gap-2">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-2">Weekly Hours</p>
          <div className="flex items-end gap-1 h-12">
            {[40, 65, 50, 80, 70, 90, 55].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                className="flex-1 bg-gradient-to-t from-[#4F46E5] to-[#818CF8] rounded-t-sm"
              />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span key={i} className="text-[7px] text-slate-400 font-semibold flex-1 text-center">{d}</span>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-2">Upcoming</p>
          {[
            { name: "Sarah M.", time: "9 AM", role: "Server" },
            { name: "James K.", time: "10 AM", role: "Host" },
            { name: "Emily R.", time: "11 AM", role: "Manager" },
          ].map((u, i) => (
            <div key={i} className="flex items-center gap-2 py-1 border-b border-slate-50 last:border-0">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white text-[7px] font-bold flex items-center justify-center">{u.name.split(" ").map(n => n[0]).join("")}</div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-bold text-slate-700 truncate">{u.name}</p>
                <p className="text-[7px] text-slate-400">{u.time} · {u.role}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// ──────────────────── SCHEDULE SCENE ────────────────────

const ScheduleScene = () => {
  const [assigned, setAssigned] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAssigned(true), 2500);
    return () => clearTimeout(t);
  }, []);

  const days = ["Mon 14", "Tue 15", "Wed 16", "Thu 17", "Fri 18", "Sat 19", "Sun 20"];

  return (
    <div className="flex-1 p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center">
            <Calendar className="w-3 h-3 text-white" />
          </div>
          <div>
            <h2 className="text-xs font-black text-slate-900">Team Schedule</h2>
            <p className="text-[8px] text-slate-400">Jan 14 – 20, 2025</p>
          </div>
        </div>
        <motion.button
          animate={assigned ? { scale: [1, 1.05, 1] } : {}}
          className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white text-[9px] font-bold shadow-md"
        >
          Publish (3)
        </motion.button>
      </div>

      {/* Calendar Header */}
      <div className="grid grid-cols-7 gap-px bg-slate-100 rounded-t-lg overflow-hidden">
        {days.map(d => (
          <div key={d} className="bg-white py-1.5 text-center">
            <p className="text-[8px] font-bold text-slate-500">{d}</p>
          </div>
        ))}
      </div>

      {/* Calendar Rows */}
      {["Sarah M.", "James K.", "Emily R."].map((emp, row) => (
        <div key={row} className="grid grid-cols-7 gap-px bg-slate-100">
          {days.map((_, col) => (
            <div key={col} className="bg-white p-1 min-h-[32px] relative">
              {/* Pre-filled shifts */}
              {row === 0 && col === 0 && (
                <div className="px-1 py-0.5 rounded bg-indigo-50 border border-indigo-100">
                  <p className="text-[7px] font-bold text-indigo-600">9-5 PM</p>
                </div>
              )}
              {row === 1 && col === 2 && (
                <div className="px-1 py-0.5 rounded bg-purple-50 border border-purple-100">
                  <p className="text-[7px] font-bold text-purple-600">10-6 PM</p>
                </div>
              )}
              {row === 0 && col === 4 && (
                <div className="px-1 py-0.5 rounded bg-emerald-50 border border-emerald-100">
                  <p className="text-[7px] font-bold text-emerald-600">8-4 PM</p>
                </div>
              )}

              {/* Newly assigned shift */}
              {row === 2 && col === 3 && assigned && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-1 py-0.5 rounded bg-pink-50 border border-pink-200"
                >
                  <p className="text-[7px] font-bold text-pink-600">8-4 PM</p>
                </motion.div>
              )}

              {/* Pulsing target */}
              {row === 2 && col === 3 && !assigned && (
                <motion.div
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0.5 rounded border border-dashed border-[#4F46E5]/40 flex items-center justify-center"
                >
                  <Plus className="w-2.5 h-2.5 text-[#4F46E5]/40" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Toast */}
      <AnimatePresence>
        {assigned && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl"
          >
            <Check className="w-3 h-3 text-emerald-500" />
            <span className="text-[9px] font-bold text-emerald-700">Emily R. assigned to Thu 8-4 PM</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ──────────────────── TEAM CHAT SCENE ────────────────────

const TeamChatScene = () => {
  const msg = "Can you cover tomorrow's shift?";
  const reply = "Sure, I'll be there! 👍";
  const [typed, setTyped] = useState(0);
  const [showReply, setShowReply] = useState(false);

  useEffect(() => {
    if (typed < msg.length) {
      const t = setTimeout(() => setTyped(p => p + 1), 50);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setShowReply(true), 1500);
      return () => clearTimeout(t);
    }
  }, [typed]);

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Contacts */}
      <div className="w-[100px] border-r border-slate-100 bg-slate-50 flex-shrink-0">
        <div className="p-2 border-b border-slate-100">
          <p className="text-[9px] font-black text-slate-800">Messages</p>
        </div>
        {[
          { n: "Sarah M.", init: "SM", active: true },
          { n: "Team HR", init: "TH", active: false },
          { n: "James K.", init: "JK", active: false },
        ].map((c, i) => (
          <div key={i} className={`flex items-center gap-1.5 px-2 py-1.5 ${c.active ? "bg-indigo-50" : ""}`}>
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white text-[7px] font-bold flex items-center justify-center">{c.init}</div>
            <p className={`text-[8px] font-bold truncate ${c.active ? "text-[#4F46E5]" : "text-slate-600"}`}>{c.n}</p>
          </div>
        ))}
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        <div className="px-3 py-2 border-b border-slate-100 flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-500 text-white text-[7px] font-bold flex items-center justify-center">SM</div>
          <div>
            <p className="text-[9px] font-bold text-slate-800">Sarah M.</p>
            <p className="text-[7px] text-emerald-500 font-semibold">Online</p>
          </div>
        </div>

        <div className="flex-1 p-3 flex flex-col justify-end gap-1.5">
          <div className="flex items-end gap-1">
            <div className="w-4 h-4 rounded bg-indigo-500 text-white text-[6px] font-bold flex items-center justify-center flex-shrink-0">SM</div>
            <div className="bg-slate-100 px-2 py-1 rounded-xl rounded-bl-sm max-w-[70%]">
              <p className="text-[9px] text-slate-600">Hey! What time works?</p>
            </div>
          </div>

          {typed > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-1 justify-end">
              <div className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] px-2 py-1 rounded-xl rounded-br-sm max-w-[70%]">
                <p className="text-[9px] text-white">{msg.slice(0, typed)}{typed < msg.length && <span className="animate-pulse">|</span>}</p>
              </div>
            </motion.div>
          )}

          {showReply && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-end gap-1">
              <div className="w-4 h-4 rounded bg-indigo-500 text-white text-[6px] font-bold flex items-center justify-center flex-shrink-0">SM</div>
              <div className="bg-slate-100 px-2 py-1 rounded-xl rounded-bl-sm max-w-[70%]">
                <p className="text-[9px] text-slate-600">{reply}</p>
              </div>
            </motion.div>
          )}
        </div>

        <div className="flex items-center gap-1.5 px-2 py-1.5 border-t border-slate-100">
          <div className="flex-1 bg-slate-50 rounded-lg px-2 py-1 text-[8px] text-slate-400 border border-slate-200">Message...</div>
          <div className="w-6 h-6 rounded-lg bg-[#4F46E5] flex items-center justify-center text-white"><Send className="w-3 h-3" /></div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────── LOCATIONS SCENE ────────────────────

const LocationsScene = () => {
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setSelected(1), 2000);
    return () => clearTimeout(t);
  }, []);

  const locs = [
    { name: "Downtown HQ", staff: 24, shifts: 12, color: "#4F46E5" },
    { name: "Airport Terminal", staff: 32, shifts: 16, color: "#10B981" },
    { name: "Uptown Branch", staff: 18, shifts: 8, color: "#7C3AED" },
  ];

  return (
    <div className="flex-1 p-4 overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
          <MapPin className="w-3 h-3 text-white" />
        </div>
        <h2 className="text-xs font-black text-slate-900">Locations</h2>
      </div>

      <div className="space-y-2 mb-3">
        {locs.map((l, i) => (
          <motion.div
            key={i}
            animate={i === selected ? { borderColor: l.color, scale: 1.02 } : { borderColor: "#f1f5f9", scale: 1 }}
            className="flex items-center gap-2 p-2 rounded-xl border-2 bg-white transition-all"
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white" style={{ background: l.color }}>
              <MapPin className="w-3 h-3" />
            </div>
            <div className="flex-1">
              <p className="text-[9px] font-bold text-slate-800">{l.name}</p>
              <p className="text-[7px] text-slate-400">{l.staff} staff · {l.shifts} shifts</p>
            </div>
            {i === selected && <Check className="w-3.5 h-3.5 text-[#4F46E5]" />}
          </motion.div>
        ))}
      </div>

      <motion.div
        key={selected}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 gap-2"
      >
        <div className="p-2 rounded-lg bg-indigo-50 text-center">
          <p className="text-sm font-black text-slate-800">{locs[selected].staff}</p>
          <p className="text-[7px] text-slate-500 font-bold">Staff</p>
        </div>
        <div className="p-2 rounded-lg bg-emerald-50 text-center">
          <p className="text-sm font-black text-slate-800">{locs[selected].shifts}</p>
          <p className="text-[7px] text-slate-500 font-bold">Active Shifts</p>
        </div>
      </motion.div>
    </div>
  );
};

// ──────────────────── ANNOUNCEMENTS SCENE ────────────────────

const AnnouncementsScene = () => {
  const text = "Holiday schedule — Dec 25 shifts are optional.";
  const [typed, setTyped] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (typed < text.length) {
      const t = setTimeout(() => setTyped(p => p + 1), 35);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setSent(true), 800);
      return () => clearTimeout(t);
    }
  }, [typed]);

  return (
    <div className="flex-1 p-4 overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
          <Megaphone className="w-3 h-3 text-white" />
        </div>
        <h2 className="text-xs font-black text-slate-900">Announcements</h2>
        <div className="ml-auto relative">
          <Bell className="w-3.5 h-3.5 text-slate-400" />
          <motion.div key={sent ? "2" : "1"} initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 text-[6px] text-white font-bold flex items-center justify-center">{sent ? 2 : 1}</motion.div>
        </div>
      </div>

      {/* Composer */}
      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200 mb-3">
        <div className="min-h-[24px] text-[9px] text-slate-600 mb-1.5">
          {typed > 0 && !sent ? (
            <span>{text.slice(0, typed)}<span className="animate-pulse text-[#4F46E5]">|</span></span>
          ) : (
            <span className="text-slate-400">Write announcement...</span>
          )}
        </div>
        <div className="flex justify-end">
          <motion.div
            animate={typed >= text.length && !sent ? { scale: [1, 0.9, 1] } : {}}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[8px] font-bold ${
              typed > 0 ? "bg-[#4F46E5] text-white" : "bg-slate-200 text-slate-400"
            }`}
          >
            <Send className="w-2.5 h-2.5" /> Send
          </motion.div>
        </div>
      </div>

      {/* Feed */}
      <AnimatePresence>
        {sent && (
          <motion.div initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} className="p-2 rounded-xl bg-amber-50 border border-amber-200 mb-2">
            <div className="flex items-center gap-1 mb-1">
              <div className="w-4 h-4 rounded bg-amber-500 text-white text-[6px] font-bold flex items-center justify-center">AD</div>
              <span className="text-[8px] font-bold text-slate-700">You</span>
              <span className="text-[7px] text-slate-400 ml-auto">Just now</span>
            </div>
            <p className="text-[8px] text-slate-600">{text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 mb-2">
        <div className="flex items-center gap-1 mb-1">
          <div className="w-4 h-4 rounded bg-indigo-500 text-white text-[6px] font-bold flex items-center justify-center">SM</div>
          <span className="text-[8px] font-bold text-slate-700">Sarah M.</span>
          <span className="text-[7px] text-slate-400 ml-auto">2h ago</span>
        </div>
        <p className="text-[8px] text-slate-500">Team meeting moved to 3 PM.</p>
      </div>
    </div>
  );
};

// ──────────────────── ANALYTICS SCENE ────────────────────

const AnalyticsScene = () => (
  <div className="flex-1 p-4 overflow-hidden">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center">
        <BarChart3 className="w-3 h-3 text-white" />
      </div>
      <h2 className="text-xs font-black text-slate-900">Analytics</h2>
    </div>

    {/* Metric Cards */}
    <div className="grid grid-cols-3 gap-2 mb-3">
      {[
        { label: "Labor Cost", value: "$12.4K", color: "text-indigo-600" },
        { label: "Overtime", value: "24h", color: "text-amber-600" },
        { label: "Fill Rate", value: "96%", color: "text-emerald-600" },
      ].map((m, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="bg-white rounded-xl p-2 border border-slate-100 text-center shadow-sm">
          <p className={`text-sm font-black ${m.color}`}>{m.value}</p>
          <p className="text-[7px] text-slate-400 font-bold mt-0.5">{m.label}</p>
        </motion.div>
      ))}
    </div>

    {/* Chart */}
    <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-2">Staff vs Hours Trend</p>
      <div className="flex items-end gap-1.5 h-16">
        {[35, 55, 45, 70, 60, 85, 75, 90, 65, 80, 70, 95].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: "easeOut" }}
            className={`flex-1 rounded-t-sm ${i % 2 === 0 ? "bg-gradient-to-t from-[#4F46E5] to-[#818CF8]" : "bg-gradient-to-t from-[#7C3AED] to-[#A78BFA]"}`}
          />
        ))}
      </div>
    </div>
  </div>
);

// ──────────────────── DEPARTMENTS SCENE ────────────────────

const DepartmentsScene = () => (
  <div className="flex-1 p-4 overflow-hidden">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
        <Building2 className="w-3 h-3 text-white" />
      </div>
      <h2 className="text-xs font-black text-slate-900">Departments</h2>
    </div>

    <div className="space-y-2">
      {[
        { name: "Kitchen", staff: 8, color: "#EF4444", icon: "🍳" },
        { name: "Front of House", staff: 12, color: "#3B82F6", icon: "🎯" },
        { name: "Management", staff: 4, color: "#7C3AED", icon: "💼" },
        { name: "Delivery", staff: 6, color: "#10B981", icon: "🚚" },
      ].map((d, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 }}
          className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-100 shadow-sm"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: `${d.color}15` }}>
            {d.icon}
          </div>
          <div className="flex-1">
            <p className="text-[9px] font-bold text-slate-800">{d.name}</p>
            <p className="text-[7px] text-slate-400">{d.staff} members</p>
          </div>
          <div className="flex -space-x-1">
            {Array.from({ length: Math.min(d.staff, 3) }).map((_, j) => (
              <div key={j} className="w-5 h-5 rounded-full border-2 border-white" style={{ background: d.color, opacity: 0.3 + j * 0.3 }}></div>
            ))}
          </div>
          <ChevronRight className="w-3 h-3 text-slate-300" />
        </motion.div>
      ))}
    </div>
  </div>
);

// ──────────────────── SHIFT SWAPS SCENE ────────────────────

const ShiftSwapsScene = () => {
  const [approved, setApproved] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setApproved(true), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex-1 p-4 overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
          <RefreshCw className="w-3 h-3 text-white" />
        </div>
        <h2 className="text-xs font-black text-slate-900">Shift Swaps</h2>
        <span className="ml-auto text-[8px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">2 Pending</span>
      </div>

      {/* Swap Request */}
      <motion.div
        animate={approved ? { borderColor: "#10B981" } : { borderColor: "#FCD34D" }}
        className="p-3 rounded-xl bg-white border-2 shadow-sm mb-2"
      >
        <div className="flex items-center justify-between mb-2">
          <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${approved ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
            {approved ? "✅ Approved" : "⏳ Pending"}
          </span>
          <span className="text-[7px] text-slate-400">5 min ago</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-center flex-1">
            <div className="w-8 h-8 mx-auto rounded-lg bg-pink-500 text-white text-[8px] font-bold flex items-center justify-center mb-1">ER</div>
            <p className="text-[8px] font-bold text-slate-700">Emily R.</p>
            <p className="text-[7px] text-slate-400">Thu 8-4 PM</p>
          </div>
          <motion.div animate={{ rotate: [0, 180, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
            <RefreshCw className="w-4 h-4 text-[#4F46E5]" />
          </motion.div>
          <div className="text-center flex-1">
            <div className="w-8 h-8 mx-auto rounded-lg bg-indigo-500 text-white text-[8px] font-bold flex items-center justify-center mb-1">SM</div>
            <p className="text-[8px] font-bold text-slate-700">Sarah M.</p>
            <p className="text-[7px] text-slate-400">Fri 9-5 PM</p>
          </div>
        </div>
        {!approved && (
          <div className="flex gap-1.5 mt-2">
            <motion.button animate={{ scale: [1, 1.03, 1] }} transition={{ delay: 2, duration: 0.3 }} className="flex-1 py-1 rounded-lg bg-emerald-500 text-white text-[8px] font-bold">Approve</motion.button>
            <button className="flex-1 py-1 rounded-lg bg-slate-100 text-slate-500 text-[8px] font-bold">Deny</button>
          </div>
        )}
      </motion.div>

      {/* Second request */}
      <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[8px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">⏳ Pending</span>
          <span className="text-[7px] text-slate-400">1h ago</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-center flex-1">
            <div className="w-7 h-7 mx-auto rounded-lg bg-purple-500 text-white text-[7px] font-bold flex items-center justify-center mb-1">JK</div>
            <p className="text-[8px] font-bold text-slate-700">James K.</p>
          </div>
          <RefreshCw className="w-3 h-3 text-slate-300" />
          <div className="text-center flex-1">
            <div className="w-7 h-7 mx-auto rounded-lg bg-teal-500 text-white text-[7px] font-bold flex items-center justify-center mb-1">LT</div>
            <p className="text-[8px] font-bold text-slate-700">Lisa T.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────── SCENE REGISTRY ────────────────────

const scenes = [
  DashboardScene,
  ScheduleScene,
  TeamChatScene,
  LocationsScene,
  AnnouncementsScene,
  AnalyticsScene,
  DepartmentsScene,
  ShiftSwapsScene,
];

// ──────────────────── MAIN COMPONENT ────────────────────

const FullProductDemo = () => {
  const [sceneIdx, setSceneIdx] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSceneIdx((prev) => (prev + 1) % scenes.length);
    }, scenesMeta[sceneIdx].duration);
    return () => clearTimeout(timer);
  }, [sceneIdx]);

  const SceneComponent = scenes[sceneIdx];

  return (
    <div className="w-full aspect-[16/10] bg-[#F8FAFC] rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl relative flex select-none">
      {/* App Sidebar */}
      <Sidebar active={sceneIdx} />

      {/* Scene Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#F8FAFC]">
        {/* Top Chrome Bar */}
        <div className="h-7 bg-white border-b border-slate-100 flex items-center px-3 gap-1 flex-shrink-0">
          <div className="w-2 h-2 rounded-full bg-red-400"></div>
          <div className="w-2 h-2 rounded-full bg-amber-400"></div>
          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          <div className="flex-1 flex justify-center">
            <div className="bg-slate-50 rounded-md px-6 py-0.5 text-[8px] text-slate-400 font-medium">app.staffschedule.io</div>
          </div>
        </div>

        {/* Animated Scene */}
        <AnimatePresence mode="wait">
          <motion.div
            key={sceneIdx}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex overflow-hidden"
          >
            <SceneComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Simulated Cursor */}
      <motion.div
        animate={{
          x: [60 + sceneIdx * 15, 120 + sceneIdx * 10],
          y: [80 + sceneIdx * 8, 140 + sceneIdx * 5],
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute z-50 pointer-events-none"
      >
        <MousePointer2 className="w-5 h-5 text-[#4F46E5] fill-white drop-shadow-lg" />
      </motion.div>

      {/* Scene Label */}
      <motion.div
        key={`label-${sceneIdx}`}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute bottom-3 left-16 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-slate-100 flex items-center gap-2 z-40"
      >
        <div className="w-2 h-2 rounded-full bg-[#4F46E5] animate-pulse"></div>
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-700">
          {scenesMeta[sceneIdx].name}
        </span>
      </motion.div>

      {/* Progress Bar */}
      <div className="absolute top-7 left-[52px] right-0 h-0.5 bg-slate-100 z-50">
        <motion.div
          key={`progress-${sceneIdx}`}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: scenesMeta[sceneIdx].duration / 1000, ease: "linear" }}
          className="h-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]"
        />
      </div>
    </div>
  );
};

export default FullProductDemo;
