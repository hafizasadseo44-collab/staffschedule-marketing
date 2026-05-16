"use client";

import React, { useState, useEffect, useRef } from "react";

interface LazySectionProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

/**
 * LazySection — A wrapper that only renders its children when it is near the viewport.
 * This significantly improves initial page load speed by deferring the execution
 * and hydration of below-the-fold components.
 */
export const LazySection = ({ 
  children, 
  threshold = 0.01, 
  rootMargin = "200px" 
}: LazySectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={containerRef} className="min-h-[100px] w-full">
      {isVisible ? children : <div className="h-40 w-full" />}
    </div>
  );
};
