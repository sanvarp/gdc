/**
 * Files Page
 * Shows folder grid or file list for selected folder
 * Premium dark theme with full space usage
 */

import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '@store';
import { FolderGrid, FileTable, UploadButton } from '@features/files';
import { Button } from '@components';

export function FilesPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const navigate = useNavigate();
  const { folders, filesByFolder, loadFolders } = useStore();

  useEffect(() => {
    loadFolders();
  }, [loadFolders]);

  const currentFolder = folders.data?.find(f => f.id === folderId);

  if (!folderId) {
    // Show folders grid - Premium dark theme
    return (
      <div className="min-h-screen w-full px-6 md:px-8">
        {/* Premium Dark Glassmorphism Header */}
        <div className="mb-8 rounded-2xl bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-800/90 p-8 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl"></div>
            <div className="relative">
              <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                Mis Carpetas
              </h1>
              <p className="text-gray-300 text-base">
                Selecciona una carpeta para ver sus archivos
              </p>
            </div>
          </div>
        </div>

        {/* Full width content */}
        <div className="w-full">
          <FolderGrid />
        </div>
      </div>
    );
  }

  // Show files in folder - Premium dark theme
  return (
    <div className="min-h-screen w-full px-6 md:px-8">
      {/* Premium Dark Glassmorphism Header */}
      <div className="mb-8 rounded-2xl bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-800/90 p-8 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              {/* Dark themed back button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/files')}
                className="mb-4 text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
              >
                ← Volver a Carpetas
              </Button>

              <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                {currentFolder?.name || 'Carpeta'}
              </h1>
              <p className="text-gray-300 text-sm">
                Propietario: {currentFolder?.owner}
              </p>
            </div>

            {/* Upload button aligned to the right */}
            {currentFolder?.canUpload && (
              <div className="ml-6">
                <UploadButton folder={currentFolder} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full width file table */}
      <div className="w-full">
        <FileTable folderId={folderId} />
      </div>
    </div>
  );
}
