'use client';

import { List } from '@/features/common/components/list';
import { Exercise } from '@/lib/api/db/exercises/types';

type ExerciseListProps = {
  className?: string;
  exercises?: Exercise[] | null;
  // eslint-disable-next-line no-unused-vars
  onExerciseClick?: (exercise: Exercise) => void;
};

export default function ExerciseList({
  className,
  onExerciseClick,
  exercises,
}: ExerciseListProps) {
  return (
    <List
      className={className}
      title='Exercises'
      items={exercises}
      onItemClick={onExerciseClick}
    />
  );
}
