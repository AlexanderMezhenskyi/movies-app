import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePagination } from 'src/hooks/usePagination'
import Filters from 'src/components/Filters'
import Loader from 'src/components/Loader'
import MovieList from 'src/components/MovieList'
import Pagination from 'src/components/Pagination'
import SearchBar from 'src/components/SearchBar'
import Toast from 'src/components/Toast'
import { Movie } from 'src/types/types'
import { fetchMovies } from 'src/api/mockApi'

/**
 * Loads filters from localStorage or returns default values.
 * @returns {Object} - An object containing the genre, year, and rating filters.
 */
const loadFiltersFromLocalStorage = () => {
  try {
    const filters = localStorage.getItem('movieFilters')
    return filters ? JSON.parse(filters) : { genre: '', year: '', rating: '' }
  } catch {
    return { genre: '', year: '', rating: '' }
  }
}

/**
 * Home component
 * Handles fetching, filtering, and displaying a list of movies with search and pagination functionality.
 * The component also manages the persistence of filters using localStorage.
 */
const Home = () => {
  const [searchValue, setSearchValue] = useState('')
  const [allMovies, setAllMovies] = useState<Movie[]>([]) // All movies fetched from the API
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]) // Filtered movies based on search and selected filters
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Filters loaded from localStorage
  const filtersFromStorage = loadFiltersFromLocalStorage()
  const [selectedGenre, setSelectedGenre] = useState(filtersFromStorage.genre)
  const [selectedYear, setSelectedYear] = useState(filtersFromStorage.year)
  const [selectedRating, setSelectedRating] = useState(filtersFromStorage.rating)

  const moviesPerPage = 10

  // Pagination state and functionality using custom hook
  const { page, setPage, paginatedItems, totalPages } = usePagination(filteredMovies, moviesPerPage)

  /**
   * Memoizes the filtered list of movies based on the search and selected filters.
   * @returns {Movie[]} - The filtered list of movies.
   */
  const memoizedFilteredMovies = useMemo(() => {
    const searchFilteredMovies = allMovies.filter(
      (movie) => movie.title.toLowerCase().includes(searchValue.toLowerCase()), // Filter by search input
    )

    return searchFilteredMovies.filter((movie) => {
      const genreMatch = selectedGenre ? movie.genres.includes(selectedGenre) : true
      const yearMatch = selectedYear ? movie.release_date.startsWith(selectedYear) : true
      const ratingMatch = selectedRating ? movie.rating >= Number(selectedRating) : true
      return genreMatch && yearMatch && ratingMatch // Apply all selected filters
    })
  }, [searchValue, allMovies, selectedGenre, selectedYear, selectedRating])

  // Fetch movies when component mounts
  useEffect(() => {
    setIsLoading(true)

    fetchMovies('')
      .then((data) => {
        setAllMovies(data)
      })
      .catch((err) => setError(err.message || 'Something went wrong'))
      .finally(() => setIsLoading(false))
  }, [])

  // Update filtered movies whenever the memoized filtered list changes
  useEffect(() => {
    setFilteredMovies(memoizedFilteredMovies)
  }, [memoizedFilteredMovies])

  // Save selected filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      'movieFilters',
      JSON.stringify({
        genre: selectedGenre,
        year: selectedYear,
        rating: selectedRating,
      }),
    )
  }, [selectedGenre, selectedYear, selectedRating])

  // Reset error message after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000)
      return () => clearTimeout(timer)
    }
  }, [error])

  // Handlers for user interactions with search, filters and pagination
  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value)
  }, [])

  const handleGenreChange = useCallback((value: string) => {
    setSelectedGenre(value)
  }, [])

  const handleYearChange = useCallback((value: string) => {
    setSelectedYear(value)
  }, [])

  const handleRatingChange = useCallback((value: string) => {
    setSelectedRating(value)
  }, [])

  const handlePageChangeChange = useCallback(
    (value: number) => {
      setPage(value)
    },
    [setPage],
  )

  return (
    <div>
      <SearchBar onSearch={handleSearchChange} />
      <Filters
        movies={allMovies}
        selectedGenre={selectedGenre}
        selectedYear={selectedYear}
        selectedRating={selectedRating}
        onGenreChange={handleGenreChange}
        onYearChange={handleYearChange}
        onRatingChange={handleRatingChange}
      />
      {isLoading ? <Loader /> : <MovieList movies={paginatedItems} />}
      {filteredMovies.length > moviesPerPage && (
        <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChangeChange} />
      )}
      {error ? <Toast message={error} /> : null}
    </div>
  )
}

export default Home
