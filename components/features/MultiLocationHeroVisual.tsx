"use client";

import React from "react";
import { motion } from "framer-motion";
import { Map, MapPin, Radio } from "lucide-react";

export default function MultiLocationHeroVisual() {
  return (
    <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] border border-border shadow-2xl overflow-hidden aspect-video group">
      
      {/* Schematic Map Background */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
         <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
            <path d="M50,150 Q100,50 150,150 T250,150 T350,150" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M30,120 Q80,20 130,120 T230,120 T330,120" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
         </svg>
      </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
         
         {/* Central Hub (Owner Dashboard) */}
         <div className="relative">
            <motion.div 
               animate={{ scale: [1, 1.05, 1] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="w-20 h-20 md:w-24 md:h-24 bg-brand-dark rounded-3xl shadow-2xl border-4 border-slate-800 flex items-center justify-center relative z-20"
            >
               <div className="text-white font-black text-2xl tracking-tighter">HQ</div>
               
               {/* Pulse Ring */}
               <motion.div 
                  animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 border-2 border-brand-primary rounded-3xl"
               />
            </motion.div>

            {/* Connecting Nodes (Branches) */}
            {[
               { top: '-110%', left: '-150%', label: 'Store 04', status: 'Active' },
               { top: '-130%', right: '-120%', label: 'Branch B', status: 'Staffed' },
               { top: '80%', left: '-180%', label: 'West Site', status: 'Syncing' },
               { top: '100%', right: '-140%', label: 'Airport Hub', status: 'Active' },
            ].map((node, i) => (
               <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + (i * 0.2), duration: 0.5, type: "spring" }}
                  className="absolute z-10 flex flex-col items-center"
                  style={node.right ? { top: node.top, right: node.right } : { top: node.top, left: node.left }}
               >
                  <div className="bg-white dark:bg-slate-800 border-2 border-brand-primary/20 shadow-xl px-4 py-2 rounded-2xl flex items-center gap-3 hover:border-brand-primary/50 transition-colors cursor-default">
                     <div className="relative">
                        <div className={`w-3 h-3 rounded-full ${node.status === 'Syncing' ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`} />
                        <motion.div 
                           animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                           transition={{ duration: 1.5, repeat: Infinity }}
                           className={`absolute inset-0 rounded-full ${node.status === 'Syncing' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black text-brand-dark dark:text-white whitespace-nowrap leading-none mb-0.5">{node.label}</span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter leading-none">{node.status}</span>
                     </div>
                  </div>
                  
                  {/* Connection Line (CSS pseudo-line) */}
                  <div className="h-12 w-px bg-gradient-to-t from-brand-primary/50 to-transparent" />
               </motion.div>
            ))}

            {/* Global Stats Overlay (Represents consolidated data) */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.5 }}
               className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 shadow-2xl border-2 border-brand-primary/10 rounded-[1.5rem] px-6 py-4 flex items-center gap-8 whitespace-nowrap"
            >
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                     <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                     <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Active Sites</div>
                     <div className="text-sm font-black text-brand-dark dark:text-white leading-none">12 Locations</div>
                  </div>
               </div>
               <div className="w-px h-8 bg-slate-100 dark:bg-slate-700" />
               <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                     <Radio className="w-4 h-4" />
                  </div>
                  <div>
                     <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Global Labor %</div>
                     <div className="text-sm font-black text-emerald-500 leading-none">14.2%</div>
                  </div>
               </div>
            </motion.div>

         </div>

      </div>

      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] -z-10" />

    </div>
  );
}
