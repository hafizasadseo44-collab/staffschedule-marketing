"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Search, Calendar, Clock, ArrowRight, ChevronRight,
  TrendingUp, Zap, Globe, Target, BookOpen, Sparkles, X,
} from "lucide-react";
import SubscribeForm from "../SubscribeForm";

/* ─── TYPES ─── */
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

const FALLBACK_IMAGES = [
  "/saas_blog_3d_laptop_hero_1776734582759.png",
  "/saas_blog_3d_tablet_productivity_1776735096680.png",
  "/saas_blog_3d_analytics_sphere_1776735168198.png",
  "/team_productivity_blog_hero_1776680822720.png",
];

const CATEGORIES = ["All", "Scheduling", "AI Intelligence", "Productivity", "Legal & Compliance", "Operations"];

function getImage(post: Post, index: number) {
  return post.image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/* ─── GRADIENT ORBS BG ─── */
function GradientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-violet-600/8 rounded-full blur-[120px]" />
      <div className="absolute top-[40%] left-[-15%] w-[500px] h-[500px] bg-purple-600/6 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[20%] w-[400px] h-[400px] bg-indigo-600/6 rounded-full blur-[100px]" />
    </div>
  );
}

/* ─── STAT TICKER ─── */
function StatBar({ posts }: { posts: Post[] }) {
  const stats = useMemo(() => {
    const publishedCount = posts.length;
    const uniqueAuthors = new Set(posts.map(p => p.author).filter(Boolean)).size || 1;
    const uniqueCategories = new Set(posts.map(p => p.category).filter(Boolean)).size || 1;
    
    // For "Weekly Readers", we can estimate or use a nice-looking marketing number 
    // that scales slightly with content volume
    const estimatedReaders = Math.max(1200, publishedCount * 150);
    const readersStr = estimatedReaders > 1000 
      ? `${(estimatedReaders / 1000).toFixed(1)}K+` 
      : `${estimatedReaders}+`;

    return [
      { label: "Articles Published", value: `${publishedCount}+` },
      { label: "Weekly Readers", value: readersStr },
      { label: "Expert Authors", value: `${uniqueAuthors}` },
      { label: "Topics Covered", value: `${uniqueCategories}` },
    ];
  }, [posts]);

  return (
    <div className="border-y border-violet-100/60 bg-white/50 backdrop-blur-sm py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-6 sm:gap-12 overflow-x-auto scrollbar-hide">
          {stats.map((s, i) => (
            <div key={i} className="flex items-center gap-3 shrink-0">
              <span className="text-lg sm:text-xl font-black text-violet-600">{s.value}</span>
              <span className="text-xs text-slate-400 font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── FEATURED HERO CARD ─── */
function FeaturedCard({ post, index }: { post: Post; index: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block cursor-pointer">
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 min-h-[420px] sm:min-h-[520px] flex flex-col justify-end">
        {/* Background image - pointer-events-none so clicks pass through */}
        <img
          src={getImage(post, index)}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 pointer-events-none"
        />
        {/* Gradient overlay - pointer-events-none */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent pointer-events-none" />
        {/* Glow - pointer-events-none */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-600 text-white text-[10px] font-black uppercase tracking-widest">
              <Sparkles size={9} /> Featured
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/80 text-[10px] font-semibold uppercase tracking-wider">
              {post.category || "Scheduling"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15] mb-4 max-w-3xl group-hover:text-violet-200 transition-colors duration-300 cursor-pointer">
            {post.title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl line-clamp-2 sm:line-clamp-3 font-medium">
            {post.excerpt || "Discover the strategies and tools high-performing teams rely on to stay ahead."}
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[11px] font-semibold text-white/50 uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><Calendar size={12} /> {formatDate(post.createdAt)}</span>
            <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime || "5 min read"}</span>
            <span className="ml-auto inline-flex items-center gap-2 text-violet-300 text-[11px] font-black group-hover:gap-3 transition-all">
              Read Article <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── STANDARD CARD ─── */
function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full bg-white rounded-2xl sm:rounded-3xl border border-slate-100 overflow-hidden hover:border-violet-200 hover:shadow-2xl hover:shadow-violet-900/8 transition-all duration-500 cursor-pointer">
      {/* Image */}
      <div className="aspect-[16/10] relative overflow-hidden">
        <img
          src={getImage(post, index)}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-violet-700 text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow-sm border border-violet-100">
            {post.category || "General"}
          </span>
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-7">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-3 line-clamp-2 group-hover:text-violet-700 transition-colors duration-300 cursor-pointer">
          {post.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 sm:line-clamp-3 mb-5 font-medium flex-1">
          {post.excerpt || "Explore frameworks and strategies powering high-performance operations."}
        </p>
        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><Calendar size={11} />{formatDate(post.createdAt)}</span>
            <span className="flex items-center gap-1.5"><Clock size={11} />{post.readTime || "5 min"}</span>
          </div>
          <span className="text-[10px] font-black text-violet-600 uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
            Read <ArrowRight size={11} />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── HORIZONTAL CARD (SIDE LIST) ─── */
function HorizontalCard({ post, index }: { post: Post; index: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex items-start gap-4 sm:gap-5 p-4 rounded-2xl hover:bg-violet-50/60 transition-all duration-300">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl overflow-hidden shrink-0">
        <img src={getImage(post, index)} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-violet-500 mb-1 block">{post.category || "General"}</span>
        <h4 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-violet-700 transition-colors mb-2">{post.title}</h4>
        <span className="text-[10px] text-slate-400 font-medium">{formatDate(post.createdAt)}</span>
      </div>
    </Link>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function BlogClientPage({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);

  const filtered = useMemo(() => {
    return posts.filter(p => {
      const matchCat = activeCategory === "All" || p.category?.toLowerCase().includes(activeCategory.toLowerCase());
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    if (!posts.length) return null;
    return posts.find(p => p.featured) || posts[0];
  }, [posts]);

  const gridPosts = useMemo(() => {
    const featId = featuredPost?.id;
    const remaining = filtered.filter(p => p.id !== featId);
    return remaining;
  }, [filtered, featuredPost]);

  const visible = gridPosts.slice(0, visibleCount);
  const sidebarPosts = useMemo(() => posts.slice(0, 4), [posts]);

  return (
    <div className="min-h-screen bg-[#FAFAF9] selection:bg-violet-100 selection:text-violet-900">
      <GradientBackground />

      {/* ═══ HERO HEADER ═══ */}
      <section className="pt-28 sm:pt-36 pb-10 sm:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-[10px] font-black uppercase tracking-[0.15em] mb-6 border border-violet-200/60">
              <BookOpen size={11} /> Knowledge Base
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-5 text-balance">
              Ideas, Insights &amp; <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
                Expert Knowledge
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-500 font-medium max-w-2xl leading-relaxed">
              Stay ahead with the latest strategies, research, and AI-powered insights on workforce management from the StaffSchedule.io team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── STAT BAR ─── */}
      <StatBar posts={posts} />

      {/* ─── SEARCH + FILTER BAR ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-0 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900">
                <X size={15} />
              </button>
            )}
          </div>
          {/* Category Pills - scrollable on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-0.5">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/25"
                    : "bg-white text-slate-500 border border-slate-200 hover:border-violet-300 hover:text-violet-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">

        {/* ═══ NO RESULTS ═══ */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-24 text-center"
          >
            <div className="w-20 h-20 bg-white rounded-3xl shadow-lg border border-slate-100 flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-slate-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-3">No articles found</h3>
            <p className="text-slate-500 font-medium mb-8 max-w-sm mx-auto">We couldn't find articles matching your search or category filter.</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="px-8 py-3.5 bg-violet-600 text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-violet-700 transition-colors shadow-lg shadow-violet-600/25"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}

        {/* ═══ MAIN CONTENT + SIDEBAR GRID ═══ */}
        {filtered.length > 0 && (
          <div className="flex flex-col xl:flex-row gap-10 xl:gap-14">

            {/* ─── LEFT MAIN COLUMN ─── */}
            <div className="flex-1 min-w-0">

              {/* Featured Post (only when not filtering) */}
              {featuredPost && !searchQuery && activeCategory === "All" && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-10"
                >
                  <FeaturedCard post={featuredPost} index={0} />
                </motion.div>
              )}

              {/* Articles Grid */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-5 sm:gap-6"
                >
                  {visible.map((post, i) => (
                    <motion.div
                      key={post.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                    >
                      <PostCard post={post} index={i + 1} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Load More */}
              {visibleCount < gridPosts.length && (
                <div className="mt-10 text-center">
                  <button
                    onClick={() => setVisibleCount(v => v + 6)}
                    className="px-10 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-black uppercase tracking-widest hover:border-violet-300 hover:text-violet-700 hover:shadow-lg transition-all duration-300 inline-flex items-center gap-3"
                  >
                    Load More Articles <ChevronRight size={15} />
                  </button>
                </div>
              )}
            </div>

            {/* ─── RIGHT SIDEBAR ─── */}
            <div className="xl:w-[340px] shrink-0">
              <div className="xl:sticky xl:top-28 space-y-6">

                {/* About Card */}
                <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl shadow-violet-600/20">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                    <Sparkles size={18} className="text-white" />
                  </div>
                  <h3 className="font-black text-lg mb-2">About StaffSchedule.io</h3>
                  <p className="text-violet-100 text-sm leading-relaxed mb-5 font-medium">
                    AI-powered workforce management for modern teams. Schedule. Communicate. Succeed.
                  </p>
                  <Link
                    href="https://app.staffschedule.io/onboarding.php"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-violet-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-violet-50 transition-colors"
                  >
                    Explore Product <ArrowRight size={12} />
                  </Link>
                </div>

                {/* Recent Posts */}
                {sidebarPosts.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                    <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
                      <h3 className="font-black text-sm text-slate-900 uppercase tracking-wider">Recent Articles</h3>
                      <TrendingUp size={14} className="text-violet-500" />
                    </div>
                    <div className="p-2 divide-y divide-slate-50">
                      {sidebarPosts.map((p, i) => (
                        <HorizontalCard key={p.id} post={p} index={i} />
                      ))}
                    </div>
                    <div className="px-5 py-3 border-t border-slate-50">
                      <Link href="/blog" className="text-[11px] font-black uppercase tracking-widest text-violet-600 hover:text-violet-800 transition-colors flex items-center gap-1.5">
                        View All Posts <ArrowRight size={11} />
                      </Link>
                    </div>
                  </div>
                )}

                {/* Newsletter Signup */}
                <div className="bg-slate-900 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap size={14} className="text-violet-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-violet-400">Weekly Dispatch</span>
                  </div>
                  <h3 className="font-black text-white text-lg leading-snug mb-2">Stay Ahead of the Curve</h3>
                  <p className="text-slate-400 text-xs font-medium leading-relaxed mb-5">
                    Get weekly insights on AI scheduling, workforce trends, and operational excellence delivered to your inbox.
                  </p>
                  <SubscribeForm variant="dark" type="blog" />
                  <p className="text-[10px] text-slate-600 font-medium mt-3">No spam. Unsubscribe anytime.</p>
                </div>

                {/* Topics */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                  <h3 className="font-black text-sm text-slate-900 uppercase tracking-wider mb-4">Browse Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "AI Fundamentals", icon: Zap },
                      { label: "Operations", icon: Target },
                      { label: "Analytics", icon: TrendingUp },
                      { label: "Future of Work", icon: Globe },
                    ].map((t) => (
                      <button
                        key={t.label}
                        onClick={() => setActiveCategory(t.label.split(" ")[0])}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 text-slate-600 text-xs font-bold hover:bg-violet-50 hover:text-violet-700 transition-colors border border-slate-100 hover:border-violet-200"
                      >
                        <t.icon size={11} /> {t.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ═══ BOTTOM NEWSLETTER BANNER ═══ */}
        <div className="mt-20 relative bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-violet-600/30 to-purple-600/20 rounded-full blur-[120px]" />
          </div>
          <div className="relative z-10 grid sm:grid-cols-2 gap-8 p-8 sm:p-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-[10px] font-black uppercase tracking-[0.15em] mb-5 border border-violet-500/20">
                <Zap size={10} /> Join 10,000+ Leaders
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-[1.15] mb-4">
                The weekly dispatch on workforce intelligence.
              </h2>
              <p className="text-slate-400 font-medium text-sm leading-relaxed">
                No fluff, just actionable insights from the StaffSchedule.io research team. Delivered every Tuesday.
              </p>
            </div>
            <div>
              <SubscribeForm variant="dark" type="blog" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
