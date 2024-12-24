import { Link } from 'react-router-dom';
import { SignInForm } from './SignInForm';

export function SignIn() {
	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-md w-full space-y-8'>
				<div className='flex justify-center'>
					<img src='/logo.svg' alt='Company Logo' className='h-20 w-auto' />
				</div>
				<div className='text-center'>
					<h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
						Sign in to your account
					</h2>
					<p className='mt-2 text-sm text-gray-600'>
						Or{' '}
						<Link
							to='/sign-up'
							className='font-medium text-blue-600 hover:text-blue-500'
						>
							create a new account
						</Link>
					</p>
				</div>

				<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					<SignInForm />
				</div>
			</div>
		</div>
	);
}
