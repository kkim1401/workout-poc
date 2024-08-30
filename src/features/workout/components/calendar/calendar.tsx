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
  className,
  dayName,
  dayNumber,
}: {
  className: string;
  dayName: string;
  dayNumber: number;
}) {
  return (
    <div className={className}>
      <div>{dayName}</div>
      <div>{dayNumber}</div>
    </div>
  );
}

export default function Calendar() {
  const daysByDayName = getDaysByDayName(new Date());
  return (
    <section className={styles.container}>
      {Object.entries(daysByDayName).map(([dayName, dayNumber]) => (
        <CalendarDay
          className={styles.day}
          key={dayName}
          dayName={dayName}
          dayNumber={dayNumber}
        />
      ))}
    </section>
  );
}
