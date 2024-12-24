import type { Database } from '@/lib/database.types';

export type PatientRow = Database['public']['Tables']['patients']['Row'];
export type PatientInsert = Database['public']['Tables']['patients']['Insert'];
export type PatientUpdate = Database['public']['Tables']['patients']['Update'];

export type PatientConditionRow = Database['public']['Tables']['patient_conditions']['Row'];
export type SocialConditionRow = Database['public']['Tables']['social_conditions']['Row'];

export interface PatientQueryResult extends PatientRow {
  patient_conditions: PatientConditionRow[];
  social_conditions: SocialConditionRow[];
  care_team_members: Array<{
    id: string;
    user_id: string;
    role: string;
    primary_provider: boolean;
    users: {
      name: string;
      specialty: string | null;
    } | null;
  }>;
}