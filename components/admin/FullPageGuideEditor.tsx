"use client";

import { useEffect, useState, use, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import { Link as TiptapLink } from '@tiptap/extension-link';
import { 
  Save, ArrowLeft, Image as ImageIcon, Plus, 
  ChevronDown, ChevronUp, CheckCircle, X,
  Loader2, Sparkles, Globe, Eye, Search,
  Settings, Target, Hash, FileText, Layout,
  Trash2, CloudUpload, Bold, Italic, List, 
  ListOrdered, Quote, Heading1, Heading2, Heading3,
  Link as LinkIcon, Info, AlertTriangle, Lightbulb, 
  Type, Strikethrough, Code, AlignLeft, AlignCenter, 
  AlignRight, AlignJustify, Minus, Highlighter, Edit3,
  LayoutGrid, RefreshCcw
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Helper Components for Toolbar
const ToolBtn = ({ active, onClick, icon: Icon, tooltip, className }: any) => (
  <button
    onClick={(e) => { e.preventDefault(); onClick(); }}
    className={cn(
      "p-2 rounded-lg transition-all duration-200 group relative",
      active 
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
        : "text-slate-400 hover:text-slate-600 hover:bg-slate-100",
      className
    )}
  >
    <Icon size={16} />
    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
      {tooltip}
    </span>
  </button>
);

const ToolDivider = () => <div className="w-px h-6 bg-slate-200 mx-1" />;

const HeadingOption = ({ label, tag, size, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center justify-between px-4 py-2.5 text-sm font-bold transition-colors",
      active ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"
    )}
  >
    <div className="flex items-center gap-3">
      <span className={cn("text-xs font-black uppercase opacity-40", size)}>{tag || 'P'}</span>
      {label}
    </div>
    {active && <CheckCircle size={14} />}
  </button>
);

export default function FullPageGuideEditor({ guideId }: { guideId?: string }) {
  const router = useRouter();
  const isNew = !guideId || guideId === 'new';
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  // Categories State
  const [categories, setCategories] = useState<any[]>([]);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(false); // Default to draft for new
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  
  // Track current ID for auto-save (especially if it was 'new')
  const [currentId, setCurrentId] = useState(guideId || 'new');
  const hasChanges = useRef(false);

  const [settingsOpen, setSettingsOpen] = useState(true);
  const [seoOpen, setSeoOpen] = useState(true);
  const [headingMenuOpen, setHeadingMenuOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight.configure({ multicolor: true }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-3xl shadow-2xl my-8 mx-auto max-w-full h-auto border-4 border-white',
        },
      }),
      TiptapLink.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-indigo-600 underline underline-offset-4 font-semibold hover:text-indigo-800 transition-colors',
        },
      }),
      Placeholder.configure({
        placeholder: 'Start writing your professional guide content here...',
      }),
    ],
    content: '',
    onUpdate: () => {
      hasChanges.current = true;
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg prose-slate max-w-none focus:outline-none min-h-[600px] py-16 px-12 lg:px-20',
      },
    },
  });

  // Fetch Categories
  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/guides/categories");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setCategories(data);
          if (isNew && data.length > 0 && !categoryId) {
            setCategoryId(data[0].id);
          }
        } else {
          console.warn('Guide categories not an array:', data);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [isNew, categoryId]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (!isNew && guideId) {
      fetch(`/api/guides/${guideId}`)
        .then(res => res.json())
        .then(data => {
          if (data && !data.error) {
            setTitle(data.title);
            setSlug(data.slug);
            setDescription(data.description || '');
            setExcerpt(data.excerpt || '');
            setCoverImage(data.coverImage || '');
            setPdfUrl(data.pdfUrl || '');
            setCategoryId(data.categoryId || '');
            setIsFeatured(data.isFeatured);
            setIsPublished(data.isPublished);
            setSeoTitle(data.seoTitle || '');
            setSeoDescription(data.seoDescription || '');
            if (editor && data.content) {
               try {
                 editor.commands.setContent(JSON.parse(data.content));
               } catch(e) {
                 editor.commands.setContent(data.content);
               }
            }
            setLoading(false);
            setCurrentId(data.id);
          } else {
            console.error('Failed to load guide:', data);
            setLoading(false);
          }
        })
        .catch(err => {
          console.error('Error loading guide:', err);
          setLoading(false);
        });
    }
  }, [isNew, guideId, editor]);

  useEffect(() => {
    if (isNew && title && !slug) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  }, [title, isNew, slug]);

  const handleSave = async (forcePublished?: boolean, isSilent: boolean = false) => {
    // Only require title/slug for manual saves, not necessarily for auto-drafts
    const targetTitle = title || "Untitled Progress";
    const targetSlug = slug || `draft-${Date.now()}`;
    
    setSaving(true);
    const content = editor ? JSON.stringify(editor.getJSON()) : "";
    const categoryName = categories.find(c => c.id === categoryId)?.name || "General";
    
    const payload = {
      title: targetTitle, 
      slug: targetSlug, 
      description, content, excerpt,
      coverImage, pdfUrl, categoryId, categoryName, isFeatured, 
      isPublished: forcePublished !== undefined ? forcePublished : isPublished,
      seoTitle, seoDescription
    };

    try {
      const url = currentId === 'new' ? '/api/guides' : `/api/guides/${currentId}`;
      const method = currentId === 'new' ? 'POST' : 'PATCH';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        if (currentId === 'new' && data.id) {
          setCurrentId(data.id);
        }
        if (!isSilent) {
          if (forcePublished !== undefined) {
            setIsPublished(forcePublished);
            alert(forcePublished ? "Guide Published Successfully!" : "Draft Saved Successfully!");
          } else {
            alert("Guide Updated Successfully!");
          }
          
          // Navigate back to dashboard after manual save
          router.push('/admin');
          router.refresh();
        }
        
        hasChanges.current = false;
        return true;
      } else {
        const data = await res.json();
        if (!isSilent) alert(data.error || 'Failed to save guide');
      }
    } catch (e: any) {
      console.error(e);
      if (!isSilent) alert('Network error: ' + e.message);
    } finally {
      setSaving(false);
    }
    return false;
  };

  // ── Auto-save Logic ──
  useEffect(() => {
    const timer = setInterval(() => {
      if (hasChanges.current && title) {
        console.log("Auto-saving draft...");
        setAutoSaving(true);
        handleSave(undefined, true).then(() => setAutoSaving(false));
      }
    }, 15000); // Auto-save every 15 seconds if changes exist
    return () => clearInterval(timer);
  }, [title, slug, description, excerpt, coverImage, pdfUrl, categoryId, isFeatured, isPublished, seoTitle, seoDescription, currentId]);

  const handleBack = async () => {
    if (hasChanges.current && title) {
      setAutoSaving(true);
      await handleSave();
    }
    router.back();
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
        editor.chain().focus().setImage({ src: data.url, alt: file.name }).run();
      }
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        setCoverImage(data.url);
        hasChanges.current = true;
      }
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
      <p className="text-xs font-black uppercase tracking-widest text-slate-400">Initializing Content Studio...</p>
    </div>
  );

  const currentHeadingLevel = [1,2,3,4,5,6].find(l => editor?.isActive('heading', { level: l }));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Top Navigation Bar ── */}
      <div className="sticky top-0 z-[100] bg-white/90 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={handleBack} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                {isNew ? 'New Guide Deployment' : 'Edit Guide Configuration'}
              </h2>
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Knowledge Base Engine</p>
                {autoSaving && (
                  <span className="flex items-center gap-1 text-[10px] font-black text-indigo-500 uppercase tracking-widest animate-pulse">
                    <RefreshCcw size={10} className="animate-spin" />
                    Auto-saving...
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className={cn(
              "hidden md:flex px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest",
              isPublished ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-100 text-slate-400 border border-slate-200"
            )}>
              {isPublished ? 'Live on Site' : 'Draft Mode'}
            </div>
            
            <button 
              onClick={() => handleSave(false)}
              disabled={saving}
              className="h-12 px-6 bg-white text-slate-700 border border-slate-200 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-3 disabled:opacity-50"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {isPublished ? 'Update' : 'Save Draft'}
            </button>

            <button 
              onClick={() => handleSave(true)}
              disabled={saving}
              className="h-12 px-8 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-3 disabled:opacity-50"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Globe size={18} />}
              {isPublished ? 'Update Published' : 'Deploy & Publish'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Workspace ── */}
      <div className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Editor Canvas (Left) */}
          <div className="lg:col-span-8 space-y-0">
            
            {/* ── Toolbar ── */}
            <div className="bg-white rounded-t-[2.5rem] border border-b-0 border-slate-200 p-4 sticky top-[81px] z-50 backdrop-blur-xl">
              <div className="flex flex-wrap items-center gap-1">
                <div className="relative">
                  <button
                    onClick={() => setHeadingMenuOpen(!headingMenuOpen)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-black transition-all border",
                      currentHeadingLevel
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    )}
                  >
                    <Type size={15} />
                    {currentHeadingLevel ? `H${currentHeadingLevel}` : 'Paragraph'}
                    <ChevronDown size={13} />
                  </button>
                  {headingMenuOpen && (
                    <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 w-56 z-[60] overflow-hidden">
                      <HeadingOption label="Paragraph" active={!currentHeadingLevel} onClick={() => { editor?.chain().focus().setParagraph().run(); setHeadingMenuOpen(false); }} />
                      <HeadingOption label="Heading 1" tag="H1" size="text-2xl" active={editor?.isActive('heading', { level: 1 })} onClick={() => { editor?.chain().focus().toggleHeading({ level: 1 }).run(); setHeadingMenuOpen(false); }} />
                      <HeadingOption label="Heading 2" tag="H2" size="text-xl" active={editor?.isActive('heading', { level: 2 })} onClick={() => { editor?.chain().focus().toggleHeading({ level: 2 }).run(); setHeadingMenuOpen(false); }} />
                      <HeadingOption label="Heading 3" tag="H3" size="text-lg" active={editor?.isActive('heading', { level: 3 })} onClick={() => { editor?.chain().focus().toggleHeading({ level: 3 }).run(); setHeadingMenuOpen(false); }} />
                    </div>
                  )}
                </div>

                <ToolDivider />
                <ToolBtn active={editor?.isActive('bold')} onClick={() => editor?.chain().focus().toggleBold().run()} icon={Bold} tooltip="Bold" />
                <ToolBtn active={editor?.isActive('italic')} onClick={() => editor?.chain().focus().toggleItalic().run()} icon={Italic} tooltip="Italic" />
                <ToolBtn active={editor?.isActive('underline')} onClick={() => editor?.chain().focus().toggleUnderline().run()} icon={Strikethrough} tooltip="Underline" />
                <ToolBtn active={editor?.isActive('highlight')} onClick={() => editor?.chain().focus().toggleHighlight().run()} icon={Highlighter} tooltip="Highlight" />
                <ToolBtn active={editor?.isActive('code')} onClick={() => editor?.chain().focus().toggleCode().run()} icon={Code} tooltip="Inline Code" />
                <ToolDivider />
                <ToolBtn active={editor?.isActive({ textAlign: 'left' })} onClick={() => editor?.chain().focus().setTextAlign('left').run()} icon={AlignLeft} tooltip="Left" />
                <ToolBtn active={editor?.isActive({ textAlign: 'center' })} onClick={() => editor?.chain().focus().setTextAlign('center').run()} icon={AlignCenter} tooltip="Center" />
                <ToolBtn active={editor?.isActive({ textAlign: 'right' })} onClick={() => editor?.chain().focus().setTextAlign('right').run()} icon={AlignRight} tooltip="Right" />
                <ToolDivider />
                <ToolBtn active={editor?.isActive('bulletList')} onClick={() => editor?.chain().focus().toggleBulletList().run()} icon={List} tooltip="Bullet List" />
                <ToolBtn active={editor?.isActive('orderedList')} onClick={() => editor?.chain().focus().toggleOrderedList().run()} icon={ListOrdered} tooltip="Numbered List" />
                <ToolBtn active={editor?.isActive('blockquote')} onClick={() => editor?.chain().focus().toggleBlockquote().run()} icon={Quote} tooltip="Blockquote" />
                <ToolBtn onClick={() => editor?.chain().focus().setHorizontalRule().run()} icon={Minus} tooltip="Divider" />
                <ToolDivider />
                <ToolBtn
                  active={editor?.isActive('link')}
                  onClick={() => {
                    const url = window.prompt('Enter Link URL');
                    if (url) editor?.chain().focus().setLink({ href: url }).run();
                  }}
                  icon={LinkIcon}
                  tooltip="Insert Link"
                />
                <ToolBtn 
                  onClick={() => fileInputRef.current?.click()} 
                  icon={uploading ? Loader2 : ImageIcon} 
                  tooltip="Upload Image" 
                  className={uploading ? 'animate-spin' : ''} 
                />
                <ToolDivider />
                <ToolBtn onClick={() => editor?.chain().focus().insertContent('<div class="bg-indigo-50 border-l-4 border-indigo-500 p-4 my-4"><p class="m-0 font-bold text-indigo-900">Pro Tip</p></div>').run()} icon={Lightbulb} tooltip="Tip" className="text-amber-500" />
                <ToolBtn onClick={() => editor?.chain().focus().insertContent('<div class="bg-rose-50 border-l-4 border-rose-500 p-4 my-4"><p class="m-0 font-bold text-rose-900">Critical Note</p></div>').run()} icon={AlertTriangle} tooltip="Warning" className="text-rose-500" />
                <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleImageUpload} />
              </div>
            </div>

            <div className="bg-white rounded-b-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              <div className="p-12 border-b border-slate-50">
                <input 
                  value={title}
                  onChange={(e) => { setTitle(e.target.value); hasChanges.current = true; }}
                  placeholder="Enter Guide Title..."
                  className="w-full text-5xl font-black text-slate-900 placeholder:text-slate-200 border-none outline-none tracking-tight leading-tight"
                />
                <div className="mt-6 flex items-center gap-4 text-xs font-bold text-slate-400">
                   <div className="flex items-center gap-2">
                     <Globe size={14} className="text-indigo-500" />
                     <span>staffschedule.io/guides/</span>
                     <span className="text-indigo-600">{slug || '...'}</span>
                   </div>
                </div>
              </div>
              <div className="relative min-h-[700px]">
                {editor && (
                   <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className="flex items-center gap-1 px-2 py-1 bg-slate-900 rounded-xl shadow-2xl border border-slate-700">
                      <button onClick={() => editor.chain().focus().toggleBold().run()} className={cn("p-2 rounded-lg text-white", editor.isActive('bold') ? "bg-indigo-600" : "hover:bg-slate-800")}><Bold size={14} /></button>
                      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={cn("p-2 rounded-lg text-white", editor.isActive('italic') ? "bg-indigo-600" : "hover:bg-slate-800")}><Italic size={14} /></button>
                      <button onClick={() => {
                        const url = window.prompt('Enter Link URL');
                        if (url) editor.chain().focus().setLink({ href: url }).run();
                      }} className={cn("p-2 rounded-lg text-white", editor.isActive('link') ? "bg-indigo-600" : "hover:bg-slate-800")}><LinkIcon size={14} /></button>
                   </BubbleMenu>
                )}
                <EditorContent editor={editor} />
              </div>
            </div>
          </div>

          {/* Configuration Panel (Right) */}
          <aside className="lg:col-span-4 space-y-8 sticky top-[100px]">
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-lg overflow-hidden">
              <button onClick={() => setSettingsOpen(!settingsOpen)} className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4 text-slate-900">
                  <LayoutGrid size={20} className="text-indigo-600" />
                  <span className="text-sm font-black uppercase tracking-tight">Classification</span>
                </div>
                {settingsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              
              {settingsOpen && (
                <div className="p-6 pt-0 space-y-6 border-t border-slate-50 pt-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Parent Feature (Category)</label>
                    <select 
                      value={categoryId}
                      onChange={(e) => { setCategoryId(e.target.value); hasChanges.current = true; }}
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold outline-none focus:border-indigo-600"
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cover Image URL</label>
                    <div className="flex gap-2">
                       <input 
                        value={coverImage}
                        onChange={(e) => { setCoverImage(e.target.value); hasChanges.current = true; }}
                        placeholder="https://..."
                        className="flex-1 h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold outline-none"
                      />
                      <input type="file" hidden ref={coverInputRef} accept="image/*" onChange={handleCoverUpload} />
                      <button 
                        onClick={() => coverInputRef.current?.click()}
                        disabled={uploading}
                        className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-colors disabled:opacity-50"
                      >
                        {uploading ? <Loader2 size={18} className="animate-spin" /> : <ImageIcon size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <span className="text-xs font-black text-slate-600 uppercase tracking-tight">Featured Spotlight</span>
                      <button onClick={() => { setIsFeatured(!isFeatured); hasChanges.current = true; }} className={cn("w-12 h-6 rounded-full p-1 transition-all", isFeatured ? "bg-indigo-600" : "bg-slate-200")}>
                        <div className={cn("w-4 h-4 rounded-full bg-white shadow transition-all", isFeatured && "translate-x-6")} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <span className="text-xs font-black text-slate-600 uppercase tracking-tight">Published (Manual)</span>
                      <button onClick={() => { setIsPublished(!isPublished); hasChanges.current = true; }} className={cn("w-12 h-6 rounded-full p-1 transition-all", isPublished ? "bg-emerald-500" : "bg-slate-200")}>
                        <div className={cn("w-4 h-4 rounded-full bg-white shadow transition-all", isPublished && "translate-x-6")} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-lg overflow-hidden">
              <button onClick={() => setSeoOpen(!seoOpen)} className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4 text-slate-900">
                  <Target size={20} className="text-emerald-600" />
                  <span className="text-sm font-black uppercase tracking-tight">SEO Performance</span>
                </div>
                {seoOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {seoOpen && (
                <div className="p-6 pt-0 space-y-6 border-t border-slate-50 pt-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Meta Description (Excerpt)</label>
                    <textarea 
                      value={excerpt}
                      onChange={(e) => { setExcerpt(e.target.value); hasChanges.current = true; }}
                      placeholder="Brief summary for search results..."
                      className="w-full h-24 p-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold outline-none focus:border-indigo-600 resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SEO Title Override</label>
                    <input 
                      value={seoTitle}
                      onChange={(e) => { setSeoTitle(e.target.value); hasChanges.current = true; }}
                      placeholder="Custom browser tab title"
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
