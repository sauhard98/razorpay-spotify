import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'search';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = 'default',
      type = 'text',
      leftIcon,
      rightIcon,
      error,
      label,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    const baseStyles =
      'w-full bg-base border-2 border-transparent text-white placeholder:text-subtle focus:outline-none focus:border-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50';

    const variants = {
      default: 'rounded px-4 py-3.5',
      search: 'rounded-full bg-highlight px-12 placeholder:text-subdued',
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-white mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-subdued">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            className={cn(
              baseStyles,
              variants[variant],
              leftIcon && 'pl-12',
              rightIcon && 'pr-12',
              error && 'border-essential-negative focus:border-essential-negative',
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-subdued">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-2 text-sm text-essential-negative">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
