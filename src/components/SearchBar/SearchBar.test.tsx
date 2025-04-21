import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SearchBar from 'src/components/SearchBar'

jest.useFakeTimers()

const setup = (onSearch = jest.fn()) => {
  render(<SearchBar onSearch={onSearch} />)
  const input = screen.getByPlaceholderText(/search by movie title/i)
  return { input, onSearch }
}

describe('SearchBar', () => {
  it('renders input and title', () => {
    setup()
    expect(screen.getByPlaceholderText(/search by movie title/i)).toBeInTheDocument()
    expect(screen.getByText(/find your favorite movies/i)).toBeInTheDocument()
  })

  it('debounces search input', async () => {
    const { input, onSearch } = setup()

    fireEvent.change(input, { target: { value: 'Matrix' } })
    jest.advanceTimersByTime(500)

    await waitFor(() => expect(onSearch).toHaveBeenCalledWith('Matrix'))
  })

  it('trims input before calling onSearch', async () => {
    const { input, onSearch } = setup()

    fireEvent.change(input, { target: { value: '   Avatar   ' } })
    jest.advanceTimersByTime(500)

    await waitFor(() => expect(onSearch).toHaveBeenCalledWith('Avatar'))
  })

  it('calls onSearch once after rapid input', async () => {
    const { input, onSearch } = setup()

    fireEvent.change(input, { target: { value: 'Av' } })
    fireEvent.change(input, { target: { value: 'Ava' } })
    fireEvent.change(input, { target: { value: 'Avatar' } })

    jest.advanceTimersByTime(500)

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledTimes(1)
      expect(onSearch).toHaveBeenCalledWith('Avatar')
    })
  })
})
