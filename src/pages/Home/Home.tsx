import { useEffect, useState } from 'react'
import { usePagination } from 'src/hooks/usePagination'
import Filters from 'src/components/Filters'
import Loader from 'src/components/Loader'
import MovieList from 'src/components/MovieList'
import Pagination from 'src/components/Pagination'
import SearchBar from 'src/components/SearchBar'
import Toast from 'src/components/Toast'
import { Movie } from 'src/types/types'
import { fetchMovies } from 'src/api/mockApi'

const loadFiltersFromLocalStorage = () => {
  const filters = localStorage.getItem('movieFilters')
  return filters ? JSON.parse(filters) : { genre: '', year: '', rating: '' }
}

const Home = () => {
  const [searchValue, setSearchValue] = useState('')
  const [allMovies, setAllMovies] = useState<Movie[]>([])
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const filtersFromStorage = loadFiltersFromLocalStorage()
  const [selectedGenre, setSelectedGenre] = useState(filtersFromStorage.genre)
  const [selectedYear, setSelectedYear] = useState(filtersFromStorage.year)
  const [selectedRating, setSelectedRating] = useState(filtersFromStorage.rating)

  const moviesPerPage = 10

  const { page, setPage, paginatedItems, totalPages } = usePagination(filteredMovies, moviesPerPage)

  useEffect(() => {
    setIsLoading(true)

    fetchMovies('')
      .then((data) => {
        setAllMovies(data)
      })
      .catch((err) => setError(err.message || 'Something went wrong'))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    const searchFilteredMovies = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchValue.toLowerCase()),
    )

    const filteredMoviesData = searchFilteredMovies.filter((movie) => {
      const genreMatch = selectedGenre ? movie.genres.includes(selectedGenre) : true
      const yearMatch = selectedYear ? movie.release_date.startsWith(selectedYear) : true
      const ratingMatch = selectedRating ? movie.rating >= Number(selectedRating) : true
      return genreMatch && yearMatch && ratingMatch
    })

    setFilteredMovies(filteredMoviesData)
  }, [searchValue, allMovies, selectedGenre, selectedYear, selectedRating])

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

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000)
      return () => clearTimeout(timer)
    }
  }, [error])

  return (
    <div>
      <SearchBar onSearch={setSearchValue} />
      <Filters
        movies={allMovies}
        selectedGenre={selectedGenre}
        selectedYear={selectedYear}
        selectedRating={selectedRating}
        onGenreChange={setSelectedGenre}
        onYearChange={setSelectedYear}
        onRatingChange={setSelectedRating}
      />
      {isLoading ? <Loader /> : <MovieList movies={paginatedItems} />}
      {filteredMovies.length > moviesPerPage && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      )}
      {error ? <Toast message={error} /> : null}
    </div>
  )
}

export default Home
