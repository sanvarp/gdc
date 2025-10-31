/**
 * Modal Component
 * Ultra-modern accessible modal with glassmorphism, backdrop blur, and premium animations
 */

import {
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { cn } from '@utils/cn';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  variant?: 'default' | 'glass' | 'premium';
}

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {}

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      title,
      size = 'md',
      closeOnOverlayClick = true,
      closeOnEscape = true,
      showCloseButton = true,
      variant = 'default',
      children,
      className,
      ...props
    },
    ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    const sizeStyles = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-full mx-4',
    };

    const variantStyles = {
      default: cn(
        'bg-white/95 backdrop-blur-md rounded-2xl',
        'shadow-elevated border border-border/50'
      ),
      glass: cn(
        'bg-white/20 backdrop-blur-2xl rounded-3xl',
        'shadow-floating border border-white/30'
      ),
      premium: cn(
        'bg-gradient-to-br from-white/98 to-white/95 backdrop-blur-xl rounded-3xl',
        'shadow-glow-lg border-2 border-primary-200/50',
        'animate-glow-pulse'
      ),
    };

    // Handle escape key
    useEffect(() => {
      if (!open || !closeOnEscape) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [open, closeOnEscape, onClose]);

    // Focus trap
    useEffect(() => {
      if (!open) return;

      previousActiveElement.current = document.activeElement as HTMLElement;

      const modal = modalRef.current;
      if (!modal) return;

      const focusableElements = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      // Delay focus to ensure animations don't interfere
      setTimeout(() => {
        firstFocusable?.focus();
      }, 100);

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTab);

      return () => {
        document.removeEventListener('keydown', handleTab);
        previousActiveElement.current?.focus();
      };
    }, [open]);

    // Prevent body scroll when modal is open
    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [open]);

    const handleOverlayClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
          onClose();
        }
      },
      [closeOnOverlayClick, onClose]
    );

    if (!open) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        onClick={handleOverlayClick}
      >
        {/* Overlay with enhanced backdrop blur */}
        <div
          className={cn(
            'absolute inset-0 transition-all duration-300',
            variant === 'glass' || variant === 'premium'
              ? 'bg-black/30 backdrop-blur-xl'
              : 'bg-black/50 backdrop-blur-sm'
          )}
          aria-hidden="true"
        />

        {/* Modal */}
        <div
          ref={modalRef}
          className={cn(
            'relative w-full transform transition-all duration-500 ease-smooth',
            'animate-fade-in-scale',
            sizeStyles[size],
            variantStyles[variant],
            className
          )}
          {...props}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div
              className={cn(
                'flex items-center justify-between px-6 py-5',
                variant === 'glass'
                  ? 'border-b border-white/20'
                  : 'border-b border-border/50'
              )}
            >
              {title && (
                <h2
                  id="modal-title"
                  className={cn(
                    'text-xl font-semibold',
                    variant === 'glass'
                      ? 'text-gray-900'
                      : 'text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text'
                  )}
                >
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className={cn(
                    'ml-auto rounded-xl p-2 transition-all duration-300',
                    'hover:bg-gray-100/50 hover:scale-110 hover:rotate-90',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                    'active:scale-95',
                    variant === 'glass'
                      ? 'text-gray-700 hover:bg-white/30'
                      : 'text-gray-500 hover:text-gray-700'
                  )}
                  aria-label="Close modal"
                >
                  <svg
                    className="w-5 h-5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Content */}
          {children}
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'px-6 py-5 border-b border-border/50',
          'animate-fade-in-down',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModalHeader.displayName = 'ModalHeader';

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'px-6 py-5 overflow-y-auto max-h-[calc(90vh-200px)]',
          'scrollbar-thin scrollbar-thumb-primary-200 scrollbar-track-transparent',
          'animate-fade-in',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModalBody.displayName = 'ModalBody';

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'px-6 py-5 border-t border-border/50',
          'flex items-center justify-end gap-3',
          'bg-gradient-to-t from-gray-50/50 to-transparent',
          'animate-fade-in-up',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModalFooter.displayName = 'ModalFooter';
