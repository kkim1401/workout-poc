import { type TypedSupabaseClient } from '@/lib/supabase/types';

export const getUser = (client: TypedSupabaseClient) => {
  return client.auth.getUser();
};
