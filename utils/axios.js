// utils/axios.js

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || 'http://localhost:5000/api/v1/',
  withCredentials: true,
  timeout: 10000,
});

// Retry configuration for 429 errors
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

// Helper function to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to get retry delay from response headers or use default
const getRetryDelay = (error) => {
  const retryAfter = error.response?.headers['retry-after'];
  if (retryAfter) {
    return parseInt(retryAfter) * 1000; // Convert seconds to milliseconds
  }
  return RETRY_DELAY;
};

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    
    // Initialize retry count if not present
    if (!config._retryCount) {
      config._retryCount = 0;
    }
    
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // Handle 429 (Rate Limit) errors with retry logic
    if (error.response?.status === 429 && originalRequest && originalRequest._retryCount < MAX_RETRIES) {
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
      
      const retryDelay = getRetryDelay(error);
      
      console.warn(`Rate limit exceeded. Retrying request (${originalRequest._retryCount}/${MAX_RETRIES}) after ${retryDelay}ms...`);
      
      // Wait before retrying
      await delay(retryDelay);
      
      // Retry the request
      return api(originalRequest);
    }
    
    // Handle 429 errors that exceeded max retries
    if (error.response?.status === 429) {
      const retryAfter = error.response?.headers['retry-after'];
      const waitTime = retryAfter ? `${retryAfter} seconds` : 'a few moments';
      
      // Add user-friendly error message
      error.userMessage = `Too many requests. Please wait ${waitTime} before trying again.`;
      error.isRateLimit = true;
      
      console.error('Rate limit exceeded. Maximum retries reached.');
    }
    
    // Log other errors
    if (error.response?.status !== 429) {
      console.error('API Error:', error.response?.data || error.message);
    }
    
    return Promise.reject(error);
  }
);

// Export helper function for handling 429 errors in components
export const handleApiError = (error, defaultMessage = 'An error occurred') => {
  if (error.response?.status === 429) {
    return error.userMessage || 'Too many requests. Please wait a moment before trying again.';
  }
  
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return defaultMessage;
};

// Export helper function to check if error is rate limit
export const isRateLimitError = (error) => {
  return error.response?.status === 429 || error.isRateLimit === true;
};

export default api;