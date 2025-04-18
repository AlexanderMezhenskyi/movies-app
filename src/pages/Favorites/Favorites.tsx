import MovieList from 'src/components/MovieList';
import { movies } from "src/api/mockData.ts";
import styles from "./Favorites.module.scss";

const Favorites = () => {
  return (
    <div>
      <h1 className={styles.title}>Favorite Movies</h1>
      {movies.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default Favorites;
