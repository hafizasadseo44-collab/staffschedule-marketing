"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, CalendarDays, Zap, ArrowRight, Building2, LayoutGrid, List } from "lucide-react";

interface SimulationLocationsProps {
  isActive: boolean;
  updateCursor?: (x: number, y: number, clicking?: boolean) => void;
}

export default function SimulationLocations({ isActive, updateCursor }: SimulationLocationsProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isActive || !updateCursor) {
      setStep(0);
      return;
    }

    const sequence = async () => {
      setStep(0);
      updateCursor(90, 80);

      // 1. Move to Downtown Store Card
      await new Promise(r => setTimeout(r, 1000));
      updateCursor(60, 45); // hover over the 2nd card
      
      // 2. Move to "Manage" button on the 2nd card
      await new Promise(r => setTimeout(r, 600));
      updateCursor(60, 75);
      
      // 3. Click
      await new Promise(r => setTimeout(r, 600));
      updateCursor(60, 75, true);
      setStep(1); // Simulate switching logic via UI

      // Move to sidebar Announcements for next scene
      await new Promise(r => setTimeout(r, 1500));
      updateCursor(10, 56);
      await new Promise(r => setTimeout(r, 500));
      updateCursor(10, 56, true);
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
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="text-2xl font-bold text-slate-800 tracking-tight">Locations</div>
          <p className="text-sm text-slate-500 mt-1">Manage your business locations and assign staff.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white border border-slate-200 shadow-sm rounded-lg flex p-1">
             <div className="px-3 py-1.5 rounded bg-slate-100 text-slate-800"><LayoutGrid className="w-4 h-4" /></div>
             <div className="px-3 py-1.5 rounded text-slate-400"><List className="w-4 h-4" /></div>
          </div>
          <div className="px-4 py-2 bg-indigo-600 text-white font-bold text-sm rounded-lg shadow-sm flex items-center gap-2">
            <Building2 className="w-4 h-4" /> Add Location
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-3 gap-6">
        
        {/* Main Branch (Current) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white border-2 border-indigo-500 shadow-md shadow-indigo-500/10 rounded-2xl p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 py-1 px-3 bg-indigo-500 text-white font-bold text-[10px] uppercase tracking-wider rounded-bl-lg">Current</div>
          <div className="flex items-center gap-3 mb-6">
             <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Building2 className="w-6 h-6 stroke-[2]" />
             </div>
             <div>
                <div className="text-lg font-bold text-slate-800">Main Branch</div>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3 text-slate-400"/> 123 Business Rd, NY</p>
             </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
             <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
               <div className="text-2xl font-black text-slate-700">42</div>
               <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Staff</div>
             </div>
             <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
               <div className="text-2xl font-black text-slate-700">14</div>
               <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Active Shifts</div>
             </div>
          </div>
          <div className="w-full py-2.5 rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600 font-bold text-sm text-center">
            Currently Viewing
          </div>
        </motion.div>

        {/* Downtown Store */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2 }}
           className={`bg-white border-2 transition-colors duration-300 shadow-sm rounded-2xl p-6 ${step >= 1 ? 'border-indigo-500 shadow-md shadow-indigo-500/10' : 'border-slate-200'}`}
        >
          {step >= 1 && <div className="absolute top-0 right-0 py-1 px-3 bg-indigo-500 text-white font-bold text-[10px] uppercase tracking-wider rounded-bl-lg">Current</div>}
          <div className="flex items-center gap-3 mb-6">
             <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${step >= 1 ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                <Building2 className="w-6 h-6 stroke-[2]" />
             </div>
             <div>
                <div className="text-lg font-bold text-slate-800">Downtown Store</div>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3 text-slate-400"/> 456 Market St, NY</p>
             </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
             <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
               <div className="text-2xl font-black text-slate-700">18</div>
               <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Staff</div>
             </div>
             <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
               <div className="text-2xl font-black text-slate-700">7</div>
               <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Active Shifts</div>
             </div>
          </div>
          
          <div className={`w-full py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-colors ${step >= 1 ? 'border border-indigo-100 bg-indigo-50 text-indigo-600' : 'border border-slate-200 text-slate-600'}`}>
            {step >= 1 ? 'Currently Viewing' : 'Manage Location'} <ArrowRight className="w-4 h-4" />
          </div>
        </motion.div>

        {/* Uptown Outlet */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.3 }}
           className="bg-white border-2 border-slate-200 shadow-sm rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
             <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center">
                <Building2 className="w-6 h-6 stroke-[2]" />
             </div>
             <div>
                <div className="text-lg font-bold text-slate-800">Uptown Outlet</div>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3 text-slate-400"/> 789 5th Ave, NY</p>
             </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
             <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
               <div className="text-2xl font-black text-slate-700">12</div>
               <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Staff</div>
             </div>
             <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
               <div className="text-2xl font-black text-slate-700">4</div>
               <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Active Shifts</div>
             </div>
          </div>
          <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm text-center hover:bg-slate-50 cursor-pointer transition-colors">
            Manage Location <ArrowRight className="w-4 h-4" />
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
