/**
 * Ultra-Modern Sidebar Component
 * Premium design with glassmorphism, 3D effects, and advanced animations
 * Features:
 * - Dark theme with glassmorphic surfaces
 * - Animated gradient borders and glowing effects
 * - 3D depth with dynamic shadows
 * - Smooth micro-interactions and hover states
 * - Collapsible with fluid animations
 * - Modern iconography (using Lucide React icons)
 * - Premium $10k+ SaaS product visual quality
 */

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useStore, selectSidebarOpen } from '../store';
import { Logo } from '@components';
import {
  Home,
  MessageSquare,
  FolderOpen,
  Settings,
  ChevronRight,
  Sparkles,
  X,
  User,
  LogOut,
  ChevronUp
} from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  ariaLabel: string;
}

const navItems: NavItem[] = [
  {
    to: '/',
    label: 'Inicio',
    Icon: Home,
    ariaLabel: 'Navegar a Inicio',
  },
  {
    to: '/chats',
    label: 'Chats',
    Icon: MessageSquare,
    ariaLabel: 'Navegar a Chats',
  },
  {
    to: '/files',
    label: 'Archivos',
    Icon: FolderOpen,
    ariaLabel: 'Navegar a Archivos',
  },
  {
    to: '/admin',
    label: 'Admin',
    Icon: Settings,
    ariaLabel: 'Navegar a Admin',
  },
];

export function Sidebar() {
  const sidebarOpen = useStore(selectSidebarOpen);
  const toggleSidebar = useStore(state => state.toggleSidebar);
  const setSidebarOpen = useStore(state => state.setSidebarOpen);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Close sidebar when clicking overlay on mobile
  const handleOverlayClick = () => {
    setSidebarOpen(false);
  };

  // Toggle user menu
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  // Handle logout
  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Cerrar sesión');
    // For now, just redirect to home
    window.location.href = '/';
  };

  return (
    <>
      {/* Mobile overlay with blur effect */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-gray-950/80 backdrop-blur-md lg:hidden animate-fade-in"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      {/* Ultra-Modern Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-72 transform transition-all duration-700 ease-bounce-in
          lg:static lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        aria-label="Main navigation"
      >
        {/* Multi-layer glassmorphic background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950" />

        {/* Glassmorphism layer with subtle texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-2xl" />

        {/* Animated gradient border - right edge */}
        <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-primary-500/50 to-transparent animate-glow-pulse" />

        {/* Subtle animated gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/[0.03] via-transparent to-secondary-500/[0.03] animate-gradient-fast bg-300% opacity-60" />

        {/* Noise texture for premium feel */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />

        <div className="relative h-full flex flex-col">
          {/* Premium Header with Logo */}
          <div className="relative flex h-20 items-center justify-between px-6 border-b border-white/5">
            {/* Glow effect behind header */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-transparent" />

            <div className="relative flex items-center gap-3 animate-fade-in-scale group cursor-pointer">
              {/* GDC Logo with premium effects */}
              <div className="relative">
                {/* Glow background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-secondary-500/30 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500 animate-glow-pulse" />

                {/* Logo container with subtle background - increased size */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-depth-lg transform group-hover:scale-105 transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl" />
                  <Logo
                    size="md"
                    variant="icon"
                    className="relative z-10 scale-110 group-hover:scale-125 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Company name with gradient text */}
              <div className="flex flex-col">
                <h2 className="text-base font-black bg-gradient-to-r from-white via-primary-200 to-secondary-200 bg-clip-text text-transparent bg-300% animate-text-shimmer leading-tight">
                  Gases del Caribe
                </h2>
                <span className="text-[10px] text-gray-500 font-semibold tracking-wide">
                  Asistente IA
                </span>
              </div>
            </div>

            {/* Mobile close button with premium styling */}
            <button
              onClick={toggleSidebar}
              className="relative rounded-xl p-2.5 text-gray-400 hover:text-white hover:bg-white/5 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 lg:hidden group/close overflow-hidden"
              aria-label="Cerrar barra lateral"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-secondary-500/0 group-hover/close:from-primary-500/10 group-hover/close:to-secondary-500/10 transition-all duration-300" />

              <X className="w-5 h-5 relative z-10 transform group-hover/close:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Navigation with premium styling */}
          <nav className="flex-1 space-y-1.5 px-4 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent" role="navigation">
            {navItems.map((item, index) => (
              <NavLink
                key={item.to}
                to={item.to}
                aria-label={item.ariaLabel}
                className={({ isActive }) =>
                  `group/nav relative flex items-center gap-3.5 rounded-xl px-4 py-3.5 text-[15px] font-medium transition-all duration-500 transform overflow-hidden
                  ${
                    isActive
                      ? 'text-white scale-[1.02]'
                      : 'text-gray-400 hover:text-white hover:scale-[1.02]'
                  }
                  focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 focus:ring-offset-gray-900
                  animate-fade-in-scale
                  `
                }
                style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
              >
                {({ isActive }) => (
                  <>
                    {/* Background layers */}
                    {isActive ? (
                      <>
                        {/* Animated gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-primary-400/20 to-secondary-500/20 animate-gradient-fast bg-300%" />

                        {/* Glassmorphic overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm" />

                        {/* Top highlight */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-xl shadow-glow-md opacity-50" />

                        {/* Border with gradient */}
                        <div className="absolute inset-0 rounded-xl border border-primary-400/30" />
                      </>
                    ) : (
                      <>
                        {/* Hover background */}
                        <div className="absolute inset-0 bg-white/0 group-hover/nav:bg-white/[0.04] transition-all duration-500" />

                        {/* Hover glassmorphic effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover/nav:from-white/[0.03] group-hover/nav:to-transparent backdrop-blur-sm transition-all duration-500" />

                        {/* Hover border */}
                        <div className="absolute inset-0 rounded-xl border border-transparent group-hover/nav:border-white/10 transition-all duration-500" />
                      </>
                    )}

                    {/* Icon with premium styling */}
                    <div className="relative flex items-center justify-center">
                      {/* Icon glow effect when active */}
                      {isActive && (
                        <div className="absolute inset-0 bg-primary-400/30 rounded-lg blur-md animate-pulse-glow" />
                      )}

                      <item.Icon
                        className={`w-5 h-5 relative z-10 transition-all duration-500 transform
                          ${isActive
                            ? 'text-primary-300 drop-shadow-[0_0_8px_rgba(37,150,190,0.6)]'
                            : 'text-gray-500 group-hover/nav:text-primary-400 group-hover/nav:drop-shadow-[0_0_6px_rgba(37,150,190,0.3)]'
                          }
                          group-hover/nav:scale-110 group-hover/nav:-rotate-3
                        `}
                      />
                    </div>

                    {/* Label with smooth transitions */}
                    <span className={`relative z-10 font-semibold tracking-wide transition-all duration-500 group-hover/nav:translate-x-0.5
                      ${isActive ? 'text-white' : 'text-gray-400 group-hover/nav:text-gray-200'}`}>
                      {item.label}
                    </span>

                    {/* Active/Hover indicator arrow */}
                    <div className={`ml-auto relative z-10 transition-all duration-500 transform
                      ${isActive
                        ? 'opacity-100 translate-x-0 scale-100'
                        : 'opacity-0 -translate-x-2 scale-75 group-hover/nav:opacity-100 group-hover/nav:translate-x-0 group-hover/nav:scale-100'
                      }`}>
                      <ChevronRight
                        className={`w-4 h-4 transition-all duration-500
                          ${isActive
                            ? 'text-primary-300 animate-pulse-glow'
                            : 'text-gray-500 group-hover/nav:text-primary-400'
                          }`}
                      />
                    </div>

                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover/nav:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer-fast bg-300%" />
                    </div>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* User Menu Footer */}
          <div className="relative border-t border-white/5 p-4">
            {/* Top glow effect */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />

            {/* User menu button */}
            <button
              onClick={toggleUserMenu}
              className="relative w-full rounded-xl overflow-hidden animate-fade-in-scale group/user cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Background layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-white/[0.01]" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/[0.05] via-transparent to-secondary-500/[0.05]" />

              {/* Border with glow */}
              <div className="absolute inset-0 rounded-xl border border-white/5 group-hover/user:border-primary-500/30 transition-all duration-500" />

              {/* Content */}
              <div className="relative p-4 backdrop-blur-sm flex items-center gap-3">
                {/* User avatar with gradient */}
                <div className="relative flex-shrink-0">
                  {/* Animated glow ring */}
                  <div className="absolute -inset-0.5 animate-pulse rounded-full bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 opacity-75 blur-sm transition-all duration-300 group-hover/user:opacity-100 group-hover/user:blur-md" />

                  {/* Avatar */}
                  <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-600 via-secondary-600 to-primary-700 text-sm font-bold text-white shadow-lg">
                    <User className="w-5 h-5" />

                    {/* Inner shine effect */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover/user:opacity-100" />
                  </div>

                  {/* Status indicator */}
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-gray-900 bg-emerald-500 shadow-lg shadow-emerald-500/50" />
                </div>

                {/* User info */}
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-bold text-white truncate">Usuario</p>
                  <p className="text-xs text-gray-400">user@gdc.com</p>
                </div>

                {/* Chevron icon */}
                <ChevronUp className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`} />

                {/* Hover shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover/user:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-shimmer-fast bg-300%" />
                </div>
              </div>
            </button>

            {/* Dropdown menu */}
            {userMenuOpen && (
              <div className="mt-2 animate-fade-in-scale">
                <div className="relative rounded-xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-gray-800/90 border border-gray-700/50 shadow-2xl">
                  {/* Menu items */}
                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="group/item relative w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-red-500/10 transition-all duration-300 overflow-hidden"
                    >
                      {/* Hover background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-500/0 group-hover/item:from-red-500/10 group-hover/item:to-red-500/5 transition-all duration-300" />

                      <LogOut className="w-4 h-4 relative z-10 text-red-400 group-hover/item:scale-110 transition-transform duration-300" />
                      <span className="relative z-10">Cerrar Sesión</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom ambient glow */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary-500/5 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Right edge highlight for 3D depth */}
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </aside>
    </>
  );
}
