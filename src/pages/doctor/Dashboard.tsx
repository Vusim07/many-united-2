import { Routes, Route } from 'react-router-dom';
import DoctorLayout from '@/components/layouts/DoctorLayout';
import Home from './Home';
import VisitRequests from '@/components/doctor/VisitRequests';
import CreatePatient from '@/components/doctor/CreatePatient';
import { SettingsPage } from '@/pages/settings/SettingsPage';
import { PatientPage } from '@/pages/doctor/PatientPage';
import Patients from './Patients';

export default function DoctorDashboard() {
	return (
		<DoctorLayout>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/patients' element={<Patients />} />
				<Route path='/visits' element={<VisitRequests />} />
				<Route path='/patients/new' element={<CreatePatient />} />
				<Route path='/patients/:id' element={<PatientPage />} />
				<Route path='/settings' element={<SettingsPage />} />
			</Routes>
		</DoctorLayout>
	);
}
