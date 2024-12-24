import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export function ProfileImageUpload() {
	const { user } = useUser();
	const { toast } = useToast();
	const [isUploading, setIsUploading] = useState(false);

	const handleImageUpload = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		setIsUploading(true);
		try {
			const formData = new FormData();
			formData.append('file', file);

			// Upload to Clerk
			await user?.setProfileImage({ file });

			toast({
				title: 'Success',
				description: 'Profile image updated successfully',
			});
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Failed to upload image',
				variant: 'destructive',
			});
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className='flex items-center space-x-4'>
			<div className='relative'>
				<img
					src={user?.imageUrl || 'https://via.placeholder.com/100'}
					alt='Profile'
					className='h-20 w-20 rounded-full object-cover'
				/>
				<label
					htmlFor='profile-image'
					className='absolute bottom-0 right-0 p-1 bg-white rounded-full shadow cursor-pointer'
				>
					<Upload className='h-4 w-4' />
					<input
						type='file'
						id='profile-image'
						className='hidden'
						accept='image/*'
						onChange={handleImageUpload}
						disabled={isUploading}
					/>
				</label>
			</div>
			<div>
				<h3 className='font-medium'>{user?.fullName}</h3>
				<p className='text-sm text-gray-500'>
					{user?.primaryEmailAddress?.emailAddress}
				</p>
			</div>
		</div>
	);
}
