import { useFavorites } from 'src/hooks/useFavorites'
import { usePagination } from 'src/hooks/usePagination'
import MovieList from 'src/components/MovieList'
import Pagination from 'src/components/Pagination'
import styles from './Favorites.module.scss'

const Favorites = () => {
  const { favorites } = useFavorites()

  const moviesPerPage = 10
  const { page, setPage, paginatedItems, totalPages } = usePagination(favorites, moviesPerPage)

  return (
    <div>
      <h1 className={styles.title}>Favorite Movies</h1>
      {favorites.length === 0 ? (
        <div className={styles.noData}>No favorites yet</div>
      ) : (
        <>
          <MovieList movies={paginatedItems} />
          {favorites.length > moviesPerPage && (
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          )}
        </>
      )}
    </div>
  )
}

export default Favorites
