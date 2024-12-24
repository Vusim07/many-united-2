import React from 'react';
import { format } from 'date-fns';
import { MapPin, Calendar } from 'lucide-react';
import { Patient } from '../../types';

interface PatientInfoProps {
	patient: Patient;
	onRequestVisit: () => void;
}

export default function PatientInfo({
	patient,
	onRequestVisit,
}: PatientInfoProps) {
	return (
		<div className='bg-white shadow rounded-lg p-6'>
			<div className='flex justify-between items-start'>
				<div>
					<h2 className='text-2xl font-bold text-gray-900'>{patient.name}</h2>
					<p className='mt-1 text-sm text-gray-500'>
						Born {format(new Date(patient.dateOfBirth), 'MMMM d, yyyy')} (
						{new Date().getFullYear() -
							new Date(patient.dateOfBirth).getFullYear()}{' '}
						years old)
					</p>
				</div>
				<button
					onClick={onRequestVisit}
					className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
				>
					Refer Patient
				</button>
			</div>

			<div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
				<div className='flex items-center text-sm text-gray-500'>
					<MapPin className='h-4 w-4 mr-2' />
					{patient.address}
				</div>
				<div className='flex items-center text-sm text-gray-500'>
					<Calendar className='h-4 w-4 mr-2' />
					Patient since {format(new Date('2023-01-01'), 'MMMM yyyy')}
				</div>
			</div>

			<div className='mt-4'>
				<h3 className='text-sm font-medium text-gray-900'>Medical History</h3>
				<p className='mt-1 text-sm text-gray-500'>{patient.medicalHistory}</p>
			</div>
		</div>
	);
}
