import { ReactNode, useEffect, useReducer } from 'react'
import favoritesReducer from 'src/context/favoritesReducer'
import { FavoritesContext } from 'src/context/FavoritesContext'

type Props = { children: ReactNode }

export const FavoritesProvider = ({ children }: Props) => {
  const [favorites, dispatch] = useReducer(favoritesReducer, [], () => {
    try {
      const stored = localStorage.getItem('favorites')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  return (
    <FavoritesContext.Provider value={{ favorites, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  )
}
