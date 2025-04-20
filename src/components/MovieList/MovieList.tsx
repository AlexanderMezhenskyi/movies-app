import { memo } from 'react'
import MovieCard from 'src/components/MovieCard'
import { Movie, MovieCardVariant } from 'src/types/types'
import styles from './MovieList.module.scss'

interface MovieListProps {
  movies: Movie[]
  variant?: MovieCardVariant
}

const MovieList = ({ movies, variant = 'grid' }: MovieListProps) => {
  const listClass = variant === 'sidebar' ? styles.sidebarList : styles.movieList

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
