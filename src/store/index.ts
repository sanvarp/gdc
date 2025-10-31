/**
 * Main Store
 * Combines all slices using Zustand
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createAuthSlice, type AuthSlice } from './slices/authSlice';
import { createUISlice, type UISlice } from './slices/uiSlice';
import { createChatsSlice, type ChatsSlice } from './slices/chatsSlice';
import { createFilesSlice, type FilesSlice } from './slices/filesSlice';

export type AppStore = AuthSlice & UISlice & ChatsSlice & FilesSlice;

export const useStore = create<AppStore>()(
  devtools((...args) => ({
    ...createAuthSlice(...args),
    ...createUISlice(...args),
    ...createChatsSlice(...args),
    ...createFilesSlice(...args),
  }))
);

// Selectors for better performance
export const selectUser = (state: AppStore) => state.user;
export const selectSidebarOpen = (state: AppStore) => state.sidebarOpen;
export const selectChats = (state: AppStore) => state.list;
export const selectActiveChat = (state: AppStore) => state.activeId;
export const selectFolders = (state: AppStore) => state.folders;
export const selectToasts = (state: AppStore) => state.toasts;
