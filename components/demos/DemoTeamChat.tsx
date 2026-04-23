"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CheckCheck, Send } from "lucide-react";

const outgoingMsg = "Hey, can you cover my shift tomorrow?";
const incomingMsg = "Sure! I'll be there 👍";

const DemoTeamChat = () => {
  const [step, setStep] = useState(0);
  const [typedChars, setTypedChars] = useState(0);

  useEffect(() => {
    // Step 0: Idle (show existing messages)
    // Step 1: Typing outgoing message char-by-char
    // Step 2: Message sent (show full bubble + single check)
    // Step 3: Typing indicator from other user
    // Step 4: Reply appears
    // Step 5: Read receipts (double check) + pause
    const durations = [1200, 0, 800, 1500, 1500, 2000];

    if (step === 1) {
      // Typing animation
      if (typedChars < outgoingMsg.length) {
        const charTimer = setTimeout(() => setTypedChars((c) => c + 1), 40);
        return () => clearTimeout(charTimer);
      } else {
        const timer = setTimeout(() => setStep(2), 500);
        return () => clearTimeout(timer);
      }
    }

    const timer = setTimeout(() => {
      const next = (step + 1) % 6;
      if (next === 1) setTypedChars(0);
      setStep(next);
    }, durations[step] || 1500);
    return () => clearTimeout(timer);
  }, [step, typedChars]);

  const showOutgoing = step >= 2;
  const showTyping = step === 3;
  const showReply = step >= 4;
  const showRead = step >= 5;

  return (
    <div className="relative w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden select-none flex">
      {/* Sidebar */}
      <div className="w-[140px] border-r border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex-shrink-0 hidden sm:block">
        <div className="p-3 border-b border-slate-100 dark:border-slate-700">
          <p className="text-xs font-black text-slate-800 dark:text-white">Chats</p>
        </div>
        {[
          { name: "Sarah M.", preview: "On my way!", initials: "SM", color: "#6366f1", active: false },
          { name: "James K.", preview: "Hey, can you...", initials: "JK", color: "#8b5cf6", active: true },
          { name: "Team HR", preview: "Meeting at 3", initials: "TH", color: "#10b981", active: false },
        ].map((c, i) => (
          <div key={i} className={`flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors ${c.active ? "bg-indigo-50 dark:bg-indigo-900/30" : "hover:bg-slate-100 dark:hover:bg-slate-700"}`}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ background: c.color }}>
              {c.initials}
            </div>
            <div className="min-w-0">
              <p className={`text-[10px] font-bold truncate ${c.active ? "text-brand-primary" : "text-slate-700 dark:text-slate-300"}`}>{c.name}</p>
              <p className="text-[9px] text-slate-400 truncate">{c.preview}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-h-[260px]">
        {/* Chat Header */}
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="w-8 h-8 rounded-xl bg-purple-500 flex items-center justify-center text-white text-[10px] font-bold">JK</div>
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-white">James K.</p>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
              <span className="text-[9px] text-emerald-500 font-semibold">Online</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-3 space-y-2 overflow-hidden flex flex-col justify-end">
          {/* Existing conversation context */}
          <div className="flex items-end gap-2">
            <div className="w-6 h-6 rounded-lg bg-purple-500 flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0">JK</div>
            <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-2xl rounded-bl-sm max-w-[75%]">
              <p className="text-[11px] text-slate-700 dark:text-slate-300">Hey! What's the plan for tomorrow?</p>
            </div>
          </div>

          {/* Typing indicator (outgoing) */}
          {step === 1 && (
            <div className="flex items-end gap-2 justify-end">
              <div className="bg-gradient-to-r from-brand-primary to-brand-secondary px-3 py-1.5 rounded-2xl rounded-br-sm max-w-[75%]">
                <p className="text-[11px] text-white">{outgoingMsg.slice(0, typedChars)}<span className="animate-pulse">|</span></p>
              </div>
            </div>
          )}

          {/* Sent Message */}
          <AnimatePresence>
            {showOutgoing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-end gap-2 justify-end"
              >
                <div className="bg-gradient-to-r from-brand-primary to-brand-secondary px-3 py-1.5 rounded-2xl rounded-br-sm max-w-[75%] relative">
                  <p className="text-[11px] text-white">{outgoingMsg}</p>
                  <div className="flex items-center justify-end gap-1 mt-0.5">
                    <span className="text-[8px] text-white/60">10:32 AM</span>
                    {showRead ? (
                      <CheckCheck className="w-3 h-3 text-blue-300" />
                    ) : (
                      <Check className="w-3 h-3 text-white/50" />
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {showTyping && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-end gap-2"
              >
                <div className="w-6 h-6 rounded-lg bg-purple-500 flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0">JK</div>
                <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((dot) => (
                      <motion.div
                        key={dot}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.15 }}
                        className="w-1.5 h-1.5 rounded-full bg-slate-400"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reply */}
          <AnimatePresence>
            {showReply && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-end gap-2"
              >
                <div className="w-6 h-6 rounded-lg bg-purple-500 flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0">JK</div>
                <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-2xl rounded-bl-sm max-w-[75%]">
                  <p className="text-[11px] text-slate-700 dark:text-slate-300">{incomingMsg}</p>
                  <p className="text-[8px] text-slate-400 mt-0.5 text-right">10:33 AM</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
          <div className="flex-1 bg-white dark:bg-slate-700 rounded-xl px-3 py-1.5 text-[11px] text-slate-400 border border-slate-200 dark:border-slate-600">
            Type a message...
          </div>
          <div className="w-7 h-7 rounded-lg bg-brand-primary flex items-center justify-center text-white">
            <Send className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoTeamChat;
