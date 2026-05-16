"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Users, Calendar, Clock, ChevronLeft, ChevronRight, Quote, Utensils, HeartPulse, ShoppingBag, Truck, Building2, Sun, Trophy } from "lucide-react";
import Image from "next/image";

// Data - Homebase-style cards with business owners
const INDUSTRIES = [
  {
    id: 1,
    businessName: "UrbanBite",
    ownerName: "Roxana Martinez",
    ownerTitle: "Owner",
    image: "/industry-restaurant.png",
    logoText: "URBANBITE",
    logoSubtext: "RESTAURANT",
    LogoIcon: Utensils,
    locations: "3 Locations",
    employees: "45 Employees",
    statValue: "70%",
    statText: "Reduction in scheduling time",
  },
  {
    id: 2,
    businessName: "PrimeCare",
    ownerName: "Dr. James Chen",
    ownerTitle: "Medical Director",
    image: "/industry-healthcare.png",
    logoText: "PRIMECARE",
    logoSubtext: "CLINIC",
    LogoIcon: HeartPulse,
    locations: "4 Locations",
    employees: "82 Employees",
    statValue: "3X",
    statText: "Faster leave approvals",
  },
  {
    id: 3,
    businessName: "TrendyMart",
    ownerName: "Alex Rivera",
    ownerTitle: "Store Manager",
    image: "/industry-retail.png",
    logoText: "TRENDY MART",
    logoSubtext: "RETAIL",
    LogoIcon: ShoppingBag,
    locations: "6 Locations",
    employees: "120 Employees",
    statValue: "60%",
    statText: "Fewer schedule conflicts",
  },
  {
    id: 4,
    businessName: "FastWave",
    ownerName: "Marcus Thompson",
    ownerTitle: "Operations Lead",
    image: "/industry-logistics.png",
    logoText: "FASTWAVE",
    logoSubtext: "LOGISTICS",
    LogoIcon: Truck,
    locations: "10 Locations",
    employees: "200 Employees",
    statValue: "40%",
    statText: "Increase in productivity",
  },
  {
    id: 5,
    businessName: "GreenLeaf",
    ownerName: "Sarah Kim",
    ownerTitle: "General Manager",
    image: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=800&auto=format&fit=crop",
    logoText: "GREENLEAF",
    logoSubtext: "CAFÉ",
    LogoIcon: Sun,
    locations: "2 Locations",
    employees: "28 Employees",
    statValue: "50%",
    statText: "Better shift coverage",
  },
  {
    id: 6,
    businessName: "SteelBridge",
    ownerName: "Carlos Mendez",
    ownerTitle: "Site Foreman",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
    logoText: "STEELBRIDGE",
    logoSubtext: "CONSTRUCTION",
    LogoIcon: Building2,
    locations: "8 Locations",
    employees: "310 Employees",
    statValue: "55%",
    statText: "Fewer overtime disputes",
  },
  {
    id: 7,
    businessName: "FitZone",
    ownerName: "Emily Torres",
    ownerTitle: "Studio Owner",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
    logoText: "FITZONE",
    logoSubtext: "FITNESS",
    LogoIcon: Trophy,
    locations: "5 Locations",
    employees: "65 Employees",
    statValue: "80%",
    statText: "Faster class scheduling",
  },
  {
    id: 8,
    businessName: "SwiftRides",
    ownerName: "David Park",
    ownerTitle: "Fleet Manager",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop",
    logoText: "SWIFTRIDES",
    logoSubtext: "TRANSPORT",
    LogoIcon: Truck,
    locations: "12 Locations",
    employees: "180 Employees",
    statValue: "45%",
    statText: "Less driver downtime",
  }
];

export default function IndustryShowcase() {

  return (
    <section className="relative py-24 lg:py-40 overflow-hidden bg-white" id="industries">
      {/* ── Premium Background Design ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Mesh Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-[120px] -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] -ml-40 -mb-40" />
        
        {/* Dot Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:32px_32px]" />
        
        {/* Top/Bottom Fades */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Container */}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full mb-8 border border-purple-100 shadow-sm"
          >
            <Users size={14} className="text-[#8b5cf6]" />
            <span className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-[#8b5cf6]">
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

        {/* Infinite Marquee Carousel */}
        <div className="relative w-full mb-20 overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none" />

          <div className="flex gap-5 py-6 animate-marquee hover:[animation-play-state:paused]">
            {/* Render cards twice for seamless loop */}
            {[...INDUSTRIES, ...INDUSTRIES].map((industry, idx) => {
              const Icon = industry.LogoIcon;
              return (
              <div 
                key={`${industry.id}-${idx}`} 
                className="min-w-[260px] md:min-w-[300px] lg:min-w-[320px] h-[380px] md:h-[440px] relative rounded-[1.5rem] overflow-hidden group cursor-pointer flex-shrink-0"
              >
                <Image
                  src={industry.image}
                  alt={industry.businessName}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Company Logo - top right */}
                <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
                  <Icon size={14} className="text-[#8b5cf6]" />
                  <div className="flex flex-col leading-none">
                    <span className="text-[9px] md:text-[10px] font-black text-[#1c1236] uppercase tracking-widest">{industry.logoText}</span>
                    <span className="text-[7px] md:text-[8px] font-bold text-[#8f86a8] uppercase tracking-[0.15em]">{industry.logoSubtext}</span>
                  </div>
                </div>

                {/* KPI Badge - hover */}
                <div className="absolute top-5 left-5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0">
                  <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-md">
                    <p className="text-[#8b5cf6] font-black text-lg leading-none">↑ {industry.statValue}</p>
                    <p className="text-[8px] font-bold text-[#5b4f7a] mt-1 max-w-[100px] leading-tight">{industry.statText}</p>
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                  <h3 className="text-white text-base md:text-lg font-bold drop-shadow-lg leading-snug">{industry.businessName}</h3>
                  <p className="text-white/80 text-xs md:text-sm font-medium drop-shadow-md">{industry.ownerName}, {industry.ownerTitle}</p>
                </div>
              </div>
              );
            })}
          </div>
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
          className="mt-20 max-w-7xl mx-auto flex flex-nowrap justify-center items-center gap-5 md:gap-8 lg:gap-10 overflow-x-auto px-4"
        >
          {[
            { Icon: Utensils, name: "UrbanBite", sub: "Restaurant" },
            { Icon: HeartPulse, name: "PrimeCare", sub: "Clinic" },
            { Icon: ShoppingBag, name: "Trendy Mart", sub: "Retail" },
            { Icon: Truck, name: "FastWave", sub: "Logistics" },
            { Icon: Sun, name: "GreenLeaf", sub: "Café" },
            { Icon: Building2, name: "SteelBridge", sub: "Construction" },
            { Icon: Trophy, name: "FitZone", sub: "Fitness" },
            { Icon: Truck, name: "SwiftRides", sub: "Transport" },
          ].map((logo, i) => (
            <div key={i} className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100 cursor-pointer">
              <logo.Icon size={20} className="text-[#1c1236]" />
              <div className="flex flex-col leading-none">
                <span className="font-black text-[#1c1236] text-[11px] md:text-xs uppercase tracking-widest">{logo.name}</span>
                <span className="text-[7px] md:text-[8px] font-bold text-[#8f86a8] uppercase tracking-[0.2em]">{logo.sub}</span>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
