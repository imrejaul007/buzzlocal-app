import { feedApi } from './api';
import { Post, FeedItem, PaginatedResponse, AICard } from '@/types';

interface CreatePostData {
  type: Post['type'];
  content: string;
  media?: { type: 'image' | 'video'; url: string }[];
  location?: { latitude: number; longitude: number; area?: string };
  tags?: string[];
  eventDate?: string;
  alertCategory?: string;
  alertSeverity?: 'low' | 'medium' | 'high';
  pollOptions?: string[];
}

export const feedService = {
  /**
   * Get personalized feed
   */
  getFeed: async (
    page: number = 1,
    limit: number = 20,
    location?: { latitude: number; longitude: number }
  ): Promise<PaginatedResponse<FeedItem>> => {
    try {
      const response = await feedApi.get('/feed', {
        params: { page, limit, ...location },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch feed.');
    }
  },

  /**
   * Get a single post
   */
  getPost: async (postId: string): Promise<Post> => {
    try {
      const response = await feedApi.get(`/posts/${postId}`);
      return response.data;
    } catch (error) {
      throw new Error('Post not found.');
    }
  },

  /**
   * Create a new post
   */
  createPost: async (data: CreatePostData): Promise<Post & { coinReward: number }> => {
    try {
      const response = await feedApi.post('/posts', data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create post.');
    }
  },

  /**
   * Like a post
   */
  likePost: async (postId: string): Promise<{ likes: number }> => {
    try {
      const response = await feedApi.post(`/posts/${postId}/like`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to like post.');
    }
  },

  /**
   * Unlike a post
   */
  unlikePost: async (postId: string): Promise<{ likes: number }> => {
    try {
      const response = await feedApi.delete(`/posts/${postId}/like`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to unlike post.');
    }
  },

  /**
   * Save a post
   */
  savePost: async (postId: string): Promise<{ saved: boolean }> => {
    try {
      const response = await feedApi.post(`/posts/${postId}/save`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to save post.');
    }
  },

  /**
   * Get AI cards for the feed
   */
  getAICards: async (location?: { latitude: number; longitude: number }): Promise<AICard[]> => {
    try {
      const response = await feedApi.get('/feed/ai-cards', { params: location });
      return response.data.cards;
    } catch (error) {
      throw new Error('Failed to fetch AI cards.');
    }
  },

  /**
   * Search posts
   */
  searchPosts: async (query: string, filters?: {
    type?: Post['type'];
    location?: { latitude: number; longitude: number; radius: number };
  }): Promise<Post[]> => {
    try {
      const response = await feedApi.get('/posts/search', {
        params: { q: query, ...filters },
      });
      return response.data.posts;
    } catch (error) {
      throw new Error('Search failed.');
    }
  },
};
