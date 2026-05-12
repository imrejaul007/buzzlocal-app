import { walletApi } from './api';
import { Transaction } from '@/types';

interface WalletBalance {
  balance: number;
  currency: string;
  lastUpdated: string;
}

interface TransactionList {
  transactions: Transaction[];
  total: number;
  page: number;
  hasMore: boolean;
}

export const walletService = {
  /**
   * Get wallet balance
   */
  getBalance: async (): Promise<WalletBalance> => {
    try {
      const response = await walletApi.get('/wallet/balance');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch balance.');
    }
  },

  /**
   * Get transaction history
   */
  getTransactions: async (page: number = 1, limit: number = 20): Promise<TransactionList> => {
    try {
      const response = await walletApi.get('/wallet/transactions', {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch transactions.');
    }
  },

  /**
   * Earn coins (from posting, engagement, etc.)
   */
  earnCoins: async (amount: number, reason: string, relatedId?: string): Promise<{ newBalance: number }> => {
    try {
      const response = await walletApi.post('/wallet/earn', {
        amount,
        reason,
        relatedId,
        source: 'buzzlocal',
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to earn coins.');
    }
  },

  /**
   * Spend coins (redeem offers, etc.)
   */
  spendCoins: async (amount: number, reason: string, merchantId?: string): Promise<{ newBalance: number }> => {
    try {
      const response = await walletApi.post('/wallet/spend', {
        amount,
        reason,
        merchantId,
        destination: 'buzzlocal',
      });
      return response.data;
    } catch (error) {
      throw new Error('Insufficient coins or failed transaction.');
    }
  },

  /**
   * Transfer coins to another user
   */
  transferCoins: async (toUserId: string, amount: number, note?: string): Promise<{ newBalance: number }> => {
    try {
      const response = await walletApi.post('/wallet/transfer', {
        toUserId,
        amount,
        note,
      });
      return response.data;
    } catch (error) {
      throw new Error('Transfer failed.');
    }
  },
};
