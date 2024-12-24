import React from 'react';
import { format } from 'date-fns';
import { MapPin } from 'lucide-react';
import { Patient, VisitRequest } from '../../types';
import StatusBadge from '../shared/StatusBadge';
import { Button } from '../ui/button';

interface VisitRequestCardProps {
  visit: VisitRequest;
  patient: Patient;
  onViewDetails: () => void;
}

export default function VisitRequestCard({ visit, patient, onViewDetails }: VisitRequestCardProps) {
  const getDirectionsUrl = (lat: number, lng: number) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  };

  return (
    <div 
      className="bg-white shadow rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={onViewDetails}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{patient.name}</h3>
            <StatusBadge status={visit.status} className="mt-1" />
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">{visit.reason}</p>
        
        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            Requested: {format(new Date(visit.createdAt), 'PPp')}
          </p>
          
          <a
            href={getDirectionsUrl(visit.location.lat, visit.location.lng)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
            onClick={(e) => e.stopPropagation()}
          >
            <MapPin className="h-4 w-4 mr-1" />
            Get Directions
          </a>
        </div>

        <div className="mt-4">
          <Button variant="outline" size="sm" className="w-full" onClick={(e) => {
            e.stopPropagation();
            onViewDetails();
          }}>
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}