"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How long does it take to set up?",
    answer: "Most teams are up and running in under 15 minutes. Our guided onboarding helps you import your staff, set up locations, and build your first schedule instantly.",
  },
  {
    question: "Do I need a credit card for the free trial?",
    answer: "No. You can start your 15-day free trial without entering any payment information. You only pay when you're ready to upgrade.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use industry-standard encryption, CSRF protection, and secure data storage to ensure your business and staff information is always safe.",
  },
  {
    question: "Can I manage multiple locations?",
    answer: "Yes! Depending on your plan, you can manage unlimited locations and departments within a single unified dashboard.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, our subscriptions are flexible. You can cancel at any time directly from your billing settings without any hidden fees or contracts.",
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24 lg:py-40 bg-brand-dark overflow-hidden relative">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-brand-primary/5 rounded-full blur-[200px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-10">
               Support Knowledge Base
            </div>
            <h2 className="text-5xl lg:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
              Common <br />
              <span className="text-brand-info">Questions.</span>
            </h2>
            <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leads-relaxed">
              Everything you need to know about scaling with StaffSchedule.io.
            </p>
          </motion.div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-[2.5rem] border transition-all duration-500 group ${
                activeIndex === index 
                  ? "bg-white/10 border-white/20 shadow-2xl backdrop-blur-3xl" 
                  : "bg-white/[0.03] border-white/5 hover:bg-white/[0.05] hover:border-white/10"
              }`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full p-10 text-left flex justify-between items-center transition-colors"
              >
                <span className="text-xl lg:text-2xl font-black text-white pr-12 tracking-tight group-hover:text-brand-primary transition-colors">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  activeIndex === index ? "bg-brand-primary text-white scale-110 shadow-xl shadow-brand-primary/40" : "bg-white/10 text-slate-400"
                }`}>
                  {activeIndex === index ? (
                    <Minus className="w-6 h-6" strokeWidth={4} />
                  ) : (
                    <Plus className="w-6 h-6" strokeWidth={4} />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="px-10 pb-12 text-xl font-medium text-slate-400 leading-relaxed max-w-4xl border-t border-white/5 pt-8">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

  );
};

export default FAQ;
