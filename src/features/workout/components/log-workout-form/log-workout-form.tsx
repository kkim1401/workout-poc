'use client';

import { Button, Card } from '@/features/common/components';
import { Workout } from '@/lib/api/db/workouts/types';
import clsx from 'clsx';
import { FormProvider, useForm } from 'react-hook-form';
import styles from './log-workout-form.module.css';

type LogWorkoutFormProps = {
  className?: string;
  workout: Workout | null;
};

export default function LogWorkoutForm({
  className,
  workout,
}: LogWorkoutFormProps) {
  const methods = useForm();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    // Here you would typically send the data to your backend
    // For example, using fetch or axios to log the workout
    console.log('Logging workout:', data);
    // If there's an error, you can set it like this:
    // setError('root', { message: 'An error occurred while logging the workout.' });
  });

  return (
    <FormProvider {...methods}>
      <Card
        className={clsx(styles.container, className)}
        as='form'
        onSubmit={onSubmit}
      >
        <h1 className='headline4'>{workout?.name}</h1>
        {errors?.root?.message && (
          <strong className={styles.error}>{errors.root.message}</strong>
        )}
        <Button type='submit' disabled={isSubmitting}>
          Submit
        </Button>
      </Card>
    </FormProvider>
  );
}
