import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Footer from 'src/components/Footer'

describe('Footer', () => {
  it('renders the current year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear().toString()
    expect(screen.getByText(`© ${currentYear}`)).toBeInTheDocument()
  })
})
