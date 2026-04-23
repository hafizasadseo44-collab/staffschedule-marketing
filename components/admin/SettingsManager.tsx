"use client";

import React from "react";
import { 
  Settings, Globe, Shield, Bell, 
  Save, Loader2, Mail, ExternalLink
} from "lucide-react";

// Social Icons - Custom SVG implementations as lucide-react removed these
const Github = ({ className }: { className?: string }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

interface SettingsManagerProps {
  settings: any;
  onSave: (data: any) => void;
  saving: boolean;
  onUpdate: (field: string, value: any) => void;
}

export default function SettingsManager({ settings, onSave, saving, onUpdate }: SettingsManagerProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">System Configuration</h2>
          <p className="text-sm text-slate-500 font-medium">Control site-wide parameters, SEO defaults, and integration tokens.</p>
        </div>
        <button 
          onClick={() => onSave(settings)}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-4 bg-brand-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/20 disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Commit Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* General Settings */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-2">
              <Globe size={14} className="text-brand-primary" /> Core Identity
            </h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 block">Platform Name</label>
                  <input
                    type="text"
                    value={settings?.siteName || ""}
                    onChange={e => onUpdate("siteName", e.target.value)}
                    className="w-full h-14 px-5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
                    placeholder="StaffSchedule.io"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 block">Public Support Email</label>
                  <input
                    type="email"
                    value={settings?.supportEmail || ""}
                    onChange={e => onUpdate("supportEmail", e.target.value)}
                    className="w-full h-14 px-5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
                    placeholder="support@staffschedule.io"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 block">Global SEO Description</label>
                <textarea
                  rows={4}
                  value={settings?.siteDescription || ""}
                  onChange={e => onUpdate("siteDescription", e.target.value)}
                  className="w-full p-5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all resize-none"
                  placeholder="The world's leading AI scheduling platform..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-2">
              <Shield size={14} className="text-brand-primary" /> Social Connectivity
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SocialInput icon={Twitter} label="Twitter / X" value={settings?.twitter || ""} onChange={v => onUpdate("twitter", v)} />
              <SocialInput icon={Linkedin} label="LinkedIn" value={settings?.linkedin || ""} onChange={v => onUpdate("linkedin", v)} />
              <SocialInput icon={Facebook} label="Facebook" value={settings?.facebook || ""} onChange={v => onUpdate("facebook", v)} />
              <SocialInput icon={Github} label="GitHub" value={settings?.github || ""} onChange={v => onUpdate("github", v)} />
            </div>
          </div>
        </div>

        {/* Info Sidebar */}
        <aside className="space-y-6">
          <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] -mr-16 -mt-16" />
            <Bell size={32} className="text-white/40 mb-6" />
            <h4 className="text-xl font-black mb-2 tracking-tight">System Status</h4>
            <p className="text-xs text-white/60 leading-relaxed mb-8">All nodes are operational. Your content is currently being distributed to global CDN edge locations.</p>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest">v2.4.0 Final Stable</span>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white border border-slate-800">
             <h4 className="text-sm font-black mb-4 uppercase tracking-[0.2em] text-slate-500">Security Notice</h4>
             <p className="text-xs text-slate-400 leading-relaxed">Changes made here affect the public-facing metadata and global configuration. Use caution when updating SEO descriptions.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SocialInput({ icon: Icon, label, value, onChange }: { icon: any, label: string, value: string, onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 block flex items-center gap-2">
        <Icon className="text-slate-400" /> {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full h-12 px-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-slate-800 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
        placeholder="https://..."
      />
    </div>
  );
}
