import { type TypedSupabaseClient } from '@/lib/supabase/types';

export const getAllUserExercises = (client: TypedSupabaseClient) => {
  return client.from('user_visible_exercises').select('*');
};
