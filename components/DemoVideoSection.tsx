"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function DemoVideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-brand-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/8 border border-brand-primary/15 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6"
          >
            See it live
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-[1.1]"
          >
            Watch StaffSchedule{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
              in action.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500 font-medium max-w-xl mx-auto"
          >
            See how a manager builds a perfect week's schedule, handles a last-minute call-out, and publishes shifts to 30 staff — in under 3 minutes.
          </motion.p>
        </div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Glow behind video */}
          <div
            className="absolute -inset-6 rounded-[3rem] blur-3xl pointer-events-none"
            style={{ background: "rgba(79,70,229,0.12)" }}
          />

          <div
            className="relative rounded-[2rem] overflow-hidden aspect-video bg-slate-900 cursor-pointer group"
            style={{
              border: "1.5px solid rgba(79,70,229,0.2)",
              boxShadow: "0 40px 100px rgba(79,70,229,0.12), 0 0 0 1px rgba(79,70,229,0.08) inset",
            }}
            onClick={() => setPlaying(true)}
          >
            {/* Thumbnail / Placeholder gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0F172A]">
              {/* Abstract scheduling grid texture */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `linear-gradient(rgba(79,70,229,0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(79,70,229,0.3) 1px, transparent 1px)`,
                  backgroundSize: "60px 40px",
                }}
              />
              {/* Floating simulated shift cards */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-4 gap-3 opacity-30 pointer-events-none select-none scale-75 sm:scale-90">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-12 rounded-xl"
                      style={{
                        background: [
                          "rgba(79,70,229,0.6)",
                          "rgba(124,58,237,0.6)",
                          "rgba(5,150,105,0.6)",
                          "rgba(245,158,11,0.6)",
                        ][i % 4],
                        width: `${60 + (i % 3) * 20}px`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Play button overlay */}
            {!playing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg,#4F46E5,#7C3AED)",
                    boxShadow: "0 0 60px rgba(79,70,229,0.5)",
                  }}
                >
                  {/* Pulsing ring */}
                  <div
                    className="absolute inset-0 rounded-full animate-ping opacity-30"
                    style={{ background: "#4F46E5" }}
                  />
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white ml-1" />
                </motion.div>
                <p className="text-white font-bold mt-5 text-lg tracking-wide opacity-80">
                  Watch 3-min demo
                </p>
              </div>
            )}

            {/* If playing — embed your actual video here */}
            {playing && (
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                allow="autoplay; fullscreen"
                title="StaffSchedule.io Demo"
              />
            )}
          </div>
        </motion.div>

        {/* Below-video proof bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-8 text-sm font-semibold text-slate-400"
        >
          {[
            "Setup in under 10 minutes",
            "No training sessions required",
            "Loved by 10,000+ managers"
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
              {t}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
