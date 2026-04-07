import React from 'react';
import { cn } from '../../lib/utils';

const Input = React.forwardRef(({ className, type, icon: Icon, error, ...props }, ref) => {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
          <Icon size={18} />
        </div>
      )}
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-xl border border-border bg-white px-3 py-2 text-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50',
          Icon && 'pl-10',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/10',
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export { Input };
