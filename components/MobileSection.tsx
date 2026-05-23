"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";

export default function MobileSection() {
  return (
    <section className="relative py-24 lg:py-40 bg-slate-900 overflow-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-pink-500/10 to-violet-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-black text-[10px] uppercase tracking-widest mb-6">
              <Smartphone size={14} />
              Mobile App
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-8 leading-[1.1]">
              Your Workforce in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Your Pocket</span>
            </h2>

            <p className="text-lg text-slate-300 font-medium leading-relaxed mb-6">
              Managers don’t always work from one desk. That’s why StaffSchedule.io gives businesses the flexibility to manage staff scheduling, employee availability, leave requests, open shifts, and team communication from anywhere using one simple employee scheduling online app.
            </p>

            <p className="text-lg text-slate-300 font-medium leading-relaxed mb-8">
              Whether you’re at the office, at home, traveling, or managing multiple locations, our app for staff scheduling helps you stay connected with your employees in real time. You can create schedules, approve leaves, send announcements, and manage shift changes in just a few taps without stressful phone calls, messy spreadsheets, or confusing group chats.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <p className="text-slate-200 font-semibold leading-relaxed">
                StaffSchedule.io is built to make team management easier for growing businesses with a powerful team scheduling app and employee work schedule app that keeps everyone organized, informed, and productive from anywhere.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-[400px]">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/30 to-purple-500/30 blur-2xl rounded-[3rem] transform scale-95" />
              <img 
                src="/staffschedule-mobile-app.png" 
                alt="StaffSchedule.io Mobile App" 
                className="relative z-10 w-full h-auto drop-shadow-2xl"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
