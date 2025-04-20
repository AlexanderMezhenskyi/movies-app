import { Link } from 'react-router-dom'
import { useFavorites } from 'src/hooks/useFavorites'
import MovieList from 'src/components/MovieList'
import styles from './Sidebar.module.scss'

/**
 * Sidebar component
 * Displays the last 5 favorite movies in a compact list format.
 * Provides a link to view all favorite movies if any exist.
 */
const Sidebar = () => {
  const { favorites } = useFavorites()

  // Get the latest 5 favorite movies (in reverse chronological order)
  const lastFiveMovies = favorites.slice(-5).reverse()

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Latest Favorite Movies</h2>
      <MovieList movies={lastFiveMovies} variant="sidebar" />
      {favorites.length > 0 && (
        <div className={styles.seeAllButtonWrap}>
          <Link to="/favorites" className={styles.seeAllButton}>
            See All Favorites
          </Link>
        </div>
      )}
    </aside>
  )
}

export default Sidebar
