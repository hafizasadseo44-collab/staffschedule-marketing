"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, ChevronLeft, ChevronRight } from "lucide-react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dates = [14, 15, 16, 17, 18, 19, 20];

const employees = [
  { name: "Sarah M.", initials: "SM", color: "#6366f1" },
  { name: "James K.", initials: "JK", color: "#8b5cf6" },
  { name: "Emily R.", initials: "ER", color: "#ec4899" },
];

const DemoSchedule = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const durations = [1500, 1200, 1500, 1200, 2000, 1500];
    const timer = setTimeout(() => {
      setStep((prev) => (prev + 1) % 6);
    }, durations[step] || 1500);
    return () => clearTimeout(timer);
  }, [step]);

  const showModal = step === 1 || step === 2;
  const showShift = step >= 3;
  const showToast = step === 4;

  return (
    <div className="relative w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <span className="text-sm font-bold text-slate-800 dark:text-white">Team Schedule</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700"><ChevronLeft className="w-3.5 h-3.5" /></button>
          <span className="font-semibold px-2">Jan 14 – 20, 2025</span>
          <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700"><ChevronRight className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-slate-100 dark:bg-slate-700">
        {days.map((day, i) => (
          <div key={day} className="bg-white dark:bg-slate-900 p-2 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase">{day}</p>
            <p className="text-xs font-black text-slate-700 dark:text-slate-300">{dates[i]}</p>
          </div>
        ))}
      </div>

      {/* Shift Rows */}
      <div className="grid grid-cols-7 gap-px bg-slate-100 dark:bg-slate-700 min-h-[120px]">
        {days.map((_, colIdx) => (
          <div key={colIdx} className="bg-white dark:bg-slate-900 p-1.5 min-h-[100px] relative">
            {/* Existing shifts */}
            {colIdx === 0 && (
              <div className="mb-1 px-1.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800">
                <p className="text-[9px] font-bold text-indigo-600">SM</p>
                <p className="text-[8px] text-slate-500">9AM-5PM</p>
              </div>
            )}
            {colIdx === 2 && (
              <div className="mb-1 px-1.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800">
                <p className="text-[9px] font-bold text-purple-600">JK</p>
                <p className="text-[8px] text-slate-500">10AM-6PM</p>
              </div>
            )}

            {/* Animated new shift */}
            {colIdx === 3 && showShift && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-1 px-1.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800"
              >
                <p className="text-[9px] font-bold text-emerald-600">ER</p>
                <p className="text-[8px] text-slate-500">8AM-4PM</p>
              </motion.div>
            )}

            {/* Click target highlight */}
            {colIdx === 3 && step === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="absolute inset-1 rounded-lg border-2 border-dashed border-brand-primary/50 flex items-center justify-center"
              >
                <Plus className="w-4 h-4 text-brand-primary/60" />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Assign Modal Overlay */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center z-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-4 border border-slate-200 dark:border-slate-700"
            >
              <h4 className="text-xs font-black text-slate-800 dark:text-white mb-3">Assign Shift</h4>
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800">
                  <div className="w-6 h-6 rounded-lg bg-pink-500 flex items-center justify-center text-white text-[9px] font-bold">ER</div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-800 dark:text-white">Emily R.</p>
                    <p className="text-[9px] text-slate-500">Available</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-[10px] mb-3">
                <div className="flex-1 p-1.5 bg-slate-50 dark:bg-slate-700 rounded-lg text-center font-bold text-slate-600 dark:text-slate-300">8:00 AM</div>
                <div className="flex-1 p-1.5 bg-slate-50 dark:bg-slate-700 rounded-lg text-center font-bold text-slate-600 dark:text-slate-300">4:00 PM</div>
              </div>
              <motion.button
                animate={step === 2 ? { scale: [1, 0.95, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-xs font-bold shadow-lg"
              >
                Assign Shift
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-14 right-3 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 z-30"
          >
            <Check className="w-4 h-4" />
            <span className="text-xs font-bold">Shift Assigned</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DemoSchedule;
