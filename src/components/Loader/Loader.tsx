import styles from './Loader.module.scss'

/**
 * Loader component
 * Displays a loading spinner centered in its container.
 */
const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
    </div>
  )
}

export default Loader
