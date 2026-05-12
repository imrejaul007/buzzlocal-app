import { feedApi } from './api';

const EVENTS_BASE_URL = process.env.EXPO_PUBLIC_EVENTS_URL || 'http://localhost:4008';

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string;
  category: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    area?: string;
    city?: string;
  };
  startDate: string;
  endDate?: string;
  startTime: string;
  endTime?: string;
  organizer: {
    id: string;
    name: string;
    verified: boolean;
  };
  isPaid: boolean;
  ticketPrice?: number;
  maxAttendees?: number;
  currentAttendees: number;
  interestedCount: number;
  savedCount: number;
  status: string;
  qrCode?: string;
  isInterested?: boolean;
  predictedAttendance?: number;
  predictedPeakTime?: string;
}

export interface Ticket {
  id: string;
  ticketCode: string;
  quantity: number;
  totalAmount: number;
  status: string;
  purchasedAt: string;
  checkedInAt?: string;
  event: Event | null;
}

export const eventsService = {
  /**
   * Get events with filters
   */
  getEvents: async (params?: {
    category?: string;
    lat?: number;
    lng?: number;
    radius?: number;
    page?: number;
    limit?: number;
  }): Promise<{ events: Event[]; page: number; limit: number; total: number; hasMore: boolean }> => {
    try {
      const response = await feedApi.get(`${EVENTS_BASE_URL}/events`, { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch events:', error);
      throw new Error('Failed to fetch events');
    }
  },

  /**
   * Get trending events
   */
  getTrendingEvents: async (limit: number = 10): Promise<{ events: Event[] }> => {
    try {
      const response = await feedApi.get(`${EVENTS_BASE_URL}/events/trending`, { params: { limit } });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch trending events:', error);
      throw new Error('Failed to fetch trending events');
    }
  },

  /**
   * Get nearby events
   */
  getNearbyEvents: async (params: {
    lat: number;
    lng: number;
    radius?: number;
    limit?: number;
  }): Promise<{ events: Event[] }> => {
    try {
      const response = await feedApi.get(`${EVENTS_BASE_URL}/events/nearby`, { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch nearby events:', error);
      throw new Error('Failed to fetch nearby events');
    }
  },

  /**
   * Get single event
   */
  getEvent: async (eventId: string): Promise<Event> => {
    try {
      const response = await feedApi.get(`${EVENTS_BASE_URL}/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch event:', error);
      throw new Error('Failed to fetch event');
    }
  },

  /**
   * Express interest in event
   */
  expressInterest: async (eventId: string): Promise<{ interested: boolean }> => {
    try {
      const response = await feedApi.post(`${EVENTS_BASE_URL}/events/${eventId}/interest`);
      return response.data;
    } catch (error) {
      console.error('Failed to express interest:', error);
      throw new Error('Failed to express interest');
    }
  },

  /**
   * Purchase ticket
   */
  purchaseTicket: async (eventId: string, quantity: number = 1): Promise<{ ticket: Ticket; qrCode: string }> => {
    try {
      const response = await feedApi.post(`${EVENTS_BASE_URL}/tickets`, {
        eventId,
        quantity,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to purchase ticket:', error);
      throw new Error('Failed to purchase ticket');
    }
  },

  /**
   * Get user's tickets
   */
  getUserTickets: async (): Promise<{ tickets: Ticket[] }> => {
    try {
      const response = await feedApi.get(`${EVENTS_BASE_URL}/tickets/user`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
      throw new Error('Failed to fetch tickets');
    }
  },

  /**
   * Check in with ticket
   */
  checkIn: async (ticketCode: string): Promise<{ success: boolean; ticket: Ticket }> => {
    try {
      const response = await feedApi.post(`${EVENTS_BASE_URL}/tickets/checkin`, {
        ticketCode,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to check in:', error);
      throw new Error('Check-in failed');
    }
  },
};
