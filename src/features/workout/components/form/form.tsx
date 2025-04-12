'use client';

import { Button, Card, TextField } from '@/features/common/components';
import clsx from 'clsx';
import { useActionState } from 'react';
import { ExercisesField } from './exercises-field';
import styles from './form.module.css';

type FormProps = {
  /* eslint-disable no-unused-vars*/
  action: (
    prevData: unknown,
    formData: FormData
  ) => Promise<{ formErrors?: { title?: string[] }; message?: string } | void>;
  /* eslint-enable no-unused-vars*/
  className?: string;
};

const initialState = {};

export default function Form({ action, className }: FormProps) {
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
      <ExercisesField className={styles.exercisesField} />
      <Button disabled={pending} className={styles.saveWorkoutButton}>
        Save Workout
      </Button>
    </Card>
  );
}
