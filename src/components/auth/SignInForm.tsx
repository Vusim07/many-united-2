import { useSignIn, useAuth } from '@clerk/clerk-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';

const signInSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
});

type SignInForm = z.infer<typeof signInSchema>;

export function SignInForm() {
	const { isLoaded, signIn, setActive } = useSignIn();
	const { isSignedIn } = useAuth();
	const { toast } = useToast();
	const navigate = useNavigate();

	// Redirect if already signed in
	useEffect(() => {
		if (isSignedIn) {
			navigate('/');
		}
	}, [isSignedIn, navigate]);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInForm>({
		resolver: zodResolver(signInSchema),
	});

	const onSubmit = async (data: SignInForm) => {
		if (!isLoaded || isSignedIn) return;

		try {
			const result = await signIn.create({
				identifier: data.email,
				password: data.password,
			});

			if (result.status === 'complete') {
				await setActive({ session: result.createdSessionId });

				toast({
					title: 'Success',
					description: 'Successfully signed in.',
				});

				// Navigate to the appropriate page
				navigate('/');
			} else {
				toast({
					title: 'Error',
					description: 'Something went wrong. Please try again.',
					variant: 'destructive',
				});
			}
		} catch (err) {
			console.error('Sign in error:', err);

			// More specific error handling
			const errorMessage = isSignedIn
				? 'You are already signed in'
				: 'Invalid email or password';

			toast({
				title: 'Error',
				description: errorMessage,
				variant: 'destructive',
			});
		}
	};

	// Show loading state if checking auth status
	if (!isLoaded) {
		return (
			<div className='flex justify-center'>
				<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600' />
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
			<div>
				<Label htmlFor='email'>Email</Label>
				<Input
					id='email'
					type='email'
					{...register('email')}
					className='mt-1'
				/>
				{errors.email && (
					<p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>
				)}
			</div>

			<div>
				<Label htmlFor='password'>Password</Label>
				<Input
					id='password'
					type='password'
					{...register('password')}
					className='mt-1'
				/>
				{errors.password && (
					<p className='mt-1 text-sm text-red-600'>{errors.password.message}</p>
				)}
			</div>

			<Button type='submit' className='w-full' disabled={isSubmitting}>
				{isSubmitting ? 'Signing in...' : 'Sign in'}
			</Button>
		</form>
	);
}
