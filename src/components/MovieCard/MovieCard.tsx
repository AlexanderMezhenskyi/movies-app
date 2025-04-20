import { Link } from 'react-router-dom';
import FavoriteButton from 'src/components/FavoriteButton';
import { Movie, MovieCardVariant } from 'src/types/types';
import { formatDate } from 'src/utils/utils.ts';
import styles from './MovieCard.module.scss';

interface MovieCardProps {
  movie: Movie;
  variant?: MovieCardVariant;
}

const MovieCard = ({ movie, variant = 'grid' }: MovieCardProps) => {
  return (
    <div className={styles.movieCard}>
      <Link to={`/movie/${movie.id}`} className={styles.moviePosterWrapper}>
        {movie.poster ? (
          <img src={movie.poster} className={styles.moviePoster} alt={movie.title} loading="lazy" />
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
          <FavoriteButton movie={movie} />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
