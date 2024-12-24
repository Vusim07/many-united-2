import { supabase } from '@/lib/supabase';

export async function setSupabaseSession(token: string) {
  try {
    const { error } = await supabase.auth.setSession({
      access_token: token,
      refresh_token: token
    });
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Failed to set Supabase session:', error);
    return false;
  }
}

export async function clearSupabaseSession() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Failed to clear Supabase session:', error);
    return false;
  }
}