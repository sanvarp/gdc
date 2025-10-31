/**
 * ErrorState Component
 * Error state display with retry button and error details
 */

import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '@utils/cn';
import { Button } from './Button';

export interface ErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  error?: Error | string;
  onRetry?: () => void;
  retryLabel?: string;
  icon?: ReactNode;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ErrorState = forwardRef<HTMLDivElement, ErrorStateProps>(
  (
    {
      title = 'Algo salió mal',
      message = 'Ocurrió un error al cargar este contenido.',
      error,
      onRetry,
      retryLabel = 'Intentar nuevamente',
      icon,
      showDetails = false,
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const errorMessage = error instanceof Error ? error.message : error;

    const sizeStyles = {
      sm: {
        container: 'py-8 px-4',
        icon: 'w-12 h-12 mb-3',
        title: 'text-lg',
        message: 'text-sm',
        button: 'sm',
      },
      md: {
        container: 'py-12 px-6',
        icon: 'w-16 h-16 mb-4',
        title: 'text-xl',
        message: 'text-base',
        button: 'md',
      },
      lg: {
        container: 'py-16 px-8',
        icon: 'w-20 h-20 mb-5',
        title: 'text-2xl',
        message: 'text-lg',
        button: 'lg',
      },
    };

    const styles = sizeStyles[size];

    const defaultIcon = (
      <svg
        className="w-full h-full"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    );

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center text-center',
          styles.container,
          className
        )}
        role="alert"
        aria-live="assertive"
        {...props}
      >
        <div
          className={cn(
            'flex items-center justify-center text-red-400 drop-shadow-[0_0_12px_rgba(248,113,113,0.4)] mb-4',
            styles.icon
          )}
        >
          {icon || defaultIcon}
        </div>
        <h3
          className={cn(
            'font-semibold text-white mb-2',
            styles.title
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            'text-gray-300 max-w-md mb-6',
            styles.message
          )}
        >
          {message}
        </p>
        {showDetails && errorMessage && (
          <details className="mb-6 max-w-md w-full">
            <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1 transition-colors">
              Detalles del error
            </summary>
            <pre className="mt-2 p-3 bg-gray-900/50 border border-red-500/20 rounded-lg text-left text-xs text-red-400 overflow-auto max-h-40 backdrop-blur-sm">
              {errorMessage}
            </pre>
          </details>
        )}
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="primary"
            size={styles.button as 'sm' | 'md' | 'lg'}
            aria-label={retryLabel}
          >
            {retryLabel}
          </Button>
        )}
      </div>
    );
  }
);

ErrorState.displayName = 'ErrorState';
