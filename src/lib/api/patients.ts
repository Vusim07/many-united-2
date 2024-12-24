import { supabase } from '@/lib/supabase';
import type { Patient } from '@/types';
import type { Database } from '@/lib/database.types';

type PatientRow = Database['public']['Tables']['patients']['Row'];
type PatientInsert = Database['public']['Tables']['patients']['Insert'];

export async function getPatients() {
  const { data, error } = await supabase
    .from('patients')
    .select(`
      *,
      patient_conditions (*),
      social_conditions (*),
      care_team_members (
        id,
        user_id,
        role,
        primary_provider,
        users (
          name,
          specialty
        )
      )
    `);

  if (error) throw error;
  return transformPatientsData(data);
}

export async function getPatientById(id: string) {
  const { data, error } = await supabase
    .from('patients')
    .select(`
      *,
      patient_conditions (*),
      social_conditions (*),
      care_team_members (
        id,
        user_id,
        role,
        primary_provider,
        users (
          name,
          specialty
        )
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return transformPatientData(data);
}

function transformPatientData(row: PatientRow): Patient {
  return {
    id: row.id,
    name: row.name,
    dateOfBirth: row.date_of_birth,
    address: row.address,
    phone: row.phone,
    medicalHistory: row.medical_history || '',
    careTeam: row.care_team_members?.map(member => ({
      id: member.user_id,
      name: member.users?.name || '',
      role: member.role,
      specialty: member.users?.specialty
    })) || []
  };
}

function transformPatientsData(rows: PatientRow[]): Patient[] {
  return rows.map(transformPatientData);
}