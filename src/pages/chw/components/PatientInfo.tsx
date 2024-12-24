import React from 'react';
import { format } from 'date-fns';
import { User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Patient } from '@/types';

interface PatientInfoProps {
  patient: Patient;
}

export default function PatientInfo({ patient }: PatientInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 mr-2" />
          Patient Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">{patient.name}</h3>
            <p className="text-sm text-gray-500">
              Born {format(new Date(patient.dateOfBirth), 'PP')}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">Medical History</h4>
            <p className="text-sm text-gray-500">{patient.medicalHistory}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">Contact</h4>
            <p className="text-sm text-gray-500">{patient.phone}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}