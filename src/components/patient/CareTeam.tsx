import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Users } from 'lucide-react';
import { Patient } from '@/types';

interface CareTeamProps {
  patient: Patient;
}

export default function CareTeam({ patient }: CareTeamProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Care Team
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {patient.careTeam?.map((member) => (
            <div key={member.id} className="flex items-start">
              <div className="flex-1">
                <h4 className="text-sm font-medium">{member.name}</h4>
                <p className="text-sm text-gray-500">
                  {member.role}
                  {member.specialty && ` - ${member.specialty}`}
                </p>
              </div>
            </div>
          ))}
          {(!patient.careTeam || patient.careTeam.length === 0) && (
            <p className="text-sm text-gray-500">No care team members assigned</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}