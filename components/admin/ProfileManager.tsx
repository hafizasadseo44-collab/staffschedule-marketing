"use client";

import React from "react";
import { 
  User as UserIcon, Camera, Check, Loader2, Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

// Social Icons - Custom SVG implementations as lucide-react removed these
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

interface ProfileManagerProps {
  profileForm: any;
  setProfileForm: (v: any) => void;
  saveProfile: () => void;
  profileSaving: boolean;
  handleAvatarUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileManager(props: ProfileManagerProps) {
  const { profileForm, setProfileForm, saveProfile, profileSaving, handleAvatarUpload } = props;

  return (
    <div className="max-w-5xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Identity Management</h2>
        <p className="text-sm text-slate-500 font-medium">Configure your public persona and social authority signals.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-8 md:p-12 space-y-12">
          {/* Main Identity Section */}
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="shrink-0 flex flex-col items-center gap-6">
              <div className="relative group">
                <div className="w-48 h-48 rounded-[3rem] bg-slate-50 dark:bg-white/5 overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl group-hover:scale-[1.02] transition-transform">
                  {profileForm.avatar ? (
                    <img src={profileForm.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-200">
                      <UserIcon size={64} />
                    </div>
                  )}
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-brand-primary/80 opacity-0 group-hover:opacity-100 transition-all cursor-pointer rounded-[3rem]">
                  <div className="flex flex-col items-center gap-2">
                    <Camera size={24} className="text-white" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Update Photo</span>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
                </label>
              </div>
              <p className="max-w-[200px] text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                 High-resolution avatars increase trust scores by up to 40%.
              </p>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProfileInput 
                label="Full Creator Name" 
                value={profileForm.name} 
                onChange={v => setProfileForm({...profileForm, name: v})} 
                placeholder="e.g. Sarah Mitchell"
              />
              <ProfileInput 
                label="Public Handle / Slug" 
                value={profileForm.slug} 
                onChange={v => setProfileForm({...profileForm, slug: v.toLowerCase().replace(/\s+/g, '-')})} 
                placeholder="sarah-mitchell"
              />
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block ml-1">Creator Gender</label>
                <select 
                  value={profileForm.gender}
                  onChange={e => setProfileForm({...profileForm, gender: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300 outline-none appearance-none"
                >
                  <option value="not_specified">Not Specified</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <ProfileInput 
                label="Official Website" 
                value={profileForm.website} 
                onChange={v => setProfileForm({...profileForm, website: v})} 
                placeholder="https://..."
                icon={Globe}
              />
            </div>
          </div>

          {/* Bio Section */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block ml-1">Professional Narrative (Bio)</label>
            <textarea 
              rows={5}
              value={profileForm.bio}
              onChange={e => setProfileForm({...profileForm, bio: e.target.value})}
              placeholder="Tell your readers about your expertise, mission, and background..."
              className="w-full px-6 py-5 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-slate-800 text-sm font-medium leading-relaxed outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>

          {/* Social Signals */}
          <div className="space-y-8">
            <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-[0.2em] flex items-center gap-2">
               Social Authority Signals
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ProfileInput 
                label="Twitter / X" 
                value={profileForm.twitter} 
                onChange={v => setProfileForm({...profileForm, twitter: v})} 
                placeholder="@username"
                icon={TwitterIcon}
              />
              <ProfileInput 
                label="LinkedIn" 
                value={profileForm.linkedin} 
                onChange={v => setProfileForm({...profileForm, linkedin: v})} 
                placeholder="Profile URL"
                icon={LinkedinIcon}
              />
              <ProfileInput 
                label="Facebook" 
                value={profileForm.facebook} 
                onChange={v => setProfileForm({...profileForm, facebook: v})} 
                placeholder="Username/ID"
                icon={FacebookIcon}
              />
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-10 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button 
              onClick={saveProfile}
              disabled={profileSaving}
              className="h-16 px-10 bg-brand-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-primary/90 active:scale-95 transition-all shadow-xl shadow-brand-primary/20 flex items-center gap-3"
            >
              {profileSaving ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
              Persist Profile State
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileInput({ label, value, onChange, placeholder, icon: Icon }: { label: string, value: string, onChange: (v: string) => void, placeholder: string, icon?: any }) {
  return (
    <div className="space-y-4">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block ml-1">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={16} />}
        <input 
          type="text" 
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full py-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-brand-primary transition-all",
            Icon ? "pl-12 pr-5" : "px-5"
          )}
        />
      </div>
    </div>
  );
}
