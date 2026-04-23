"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronDown, Check, Users, TrendingUp } from "lucide-react";

const locations = [
  { name: "Downtown HQ", staff: 24, shifts: 12, color: "#6366f1" },
  { name: "Uptown Branch", staff: 18, shifts: 8, color: "#8b5cf6" },
  { name: "Airport Terminal", staff: 32, shifts: 16, color: "#10b981" },
];

const DemoLocations = () => {
  const [step, setStep] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    const durations = [2000, 1200, 800, 1500, 2000];
    const timer = setTimeout(() => {
      const next = (step + 1) % 5;
      if (next === 0) setSelectedIdx(0);
      setStep(next);
    }, durations[step] || 1500);
    return () => clearTimeout(timer);
  }, [step]);

  const showDropdown = step === 1;
  const showTransition = step >= 3;
  const showConfirm = step === 3;
  const active = step >= 2 ? 2 : selectedIdx;

  return (
    <div className="relative w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
            <MapPin className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-bold text-slate-800 dark:text-white">Locations</span>
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">3 Locations</span>
      </div>

      {/* Location Selector */}
      <div className="px-5 py-3 relative">
        <button className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors hover:border-brand-primary">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: locations[active].color }}></div>
            <span className="text-xs font-bold text-slate-700 dark:text-white">{locations[active].name}</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -5, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -5, scaleY: 0.95 }}
              className="absolute left-5 right-5 top-14 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-20 overflow-hidden"
            >
              {locations.map((loc, i) => (
                <motion.div
                  key={i}
                  animate={i === 2 ? { backgroundColor: ["rgba(0,0,0,0)", "rgba(16,185,129,0.1)"] } : {}}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: loc.color }}></div>
                    <span className="text-xs font-bold text-slate-700 dark:text-white">{loc.name}</span>
                  </div>
                  {i === active && <Check className="w-3.5 h-3.5 text-brand-primary" />}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 px-5 pb-4">
        {[
          { label: "Staff", value: locations[active].staff, icon: Users, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-900/30" },
          { label: "Active Shifts", value: locations[active].shifts, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/30" },
          { label: "Efficiency", value: "94%", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/30" },
        ].map((stat, i) => (
          <motion.div
            key={`${active}-${i}`}
            initial={showTransition ? { opacity: 0, y: 10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-3 rounded-xl ${stat.bg} text-center`}
          >
            <stat.icon className={`w-4 h-4 ${stat.color} mx-auto mb-1`} />
            <p className="text-lg font-black text-slate-800 dark:text-white">{stat.value}</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Location Cards */}
      <div className="px-5 pb-4 space-y-2">
        {locations.map((loc, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
              i === active
                ? "border-brand-primary/30 bg-indigo-50/50 dark:bg-indigo-900/20"
                : "border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800"
            }`}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold" style={{ background: loc.color }}>
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 dark:text-white">{loc.name}</p>
              <p className="text-[9px] text-slate-400">{loc.staff} staff · {loc.shifts} shifts</p>
            </div>
            {i === active && (
              <div className="w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Confirmation Toast */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 z-30"
          >
            <Check className="w-4 h-4" />
            <span className="text-xs font-bold">Location switched</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DemoLocations;
