/**
 * Skeleton Component
 * Loading skeleton component with different shapes for content placeholders
 */

import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@utils/cn';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'rectangular',
      width,
      height,
      animation = 'pulse',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'bg-gray-800/50';

    const variantStyles = {
      text: 'rounded h-4',
      circular: 'rounded-full',
      rectangular: 'rounded-none',
      rounded: 'rounded-lg',
    };

    const animationStyles = {
      pulse: 'animate-pulse',
      wave: 'animate-wave bg-gradient-to-r from-gray-800/50 via-gray-700/60 to-gray-800/50 bg-[length:200%_100%]',
      none: '',
    };

    const inlineStyles: React.CSSProperties = {
      ...style,
      ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
      ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
    };

    // Default height for circular variant should match width if not specified
    if (variant === 'circular' && width && !height) {
      inlineStyles.height = inlineStyles.width;
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          animationStyles[animation],
          className
        )}
        style={inlineStyles}
        aria-busy="true"
        aria-live="polite"
        aria-label="Loading"
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

// Compound components for common skeleton patterns
export interface SkeletonTextProps extends HTMLAttributes<HTMLDivElement> {
  lines?: number;
  spacing?: string;
}

export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ lines = 3, spacing = 'gap-2', className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex flex-col', spacing, className)} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            width={index === lines - 1 ? '80%' : '100%'}
          />
        ))}
      </div>
    );
  }
);

SkeletonText.displayName = 'SkeletonText';

export interface SkeletonAvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export const SkeletonAvatar = forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ size = 40, className, ...props }, ref) => {
    return (
      <Skeleton
        ref={ref}
        variant="circular"
        width={size}
        height={size}
        className={className}
        {...props}
      />
    );
  }
);

SkeletonAvatar.displayName = 'SkeletonAvatar';
