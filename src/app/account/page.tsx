import { SettingsForm } from '@/features/account/components';
import { Card } from '@/features/common/components';
import { getUserProfile } from '@/lib/api/db/user/queries/server';
import { createClient } from '@/lib/supabase/server';
import clsx from 'clsx';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Settings - Workout PoC',
  description: 'Manage your account settings and preferences',
};

export default async function AccountPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  const userId = data.user.id;
  const userEmail = data.user.email || '';

  // Fetch user profile server-side
  const { data: profile } = await getUserProfile(supabase, userId);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className='headline2'>Settings</h1>
        <p className='body1'>Manage your account and preferences</p>
      </div>

      <section className={styles.sections}>
        {/* Account Information */}
        <Card as='section' depth='normal' className={styles.settingsSection}>
          <h2 className='headline4'>Account Information</h2>
          <div className={styles.infoGrid}>
            <div className={styles.item}>
              <label className={clsx('body2', styles.label)}>Email</label>
              <span className='body1'>{userEmail}</span>
            </div>
            <div className={styles.item}>
              <label className={clsx('body2', styles.label)}>User ID</label>
              <span className='body1'>{userId.slice(0, 8)}...</span>
            </div>
          </div>
        </Card>

        {/* Profile Information Form */}
        <Card as='section' depth='normal' className={styles.settingsSection}>
          <h2 className='headline4'>Profile Information</h2>
          <SettingsForm userId={userId} initialProfile={profile} />
        </Card>

        {/* Workout Preferences */}
        <Card as='section' depth='normal' className={styles.settingsSection}>
          <h2 className='headline4'>Workout Preferences</h2>
          <div className={styles.infoGrid}>
            <div className={styles.item}>
              <label className={clsx('body2', styles.label)}>
                Default Session Duration
              </label>
              <span className='body1'>12 hours</span>
            </div>
            <div className={styles.item}>
              <label className={clsx('body2', styles.label)}>Units</label>
              <span className='body1'>Imperial (lbs)</span>
            </div>
          </div>
          <p className={clsx('body2', styles.preferencesNote)}>
            Additional preferences coming soon...
          </p>
        </Card>

        {/* Account Actions */}
        <Card as='section' depth='normal' className={styles.settingsSection}>
          <h2 className='headline4'>Account Actions</h2>
          <p className='body1'>
            Need to change your email or delete your account? Contact support.
          </p>
        </Card>
      </section>
    </div>
  );
}
