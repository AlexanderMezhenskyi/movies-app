import { FavoritesAction, Movie } from 'src/types/types.js';

export default function favoritesReducer(state: Movie[], action: FavoritesAction): Movie[] {
  switch (action.type) {
    case 'ADD':
      return [...state, action.movie];
    case 'REMOVE':
      return state.filter((movie) => movie.id !== action.id);
    default:
      return state;
  }
}
