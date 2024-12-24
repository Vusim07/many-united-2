import { UserButton as ClerkUserButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { neobrutalism } from '@clerk/themes';

export function UserButton() {
	const navigate = useNavigate();

	return (
		<ClerkUserButton
			afterSignOutUrl='/sign-in'
			appearance={{
				baseTheme: neobrutalism, // Use the light theme
				elements: {
					avatarBox: 'h-8 w-8',
					popover: 'bg-white shadow-lg rounded-lg',
					popoverFooter: 'bg-gray-100 text-sm',
					popoverTitle: 'text-gray-800 font-semibold',
				},
			}}
		/>
	);
}
