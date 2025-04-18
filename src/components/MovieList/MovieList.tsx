import MovieCard from 'src/components/MovieCard';
import styles from './MovieList.module.scss';

const MovieList = ({ movies, variant = 'grid' }) => {
  const listClass = variant === 'sidebar'
    ? styles.sidebarList
    : styles.movieList;

  return (
    <div className={listClass}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} variant={variant} />
      ))}
    </div>
  );
};

export default MovieList;
