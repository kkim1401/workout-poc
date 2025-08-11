import { type TypedSupabaseClient } from '@/lib/supabase/types';
import { ProfileInputDTO, ProfileUpdateDTO } from './types';

export const updateUserProfile = async (
  client: TypedSupabaseClient,
  updates: ProfileUpdateDTO
) => {
  return client.from('profiles').update(updates);
};

export const createUserProfile = async (
  client: TypedSupabaseClient,
  profile: ProfileInputDTO
) => {
  return client.from('profiles').insert(profile);
};
