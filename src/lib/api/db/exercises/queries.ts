import { type TypedSupabaseClient } from '@/lib/supabase/types';

export function getAllExercises(client: TypedSupabaseClient) {
  return client.from('common_exercises').select('*');
}
