'use client';

import { Button, Card, TextField } from '@/features/common/components';
import clsx from 'clsx';
import { useActionState } from 'react';
import styles from './create-workout-form.module.css';
import { ExerciseField } from './exercise-field';

type CreateWorkoutFormProps = {
  /* eslint-disable no-unused-vars*/
  action: (
    prevData: unknown,
    formData: FormData
  ) => Promise<{ formErrors?: { title?: string[] }; message?: string } | void>;
  /* eslint-enable no-unused-vars*/
  className?: string;
};

const initialState = {};

export default function CreateWorkoutForm({
  action,
  className,
}: CreateWorkoutFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <Card
      action={formAction}
      className={clsx(styles.container, className)}
      as='form'
    >
      <h1 className='headline4'>Create Workout</h1>
      {state?.message && (
        <strong className={styles.error}>{state?.message}</strong>
      )}
      <TextField name='title' type='text' label='Title' />
      <ExerciseField className={styles.exerciseField} />
      <Button disabled={pending} className={styles.saveWorkoutButton}>
        Save Workout
      </Button>
    </Card>
  );
}
