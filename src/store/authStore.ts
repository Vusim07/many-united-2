import { create } from 'zustand';
import { User, LoginCredentials } from '../types/auth';
import { mockUsers } from '../lib/mockData';

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: async (email: string, password: string) => {
    // Simulate API call
    const user = mockUsers.find((u) => u.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    set({ user });
  },
  logout: () => set({ user: null }),
}));

export const getRedirectPath = (role?: string) => {
  switch (role) {
    case 'doctor':
      return '/doctor';
    case 'chw':
      return '/chw';
    case 'admin':
      return '/admin';
    default:
      return '/login';
  }
};