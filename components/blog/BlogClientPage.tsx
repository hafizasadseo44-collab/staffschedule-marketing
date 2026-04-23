"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ArrowUpRight,
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  Globe,
  ChevronRight,
  User,
} from "lucide-react";
import { SpotlightCard } from "../ui/SpotlightCard";
import AuraBackground from "@/components/blog/AuraBackground";
import SubscribeForm from "../SubscribeForm";


// --- ANIMATION VARIANTS ---
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
} as const;

const stagger = {
  initial: { opacity: 0 },
  whileInView: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
} as const;

// Cinematic "Video-style" floating animation
const floating = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  category?: string | null;
  image?: string | null;
  author?: string | null;
  readTime?: string | null;
  featured: boolean;
  createdAt: string;
}

interface BlogClientPageProps {
  posts: Post[];
}

export default function BlogClientPage({ posts }: BlogClientPageProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = ["All", "Scheduling", "AI Intelligence", "Productivity", "Legal & Compliance", "Operations"];

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = activeCategory === "All" || post.category?.toLowerCase().includes(activeCategory.toLowerCase());
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    if (!posts || posts.length === 0) return null;
    const featured = posts.find(p => p.featured) || posts[0];
    return {
      ...featured,
      image: featured.image || "/saas_blog_3d_laptop_hero_1776734582759.png",
      category: featured.category || "Scheduling",
      readTime: featured.readTime || "5 min read",
      author: featured.author || "SaaS Blog Team"
    };
  }, [posts]);

  // Grid items
  const gridPosts = useMemo(() => {
    if (posts.length === 0) return [];
    const featuredId = featuredPost?.id;
    const remaining = posts.filter(p => p.id !== featuredId);
    
    return remaining.map((p, i) => {
      // Provide some default premium images if missing
      if (!p.image) {
        if (i % 3 === 0) return { ...p, image: "/saas_blog_3d_tablet_productivity_1776735096680.png" };
        if (i % 3 === 1) return { ...p, image: "/saas_blog_3d_analytics_sphere_1776735168198.png" };
        return { ...p, image: "/team_productivity_blog_hero_1776680822720.png" };
      }
      return p;
    });
  }, [posts, featuredPost]);

  const displayPosts = filteredPosts;
  const visiblePosts = displayPosts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="bg-[#FAF9FF] relative min-h-screen selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden font-sans">
      <AuraBackground />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ═══ HERO SECTION ═══ */}
        <section className="pt-32 sm:pt-44 pb-12 sm:pb-20 text-center px-4">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.h1 
              {...fadeUp}
              className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6 sm:mb-8 text-balance"
            >
              Insights & Resources for <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
                Smarter Team Management
              </span>
            </motion.h1>
          </motion.div>
          
          <motion.p 
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto mb-8 sm:mb-12 font-medium"
          >
            Stay updated with the latest tips, trends, and best practices for <br className="hidden md:block" />
            efficient team management and AI integration.
          </motion.p>


          {/* Search Bar (Pill) */}
          <motion.div 
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="max-w-2xl mx-auto relative group mb-12"
          >
            <div className="absolute inset-0 bg-white/40 blur-xl rounded-full opacity-50 group-focus-within:opacity-100 transition-opacity" />
            <div className="relative flex items-center bg-white rounded-full p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white">
              <div className="flex-1 flex items-center px-6">
                <Search className="w-5 h-5 text-slate-300 mr-4" />
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent outline-none text-slate-900 font-medium placeholder:text-slate-300"
                />
              </div>
              <button className="px-8 py-4 bg-indigo-600 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-500/20 transition-all">
                Search Articles
              </button>
            </div>
          </motion.div>

          {/* Category Filter Pills */}
          <motion.div 
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20"
                    : "bg-white text-slate-400 border border-white hover:border-indigo-100 hover:text-slate-900 shadow-sm"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </section>

        {/* ═══ FEATURED POST SECTION ═══ */}
        {featuredPost && (
          <motion.section 
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            viewport={fadeUp.viewport}
            animate={floating.animate}
            transition={{ ...fadeUp.transition, delay: 0.4 }}
            className="pb-24 sm:pb-32"
          >
            <Link href={`/blog/${featuredPost.slug}`}>
              <div className="group relative bg-white/40 backdrop-blur-xl rounded-[2rem] sm:rounded-[3rem] border border-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] p-4 sm:p-6 md:p-10 flex flex-col lg:flex-row gap-8 sm:gap-12 hover:shadow-[0_60px_100px_-20px_rgba(79,70,229,0.15)] hover:bg-white/60 transition-all duration-700">
                {/* Animated Glowing Border Effect */}
                <div className="absolute inset-x-0 inset-y-0 -m-1 rounded-[2.1rem] sm:rounded-[3.1rem] border-2 border-transparent bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Image Section */}
                <div className="lg:w-1/2 aspect-video lg:aspect-[1.1] relative">
                  <div className="absolute inset-0 bg-indigo-500/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <motion.div 
                    whileHover={{ scale: 1.02, rotateY: -5 }}
                    className="relative w-full h-full rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl z-10"
                  >
                    <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 sm:top-6 left-4 sm:left-6 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-indigo-600 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow-lg">
                      Featured
                    </div>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="lg:w-1/2 flex flex-col justify-center items-start px-2 sm:px-0">
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-6 sm:mb-8">
                    {featuredPost.category}
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-[1.1] sm:leading-[1.05] mb-6 sm:mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {featuredPost.title}
                  </h2>
                  <p className="text-base sm:text-lg text-slate-500 leading-relaxed mb-8 sm:mb-10 font-medium line-clamp-3 lg:line-clamp-none">
                    {featuredPost.excerpt}
                  </p>
                  
                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-4 sm:gap-8 mb-10 sm:mb-12 text-[10px] sm:text-[11px] font-black text-slate-300 uppercase tracking-widest">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <Calendar size={14} className="text-slate-200" />
                      {new Date(featuredPost.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <Clock size={14} className="text-slate-200" />
                      {featuredPost.readTime}
                    </div>
                  </div>

                  <div className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-50 text-indigo-600 text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-4 group-hover:bg-indigo-600 group-hover:text-white group-hover:translate-x-2 transition-all font-bold">
                    Read More
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.section>

        )}

        {/* ═══ BLOG CARDS GRID ═══ */}
        <section className="pb-44">
          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <AnimatePresence mode="popLayout">
              {visiblePosts.map((post, i) => (
                <motion.div 
                  key={post.id}
                  variants={fadeUp}
                  layout
                  className="group h-full"
                >
                  <SpotlightCard className="h-full bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 overflow-hidden relative">
                    <motion.div 
                      animate={floating.animate} 
                      className="h-full"
                    >
                    {/* Video-style light sweep effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out pointer-events-none" />
                    
                    <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                      
                      {/* Card Image Area */}
                      <div className="h-72 m-4 rounded-[2rem] overflow-hidden relative shadow-lg">
                        <img 
                          src={post.image || "/team_productivity_blog_hero_1776680822720.png"} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out" 
                        />
                        <div className="absolute top-4 left-4 px-4 py-2 rounded-xl bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest shadow-lg">
                          {post.category || "General"}
                        </div>
                      </div>

                      {/* Card Content Detail */}
                      <div className="px-10 pb-12 pt-4 flex flex-col flex-1">
                        <div className="inline-flex text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6 px-1">
                          {post.category || "Management"}
                        </div>
                        <h3 className="text-2xl font-black leading-[1.2] mb-6 line-clamp-2 tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                          {post.title}
                        </h3>
                        <p className="text-[16px] text-slate-500 leading-relaxed mb-10 line-clamp-3 font-medium">
                          {post.excerpt || "Unlock the frameworks and data-driven insights that empower world-class operations to scale effortlessly."}
                        </p>
                        
                        <div className="mt-auto flex items-center justify-between text-[10px] font-black text-slate-300 uppercase tracking-widest">
                          <div className="flex items-center gap-4">
                             <div className="flex items-center gap-2">
                               <Calendar size={14} className="text-slate-100" />
                               {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                             </div>
                             <div className="flex items-center gap-2">
                               <Clock size={14} className="text-slate-100" />
                               5 min read
                             </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    </motion.div>
                  </SpotlightCard>
                </motion.div>
              ))}
            {displayPosts.length === 0 && (
              <motion.div 
                {...fadeUp}
                className="col-span-full py-44 text-center"
              >
                <div className="w-32 h-32 bg-white/50 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-xl border border-white">
                  <Search size={48} className="text-slate-200" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">No articles found</h3>
                <p className="text-lg text-slate-500 font-medium max-w-md mx-auto mb-10">We couldn't find any articles matching your search query or selected category.</p>
                <button 
                  onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                  className="px-10 py-4 bg-indigo-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-500/20 transition-all font-bold"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

          {/* Load More Button */}
          {visibleCount < displayPosts.length && (
            <motion.div 
              {...fadeUp}
              className="mt-20 flex justify-center"
            >
               <button 
                onClick={handleLoadMore}
                className="px-12 py-5 rounded-3xl bg-indigo-50 text-indigo-600 text-[11px] font-black uppercase tracking-widest flex items-center gap-4 hover:bg-indigo-600 hover:text-white hover:shadow-2xl hover:shadow-indigo-600/30 transition-all group font-bold"
               >
                  Load More Articles
                  <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
               </button>
            </motion.div>
          )}
        </section>

        {/* ═══ NEWSLETTER CTA ═══ */}
        <section className="pb-44">
          <div className="relative bg-slate-950 rounded-[3rem] p-10 lg:p-20 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-indigo-600/30 to-purple-600/30 rounded-full blur-[140px]"
              />
            </div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-balance">
                  <Zap className="w-3.5 h-3.5" />
                  Weekly Dispatch
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-6 text-balance">
                  Join 10,000+ operations leaders.
                </h2>
                <p className="text-lg text-slate-400 mb-0 font-medium">
                  The latest in workforce AI, delivered to your inbox every Tuesday. 
                  No spam, just signal.
                </p>
              </div>
              <div className="max-w-md">
                <SubscribeForm variant="dark" type="blog" />
              </div>

            </div>
          </div>
        </section>

        {/* ═══ EXPLORE MORE TRACKS ═══ */}
        <section className="pb-44 overflow-hidden text-center lg:text-left">
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 mb-16">
            <div className="max-w-xl">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4 text-balance">
                Master the art of <br />
                <span className="text-indigo-600">modern scheduling.</span>
              </h2>
              <p className="text-slate-500 font-medium">Pick a track and start learning today.</p>
            </div>
            <Link href="/features" className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">
              View All Features <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, label: "AI Fundamentals", color: "bg-indigo-50 text-indigo-600", desc: "How AI predicts your labor needs." },
              { icon: Target, label: "Operations", color: "bg-purple-50 text-purple-600", desc: "Scaling across 100+ locations." },
              { icon: TrendingUp, label: "Analytics", color: "bg-emerald-50 text-emerald-600", desc: "Reducing labor cost by 20%." },
              { icon: Globe, label: "Future of Work", color: "bg-sky-50 text-sky-600", desc: "Remote & hybrid team management." },
            ].map((track) => (
              <div key={track.label} className="p-8 rounded-[2rem] border border-white bg-white/50 backdrop-blur-xl hover:bg-white hover:shadow-xl transition-all duration-300 group">
                <div className={`w-12 h-12 rounded-2xl ${track.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                  <track.icon size={20} />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">{track.label}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{track.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

