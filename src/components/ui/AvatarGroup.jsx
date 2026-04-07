import React from 'react';
import { cn } from '../../lib/utils';

export const AvatarGroup = ({ avatars = [], max = 4, className }) => {
  const visibleAvatars = avatars.slice(0, max);
  const remainder = avatars.length - max;

  return (
    <div className={cn('flex items-center', className)}>
      {visibleAvatars.map((url, i) => (
        <div 
          key={i} 
          className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-100 -ml-2 first:ml-0"
        >
          <img src={url} alt={`Avatar ${i}`} className="w-full h-full object-cover" />
        </div>
      ))}
      {remainder > 0 && (
        <div className="w-8 h-8 rounded-full border-2 border-white bg-primary/10 text-primary flex items-center justify-center text-xs font-bold -ml-2 z-10">
          +{remainder}
        </div>
      )}
    </div>
  );
};
