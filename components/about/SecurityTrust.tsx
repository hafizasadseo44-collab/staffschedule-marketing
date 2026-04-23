"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, EyeOff, Globe, Server, BarChart3, Database } from "lucide-react";

const FEATURES = [
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Bank-Grade Encryption",
    desc: "Your data is protected by industry-standard AES-256 encryption at rest and TLS 1.3 in transit.",
    color: "#4F46E5",
    bg: "rgba(79,102,241,0.08)",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "GDPR & SOC 2 Ready",
    desc: "Strict adherence to global data privacy laws. We never sell your data — your trust is our most valuable asset.",
    color: "#10B981",
    bg: "rgba(16,185,129,0.08)",
  },
  {
    icon: <EyeOff className="w-6 h-6" />,
    title: "Privacy First",
    desc: "Granular permission sets ensure only those who need access have access. Complete control over your audit logs.",
    color: "#4F46E5",
    bg: "rgba(79,102,241,0.08)",
  },
];

export default function SecurityTrust() {
  return (
    <section className="relative py-24 lg:py-36 bg-white overflow-hidden">
      {/* ── Background Patterns ── */}
      <div className="absolute top-0 right-0 w-[400px] h-full bg-[radial-gradient(circle_at_right,rgba(79,102,241,0.04)_0%,transparent_70%)] -z-10" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#4F46E5 1px, transparent 0)", backgroundSize: "64px 64px" }} />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* ── Left Content: The Trust Wall ── */}
          <div className="flex-[1.2]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl font-black text-xs uppercase tracking-[0.25em] bg-brand-primary text-white shadow-lg shadow-brand-primary/20 mb-10"
            >
              <ShieldCheck className="w-4 h-4" />
              Safety & Reliability
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl lg:text-7xl font-black text-slate-900 tracking-[-0.04em] leading-[0.9] mb-8"
            >
              Enterprise security, <br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)" }}>
                standard built-in.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg sm:text-xl text-slate-500 font-medium max-w-xl leading-relaxed mb-12"
            >
              We treat your workforce data with the same discipline as a leading fintech firm. Our mission is to build the most secure scheduling platform on the planet.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-brand-primary/20 transition-all duration-500 group"
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-all group-hover:scale-110" style={{ background: feature.bg, color: feature.color }}>
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-3 tracking-tight group-hover:text-brand-primary transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Right Content: Technical Stats Grid ── */}
          <div className="flex-1 w-full relative group">
            <div className="absolute -inset-4 bg-brand-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-8 rounded-[3rem] bg-slate-900 text-white flex flex-col justify-between aspect-square"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-3xl font-black mb-1">99.9%</p>
                  <p className="text-[10px] font-black uppercase text-white/40 tracking-widest leading-snug">Uptime <br /> Guaranteed</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-8 rounded-[3rem] bg-white border border-slate-100 flex flex-col justify-between aspect-square shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-3xl font-black mb-1 text-slate-900">0.05s</p>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-snug">Average <br /> Latency</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-8 rounded-[3rem] bg-white border border-slate-100 flex flex-col justify-between aspect-square shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-3xl font-black mb-1 text-slate-900">2x</p>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-snug">Encrypted <br /> Backups</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="p-8 rounded-[3rem] bg-brand-primary text-white flex flex-col justify-between aspect-square shadow-brand-primary/20 shadow-xl"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-3xl font-black mb-1">256-bit</p>
                  <p className="text-[10px] font-black uppercase text-white/40 tracking-widest leading-snug">Military-Grade <br /> Encryption</p>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
