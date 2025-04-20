import { NavLink } from 'react-router-dom'
import logo from 'src/assets/logo.png'
import styles from './Header.module.scss'

/**
 * Header component
 * Displays the application logo and navigation links to different routes.
 */
const Header = () => {
  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt="logo" />
        Movie Explorer
      </NavLink>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.linkActive}` : styles.link
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.linkActive}` : styles.link
          }
        >
          Favorites
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
