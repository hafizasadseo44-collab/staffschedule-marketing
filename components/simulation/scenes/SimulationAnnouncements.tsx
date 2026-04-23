"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, Plus, Image as ImageIcon, Paperclip, Send, Globe, Pin, MoreHorizontal } from "lucide-react";

interface SimulationAnnouncementsProps {
  isActive: boolean;
  updateCursor?: (x: number, y: number, clicking?: boolean) => void;
}

export default function SimulationAnnouncements({ isActive, updateCursor }: SimulationAnnouncementsProps) {
  const [step, setStep] = useState(0);
  const [typedTitle, setTypedTitle] = useState("");
  const [typedBody, setTypedBody] = useState("");

  const fullTitle = "Team meeting this Friday";
  const fullBody = "We will be reviewing the new Q4 schedule and discussing holiday availability.";

  useEffect(() => {
    if (!isActive || !updateCursor) {
      setStep(0);
      setTypedTitle("");
      setTypedBody("");
      return;
    }

    const sequence = async () => {
      setStep(0);
      setTypedTitle("");
      setTypedBody("");
      updateCursor(90, 80);

      // 1. Move to "New Announcement" button
      await new Promise(r => setTimeout(r, 600));
      updateCursor(90, 15);
      await new Promise(r => setTimeout(r, 400));
      updateCursor(90, 15, true);
      setStep(1); // Open Composer

      // 2. Move to Title input
      await new Promise(r => setTimeout(r, 500));
      updateCursor(35, 12);
      await new Promise(r => setTimeout(r, 300));
      updateCursor(35, 12, true);
      setStep(2); // Focus Title

      // 3. Type Title
      await new Promise(r => setTimeout(r, 300));
      for (let i = 0; i <= fullTitle.length; i++) {
        setTypedTitle(fullTitle.substring(0, i));
        await new Promise(r => setTimeout(r, 30)); 
      }

      // 4. Move to Body input
      updateCursor(35, 22);
      await new Promise(r => setTimeout(r, 400));
      updateCursor(35, 22, true);
      setStep(3); // Focus Body

      // 5. Type Body
      await new Promise(r => setTimeout(r, 300));
      for (let i = 0; i <= fullBody.length; i++) {
        setTypedBody(fullBody.substring(0, i));
        await new Promise(r => setTimeout(r, 20)); 
      }

      // 6. Move to Publish
      await new Promise(r => setTimeout(r, 400));
      updateCursor(92, 38);
      await new Promise(r => setTimeout(r, 400));
      updateCursor(92, 38, true);
      setStep(4); // Published - show in feed

      // Move to sidebar Analytics for next scene
      await new Promise(r => setTimeout(r, 1200));
      updateCursor(10, 68);
      await new Promise(r => setTimeout(r, 800));
      updateCursor(10, 68, true);
    };

    sequence();
  }, [isActive, updateCursor]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-[#F4F0FC] flex flex-col pointer-events-none overflow-y-auto custom-scrollbar p-8"
    >
      <div className="max-w-4xl mx-auto w-full space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shadow-inner">
               <Megaphone className="w-6 h-6 stroke-[2]" />
             </div>
             <div>
               <h2 className="text-xl font-bold text-slate-800">Announcements</h2>
               <p className="text-sm text-slate-500 mt-0.5">Broadcast important updates to your team.</p>
             </div>
          </div>
          {step === 0 && (
            <div className="px-4 py-2 bg-indigo-600 text-white font-bold text-sm rounded-lg shadow-sm flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Announcement
            </div>
          )}
        </div>

        {/* Composer */}
        <AnimatePresence>
          {step >= 1 && step < 4 && (
            <motion.div
               initial={{ opacity: 0, height: 0, y: -20 }}
               animate={{ opacity: 1, height: 'auto', y: 0 }}
               exit={{ opacity: 0, height: 0, scale: 0.95 }}
               className="bg-white rounded-2xl shadow-md border-2 border-indigo-500 overflow-hidden"
            >
              <div className="p-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white">
                  JD
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm leading-none">Jane Doe</h3>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">
                    <Globe className="w-3 h-3" /> All Locations
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className={`text-lg font-bold border-none outline-none w-full placeholder-slate-300 ${step === 2 && typedTitle === "" ? 'text-slate-300 relative' : 'text-slate-800'}`}>
                   {typedTitle || "Announcement Title"}
                   {step === 2 && <span className="absolute ml-0.5 w-0.5 h-6 bg-indigo-500 animate-[pulse_1s_infinite]"></span>}
                </div>
                <div className={`text-sm border-none outline-none w-full placeholder-slate-300 resize-none min-h-[60px] ${step === 3 && typedBody === "" ? 'text-slate-300 relative' : 'text-slate-600'}`}>
                   {typedBody || "Write your message here..."}
                   {step === 3 && <span className="w-0.5 h-4 bg-indigo-500 animate-[pulse_1s_infinite] inline-block align-middle ml-0.5"></span>}
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="p-2 text-slate-400 rounded-lg hover:bg-slate-200"><ImageIcon className="w-5 h-5"/></div>
                  <div className="p-2 text-slate-400 rounded-lg hover:bg-slate-200"><Paperclip className="w-5 h-5"/></div>
                </div>
                <div className="px-6 py-2 bg-indigo-600 text-white font-bold text-sm rounded-lg shadow-sm shadow-indigo-500/30 flex items-center gap-2">
                  <Send className="w-4 h-4" /> Publish
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feed */}
        <div className="space-y-4 max-w-3xl mx-auto">
          
          <AnimatePresence>
            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="bg-white rounded-2xl shadow-sm border-2 border-indigo-400 p-6 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] uppercase font-bold tracking-widest rounded-bl-lg">Just Now</div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center text-white font-bold shadow-sm">
                      JD
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-base leading-tight">Jane Doe <span className="text-slate-400 text-sm font-normal ml-1">posted an announcement</span></h4>
                      <p className="text-xs text-slate-400 mt-1">Main Branch • seconds ago</p>
                    </div>
                  </div>
                  <MoreHorizontal className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{fullTitle}</h3>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{fullBody}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Existing Post */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative">
            <div className="absolute top-4 right-4"><Pin className="w-4 h-4 text-emerald-500 fill-emerald-100" /></div>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold shadow-sm">
                  SC
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-base leading-tight">Sarah Connor <span className="text-slate-400 text-sm font-normal ml-1">posted an announcement</span></h4>
                  <p className="text-xs text-slate-500 mt-1">Main Branch • 2 days ago</p>
                </div>
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Welcome to the new system!</h3>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">Please make sure to check your upcoming shifts and update your availability for next week.</p>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
