"use client";

import React, { useRef, useState, useEffect } from 'react';

interface ScaleWrapperProps {
  children: React.ReactNode;
  targetWidth?: number;
  targetHeight?: number;
}

export default function ScaleWrapper({ children, targetWidth = 1024, targetHeight = 700 }: ScaleWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        // Never scale up beyond 1.0 (keep original size on large screens if desired)
        // Or we can let it scale up. Usually we just want it to fill the width.
        const newScale = width / targetWidth;
        setScale(newScale);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [targetWidth]);

  return (
    <div 
      ref={containerRef} 
      className="w-full relative overflow-hidden"
      style={{ 
        height: isMounted ? targetHeight * scale : targetHeight // fallback before react mount
      }}
    >
      <div 
        className="absolute top-0 left-0 origin-top-left"
        style={{ 
          width: targetWidth, 
          height: targetHeight, 
          transform: `scale(${scale})`,
          opacity: isMounted ? 1 : 0,
          transition: "opacity 0.2s ease-in"
        }}
      >
        {children}
      </div>
    </div>
  );
}
