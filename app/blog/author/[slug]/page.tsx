import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Globe, Calendar, Clock, ArrowLeft,
  User, Mail, ArrowRight, Sparkles, BookOpen, Quote
} from 'lucide-react';

/* ─── CUSTOM SOCIAL ICONS ─── */
const TwitterIcon = ({ size = 18, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ size = 18, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FacebookIcon = ({ size = 18, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  
  let authorRaw = await db.$queryRaw`SELECT * FROM Author WHERE slug = ${slug} LIMIT 1` as any[];
  let author = authorRaw[0] || null;

  if (!author && decodedSlug !== slug) {
    let decodedAuthorRaw = await db.$queryRaw`SELECT * FROM Author WHERE slug = ${decodedSlug} LIMIT 1` as any[];
    author = decodedAuthorRaw[0] || null;
  }

  // Handle default StaffSchedule team
  if (!author && (slug === 'staffschedule-team' || decodedSlug === 'staffschedule-team' || slug === 'team')) {
    return {
      title: 'StaffSchedule Team | Editorial Profile',
      description: 'The official editorial team at StaffSchedule.io bringing you the latest insights on workforce optimization.',
      alternates: { canonical: `https://staffschedule.io/blog/author/staffschedule-team` }
    };
  }
  
  if (!author) {
    return { title: 'Author Not Found | StaffSchedule.io' };
  }

  const title = `${author.name} | Editorial Team | StaffSchedule.io`;
  const description = author.bio || `Articles and insights by ${author.name} on StaffSchedule.io.`;
  const url = `https://staffschedule.io/blog/author/${author.slug}`;
  const image = author.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${author.name}&backgroundColor=f8fafc`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'profile',
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    }
  };
}

export default async function AuthorProfilePage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  let authorRaw = await db.$queryRaw`SELECT * FROM Author WHERE slug = ${slug} LIMIT 1` as any[];
  let author = authorRaw[0] || null;

  // Try decoded slug if not found
  if (!author && decodedSlug !== slug) {
    let decodedAuthorRaw = await db.$queryRaw`SELECT * FROM Author WHERE slug = ${decodedSlug} LIMIT 1` as any[];
    author = decodedAuthorRaw[0] || null;
  }

  if (author) {
    // Fetch posts for this author using raw query
    const posts = await db.$queryRaw`
      SELECT id, title, slug, excerpt, image, category, createdAt 
      FROM Post 
      WHERE authorId = ${author.id} AND published = 1
      ORDER BY createdAt DESC
    ` as any[];
    author.posts = posts;
  }

  // Fallback for default team if missing from DB
  let isDefaultTeam = false;
  if (!author && (slug === 'staffschedule-team' || decodedSlug === 'staffschedule-team' || slug === 'team')) {
    isDefaultTeam = true;
    
    // Fetch all posts with no author assigned
    const orphanedPosts = await db.$queryRaw`
      SELECT id, title, slug, excerpt, image, category, createdAt 
      FROM Post 
      WHERE (authorId IS NULL OR authorId = '') AND published = 1
      ORDER BY createdAt DESC
    ` as any[];

    author = {
      id: 'default-team',
      name: 'StaffSchedule Team',
      slug: 'staffschedule-team',
      bio: 'The official editorial team at StaffSchedule.io bringing you the latest insights on workforce optimization and AI scheduling.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=StaffSchedule&backgroundColor=f8fafc',
      gender: 'not_specified',
      twitter: 'staffschedule',
      linkedin: 'https://linkedin.com/company/staffschedule',
      facebook: null,
      website: 'https://staffschedule.io',
      createdAt: new Date(),
      updatedAt: new Date(),
      posts: orphanedPosts as any
    } as any;
  }

  // ─── AUTHOR NOT FOUND CUSTOM UI ───
  if (!author) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl border border-slate-100 flex items-center justify-center mb-8 rotate-3">
          <User size={40} className="text-slate-300" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">Author Not Found</h1>
        <p className="text-slate-500 font-medium max-w-md mx-auto mb-10 leading-relaxed">
          We couldn't find an editorial profile for that URL. They may have moved or the link might be broken.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/blog" className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-2">
            <ArrowLeft size={16} /> Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  const getAuthorAvatar = () => {
    if (author?.avatar) return author.avatar;
    const gender = author?.gender || "not_specified";
    if (gender === 'male') return `https://api.dicebear.com/7.x/avataaars/svg?seed=${author?.name}&gender=male&backgroundColor=f8fafc`;
    if (gender === 'female') return `https://api.dicebear.com/7.x/avataaars/svg?seed=${author?.name}&gender=female&backgroundColor=f8fafc`;
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${author?.name}&backgroundColor=f8fafc`;
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": author.name,
      "description": author.bio || `Articles by ${author.name}`,
      "image": getAuthorAvatar(),
      "url": `https://staffschedule.io/blog/author/${author.slug}`,
      "sameAs": [
        author.twitter ? `https://twitter.com/${author.twitter.replace('@', '')}` : null,
        author.linkedin,
        author.facebook,
        author.website
      ].filter(Boolean)
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      
      {/* ─── CINEMATIC HERO ─── */}
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 bg-slate-50/50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full">
           <div className="absolute top-1/4 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-[120px] mix-blend-multiply" />
           <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-[120px] mix-blend-multiply" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all font-bold text-xs uppercase tracking-widest mb-12 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Insights
           </Link>

           <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-3">
                 <div className="w-48 h-48 rounded-[3rem] bg-indigo-100 overflow-hidden border-4 border-white shadow-2xl relative group rotate-3 hover:rotate-0 transition-transform duration-500">
                    <img src={getAuthorAvatar()} alt={author.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[3rem]" />
                 </div>
              </div>
              <div className="md:col-span-9">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-6 border border-indigo-100/50">
                    <Sparkles size={10} /> Verified {isDefaultTeam ? 'Team' : 'Author'}
                 </div>
                 <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter">
                    {author.name}
                 </h1>
                 <p className="text-xl text-slate-500 leading-relaxed max-w-3xl font-medium mb-8">
                    {author.bio || "Contributing editor and strategist focused on the intersection of workforce logic and operational efficiency."}
                 </p>

                 <div className="flex flex-wrap items-center gap-6">
                    {author.twitter && (
                      <Link href={`https://twitter.com/${author.twitter.replace('@', '')}`} target="_blank" className="flex items-center gap-2 text-slate-400 hover:text-sky-500 transition-colors font-bold text-sm">
                         <TwitterIcon size={18} /> @{author.twitter.replace('@', '')}
                      </Link>
                    )}
                    {author.linkedin && (
                      <Link href={author.linkedin} target="_blank" className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors font-bold text-sm">
                         <LinkedinIcon size={18} /> Profile
                      </Link>
                    )}
                    {author.facebook && (
                      <Link href={author.facebook} target="_blank" className="flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors font-bold text-sm">
                         <FacebookIcon size={18} /> Facebook
                      </Link>
                    )}
                    {author.website && (
                      <Link href={author.website} target="_blank" className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors font-bold text-sm">
                         <Globe size={18} /> Website
                      </Link>
                    )}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* ─── POSTS GRID ─── */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-16 px-4">
           <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Recent Publications</h2>
              <p className="text-slate-400 font-medium mt-1">Written by {author.name}</p>
           </div>
           <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
              {author.posts.length} {author.posts.length === 1 ? 'Article' : 'Articles'}
           </div>
        </div>

        {author.posts.length === 0 ? (
          <div className="text-center py-32 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
             <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
             <p className="text-slate-500 font-bold">No articles published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
             {author.posts.map((post: any) => (
               <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col h-full bg-white rounded-3xl border border-slate-100 p-4 hover:shadow-2xl hover:shadow-indigo-900/5 transition-all duration-500 hover:-translate-y-2">
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-6 relative">
                     <img 
                       src={post.image || "/saas_blog_3d_laptop_hero_1776734582759.png"} 
                       alt={post.title} 
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                     />
                     <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-lg bg-white/90 backdrop-blur-md text-indigo-600 text-[10px] font-black uppercase tracking-widest shadow-sm">
                           {post.category || "Insight"}
                        </span>
                     </div>
                  </div>
                  <div className="px-2 pb-4">
                     <h3 className="text-xl font-bold text-slate-900 mb-4 leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {post.title}
                     </h3>
                     <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-6 font-medium opacity-80">
                        {post.excerpt}
                     </p>
                     <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                           <Calendar size={14} />
                           {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="text-indigo-600 font-black text-[10px] uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                           Read More <ArrowRight size={12} />
                        </div>
                     </div>
                  </div>
               </Link>
             ))}
          </div>
        )}
      </section>

      {/* ─── NEWSLETTER / FOOTER ─── */}
      <section className="py-32 bg-slate-900 rounded-[4rem] mx-6 mb-12 overflow-hidden relative">
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent" />
         </div>
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl font-black text-white mb-6 tracking-tight">Stay updated with {author.name.split(' ')[0]}'s latest work</h2>
            <p className="text-slate-400 text-lg mb-12 font-medium">Join 5,000+ professionals getting weekly insights on workforce intelligence.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
               <input 
                 type="email" 
                 placeholder="Enter your email" 
                 className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
               />
               <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20">
                  Subscribe
               </button>
            </div>
         </div>
      </section>
    </div>
  );
}
