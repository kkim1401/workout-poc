'use client';

import { Button } from '@/features/common/components';
import { Exercise } from '@/lib/api/db/exercises/types';
import { Set } from '@/lib/api/db/sets/types';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import ExercisesModal from '../exercises-modal';
import { ExercisesFieldItem } from './exercises-field-item';
import styles from './exercises-field.module.css';

type ExercisesFieldProps = {
  className?: string;
};

/**
 * When getting workout, the UI will get a list of sets, ordered by when they should
 * be done. UI will group them by exercise.
 * WorkoutExercise is a UI model representing the group, containing the exercise metadata (just name in this case)
 * and sets.
 */
type WorkoutExercise = {
  exerciseName: Exercise['name'];
  sets: Partial<Set>[];
};

export default function ExercisesField({ className }: ExercisesFieldProps) {
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>(
    []
  );

  const modalRef = useRef<HTMLDialogElement>(null);

  const handleAddWorkoutExercise = (exercise: Exercise) => {
    setWorkoutExercises([
      ...workoutExercises,
      { exerciseName: exercise.name, sets: [{ weight: 0, reps: 0 }] },
    ]);
    modalRef.current?.close();
  };

  const createAddSetsHandler = (index: number) => () => {
    setWorkoutExercises(
      workoutExercises.map((workoutExercise, i) => {
        if (index === i) {
          return {
            ...workoutExercise,
            sets: [...workoutExercise.sets, { weight: 0, reps: 0 }],
          };
        }
        return workoutExercise;
      })
    );
  };

  return (
    <section className={clsx(styles.container, 'subtitle1', className)}>
      <ExercisesModal
        ref={modalRef}
        onExerciseClick={handleAddWorkoutExercise}
      />
      <span>Exercises</span>
      {workoutExercises.length > 0 &&
        workoutExercises.map(({ exerciseName, sets }, i) => (
          <ExercisesFieldItem
            onAddSetClick={createAddSetsHandler(i)}
            key={i}
            exerciseName={exerciseName}
            sets={sets}
          />
        ))}
      <Button
        className={styles.addExerciseButton}
        variant='outlined'
        onClick={() => {
          modalRef.current?.showModal();
        }}
        type='button'
      >
        Add Exercise
      </Button>
    </section>
  );
}
