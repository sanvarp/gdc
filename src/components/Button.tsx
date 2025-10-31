/**
 * Premium Button Component
 * Ultra-modern button with advanced animations, gradients, 3D depth effects, and glow
 * Features: Enhanced ripple, gradient backgrounds, multiple shadow layers, icon support
 * Quality: Apple/Linear/Vercel premium design
 */

import { type ButtonHTMLAttributes, forwardRef, useState, useRef, type ReactNode } from 'react';
import { cn } from '@utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  shimmer?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth,
      loading,
      icon,
      iconPosition = 'left',
      shimmer = false,
      className,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number; size: number }>>([]);
    const [isPressed, setIsPressed] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const nextId = useRef(0);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;

      // Create enhanced ripple effect
      const button = buttonRef.current || (ref as any)?.current;
      if (button) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = nextId.current++;

        // Calculate ripple size based on button dimensions
        const size = Math.max(rect.width, rect.height) * 2.5;

        setRipples(prev => [...prev, { x, y, id, size }]);

        // Remove ripple after animation completes
        setTimeout(() => {
          setRipples(prev => prev.filter(ripple => ripple.id !== id));
        }, 900);
      }

      // Call original onClick
      if (onClick) {
        onClick(e);
      }
    };

    const handleMouseDown = () => {
      if (!disabled && !loading) {
        setIsPressed(true);
      }
    };

    const handleMouseUp = () => {
      setIsPressed(false);
    };

    const handleMouseLeave = () => {
      setIsPressed(false);
    };

    const baseStyles = cn(
      'group relative inline-flex items-center justify-center',
      'font-semibold tracking-wide',
      'rounded-2xl overflow-hidden',
      'transition-all duration-500 ease-out',
      'focus:outline-none',
      'disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100',
      'transform-gpu will-change-transform',
      'select-none touch-manipulation',
      !disabled && !loading && 'hover:scale-[1.02] active:scale-[0.98]',
      isPressed && !disabled && !loading && 'scale-[0.97]'
    );

    const variants = {
      primary: cn(
        // Base gradient with animated background
        'bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700',
        'text-white shadow-depth-lg',
        // Hover effects - intensified glow and depth
        !disabled &&
          !loading &&
          'hover:shadow-glow-lg hover:from-primary-400 hover:via-primary-500 hover:to-primary-600',
        // Active/pressed state with depth
        !disabled && !loading && 'active:shadow-inner-shadow',
        // Animated background size for shimmer effect
        'bg-size-200 animate-gradient-fast'
      ),
      secondary: cn(
        'bg-gradient-to-br from-secondary-500 via-secondary-600 to-secondary-700',
        'text-white shadow-depth-lg',
        !disabled &&
          !loading &&
          'hover:shadow-[0_0_30px_rgba(97,164,168,0.6),0_0_60px_rgba(97,164,168,0.4)]',
        !disabled &&
          !loading &&
          'hover:from-secondary-400 hover:via-secondary-500 hover:to-secondary-600',
        !disabled && !loading && 'active:shadow-inner-shadow',
        'bg-size-200 animate-gradient-fast'
      ),
      accent: cn(
        'bg-gradient-to-br from-accent-500 via-accent-600 to-accent-700',
        'text-white shadow-depth-lg',
        !disabled &&
          !loading &&
          'hover:shadow-[0_0_30px_rgba(144,167,63,0.6),0_0_60px_rgba(144,167,63,0.4)]',
        !disabled && !loading && 'hover:from-accent-400 hover:via-accent-500 hover:to-accent-600',
        !disabled && !loading && 'active:shadow-inner-shadow',
        'bg-size-200 animate-gradient-fast'
      ),
      outline: cn(
        'border-2 border-primary-500/80 text-primary-700',
        'bg-gradient-to-br from-white via-primary-50/30 to-white',
        'backdrop-blur-sm shadow-depth-sm',
        !disabled &&
          !loading &&
          'hover:border-primary-600 hover:bg-gradient-to-br hover:from-primary-50 hover:via-primary-100/50 hover:to-primary-50',
        !disabled && !loading && 'hover:shadow-glow-sm hover:text-primary-800',
        !disabled && !loading && 'active:bg-primary-100 active:shadow-inner-glow',
        'relative before:absolute before:inset-0 before:rounded-2xl',
        'before:bg-gradient-to-br before:from-primary-400/20 before:to-transparent',
        'before:opacity-0 before:transition-opacity before:duration-500',
        !disabled && !loading && 'hover:before:opacity-100'
      ),
      ghost: cn(
        'text-primary-700 bg-transparent',
        'hover:bg-gradient-to-br hover:from-primary-50 hover:via-primary-100/70 hover:to-primary-50',
        !disabled && !loading && 'hover:shadow-depth-sm hover:text-primary-800',
        !disabled && !loading && 'active:bg-primary-100/80',
        'relative before:absolute before:inset-0 before:rounded-2xl',
        'before:bg-gradient-to-br before:from-primary-300/30 before:to-transparent',
        'before:opacity-0 before:transition-opacity before:duration-300',
        !disabled && !loading && 'hover:before:opacity-100'
      ),
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm gap-1.5 min-h-[2.25rem]',
      md: 'px-6 py-3 text-base gap-2 min-h-[2.75rem]',
      lg: 'px-8 py-4 text-lg gap-2.5 min-h-[3.5rem]',
      xl: 'px-10 py-5 text-xl gap-3 min-h-[4rem]',
    };

    return (
      <button
        ref={buttonRef}
        className={cn(baseStyles, variants[variant], sizes[size], fullWidth && 'w-full', className)}
        disabled={disabled || loading}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Multi-layer 3D depth effect - Bottom glow layer */}
        {!disabled && !loading && ['primary', 'secondary', 'accent'].includes(variant) && (
          <>
            <div
              className={cn(
                'absolute -inset-1 rounded-2xl opacity-0 blur-2xl transition-all duration-700',
                'group-hover:opacity-70 -z-10',
                variant === 'primary' && 'bg-gradient-to-br from-primary-400 to-primary-600',
                variant === 'secondary' && 'bg-gradient-to-br from-secondary-400 to-secondary-600',
                variant === 'accent' && 'bg-gradient-to-br from-accent-400 to-accent-600',
                'animate-glow-pulse'
              )}
            />
            <div
              className={cn(
                'absolute -inset-2 rounded-2xl opacity-0 blur-3xl transition-all duration-700',
                'group-hover:opacity-40 -z-20',
                variant === 'primary' && 'bg-primary-500',
                variant === 'secondary' && 'bg-secondary-500',
                variant === 'accent' && 'bg-accent-500'
              )}
            />
          </>
        )}

        {/* Premium shimmer effect for loading or explicit shimmer */}
        {(loading || shimmer) && (
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-r',
              'from-transparent via-white/40 to-transparent',
              'animate-shimmer-fast bg-300%',
              'pointer-events-none'
            )}
          />
        )}

        {/* Gradient overlay for depth */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10',
            'opacity-60 pointer-events-none',
            'transition-opacity duration-500',
            !disabled && !loading && 'group-hover:opacity-80'
          )}
        />

        {/* Inner glow effect */}
        {!disabled && !loading && ['primary', 'secondary', 'accent'].includes(variant) && (
          <div
            className={cn(
              'absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500',
              'pointer-events-none',
              !disabled && !loading && 'group-hover:opacity-100',
              variant === 'primary' && 'shadow-inner-glow',
              variant === 'secondary' && 'shadow-[inset_0_0_20px_rgba(97,164,168,0.3)]',
              variant === 'accent' && 'shadow-[inset_0_0_20px_rgba(144,167,63,0.3)]'
            )}
          />
        )}

        {/* Enhanced ripple effects with sophisticated timing */}
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className={cn(
              'absolute rounded-full pointer-events-none',
              'bg-white/50',
              variant === 'outline' && 'bg-primary-400/40',
              variant === 'ghost' && 'bg-primary-400/30'
            )}
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              transform: 'translate(-50%, -50%) scale(0)',
              animation: 'ripple 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          />
        ))}

        {/* Particle effect on hover for extra premium feel */}
        {!disabled && !loading && (
          <div
            className={cn(
              'absolute inset-0 opacity-0 transition-opacity duration-700',
              'pointer-events-none',
              'group-hover:opacity-100'
            )}
          >
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/60 rounded-full animate-particle"
                style={{
                  left: `${20 + i * 30}%`,
                  bottom: '20%',
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Button content with icon support */}
        <span
          className={cn(
            'relative z-10 flex items-center justify-center',
            loading && 'opacity-0'
          )}
        >
          {icon && iconPosition === 'left' && (
            <span
              className={cn(
                'inline-flex transition-transform duration-300 ease-out',
                !disabled && !loading && 'group-hover:scale-110 group-hover:rotate-12',
                isPressed && 'scale-90'
              )}
            >
              {icon}
            </span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span
              className={cn(
                'inline-flex transition-transform duration-300 ease-out',
                !disabled && !loading && 'group-hover:scale-110 group-hover:-rotate-12',
                isPressed && 'scale-90'
              )}
            >
              {icon}
            </span>
          )}
        </span>

        {/* Premium loading spinner with pulse */}
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center z-20">
            <span className="relative flex items-center justify-center">
              {/* Outer pulsing ring */}
              <span
                className={cn(
                  'absolute w-8 h-8 rounded-full border-2 border-current opacity-20',
                  'animate-ping'
                )}
              />
              {/* Spinning loader */}
              <svg
                className="h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-20"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-90"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </span>
          </span>
        )}

        {/* Border glow effect for outline variant */}
        {variant === 'outline' && !disabled && !loading && (
          <div
            className={cn(
              'absolute inset-0 rounded-2xl border-2 border-primary-400',
              'opacity-0 transition-all duration-500',
              'group-hover:opacity-60 blur-sm pointer-events-none'
            )}
          />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
