import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { setSupabaseSession, clearSupabaseSession } from '../utils/supabaseAuth';

export function useAuthSync() {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    let mounted = true;

    async function syncSession() {
      if (!isSignedIn) {
        await clearSupabaseSession();
        return;
      }

      try {
        const token = await getToken({ template: 'supabase' });
        if (mounted && token) {
          await setSupabaseSession(token);
        }
      } catch (error) {
        console.error('Failed to sync auth session:', error);
      }
    }

    syncSession();
    return () => {
      mounted = false;
    };
  }, [isSignedIn, getToken]);
}