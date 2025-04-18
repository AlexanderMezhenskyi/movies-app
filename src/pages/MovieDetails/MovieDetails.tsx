import { useParams, useNavigate } from 'react-router-dom';
import { movies } from "src/api/mockData.ts";
import { Movie } from "src/types/types.ts";
import { formatDate } from "src/utils/utils.ts";
import styles from "./MovieDetails.module.scss";

interface MovieDetailsParams {
  id: string;
}

const MovieDetails = () => {
  const { id} = useParams<MovieDetailsParams>();
  const navigate = useNavigate();
  const movie: Movie = movies.find((movie) => movie.id === id);
  const isFavorite: boolean = false;

  if (!movie) {
    return <div>Movie not found</div>;
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
            <p><strong>Release:</strong> {formatDate(movie.release_date)}</p>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Cast:</strong> {movie.actors.join(', ')}</p>
            <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
            <p><strong>Rating:</strong> {movie.rating}</p>
            <div className={styles.actionsWrap}>
              <button className={styles.button} onClick={() => {}}>
                {isFavorite ? '💔 Remove from Favorites' : '❤️ Add to Favorites'}
              </button>
              <button className={styles.button} onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
