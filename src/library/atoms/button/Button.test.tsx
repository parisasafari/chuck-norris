import { render } from '@testing-library/react'
import Button from './Button'
import userEvent from '@testing-library/user-event'

describe('Button', () => {
  it('renders children and handles onClick event', async () => {
    const mockOnClick = jest.fn()
    const { getByText } = render(<Button onClick={mockOnClick}>Click</Button>)
    const button = getByText('Click')
    expect(button).toBeInTheDocument()
    await userEvent.click(button)
    expect(mockOnClick).toHaveBeenCalled()
  })
})
