"use client";

import React from "react";
import { motion } from "framer-motion";
import { Folder, FileText, Download, ShieldCheck, FileKey, FileArchive } from "lucide-react";

export default function ChatResourceVault() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1">
             <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-6"
              >
                <Folder className="w-4 h-4" /> Company Knowledge Hub
              </motion.div>
              <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight"
              >
                 Stop printing. <br />
                 <span className="text-blue-500">Start digitizing.</span>
              </motion.h2>
              <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="text-lg text-brand-slate dark:text-slate-400 font-medium mb-8"
              >
                 Upload safety protocols, employee handbooks, and menu updates directly into your digital vault. Assign folders to specific roles so new hires have instantly curated onboarding documents.
              </motion.p>
              
              <ul className="space-y-6">
                 {[
                   { icon: <ShieldCheck />, title: "Secure & Compliant", desc: "Access is strictly controlled by employment status." },
                   { icon: <FileArchive />, title: "Version Control", desc: "When you update a PDF, everyone instantly sees the newest version." },
                   { icon: <FileKey />, title: "Role-Based Access", desc: "Managers see financial docs. Line cooks see prep guides." },
                 ].map((item, i) => (
                    <motion.li 
                       key={i} 
                       initial={{ opacity: 0, x: -20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.1 }}
                       className="flex items-start gap-4"
                    >
                       <div className="mt-1 w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow flex items-center justify-center shrink-0 border border-border text-brand-slate dark:text-slate-400">
                          {item.icon}
                       </div>
                       <div>
                          <div className="text-brand-dark dark:text-white font-black text-xl mb-1">{item.title}</div>
                          <div className="text-brand-slate dark:text-slate-400 font-medium">{item.desc}</div>
                       </div>
                    </motion.li>
                 ))}
              </ul>
          </div>

          <div className="flex-1 w-full max-w-lg lg:max-w-none relative aspect-square flex items-center justify-center">
             
             {/* Glowing BG */}
             <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
             
             {/* The Vault UI Card */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border flex flex-col p-6"
             >
                <div className="flex justify-between items-center mb-6">
                   <div className="font-black text-xl text-brand-dark dark:text-white">Resource Vault</div>
                   <div className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">3 Folders</div>
                </div>

                <div className="flex flex-col gap-3 mb-6">
                   {[
                     { name: "Employee Handbooks", color: "bg-purple-500", files: 4 },
                     { name: "Kitchen Prep SOPs", color: "bg-emerald-500", files: 12 },
                     { name: "Manager Forms", color: "bg-rose-500", files: 2 }
                   ].map((folder, i) => (
                      <motion.div 
                         key={i}
                         whileHover={{ scale: 1.02 }}
                         className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer group"
                      >
                         <div className={`w-10 h-10 rounded-lg ${folder.color} flex items-center justify-center shadow-lg shadow-${folder.color}/20 text-white shrink-0 group-hover:scale-110 transition-transform`}>
                            <Folder className="w-5 h-5 fill-white/20" />
                         </div>
                         <div className="flex-1">
                            <div className="font-bold text-brand-dark dark:text-white">{folder.name}</div>
                            <div className="text-xs text-slate-500 font-medium">{folder.files} documents</div>
                         </div>
                      </motion.div>
                   ))}
                </div>

                {/* Animated File Download */}
                <div className="mt-auto border-t border-border pt-4">
                   <div className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest">Recent Uploads</div>
                   <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <FileText className="w-4 h-4" />
                         </div>
                         <div>
                            <div className="text-sm font-bold text-blue-900 dark:text-blue-100 leading-none mb-1">Safety_Guide_v3.pdf</div>
                            <div className="text-[10px] text-blue-500 font-medium">Added 2 hours ago</div>
                         </div>
                      </div>
                      <motion.div 
                         animate={{ y: [0, 3, 0] }}
                         transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                         className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg cursor-pointer"
                      >
                         <Download className="w-4 h-4" />
                      </motion.div>
                   </div>
                </div>

             </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
