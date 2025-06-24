import { Link } from '@/features/common/components';
import { PlanCard } from '@/features/plan/components';
import { WorkoutCalendar } from '@/features/workout/components';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <WorkoutCalendar className={styles.workoutCalendar} />
      <PlanCard className={styles.planCard} />
      <ul className={styles.links}>
        <li className={styles.link}>
          <Link href='/plans'>All Plans</Link>
        </li>
        <li className={styles.link}>
          <Link href='/workouts/new'>Create Workout</Link>
        </li>
        <li className={styles.link}>
          <Link href='/exercises'>Exercises</Link>
        </li>
        <li className={styles.link}>
          <Link href='/workouts'>Workouts</Link>
        </li>
      </ul>
    </div>
  );
}
