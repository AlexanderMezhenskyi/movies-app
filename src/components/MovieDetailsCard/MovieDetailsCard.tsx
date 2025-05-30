import { useNavigate } from 'react-router-dom'
import FavoriteButton from 'src/components/FavoriteButton'
import { Movie } from 'src/types/types'
import { formatDate } from 'src/utils/utils.ts'
import styles from './MovieDetailsCard.module.scss'

/**
 * Props for MovieDetailsCard component
 * @property movie - the movie data to display in detail view
 */
type Props = {
  movie: Movie | null | undefined
}

/**
 * MovieDetailsCard component
 * Displays detailed information about a movie.
 */
const MovieDetailsCard = ({ movie }: Props) => {
  const navigate = useNavigate()

  if (!movie) {
    return <div className={styles.noLoad}>Could not load movie details</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.movieCard}>
        <div className={styles.moviePosterWrapper}>
          <img src={movie.poster} alt={movie.title} className={styles.moviePoster} />
        </div>
        <div className={styles.movieInfo}>
          <h2 className={styles.movieTitle}>{movie.title}</h2>
          <p className={styles.movieDescription}>{movie.description}</p>
          <div className={styles.movieInfoWrap}>
            <p>
              <strong>Release:</strong> {formatDate(movie.release_date)}
            </p>
            <p>
              <strong>Director:</strong> {movie.director}
            </p>
            <p>
              <strong>Cast:</strong> {movie.actors.join(', ')}
            </p>
            <p>
              <strong>Genres:</strong> {movie.genres.join(', ')}
            </p>
            <p>
              <strong>Rating:</strong> {movie.rating}
            </p>
            <div className={styles.actionsWrap}>
              <FavoriteButton movie={movie} expanded />
              <button className={styles.button} onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailsCard
