import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import MovieDetailsCard from 'src/components/MovieDetailsCard'
import { Movie } from 'src/types/types'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

jest.mock('src/components/FavoriteButton', () => () => <button>Favorite</button>)

const mockMovie: Movie = {
  id: '1',
  title: 'Test Movie',
  poster: 'https://example.com/matrix.jpg',
  release_date: '2025-01-01',
  description: 'A very interesting movie.',
  actors: ['Actor 1', 'Actor 2'],
  director: 'Director Name',
  genres: ['Action', 'Sci-Fi'],
  rating: 8.5,
}

const setup = (movie: Movie | null | undefined) =>
  render(
    <Router>
      <MovieDetailsCard movie={movie} />
    </Router>,
  )

describe('MovieDetailsCard', () => {
  it('renders movie details correctly', () => {
    setup(mockMovie)

    expect(screen.getByAltText(mockMovie.title)).toBeInTheDocument()
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument()
    expect(screen.getByText(mockMovie.description)).toBeInTheDocument()
    expect(screen.getByText(/Release:/)).toBeInTheDocument()
    expect(screen.getByText(/Director:/)).toBeInTheDocument()
    expect(screen.getByText(/Cast:/)).toBeInTheDocument()
    expect(screen.getByText(/Genres:/)).toBeInTheDocument()
    expect(screen.getByText(/Rating:/)).toBeInTheDocument()
  })

  it('shows fallback text when no movie is provided', () => {
    setup(null)

    expect(screen.getByText('Could not load movie details')).toBeInTheDocument()
  })

  it('calls navigate(-1) on Back button click', () => {
    setup(mockMovie)
    fireEvent.click(screen.getByText('Back'))
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })

  it('renders Favorite button', () => {
    setup(mockMovie)
    expect(screen.getByText('Favorite')).toBeInTheDocument()
  })
})
