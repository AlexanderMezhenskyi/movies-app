import { memo } from 'react'
import MovieCard from 'src/components/MovieCard'
import { Movie, MovieCardVariant } from 'src/types/types'
import styles from './MovieList.module.scss'

/**
 * Props for MovieList component
 * @property movies - array of movie objects to render
 * @property variant - layout style: 'grid' (default) or 'sidebar'
 */
interface MovieListProps {
  movies: Movie[]
  variant?: MovieCardVariant
}

/**
 * MovieList component
 * Renders a list of movies using the MovieCard component.
 */
const MovieList = ({ movies, variant = 'grid' }: MovieListProps) => {
  // Determine the class to use depending on layout variant
  const listClass = variant === 'sidebar' ? styles.sidebarList : styles.movieList

  // Render message when there are no movies to show
  if (movies.length === 0) {
    return (
      <div className={styles.noFound}>
        {variant === 'sidebar' ? 'No favorites yet' : 'No movies found'}
      </div>
    )
  }

  return (
    <div className={listClass}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} variant={variant} />
      ))}
    </div>
  )
}

export default memo(MovieList)
