"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Eye, Lock, Globe, Server, UserCheck, Shield } from "lucide-react";

const trustItems = [
  {
    title: "SOC2 Compliance",
    description: "Industry-standard security controls for data protecting your organization.",
    icon: ShieldCheck
  },
  {
    title: "GDPR Ready",
    description: "Strict adherence to European data privacy and residency requirements.",
    icon: Globe
  },
  {
    title: "256-bit Encryption",
    description: "Your data is encrypted at rest and in transit using military-grade protocols.",
    icon: Lock
  },
  {
    title: "SSO & SAML",
    description: "Seamless integration with your existing enterprise identity providers.",
    icon: UserCheck
  },
  {
    title: "Live Monitoring",
    description: "24/7 infrastructure surveillance with 99.99% uptime guarantee.",
    icon: Server
  },
  {
    title: "Audit Logging",
    description: "Complete transparency with granular activity logs for every action.",
    icon: Eye
  }
];

const PricingTrust = () => {
  return (
    <section className="py-24 bg-white overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-8 border border-indigo-100">
               <Shield className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">
              Hardened against every threat.
            </h2>
            <p className="text-lg text-slate-500 font-medium mb-12 leading-relaxed max-w-xl">
              Trust is our core currency. We've engineered an infrastructure 
              that meets the compliance demands of the world's most regulated 
              industries.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
               {["SOC2 Type II", "GDPR", "ISO 27001", "HIPAA Ready"].map((badge) => (
                 <div key={badge} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">{badge}</span>
                 </div>
               ))}
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 relative">
            {trustItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-5 border border-slate-100">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTrust;
