/**
 * Files Slice
 * Manages folders and files
 */

import type { StateCreator } from 'zustand';
import type { Folder, FileItem, AsyncState } from '@types';
import { getFolders, getFolderFiles, uploadFile } from '@api/client';

export interface FilesSlice {
  folders: AsyncState<Folder[]>;
  filesByFolder: Record<string, AsyncState<FileItem[]>>;
  uploading: boolean;

  loadFolders: () => Promise<void>;
  loadFolderFiles: (folderId: string) => Promise<void>;
  uploadFileToFolder: (folderId: string, file: File) => Promise<void>;
}

export const createFilesSlice: StateCreator<FilesSlice> = set => ({
  folders: { data: null, status: 'idle', error: null },
  filesByFolder: {},
  uploading: false,

  loadFolders: async () => {
    set(state => ({
      folders: { ...state.folders, status: 'loading', error: null },
    }));

    try {
      const response = await getFolders();
      set({
        folders: { data: response.items, status: 'success', error: null },
      });
    } catch (error) {
      set({
        folders: { data: null, status: 'error', error: error as never },
      });
    }
  },

  loadFolderFiles: async (folderId: string) => {
    set(state => ({
      filesByFolder: {
        ...state.filesByFolder,
        [folderId]: {
          data: state.filesByFolder[folderId]?.data || null,
          status: 'loading',
          error: null,
        },
      },
    }));

    try {
      const response = await getFolderFiles(folderId);
      set(state => ({
        filesByFolder: {
          ...state.filesByFolder,
          [folderId]: { data: response.items, status: 'success', error: null },
        },
      }));
    } catch (error) {
      set(state => ({
        filesByFolder: {
          ...state.filesByFolder,
          [folderId]: { data: null, status: 'error', error: error as never },
        },
      }));
    }
  },

  uploadFileToFolder: async (folderId: string, file: File) => {
    set({ uploading: true });

    try {
      const response = await uploadFile(folderId, file);

      // Add file to folder's list
      set(state => {
        const currentFiles = state.filesByFolder[folderId]?.data || [];
        return {
          filesByFolder: {
            ...state.filesByFolder,
            [folderId]: {
              data: [response.file, ...currentFiles],
              status: 'success',
              error: null,
            },
          },
          uploading: false,
        };
      });
    } catch (error) {
      set({ uploading: false });
      throw error;
    }
  },
});
