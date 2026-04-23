"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Sparkles, Send } from "lucide-react";

export default function ChatHeroVisual() {
  return (
    <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] border border-border shadow-2xl overflow-hidden p-8 aspect-square sm:aspect-video flex items-center justify-center group overflow-hidden">
      
      {/* Background Pulse Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#4F46E5 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
      </div>

      {/* Broadcast Center UI */}
      <motion.div 
         initial={{ scale: 0.9, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ duration: 0.5 }}
         className="relative z-10 w-full max-w-[280px] bg-slate-50 dark:bg-brand-dark rounded-[2rem] shadow-2xl border-2 border-brand-primary/20 p-5 flex flex-col items-center top-6"
      >
         <div className="w-14 h-14 bg-brand-primary rounded-[1.2rem] flex items-center justify-center shadow-lg shadow-brand-primary/30 mb-4 rotate-[-5deg] group-hover:rotate-0 transition-transform">
            <MessageSquare className="w-7 h-7 text-white fill-white/20" />
         </div>
         <h3 className="font-black text-brand-dark dark:text-white text-lg mb-1">Company Broadcast</h3>
         <p className="text-xs text-brand-slate dark:text-slate-400 font-bold mb-4">Reaching 42 Staff Members</p>
         
         <div className="w-full bg-white dark:bg-slate-800 rounded-xl p-3 border border-border shadow-inner text-xs font-medium text-slate-500 min-h-[60px] text-left">
            Hey team, just a reminder that the new safety protocols are attached below. Read before tomorrow's shift!
         </div>

         <div className="mt-4 w-full h-10 bg-brand-primary rounded-xl flex items-center justify-center gap-2 text-white font-bold text-sm shadow-md overflow-hidden relative">
            <motion.div 
               animate={{ x: [-100, 200] }}
               transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
               className="absolute top-0 bottom-0 left-0 w-8 bg-white/20 skew-x-12"
            />
            <Send className="w-4 h-4" /> Send Now
         </div>
      </motion.div>

      {/* Floating Avatars Receiving Messages */}
      <div className="absolute inset-0 pointer-events-none">
         {[
           { top: '15%', left: '15%', delay: 0 },
           { top: '20%', left: '75%', delay: 0.2 },
           { top: '60%', left: '10%', delay: 0.4 },
           { top: '75%', left: '80%', delay: 0.6 },
           { top: '10%', left: '45%', delay: 0.8 },
         ].map((pos, i) => (
            <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
               animate={{ 
                  opacity: [0, 1, 1, 0], 
                  scale: [0, 1, 1.1, 1],
                  y: [20, 0, -5, -10]
               }}
               transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  repeatDelay: 1.5,
                  delay: pos.delay 
               }}
               style={{ top: pos.top, left: pos.left }}
               className="absolute flex items-center justify-center"
            >
               {/* Connecting Line effect */}
               <motion.svg className="absolute w-64 h-64 -translate-x-1/2 -translate-y-1/2 opacity-20" viewBox="0 0 100 100">
                  <motion.line 
                     x1="50" y1="50" x2="50" y2="100" stroke="#4F46E5" strokeWidth="2" strokeDasharray="4"
                     animate={{ strokeDashoffset: [0, -20] }}
                     transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
               </motion.svg>
               
               <div className="relative">
                  <div className="w-10 h-10 rounded-full border-2 border-white dark:border-brand-dark shadow-xl overflow-hidden bg-emerald-100 flex items-center justify-center">
                     <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt={`Staff ${i}`} className="w-full h-full object-cover" />
                  </div>
                  <motion.div 
                     animate={{ scale: [0, 1.2, 1] }}
                     transition={{ duration: 0.4, delay: pos.delay + 0.5 }}
                     className="absolute -top-2 -right-2 bg-brand-primary text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md border border-white dark:border-brand-dark"
                  >
                     1
                  </motion.div>
               </div>
            </motion.div>
         ))}
      </div>

    </div>
  );
}
