/**
 * EmptyState Component
 * Empty state display with icon, title, description, and optional action
 */

import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '@utils/cn';

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      icon,
      title,
      description,
      action,
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: {
        container: 'py-8 px-4',
        icon: 'w-12 h-12 mb-3',
        title: 'text-lg',
        description: 'text-sm',
      },
      md: {
        container: 'py-12 px-6',
        icon: 'w-16 h-16 mb-4',
        title: 'text-xl',
        description: 'text-base',
      },
      lg: {
        container: 'py-16 px-8',
        icon: 'w-20 h-20 mb-5',
        title: 'text-2xl',
        description: 'text-lg',
      },
    };

    const styles = sizeStyles[size];

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center text-center',
          styles.container,
          className
        )}
        role="status"
        aria-live="polite"
        {...props}
      >
        {icon && (
          <div
            className={cn(
              'flex items-center justify-center text-gray-400 drop-shadow-[0_0_8px_rgba(156,163,175,0.3)]',
              styles.icon
            )}
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
        <h3
          className={cn(
            'font-semibold text-white mb-2',
            styles.title
          )}
        >
          {title}
        </h3>
        {description && (
          <p
            className={cn(
              'text-gray-400 max-w-md mb-6',
              styles.description
            )}
          >
            {description}
          </p>
        )}
        {action && <div className="mt-2">{action}</div>}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
