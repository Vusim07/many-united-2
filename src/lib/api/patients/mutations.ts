import { supabase } from '@/lib/supabase/client';
import type { PatientInsert } from './types';
import { PatientApiError } from './errors';

export async function createPatient(patient: PatientInsert) {
  console.log('Creating patient:', patient);

  try {
    // Check auth status
    const { data: authStatus } = await supabase.rpc('get_auth_status');
    console.log('Auth status:', authStatus);

    if (!authStatus?.authenticated) {
      throw new PatientApiError('User not authenticated');
    }

    const { data, error } = await supabase
      .from('patients')
      .insert([{
        ...patient,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating patient:', error);
      throw new PatientApiError(error.message, error.code);
    }

    console.log('Created patient:', data);
    return data;
  } catch (error) {
    console.error('Patient creation error:', error);
    throw error instanceof PatientApiError 
      ? error 
      : new PatientApiError('Failed to create patient', undefined, error);
  }
}