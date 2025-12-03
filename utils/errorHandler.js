// utils/errorHandler.js
// Utility functions for handling API errors consistently across the application

import { handleApiError, isRateLimitError } from './axios';

/**
 * Handles API errors and returns a user-friendly message
 * @param {Error} error - The error object from axios
 * @param {string} defaultMessage - Default message if error doesn't have a specific message
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (error, defaultMessage = 'An error occurred') => {
  return handleApiError(error, defaultMessage);
};

/**
 * Checks if the error is a rate limit (429) error
 * @param {Error} error - The error object from axios
 * @returns {boolean} True if it's a rate limit error
 */
export const isRateLimit = (error) => {
  return isRateLimitError(error);
};

/**
 * Gets the retry delay from error headers
 * @param {Error} error - The error object from axios
 * @returns {number} Retry delay in seconds, or null if not available
 */
export const getRetryAfter = (error) => {
  if (error.response?.status === 429) {
    const retryAfter = error.response?.headers['retry-after'];
    return retryAfter ? parseInt(retryAfter) : null;
  }
  return null;
};

/**
 * Formats error message for display in UI
 * @param {Error} error - The error object from axios
 * @param {string} context - Context of where the error occurred (e.g., "fetching transactions")
 * @returns {string} Formatted error message
 */
export const formatError = (error, context = '') => {
  if (isRateLimitError(error)) {
    const retryAfter = getRetryAfter(error);
    if (retryAfter) {
      return `Too many requests. Please wait ${retryAfter} second${retryAfter > 1 ? 's' : ''} before ${context || 'trying again'}.`;
    }
    return `Too many requests. Please wait a moment before ${context || 'trying again'}.`;
  }
  
  const message = getErrorMessage(error);
  return context ? `${context}: ${message}` : message;
};

