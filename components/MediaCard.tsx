import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface MediaCardProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  imageAlt?: string;
  type?: 'album' | 'artist' | 'playlist';
  showPlayButton?: boolean;
  onPlayClick?: () => void;
  onClick?: () => void;
  className?: string;
}

const MediaCard = React.forwardRef<HTMLDivElement, MediaCardProps>(
  (
    {
      title,
      subtitle,
      imageUrl,
      imageAlt = title,
      type = 'album',
      showPlayButton = true,
      onPlayClick,
      onClick,
      className,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'group relative bg-tinted p-4 rounded-lg transition-all duration-300 hover:bg-highlight-elevated cursor-pointer',
          className
        )}
        onClick={onClick}
      >
        {/* Image Container */}
        <div className="relative mb-4 aspect-square">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className={cn(
              'object-cover shadow-lg',
              type === 'artist' ? 'rounded-full' : 'rounded-md'
            )}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
          
          {/* Play Button Overlay */}
          {showPlayButton && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPlayClick?.();
              }}
              className="absolute bottom-2 right-2 w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center shadow-xl opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 hover:bg-spotify-green-hover"
              aria-label={`Play ${title}`}
            >
              <svg
                className="w-5 h-5 text-black ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="font-bold text-white truncate-1 hover:underline">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-subdued truncate-2 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    );
  }
);

MediaCard.displayName = 'MediaCard';

export { MediaCard };
