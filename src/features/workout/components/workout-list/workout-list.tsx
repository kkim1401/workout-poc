'use client';

import { List } from '@/features/common/components/list';
import { Workout } from '@/lib/api/db/workouts/types';

type WorkoutListProps = {
  className?: string;
  workouts?: Workout[] | null;
  // eslint-disable-next-line no-unused-vars
  onWorkoutClick?: (Workout: Workout) => void;
};

export default function WorkoutList({
  className,
  onWorkoutClick,
  workouts,
}: WorkoutListProps) {
  return (
    <List
      className={className}
      title='Workouts'
      items={workouts}
      onItemClick={onWorkoutClick}
    />
  );
}
