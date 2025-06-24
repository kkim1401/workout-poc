import { type TypedSupabaseClient } from '@/lib/supabase/types';

export const getAllUserWorkouts = (client: TypedSupabaseClient) => {
  return client.from('workouts').select('*');
};
