import { useMemo } from 'react';
import { useVisitStore } from '@/store/visitStore';
import { usePatientStore } from '@/store/patientStore';

export function useVisits() {
  const visits = useVisitStore((state) => state.visits);
  const patients = usePatientStore((state) => state.patients);

  const pendingVisits = useMemo(() => 
    visits.filter(v => v.status === 'pending'),
    [visits]
  );

  const scheduledVisits = useMemo(() => 
    visits.filter(v => v.status === 'accepted'),
    [visits]
  );

  const completedVisits = useMemo(() => 
    visits.filter(v => v.status === 'completed'),
    [visits]
  );

  const todayVisits = useMemo(() => {
    const today = new Date().toDateString();
    return visits.filter(v => 
      v.status === 'accepted' && 
      v.scheduledDate && 
      new Date(v.scheduledDate).toDateString() === today
    );
  }, [visits]);

  const visitsWithPatients = useMemo(() =>
    visits.map(visit => ({
      ...visit,
      patient: patients.find(p => p.id === visit.patientId)
    })),
    [visits, patients]
  );

  return {
    visits,
    pendingVisits,
    scheduledVisits,
    completedVisits,
    todayVisits,
    visitsWithPatients
  };
}