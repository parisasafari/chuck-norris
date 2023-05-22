import { setItem, getItem } from './localStorage'

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
]

const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('localStorageHelpers', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should set and get an item from localStorage', () => {
    const key = 'name'
    setItem(key, dummyData)
    const retrievedValue = getItem(key)
    expect(retrievedValue).toEqual(dummyData)
  })

  it('should return null if item does not exist', () => {
    const key = 'nonexistent'
    const retrievedValue = getItem(key)
    expect(retrievedValue).toBeNull()
  })
})
