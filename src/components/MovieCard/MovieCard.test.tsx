import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import MovieCard from 'src/components/MovieCard'
import { Movie } from 'src/types/types'
import { formatDate } from 'src/utils/utils'

jest.mock('src/components/FavoriteButton', () => () => <button>Favorite</button>)

const mockMovie: Movie = {
  id: '1',
  title: 'Test Movie',
  poster: 'https://example.com/matrix.jpg',
  release_date: '2025-01-01',
  description: 'Test description',
  actors: ['Test actor 1', 'Test actor 2'],
  director: 'Test director',
  genres: ['Test genre'],
  rating: 8.5,
}

const setup = (movie: Movie, variant = 'grid') =>
  render(
    <Router>
      <MovieCard movie={movie} variant={variant} />
    </Router>,
  )

describe('MovieCard', () => {
  it('renders movie poster with alt text', () => {
    setup(mockMovie)
    const img = screen.getByAltText(mockMovie.title) as HTMLImageElement
    expect(img).toBeInTheDocument()
    expect(img.src).toBe(mockMovie.poster)
  })

  it('renders fallback text when poster is missing', () => {
    const movieWithoutPoster = { ...mockMovie, poster: '' }
    setup(movieWithoutPoster)
    expect(screen.getByText('No image')).toBeInTheDocument()
  })

  it('renders movie title with link', () => {
    setup(mockMovie)
    const titleLink = screen.getByText(mockMovie.title)
    expect(titleLink).toBeInTheDocument()
    expect(titleLink.closest('a')).toHaveAttribute('href', `/movie/${mockMovie.id}`)
  })

  it('renders release date with label for grid variant', () => {
    setup(mockMovie, 'grid')
    expect(screen.getByText(/Release:/)).toBeInTheDocument()
    expect(screen.getByText(formatDate(mockMovie.release_date))).toBeInTheDocument()
  })

  it('renders release date without label for sidebar variant', () => {
    setup(mockMovie, 'sidebar')
    expect(screen.queryByText(/Release:/)).not.toBeInTheDocument()
    expect(screen.getByText(formatDate(mockMovie.release_date))).toBeInTheDocument()
  })

  it('renders favorite button', () => {
    setup(mockMovie)
    expect(screen.getByText('Favorite')).toBeInTheDocument()
  })
})
