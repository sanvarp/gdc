/**
 * Card Component - ADVANCED 3D EDITION
 * A premium card container with stunning visual effects including:
 * - 3D tilt effect with parallax
 * - Glassmorphism with backdrop blur
 * - Animated gradient borders
 * - Glow effects and shadows
 * - Neumorphism variant
 * - Smooth entrance animations
 * - Premium shine/reflection effects
 */

import { type HTMLAttributes, forwardRef, useRef, useState, useEffect, MouseEvent } from 'react';
import { cn } from '@utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  depth?: 'flat' | 'elevated' | 'floating';
  hover?: boolean;
  hover3d?: boolean;
  glass?: boolean;
  glow?: boolean;
  innerGlow?: boolean;
  neu?: boolean;
  shine?: boolean;
  gradientBorder?: boolean;
  animation?: 'none' | 'fade-up' | 'fade-in' | 'scale' | 'morph' | 'floating';
  hoverLift?: boolean;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

interface TiltState {
  rotateX: number;
  rotateY: number;
  scale: number;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      padding = 'md',
      depth = 'elevated',
      hover = false,
      hover3d = false,
      glass = false,
      glow = false,
      innerGlow = false,
      neu = false,
      shine = false,
      gradientBorder = false,
      animation = 'fade-up',
      hoverLift = true,
      className,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0, scale: 1 });
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // 3D Tilt Effect Handler
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
      if (!hover3d || !cardRef.current) return;

      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Calculate rotation values (max 15 degrees)
      const rotateY = (mouseX / (rect.width / 2)) * 15;
      const rotateX = -(mouseY / (rect.height / 2)) * 15;

      // Store mouse position for shine effect
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });

      setTilt({
        rotateX,
        rotateY,
        scale: 1.02,
      });

      // Call parent onMouseMove if provided
      onMouseMove?.(e);
    };

    const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
      setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
      setIsHovered(false);

      // Call parent onMouseLeave if provided
      onMouseLeave?.(e);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    // Depth Variants
    const depthStyles = {
      flat: 'shadow-sm',
      elevated: 'shadow-elevated',
      floating: 'shadow-floating',
    };

    // Glassmorphism Styles
    const glassStyles = glass
      ? 'bg-white/10 backdrop-blur-2xl border-white/20 shadow-glass'
      : '';

    // Neumorphism Styles
    const neuStyles = neu
      ? 'bg-gradient-to-br from-gray-100 to-gray-200 shadow-neu border-none'
      : '';

    // Base Styles
    const baseStyles = cn(
      'rounded-2xl border transition-all duration-700 ease-out',
      'relative overflow-hidden group',
      !glass && !neu && 'bg-white border-border',
      glassStyles,
      neuStyles,
      depthStyles[depth]
    );

    // Padding Styles
    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    // Animation Styles
    const animationStyles = {
      none: '',
      'fade-up': 'animate-fade-up',
      'fade-in': 'animate-fade-in',
      scale: 'animate-scale-in',
      morph: 'animate-morph',
      floating: 'animate-floating',
    };

    // Hover Styles
    const hoverStyles = cn(
      hover && !hover3d && hoverLift && 'hover:shadow-elevated hover:-translate-y-2',
      hover && glow && 'hover:shadow-glow-lg',
      hover && 'hover:scale-[1.02]'
    );

    // 3D Transform Style
    const transform3dStyle = hover3d
      ? {
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
          transition: 'transform 0.2s ease-out',
        }
      : {};

    return (
      <div
        ref={(node) => {
          (cardRef as any).current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn(
          baseStyles,
          paddingStyles[padding],
          hoverStyles,
          animationStyles[animation],
          hover3d && 'transform-gpu',
          className
        )}
        style={transform3dStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        {...props}
      >
        {/* Gradient Border Effect */}
        {gradientBorder && (
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 animate-gradient-rotate" />
            <div className="absolute inset-[2px] rounded-[14px] bg-white dark:bg-gray-900" />
          </div>
        )}

        {/* Outer Glow Effect */}
        {glow && (
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700 animate-glow-pulse pointer-events-none" />
        )}

        {/* Inner Glow Effect */}
        {innerGlow && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        )}

        {/* Shine/Reflection Effect */}
        {shine && isHovered && (
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.8) 0%, transparent 50%)`,
            }}
          />
        )}

        {/* Premium Shine Overlay */}
        {shine && (
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div className="absolute -inset-full group-hover:inset-0 bg-gradient-to-br from-white/40 via-white/0 to-white/0 transform rotate-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out" />
          </div>
        )}

        {/* Neumorphism Inner Shadows */}
        {neu && (
          <>
            <div className="absolute inset-0 rounded-2xl shadow-[inset_-8px_-8px_16px_rgba(255,255,255,0.8),inset_8px_8px_16px_rgba(0,0,0,0.1)] pointer-events-none" />
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.9),inset_4px_4px_8px_rgba(0,0,0,0.15)] transition-opacity duration-500 pointer-events-none" />
          </>
        )}

        {/* Animated Background Gradient */}
        {glass && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none animate-gradient-shift" />
        )}

        {/* Depth Shadow Layer */}
        {depth === 'floating' && (
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/10 blur-2xl rounded-full group-hover:w-4/5 group-hover:bg-black/15 transition-all duration-500 pointer-events-none" />
        )}

        {/* Border Highlight */}
        {!neu && (
          <div className="absolute inset-0 rounded-2xl border border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}

        {/* Card Content */}
        <div className="relative z-10 h-full">
          {children}
        </div>

        {/* Hover Glow Pulse Animation */}
        {glow && (
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 animate-pulse-slow" />
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mb-6 pb-4 border-b border-gray-200/60',
          'transition-all duration-500',
          'group-hover:border-violet-200/60',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('transition-all duration-500', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mt-6 pt-4 border-t border-gray-200/60',
          'transition-all duration-500',
          'group-hover:border-violet-200/60',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';
