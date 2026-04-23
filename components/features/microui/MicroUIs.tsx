"use client";

import React from "react";
import { motion } from "framer-motion";

export function MicroSchedulingUI() {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
       <div className="flex gap-2">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
               <motion.div 
                 animate={{ x: ["-100%", "100%"] }}
                 transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                 className="h-full w-1/2 bg-brand-primary"
               />
            </div>
          ))}
       </div>
       <div className="grid grid-cols-7 gap-1 flex-1">
          {Array.from({length: 14}).map((_, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0.1 }}
              whileHover={{ opacity: 1, scale: 1.1 }}
              animate={i % 3 === 0 ? { opacity: [0.1, 0.5, 0.1] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
              className={`rounded-sm ${i % 3 === 0 ? 'bg-brand-primary' : 'bg-slate-200 dark:bg-slate-800'}`}
            />
          ))}
       </div>
    </div>
  );
}

export function MicroChatUI() {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
       <motion.div 
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="self-start bg-slate-200 dark:bg-slate-800 p-2 rounded-2xl rounded-bl-none w-[70%]"
       >
          <div className="h-1.5 w-full bg-slate-300 dark:bg-slate-700 rounded-full" />
       </motion.div>
       <motion.div 
          animate={{ x: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="self-end bg-brand-primary/20 p-2 rounded-2xl rounded-br-none w-[60%]"
       >
          <div className="h-1.5 w-full bg-brand-primary/40 rounded-full" />
       </motion.div>
       <div className="flex gap-1 mt-auto">
          <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
          <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
          <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
       </div>
    </div>
  );
}

export function MicroAnalyticsUI() {
  return (
    <div className="w-full h-full p-4 flex items-end gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
       {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.3].map((h, i) => (
          <motion.div 
            key={i}
            initial={{ height: "10%" }}
            whileInView={{ height: `${h * 100}%` }}
            transition={{ duration: 1, delay: i * 0.1 }}
            className="flex-1 bg-gradient-to-t from-brand-primary to-brand-secondary rounded-t-sm"
          />
       ))}
    </div>
  );
}
