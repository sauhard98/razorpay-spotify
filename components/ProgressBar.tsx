import React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressBarProps {
  value: number;
  max?: number;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'green' | 'gradient';
  className?: string;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value,
      max = 100,
      showValue = false,
      size = 'md',
      variant = 'default',
      className,
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizes = {
      sm: 'h-1',
      md: 'h-1',
      lg: 'h-2',
    };

    const variants = {
      default: 'bg-white',
      green: 'bg-spotify-green',
      gradient: 'bg-gradient-to-r from-spotify-green to-spotify-green-hover',
    };

    return (
      <div ref={ref} className={cn('w-full', className)}>
        <div
          className={cn(
            'relative w-full bg-subdued rounded-full overflow-hidden group cursor-pointer',
            sizes[size]
          )}
        >
          <div
            className={cn(
              'h-full rounded-full transition-all duration-200 ease-out group-hover:bg-spotify-green',
              variants[variant]
            )}
            style={{ width: `${percentage}%` }}
          />
          <div
            className="absolute w-3 h-3 bg-white rounded-full -translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              left: `${percentage}%`,
              transform: 'translate(-50%, -25%)',
            }}
          />
        </div>
        {showValue && (
          <div className="mt-2 text-xs text-subdued text-center">
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export { ProgressBar };
