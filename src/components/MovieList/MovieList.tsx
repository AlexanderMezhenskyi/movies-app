import MovieCard from 'src/components/MovieCard';
import { Movie, MovieCardVariant } from 'src/types/types';
import styles from './MovieList.module.scss';

interface MovieListProps {
  movies: Movie[];
  variant?: MovieCardVariant;
}

const MovieList = ({ movies, variant = 'grid' } : MovieListProps) => {
  const listClass = variant === 'sidebar'
    ? styles.sidebarList
    : styles.movieList;

  return (
    <>
      {movies.length > 0 ? (
        <div className={listClass}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} variant={variant}/>
          ))}
        </div>
      ) : (
        <div className={styles.noFound}>No movies found</div>
      )}
    </>
  );
};

export default MovieList;
