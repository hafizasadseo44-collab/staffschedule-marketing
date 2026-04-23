"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Send, Megaphone, Clock } from "lucide-react";

const announcementText = "Holiday schedule update — all shifts on Dec 25 are optional.";

const DemoAnnouncements = () => {
  const [step, setStep] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [notifCount, setNotifCount] = useState(1);

  useEffect(() => {
    // Step 0: Show existing feed
    // Step 1: Typing in composer
    // Step 2: "Send" clicked
    // Step 3: New announcement appears in feed
    // Step 4: Notification badge bumps
    // Step 5: Pause before loop
    const durations = [1500, 0, 800, 1000, 1200, 2000];

    if (step === 1) {
      if (typedChars < announcementText.length) {
        const charTimer = setTimeout(() => setTypedChars((c) => c + 1), 30);
        return () => clearTimeout(charTimer);
      } else {
        const timer = setTimeout(() => setStep(2), 600);
        return () => clearTimeout(timer);
      }
    }

    const timer = setTimeout(() => {
      const next = (step + 1) % 6;
      if (next === 0) {
        setTypedChars(0);
        setNotifCount(1);
      }
      if (next === 4) setNotifCount(2);
      setStep(next);
    }, durations[step] || 1500);
    return () => clearTimeout(timer);
  }, [step, typedChars]);

  const showNewAnnouncement = step >= 3;
  const sendPulse = step === 2;

  return (
    <div className="relative w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <Megaphone className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-bold text-slate-800 dark:text-white">Announcements</span>
        </div>
        <div className="relative">
          <Bell className="w-4 h-4 text-slate-400" />
          <motion.div
            key={notifCount}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center"
          >
            <span className="text-[8px] font-bold text-white">{notifCount}</span>
          </motion.div>
        </div>
      </div>

      {/* Composer */}
      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
          <div className="min-h-[40px] text-[11px] text-slate-600 dark:text-slate-300 mb-2 leading-relaxed">
            {step === 1 ? (
              <span>{announcementText.slice(0, typedChars)}<span className="animate-pulse text-brand-primary">|</span></span>
            ) : step === 0 ? (
              <span className="text-slate-400">Write an announcement...</span>
            ) : step >= 2 && step <= 3 ? (
              <span className="text-slate-400">Write an announcement...</span>
            ) : (
              <span className="text-slate-400">Write an announcement...</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              <div className="w-6 h-6 rounded-md bg-slate-200 dark:bg-slate-600"></div>
              <div className="w-6 h-6 rounded-md bg-slate-200 dark:bg-slate-600"></div>
            </div>
            <motion.button
              animate={sendPulse ? { scale: [1, 0.9, 1] } : {}}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                step === 1 || step === 2
                  ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
                  : "bg-slate-200 dark:bg-slate-600 text-slate-400"
              }`}
            >
              <Send className="w-3 h-3" />
              Send
            </motion.button>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="px-4 py-3 space-y-3 max-h-[200px] overflow-hidden">
        {/* New Announcement */}
        <AnimatePresence>
          {showNewAnnouncement && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-md bg-amber-500 flex items-center justify-center text-white text-[8px] font-bold">YO</div>
                <span className="text-[10px] font-bold text-slate-700 dark:text-white">You</span>
                <span className="text-[9px] text-slate-400 ml-auto flex items-center gap-1"><Clock className="w-2.5 h-2.5" />Just now</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">{announcementText}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Existing Announcements */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-5 h-5 rounded-md bg-indigo-500 flex items-center justify-center text-white text-[8px] font-bold">SM</div>
            <span className="text-[10px] font-bold text-slate-700 dark:text-white">Sarah M.</span>
            <span className="text-[9px] text-slate-400 ml-auto">2h ago</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Team meeting moved to 3 PM today. Please confirm attendance.</p>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-5 h-5 rounded-md bg-emerald-500 flex items-center justify-center text-white text-[8px] font-bold">JK</div>
            <span className="text-[10px] font-bold text-slate-700 dark:text-white">James K.</span>
            <span className="text-[9px] text-slate-400 ml-auto">Yesterday</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">New uniform policy starts next Monday. Check your email for details.</p>
        </div>
      </div>
    </div>
  );
};

export default DemoAnnouncements;
