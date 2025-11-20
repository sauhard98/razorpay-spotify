import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant = 'rectangular',
      width,
      height,
      style,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'shimmer bg-highlight rounded';

    const variants = {
      text: 'h-4 w-full',
      circular: 'rounded-full',
      rectangular: '',
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        style={{
          width: width,
          height: height,
          ...style,
        }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

// Pre-built skeleton components for common patterns
const SkeletonMediaCard = () => (
  <div className="bg-tinted p-4 rounded-lg space-y-3">
    <Skeleton className="aspect-square w-full" />
    <Skeleton variant="text" className="h-4 w-3/4" />
    <Skeleton variant="text" className="h-3 w-1/2" />
  </div>
);

const SkeletonTrackRow = () => (
  <div className="flex items-center gap-4 px-4 py-2">
    <Skeleton variant="circular" width={40} height={40} />
    <div className="flex-1 space-y-2">
      <Skeleton variant="text" className="h-4 w-48" />
      <Skeleton variant="text" className="h-3 w-32" />
    </div>
    <Skeleton variant="text" className="h-4 w-12" />
  </div>
);

const SkeletonPlaylist = () => (
  <div className="space-y-6">
    <div className="flex gap-6">
      <Skeleton className="w-60 h-60" />
      <div className="flex-1 space-y-4">
        <Skeleton variant="text" className="h-8 w-64" />
        <Skeleton variant="text" className="h-4 w-96" />
        <Skeleton variant="text" className="h-4 w-48" />
      </div>
    </div>
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonTrackRow key={i} />
      ))}
    </div>
  </div>
);

export { Skeleton, SkeletonMediaCard, SkeletonTrackRow, SkeletonPlaylist };
