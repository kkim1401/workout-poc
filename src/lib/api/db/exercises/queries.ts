import { type TypedSupabaseClient } from '@/lib/supabase/types';
import { cache } from 'react';
import { Exercise } from './types';

export const getAllExercises = cache(
  async (client: TypedSupabaseClient): Promise<Exercise[]> => {
    try {
      const response = await client.from('user_visible_exercises').select('*');
      if (response.error) {
        throw response.error;
      }
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);
