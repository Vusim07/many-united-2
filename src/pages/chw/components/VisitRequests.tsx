import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockVisitRequests, mockPatients } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/shared/StatusBadge';

interface VisitRequestsProps {
  limit?: number;
}

export default function VisitRequests({ limit }: VisitRequestsProps) {
  const navigate = useNavigate();
  const pendingVisits = mockVisitRequests
    .filter(visit => visit.status === 'pending')
    .slice(0, limit);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Visit Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingVisits.map(visit => {
            const patient = mockPatients.find(p => p.id === visit.patientId);
            return (
              <div key={visit.id} className="flex justify-between items-start p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{patient?.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{visit.reason}</p>
                  <StatusBadge status={visit.status} className="mt-2" />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/chw/visits/${visit.id}`)}
                >
                  View Details
                </Button>
              </div>
            );
          })}
          {pendingVisits.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              No pending visit requests
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}