import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Link from './Link'
import userEvent from '@testing-library/user-event'
import App from 'App'

describe('Link', () => {
  it('Checks link component', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Link to="/jokes">Click</Link>
      </BrowserRouter>,
    )
    const link = getByText('Click')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/jokes')
  }),
    it('navigates to the correct path on click', async () => {
      const { getByText } = render(
        <BrowserRouter>
          <App />
          <Link to="/123">Click</Link>
        </BrowserRouter>,
      )

      const link = getByText('Click')
      await userEvent.click(link)
      const element = screen.getByText(/404 Not found/i)
      expect(element).toBeInTheDocument()
    })
})
