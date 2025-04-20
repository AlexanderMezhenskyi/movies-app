import { useContext } from 'react'
import { FavoritesContext } from 'src/context/FavoritesContext'

/**
 * Custom hook for accessing the favorites context.
 * This hook provides access to the user's list of favorite movies
 * and the dispatch function to modify the favorites state.
 * It ensures that the hook is used within a `FavoritesProvider` context.
 *
 * @returns The context value containing the `favorites` list and the `dispatch` function.
 * @throws Error if used outside of the `FavoritesProvider`.
 */
export const useFavorites = () => {
  // Access the context value provided by FavoritesContext
  const context = useContext(FavoritesContext)

  // If context is not found, it means the hook is being used outside of FavoritesProvider
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }

  return context
}
