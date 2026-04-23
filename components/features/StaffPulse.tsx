"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, Heart } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

interface StaffPulseProps {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
}

export default function StaffPulse({ title, subtitle, testimonials }: StaffPulseProps) {
  return (
    <section className="py-24 bg-white dark:bg-brand-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-16 lg:mb-24">
           <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 font-bold text-xs uppercase tracking-widest mb-6"
              >
                <Heart className="w-4 h-4" /> Staff Approved
              </motion.div>
              <h2 className="text-4xl lg:text-7xl font-black text-brand-dark dark:text-white mb-6 tracking-tight leading-none">
                {title}
              </h2>
              <p className="text-xl text-brand-slate dark:text-slate-400 font-medium">
                {subtitle}
              </p>
           </div>
           <div className="flex -space-x-4 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                 <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-brand-dark bg-slate-100 overflow-hidden relative">
                    <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="Staff" />
                 </div>
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-white dark:border-brand-dark bg-brand-primary flex items-center justify-center text-white text-xs font-black">
                 +2k
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {testimonials.map((t, i) => (
              <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="p-8 lg:p-10 rounded-[3rem] bg-slate-50 dark:bg-slate-900 border border-border flex flex-col justify-between group hover:border-rose-500/30 transition-all duration-500"
              >
                 <div>
                    <div className="flex gap-1 mb-6">
                       {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                       ))}
                    </div>
                    <Quote className="w-10 h-10 text-brand-primary opacity-20 mb-6" />
                    <p className="text-lg lg:text-xl font-medium text-brand-dark dark:text-white leading-relaxed mb-8 italic">
                       "{t.content}"
                    </p>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-white dark:border-slate-800">
                       <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                       <div className="font-black text-brand-dark dark:text-white">{t.name}</div>
                       <div className="text-sm font-bold text-slate-400">{t.role}</div>
                    </div>
                 </div>
              </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
