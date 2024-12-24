import React from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/shared/StatusBadge';
import { VisitDetails } from '@/types/visit';
import { Patient } from '@/types';

interface VisitScheduleTableProps {
  visits: VisitDetails[];
  patients: Patient[];
  onStartVisit: (visitId: string) => void;
}

export default function VisitScheduleTable({ visits, patients, onStartVisit }: VisitScheduleTableProps) {
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Patient</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Scheduled For</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {visits.map((visit) => {
          const patient = patients.find((p) => p.id === visit.patientId);
          if (!patient) return null;

          const isScheduledForToday = visit.scheduledDate && 
            new Date(visit.scheduledDate).toDateString() === new Date().toDateString();

          return (
            <TableRow key={visit.id}>
              <TableCell className="font-medium">{patient.name}</TableCell>
              <TableCell>{visit.reason}</TableCell>
              <TableCell>
                <StatusBadge status={visit.status} />
              </TableCell>
              <TableCell>
                {visit.scheduledDate
                  ? format(new Date(visit.scheduledDate), 'PPp')
                  : 'Not scheduled'}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {isScheduledForToday && visit.status === 'accepted' && (
                    <Button 
                      size="sm"
                      onClick={() => onStartVisit(visit.id)}
                    >
                      Start Visit
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/chw/visits/${visit.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}