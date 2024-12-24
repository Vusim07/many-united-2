import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Calendar, Users } from 'lucide-react';
import RecentActivity from '@/components/doctor/RecentActivity';
import CareTeamUpdates from './components/CareTeamUpdates';
import DashboardMetrics from './components/DashboardMetrics';

export default function Dashboard() {
	return (
		<div className='flex-1 space-y-8 p-8 pt-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
					<p className='text-muted-foreground'>
						Overview of your practice and recent activity
					</p>
				</div>
			</div>

			{/* Metrics Grid */}
			<DashboardMetrics />

			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
				<Card className='col-span-4'>
					<CardHeader></CardHeader>
					<CardContent>
						<RecentActivity />
					</CardContent>
				</Card>
				<Card className='col-span-3'>
					<CardHeader></CardHeader>
					<CardContent>
						<CareTeamUpdates />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
