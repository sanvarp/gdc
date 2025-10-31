/**
 * Toast Component
 * Premium dark theme toast notification component with glassmorphism and gradient effects
 */

import {
  type HTMLAttributes,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import { cn } from '@utils/cn';

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  duration?: number;
  onClose?: () => void;
  showCloseButton?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      variant = 'info',
      title,
      message,
      duration = 5000,
      onClose,
      showCloseButton = true,
      position = 'top-right',
      className,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
      if (duration && duration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [duration]);

    const handleClose = () => {
      setIsLeaving(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 300);
    };

    if (!isVisible) return null;

    const variants = {
      success: {
        container: 'bg-gradient-to-br from-emerald-900/40 via-green-900/30 to-emerald-800/40 border-emerald-500/30',
        glow: 'shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]',
        icon: 'text-emerald-400',
        iconGlow: 'drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]',
        text: 'text-emerald-100',
        title: 'text-emerald-50',
        gradient: 'before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-emerald-400/20 before:to-green-600/10 before:opacity-50',
        iconPath: (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        ),
      },
      error: {
        container: 'bg-gradient-to-br from-rose-900/40 via-red-900/30 to-rose-800/40 border-rose-500/30',
        glow: 'shadow-[0_0_30px_rgba(244,63,94,0.3)] hover:shadow-[0_0_40px_rgba(244,63,94,0.4)]',
        icon: 'text-rose-400',
        iconGlow: 'drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]',
        text: 'text-rose-100',
        title: 'text-rose-50',
        gradient: 'before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-rose-400/20 before:to-red-600/10 before:opacity-50',
        iconPath: (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        ),
      },
      warning: {
        container: 'bg-gradient-to-br from-amber-900/40 via-yellow-900/30 to-amber-800/40 border-amber-500/30',
        glow: 'shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:shadow-[0_0_40px_rgba(251,191,36,0.4)]',
        icon: 'text-amber-400',
        iconGlow: 'drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]',
        text: 'text-amber-100',
        title: 'text-amber-50',
        gradient: 'before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-amber-400/20 before:to-yellow-600/10 before:opacity-50',
        iconPath: (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        ),
      },
      info: {
        container: 'bg-gradient-to-br from-blue-900/40 via-cyan-900/30 to-blue-800/40 border-blue-500/30',
        glow: 'shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]',
        icon: 'text-blue-400',
        iconGlow: 'drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]',
        text: 'text-blue-100',
        title: 'text-blue-50',
        gradient: 'before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-blue-400/20 before:to-cyan-600/10 before:opacity-50',
        iconPath: (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        ),
      },
    };

    const positions = {
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4',
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'top-center': 'top-4 left-1/2 -translate-x-1/2',
      'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    };

    const style = variants[variant];

    return (
      <div
        ref={ref}
        className={cn(
          'fixed z-50 w-full max-w-sm pointer-events-auto',
          positions[position],
          isLeaving
            ? 'animate-[slideOut_0.3s_ease-out_forwards]'
            : 'animate-[slideIn_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards]'
        )}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        {...props}
      >
        <div
          className={cn(
            'relative flex items-start gap-3 p-4 border rounded-xl overflow-hidden',
            'backdrop-blur-xl bg-clip-padding',
            'transition-all duration-300 ease-out',
            style.container,
            style.glow,
            style.gradient,
            className
          )}
        >
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50" />

          {/* Icon */}
          <div
            className={cn(
              'relative flex-shrink-0 z-10',
              style.icon,
              style.iconGlow
            )}
            aria-hidden="true"
          >
            <svg
              className="w-6 h-6 animate-[pulse_2s_ease-in-out_infinite]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {style.iconPath}
            </svg>
          </div>

          {/* Content */}
          <div className="relative flex-1 min-w-0 z-10">
            {title && (
              <p className={cn('text-sm font-bold mb-1 tracking-wide', style.title)}>
                {title}
              </p>
            )}
            <p className={cn('text-sm leading-relaxed', style.text)}>
              {message}
            </p>
          </div>

          {/* Close button */}
          {showCloseButton && (
            <button
              type="button"
              onClick={handleClose}
              className={cn(
                'relative flex-shrink-0 z-10 p-1 rounded-lg',
                'bg-white/5 hover:bg-white/10 backdrop-blur-sm',
                'transition-all duration-200 ease-out',
                'focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent',
                'hover:scale-110 active:scale-95',
                'group',
                style.text
              )}
              aria-label="Close notification"
            >
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {/* Bottom gradient accent */}
          <div className={cn(
            'absolute bottom-0 left-0 right-0 h-[2px]',
            'bg-gradient-to-r',
            variant === 'success' && 'from-transparent via-emerald-400 to-transparent',
            variant === 'error' && 'from-transparent via-rose-400 to-transparent',
            variant === 'warning' && 'from-transparent via-amber-400 to-transparent',
            variant === 'info' && 'from-transparent via-blue-400 to-transparent',
            'animate-[shimmer_2s_ease-in-out_infinite]'
          )} />
        </div>
      </div>
    );
  }
);

Toast.displayName = 'Toast';

// Toast Container for managing multiple toasts
export interface ToastContainerProps extends HTMLAttributes<HTMLDivElement> {
  position?: ToastProps['position'];
}

export const ToastContainer = forwardRef<HTMLDivElement, ToastContainerProps>(
  ({ position = 'top-right', children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('fixed z-50 pointer-events-none', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ToastContainer.displayName = 'ToastContainer';
