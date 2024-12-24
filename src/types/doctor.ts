import { UserRole } from './auth';

export interface Doctor {
	id: string;
	name: string;
	email: string;
	role: Extract<UserRole, 'doctor'>;
	specialty?: string;
	license_number?: string;
	phone?: string;
}

export interface DoctorMetrics {
	totalPatients: number;
	activeVisits: number;
	completedVisits: number;
	pendingVisits: number;
}

export interface PatientAssignment {
	patientId: string;
	doctorId: string;
	assignedAt: string;
	primaryDoctor: boolean;
}
