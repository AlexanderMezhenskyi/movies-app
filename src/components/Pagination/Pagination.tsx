import { memo } from 'react'
import styles from './Pagination.module.scss'

/**
 * Props for the Pagination component
 * @property page - current active page number
 * @property totalPages - total number of pages available
 * @property onPageChange - callback to update the current page
 */
interface Props {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

/**
 * Pagination component
 * Renders navigation controls to move between pages.
 * Disables buttons appropriately based on the current page.
 */
const Pagination = ({ page, totalPages, onPageChange }: Props) => {
  return (
    <div className={styles.pagination}>
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <span>
        {page} / {totalPages}
      </span>
      <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
        Next
      </button>
    </div>
  )
}

export default memo(Pagination)
