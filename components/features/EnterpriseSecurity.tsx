"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Fingerprint, Key, ShieldAlert, Award, CheckCircle2 } from "lucide-react";

export default function EnterpriseSecurity() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1">
             <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 font-bold text-xs uppercase tracking-widest mb-6"
              >
                <ShieldCheck className="w-4 h-4" /> Bank-Level Security
              </motion.div>
              <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight"
              >
                 Enterprise protection <br />
                 <span className="text-brand-primary">for global data.</span>
              </motion.h2>
              <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="text-lg text-brand-slate dark:text-slate-400 font-medium mb-10"
              >
                 We take data sovereignty and security as seriously as you do. StaffSchedule Enterprise provides the advanced security layer required for large-scale organizations, from SSO to military-grade encryption.
              </motion.p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 {[
                   { title: "Single Sign-On (SSO)", desc: "Full SAML & OIDC support for Okta, Azure AD, and more.", icon: <Key /> },
                   { title: "Data Sovereignty", desc: "Regional data hosting to meet local privacy requirements.", icon: <Award /> },
                   { title: "Advanced Encryption", desc: "AES-256 bit encryption for all data at rest and in transit.", icon: <Lock /> },
                   { title: "Global Compliance", desc: "GDPR, CCPA, and SOC2 compliant architecture.", icon: <ShieldAlert /> },
                 ].map((item, i) => (
                    <motion.div 
                       key={i} 
                       initial={{ opacity: 0, y: 10 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.1 }}
                       className="flex flex-col gap-3"
                    >
                       <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-border flex items-center justify-center text-brand-primary">
                          {item.icon}
                       </div>
                       <div>
                          <div className="text-brand-dark dark:text-white font-black text-lg mb-1">{item.title}</div>
                          <div className="text-slate-500 text-sm font-medium">{item.desc}</div>
                       </div>
                    </motion.div>
                 ))}
              </div>
          </div>

          <div className="flex-1 w-full max-w-lg lg:max-w-none relative aspect-[4/3] flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
             
             {/* Dynamic Security Visual */}
             <div className="relative">
                <motion.div 
                   animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                   }}
                   transition={{ duration: 6, repeat: Infinity }}
                   className="w-48 h-48 sm:w-64 sm:h-64 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl flex items-center justify-center border-2 border-brand-primary relative z-10"
                >
                   <div className="flex flex-col items-center">
                      <Fingerprint className="w-20 h-20 sm:w-32 sm:h-32 text-brand-primary opacity-20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <ShieldCheck className="w-16 h-16 sm:w-24 sm:h-24 text-brand-primary" />
                      </div>
                   </div>
                </motion.div>

                {/* Secure Nodes */}
                <motion.div 
                   animate={{ x: [-20, 20] }}
                   transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                   className="absolute -top-10 -right-10 bg-emerald-500 text-white p-4 rounded-3xl shadow-xl shadow-emerald-500/20 flex items-center gap-3 z-20"
                >
                   <CheckCircle2 className="w-6 h-6" />
                   <div className="text-sm font-black whitespace-nowrap uppercase tracking-widest">SOC2 COMPLIANT</div>
                </motion.div>

                <motion.div 
                   animate={{ x: [20, -20] }}
                   transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                   className="absolute -bottom-10 -left-10 bg-slate-900 text-white p-4 rounded-3xl shadow-2xl flex items-center gap-3 z-20 border border-slate-700"
                >
                   <Key className="w-6 h-6 text-brand-primary" />
                   <div className="text-sm font-black whitespace-nowrap uppercase tracking-widest">SSO READY</div>
                </motion.div>
             </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
