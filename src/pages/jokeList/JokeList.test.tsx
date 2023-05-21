import { render, screen, act } from '@testing-library/react'
import { JokeList } from './index'
import { BrowserRouter } from 'react-router-dom'

const dummyData = {
  categories: [],
  created_at: '2020-01-05 13:42:28.143137',
  icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
  id: '6lRegqMzRMujB4D8MknnrA',
  updated_at: '2020-01-05 13:42:28.143137',
  url: 'https://api.chucknorris.io/jokes/6lRegqMzRMujB4D8MknnrA',
  value:
    'Chuck Norris took a wrong turn at the zoo and found himself in with Brutus the nasty Silverback Gorilla. Brutus was then seen politely showing Chuck to the exit door.',
}

describe('Characters page', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: jest.fn(() => Promise.resolve(dummyData)),
      }),
    ) as jest.Mock
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('checks loading', async () => {
    await render(
      <BrowserRouter>
        <JokeList />
      </BrowserRouter>,
    )
    const loading = screen.getByTestId('loading')
    expect(loading).toBeInTheDocument()
  })
  it('checks joke list', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <JokeList />
        </BrowserRouter>,
      )
    })
    const link = screen.getByRole('link', { name: 'favourite jokes' })
    expect(link).toBeInTheDocument()
    const result = screen.getAllByText(dummyData.value)
    expect(result[0]).toBeInTheDocument()
  })
})
