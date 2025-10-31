/**
 * MainContent Component
 * Main content wrapper using full available space with dark theme
 * - Uses full width and height
 * - Dark theme matching overall design
 * - No padding or width restrictions
 * - Accessible main landmark
 * - Seamless with AppShell
 */

import { ReactNode } from 'react';

interface MainContentProps {
  children: ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  return (
    <main
      className="flex-1 w-full h-full overflow-auto bg-gray-900"
      role="main"
    >
      {children}
    </main>
  );
}
