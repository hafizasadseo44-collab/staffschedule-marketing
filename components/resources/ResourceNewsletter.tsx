"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Zap, Shield, Sparkles } from "lucide-react";

const ResourceNewsletter = () => {
  return (
    <section className="py-24 lg:py-48 bg-brand-dark relative overflow-hidden">
      {/* Dramatic Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-brand-primary/10 rounded-full blur-[180px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto p-12 lg:p-24 rounded-[4rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl relative overflow-hidden group shadow-3xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/20 blur-[100px] -mr-40 -mt-40 animate-pulse" />
          
          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-black text-[11px] uppercase tracking-[0.4em] mb-12"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              Staffing Secrets Inside
            </motion.div>
            
            <h2 className="text-4xl lg:text-7xl font-black text-white leading-[1] tracking-tighter mb-10">
              Operational <br />
              <span className="text-reveal">intelligence</span> in your inbox.
            </h2>
            
            <p className="text-xl lg:text-2xl text-slate-400 font-medium mb-16 max-w-2xl mx-auto leading-relaxed">
              Join 15,000+ operations leaders who get our bi-weekly blueprint 
              on labor compliance, efficiency tech, and team retention.
            </p>

            {/* Newsletter Form */}
            <form className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 mb-16 group/form">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-slate-500 group-focus-within/form:text-brand-primary transition-colors" />
                </div>
                <input
                  type="email"
                  placeholder="WORK EMAIL ADDRESS..."
                  className="w-full h-24 bg-white/5 border border-white/10 rounded-[2.5rem] pl-16 pr-8 text-sm font-black text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary/40 transition-all placeholder:text-slate-600"
                  required
                />
              </div>
              <button
                type="submit"
                className="h-24 px-12 bg-white text-brand-dark rounded-[2.5rem] text-xl font-black flex items-center justify-center gap-3 hover:bg-brand-primary hover:text-white transition-all shadow-xl active:scale-95"
              >
                Join Now <Zap className="w-5 h-5 fill-current" />
              </button>
            </form>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-10 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-brand-success" />
                Spam-Free Protocol
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(79,70,229,0.5)]" />
                Zero Cost Forever
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResourceNewsletter;
