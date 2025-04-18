import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Loader from "src/components/Loader";
import MovieDetailsCard from "src/components/MovieDetailsCard";
import Toast from "src/components/Toast";
import { Movie } from "src/types/types.ts";
import { fetchMovie } from "src/api/mockApi.ts";

const MovieDetails = () => {
  const [movie, setMovie] = useState<Movie | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const params = useParams<{ id: string }>();
  const id = params.id;

  useEffect(() => {
    if (!id) {
      setError('Missing movie ID');
      return;
    }

    setIsLoading(true);

    fetchMovie(id)
      .then(data => {
        setMovie(data);
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      {isLoading ? <Loader /> : <MovieDetailsCard movie={movie} />}
      {error ? <Toast message={error} /> : null}
    </>
  );
};

export default MovieDetails;
