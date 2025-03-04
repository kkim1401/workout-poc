import { type TypedSupabaseClient } from '@/lib/supabase/types';
import { cache } from 'react';

export const getAllUserExercises = cache(
  async (client: TypedSupabaseClient) => {
    const { data, error } = await client
      .from('user_visible_exercises')
      .select('*');
    if (error) return null;
    return data;
  }
);
