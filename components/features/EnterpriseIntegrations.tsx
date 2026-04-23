"use client";

import React from "react";
import { motion } from "framer-motion";
import { Network, Database, Zap, Cpu, Server, Puzzle } from "lucide-react";

export default function EnterpriseIntegrations() {
  return (
    <section className="py-24 bg-brand-dark overflow-hidden relative border-t border-slate-800">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1 w-full max-w-lg lg:max-w-none relative min-h-[400px] flex items-center justify-center">
             
             {/* Central StaffSchedule Hub */}
             <div className="relative">
                <motion.div 
                   animate={{ scale: [1, 1.05, 1] }}
                   transition={{ duration: 4, repeat: Infinity }}
                   className="w-24 h-24 lg:w-32 lg:h-32 bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center relative z-20"
                >
                   <div className="text-brand-dark font-black text-xl lg:text-2xl text-center leading-none">
                      <span className="text-brand-primary">SS</span><br/><span className="text-[10px] uppercase tracking-widest opacity-60">HUB</span>
                   </div>
                </motion.div>
                
                {/* Orbital Integrations */}
                {[
                   { icon: <Database className="w-5 h-5"/>, label: 'Workday', delay: 0 },
                   { icon: <Cpu className="w-5 h-5"/>, label: 'SAP', delay: 1 },
                   { icon: <Server className="w-5 h-5"/>, label: 'Oracle', delay: 2 },
                   { icon: <Zap className="w-5 h-5"/>, label: 'ADP', delay: 3 },
                ].map((item, i) => (
                   <motion.div 
                      key={i}
                      animate={{ 
                         rotate: 360,
                         scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                         rotate: { duration: 20 + (i * 5), repeat: Infinity, ease: "linear" },
                         scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i }
                      }}
                      className="absolute top-1/2 left-1/2 h-48 sm:h-64 pointer-events-none"
                   >
                      <div className="relative -top-6 -left-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex flex-col items-center gap-1 shadow-xl">
                         <div className="text-brand-primary">{item.icon}</div>
                         <div className="text-[10px] font-black text-white uppercase tracking-widest">{item.label}</div>
                      </div>
                   </motion.div>
                ))}
             </div>

          </div>

          <div className="flex-1">
             <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6"
              >
                <Puzzle className="w-4 h-4" /> Seamless Ecosystem
              </motion.div>
              <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
              >
                 Integrates with your <br />
                 <span className="text-brand-primary">enterprise stack.</span>
              </motion.h2>
              <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="text-lg text-slate-400 font-medium mb-10"
              >
                 StaffSchedule Hub isn't an island. We speak the language of enterprise IT. Automatically sync workforce data into your HRIS, Payroll, and ERP systems via our robust REST API and pre-built enterprise connectors.
              </motion.p>
              
              <ul className="space-y-6">
                 {[
                   { title: "Bi-Directional Sync", desc: "Keep employee data, site codes, and payroll synced across all systems." },
                   { title: "SSO Ready", desc: "Integrate with Okta, Azure AD, and Ping Identity out of the box." },
                   { title: "Audit-Ready Logs", desc: "Securely transmit operational data to your central global data warehouse." },
                 ].map((item, i) => (
                    <motion.li 
                       key={i} 
                       initial={{ opacity: 0, x: 20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.1 }}
                       className="flex items-start gap-4"
                    >
                       <div className="mt-1 w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                          <Zap className="w-3.5 h-3.5 text-brand-primary" />
                       </div>
                       <div>
                          <div className="text-white font-black text-xl mb-1">{item.title}</div>
                          <div className="text-slate-400 font-medium text-sm">{item.desc}</div>
                       </div>
                    </motion.li>
                 ))}
              </ul>
          </div>
          
        </div>
      </div>
    </section>
  );
}
