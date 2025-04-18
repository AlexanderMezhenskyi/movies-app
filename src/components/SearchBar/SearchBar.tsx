import { useState } from 'react';
import styles from './SearchBar.module.scss';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');

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
        <button className={styles.searchButton}>Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
