import React from 'react';
import { format } from 'date-fns';
import { Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from '@/components/shared/StatusBadge';
import { VisitRequest } from '@/types';

interface VisitInfoProps {
  visit: VisitRequest;
}

export default function VisitInfo({ visit }: VisitInfoProps) {
  const getDirectionsUrl = (lat: number, lng: number) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Visit Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <StatusBadge status={visit.status} />
            <p className="mt-2 text-sm text-gray-500">{visit.reason}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">Schedule</h4>
            <p className="text-sm text-gray-500">
              Requested: {format(new Date(visit.createdAt), 'PPp')}
            </p>
            {visit.scheduledDate && (
              <p className="text-sm text-gray-500">
                Scheduled: {format(new Date(visit.scheduledDate), 'PPp')}
              </p>
            )}
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">Location</h4>
            <a
              href={getDirectionsUrl(visit.location.lat, visit.location.lng)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <MapPin className="h-4 w-4 mr-1" />
              Get Directions
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}