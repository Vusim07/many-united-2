import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockVisitRequests, mockPatients } from '@/lib/mockData';
import { VisitDetails } from '@/types/visit';
import VisitCard from './visit/VisitCard';

export default function UpcomingVisits() {
  const navigate = useNavigate();
  
  const upcomingVisits = mockVisitRequests
    .filter(visit => visit.status === 'accepted')
    .map(visit => ({
      ...visit,
      updates: [] // In real app, fetch updates from API
    }));

  return (
    <div>
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Upcoming Visits</h1>
          <p className="mt-2 text-sm text-gray-700">
            Your scheduled visits that are ready to start
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {upcomingVisits.map((visit) => {
          const patient = mockPatients.find((p) => p.id === visit.patientId);
          if (!patient) return null;

          return (
            <VisitCard
              key={visit.id}
              visit={visit}
              patient={patient}
              onViewDetails={() => navigate(`/chw/visits/${visit.id}`)}
              onStartVisit={() => navigate(`/chw/visits/${visit.id}/active`)}
            />
          );
        })}
        {upcomingVisits.length === 0 && (
          <p className="text-sm text-gray-500 col-span-full text-center py-12">
            No upcoming visits scheduled
          </p>
        )}
      </div>
    </div>
  );
}