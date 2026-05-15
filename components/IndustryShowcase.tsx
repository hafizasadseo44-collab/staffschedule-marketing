"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Users, Calendar, Clock, ChevronLeft, ChevronRight, Quote, Utensils, HeartPulse, ShoppingBag, Truck, Building2, Sun } from "lucide-react";
import Image from "next/image";

// Data
const INDUSTRIES = [
  {
    id: 1,
    name: "UrbanBite Restaurant",
    locations: "3 Locations",
    employees: "45 Employees",
    image: "https://images.unsplash.com/photo-1541592102481-6453915bc62b?q=80&w=800&auto=format&fit=crop",
    statIcon: "↑",
    statValue: "70%",
    statText: "Reduction in scheduling time",
    logoText: "URBANBITE",
    LogoIcon: Utensils
  },
  {
    id: 2,
    name: "PrimeCare Clinic",
    locations: "4 Locations",
    employees: "82 Employees",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop",
    statIcon: "↑",
    statValue: "3X",
    statText: "Faster leave approvals",
    logoText: "PRIMECARE",
    LogoIcon: HeartPulse
  },
  {
    id: 3,
    name: "TrendyMart Retail",
    locations: "6 Locations",
    employees: "120 Employees",
    image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=800&auto=format&fit=crop",
    statIcon: "↓",
    statValue: "60%",
    statText: "Fewer schedule conflicts",
    logoText: "TRENDY MART",
    LogoIcon: ShoppingBag
  },
  {
    id: 4,
    name: "FastWave Logistics",
    locations: "10 Locations",
    employees: "200 Employees",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop",
    statIcon: "↑",
    statValue: "40%",
    statText: "Increase in workforce productivity",
    logoText: "FASTWAVE",
    LogoIcon: Truck
  },
  {
    id: 5,
    name: "Luxe Hospitality",
    locations: "2 Locations",
    employees: "150 Employees",
    image: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=800&auto=format&fit=crop",
    statIcon: "↑",
    statValue: "50%",
    statText: "Better shift coverage",
    logoText: "LUXE",
    LogoIcon: Building2
  }
];

export default function IndustryShowcase() {
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = useCallback(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
       if (carouselRef.current) {
         const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
         // If we reached the end, snap back to start
         if (scrollLeft + clientWidth >= scrollWidth - 10) {
           carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
         } else {
           scrollRight();
         }
       }
    }, 3500);
    return () => clearInterval(timer);
  }, [isHovered, scrollRight]);

  return (
    <section className="relative py-20 lg:py-32 bg-[#FAF9FF] overflow-hidden" id="industries">
      {/* Container */}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 bg-[#f0ecf9] px-4 py-1.5 rounded-full mb-6 border border-[#e5e0f1]"
          >
            <Users size={14} className="text-[#8b5cf6]" />
            <span className="text-[10px] md:text-xs font-black tracking-[0.15em] uppercase text-[#8b5cf6]">
              Trusted by the Best Teams
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1c1236] tracking-tight leading-[1.1] mb-6"
          >
            Powering teams across <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9]">industries</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-[#5b4f7a] font-medium leading-relaxed max-w-2xl"
          >
            From small businesses to large enterprises, teams trust StaffSchedule.io to streamline scheduling, improve communication, and save hours every week.
          </motion.p>
        </div>

        {/* Carousel Section */}
        <div 
          className="relative w-full max-w-[1400px] mx-auto flex items-center mb-20"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Buttons */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 md:-left-5 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#e5e0f1] flex items-center justify-center text-[#8b5cf6] hover:scale-110 transition-transform hidden sm:flex"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Cards Track */}
          <div 
            ref={carouselRef}
            className="overflow-x-auto flex gap-4 md:gap-6 px-4 md:px-10 py-6 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {INDUSTRIES.map((industry) => (
              <motion.div 
                key={industry.id} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="min-w-[300px] md:min-w-[360px] lg:min-w-[400px] h-[450px] md:h-[500px] relative rounded-[2rem] overflow-hidden group cursor-pointer snap-center flex-shrink-0 shadow-xl shadow-[#1c1236]/5"
              >
                <Image
                  src={industry.image}
                  alt={industry.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  unoptimized
                />
                {/* Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1236]/90 via-[#1c1236]/20 to-transparent transition-opacity duration-500" />
                
                {/* Top Logo */}
                <div className="absolute top-6 right-6 flex items-center gap-1.5 opacity-90 drop-shadow-md">
                  <industry.LogoIcon size={16} className="text-white" />
                  <span className="text-white text-[10px] md:text-xs font-black uppercase tracking-widest">{industry.logoText}</span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-5">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="text-white text-xl md:text-2xl font-bold mb-1.5 drop-shadow-sm">{industry.name}</h3>
                    <p className="text-[#d7d3e0] text-xs md:text-sm font-semibold tracking-wide drop-shadow-sm">{industry.locations} • {industry.employees}</p>
                  </div>

                  {/* KPI Box */}
                  <div className="flex items-center gap-3 bg-[#ffffff]/10 backdrop-blur-xl border border-[#ffffff]/20 p-2.5 md:p-3 rounded-2xl w-max shadow-lg transform transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-[#ffffff]/15">
                    <div className="bg-[#1c1236]/90 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-[10px] flex items-center gap-1.5 font-black text-sm md:text-lg border border-[#ffffff]/10 shadow-inner">
                      {industry.statIcon} {industry.statValue}
                    </div>
                    <p className="text-white text-[10px] md:text-xs font-semibold leading-tight max-w-[130px] drop-shadow-sm">
                      {industry.statText}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button 
            onClick={scrollRight}
            className="absolute right-0 md:-right-5 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#e5e0f1] flex items-center justify-center text-[#8b5cf6] hover:scale-110 transition-transform hidden sm:flex"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* KPI / Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto bg-white/70 backdrop-blur-3xl border border-white/50 rounded-[2.5rem] p-6 md:p-10 shadow-[0_20px_80px_-20px_rgba(139,92,246,0.15)] flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative overflow-hidden"
        >
          {/* Subtle inner glow */}
          <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-purple-400/10 blur-[50px] rounded-full pointer-events-none" />

          {/* Quote */}
          <div className="flex items-start gap-4 md:gap-6 flex-1 w-full relative z-10">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-[1.25rem] bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] flex-shrink-0 flex items-center justify-center shadow-lg shadow-purple-500/25">
               <Quote className="text-white w-6 h-6 md:w-8 md:h-8" />
            </div>
            <p className="text-[#1c1236] text-sm md:text-base font-semibold leading-relaxed pt-1">
              "StaffSchedule.io transformed how we manage our team. It's like having a <span className="text-[#8b5cf6] font-black bg-purple-50 px-1.5 py-0.5 rounded-md">co-pilot</span> for our daily operations."
            </p>
          </div>

          <div className="w-full lg:w-px h-px lg:h-16 bg-gradient-to-b from-transparent via-[#e5e0f1] to-transparent relative z-10" />

          {/* Stats */}
          <div className="flex flex-row flex-wrap md:flex-nowrap justify-between flex-1 w-full gap-4 md:gap-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Users size={18} className="text-[#8b5cf6]" />
              </div>
              <div>
                <p className="text-xl md:text-3xl font-black text-[#1c1236]">2,000+</p>
                <p className="text-[9px] md:text-[11px] text-[#5b4f7a] font-bold uppercase tracking-widest mt-0.5">Teams Trust Us</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <Calendar size={18} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-xl md:text-3xl font-black text-[#1c1236]">500K+</p>
                <p className="text-[9px] md:text-[11px] text-[#5b4f7a] font-bold uppercase tracking-widest mt-0.5">Shifts Scheduled</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#f0ecf9] flex items-center justify-center">
                <Clock size={18} className="text-[#8b5cf6]" />
              </div>
              <div>
                <p className="text-xl md:text-3xl font-black text-[#1c1236]">1M+</p>
                <p className="text-[9px] md:text-[11px] text-[#5b4f7a] font-bold uppercase tracking-widest mt-0.5">Hours Saved</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Brand Logos Row */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-20 max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-8 md:gap-14 lg:gap-20"
        >
          {/* Logo 1 */}
          <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-pointer">
            <Utensils size={24} className="text-[#1c1236]" />
            <div className="flex flex-col">
              <span className="font-black text-[#1c1236] text-xs md:text-sm uppercase tracking-widest leading-none">UrbanBite</span>
              <span className="text-[8px] font-bold text-[#8f86a8] uppercase tracking-[0.2em]">Restaurant</span>
            </div>
          </div>

          {/* Logo 2 */}
          <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-pointer">
            <HeartPulse size={24} className="text-[#1c1236]" />
            <div className="flex flex-col">
              <span className="font-black text-[#1c1236] text-xs md:text-sm uppercase tracking-widest leading-none">PrimeCare</span>
              <span className="text-[8px] font-bold text-[#8f86a8] uppercase tracking-[0.2em]">Clinic</span>
            </div>
          </div>

          {/* Logo 3 */}
          <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-pointer">
            <ShoppingBag size={24} className="text-[#1c1236]" />
            <div className="flex flex-col">
              <span className="font-black text-[#1c1236] text-xs md:text-sm uppercase tracking-widest leading-none">Trendy Mart</span>
              <span className="text-[8px] font-bold text-[#8f86a8] uppercase tracking-[0.2em]">Retail</span>
            </div>
          </div>

          {/* Logo 4 */}
          <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-pointer">
            <Truck size={24} className="text-[#1c1236]" />
            <div className="flex flex-col">
              <span className="font-black text-[#1c1236] text-xs md:text-sm uppercase tracking-widest leading-none">FastWave</span>
              <span className="text-[8px] font-bold text-[#8f86a8] uppercase tracking-[0.2em]">Logistics</span>
            </div>
          </div>

          {/* Logo 5 */}
          <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-pointer">
            <Sun size={24} className="text-[#1c1236]" />
            <div className="flex flex-col">
              <span className="font-black text-[#1c1236] text-xs md:text-sm uppercase tracking-widest leading-none">BrightPath</span>
              <span className="text-[8px] font-bold text-[#8f86a8] uppercase tracking-[0.2em]">Services</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
