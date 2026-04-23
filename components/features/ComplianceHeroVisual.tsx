"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Check } from "lucide-react";

export default function ComplianceHeroVisual() {
  return (
    <div className="relative group perspective-1000">
      <div className="absolute -inset-4 bg-rose-500/10 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-white dark:bg-slate-900 rounded-[3rem] border border-border shadow-2xl overflow-hidden p-12 flex items-center justify-center min-h-[400px]">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-20 border border-dashed border-rose-500/20 rounded-full"
          />
          <div className="w-32 h-32 bg-rose-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl relative z-10">
            <ShieldCheck className="w-16 h-16" />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="absolute -top-10 -right-10 bg-emerald-500 text-white p-3 rounded-2xl shadow-xl flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> <span className="text-[10px] font-black uppercase">Audited</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
