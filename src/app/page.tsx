import { Link } from '@/features/common/components';
import { Calendar, List } from '@/features/workout/components';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Calendar className={styles.calendar} />
      <List className={styles.list} />
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
      </ul>
    </div>
  );
}
