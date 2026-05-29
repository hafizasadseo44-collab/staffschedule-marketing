"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FounderVision() {
  return (
    <section className="relative py-24 lg:py-36 bg-white overflow-hidden">
      {/* ── Background Decoration ── */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-primary/5 blur-[100px] rounded-full translate-y-1/4 -translate-x-1/4 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* ── Left Content: The Vision ── */}
          <div className="flex-1 text-slate-900">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-[0.25em] bg-brand-primary/5 border border-brand-primary/10 text-brand-primary mb-8"
            >
              <Quote className="w-3 h-3" />
              Founders Vision
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] sm:leading-[1.05] mb-8 text-slate-900"
            >
              Why we started <br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)" }}>
                StaffSchedule.io
              </span>
            </motion.h2>


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="space-y-6 text-lg text-slate-500 font-medium leading-relaxed max-w-xl"
            >
              <p>
                Staff scheduling isn&apos;t just about time slots and calendars. It&apos;s about the people who make businesses function — the chef prepping for a lunch rush, the nurse starting a double shift, and the manager trying to keep it all together.
              </p>
              <p>
                We saw managers spending 10+ hours a week in spreadsheets, losing precious time they should have spent leading their teams. We knew there had to be a way to combine human-centric design with powerful automation logic.
              </p>
              <p>
                Today, StaffSchedule.io is built on a single promise: <span className="text-slate-900 font-bold">To give every manager their time back, and every employee a voice in their work-life balance.</span>
              </p>
            </motion.div>

            {/* Signature Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-12 pt-10 border-t border-slate-100 flex items-center gap-6"
            >
              <div className="flex flex-col">
                <span className="text-2xl font-serif italic text-slate-900/90 tracking-wide mb-1">
                  Hafiz & The Team
                </span>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                  Founders, StaffSchedule.io
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-success/10 border border-brand-success/20 text-brand-success text-[10px] font-black uppercase tracking-widest">
                <CheckCircle2 className="w-3 h-3" />
                Verified Vision
              </div>
            </motion.div>

            {/* Action Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-16 p-8 rounded-[2.5rem] bg-brand-primary/[0.03] border border-brand-primary/10 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/0 via-brand-primary/5 to-brand-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-1">Ready to reclaim your time?</h4>
                <p className="text-slate-500 text-sm">Join 10,000+ managers who trust our vision.</p>
              </div>
              <Link 
                href="https://app.staffschedule.io/onboarding.php"
                className="h-14 px-8 rounded-2xl bg-brand-primary hover:bg-brand-primary/90 text-white font-black text-sm transition-all flex items-center gap-3 shadow-lg shadow-brand-primary/20"
              >
                Start Your Journey
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* ── Right Content: The Portrait ── */}
          <div className="flex-1 w-full max-w-[500px] relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden group shadow-[0_50px_100px_-20px_rgba(79,70,229,0.1)] border border-slate-100"
            >
              <Image
                src="/images/team/founder.jpg"
                alt="Founder Portrait"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 border-[8px] border-white/40 rounded-[3.5rem] pointer-events-none" />

              {/* Floating Stat Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-10 right-10 p-6 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200 shadow-2xl z-20"
              >
                <p className="text-3xl font-black text-brand-primary leading-none">100%</p>
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.1em] mt-1">Remote Since Day 1</p>
              </motion.div>
            </motion.div>

            {/* Decorative Grid behind image */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[radial-gradient(circle,rgba(79,70,229,0.1)_0%,transparent_70%)] -z-10 blur-xl" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-[radial-gradient(circle,rgba(79,70,229,0.05)_0%,transparent_70%)] -z-10 blur-2xl" />
          </div>

        </div>
      </div>
    </section>
  );
}
