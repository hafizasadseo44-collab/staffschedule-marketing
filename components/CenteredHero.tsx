"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Star, TrendingDown, Zap, Users, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CenteredHero() {
  return (
    <div className="relative overflow-hidden bg-white pt-28 pb-0">
      {/* ── Brand mesh gradients (matching homepage style) ── */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: "rgba(79,70,229,0.07)" }}
      />
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "rgba(124,58,237,0.05)" }}
      />

      {/* Fine dot grid (same as globals .mesh-gradient pattern) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #4F46E5 1px, transparent 0)`,
          backgroundSize: "56px 56px",
          opacity: 0.03,
        }}
      />

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-8">

        {/* Live badge (Navio style — small top label) */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest mt-8"
          style={{
            background: "rgba(79,70,229,0.07)",
            border: "1px solid rgba(79,70,229,0.2)",
            color: "#4F46E5",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#4F46E5", boxShadow: "0 0 6px #4F46E5" }}
          />
          Workforce Management · Scheduling · Team Chat
        </motion.div>

        {/* ── Big headline (Navio style: "Your Team. Your Tools. One Seamless Hub.") ── */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.6 }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-black text-slate-900 leading-[1.03] tracking-tight max-w-4xl"
        >
          Your Staff.{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}
          >
            Your Shifts.
          </span>
          <br />
          One Seamless Hub.
        </motion.h1>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-lg sm:text-xl text-slate-500 font-medium max-w-2xl leading-relaxed"
        >
          StaffSchedule.io replaces chaotic spreadsheets with an intelligent
          platform — cutting labor costs, eliminating no-shows, and keeping
          your entire team perfectly in sync.
        </motion.p>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          {/* Email capture area (Navio style) */}
          <div
            className="flex flex-col sm:flex-row items-center gap-3 p-1.5 pr-1.5 rounded-2xl w-full sm:w-auto"
            style={{
              border: "1.5px solid rgba(79,70,229,0.2)",
              background: "rgba(79,70,229,0.03)",
            }}
          >
            <input
              type="email"
              placeholder="Enter your work email…"
              className="h-12 px-5 rounded-xl text-slate-800 text-sm font-medium outline-none w-full sm:w-64 bg-transparent placeholder:text-slate-400 focus:placeholder:text-slate-300"
            />
            <Link href="https://app.staffschedule.io/signup.php">
              <button
                className="w-full sm:w-auto h-12 px-6 rounded-xl text-white font-black text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg,#4F46E5,#7C3AED)",
                  boxShadow: "0 4px 20px rgba(79,70,229,0.35)",
                }}
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
          <Link href="/contact">
            <button className="h-12 px-7 rounded-xl font-bold text-sm text-slate-600 hover:text-brand-primary border-2 border-slate-200 hover:border-brand-primary/40 bg-white transition-all hover:scale-105">
              Contact Sales
            </button>
          </Link>
        </motion.div>

        {/* Trust micro-copy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.48 }}
          className="flex flex-wrap items-center justify-center gap-5 text-sm font-semibold text-slate-400"
        >
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            Free 14-day trial
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            No credit card required
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            Setup in 5 minutes
          </div>
        </motion.div>

        {/* Star rating (Navio displays "Already X signups" here) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.52 }}
          className="flex items-center gap-3"
        >
          <div className="flex -space-x-2">
            {["#4F46E5", "#7C3AED", "#0EA5E9", "#059669"].map((bg, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white"
                style={{ background: bg }}
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-slate-500 text-sm font-semibold">
            Already <strong className="text-slate-800">10,000+</strong> managers worldwide
          </span>
        </motion.div>

        {/* ── METRIC CARDS (matching reference "Hook Rates / Lower Ad Costs / Videos Analyzed") ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-3xl"
        >
          {[
            { icon: <TrendingDown className="w-5 h-5" />, value: "-18%", label: "Labor Cost Drop", color: "#059669", bg: "#05966912" },
            { icon: <Zap className="w-5 h-5" />,          value: "10hrs",  label: "Saved Per Week",   color: "#F59E0B", bg: "#F59E0B12" },
            { icon: <Users className="w-5 h-5" />,        value: "25k+",   label: "Active Daily Users", color: "#4F46E5", bg: "#4F46E512" },
          ].map((m, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, scale: 1.03 }}
              className="flex-1 flex items-center gap-4 rounded-2xl px-5 py-4 bg-white transition-all cursor-default"
              style={{
                border: "1.5px solid #F1F5F9",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: m.bg, color: m.color, border: `1px solid ${m.color}30` }}
              >
                {m.icon}
              </div>
              <div className="text-left">
                <p className="text-slate-900 font-black text-2xl leading-none tracking-tighter">{m.value}</p>
                <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-wider">{m.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── PRODUCT SCREENSHOT (Prodesa style — floating below text) ── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 1, type: "spring", bounce: 0.2 }}
          className="relative w-full mt-4"
        >
          {/* Top glow halo */}
          <div
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-3/4 h-32 pointer-events-none blur-3xl"
            style={{ background: "rgba(79,70,229,0.12)" }}
          />

          <div
            className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden"
            style={{
              border: "1.5px solid rgba(79,70,229,0.15)",
              boxShadow: "0 8px 60px rgba(79,70,229,0.12), 0 2px 0 rgba(79,70,229,0.08) inset",
            }}
          >
            <Image
              src="/hero-mockup.png"
              alt="StaffSchedule.io – PC and mobile app dashboard"
              width={1200}
              height={720}
              className="w-full object-cover"
              priority
            />
            {/* Bottom fade into page */}
            <div
              className="absolute bottom-0 inset-x-0 h-48 pointer-events-none"
              style={{ background: "linear-gradient(to top, white, transparent)" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
