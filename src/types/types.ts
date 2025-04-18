export interface Movie {
  id: string,
  title: string,
  poster: string,
  release_date: string,
  description: string,
  actors: string[],
  director: string,
  genres: string[],
  rating: number,
}

export type MovieCardVariant = 'grid' | 'sidebar';
