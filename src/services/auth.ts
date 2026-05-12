import { authApi } from './api';
import { User } from '@/types';

interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

interface RegisterData {
  phone: string;
  name: string;
  interests?: string[];
}

export const authService = {
  /**
   * Send OTP to phone number
   */
  sendOtp: async (phone: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await authApi.post('/user/auth/send-otp', { phone });
      return response.data;
    } catch (error) {
      throw new Error('Failed to send OTP. Please try again.');
    }
  },

  /**
   * Verify OTP
   */
  verifyOtp: async (phone: string, otp: string): Promise<LoginResponse> => {
    try {
      const response = await authApi.post('/user/auth/verify-otp', { phone, otp });
      return response.data;
    } catch (error) {
      throw new Error('Invalid OTP. Please try again.');
    }
  },

  /**
   * Register new user
   */
  register: async (data: RegisterData): Promise<LoginResponse> => {
    try {
      const response = await authApi.post('/user/auth/register', data);
      return response.data;
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    }
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<User> => {
    try {
      const response = await authApi.get('/user/profile');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch profile.');
    }
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: Partial<User>): Promise<User> => {
    try {
      const response = await authApi.patch('/user/profile', data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update profile.');
    }
  },

  /**
   * Update user interests
   */
  updateInterests: async (interests: string[]): Promise<{ success: boolean }> => {
    try {
      const response = await authApi.patch('/user/profile/interests', { interests });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update interests.');
    }
  },

  /**
   * Refresh access token
   */
  refreshToken: async (refreshToken: string): Promise<{ token: string }> => {
    try {
      const response = await authApi.post('/user/auth/refresh', { refreshToken });
      return response.data;
    } catch (error) {
      throw new Error('Session expired. Please login again.');
    }
  },

  /**
   * Logout
   */
  logout: async (): Promise<void> => {
    try {
      await authApi.post('/user/auth/logout');
    } catch (error) {
      // Ignore logout errors
    }
  },
};
