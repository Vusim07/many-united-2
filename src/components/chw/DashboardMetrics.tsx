import React from 'react';
import { CheckCircle, Clock, Calendar, Users } from 'lucide-react';
import { mockVisitRequests } from '../../lib/mockData';
import { useAuthStore } from '../../store/authStore';

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

export default function CHWDashboardMetrics() {
  const user = useAuthStore((state) => state.user);
  const assignedVisits = mockVisitRequests.filter(v => v.status === 'accepted').length;
  const completedVisits = mockVisitRequests.filter(v => v.status === 'completed').length;
  const pendingVisits = mockVisitRequests.filter(v => v.status === 'pending').length;
  const todayVisits = mockVisitRequests.filter(v => 
    v.status === 'accepted' && 
    v.scheduledDate && 
    new Date(v.scheduledDate).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricCard
        title="Today's Visits"
        value={todayVisits}
        icon={Calendar}
        description="Scheduled for today"
      />
      <MetricCard
        title="Assigned Visits"
        value={assignedVisits}
        icon={Users}
        description="Currently assigned"
      />
      <MetricCard
        title="Available Requests"
        value={pendingVisits}
        icon={Clock}
        description="Pending assignment"
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