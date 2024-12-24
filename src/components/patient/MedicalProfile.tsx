import React from 'react';
import { format } from 'date-fns';
import { Patient, VisitRequest } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Activity, Heart, AlertCircle, Home, Users, Bus, Briefcase, ShoppingBag } from 'lucide-react';
import SocialConditions from './SocialConditions';

interface MedicalProfileProps {
  patient: Patient;
  visits: VisitRequest[];
}

export default function MedicalProfile({ patient, visits }: MedicalProfileProps) {
  const conditions = patient.medicalHistory.split(',').map(c => c.trim());
  const lastVisit = visits
    .filter(v => v.status === 'completed')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

  const socialConditions = [
    {
      icon: <Home className="h-4 w-4 text-gray-500" />,
      label: 'Housing',
      value: 'Stable housing with family',
      status: 'stable' as const,
    },
    {
      icon: <Users className="h-4 w-4 text-gray-500" />,
      label: 'Social Support',
      value: 'Lives with spouse, weekly family visits',
      status: 'stable' as const,
    },
    {
      icon: <Bus className="h-4 w-4 text-gray-500" />,
      label: 'Transportation',
      value: 'Relies on public transit',
      status: 'at-risk' as const,
    },
    {
      icon: <Briefcase className="h-4 w-4 text-gray-500" />,
      label: 'Employment',
      value: 'Part-time work',
      status: 'stable' as const,
    },
    {
      icon: <ShoppingBag className="h-4 w-4 text-gray-500" />,
      label: 'Food Security',
      value: 'Access to grocery stores',
      status: 'stable' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Medical Conditions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {conditions.map((condition, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {condition}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <SocialConditions conditions={socialConditions} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="h-5 w-5 mr-2" />
            Vital Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Last Visit</p>
              <p className="mt-1">
                {lastVisit ? format(new Date(lastVisit.createdAt), 'PP') : 'No visits recorded'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Visit Frequency</p>
              <p className="mt-1">
                {visits.filter(v => v.status === 'completed').length} completed visits
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            Risk Factors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center text-yellow-600">
              <AlertCircle className="h-4 w-4 mr-2" />
              Multiple chronic conditions
            </li>
            <li className="flex items-center text-yellow-600">
              <AlertCircle className="h-4 w-4 mr-2" />
              Transportation barriers
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}