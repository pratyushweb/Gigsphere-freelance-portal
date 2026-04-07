import React from 'react';
import { cn } from '../../lib/utils';

export function Badge({ className, variant = 'default', children, ...props }) {
  const variants = {
    default: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    success: 'bg-accent/10 text-accent font-semibold',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    outline: 'border border-border text-slate-600',
    ai: 'bg-gradient-to-r from-purple-500/10 to-indigo-500/10 text-indigo-700 border border-indigo-200/50 shadow-[0_0_10px_rgba(79,70,229,0.1)]',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
