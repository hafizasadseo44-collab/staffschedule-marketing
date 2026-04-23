"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, Calendar, User, Clock, Share2, 
  Link as LinkIcon, Sparkles, CheckCircle, ArrowRight, Zap, Play,
  ChevronRight, Quote, Info, AlertTriangle, Lightbulb
} from "lucide-react";
import AuraBackground from "./AuraBackground";
import BlockRenderer from "./BlockRenderer";

/* ─── CUSTOM SOCIAL ICONS ─── */
const XIcon = ({ size = 18, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const LinkedinIcon = ({ size = 18, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

interface Author {
  name: string;
  slug: string;
  avatar: string | null;
  gender: string | null;
  bio: string | null;
  facebook?: string | null;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  image: string | null;
  category: string | null;
  createdAt: string;
  author?: Author;
}

interface BlogPostClientProps {
  post: Post;
  relatedPosts: any[];
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [readingTime, setReadingTime] = useState(0);
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isTocExpanded, setIsTocExpanded] = useState(true);

  const handleShare = (platform: "x" | "linkedin" | "facebook") => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = post.title;
    
    const links = {
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };
    
    window.open(links[platform], "_blank", "width=600,height=400");
  };

  // SEO Schema Calculation (Article)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://staffschedule.io/blog/${post.slug}`
    },
    "headline": post.title,
    "image": post.image ? [post.image] : ["https://staffschedule.io/saas_blog_3d_laptop_hero_1776734582759.png"],
    "datePublished": post.createdAt,
    "dateModified": post.createdAt, // Ideally use updatedAt if available
    "author": {
        "@type": "Person",
        "name": post.author?.name || "StaffSchedule Team",
        "url": `https://staffschedule.io/blog/author/${post.author?.slug || 'team'}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "StaffSchedule.io",
      "logo": {
        "@type": "ImageObject",
        "url": "https://staffschedule.io/logo.png"
      }
    },
    "description": post.excerpt || "Insightful editorial on workforce management and AI scheduling."
  };

  const [faqSchema, setFaqSchema] = useState<any>(null);

  useEffect(() => {
    let contentText = "";
    let foundHeadings: { id: string; text: string; level: number }[] = [];

    try {
      const json = JSON.parse(post.content);
      const foundFaqs: { question: string; answer: string }[] = [];
      
      const extractData = (nodes: any[]) => {
        nodes.forEach((node: any, index: number) => {
          if (node.type === 'text') contentText += node.text + " ";
          
          if (node.type === 'heading') {
            const text = node.content?.map((c: any) => c.text).join('') || "";
            const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
            foundHeadings.push({ id, text, level: node.attrs?.level || 2 });
            
            // FAQ Detection: Heading ending with ? followed by paragraph
            if (text.trim().endsWith('?') && nodes[index + 1]?.type === 'paragraph') {
               const answer = nodes[index + 1].content?.map((c: any) => c.text).join('') || "";
               if (answer) foundFaqs.push({ question: text, answer });
            }
          }
          if (node.content) extractData(node.content);
        });
      };
      extractData(json.content || []);

      if (foundFaqs.length > 0) {
        setFaqSchema({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": foundFaqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        });
      }
    } catch (e) {
      contentText = post.content.replace(/<[^>]*>/g, "");
      const parser = new DOMParser();
      const doc = parser.parseFromString(post.content, "text/html");
      foundHeadings = Array.from(doc.querySelectorAll("h2, h3")).map((h, i) => {
        const text = h.textContent || "";
        const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + i;
        return { id, text, level: parseInt(h.tagName[1]) };
      });
    }

    const words = contentText.split(/\s+/).length;
    setReadingTime(Math.ceil(words / 225));
    setHeadings(foundHeadings);
  }, [post.content]);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 100;
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(headings[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getAuthorAvatar = () => {
    if (post.author?.avatar) return post.author.avatar;
    const seed = post.author?.name || "Team";
    const gender = post.author?.gender || "not_specified";
    if (gender === 'male') return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&gender=male&backgroundColor=f8fafc`;
    if (gender === 'female') return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&gender=female&backgroundColor=f8fafc`;
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=f8fafc`;
  };

  return (
    <div className="bg-white selection:bg-indigo-100 selection:text-indigo-900 scroll-smooth font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-[100]" style={{ scaleX }} />

      {/* ═══ NAVIGATION BAR (BACK) ═══ */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
           <Link href="/blog" className="flex items-center gap-2 group text-slate-500 hover:text-slate-900 transition-colors text-sm font-semibold">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Blog
           </Link>
           <div className="flex items-center gap-4">
              <button 
                onClick={copyToClipboard}
                className="p-2 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition-all flex items-center gap-2 text-xs font-bold"
              >
                {copied ? <><CheckCircle size={14} className="text-emerald-500" /> Link Copied</> : <><LinkIcon size={14} /> Copy Link</>}
              </button>
           </div>
        </div>
      </nav>

      <main className="relative pt-32 pb-32">
        {/* ═══ HERO SECTION (TWO COLUMNS) ═══ */}
        <header className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 lg:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center text-left">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 mb-6 sm:mb-8 text-[10px] sm:text-[11px] font-bold tracking-widest text-slate-400 uppercase overflow-x-auto whitespace-nowrap pb-2 sm:pb-0 scrollbar-hide">
                   <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
                   <ChevronRight size={10} className="shrink-0" />
                   <Link href="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link>
                   <ChevronRight size={10} className="shrink-0" />
                   <span className="text-indigo-600/60 truncate max-w-[150px] sm:max-w-[200px]">{post.category || "Intelligence"}</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] sm:text-[11px] font-black uppercase tracking-widest mb-4 sm:mb-6 border border-indigo-100/50">
                   {post.category || "Intelligence"}
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.2] sm:leading-[1.15] mb-6 sm:mb-8 text-balance bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                   {post.title}
                </h1>
                <p className="text-base sm:text-lg text-slate-500 mb-8 sm:mb-10 leading-relaxed font-medium">
                  {post.excerpt || "Explore the latest frameworks and strategies powering high-performance workforce management."}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[12px] sm:text-[13px] font-semibold text-slate-400 border-t border-slate-100 pt-6 sm:pt-8">
                   <Link href={`/blog/author/${post.author?.slug || 'staffschedule-team'}`} className="flex items-center gap-2 group cursor-pointer transition-colors">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 group-hover:border-indigo-300 transition-all">
                        <img src={getAuthorAvatar()} alt={post.author?.name || "Author"} />
                      </div>
                      <span className="text-slate-900 font-bold group-hover:text-indigo-600 transition-colors">{post.author?.name || "StaffSchedule Team"}</span>
                   </Link>
                   <div className="flex items-center gap-2">
                      <Calendar size={13} />
                      {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                   </div>
                   <div className="flex items-center gap-2">
                      <Clock size={13} />
                      {readingTime} min read
                   </div>
                </div>
             </motion.div>


             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }} 
               animate={{ opacity: 1, scale: 1 }} 
               transition={{ duration: 0.8, delay: 0.2 }}
               className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-indigo-900/10 border border-slate-100"
             >
                <img 
                  src={post.image || "/saas_blog_3d_laptop_hero_1776734582759.png"} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl" />
             </motion.div>
          </div>
        </header>

        {/* ═══ MAIN LAYOUT GRID (TWO COLUMN) ═══ */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
          
          {/* LEFT: TOC SIDEBAR (Sticky on Desktop, Natural Flow on Mobile) */}
          <aside className="lg:col-span-3 relative lg:sticky lg:top-32 h-fit mb-8 lg:mb-20 z-40 lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto custom-scrollbar pr-0 lg:pr-2">
             <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                <button 
                  onClick={() => setIsTocExpanded(!isTocExpanded)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white transition-all hover:opacity-95"
                >
                   <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">Table of Contents</span>
                   <motion.div
                     animate={{ rotate: isTocExpanded ? 180 : 0 }}
                     transition={{ duration: 0.3 }}
                   >
                      <ChevronRight size={18} className="rotate-90 shrink-0" />
                   </motion.div>
                </button>


                <AnimatePresence>
                   {isTocExpanded && (
                     <motion.div
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: "auto", opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                       className="overflow-hidden"
                     >
                        <nav className="p-4 py-6 space-y-1">
                           {headings.map(h => (
                             <button
                               key={h.id}
                               onClick={() => document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                               className={`block w-full text-left py-2.5 px-4 rounded-xl text-[13px] font-semibold transition-all group relative ${
                                 activeId === h.id 
                                   ? "text-indigo-600 bg-indigo-50/50" 
                                   : "text-slate-400 hover:text-slate-800 hover:bg-slate-50"
                               } ${h.level === 3 ? "pl-8 text-[12px]" : ""}`}
                             >
                               {activeId === h.id && (
                                 <motion.div 
                                   layoutId="toc-indicator" 
                                   className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-indigo-600 rounded-r-full" 
                                 />
                               )}
                               <span className="line-clamp-2">{h.text}</span>
                             </button>
                           ))}
                        </nav>
                     </motion.div>
                   )}
                </AnimatePresence>
             </div>
             
              {/* Enhanced Social Share (Side) */}
              <div className="mt-8 lg:mt-12 p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-white shadow-[0_8px_32px_rgba(0,0,0,0.03)] relative overflow-hidden group/share">
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover/share:opacity-100 transition-opacity duration-500" />
                 <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 mb-6 block text-center">Fuel the Discussion</span>
                 <div className="relative z-10 flex justify-center gap-5">
                    <button 
                      onClick={() => handleShare("linkedin")}
                      className="w-12 h-12 rounded-2xl bg-white shadow-sm text-slate-400 hover:text-white hover:bg-gradient-to-br hover:from-[#0077b5] hover:to-blue-400 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 transition-all flex items-center justify-center group"
                      title="Share on LinkedIn"
                    >
                       <LinkedinIcon size={20} className="group-hover:scale-110 transition-transform" />
                    </button>
                    <button 
                      onClick={() => handleShare("x")}
                      className="w-12 h-12 rounded-2xl bg-white shadow-sm text-slate-400 hover:text-white hover:bg-slate-900 hover:shadow-lg hover:shadow-slate-900/20 hover:-translate-y-1 transition-all flex items-center justify-center group"
                      title="Share on X"
                    >
                       <XIcon size={20} className="group-hover:scale-110 transition-transform" />
                    </button>
                    <button 
                      onClick={() => handleShare("facebook")}
                      className="w-12 h-12 rounded-2xl bg-white shadow-sm text-slate-400 hover:text-white hover:bg-[#1877F2] hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 transition-all flex items-center justify-center group"
                      title="Share on Facebook"
                    >
                       <FacebookIcon size={20} />
                    </button>
                 </div>
              </div>
          </aside>

          {/* CENTER: ARTICLE CONTENT (Expanded) */}
          <div className="lg:col-span-9 max-w-4xl">
             <div className="bg-white min-h-[500px]">
                <BlockRenderer content={post.content} />
             </div>

              {/* COMPACT AUTHOR BOX BELOW CONTENT */}
              <div className="mt-16 pt-12 border-t border-slate-100 flex items-start gap-6 group/author">
                 <div className="w-16 h-16 rounded-2xl bg-white shrink-0 overflow-hidden shadow-lg border border-slate-100 group-hover/author:border-indigo-200 transition-colors p-1">
                    <img src={getAuthorAvatar()} alt={post.author?.name || "StaffSchedule"} className="w-full h-full object-cover rounded-xl" />
                 </div>
                 <div>
                    <h4 className="text-lg font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                       {post.author?.name || "StaffSchedule.io Intelligence"}
                    </h4>
                    <p className="text-[15px] text-slate-500 leading-relaxed mb-4 max-w-2xl font-medium">
                       {post.author?.bio || "Insights from our editorial team on workforce optimization and AI strategy."}
                    </p>
                    <div className="text-[10px] font-black uppercase tracking-widest text-indigo-600/60">Contributed to StaffSchedule.io</div>
                 </div>
              </div>

             {/* BOTTOM SOCIAL & TAGS */}
             <div className="mt-12 py-8 border-y border-slate-50 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Syndicate:</span>
                   <div className="flex gap-3">
                       <button onClick={() => handleShare("linkedin")} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0077b5] to-blue-500 text-white text-[11px] font-black uppercase tracking-widest hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center gap-2">
                         <LinkedinIcon size={14} /> LinkedIn
                       </button>
                       <button onClick={() => handleShare("x")} className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest hover:shadow-lg transition-all flex items-center gap-2">
                         <XIcon size={14} /> X
                       </button>
                       <button onClick={() => handleShare("facebook")} className="px-5 py-2.5 rounded-xl bg-[#1877F2] text-white text-[11px] font-black uppercase tracking-widest hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center gap-2">
                         <FacebookIcon size={14} /> Facebook
                       </button>
                   </div>
                </div>
                <div className="flex gap-2">
                   {["AI-POWERED", "EFFICIENCY"].map(tag => (
                     <span key={tag} className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.1em] border border-indigo-100/50">{tag}</span>
                   ))}
                </div>
             </div>
          </div>

        </div>
      </main>

      {/* ═══ READ NEXT SECTION ═══ */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
         <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-12 tracking-tight">Expand Your Knowledge</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               {relatedPosts.map(rel => (
                 <Link key={rel.id} href={`/blog/${rel.slug}`} className="group h-full flex flex-col">
                    <div className="aspect-video rounded-3xl overflow-hidden mb-6 shadow-md border border-slate-200 relative">
                       <img src={rel.image || "/saas_blog_3d_laptop_hero_1776734582759.png"} alt={rel.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors mb-3 line-clamp-2">{rel.title}</h3>
                    <div className="mt-auto flex items-center gap-3 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                       <div className="w-6 h-px bg-slate-200" />
                       {new Date(rel.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                 </Link>
               ))}
            </div>
         </div>
      </section>

      {/* ═══ FOOTER CTA ═══ */}
      <section className="py-24 bg-indigo-600 text-white text-center rounded-[4rem] mx-6 mb-12 shadow-2xl relative overflow-hidden">
         <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -ml-48 -mt-48" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mb-48" />
         </div>
         <div className="max-w-3xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-white/10 backdrop-blur-md">
               The Future of Staffing
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter leading-[1.1]">Shift into the future of scheduling.</h2>
            <p className="text-indigo-100 mb-12 text-lg opacity-90 font-medium max-w-xl mx-auto">The most advanced AI logic for complex workforce operations. Join high-performance teams today.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <Link href="https://app.staffschedule.io/signup.php" className="px-10 py-5 rounded-[2rem] bg-white text-indigo-600 font-black uppercase tracking-widest text-xs hover:bg-slate-50 hover:shadow-xl hover:-translate-y-1 transition-all">
                 Start Free Trial
               </Link>
               <Link href="/contact" className="px-10 py-5 rounded-[2rem] bg-white/10 text-white border border-white/20 font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all">
                 Contact Sales
               </Link>
            </div>
         </div>
      </section>

    </div>
  );
}
