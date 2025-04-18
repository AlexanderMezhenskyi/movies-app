import { createContext, useReducer, useEffect, Dispatch, ReactNode } from 'react';
import { FavoritesAction, Movie } from 'src/types/types';
import favoritesReducer from './favoritesReducer';

interface FavoritesContextType {
  favorites: Movie[];
  dispatch: Dispatch<FavoritesAction>;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  dispatch: () => {},
});

type Props = { children: ReactNode };

export const FavoritesProvider = ({ children }: Props) => {
  const [favorites, dispatch] = useReducer(favoritesReducer, [], () => {
    try {
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};
