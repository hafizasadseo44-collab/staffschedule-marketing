"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Fingerprint, Lock, Cloud } from "lucide-react";

const items = [
  {
    icon: ShieldAlert,
    title: "SOC2 Compliance",
    description: "Enterprise-grade data protection and regular external audits."
  },
  {
    icon: Fingerprint,
    title: "Role-Based Access",
    description: "Control exactly who can view, edit, or manage sensitive data."
  },
  {
    icon: Lock,
    title: "256-Bit Encryption",
    description: "Your data is encrypted at rest and in transit with the highest standards."
  },
  {
    icon: Cloud,
    title: "99.9% Uptime",
    description: "Reliable cloud infrastructure to keep your business running 24/7."
  }
];

const PricingSecurity = () => {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
           <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-200/50 border border-slate-300/50 text-slate-700 font-bold text-xs tracking-widest uppercase mb-8"
              >
                <Fingerprint className="w-3 h-3" />
                Enterprise Grade
              </motion.div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-6">
                Your data is private. <br />
                Your team is secured.
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
                 We build with trust first. From multi-factor authentication to advanced audit logging, 
                 StaffSchedule.io is designed for the world's most demanding operations.
              </p>
           </div>

           <motion.div 
             variants={{
               hidden: { opacity: 0 },
               visible: {
                 opacity: 1,
                 transition: { staggerChildren: 0.1 }
               }
             }}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6"
           >
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm"
                >
                  <div className="w-12 h-12 mb-6 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSecurity;
