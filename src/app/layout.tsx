import type { Metadata } from 'next';
import { Roboto_Flex } from 'next/font/google';
import { ReactNode } from 'react';
import styles from './layout.module.css';
import './globals.css';
import { Topbar } from '@/features/common/components';
import { createClient } from '@/lib/supabase/server';
import Providers from './providers';

const roboto = Roboto_Flex({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Workout PoC',
  description: 'Light weight!',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  const isLoggedIn = Boolean(data?.user);
  const links = [{ title: 'Home', href: '/' }];

  return (
    <html className={styles.container} lang='en'>
      <body className={roboto.className}>
        <Providers>
          <Topbar links={links} isLoggedIn={isLoggedIn} />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
