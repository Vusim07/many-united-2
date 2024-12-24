import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockVisitRequests, mockPatients } from '@/lib/mockData';
import { VisitDetails } from '@/types/visit';
import VisitScheduleTable from './visit/VisitScheduleTable';
import ActiveVisit from './visit/ActiveVisit';

export default function Schedule() {
  const navigate = useNavigate();
  const [activeVisitId, setActiveVisitId] = useState<string | null>(null);
  
  const scheduledVisits = mockVisitRequests
    .filter(visit => visit.status === 'accepted')
    .map(visit => ({
      ...visit,
      updates: [] // In real app, fetch updates from API
    }));

  const activeVisit = scheduledVisits.find(v => v.id === activeVisitId);
  const activePatient = activeVisit ? mockPatients.find(p => p.id === activeVisit.patientId) : null;

  if (activeVisit && activePatient) {
    return (
      <ActiveVisit
        visit={activeVisit}
        patient={activePatient}
        onComplete={() => setActiveVisitId(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Visit Schedule</h1>
        <p className="mt-2 text-sm text-gray-700">
          Your upcoming scheduled visits
        </p>
      </div>

      {scheduledVisits.length > 0 ? (
        <VisitScheduleTable
          visits={scheduledVisits}
          patients={mockPatients}
          onStartVisit={setActiveVisitId}
        />
      ) : (
        <p className="text-sm text-gray-500 text-center py-12">
          No scheduled visits
        </p>
      )}
    </div>
  );
}