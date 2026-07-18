/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { User, UserStats } from '../types/user';

const API_BASE = '/api';

export interface UsersResponse {
  data: User[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface UserFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  organization?: string;
  username?: string;
  email?: string;
  phone_number?: string;
  date_joined?: string;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

export const api = {
  async getUsers(filters: UserFilters = {}): Promise<UsersResponse> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_BASE}/users?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  },

  async getUserById(id: string): Promise<User> {
    const response = await fetch(`${API_BASE}/users/${id}`);
    if (!response.ok) {
      if (response.status === 404) throw new Error('User not found');
      throw new Error('Failed to fetch user details');
    }
    return response.json();
  },

  async getStats(): Promise<UserStats> {
    const response = await fetch(`${API_BASE}/stats`);
    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }
    return response.json();
  }
};
