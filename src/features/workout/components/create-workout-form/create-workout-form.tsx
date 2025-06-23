'use client';

import { Button, Card, TextField } from '@/features/common/components';
import { useSupabaseBrowser } from '@/lib/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { createWorkoutSchema } from '../../schemas';
import styles from './create-workout-form.module.css';
import { ExerciseField } from './exercise-field';

type CreateWorkoutFormProps = {
  className?: string;
};

export default function CreateWorkoutForm({
  className,
}: CreateWorkoutFormProps) {
  const supabase = useSupabaseBrowser();

  const router = useRouter();

  const methods = useForm({
    resolver: zodResolver(createWorkoutSchema),
    defaultValues: {
      title: '',
      workoutExercises: [],
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const { data: id, error } = await supabase.rpc('create_workout', {
      name: data.title,
      workout_exercises: data.workoutExercises,
    });
    if (error) {
      setError('root', { message: error.message });
    } else {
      router.push(`/workouts/${id}`);
    }
  });

  return (
    <FormProvider {...methods}>
      <Card
        className={clsx(styles.container, className)}
        as='form'
        onSubmit={onSubmit}
      >
        <h1 className='headline4'>Create Workout</h1>
        {errors?.root?.message && (
          <strong className={styles.error}>{errors.root.message}</strong>
        )}
        <TextField
          type='text'
          label='Title'
          {...register('title')}
          error={errors?.title?.message}
        />
        <ExerciseField className={styles.exerciseField} />
        <Button disabled={isSubmitting} className={styles.saveWorkoutButton}>
          Save Workout
        </Button>
      </Card>
    </FormProvider>
  );
}
