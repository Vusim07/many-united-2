export interface Location {
  lat: number;
  lng: number;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  address: string;
  phone: string;
  medicalHistory: string | null;
  gender?: string;
  emergencyContact?: string;
  insuranceInfo?: any;
  preferredLanguage?: string;
  notes?: string;
  careTeam?: {
    id: string;
    name: string;
    role: string;
    specialty?: string;
  }[];
  conditions?: {
    id: string;
    condition: string;
    status: string;
    diagnosedDate?: string;
    notes?: string;
  }[];
  socialConditions?: {
    id: string;
    category: string;
    status: 'stable' | 'at-risk' | 'critical';
    details?: string;
  }[];
}