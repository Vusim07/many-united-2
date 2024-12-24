import React from 'react';
import { Calendar, ClipboardList, Settings } from 'lucide-react';
import { UserButton } from '@/components/auth/UserButton';
import NavLink from '@/components/ui/NavLink';

export default function CHWLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='min-h-screen bg-gray-100'>
			<nav className='bg-white shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between h-16'>
						<div className='flex'>
							<div className='flex-shrink-0 flex items-center'>
								<img
									src='/logo.svg'
									alt='Company Logo'
									className='h-12 w-auto'
								/>
							</div>
							<div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
								<NavLink to='/chw' icon={ClipboardList}>
									Visit Requests
								</NavLink>
								<NavLink to='/chw/schedule' icon={Calendar}>
									Schedule
								</NavLink>
								<NavLink to='/chw/settings' icon={Settings}>
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
