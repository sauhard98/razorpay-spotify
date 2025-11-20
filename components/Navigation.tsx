import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem = React.forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ icon, label, href, active = false, onClick }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        onClick={onClick}
        className={cn(
          'flex items-center gap-4 px-4 py-2 rounded text-subdued hover:text-white hover:bg-elevated-base transition-all duration-200 cursor-pointer group',
          active && 'bg-highlight text-white'
        )}
      >
        <span className="flex-shrink-0 w-6 h-6 transition-colors">
          {icon}
        </span>
        <span className="font-bold text-sm truncate">{label}</span>
      </Link>
    );
  }
);

NavItem.displayName = 'NavItem';

export interface SidebarProps {
  children: React.ReactNode;
  collapsed?: boolean;
  className?: string;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ children, collapsed = false, className }, ref) => {
    return (
      <aside
        ref={ref}
        className={cn(
          'h-full bg-black overflow-y-auto transition-all duration-300',
          collapsed ? 'w-[72px]' : 'w-[280px]',
          className
        )}
      >
        <div className="p-6 space-y-2">{children}</div>
      </aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';

export interface TopBarProps {
  children: React.ReactNode;
  className?: string;
}

const TopBar = React.forwardRef<HTMLDivElement, TopBarProps>(
  ({ children, className }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          'h-16 sticky top-0 backdrop-blur-md bg-black/50 px-8 flex items-center justify-between z-sticky',
          className
        )}
      >
        {children}
      </header>
    );
  }
);

TopBar.displayName = 'TopBar';

export interface NavSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const NavSection = React.forwardRef<HTMLDivElement, NavSectionProps>(
  ({ title, children, className }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)}>
        {title && (
          <h2 className="px-4 text-xs font-bold text-subdued uppercase tracking-wider mb-2">
            {title}
          </h2>
        )}
        {children}
      </div>
    );
  }
);

NavSection.displayName = 'NavSection';

export { NavItem, Sidebar, TopBar, NavSection };
