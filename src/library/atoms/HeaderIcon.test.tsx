import { render } from '@testing-library/react'
import HeartIcon from './HeartIcon'

describe('HeartIcon', () => {
  it('renders with correct styles based on isSelected prop', () => {
    const { container: selectedJoke } = render(<HeartIcon isSelected={true} />)
    const { container: unselectedJoke } = render(
      <HeartIcon isSelected={false} />,
    )
    const selectedHeartIcon = selectedJoke.firstChild
    expect(selectedHeartIcon).toHaveStyle('color: #ff7477')

    const unselectedHeartIcon = unselectedJoke.firstChild
    expect(unselectedHeartIcon).toHaveStyle('color: #b5d6d6')
  })
})
