import type { Metadata } from 'next';
import { Roboto_Flex } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';
import { Topbar } from '@/features/common/components';

const roboto = Roboto_Flex({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Workout PoC',
  description: 'Light weight!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <Topbar links={['/login']} />
        <main>{children}</main>
      </body>
    </html>
  );
}
