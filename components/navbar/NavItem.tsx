"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  title: string;
  href?: string;
  hasDropdown?: boolean;
  active?: boolean;
  onMouseEnter?: () => void;
  className?: string;
}

export const NavItem = ({ 
  title, 
  href, 
  hasDropdown, 
  active, 
  onMouseEnter,
  className 
}: NavItemProps) => {
  const content = (
    <div className="relative group py-2">
      <div className="flex items-center gap-1.5 transition-colors duration-300">
        <span className={cn(
          "text-[13px] font-bold transition-colors tracking-tighter",
          active ? "text-brand-primary" : "text-slate-500 hover:text-brand-dark"
        )}>
          {title}
        </span>
        {hasDropdown && (
          <ChevronDown className={cn(
            "w-3.5 h-3.5 transition-transform duration-500 stroke-[3]",
            active ? "rotate-180 text-brand-primary" : "text-slate-400 group-hover:text-slate-600"
          )} />
        )}
      </div>
      
      {/* Animated Underline */}
      <motion.div
        initial={false}
        animate={active ? { width: "100%", opacity: 1 } : { width: "0%", opacity: 0 }}
        className="absolute bottom-0 left-0 h-[1.5px] bg-brand-primary rounded-full transition-all duration-300"
      />
    </div>
  );

  if (href) {
    return (
      <Link 
        href={href} 
        onMouseEnter={onMouseEnter}
        className={cn("block no-underline outline-none", className)}
      >
        {content}
      </Link>
    );
  }

  return (
    <div 
      onMouseEnter={onMouseEnter}
      className={cn("cursor-pointer select-none", className)}
    >
      {content}
    </div>
  );
};
