export class PatientApiError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'PatientApiError';
  }
}

export class PatientNotFoundError extends PatientApiError {
  constructor(patientId: string) {
    super(`Patient not found: ${patientId}`, 'PATIENT_NOT_FOUND');
    this.name = 'PatientNotFoundError';
  }
}

export class PatientValidationError extends PatientApiError {
  constructor(message: string) {
    super(message, 'PATIENT_VALIDATION_ERROR');
    this.name = 'PatientValidationError';
  }
}