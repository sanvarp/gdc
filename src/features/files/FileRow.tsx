/**
 * FileRow Component
 * Renders individual file rows in table format
 */

import { useState } from 'react';
import { Download, Loader2, FileText, Image, Video, FileArchive, Music } from 'lucide-react';
import { Card } from '@components/Card';
import { formatFileSize, formatRelativeTime, getFileIcon } from '@/utils/formatters';
import type { FileItem } from '@/types';

interface FileRowProps {
  file: FileItem;
  viewMode?: 'table' | 'card';
}

export function FileRow({ file, viewMode = 'table' }: FileRowProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Download file:', file.id);
    } finally {
      setIsDownloading(false);
    }
  };

  const fileType = getFileIcon(file.mimeType);

  // Get icon and color for file type
  const getFileTypeInfo = () => {
    const iconProps = { className: "w-5 h-5 text-white", strokeWidth: 2 };

    const typeMap: Record<string, { icon: React.ReactNode; color: string }> = {
      image: { icon: <Image {...iconProps} />, color: 'from-purple-500 to-pink-500' },
      video: { icon: <Video {...iconProps} />, color: 'from-red-500 to-orange-500' },
      audio: { icon: <Music {...iconProps} />, color: 'from-green-500 to-teal-500' },
      pdf: { icon: <FileText {...iconProps} />, color: 'from-red-600 to-red-700' },
      document: { icon: <FileText {...iconProps} />, color: 'from-blue-500 to-indigo-500' },
      spreadsheet: { icon: <FileText {...iconProps} />, color: 'from-green-600 to-emerald-600' },
      presentation: { icon: <FileText {...iconProps} />, color: 'from-orange-500 to-amber-500' },
      archive: { icon: <FileArchive {...iconProps} />, color: 'from-yellow-500 to-amber-600' },
      text: { icon: <FileText {...iconProps} />, color: 'from-gray-500 to-slate-600' },
    };

    return typeMap[fileType] || { icon: <FileText {...iconProps} />, color: 'from-gray-500 to-gray-600' };
  };

  const { icon, color } = getFileTypeInfo();

  // Mobile Card View
  if (viewMode === 'card') {
    return (
      <Card className="group relative overflow-hidden bg-gradient-to-br from-gray-800/90 to-gray-900/80 border-gray-700/50 hover:border-primary-500/60 transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${color} shadow-md`}>
            {icon}
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="truncate font-semibold text-white group-hover:text-primary-400 transition-colors">
              {file.name}
            </h4>
            <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-400">
              <span>{formatFileSize(file.size)}</span>
              <span>•</span>
              <span>{formatRelativeTime(file.updatedAt)}</span>
              <span>•</span>
              <span>{file.uploadedBy}</span>
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="shrink-0 rounded-lg bg-primary-500 p-2 text-white transition-all hover:bg-primary-600 disabled:opacity-50"
            aria-label={`Descargar ${file.name}`}
          >
            {isDownloading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
          </button>
        </div>
      </Card>
    );
  }

  // Desktop Table View
  return (
    <>
      <td className="px-6 py-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${color} shadow-sm transition-transform group-hover:scale-110`}>
          {icon}
        </div>
      </td>

      <td className="px-6 py-4">
        <span className="font-medium text-white group-hover:text-primary-400 transition-colors">
          {file.name}
        </span>
      </td>

      <td className="px-6 py-4">
        <span className="rounded-full bg-gray-700/50 px-3 py-1 text-sm text-gray-300">
          {formatFileSize(file.size)}
        </span>
      </td>

      <td className="px-6 py-4">
        <span className="rounded-full bg-gray-700/50 px-3 py-1 text-sm text-gray-300">
          {formatRelativeTime(file.updatedAt)}
        </span>
      </td>

      <td className="px-6 py-4">
        <span className="text-sm text-gray-300">
          {file.uploadedBy}
        </span>
      </td>

      <td className="px-6 py-4 text-right">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-primary-600 disabled:opacity-50"
          aria-label={`Descargar ${file.name}`}
        >
          {isDownloading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Descargando...</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              <span>Descargar</span>
            </>
          )}
        </button>
      </td>
    </>
  );
}
