import { create } from 'zustand';
import { SystemSettings } from '@/types/admin';

interface AdminState {
  settings: SystemSettings;
  updateSettings: (updates: Partial<SystemSettings>) => void;
  metrics: {
    totalUsers: number;
    activeVisits: number;
    completedVisits: number;
    systemHealth: 'healthy' | 'warning' | 'critical';
  };
}

const defaultSettings: SystemSettings = {
  emailNotifications: true,
  autoAssignment: true,
  maxVisitsPerDay: 10,
  requireVisitApproval: true,
  maintenanceMode: false
};

export const useAdminStore = create<AdminState>((set) => ({
  settings: defaultSettings,
  metrics: {
    totalUsers: 0,
    activeVisits: 0,
    completedVisits: 0,
    systemHealth: 'healthy'
  },

  updateSettings: (updates) => set((state) => ({
    settings: {
      ...state.settings,
      ...updates
    }
  }))
}));