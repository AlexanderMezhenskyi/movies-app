import SearchBar from 'src/components/SearchBar';
import MovieList from 'src/components/MovieList';
import { movies } from "src/api/mockData.ts";

const Home = () => {
  return (
    <div>
      <SearchBar />
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
