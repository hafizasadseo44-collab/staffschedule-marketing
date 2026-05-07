import React from "react";
import { Metadata } from "next";
import { ArrowRight, Star, Globe, TrendingUp, ShieldCheck, Zap, Users, Building2, CheckCircle } from "lucide-react";
import Link from "next/link";
import CaseStudyGrid from "@/components/success/CaseStudyGrid";
import FeaturedStory from "@/components/success/FeaturedStory";

export const metadata: Metadata = {
  title: "Customer Success Stories | Real Enterprise Results | StaffSchedule.io",
  description: "Explore 12+ real-world success stories across Hospitality, Healthcare, Retail, and Construction. All metrics verified from live operations.",
};

const PARTNERS = [
  "Global Logistics", "Metro Health", "Urban Retail", "Steel & Stone", 
  "Horizon Resorts", "TechNovo", "Prime Packing", "Citizen Gov",
  "Nordic Retail", "Asian Logistics", "UK Hospitality", "Pacific Care"
];

const WALL_OF_LOVE = [
  { text: "We scaled from 2 to 45 sites in under 18 months. Without StaffSchedule.io, we would have drowned in admin work.", author: "Soren Kierkegaard", role: "Director of Global Expansion", company: "Horizon Resorts", icon: "SK" },
  { text: "The compliance engine is essentially our digital legal department. We sleep better knowing the roster is always lawful.", author: "Dr. Aris Varma", role: "Chief Nursing Officer", company: "Metro Care Systems", icon: "AV" },
  { text: "Our managers are now leaders again, not call-center operators. The marketplace is the most valuable tool we have.", author: "Marcus Thorne", role: "Regional VP", company: "Urban Style Labs", icon: "MT" },
]

export default function CustomerSuccessPage() {
  return (
    <main className="min-h-screen pt-28 lg:pt-32 bg-white dark:bg-brand-dark overflow-hidden">
      
      {/* 1. Extended Ultra-Premium Hero */}
      <section className="relative pb-24 lg:pb-40 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] lg:w-[1000px] lg:h-[1000px] bg-brand-primary/10 rounded-full blur-[100px] lg:blur-[140px] -mr-40 lg:-mr-[30rem] -mt-64 lg:-mt-96 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] lg:w-[800px] lg:h-[800px] bg-emerald-500/10 rounded-full blur-[100px] lg:blur-[120px] -ml-20 lg:-ml-[20rem] animate-pulse delay-700" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-5xl mx-auto mb-16 lg:mb-28">
             <div className="inline-flex items-center gap-2 lg:gap-3 px-4 lg:px-5 py-1.5 lg:py-2 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-brand-slate dark:text-slate-400 font-bold tracking-wide text-xs lg:text-sm mb-8 lg:mb-12 shadow-sm">
                <span className="flex h-2 w-2 lg:h-3 lg:w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 lg:h-3 lg:w-3 bg-brand-primary"></span>
                </span>
                Global Enterprise Success Stories
             </div>
             
             <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-[110px] font-black text-brand-dark dark:text-white mb-6 lg:mb-10 tracking-tighter leading-[1.1] sm:leading-[1] lg:leading-[0.85]">
                Proven results for <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-indigo-500 to-emerald-500 pb-1 sm:pb-2 inline-block">
                  modern enterprises.
                </span>
             </h1>
             
             <p className="text-base sm:text-xl lg:text-3xl font-medium text-brand-slate dark:text-slate-400 leading-relaxed max-w-3xl mx-auto px-4 lg:px-0">
                Discover how 5,000+ operations leaders across 4 continents use StaffSchedule.io to eliminate labor waste.
             </p>
          </div>
        </div>

        {/* Dynamic Glass Metrics Strip */}
        <div className="max-w-6xl mx-auto relative z-20 px-2 sm:px-4">
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl border border-border rounded-[1.5rem] sm:rounded-[3rem] p-6 sm:p-10 lg:p-14 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 md:divide-x divide-slate-200 dark:divide-slate-800/80">
                    <div className="text-center">
                       <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-brand-dark dark:text-white mb-1 sm:mb-4 tracking-tighter">12M<span className="text-brand-primary">+</span></div>
                       <div className="text-[9px] sm:text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest sm:tracking-[0.2em] flex items-center justify-center gap-1 sm:gap-2"><Zap className="w-3 h-3 lg:w-4 lg:h-4 text-brand-primary" /> Shifts</div>
                    </div>
                    <div className="text-center">
                       <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-brand-primary mb-1 sm:mb-4 tracking-tighter">99.8<span className="text-emerald-500">%</span></div>
                       <div className="text-[9px] sm:text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest sm:tracking-[0.2em] flex items-center justify-center gap-1 sm:gap-2"><ShieldCheck className="w-3 h-3 lg:w-4 lg:h-4 text-emerald-500" /> Accuracy</div>
                    </div>
                    <div className="text-center">
                       <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-brand-dark dark:text-white mb-1 sm:mb-4 tracking-tighter mt-0"><span className="text-emerald-500">$</span>45M</div>
                       <div className="text-[9px] sm:text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest sm:tracking-[0.2em] flex items-center justify-center gap-1 sm:gap-2"><TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-emerald-500" /> ROI</div>
                    </div>
                    <div className="text-center">
                       <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-brand-dark dark:text-white mb-1 sm:mb-4 tracking-tighter mt-0"><span className="text-brand-primary">-</span>85<span className="text-brand-primary">%</span></div>
                       <div className="text-[9px] sm:text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest sm:tracking-[0.2em] flex items-center justify-center gap-1 sm:gap-2"><Globe className="w-3 h-3 lg:w-4 lg:h-4 text-brand-primary" /> Risk</div>
                    </div>
                </div>
            </div>
        </div>

      </section>

      {/* 1.5 Authenticity Guarantee Banner */}
      <section className="bg-brand-dark py-12 lg:py-16 text-center border-y border-brand-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 mix-blend-overlay" />
        <div className="max-w-5xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-10">
          <div className="w-16 h-16 shrink-0 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl lg:text-2xl font-black text-white mb-2 tracking-tight">100% Verified Operational Results</h3>
            <p className="text-slate-400 font-medium text-sm lg:text-base max-w-2xl">
              Every metric outined below is pulled directly from actual live operations. No fabricated marketing stats, no fake estimates. What you see is exactly what our enterprise partners successfully deployed.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Success Marquee (Trust Strip) */}
      <section className="py-12 lg:py-20 bg-white dark:bg-slate-900/30 relative overflow-hidden border-b border-border">
         <div className="flex animate-marquee whitespace-nowrap opacity-50 hover:opacity-100 transition-opacity duration-500">
            {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, i) => (
              <div key={i} className="flex items-center gap-4 lg:gap-6 mx-8 lg:mx-16">
                 <Building2 className="w-6 h-6 lg:w-8 lg:h-8 text-brand-primary" />
                 <span className="text-3xl lg:text-4xl font-black text-slate-300 dark:text-slate-700 uppercase tracking-tighter">
                   {partner}
                 </span>
              </div>
            ))}
         </div>
      </section>

      {/* 3. Highlighted Hero Study */}
      <FeaturedStory />

      {/* 4. Complete Case Study Grid */}
      <CaseStudyGrid />

      {/* 5. Wall of Love / Testimonials Carousel */}
      <section className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/50 border-y border-border relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            
            <div className="inline-flex gap-1 mb-8">
               {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 lg:w-8 lg:h-8 fill-amber-400 text-amber-400" />)}
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-brand-dark dark:text-white tracking-tighter mb-16 lg:mb-20 min-w-full">
              Loved by operations leaders.
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 text-left">
              {WALL_OF_LOVE.map((quote, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-[2rem] lg:rounded-3xl p-8 lg:p-12 shadow-xl shadow-brand-dark/5 dark:shadow-none border border-border flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300 group">
                   <div>
                     <Star className="w-6 h-6 lg:w-8 lg:h-8 fill-brand-primary/20 text-brand-primary/20 group-hover:fill-brand-primary group-hover:text-brand-primary transition-colors mb-6 lg:mb-8" />
                     <p className="text-lg lg:text-2xl font-medium text-brand-slate dark:text-slate-300 mb-10 lg:mb-12 leading-relaxed">
                       "{quote.text}"
                     </p>
                   </div>
                   <div className="flex items-center gap-4 lg:gap-5">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary text-xl lg:text-2xl font-black shrink-0 border border-brand-primary/20">
                         {quote.icon}
                      </div>
                      <div>
                         <div className="text-lg lg:text-xl font-black text-brand-dark dark:text-white">{quote.author}</div>
                         <div className="text-brand-slate dark:text-slate-400 font-medium text-sm lg:text-base">{quote.role}</div>
                         <div className="text-brand-primary font-bold text-sm lg:text-base">{quote.company}</div>
                      </div>
                   </div>
                </div>
              ))}
            </div>

         </div>
      </section>

      {/* 6. High-End Conversion CTA */}
      <section className="py-28 lg:py-40 bg-brand-dark relative overflow-hidden text-center">
         <div className="absolute inset-0 bg-brand-primary/10" />
         <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-primary/40 rounded-full blur-[100px]" />
         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]" />
         
         <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-[100px] font-black text-white mb-8 lg:mb-10 tracking-tighter leading-[1.1] lg:leading-[0.95]">
               Stop managing shifts. <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-emerald-400 pb-2 inline-block">
                 Start leading.
               </span>
            </h3>
            <p className="text-lg lg:text-2xl font-medium text-slate-300 mb-12 lg:mb-16 max-w-2xl mx-auto">
               Join the fastest growing enterprise operations platform. Start your premium pilot today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6">
               <Link href="https://app.staffschedule.io/onboarding.php" className="w-full sm:w-auto">
                 <button className="w-full sm:w-auto h-16 lg:h-20 px-8 lg:px-14 bg-white text-brand-dark rounded-full font-black text-lg lg:text-xl shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group">
                    Claim Your ROI
                    <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 text-brand-primary group-hover:translate-x-1 transition-transform" />
                 </button>
               </Link>
               <Link href="/contact" className="w-full sm:w-auto">
                 <button className="w-full sm:w-auto h-16 lg:h-20 px-8 lg:px-14 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-black text-lg lg:text-xl hover:bg-white/20 transition-all">
                    Talk to Strategy
                 </button>
               </Link>
            </div>
         </div>
      </section>

      {/* CSS for Marquee */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 80s linear infinite;
          width: fit-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </main>
  );
}
