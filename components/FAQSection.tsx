"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, CheckCircle2 } from "lucide-react";

const faqs = [
  {
    question: "How do you handle last-minute call-outs?",
    answer: "Our system lets you instantly broadcast open shifts to all available, qualified employees. Staff can claim the shift right from their phone, updating the master schedule automatically—no more frantic phone trees."
  },
  {
    question: "Does StaffSchedule.io prevent accidental overtime?",
    answer: "Yes. We track live weekly hours and labor costs. If a manager schedules someone into overtime—or if a shift swap pushes an employee over their limit—the system immediately flags it for management approval."
  },
  {
    question: "Can we sync sales data from our POS to forecast labor?",
    answer: "Absolutely. We integrate directly with leading POS systems (like Square, Toast, and Clover) to pull historical sales data, helping you generate schedules perfectly tuned to expected foot traffic."
  },
  {
    question: "How hard is it to onboard a new franchise location?",
    answer: "You can launch a location in minutes. Simply duplicate an existing department template, invite your General Manager, and have your employees join via a single SMS link. Zero IT setup required."
  },
  {
    question: "Do my employees have to pay for the mobile app?",
    answer: "Never. The iOS and Android tracking apps are completely free for all your staff, giving them 24/7 access to manage their availability, swap shifts, and request time off effortlessly."
  }
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden" id="faq">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-6xl font-black text-brand-dark dark:text-white mb-6 tracking-tight">
            Common <span className="text-brand-primary">questions.</span>
          </h2>
          <p className="text-lg lg:text-xl text-brand-slate dark:text-slate-400 font-medium max-w-2xl mx-auto">
            Everything you need to know about setting up, scaling, and optimizing your workforce with StaffSchedule.io.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group border rounded-3xl overflow-hidden transition-all duration-300 ${
                  isActive 
                    ? "bg-white dark:bg-slate-800 border-brand-primary/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]" 
                    : "bg-white/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 hover:border-brand-primary/20 hover:bg-white dark:hover:bg-slate-800/50"
                }`}
              >
                <button
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className="w-full px-6 py-6 lg:px-8 lg:py-8 text-left flex justify-between items-center gap-6"
                >
                  <span className={`text-lg lg:text-xl font-black transition-colors ${
                    isActive ? "text-brand-primary" : "text-brand-dark dark:text-white group-hover:text-brand-primary/80"
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive ? "bg-brand-primary text-white rotate-180" : "bg-slate-100 dark:bg-slate-700 text-slate-500 group-hover:bg-brand-primary/10 group-hover:text-brand-primary"
                  }`}>
                    {isActive ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-8 lg:px-8 lg:pb-8 pt-0">
                        <div className="h-px w-full bg-slate-100 dark:bg-slate-700 mb-6" />
                        <div className="text-brand-slate dark:text-slate-300 font-medium text-base lg:text-lg leading-relaxed flex items-start gap-4">
                          <CheckCircle2 className="w-6 h-6 text-brand-success flex-shrink-0 mt-1" />
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
