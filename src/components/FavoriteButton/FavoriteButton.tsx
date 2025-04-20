import { Movie } from 'src/types/types'
import { useFavorites } from 'src/hooks/useFavorites'
import styles from './FavoriteButton.module.scss'

/**
 * Props for the FavoriteButton component
 * @property movie - the movie object to be added/removed from favorites
 * @property expanded - flag that determines whether the button has an expanded style or not
 */
interface FavoriteButtonProps {
  movie: Movie
  expanded?: boolean
}

/**
 * FavoriteButton component
 * Displays the current favorite status of a movie and allows toggling it
 */
const FavoriteButton = ({ movie, expanded = false }: FavoriteButtonProps) => {
  // Get the favorites list and dispatch function from the custom hook
  const { favorites, dispatch } = useFavorites()
  // Check if the current movie is in the favorites list
  const isFavorite = favorites.some((fav) => fav.id === movie.id)

  /**
   * Toggle the favorite status of the movie.
   * Dispatches either ADD or REMOVE action based on the current status.
   */
  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: 'REMOVE', id: movie.id })
    } else {
      dispatch({ type: 'ADD', movie })
    }
  }

  return (
    <button className={expanded ? styles.buttonExpanded : styles.button} onClick={toggleFavorite}>
      {isFavorite ? '💔 Remove' : '❤️ Add'}
    </button>
  )
}

export default FavoriteButton
