/**
 * UI Slice
 * Manages UI state (sidebar, modals, toasts)
 */

import type { StateCreator } from 'zustand';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface UISlice {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toasts: Toast[];
  showToast: (type: Toast['type'], message: string) => void;
  dismissToast: (id: string) => void;
}

export const createUISlice: StateCreator<UISlice> = set => ({
  sidebarOpen: true,

  toggleSidebar: () => {
    set(state => ({ sidebarOpen: !state.sidebarOpen }));
  },

  setSidebarOpen: (open: boolean) => {
    set({ sidebarOpen: open });
  },

  toasts: [],

  showToast: (type, message) => {
    const id = `toast_${Date.now()}`;
    set(state => ({
      toasts: [...state.toasts, { id, type, message }],
    }));

    // Auto-dismiss after 5s
    setTimeout(() => {
      set(state => ({
        toasts: state.toasts.filter(t => t.id !== id),
      }));
    }, 5000);
  },

  dismissToast: (id: string) => {
    set(state => ({
      toasts: state.toasts.filter(t => t.id !== id),
    }));
  },
});
