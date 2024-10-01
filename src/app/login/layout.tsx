import { Card } from '@/features/common/components';
import { ReactNode } from 'react';
import styles from './layout.module.css';

type LoginLayoutProps = {
  children: ReactNode;
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <section className={styles.container}>
      <Card className={styles.card}>{children}</Card>
    </section>
  );
}
