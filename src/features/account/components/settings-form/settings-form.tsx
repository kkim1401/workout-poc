'use client';

import { Button, TextField } from '@/features/common/components';
import {
  createUserProfile,
  updateUserProfile,
} from '@/lib/api/db/user/mutations';
import { getUserProfile } from '@/lib/api/db/user/queries/client';
import { useSupabaseBrowser } from '@/lib/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import styles from './settings-form.module.css';

const profileSchema = z.object({
  first_name: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name too long')
    .nullable(),
  last_name: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name too long')
    .nullable(),
  weight: z
    .number()
    .min(1, 'Weight must be positive')
    .max(1000, 'Weight too high')
    .nullable(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  weight: number | null;
}

interface SettingsFormProps {
  userId: string;
  initialProfile: Profile | null;
}

export default function SettingsForm({
  userId,
  initialProfile,
}: SettingsFormProps) {
  const supabase = useSupabaseBrowser();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: initialProfile?.first_name || '',
      last_name: initialProfile?.last_name || '',
      weight: initialProfile?.weight || undefined,
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: ProfileFormData) => {
      if (initialProfile) {
        return updateUserProfile(supabase, data);
      } else {
        return createUserProfile(supabase, { ...data, id: userId });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserProfile.getQueryKey(userId),
      });
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setMessage(null), 3000);
    },
    onError: (error) => {
      console.error('Profile update error:', error);
      setMessage({
        type: 'error',
        text: 'Failed to update profile. Please try again.',
      });
      setTimeout(() => setMessage(null), 3000);
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    updateMutation.mutate(data);
  };

  return (
    <div className={styles.container}>
      {message && (
        <div className={clsx(styles.message, styles[message.type])}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formRow}>
          <TextField
            label='First Name'
            error={errors.first_name?.message}
            className={styles.field}
            {...register('first_name')}
          />

          <TextField
            label='Last Name'
            error={errors.last_name?.message}
            className={styles.field}
            {...register('last_name')}
          />
        </div>

        <TextField
          label='Weight (lbs)'
          type='number'
          step='0.1'
          error={errors.weight?.message}
          className={styles.field}
          {...register('weight', { valueAsNumber: true })}
        />

        <div className={styles.formActions}>
          <Button
            type='submit'
            variant='contained'
            disabled={!isDirty || updateMutation.isPending}
            className={styles.button}
          >
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
