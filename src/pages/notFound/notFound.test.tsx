import { render, screen } from '@testing-library/react'
import { NotFound } from './index'
import { BrowserRouter } from 'react-router-dom'

test('renders not found page', () => {
  render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>,
  )
  const element = screen.getByText(/404 Not found/i)
  expect(element).toBeInTheDocument()
})
