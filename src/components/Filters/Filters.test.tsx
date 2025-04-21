import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Filters from 'src/components/Filters'
import { Movie } from 'src/types/types'

describe('Filters', () => {
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

  const onGenreChange = jest.fn()
  const onYearChange = jest.fn()
  const onRatingChange = jest.fn()

  const setup = () => {
    render(
      <Filters
        movies={mockMovies}
        selectedGenre=""
        selectedYear=""
        selectedRating=""
        onGenreChange={onGenreChange}
        onYearChange={onYearChange}
        onRatingChange={onRatingChange}
      />,
    )
  }

  beforeEach(() => {
    onGenreChange.mockClear()
    onYearChange.mockClear()
    onRatingChange.mockClear()
    localStorage.clear()
  })

  it('renders all filter dropdowns and the reset button', () => {
    setup()

    expect(screen.getByText('All genres')).toBeInTheDocument()
    expect(screen.getByText('All years')).toBeInTheDocument()
    expect(screen.getByText('All ratings')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument()
  })

  it('calls onGenreChange when a genre is selected', () => {
    setup()
    fireEvent.change(screen.getAllByRole('combobox')[0], {
      target: { value: 'Test genre 1' },
    })
    expect(onGenreChange).toHaveBeenCalledWith('Test genre 1')
  })

  it('calls onYearChange when a year is selected', () => {
    setup()
    fireEvent.change(screen.getAllByRole('combobox')[1], {
      target: { value: '2025' },
    })
    expect(onYearChange).toHaveBeenCalledWith('2025')
  })

  it('calls onRatingChange when a rating is selected', () => {
    setup()
    fireEvent.change(screen.getAllByRole('combobox')[2], {
      target: { value: '7' },
    })
    expect(onRatingChange).toHaveBeenCalledWith('7')
  })

  it('resets all filters and clears localStorage when Reset button is clicked', () => {
    localStorage.setItem('movieFilters', JSON.stringify({}))
    setup()

    fireEvent.click(screen.getByRole('button', { name: /reset/i }))

    expect(onGenreChange).toHaveBeenCalledWith('')
    expect(onYearChange).toHaveBeenCalledWith('')
    expect(onRatingChange).toHaveBeenCalledWith('')
    expect(localStorage.getItem('movieFilters')).toBeNull()
  })
})
