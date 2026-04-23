"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Bookmark } from "lucide-react";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    id: "1",
    title: "The Retention Secret: Why Flex-Scheduling Wins.",
    excerpt: "Discover why modern teams are prioritizing schedule control over salary increases in 2026.",
    category: "Management",
    readTime: "8 Min",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000",
  },
  {
    id: "2",
    title: "Navigating New Labor Laws: A 2026 Compliance Guide.",
    excerpt: "Everything you need to know about predictive scheduling laws and stay out of court.",
    category: "Compliance",
    readTime: "15 Min",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000",
    featured: true,
  },
  {
    id: "3",
    title: "Efficiency Blueprint: Decentralizing Operations.",
    excerpt: "How to empower your team to handle swaps and trade without manager intervention.",
    category: "Productivity",
    readTime: "10 Min",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000",
  },
  {
    id: "4",
    title: "Healthcare Scheduling: Managing 24/7 Care Cycles.",
    excerpt: "A deep dive into medical facility operations and burnout prevention strategies.",
    category: "Strategy",
    readTime: "12 Min",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000",
  },
  {
    id: "5",
    title: "The ROI of Premium Scheduling Infrastructure.",
    excerpt: "How to calculate the real financial impact of modern workforce management tools.",
    category: "Industry Tech",
    readTime: "10 Min",
    image: "https://images.unsplash.com/photo-1454165833767-027ffea9e77b?q=80&w=1000",
  },
  {
    id: "6",
    title: "Retail Flow: Optimizing Staff for Peak Demand.",
    excerpt: "Integrating POS data with scheduling to ensure you're never over or under-staffed.",
    category: "Optimization",
    readTime: "9 Min",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000",
  }
];

const ResourceCard = ({ article, index }: { article: Article; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[2.5rem] overflow-hidden hover:shadow-3xl hover:shadow-brand-primary/10 transition-all duration-700 ${
        article.featured ? "md:col-span-2" : "col-span-1"
      }`}
    >
      {/* Article Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/0 transition-colors duration-700" />
        
        {/* Category Tag */}
        <div className="absolute top-8 left-8">
          <div className="px-5 py-2 rounded-full bg-white/90 dark:bg-brand-dark/90 backdrop-blur-xl border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary">
            {article.category}
          </div>
        </div>

        {/* Bookmark Icon */}
        <button className="absolute top-8 right-8 w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-brand-primary hover:border-brand-primary transition-all active:scale-90">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-10 flex flex-col flex-1">
        <div className="flex items-center gap-6 mb-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">
           <div className="flex items-center gap-2">
             <Clock className="w-3.5 h-3.5" />
             {article.readTime}
           </div>
           <div>Insight #0{article.id}</div>
        </div>

        <h3 className={`font-black text-brand-dark dark:text-white leading-[1.1] tracking-tight mb-6 group-hover:text-brand-primary transition-colors ${
          article.featured ? "text-3xl lg:text-5xl" : "text-2xl lg:text-3xl"
        }`}>
          {article.title}
        </h3>
        
        <p className="text-base text-brand-slate dark:text-slate-400 font-medium leading-relaxed mb-10 line-clamp-2">
          {article.excerpt}
        </p>

        <div className="mt-auto">
          <Link 
            href={`/resources/${article.id}`} 
            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.25em] text-brand-dark dark:text-white group/link relative"
          >
            Read Article
            <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary group-hover/link:w-full transition-all duration-500" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const ResourceGrid = () => {
  return (
    <section className="py-20 lg:py-40 bg-white dark:bg-brand-dark relative z-10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {articles.map((article, i) => (
            <ResourceCard key={article.id} article={article} index={i} />
          ))}
        </div>
        
        {/* Load More Button Placeholder */}
        <div className="mt-32 text-center">
           <button className="h-20 px-16 rounded-[2rem] border-2 border-slate-100 dark:border-white/5 text-brand-dark dark:text-white text-lg font-black uppercase tracking-widest hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all active:scale-95">
             See More Insights
           </button>
        </div>
      </div>
    </section>
  );
};

export default ResourceGrid;
