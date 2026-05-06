import React from 'react';
import { cn } from '@/lib/utils';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'bg-white relative w-full rounded-2xl dark:bg-transparent',
        'p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl',
        'dark:border-border/80 border border-slate-100 dark:border-slate-800',
        'flex flex-col h-full',
        className,
      )}
      {...props}
    />
  );
}

function Header({
  className,
  children,
  glassEffect = true,
  ...props
}: React.ComponentProps<'div'> & {
  glassEffect?: boolean;
}) {
  return (
    <div
      className={cn(
        'bg-slate-50 dark:bg-slate-900/50 relative mb-4 rounded-xl border border-slate-100 dark:border-slate-800 p-6',
        className,
      )}
      {...props}
    >
      {/* Top glass gradient */}
      {glassEffect && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-48 rounded-[inherit]"
          style={{
            background:
              'linear-gradient(180deg, rgba(108,92,231,0.07) 0%, rgba(108,92,231,0.03) 40%, rgba(0,0,0,0) 100%)',
          }}
        />
      )}
      {children}
    </div>
  );
}

function Plan({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('mb-8 flex items-center justify-between', className)}
      {...props}
    />
  );
}

function Description({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p className={cn('text-slate-500 dark:text-slate-400 text-sm font-medium mb-4', className)} {...props} />
  );
}

function PlanName({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        "text-slate-700 dark:text-slate-300 flex items-center gap-2 text-sm font-bold [&_svg:not([class*='size-'])]:size-5",
        className,
      )}
      {...props}
    />
  );
}

function Badge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'border-[#6C5CE7]/30 text-[#6C5CE7] bg-[#6C5CE7]/10 rounded-full border px-3 py-0.5 text-xs font-bold tracking-wide',
        className,
      )}
      {...props}
    />
  );
}

function Price({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('mb-6 flex items-end gap-1', className)} {...props} />
  );
}

function MainPrice({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn('text-5xl font-black tracking-tight text-slate-900 dark:text-white', className)}
      {...props}
    />
  );
}

function Period({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn('text-slate-500 dark:text-slate-400 pb-1.5 text-sm font-bold', className)}
      {...props}
    />
  );
}

function OriginalPrice({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'text-slate-400 dark:text-slate-500 mr-1 ml-auto text-lg line-through font-semibold',
        className,
      )}
      {...props}
    />
  );
}

function Body({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('space-y-6 p-4 flex-1 flex flex-col', className)} {...props} />;
}

function List({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul className={cn('space-y-4 flex-1', className)} {...props} />;
}

function ListItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      className={cn(
        'text-slate-600 dark:text-slate-400 flex items-start gap-3 text-sm font-medium',
        className,
      )}
      {...props}
    />
  );
}

function Separator({
  children = 'Upgrade to access',
  className,
  ...props
}: React.ComponentProps<'div'> & {
  children?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'text-slate-400 flex items-center gap-3 text-sm',
        className,
      )}
      {...props}
    >
      <span className="bg-slate-200 dark:bg-slate-800 h-[1px] flex-1" />
      <span className="text-slate-400 shrink-0 font-medium">{children}</span>
      <span className="bg-slate-200 dark:bg-slate-800 h-[1px] flex-1" />
    </div>
  );
}

export {
  Card,
  Header,
  Description,
  Plan,
  PlanName,
  Badge,
  Price,
  MainPrice,
  Period,
  OriginalPrice,
  Body,
  List,
  ListItem,
  Separator,
};
