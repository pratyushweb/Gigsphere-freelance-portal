import React from 'react';
import { cn } from '../../lib/utils';

export function Avatar({ src, alt, size = 'default', className, fallback }) {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    default: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-base',
    xl: 'h-24 w-24 text-2xl',
  };

  return (
    <div className={cn('relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 border border-slate-200', sizes[size], className)}>
      {src ? (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <span className="font-medium text-slate-500">{fallback || alt?.charAt(0) || '?'}</span>
      )}
    </div>
  );
}
