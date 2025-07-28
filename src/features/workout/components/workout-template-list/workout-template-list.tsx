'use client';

import { List } from '@/features/common/components/list';
import { WorkoutTemplate } from '@/lib/api/db/workouts/types';
import { useRouter } from 'next/navigation';

type WorkoutTemplateListProps = {
  className?: string;
  workoutTemplates?: WorkoutTemplate[] | null;
};

export default function WorkoutTemplateList({
  className,
  workoutTemplates,
}: WorkoutTemplateListProps) {
  const router = useRouter();

  const onWorkoutClick = (workout: WorkoutTemplate) => {
    router.push(`/workouts/templates/${workout.id}`);
  };

  return (
    <List
      className={className}
      title='Workouts'
      items={workoutTemplates}
      onItemClick={onWorkoutClick}
    />
  );
}
