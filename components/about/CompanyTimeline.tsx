"use client";

import React from "react";
import { motion } from "framer-motion";
import { Rocket, Code2, Globe2, Star } from "lucide-react";

const EVENTS = [
  {
    year: "2022",
    icon: <Rocket className="w-5 h-5" />,
    color: "#4F46E5",
    bg: "rgba(79,70,229,0.1)",
    title: "The Idea",
    desc: "After watching a restaurant manager spend 6 hours a week on scheduling in Excel, our founders decided there had to be a better way. StaffSchedule.io was born.",
  },
  {
    year: "2023 Q1",
    icon: <Code2 className="w-5 h-5" />,
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.1)",
    title: "First Product Launch",
    desc: "We launched our MVP — a clean web-based scheduling tool with shift publishing, role-based access, and real-time staff notifications. Our first 50 customers joined within 30 days.",
  },
  {
    year: "2023 Q3",
    icon: <Star className="w-5 h-5" />,
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.1)",
    title: "Mobile App Goes Live",
    desc: "We shipped the iOS and Android app so frontline workers could check their schedules, request swaps, and message their team from any device — anywhere.",
  },
  {
    year: "2024",
    icon: <Globe2 className="w-5 h-5" />,
    color: "#059669",
    bg: "rgba(5,150,105,0.1)",
    title: "10,000 Managers & Growing",
    desc: "StaffSchedule.io became the go-to platform for restaurants, retail stores, agencies, and enterprise teams across 40+ industries. Over 250,000 shifts scheduled and counting.",
  },
];

export default function CompanyTimeline() {
  return (
    <section className="py-24 lg:py-32 bg-slate-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest mb-5"
            style={{ background: "rgba(79,70,229,0.07)", border: "1px solid rgba(79,70,229,0.18)", color: "#4F46E5" }}
          >
            Our Journey
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight"
          >
            From idea to{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}>
              global platform.
            </span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#4F46E5] via-[#7C3AED] to-[#059669] opacity-20" />

          <div className="flex flex-col gap-12">
            {EVENTS.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`relative flex items-start gap-6 sm:gap-10 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}
              >
                {/* Dot */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full ring-4 ring-white z-10 mt-3" style={{ background: e.color }} />

                {/* Spacer (desktop only) */}
                <div className="hidden sm:block sm:w-[calc(50%-2.5rem)] shrink-0" />

                {/* Card */}
                <div className="ml-16 sm:ml-0 sm:w-[calc(50%-2.5rem)] bg-white rounded-3xl p-7 border shadow-sm hover:-translate-y-1 transition-transform" style={{ borderColor: "rgba(226,232,240,1)", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: e.bg, color: e.color }}>
                      {e.icon}
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest" style={{ color: e.color }}>{e.year}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">{e.title}</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{e.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
