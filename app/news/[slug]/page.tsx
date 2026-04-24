import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import PremiumNavbar from '@/components/PremiumNavbar';
import PremiumFooter from '@/components/PremiumFooter';
import { Calendar, Globe, Megaphone, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import SubscribeForm from '@/components/SubscribeForm';
 
export const dynamic = 'force-dynamic';



// ─────────────────────────────────────────────────────
// TIPTAP JSON TO HTML RENDERER (Server Side)
// ─────────────────────────────────────────────────────
function renderTiptapJSON(node: any): string {
  if (!node) return '';
  if (Array.isArray(node)) return node.map(renderTiptapJSON).join('');
  
  if (node.type === 'text') {
    let text = node.text || '';
    if (node.marks) {
      node.marks.forEach((mark: any) => {
        if (mark.type === 'bold') text = `<strong>${text}</strong>`;
        if (mark.type === 'italic') text = `<em>${text}</em>`;
        if (mark.type === 'underline') text = `<u>${text}</u>`;
        if (mark.type === 'strike') text = `<s>${text}</s>`;
        if (mark.type === 'code') text = `<code>${text}</code>`;
        if (mark.type === 'link') text = `<a href="${mark.attrs.href}" target="${mark.attrs.target || '_blank'}" rel="${mark.attrs.rel || 'noopener noreferrer'}">${text}</a>`;
      });
    }
    return text;
  }

  const content = node.content ? renderTiptapJSON(node.content) : '';
  
  switch (node.type) {
    case 'doc': return content;
    case 'paragraph': return `<p>${content}</p>`;
    case 'heading': return `<h${node.attrs.level}>${content}</h${node.attrs.level}>`;
    case 'bulletList': return `<ul>${content}</ul>`;
    case 'orderedList': return `<ol>${content}</ol>`;
    case 'listItem': return `<li>${content}</li>`;
    case 'blockquote': return `<blockquote>${content}</blockquote>`;
    case 'codeBlock': return `<pre><code>${content}</code></pre>`;
    case 'horizontalRule': return `<hr />`;
    case 'hardBreak': return `<br />`;
    case 'image': return `<div class="image-node"><img src="${node.attrs.src}" alt="${node.attrs.alt || ''}" />${node.attrs.caption ? `<div class="caption">${node.attrs.caption}</div>` : ''}</div>`;
    case 'callout': return `<div class="callout-node" data-type="${node.attrs.type}">${content}</div>`;
    default: return content;
  }
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Use raw query to bypass Prisma Client out-of-sync validation errors
  const results = await db.$queryRaw`
    SELECT * FROM Post 
    WHERE slug = ${slug} 
    LIMIT 1
  ` as any[];

  const post = results[0];

  // If the post is not NEWS type, we might still want to show it if accessed via /news/
  // as a fallback for the database schema lag.
  if (!post) {
    notFound();
  }

  const date = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  let htmlContent = post.content;
  if (typeof post.content === 'string' && post.content.startsWith('{')) {
    try {
      const json = JSON.parse(post.content);
      htmlContent = renderTiptapJSON(json);
    } catch (e) {
      console.error("JSON Parse Error:", e);
    }
  }

  return (
    <div className="bg-white dark:bg-brand-dark min-h-screen">
      <PremiumNavbar />
      
      {/* Official Header */}
      <div className="pt-32 sm:pt-40 pb-12 sm:pb-20 border-b border-slate-100 dark:border-slate-800/50 bg-[#FAFBFE] dark:bg-slate-900/30">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          <Link href="/about/news" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-primary mb-8 sm:mb-12 hover:-translate-x-1 transition-transform w-fit">
            <ArrowLeft size={14} /> Back to Newsroom
          </Link>
          
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-brand-primary shrink-0">
              <Megaphone size={20} className="sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-brand-primary block mb-1">Official Press Release</span>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1.5"><Calendar size={12} /> {date}</span>
                <span className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full" />
                <span className="flex items-center gap-1.5"><Globe size={12} /> Global Distribution</span>
              </div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-[1.2] sm:leading-[1.1] mb-8 sm:mb-10">
            {post.title}
          </h1>


          <div className="flex flex-wrap items-center gap-10 pt-10 border-t border-slate-200/60 dark:border-slate-800/60">
             <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Media Relations</p>
               <p className="text-sm font-bold text-slate-700 dark:text-slate-300">press@staffschedule.io</p>
             </div>
             <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Category</p>
               <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                 {post.category || "Uncategorized"}
               </span>
             </div>
             <button className="ml-auto w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white transition-all">
                <Share2 size={18} />
             </button>
          </div>
        </div>
      </div>

      {/* Release Body */}
      <article className="py-20 max-w-[1000px] mx-auto px-6">
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none 
          prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white
          prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-p:font-medium
          prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-black
          prose-blockquote:border-l-4 prose-blockquote:border-brand-primary prose-blockquote:bg-brand-primary/5 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl
        " dangerouslySetInnerHTML={{ __html: htmlContent }} />

        {/* Footer Disclaimer */}
        <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800">
           <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-2xl">
             <strong>About StaffSchedule.io:</strong> StaffSchedule.io is a global leader in AI-driven workforce management and operational intelligence. Our platform empowers thousands of enterprises across healthcare, retail, and hospitality to optimize labor costs and enhance team performance through data-driven scheduling.
           </p>

           <div className="mt-12 p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 max-w-2xl">
             <h4 className="text-lg font-black text-slate-900 dark:text-white mb-4">Stay updated with our latest news</h4>
             <SubscribeForm type="news" />
           </div>

        </div>
      </article>

      <PremiumFooter />
    </div>
  );
}
