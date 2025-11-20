'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onSearch?: (value: string) => void;
  onClear?: () => void;
  debounceMs?: number;
  showClearButton?: boolean;
  variant?: 'default' | 'compact';
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      className,
      onSearch,
      onClear,
      debounceMs = 300,
      showClearButton = true,
      variant = 'default',
      placeholder = 'Search...',
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);

      // Debounced search
      if (onSearch) {
        const timeoutId = setTimeout(() => {
          onSearch(newValue);
        }, debounceMs);

        return () => clearTimeout(timeoutId);
      }
    };

    const handleClear = () => {
      setValue('');
      onClear?.();
      onSearch?.('');
    };

    const variants = {
      default: 'h-12 px-12',
      compact: 'h-10 px-10 text-sm',
    };

    return (
      <div className="relative w-full">
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-subdued">
          <svg
            className={cn(
              'transition-colors',
              isFocused && 'text-white',
              variant === 'compact' ? 'w-4 h-4' : 'w-5 h-5'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input */}
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            'w-full bg-highlight rounded-full text-white placeholder:text-subdued focus:outline-none focus:bg-highlight-elevated transition-all duration-200',
            variants[variant],
            className
          )}
          {...props}
        />

        {/* Clear Button */}
        {showClearButton && value && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-subdued hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <svg
              className={cn(variant === 'compact' ? 'w-4 h-4' : 'w-5 h-5')}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export { SearchBar };
