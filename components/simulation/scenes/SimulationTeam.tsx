"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Mail, CheckCircle2 } from "lucide-react";
import SimulationSidebar from "../SimulationSidebar";

interface SimulationTeamProps {
  isActive: boolean;
  updateCursor?: (x: number, y: number, clicking: boolean) => void;
}

export default function SimulationTeam({ isActive, updateCursor }: SimulationTeamProps) {
  const [step, setStep] = useState(0);
  const [typedEmail, setTypedEmail] = useState("");
  const targetEmail = "john@example.com";

  useEffect(() => {
    if (!isActive) return;
    let isMounted = true;
    let seqTimeout: any;

    const sequence = async () => {
      // 0. Wait and move cursor to "Add Member" button
      seqTimeout = setTimeout(() => updateCursor?.(88, 12, false), 500);
      await new Promise(r => setTimeout(r, 1200));
      if (!isMounted) return;

      // 1. Click "Add Member" -> Open Modal
      updateCursor?.(88, 12, true);
      await new Promise(r => setTimeout(r, 200));
      if (!isMounted) return;
      setStep(1);
      updateCursor?.(88, 12, false);

      // 2. Move cursor to email input field
      await new Promise(r => setTimeout(r, 500));
      if (!isMounted) return;
      updateCursor?.(50, 48, false);
      await new Promise(r => setTimeout(r, 800));
      if (!isMounted) return;
      updateCursor?.(50, 48, true);
      await new Promise(r => setTimeout(r, 200));
      if (!isMounted) return;
      updateCursor?.(50, 48, false);

      // 3. Type email
      await new Promise(r => setTimeout(r, 400));
      for (let i = 0; i <= targetEmail.length; i++) {
        if (!isMounted) return;
        setTypedEmail(targetEmail.substring(0, i));
        await new Promise(r => setTimeout(r, 40));
      }

      // 4. Move cursor to "Send Invite"
      await new Promise(r => setTimeout(r, 500));
      if (!isMounted) return;
      updateCursor?.(70, 72, false);
      await new Promise(r => setTimeout(r, 600));
      if (!isMounted) return;

      // 5. Click "Send Invite" -> Show Success Checkmark
      updateCursor?.(70, 72, true);
      await new Promise(r => setTimeout(r, 200));
      if (!isMounted) return;
      setStep(2);
      updateCursor?.(70, 72, false);

      // 6. Reset
      await new Promise(r => setTimeout(r, 2000));
      if (!isMounted) return;
      setStep(0);
      setTypedEmail("");
      updateCursor?.(50, 80, false);
    };

    sequence();
    return () => { 
      isMounted = false; 
      clearTimeout(seqTimeout);
    };
  }, [isActive, updateCursor]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex font-sans overflow-hidden bg-[#f4f3ff]"
    >
      <SimulationSidebar activeTab="team" />
      <div className="flex-1 p-5 flex flex-col overflow-hidden">
      {/* Background UI: Team Directory List */}
      <div className="flex justify-between items-center mb-6">
        <div>
           <h3 className="text-xl font-bold text-slate-900 tracking-tight">Team Members</h3>
           <p className="text-sm text-slate-500">Manage your staff and send invitations.</p>
        </div>
        <div className={`px-4 py-2 rounded-xl text-white font-bold text-sm flex items-center gap-2 shadow-sm transition-transform ${step === 0 ? 'bg-[#4F46E5]' : 'bg-[#4F46E5] opacity-80'}`}>
           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
           </svg>
           Add Member
        </div>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl flex-1 flex flex-col overflow-hidden relative z-0">
        <div className="p-4 border-b border-slate-100 flex gap-4 bg-slate-50/50">
           <div className="relative w-64">
             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <div className="w-full bg-white border border-slate-200 py-2 pl-9 rounded-lg text-sm text-slate-400">Search team...</div>
           </div>
           <div className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 bg-white">Filters</div>
        </div>

        {/* Example Table rows */}
        <div className="flex-1 overflow-hidden">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="border-b border-slate-100 bg-slate-50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    <th className="py-3 px-4 font-bold">Employee</th>
                    <th className="py-3 px-4 font-bold">Role</th>
                    <th className="py-3 px-4 font-bold">Department</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                 </tr>
              </thead>
              <tbody>
                 {[
                   { name: "Sarah Connor", role: "Manager", dept: "Front Desk", status: "Active", bg: "bg-emerald-100 text-emerald-700" },
                   { name: "Michael Johnson", role: "Employee", dept: "Housekeeping", status: "Active", bg: "bg-emerald-100 text-emerald-700" },
                   { name: "Emily Chen", role: "Employee", dept: "Maintenance", status: "Pending", bg: "bg-amber-100 text-amber-700" },
                 ].map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50">
                       <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                               {row.name.split(" ").map(n => n[0]).join("")}
                             </div>
                             <div>
                                <div className="text-sm font-bold text-slate-900">{row.name}</div>
                             </div>
                          </div>
                       </td>
                       <td className="py-3 px-4 text-sm text-slate-600 font-medium">{row.role}</td>
                       <td className="py-3 px-4 text-sm text-slate-600 font-medium">{row.dept}</td>
                       <td className="py-3 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${row.bg}`}>
                             {row.status}
                          </span>
                       </td>
                    </tr>
                 ))}
                 
                 {/* Empty rows to fill space */}
                 {[1, 2].map((_, i) => (
                    <tr key={`empty-${i}`} className="border-b border-slate-50">
                       <td className="py-3 px-4"><div className="w-32 h-4 bg-slate-100 rounded"></div></td>
                       <td className="py-3 px-4"><div className="w-16 h-4 bg-slate-100 rounded"></div></td>
                       <td className="py-3 px-4"><div className="w-24 h-4 bg-slate-100 rounded"></div></td>
                       <td className="py-3 px-4"><div className="w-12 h-4 bg-slate-100 rounded"></div></td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>

      {/* Invite Modal Overlay */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-40 flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm bg-white rounded-[1.5rem] shadow-2xl border border-slate-100 overflow-hidden relative"
            >
               {step === 1 ? (
                 <div className="p-6">
                   <div className="w-12 h-12 bg-indigo-50 text-[#4F46E5] rounded-xl flex items-center justify-center mb-4">
                     <Mail className="w-6 h-6 stroke-[2]" />
                   </div>
                   <h4 className="text-xl font-bold text-slate-900 mb-1">Invite to Workspace</h4>
                   <p className="text-sm text-slate-500 mb-6">Send an email invitation to a new team member. They will receive a magic link.</p>
                   
                   <div className="space-y-4">
                     <div>
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Email Address</label>
                       <div className={`w-full p-3 rounded-xl border-2 flex items-center transition-colors ${typedEmail.length > 0 ? 'border-[#4F46E5] ring-4 ring-indigo-500/10' : 'border-slate-200'}`}>
                         <span className={typedEmail ? 'text-slate-900 font-medium' : 'text-slate-400'}>
                           {typedEmail || "Enter employee email..."}
                           {step === 1 && <span className="inline-block w-0.5 h-4 bg-[#4F46E5] ml-0.5 align-middle animate-pulse" />}
                         </span>
                       </div>
                     </div>
                   </div>

                   <div className="mt-8 flex gap-3">
                      <div className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-center text-sm">Cancel</div>
                      <div className={`flex-1 py-3 text-white font-bold rounded-xl text-center text-sm transition-colors relative ${typedEmail === targetEmail ? 'bg-[#4F46E5] shadow-lg shadow-indigo-600/30' : 'bg-indigo-300'}`}>
                        Send Invite
                      </div>
                   </div>
                 </div>
               ) : (
                 <div className="p-8 flex flex-col items-center justify-center text-center">
                   <motion.div 
                     initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
                     animate={{ scale: 1, opacity: 1, rotate: 0 }}
                     transition={{ type: "spring", bounce: 0.5 }}
                     className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4"
                   >
                     <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                   </motion.div>
                   <h4 className="text-xl font-bold text-slate-900 mb-2">Invite Sent!</h4>
                   <p className="text-sm text-slate-500">John has been invited to join the staff. An email is on its way.</p>
                 </div>
               )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </motion.div>
  );
}
