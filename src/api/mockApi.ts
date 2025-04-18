import { movies } from 'src/api/mockData.ts';
import { Movie } from 'src/types/types';

export const fetchMovies = (query: string): Promise<Movie[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (!movies || !Array.isArray(movies)) {
          reject(new Error('Movies data is not available'));
          return;
        }

        if (!query) {
          resolve(movies);
        } else {
          const result = movies.filter((movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase())
          );
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
};


export const fetchMovie = (id: string | undefined): Promise<Movie> => {
  if (!id) {
    return Promise.reject(new Error('Invalid movie id'));
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const movie = movies.find((movie) => movie.id === id);

        if (movie) {
          resolve(movie);
        } else {
          reject(new Error(`Movie with id "${id}" not found.`));
        }
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
};
