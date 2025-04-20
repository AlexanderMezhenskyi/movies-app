import { Movie } from 'src/types/types'
import { useFavorites } from 'src/hooks/useFavorites'
import styles from './FavoriteButton.module.scss'

interface FavoriteButtonProps {
  movie: Movie
  expanded?: boolean
}

const FavoriteButton = ({ movie, expanded = false }: FavoriteButtonProps) => {
  const { favorites, dispatch } = useFavorites()
  const isFavorite = favorites.some((fav) => fav.id === movie.id)

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
