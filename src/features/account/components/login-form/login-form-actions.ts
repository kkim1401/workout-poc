'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function signInWithEmail(formData: FormData) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOtp({
    // type-casting here for convenience
    // in practice, you should validate your inputs
    email: formData.get('email') as string,
  });

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
