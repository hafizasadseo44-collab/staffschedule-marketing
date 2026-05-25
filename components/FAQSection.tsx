"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, CheckCircle2, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is staff scheduling software?",
    answer: "Staff scheduling software helps businesses create, manage, and organize employee work schedules digitally. It allows managers to handle shift planning, employee availability, leave requests, open shifts, and team communication from one workforce management platform."
  },
  {
    question: "How does StaffSchedule.io improve staff scheduling?",
    answer: "StaffSchedule.io helps businesses reduce scheduling confusion by centralizing employee schedules, shift updates, workforce communication, and leave management in one platform. Managers can create schedules faster, track employee availability, and send real-time notifications to teams."
  },
  {
    question: "Can employees check schedules from their mobile phones?",
    answer: "Yes. Employees can view schedules, receive shift updates, check open shifts, and stay informed through our mobile employee scheduling app. This helps teams stay connected even when working remotely or across multiple locations."
  },
  {
    question: "How do businesses reduce scheduling conflicts?",
    answer: "Businesses can reduce scheduling conflicts by using scheduling automation and employee availability tracking. Workforce management software helps managers avoid overlapping shifts, missed updates, and last-minute scheduling problems."
  },
  {
    question: "Is StaffSchedule.io good for restaurants, retail stores, and clinics?",
    answer: "Yes. StaffSchedule.io is built for shift-based businesses including restaurants, cafés, retail stores, clinics, warehouses, call centers, and growing teams that need better workforce scheduling and shift management."
  },
  {
    question: "Can I manage multiple business locations with StaffSchedule.io?",
    answer: "Yes. Our multi-location workforce management system allows businesses to manage employee schedules, departments, shifts, and team communication across multiple branches from one centralized platform."
  },
  {
    question: "How does employee availability tracking work?",
    answer: "Managers can track employee availability, leave requests, and shift preferences before publishing schedules. This helps businesses improve shift planning and reduce scheduling mistakes."
  },
  {
    question: "What are the benefits of employee scheduling software?",
    answer: "Employee scheduling software helps businesses save time, reduce scheduling errors, improve workforce communication, and simplify shift management. Many businesses use scheduling automation to improve workforce productivity and daily operations."
  },
  {
    question: "Can employees swap shifts using StaffSchedule.io?",
    answer: "Yes. Employees can request shift swaps directly through the platform, helping teams manage schedule changes more efficiently while keeping managers informed in real time."
  },
  {
    question: "Why do businesses use workforce management software?",
    answer: "Businesses use workforce management software to improve scheduling operations, manage employee shifts, track attendance, simplify communication, and keep teams aligned with real-time schedule updates."
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
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-brand-primary font-black text-[10px] uppercase tracking-[0.2em] mb-6 border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            <HelpCircle size={12} className="text-brand-primary" /> Common FAQs
          </motion.div>
          
          <h2 className="text-4xl lg:text-6xl font-black text-brand-dark dark:text-white mb-6 tracking-tight">
            Got Questions? <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-purple-600">We've Got Honest Answers.</span>
          </h2>
          <p className="text-lg lg:text-xl text-brand-slate dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Everything you want to know about StaffSchedule.io — before you sign up, try it out, or switch from your current tool.
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
                transition={{ delay: Math.min(index * 0.05, 0.4) }}
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
                  <span className={`text-base lg:text-lg font-black transition-colors leading-snug ${
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
                        <div className="text-brand-slate dark:text-slate-300 font-medium text-sm lg:text-base leading-relaxed flex items-start gap-4">
                          <CheckCircle2 className="w-5 h-5 text-brand-primary flex-shrink-0 mt-1" />
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
