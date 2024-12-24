import React from 'react';
import { Users, Calendar, CheckCircle, Clock } from 'lucide-react';
import { mockPatients, mockVisitRequests } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MetricCardProps {
	title: string;
	value: number;
	icon: React.ElementType;
	description: string;
}

function MetricCard({
	title,
	value,
	icon: Icon,
	description,
}: MetricCardProps) {
	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-sm font-medium'>{title}</CardTitle>
				<Icon className='h-4 w-4 text-muted-foreground' />
			</CardHeader>
			<CardContent>
				<div className='text-2xl font-bold'>{value}</div>
				<p className='text-xs text-muted-foreground'>{description}</p>
			</CardContent>
		</Card>
	);
}

export default function DashboardMetrics() {
	const totalPatients = mockPatients.length;
	const pendingVisits = mockVisitRequests.filter(
		(v) => v.status === 'pending',
	).length;
	const completedVisits = mockVisitRequests.filter(
		(v) => v.status === 'completed',
	).length;
	const scheduledVisits = mockVisitRequests.filter(
		(v) => v.status === 'accepted',
	).length;

	return (
		<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
			<MetricCard
				title='Total Patients'
				value={totalPatients}
				icon={Users}
				description='Active patients under care'
			/>
			<MetricCard
				title='Pending Visits'
				value={pendingVisits}
				icon={Clock}
				description='Awaiting assignment'
			/>
			<MetricCard
				title='Scheduled Visits'
				value={scheduledVisits}
				icon={Calendar}
				description='Upcoming visits'
			/>
			<MetricCard
				title='Completed Visits'
				value={completedVisits}
				icon={CheckCircle}
				description='This month'
			/>
		</div>
	);
}
