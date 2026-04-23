"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  Calendar,
  Layers,
  Repeat,
  Users,
  Building,
  MapPin,
  Megaphone,
  MessageSquare,
  BarChart3,
  FileText,
  Settings,
  CreditCard,
  HelpCircle,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

interface SimulationSidebarProps {
  activeTab?: string;
}

export default function SimulationSidebar({ activeTab = "dashboard" }: SimulationSidebarProps) {
  const navGroups = [
    {
      group: "Dashboard",
      items: [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard }]
    },
    {
      group: "Scheduling",
      items: [
        { id: "schedule", label: "Team Schedule", icon: CalendarDays },
        { id: "calendar", label: "Calendar", icon: Calendar },
        { id: "open-shifts", label: "Open Shifts", icon: Layers },
        { id: "shift-swaps", label: "Shift Swaps", icon: Repeat }
      ]
    },
    {
      group: "Team Management",
      icon: Users,
      items: [
        { id: "team", label: "Team Members", icon: Users },
        { id: "departments", label: "Departments", icon: Building },
        { id: "locations", label: "Locations", icon: MapPin }
      ]
    },
    {
      group: "Communication",
      icon: MessageSquare,
      items: [
        { id: "announcements", label: "Announcements", icon: Megaphone },
        { id: "chat", label: "Team Chat", icon: MessageSquare }
      ]
    },
    {
      group: "Insights",
      items: [
        { id: "analytics", label: "Analytics", icon: BarChart3 },
        { id: "reports", label: "Reports", icon: FileText }
      ]
    }
  ];

  return (
    <aside className="w-64 flex-shrink-0 h-full flex flex-col bg-gradient-to-b from-[#F3E8FF] text-slate-800 to-[#FAF5FF] border-r border-indigo-100/50 shadow-[8px_0_30px_-5px_rgba(139,92,246,0.1)] z-20 select-none">
      {/* Brand */}
      <div className="flex-shrink-0 flex items-center gap-3 px-5 py-5 min-h-[64px] border-b border-indigo-100/40">
        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </span>
        <span className="font-bold text-[16px] tracking-tight truncate flex-1">StaffSchedule.io</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1 scrollbar-hide">
        {navGroups.map((group, i) => (
          <div key={i} className="mb-1">
            {group.items.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`group flex items-center gap-3 px-3 mx-1 py-2.5 rounded-[10px] text-left transition-all duration-200 cursor-default ${
                    isActive
                      ? "bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white shadow-md shadow-purple-500/20 translate-x-1"
                      : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50 hover:translate-x-1"
                  }`}
                >
                  <span
                    className={`flex-shrink-0 w-[30px] h-[30px] rounded-md flex items-center justify-center transition-colors ${
                      isActive ? "text-white" : "text-slate-400 group-hover:text-indigo-600"
                    }`}
                  >
                    <Icon className="w-[18px] h-[18px]" strokeWidth={isActive ? 2.5 : 2.2} />
                  </span>
                  <span className={`font-semibold tracking-tight text-[14px] ${isActive ? "font-bold" : ""}`}>
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User Profile Footer */}
      <div className="flex-shrink-0 p-4 mt-auto border-t border-indigo-100/50">
        <div className="rounded-[12px] bg-white border border-slate-200 shadow-sm p-3 flex items-center gap-3 transition-all">
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center text-[15px] font-bold text-white shadow-sm border-2 border-white">
              JD
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-[14px] h-[14px] bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-bold truncate text-[14px] text-slate-800 tracking-tight leading-tight">
              Jane Doe
            </div>
            <div className="text-[11px] font-bold text-slate-500/80 truncate mt-0.5 tracking-wider uppercase">
              Owner
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
