'use client';

import { useEffect, useState, use, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { Link as TiptapLink } from '@tiptap/extension-link';
import {
  Save, ArrowLeft, Image as ImageIcon, Plus, Bold, Italic,
  List, ListOrdered, Quote, Heading1, Heading2, Heading3,
  Heading4, Heading5, Heading6,
  Link as LinkIcon, Info, AlertTriangle, Lightbulb, Type,
  Upload, X, Loader2, Sparkles, CheckCircle, Underline as UnderlineIcon,
  Strikethrough, Code, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Minus, Highlighter, Eye, Search, ChevronDown, ChevronUp,
  FileText, BarChart3, Target, Zap, Globe, Hash, Clock,
  PenTool, Palette
} from 'lucide-react';
import Link from 'next/link';
import { Callout, CustomImage } from '@/lib/tiptap-extensions';

// ─────────────────────────────────────────────────────
// SEO ANALYZER (Rank Math Style)
// ─────────────────────────────────────────────────────
function analyzeSEO(title: string, seoTitle: string, slug: string, excerpt: string, content: string, focusKeyword: string) {
  const checks: { label: string; passed: boolean; tip: string; critical?: boolean }[] = [];
  const kw = focusKeyword.trim().toLowerCase();
  const activeTitle = (seoTitle || title || "").toLowerCase();
  const urlSlug = (slug || "").toLowerCase();
  const metaDesc = (excerpt || "").toLowerCase();
  const bodyText = content.toLowerCase();
  
  // 1. Focus Keyword Tests
  if (!kw) {
    return { checks: [{ label: 'Set Focus Keyword', passed: false, tip: 'Add a focus keyword to see your SEO score.', critical: true }], score: 0, wordCount: 0 };
  }

  // Basic SEO
  checks.push({ label: 'Focus Keyword in SEO Title', passed: activeTitle.includes(kw), tip: 'Add your focus keyword to the SEO Title.', critical: true });
  checks.push({ label: 'Focus Keyword in Meta Description', passed: metaDesc.includes(kw), tip: 'Add focus keyword to meta description.', critical: true });
  checks.push({ label: 'Focus Keyword in URL', passed: urlSlug.includes(kw.replace(/\s+/g, '-')), tip: 'Add focus keyword to the URL slug.' });
  
  // Content Length & Density
  const wordCount = bodyText.split(/\s+/).filter(Boolean).length;
  checks.push({ label: 'Content length (600+ words)', passed: wordCount >= 600, tip: `Currently ${wordCount} words. Aim for 600+ for standard articles.` });
  
  const kwRegex = new RegExp(`\\b${kw}\\b`, 'g');
  const kwMatches = (bodyText.match(kwRegex) || []).length;
  const kwDensity = wordCount > 0 ? (kwMatches / wordCount) * 100 : 0;
  checks.push({ 
    label: 'Keyword Density (0.5% - 2.5%)', 
    passed: kwDensity >= 0.5 && kwDensity <= 2.5, 
    tip: `Density is ${kwDensity.toFixed(2)}%. Try to keep it between 0.5% and 2.5%.` 
  });

  // Early Keyword usage
  const first100Words = bodyText.split(/\s+/).slice(0, 100).join(' ');
  checks.push({ label: 'Focus Keyword at the beginning', passed: first100Words.includes(kw), tip: 'Use the focus keyword in the first 10%. (First paragraph).' });

  // Title / Meta Lengths
  checks.push({ label: 'Title length (50-60 chars)', passed: activeTitle.length >= 50 && activeTitle.length <= 60, tip: `Title is ${activeTitle.length} chars. Ideal: 50-60.` });
  checks.push({ label: 'Meta description length (120-160)', passed: metaDesc.length >= 120 && metaDesc.length <= 160, tip: `Meta is ${metaDesc.length} chars. Ideal: 120-160.` });

  // Formatting & Links
  const hasH2 = content.includes('<h2') || content.includes('"type":"heading"');
  checks.push({ label: 'Use Subheadings (H2, H3)', passed: hasH2, tip: 'Use H2/H3 subheadings to structure your content.' });

  const hasImage = content.includes('<img') || content.includes('"type":"image"');
  checks.push({ label: 'Include an Image', passed: hasImage, tip: 'Add at least one image with an alt tag.' });

  const hasLink = content.includes('<a ') || content.includes('"type":"link"');
  checks.push({ label: 'Internal/External Links', passed: hasLink, tip: 'Add relevant internal or external links.' });

  // Calculate Score (weighted)
  let passedWeight = 0;
  let totalWeight = 0;
  
  checks.forEach(check => {
    const weight = check.critical ? 20 : 10;
    totalWeight += weight;
    if (check.passed) passedWeight += weight;
  });

  const score = Math.round((passedWeight / totalWeight) * 100);
  return { checks, score, wordCount };
}

function getScoreColor(score: number) {
  if (score >= 80) return { bg: 'bg-emerald-500', text: 'text-emerald-600', ring: 'ring-emerald-500', label: 'Great' };
  if (score >= 50) return { bg: 'bg-amber-500', text: 'text-amber-600', ring: 'ring-amber-500', label: 'OK' };
  return { bg: 'bg-rose-500', text: 'text-rose-600', ring: 'ring-rose-500', label: 'Needs Work' };
}

// ─────────────────────────────────────────────────────
// MAIN EDITOR
// ─────────────────────────────────────────────────────
export default function BlogEditor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const isNew = id === 'new';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);
  const [heroUploading, setHeroUploading] = useState(false);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('Announcement');
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [focusKeyword, setFocusKeyword] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(true);
  const [seoOpen, setSeoOpen] = useState(true);
  const [headingMenuOpen, setHeadingMenuOpen] = useState(false);
  const hasChanges = useRef(false);
  const [currentId, setCurrentId] = useState(id);
  
  // Advanced Link Modal States
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [linkSearchQuery, setLinkSearchQuery] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTarget, setLinkTarget] = useState('_self');
  const [linkRel, setLinkRel] = useState('dofollow');
  const [linkSuggestions, setLinkSuggestions] = useState<any[]>([]);
  
  const [dynamicCategories, setDynamicCategories] = useState<{id:string;name:string;color:string}[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [authorId, setAuthorId] = useState('');
  const [featured, setFeatured] = useState(false);

  // Fetch categories and authors from API
  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(data => Array.isArray(data) ? setDynamicCategories(data) : console.warn('Categories not an array:', data))
      .catch(() => {});
    fetch('/api/authors')
      .then(r => r.json())
      .then(data => Array.isArray(data) ? setAuthors(data) : console.warn('Authors not an array:', data))
      .catch(() => {});
  }, []);

  // Debounced Link Search Effect
  useEffect(() => {
    if (linkSearchQuery.length >= 2) {
      const timer = setTimeout(() => {
        fetch(`/api/posts/search?q=${encodeURIComponent(linkSearchQuery)}`)
          .then(res => res.json())
          .then(data => Array.isArray(data) ? setLinkSuggestions(data) : setLinkSuggestions([]))
          .catch(() => setLinkSuggestions([]));
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setLinkSuggestions([]);
    }
  }, [linkSearchQuery]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
      }),
      TiptapLink.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-indigo-600 underline underline-offset-4 font-semibold hover:text-indigo-800 transition-colors',
        },
      }),
      Placeholder.configure({
        placeholder: ({ node }: { node: any }) => {
          if (node.type.name === 'heading') {
            const labels: Record<number, string> = { 1: 'Heading 1', 2: 'Heading 2', 3: 'Heading 3', 4: 'Heading 4', 5: 'Heading 5', 6: 'Heading 6' };
            return labels[node.attrs.level] || 'Heading';
          }
          return 'Start writing or press "/" for commands...';
        },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight.configure({ multicolor: true }),
      TextStyle,
      Color,
      CustomImage,
      Callout,
    ],
    content: '',
    onUpdate: () => {
      hasChanges.current = true;
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg prose-slate dark:prose-invert max-w-none focus:outline-none min-h-[600px] py-16 px-8 transition-all duration-300 gutenberg-editor',
      },
    },
  });

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/posts`).then(res => res.json()).then(data => {
        if (!Array.isArray(data)) return;
        const post = data.find((p: any) => p.id === id);
        if (post) {
          setTitle(post.title);
          setSlug(post.slug);
          setExcerpt(post.excerpt || '');
          setImage(post.image || '');
          setCategory(post.category || 'Scheduling');
          setPublished(post.published);
          setAuthorId(post.authorId || '');
          setFeatured(post.featured || false);
          setFocusKeyword(post.focusKeyword || '');
          setSeoTitle(post.seoTitle || '');
          setCanonicalUrl(post.canonicalUrl || '');
          if (editor && post.content) {
            try {
              const json = JSON.parse(post.content);
              editor.commands.setContent(json);
            } catch (e) {
              editor.commands.setContent(post.content);
            }
          }
        }
      });
    }
  }, [isNew, id, editor]);

  useEffect(() => {
    if (isNew && title) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  }, [title, isNew]);

  // Autosave to LocalStorage (Resilience against window close)
  useEffect(() => {
    if (!editor) return;
    const saveToLocal = () => {
      const draftData = {
        title, slug, excerpt, image, category, authorId, featured,
        focusKeyword, seoTitle, canonicalUrl,
        content: editor.getJSON(),
        timestamp: Date.now()
      };
      localStorage.setItem(`blog_draft_${id}`, JSON.stringify(draftData));
    };
    const timer = setTimeout(saveToLocal, 3000); // Save every 3s
    return () => clearTimeout(timer);
  }, [title, slug, excerpt, image, category, authorId, featured, focusKeyword, seoTitle, canonicalUrl, editor?.getJSON(), id]);

  // Restore Draft
  const [showRestore, setShowRestore] = useState(false);
  const [draftToRestore, setDraftToRestore] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`blog_draft_${id}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (isNew || (parsed.timestamp > Date.now() - 3600000)) { // 1 hour
        setDraftToRestore(parsed);
        setShowRestore(true);
      }
    }
  }, [id, isNew]);

  const restoreDraft = () => {
    if (!draftToRestore || !editor) return;
    setTitle(draftToRestore.title);
    setSlug(draftToRestore.slug);
    setExcerpt(draftToRestore.excerpt || '');
    setImage(draftToRestore.image || '');
    setCategory(draftToRestore.category || 'Scheduling');
    setAuthorId(draftToRestore.authorId || '');
    setFeatured(draftToRestore.featured || false);
    setFocusKeyword(draftToRestore.focusKeyword || '');
    setSeoTitle(draftToRestore.seoTitle || '');
    setCanonicalUrl(draftToRestore.canonicalUrl || '');
    editor.commands.setContent(draftToRestore.content);
    setShowRestore(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url && editor) {
        editor.chain().focus().insertContent({
          type: 'image',
          attrs: { src: data.url, alt: file.name, caption: '' }
        }).run();
      }
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const [publishing, setPublishing] = useState(false);

  const doSave = async (shouldPublish: boolean, isAutoSave = false) => {
    if (!title && isAutoSave) return; 
    if (!title || !slug || !editor) {
      if (!isAutoSave) alert('Title, slug, and content are required.');
      return;
    }

    if (!isAutoSave) {
       if (shouldPublish) setPublishing(true); else setSaving(true);
    } else {
       setAutoSaving(true);
    }

    const payload = {
      title, slug, excerpt, image, published: shouldPublish || published, category, type: 'NEWS',
      authorId: authorId || null,
      featured,
      focusKeyword,
      seoTitle,
      canonicalUrl,
      content: JSON.stringify(editor.getJSON())
    };
    try {
      const res = await fetch(currentId === 'new' ? '/api/posts' : `/api/posts/${currentId}`, {
        method: currentId === 'new' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (currentId === 'new' && data.id) {
          setCurrentId(data.id);
        }
        
        if (shouldPublish) setPublished(true);
        hasChanges.current = false;

        if (!isAutoSave) {
          alert(currentId === 'new' ? 'News Release Created Successfully!' : 'News Release Updated Successfully!');
          router.push('/admin');
          router.refresh();
        }
      } else {
        const data = await res.json();
        if (!isAutoSave) alert(data.error || 'Failed to save news release');
      }
    } catch (e: any) {
      if (!isAutoSave) alert('Network error: ' + e.message);
    } finally {
      setSaving(false);
      setPublishing(false);
      setAutoSaving(false);
    }
  };

  // ── Auto-save Logic ──
  useEffect(() => {
    const timer = setInterval(() => {
      if (hasChanges.current && title) {
        console.log("Auto-saving news draft...");
        doSave(false, true);
      }
    }, 15000); 
    return () => clearInterval(timer);
  }, [title, slug, excerpt, image, category, authorId, featured, focusKeyword, seoTitle, canonicalUrl, currentId]);

  const handleBack = async () => {
    if (hasChanges.current && title) {
      await doSave(false, true);
    }
    router.back();
  };

  // SEO analysis
  const contentText = editor ? editor.getText() : '';
  const contentJSON = editor ? JSON.stringify(editor.getJSON()) : '';
  const seo = analyzeSEO(title, seoTitle, slug, excerpt, contentJSON, focusKeyword);
  const scoreStyle = getScoreColor(seo.score);
  const readTime = Math.max(1, Math.ceil(seo.wordCount / 200));

  if (!editor) return null;

  const currentHeadingLevel = [1,2,3,4,5,6].find(l => editor.isActive('heading', { level: l }));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* ─── TOP BAR ─── */}
      <div className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={handleBack} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition-all">
              <ArrowLeft size={20} />
            </button>
            <div className="hidden md:flex items-center gap-2">
              <PenTool size={16} className="text-indigo-500" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{isNew ? 'New Press Release' : 'Edit Press Release'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Word Count & Read Time */}
            <div className="hidden md:flex items-center gap-4 text-xs text-slate-400 mr-2">
              <span className="flex items-center gap-1"><FileText size={13} /> {seo.wordCount} words</span>
              <span className="flex items-center gap-1"><Clock size={13} /> {readTime} min read</span>
            </div>

            {/* SEO Score Badge */}
            <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold ${scoreStyle.bg} text-white`}>
              <Target size={13} /> SEO: {seo.score}/100
            </div>

            {/* Status Badge (read-only) */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold ${
              published ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'
            }`}>
              <span className={`w-2 h-2 rounded-full ${published ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              {published ? 'Live' : 'Draft'}
            </div>

            {/* Preview Button */}
            {!isNew && slug && (
              <Link
                href={`/blog/${slug}`}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all border border-slate-200"
              >
                <Eye size={14} /> Preview
              </Link>
            )}

            {/* Save Draft Button */}
            <button
              onClick={() => doSave(false)}
              disabled={saving || publishing}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 active:scale-95 transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? 'Saving...' : (published ? 'Update' : 'Save Draft')}
            </button>

            {/* Publish Button */}
            {!published && (
              <button
                onClick={() => doSave(true)}
                disabled={saving || publishing}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-indigo-500/25"
              >
                {publishing ? <Loader2 size={16} className="animate-spin" /> : <Globe size={16} />}
                {publishing ? 'Publishing...' : 'Publish'}
              </button>
            )}
          </div>
        </div>
      </div>

      {showRestore && (
        <div className="max-w-[1600px] mx-auto px-6 mt-4">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-amber-500" size={20} />
              <div>
                <p className="text-sm font-bold text-amber-900 dark:text-amber-100">Unsaved draft detected</p>
                <p className="text-xs text-amber-700 dark:text-amber-400">Would you like to restore your last session?</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={restoreDraft} className="px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-amber-600 transition-all">Restore</button>
              <button onClick={() => setShowRestore(false)} className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-400 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all">Dismiss</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ─── MAIN EDITOR ─── */}
          <div className="lg:col-span-8 space-y-0">

            {/* ── TOOLBAR ── */}
            <div className="bg-white dark:bg-slate-900 rounded-t-2xl border border-b-0 border-slate-200 dark:border-slate-800 p-3 sticky top-[57px] z-40 backdrop-blur-xl">
              <div className="flex flex-wrap items-center gap-1">
                {/* Heading Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setHeadingMenuOpen(!headingMenuOpen)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all border ${
                      currentHeadingLevel
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        : 'bg-white dark:bg-slate-800 text-slate-600 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Type size={15} />
                    {currentHeadingLevel ? `H${currentHeadingLevel}` : 'Paragraph'}
                    <ChevronDown size={13} />
                  </button>
                  {headingMenuOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 py-1 w-48 z-50">
                      <HeadingOption label="Paragraph" active={!currentHeadingLevel} onClick={() => { editor.chain().focus().setParagraph().run(); setHeadingMenuOpen(false); }} />
                      <HeadingOption label="Heading 1" tag="H1" size="text-2xl" active={editor.isActive('heading', { level: 1 })} onClick={() => { editor.chain().focus().toggleHeading({ level: 1 }).run(); setHeadingMenuOpen(false); }} />
                      <HeadingOption label="Heading 2" tag="H2" size="text-xl" active={editor.isActive('heading', { level: 2 })} onClick={() => { editor.chain().focus().toggleHeading({ level: 2 }).run(); setHeadingMenuOpen(false); }} />
                      <HeadingOption label="Heading 3" tag="H3" size="text-lg" active={editor.isActive('heading', { level: 3 })} onClick={() => { editor.chain().focus().toggleHeading({ level: 3 }).run(); setHeadingMenuOpen(false); }} />
                      <HeadingOption label="Heading 4" tag="H4" size="text-base" active={editor.isActive('heading', { level: 4 })} onClick={() => { editor.chain().focus().toggleHeading({ level: 4 }).run(); setHeadingMenuOpen(false); }} />
                      <HeadingOption label="Heading 5" tag="H5" size="text-sm" active={editor.isActive('heading', { level: 5 })} onClick={() => { editor.chain().focus().toggleHeading({ level: 5 }).run(); setHeadingMenuOpen(false); }} />
                      <HeadingOption label="Heading 6" tag="H6" size="text-xs" active={editor.isActive('heading', { level: 6 })} onClick={() => { editor.chain().focus().toggleHeading({ level: 6 }).run(); setHeadingMenuOpen(false); }} />
                    </div>
                  )}
                </div>

                <ToolDivider />

                {/* Text Formatting */}
                <ToolBtn active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} icon={Bold} tooltip="Bold" />
                <ToolBtn active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} icon={Italic} tooltip="Italic" />
                <ToolBtn active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} icon={UnderlineIcon} tooltip="Underline" />
                <ToolBtn active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} icon={Strikethrough} tooltip="Strikethrough" />
                <ToolBtn active={editor.isActive('highlight')} onClick={() => editor.chain().focus().toggleHighlight().run()} icon={Highlighter} tooltip="Highlight" />
                <ToolBtn active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()} icon={Code} tooltip="Inline Code" />

                <ToolDivider />

                {/* Alignment */}
                <ToolBtn active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} icon={AlignLeft} tooltip="Left" />
                <ToolBtn active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} icon={AlignCenter} tooltip="Center" />
                <ToolBtn active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} icon={AlignRight} tooltip="Right" />
                <ToolBtn active={editor.isActive({ textAlign: 'justify' })} onClick={() => editor.chain().focus().setTextAlign('justify').run()} icon={AlignJustify} tooltip="Justify" />

                <ToolDivider />

                {/* Lists & Blocks */}
                <ToolBtn active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} icon={List} tooltip="Bullet List" />
                <ToolBtn active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} icon={ListOrdered} tooltip="Numbered List" />
                <ToolBtn active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} icon={Quote} tooltip="Blockquote" />
                <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} icon={Minus} tooltip="Divider" />

                <ToolDivider />

                {/* Media & Links */}
                <ToolBtn
                  active={editor.isActive('link')}
                  onClick={() => setLinkModalOpen(true)}
                  icon={LinkIcon}
                  tooltip="Link"
                />
                <ToolBtn onClick={() => fileInputRef.current?.click()} icon={uploading ? Loader2 : ImageIcon} tooltip="Image" className={uploading ? 'animate-spin' : ''} />

                <ToolDivider />

                {/* Callouts */}
                <ToolBtn onClick={() => editor.chain().focus().insertContent({ type: 'callout', attrs: { type: 'tip' }, content: [{ type: 'paragraph' }] }).run()} icon={Lightbulb} tooltip="Tip" className="text-amber-500" />
                <ToolBtn onClick={() => editor.chain().focus().insertContent({ type: 'callout', attrs: { type: 'warning' }, content: [{ type: 'paragraph' }] }).run()} icon={AlertTriangle} tooltip="Warning" className="text-rose-500" />
                <ToolBtn onClick={() => editor.chain().focus().insertContent({ type: 'callout', attrs: { type: 'info' }, content: [{ type: 'paragraph' }] }).run()} icon={Info} tooltip="Info" className="text-sky-500" />

                <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleImageUpload} />
              </div>
            </div>

            {/* ── EDITOR CANVAS ── */}
            <div className="bg-white dark:bg-slate-900 rounded-b-2xl border border-t-0 border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
              <div className="p-8 md:p-12 border-b border-slate-100 dark:border-slate-800">
                <input
                  type="text"
                  placeholder="Enter your press release title..."
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full text-4xl md:text-5xl font-extrabold bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 tracking-tight leading-tight"
                />
                {title && (
                  <p className="mt-3 text-xs text-slate-400 flex items-center gap-2">
                    <Globe size={12} />
                    staffschedule.io/blog/<span className="text-indigo-500 font-semibold">{slug}</span>
                  </p>
                )}
              </div>

              <div className="relative">
                {/* Bubble Menu */}
                {editor && (
                  <BubbleMenu
                    editor={editor}
                    tippyOptions={{ duration: 150, placement: 'top' }}
                    className="flex items-center gap-0.5 px-2 py-1.5 bg-slate-900 dark:bg-white rounded-xl shadow-2xl border border-slate-700 dark:border-slate-300"
                  >
                    {/* Heading quick-select in bubble */}
                    {[1,2,3,4,5,6].map(level => (
                      <BubbleBtn
                        key={level}
                        active={editor.isActive('heading', { level })}
                        onClick={() => editor.chain().focus().toggleHeading({ level: level as 1|2|3|4|5|6 }).run()}
                        label={`H${level}`}
                      />
                    ))}
                    <div className="w-px h-5 bg-slate-600 dark:bg-slate-400 mx-1" />
                    <BubbleIconBtn active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} icon={Bold} />
                    <BubbleIconBtn active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} icon={Italic} />
                    <BubbleIconBtn active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} icon={UnderlineIcon} />
                    <BubbleIconBtn active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} icon={Strikethrough} />
                    <BubbleIconBtn active={editor.isActive('highlight')} onClick={() => editor.chain().focus().toggleHighlight().run()} icon={Highlighter} />
                    <div className="w-px h-5 bg-slate-600 dark:bg-slate-400 mx-1" />
                    <BubbleIconBtn
                      active={editor.isActive('link')}
                      onClick={() => setLinkModalOpen(true)}
                      icon={LinkIcon}
                    />
                  </BubbleMenu>
                )}

                {/* Advanced Link Modal */}
                {linkModalOpen && (
                  <div className="absolute top-16 left-8 z-50 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white">Insert Link</h3>
                      <button onClick={() => setLinkModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><X size={16} /></button>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Search / URL Input */}
                      <div className="relative">
                        <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">URL or Search Post</label>
                        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                          <Search size={14} className="text-slate-400" />
                          <input 
                            type="text" 
                            value={linkSearchQuery}
                            onChange={(e) => {
                              setLinkSearchQuery(e.target.value);
                              setLinkUrl(e.target.value);
                            }}
                            placeholder="https://... or type to search"
                            className="w-full bg-transparent text-sm font-medium outline-none text-slate-700 dark:text-slate-300"
                            autoFocus
                          />
                        </div>
                        {/* Suggestions Dropdown */}
                        {linkSuggestions.length > 0 && (
                          <div className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50">
                            {linkSuggestions.map(post => (
                              <button 
                                key={post.id}
                                onClick={() => {
                                  setLinkUrl(`https://staffschedule.io/blog/${post.slug}`);
                                  setLinkSearchQuery(`https://staffschedule.io/blog/${post.slug}`);
                                  setLinkSuggestions([]);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm border-b border-slate-100 dark:border-slate-700 last:border-0"
                              >
                                <div className="font-bold text-slate-800 dark:text-white">{post.title}</div>
                                <div className="text-[10px] text-indigo-500">/{post.slug}</div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Rel Attribute</label>
                            <select 
                              value={linkRel} 
                              onChange={(e) => setLinkRel(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium outline-none appearance-none"
                            >
                               <option value="dofollow">Dofollow</option>
                               <option value="nofollow">Nofollow</option>
                               <option value="sponsored">Sponsored</option>
                               <option value="ugc">UGC</option>
                            </select>
                         </div>
                         <div>
                            <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Target</label>
                            <select 
                              value={linkTarget} 
                              onChange={(e) => setLinkTarget(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium outline-none appearance-none"
                            >
                               <option value="_self">Same Tab</option>
                               <option value="_blank">New Tab</option>
                            </select>
                         </div>
                      </div>

                      <div className="flex gap-2 justify-end pt-2">
                        {editor.isActive('link') && (
                          <button 
                            onClick={() => {
                              editor.chain().focus().unsetLink().run();
                              setLinkModalOpen(false);
                            }}
                            className="px-4 py-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl text-xs font-bold transition-colors"
                          >
                            Remove
                          </button>
                        )}
                        <button 
                          onClick={() => {
                            if (!linkUrl) return;
                            const attrs: any = { href: linkUrl, target: linkTarget };
                            if (linkRel !== 'dofollow') attrs.rel = linkRel; else attrs.rel = '';
                            editor.chain().focus().setLink(attrs).run();
                            setLinkModalOpen(false);
                            setLinkSearchQuery('');
                          }}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-500/25"
                        >
                          Apply Link
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <EditorContent editor={editor} />
              </div>
            </div>
          </div>

          {/* ─── SIDEBAR ─── */}
          <aside className="lg:col-span-4 space-y-6 sticky top-[80px] max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar pr-2">

            {/* ── SEO PANEL (Rank Math Style) ── */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
              <button
                onClick={() => setSeoOpen(!seoOpen)}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${scoreStyle.bg} flex items-center justify-center`}>
                    <Target size={18} className="text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-slate-800 dark:text-white">SEO Analysis</div>
                    <div className={`text-xs font-semibold ${scoreStyle.text}`}>{scoreStyle.label} — {seo.score}/100</div>
                  </div>
                </div>
                {seoOpen ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
              </button>

              {seoOpen && (
                <div className="px-5 pb-5 space-y-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                  {/* Score Bar */}
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${scoreStyle.bg} rounded-full transition-all duration-700`} style={{ width: `${seo.score}%` }} />
                  </div>

                  {/* Focus Keyword */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Focus Keyword</label>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <Hash size={14} className="text-slate-400" />
                      <input
                        type="text"
                        value={focusKeyword}
                        onChange={e => setFocusKeyword(e.target.value)}
                        className="flex-1 bg-transparent text-sm font-medium text-slate-700 dark:text-slate-300 outline-none"
                        placeholder="e.g. staff scheduling software"
                      />
                    </div>
                  </div>

                  {/* SEO Title */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">SEO Title</label>
                    <input
                      type="text"
                      value={seoTitle}
                      onChange={e => setSeoTitle(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Overrides default title"
                    />
                  </div>

                  {/* Canonical URL */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Canonical URL</label>
                    <input
                      type="text"
                      value={canonicalUrl}
                      onChange={e => setCanonicalUrl(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Optional absolute URL"
                    />
                  </div>

                  {/* SEO Checklist */}
                  <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
                    {seo.checks.map((check, i) => (
                      <div key={i} className="flex items-start gap-2.5 py-1.5">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${check.passed ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-500'}`}>
                          {check.passed ? <CheckCircle size={12} /> : <X size={12} />}
                        </div>
                        <div>
                          <div className={`text-xs font-semibold ${check.passed ? 'text-slate-600' : 'text-slate-800 dark:text-slate-200'}`}>{check.label}</div>
                          {!check.passed && <div className="text-[11px] text-slate-400 mt-0.5">{check.tip}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── POST SETTINGS ── */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Sparkles size={18} className="text-slate-500" />
                  </div>
                  <span className="text-sm font-bold text-slate-800 dark:text-white">Post Settings</span>
                </div>
                {settingsOpen ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
              </button>

              {settingsOpen && (
                <div className="px-5 pb-5 space-y-5 border-t border-slate-100 dark:border-slate-800 pt-4">
                  {/* Slug */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">URL Slug</label>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <LinkIcon size={14} className="text-slate-400" />
                      <input type="text" value={slug} onChange={e => setSlug(e.target.value)} className="flex-1 bg-transparent text-sm font-semibold text-indigo-600 outline-none" />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Category</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
                    >
                      {dynamicCategories.length > 0 ? (
                        dynamicCategories.map(c => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))
                      ) : (
                        <>
                          <option value="Scheduling">Scheduling</option>
                          <option value="AI Intelligence">AI Intelligence</option>
                          <option value="Productivity">Productivity</option>
                          <option value="Operations">Operations</option>
                          <option value="Announcement">Announcement</option>
                        </>
                      )}
                    </select>
                  </div>

                  {/* Featured Status Toggle */}
                  <div className="flex items-center justify-between py-2 px-1 bg-indigo-50/30 dark:bg-indigo-500/5 rounded-xl border border-indigo-100/50 dark:border-indigo-500/10">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${featured ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                        <Sparkles size={14} />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-slate-800 dark:text-white uppercase tracking-tight">Featured Blog</div>
                        <div className="text-[10px] text-slate-400">Promote to hero section</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setFeatured(!featured)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${featured ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${featured ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  {/* Author Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Author</label>
                    <div className="relative">
                       <select 
                         value={authorId}
                         onChange={e => setAuthorId(e.target.value)}
                         className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
                       >
                          <option value="">Select Author</option>
                          {authors.map(a => (
                            <option key={a.id} value={a.id}>{a.name}</option>
                          ))}
                       </select>
                       <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <ChevronDown size={14} />
                       </div>
                    </div>
                  </div>

                  {/* Meta Description / Excerpt */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Meta Description</label>
                      <span className={`text-[10px] font-bold ${excerpt.length >= 120 && excerpt.length <= 160 ? 'text-emerald-500' : 'text-slate-400'}`}>
                        {excerpt.length}/160
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={excerpt}
                      onChange={e => setExcerpt(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      placeholder="Write a compelling meta description for search engines..."
                    />
                  </div>

                  {/* Featured Image */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Featured Image</label>
                    <input
                      type="file"
                      hidden
                      ref={heroInputRef}
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setHeroUploading(true);
                        const formData = new FormData();
                        formData.append('file', file);
                        try {
                          const res = await fetch('/api/upload', { method: 'POST', body: formData });
                          const data = await res.json();
                          if (data.url) setImage(data.url);
                        } catch (err) {
                          alert('Upload failed');
                        } finally {
                          setHeroUploading(false);
                        }
                      }}
                    />
                    <div
                      onClick={() => heroInputRef.current?.click()}
                      className="group cursor-pointer relative aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-2 hover:border-indigo-400 transition-all"
                    >
                      {heroUploading ? (
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 size={24} className="text-indigo-500 animate-spin" />
                          <span className="text-xs text-slate-400 font-medium">Uploading...</span>
                        </div>
                      ) : image ? (
                        <>
                          <img src={image} alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-xs font-bold">Change Image</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <Upload size={24} className="text-slate-400 group-hover:text-indigo-500" />
                          <span className="text-xs text-slate-400">Click to upload featured image</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* ─── EDITOR STYLES ─── */}
      <style jsx global>{`
        /* Gutenberg Block Editor */
        .gutenberg-editor {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .gutenberg-editor > * {
          max-width: 100%;
          margin-top: 0.25rem;
          margin-bottom: 0.25rem;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          border: 2px solid transparent;
          transition: border-color 0.15s ease, background-color 0.15s ease;
        }

        .gutenberg-editor > *:hover {
          border-color: rgba(99, 102, 241, 0.08);
          background-color: rgba(99, 102, 241, 0.01);
        }

        .gutenberg-editor > *.is-active,
        .gutenberg-editor > *:focus-within {
          border-color: rgba(99, 102, 241, 0.15);
          background-color: rgba(99, 102, 241, 0.03);
        }

        /* Headings - Color coded like WordPress */
        .gutenberg-editor h1 {
          font-size: 2.5rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: #0f172a;
          border-left: 4px solid #6366f1;
          padding-left: 1rem;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .gutenberg-editor h2 {
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.2;
          color: #1e293b;
          border-left: 4px solid #8b5cf6;
          padding-left: 1rem;
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
        }

        .gutenberg-editor h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #334155;
          border-left: 4px solid #06b6d4;
          padding-left: 1rem;
          margin-top: 1.5rem;
        }

        .gutenberg-editor h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #475569;
          border-left: 4px solid #14b8a6;
          padding-left: 1rem;
          margin-top: 1.25rem;
        }

        .gutenberg-editor h5 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #64748b;
          border-left: 4px solid #f59e0b;
          padding-left: 1rem;
        }

        .gutenberg-editor h6 {
          font-size: 0.95rem;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-left: 4px solid #f97316;
          padding-left: 1rem;
        }

        .gutenberg-editor p {
          font-size: 1.125rem;
          line-height: 1.8;
          color: #475569;
        }

        .gutenberg-editor blockquote {
          border-left: 4px solid #c7d2fe;
          background: #eef2ff;
          padding: 1.25rem 1.5rem;
          border-radius: 0 1rem 1rem 0;
          color: #4338ca;
          font-style: italic;
          font-size: 1.1rem;
        }

        .gutenberg-editor ul,
        .gutenberg-editor ol {
          padding-left: 1.5rem;
          font-size: 1.05rem;
          color: #475569;
        }

        .gutenberg-editor ul li::marker { color: #6366f1; }
        .gutenberg-editor ol li::marker { color: #6366f1; font-weight: 700; }

        .gutenberg-editor code {
          background: #f1f5f9;
          color: #e11d48;
          padding: 0.15rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.9em;
        }

        .gutenberg-editor pre {
          background: #0f172a;
          color: #e2e8f0;
          padding: 1.5rem;
          border-radius: 1rem;
          overflow-x: auto;
          font-size: 0.9rem;
        }

        .gutenberg-editor hr {
          border: none;
          height: 2px;
          background: linear-gradient(90deg, transparent, #c7d2fe, transparent);
          margin: 2rem 0;
        }

        .gutenberg-editor mark {
          background: #fef08a;
          padding: 0.1em 0.3em;
          border-radius: 0.2em;
        }

        .gutenberg-editor a {
          color: #4f46e5;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        /* Placeholder */
        .ProseMirror p.is-editor-empty:first-child::before,
        .ProseMirror .is-empty::before {
          content: attr(data-placeholder);
          float: left;
          color: #cbd5e1;
          pointer-events: none;
          height: 0;
          font-style: italic;
        }

        /* Callout Nodes */
        .callout-node {
          margin: 1.5rem 0;
          padding: 1.25rem 1.5rem;
          border-radius: 1rem;
          background: rgba(99, 102, 241, 0.05);
          border: 1px solid rgba(99, 102, 241, 0.15);
        }
        .callout-node[data-type="tip"] { background: rgba(245, 158, 11, 0.06); border-color: rgba(245, 158, 11, 0.2); }
        .callout-node[data-type="warning"] { background: rgba(244, 63, 94, 0.05); border-color: rgba(244, 63, 94, 0.15); }
        .callout-node[data-type="info"] { background: rgba(14, 165, 233, 0.05); border-color: rgba(14, 165, 233, 0.15); }

        /* Image Nodes */
        .image-node {
          margin: 2rem 0;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 20px 40px -15px rgba(0,0,0,0.08);
        }
        .image-node img { width: 100%; display: block; }
        .image-node .caption {
          padding: 0.75rem 1rem;
          background: #f8fafc;
          text-align: center;
          font-size: 0.85rem;
          color: #94a3b8;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────

function HeadingOption({ label, tag, size, active, onClick }: { label: string; tag?: string; size?: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${active ? 'bg-indigo-50 dark:bg-indigo-900/30' : ''}`}
    >
      <span className={`font-semibold text-slate-700 dark:text-slate-300 ${size || 'text-sm'}`}>{label}</span>
      {tag && <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${active ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-400'}`}>{tag}</span>}
    </button>
  );
}

function ToolDivider() {
  return <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />;
}

function ToolBtn({ active, onClick, icon: Icon, tooltip, className = '' }: { active?: boolean; onClick: () => void; icon: any; tooltip?: string; className?: string }) {
  return (
    <button
      onClick={onClick}
      title={tooltip}
      className={`p-2 rounded-lg transition-all duration-150 ${
        active
          ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
          : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700'
      } ${className}`}
    >
      <Icon size={16} />
    </button>
  );
}

function BubbleBtn({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-1.5 py-1 rounded text-[11px] font-bold transition-colors ${
        active ? 'bg-indigo-600 text-white' : 'text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-900'
      }`}
    >
      {label}
    </button>
  );
}

function BubbleIconBtn({ active, onClick, icon: Icon }: { active: boolean; onClick: () => void; icon: any }) {
  return (
    <button
      onClick={onClick}
      className={`p-1.5 rounded-lg transition-colors ${
        active ? 'bg-indigo-600 text-white' : 'text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-900'
      }`}
    >
      <Icon size={14} />
    </button>
  );
}
