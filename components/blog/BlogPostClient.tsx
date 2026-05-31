"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, Calendar, Clock, CheckCircle,
  Link as LinkIcon, ChevronRight,
  Sparkles, BookOpen, ArrowRight, Zap,
} from "lucide-react";
import BlockRenderer from "./BlockRenderer";
import NewsletterForm from "@/components/newsletter/NewsletterForm";

/* ─── TYPES ─── */
interface Author { name: string; slug: string; avatar?: string | null; gender?: string | null; bio?: string | null; }
interface Post { id: string; title: string; slug: string; content: string; excerpt?: string | null; image?: string | null; category?: string | null; createdAt: string; author?: Author; }

/* ─── ICONS ─── */
const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);
const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const LinkedInIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </svg>
);

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
function getAvatar(author?: Author) {
  if (author?.avatar) return author.avatar;
  const seed = author?.name || "Team";
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=f8fafc`;
}

/* ─── READING PROGRESS ─── */
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-600 to-purple-600 origin-left z-[100]" style={{ scaleX }} />;
}

/* ─── TOC ─── */
function useHeadings(content: string) {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  useEffect(() => {
    try {
      const json = JSON.parse(content);
      const found: typeof headings = [];
      const idCount: Record<string, number> = {};
      const walk = (nodes: any[]) => nodes?.forEach(n => {
        if (n.type === "heading") {
          const text = n.content?.map((c: any) => c.text).join("") || "";
          let id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
          // Make IDs unique
          if (idCount[id] !== undefined) {
            idCount[id]++;
            id = `${id}-${idCount[id]}`;
          } else {
            idCount[id] = 0;
          }
          if (text) found.push({ id, text, level: n.attrs?.level || 2 });
        }
        if (n.content) walk(n.content);
      });
      walk(json.content || []);
      setHeadings(found);
    } catch { setHeadings([]); }
  }, [content]);
  return headings;
}

/* ─── SIDEBAR ─── */
function Sidebar({ post, relatedPosts, headings, activeId }: { post: Post; relatedPosts: any[]; headings: any[]; activeId: string; }) {
  return (
    <aside className="hidden lg:block lg:w-[300px] xl:w-[320px] shrink-0">
      <div className="sticky top-28 space-y-5">

        {/* TOC */}
        {headings.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="px-5 py-4 bg-gradient-to-r from-violet-600 to-purple-700">
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white/80 flex items-center gap-2">
                <BookOpen size={11} /> Table of Contents
              </span>
            </div>
            <nav className="p-3 space-y-0.5 max-h-64 overflow-y-auto">
              {headings.map(h => (
                <button
                  key={h.id}
                  onClick={() => document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className={`block w-full text-left py-2 px-3 rounded-xl text-[12px] font-semibold transition-all ${h.level === 3 ? "pl-6 text-[11px]" : ""} ${activeId === h.id ? "bg-violet-50 text-violet-700" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}`}
                >
                  <span className="line-clamp-1">{h.text}</span>
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* About Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-violet-600/20">
            <Sparkles size={18} className="text-white" />
          </div>
          <h3 className="font-black text-lg text-slate-900 mb-2">About StaffSchedule.io</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-5 font-medium">
            AI-powered workforce management for modern teams. Schedule. Communicate. Succeed.
          </p>
          <Link
            href="https://app.staffschedule.io/onboarding.php"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-700 transition-all shadow-md shadow-violet-600/10"
          >
            Explore Product <ArrowRight size={12} />
          </Link>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-slate-50">
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">You Might Also Like</span>
            </div>
            <div className="p-3 space-y-1">
              {relatedPosts.map((rel: any) => (
                <Link key={rel.id} href={`/blog/${rel.slug}`} className="group flex items-start gap-3 p-3 rounded-xl hover:bg-violet-50 transition-all">
                  <div className="w-16 h-14 rounded-xl overflow-hidden shrink-0">
                    <img src={rel.image || "/saas_blog_3d_laptop_hero_1776734582759.png"} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[12px] font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-violet-700 transition-colors">{rel.title}</h4>
                    <span className="text-[10px] text-slate-400 font-medium mt-1 block">{new Date(rel.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-slate-50">
              <Link href="/blog" className="text-[11px] font-black uppercase tracking-widest text-violet-600 hover:text-violet-800 transition-colors flex items-center gap-1.5">
                View All Articles <ArrowRight size={11} />
              </Link>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl shadow-violet-600/20">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={13} className="text-violet-200" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-violet-200">Free Trial</span>
          </div>
          <h3 className="font-black text-base leading-snug mb-3">Ready to transform your scheduling?</h3>
          <p className="text-violet-100 text-xs font-medium leading-relaxed mb-5">Join 10,000+ teams using StaffSchedule.io to work smarter.</p>
          <Link href="https://app.staffschedule.io/onboarding.php" className="block text-center px-5 py-2.5 bg-white text-violet-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-violet-50 transition-colors">
            Start for Free →
          </Link>
        </div>

      </div>
    </aside>
  );
}

/* ─── FLOATING SHARE BAR (DESKTOP) ─── */
function FloatingShareBar({ post }: { post: Post }) {
  const [copied, setCopied] = useState(false);
  const share = (platform: string) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `Check out this article: ${post.title} via @StaffSchedule`;
    const links: Record<string, string> = {
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };
    window.open(links[platform], "_blank", "width=600,height=500,menubar=no,toolbar=no");
  };
  const copyLink = () => { 
    navigator.clipboard.writeText(window.location.href); 
    setCopied(true); 
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <div className="flex flex-col items-center gap-4 sticky top-[35vh]">
      <div className="flex flex-col items-center gap-1.5 mb-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 rotate-0">Share</span>
        <div className="w-px h-10 bg-gradient-to-b from-slate-200 to-transparent" />
      </div>
      
      <button 
        onClick={() => share("x")} 
        className="group relative w-12 h-12 flex items-center justify-center bg-white border border-slate-100 rounded-2xl shadow-sm hover:bg-slate-900 hover:border-slate-900 hover:text-white transition-all duration-300 hover:-translate-y-1"
        title="Share on X"
      >
        <XIcon size={18} />
      </button>

      <button 
        onClick={() => share("facebook")} 
        className="group relative w-12 h-12 flex items-center justify-center bg-white border border-slate-100 rounded-2xl shadow-sm hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-all duration-300 hover:-translate-y-1"
        title="Share on Facebook"
      >
        <FacebookIcon size={18} />
      </button>

      <button 
        onClick={() => share("linkedin")} 
        className="group relative w-12 h-12 flex items-center justify-center bg-white border border-slate-100 rounded-2xl shadow-sm hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white transition-all duration-300 hover:-translate-y-1"
        title="Share on LinkedIn"
      >
        <LinkedInIcon size={18} />
      </button>

      <button 
        onClick={copyLink} 
        className={`w-12 h-12 flex items-center justify-center border rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 ${copied ? "bg-emerald-500 border-emerald-500 text-white" : "bg-white border-slate-100 text-slate-600 hover:bg-violet-600 hover:border-violet-600 hover:text-white"}`}
        title="Copy Link"
      >
        {copied ? <CheckCircle size={18} /> : <LinkIcon size={18} />}
      </button>
    </div>
  );
}

/* ─── MOBILE SHARE BAR ─── */
function MobileShareBar({ post }: { post: Post }) {
  const [copied, setCopied] = useState(false);
  const share = (platform: string) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `Check out this article: ${post.title} via @StaffSchedule`;
    const links: Record<string, string> = {
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };
    window.open(links[platform], "_blank", "width=600,height=500");
  };
  const copyLink = () => { 
    navigator.clipboard.writeText(window.location.href); 
    setCopied(true); 
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <div className="lg:hidden flex items-center gap-3 flex-wrap mt-8 pt-8 border-t border-slate-100">
      <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 mr-2">Share Article:</span>
      <button onClick={() => share("x")} className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all"><XIcon size={16} /></button>
      <button onClick={() => share("facebook")} className="w-10 h-10 rounded-xl bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all"><FacebookIcon size={16} /></button>
      <button onClick={() => share("linkedin")} className="w-10 h-10 rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-all"><LinkedInIcon size={16} /></button>
      <button onClick={copyLink} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${copied ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-violet-600 hover:text-white"}`}>
        {copied ? <CheckCircle size={16} /> : <LinkIcon size={16} />}
      </button>
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function BlogPostClient({ post, relatedPosts }: { post: Post; relatedPosts: any[] }) {
  const headings = useHeadings(post.content);
  const [activeId, setActiveId] = useState("");
  const [readingTime, setReadingTime] = useState(5);

  useEffect(() => {
    try {
      const json = JSON.parse(post.content);
      let text = "";
      const walk = (nodes: any[]) => nodes?.forEach(n => { if (n.text) text += n.text + " "; if (n.content) walk(n.content); });
      walk(json.content || []);
      setReadingTime(Math.max(1, Math.ceil(text.split(/\s+/).length / 225)));
    } catch { setReadingTime(5); }
  }, [post.content]);

  // Analytics Ping
  useEffect(() => {
    if (!post?.id) return;
    const tracked = sessionStorage.getItem(`tracked_view_${post.id}`);
    if (!tracked) {
      fetch(`/api/posts/${post.id}/view`, { method: 'POST' }).catch(() => {});
      sessionStorage.setItem(`tracked_view_${post.id}`, 'true');
    }
  }, [post.id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      let current = "";
      headings.forEach(h => {
        const el = document.getElementById(h.id);
        if (el && el.offsetTop <= scrollY) current = h.id;
      });
      setActiveId(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const authorSlug = post.author?.slug || (post.author?.name || "staffschedule-team").toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div className="min-h-screen bg-[#FAFAF9] selection:bg-violet-100 selection:text-violet-900">
      <ReadingProgress />

      {/* ═══ STICKY NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/blog" className="flex items-center gap-2 text-slate-500 hover:text-violet-700 transition-colors text-sm font-semibold group shrink-0">
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Blog
          </Link>
          <div className="hidden sm:block flex-1 min-w-0 text-center">
            <span className="text-xs font-semibold text-slate-400 line-clamp-1">{post.title}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <Clock size={12} /> {readingTime} min read
            </span>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="pt-24 sm:pt-28 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-6 overflow-x-auto whitespace-nowrap pb-1 scrollbar-hide">
            <Link href="/" className="hover:text-violet-600 transition-colors">Home</Link>
            <ChevronRight size={10} className="shrink-0" />
            <Link href="/blog" className="hover:text-violet-600 transition-colors">Blog</Link>
            <ChevronRight size={10} className="shrink-0" />
            <span className="text-violet-500 truncate max-w-[200px]">{post.category || "Article"}</span>
          </div>

          {/* Category + Title */}
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-[10px] font-black uppercase tracking-widest mb-5 border border-violet-200/60">
              <Sparkles size={9} /> {post.category || "Insight"}
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.15] mb-5 text-balance bg-gradient-to-br from-violet-700 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-base sm:text-lg text-slate-500 font-medium leading-relaxed mb-7 max-w-3xl">
                {post.excerpt}
              </p>
            )}
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[12px] sm:text-[13px] font-semibold text-slate-500 border-t border-slate-100 pt-5 pb-8">
              <Link href={`/blog/author/${authorSlug}`} className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-violet-200 group-hover:border-violet-400 transition-colors">
                  <img src={getAvatar(post.author)} alt={post.author?.name || "Author"} className="w-full h-full object-cover" />
                </div>
                <span className="text-slate-800 font-bold group-hover:text-violet-700 transition-colors">{post.author?.name || "StaffSchedule Team"}</span>
              </Link>
              <span className="flex items-center gap-1.5 text-slate-400"><Calendar size={13} />{formatDate(post.createdAt)}</span>
              <span className="flex items-center gap-1.5 text-slate-400"><Clock size={13} />{readingTime} min read</span>
            </div>
          </div>

          {/* Hero Image */}
          {post.image && (
            <div className="relative w-full aspect-video sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-violet-900/10 border border-slate-100 mb-0">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" fetchPriority="high" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          )}
        </div>
      </section>

      {/* ═══ CONTENT + SIDEBAR ═══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 relative">
        {/* Floating Share (Desktop) - Moves within this container boundary */}
        <div className="hidden xl:block absolute -left-20 top-14 bottom-14 w-12">
           <FloatingShareBar post={post} />
        </div>

        <div className="flex gap-10 xl:gap-14 items-start">

          {/* Article Content */}
          <main className="flex-1 min-w-0">
            <article className="prose-article">
              <BlockRenderer content={post.content} />
            </article>

            {/* Mobile share */}
            <MobileShareBar post={post} />

            {/* Author Card */}
            <div className="mt-12 p-6 sm:p-8 bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm flex gap-5 sm:gap-6 items-start">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-violet-200 shrink-0">
                <img src={getAvatar(post.author)} alt={post.author?.name || "Author"} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-black text-slate-900 text-base">{post.author?.name || "StaffSchedule Team"}</h4>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[9px] font-black uppercase tracking-widest">
                    <Sparkles size={8} /> Verified
                  </span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed font-medium mb-3">
                  {post.author?.bio || "Insights from our editorial team on workforce optimization and AI strategy."}
                </p>
                <Link href={`/blog/author/${authorSlug}`} className="text-[11px] font-black uppercase tracking-widest text-violet-600 hover:text-violet-800 transition-colors flex items-center gap-1.5">
                  View All Articles <ArrowRight size={11} />
                </Link>
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="mt-16 sm:mt-24">
              <NewsletterForm
                variant="split"
                source={`/blog/${post.slug}`}
                tags={[post.category || "blog"].filter(Boolean) as string[]}
                preferences={["blog", "weeklyDigest"]}
                heading="Enjoyed this article?"
                subheading="Join 12,000+ ops leaders getting our best scheduling playbooks, AI workforce trends, and exclusive guides — straight to your inbox every Monday."
              />
            </div>

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
              <div className="mt-16 sm:mt-24">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">You Might Also Like</h2>
                  <Link href="/blog" className="text-[11px] font-black uppercase tracking-widest text-violet-600 hover:text-violet-800 transition-colors flex items-center gap-1.5 group">
                    Explore Blog <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.slice(0, 3).map((rel: any) => (
                    <Link key={rel.id} href={`/blog/${rel.slug}`} className="group flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden hover:border-violet-200 hover:shadow-xl hover:shadow-violet-900/5 transition-all duration-300">
                      <div className="aspect-[16/10] relative overflow-hidden">
                        <img src={rel.image || "/saas_blog_3d_laptop_hero_1776734582759.png"} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 rounded-lg bg-white/90 backdrop-blur-md text-violet-600 text-[9px] font-black uppercase tracking-widest shadow-sm">
                            {rel.category || "Insight"}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug mb-3 line-clamp-2 group-hover:text-violet-700 transition-colors">{rel.title}</h4>
                        <div className="mt-auto flex items-center justify-between text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                          <span className="flex items-center gap-1.5"><Calendar size={11} />{new Date(rel.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                          <span className="text-violet-600 font-black group-hover:translate-x-1 transition-transform">Read →</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* Sticky Sidebar (desktop only) */}
          <Sidebar post={post} relatedPosts={relatedPosts} headings={headings} activeId={activeId} />
        </div>
      </div>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="relative bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl p-8 sm:p-12 text-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-1/2 -right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-violet-600/30 to-purple-600/20 rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-400 text-[10px] font-black uppercase tracking-[0.15em] mb-6 border border-violet-500/20">
              <Zap size={10} /> Transform Your Workforce
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-[1.15] mb-5">
              Ready to schedule smarter?
            </h2>
            <p className="text-slate-400 font-medium mb-8 leading-relaxed">
              Join 10,000+ teams using StaffSchedule.io to cut scheduling time by 80% and reduce labor costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://app.staffschedule.io/onboarding.php" className="px-8 py-4 bg-violet-600 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-violet-500 hover:shadow-xl hover:shadow-violet-600/25 hover:-translate-y-0.5 transition-all">
                Start Free Trial
              </Link>
              <Link href="/contact" className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all">
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
