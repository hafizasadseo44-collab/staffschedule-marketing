"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, CheckCircle2, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is staff scheduling software and do I actually need it?",
    answer: "If you're still building weekly rosters on spreadsheets, WhatsApp groups, or sticky notes — yes, you need it. Staff scheduling software is a digital tool that automates how you create, manage, and share employee shifts. Instead of spending hours every week figuring out who's available and who's on leave, the software handles it in minutes. For any business with more than 5 employees and rotating shifts, it's not a luxury — it's a time-saver you'll wonder how you lived without."
  },
  {
    question: "How is StaffSchedule.io different from other employee scheduling software?",
    answer: "Most employee scheduling software gives you a calendar and calls it a day. StaffSchedule.io goes further — combining smart shift scheduling, real-time team chat, AI-powered forecasting, multi-location management, and live analytics in one platform. You don't need five different tools. You need one that actually works end-to-end. That's what we built."
  },
  {
    question: "Is there a free plan? Can I try it before paying?",
    answer: "Yes — StaffSchedule.io offers a free trial so you can explore the platform with your actual team before committing to anything. No credit card required to get started. If you're looking for a free employee scheduling software option to test the waters, our trial gives you full access to core features so you can see the difference firsthand."
  },
  {
    question: "How long does it take to set up and onboard my team?",
    answer: "Most teams are fully set up within a day. You import your roster or invite staff via magic links, assign roles and locations, and your employee scheduling app is ready to go. There's no steep learning curve — if your team can use a smartphone, they can use StaffSchedule.io."
  },
  {
    question: "Can I manage multiple locations from one account?",
    answer: "Absolutely. Whether you're running 2 branches or 200, our workforce scheduling software lets you switch between locations instantly, share staff across sites, and monitor every team from a single dashboard. No logging in and out. No confusion. Just complete visibility across your entire operation."
  },
  {
    question: "What happens when an employee can't make their shift?",
    answer: "With our built-in shift swap feature, employees can request a swap directly through the staff scheduling app — and managers approve it in one click. No frantic group texts. No scrambling for last-minute cover. The right person shows up, every time."
  },
  {
    question: "Does StaffSchedule.io work for my industry?",
    answer: "If your business runs on shifts, it works for you. Our team scheduling app is used across healthcare, retail, hospitality, logistics, cafés, clinics, and more. The platform adapts to how your industry actually schedules — not the other way around."
  },
  {
    question: "Can employees see their own schedules on their phones?",
    answer: "Yes. Your team gets instant access to their shifts through our employee scheduling app — directly on their phone. When schedules are published or updated, they get notified immediately. No more \"I didn't know I was working\" excuses."
  },
  {
    question: "How does StaffSchedule.io help reduce overtime and labor costs?",
    answer: "Our shift management software automatically flags overtime risks before you publish a schedule. Pair that with AI forecasting and real-time labor cost tracking, and you'll always know exactly what your workforce is costing you — and where you can trim without hurting coverage."
  },
  {
    question: "Is my data secure? What if I want to cancel?",
    answer: "Your data is encrypted and stored securely — we take privacy seriously. And if you ever decide to leave (though our users rarely do), cancelling is simple with no hidden fees or long-term contracts. We believe in earning your business every single month, not locking you in."
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
