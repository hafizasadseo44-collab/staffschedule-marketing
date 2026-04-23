"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default function Hero3DBackground() {
  // Generate randomized schedule beams
  const beams = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => {
      const top = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = 15 + Math.random() * 25;
      const width = 10 + Math.random() * 40; // 10% to 50%
      const opacity = 0.2 + Math.random() * 0.4;
      const isPrimary = Math.random() > 0.5;

      return { top, delay, duration, width, opacity, isPrimary };
    });
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-brand-dark pointer-events-none">
      {/* Deep Space Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-primary/30 via-brand-dark to-slate-950" />
      
      {/* Subtle Matrix Grid */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Animated Beams (Video / Schedule Lines) */}
      <div className="absolute inset-0 w-full h-full transform skew-y-[-4deg] scale-[1.15]">
        {/* Thin Video timeline tracks */}
        {beams.map((beam, i) => (
          <motion.div
            key={`beam-${i}`}
            className={`absolute h-[1px] md:h-[2px] rounded-full blur-[1px] shadow-[0_0_20px_4px_rgba(79,70,229,0.4)] ${
              beam.isPrimary ? "bg-indigo-400" : "bg-sky-400"
            }`}
            style={{
              top: `${beam.top}%`,
              width: `${beam.width}%`,
              opacity: beam.opacity,
            }}
            animate={{
              x: ["-100vw", "100vw"],
            }}
            transition={{
              duration: beam.duration,
              repeat: Infinity,
              ease: "linear",
              delay: beam.delay,
            }}
          />
        ))}

        {/* Thick Schedule Component Blocks */}
        {beams.slice(0, 10).map((beam, i) => (
          <motion.div
            key={`block-${i}`}
            className={`absolute h-8 md:h-14 rounded-lg md:rounded-xl border border-white/5 backdrop-blur-md overflow-hidden ${
              beam.isPrimary ? "bg-brand-primary/10" : "bg-brand-secondary/10"
            }`}
            style={{
              top: `${beam.top}%`,
              width: `${beam.width / 1.5}%`,
              opacity: beam.opacity + 0.3,
            }}
            animate={{
              x: ["-50vw", "120vw"],
            }}
            transition={{
              duration: beam.duration * 1.2,
              repeat: Infinity,
              ease: "linear",
              delay: beam.delay * 1.5,
            }}
          >
             {/* Simulating shift details inside the block */}
             <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-brand-primary to-brand-secondary" />
             <div className="w-1/3 h-1.5 md:h-2 bg-white/30 rounded-full mt-2 md:mt-3 ml-4" />
             <div className="w-1/2 h-1 md:h-1.5 bg-white/10 rounded-full mt-1.5 md:mt-2 ml-4" />
          </motion.div>
        ))}
      </div>

      {/* Top & Bottom Deep Vignette to blend into normal sections */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-slate-50/50 dark:from-slate-900 to-transparent opacity-100 z-10" />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-brand-dark to-transparent opacity-90 z-10" />
    </div>
  );
}
