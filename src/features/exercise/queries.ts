import { type TypedSupabaseClient } from '@/utils/supabase/types';

export function getAllExercises(client: TypedSupabaseClient) {
  return client.from('common_exercises').select('*');
}
