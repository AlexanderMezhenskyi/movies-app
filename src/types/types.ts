/**
 * Movie interface represents the structure of a movie object.
 */
export interface Movie {
  id: string
  title: string
  poster: string
  release_date: string
  description: string
  actors: string[]
  director: string
  genres: string[]
  rating: number
}

/**
 * MovieCardVariant type represents the possible layout variants for displaying the movie card.
 */
export type MovieCardVariant = 'grid' | 'sidebar'

/**
 * FavoritesAction type represents actions that can be dispatched to modify the user's favorite movies.
 * The actions are either adding a movie to favorites or removing it based on the action type.
 */
export type FavoritesAction =
  | { type: 'ADD'; movie: Movie }
  | { type: 'REMOVE'; id: string }
  | { type: 'UNKNOWN' }
