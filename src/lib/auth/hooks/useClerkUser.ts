import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { useSupabaseClient } from '@/lib/supabase';
import { syncUserWithSupabase } from '../userSync';
import type { Database } from '@/lib/database.types';
import { tempStorage } from '@/lib/auth/storage';

type User = Database['public']['Tables']['users']['Row'];

export function useClerkUser() {
	const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const supabase = useSupabaseClient();

	useEffect(() => {
		let mounted = true;

		async function fetchUserFromSupabase(clerkId: string) {
			const { data, error } = await supabase
				.from('users')
				.select('*')
				.eq('clerk_id', clerkId)
				.single();

			if (error) {
				console.error('Error fetching user from Supabase:', error);
				return null;
			}

			return data;
		}

		async function syncUser() {
			if (!clerkUser) {
				if (mounted) {
					setUser(null);
					setIsLoading(false);
				}
				return;
			}

			try {
				// First try to get the user from Supabase
				const supabaseUser = await fetchUserFromSupabase(clerkUser.id);

				if (supabaseUser) {
					// If we found the user in Supabase, use that data
					if (mounted) {
						setUser(supabaseUser);
						setError(null);
					}
				} else {
					// If not in Supabase, try to sync using existing logic
					const syncedUser = await syncUserWithSupabase(clerkUser, supabase);
					if (mounted) {
						setUser(syncedUser);
						setError(null);
					}
				}
			} catch (err) {
				console.error('Error syncing user:', err);
				if (mounted) {
					setError(
						err instanceof Error ? err : new Error('Failed to sync user'),
					);
				}
			} finally {
				if (mounted) {
					setIsLoading(false);
				}
			}
		}

		if (isClerkLoaded) {
			syncUser();
		}

		return () => {
			mounted = false;
		};
	}, [clerkUser, isClerkLoaded, supabase]);

	return {
		user,
		isLoading: isLoading || !isClerkLoaded,
		error,
		clerkUser,
	};
}
