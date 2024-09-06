'use client';
import { addDays, concatClasses } from '@/utils';
import styles from './list.module.css';
import { Button } from '@/features/common/components';
import { ListItem } from '../list-item';

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
    <section className={concatClasses(styles.container, className)}>
      <Button variant='text'>Bro Split</Button>
      <ol>
        {workouts.map((workout) => (
          <ListItem
            key={workout.name}
            completed={workout.completed}
            date={workout.date}
            name={workout.name}
            setCount={workout.setCount}
          />
        ))}
      </ol>
    </section>
  );
}
