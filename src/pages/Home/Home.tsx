import { useEffect, useState } from 'react';
import { usePagination } from 'src/hooks/usePagination';
import Loader from 'src/components/Loader';
import MovieList from 'src/components/MovieList';
import Pagination from 'src/components/Pagination';
import SearchBar from 'src/components/SearchBar';
import Toast from 'src/components/Toast';
import { Movie } from 'src/types/types';
import { fetchMovies } from "src/api/mockApi";

const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const moviesPerPage = 10;

  const {
    page,
    setPage,
    paginatedItems,
    totalPages
  } = usePagination(movies, moviesPerPage);

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
      {isLoading ? <Loader /> : <MovieList movies={paginatedItems} />}
      {movies.length > moviesPerPage &&
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage}/>
      }
      {error ? <Toast message={error} /> : null}
    </div>
  );
};

export default Home;
