import React from 'react';
import { Users, Calendar, Settings, LogOut, Home } from 'lucide-react';
import { UserButton } from '@/components/auth/UserButton';
import NavLink from '@/components/ui/NavLink';

export default function DoctorLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='min-h-screen bg-gray-100'>
			<nav className='bg-white shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between h-16'>
						<div className='flex'>
							<div className='flex-shrink-0 flex items-center'>
								<img
									src='/logo.svg'
									alt='Many United'
									className='h-12 w-auto'
								/>
							</div>
							<div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
								<NavLink to='/doctor' icon={Home}>
									Home
								</NavLink>

								<NavLink to='/doctor/patients' icon={Users}>
									Patients
								</NavLink>
								<NavLink to='/doctor/visits' icon={Calendar}>
									Visits
								</NavLink>
								<NavLink to='/doctor/settings' icon={Settings}>
									Settings
								</NavLink>
							</div>
						</div>
						<div className='flex items-center space-x-4'>
							<UserButton />
						</div>
					</div>
				</div>
			</nav>

			<main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>{children}</main>
		</div>
	);
}
