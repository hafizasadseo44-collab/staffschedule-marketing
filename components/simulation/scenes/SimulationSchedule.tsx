"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, CheckCircle2, ChevronDown, Clock, MapPin, UserSquare2, CalendarDays } from "lucide-react";

interface SimulationScheduleProps {
  isActive: boolean;
  updateCursor?: (x: number, y: number, clicking?: boolean) => void;
}

export default function SimulationSchedule({ isActive, updateCursor }: SimulationScheduleProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isActive || !updateCursor) {
      setStep(0);
      return;
    }
    
    let isMounted = true;
    let timeoutId: any;

    const runLoop = async () => {
      while (isMounted) {
        setStep(0);
        updateCursor(50, 50); // reset cursor

        // 1. Move to "+ Add Shift" button in Top Header
        await new Promise(r => { timeoutId = setTimeout(r, 1000); });
        if (!isMounted) break;
        updateCursor(88, 12); // move to Add Shift
        await new Promise(r => { timeoutId = setTimeout(r, 1000); });
        if (!isMounted) break;
        updateCursor(88, 12, true); // click
        setStep(1); // Open modal
        
        // 2. Move to Assign dropdown in modal
        await new Promise(r => { timeoutId = setTimeout(r, 800); });
        if (!isMounted) break;
        updateCursor(58, 48); // move to dropdown
        await new Promise(r => { timeoutId = setTimeout(r, 600); });
        if (!isMounted) break;
        updateCursor(58, 48, true); // click
        setStep(2); // Open dropdown
        
        // 3. Select employee (Sarah Connor)
        await new Promise(r => { timeoutId = setTimeout(r, 800); });
        if (!isMounted) break;
        updateCursor(58, 55); // move to Sarah
        await new Promise(r => { timeoutId = setTimeout(r, 400); });
        if (!isMounted) break;
        updateCursor(58, 55, true); // click
        setStep(3); // Employee selected
        
        // 4. Move to Publish Shift button
        await new Promise(r => { timeoutId = setTimeout(r, 600); });
        if (!isMounted) break;
        updateCursor(50, 75); // move to publish btn
        await new Promise(r => { timeoutId = setTimeout(r, 600); });
        if (!isMounted) break;
        updateCursor(50, 75, true); // click
        setStep(4); // Modal closes, Pill appears, Toast appears
        
        // 5. Rest, then restart the loop
        await new Promise(r => { timeoutId = setTimeout(r, 4000); });
      }
    };

    runLoop();
    
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [isActive, updateCursor]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white flex flex-col pointer-events-none"
    >
      {/* Schedule Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Team Schedule</h2>
          <p className="text-sm text-slate-500 mt-1">October 15 - October 21, 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <div className="px-4 py-1.5 text-sm font-bold bg-white rounded shadow-sm text-slate-800">Week</div>
            <div className="px-4 py-1.5 text-sm font-bold text-slate-500">Day</div>
          </div>
          <div className="px-4 py-2 bg-indigo-600 text-white font-bold text-sm rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Shift
          </div>
        </div>
      </div>

      {/* Calendar Grid Container */}
      <div className="flex-1 overflow-hidden flex flex-col p-6 relative">
        {/* Days Header */}
        <div className="grid grid-cols-7 gap-4 mb-4">
          {["Mon 15", "Tue 16", "Wed 17", "Thu 18", "Fri 19", "Sat 20", "Sun 21"].map((day, i) => (
            <div key={day} className={`text-center py-2 rounded-lg font-bold text-sm ${i === 2 ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500'}`}>
              {day}
            </div>
          ))}
        </div>

        {/* Grid Body */}
        <div className="flex-1 grid grid-cols-7 gap-4 relative">
          {Array(7).fill(0).map((_, col) => (
            <div key={col} className="border border-slate-100 rounded-xl bg-slate-50/50 relative overflow-hidden flex flex-col gap-2 p-2">
              
              {/* Fake existing shifts */}
              {col === 0 && (
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 flex flex-col gap-1">
                  <span className="text-xs font-bold text-blue-700">09:00 - 17:00</span>
                  <span className="text-xs font-semibold text-blue-900">John Smith</span>
                  <span className="text-[10px] text-blue-600">Cashier</span>
                </div>
              )}
              {col === 1 && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 flex flex-col gap-1">
                  <span className="text-xs font-bold text-emerald-700">10:00 - 18:00</span>
                  <span className="text-xs font-semibold text-emerald-900">Mike Johnson</span>
                  <span className="text-[10px] text-emerald-600">Stock</span>
                </div>
              )}

              {/* Interaction Cell (Wednesday) */}
              {col === 2 && (
                <div className="h-full relative rounded-lg border-2 border-transparent transition-colors duration-300 hover:border-indigo-200 group">
                  {step === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center">
                        <Plus className="w-5 h-5" />
                      </div>
                    </div>
                  )}

                  {step >= 4 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 rounded-lg bg-indigo-50 border border-indigo-200 flex flex-col gap-1 shadow-sm mt-2"
                    >
                      <span className="text-xs font-bold text-indigo-700">09:00 - 15:00</span>
                      <span className="text-xs font-semibold text-indigo-900">Sarah Connor</span>
                      <span className="text-[10px] text-indigo-600">Manager</span>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {step >= 1 && step < 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-40 flex items-center justify-center"
          >
            <motion.div
              initial={{ y: 20, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 10, scale: 0.95 }}
              className="w-[450px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 text-lg">Create Shift</h3>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <Plus className="w-5 h-5 rotate-45" />
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div className="flex gap-4">
                  <div className="flex-1 space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Date</label>
                    <div className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700 flex items-center gap-2">
                       <CalendarDays className="w-4 h-4 text-slate-400" />
                       Wed, Oct 17
                    </div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Time</label>
                    <div className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700 flex items-center gap-2">
                       <Clock className="w-4 h-4 text-slate-400" />
                       09:00 - 15:00
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Location</label>
                  <div className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700 flex items-center gap-2">
                     <MapPin className="w-4 h-4 text-slate-400" />
                     Main Branch
                  </div>
                </div>

                {/* The Dropdown Interaction */}
                <div className="space-y-1.5 relative z-50">
                  <label className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Assign To</label>
                  <div className={`w-full px-3 py-2.5 rounded-xl border ${step >= 2 ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-300'} bg-white text-sm font-bold text-slate-800 flex items-center justify-between`}>
                     <div className="flex items-center gap-2">
                        {step < 3 ? (
                          <>
                             <UserSquare2 className="w-4 h-4 text-slate-400" />
                             Unassigned (Open Shift)
                          </>
                        ) : (
                          <>
                            <div className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px]">SC</div>
                            Sarah Connor
                          </>
                        )}
                     </div>
                     <ChevronDown className="w-4 h-4 text-slate-400" />
                  </div>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {step === 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden py-1 z-[100]"
                      >
                        <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 border-b border-slate-100">Staff</div>
                        <div className="px-3 py-2.5 hover:bg-indigo-50 flex items-center gap-2 cursor-pointer border-l-2 border-transparent hover:border-indigo-500">
                          <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">SC</div>
                          <span className="text-sm font-bold text-slate-800">Sarah Connor</span>
                          <span className="text-xs font-semibold text-slate-400 ml-auto">0 hrs</span>
                        </div>
                        <div className="px-3 py-2.5 hover:bg-slate-50 flex items-center gap-2 cursor-pointer">
                          <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold">JS</div>
                          <span className="text-sm font-medium text-slate-700">John Smith</span>
                          <span className="text-xs font-semibold text-slate-400 ml-auto">38 hrs</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="p-5 border-t border-slate-100 bg-slate-50 flex gap-3">
                <div className="flex-1 py-2.5 rounded-xl border border-slate-200 text-center font-bold text-sm text-slate-600">Cancel</div>
                <div className={`flex-1 py-2.5 rounded-xl text-center font-bold text-sm flex items-center justify-center gap-2 transition-colors ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-indigo-300 text-white'}`}>
                  Publish Shift
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-6 right-6 z-50 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-slate-100 p-4 flex gap-3 items-center max-w-sm"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Shift Published</h4>
              <p className="text-xs text-slate-500 mt-0.5">Sarah Connor has been notified.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
