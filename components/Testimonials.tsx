"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "StaffSchedule.io transformed how we manage our 50+ employees across three locations. The shift swap feature alone saved me 10 hours a week.",
    author: "Sarah Jenkins",
    role: "Operations Manager, BlueVine Retail",
    avatar: "SJ",
  },
  {
    quote: "The interface is so clean and intuitive. My team actually enjoys checking their schedules now. No more 'I didn't see the post' excuses!",
    author: "David Chen",
    role: "HR Director, TechFlow Solutions",
    avatar: "DC",
  },
  {
    quote: "Highly recommended for any growing business. The analytics gave us the data we needed to optimize our staffing costs and improve efficiency.",
    author: "Michael Ross",
    role: "Founder, Ross & Co",
    avatar: "MR",
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6"
          >
            Trusted by leaders, <br />
            <span className="text-brand-secondary">loved by teams.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-[2rem] bg-white dark:bg-slate-800 border border-border shadow-sm relative group"
            >
              <Quote className="absolute top-6 right-8 w-10 h-10 text-brand-primary/5 group-hover:text-brand-primary/10 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                 {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 text-brand-amber fill-brand-amber" />
                 ))}
              </div>

              <p className="text-brand-slate dark:text-slate-300 font-medium italic mb-8 relative z-10">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary font-black text-sm">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-black text-brand-dark dark:text-white">{t.author}</h4>
                  <p className="text-xs text-brand-slate dark:text-slate-500 font-bold">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
