"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, Clock, Check, X, ShieldCheck } from "lucide-react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const times = ["Morning", "Afternoon", "Evening"];

export default function AvailabilitySimulation() {
  const [grid, setGrid] = useState<Record<string, boolean>>({
    "Mon-Morning": true,
    "Mon-Afternoon": true,
    "Tue-Morning": true,
    "Wed-Evening": true,
    "Fri-Afternoon": true,
    "Fri-Evening": true,
    "Sat-Evening": true,
  });

  const toggle = (id: string) => {
    setGrid(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
          
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
             <div className="relative aspect-[4/3] bg-white dark:bg-slate-900 rounded-[3rem] border border-border shadow-2xl overflow-hidden p-8 flex flex-col">
                
                {/* Simulation Header */}
                <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white">
                         <User className="w-5 h-5" />
                      </div>
                      <div>
                         <div className="text-sm font-black text-brand-dark dark:text-white uppercase tracking-tight">Staff View</div>
                         <div className="text-[10px] font-bold text-slate-400">Recurring Availability</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-slate-400">STATUS:</span>
                      <div className="px-2 py-1 bg-emerald-500/10 text-emerald-600 rounded-md text-[10px] font-black uppercase tracking-widest leading-none">
                         Synced
                      </div>
                   </div>
                </div>

                <div className="flex-1">
                   <div className="grid grid-cols-8 gap-2 h-full">
                      <div className="col-span-1 border-r border-border pb-2 flex flex-col justify-around">
                         {times.map(t => (
                            <div key={t} className="text-[10px] font-black text-slate-400 rotate-[-90deg] whitespace-nowrap">{t}</div>
                         ))}
                      </div>
                      <div className="col-span-7 grid grid-cols-7 gap-2">
                         {days.map(day => (
                            <div key={day} className="flex flex-col gap-2">
                               <div className="text-center text-[10px] font-black text-brand-dark dark:text-white mb-2">{day}</div>
                               {times.map(time => {
                                  const id = `${day}-${time}`;
                                  const isActive = grid[id];
                                  return (
                                     <motion.button
                                        key={id}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => toggle(id)}
                                        className={`flex-1 rounded-xl border transition-all flex items-center justify-center ${
                                           isActive 
                                           ? 'bg-emerald-500 border-emerald-600 text-white shadow-lg' 
                                           : 'bg-slate-50 dark:bg-slate-800 border-transparent text-slate-300'
                                        }`}
                                     >
                                        {isActive ? <Check className="w-4 h-4" /> : <X className="w-3 h-3" />}
                                     </motion.button>
                                  );
                               })}
                            </div>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="mt-8 flex justify-center">
                   <div className="flex items-center gap-6 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-full border border-border">
                      <div className="flex items-center gap-2">
                         <div className="w-3 h-3 rounded-full bg-emerald-500" />
                         <span className="text-[10px] font-black text-slate-500">Available</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="w-3 h-3 rounded-full bg-slate-300" />
                         <span className="text-[10px] font-black text-slate-500">Unavailable</span>
                      </div>
                   </div>
                </div>

             </div>
          </div>

          <div className="flex-1">
             <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6"
             >
                <Calendar className="w-4 h-4" /> Infinite Flexibility
             </motion.div>
             <h2 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight">
                Staff set the pace. <br />
                <span className="text-brand-primary">You set the schedule.</span>
             </h2>
             <p className="text-lg text-brand-slate dark:text-slate-400 font-medium mb-10 leading-relaxed">
                By allowing staff to mark when they are available for mornings, afternoons, or evenings, you empower your team and drastically reduce last-minute cancellations and absenteeism.
             </p>
             <div className="space-y-6">
                {[
                   { title: "Visual Time Grid", desc: "Intuitive mobile interface for staff to quickly toggle their weekly availability bits." },
                   { title: "Recurring Logic", desc: "Define a standard week that applies to all future schedules automatically." },
                   { title: "Conflict Blocking", desc: "System prevents you from assigning staff to shifts where they have marked 'Unavailable'." }
                ].map((item, i) => (
                   <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4"
                   >
                      <div className="mt-1 w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                         <div className="w-2 h-2 rounded-full bg-brand-primary" />
                      </div>
                      <div>
                         <div className="text-brand-dark dark:text-white font-black text-xl mb-1">{item.title}</div>
                         <div className="text-brand-slate dark:text-slate-400 font-medium">{item.desc}</div>
                      </div>
                   </motion.div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
