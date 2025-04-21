import '@testing-library/jest-dom'
import favoritesReducer from 'src/context/favoritesReducer'
import { FavoritesAction } from 'src/types/types.ts'
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

describe('favoritesReducer', () => {
  it('should add a movie to favorites', () => {
    const action: FavoritesAction = { type: 'ADD', movie: mockMovie }
    const state = favoritesReducer([], action)
    expect(state).toEqual([mockMovie])
  })

  it('should remove a movie from favorites', () => {
    const action: FavoritesAction = { type: 'REMOVE', id: '1' }
    const state = favoritesReducer([mockMovie], action)
    expect(state).toEqual([])
  })

  it('should return the current state for unknown action', () => {
    const action: FavoritesAction = { type: 'UNKNOWN' }
    const state = favoritesReducer([mockMovie], action)
    expect(state).toEqual([mockMovie])
  })
})
