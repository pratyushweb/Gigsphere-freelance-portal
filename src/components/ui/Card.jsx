import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const Card = React.forwardRef(({ className, children, hover = false, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={cn(
        'bg-card rounded-2xl border border-border shadow-soft overflow-hidden',
        hover && 'hover:shadow-float cursor-pointer transition-shadow duration-300',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
});
Card.displayName = 'Card';

const CardHeader = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
);

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn('text-xl font-semibold leading-none tracking-tight', className)} {...props} />
));
CardTitle.displayName = 'CardTitle';

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
