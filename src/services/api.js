import { API_BASE_URL } from '@constants';

/**
 * Base API service configuration
 * Provides methods for making HTTP requests
 */

/**
 * Makes a fetch request with common configuration
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} Response data
 */
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * GET request
 * @param {string} endpoint - API endpoint
 * @returns {Promise<any>} Response data
 */
export const get = (endpoint) => fetchAPI(endpoint);

/**
 * POST request
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request body
 * @returns {Promise<any>} Response data
 */
export const post = (endpoint, data) =>
  fetchAPI(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });

/**
 * PUT request
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request body
 * @returns {Promise<any>} Response data
 */
export const put = (endpoint, data) =>
  fetchAPI(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

/**
 * DELETE request
 * @param {string} endpoint - API endpoint
 * @returns {Promise<any>} Response data
 */
export const del = (endpoint) =>
  fetchAPI(endpoint, {
    method: 'DELETE',
  });
