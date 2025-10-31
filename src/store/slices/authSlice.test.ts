/**
 * Auth Slice Tests
 * Tests loadUser and logout actions with different states
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createAuthSlice, AuthSlice } from './authSlice';
import * as apiClient from '@api/client';

// Mock the API client
vi.mock('@api/client', () => ({
  getCurrentUser: vi.fn(),
}));

describe('Auth Slice', () => {
  let authSlice: AuthSlice;
  const mockGetCurrentUser = vi.mocked(apiClient.getCurrentUser);

  beforeEach(() => {
    // Create a fresh auth slice for each test
    authSlice = createAuthSlice(
      (state: any) => {
        Object.assign(authSlice, state);
      },
      () => authSlice
    );

    // Reset mocks
    mockGetCurrentUser.mockClear();
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      expect(authSlice.user.data).toBeNull();
      expect(authSlice.user.status).toBe('idle');
      expect(authSlice.user.error).toBeNull();
    });

    it('should have loadUser and logout functions', () => {
      expect(typeof authSlice.loadUser).toBe('function');
      expect(typeof authSlice.logout).toBe('function');
    });
  });

  describe('loadUser', () => {
    it('should set status to loading before fetching', async () => {
      mockGetCurrentUser.mockImplementation(async () => {
        // Verify status was set to loading synchronously
        expect(authSlice.user.status).toBe('loading');
        return {
          id: 'user_1',
          name: 'Test User',
          email: 'test@example.com',
          roles: ['user'],
          permissions: ['read'],
          createdAt: '2025-01-01T00:00:00Z',
        };
      });

      await authSlice.loadUser();
    });

    it('should load user data successfully', async () => {
      const mockUser = {
        id: 'user_1',
        name: 'John Doe',
        email: 'john@example.com',
        roles: ['user', 'admin'],
        permissions: ['read', 'write'],
        createdAt: '2025-01-01T00:00:00Z',
      };

      mockGetCurrentUser.mockResolvedValue(mockUser);

      await authSlice.loadUser();

      expect(authSlice.user.data).toEqual(mockUser);
      expect(authSlice.user.status).toBe('success');
      expect(authSlice.user.error).toBeNull();
    });

    it('should handle API error correctly', async () => {
      const error = new Error('Network error');
      mockGetCurrentUser.mockRejectedValue(error);

      await authSlice.loadUser();

      expect(authSlice.user.data).toBeNull();
      expect(authSlice.user.status).toBe('error');
      expect(authSlice.user.error).toBeTruthy();
    });

    it('should handle 401 unauthorized error', async () => {
      const unauthorizedError = new Error('Unauthorized');
      mockGetCurrentUser.mockRejectedValue(unauthorizedError);

      await authSlice.loadUser();

      expect(authSlice.user.status).toBe('error');
      expect(authSlice.user.data).toBeNull();
    });

    it('should clear previous error on successful load', async () => {
      // First, set an error state
      authSlice.user = {
        data: null,
        status: 'error',
        error: { code: 'NETWORK_ERROR', message: 'Previous error' },
      };

      const mockUser = {
        id: 'user_1',
        name: 'Test User',
        email: 'test@example.com',
        roles: ['user'],
        permissions: [],
        createdAt: '2025-01-01T00:00:00Z',
      };

      mockGetCurrentUser.mockResolvedValue(mockUser);

      await authSlice.loadUser();

      expect(authSlice.user.error).toBeNull();
      expect(authSlice.user.status).toBe('success');
      expect(authSlice.user.data).toEqual(mockUser);
    });

    it('should call API client once per loadUser', async () => {
      mockGetCurrentUser.mockResolvedValue({
        id: 'user_1',
        name: 'Test User',
        email: 'test@example.com',
        roles: ['user'],
        permissions: [],
        createdAt: '2025-01-01T00:00:00Z',
      });

      await authSlice.loadUser();
      expect(mockGetCurrentUser).toHaveBeenCalledTimes(1);

      await authSlice.loadUser();
      expect(mockGetCurrentUser).toHaveBeenCalledTimes(2);
    });

    it('should preserve error when load fails', async () => {
      const apiError = { code: 'AUTH_ERROR', message: 'Failed to load user' };
      mockGetCurrentUser.mockRejectedValue(apiError);

      await authSlice.loadUser();

      expect(authSlice.user.status).toBe('error');
      expect(authSlice.user.data).toBeNull();
    });
  });

  describe('logout', () => {
    it('should clear user data on logout', () => {
      // First set a user
      authSlice.user = {
        data: {
          id: 'user_1',
          name: 'John Doe',
          email: 'john@example.com',
          roles: ['user'],
          permissions: ['read'],
          createdAt: '2025-01-01T00:00:00Z',
        },
        status: 'success',
        error: null,
      };

      // Then logout
      authSlice.logout();

      expect(authSlice.user.data).toBeNull();
    });

    it('should reset status to idle on logout', () => {
      authSlice.user = {
        data: {
          id: 'user_1',
          name: 'John Doe',
          email: 'john@example.com',
          roles: ['user'],
          permissions: [],
          createdAt: '2025-01-01T00:00:00Z',
        },
        status: 'success',
        error: null,
      };

      authSlice.logout();

      expect(authSlice.user.status).toBe('idle');
    });

    it('should clear error on logout', () => {
      authSlice.user = {
        data: null,
        status: 'error',
        error: { code: 'ERROR', message: 'Some error' },
      };

      authSlice.logout();

      expect(authSlice.user.error).toBeNull();
    });

    it('should reset to initial state on logout', () => {
      authSlice.user = {
        data: {
          id: 'user_1',
          name: 'John Doe',
          email: 'john@example.com',
          roles: ['admin'],
          permissions: ['read', 'write', 'delete'],
          createdAt: '2025-01-01T00:00:00Z',
        },
        status: 'success',
        error: null,
      };

      authSlice.logout();

      expect(authSlice.user.data).toBeNull();
      expect(authSlice.user.status).toBe('idle');
      expect(authSlice.user.error).toBeNull();
    });

    it('should be idempotent - can logout multiple times', () => {
      authSlice.logout();
      expect(authSlice.user.data).toBeNull();

      // Logout again should not cause errors
      authSlice.logout();
      expect(authSlice.user.data).toBeNull();
      expect(authSlice.user.status).toBe('idle');
    });
  });

  describe('State Transitions', () => {
    it('should transition from idle to loading to success', async () => {
      expect(authSlice.user.status).toBe('idle');

      mockGetCurrentUser.mockImplementation(async () => {
        expect(authSlice.user.status).toBe('loading');
        return {
          id: 'user_1',
          name: 'Test User',
          email: 'test@example.com',
          roles: [],
          permissions: [],
          createdAt: '2025-01-01T00:00:00Z',
        };
      });

      await authSlice.loadUser();

      expect(authSlice.user.status).toBe('success');
    });

    it('should transition from idle to loading to error', async () => {
      expect(authSlice.user.status).toBe('idle');

      mockGetCurrentUser.mockImplementation(async () => {
        expect(authSlice.user.status).toBe('loading');
        throw new Error('API Error');
      });

      await authSlice.loadUser();

      expect(authSlice.user.status).toBe('error');
    });

    it('should transition from success to idle on logout', () => {
      authSlice.user = {
        data: {
          id: 'user_1',
          name: 'Test User',
          email: 'test@example.com',
          roles: ['user'],
          permissions: [],
          createdAt: '2025-01-01T00:00:00Z',
        },
        status: 'success',
        error: null,
      };

      expect(authSlice.user.status).toBe('success');
      authSlice.logout();
      expect(authSlice.user.status).toBe('idle');
    });

    it('should transition from error to idle on logout', () => {
      authSlice.user = {
        data: null,
        status: 'error',
        error: { code: 'ERROR', message: 'Error message' },
      };

      expect(authSlice.user.status).toBe('error');
      authSlice.logout();
      expect(authSlice.user.status).toBe('idle');
    });

    it('should transition from success to success on reload', async () => {
      // Set initial user
      const user1 = {
        id: 'user_1',
        name: 'User One',
        email: 'user1@example.com',
        roles: ['user'],
        permissions: [],
        createdAt: '2025-01-01T00:00:00Z',
      };

      authSlice.user = {
        data: user1,
        status: 'success',
        error: null,
      };

      // Reload with new user data (simulating user update)
      const user2 = {
        id: 'user_1',
        name: 'User One Updated',
        email: 'user1@example.com',
        roles: ['user', 'admin'],
        permissions: ['read', 'write'],
        createdAt: '2025-01-01T00:00:00Z',
      };

      mockGetCurrentUser.mockResolvedValue(user2);

      await authSlice.loadUser();

      expect(authSlice.user.status).toBe('success');
      expect(authSlice.user.data?.name).toBe('User One Updated');
      expect(authSlice.user.data?.roles).toContain('admin');
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors gracefully', async () => {
      const networkError = new Error('Network timeout');
      mockGetCurrentUser.mockRejectedValue(networkError);

      await authSlice.loadUser();

      expect(authSlice.user.status).toBe('error');
      expect(authSlice.user.data).toBeNull();
      expect(authSlice.user.error).toBeTruthy();
    });

    it('should handle API error objects', async () => {
      const apiError = {
        code: 'AUTH_FAILED',
        message: 'Authentication failed',
        details: { reason: 'invalid_token' },
      };
      mockGetCurrentUser.mockRejectedValue(apiError);

      await authSlice.loadUser();

      expect(authSlice.user.status).toBe('error');
      expect(authSlice.user.error).toBeTruthy();
    });

    it('should handle unknown error types', async () => {
      mockGetCurrentUser.mockRejectedValue('Unknown error');

      await authSlice.loadUser();

      expect(authSlice.user.status).toBe('error');
      expect(authSlice.user.data).toBeNull();
    });
  });
});
