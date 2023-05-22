import { render, screen } from '@testing-library/react'
import { Favourites } from './index'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { JOKE_STORAGE_KEY } from 'consts/consts'

const dummyData = [
  {
    categories: [],
    created_at: '2020-01-05 13:42:28.143137',
    icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
    id: '6lRegqMzRMujB4D8MknnrA',
    updated_at: '2020-01-05 13:42:28.143137',
    url: 'https://api.chucknorris.io/jokes/6lRegqMzRMujB4D8MknnrA',
    value:
      'Chuck Norris took a wrong turn at the zoo and found himself in with Brutus the nasty Silverback Gorilla. Brutus was then seen politely showing Chuck to the exit door.',
  },
  {
    categories: [],
    created_at: '2020-01-05 13:42:28.143137',
    icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
    id: 'ITEirX17SWy1NkM7w5RUDA',
    updated_at: '2020-01-05 13:42:23.880601',
    url: 'https://api.chucknorris.io/jokes/ITEirX17SWy1NkM7w5RUDA',
    value:
      'Chuck Norris is three times deadlier asleep than anyone else is when they are awake.',
  },
]

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
}

describe('Characters page', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        json: jest.fn(() => Promise.resolve(dummyData)),
      }),
    ) as jest.Mock

    localStorage.setItem(JOKE_STORAGE_KEY, JSON.stringify(dummyData))
  })

  afterEach(() => {
    localStorage.removeItem(JOKE_STORAGE_KEY)
  })
  it('renders favourite page', async () => {
    render(
      <BrowserRouter>
        <Favourites />
      </BrowserRouter>,
    )
    const element = screen.getByText(/Joke List/i)
    expect(element).toBeInTheDocument()
  })
  it('checks remove item from favourit elist', async () => {
    render(
      <BrowserRouter>
        <Favourites />
      </BrowserRouter>,
    )

    const listCount = screen.getAllByRole('button').length
    await userEvent.click(screen.getAllByRole('button')[0])
    expect(screen.getAllByRole('button').length).toBe(listCount - 1)
  })
})
