/**
 * FolderCard Component
 * Individual folder card with folder icon, name, owner, and last updated
 * Premium design with glassmorphism and hover lift
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@components/Card';
import { formatRelativeTime } from '@/utils/formatters';
import { cn } from '@/utils/cn';
import type { Folder } from '@/types';

interface FolderCardProps {
  folder: Folder;
}

export function FolderCard({ folder }: FolderCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/files/${folder.id}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="group relative transform-gpu"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect background */}
      <div className="absolute -inset-1 bg-gradient-to-r from-secondary-400 via-primary-400 to-accent-400 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 animate-gradient-fast bg-200%" />

      <Card
        className={cn(
          "relative cursor-pointer overflow-hidden transform-gpu",
          "backdrop-blur-xl bg-gradient-to-br from-gray-800/90 via-gray-800/80 to-gray-900/90",
          "border border-white/10 shadow-elevated hover:shadow-floating",
          "transition-all duration-500 ease-bounce-in",
          "hover:border-primary-400/40",
          "hover:scale-[1.03] hover:-translate-y-3",
          "focus-within:ring-2 focus-within:ring-primary-500/50 focus-within:ring-offset-2 focus-within:ring-offset-transparent"
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`Open folder ${folder.name}`}
      >
        {/* Full card gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-secondary-500/0 to-accent-500/0 group-hover:from-primary-500/12 group-hover:via-secondary-500/8 group-hover:to-accent-500/12 transition-all duration-700 rounded-2xl" />

        <div className="relative flex items-start gap-5 z-10">
          {/* Large Gradient Icon with 3D effect */}
          <div className="relative flex-shrink-0">
            {/* Icon glow */}
            <div className={cn(
              "absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary-400 to-accent-400 blur-lg transition-all duration-500",
              isHovered ? "opacity-60 scale-125" : "opacity-0 scale-100"
            )} />

            <div
              className={cn(
                "relative flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center text-4xl",
                "bg-gradient-to-br from-secondary-500 via-primary-500 to-accent-500 animate-gradient bg-200%",
                "shadow-elevated hover:shadow-glow-md",
                "transition-all duration-500 ease-bounce-in transform-gpu",
                "border border-white/20",
                isHovered ? "scale-110 rotate-6 shadow-glow-lg" : "scale-100 rotate-0"
              )}
              aria-hidden="true"
            >
              <span className="text-white transform transition-all duration-500 drop-shadow-lg filter">
                📁
              </span>

              {/* Inner glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/0 to-white/20 opacity-50" />
            </div>
          </div>

          {/* Folder Info */}
          <div className="flex-1 min-w-0 space-y-3">
            <h3 className="text-xl font-bold text-white truncate group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary-300 group-hover:to-secondary-300 group-hover:bg-clip-text transition-all duration-500">
              {folder.name}
            </h3>

            {/* Stats with premium gradient badges */}
            <div className="flex flex-col gap-2.5 text-sm">
              <div className="flex items-center gap-2">
                <div className="relative group/badge">
                  {/* Badge glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />

                  <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-secondary-900/40 via-primary-900/40 to-secondary-900/40 group-hover:from-secondary-800/50 group-hover:via-primary-800/50 group-hover:to-secondary-800/50 backdrop-blur-sm border border-secondary-500/20 shadow-depth-sm group-hover:shadow-depth-md transition-all duration-300 animate-gradient bg-200%">
                    <svg
                      className="w-4 h-4 flex-shrink-0 text-secondary-400 group-hover:text-secondary-300 transition-colors"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="truncate text-gray-300 font-semibold">{folder.owner}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative group/badge">
                  {/* Badge glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-400 to-primary-400 rounded-full opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />

                  <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-900/40 via-secondary-900/40 to-primary-900/40 group-hover:from-primary-800/50 group-hover:via-secondary-800/50 group-hover:to-primary-800/50 backdrop-blur-sm border border-primary-500/20 shadow-depth-sm group-hover:shadow-depth-md transition-all duration-300 animate-gradient bg-200%">
                    <svg
                      className="w-4 h-4 flex-shrink-0 text-primary-400 group-hover:text-primary-300 transition-colors"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-300 font-semibold">
                      Updated {formatRelativeTime(folder.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hover indicator arrow with premium styling */}
        <div className={cn(
          "absolute top-5 right-5 transition-all duration-500 ease-bounce-in transform-gpu z-20",
          isHovered ? "opacity-100 translate-x-0 rotate-0 scale-100" : "opacity-0 -translate-x-3 -rotate-12 scale-75"
        )}>
          {/* Arrow glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary-400 to-accent-400 rounded-full blur-md opacity-60 animate-pulse-glow" />

          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-secondary-500 via-primary-500 to-accent-500 flex items-center justify-center shadow-glow-md border border-white/30 animate-gradient bg-200% hover:scale-110 transition-transform duration-300">
            <svg
              className="w-5 h-5 text-white drop-shadow-lg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>

            {/* Inner highlight */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/20" />
          </div>
        </div>
      </Card>
    </div>
  );
}
