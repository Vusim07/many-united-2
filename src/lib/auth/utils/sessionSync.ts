import { User } from '@clerk/clerk-react';
import { supabase } from '@/lib/supabase';

export async function syncSession(user: User) {
  try {
    const token = await user.getToken({ template: 'supabase' });
    if (!token) return false;

    const { error } = await supabase.auth.setSession({
      access_token: token,
      refresh_token: token
    });

    return !error;
  } catch (error) {
    console.error('Session sync failed:', error);
    return false;
  }
}

export async function clearSession() {
  try {
    const { error } = await supabase.auth.signOut();
    return !error;
  } catch (error) {
    console.error('Session clear failed:', error);
    return false;
  }
}