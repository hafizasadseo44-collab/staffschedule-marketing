"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    username: "Operations Director @ HealthFirst",
    body: "StaffSchedule.io reduced our scheduling time by 80%. The AI-driven suggestions are incredibly accurate.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    country: "🇺🇸 USA",
  },
  {
    name: "Michael Chen",
    username: "Regional Manager @ TastyBites",
    body: "Managing 15 locations used to be a nightmare. Now it's all in one dashboard. Pure efficiency.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    country: "🇨🇦 Canada",
  },
  {
    name: "Elena Rodriguez",
    username: "Owner @ Bloom Boutique",
    body: "The mobile app is a lifesaver. My staff loves the shift swapping feature. No more late-night texts!",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
    country: "🇪🇸 Spain",
  },
  {
    name: "David Smith",
    username: "Store Lead @ TechGiant",
    body: "Real-time sync across devices is buttery smooth. We've eliminated scheduling conflicts entirely.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    country: "🇬🇧 UK",
  },
  {
    name: "Aisha Khan",
    username: "HR Manager @ GlobalLogistics",
    body: "The labor cost analytics help us stay on budget every single month. A must-have tool for teams.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
    country: "🇦🇪 UAE",
  },
  {
    name: "Marcus Thorne",
    username: "General Manager @ CityHospital",
    body: "Enterprise-grade security and reliability. We trust StaffSchedule.io for our most critical shifts.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    country: "🇦🇺 Australia",
  },
  {
    name: "Sophie Müller",
    username: "Event Planner @ EuroEvents",
    body: "Managing temporary staff has never been easier. The automated notifications are a game changer.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    country: "🇩🇪 Germany",
  },
  {
    name: "Luca Bianchi",
    username: "Restaurant Owner @ BellaItalia",
    body: "Very customizable and intuitive. Even my least tech-savvy employees picked it up in minutes.",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    country: "🇮🇹 Italy",
  },
];

function TestimonialCard({ img, name, username, body, country }: (typeof testimonials)[number]) {
  return (
    <Card className="w-[350px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-800/50 hover:border-brand-primary/50 transition-all duration-300 group/item overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="size-12 ring-2 ring-brand-primary/10 group-hover/item:ring-brand-primary/30 transition-all">
            <AvatarImage src={img} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <figcaption className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              {name} <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded uppercase">{country}</span>
            </figcaption>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{username}</p>
          </div>
          <div className="ml-auto flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={10} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>
        <div className="mt-4 relative">
          <Quote className="absolute -top-2 -left-2 size-8 text-brand-primary/5 -z-10" />
          <blockquote className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic">
            "{body}"
          </blockquote>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TestimonialsMarquee() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#FAF9FF] dark:bg-brand-dark">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6"
          >
            <Star className="size-4 text-brand-primary fill-brand-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary">10,000+ MANAGERS CAN'T BE WRONG</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-[1.1] max-w-4xl mx-auto"
          >
            Why Businesses Trust StaffSchedule.io for Workforce Scheduling
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed"
          >
            Businesses use StaffSchedule.io to reduce scheduling confusion, improve team communication, and manage workforce scheduling more efficiently with real-time shift updates and scheduling automation.
          </motion.p>
        </div>

        <div className="relative flex flex-col items-center justify-center overflow-hidden gap-8 [perspective:1000px]">
          <div
            className="flex flex-row items-center gap-6"
            style={{
              transform: 'rotateX(15deg) rotateY(-5deg) rotateZ(5deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* First Row - Vertical Down */}
            <Marquee vertical pauseOnHover repeat={3} className="[--duration:50s] h-[600px]">
              {testimonials.slice(0, 4).map((review) => (
                <TestimonialCard key={review.username} {...review} />
              ))}
            </Marquee>

            {/* Second Row - Vertical Up */}
            <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:45s] h-[600px] mt-12">
              {testimonials.slice(4, 8).map((review) => (
                <TestimonialCard key={review.username} {...review} />
              ))}
            </Marquee>

            {/* Third Row - Vertical Down */}
            <Marquee vertical pauseOnHover repeat={3} className="[--duration:60s] h-[600px]">
              {testimonials.slice(0, 4).map((review) => (
                <TestimonialCard key={review.username} {...review} />
              ))}
            </Marquee>

            {/* Fourth Row - Vertical Up */}
            <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:55s] h-[600px] mt-12">
              {testimonials.slice(4, 8).map((review) => (
                <TestimonialCard key={review.username} {...review} />
              ))}
            </Marquee>
          </div>

          {/* Premium Gradient Overlays */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#FAF9FF] dark:from-brand-dark"></div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#FAF9FF] dark:from-brand-dark"></div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#FAF9FF] dark:from-brand-dark"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#FAF9FF] dark:from-brand-dark"></div>
        </div>

        <div className="mt-20 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="size-10 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 overflow-hidden ring-4 ring-indigo-500/10">
                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="size-full object-cover" />
                </div>
              ))}
              <div className="size-10 rounded-full border-2 border-white dark:border-slate-800 bg-brand-primary flex items-center justify-center text-[10px] font-black text-white ring-4 ring-indigo-500/10">
                +10k
              </div>
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Join the 1% of highly efficient teams</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
