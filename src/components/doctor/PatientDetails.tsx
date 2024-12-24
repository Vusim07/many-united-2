import { useEffect, useState } from 'react';
import { Patient } from '@/types';
import { usePatientStore } from '@/store/patientStore';
import PatientInfo from './PatientInfo';
import VisitTimeline from '../shared/VisitTimeline';
import RequestVisitModal from './RequestVisitModal';
import CareTeam from '../patient/CareTeam';
import MedicalProfile from '../patient/MedicalProfile';
import { useVisits } from '@/hooks/useVisits';

interface PatientDetailsProps {
  patient: Patient;
}

export default function PatientDetails({ patient }: PatientDetailsProps) {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const { visits } = useVisits();
  const openRequestModal = () => setIsRequestModalOpen(true);
  
  const patientVisits = visits.filter(
    (visit) => visit.patientId === patient.id,
  );

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <PatientInfo patient={patient} onRequestVisit={openRequestModal} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Medical Profile
            </h3>
            <MedicalProfile patient={patient} visits={patientVisits} />
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Care Team
            </h3>
            <CareTeam patient={patient} />
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Visit History
            </h3>
            <VisitTimeline visits={patientVisits} />
          </div>
        </div>
      </div>

      <RequestVisitModal
        patient={patient}
        onClose={() => setIsRequestModalOpen(false)}
        open={isRequestModalOpen}
      />
    </div>
  );
}