import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const doctorProfileSchema = z.object({
	specialty: z.string().min(1, 'Specialty is required'),
	license_number: z.string().min(1, 'License number is required'),
	phone: z.string().min(1, 'Phone number is required'),
});

type DoctorProfileForm = z.infer<typeof doctorProfileSchema>;

interface DoctorProfileFormProps {
	onSubmit: (data: DoctorProfileForm) => Promise<void>;
	isSubmitting?: boolean;
}

export function DoctorProfileForm({
	onSubmit,
	isSubmitting,
}: DoctorProfileFormProps) {
	const { toast } = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<DoctorProfileForm>({
		resolver: zodResolver(doctorProfileSchema),
	});

	const handleFormSubmit = async (data: DoctorProfileForm) => {
		try {
			await onSubmit(data);
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Failed to update profile. Please try again.',
				variant: 'destructive',
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-4'>
			<div>
				<Label htmlFor='specialty'>Medical Specialty</Label>
				<Input id='specialty' {...register('specialty')} className='mt-1' />
				{errors.specialty && (
					<p className='mt-1 text-sm text-red-600'>
						{errors.specialty.message}
					</p>
				)}
			</div>

			<div>
				<Label htmlFor='license_number'>Medical License Number</Label>
				<Input
					id='license_number'
					{...register('license_number')}
					className='mt-1'
				/>
				{errors.license_number && (
					<p className='mt-1 text-sm text-red-600'>
						{errors.license_number.message}
					</p>
				)}
			</div>

			<div>
				<Label htmlFor='phone'>Phone Number</Label>
				<Input id='phone' type='tel' {...register('phone')} className='mt-1' />
				{errors.phone && (
					<p className='mt-1 text-sm text-red-600'>{errors.phone.message}</p>
				)}
			</div>

			<Button type='submit' className='w-full' disabled={isSubmitting}>
				{isSubmitting ? 'Saving...' : 'Complete Profile'}
			</Button>
		</form>
	);
}
