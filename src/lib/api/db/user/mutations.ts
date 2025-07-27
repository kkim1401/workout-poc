import { type TypedSupabaseClient } from '@/lib/supabase/types';
import { ProfileUpdate } from './types';

export const updateUserProfile = async (
  client: TypedSupabaseClient,
  userId: string,
  updates: Omit<ProfileUpdate, 'id'>
) => {
  return client
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
};

export const createUserProfile = async (
  client: TypedSupabaseClient,
  userId: string,
  profile: Omit<ProfileUpdate, 'id'>
) => {
  return client
    .from('profiles')
    .insert({ ...profile, id: userId })
    .select()
    .single();
};
