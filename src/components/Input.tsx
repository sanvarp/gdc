/**
 * Input Component
 * Ultra-modern text input with glassmorphism, glow effects, and floating labels
 */

import { type InputHTMLAttributes, forwardRef, useState } from 'react';
import { cn } from '@utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  variant?: 'default' | 'glass' | 'glow';
  floatingLabel?: boolean;
  success?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      fullWidth = false,
      variant = 'default',
      floatingLabel = false,
      success = false,
      className,
      id,
      disabled,
      required,
      value,
      placeholder,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    // Base styles - shared across all variants
    const baseStyles =
      'block w-full px-4 py-3 text-base transition-all duration-300 ease-smooth focus:outline-none disabled:cursor-not-allowed group-hover:shadow-md';

    // Variant-specific styles
    const variantStyles = {
      default: cn(
        'bg-white/90 backdrop-blur-sm border-2 rounded-xl',
        'shadow-depth-sm hover:shadow-depth-md',
        error
          ? 'border-red-400 text-red-900 placeholder-red-300 focus:border-red-500 focus:shadow-glow-sm focus:shadow-red-500/20 animate-shake'
          : success
            ? 'border-green-400 text-green-900 focus:border-green-500 focus:shadow-glow-sm focus:shadow-green-500/20'
            : 'border-border hover:border-primary-300 focus:border-primary-500 focus:shadow-glow-sm',
        disabled && 'bg-gray-50/50 opacity-60 backdrop-blur-none'
      ),
      glass: cn(
        'bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl',
        'shadow-depth-md hover:shadow-elevated',
        error
          ? 'border-red-400/50 text-red-900 placeholder-red-300/70 focus:border-red-500/70 focus:bg-white/20 focus:shadow-glow-md focus:shadow-red-500/30 animate-shake'
          : success
            ? 'border-green-400/50 text-green-900 focus:border-green-500/70 focus:bg-white/20 focus:shadow-glow-md focus:shadow-green-500/30'
            : 'hover:bg-white/15 focus:bg-white/20 focus:border-primary-400/70 focus:shadow-glow-md',
        disabled && 'bg-white/5 opacity-50 backdrop-blur-sm'
      ),
      glow: cn(
        'bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-md border-2 rounded-2xl',
        'shadow-depth-md hover:shadow-elevated transition-all duration-500',
        error
          ? 'border-red-400 text-red-900 placeholder-red-300 focus:border-red-500 focus:shadow-glow-lg focus:shadow-red-500/40 focus:scale-[1.02] animate-shake'
          : success
            ? 'border-green-400 text-green-900 focus:border-green-500 focus:shadow-glow-lg focus:shadow-green-500/40 focus:scale-[1.02] animate-glow-pulse'
            : 'border-primary-200 hover:border-primary-300 focus:border-primary-500 focus:shadow-glow-lg focus:scale-[1.02] animate-border-glow',
        disabled && 'bg-gray-50/80 opacity-60'
      ),
    };

    // Floating label styles
    const labelFloatingStyles = cn(
      'absolute left-4 text-gray-600 pointer-events-none transition-all duration-300 ease-smooth',
      isFocused || hasValue
        ? 'top-0 -translate-y-1/2 text-xs px-2 bg-white rounded-full shadow-sm font-medium'
        : 'top-1/2 -translate-y-1/2 text-base',
      error && 'text-red-600',
      success && 'text-green-600',
      isFocused && !error && !success && 'text-primary-600'
    );

    const labelStaticStyles = cn(
      'text-sm font-medium transition-colors duration-200',
      error ? 'text-red-600' : success ? 'text-green-600' : 'text-gray-700',
      isFocused && !error && !success && 'text-primary-600'
    );

    const containerStyles = cn(
      'flex flex-col gap-2 group',
      fullWidth && 'w-full',
      floatingLabel && 'relative'
    );

    return (
      <div className={containerStyles}>
        {label && !floatingLabel && (
          <label htmlFor={inputId} className={labelStaticStyles}>
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={cn(
              baseStyles,
              variantStyles[variant],
              floatingLabel && 'pt-6 pb-2',
              className
            )}
            disabled={disabled}
            required={required}
            value={value}
            placeholder={floatingLabel ? '' : placeholder}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={cn(errorId, hintId).trim() || undefined}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />
          {label && floatingLabel && (
            <label htmlFor={inputId} className={labelFloatingStyles}>
              {label}
              {required && (
                <span className="ml-1" aria-label="required">
                  *
                </span>
              )}
            </label>
          )}
          {success && !error && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 animate-scale-in">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
          {error && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 animate-wiggle">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}
        </div>
        {hint && !error && (
          <p
            id={hintId}
            className="text-sm text-gray-500 px-1 animate-fade-in"
          >
            {hint}
          </p>
        )}
        {error && (
          <p
            id={errorId}
            className="text-sm text-red-600 px-1 font-medium animate-fade-in-up"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
