import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'premium' | 'explicit' | 'default' | 'new' | 'pill';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-bold transition-colors';

    const variants = {
      premium:
        'bg-gradient-to-r from-spotify-green to-spotify-green-hover text-black rounded',
      explicit: 'bg-subdued text-black rounded-sm',
      default: 'bg-highlight text-white rounded',
      new: 'bg-accent-blue text-white rounded',
      pill: 'bg-highlight text-white rounded-full',
    };

    const sizes = {
      sm: 'px-1.5 py-0.5 text-[9px]',
      md: 'px-2 py-1 text-xs',
      lg: 'px-3 py-1.5 text-sm',
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
