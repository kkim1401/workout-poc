'use client';

import { List } from '@/features/common/components/list';
import { Workout } from '@/lib/api/db/workouts/types';
import { useRouter } from 'next/navigation';

type WorkoutListProps = {
  className?: string;
  workouts?: Workout[] | null;
};

export default function WorkoutList({ className, workouts }: WorkoutListProps) {
  const router = useRouter();

  const onWorkoutClick = (workout: Workout) => {
    router.push(`/workouts/${workout.id}`);
  };

  return (
    <List
      className={className}
      title='Workouts'
      items={workouts}
      onItemClick={onWorkoutClick}
    />
  );
}
