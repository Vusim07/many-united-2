import { useParams } from 'react-router-dom';
import PatientDetails from '@/components/doctor/PatientDetails';
import { mockPatients } from '@/lib/mockData';

export function PatientPage() {
	const { id } = useParams();
	const patient = mockPatients.find((p) => p.id === id);

	if (!patient) {
		return (
			<div className='p-4 text-center'>
				<p className='text-gray-600'>Patient not found</p>
			</div>
		);
	}

	return <PatientDetails patient={patient} />;
}
