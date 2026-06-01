"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: any) => string;
      remove: (id: string) => void;
      reset: (id?: string) => void;
    };
    onTurnstileReady?: () => void;
  }
}

interface TurnstileProps {
  siteKey: string;
  onToken: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact" | "flexible";
}

/**
 * Minimal Cloudflare Turnstile widget wrapper. We inject the official script
 * once at mount and call `turnstile.render` on the container. The token is
 * passed back via `onToken`; the parent stores it and sends with the form
 * submission.
 *
 * If the env site key isn't configured, the parent should not render this
 * component at all (we don't gracefully no-op here because that would hide
 * a real misconfiguration).
 */
export default function Turnstile({
  siteKey,
  onToken,
  onError,
  onExpire,
  theme = "auto",
  size = "flexible",
}: TurnstileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    const SCRIPT_ID = "cf-turnstile-script";
    let cancelled = false;

    const mount = () => {
      if (cancelled || !ref.current || !window.turnstile) return;
      // Don't double-mount
      if (widgetId.current) return;
      widgetId.current = window.turnstile.render(ref.current, {
        sitekey: siteKey,
        callback: (token: string) => onToken(token),
        "error-callback": () => onError?.(),
        "expired-callback": () => onExpire?.(),
        theme,
        size,
      });
    };

    if (window.turnstile) {
      mount();
    } else if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.onload = mount;
      document.head.appendChild(script);
    } else {
      // Script tag exists but turnstile object not ready yet — poll briefly
      const t = setInterval(() => {
        if (window.turnstile) {
          clearInterval(t);
          mount();
        }
      }, 100);
      setTimeout(() => clearInterval(t), 8000);
    }

    return () => {
      cancelled = true;
      try {
        if (widgetId.current && window.turnstile) {
          window.turnstile.remove(widgetId.current);
          widgetId.current = null;
        }
      } catch {}
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey]);

  return <div ref={ref} className="cf-turnstile" />;
}
