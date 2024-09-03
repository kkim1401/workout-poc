'use client';

import { concatClassNames } from '@/utils';
import styles from './list.module.css';
import { Button } from '@/features/common/components';

export default function List({ className }: { className?: string }) {
  return (
    <section className={concatClassNames(styles.container, className)}>
      <Button variant='text'>Bro Split</Button>
    </section>
  );
}
