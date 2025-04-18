import { useFavorites } from 'src/hooks/useFavorites';
import MovieList from 'src/components/MovieList';
import styles from "./Favorites.module.scss";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div>
      <h1 className={styles.title}>Favorite Movies</h1>
      {favorites.length === 0 ? (
        <div className={styles.noData}>No favorites yet</div>
      ) : (
        <MovieList movies={favorites} />
      )}
    </div>
  );
};

export default Favorites;
