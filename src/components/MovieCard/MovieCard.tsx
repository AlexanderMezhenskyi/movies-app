import { Link } from 'react-router-dom';
import { formatDate } from 'src/utils/utils.ts';
import styles from './MovieCard.module.scss';

const MovieCard = ({ movie, variant = 'grid' }) => {
  const isFavorite: boolean = false;

  return (
    <div className={styles.movieCard}>
      <Link to={`/movie/${movie.id}`} className={styles.moviePosterWrapper}>
        {movie.poster ? (
          <img src={movie.poster} className={styles.moviePoster} alt={movie.title} />
        ) : (
          <span>No image</span>
        )}
      </Link>
      <div className={styles.movieInfo}>
        <Link to={`/movie/${movie.id}`} className={styles.movieTitle}>
          {movie.title}
        </Link>
        <div className={styles.movieInfoWrap}>
          <p className={styles.movieDate}>
            {variant === 'grid' && <span>Release: </span>}{formatDate(movie.release_date)}
          </p>
          <button className={styles.movieButton} onClick={() => {}}>
            {isFavorite ? '💔 Remove' : '❤️ Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
