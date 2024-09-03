import styles from './page.module.css';
import { Calendar, List } from '@/features/workout/components';

export default function Home() {
  return (
    <div>
      <Calendar />
      <List className={styles.workoutList} />
    </div>
  );
}
