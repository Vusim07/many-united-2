import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';
import { useClerkUser } from '@/hooks/useClerkUser';
import { useSupabaseClient } from '@/lib/supabase';
import { DoctorProfileForm } from '@/components/auth/DoctorProfileForm';
import { CHWProfileForm } from '@/components/auth/CHWProfileForm';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

export function CompleteProfilePage() {
	const navigate = useNavigate();
	const { user, clerkUser, isLoading } = useClerkUser();
	const supabase = useSupabaseClient();
	const { toast } = useToast();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleProfileSubmit = async (data: any) => {
		if (!user?.id) return;

		setIsSubmitting(true);
		try {
			const { error } = await supabase
				.from('users')
				.update({
					...data,
					updated_at: new Date().toISOString(),
				})
				.eq('id', user.id);

			if (error) throw error;

			toast({
				title: 'Success',
				description: 'Your profile has been updated.',
			});

			navigate(user.role === 'doctor' ? '/doctor' : '/chw');
		} catch (error) {
			console.error('Profile update error:', error);
			toast({
				title: 'Error',
				description: 'Failed to update profile. Please try again.',
				variant: 'destructive',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	// Show loading state while user data is being fetched
	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<Loader2 className='h-8 w-8 animate-spin text-blue-600' />
			</div>
		);
	}

	// Show error state if no user or role is found in Supabase
	if (!user?.role) {
		console.log(clerkUser);

		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<h2 className='text-xl font-semibold text-gray-900'>
						Unable to load profile
					</h2>
					<p className='mt-2 text-sm text-gray-600'>
						Please try signing in again.
					</p>
					<p className='mt-2 text-xs text-gray-500'>
						{clerkUser ? 'User found but role not set' : 'No user found'}
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-md w-full space-y-8'>
				<div className='text-center'>
					<Stethoscope className='mx-auto h-12 w-12 text-blue-600' />
					<h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
						Complete Your Profile
					</h2>
					<p className='mt-2 text-sm text-gray-600'>
						Please provide additional information to complete your profile
					</p>
				</div>

				<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					{user.role === 'doctor' ? (
						<DoctorProfileForm
							onSubmit={handleProfileSubmit}
							isSubmitting={isSubmitting}
						/>
					) : (
						<CHWProfileForm
							onSubmit={handleProfileSubmit}
							isSubmitting={isSubmitting}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
