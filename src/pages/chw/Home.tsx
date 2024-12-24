import React from 'react';
import DashboardMetrics from '@/components/chw/DashboardMetrics';
import VisitRequests from '@/components/chw/VisitRequests';
import UpcomingVisits from '@/components/chw/UpcomingVisits';

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700">
          Overview of your assigned visits and available requests
        </p>
      </div>

      <DashboardMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <VisitRequests />
        <UpcomingVisits />
      </div>
    </div>
  );
}