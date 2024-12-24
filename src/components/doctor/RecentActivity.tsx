import React from 'react';
import { mockVisitRequests, mockPatients } from '../../lib/mockData';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function RecentActivity() {
  const recentVisits = [...mockVisitRequests]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentVisits.map(visit => {
            const patient = mockPatients.find(p => p.id === visit.patientId);
            return (
              <div key={visit.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{patient?.name}</p>
                  <p className="text-sm text-gray-500">{visit.reason}</p>
                </div>
                <p className="text-sm text-gray-500">
                  {format(new Date(visit.createdAt), 'PP')}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}