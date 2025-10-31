/**
 * Logo Component
 * Gases del Caribe company logo with responsive sizing
 * Professional implementation with fallback and accessibility
 */

import { cn } from '@/utils/cn';

interface LogoProps {
  /** Size variant of the logo */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Whether to show only the icon or full logo */
  variant?: 'full' | 'icon';
  /** Additional CSS classes */
  className?: string;
  /** Whether to add glow effects */
  withGlow?: boolean;
}

const sizeClasses = {
  sm: 'h-8',
  md: 'h-12',
  lg: 'h-16',
  xl: 'h-24',
};

export function Logo({
  size = 'md',
  variant = 'full',
  className,
  withGlow = false
}: LogoProps) {
  return (
    <div className={cn('relative inline-flex items-center', className)}>
      {/* Glow effect */}
      {withGlow && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-accent-500/20 blur-xl rounded-full animate-glow-pulse" />
      )}

      {/* Logo image - uses icon version for sidebar */}
      <img
        src={variant === 'icon' ? '/assets/gdc-icon.png' : '/assets/gdc-logo.png'}
        alt="Gases del Caribe"
        className={cn(
          'relative object-contain transition-all duration-300',
          sizeClasses[size],
          withGlow && 'drop-shadow-glow',
          variant === 'icon' && 'w-auto'
        )}
        loading="lazy"
      />
    </div>
  );
}

/**
 * Logo with text component - for sidebar and headers
 */
interface LogoWithTextProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showSubtitle?: boolean;
  withGlow?: boolean;
}

export function LogoWithText({
  size = 'md',
  className,
  showSubtitle = false,
  withGlow = false
}: LogoWithTextProps) {
  const logoSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md';
  const textSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base';
  const subtitleSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-sm' : 'text-xs';

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Logo size={logoSize} variant="icon" withGlow={withGlow} />
      <div className="flex flex-col">
        <span className={cn('font-black text-white leading-tight', textSize)}>
          Gases del Caribe
        </span>
        {showSubtitle && (
          <span className={cn('text-gray-400 font-medium leading-tight', subtitleSize)}>
            Asistente Inteligente
          </span>
        )}
      </div>
    </div>
  );
}
