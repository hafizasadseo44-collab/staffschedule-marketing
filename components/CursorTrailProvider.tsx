"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

// Lazy-load the trail so it doesn't affect initial page load performance
const GlobalCursorTrail = dynamic(() => import("@/components/GlobalCursorTrail"), {
  ssr: false,
});

export default function CursorTrailProvider() {
  const pathname = usePathname();

  // Disable on admin pages for cleaner dashboard UX
  if (pathname?.startsWith("/admin")) return null;

  return <GlobalCursorTrail />;
}
