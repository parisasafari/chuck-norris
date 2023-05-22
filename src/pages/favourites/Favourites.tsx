import { useState } from 'react'
import { getItem, setItem } from 'helpers/localStorage'
import { ChuckNorrisJoke } from 'consts/jokes'
import Card from 'library/molecules/Card'
import HeartButton from 'library/molecules/HeartButton'
import Layout from 'library/atoms/Layout'
import Link from 'library/atoms/Link'

export const Favourites = () => {
  const [selectedJokes, setSelectedJokes] = useState<ChuckNorrisJoke[]>(
    getItem('selected-jokes'),
  )

  const deleteFavouriteJoke = (joke: ChuckNorrisJoke) => {
    const updatedSelectedJokes = selectedJokes.filter(
      item => item.id !== joke.id,
    )
    setSelectedJokes(updatedSelectedJokes)
    setItem('selected-jokes', updatedSelectedJokes)
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
