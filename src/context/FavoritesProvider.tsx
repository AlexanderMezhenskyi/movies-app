import { ReactNode, useEffect, useReducer } from 'react'
import favoritesReducer from 'src/context/favoritesReducer'
import { FavoritesContext } from 'src/context/FavoritesContext'

/**
 * FavoritesProvider component
 * @param children - The components that will consume the context (wrapped around the provider).
 */
type Props = { children: ReactNode }

/**
 * FavoritesProvider component
 * Manages the global state of the user's favorite movies and persists it to localStorage.
 * The component uses the `useReducer` hook to handle the state updates and ensures
 * the list of favorite movies is saved in the browser's localStorage for persistence.
 */
export const FavoritesProvider = ({ children }: Props) => {
  // Initialize the favorites state with localStorage data or an empty array.
  const [favorites, dispatch] = useReducer(favoritesReducer, [], () => {
    try {
      const stored = localStorage.getItem('favorites')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Save the favorites list to localStorage whenever it changes.
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  return (
    <FavoritesContext.Provider value={{ favorites, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  )
}
