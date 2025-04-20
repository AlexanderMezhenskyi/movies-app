import { createContext, Dispatch } from 'react'
import { FavoritesAction, Movie } from 'src/types/types'

interface FavoritesContextType {
  favorites: Movie[]
  dispatch: Dispatch<FavoritesAction>
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  dispatch: () => {},
})
