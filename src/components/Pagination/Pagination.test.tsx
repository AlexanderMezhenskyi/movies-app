import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from 'src/components/Pagination'

describe('Pagination', () => {
  const setup = (page: number, totalPages: number, onPageChange = jest.fn()) => {
    render(<Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />)
    return onPageChange
  }

  it('renders current page and total pages', () => {
    setup(3, 10)
    expect(screen.getByText('3 / 10')).toBeInTheDocument()
  })

  it('calls onPageChange with previous page number', () => {
    const onPageChange = setup(3, 5)
    fireEvent.click(screen.getByText('Previous'))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('calls onPageChange with next page number', () => {
    const onPageChange = setup(3, 5)
    fireEvent.click(screen.getByText('Next'))
    expect(onPageChange).toHaveBeenCalledWith(4)
  })

  it('disables Previous button on first page', () => {
    setup(1, 5)
    expect(screen.getByText('Previous')).toBeDisabled()
    expect(screen.getByText('Next')).not.toBeDisabled()
  })

  it('disables Next button on last page', () => {
    setup(5, 5)
    expect(screen.getByText('Next')).toBeDisabled()
    expect(screen.getByText('Previous')).not.toBeDisabled()
  })
})
