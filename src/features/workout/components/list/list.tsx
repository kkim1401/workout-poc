'use client';
import { concatClasses } from '@/utils';
import styles from './list.module.css';
import { Button } from '@/features/common/components';

type ListProps = { className?: string };

export default function List({ className }: ListProps) {
  return (
    <section className={concatClasses(styles.container, className)}>
      <Button variant='text'>Bro Split</Button>
    </section>
  );
}
