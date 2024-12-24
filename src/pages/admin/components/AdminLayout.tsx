import React from 'react';
import { Users, Settings, LogOut, Home } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import NavLink from '@/components/ui/NavLink';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const logout = useAuthStore((state) => state.logout);

	return (
		<div className='min-h-screen bg-gray-100'>
			<nav className='bg-white shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between h-16'>
						<div className='flex'>
							<div className='flex-shrink-0 flex items-center'>
								<span className='text-xl font-bold text-blue-600'>
									Admin Portal
								</span>
							</div>
							<div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
								<NavLink to='/admin' icon={Home}>
									Dashboard
								</NavLink>
								<NavLink to='/admin/chw-management' icon={Users}>
									CHW Management
								</NavLink>
								<NavLink to='/admin/settings' icon={Settings}>
									Settings
								</NavLink>
							</div>
						</div>
						<div className='flex items-center'>
							<Button
								onClick={logout}
								className='p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none'
							>
								<LogOut className='h-5 w-5' />
							</Button>
						</div>
					</div>
				</div>
			</nav>

			<main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>{children}</main>
		</div>
	);
}
