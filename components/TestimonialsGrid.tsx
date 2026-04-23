"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle, TrendingUp, Building2, Users } from "lucide-react";

const featuredTestimonial = {
  name: "Sarah Jenkins",
  role: "General Manager",
  company: "Prime Retail",
  industry: "Retail",
  text: "I used to spend every Sunday night building schedules on a clumsy spreadsheet. Now, I hit approve on open shifts and the whole process takes me 15 minutes. It's been incredibly relieving for my operations managers, and our staff loves having the app on their phones to swap shifts without calling me.",
  avatar: "https://i.pravatar.cc/150?u=sarahj",
  proofText: "Reduced labor cost by 18%",
  rating: 5,
};

const otherTestimonials = [
  {
    name: "David Chen",
    role: "Operations Lead",
    company: "HealthCare Plus",
    industry: "Healthcare",
    text: "Before StaffSchedule, handling call-outs meant making 10 frantic phone calls at 6 AM. Now, the system automatically suggests replacements who aren't in overtime, saving us thousands in accidental penalty pay.",
    avatar: "https://i.pravatar.cc/150?u=davidc",
    proofText: "Cut overtime by 15%",
    rating: 5,
  },
  {
    name: "Marcus Thorne",
    role: "Owner",
    company: "Thorne Hospitality",
    industry: "Hospitality",
    text: "Getting our multi-state locations aligned on compliance was a nightmare. This software solved it overnight. It simply won't let a manager schedule someone back-to-back without the required break. It’s given us total peace of mind.",
    avatar: "https://i.pravatar.cc/150?u=marcust",
    proofText: "100% compliance alignment",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "HR Director",
    company: "BuildCorp",
    industry: "Construction",
    text: "We run a 24/7 facility, and managing night shift rotations was totally overwhelming. StaffSchedule gave us templates that handle 90% of the work. If you run complex shifts, don't even bother looking at other tools.",
    avatar: "https://i.pravatar.cc/150?u=elenar",
    proofText: "Saved 12+ hours weekly",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Regional Manager",
    company: "QuickServe Eats",
    industry: "Food & Beverage",
    text: "Our turnover was high because schedules were unpredictable. Since implementing this, our employees have way more control over their availability. It's crazy how much morale improved just from an app.",
    avatar: "https://i.pravatar.cc/150?u=jamesw",
    proofText: "Staff turnover down 25%",
    rating: 5,
  },
  {
    name: "Amanda Brooks",
    role: "Franchise Owner",
    company: "Coffee Beans Co",
    industry: "Cafe",
    text: "We tested three different scheduling platforms, and this was the only one that our line cooks and servers actually understood without needing a manual. It's straightforward, fast, and does exactly what it needs to do.",
    avatar: "https://i.pravatar.cc/150?u=amandab",
    proofText: "Zero training required",
    rating: 5,
  },
  {
    name: "Tom Harris",
    role: "Director of Operations",
    company: "Logistics Pro",
    industry: "Logistics",
    text: "The dashboard is extremely clear. I can see our projected labor costs right next to our scheduled hours, which lets me cut unnecessary shifts before the week even begins. Literally paid for itself in month one.",
    avatar: "https://i.pravatar.cc/150?u=tomh",
    proofText: "Paid for itself in 30 days",
    rating: 5,
  },
  {
    name: "Lisa Wong",
    role: "Clinic Manager",
    company: "Wellness Centers",
    industry: "Healthcare",
    text: "As we added our fourth clinic, the old way of texting schedules completely broke down. Moving to this system tightened communication instantly. The in-app chat means I never get another 'I lost my schedule' text.",
    avatar: "https://i.pravatar.cc/150?u=lisaw",
    proofText: "Scaled to 4 locations easily",
    rating: 5,
  },
  {
    name: "Robert King",
    role: "Store Manager",
    company: "Fresh Markets",
    industry: "Retail",
    text: "It used to be impossible to keep track of everyone's time off requests. Now they just funnel into a single queue. I can approve them with one tap, and they automatically block out on the master schedule.",
    avatar: "https://i.pravatar.cc/150?u=robertk",
    proofText: "No more scheduling conflicts",
    rating: 5,
  }
];

const TestimonialsGrid = () => {
  return (
    <section className="py-24 md:py-32 bg-slate-50/50 dot-pattern dark:bg-slate-900/50 overflow-hidden relative">
      <div className="absolute top-0 right-[10%] w-[600px] h-[600px] bg-brand-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[800px] h-[500px] bg-indigo-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Headings */}
        <div className="text-center mb-16 md:mb-20">
           <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-brand-dark dark:text-white mb-6">
              Trusted by teams that run <span className="text-brand-primary">real operations</span>
           </h2>
           <p className="text-lg md:text-xl text-brand-slate dark:text-slate-400 font-medium max-w-2xl mx-auto">
              See how businesses are saving time and reducing costs with StaffSchedule.io
           </p>
        </div>

        {/* Featured Testimonial */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto glass-premium rounded-[2.5rem] shadow-2xl shadow-brand-primary/5 p-8 md:p-12 mb-12 relative z-10 group hover:border-brand-primary/30 hover:shadow-[0_20px_40px_-10px_rgba(79,70,229,0.15)] transition-all duration-500 hover:-translate-y-1"
        >
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
             
             {/* Left side info */}
             <div className="w-full md:w-2/5 flex flex-col items-center md:text-left text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-5 border-4 border-slate-100 dark:border-slate-700 shadow-md">
                   <img src={featuredTestimonial.avatar} alt={featuredTestimonial.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-black text-2xl text-brand-dark dark:text-white flex items-center justify-center md:justify-start gap-2 w-full">
                  {featuredTestimonial.name} <CheckCircle className="w-5 h-5 text-brand-primary shrink-0" />
                </h3>
                <p className="font-bold text-slate-500 dark:text-slate-400 text-sm tracking-wide mt-1 uppercase w-full">
                  {featuredTestimonial.role}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-1.5 mt-3 text-brand-slate dark:text-slate-400 font-medium text-sm w-full">
                   <Building2 className="w-4 h-4 shrink-0" /> {featuredTestimonial.company}
                </div>
                <div className="mt-4 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 font-bold text-xs text-brand-slate dark:text-slate-300">
                   [{featuredTestimonial.industry}]
                </div>
             </div>

             {/* Right side content */}
             <div className="w-full md:w-3/5 flex flex-col">
                <div className="flex gap-1 mb-6 justify-center md:justify-start">
                   {[...Array(featuredTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-amber-500 fill-amber-500" />
                   ))}
                </div>
                <p className="text-xl md:text-2xl font-medium text-brand-dark dark:text-slate-200 leading-relaxed italic mb-8 text-center md:text-left">
                   "{featuredTestimonial.text}"
                </p>
                <div className="mt-auto inline-flex items-center justify-center md:justify-start gap-2 bg-brand-success/10 text-brand-success font-bold px-4 py-2 rounded-xl text-sm md:text-base self-center md:self-start">
                   <TrendingUp className="w-5 h-5 shrink-0" /> {featuredTestimonial.proofText}
                </div>
             </div>
          </div>
        </motion.div>

        {/* Option A: Horizontal Scroll Carousel */}
        <div className="relative mb-20 group">
           {/* Gradient Overlays for smooth scroll transition */}
           <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-slate-50 dark:from-slate-900/50 to-transparent z-10 pointer-events-none"></div>
           <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-slate-50 dark:from-slate-900/50 to-transparent z-10 pointer-events-none"></div>
           
           <div className="flex overflow-hidden relative">
              {/* Box 1 */}
              <div className="flex min-w-full shrink-0 gap-6 py-6 pr-6 animate-marquee group-hover:[animation-play-state:paused]">
                {otherTestimonials.map((t, i) => (
                  <div 
                     key={`list-1-${i}`}
                     className="w-[85vw] md:w-[420px] glass-premium rounded-[2.5rem] p-8 glass-card-hover flex flex-col pointer-events-auto"
                  >
                     <div className="flex items-center justify-between mb-6">
                        <div className="flex gap-1">
                           {[...Array(t.rating)].map((_, j) => (
                              <Star key={j} className="w-4 h-4 text-amber-500 fill-amber-500" />
                           ))}
                        </div>
                        <span className="bg-slate-100 dark:bg-slate-700 text-brand-slate dark:text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                           {t.industry}
                        </span>
                     </div>
                     
                     <p className="text-base text-brand-dark dark:text-slate-300 font-medium italic leading-relaxed mb-6 flex-grow whitespace-normal break-words">
                        "{t.text}"
                     </p>

                     <div className="bg-brand-primary/5 dark:bg-brand-primary/10 text-brand-primary text-sm font-bold px-3 py-1.5 rounded-lg mb-6 inline-block w-fit whitespace-nowrap">
                        {t.proofText}
                     </div>

                     <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-100 dark:border-slate-700/50">
                        <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-600 shadow-sm shrink-0" />
                        <div className="flex-1 overflow-hidden">
                           <div className="flex items-center gap-1.5">
                              <p className="font-black text-brand-dark dark:text-white leading-none text-sm truncate">{t.name}</p>
                              <CheckCircle className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                           </div>
                           <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 truncate">
                              {t.role}, {t.company}
                           </p>
                        </div>
                     </div>
                  </div>
                ))}
              </div>

              {/* Box 2 (Duplicate for infinite seamless loop) */}
              <div aria-hidden="true" className="flex min-w-full shrink-0 gap-6 py-6 pr-6 animate-marquee group-hover:[animation-play-state:paused]">
                {otherTestimonials.map((t, i) => (
                  <div 
                     key={`list-2-${i}`}
                     className="w-[85vw] md:w-[420px] glass-premium rounded-[2.5rem] p-8 glass-card-hover flex flex-col pointer-events-auto"
                  >
                     <div className="flex items-center justify-between mb-6">
                        <div className="flex gap-1">
                           {[...Array(t.rating)].map((_, j) => (
                              <Star key={j} className="w-4 h-4 text-amber-500 fill-amber-500" />
                           ))}
                        </div>
                        <span className="bg-slate-100 dark:bg-slate-700 text-brand-slate dark:text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                           {t.industry}
                        </span>
                     </div>
                     
                     <p className="text-base text-brand-dark dark:text-slate-300 font-medium italic leading-relaxed mb-6 flex-grow whitespace-normal break-words">
                        "{t.text}"
                     </p>

                     <div className="bg-brand-primary/5 dark:bg-brand-primary/10 text-brand-primary text-sm font-bold px-3 py-1.5 rounded-lg mb-6 inline-block w-fit whitespace-nowrap">
                        {t.proofText}
                     </div>

                     <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-100 dark:border-slate-700/50">
                        <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-600 shadow-sm shrink-0" />
                        <div className="flex-1 overflow-hidden">
                           <div className="flex items-center gap-1.5">
                              <p className="font-black text-brand-dark dark:text-white leading-none text-sm truncate">{t.name}</p>
                              <CheckCircle className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                           </div>
                           <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 truncate">
                              {t.role}, {t.company}
                           </p>
                        </div>
                     </div>
                  </div>
                ))}
              </div>
           </div>
        </div>

        {/* Small Stats: Trust Row */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-t border-slate-200 dark:border-slate-700/50 pt-10"
        >
           <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
              <div className="flex items-center gap-3">
                 <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />)}
                 </div>
                 <span className="font-extrabold text-brand-dark dark:text-white text-lg">4.9/5</span>
                 <span className="text-slate-500 font-medium">average rating</span>
              </div>
              <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
              <div className="flex items-center gap-2">
                 <Building2 className="w-5 h-5 text-brand-primary" />
                 <span className="font-extrabold text-brand-dark dark:text-white text-lg">1,000+</span>
                 <span className="text-slate-500 font-medium">businesses</span>
              </div>
              <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
              <div className="flex items-center gap-2">
                 <Users className="w-5 h-5 text-brand-success" />
                 <span className="font-extrabold text-brand-dark dark:text-white text-lg">50,000+</span>
                 <span className="text-slate-500 font-medium">shifts scheduled</span>
              </div>
           </div>
        </motion.div>

      </div>
      
      {/* Hide scrollbar and Add Keyframes for Marquee */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        /* Optional: pause on global hover support */
        @media (hover: hover) and (pointer: fine) {
          .group:hover .animate-marquee {
            animation-play-state: paused;
          }
        }
      `}} />
    </section>
  );
};

export default TestimonialsGrid;
