import { useEffect, useMemo, useState } from 'react'
import styles from './SearchBar.module.scss'

type Props = {
  onSearch: (query: string) => void
}

const SearchBar = ({ onSearch }: Props) => {
  const [searchValue, setSearchValue] = useState('')

  const debouncedSearch = useMemo(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    return (value: string) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => onSearch(value), 500)
    }
  }, [onSearch])

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
