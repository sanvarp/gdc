/**
 * API Mock Utilities
 * Helpers for simulating API behavior
 */

import type { ApiError } from '@types';

/**
 * Simulates network delay
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Random delay between min and max ms
 */
export const randomDelay = (min = 200, max = 1200): Promise<void> => {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return delay(ms);
};

/**
 * Throws ApiError randomly based on failure rate
 * @param failureRate - Probability of failure (0-1), default 0.1 (10%)
 */
export const maybeFail = (failureRate = 0.1): void => {
  if (Math.random() < failureRate) {
    throw createApiError('NETWORK_ERROR', 'Simulated network failure');
  }
};

/**
 * Creates a structured API error
 */
export const createApiError = (
  code: string,
  message: string,
  details?: Record<string, unknown>
): ApiError => {
  return { code, message, details };
};

/**
 * Simulates paginated cursor
 */
export const createCursor = (page: number): string => {
  return Buffer.from(JSON.stringify({ page })).toString('base64');
};

/**
 * Decodes paginated cursor
 */
export const decodeCursor = (cursor: string): number => {
  try {
    const decoded = JSON.parse(Buffer.from(cursor, 'base64').toString());
    return decoded.page || 0;
  } catch {
    return 0;
  }
};
