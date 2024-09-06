import { addDays, concatClasses } from '@/utils';
import styles from './calendar.module.css';

const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function getDaysByDayName(date: Date): { [index: string]: number } {
  const currDayIndex = date.getDay();
  return dayNames.reduce((acc, curr, index) => {
    return {
      ...acc,
      [curr]: addDays(date, index - currDayIndex - 1).getDate(),
    };
  }, {});
}

function getCurrentDayName(date: Date) {
  const currDayIndex = date.getDay();
  return dayNames[currDayIndex];
}

type CalendarDayProps = {
  current?: boolean;
  dayName: string;
  dayNumber: number;
};

function CalendarDay({ current, dayName, dayNumber }: CalendarDayProps) {
  return (
    <div className={styles.day}>
      <div className='subtitle2'>{dayName}</div>
      <div
        className={concatClasses(
          'body1',
          styles.dayNumber,
          current && styles.current
        )}
      >
        {dayNumber}
      </div>
    </div>
  );
}

export default function Calendar({ className }: { className?: string }) {
  const date = new Date();
  const daysByDayName = getDaysByDayName(date);
  const currentDayName = getCurrentDayName(date);

  return (
    <section className={concatClasses(styles.container, className)}>
      {Object.entries(daysByDayName).map(([dayName, dayNumber]) => (
        <CalendarDay
          key={dayName}
          current={currentDayName === dayName}
          dayName={dayName}
          dayNumber={dayNumber}
        />
      ))}
    </section>
  );
}
