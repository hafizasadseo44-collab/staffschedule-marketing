"use client";

import React from "react";
import { motion } from "framer-motion";

const categories = [
  "All Insights",
  "Strategy",
  "Compliance",
  "Productivity",
  "Industry Tech",
  "Management",
];

const ResourceNav = () => {
  const [active, setActive] = React.useState("All Insights");

  return (
    <div className="sticky top-24 z-40 py-10 bg-white/80 dark:bg-brand-dark/80 backdrop-blur-2xl border-b border-slate-100 dark:border-white/5">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Category List */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="relative px-8 py-3.5 rounded-full text-sm font-black transition-all group overflow-hidden"
              >
                {active === cat ? (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-brand-primary shadow-[0_10px_30px_-5px_rgba(79,70,229,0.4)]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate-50 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
                <span className={`relative z-10 uppercase tracking-[0.2em] ${
                  active === cat ? "text-white" : "text-brand-slate dark:text-slate-500 group-hover:text-brand-dark dark:group-hover:text-white"
                }`}>
                  {cat}
                </span>
              </button>
            ))}
          </div>
          
          {/* Quick Search Placeholder */}
          <div className="relative w-full lg:w-96 group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-slate-400 group-focus-within:text-brand-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="SEARCH INSIGHTS..."
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full py-5 pl-14 pr-8 text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/40 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceNav;
