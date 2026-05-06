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
  const [isLoading, setLoading] = React.useState(true);
  const [isError, setError] = React.useState(false);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

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
      {isMounted ? (
        <div className="hidden">
          <Image
            src={src}
            width={width}
            height={height}
            quality={quality}
            priority={true}
            alt="hidden image"
            unoptimized
          />
        </div>
      ) : null}

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
                className="shadow-2xl rounded-[24px] bg-white p-1 overflow-hidden border border-neutral-200"
                style={{
                  x: translateX,
                }}
              >
                <Link
                  href={url}
                  className="block p-1 rounded-[22px] no-underline"
                  style={{ fontSize: 0 }}
                >
                  <div className="bg-neutral-50 rounded-[20px] overflow-hidden">
                    {/* Header Info */}
                    <div className="px-4 py-2 border-b border-neutral-200/50 flex items-center gap-2 bg-white">
                      <img 
                        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                        className="w-4 h-4 rounded-sm"
                        alt="favicon"
                      />
                      <span className="text-[10px] font-bold text-neutral-500 truncate max-w-[150px]">
                        {domain}
                      </span>
                    </div>

                    <div 
                      className="relative bg-neutral-100"
                      style={{ width, height }}
                    >
                      {isLoading && !isError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-neutral-50 animate-pulse">
                           <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                        </div>
                      )}
                      
                      {isError && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-50 p-4 text-center">
                           <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                             Preview Not Available
                           </span>
                        </div>
                      )}

                      <Image
                        src={src}
                        width={width}
                        height={height}
                        quality={quality}
                        priority={true}
                        className={cn(
                          "rounded-b-lg transition-opacity duration-300",
                          isLoading ? "opacity-0" : "opacity-100"
                        )}
                        alt="preview image"
                        unoptimized
                        onLoad={() => setLoading(false)}
                        onError={() => setError(true)}
                      />
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
