'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export async function signInWithEmail(_prevState: unknown, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: formData.get('email') as string,
  });

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');

  cookies().set('email', formData.get('email') as string);

  redirect('/login/success');
}
