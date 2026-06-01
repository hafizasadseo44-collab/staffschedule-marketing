"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard, FileText, Newspaper,
  Tag, User, Globe, LogOut, ChevronRight,
  Sparkles, Settings, BarChart3, BookOpen,
  LayoutGrid, Shield, Mail, Users, Send,
  FileBox, LineChart, MessageCircle
} from "lucide-react";

import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  disabled?: boolean;
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
}

export default function AdminSidebar({ activeView, onViewChange }: AdminSidebarProps) {
  const menuGroups: MenuGroup[] = [
    {
      label: "Main",
      items: [
        { id: "overview", label: "Dashboard", icon: LayoutDashboard },
        { id: "posts", label: "Editorial Posts", icon: FileText },
        { id: "newsroom", label: "Newsroom", icon: Newspaper },
        { id: "guides", label: "Guides & Resources", icon: BookOpen },
      ]
    },
    {
      label: "Marketing",
      items: [
        { id: "marketing", label: "Overview", icon: BarChart3 },
        { id: "subscribers", label: "Subscribers", icon: Users },
        { id: "campaigns", label: "Campaigns", icon: Send },
        { id: "templates", label: "Templates", icon: FileBox },
        { id: "analytics", label: "Email Analytics", icon: LineChart },
      ]
    },
    {
      label: "Engagement",
      items: [
        { id: "comments", label: "Comments", icon: MessageCircle },
      ]
    },
    {
      label: "Organization",
      items: [
        { id: "categories", label: "Blog Categories", icon: Tag },
        { id: "guide-categories", label: "Resource Categories", icon: LayoutGrid },
        { id: "profile", label: "Author Profile", icon: User },
      ]
    },
    {
      label: "System",
      items: [
        { id: "settings", label: "Settings", icon: Settings, disabled: false },
      ]
    }

  ];

  return (
    <aside className="w-72 h-screen sticky top-0 hidden lg:flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50">
      {/* Branding */}
      <div className="p-8">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
            <Sparkles size={20} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black text-slate-900 dark:text-white tracking-tighter leading-none">Command</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Center</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-8 overflow-y-auto custom-scrollbar">
        {menuGroups.map((group) => (
          <div key={group.label} className="space-y-2">
            <h4 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              {group.label}
            </h4>
            <div className="space-y-1">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => !item.disabled && onViewChange(item.id)}
                  disabled={item.disabled}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all group",
                    activeView === item.id 
                      ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5",
                    item.disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className={cn(
                      "transition-colors",
                      activeView === item.id ? "text-white" : "text-slate-400 group-hover:text-brand-primary"
                    )} />
                    <span className="text-sm font-bold tracking-tight">{item.label}</span>
                  </div>
                  {activeView === item.id && <ChevronRight size={14} className="text-white/60" />}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-6 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <Link 
          href="/" 
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all no-underline"
        >
          <Globe size={18} />
          View Site
        </Link>
        <Link 
          href="/" 
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all no-underline"
        >
          <LogOut size={18} />
          Sign Out
        </Link>
      </div>
    </aside>
  );
}
