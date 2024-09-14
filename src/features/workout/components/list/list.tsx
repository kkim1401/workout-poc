'use client';

import { addDays } from '@/utils';
import styles from './list.module.css';
import { Button } from '@/features/common/components';
import ListItem from './list-item';
import clsx from 'clsx';

type ListProps = { className?: string };

// Mock data obviously. Will replace with real data in the future.
const workouts = [
  {
    completed: true,
    date: new Date().toISOString(),
    name: 'Back and Biceps',
    setCount: 20,
  },
  {
    completed: false,
    date: addDays(new Date(), 2).toISOString(),
    name: 'Legs',
    setCount: 18,
  },
  {
    completed: false,
    date: addDays(new Date(), 4).toISOString(),
    name: 'Chest',
    setCount: 21,
  },
];

export default function List({ className }: ListProps) {
  return (
    <section className={clsx(styles.container, className)}>
      <Button variant='text'>Bro Split</Button>
      <ol role='list'>
        {workouts.map((workout, index) => (
          <ListItem
            key={workout.name}
            completed={workout.completed}
            dateInISO={workout.date}
            name={workout.name}
            number={index + 1}
            setCount={workout.setCount}
          />
        ))}
      </ol>
    </section>
  );
}
