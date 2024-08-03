import styles from './hamburger.module.css'

type HamburgerProps = {
  className: string
}

export default function Hamburger(props: HamburgerProps) {
  return (
    <div className={`${styles.container} ${props.className}`}>
      <span className={styles.line} />
      <span className={styles.line} />
      <span className={styles.line} />
    </div>
  )
}