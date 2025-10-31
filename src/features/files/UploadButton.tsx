/**
 * UploadButton Component
 * File upload button with drag & drop support
 * Premium design with floating action button style and animations
 * Shows only if folder.canUpload is true
 */

import { useState, useRef, useCallback } from 'react';
import { useStore } from '@/store';
import { Button } from '@components/Button';
import { validateFile } from '@/utils/formatters';
import { cn } from '@/utils/cn';
import type { Folder } from '@/types';

interface UploadButtonProps {
  folder: Folder;
}

export function UploadButton({ folder }: UploadButtonProps) {
  const uploading = useStore(state => state.uploading);
  const uploadFileToFolder = useStore(state => state.uploadFileToFolder);
  const showToast = useStore(state => state.showToast);

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);

  // Don't render if user can't upload
  if (!folder.canUpload) {
    return null;
  }

  const handleFileSelect = async (file: File) => {
    const validation = validateFile(file);

    if (!validation.valid) {
      showToast('error', validation.error || 'Falló la validación del archivo');
      return;
    }

    try {
      await uploadFileToFolder(folder.id, file);
      showToast('success', `Se subió exitosamente ${file.name}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al subir el archivo';
      showToast('error', errorMessage);
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }

    // Reset input to allow uploading the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Drag & Drop Handlers
  const handleDragEnter = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    dragCounterRef.current += 1;

    if (event.dataTransfer.types.includes('Files')) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    dragCounterRef.current -= 1;

    if (dragCounterRef.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    async (event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();

      setIsDragging(false);
      dragCounterRef.current = 0;

      const file = event.dataTransfer.files[0];

      if (!file) {
        showToast('error', 'No se detectó ningún archivo');
        return;
      }

      await handleFileSelect(file);
    },
    [folder.id, uploadFileToFolder, showToast]
  );

  return (
    <div
      className="relative"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileInputChange}
        disabled={uploading}
        className="sr-only"
        id={`file-upload-${folder.id}`}
        aria-label="Subir archivo"
      />

      {/* Upload Button with premium FAB style */}
      <div className="relative inline-block group/upload">
        {/* Outer glow ring */}
        <div className="absolute -inset-2 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 rounded-2xl opacity-0 group-hover/upload:opacity-30 blur-xl transition-all duration-500 animate-gradient bg-200%" />

        {/* Pulsing ring animation when not uploading */}
        {!uploading && (
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-2xl opacity-20 animate-pulse-glow" />
        )}

        <Button
          variant="primary"
          onClick={handleButtonClick}
          disabled={uploading}
          aria-label="Subir archivo a la carpeta"
          size="lg"
          className={cn(
            "relative overflow-hidden transform-gpu",
            "shadow-elevated hover:shadow-floating transition-all duration-500",
            "bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 animate-gradient bg-200%",
            "hover:scale-110 hover:-translate-y-1",
            uploading && "animate-pulse scale-105"
          )}
        >
          {/* Button shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover/upload:opacity-100 animate-shimmer bg-200% pointer-events-none" />

          {uploading ? (
            <div className="flex items-center gap-3">
              {/* Spinning loader with gradient */}
              <div className="relative">
                <svg
                  className="w-6 h-6 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
              <span className="font-bold text-lg tracking-wide">Subiendo...</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 group-hover/upload:animate-bounce-subtle transition-transform duration-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="font-bold text-lg tracking-wide">Subir Archivo</span>
            </div>
          )}

          {/* Inner highlight */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 pointer-events-none" />
        </Button>
      </div>

      {/* Drag & Drop Overlay with ultra-premium design */}
      {isDragging && (
        <div className="fixed inset-0 z-50 backdrop-blur-md bg-gradient-to-br from-secondary-600/95 via-primary-600/95 to-accent-600/95 flex items-center justify-center pointer-events-none animate-fade-in">
          {/* Animated gradient mesh background */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/20 via-primary-500/20 to-accent-500/20 animate-gradient bg-200%" />

          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full animate-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          <div className="relative backdrop-blur-xl bg-gradient-to-br from-gray-800/95 via-gray-900/90 to-gray-800/85 rounded-xl p-6 shadow-floating max-w-sm mx-4 border-3 border-dashed border-primary-500/60 animate-scale-in transform-gpu overflow-hidden">
            {/* Card shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer bg-200%" />

            <div className="relative flex flex-col items-center text-center">
              {/* Animated upload icon with multiple layers */}
              <div className="relative mb-3 animate-bounce-subtle">
                {/* Outer glow rings - reduced */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-400 to-accent-400 rounded-full blur-xl opacity-40 animate-pulse-glow scale-125" />

                {/* Main icon circle */}
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-secondary-500 via-primary-500 to-accent-500 flex items-center justify-center shadow-glow-lg border-2 border-white/30 animate-gradient bg-200% overflow-hidden">
                  <svg
                    className="w-8 h-8 text-white drop-shadow-2xl animate-float z-10 relative"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>

                  {/* Inner highlight */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-white/40 rounded-full" />
                </div>
              </div>

              {/* Title with animated gradient text */}
              <h3 className="text-lg font-black bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 bg-clip-text text-transparent mb-2 animate-gradient bg-200% drop-shadow-sm leading-tight">
                Suelta el archivo aquí
              </h3>

              {/* Subtitle badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-900/40 via-secondary-900/40 to-primary-900/40 border border-primary-700/50 shadow-depth-md animate-gradient bg-200%">
                <svg
                  className="w-3.5 h-3.5 text-primary-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-gray-300 font-semibold">Máx. 15MB</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Helper Text with premium gradient styling */}
      <div className="mt-6 text-center">
        <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gray-800/50 via-gray-900/50 to-gray-800/50 border border-gray-700/50 shadow-depth-sm">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <span className="bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-clip-text text-transparent font-bold text-sm animate-gradient bg-200%">
            Haz clic para buscar o arrastra y suelta
          </span>
        </p>
        <p className="mt-2 text-xs text-gray-400 font-medium px-3 py-1 rounded-full bg-gray-800/50 inline-block">
          Tamaño máximo: 15MB
        </p>
      </div>
    </div>
  );
}
