import { create } from 'zustand';
import { VisitDetails, VisitUpdate, VitalSign } from '@/types/visit';
import { mockVisitRequests } from '@/lib/mockData';

interface VisitState {
  visits: VisitDetails[];
  activeVisitId: string | null;
  setActiveVisitId: (id: string | null) => void;
  addVisitUpdate: (visitId: string, update: Omit<VisitUpdate, 'id'>) => void;
  acceptVisit: (visitId: string) => void;
  declineVisit: (visitId: string, reason: string) => void;
  completeVisit: (visitId: string) => void;
  addVitalSign: (visitId: string, vital: Omit<VitalSign, 'timestamp'>) => void;
}

export const useVisitStore = create<VisitState>((set) => ({
  visits: mockVisitRequests.map(visit => ({
    ...visit,
    updates: [],
    vitals: []
  })),
  activeVisitId: null,
  
  setActiveVisitId: (id) => set({ activeVisitId: id }),
  
  addVisitUpdate: (visitId, update) => set((state) => ({
    visits: state.visits.map(visit => 
      visit.id === visitId
        ? {
            ...visit,
            updates: [
              ...visit.updates,
              {
                id: crypto.randomUUID(),
                visitId,
                timestamp: new Date().toISOString(),
                ...update
              }
            ]
          }
        : visit
    )
  })),

  acceptVisit: (visitId) => set((state) => ({
    visits: state.visits.map(visit =>
      visit.id === visitId
        ? { ...visit, status: 'accepted' as const }
        : visit
    )
  })),

  declineVisit: (visitId, reason) => set((state) => ({
    visits: state.visits.map(visit =>
      visit.id === visitId
        ? { 
            ...visit, 
            status: 'declined' as const,
            updates: [
              ...visit.updates,
              {
                id: crypto.randomUUID(),
                visitId,
                type: 'status',
                content: `Visit declined: ${reason}`,
                timestamp: new Date().toISOString(),
                chwId: '2' // TODO: Get from auth store
              }
            ]
          }
        : visit
    )
  })),

  completeVisit: (visitId) => set((state) => ({
    visits: state.visits.map(visit =>
      visit.id === visitId
        ? { 
            ...visit, 
            status: 'completed' as const,
            updates: [
              ...visit.updates,
              {
                id: crypto.randomUUID(),
                visitId,
                type: 'status',
                content: 'Visit completed',
                timestamp: new Date().toISOString(),
                chwId: '2' // TODO: Get from auth store
              }
            ]
          }
        : visit
    ),
    activeVisitId: null
  })),

  addVitalSign: (visitId, vital) => set((state) => ({
    visits: state.visits.map(visit =>
      visit.id === visitId
        ? {
            ...visit,
            vitals: [
              ...(visit.vitals || []),
              {
                ...vital,
                timestamp: new Date().toISOString()
              }
            ]
          }
        : visit
    )
  }))
}));