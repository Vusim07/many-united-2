import { create } from 'zustand';
import { CHWData } from '@/types/admin';

interface CHWState {
  chws: CHWData[];
  addCHW: (chw: Omit<CHWData, 'id' | 'status' | 'joinDate'>) => void;
  updateCHW: (id: string, updates: Partial<CHWData>) => void;
  importCHWs: (chws: CHWData[]) => void;
}

export const useCHWStore = create<CHWState>((set) => ({
  chws: [],
  
  addCHW: (chw) => set((state) => ({
    chws: [
      ...state.chws,
      {
        id: crypto.randomUUID(),
        status: 'active',
        joinDate: new Date().toISOString(),
        ...chw
      }
    ]
  })),

  updateCHW: (id, updates) => set((state) => ({
    chws: state.chws.map(chw =>
      chw.id === id
        ? { ...chw, ...updates }
        : chw
    )
  })),

  importCHWs: (chws) => set((state) => ({
    chws: [...state.chws, ...chws]
  }))
}));