import MovieList from "src/components/MovieList";
import { movies } from "src/api/mockData.ts";
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Favorite Movies</h2>
      <MovieList movies={movies} variant="sidebar" />
    </aside>
  );
};

export default Sidebar;
