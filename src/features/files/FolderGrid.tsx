/**
 * FolderGrid Component
 * Grid layout of folder cards with loading, empty, and error states
 * Premium design with stagger animations and glassmorphism
 */

import { useEffect } from 'react';
import { useStore } from '@/store';
import { Skeleton } from '@components/Skeleton';
import { EmptyState } from '@components/EmptyState';
import { ErrorState } from '@components/ErrorState';
import { FolderCard } from './FolderCard';

export function FolderGrid() {
  const folders = useStore(state => state.folders);
  const loadFolders = useStore(state => state.loadFolders);

  useEffect(() => {
    if (folders.status === 'idle') {
      loadFolders();
    }
  }, [folders.status, loadFolders]);

  // Loading State
  if (folders.status === 'loading') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => {
          const animationClass = `animate-stagger-${Math.min(index + 1, 5)}`;
          return (
            <div key={index} className={animationClass}>
              <Skeleton
                variant="card"
                height="h-48"
                className="backdrop-blur-xl bg-gradient-to-br from-white/80 via-white/70 to-white/60 border border-white/30 shadow-elevated hover:shadow-floating rounded-3xl overflow-hidden relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/5 via-primary-500/5 to-accent-500/5 animate-gradient-fast bg-200%" />
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-200%" />
              </Skeleton>
            </div>
          );
        })}
      </div>
    );
  }

  // Error State
  if (folders.status === 'error') {
    return (
      <div className="animate-fade-in-up">
        <ErrorState
          title="Error al cargar carpetas"
          message={folders.error?.message || 'Ocurrió un error inesperado'}
          onRetry={loadFolders}
        />
      </div>
    );
  }

  // Empty State
  if (!folders.data || folders.data.length === 0) {
    return (
      <div className="animate-fade-in-up">
        <EmptyState
          title="Aún no hay carpetas"
          message="Las carpetas aparecerán aquí una vez que sean creadas por un administrador."
          icon={
            <div className="animate-float">
              <svg
                className="w-16 h-16"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
          }
        />
      </div>
    );
  }

  // Success State - Display folders with stagger animation
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      role="list"
      aria-label="Carpetas"
    >
      {folders.data.map((folder, index) => {
        const animationClass = `animate-stagger-${Math.min(index + 1, 5)}`;
        return (
          <div
            key={folder.id}
            className={`${animationClass} transform-gpu`}
          >
            <FolderCard folder={folder} />
          </div>
        );
      })}
    </div>
  );
}
