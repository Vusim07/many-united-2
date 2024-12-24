import React from 'react';
import { format } from 'date-fns';
import { Clock, MapPin, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/shared/StatusBadge';
import { VisitDetails } from '@/types/visit';
import { Patient } from '@/types';

interface VisitCardProps {
  visit: VisitDetails;
  patient: Patient;
  onViewDetails: () => void;
  onStartVisit?: () => void;
}

export default function VisitCard({ visit, patient, onViewDetails, onStartVisit }: VisitCardProps) {
  const isScheduledForToday = visit.scheduledDate && 
    new Date(visit.scheduledDate).toDateString() === new Date().toDateString();

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">{patient.name}</h3>
            </div>
            <StatusBadge status={visit.status} />
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">
              <Clock className="h-4 w-4 inline mr-1" />
              {format(new Date(visit.scheduledDate || visit.createdAt), 'PPp')}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">{visit.reason}</p>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          {patient.address}
        </div>

        <div className="flex justify-end gap-2">
          {isScheduledForToday && visit.status === 'accepted' && onStartVisit && (
            <Button onClick={onStartVisit}>Start Visit</Button>
          )}
          <Button variant="outline" onClick={onViewDetails}>
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}