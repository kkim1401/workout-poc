import { type TypedSupabaseClient } from '@/lib/supabase/types';
import { USER_PROFILE_SELECT } from './selectors';

export const getUser = (client: TypedSupabaseClient) => {
  return client.auth.getUser();
};

export const getUserProfile = async (
  client: TypedSupabaseClient,
  userId: string
) => {
  return client
    .from('profiles')
    .select(USER_PROFILE_SELECT)
    .eq('id', userId)
    .single();
};
getUserProfile.getQueryKey = (userId: string) => ['getUserProfile', userId];
