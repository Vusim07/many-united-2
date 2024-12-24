import type { Patient } from '@/types';
import type { PatientQueryResult } from './types';

export function transformPatientData(row: PatientQueryResult): Patient {
  console.log('Transforming patient row:', row);
  
  try {
    const patient: Patient = {
      id: row.id,
      name: row.name,
      dateOfBirth: row.date_of_birth,
      address: row.address,
      phone: row.phone,
      medicalHistory: row.medical_history,
      gender: row.gender || undefined,
      emergencyContact: row.emergency_contact || undefined,
      insuranceInfo: row.insurance_info || undefined,
      preferredLanguage: row.preferred_language || undefined,
      notes: row.notes || undefined,
      careTeam: Array.isArray(row.care_team_members) 
        ? row.care_team_members
            .filter(member => member && member.users)
            .map(member => ({
              id: member.user_id,
              name: member.users?.name || '',
              role: member.role,
              specialty: member.users?.specialty || undefined
            }))
        : [],
      conditions: Array.isArray(row.patient_conditions)
        ? row.patient_conditions.map(condition => ({
            id: condition.id,
            condition: condition.condition,
            status: condition.status,
            diagnosedDate: condition.diagnosed_date || undefined,
            notes: condition.notes || undefined
          }))
        : [],
      socialConditions: Array.isArray(row.social_conditions)
        ? row.social_conditions.map(condition => ({
            id: condition.id,
            category: condition.category,
            status: condition.status,
            details: condition.details || undefined
          }))
        : []
    };

    console.log('Transformed patient:', patient);
    return patient;
  } catch (error) {
    console.error('Error transforming patient data:', error);
    throw error;
  }
}