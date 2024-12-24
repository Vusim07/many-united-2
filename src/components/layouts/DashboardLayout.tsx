import { UserButton } from '@/components/auth/UserButton';

interface DashboardLayoutProps {
	children: React.ReactNode;
	navigation: {
		name: string;
		href: string;
		icon: React.ComponentType<{ className?: string }>;
	}[];
}

export function DashboardLayout({
	children,
	navigation,
}: DashboardLayoutProps) {
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
									className='h-8 w-auto'
								/>
							</div>
							<div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
								{navigation.map((item) => (
									<a
										key={item.name}
										href={item.href}
										className='inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700'
									>
										<item.icon className='h-4 w-4 mr-2' />
										{item.name}
									</a>
								))}
							</div>
						</div>
						<div className='flex items-center'>
							<UserButton />
						</div>
					</div>
				</div>
			</nav>

			<main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>{children}</main>
		</div>
	);
}
