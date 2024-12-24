import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useClerkUser } from '@/hooks/useClerkUser';
import { ProfileImageUpload } from './ProfileImageUpload';

const profileSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	phone: z.string().min(1, 'Phone number is required'),
	specialty: z.string().optional(),
	license_number: z.string().optional(),
	area: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

export function ProfileSettings() {
	const { user, clerkUser } = useClerkUser();
	const { toast } = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ProfileForm>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: user?.name || '',
			phone: user?.phone || '',
			specialty: user?.specialty || '',
			license_number: user?.license_number || '',
			area: user?.area || '',
		},
	});

	const onSubmit = async (data: ProfileForm) => {
		try {
			// Update Clerk profile
			await clerkUser?.update({
				firstName: data.name.split(' ')[0],
				lastName: data.name.split(' ').slice(1).join(' '),
			});

			toast({
				title: 'Success',
				description: 'Profile updated successfully',
			});
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Failed to update profile',
				variant: 'destructive',
			});
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Profile Settings</CardTitle>
			</CardHeader>
			<CardContent className='space-y-6'>
				<ProfileImageUpload />

				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					<div>
						<Label htmlFor='name'>Full Name</Label>
						<Input id='name' {...register('name')} value={user?.name} />
						{errors.name && (
							<p className='mt-1 text-sm text-red-600'>{errors.name.message}</p>
						)}
					</div>

					<div>
						<Label htmlFor='phone'>Phone Number</Label>
						<Input
							id='phone'
							type='tel'
							{...register('phone')}
							value={user?.phone as any}
						/>
						{errors.phone && (
							<p className='mt-1 text-sm text-red-600'>
								{errors.phone.message}
							</p>
						)}
					</div>

					{user?.role === 'doctor' && (
						<>
							<div>
								<Label htmlFor='specialty'>Medical Specialty</Label>
								<Input
									id='specialty'
									{...register('specialty')}
									value={user?.specialty as any}
								/>
							</div>

							<div>
								<Label htmlFor='license_number'>License Number</Label>
								<Input
									id='license_number'
									{...register('license_number')}
									value={user?.license_number as any}
								/>
							</div>
						</>
					)}

					{user?.role === 'chw' && (
						<div>
							<Label htmlFor='area'>Service Area</Label>
							<Input
								id='area'
								{...register('area')}
								value={user?.area as any}
							/>
						</div>
					)}

					<Button type='submit' disabled={isSubmitting}>
						{isSubmitting ? 'Saving...' : 'Save Changes'}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
