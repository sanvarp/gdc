/**
 * Textarea Component
 * Ultra-modern multi-line text input with glassmorphism, glow effects, and premium animations
 */

import { type TextareaHTMLAttributes, forwardRef, useState, useEffect } from 'react';
import { cn } from '@utils/cn';

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  showCharCount?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  variant?: 'default' | 'glass' | 'glow';
  floatingLabel?: boolean;
  success?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      fullWidth = false,
      showCharCount = false,
      resize = 'vertical',
      variant = 'default',
      floatingLabel = false,
      success = false,
      className,
      id,
      disabled,
      required,
      maxLength,
      value,
      onChange,
      placeholder,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);
    const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;
    const errorId = error ? `${textareaId}-error` : undefined;
    const hintId = hint ? `${textareaId}-hint` : undefined;

    useEffect(() => {
      if (value !== undefined) {
        setCharCount(String(value).length);
        setHasValue(!!String(value).length);
      }
    }, [value]);

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      setHasValue(!!e.target.value);
      onChange?.(e);
    };

    // Base styles - shared across all variants
    const baseStyles =
      'block w-full px-4 py-3 text-base transition-all duration-300 ease-smooth focus:outline-none disabled:cursor-not-allowed min-h-[120px] group-hover:shadow-md';

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
          ? 'border-red-400 text-red-900 placeholder-red-300 focus:border-red-500 focus:shadow-glow-lg focus:shadow-red-500/40 focus:scale-[1.01] animate-shake'
          : success
            ? 'border-green-400 text-green-900 focus:border-green-500 focus:shadow-glow-lg focus:shadow-green-500/40 focus:scale-[1.01] animate-glow-pulse'
            : 'border-primary-200 hover:border-primary-300 focus:border-primary-500 focus:shadow-glow-lg focus:scale-[1.01] animate-border-glow',
        disabled && 'bg-gray-50/80 opacity-60'
      ),
    };

    const resizeStyles = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    // Floating label styles
    const labelFloatingStyles = cn(
      'absolute left-4 text-gray-600 pointer-events-none transition-all duration-300 ease-smooth',
      isFocused || hasValue
        ? 'top-0 -translate-y-1/2 text-xs px-2 bg-white rounded-full shadow-sm font-medium'
        : 'top-6 text-base',
      error && 'text-red-600',
      success && 'text-green-600',
      isFocused && !error && !success && 'text-primary-600'
    );

    const labelStaticStyles = cn(
      'text-sm font-medium transition-colors duration-200',
      error ? 'text-red-600' : success ? 'text-green-600' : 'text-gray-700',
      isFocused && !error && !success && 'text-primary-600'
    );

    const isNearLimit = maxLength && charCount > maxLength * 0.9;
    const isOverLimit = maxLength && charCount > maxLength;

    const charCountStyles = cn(
      'text-sm text-right font-medium transition-all duration-300 px-1',
      isOverLimit
        ? 'text-red-600 animate-pulse'
        : isNearLimit
          ? 'text-yellow-600'
          : 'text-gray-500'
    );

    const containerStyles = cn(
      'flex flex-col gap-2 group',
      fullWidth && 'w-full',
      floatingLabel && 'relative'
    );

    return (
      <div className={containerStyles}>
        {label && !floatingLabel && (
          <label htmlFor={textareaId} className={labelStaticStyles}>
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            className={cn(
              baseStyles,
              variantStyles[variant],
              resizeStyles[resize],
              floatingLabel && 'pt-7 pb-3',
              className
            )}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            value={value}
            placeholder={floatingLabel ? '' : placeholder}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={cn(errorId, hintId).trim() || undefined}
            {...props}
          />
          {label && floatingLabel && (
            <label htmlFor={textareaId} className={labelFloatingStyles}>
              {label}
              {required && (
                <span className="ml-1" aria-label="required">
                  *
                </span>
              )}
            </label>
          )}
          {success && !error && (
            <div className="absolute right-4 top-4 text-green-500 animate-scale-in">
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
            <div className="absolute right-4 top-4 text-red-500 animate-wiggle">
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
        {showCharCount && maxLength && (
          <div
            className={charCountStyles}
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="inline-block animate-fade-in">
              {charCount} / {maxLength}
            </span>
            {isNearLimit && !isOverLimit && (
              <span className="ml-2 text-yellow-500 animate-bounce-subtle">
                ⚠
              </span>
            )}
            {isOverLimit && (
              <span className="ml-2 text-red-500 animate-wiggle">
                ✕
              </span>
            )}
          </div>
        )}
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

Textarea.displayName = 'Textarea';
