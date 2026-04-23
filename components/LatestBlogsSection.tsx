"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Calendar, Sparkles, Clock, ArrowUpRight } from "lucide-react";

interface LatestBlogsSectionProps {
  posts?: any[];
}

const FALLBACK_GRADIENTS = [
  "from-indigo-600 via-purple-600 to-pink-500",
  "from-blue-600 via-sky-400 to-emerald-400",
  "from-violet-600 via-fuchsia-500 to-orange-500",
  "from-rose-500 via-red-500 to-orange-500",
  "from-emerald-500 via-teal-500 to-cyan-500",
  "from-amber-500 via-orange-500 to-rose-500"
];

// Helper to estimate reading time
const getReadingTime = (text: string) => {
  const words = text ? text.split(/\s+/).length : 0;
  const mins = Math.ceil(words / 200);
  return mins > 0 ? mins : 3; // default 3 min read
};

export default function LatestBlogsSection({ posts = [] }: LatestBlogsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!posts || posts.length === 0) return null;

  // Split posts for the two sections
  const heroPosts = posts.slice(0, 3);
  const recentPosts = posts.slice(3, 6);
  
  // If we have fewer than 3 posts, fallback gracefully by padding with duplicates for visual sake
  // (In a real app, you might just render a static grid if posts < 3)
  const displayHeroPosts = heroPosts.length === 3 ? heroPosts : [...heroPosts, ...heroPosts, ...heroPosts].slice(0, 3);

  const activePost = displayHeroPosts[activeIndex];
  const activeDateObj = activePost?.createdAt ? new Date(activePost.createdAt) : null;
  const activeFormattedDate = activeDateObj ? activeDateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "";
  const activeReadTime = getReadingTime(activePost?.content || "");

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % displayHeroPosts.length);
  }, [displayHeroPosts.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + displayHeroPosts.length) % displayHeroPosts.length);
  }, [displayHeroPosts.length]);

  // Optional Autoplay
  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <section className="py-24 bg-[#FAFBFE] relative overflow-hidden font-sans">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* TOP SECTION: 2-Column Carousel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-24 items-center">
          
          {/* LEFT COLUMN: Content */}
          <div className="col-span-1 lg:col-span-5 relative z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex} // Changing key triggers exit/enter animation
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="pr-0 lg:pr-8"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100/80 text-indigo-700 font-black text-[10px] uppercase tracking-widest mb-6 border border-indigo-200">
                  <Sparkles size={12} /> Latest Updates
                </div>


                {/* Massive Title */}
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-6 leading-[1.1] line-clamp-3">
                  {activePost?.title || "StaffSchedule Hub"}
                </h2>

                {/* Excerpt */}
                <p className="text-lg text-slate-500 font-medium leading-relaxed mb-8 line-clamp-3">
                  {activePost?.excerpt || "Explore practical tips and tools to build better schedules, boost productivity, and keep your team happy."}
                </p>

                {/* CTA Button */}
                <Link 
                  href={activePost?.type === 'NEWS' ? `/news/${activePost?.slug || ''}` : `/blog/${activePost?.slug || ''}`}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-[1rem] font-black text-sm uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all mb-8 group"
                >
                  Read {activePost?.type === 'NEWS' ? 'Update' : 'Blog'}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>


                {/* Meta */}
                <div className="flex items-center gap-6 text-sm font-semibold text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-indigo-500" />
                    {activeFormattedDate}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-indigo-500" />
                    {activeReadTime} min read
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls (Left side next to content on Desktop, centered on mobile) */}
            <div className="mt-12 flex items-center gap-4">
              <button 
                onClick={handlePrev}
                className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
              
              {/* Pagination Dots */}
              <div className="flex items-center gap-2 ml-4">
                {displayHeroPosts.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                  />
                ))}
              </div>
            </div>

            {/* View All Articles Button */}
            <Link 
              href="/blog"
              className="inline-flex items-center gap-3 mt-8 px-8 py-4 bg-slate-900 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 shadow-lg hover:shadow-indigo-500/30 transition-all group"
            >
              View All Articles
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* RIGHT COLUMN: 3D Carousel */}
          <div className="col-span-1 lg:col-span-7 relative h-[500px] md:h-[600px] w-full flex items-center justify-center perspective-[1000px]">
            {displayHeroPosts.map((post, index) => {
              // Determine card state relative to activeIndex
              const isCenter = index === activeIndex;
              const isRight = index === (activeIndex + 1) % displayHeroPosts.length;
              const isLeft = index === (activeIndex - 1 + displayHeroPosts.length) % displayHeroPosts.length;

              let x = "0%";
              let scale = 1;
              let zIndex = 0;
              let opacity = 0;
              let brightness = 1;

              if (isCenter) {
                x = "0%";
                scale = 1;
                zIndex = 30;
                opacity = 1;
                brightness = 1;
              } else if (isRight) {
                x = "45%";
                scale = 0.85;
                zIndex = 20;
                opacity = 0.9;
                brightness = 0.6;
              } else if (isLeft) {
                x = "-45%";
                scale = 0.85;
                zIndex = 20;
                opacity = 0.9;
                brightness = 0.6;
              }

              const dateObj = post.createdAt ? new Date(post.createdAt) : null;
              const formattedDate = dateObj ? dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "";
              const readTime = getReadingTime(post.content || "");
              const gradient = FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length];

              return (
                <motion.div
                  key={index}
                  animate={{ x, scale, zIndex, opacity, filter: `brightness(${brightness})` }}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  onClick={() => setActiveIndex(index)}
                  className={`absolute w-[80%] md:w-[65%] h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-700/50 ${!isCenter ? 'cursor-pointer hover:brightness-90' : ''}`}
                >
                  {/* Background */}
                  {post.image ? (
                    <Image 
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-100`} />
                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                    </>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-transparent" />

                  {/* Content (Only show fully when centered) */}
                  <motion.div 
                    animate={{ opacity: isCenter ? 1 : 0.4 }}
                    className="absolute inset-0 p-8 flex flex-col justify-end"
                  >
                    {isCenter && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/90 text-white rounded-md text-[10px] font-black uppercase tracking-widest mb-4 self-start shadow-sm">
                        <Sparkles size={10} /> Featured
                      </div>
                    )}
                    
                    {!isCenter && post.category && (
                       <div className="inline-flex px-3 py-1 bg-white/90 text-slate-900 rounded-md text-[10px] font-black uppercase tracking-widest mb-4 self-start shadow-sm">
                         {post.category}
                       </div>
                    )}

                    <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-4 line-clamp-3">
                      {post.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 text-slate-300 text-xs font-semibold">
                      <span>{formattedDate}</span>
                      <div className="w-1 h-1 rounded-full bg-slate-500" />
                      <span>{readTime} min read</span>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>




      </div>
    </section>
  );
}
