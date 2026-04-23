"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Download,
  Loader2,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// ── Simple Tiptap JSON to HTML Renderer ──
const TiptapRenderer = ({ content }: { content: string }) => {
  if (!content) return null;
  
  try {
    const json = JSON.parse(content);
    
    const renderNode = (node: any, index: number): React.ReactNode => {
      if (!node) return null;

      const children = node.content?.map((child: any, i: number) => renderNode(child, i));

      switch (node.type) {
        case 'doc': return <div key={index}>{children}</div>;
        case 'paragraph': return <p key={index} style={{ textAlign: node.attrs?.textAlign }}>{children}</p>;
        case 'text': {
          let text: React.ReactNode = node.text;
          if (node.marks) {
            node.marks.forEach((mark: any) => {
              if (mark.type === 'bold') text = <strong key={index}>{text}</strong>;
              if (mark.type === 'italic') text = <em key={index}>{text}</em>;
              if (mark.type === 'underline') text = <u key={index}>{text}</u>;
              if (mark.type === 'link') {
                const relAttr = mark.attrs?.rel || (mark.attrs?.href?.startsWith('http') ? 'noopener noreferrer' : undefined);
                text = (
                  <a 
                    key={index} 
                    href={mark.attrs.href} 
                    target={mark.attrs.target || (mark.attrs?.href?.startsWith('http') ? '_blank' : undefined)} 
                    rel={relAttr}
                    className="text-indigo-600 underline font-bold"
                  >
                    {text}
                  </a>
                );
              }
              if (mark.type === 'highlight') text = <mark key={index} style={{ backgroundColor: mark.attrs?.color || '#fbefb3' }}>{text}</mark>;
            });
          }
          return text;
        }
        case 'heading': {
          const Tag = `h${node.attrs.level}` as any;
          const id = node.content?.map((c: any) => c.text).join('').toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return <Tag key={index} id={id} style={{ textAlign: node.attrs?.textAlign }}>{children}</Tag>;
        }
        case 'bulletList': return <ul key={index}>{children}</ul>;
        case 'orderedList': return <ol key={index}>{children}</ol>;
        case 'listItem': return <li key={index}>{children}</li>;
        case 'blockquote': return <blockquote key={index}>{children}</blockquote>;
        case 'horizontalRule': return <hr key={index} />;
        case 'image': return (
          <div key={index} className="my-12">
            <img src={node.attrs.src} alt={node.attrs.alt} className="w-full rounded-[2.5rem] shadow-2xl border-4 border-slate-50" />
          </div>
        );
        case 'codeBlock': return <pre key={index}><code>{children}</code></pre>;
        default: return null;
      }
    };

    return <div className="tiptap-content">{renderNode(json, 0)}</div>;
  } catch (e) {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }
};

export default function GuideDetailClient({ slug }: { slug: string }) {
  const [guide, setGuide] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toc, setToc] = useState<{id: string, text: string, level: number}[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchGuide();
  }, [slug]);

  const fetchGuide = async () => {
    try {
      const res = await fetch(`/api/guides/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setGuide(data);
        generateTOC(data.content);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const generateTOC = (content: string) => {
    if (!content) return;
    try {
      const json = JSON.parse(content);
      const items: any[] = [];
      
      const processNodes = (nodes: any[]) => {
        nodes.forEach(node => {
          if (node.type === 'heading') {
            const text = node.content?.map((c: any) => c.text).join('') || "";
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            items.push({ id, text, level: node.attrs.level });
          }
          if (node.content) processNodes(node.content);
        });
      };

      if (json.content) processNodes(json.content);
      setToc(items);
    } catch (e) {
      // Fallback
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mb-6" />
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Rendering Knowledge...</p>
    </div>
  );

  if (!guide) return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-500">
        <XCircle size={40} className="text-rose-500" />
      </div>
      <h2 className="text-4xl font-black text-slate-900 tracking-tight">Guide Not Found</h2>
      <p className="text-slate-500 font-bold max-w-sm text-center leading-relaxed">The intelligence you are looking for has been moved or archived.</p>
      <Link href="/guides" className="inline-flex items-center gap-3 h-14 px-8 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all">
        <ArrowLeft size={18} />
        Return to Library
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* ── Article Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50/50 border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[500px] bg-indigo-500/[0.04] rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Link href="/guides" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors mb-12 no-underline group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Library
          </Link>
          
          <div className="flex items-center gap-3 mb-8">
            <div className="px-3 py-1.5 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg shadow-indigo-500/20">
              {guide.categoryName || "General"}
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">•</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Clock size={12} /> {Math.max(5, Math.ceil((guide.content?.length || 0) / 500))} Min Read
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-8">
            {guide.title}
          </h1>
          
          <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12">
            {guide.description}
          </p>

          <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <Sparkles size={20} />
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Published By</div>
                <div className="text-sm font-black text-slate-900">StaffSchedule.io Experts</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Area ── */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          
          {/* Main Article Content */}
          <div className="lg:col-span-8">
            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-slate-900 prose-img:rounded-[2.5rem] prose-img:shadow-2xl">
              <TiptapRenderer content={guide.content} />
            </div>

            {/* Bottom CTA Card */}
            <div className="mt-24 p-12 lg:p-16 bg-slate-900 rounded-[3.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px]" />
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Ready to implement this?</h3>
                  <p className="text-slate-400 font-medium mb-8">Get a personalized walkthrough of our scheduling engine and see the ROI for your specific workforce.</p>
                  <Link href="/demo" className="inline-flex items-center gap-2 h-14 px-8 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all no-underline">
                    Book Personalized Demo
                    <ArrowRight size={16} />
                  </Link>
                </div>
                <div className="flex flex-col gap-4">
                  {[
                    "Zero-config deployment",
                    "Custom labor cost models",
                    "Dedicated success manager"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white font-bold text-sm">
                      <CheckCircle2 size={20} className="text-emerald-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4 sticky top-[120px] space-y-10">
            {toc.length > 0 && (
              <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <BookOpen size={16} className="text-indigo-600" />
                  Table of Contents
                </h4>
                <nav className="space-y-4">
                  {toc.map((item, i) => (
                    <a 
                      key={i} 
                      href={`#${item.id}`}
                      className={cn(
                        "block text-sm font-bold transition-all hover:text-indigo-600 no-underline",
                        item.level === 2 ? "text-slate-700 pl-0" : "text-slate-400 pl-4"
                      )}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {guide.pdfUrl && (
              <div className="bg-indigo-50/50 rounded-[2rem] border border-indigo-100 p-8">
                <h4 className="text-xs font-black text-indigo-900 uppercase tracking-widest mb-4">Offline Resource</h4>
                <p className="text-xs text-indigo-600/80 font-bold mb-8 leading-relaxed">Download the PDF version of this guide to share with your leadership team.</p>
                <a 
                  href={guide.pdfUrl}
                  className="w-full h-14 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all no-underline"
                >
                  <Download size={16} />
                  Download Playbook
                </a>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

const XCircle = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" />
  </svg>
);
