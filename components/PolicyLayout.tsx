"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Shield, ScrollText, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  title: string;
}

interface PolicyLayoutProps {
  title: string;
  description: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const PolicyLayout = ({ title, description, lastUpdated, children }: PolicyLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
      {/* ═══ CRYSTAL BACKDROP ═══ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 pt-32 pb-32">
        {/* ═══ HERO HEADER ═══ */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 mb-12 sm:mb-20 text-center">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
           >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-6 sm:mb-8 border border-indigo-100/50">
                 <Shield size={12} />
                 Legal Center
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-6 sm:mb-8 leading-[1.1] sm:leading-none">
                 {title.split(' ').map((word, i) => (
                   <span key={i} className={cn(i === 1 ? "text-brand-primary italic":"")}>
                     {word}{' '}
                   </span>
                 ))}
              </h1>
              <p className="text-lg sm:text-xl text-slate-500 font-medium leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
                 {description}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[12px] sm:text-sm font-bold text-slate-400">
                 <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-emerald-500" />
                    Security
                 </div>
                 <div className="w-1 h-1 rounded-full bg-slate-300 hidden sm:block" />
                 <span>Updated: {lastUpdated}</span>
              </div>
           </motion.div>
        </header>


        <div className="max-w-4xl mx-auto px-6">
           {/* ═══ MAIN CONTENT area ═══ */}
           <main className="space-y-12">
                            <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] sm:rounded-[3rem] border border-white/50 p-6 sm:p-12 md:p-20 shadow-2xl shadow-slate-200/50">

                 <div className="prose prose-slate prose-lg lg:prose-xl max-w-none 
                   prose-headings:text-indigo-700 prose-headings:font-black prose-headings:tracking-tight
                   prose-h2:text-indigo-600 prose-h2:text-4xl prose-h2:mb-8 prose-h2:mt-20 prose-h2:border-b prose-h2:border-indigo-50 prose-h2:pb-4
                   prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium
                   prose-a:text-indigo-600 prose-a:font-black prose-a:no-underline prose-a:border-b-2 prose-a:border-indigo-100 prose-a:transition-all hover:prose-a:border-indigo-600
                   prose-strong:text-slate-900 prose-strong:font-black
                   prose-ul:list-none prose-ul:pl-0
                   prose-li:relative prose-li:pl-8 prose-li:my-4
                   prose-li:before:content-[''] prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-[0.8em] prose-li:before:w-2 prose-li:before:h-2 prose-li:before:bg-indigo-400 prose-li:before:rounded-full
                 ">
                    {children}
                 </div>
              </div>
              
              <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-slate-200">
                 <Link href="/" className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-brand-primary transition-colors group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                 </Link>
                 <div className="flex items-center gap-8">
                    <Link href="/privacy" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Terms of Service</Link>
                 </div>
              </div>
           </main>
        </div>
      </div>
    </div>
  );
};

export default PolicyLayout;
