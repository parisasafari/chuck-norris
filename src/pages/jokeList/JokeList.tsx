import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { getItem, setItem } from '../../helpers/localStorage'
import { Link } from 'react-router-dom'

const URL = 'https://api.chucknorris.io/jokes/random'

export interface ChuckNorrisJoke {
  icon_url: string
  id: string
  url: string
  value: string
}

export const JokeList = () => {
  const [jokes, setJokes] = useState<ChuckNorrisJoke[]>([])
  const [selectedJokes, setSelectedJokes] = useState<ChuckNorrisJoke[]>([])
  const [timer, setTimer] = useState<boolean>(false)

  const fetchNewJoke = async () => {
    try {
      const response = await fetch(URL)
      const data = await response.json()
      setJokes(prevJokes => {
        if (prevJokes.length === 10) {
          prevJokes.shift()
        }
        return [...prevJokes, data]
      })
    } catch (error) {
      console.error('Error fetching new joke:', error)
    }
  }

  const updateFavouriteList = (joke: ChuckNorrisJoke) => {
    const jokeIndex = selectedJokes?.findIndex(item => item.id === joke.id)
    if (jokeIndex === -1) {
      setSelectedJokes(prevSelectedJokes => [...prevSelectedJokes, joke])
    } else {
      const updatedSelectedJokes = [...selectedJokes]
      updatedSelectedJokes.splice(jokeIndex, 1)
      setSelectedJokes(updatedSelectedJokes)
    }
    setItem('selected-jokes', selectedJokes)
  }

  const initializeSelectedJokes = async () => {
    const selected = (await getItem('selected-jokes')) || []
    setSelectedJokes(selected)
  }

  useEffect(() => {
    Promise.all(
      Array(10)
        .fill(URL)
        .map(url => {
          return fetch(url).then(response => response.json())
        }),
    )
      .then((data: ChuckNorrisJoke[]) => {
        setJokes(data)
        setTimer(true)
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    initializeSelectedJokes()
  }, [])

  useEffect(() => {
    const timer = setInterval(fetchNewJoke, 5000)
    return () => {
      clearInterval(timer)
    }
  }, [timer])

  return (
    <div>
      <Link to={'/favourites'}>favourite jokes</Link>
      <p>this is a joke list page:</p>

      {jokes?.map(item => (
        <p key={item.id}>
          <button
            onClick={() => {
              updateFavouriteList(item)
            }}
          >
            <StyledHeart
              className="fa fa-heart"
              selected={
                selectedJokes?.findIndex(joke => joke.id === item.id) > -1 ||
                false
              }
            />
          </button>

          {item.value}
        </p>
      ))}
    </div>
  )
}

const StyledHeart = styled.div<{ selected: boolean }>(
  () => ({
    padding: 4,
    borderRadius: 4,
    textAlign: 'center',
  }),
  ({ selected }) =>
    selected
      ? {
          color: 'red',
        }
      : { color: 'grey' },
)
