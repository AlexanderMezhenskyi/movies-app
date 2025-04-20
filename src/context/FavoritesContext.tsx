import { createContext, Dispatch } from 'react'
import { FavoritesAction, Movie } from 'src/types/types'

/**
 * Context type for managing the user's favorite movies.
 * Contains the current list of favorite movies and a dispatch function
 * to update the list using actions like ADD or REMOVE.
 */
interface FavoritesContextType {
  favorites: Movie[]
  dispatch: Dispatch<FavoritesAction>
}

/**
 * FavoritesContext provides access to the favorites state and dispatcher.
 * This context should be used with a corresponding FavoritesProvider.
 */
export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  dispatch: () => {},
})
