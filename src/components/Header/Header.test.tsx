import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from 'src/components/Header'

jest.mock('src/assets/logo.png', () => 'test-file-stub')

describe('Header', () => {
  const setup = () => {
    render(
      <Router>
        <Header />
      </Router>,
    )
  }

  it('renders the logo and navigation links', () => {
    setup()

    expect(screen.getByAltText('logo')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Favorites')).toBeInTheDocument()
  })

  it('applies the active class to the active link when clicked', async () => {
    setup()

    const homeLink = await screen.findByText('Home')
    const favoritesLink = screen.getByText('Favorites')

    await userEvent.click(homeLink)

    await waitFor(() => {
      expect(homeLink).toHaveClass('linkActive')
      expect(favoritesLink).toHaveClass('link')
    })
  })
})
