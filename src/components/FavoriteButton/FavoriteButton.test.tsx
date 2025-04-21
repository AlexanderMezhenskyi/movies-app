import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import FavoriteButton from 'src/components/FavoriteButton'
import { FavoritesContext } from 'src/context/FavoritesContext'
import { Movie } from 'src/types/types'

const mockMovie: Movie = {
  id: '1',
  title: 'Test Movie',
  poster: '',
  release_date: '2025-01-01',
  description: 'Test description',
  actors: ['Test actor 1', 'Test actor 2'],
  director: 'Test director',
  genres: ['Test genre'],
  rating: 8.5,
}

let dispatch: jest.Mock
let favorites: Movie[]

const renderWithProvider = (isFavorite: boolean, expanded = false, dispatch = jest.fn()) => {
  const favorites: Movie[] = isFavorite ? [mockMovie] : []

  render(
    <FavoritesContext.Provider value={{ favorites, dispatch }}>
      <FavoriteButton movie={mockMovie} expanded={expanded} />
    </FavoritesContext.Provider>,
  )

  return { dispatch }
}

beforeEach(() => {
  dispatch = jest.fn()
  favorites = []
})

describe('FavoriteButton', () => {
  it('renders "Add" when movie is not in favorites', () => {
    renderWithProvider(false)
    expect(screen.getByRole('button', { name: /❤️ Add/i })).toBeInTheDocument()
  })

  it('renders "Remove" when movie is in favorites', () => {
    renderWithProvider(true)
    expect(screen.getByRole('button', { name: /💔 Remove/i })).toBeInTheDocument()
  })

  it('calls dispatch with ADD when movie is not in favorites', () => {
    const { dispatch } = renderWithProvider(false)
    screen.getByRole('button').click()
    expect(dispatch).toHaveBeenCalledWith({ type: 'ADD', movie: mockMovie })
  })

  it('calls dispatch with REMOVE when movie is in favorites', () => {
    const { dispatch } = renderWithProvider(true)
    screen.getByRole('button').click()
    expect(dispatch).toHaveBeenCalledWith({ type: 'REMOVE', id: mockMovie.id })
  })

  it('applies the expanded class when expanded is true', () => {
    renderWithProvider(false, true)
    expect(screen.getByRole('button').className).toContain('buttonExpanded')
  })

  it('applies the normal class when expanded is false', () => {
    renderWithProvider(false, false)
    expect(screen.getByRole('button').className).toContain('button')
  })
})
