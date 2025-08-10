'use client';

import { Button } from '@/features/common/components';
import { getExerciseByIndexFromWorkoutInstance } from '@/features/workout/helpers';
import { logExerciseSchema } from '@/features/workout/schemas';
import { createSetInstance } from '@/lib/api/db/sets/mutations';
import { WorkoutInstance } from '@/lib/api/db/workouts/types';
import { useSupabaseBrowser } from '@/lib/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import styles from './exercise-log.module.css';
import { Field } from './field';

type ExerciseLogProps = {
  className?: string;
  currentExerciseIndex?: number;
  workoutInstance: WorkoutInstance | null;
};

export default function ExerciseLog({
  className,
  currentExerciseIndex = 0,
  workoutInstance,
}: ExerciseLogProps) {
  const supabase = useSupabaseBrowser();

  const methods = useForm({
    resolver: zodResolver(logExerciseSchema),
  });

  const [isEditing, setIsEditing] = useState(false);

  const { control, handleSubmit } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sets',
  });

  const exercise = useMemo(
    () =>
      workoutInstance
        ? getExerciseByIndexFromWorkoutInstance(
            workoutInstance,
            currentExerciseIndex
          )
        : null,
    [workoutInstance, currentExerciseIndex]
  );

  useEffect(() => {
    if (exercise) {
      exercise.setTemplates.forEach((setTemplate) => {
        if (!fields.some((field) => field.set_template_id === setTemplate.id)) {
          // Find existing set instance for this template
          const existingSetInstance = exercise.setInstances?.find(
            (instance) => instance.setTemplateId === setTemplate.id
          );

          append({
            set_template_id: setTemplate.id,
            reps_actual: existingSetInstance?.repsCompleted || null,
            reps_target: setTemplate.repsTarget,
            weight_actual: existingSetInstance?.weightUsed || null,
            weight_target: setTemplate.weightTarget,
          });
        }
      });
    }
  }, [append, exercise, fields]);

  const createHandleDeleteSet = (index: number) => () => {
    if (!workoutInstance || !exercise) return;

    if (fields.length > 1) {
      createSetInstance(supabase, {
        exercise_id: exercise?.id,
        workout_instance_id: workoutInstance?.id,
        set_template_id: fields[index].set_template_id,
        weight_actual: null,
        reps_actual: null,
        order_in_workout: index,
        user_id: workoutInstance.userId,
      })
        .then(() => {
          remove(index);
        })
        .catch((error) => {
          console.error('Error deleting set instance:', error);
        });
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    if (!workoutInstance || !exercise) return;

    fields.forEach((field, index) => {
      createSetInstance(supabase, {
        exercise_id: exercise.id,
        workout_instance_id: workoutInstance.id,
        set_template_id: field.set_template_id,
        weight_actual: data.sets[index].weight_actual,
        reps_actual: data.sets[index].reps_actual,
        order_in_workout: index,
        user_id: workoutInstance.userId,
      }).catch((error) => {
        console.error('Error creating set instance:', error);
      });
    });
  });

  return (
    <section className={clsx(styles.container, className)}>
      <div className={styles.header}>
        <Link
          href={`/workouts/instances/${workoutInstance?.id}`}
          className='subtitle'
        >
          Back to list
        </Link>
        <Button variant='text' onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Done' : 'Edit'}
        </Button>
      </div>
      <h1 className={clsx('headline6', styles.exerciseName)}>
        {exercise?.exerciseName}
      </h1>
      <FormProvider {...methods}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            console.log('Form submit event fired');
            onSubmit(e);
          }}
        >
          {fields.map((field, index) => (
            <Field
              className={styles.field}
              key={field.id}
              index={index}
              isEditing={isEditing}
              onDelete={createHandleDeleteSet(index)}
              {...field}
            />
          ))}
          <div className={styles.actions}>
            {isEditing ? (
              <Button variant='outlined' className={styles.addButton}>
                Add
              </Button>
            ) : (
              <Button type='submit' className={styles.completeButton}>
                Complete
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </section>
  );
}
