"use client";

import React from "react";
import { Search, MapPin, Moon, Bell, MessageSquare, ChevronDown } from "lucide-react";

interface SimulationHeaderProps {
  locationName?: string;
  unreadCount?: number;
}

export default function SimulationHeader({ locationName = "Main Branch", unreadCount = 2 }: SimulationHeaderProps) {
  return (
    <header className="h-14 flex-shrink-0 flex items-center justify-between gap-4 px-6 bg-gradient-to-r from-[#F3E8FF] to-[#FAF5FF] border-b border-indigo-100/40 shadow-sm min-w-0 z-10 select-none cursor-default">
      {/* Search */}
      <div className="flex-1 min-w-0 max-w-sm relative group hidden sm:block">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400">
          <Search className="w-4 h-4" strokeWidth={2.5} />
        </span>
        <div className="w-full pl-10 pr-16 py-2 pointer-events-none rounded-xl border border-slate-200/60 bg-white/60 text-sm placeholder-slate-400 text-slate-400 flex items-center">
          Search...
        </div>
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
          <span className="px-1.5 py-0.5 border border-slate-200 rounded text-[10px] font-medium text-slate-400 bg-white shadow-sm">
            Ctrl
          </span>
          <span className="px-1.5 py-0.5 border border-slate-200 rounded text-[10px] font-medium text-slate-400 bg-white shadow-sm">
            K
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
        {/* Location Switcher */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-indigo-200/50 bg-white/60 text-indigo-900 transition-all hover:bg-white hover:border-indigo-300 hover:shadow-sm cursor-default">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-sm">
            <MapPin className="w-4 h-4" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col text-left mr-1">
            <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest leading-none mb-0.5">
              Workspace
            </span>
            <span className="text-[13px] font-bold max-w-[140px] truncate leading-none">
              {locationName}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-indigo-400 ml-1" strokeWidth={2.5} />
        </div>

        <div className="flex items-center gap-1.5 px-1 py-1 rounded-2xl">
          {/* Dark Mode */}
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-white/60 hover:text-amber-500 transition-colors">
            <Moon className="w-5 h-5" strokeWidth={2} />
          </div>

          {/* Notifications */}
          <div className="relative w-10 h-10 rounded-xl flex items-center justify-center text-indigo-500/80 hover:bg-white/60 hover:text-indigo-600 transition-colors">
            <Bell className="w-5 h-5" strokeWidth={2.5} />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#EF4444] border-[1.5px] border-white"></span>
              </span>
            )}
          </div>

          {/* Messages */}
          <div className="relative w-10 h-10 rounded-xl flex items-center justify-center text-indigo-500/80 hover:bg-white/60 hover:text-purple-600 transition-colors">
            <MessageSquare className="w-5 h-5" strokeWidth={2.5} />
          </div>
        </div>

        {/* Profile Avatar Header */}
        <div className="ml-2 flex flex-col items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] shadow-sm text-sm font-semibold text-white border-2 border-white relative cursor-default">
          JD
          <div className="absolute -bottom-0.5 -right-0.5 w-[14px] h-[14px] bg-emerald-500 border-2 border-white rounded-full"></div>
        </div>
      </div>
    </header>
  );
}
