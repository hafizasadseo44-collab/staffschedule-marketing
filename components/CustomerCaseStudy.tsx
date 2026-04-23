"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CustomerCaseStudy() {
  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-[3rem] p-8 lg:p-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative overflow-hidden">
           
           {/* Abstract Decorative Graphics */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

           {/* Left Image Placeholder */}
           <motion.div 
             initial={{ opacity: 0, x: -40 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="w-full lg:w-1/2 relative"
           >
             <div className="aspect-[4/3] w-full bg-slate-200 rounded-2xl overflow-hidden shadow-2xl relative group">
               <div className="absolute inset-0 bg-gradient-to-tr from-slate-800 to-slate-400 group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                 <div className="text-white">
                   <p className="font-black text-2xl tracking-tight">The Burger House</p>
                   <p className="text-slate-300 font-medium">15 Locations • 450+ Staff</p>
                 </div>
               </div>
             </div>
             
             {/* Floating Metric */}
             <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden sm:block">
               <p className="text-brand-primary font-black text-4xl tracking-tighter mb-1">-18%</p>
               <p className="text-slate-500 font-bold text-sm tracking-wide uppercase">Labor Cost Drop</p>
             </div>
           </motion.div>

           {/* Right Copy */}
           <div className="w-full lg:w-1/2 relative z-10">
             <div className="flex gap-1 mb-6 text-amber-400">
               {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
             </div>
             
             <h2 className="text-3xl lg:text-5xl font-black text-slate-900 leading-tight mb-8 tracking-tight">
               "StaffSchedule completely revolutionized how we run our operations."
             </h2>
             
             <p className="text-xl text-slate-600 font-medium leading-relaxed mb-10 italic">
               "Before, tracking overtime and covering call-outs across our 15 locations was a nightmare. Now, our managers build perfect, cost-optimized schedules in entirely under exactly 5 minutes."
             </p>

             <div className="flex items-center gap-4 mb-10">
               <div className="w-14 h-14 bg-slate-200 rounded-full border-2 border-white shadow-md relative overflow-hidden">
                 <div className="absolute inset-0 bg-slate-400" />
               </div>
               <div>
                 <p className="font-bold text-slate-900 text-lg">David Miller</p>
                 <p className="text-slate-500 font-medium">Director of Operations</p>
               </div>
             </div>

             <Link href="/contact">
               <Button variant="outline" className="h-14 px-8 rounded-full border-2 border-slate-200 hover:border-brand-primary hover:text-brand-primary hover:bg-transparent text-lg font-bold transition-colors">
                 Talk to sales <ArrowRight className="w-5 h-5 ml-2" />
               </Button>
             </Link>
           </div>

        </div>
      </div>
    </section>
  );
}
