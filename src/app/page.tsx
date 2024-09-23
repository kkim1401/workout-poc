import { Calendar, List } from '@/features/workout/components';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Calendar className={styles.calendar} />
      <List className={styles.list} />
    </div>
  );
}
