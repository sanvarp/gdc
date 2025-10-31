/**
 * FileTable Component
 * Modern, clean table for displaying files
 */

import { useEffect, useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { useStore } from '@/store';
import { Skeleton } from '@components/Skeleton';
import { EmptyState } from '@components/EmptyState';
import { ErrorState } from '@components/ErrorState';
import { FileRow } from './FileRow';
import { cn } from '@/utils/cn';
import type { FileItem } from '@/types';

interface FileTableProps {
  folderId: string;
}

type SortField = 'name' | 'size' | 'updatedAt' | 'uploadedBy';
type SortDirection = 'asc' | 'desc';

export function FileTable({ folderId }: FileTableProps) {
  const filesByFolder = useStore(state => state.filesByFolder[folderId]);
  const loadFolderFiles = useStore(state => state.loadFolderFiles);

  const [sortField, setSortField] = useState<SortField>('updatedAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!filesByFolder || filesByFolder.status === 'idle') {
      loadFolderFiles(folderId);
    }
  }, [folderId, filesByFolder, loadFolderFiles]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection(field === 'updatedAt' ? 'desc' : 'asc');
    }
  };

  const sortFiles = (files: FileItem[]): FileItem[] => {
    return [...files].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'size':
          comparison = a.size - b.size;
          break;
        case 'updatedAt':
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        case 'uploadedBy':
          comparison = a.uploadedBy.localeCompare(b.uploadedBy);
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  };

  // Loading State
  if (!filesByFolder || filesByFolder.status === 'loading') {
    if (isMobile) {
      return (
        <div className="flex flex-col gap-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className={`animate-stagger-${Math.min(index + 1, 5)}`}>
              <Skeleton variant="rounded" height="h-24" className="backdrop-blur-xl bg-gray-800/70 border-gray-700/50 shadow-elevated rounded-2xl" />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, index) => (
          <div key={index} className={`animate-stagger-${Math.min(index + 1, 5)}`}>
            <Skeleton variant="rounded" height="h-16" className="backdrop-blur-xl bg-gray-800/70 border-gray-700/50 shadow-sm rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  // Error State
  if (filesByFolder.status === 'error') {
    return (
      <div className="animate-fade-in-up">
        <ErrorState
          title="Error al cargar archivos"
          message={filesByFolder.error?.message || 'Ocurrió un error inesperado'}
          onRetry={() => loadFolderFiles(folderId)}
        />
      </div>
    );
  }

  // Empty State
  if (!filesByFolder.data || filesByFolder.data.length === 0) {
    return (
      <div className="animate-fade-in-up">
        <EmptyState
          title="No hay archivos en esta carpeta"
          description="Sube archivos para comenzar."
          icon={
            <div className="animate-float">
              <svg className="w-16 h-16" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          }
        />
      </div>
    );
  }

  const sortedFiles = sortFiles(filesByFolder.data);

  // Mobile Card View
  if (isMobile) {
    return (
      <div className="flex flex-col gap-3" role="list" aria-label="Archivos">
        {sortedFiles.map((file, index) => (
          <div key={file.id} className={`animate-stagger-${Math.min(index + 1, 5)}`}>
            <FileRow file={file} viewMode="card" />
          </div>
        ))}
      </div>
    );
  }

  // Header Sort Icon Component
  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortDirection === 'asc'
      ? <ArrowUp className="w-4 h-4 text-primary-400" />
      : <ArrowDown className="w-4 h-4 text-primary-400" />;
  };

  // Desktop Table View
  return (
    <div className="w-full overflow-hidden rounded-3xl border border-gray-700/50 bg-gradient-to-br from-gray-800/90 via-gray-900/80 to-gray-800/90 backdrop-blur-xl shadow-elevated">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-700/50 bg-gradient-to-r from-gray-800/90 via-gray-900/90 to-gray-800/90">
              <th className="px-6 py-4 text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Tipo</span>
              </th>

              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className={cn(
                    "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors",
                    sortField === 'name' ? "text-primary-400" : "text-gray-300 hover:text-primary-400"
                  )}
                >
                  Nombre
                  <SortIcon field="name" />
                </button>
              </th>

              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('size')}
                  className={cn(
                    "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors",
                    sortField === 'size' ? "text-primary-400" : "text-gray-300 hover:text-primary-400"
                  )}
                >
                  Tamaño
                  <SortIcon field="size" />
                </button>
              </th>

              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('updatedAt')}
                  className={cn(
                    "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors",
                    sortField === 'updatedAt' ? "text-primary-400" : "text-gray-300 hover:text-primary-400"
                  )}
                >
                  Actualizado
                  <SortIcon field="updatedAt" />
                </button>
              </th>

              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('uploadedBy')}
                  className={cn(
                    "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors",
                    sortField === 'uploadedBy' ? "text-primary-400" : "text-gray-300 hover:text-primary-400"
                  )}
                >
                  Subido por
                  <SortIcon field="uploadedBy" />
                </button>
              </th>

              <th className="px-6 py-4 text-right">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Acciones</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700/30">
            {sortedFiles.map((file, index) => (
              <tr
                key={file.id}
                className={cn(
                  `animate-stagger-${Math.min(index + 1, 5)}`,
                  "group transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-700/40 hover:via-gray-800/30 hover:to-gray-700/40"
                )}
              >
                <FileRow file={file} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
