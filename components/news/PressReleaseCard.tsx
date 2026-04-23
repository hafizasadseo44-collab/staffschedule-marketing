"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Newspaper, ExternalLink } from "lucide-react";

interface PressReleaseCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    createdAt: string;
    category: string;
  };
}

export default function PressReleaseCard({ post }: PressReleaseCardProps) {
  const date = new Date(post.createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800/50 p-8 hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-brand-primary">
            <Newspaper size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
              {post.category || "Official Release"}
            </span>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mt-0.5">
              <Calendar size={12} />
              {formattedDate}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
            HEADQUARTERS / LONDON, UK
        </div>
      </div>

      <Link href={`/news/${post.slug}`} className="block">
        <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight mb-4 group-hover:text-brand-primary transition-colors text-balance">
          {post.title}
        </h3>
      </Link>

      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
        {post.excerpt || "Official corporate announcement regarding StaffSchedule.io's latest operational milestones and platform innovations."}
      </p>

      <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800/50">
        <Link 
          href={`/news/${post.slug}`}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white hover:text-brand-primary transition-colors group/link"
        >
          Read Full Release 
          <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
        
        <div className="flex items-center gap-4">
            <button className="text-slate-300 hover:text-brand-primary transition-colors" title="Download PDF Version">
                <ExternalLink size={16} />
            </button>
        </div>
      </div>
    </motion.div>
  );
}
