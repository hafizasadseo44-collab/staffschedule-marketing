import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import PreferencesClient from "@/components/newsletter/PreferencesClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Email Preferences · StaffSchedule.io",
  description: "Choose which emails you want to receive from StaffSchedule.io",
  robots: { index: false, follow: false },
};

export default function PreferencesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-white flex items-center justify-center p-6 py-16">
      <Suspense
        fallback={
          <div className="flex items-center justify-center gap-3 text-slate-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading preferences...
          </div>
        }
      >
        <PreferencesClient />
      </Suspense>
    </main>
  );
}
