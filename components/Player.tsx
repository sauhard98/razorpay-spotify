'use client';
import React, { useState } from 'react';
import { cn, formatTime } from '@/lib/utils';

export interface PlayerProps {
  trackTitle?: string;
  artistName?: string;
  albumArt?: string;
  isPlaying?: boolean;
  currentTime?: number;
  duration?: number;
  volume?: number;
  onPlayPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onSeek?: (time: number) => void;
  onVolumeChange?: (volume: number) => void;
  onShuffle?: () => void;
  onRepeat?: () => void;
  shuffle?: boolean;
  repeat?: 'off' | 'all' | 'one';
  className?: string;
}

const Player = React.forwardRef<HTMLDivElement, PlayerProps>(
  (
    {
      trackTitle = 'No track playing',
      artistName = '',
      albumArt = '/placeholder-album.jpg',
      isPlaying = false,
      currentTime = 0,
      duration = 0,
      volume = 70,
      onPlayPause,
      onNext,
      onPrevious,
      onSeek,
      onVolumeChange,
      onShuffle,
      onRepeat,
      shuffle = false,
      repeat = 'off',
      className,
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = useState(false);

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
      <div
        ref={ref}
        className={cn(
          'h-24 bg-elevated-base border-t border-highlight px-4 flex items-center justify-between gap-4',
          className
        )}
      >
        {/* Left - Track Info */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="w-14 h-14 bg-highlight rounded flex-shrink-0">
            {albumArt && (
              <img src={albumArt} alt={trackTitle} className="w-full h-full object-cover rounded" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-white truncate">{trackTitle}</h4>
            {artistName && <p className="text-xs text-subdued truncate">{artistName}</p>}
          </div>
          <button className="text-subdued hover:text-white transition-colors">
            <HeartIcon />
          </button>
        </div>

        {/* Center - Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-2xl">
          <div className="flex items-center gap-4">
            <button
              onClick={onShuffle}
              className={cn(
                'text-subdued hover:text-white transition-colors',
                shuffle && 'text-spotify-green'
              )}
            >
              <ShuffleIcon />
            </button>
            <button onClick={onPrevious} className="text-subdued hover:text-white transition-colors">
              <PreviousIcon />
            </button>
            <button
              onClick={onPlayPause}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button onClick={onNext} className="text-subdued hover:text-white transition-colors">
              <NextIcon />
            </button>
            <button
              onClick={onRepeat}
              className={cn(
                'text-subdued hover:text-white transition-colors',
                repeat !== 'off' && 'text-spotify-green'
              )}
            >
              <RepeatIcon />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full flex items-center gap-2">
            <span className="text-xs text-subdued min-w-[40px] text-right">
              {formatTime(currentTime * 1000)}
            </span>
            <div className="flex-1 h-1 bg-subdued rounded-full group cursor-pointer relative">
              <div
                className="h-full bg-white rounded-full relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute right-0 top-1/2 w-3 h-3 bg-white rounded-full -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <span className="text-xs text-subdued min-w-[40px]">
              {formatTime(duration * 1000)}
            </span>
          </div>
        </div>

        {/* Right - Volume */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <button className="text-subdued hover:text-white transition-colors">
            <QueueIcon />
          </button>
          <button className="text-subdued hover:text-white transition-colors">
            <VolumeIcon />
          </button>
          <div className="w-24 h-1 bg-subdued rounded-full group cursor-pointer relative">
            <div
              className="h-full bg-white rounded-full relative"
              style={{ width: `${volume}%` }}
            >
              <div className="absolute right-0 top-1/2 w-3 h-3 bg-white rounded-full -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Player.displayName = 'Player';

// Icon Components
const PlayIcon = () => (
  <svg className="w-4 h-4 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
  </svg>
);

const NextIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 18l-8-6 8-6v12zm2-12v12h2V6h-2z" />
  </svg>
);

const PreviousIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 6v12l8-6-8-6zM6 6h2v12H6V6z" />
  </svg>
);

const ShuffleIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
  </svg>
);

const RepeatIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const QueueIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
  </svg>
);

const VolumeIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
  </svg>
);

export { Player };
