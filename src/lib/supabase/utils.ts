import { supabase } from './client';

export async function handleSupabaseError(error: any): Promise<void> {
  console.error('Supabase error:', error);
  
  // Add specific error handling based on error codes
  if (error.code === 'PGRST301') {
    throw new Error('Database connection failed');
  }
  
  throw error;
}

export async function withErrorHandling<T>(
  operation: () => Promise<T>
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    await handleSupabaseError(error);
    throw error; // TypeScript needs this
  }
}