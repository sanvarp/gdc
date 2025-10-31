/**
 * PromptInput Component
 * Message input form with character counter and keyboard shortcuts
 * Premium design with glassmorphism and glow effects
 */

import { type FormEvent, useState, useRef, useEffect } from 'react';
import { Button } from '@components/Button';
import { Textarea } from '@components/Textarea';
import { cn } from '@utils/cn';

export interface PromptInputProps {
  onSubmit: (content: string) => void;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
}

export const PromptInput = ({
  onSubmit,
  disabled = false,
  placeholder = 'Escribe tu mensaje...',
  maxLength = 4000,
}: PromptInputProps) => {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus textarea on mount
  useEffect(() => {
    if (!disabled) {
      textareaRef.current?.focus();
    }
  }, [disabled]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmedContent = content.trim();
    if (!trimmedContent || disabled) return;

    onSubmit(trimmedContent);
    setContent('');

    // Reset textarea height after submit
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter (without Shift for new line)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isOverLimit = content.length > maxLength;
  const canSubmit = content.trim().length > 0 && !disabled && !isOverLimit;
  const hasContent = content.trim().length > 0;
  const charCount = content.length;
  const charPercentage = (charCount / maxLength) * 100;

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative border-t backdrop-blur-2xl p-6 transition-all duration-500 shadow-floating",
        "border-gray-800/50 bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-black/90"
      )}
      aria-label="Message input form"
    >
      {/* Floating glowing orbs */}
      <div className="absolute top-0 right-0 h-40 w-40 bg-primary-500/10 rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute bottom-0 left-0 h-32 w-32 bg-secondary-500/10 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '1s' }} />

      <div className="relative max-w-4xl mx-auto space-y-4">
        {/* Input container with advanced glassmorphism */}
        <div className="relative group">
          {/* Outer glow effect */}
          <div className={cn(
            "absolute -inset-1 rounded-3xl blur-lg transition-all duration-500",
            hasContent
              ? "bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 opacity-30 group-focus-within:opacity-50 animate-glow-pulse"
              : "bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-accent-500/20 opacity-0 group-focus-within:opacity-30"
          )} />

          <div className={cn(
            "relative rounded-3xl transition-all duration-500",
            hasContent && "shadow-glow-md",
            "group-focus-within:shadow-glow-lg"
          )}>
            <Textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={maxLength}
              showCharCount={false}
              resize="none"
              rows={3}
              fullWidth
              className={cn(
                "min-h-[100px] max-h-[240px] rounded-3xl shadow-depth-lg",
                "backdrop-blur-2xl bg-gradient-to-br from-gray-800/70 via-gray-800/60 to-gray-900/70",
                "border border-gray-700/50 text-gray-100 placeholder:text-gray-500",
                "focus:border-primary-500/50 focus:shadow-glow-md focus:bg-gray-800/80",
                "transition-all duration-500 font-medium",
                disabled && "opacity-50 cursor-not-allowed"
              )}
              aria-label="Message content"
              aria-describedby="prompt-hint"
            />

            {/* Character counter with enhanced design */}
            {hasContent && (
              <div className="absolute bottom-3 right-3 text-xs font-bold">
                <span className={cn(
                  "px-3 py-1.5 rounded-full backdrop-blur-xl transition-all duration-300 shadow-depth-sm",
                  isOverLimit
                    ? "bg-gradient-to-r from-red-600/80 to-red-500/80 text-white shadow-glow-sm animate-pulse"
                    : charPercentage > 90
                      ? "bg-gradient-to-r from-amber-600/80 to-amber-500/80 text-white shadow-glow-sm"
                      : "bg-gradient-to-r from-primary-600/60 via-secondary-600/60 to-accent-600/60 text-primary-200"
                )}>
                  {charCount} / {maxLength}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* Enhanced hint text */}
          <p
            id="prompt-hint"
            className="text-sm text-gray-400 font-medium flex items-center gap-2"
            aria-live="polite"
          >
            {disabled ? (
              <span className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
                </span>
                <span className="text-primary-400 font-semibold">Sending message...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span className="text-gray-500">Presiona</span>
                <kbd className="px-3 py-1.5 text-xs font-bold text-primary-300 bg-gray-800/80 border border-gray-700 rounded-lg shadow-depth-sm backdrop-blur-sm">
                  Enter
                </kbd>
                <span className="text-gray-500">para enviar</span>
                <span className="text-gray-600 mx-1">•</span>
                <kbd className="px-3 py-1.5 text-xs font-bold text-primary-300 bg-gray-800/80 border border-gray-700 rounded-lg shadow-depth-sm backdrop-blur-sm">
                  Shift
                </kbd>
                <span className="text-gray-600">+</span>
                <kbd className="px-3 py-1.5 text-xs font-bold text-primary-300 bg-gray-800/80 border border-gray-700 rounded-lg shadow-depth-sm backdrop-blur-sm">
                  Enter
                </kbd>
                <span className="text-gray-500">para nueva línea</span>
              </span>
            )}
          </p>

          {/* Premium send button with advanced effects */}
          <div className="relative group">
            {/* Button glow effect */}
            <div className={cn(
              "absolute -inset-0.5 rounded-2xl blur-lg transition-all duration-500",
              canSubmit && "bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 opacity-60 group-hover:opacity-100 animate-glow-pulse",
              !canSubmit && "opacity-0"
            )} />

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={!canSubmit}
              aria-label="Send message"
              className={cn(
                "relative min-w-[120px] transition-all duration-500 shadow-depth-lg overflow-hidden",
                canSubmit && "shadow-glow-md hover:shadow-glow-lg hover:scale-105 bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 hover:from-primary-500 hover:via-primary-400 hover:to-secondary-400",
                disabled && "animate-pulse bg-gradient-to-r from-primary-600/80 to-secondary-600/80"
              )}
            >
              {/* Shimmer effect on hover */}
              {canSubmit && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-white/30 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              )}

              {disabled ? (
                <span className="relative flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="font-semibold">Sending</span>
                </span>
              ) : (
                <span className="relative flex items-center gap-2 font-semibold">
                  <svg
                    className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  Send
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
