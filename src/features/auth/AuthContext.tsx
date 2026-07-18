/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User } from '../../services/auth.service';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on load
    const token = authService.getToken();
    if (token) {
      // In a real app, you might fetch user profile here
      const savedUser = localStorage.getItem('lendsqr_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    authService.setToken(token);
    localStorage.setItem('lendsqr_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    authService.logout();
    localStorage.removeItem('lendsqr_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
