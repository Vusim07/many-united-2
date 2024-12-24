import { create } from 'zustand';
import { Doctor } from '@/types/doctor';
import { mockUsers } from '@/lib/mockData';

interface DoctorState {
  doctors: Doctor[];
  addDoctor: (doctor: Omit<Doctor, 'id'>) => void;
  updateDoctor: (id: string, updates: Partial<Doctor>) => void;
  getDoctor: (id: string) => Doctor | undefined;
}

export const useDoctorStore = create<DoctorState>((set, get) => ({
  doctors: mockUsers.filter(user => user.role === 'doctor') as Doctor[],
  
  addDoctor: (doctor) => set((state) => ({
    doctors: [
      ...state.doctors,
      {
        id: crypto.randomUUID(),
        ...doctor
      }
    ]
  })),

  updateDoctor: (id, updates) => set((state) => ({
    doctors: state.doctors.map(doctor =>
      doctor.id === id
        ? { ...doctor, ...updates }
        : doctor
    )
  })),

  getDoctor: (id) => get().doctors.find(d => d.id === id)
}));