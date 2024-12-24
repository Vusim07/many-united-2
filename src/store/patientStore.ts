import { create } from 'zustand';
import { Patient } from '@/types';
import { getPatients, getPatientById } from '@/lib/api/patients';

interface PatientState {
  patients: Patient[];
  isLoading: boolean;
  error: Error | null;
  isInitialized: boolean;
  fetchPatients: () => Promise<void>;
  getPatient: (id: string) => Promise<Patient | undefined>;
}

export const usePatientStore = create<PatientState>((set, get) => ({
  patients: [],
  isLoading: false,
  error: null,
  isInitialized: false,

  fetchPatients: async () => {
    if (get().isLoading) {
      console.log('Already fetching patients, skipping...');
      return;
    }
    
    console.log('Starting patient fetch...');
    set({ isLoading: true, error: null });
    
    try {
      const patients = await getPatients();
      console.log('Successfully fetched patients:', patients);
      set({ patients, isLoading: false, isInitialized: true });
    } catch (error) {
      console.error('Error in fetchPatients:', error);
      set({ 
        error: error instanceof Error ? error : new Error('Failed to fetch patients'),
        isLoading: false,
        isInitialized: true
      });
    }
  },

  getPatient: async (id: string) => {
    console.log(`Getting patient with ID: ${id}`);
    const patient = get().patients.find(p => p.id === id);
    if (patient) {
      console.log('Found patient in store:', patient);
      return patient;
    }

    try {
      const patient = await getPatientById(id);
      console.log('Fetched patient from API:', patient);
      set(state => ({
        patients: [...state.patients, patient]
      }));
      return patient;
    } catch (error) {
      console.error('Error in getPatient:', error);
      set({ error: error instanceof Error ? error : new Error('Failed to fetch patient') });
      return undefined;
    }
  }
}));