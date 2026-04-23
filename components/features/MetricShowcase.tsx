"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Clock, ShieldCheck } from "lucide-react";

interface Metric {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
}

interface MetricShowcaseProps {
  title: string;
  metrics: Metric[];
}

export default function MetricShowcase({ title, metrics }: MetricShowcaseProps) {
  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-secondary/10 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tighter"
          >
            {title}
          </motion.h2>
          <div className="w-24 h-1.5 bg-brand-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col items-center text-center group hover:bg-white/10 transition-all cursor-default"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform">
                {metric.icon}
              </div>
              <div className="text-4xl lg:text-5xl font-black text-white mb-2 tracking-tighter">
                {metric.value}
              </div>
              <div className="text-brand-primary font-black text-xs uppercase tracking-[0.2em] mb-4">
                {metric.label}
              </div>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                {metric.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
