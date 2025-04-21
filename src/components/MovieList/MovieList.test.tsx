import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import MovieList from 'src/components/MovieList'
import { Movie } from 'src/types/types'

jest.mock('src/components/MovieCard', () => ({ movie }: { movie: Movie }) => (
  <div>{movie.title}</div>
))

const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Test Movie 1',
    poster: '',
    release_date: '2025-01-01',
    description: 'Test description',
    actors: ['Test actor 1', 'Test actor 2'],
    director: 'Test director 1',
    genres: ['Test genre 1'],
    rating: 8.5,
  },
  {
    id: '2',
    title: 'Test Movie 2',
    poster: '',
    release_date: '2025-02-02',
    description: 'Test description',
    actors: ['Test actor 2', 'Test actor 2'],
    director: 'Test director 1',
    genres: ['Test genre 2'],
    rating: 8.5,
  },
]

const setup = (movies: Movie[], variant?: 'grid' | 'sidebar') =>
  render(
    <Router>
      <MovieList movies={movies} variant={variant} />
    </Router>,
  )

describe('MovieList', () => {
  it('renders a list of movies', () => {
    setup(mockMovies)
    expect(screen.getByText('Test Movie 1')).toBeInTheDocument()
    expect(screen.getByText('Test Movie 2')).toBeInTheDocument()
  })

  it('renders message when movie list is empty in grid variant', () => {
    setup([])
    expect(screen.getByText('No movies found')).toBeInTheDocument()
  })

  it('renders message when movie list is empty in sidebar variant', () => {
    setup([], 'sidebar')
    expect(screen.getByText('No favorites yet')).toBeInTheDocument()
  })

  it('uses sidebar class when variant is sidebar', () => {
    const { container } = setup(mockMovies, 'sidebar')
    expect(container.firstChild).toHaveClass('sidebarList')
  })

  it('uses movieList class when variant is grid', () => {
    const { container } = setup(mockMovies, 'grid')
    expect(container.firstChild).toHaveClass('movieList')
  })
})
