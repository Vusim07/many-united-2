import { User } from '@clerk/clerk-react';
import { SupabaseClient } from '@supabase/supabase-js';
import { UserSyncError } from './errors';
import { tempStorage } from './storage';
import type { Database } from '../database.types';

export async function syncUserWithSupabase(
	clerkUser: User,
	supabase: SupabaseClient<Database>,
) {
	try {
		// Check both metadata and storage for role
		const metadataRole = clerkUser.publicMetadata.role as string | undefined;
		const storedRole = tempStorage.getRole();
		const role = metadataRole || storedRole;

		if (!role) {
			console.warn('No role found for user:', clerkUser.id, {
				metadataRole,
				storedRole,
				publicMetadata: clerkUser.publicMetadata,
			});
			return null;
		}

		const userData = {
			clerk_id: clerkUser.id,
			email: clerkUser.primaryEmailAddress?.emailAddress || '',
			name: `${clerkUser.firstName} ${clerkUser.lastName}`,
			role: role as string,
			updated_at: new Date().toISOString(),
		};

		// Upsert user data
		const { data, error } = await supabase
			.from('users')
			.upsert(userData, {
				onConflict: 'clerk_id',
				ignoreDuplicates: false,
			})
			.select()
			.single();

		if (error) {
			console.error('Supabase upsert error:', error);
			throw error;
		}

		// Clear temporary storage after successful sync
		tempStorage.clearRole();

		return data;
	} catch (error) {
		console.error('User sync error:', error);
		throw error instanceof UserSyncError
			? error
			: new UserSyncError('Failed to sync user with database', error);
	}
}
