"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import Image from "next/image";
import { encode } from "qss";
import React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  quality = 50,
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const getAbsoluteUrl = (url: string) => {
    if (typeof window === "undefined") return url;
    if (url.startsWith("http")) return url;
    return `${window.location.origin}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const absoluteUrl = getAbsoluteUrl(url);

  let src: string;
  if (!isStatic) {
    const params = encode({
      url: absoluteUrl,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 3,
      "viewport.height": height * 3,
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }
  const [isOpen, setOpen] = React.useState(false);
  const [data, setData] = React.useState<{ title?: string; description?: string; image?: string | null } | null>(null);
  const [isLoading, setLoading] = React.useState(true);
  const [isError, setError] = React.useState(false);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  React.useEffect(() => {
    if (isOpen && !data) {
      setLoading(true);
      fetch(`/api/preview?url=${encodeURIComponent(absoluteUrl)}`)
        .then(res => res.json())
        .then(json => {
          setData(json);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }
  }, [isOpen, absoluteUrl, data]);

  const handleMouseMove = (event: any) => {
    const targetRect = event.target.getBoundingClientRect();
    const eventValue = event.clientX - targetRect.left;
    x.set(eventValue - targetRect.width / 2);
  };

  const domain = React.useMemo(() => {
    try {
      return new URL(absoluteUrl).hostname;
    } catch {
      return "";
    }
  }, [absoluteUrl]);

  return (
    <>
      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={100}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <HoverCardPrimitive.Trigger
          onMouseMove={handleMouseMove}
          className={cn("text-black dark:text-white", className)}
          href={url}
        >
          {children}
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Content
          className="[transform-origin:var(--radix-hover-card-content-transform-origin)] z-50"
          side="top"
          align="center"
          sideOffset={10}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                className="shadow-2xl rounded-[28px] bg-white p-1.5 overflow-hidden border border-neutral-200/50 w-[300px]"
                style={{
                  x: translateX,
                }}
              >
                <Link
                  href={url}
                  className="block rounded-[24px] no-underline overflow-hidden"
                >
                  <div className="bg-neutral-50 rounded-[22px] overflow-hidden flex flex-col">
                    {/* Image Area */}
                    <div className="relative aspect-[1.8/1] bg-neutral-200 overflow-hidden">
                      {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                           <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                        </div>
                      ) : (
                        <>
                          {(data?.image || src) ? (
                            <Image
                              src={data?.image || src}
                              fill
                              className="object-cover"
                              alt="preview"
                              unoptimized
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-indigo-50 text-indigo-200">
                               <Globe className="w-12 h-12 opacity-20" />
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="p-4 bg-white flex flex-col gap-1.5">
                       <div className="flex items-center gap-2 mb-1">
                          <img 
                            src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                            className="w-3.5 h-3.5 rounded-sm"
                            alt="favicon"
                          />
                          <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest truncate">
                            {domain}
                          </span>
                       </div>
                       
                       {isLoading ? (
                         <div className="space-y-2">
                            <div className="h-4 bg-neutral-100 rounded w-3/4 animate-pulse" />
                            <div className="h-3 bg-neutral-100 rounded w-full animate-pulse" />
                         </div>
                       ) : (
                         <>
                            <h4 className="text-[13px] font-black text-neutral-800 leading-tight line-clamp-1">
                               {data?.title || "StaffSchedule.io Intelligence"}
                            </h4>
                            <p className="text-[11px] font-medium text-neutral-500 leading-relaxed line-clamp-2">
                               {data?.description || "Empowering the future of workforce management with AI-driven scheduling."}
                            </p>
                         </>
                       )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    </>
  );
};
