import { useSignUp } from '@clerk/clerk-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { createUserAccount } from '@/lib/auth/signupService';
import { FormFields } from './FormFields';
import { signUpSchema } from './validation';
import type { SignUpFormData } from './types';

export function SignUpForm() {
	const { isLoaded, signUp, setActive } = useSignUp();
	const { toast } = useToast();
	const navigate = useNavigate();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			role: undefined,
		},
	});

	const onSubmit = async (data: SignUpFormData) => {
		if (!isLoaded || isSubmitting || !signUp) return;

		try {
			setIsSubmitting(true);
			console.log('Starting signup process...');

			// Create user account
			const result = await createUserAccount(signUp, data);
			console.log('Signup result:', result.status);

			if (result.status === 'complete') {
				// Set active session
				await setActive({ session: result.createdSessionId });

				toast({
					title: 'Success',
					description: 'Your account has been created successfully.',
				});

				navigate('/complete-profile');
			} else if (result.status === 'missing_requirements') {
				toast({
					title: 'Verification Required',
					description: 'Please check your email to verify your account.',
				});
			} else {
				throw new Error('Unexpected signup status: ' + result.status);
			}
		} catch (err: any) {
			console.error('Signup error:', err);

			toast({
				title: 'Error',
				description:
					err.message || 'Failed to create account. Please try again.',
				variant: 'destructive',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
			<FormFields form={form} />
			<Button type='submit' className='w-full' disabled={isSubmitting}>
				{isSubmitting ? 'Creating account...' : 'Create account'}
			</Button>
		</form>
	);
}
