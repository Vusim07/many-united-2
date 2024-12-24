import { useAuth, useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useSupabaseClient } from '@/lib/supabase';
import { syncUserWithSupabase } from '../userSync';

export function useClerkAuth() {
  const { isLoaded, isSignedIn, sessionId } = useAuth();
  const { user } = useUser();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (isSignedIn && user) {
      syncUserWithSupabase(user, supabase).catch(console.error);
    }
  }, [isSignedIn, user, supabase]);

  return {
    isLoaded,
    isSignedIn,
    user,
    sessionId,
  };
}