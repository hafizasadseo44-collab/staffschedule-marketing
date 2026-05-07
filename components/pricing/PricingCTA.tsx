"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Sparkles } from "lucide-react";
import Link from "next/link";

const PricingCTA = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-10 lg:p-16 rounded-[3rem] bg-indigo-600 shadow-xl relative overflow-hidden"
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_100%)]" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-50 font-bold text-xs tracking-widest uppercase mb-8">
              <Zap className="w-4 h-4" />
              Start Scaling Today
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
              Stop guessing. Start scheduling.
            </h2>
            
            <p className="text-lg lg:text-xl text-indigo-100 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              Join 2,500+ teams who have already switched to the world's most 
              intuitive workforce management platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="https://app.staffschedule.io/onboarding.php?start_trial=1"
                className="w-full sm:w-auto h-16 px-10 bg-white text-indigo-600 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                Start Your 15-Day Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                href="/contact"
                className="w-full sm:w-auto h-16 px-10 bg-indigo-500/20 text-white border border-indigo-400/30 rounded-2xl text-lg font-bold flex items-center justify-center hover:bg-indigo-500/30 transition-all"
              >
                Contact Sales
              </Link>
            </div>

            <div className="mt-16 pt-10 border-t border-indigo-500/30 grid grid-cols-2 md:grid-cols-3 gap-6 text-xs font-bold text-indigo-200 uppercase tracking-widest">
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                No Card Required
              </div>
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" />
                Instant Setup
              </div>
              <div className="hidden md:flex items-center justify-center gap-2 col-span-2 md:col-span-1">
                <Sparkles className="w-4 h-4" />
                Unlimited Support
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingCTA;
