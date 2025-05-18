'use client';

import { Button } from '@/features/common/components';
import { WorkoutExercise, WorkoutExerciseSet } from '@/features/workout/types';
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

export default function ExercisesField({ className }: ExercisesFieldProps) {
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>(
    []
  );

  const modalRef = useRef<HTMLDialogElement>(null);

  const handleAddWorkoutExercise = (exercise: Exercise) => {
    const newSet: WorkoutExerciseSet = {
      exercise_name: exercise.name,
      weight: null,
      reps: null,
    };
    setWorkoutExercises([
      ...workoutExercises,
      { exerciseName: exercise.name, sets: [newSet] },
    ]);
    modalRef.current?.close();
  };

  const createEditSetsHandler =
    (exerciseIndex: number) => (set: Partial<Set>, setIndex: number) => {
      setWorkoutExercises(
        workoutExercises.map((currWorkoutExercise, exerciseI) => {
          if (exerciseIndex === exerciseI) {
            return {
              ...currWorkoutExercise,
              sets: currWorkoutExercise.sets.map((currSet, setI) => {
                if (setIndex === setI) {
                  return {
                    ...currSet,
                    ...set,
                  };
                }
                return currSet;
              }),
            };
          }
          return currWorkoutExercise;
        })
      );
    };

  const createAddSetsHandler = (index: number) => () => {
    setWorkoutExercises(
      workoutExercises.map((workoutExercise, i) => {
        if (index === i) {
          const newSet: WorkoutExerciseSet = {
            exercise_name: workoutExercise.exerciseName,
            weight: null,
            reps: null,
          };
          return {
            ...workoutExercise,
            sets: [...workoutExercise.sets, newSet],
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
      <input
        type='hidden'
        name='workoutExercises'
        value={JSON.stringify(workoutExercises)}
      />
      {workoutExercises.length > 0 &&
        workoutExercises.map(({ exerciseName, sets }, i) => (
          <ExercisesFieldItem
            onAddSetClick={createAddSetsHandler(i)}
            onSetChange={createEditSetsHandler(i)}
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
