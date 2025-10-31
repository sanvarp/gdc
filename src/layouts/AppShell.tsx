/**
 * AppShell Component - ULTRA PREMIUM DARK THEME
 * Main application layout with Sidebar and MainContent
 * - Responsive layout with mobile/desktop behavior
 * - Premium glassmorphic header with animated gradients
 * - Smooth transitions and modern aesthetics
 * - Apple/Vercel quality design
 */

import { ReactNode } from 'react';
import { useStore, selectSidebarOpen } from '../store';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const toggleSidebar = useStore(state => state.toggleSidebar);

  return (
    <div className="relative flex h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900">
      {/* Animated background gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute top-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-blue-500/10 blur-3xl animation-delay-2000" />
        <div className="absolute -bottom-40 left-1/2 h-80 w-80 animate-pulse rounded-full bg-cyan-500/10 blur-3xl animation-delay-4000" />
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        {/* Mobile menu button - floating */}
        <button
          onClick={toggleSidebar}
          className="group fixed top-4 left-4 z-50 overflow-hidden rounded-xl bg-gray-800/90 p-2.5 text-gray-300 shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-gray-700/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 active:scale-95 lg:hidden"
          aria-label="Abrir menú lateral"
        >
          {/* Button glow effect */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 blur-xl" />
          </div>

          <svg
            className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Main content */}
        <MainContent>{children}</MainContent>
      </div>

      {/* Custom animation delays */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
