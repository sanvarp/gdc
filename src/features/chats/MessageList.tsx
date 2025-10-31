/**
 * MessageList Component
 * Displays list of chat messages with role-based styling
 * Premium design with glassmorphism and animations
 */

import { useEffect, useRef } from 'react';
import type { ChatMessage } from '@types';
import { Skeleton, SkeletonText } from '@components/Skeleton';
import { EmptyState } from '@components/EmptyState';
import { cn } from '@utils/cn';

export interface MessageListProps {
  messages: ChatMessage[];
  loading?: boolean;
  sending?: boolean;
}

const formatTimestamp = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  // Less than 1 minute
  if (diffMins < 1) return 'Just now';
  // Less than 1 hour
  if (diffMins < 60) return `${diffMins}m ago`;
  // Less than 24 hours
  if (diffHours < 24) return `${diffHours}h ago`;
  // Less than 7 days
  if (diffDays < 7) return `${diffDays}d ago`;
  // Show date
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};

const MessageBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  return (
    <div
      className={cn(
        'flex w-full py-5 px-4 sm:px-8 animate-fade-in-scale',
        isUser ? 'justify-end' : 'justify-start'
      )}
      role="article"
      aria-label={`${message.role} message`}
    >
      <div className={cn(
        "flex gap-4 group",
        isUser && "flex-row-reverse"
      )}>
        {/* Avatar with gradient badge and 3D effect */}
        <div className="relative flex-shrink-0">
          {/* Avatar glow effect */}
          <div className={cn(
            "absolute inset-0 rounded-2xl blur-lg transition-all duration-500 opacity-0 group-hover:opacity-100",
            isUser
              ? 'bg-gradient-to-br from-primary-500 to-secondary-500'
              : isSystem
                ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                : 'bg-gradient-to-br from-secondary-500 to-accent-500'
          )} />

          <div
            className={cn(
              'relative flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold shadow-depth-lg transition-all duration-500 hover:scale-110 hover:rotate-6',
              isUser
                ? 'bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 shadow-glow-sm'
                : isSystem
                  ? 'bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 shadow-glow-sm'
                  : 'bg-gradient-to-br from-secondary-600 via-secondary-500 to-accent-500 shadow-glow-sm'
            )}
            aria-hidden="true"
          >
            <span className="text-white filter drop-shadow-lg">
              {isUser ? '👤' : isSystem ? '⚙️' : '🤖'}
            </span>
          </div>
        </div>

        {/* Message bubble with advanced glassmorphism */}
        <div className={cn(
          "space-y-2 flex flex-col",
          isUser ? "items-end" : "items-start"
        )}>
          {/* Name and timestamp */}
          <div className={cn(
            "flex items-center gap-2.5",
            isUser && "flex-row-reverse"
          )}>
            <span className={cn(
              "text-sm font-bold tracking-wide",
              isUser
                ? "text-primary-300"
                : isSystem
                  ? "text-blue-300"
                  : "text-secondary-300"
            )}>
              {isUser ? 'You' : isSystem ? 'System' : 'Assistant'}
            </span>
            <span
              className="text-xs text-gray-500 font-medium px-2 py-0.5 rounded-full bg-gray-800/30"
              aria-label={`Sent ${formatTimestamp(message.createdAt)}`}
            >
              {formatTimestamp(message.createdAt)}
            </span>
          </div>

          {/* Message content bubble with enhanced design */}
          <div className="relative group/bubble">
            {/* Outer glow on hover */}
            <div className={cn(
              "absolute -inset-0.5 rounded-3xl blur-md opacity-0 transition-all duration-500 group-hover/bubble:opacity-100",
              isUser
                ? 'bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500'
                : isSystem
                  ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                  : 'bg-gradient-to-br from-gray-700 to-gray-600'
            )} />

            <div className={cn(
              "relative rounded-3xl px-5 py-4 shadow-depth-lg transition-all duration-500 group-hover/bubble:shadow-glow-lg",
              isUser
                ? 'bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 text-white shadow-glow-sm'
                : isSystem
                  ? 'backdrop-blur-2xl bg-gradient-to-br from-blue-900/60 to-cyan-900/40 border border-blue-500/30 text-blue-100 shadow-glow-sm'
                  : 'backdrop-blur-2xl bg-gradient-to-br from-gray-800/80 via-gray-800/70 to-gray-900/80 border border-gray-700/50 text-gray-100 hover:border-gray-600/50'
            )}>
              {/* Gradient overlay for assistant messages */}
              {!isUser && !isSystem && (
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/5 via-accent-500/5 to-transparent rounded-3xl pointer-events-none" />
              )}

              <div className={cn(
                "relative text-base whitespace-pre-wrap break-words leading-relaxed",
                isUser && "text-white font-medium",
                !isUser && !isSystem && "text-gray-100"
              )}>
                {message.content}
              </div>

              {/* 3D depth effect */}
              <div className={cn(
                "absolute bottom-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none transition-opacity duration-500 group-hover/bubble:opacity-30",
                isUser
                  ? "bg-secondary-400"
                  : isSystem
                    ? "bg-cyan-400"
                    : "bg-accent-400"
              )} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="flex w-full py-5 px-4 sm:px-8 animate-fade-in-scale" aria-busy="true">
    <div className="max-w-4xl w-full flex gap-4">
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary-500/20 to-accent-500/20 blur-lg animate-glow-pulse" />
        <Skeleton variant="circular" width={48} height={48} className="shadow-depth-lg rounded-2xl relative" />
      </div>
      <div className="flex-1 min-w-0 space-y-3">
        <Skeleton variant="text" width={120} height={18} className="rounded-lg" />
        <div className="backdrop-blur-2xl bg-gradient-to-br from-gray-800/80 via-gray-800/70 to-gray-900/80 border border-gray-700/50 rounded-3xl p-5 shadow-depth-lg">
          <SkeletonText lines={2} className="space-y-3" />
        </div>
      </div>
    </div>
  </div>
);

export const MessageList = ({
  messages,
  loading = false,
  sending = false,
}: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages with smooth behavior
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [messages.length, sending]);

  if (loading) {
    return (
      <div className="relative flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 via-black to-gray-900" role="log" aria-label="Loading messages">
        {/* Dark theme background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/20 via-transparent to-secondary-950/20 animate-gradient bg-300% pointer-events-none" />

        {/* Floating glow orbs */}
        <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-primary-500/10 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-secondary-500/10 blur-3xl animate-float" style={{ animationDelay: '1s' }} />

        <div className="relative">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="relative flex-1 overflow-y-auto flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900">
        {/* Dark theme background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/20 via-transparent to-secondary-950/20 animate-gradient bg-300% pointer-events-none" />

        {/* Central glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl animate-glow-pulse" />

        <div className="relative animate-fade-in-up">
          <EmptyState
            icon={
              <div className="animate-float relative">
                <div className="absolute inset-0 bg-primary-500/20 blur-2xl animate-glow-pulse" />
                <svg
                  className="w-full h-full relative text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
            }
            title="No messages yet"
            description="Start the conversation by sending a message below."
            size="md"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex-1 overflow-y-auto scroll-smooth bg-gradient-to-b from-gray-900 via-black to-gray-900",
        "scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900/50"
      )}
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
      aria-atomic="false"
    >
      {/* Dark theme background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950/10 via-transparent to-secondary-950/10 animate-gradient bg-300% pointer-events-none" />

      {/* Subtle floating orbs */}
      <div className="absolute top-20 right-20 h-40 w-40 rounded-full bg-primary-500/5 blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-40 left-20 h-48 w-48 rounded-full bg-secondary-500/5 blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />

      <div className="relative">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {sending && <LoadingSkeleton />}
      </div>
      <div ref={messagesEndRef} aria-hidden="true" className="h-6" />
    </div>
  );
};
