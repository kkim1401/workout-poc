import { type TypedSupabaseClient } from '@/lib/supabase/types';
import { cache } from 'react';

export const getUser = cache(async (client: TypedSupabaseClient) => {
  const { data, error } = await client.auth.getUser();
  if (error) return null;
  return data.user;
});
