import { useEffect, useMemo, useState } from 'react'

/**
 * Custom hook to manage pagination for a list of items.
 * This hook provides paginated items and utilities for navigating through pages.
 *
 * @param items - The list of items to paginate.
 * @param itemsPerPage - The number of items per page.
 * @returns An object containing:
 *   - `page`: The current page number.
 *   - `setPage`: A function to change the current page.
 *   - `paginatedItems`: A slice of the items corresponding to the current page.
 *   - `totalPages`: The total number of pages.
 */
export function usePagination<T>(items: T[], itemsPerPage: number) {
  const [page, setPage] = useState(1)

  // Memoize the total number of pages to avoid recalculating on every render
  const totalPages = useMemo(() => {
    return Math.ceil(items.length / itemsPerPage)
  }, [items.length, itemsPerPage])

  // Effect to ensure the page doesn't exceed the total number of pages
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages || 1)
    }
  }, [page, totalPages])

  // Memoize the items to display for the current page
  const paginatedItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage
    return items.slice(start, start + itemsPerPage)
  }, [items, page, itemsPerPage])

  return { page, setPage, paginatedItems, totalPages }
}
