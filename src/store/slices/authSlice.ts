/**
 * Auth Slice
 * Manages user authentication state
 */

import type { StateCreator } from 'zustand';
import type { User, AsyncState } from '@types';
import { getCurrentUser } from '@api/client';

export interface AuthSlice {
  user: AsyncState<User>;
  loadUser: () => Promise<void>;
  logout: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = set => ({
  user: {
    data: null,
    status: 'idle',
    error: null,
  },

  loadUser: async () => {
    set(state => ({
      user: { ...state.user, status: 'loading', error: null },
    }));

    try {
      const data = await getCurrentUser();
      set({ user: { data, status: 'success', error: null } });
    } catch (error) {
      set({
        user: {
          data: null,
          status: 'error',
          error: error as never,
        },
      });
    }
  },

  logout: () => {
    set({
      user: {
        data: null,
        status: 'idle',
        error: null,
      },
    });
  },
});
