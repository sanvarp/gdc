/**
 * ChatItem Component
 * Individual chat summary card in the chat list
 * Premium design with glassmorphism and hover effects
 */

import { useState } from 'react';
import type { ChatSummary } from '@types';
import { Card } from '@components/Card';
import { cn } from '@utils/cn';

export interface ChatItemProps {
  chat: ChatSummary;
  isActive?: boolean;
  onClick: (chatId: string) => void;
}

const formatDate = (dateString: string): string => {
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
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
};

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

export const ChatItem = ({ chat, isActive = false, onClick }: ChatItemProps) => {
  const [rippleVisible, setRippleVisible] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    // Trigger ripple effect
    setRippleVisible(true);
    setTimeout(() => setRippleVisible(false), 600);

    onClick(chat.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(chat.id);
    }
  };

  return (
    <div className="relative group">
      {/* Glow effect on hover/active */}
      <div className={cn(
        "absolute -inset-0.5 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-2xl blur-lg opacity-0 transition-all duration-500",
        isActive && "opacity-40 animate-glow-pulse",
        !isActive && "group-hover:opacity-30"
      )} />

      <Card
        padding="none"
        hover={!isActive}
        className={cn(
          'relative cursor-pointer transition-all duration-500 overflow-hidden',
          'backdrop-blur-2xl border shadow-depth-lg',
          isActive
            ? 'bg-gradient-to-br from-gray-800/90 via-gray-800/80 to-gray-900/90 border-primary-400/40 shadow-glow-md ring-2 ring-primary-400/30 -translate-y-0.5'
            : 'bg-gradient-to-br from-gray-800/60 via-gray-800/50 to-gray-900/60 border-gray-700/50 hover:border-primary-500/40 hover:bg-gray-800/70 hover:shadow-glow-lg hover:scale-[1.01] hover:-translate-y-0.5'
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-pressed={isActive}
        aria-label={`Chat: ${chat.title}${isActive ? ' (active)' : ''}`}
      >
        {/* Animated gradient overlay on hover */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br from-primary-500/0 via-secondary-500/0 to-accent-500/0 transition-all duration-700",
          !isActive && "group-hover:from-primary-500/10 group-hover:via-secondary-500/10 group-hover:to-accent-500/5"
        )} />

        {/* Shimmer effect on hover */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-r from-transparent via-white/0 to-transparent -translate-x-full transition-all duration-1000",
          "group-hover:translate-x-full group-hover:via-white/10"
        )} />

        <div className="relative p-5 space-y-3">
          {/* Header: Icon/Avatar and Title */}
          <div className="flex items-start gap-4">
            {/* Icon with gradient background and 3D effect */}
            <div className="relative flex-shrink-0">
              {/* Icon glow */}
              <div className={cn(
                "absolute inset-0 rounded-xl blur-md transition-all duration-500",
                isActive
                  ? "bg-gradient-to-br from-primary-500 to-secondary-500 opacity-60 animate-glow-pulse"
                  : "bg-gradient-to-br from-primary-400 to-secondary-400 opacity-0 group-hover:opacity-50"
              )} />

              <div className={cn(
                "relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-500 shadow-depth-lg",
                isActive
                  ? "bg-gradient-to-br from-primary-500 via-primary-400 to-secondary-500 shadow-glow-md scale-105 rotate-2"
                  : "bg-gradient-to-br from-gray-700 to-gray-800 group-hover:scale-105 group-hover:rotate-3 group-hover:shadow-glow-sm group-hover:from-primary-500 group-hover:to-secondary-500"
              )}>
                <span className="text-white filter drop-shadow-lg" aria-hidden="true">💬</span>
              </div>
            </div>

            {/* Title and Date */}
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <h3
                  className={cn(
                    'font-bold text-base line-clamp-2 flex-1 transition-all duration-300',
                    isActive
                      ? 'text-gray-100 drop-shadow-glow'
                      : 'text-gray-200 group-hover:text-primary-300'
                  )}
                >
                  {chat.title}
                </h3>
                <span
                  className={cn(
                    'text-xs font-semibold whitespace-nowrap flex-shrink-0 px-2 py-1 rounded-full transition-all duration-300',
                    isActive
                      ? 'bg-primary-500/30 text-primary-200 shadow-glow-sm'
                      : 'bg-gray-700/50 text-gray-400 group-hover:bg-primary-500/20 group-hover:text-primary-300'
                  )}
                  aria-label={`Last updated ${formatDate(chat.updatedAt)}`}
                >
                  {formatDate(chat.updatedAt)}
                </span>
              </div>

              {/* Last Message with fade effect */}
              {chat.lastMessage && (
                <p
                  className={cn(
                    'text-sm line-clamp-2 relative transition-colors duration-300 leading-relaxed',
                    isActive ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'
                  )}
                  title={chat.lastMessage}
                >
                  {truncateText(chat.lastMessage, 120)}
                  <span className={cn(
                    "absolute bottom-0 right-0 w-16 h-full bg-gradient-to-l to-transparent pointer-events-none transition-colors duration-300",
                    isActive ? "from-gray-800/90" : "from-gray-800/60 group-hover:from-gray-800/70"
                  )} />
                </p>
              )}

              {/* Footer: Message Count with gradient badge */}
              <div className="flex items-center gap-2 text-xs pt-1">
                <div className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-500 shadow-depth-sm",
                  isActive
                    ? "bg-gradient-to-r from-primary-500/30 via-secondary-500/30 to-accent-500/20 shadow-glow-sm"
                    : "bg-gray-700/40 group-hover:bg-gradient-to-r group-hover:from-primary-500/20 group-hover:via-secondary-500/20 group-hover:to-accent-500/10"
                )}>
                  <svg
                    className={cn(
                      'w-4 h-4 transition-all duration-300',
                      isActive ? 'text-primary-300 animate-pulse' : 'text-gray-400 group-hover:text-primary-400'
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span
                    className={cn(
                      'font-bold transition-colors duration-300',
                      isActive ? 'text-primary-200' : 'text-gray-300 group-hover:text-primary-300'
                    )}
                    aria-label={`${chat.messageCount} message${chat.messageCount !== 1 ? 's' : ''}`}
                  >
                    {chat.messageCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active indicator with animated glow */}
        {isActive && (
          <div
            className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary-400 via-secondary-400 to-accent-500 rounded-l-2xl shadow-glow-md animate-glow-pulse"
            aria-hidden="true"
          />
        )}

        {/* Ripple effect on click */}
        {rippleVisible && (
          <span
            className="absolute inset-0 bg-gradient-to-br from-primary-400/40 via-secondary-400/40 to-accent-400/40 rounded-2xl animate-ripple"
            aria-hidden="true"
          />
        )}
      </Card>
    </div>
  );
};
