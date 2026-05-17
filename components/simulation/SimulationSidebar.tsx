"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, CalendarDays, Calendar, Layers, Repeat,
  Users, Building, MapPin, Megaphone, MessageSquare,
  BarChart3, FileText, Settings, Bell, LogOut,
  ChevronRight, Star, Zap
} from "lucide-react";

interface SimulationSidebarProps {
  activeTab?: string;
}

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, badge: null },
    ],
  },
  {
    label: "Scheduling",
    items: [
      { id: "schedule", label: "Team Schedule", icon: CalendarDays, badge: "3 new" },
      { id: "calendar", label: "Calendar", icon: Calendar, badge: null },
      { id: "open-shifts", label: "Open Shifts", icon: Layers, badge: "2" },
      { id: "shift-swaps", label: "Shift Swaps", icon: Repeat, badge: null },
    ],
  },
  {
    label: "Team",
    items: [
      { id: "team", label: "Team Members", icon: Users, badge: null },
      { id: "departments", label: "Departments", icon: Building, badge: null },
      { id: "locations", label: "Locations", icon: MapPin, badge: null },
    ],
  },
  {
    label: "Communication",
    items: [
      { id: "announcements", label: "Announcements", icon: Megaphone, badge: "1" },
      { id: "chat", label: "Team Chat", icon: MessageSquare, badge: "5" },
    ],
  },
  {
    label: "Insights",
    items: [
      { id: "analytics", label: "Analytics", icon: BarChart3, badge: null },
      { id: "reports", label: "Reports", icon: FileText, badge: null },
    ],
  },
];

export default function SimulationSidebar({ activeTab = "dashboard" }: SimulationSidebarProps) {
  return (
    <aside className="w-[220px] flex-shrink-0 h-full flex flex-col bg-[#0f0f1a] text-white z-20 select-none overflow-hidden">

      {/* Brand Header */}
      <div className="flex-shrink-0 flex items-center gap-2.5 px-4 py-4 border-b border-white/5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-lg shadow-indigo-500/30 flex-shrink-0">
          <Zap size={15} className="text-white fill-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-black text-[13px] tracking-tight leading-none text-white">StaffSchedule</div>
          <div className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.15em] mt-0.5">.io</div>
        </div>
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
      </div>

      {/* Location Switcher */}
      <div className="px-3 py-3 border-b border-white/5">
        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl cursor-pointer hover:bg-white/8 transition-all">
          <MapPin size={13} className="text-indigo-400 flex-shrink-0" />
          <span className="text-[12px] font-bold text-white/80 flex-1 truncate">Main Branch</span>
          <ChevronRight size={11} className="text-white/30" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-4">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi}>
            <div className="px-3 mb-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-white/25">
              {group.label}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    animate={isActive ? { x: 0 } : { x: 0 }}
                    className={`relative flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-default transition-all duration-200 group ${
                      isActive
                        ? "bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/10 border border-[#6366f1]/30"
                        : "hover:bg-white/5"
                    }`}
                  >
                    {/* Active left indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gradient-to-b from-[#6366f1] to-[#8b5cf6] rounded-full"
                      />
                    )}

                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                      isActive
                        ? "bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] shadow-md shadow-indigo-500/30"
                        : "bg-white/5 group-hover:bg-white/10"
                    }`}>
                      <Icon size={14} className={isActive ? "text-white" : "text-white/40 group-hover:text-white/60"} strokeWidth={isActive ? 2.5 : 2} />
                    </div>

                    <span className={`flex-1 text-[12.5px] font-semibold transition-colors truncate ${
                      isActive ? "text-white font-bold" : "text-white/45 group-hover:text-white/70"
                    }`}>
                      {item.label}
                    </span>

                    {item.badge && (
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full flex-shrink-0 ${
                        isActive
                          ? "bg-[#6366f1] text-white"
                          : "bg-white/10 text-white/50"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Upgrade Banner */}
      <div className="px-3 pb-3">
        <div className="relative rounded-xl overflow-hidden p-3"
          style={{ background: "linear-gradient(135deg, #4338ca22, #7c3aed22)", border: "1px solid rgba(99,102,241,0.2)" }}>
          <div className="flex items-center gap-2 mb-2">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            <span className="text-[11px] font-black text-white">Pro Plan Active</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-2">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
              initial={{ width: "0%" }}
              animate={{ width: "72%" }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            />
          </div>
          <div className="text-[9px] text-white/40 font-bold">36 of 50 staff slots used</div>
        </div>
      </div>

      {/* User Footer */}
      <div className="flex-shrink-0 px-3 pb-4 border-t border-white/5 pt-3">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-white/5 transition-all cursor-default">
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-[11px] font-black text-white shadow-md">
              JD
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#0f0f1a] rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-bold text-white truncate leading-tight">Jane Doe</div>
            <div className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider">Owner</div>
          </div>
          <Settings size={13} className="text-white/20 flex-shrink-0 hover:text-white/50 transition-colors" />
        </div>
      </div>
    </aside>
  );
}
