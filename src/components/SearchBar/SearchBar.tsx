import { useEffect, useMemo, useState } from 'react'
import styles from './SearchBar.module.scss'

/**
 * Props for the SearchBar component
 * @property onSearch - callback function triggered when search query changes
 */
type Props = {
  onSearch: (query: string) => void
}

/**
 * SearchBar component
 * Renders an input field for searching movies by title.
 * Implements debounced input handling to optimize performance.
 */
const SearchBar = ({ onSearch }: Props) => {
  const [searchValue, setSearchValue] = useState('')

  /**
   * Memoized debounce function
   * Waits 500ms after the user stops typing before triggering `onSearch`
   */
  const debouncedSearch = useMemo(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    return (value: string) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => onSearch(value), 500)
    }
  }, [onSearch])

  // Watch for changes in input and trigger debounced search
  useEffect(() => {
    debouncedSearch(searchValue.trim())
  }, [searchValue, debouncedSearch])

  return (
    <div className={styles.searchContainer}>
      <h1 className={styles.title}>Find your favorite movies</h1>
      <div className={styles.searchBarContainer}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search by movie title..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
    </div>
  )
}

export default SearchBar
