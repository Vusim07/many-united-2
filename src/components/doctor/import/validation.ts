import { z } from 'zod';
import type { PatientFormData } from '../forms/PatientForm';

const patientImportSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  address: z.string().min(1, 'Address is required'),
  phone: z.string().min(1, 'Phone number is required'),
  medical_history: z.string().nullable().optional(),
  gender: z.string().optional(),
  emergency_contact: z.string().optional(),
  preferred_language: z.string().optional(),
  notes: z.string().optional(),
});

export function validatePatientData(data: PatientFormData) {
  const result = patientImportSchema.safeParse(data);
  return {
    isValid: result.success,
    errors: result.success ? [] : result.error.errors,
  };
}