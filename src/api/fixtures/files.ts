/**
 * Files & Folders Fixtures
 */

import { faker } from '@faker-js/faker';
import type { Folder, FileItem } from '@types';

// Mock folders
export const mockFolders: Folder[] = [
  {
    id: 'folder_001',
    name: 'Documentos Generales',
    owner: 'Juan Pérez',
    canUpload: true,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-10-20T15:30:00Z',
  },
  {
    id: 'folder_002',
    name: 'Recursos Compartidos',
    owner: 'María González',
    canUpload: true,
    createdAt: '2024-02-05T09:00:00Z',
    updatedAt: '2024-10-25T11:20:00Z',
  },
  {
    id: 'folder_003',
    name: 'Archivos de Solo Lectura',
    owner: 'Admin',
    canUpload: false,
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-10-15T10:00:00Z',
  },
];

// Generate mock files for a folder
const mimeTypes = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'text/plain',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const generateFiles = (folderId: string, count: number): FileItem[] => {
  return Array.from({ length: count }, (_, i) => {
    const mimeType = faker.helpers.arrayElement(mimeTypes);
    const ext = mimeType.split('/')[1].split('.').pop() || 'dat';

    return {
      id: `file_${folderId}_${String(i + 1).padStart(3, '0')}`,
      folderId,
      name: `${faker.system.fileName().split('.')[0]}.${ext}`,
      mimeType,
      size: faker.number.int({ min: 1024, max: 15 * 1024 * 1024 }), // 1KB to 15MB
      uploadedBy: faker.helpers.arrayElement(['Juan Pérez', 'María González', 'Carlos Ruiz']),
      createdAt: faker.date.past({ years: 1 }).toISOString(),
      updatedAt: faker.date.recent({ days: 30 }).toISOString(),
    };
  });
};

// Files cache
export const mockFilesCache: Record<string, FileItem[]> = {
  folder_001: generateFiles('folder_001', 12),
  folder_002: generateFiles('folder_002', 8),
  folder_003: generateFiles('folder_003', 5),
};
