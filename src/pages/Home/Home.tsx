import { useEffect, useState } from 'react';
import Loader from 'src/components/Loader';
import MovieList from 'src/components/MovieList';
import SearchBar from 'src/components/SearchBar';
import Toast from 'src/components/Toast';
import { Movie } from 'src/types/types';
import { fetchMovies } from "src/api/mockApi";

const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    fetchMovies(searchValue)
      .then(data => {
        setMovies(data);
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchValue]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div>
      <SearchBar onSearch={setSearchValue} />
      {isLoading ? <Loader /> : <MovieList movies={movies} />}
      {error ? <Toast message={error} /> : null}
    </div>
  );
};

export default Home;
