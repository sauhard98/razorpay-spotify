'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TopNav() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    if (path === '/live') {
      return pathname?.startsWith('/live');
    }
    return pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-highlight">
      <div className="max-w-[1955px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-spotify-green rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </div>
            <span className="hidden sm:inline text-white font-bold text-base">Spotify</span>
          </Link>

          {/* Center Pills */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium transition-colors',
                isActive('/') && !isActive('/live')
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-white/10'
              )}
            >
              All
            </Link>
            <Link
              href="/"
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium transition-colors text-white hover:bg-white/10'
              )}
            >
              Music
            </Link>
            <Link
              href="/"
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium transition-colors text-white hover:bg-white/10'
              )}
            >
              Podcasts
            </Link>
            <Link
              href="/live"
              className={cn(
                'relative px-3 py-1 rounded-full text-xs font-medium transition-all',
                isActive('/live')
                  ? 'bg-spotify-green text-black'
                  : 'text-white hover:bg-white/10'
              )}
            >
              Live
              {!isActive('/live') && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-spotify-green rounded-full animate-pulse" />
              )}
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-white hover:bg-white/10 rounded-full transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <button className="p-1 text-white hover:bg-white/10 rounded-full transition-colors">
              <div className="w-6 h-6 bg-subdued rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
