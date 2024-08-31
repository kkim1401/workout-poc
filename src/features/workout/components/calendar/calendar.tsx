'use client';
import styles from './calendar.module.css';

function addDays(date: Date, days: number) {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
}

export function getDaysByDayName(date: Date): { [index: string]: number } {
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const currDayIndex = date.getDay();
  return dayNames.reduce((acc, curr, index) => {
    return {
      ...acc,
      [curr]: addDays(date, index - currDayIndex).getDate(),
    };
  }, {});
}

function CalendarDay({
  dayName,
  dayNumber,
}: {
  dayName: string;
  dayNumber: number;
}) {
  return (
    <div className={styles.day}>
      <div className={styles.dayName}>{dayName}</div>
      <div className={styles.dayNumber}>{dayNumber}</div>
    </div>
  );
}

export default function Calendar() {
  const daysByDayName = getDaysByDayName(new Date());
  return (
    <section className={styles.container}>
      {Object.entries(daysByDayName).map(([dayName, dayNumber]) => (
        <CalendarDay key={dayName} dayName={dayName} dayNumber={dayNumber} />
      ))}
    </section>
  );
}
