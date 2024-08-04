import styles from './hamburger.module.css';
import { concatClassNames } from '@/utils';

type HamburgerProps = {
  className: string;
};

export default function Hamburger(props: HamburgerProps) {
  return (
    <div className={concatClassNames(styles.container, props.className)}>
      <span className={styles.line} />
      <span className={styles.line} />
      <span className={styles.line} />
    </div>
  );
}
