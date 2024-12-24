import { supabase } from '@/lib/supabase/client';
import type { Patient } from '@/types';
import { transformPatientData } from './transforms';
import { PatientApiError } from './errors';

export async function getPatients(): Promise<Patient[]> {
  try {
    // Debug auth status
    const { data: authDebug } = await supabase.rpc('debug_auth');
    console.log('Auth debug:', authDebug);

    const { data: session } = await supabase.auth.getSession();
    console.log('Current session:', session);

    // Verify auth status
    if (!session.session?.access_token) {
      console.error('No valid session found');
      throw new PatientApiError('Authentication required');
    }

    // First try a simple query to test access
    const { data: testData, error: testError } = await supabase
      .from('patients')
      .select('id')
      .limit(1);
    
    console.log('Test query result:', { data: testData, error: testError });

    // If test succeeds, perform full query
    const { data, error } = await supabase
      .from('patients')
      .select(`
        *,
        patient_conditions!left (
          id, condition, status, diagnosed_date, notes
        ),
        social_conditions!left (
          id, category, status, details
        ),
        care_team_members!left (
          id,
          user_id,
          role,
          primary_provider,
          users!left (
            name,
            specialty
          )
        )
      `)
      .order('name');

    if (error) {
      console.error('Error fetching patients:', error);
      throw new PatientApiError(error.message, error.code);
    }

    console.log('Raw patient data:', data);

    if (!data) {
      console.log('No patient data returned');
      return [];
    }

    const transformedData = data.map(row => transformPatientData(row));
    console.log('Transformed patient data:', transformedData);

    return transformedData;
  } catch (error) {
    console.error('Patient fetch error:', error);
    throw error instanceof PatientApiError 
      ? error 
      : new PatientApiError('Failed to fetch patients', undefined, error);
  }
}

export async function getPatientById(id: string): Promise<Patient> {
  const { data, error } = await supabase
    .from('patients')
    .select(`
      *,
      patient_conditions!left (
        id, condition, status, diagnosed_date, notes
      ),
      social_conditions!left (
        id, category, status, details
      ),
      care_team_members!left (
        id,
        user_id,
        role,
        primary_provider,
        users!left (
          name,
          specialty
        )
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching patient ${id}:`, error);
    throw new PatientApiError(error.message, error.code);
  }

  return transformPatientData(data);
}