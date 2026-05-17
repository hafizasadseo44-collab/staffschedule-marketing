"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import DashboardOverview from "@/components/admin/DashboardOverview";
import PostManager from "@/components/admin/PostManager";
import NewsroomManager from "@/components/admin/NewsroomManager";
import GuideManager from "@/components/admin/GuideManager";
import GuideCategoryManager from "@/components/admin/GuideCategoryManager";
import CategoryManager from "@/components/admin/CategoryManager";
import ProfileManager from "@/components/admin/ProfileManager";
import SettingsManager from "@/components/admin/SettingsManager";
import { Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const [posts, setPosts] = useState<any[]>([]);
  const [guides, setGuides] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState("overview");

  // State shared for sub-components (Categories)
  const [newCatName, setNewCatName] = useState("");
  const [newCatColor, setNewCatColor] = useState("#6366f1");
  const [editingCat, setEditingCat] = useState<string | null>(null);
  const [editCatName, setEditCatName] = useState("");
  const [editCatColor, setEditCatColor] = useState("");
  const [catSaving, setCatSaving] = useState(false);

  // State shared for Profile
  const [author, setAuthor] = useState<any>(null);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: "", slug: "", bio: "", avatar: "", gender: "not_specified",
    twitter: "", linkedin: "", facebook: "", website: ""
  });

  const colorPresets = ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f59e0b", "#10b981", "#06b6d4", "#3b82f6", "#64748b", "#0f172a"];

  useEffect(() => {
    fetchData();
    fetchProfile();
  }, []);

  const fetchData = async () => {
    try {
      const [postsRes, catsRes, guidesRes] = await Promise.all([
        fetch("/api/posts", { cache: "no-store" }),
        fetch("/api/categories", { cache: "no-store" }),
        fetch("/api/guides", { cache: "no-store" })
      ]);
      if (postsRes.ok) setPosts(await postsRes.json());
      if (catsRes.ok) setCategories(await catsRes.json());
      if (guidesRes.ok) setGuides(await guidesRes.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/authors");
      if (res.ok) {
        const data = await res.json();
        const profile = Array.isArray(data) ? data[0] : data;
        if (profile) {
          setAuthor(profile);
          setProfileForm({
            name: profile.name || "",
            slug: profile.slug || "",
            bio: profile.bio || "",
            avatar: profile.avatar || "",
            gender: profile.gender || "not_specified",
            twitter: profile.twitter || "",
            linkedin: profile.linkedin || "",
            facebook: profile.facebook || "",
            website: profile.website || ""
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete post?")) return;
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (res.ok) setPosts(posts.filter(p => p.id !== id));
    } catch (e) { console.error(e); }
  };

  const toggleFeatured = async (postId: string, currentFeatured: boolean) => {
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !currentFeatured })
      });
      if (res.ok) fetchData();
    } catch (e) { console.error(e); }
  };

  const addCategory = async () => {
    if (!newCatName.trim()) return;
    setCatSaving(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCatName.trim(), color: newCatColor })
      });
      if (res.ok) {
        setCategories([...categories, await res.json()]);
        setNewCatName("");
      }
    } catch (e) { console.error(e); } finally { setCatSaving(false); }
  };

  const updateCategory = async (id: string) => {
    if (!editCatName.trim()) return;
    setCatSaving(true);
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editCatName.trim(), color: editCatColor })
      });
      if (res.ok) {
        const updated = await res.json();
        setCategories(categories.map(c => c.id === id ? updated : c));
        setEditingCat(null);
      }
    } catch (e) { console.error(e); } finally { setCatSaving(false); }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Delete category?")) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) setCategories(categories.filter(c => c.id !== id));
    } catch (e) { console.error(e); }
  };

  const saveProfile = async () => {
    setProfileSaving(true);
    try {
      const method = author?.id ? "PUT" : "POST";
      const res = await fetch("/api/authors", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(author?.id ? { id: author.id, ...profileForm } : profileForm)
      });
      
      const data = await res.json();
      if (res.ok) {
        fetchProfile();
        alert("Profile Updated Successfully!");
      } else {
        alert("Failed to update profile: " + (data.error || "Unknown server error"));
      }
    } catch (e: any) {
      console.error(e);
      alert("Network or connection error: " + (e.message || "Failed to contact server"));
    } finally {
      setProfileSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const { url } = await res.json();
        setProfileForm(prev => ({ ...prev, avatar: url }));
      }
    } catch (e) { console.error(e); }
  };

  // State for Settings
  const [settings, setSettings] = useState<any>({
    siteName: "StaffSchedule.io",
    siteDescription: "The world's leading AI-driven workforce management and operational intelligence platform.",
    supportEmail: "support@staffschedule.io",
    twitter: "https://twitter.com/staffschedule",
    linkedin: "https://linkedin.com/company/staffschedule",
    facebook: "https://facebook.com/staffschedule",
    github: "https://github.com/staffschedule"
  });
  const [settingsSaving, setSettingsSaving] = useState(false);

  const saveSettings = async (data: any) => {
    setSettingsSaving(true);
    // Mock save delay
    setTimeout(() => {
      setSettings(data);
      setSettingsSaving(false);
      alert("Settings Synced to Edge Nodes");
    }, 1000);
  };

  const updateSettingField = (field: string, value: any) => {
    setSettings((prev: any) => ({ ...prev, [field]: value }));
  };

  const renderView = () => {
    if (loading) return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-brand-primary" />
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">Loading Command Center...</p>
      </div>
    );

    const allItems = [...posts, ...guides].sort((a, b) => 
      new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime()
    );

    const stats = {
      total: posts.length + guides.length,
      published: posts.filter(p => p.published).length + guides.filter(g => g.isPublished).length,
      drafts: posts.filter(p => !p.published).length + guides.filter(g => !g.isPublished).length,
      categories: categories.length
    };

    switch (activeView) {
      case "overview": return <DashboardOverview stats={stats} recentPosts={allItems} />;
      case "posts": return <PostManager posts={posts} categories={categories} onDelete={deletePost} onToggleFeatured={toggleFeatured} />;
      case "newsroom": return <NewsroomManager posts={posts} onDelete={deletePost} />;
      case "guides": return <GuideManager />;
      case "guide-categories": return <GuideCategoryManager />;
      case "categories": return <CategoryManager 
          categories={categories} posts={posts} 
          newCatName={newCatName} setNewCatName={setNewCatName} newCatColor={newCatColor} setNewCatColor={setNewCatColor}
          editingCat={editingCat} setEditingCat={setEditingCat} editCatName={editCatName} setEditCatName={setEditCatName}
          editCatColor={editCatColor} setEditCatColor={setEditCatColor} addCategory={addCategory} updateCategory={updateCategory}
          deleteCategory={deleteCategory} catSaving={catSaving} colorPresets={colorPresets}
        />;
      case "profile": return <ProfileManager 
          profileForm={profileForm} setProfileForm={setProfileForm} 
          saveProfile={saveProfile} profileSaving={profileSaving} handleAvatarUpload={handleAvatarUpload} 
        />;
      case "settings": return <SettingsManager 
          settings={settings} onSave={saveSettings} 
          saving={settingsSaving} onUpdate={updateSettingField} 
        />;
      default: return <DashboardOverview stats={stats} recentPosts={posts} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <AdminSidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar">
        <div className="max-w-[1400px] mx-auto p-8 lg:p-16">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
