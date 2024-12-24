import React from 'react';
import { CheckCircle, Clock, Calendar, Users } from 'lucide-react';
import { mockVisitRequests } from '@/lib/mockData';
import { MetricCard } from '@/components/shared/MetricCard';

export default function DashboardMetrics() {
  const assignedVisits = mockVisitRequests.filter(v => v.status === 'accepted').length;
  const completedVisits = mockVisitRequests.filter(v => v.status === 'completed').length;
  const pendingVisits = mockVisitRequests.filter(v => v.status === 'pending').length;
  const todayVisits = mockVisitRequests.filter(v => 
    v.status === 'accepted' && 
    v.scheduledDate && 
    new Date(v.scheduledDate).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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