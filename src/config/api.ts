/**
 * API Configuration
 * Centralized configuration for API endpoints and settings
 */

/**
 * Get environment variable with fallback
 */
const getEnvVar = (key: string, fallback: string): string => {
  return import.meta.env[key] || fallback;
};

/**
 * API Configuration
 */
export const API_CONFIG = {
  // Base URL del backend
  BASE_URL: getEnvVar('VITE_API_BASE_URL', 'http://localhost:3000'),

  // Timeout para peticiones (en ms)
  TIMEOUT: 30000, // 30 segundos

  // Modo de desarrollo (usa mock API si es true)
  USE_MOCK_API: getEnvVar('VITE_USE_MOCK_API', 'true') === 'true',

  // Headers por defecto
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
} as const;

/**
 * API Endpoints
 * Todas las rutas del backend organizadas por recurso
 */
export const API_ENDPOINTS = {
  // Auth
  auth: {
    me: '/api/me',
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh',
  },

  // Chats
  chats: {
    list: '/api/chats',
    create: '/api/chats',
    detail: (chatId: string) => `/api/chats/${chatId}`,
    messages: (chatId: string) => `/api/chats/${chatId}/messages`,
    sendMessage: (chatId: string) => `/api/chats/${chatId}/messages`,
  },

  // Files
  files: {
    folders: '/api/folders',
    folderDetail: (folderId: string) => `/api/folders/${folderId}`,
    folderFiles: (folderId: string) => `/api/folders/${folderId}/files`,
    upload: (folderId: string) => `/api/folders/${folderId}/upload`,
    download: (fileId: string) => `/api/files/${fileId}/download`,
    delete: (fileId: string) => `/api/files/${fileId}`,
  },
} as const;

/**
 * Build full URL from endpoint
 */
export const buildUrl = (endpoint: string, params?: Record<string, string | number>): string => {
  const url = new URL(endpoint, API_CONFIG.BASE_URL);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  return url.toString();
};

/**
 * Get auth token from storage
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

/**
 * Set auth token in storage
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

/**
 * Clear auth token from storage
 */
export const clearAuthToken = (): void => {
  localStorage.removeItem('auth_token');
};

/**
 * Get authorization headers
 */
export const getAuthHeaders = (): Record<string, string> => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
