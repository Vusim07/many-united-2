import { format } from 'date-fns';
import { mockPatients } from '../../lib/mockData';
import { MapPin, Calendar } from 'lucide-react';
import StatusBadge from '../shared/StatusBadge';
import { VisitRequest } from '@/types';
import { Button } from '../ui/button';

interface VisitRequestDetailsProps {
	visit: VisitRequest;
}

export default function VisitRequestDetails({
	visit,
}: VisitRequestDetailsProps) {
	const patient = mockPatients.find((p) => p.id === visit.patientId);
	if (!patient) return null;

	return (
		<div className='space-y-6'>
			{/* Visit Request Info */}
			<div className='bg-white shadow rounded-lg p-6'>
				<div className='flex justify-between items-start'>
					<div>
						<StatusBadge status={visit.status} className='mb-2' />
						<h2 className='text-2xl font-bold text-gray-900'>{patient.name}</h2>
						<p className='mt-1 text-sm text-gray-500'>
							Requested on {format(new Date(visit.createdAt), 'PPp')}
						</p>
					</div>
					<div className='space-x-3'>
						{visit.status === 'pending' && (
							<>
								<Button className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
									Accept
								</Button>
								<Button className='px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50'>
									Decline
								</Button>
							</>
						)}
					</div>
				</div>

				<div className='mt-6 space-y-4'>
					<div>
						<h3 className='text-sm font-medium text-gray-900'>
							Reason for Visit
						</h3>
						<p className='mt-1 text-sm text-gray-500'>{visit.reason}</p>
					</div>

					<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
						<div>
							<h3 className='text-sm font-medium text-gray-900'>
								Patient Details
							</h3>
							<div className='mt-2 space-y-2'>
								<div className='flex items-center text-sm text-gray-500'>
									<MapPin className='h-4 w-4 mr-2' />
									{patient.address}
								</div>
								<div className='flex items-center text-sm text-gray-500'>
									<Calendar className='h-4 w-4 mr-2' />
									Born {format(new Date(patient.dateOfBirth), 'MMMM d, yyyy')}
								</div>
							</div>
						</div>

						<div>
							<h3 className='text-sm font-medium text-gray-900'>
								Medical History
							</h3>
							<p className='mt-2 text-sm text-gray-500'>
								{patient.medicalHistory}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Scheduling Section (for accepted visits) */}
			{visit.status === 'accepted' && !visit.scheduledDate && (
				<div className='bg-white shadow rounded-lg p-6'>
					<h3 className='text-lg font-medium text-gray-900 mb-4'>
						Schedule Visit
					</h3>
					<div className='flex items-center space-x-4'>
						<input
							type='datetime-local'
							className='rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
						/>
						<button className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
							Set Schedule
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
