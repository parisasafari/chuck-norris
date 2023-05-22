import { useState } from 'react'
import { getItem, setItem } from 'utils/localStorage'
import { ChuckNorrisJoke } from 'types/interfaces'
import Card from 'library/molecules/card/Card'
import HeartButton from 'library/molecules/heartButton/HeartButton'
import Layout from 'library/atoms/layout/Layout'
import Link from 'library/atoms/link/Link'
import { JOKE_STORAGE_KEY } from 'consts/consts'

export const Favourites = () => {
  const [selectedJokes, setSelectedJokes] = useState<ChuckNorrisJoke[]>(
    getItem(JOKE_STORAGE_KEY),
  )

  const deleteFavouriteJoke = (joke: ChuckNorrisJoke) => {
    const updatedSelectedJokes = selectedJokes.filter(
      item => item.id !== joke.id,
    )
    setSelectedJokes(updatedSelectedJokes)
    setItem(JOKE_STORAGE_KEY, updatedSelectedJokes)
  }

  return (
    <Layout>
      <Link to={'/jokes'}>Joke List</Link>
      {selectedJokes?.map(item => (
        <Card key={item.id}>
          <HeartButton
            onClick={() => {
              deleteFavouriteJoke(item)
            }}
          />
          {item.value}
        </Card>
      ))}
    </Layout>
  )
}
