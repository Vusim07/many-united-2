import React from 'react';
import { format } from 'date-fns';
import { mockVisitRequests, mockPatients } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from '@/components/shared/StatusBadge';

export default function UpcomingVisits() {
  const upcomingVisits = mockVisitRequests
    .filter(visit => visit.status === 'accepted')
    .sort((a, b) => new Date(a.scheduledDate || a.createdAt).getTime() - new Date(b.scheduledDate || b.createdAt).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Visits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingVisits.map(visit => {
            const patient = mockPatients.find(p => p.id === visit.patientId);
            return (
              <div key={visit.id} className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{patient?.name}</p>
                  <p className="text-sm text-gray-500">{visit.reason}</p>
                  <StatusBadge status={visit.status} className="mt-1" />
                </div>
                <p className="text-sm text-gray-500">
                  {visit.scheduledDate 
                    ? format(new Date(visit.scheduledDate), 'PP')
                    : 'Not scheduled'}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}