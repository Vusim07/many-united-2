import { supabase } from '@/lib/supabase/client';
import type { PatientQueryResult } from './types';

const PATIENT_QUERY = `
  *,
  patient_conditions (
    id,
    condition,
    status,
    diagnosed_date,
    notes
  ),
  social_conditions (
    id,
    category,
    status,
    details
  ),
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
` as const;

export async function fetchPatients() {
  console.log('Fetching patients...');
  
  const { data: session } = await supabase.auth.getSession();
  console.log('Current session:', session);

  const { data, error } = await supabase
    .from('patients')
    .select(PATIENT_QUERY);

  if (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }

  console.log('Fetched patients data:', data);
  return data as PatientQueryResult[];
}

export async function fetchPatientById(id: string) {
  console.log(`Fetching patient with ID: ${id}`);

  const { data, error } = await supabase
    .from('patients')
    .select(PATIENT_QUERY)
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching patient ${id}:`, error);
    throw error;
  }

  console.log('Fetched patient data:', data);
  return data as PatientQueryResult;
}