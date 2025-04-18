import { useContext } from 'react';
import { FavoritesContext } from 'src/context/FavoritesContext.tsx';

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
