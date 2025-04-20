import { memo, useMemo } from 'react'
import { Movie } from 'src/types/types.ts'
import styles from './Filters.module.scss'

/**
 * Props for the Filters component
 * @property movies - list of all movies to generate filter options
 * @property selectedGenre - currently selected genre filter
 * @property selectedYear - currently selected year filter
 * @property selectedRating - currently selected rating filter
 * @property onGenreChange - callback function to handle genre filter change
 * @property onYearChange - callback function to handle year filter change
 * @property onRatingChange - callback function to handle rating filter change
 */
interface FiltersProps {
  movies: Movie[]
  selectedGenre: string
  selectedYear: string
  selectedRating: string
  onGenreChange: (value: string) => void
  onYearChange: (value: string) => void
  onRatingChange: (value: string) => void
}

/**
 * Filters component
 * Provides dropdowns to filter movies by genre, year, and rating.
 */
const Filters = ({
  movies,
  selectedGenre,
  selectedYear,
  selectedRating,
  onGenreChange,
  onYearChange,
  onRatingChange,
}: FiltersProps) => {
  // Generate unique genres sorted alphabetically
  const genres = useMemo(
    () => Array.from(new Set(movies.flatMap((m) => m.genres))).sort(),
    [movies],
  )

  // Generate unique release years sorted
  const years = useMemo(
    () => Array.from(new Set(movies.map((m) => m.release_date.slice(0, 4)))).sort(),
    [movies],
  )

  // Predefined rating options (5+, 6+, 7+, 8+, 9+)
  const ratings = ['5', '6', '7', '8', '9']

  /**
   * Resets all filters to their default state
   * Also clears the filters from localStorage
   */
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

export default memo(Filters)
