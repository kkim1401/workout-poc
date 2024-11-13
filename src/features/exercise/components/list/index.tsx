'use client';

import dynamic from 'next/dynamic';

/**
 * Workaround for bug in Next.js that includes dynamic
 * components in the initial bundle:
 * https://github.com/vercel/next.js/issues/61066#issuecomment-2058080448
 */
export const List = dynamic(() => import('./list'), {
  loading: () => <div>Loading...</div>,
});
