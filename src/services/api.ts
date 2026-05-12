import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

// API Base URLs - These will come from environment
const AUTH_BASE_URL = process.env.EXPO_PUBLIC_AUTH_URL || 'https://rez-auth-service.onrender.com';
const WALLET_BASE_URL = process.env.EXPO_PUBLIC_WALLET_URL || 'https://rez-wallet-service.onrender.com';
const FEED_BASE_URL = process.env.EXPO_PUBLIC_FEED_URL || 'http://localhost:4000';
const MIND_BASE_URL = process.env.EXPO_PUBLIC_MIND_URL || 'https://rez-mind.onrender.com';

// Create axios instances
const createApiInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      // Add auth token if available
      // In production, get from secure storage
      const token = null; // Will be implemented with secure storage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Add internal service token for service-to-service calls
      const internalToken = process.env.INTERNAL_SERVICE_TOKEN;
      if (internalToken) {
        config.headers['X-Internal-Token'] = internalToken;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        // Handle unauthorized - redirect to login
        console.log('Unauthorized - need to login');
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// API instances
export const authApi = createApiInstance(AUTH_BASE_URL);
export const walletApi = createApiInstance(WALLET_BASE_URL);
export const feedApi = createApiInstance(FEED_BASE_URL);
export const mindApi = createApiInstance(MIND_BASE_URL);

// Generic API error handler
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return axiosError.response?.data?.message || axiosError.message || 'An error occurred';
  }
  return 'An unexpected error occurred';
};
