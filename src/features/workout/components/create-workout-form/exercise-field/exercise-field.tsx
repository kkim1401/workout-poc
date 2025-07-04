'use client';

import { Button } from '@/features/common/components';
import { Exercise } from '@/lib/api/db/exercises/types';
import clsx from 'clsx';
import { useRef } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import ExerciseModal from '../exercise-modal';
import { ExerciseFieldItem } from './exercise-field-item';
import styles from './exercise-field.module.css';

type ExercisesFieldProps = {
  className?: string;
};

export default function ExercisesField({ className }: ExercisesFieldProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const { register } = useFormContext();
  const { fields, append } = useFieldArray({
    name: 'workout_exercises',
  });

  const handleExerciseClick = (exercise: Exercise) => {
    append({
      exercise_name: exercise.name,
      exercise_id: exercise.id,
      sets: [{ exercise_name: exercise.name }],
    });
    modalRef.current?.close();
  };

  return (
    <section className={clsx(styles.container, 'subtitle1', className)}>
      <ExerciseModal ref={modalRef} onExerciseClick={handleExerciseClick} />
      <span>Exercises</span>
      {fields.map((field, index) => {
        register(`workoutExercises.${index}.exercise_name`);
        register(`workoutExercises.${index}.exercise_id`);
        return <ExerciseFieldItem exerciseIndex={index} key={field.id} />;
      })}
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
