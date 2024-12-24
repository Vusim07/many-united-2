import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { useSupabaseClient } from '@/lib/supabase';
import { syncUserWithSupabase } from '@/lib/auth/userSync';
import { tempStorage } from '@/lib/auth/storage';
import type { Database } from '@/lib/database.types';

type User = Database['public']['Tables']['users']['Row'];

export function useClerkUser() {
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = useSupabaseClient();

  useEffect(() => {
    let mounted = true;
    let retryCount = 0;
    const maxRetries = 3;

    async function syncUser() {
      if (!clerkUser) {
        if (mounted) {
          setUser(null);
          setIsLoading(false);
        }
        return;
      }

      try {
        // Get role from either metadata or storage
        const role = clerkUser.publicMetadata.role || tempStorage.getRole();
        
        if (!role && retryCount < maxRetries) {
          retryCount++;
          setTimeout(syncUser, 1000); // Retry after 1 second
          return;
        }

        const syncedUser = await syncUserWithSupabase(clerkUser, supabase);
        
        if (mounted) {
          setUser(syncedUser);
          setError(null);
        }
      } catch (err) {
        console.error('Error syncing user:', err);
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to sync user'));
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