"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCheck, Hash, Contact2, FileUp, Smartphone, Users } from "lucide-react";

export default function ChatBento() {
  return (
    <section className="py-24 lg:py-32 bg-slate-50 dark:bg-brand-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6"
          >
            Communication Tools
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight"
          >
            Built exactly for <br />
            <span className="text-brand-primary">shift-based work.</span>
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-lg text-brand-slate dark:text-slate-400 font-medium"
          >
            A directory, file vault, and instant messenger wrapped into one platform.
          </motion.p>
        </div>

        {/* 2x2 Grid Layout with tall column */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[320px]">
          
          {/* 1. Shift Channels (Wide, Row 1, Col 1-2) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-brand-primary rounded-[2.5rem] p-6 lg:p-8 relative overflow-hidden group shadow-xl flex flex-col justify-center"
          >
             <div className="relative z-10 w-full sm:w-2/3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center text-white mb-4 lg:mb-6 backdrop-blur-md">
                   <Hash className="w-5 h-5 lg:w-6 lg:h-6 fill-white" />
                </div>
                <h3 className="text-xl lg:text-2xl font-black text-white mb-2 lg:mb-3">Shift-Specific Groups</h3>
                <p className="text-indigo-100 font-medium text-sm sm:text-base leading-relaxed">Don't blast all 50 employees when you only need to talk to the 5 working tonight. Channels auto-generate based on who is scheduled.</p>
             </div>
             
             {/* Animated Channel List UI */}
             <div className="hidden sm:flex absolute right-0 inset-y-0 w-1/3 min-w-[200px] items-center justify-center overflow-hidden">
                <div className="absolute top-10 right-4 w-64 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 p-4 translate-x-[20%] group-hover:translate-x-[5%] transition-transform duration-700 tilt-in">
                   <div className="text-white/50 text-xs font-bold mb-3 uppercase tracking-widest">Channels</div>
                   <div className="flex flex-col gap-2">
                     <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-brand-primary p-3 rounded-xl flex justify-between items-center text-white text-sm font-bold shadow-lg"
                     >
                        <span># Friday_Closing</span>
                        <span className="bg-white/20 px-2 rounded-full text-[10px]">3 online</span>
                     </motion.div>
                     <div className="bg-slate-800 p-3 rounded-xl flex justify-between items-center text-white/70 text-sm font-medium">
                        <span># Kitchen_Prep</span>
                     </div>
                     <div className="bg-slate-800 p-3 rounded-xl flex justify-between items-center text-white/70 text-sm font-medium">
                        <span># All_Staff (NY)</span>
                     </div>
                   </div>
                </div>
             </div>
          </motion.div>

          {/* 2. Read Receipts (Square, Row 1, Col 3) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="col-span-1 row-span-1 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-border shadow-xl p-6 lg:p-8 relative overflow-hidden group flex flex-col"
          >
             <div className="flex-1 relative flex items-center justify-center min-h-[120px]">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner relative group-hover:scale-105 transition-transform duration-500">
                   <div className="text-brand-dark dark:text-white text-sm font-bold mb-2">Can you lock up tonight?</div>
                   <div className="flex justify-end pr-1">
                      <motion.div
                         animate={{ color: ['#94a3b8', '#3b82f6', '#3b82f6'] }}
                         transition={{ duration: 3, repeat: Infinity, times: [0, 0.3, 1] }}
                      >
                         <CheckCheck className="w-5 h-5" />
                      </motion.div>
                   </div>
                </div>
             </div>
             <div className="relative z-10 mt-auto">
                <h3 className="text-lg lg:text-xl font-black text-brand-dark dark:text-white mb-2">Read Receipts</h3>
                <p className="text-xs sm:text-sm font-bold text-brand-slate dark:text-slate-400 line-clamp-3">Accountability built-in. See exactly who has seen your vital messages.</p>
             </div>
          </motion.div>

          {/* 3. Company Directory (Square, Row 2, Col 1) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="col-span-1 row-span-1 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-border shadow-xl p-6 lg:p-8 relative overflow-hidden group flex flex-col"
          >
             <div className="flex-1 flex items-center justify-center min-h-[100px]">
                <motion.div 
                   animate={{ y: [-5, 5] }}
                   transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                   className="w-16 h-16 lg:w-20 lg:h-20 rounded-[1.5rem] bg-indigo-100 dark:bg-indigo-900/30 border-4 border-indigo-200 dark:border-indigo-800 flex items-center justify-center relative shadow-lg"
                >
                   <Contact2 className="w-8 h-8 text-indigo-500" />
                </motion.div>
             </div>
             <div className="relative z-10 mt-auto">
                <h3 className="text-lg lg:text-xl font-black text-brand-dark dark:text-white mb-2">Staff Directory</h3>
                <p className="text-xs sm:text-sm font-bold text-brand-slate dark:text-slate-400 line-clamp-3">Never ask for a number again. Easily ping any employee direct from the app.</p>
             </div>
          </motion.div>

          {/* 4. Document Storage (Square, Row 2, Col 2) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="col-span-1 row-span-1 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] border border-border shadow-xl p-6 lg:p-8 relative overflow-hidden group flex flex-col"
          >
             <div className="absolute top-[-20%] right-[-10%] w-48 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
             <div className="flex-1 relative flex items-center justify-center min-h-[120px]">
                <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-2xl shadow-xl flex items-center justify-center relative overflow-hidden border border-slate-200 dark:border-slate-700">
                   <motion.div 
                      animate={{ y: [-40, 0] }}
                      transition={{ duration: 2, repeat: Infinity, type: "spring", bounce: 0.5 }}
                      className="absolute flex flex-col items-center gap-1"
                   >
                      <div className="bg-rose-500 rounded p-1 text-[8px] font-black text-white absolute -top-2 -right-3 rotate-12">PDF</div>
                      <FileUp className="w-8 h-8 text-slate-400" />
                   </motion.div>
                </div>
             </div>
             <div className="relative z-10 mt-auto">
                <h3 className="text-lg lg:text-xl font-black text-brand-dark dark:text-white mb-2">File Uploads</h3>
                <p className="text-xs sm:text-sm font-bold text-brand-slate dark:text-slate-400 line-clamp-3">Attach menus, training docs, and HR PDFs directly to group chats.</p>
             </div>
          </motion.div>

          {/* 5. Mobile Native (Tall, Row 2-3, Col 3) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="col-span-1 lg:row-span-2 bg-brand-dark rounded-[2.5rem] p-6 lg:p-8 relative overflow-hidden shadow-2xl flex flex-col group border border-slate-800"
          >
             <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 rounded-xl lg:rounded-2xl flex items-center justify-center text-white mb-4 lg:mb-6">
                <Smartphone className="w-5 h-5 lg:w-6 lg:h-6 text-purple-400" />
             </div>
             <div className="relative z-10 mb-6 lg:mb-8">
                <h3 className="text-xl lg:text-2xl font-black text-white mb-2 lg:mb-3">Rich Mobile Experience</h3>
                <p className="text-slate-400 font-medium text-xs sm:text-sm leading-relaxed">Lightning fast iOS and Android apps so staff can chat from anywhere, exactly like they do on their personal apps.</p>
             </div>
             
             <div className="flex-1 mt-auto flex justify-center items-end opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="w-40 h-48 bg-black rounded-t-3xl border-8 border-slate-700 border-b-0 relative overflow-hidden px-3 pt-6 flex flex-col gap-3">
                   <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-slate-800 rounded-full" />
                   <div className="self-start bg-slate-800 p-2 rounded-xl text-[10px] text-white">Hey!</div>
                   <div className="self-end bg-brand-primary p-2 rounded-xl text-[10px] text-white">What's up?</div>
                   <div className="self-start bg-slate-800 p-2 rounded-xl text-[10px] text-white">Can you swap?</div>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
