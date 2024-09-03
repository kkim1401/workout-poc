import { concatClassNames } from '@/utils';
import styles from './calendar.module.css';

const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function addDays(date: Date, days: number) {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
}

export function getDaysByDayName(date: Date): { [index: string]: number } {
  const currDayIndex = date.getDay();
  return dayNames.reduce((acc, curr, index) => {
    return {
      ...acc,
      [curr]: addDays(date, index - currDayIndex).getDate(),
    };
  }, {});
}

function getCurrentDayName(date: Date) {
  const currDayIndex = date.getDay();
  return dayNames[currDayIndex];
}

function CalendarDay({
  dayName,
  dayNumber,
  isCurrent,
}: {
  dayName: string;
  dayNumber: number;
  isCurrent?: boolean;
}) {
  return (
    <div className={styles.day}>
      <div className='subtitle2'>{dayName}</div>
      <div
        className={concatClassNames(
          'body1',
          styles.dayNumber,
          isCurrent && styles.current
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
    <section className={concatClassNames(styles.container, className)}>
      {Object.entries(daysByDayName).map(([dayName, dayNumber]) => (
        <CalendarDay
          key={dayName}
          dayName={dayName}
          dayNumber={dayNumber}
          isCurrent={currentDayName === dayName}
        />
      ))}
    </section>
  );
}
