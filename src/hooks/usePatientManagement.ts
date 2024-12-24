import { useMemo } from 'react';
import { usePatientStore } from '@/store/patientStore';
import { useVisitStore } from '@/store/visitStore';
import { useAuthStore } from '@/store/authStore';

export function usePatientManagement() {
  const patients = usePatientStore((state) => state.patients);
  const visits = useVisitStore((state) => state.visits);
  const currentDoctor = useAuthStore((state) => state.user);

  const myPatients = useMemo(() => 
    patients.filter(patient => 
      patient.careTeam?.some(member => 
        member.id === currentDoctor?.id && member.role === 'doctor'
      )
    ),
    [patients, currentDoctor]
  );

  const patientVisits = useMemo(() => {
    const visitMap = new Map();
    myPatients.forEach(patient => {
      visitMap.set(patient.id, visits.filter(v => v.patientId === patient.id));
    });
    return visitMap;
  }, [myPatients, visits]);

  const patientMetrics = useMemo(() => ({
    total: myPatients.length,
    withPendingVisits: new Set(
      visits
        .filter(v => v.status === 'pending')
        .map(v => v.patientId)
    ).size,
    withCompletedVisits: new Set(
      visits
        .filter(v => v.status === 'completed')
        .map(v => v.patientId)
    ).size
  }), [myPatients, visits]);

  return {
    myPatients,
    patientVisits,
    patientMetrics
  };
}