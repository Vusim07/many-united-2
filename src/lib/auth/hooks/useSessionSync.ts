import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { syncSession, clearSession } from '../utils/sessionSync';

export function useSessionSync() {
  const { isSignedIn, user, getToken } = useAuth();

  useEffect(() => {
    let mounted = true;
    let timeoutId: number;

    async function handleSync() {
      if (!isSignedIn || !user) {
        await clearSession();
        return;
      }

      try {
        const token = await getToken({ template: 'supabase' });
        if (mounted && token) {
          await syncSession(user, token);
        }
      } catch (error) {
        console.error('Session sync failed:', error);
        // Retry after delay
        timeoutId = window.setTimeout(handleSync, 5000);
      }
    }

    handleSync();

    return () => {
      mounted = false;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [isSignedIn, user, getToken]);
}