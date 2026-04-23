"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, CheckCircle2, ChevronDown, Clock, MapPin, UserSquare2, CalendarDays } from "lucide-react";

export default function Step2Schedule() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let isMounted = true;
    
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 600));
      if (!isMounted) return;
      
      // 1. Hover empty slot and click
      setStep(1); 
      
      // 2. Open dropdown
      await new Promise(r => setTimeout(r, 800));
      if (!isMounted) return;
      setStep(2);

      // 3. Select employee
      await new Promise(r => setTimeout(r, 800));
      if (!isMounted) return;
      setStep(3);

      // 4. Publish
      await new Promise(r => setTimeout(r, 800));
      if (!isMounted) return;
      setStep(4);
    };

    sequence();
    return () => { isMounted = false; };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-[#F4F0FC] p-6 sm:p-8 flex flex-col font-sans overflow-hidden"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
           <h3 className="text-xl font-bold text-slate-900 tracking-tight">Team Schedule</h3>
           <p className="text-sm text-slate-500">Drag & drop or auto-fill shifts.</p>
        </div>
        <div className="px-4 py-2 bg-indigo-600 text-white font-bold text-sm rounded-xl shadow-sm flex items-center gap-2">
           <Plus className="w-4 h-4" /> Add Shift
        </div>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Calendar Header */}
        <div className="grid grid-cols-5 gap-4 p-4 border-b border-slate-100 bg-slate-50/50">
           {["Mon 12", "Tue 13", "Wed 14", "Thu 15", "Fri 16"].map((day, i) => (
             <div key={day} className={`text-center py-2 rounded-lg font-bold text-xs ${i === 2 ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500'}`}>
               {day}
             </div>
           ))}
        </div>
        
        {/* Calendar Body */}
        <div className="flex-1 grid grid-cols-5 gap-4 p-4 relative">
           {Array(5).fill(0).map((_, col) => (
             <div key={col} className="border border-slate-100 rounded-xl bg-slate-50/50 relative p-2 flex flex-col gap-2">
               {col === 0 && (
                 <div className="p-2 rounded-lg bg-blue-50 border border-blue-100 opacity-60">
                   <div className="w-full h-2 bg-blue-200 rounded mb-2" />
                   <div className="w-2/3 h-2 bg-blue-200 rounded" />
                 </div>
               )}
               
               {col === 2 && (
                 <div className={`h-full relative rounded-lg border-2 border-dashed transition-all ${step === 0 ? 'border-indigo-300 bg-indigo-50/50' : 'border-transparent'}`}>
                    {step === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          layoutId="simCursor2"
                          className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center scale-110 shadow-sm relative"
                        >
                           <Plus className="w-5 h-5" />
                           <div className="absolute -right-2 -bottom-2 z-[100] w-5 h-5 bg-slate-800 rounded-full border-2 border-white flex flex-col justify-center pointer-events-none drop-shadow-md">
                             <div className="absolute inset-0 bg-white rounded-full scale-50" />
                           </div>
                        </motion.div>
                      </div>
                    )}
                    {step >= 4 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-3 rounded-lg bg-indigo-50 border border-indigo-200 flex flex-col shadow-sm"
                      >
                        <span className="text-[10px] font-bold text-indigo-700 mb-0.5">09:00 - 15:00</span>
                        <span className="text-xs font-black text-indigo-900">Sarah Connor</span>
                      </motion.div>
                    )}
                 </div>
               )}
             </div>
           ))}
        </div>

        {/* Modal Overlay */}
        <AnimatePresence>
          {step >= 1 && step < 4 && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-40 flex items-center justify-center p-4">
               <motion.div 
                 initial={{ scale: 0.9, opacity: 0, y: 10 }}
                 animate={{ scale: 1, opacity: 1, y: 0 }}
                 exit={{ scale: 0.9, opacity: 0 }}
                 className="w-full max-w-sm bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(79,70,229,0.3)] border border-slate-200 overflow-hidden"
               >
                 <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                    <h4 className="font-bold text-slate-800 text-sm">Assign Shift</h4>
                 </div>
                 
                 <div className="p-5 space-y-4 relative">
                    <div className="flex gap-3">
                       <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-bold text-slate-600">
                          <CalendarDays className="w-4 h-4 text-slate-400" /> Wed 14
                       </div>
                       <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-bold text-slate-600">
                          <Clock className="w-4 h-4 text-slate-400" /> 09:00-15:00
                       </div>
                    </div>

                    <div className="relative">
                       <label className="text-[10px] uppercase font-bold text-indigo-500 tracking-widest mb-1.5 block">Assign To</label>
                       <div className={`w-full px-3 py-2.5 rounded-xl border-2 flex items-center justify-between text-sm transition-colors ${step === 1 ? 'border-indigo-400 ring-2 ring-indigo-500/10 cursor-pointer' : step >= 3 ? 'border-slate-200' : 'border-indigo-500'}`}>
                          <div className="flex items-center gap-2 font-bold text-slate-800">
                             {step >= 3 ? (
                               <>
                                 <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px]">SC</div>
                                 Sarah Connor
                               </>
                             ) : (
                               <>
                                 <UserSquare2 className="w-5 h-5 text-slate-400" /> Select Employee...
                               </>
                             )}
                          </div>
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                          
                          {/* Cursor over Dropdown trigger */}
                          {step === 1 && (
                             <motion.div 
                                layoutId="simCursor2"
                                className="absolute right-4 bottom-2 z-[100] w-5 h-5 bg-slate-800 rounded-full border-2 border-white flex flex-col justify-center pointer-events-none drop-shadow-md"
                             >
                                <div className="absolute inset-0 bg-white rounded-full scale-50" />
                             </motion.div>
                          )}
                       </div>

                       {/* Dropdown Menu */}
                       <AnimatePresence>
                         {step === 2 && (
                            <motion.div 
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 pointer-events-none"
                            >
                               <div className="px-3 py-2 hover:bg-slate-50 flex items-center gap-2 relative bg-indigo-50/50 cursor-pointer">
                                  <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">SC</div>
                                  <span className="text-sm font-bold text-slate-800">Sarah Connor</span>
                                  
                                  {/* Cursor over Sarah Connor item */}
                                  <motion.div 
                                    layoutId="simCursor2"
                                    className="absolute right-6 top-1/2 -translate-y-1/2 z-[100] w-5 h-5 bg-slate-800 rounded-full border-2 border-white flex flex-col justify-center drop-shadow-md"
                                  >
                                    <div className="absolute inset-0 bg-white rounded-full scale-50" />
                                  </motion.div>
                               </div>
                               <div className="px-3 py-2 flex items-center gap-2 opacity-50">
                                  <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold">MJ</div>
                                  <span className="text-sm font-bold text-slate-600">Mike Johnson</span>
                               </div>
                            </motion.div>
                         )}
                       </AnimatePresence>
                    </div>
                 </div>

                 <div className="p-4 bg-slate-50 border-t border-slate-100">
                    <div className={`w-full py-2.5 rounded-xl font-bold text-sm text-center flex items-center justify-center transition-all relative ${step >= 3 ? 'bg-indigo-600 text-white shadow-md cursor-pointer scale-105 ring-2 ring-indigo-500/20' : 'bg-slate-200 text-slate-400'}`}>
                       Publish Shift
                       
                       {/* Cursor over Publish button */}
                       {step === 3 && (
                          <motion.div 
                            layoutId="simCursor2"
                            className="absolute right-1/4 top-1/2 -translate-y-1/2 z-[100] w-5 h-5 bg-slate-800 rounded-full border-2 border-white flex flex-col justify-center drop-shadow-md"
                          >
                            <div className="absolute inset-0 bg-white rounded-full scale-50" />
                          </motion.div>
                       )}
                    </div>
                 </div>
               </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
