'use client';

import { Button } from '@/features/common/components';
import { revalidateWorkoutInstance } from '@/features/workout/actions';
import { groupSetsByExercise } from '@/features/workout/helpers';
import { logExerciseSchema } from '@/features/workout/schemas';
import {
  createSetInstance,
  updateSetInstance,
} from '@/lib/api/db/sets/mutations';
import { updateWorkoutInstance } from '@/lib/api/db/workouts/mutations';
import { WorkoutInstance } from '@/lib/api/db/workouts/types';
import { useSupabaseBrowser } from '@/lib/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { isEmpty } from 'lodash-es';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  const { mutateAsync: createSet } = useMutation({
    mutationFn: (data: Parameters<typeof createSetInstance>[1]) =>
      createSetInstance(supabase, data),
  });

  const { mutateAsync: updateSet } = useMutation({
    mutationFn: (data: Parameters<typeof updateSetInstance>[1]) =>
      updateSetInstance(supabase, data),
  });

  const { mutateAsync: updateWorkout } = useMutation({
    mutationFn: (data: Parameters<typeof updateWorkoutInstance>[1]) =>
      updateWorkoutInstance(supabase, data),
  });

  const [isEditing, setIsEditing] = useState(false);

  const exercises = useMemo(
    () => (workoutInstance ? groupSetsByExercise(workoutInstance) : null),
    [workoutInstance]
  );

  const exercise = useMemo(() => {
    const exerciseKeys = Object.keys(exercises || {});
    if (
      currentExerciseIndex < 0 ||
      currentExerciseIndex >= exerciseKeys.length
    ) {
      return null;
    }
    return exercises?.[exerciseKeys[currentExerciseIndex]];
  }, [exercises, currentExerciseIndex]);

  const exerciseIndex = useMemo(() => {
    return Object.keys(exercises || {}).indexOf(exercise?.id || '');
  }, [exercises, exercise]);

  const startSetTemplatesIndex = Object.values(exercises || {}).reduce(
    (acc, exercise, currIndex) => {
      if (currIndex >= exerciseIndex) {
        return acc;
      }
      return acc + exercise.setTemplates.length;
    },
    0
  );

  const initialSets = useMemo(() => {
    return (
      exercise?.setTemplates.map((setTemplate) => {
        const existingSetInstance = exercise.setInstances?.find(
          (instance) => instance.setTemplateId === setTemplate.id
        );

        return {
          set_template_id: setTemplate.id,
          set_instance_id: existingSetInstance?.id || null,
          reps_actual: existingSetInstance?.repsCompleted || null,
          reps_target: setTemplate.repsTarget,
          weight_actual: existingSetInstance?.weightUsed || null,
          weight_target: setTemplate.weightTarget,
        };
      }) || []
    );
  }, [exercise]);

  const methods = useForm({
    defaultValues: {
      sets: initialSets,
    },
    resolver: zodResolver(logExerciseSchema),
  });

  const { control, handleSubmit, reset } = methods;

  const { fields, remove } = useFieldArray({
    control,
    name: 'sets',
  });

  /**
   * Reset the form with initial sets when the component mounts.
   * This ensures that the user will see updated exercise data when they
   * navigate to the next or previous exercise.
   */
  useEffect(() => {
    reset({ sets: initialSets });
  }, [reset, initialSets]);

  const createHandleDeleteSet = (index: number) => async () => {
    if (!workoutInstance || !exercise) return;

    if (fields.length > 1) {
      try {
        await createSetInstance(supabase, {
          exercise_id: exercise?.id,
          workout_instance_id: workoutInstance?.id,
          set_template_id: fields[index].set_template_id,
          weight_actual: null,
          reps_actual: null,
          order_in_workout: startSetTemplatesIndex + index,
          user_id: workoutInstance.userId,
        });
        remove(index);
        await revalidateWorkoutInstance(workoutInstance.id);
      } catch (error) {
        console.error('Error deleting set instance:', error);
      }
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    if (!workoutInstance || !exercise) return;

    let setDirty = false;
    const promises: Promise<unknown>[] = fields.map((field, index) => {
      if (
        typeof data.sets[index].reps_actual === 'number' &&
        data.sets[index].set_instance_id === null
      ) {
        setDirty = true;
        return createSet({
          exercise_id: exercise.id,
          workout_instance_id: workoutInstance.id,
          set_template_id: field.set_template_id,
          weight_actual: data.sets[index].weight_actual,
          reps_actual: data.sets[index].reps_actual,
          order_in_workout: startSetTemplatesIndex + index,
          user_id: workoutInstance.userId,
        });
      }

      if (
        typeof data.sets[index].reps_actual === 'number' &&
        data.sets[index].set_instance_id !== null
      ) {
        const diffs = {
          weight_actual:
            data.sets[index].weight_actual === initialSets[index].weight_actual,
          reps_actual:
            data.sets[index].reps_actual === initialSets[index].reps_actual,
        };
        if (Object.values(diffs).some((v) => !v)) {
          const updates = Object.entries(diffs).reduce(
            (acc, [key, equals]) => {
              if (!equals) {
                acc[key as keyof typeof diffs] =
                  data.sets[index][key as keyof typeof diffs];
              }
              return acc;
            },
            {} as Partial<Pick<(typeof data.sets)[number], keyof typeof diffs>>
          );
          if (!isEmpty(updates)) {
            setDirty = true;
            return updateSet({
              id: data.sets[index].set_instance_id,
              ...updates,
            });
          }
        }
      }

      // If the condition reaches here, the set doesn't need to be updated.
      return Promise.resolve();
    });

    if (setDirty) {
      promises.push(
        updateWorkout({
          id: workoutInstance.id,
          completed_at: null,
        })
      );
    }

    try {
      await Promise.all(promises);
      await revalidateWorkoutInstance(workoutInstance.id);
      router.push(
        `/workouts/instances/${workoutInstance.id}?index=${exerciseIndex + 1}`
      );
    } catch (error) {
      console.error('Error creating set instances:', error);
    }
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
        <form className={styles.form} onSubmit={onSubmit}>
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
              <Button type='submit' className={styles.nextButton}>
                Next
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </section>
  );
}
