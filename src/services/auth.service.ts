/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LoginFormValues } from '../features/auth/auth-schema';

const AUTH_TOKEN_KEY = 'lendsqr_auth_token';

export interface User {
  id: string;
  email: string;
  name: string;
}

class AuthService {
  /**
   * Simulates an API call for login
   * In a real app, this would use axios or fetch to your backend
   */
  async login(credentials: LoginFormValues): Promise<{ user: User; token: string }> {
    // Artificial delay to simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock successful login
    const mockUser: User = {
      id: '1',
      email: credentials.email,
      name: 'Adedeji',
    };
    
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Dummy JWT

    this.setToken(mockToken);
    return { user: mockUser, token: mockToken };
  }

  setToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    window.location.href = '/login';
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();
