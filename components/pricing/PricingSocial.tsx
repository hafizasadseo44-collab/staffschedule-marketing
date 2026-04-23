"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2 } from "lucide-react";

const testimonials = [
  {
    quote: "StaffSchedule.io completely transformed how we manage our 50+ medical staff. The ROI was immediate and measurable.",
    author: "Dr. Sarah Chen",
    role: "Director, City Health Group",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    achievement: "15h saved/week",
    span: "md:col-span-2"
  },
  {
    quote: "The most intuitive software we've ever used. Our team adoption was 100% within the first 48 hours.",
    author: "James Wilson",
    role: "Operations Manager, Retail Link",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    achievement: "100% Adoption",
    span: "md:col-span-1"
  },
  {
    quote: "Switching to Business allowed us to scale to 10 locations without adding a single admin hire. Truly remarkable.",
    author: "Elena Rodriguez",
    role: "CEO, FreshFoods Market",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    achievement: "10x Scalability",
    span: "md:col-span-1"
  },
  {
    quote: "Automated scheduling is a game changer. We've eliminated scheduling conflicts entirely across all departments.",
    author: "David Park",
    role: "Hospitality Lead, Grand Hotel",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    achievement: "$50k saved/year",
    span: "md:col-span-1"
  },
  {
    quote: "Security and compliance were our top priorities. This platform exceeded all our enterprise requirements and audit logs.",
    author: "Marcus Thorne",
    role: "CTO, SecureOps",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    achievement: "Enterprise Grade",
    span: "md:col-span-2"
  }
];

const PricingSocial = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 text-xs font-bold uppercase tracking-widest mb-6 border border-amber-100"
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            The Wall of Love
          </motion.div>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Trusted by the world's most efficient teams.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${t.span || ""} relative p-8 rounded-3xl bg-white border border-slate-200 shadow-sm transition-shadow hover:shadow-md overflow-hidden`}
            >
              
              <div className="absolute top-8 right-8 text-slate-100">
                <Quote className="w-12 h-12 rotate-180" />
              </div>
              
              <div className="flex flex-wrap gap-3 mb-8 relative z-10">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <div className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest rounded border border-emerald-100">
                   {t.achievement}
                </div>
              </div>

              <p className="text-lg lg:text-xl font-bold text-slate-700 mb-10 leading-relaxed relative z-10">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-slate-100 relative z-10">
                <div className="relative">
                  <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full bg-slate-100 object-cover border border-slate-200" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-base text-slate-900 flex items-center gap-2">
                    {t.author}
                  </div>
                  <div className="text-sm font-medium text-slate-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSocial;
