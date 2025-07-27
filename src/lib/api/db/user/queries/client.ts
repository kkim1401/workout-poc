import { type TypedSupabaseClient } from '@/lib/supabase/types';

export const getUser = (client: TypedSupabaseClient) => {
  return client.auth.getUser();
};

export const getUserProfile = async (
  client: TypedSupabaseClient,
  userId: string
) => {
  return client.from('profiles').select('*').eq('id', userId).single();
};
getUserProfile.getQueryKey = (userId: string) => ['getUserProfile', userId];
