import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import StatusBadge from '@/components/shared/StatusBadge';
import { useVisits } from '@/hooks/useVisits';
import { useVisitStore } from '@/store/visitStore';

export default function VisitRequests() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { pendingVisits, visitsWithPatients } = useVisits();
  const { acceptVisit, declineVisit } = useVisitStore();

  const handleAccept = (visitId: string) => {
    acceptVisit(visitId);
    toast({
      title: "Visit Accepted",
      description: "The visit has been added to your schedule.",
    });
    navigate('/chw/schedule');
  };

  const handleDecline = (visitId: string) => {
    declineVisit(visitId, 'Visit declined by CHW');
    toast({
      title: "Visit Declined",
      description: "The visit request has been declined.",
    });
  };

  const pendingVisitsWithPatients = visitsWithPatients.filter(
    visit => visit.status === 'pending'
  );

  return (
    <div>
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Available Visit Requests</h1>
          <p className="mt-2 text-sm text-gray-700">
            Review and accept visit requests in your area
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {pendingVisitsWithPatients.map((visit) => {
          if (!visit.patient) return null;

          return (
            <Card key={visit.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{visit.patient.name}</h3>
                    <StatusBadge status={visit.status} className="mt-1" />
                    <p className="mt-2 text-sm text-gray-500">{visit.reason}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate(`/chw/visits/${visit.id}`)}
                    >
                      View Details
                    </Button>
                    <Button 
                      onClick={() => handleAccept(visit.id)}
                    >
                      Accept
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => handleDecline(visit.id)}
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {pendingVisits.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-12">
            No pending visit requests
          </p>
        )}
      </div>
    </div>
  );
}