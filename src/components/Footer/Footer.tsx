import styles from './Footer.module.scss'

/**
 * Footer component
 * Displays the current year in the footer section of the page.
 */
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>&copy; {new Date().getFullYear()}</div>
    </footer>
  )
}

export default Footer
