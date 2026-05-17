"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Send, FileImage, Paperclip, MoreVertical, Check, CheckCheck } from "lucide-react";
import SimulationSidebar from "../SimulationSidebar";

interface SimulationTeamChatProps {
  isActive: boolean;
  updateCursor?: (x: number, y: number, clicking?: boolean) => void;
}

export default function SimulationTeamChat({ isActive, updateCursor }: SimulationTeamChatProps) {
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState("");

  const fullText = "Hey Sarah, can you cover my Friday shift?";

  useEffect(() => {
    if (!isActive || !updateCursor) {
      setStep(0);
      setTypedText("");
      return;
    }

    let isMounted = true;
    let timeoutId: any;

    const runLoop = async () => {
      while (isMounted) {
        setStep(0);
        setTypedText("");
        updateCursor(80, 50);

        // 1. Move to text input
        await new Promise(r => { timeoutId = setTimeout(r, 1000); });
        if (!isMounted) break;
        updateCursor(60, 85);
        await new Promise(r => { timeoutId = setTimeout(r, 600); });
        if (!isMounted) break;
        updateCursor(60, 85, true); // click input
        setStep(1);

        // 2. Type message
        await new Promise(r => { timeoutId = setTimeout(r, 400); });
        if (!isMounted) break;
        for (let i = 0; i <= fullText.length; i++) {
          if (!isMounted) break;
          setTypedText(fullText.substring(0, i));
          await new Promise(r => { timeoutId = setTimeout(r, 40); }); 
        }

        // 3. Move to send button
        await new Promise(r => { timeoutId = setTimeout(r, 400); });
        if (!isMounted) break;
        updateCursor(92, 85);
        await new Promise(r => { timeoutId = setTimeout(r, 400); });
        if (!isMounted) break;
        updateCursor(92, 85, true); // click send
        setStep(2); // message sent
        
        // 4. Typing indicator appears
        await new Promise(r => { timeoutId = setTimeout(r, 800); });
        if (!isMounted) break;
        setStep(3); // Sarah typing

        // 5. Reply appears
        await new Promise(r => { timeoutId = setTimeout(r, 1500); });
        if (!isMounted) break;
        setStep(4); // Reply sent

        // 6. Rest before restarting loop
        await new Promise(r => { timeoutId = setTimeout(r, 4000); });
      }
    };

    runLoop();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [isActive, updateCursor]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white flex pointer-events-none"
    >
      <SimulationSidebar activeTab="chat" />

      {/* Settings / Contacts Sidebar */}
      <div className="w-[320px] bg-slate-50 border-r border-[#E2E8F0] flex flex-col flex-shrink-0 relative z-10">
        <div className="p-4 border-b border-[#E2E8F0] bg-white">
          <h2 className="text-[20px] font-extrabold text-slate-800 tracking-tight mb-3">Team Chat</h2>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <div className="w-full bg-slate-100 text-sm py-2 pl-9 pr-3 rounded-xl text-slate-400">Search messages...</div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col p-2 space-y-1">
          {/* Active Contact */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50 border-l-2 border-indigo-600 cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                SC
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <span className="font-bold text-slate-800 text-sm truncate">Sarah Connor</span>
                <span className="text-[10px] font-bold text-indigo-600">Now</span>
              </div>
              <p className="text-xs text-indigo-900/70 truncate font-semibold">
                {step >= 4 ? "Sure! Just send the swap request." : step >= 3 ? "Typing..." : step >= 2 ? "Hey Sarah, can you cover..." : "Sounds good, thanks!"}
              </p>
            </div>
          </div>

          {/* Inactive Contacts */}
          {[
            { name: "John Smith", time: "10:42 AM", msg: "I'll be there in 10 mins.", initials: "JS", color: "bg-slate-200 text-slate-600" },
            { name: "Managers Group", time: "Yesterday", msg: "Don't forget to submit hours.", initials: "MG", color: "bg-emerald-100 text-emerald-700" },
            { name: "Mike Johnson", time: "Tuesday", msg: "Are we still on for the meeting?", initials: "MJ", color: "bg-amber-100 text-amber-700" }
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
              <div className="relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${c.color}`}>
                  {c.initials}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="font-bold text-slate-700 text-sm truncate">{c.name}</span>
                  <span className="text-[10px] font-medium text-slate-400">{c.time}</span>
                </div>
                <p className="text-xs text-slate-500 truncate">{c.msg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#F8FAFC]">
        {/* Chat Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E2E8F0] flex justify-between items-center shadow-sm z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-xs">
              SC
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Sarah Connor</h3>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Online</p>
            </div>
          </div>
          <div className="flex gap-2 text-slate-400">
            <div className="p-2 rounded-lg hover:bg-slate-100"><Search className="w-4 h-4" /></div>
            <div className="p-2 rounded-lg hover:bg-slate-100"><MoreVertical className="w-4 h-4" /></div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          <div className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest my-2">Today</div>
          
          <div className="flex items-end gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex-shrink-0"></div>
            <div className="max-w-[70%] bg-white border border-[#E2E8F0] shadow-sm rounded-2xl rounded-bl-none px-4 py-2.5 text-sm text-slate-700">
              Sounds good, thanks! <span className="text-[10px] text-slate-400 ml-2">09:12 AM</span>
            </div>
          </div>

          {/* Sent Message */}
          <AnimatePresence>
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex flex-col items-end gap-1 mt-4"
              >
                <div className="max-w-[70%] bg-indigo-600 text-white shadow-md rounded-2xl rounded-br-none px-4 py-2.5 text-sm">
                  {fullText} <span className="text-[10px] text-indigo-200 ml-2">Now</span>
                </div>
                <div className="flex items-center text-[10px] text-indigo-500 font-bold">
                  {step >= 4 ? <CheckCheck className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                  <span className="ml-1">{step >= 4 ? 'Read' : 'Delivered'}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-2 mt-4"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex-shrink-0"></div>
                <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-full px-4 py-3 flex gap-1.5 items-center">
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reply Message */}
          <AnimatePresence>
            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex items-end gap-2 mt-2"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex-shrink-0"></div>
                <div className="max-w-[70%] bg-white border border-[#E2E8F0] shadow-sm rounded-2xl rounded-bl-none px-4 py-2.5 text-sm text-slate-700">
                  Sure! Just send the swap request. <span className="text-[10px] text-slate-400 ml-2">Now</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Composer Tool */}
        <div className="p-4 bg-white border-t border-[#E2E8F0] z-20">
          <div className={`flex items-end gap-2 bg-[#F8FAFC] border rounded-2xl p-2 transition-colors ${step >= 1 && step < 2 ? 'border-indigo-400 shadow-sm ring-2 ring-indigo-500/10' : 'border-[#E2E8F0]'}`}>
             <div className="p-2 text-slate-400 hover:text-indigo-600 rounded-xl hover:bg-white transition-colors cursor-pointer"><Paperclip className="w-5 h-5" /></div>
             <div className="p-2 text-slate-400 hover:text-indigo-600 rounded-xl hover:bg-white transition-colors cursor-pointer"><FileImage className="w-5 h-5" /></div>
             
             <div className="flex-1 p-2 bg-transparent text-sm w-full outline-none align-middle flex items-center min-h-[40px]">
               {typedText ? (
                 <span className="text-slate-800 font-medium">{typedText}<span className="animate-pulse border-r-2 border-slate-800 ml-0.5"/></span>
               ) : (
                 <span className="text-slate-400">{step >= 2 ? "Write a message..." : "Write a message..."}</span>
               )}
             </div>

             <div className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${typedText.length > 0 && step < 2 ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-200 text-slate-400'}`}>
                <Send className="w-4 h-4 ml-0.5" />
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
