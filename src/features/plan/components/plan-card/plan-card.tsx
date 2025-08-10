'use client';

import { Button, Card } from '@/features/common/components';
import { addDays } from '@/lib/utils';
import clsx from 'clsx';
import ListItem from './list-item';
import styles from './plan-card.module.css';

type PlanCardProps = { className?: string };

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

export default function PlanCard({ className }: PlanCardProps) {
  return (
    <Card as='section' className={clsx(styles.container, className)}>
      <Button variant='text-lg'>Bro Split</Button>
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
    </Card>
  );
}
