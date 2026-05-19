"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Repeat, Check, X, Clock, HelpCircle, UserSquare2, ArrowRight } from "lucide-react";

interface SimulationShiftSwapsProps {
  isActive: boolean;
  updateCursor?: (x: number, y: number, clicking?: boolean) => void;
}

export default function SimulationShiftSwaps({ isActive, updateCursor }: SimulationShiftSwapsProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isActive || !updateCursor) {
      setStep(0);
      return;
    }

    const sequence = async () => {
      setStep(0);
      updateCursor(90, 80);

      // 1. Move to Approve button on first request
      await new Promise(r => setTimeout(r, 1500));
      updateCursor(85, 30);
      await new Promise(r => setTimeout(r, 600));
      updateCursor(85, 30, true);
      setStep(1); // Clicked approve

      // 2. Row animates to Approved state
      await new Promise(r => setTimeout(r, 1500));

      // 3. Move back to Dashboard sidebar link to restart loop
      updateCursor(10, 10);
      await new Promise(r => setTimeout(r, 800));
      updateCursor(10, 10, true);
    };

    sequence();
  }, [isActive, updateCursor]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 p-8 flex flex-col pointer-events-none"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="text-2xl font-bold text-slate-800 tracking-tight">Shift Swaps</div>
          <p className="text-sm text-slate-500 mt-1">Review and manage employee shift trade requests.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-widest">
           <div className="col-span-3">Requested By</div>
           <div className="col-span-1 flex justify-center"><Repeat className="w-4 h-4" /></div>
           <div className="col-span-3">Covered By</div>
           <div className="col-span-2">Shift Details</div>
           <div className="col-span-3 text-right">Actions</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col relative">
           
           {/* Row 1: The Interactive Target */}
           <motion.div 
             className={`grid grid-cols-12 gap-4 p-4 items-center border-b border-slate-100 transition-colors ${step >= 1 ? 'bg-emerald-50/50' : 'bg-white hover:bg-slate-50'}`}
           >
              {/* Requested By */}
              <div className="col-span-3 flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">SC</div>
                 <div>
                    <div className="font-bold text-slate-800 text-sm">Sarah Connor</div>
                    <p className="text-xs text-slate-500">Manager</p>
                 </div>
              </div>
              
              <div className="col-span-1 flex justify-center">
                 <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <ArrowRight className="w-4 h-4" />
                 </div>
              </div>

              {/* Covered By */}
              <div className="col-span-3 flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs shadow-sm">JS</div>
                 <div>
                    <div className="font-bold text-slate-800 text-sm">John Smith</div>
                    <p className="text-xs text-slate-500">Cashier +6 hrs OT</p>
                 </div>
              </div>

              {/* Details */}
              <div className="col-span-2">
                 <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-semibold text-xs mb-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    Fri, Oct 19
                 </div>
                 <p className="text-[11px] font-bold text-slate-400 ml-1">09:00 - 17:00</p>
              </div>

              {/* Actions */}
              <div className="col-span-3 flex justify-end items-center gap-2">
                 <AnimatePresence mode="wait">
                   {step === 0 ? (
                     <motion.div key="actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-2">
                        <div className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-bold text-sm bg-white shadow-sm flex items-center gap-1">
                           <X className="w-4 h-4 text-rose-500" /> Decline
                        </div>
                        <div className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-sm shadow-sm flex items-center gap-1 relative overflow-hidden group">
                           <Check className="w-4 h-4" /> Approve
                           {/* Hover ring simulation */}
                           <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                     </motion.div>
                   ) : (
                     <motion.div key="approved" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-sm">
                        <Check className="w-4 h-4" /> Approved
                     </motion.div>
                   )}
                 </AnimatePresence>
              </div>
           </motion.div>

           {/* Row 2: Inactive existing request */}
           <div className="grid grid-cols-12 gap-4 p-4 items-center bg-white">
              <div className="col-span-3 flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs shadow-sm">MB</div>
                 <div>
                    <div className="font-bold text-slate-800 text-sm">Mike Brown</div>
                    <p className="text-xs text-slate-500">Stock</p>
                 </div>
              </div>
              <div className="col-span-1 flex justify-center">
                 <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"><ArrowRight className="w-4 h-4" /></div>
              </div>
              <div className="col-span-3 flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-orange-100 border border-orange-200 border-dashed text-orange-500 flex items-center justify-center font-bold text-xs shadow-sm"><UserSquare2 className="w-5 h-5" /></div>
                 <div>
                    <div className="font-bold text-slate-800 text-sm italic">Unassigned</div>
                    <p className="text-xs text-amber-600">Drop Request</p>
                 </div>
              </div>
              <div className="col-span-2">
                 <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-semibold text-xs mb-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    Sun, Oct 21
                 </div>
                 <p className="text-[11px] font-bold text-slate-400 ml-1">10:00 - 16:00</p>
              </div>
              <div className="col-span-3 flex justify-end items-center gap-2">
                 <div className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-bold text-sm bg-white shadow-sm flex items-center gap-1">
                    <X className="w-4 h-4 text-rose-500" /> Decline
                 </div>
                 <div className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-sm shadow-sm flex items-center gap-1">
                    <Check className="w-4 h-4" /> Approve
                 </div>
              </div>
           </div>

        </div>
      </div>
    </motion.div>
  );
}
