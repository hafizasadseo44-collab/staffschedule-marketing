"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Mail, CheckCircle2, User, UserPlus } from "lucide-react";

export default function Step1AddTeam() {
  const [step, setStep] = useState(0);
  const [typedEmail, setTypedEmail] = useState("");
  const targetEmail = "john@example.com";

  useEffect(() => {
    let isMounted = true;
    
    const sequence = async () => {
      // Intial state
      await new Promise(r => setTimeout(r, 800));
      if (!isMounted) return;
      
      // 1. Click Invite
      setStep(1); // Open Modal
      
      // 2. Type email
      await new Promise(r => setTimeout(r, 800));
      for (let i = 0; i <= targetEmail.length; i++) {
        if (!isMounted) return;
        setTypedEmail(targetEmail.substring(0, i));
        await new Promise(r => setTimeout(r, 40));
      }
      
      // 3. Click Send
      await new Promise(r => setTimeout(r, 600));
      if (!isMounted) return;
      setStep(2); // Show Success State

      // 4. Reset after some time to loop? Or just stay?
      // Since it's scroll-linked, it's fine to stay or loop. Let's stay on success.
    };

    sequence();
    return () => { isMounted = false; };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-[#F4F0FC] p-6 sm:p-8 flex flex-col font-sans overflow-hidden"
    >
      {/* Background UI: Team Directory */}
      <div className="flex justify-between items-center mb-6">
        <div>
           <h3 className="text-xl font-bold text-slate-900 tracking-tight">Team Directory</h3>
           <p className="text-sm text-slate-500">Manage your staff and permissions.</p>
        </div>
        <div className={`px-4 py-2 rounded-xl text-white font-bold text-sm flex items-center gap-2 shadow-sm transition-transform ${step === 0 ? 'bg-indigo-600 scale-105 ring-4 ring-indigo-500/20' : 'bg-indigo-500'}`}>
           <UserPlus className="w-4 h-4" /> Invite Member
           {step === 0 && (
             <motion.div 
               layoutId="simCursor"
               className="absolute -right-2 -bottom-4 z-[100]"
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
             >
                <div className="w-5 h-5 bg-slate-800 rounded-full border-2 border-white flex items-center justify-center pointer-events-none drop-shadow-md relative">
                   <div className="absolute inset-0 bg-white rounded-full scale-50" />
                </div>
             </motion.div>
           )}
        </div>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl flex-1 flex flex-col overflow-hidden opacity-60">
        <div className="p-4 border-b border-slate-100 flex gap-4">
           <div className="relative flex-1">
             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <div className="w-full bg-slate-50 py-2 pl-9 rounded-lg text-sm text-slate-400">Search team...</div>
           </div>
        </div>
        <div className="p-4 space-y-3">
           {[1, 2, 3].map(i => (
             <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 bg-slate-50">
                <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                <div className="flex-1">
                  <div className="w-24 h-4 bg-slate-200 rounded mb-2"></div>
                  <div className="w-16 h-3 bg-slate-100 rounded"></div>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Invite Modal Overlay */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px] z-40 flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative"
            >
               {step === 1 ? (
                 <div className="p-6">
                   <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                     <Mail className="w-6 h-6 stroke-[2]" />
                   </div>
                   <h4 className="text-xl font-bold text-slate-900 mb-1">Invite to Workspace</h4>
                   <p className="text-sm text-slate-500 mb-6">Send an email invitation to a new team member.</p>
                   
                   <div className="space-y-4">
                     <div>
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Email Address</label>
                       <div className={`w-full p-3 rounded-xl border-2 flex items-center transition-colors ${typedEmail.length > 0 ? 'border-indigo-500 ring-4 ring-indigo-500/10' : 'border-slate-200'}`}>
                         <span className={typedEmail ? 'text-slate-900 font-medium' : 'text-slate-400'}>
                           {typedEmail || "Enter email address..."}
                           {step === 1 && <span className="inline-block w-0.5 h-4 bg-indigo-500 ml-0.5 align-middle animate-pulse" />}
                         </span>
                       </div>
                     </div>
                   </div>

                   <div className="mt-8 flex gap-3">
                      <div className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-center text-sm">Cancel</div>
                      <div className={`flex-1 py-3 text-white font-bold rounded-xl text-center text-sm transition-colors relative ${typedEmail === targetEmail ? 'bg-indigo-600 scale-105 shadow-lg shadow-indigo-600/20 ring-4 ring-indigo-500/20' : 'bg-indigo-300'}`}>
                        Send Invite
                        {typedEmail === targetEmail && step === 1 && (
                          <motion.div 
                            layoutId="simCursor"
                            className="absolute -right-2 -bottom-4 z-[100]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <div className="w-5 h-5 bg-slate-800 rounded-full border-2 border-white flex items-center justify-center pointer-events-none drop-shadow-md relative">
                               <div className="absolute inset-0 bg-white rounded-full scale-50" />
                            </div>
                          </motion.div>
                        )}
                      </div>
                   </div>
                 </div>
               ) : (
                 <div className="p-8 flex flex-col items-center justify-center text-center">
                   <motion.div 
                     initial={{ scale: 0.5, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1, rotate: [0, 15, 0] }}
                     transition={{ type: "spring", bounce: 0.5 }}
                     className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4"
                   >
                     <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                   </motion.div>
                   <h4 className="text-xl font-bold text-slate-900 mb-2">Invite Sent!</h4>
                   <p className="text-sm text-slate-500">John has been invited to join the staff.</p>
                 </div>
               )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
