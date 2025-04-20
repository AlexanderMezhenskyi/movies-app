import { useMemo } from 'react'
import { Movie } from 'src/types/types.ts'
import styles from './Filters.module.scss'

interface FiltersProps {
  movies: Movie[]
  selectedGenre: string
  selectedYear: string
  selectedRating: string
  onGenreChange: (value: string) => void
  onYearChange: (value: string) => void
  onRatingChange: (value: string) => void
}

const Filters = ({
  movies,
  selectedGenre,
  selectedYear,
  selectedRating,
  onGenreChange,
  onYearChange,
  onRatingChange,
}: FiltersProps) => {
  const genres = useMemo(
    () => Array.from(new Set(movies.flatMap((m) => m.genres))).sort(),
    [movies],
  )
  const years = useMemo(
    () => Array.from(new Set(movies.map((m) => m.release_date.slice(0, 4)))).sort(),
    [movies],
  )
  const ratings = useMemo(() => ['5', '6', '7', '8', '9'], [])

  const resetFilters = () => {
    onGenreChange('')
    onYearChange('')
    onRatingChange('')
    localStorage.removeItem('movieFilters')
  }

  return (
    <div className={styles.filters}>
      <select value={selectedGenre} onChange={(e) => onGenreChange(e.target.value)}>
        <option value="">All genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      <select value={selectedYear} onChange={(e) => onYearChange(e.target.value)}>
        <option value="">All years</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select value={selectedRating} onChange={(e) => onRatingChange(e.target.value)}>
        <option value="">All ratings</option>
        {ratings.map((r) => (
          <option key={r} value={r}>
            {r}+
          </option>
        ))}
      </select>

      <button onClick={resetFilters}>Reset</button>
    </div>
  )
}

export default Filters
