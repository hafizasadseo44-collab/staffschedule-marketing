"use client";

import { usePathname } from "next/navigation";
import { PenTool } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isEditor = pathname.includes("/editor/");

  // Editor pages get their own minimal layout (no sidebar)
  if (isEditor) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
        {children}
      </div>
    );
  }

  // Dashboard pages use the new sidebar-driven architecture 
  // (Sidebar is rendered inside the main AdminDashboard component to handle state)
  return (
    <div className="min-h-screen bg-[#FAFBFE] dark:bg-slate-950 font-sans">
      {children}
    </div>
  );
}
