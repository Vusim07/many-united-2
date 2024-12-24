import type { Database } from '../database.types';

export type SupabaseClient = ReturnType<typeof import('@supabase/supabase-js').createClient<Database>>;
export type SupabaseError = {
  code: string;
  message: string;
  details?: string;
};