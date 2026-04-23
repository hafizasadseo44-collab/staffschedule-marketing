"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AuraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Base Gradient Surface */}
      <div className="absolute inset-0 bg-[#FAF9FF]" />

      {/* Primary Aura Blobs */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-indigo-200/30 blur-[120px] rounded-full"
      />

      <motion.div
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 60, -100, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-purple-200/20 blur-[100px] rounded-full"
      />

      {/* Floating Energy Streaks (SVG Paths) */}
      <svg className="absolute inset-0 w-full h-full opacity-40">
        <defs>
          <linearGradient id="streak-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          d="M-50 300 Q 200 100 500 400 T 1200 200"
          fill="none"
          stroke="url(#streak-grad)"
          strokeWidth="2"
        />

        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 7,
            delay: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          d="M1500 800 Q 1200 600 800 900 T -200 700"
          fill="none"
          stroke="url(#streak-grad)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Fine-grained noise overlay for texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
    </div>
  );
}
