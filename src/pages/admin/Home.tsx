import React from 'react';
import { Users, UserCheck, Stethoscope, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminStats } from '@/types/admin';

const mockStats: AdminStats = {
  totalCHWs: 25,
  activeCHWs: 20,
  totalDoctors: 15,
  totalPatients: 500,
  totalVisits: 1200,
};

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700">
          System-wide statistics and management
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total CHWs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalCHWs}</div>
            <p className="text-xs text-muted-foreground">
              {mockStats.activeCHWs} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active CHWs</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.activeCHWs}</div>
            <p className="text-xs text-muted-foreground">
              {((mockStats.activeCHWs / mockStats.totalCHWs) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalDoctors}</div>
            <p className="text-xs text-muted-foreground">
              Managing {mockStats.totalPatients} patients
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalVisits}</div>
            <p className="text-xs text-muted-foreground">
              Across all CHWs
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}