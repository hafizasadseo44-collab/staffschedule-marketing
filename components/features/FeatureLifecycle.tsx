"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

interface Step {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface FeatureLifecycleProps {
  title: string;
  subtitle: string;
  steps: Step[];
}

export default function FeatureLifecycle({ title, subtitle, steps }: FeatureLifecycleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="py-24 bg-white dark:bg-brand-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 lg:mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-black text-brand-dark dark:text-white mb-6 tracking-tight"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-brand-slate dark:text-slate-400 font-medium max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical Progress Line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-1 bg-brand-primary hidden md:block"
          />

          <div className="space-y-24 lg:space-y-40">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center gap-12 lg:gap-24">
                  {/* Step Bubble */}
                  <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 w-12 h-12 bg-white dark:bg-brand-dark border-4 border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center z-10 hidden md:flex">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ margin: "-100px" }}
                      className="w-4 h-4 bg-brand-primary rounded-full"
                    />
                  </div>

                  {/* Content (Changes side per row) */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-100px" }}
                    className={`flex-1 w-full text-center md:text-left ${isEven ? 'md:pr-24 lg:pr-40' : 'md:pl-24 lg:pl-40 md:order-2'}`}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-black text-[10px] uppercase tracking-widest mb-4">
                      Step {index + 1}
                    </div>
                    <h3 className="text-3xl font-black text-brand-dark dark:text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-brand-slate dark:text-slate-400 font-medium leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>

                  {/* Visual/Empty space for alternates */}
                  <div className={`flex-1 hidden md:block ${isEven ? 'md:order-2' : ''}`}>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ margin: "-100px" }}
                      className="aspect-video bg-slate-50 dark:bg-slate-900 rounded-3xl border border-border flex items-center justify-center p-8 overflow-hidden relative group"
                    >
                       <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                       <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                          {step.icon || <CheckCircle2 className="w-8 h-8" />}
                       </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
