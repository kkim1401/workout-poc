'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
    'http://localhost:3000';
  // Make sure to include `https://` when not localhost.
  url = url.startsWith('http') ? url : `https://${url}`;
  // Make sure to exclude a trailing `/`.
  url = url.endsWith('/') ? url.slice(0, -1) : url;
  return url;
};

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export async function signInWithEmail(
  _prevState: unknown,
  formData: FormData
): Promise<{ fieldErrors?: { email?: string[] }; message?: string } | void> {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return validatedFields.error.flatten();
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: formData.get('email') as string,
    options: {
      emailRedirectTo: getURL(),
    },
  });

  if (error) {
    return { message: error.message };
  }

  revalidatePath('/', 'layout');

  (await cookies()).set('email', formData.get('email') as string);

  redirect('/login/email-sent');
}
