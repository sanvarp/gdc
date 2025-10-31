/**
 * HTTP Client
 * Real API client using fetch
 * Switch to this when backend is ready
 */

import { API_CONFIG, buildUrl, getAuthHeaders } from '@/config/api';
import type { ApiError } from '@types';

/**
 * Custom error class for API errors
 */
class HttpError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

/**
 * Parse error response from backend
 */
const parseErrorResponse = async (response: Response): Promise<ApiError> => {
  try {
    const data = await response.json();
    return {
      code: data.code || `HTTP_${response.status}`,
      message: data.message || response.statusText,
      details: data.details,
    };
  } catch {
    return {
      code: `HTTP_${response.status}`,
      message: response.statusText,
    };
  }
};

/**
 * Make HTTP request with automatic error handling
 */
const request = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        ...API_CONFIG.DEFAULT_HEADERS,
        ...getAuthHeaders(),
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    // Handle non-OK responses
    if (!response.ok) {
      const error = await parseErrorResponse(response);
      throw new HttpError(response.status, error.code, error.message, error.details);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    // Parse JSON response
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    // Handle abort/timeout
    if (error instanceof Error && error.name === 'AbortError') {
      throw {
        code: 'TIMEOUT',
        message: 'Request timeout',
      } as ApiError;
    }

    // Handle network errors
    if (error instanceof TypeError) {
      throw {
        code: 'NETWORK_ERROR',
        message: 'Network error - check your connection',
      } as ApiError;
    }

    // Re-throw API errors
    if (error instanceof HttpError) {
      throw {
        code: error.code,
        message: error.message,
        details: error.details,
      } as ApiError;
    }

    // Unknown error
    throw {
      code: 'UNKNOWN_ERROR',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    } as ApiError;
  }
};

/**
 * HTTP Methods
 */
export const http = {
  /**
   * GET request
   */
  get: <T>(endpoint: string, params?: Record<string, string | number>): Promise<T> => {
    const url = buildUrl(endpoint, params);
    return request<T>(url, { method: 'GET' });
  },

  /**
   * POST request
   */
  post: <T>(endpoint: string, data?: unknown): Promise<T> => {
    const url = buildUrl(endpoint);
    return request<T>(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  /**
   * PUT request
   */
  put: <T>(endpoint: string, data?: unknown): Promise<T> => {
    const url = buildUrl(endpoint);
    return request<T>(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  /**
   * PATCH request
   */
  patch: <T>(endpoint: string, data?: unknown): Promise<T> => {
    const url = buildUrl(endpoint);
    return request<T>(url, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  /**
   * DELETE request
   */
  delete: <T>(endpoint: string): Promise<T> => {
    const url = buildUrl(endpoint);
    return request<T>(url, { method: 'DELETE' });
  },

  /**
   * Upload file (multipart/form-data)
   */
  upload: <T>(endpoint: string, file: File, additionalData?: Record<string, string>): Promise<T> => {
    const url = buildUrl(endpoint);
    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    return request<T>(url, {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type, let browser set it with boundary
        ...getAuthHeaders(),
      },
    });
  },
};
