import React from 'react';
import { Users, Calendar, CheckCircle, Clock } from 'lucide-react';
import { mockPatients, mockVisitRequests } from '../../lib/mockData';

const MetricCard = ({ title, value, icon: Icon, description }: {
  title: string;
  value: number;
  icon: React.ElementType;
  description: string;
}) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-blue-100 text-blue-600">
        <Icon className="h-6 w-6" />
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <div className="mt-1">
          <p className="text-3xl font-semibold text-blue-600">{value}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  </div>
);

export default function DashboardMetrics() {
  const totalPatients = mockPatients.length;
  const pendingVisits = mockVisitRequests.filter(v => v.status === 'pending').length;
  const completedVisits = mockVisitRequests.filter(v => v.status === 'completed').length;
  const scheduledVisits = mockVisitRequests.filter(v => v.status === 'accepted').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricCard
        title="Total Patients"
        value={totalPatients}
        icon={Users}
        description="Active patients under care"
      />
      <MetricCard
        title="Pending Visits"
        value={pendingVisits}
        icon={Clock}
        description="Awaiting assignment"
      />
      <MetricCard
        title="Scheduled Visits"
        value={scheduledVisits}
        icon={Calendar}
        description="Upcoming visits"
      />
      <MetricCard
        title="Completed Visits"
        value={completedVisits}
        icon={CheckCircle}
        description="This month"
      />
    </div>
  );
}