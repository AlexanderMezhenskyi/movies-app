import { FavoritesAction, Movie } from 'src/types/types.js'

/**
 * Reducer function for managing the state of the user's favorite movies.
 * This function handles adding and removing movies from the list of favorites.
 *
 * @param state - The current list of favorite movies.
 * @param action - The action to perform on the state (ADD or REMOVE).
 * @returns The updated list of favorite movies.
 */
export default function favoritesReducer(state: Movie[], action: FavoritesAction): Movie[] {
  switch (action.type) {
    case 'ADD':
      // Add the movie to the favorites list
      return [...state, action.movie]
    case 'REMOVE':
      // Remove the movie from the favorites list based on its ID
      return state.filter((movie) => movie.id !== action.id)
    default:
      // If the action type is unknown, return the current state
      return state
  }
}
