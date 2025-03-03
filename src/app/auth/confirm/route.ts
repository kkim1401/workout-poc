import { createClient } from '@/lib/supabase/server';
import { type EmailOtpType } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('redirect_to') ?? '/?logged_in=true';

  if (token_hash && type) {
    let supabase;
    try {
      supabase = await createClient();
    } catch (e) {
      console.error(e);
      redirect('/login');
    }

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      /**
       * In Server Actions and Route Handlers,
       * redirect should be called after the try/catch block.
       * https://nextjs.org/docs/app/api-reference/functions/redirect
       */
      redirect(next);
    } else {
      console.error(error);
      redirect('/login');
    }
  }
}
