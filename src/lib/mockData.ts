import { Patient, VisitRequest } from '../types';

export const mockUsers = [
	{
		id: '1',
		name: 'Dr. Sarah Johnson',
		email: 'sarah.johnson@example.com',
		role: 'doctor',
	},
	{
		id: '2',
		name: 'James Wilson',
		email: 'james.wilson@example.com',
		role: 'chw',
		area: 'North District',
	},
	{
		id: '3',
		name: 'Admin User',
		email: 'admin@example.com',
		role: 'admin',
	},
] as const;

export const mockPatients = [
	{
		id: '1',
		name: 'Sipho Dlamini',
		dateOfBirth: '1980-05-15',
		address: '123 Umlazi Rd, Durban, South Africa',
		phone: '+27 83 123 4567',
		medicalHistory: 'Hypertension, Type 2 Diabetes',
		careTeam: [
			{
				id: '1',
				name: 'Dr. Thandi Nkosi',
				role: 'Primary Care Physician',
				specialty: 'Internal Medicine',
			},
			{
				id: '2',
				name: 'Lerato Mokoena',
				role: 'Community Health Worker',
			},
		],
	},
	{
		id: '2',
		name: 'Nomsa Khumalo',
		dateOfBirth: '1975-08-22',
		address: '456 Park Rd, Sandton, South Africa',
		phone: '+27 82 987 6543',
		medicalHistory: 'Asthma, Arthritis',
		careTeam: [
			{
				id: '1',
				name: 'Dr. Thandi Nkosi',
				role: 'Primary Care Physician',
				specialty: 'Internal Medicine',
			},
		],
	},
	{
		id: '3',
		name: 'Lindiwe Mthembu',
		dateOfBirth: '1990-03-12',
		address: '78 Soweto Ave, Johannesburg, South Africa',
		phone: '+27 81 345 6789',
		medicalHistory: 'Migraine, Seasonal Allergies',
		careTeam: [
			{
				id: '2',
				name: 'Dr. Kabelo Sithole',
				role: 'Neurologist',
				specialty: 'Neurology',
			},
			{
				id: '3',
				name: 'Sibusiso Ndlovu',
				role: 'Pharmacist',
			},
		],
	},
	{
		id: '4',
		name: 'Thabo Masango',
		dateOfBirth: '1985-11-05',
		address: '22 Freedom St, Pretoria, South Africa',
		phone: '+27 72 567 1234',
		medicalHistory: 'High Cholesterol, Obesity',
		careTeam: [
			{
				id: '4',
				name: 'Dr. Zanele Mahlangu',
				role: 'Dietitian',
				specialty: 'Nutrition',
			},
			{
				id: '5',
				name: 'Nomvelo Mkhize',
				role: 'Fitness Coach',
			},
		],
	},
	{
		id: '5',
		name: 'Andile Zulu',
		dateOfBirth: '1995-07-19',
		address: '12 Long St, Cape Town, South Africa',
		phone: '+27 73 678 4321',
		medicalHistory: 'Type 1 Diabetes',
		careTeam: [
			{
				id: '6',
				name: 'Dr. Busi Nkosi',
				role: 'Endocrinologist',
				specialty: 'Endocrinology',
			},
		],
	},
	{
		id: '6',
		name: 'Zanele Gumede',
		dateOfBirth: '1970-02-28',
		address: '9 Victoria Rd, Port Elizabeth, South Africa',
		phone: '+27 84 456 7890',
		medicalHistory: 'Osteoporosis, Hypertension',
		careTeam: [
			{
				id: '1',
				name: 'Dr. Thandi Nkosi',
				role: 'Primary Care Physician',
				specialty: 'Internal Medicine',
			},
		],
	},
	{
		id: '7',
		name: 'Jabulani Ncube',
		dateOfBirth: '1988-06-10',
		address: '34 Nelson Mandela Blvd, Bloemfontein, South Africa',
		phone: '+27 79 123 9876',
		medicalHistory: 'Anxiety, Depression',
		careTeam: [
			{
				id: '7',
				name: 'Dr. Vusi Mlangeni',
				role: 'Psychiatrist',
				specialty: 'Mental Health',
			},
			{
				id: '8',
				name: 'Dineo Molefe',
				role: 'Psychologist',
			},
		],
	},
];

// Get today's date at midnight for comparison
const today = new Date();
today.setHours(0, 0, 0, 0);

// Get tomorrow's date
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

export const mockVisitRequests: VisitRequest[] = [
	{
		id: '1',
		patientId: '1',
		status: 'completed',
		reason: 'Regular checkup and blood pressure monitoring',
		createdAt: '2024-02-15T10:00:00Z',
		scheduledDate: '2024-02-20T14:30:00Z',
		location: {
			lat: 40.7128,
			lng: -74.006,
		},
	},
	{
		id: '2',
		patientId: '2',
		status: 'pending',
		reason: 'Follow-up on medication adjustment',
		createdAt: '2024-02-16T09:00:00Z',
		location: {
			lat: 40.7142,
			lng: -74.0075,
		},
	},
	{
		id: '3',
		patientId: '1',
		status: 'accepted',
		reason: 'Blood pressure check and medication review',
		createdAt: '2024-02-21T08:00:00Z',
		scheduledDate: today.toISOString(), // Scheduled for today
		location: {
			lat: 40.7128,
			lng: -74.006,
		},
	},
	{
		id: '4',
		patientId: '2',
		status: 'accepted',
		reason: 'Weekly wellness check',
		createdAt: '2024-02-21T09:00:00Z',
		scheduledDate: tomorrow.toISOString(), // Scheduled for tomorrow
		location: {
			lat: 40.7142,
			lng: -74.0075,
		},
	},
	{
		id: '5',
		patientId: '1',
		status: 'pending',
		reason: 'Diabetes management follow-up',
		createdAt: '2024-02-21T10:00:00Z',
		location: {
			lat: 40.7128,
			lng: -74.006,
		},
	},
];

export const mockVisitFeedback = [
	{
		id: '1',
		visitId: '1',
		chwId: '2',
		notes:
			"Patient's blood pressure is stable. Medication compliance improved.",
		createdAt: '2024-02-20T15:30:00Z',
	},
];
