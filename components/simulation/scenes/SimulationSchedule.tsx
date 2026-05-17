"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, CheckCircle2, ChevronDown, Clock, MapPin, UserSquare2, CalendarDays, AlertTriangle, Users, Filter } from "lucide-react";
import SimulationSidebar from "../SimulationSidebar";

interface Props { isActive: boolean; updateCursor?: (x: number, y: number, clicking?: boolean) => void; }

const DAYS = ["Mon 12", "Tue 13", "Wed 14", "Thu 15", "Fri 16", "Sat 17", "Sun 18"];
const TODAY_COL = 3; // Thu

const STAFF = [
  { name: "Sarah Connor",  role: "Manager",  initials: "SC", color: "bg-indigo-500",  textColor: "text-indigo-700",  bg: "bg-indigo-50",  border: "border-indigo-100" },
  { name: "John Smith",    role: "Cashier",  initials: "JS", color: "bg-emerald-500", textColor: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-100" },
  { name: "Mike Johnson",  role: "Stock",    initials: "MJ", color: "bg-amber-500",   textColor: "text-amber-700",   bg: "bg-amber-50",   border: "border-amber-100" },
  { name: "Emily Chen",    role: "Host",     initials: "EC", color: "bg-pink-500",    textColor: "text-pink-700",    bg: "bg-pink-50",    border: "border-pink-100" },
  { name: "David Park",    role: "Security", initials: "DP", color: "bg-sky-500",     textColor: "text-sky-700",     bg: "bg-sky-50",     border: "border-sky-100" },
];

// Pre-filled shifts indexed by [staffRow][dayCol]
const PREFILLED: Record<string, { time: string; label?: string }> = {
  "0-0": { time: "09:00–17:00" }, "0-1": { time: "09:00–17:00" }, "0-4": { time: "10:00–18:00" },
  "1-0": { time: "10:00–18:00" }, "1-2": { time: "10:00–18:00" }, "1-5": { time: "11:00–19:00" },
  "2-1": { time: "12:00–20:00" }, "2-3": { time: "12:00–20:00" }, "2-6": { time: "08:00–16:00" },
  "3-0": { time: "13:00–19:00" }, "3-2": { time: "09:00–15:00" }, "3-4": { time: "14:00–20:00" },
  "4-1": { time: "08:00–16:00" }, "4-3": { time: "08:00–16:00" }, "4-5": { time: "08:00–16:00" },
};

export default function SimulationSchedule({ isActive, updateCursor }: Props) {
  const [step, setStep] = useState(0);
  const [newShift, setNewShift] = useState<{ row: number; col: number } | null>(null);

  useEffect(() => {
    if (!isActive || !updateCursor) { setStep(0); setNewShift(null); return; }
    let isMounted = true;
    let t: any;

    const run = async () => {
      while (isMounted) {
        setStep(0); setNewShift(null);
        updateCursor(50, 50);
        await new Promise(r => { t = setTimeout(r, 1500); }); if (!isMounted) break;

        updateCursor(90, 8);
        await new Promise(r => { t = setTimeout(r, 700); }); if (!isMounted) break;
        updateCursor(90, 8, true);
        setStep(1); // open modal
        await new Promise(r => { t = setTimeout(r, 700); }); if (!isMounted) break;

        updateCursor(60, 52);
        await new Promise(r => { t = setTimeout(r, 600); }); if (!isMounted) break;
        updateCursor(60, 52, true);
        setStep(2); // dropdown open
        await new Promise(r => { t = setTimeout(r, 700); }); if (!isMounted) break;

        updateCursor(60, 58);
        await new Promise(r => { t = setTimeout(r, 400); }); if (!isMounted) break;
        updateCursor(60, 58, true);
        setStep(3); // selected Sarah
        await new Promise(r => { t = setTimeout(r, 700); }); if (!isMounted) break;

        updateCursor(60, 78);
        await new Promise(r => { t = setTimeout(r, 500); }); if (!isMounted) break;
        updateCursor(60, 78, true);
        setStep(4); // published → new shift appears
        setNewShift({ row: 0, col: TODAY_COL });
        await new Promise(r => { t = setTimeout(r, 4000); }); if (!isMounted) break;

        setStep(0); setNewShift(null);
      }
    };

    run();
    return () => { isMounted = false; clearTimeout(t); };
  }, [isActive, updateCursor]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 flex pointer-events-none overflow-hidden bg-[#f4f3ff]">
      <SimulationSidebar activeTab="schedule" />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-14 bg-white border-b border-slate-200 flex items-center px-5 gap-4 flex-shrink-0">
          <div>
            <div className="text-sm font-black text-slate-900">Team Schedule</div>
            <div className="text-[10px] text-slate-400 font-medium">May 12–18, 2026 · Main Branch</div>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
            <div className="px-3 py-1 bg-white rounded-md text-[11px] font-bold shadow-sm text-slate-800">Week</div>
            <div className="px-3 py-1 text-[11px] font-bold text-slate-400">Day</div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 border border-slate-200 bg-white px-3 py-1.5 rounded-lg font-bold">
            <Filter size={12} /> Filter
          </div>
          <div className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white font-bold text-[11px] rounded-xl shadow-md shadow-indigo-500/25">
            <Plus size={13} /> Add Shift
          </div>
        </div>

        {/* Summary row */}
        <div className="bg-white border-b border-slate-100 flex items-center px-5 py-2 gap-6">
          {[
            { label: "Total Shifts", val: "34", color: "text-indigo-600" },
            { label: "Hours Scheduled", val: "268 hrs", color: "text-slate-800" },
            { label: "Open Shifts", val: "2", color: "text-amber-600" },
            { label: "Coverage", val: "96%", color: "text-emerald-600" },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2">
              <span className={`text-sm font-black ${s.color}`}>{s.val}</span>
              <span className="text-[10px] text-slate-400 font-bold">{s.label}</span>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-1 text-[10px] text-amber-600 font-bold bg-amber-50 border border-amber-100 px-2 py-1 rounded-lg">
            <AlertTriangle size={10} /> 1 overtime risk
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-hidden flex flex-col p-3">
          {/* Day headers */}
          <div className="grid gap-1.5 mb-1.5" style={{ gridTemplateColumns: "120px repeat(7, 1fr)" }}>
            <div className="text-[10px] font-bold text-slate-400 px-2 py-1">Staff</div>
            {DAYS.map((d, i) => (
              <div key={d} className={`text-center py-1.5 rounded-lg text-[10px] font-black ${i === TODAY_COL ? "bg-indigo-600 text-white shadow-sm" : "text-slate-500"}`}>
                {d}
              </div>
            ))}
          </div>

          {/* Staff rows */}
          <div className="flex-1 overflow-y-auto space-y-1">
            {STAFF.map((staff, si) => (
              <div key={si} className="grid gap-1.5" style={{ gridTemplateColumns: "120px repeat(7, 1fr)" }}>
                {/* Staff avatar */}
                <div className="flex items-center gap-2 px-2 py-1">
                  <div className={`w-7 h-7 rounded-full ${staff.color} flex items-center justify-center text-[10px] font-black text-white flex-shrink-0 shadow-sm`}>
                    {staff.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold text-slate-800 truncate">{staff.name.split(" ")[0]}</div>
                    <div className="text-[8px] text-slate-400 font-medium truncate">{staff.role}</div>
                  </div>
                </div>

                {DAYS.map((_, di) => {
                  const key = `${si}-${di}`;
                  const shift = PREFILLED[key];
                  const isNew = newShift?.row === si && newShift?.col === di;
                  const isToday = di === TODAY_COL;

                  return (
                    <div key={di} className={`rounded-lg min-h-[48px] relative ${isToday ? "bg-indigo-50/50 border border-indigo-100/50" : "bg-white/50 border border-slate-100"}`}>
                      {shift && (
                        <div className={`h-full p-1.5 rounded-lg flex flex-col justify-between ${staff.bg} border ${staff.border}`}>
                          <div className={`text-[8px] font-black ${staff.textColor}`}>{shift.time}</div>
                          <div className={`text-[8px] font-bold ${staff.textColor} opacity-70`}>{staff.role}</div>
                        </div>
                      )}
                      {isNew && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`h-full p-1.5 rounded-lg flex flex-col justify-between bg-indigo-100 border-2 border-indigo-400 shadow-md`}
                        >
                          <div className="text-[8px] font-black text-indigo-700">09:00–15:00</div>
                          <div className="text-[8px] font-bold text-indigo-600">Just Added ✓</div>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {step >= 1 && step < 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-40 flex items-center justify-center">
            <motion.div initial={{ y: 24, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 10, scale: 0.96 }}
              className="w-[420px] bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <div className="font-black text-slate-900 text-base">Create New Shift</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">Main Branch · Thu, May 15</div>
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center"><Plus size={14} className="rotate-45 text-slate-500" /></div>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Date</label>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-[12px] font-bold text-slate-700">
                      <CalendarDays size={13} className="text-slate-400" /> Thu, May 15
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Time</label>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-[12px] font-bold text-slate-700">
                      <Clock size={13} className="text-slate-400" /> 09:00 – 15:00
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Location</label>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-[12px] font-bold text-slate-700">
                    <MapPin size={13} className="text-slate-400" /> Main Branch
                  </div>
                </div>
                <div className="relative">
                  <label className="text-[10px] font-black text-indigo-500 uppercase tracking-widest block mb-1">Assign To</label>
                  <div className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-[12px] font-bold ${step >= 2 ? "border-indigo-400 ring-2 ring-indigo-500/20 bg-white" : "border-slate-200 bg-slate-50 text-slate-600"}`}>
                    <div className="flex items-center gap-2">
                      {step < 3 ? (<><UserSquare2 size={14} className="text-slate-400" /> Open / Unassigned</>) : (<><div className="w-5 h-5 rounded-full bg-indigo-500 text-white text-[9px] font-black flex items-center justify-center">SC</div> Sarah Connor</>)}
                    </div>
                    <ChevronDown size={13} className="text-slate-400" />
                  </div>
                  <AnimatePresence>
                    {step === 2 && (
                      <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden z-50">
                        {STAFF.slice(0, 3).map((s, i) => (
                          <div key={i} className={`flex items-center gap-2.5 px-3 py-2.5 ${i === 0 ? "bg-indigo-50 border-l-2 border-indigo-500" : "hover:bg-slate-50"}`}>
                            <div className={`w-6 h-6 rounded-full ${s.color} text-white text-[9px] font-black flex items-center justify-center`}>{s.initials}</div>
                            <div className="flex-1">
                              <div className="text-[12px] font-bold text-slate-800">{s.name}</div>
                              <div className="text-[9px] text-slate-400">{s.role}</div>
                            </div>
                            <div className="text-[10px] text-slate-400 font-bold">{["32 hrs", "38 hrs", "40 hrs"][i]}</div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex gap-2">
                <div className="flex-1 py-2.5 rounded-xl border border-slate-200 text-center text-[12px] font-bold text-slate-500">Cancel</div>
                <div className={`flex-1 py-2.5 rounded-xl text-center text-[12px] font-bold transition-all ${step >= 3 ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25" : "bg-indigo-200 text-white"}`}>
                  Publish Shift
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            className="absolute top-5 right-5 z-50 flex items-center gap-3 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 max-w-xs">
            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={20} className="text-emerald-600" />
            </div>
            <div>
              <div className="text-[13px] font-black text-slate-900">Shift Published!</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Sarah Connor has been notified.</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
