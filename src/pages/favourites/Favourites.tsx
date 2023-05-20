import { useState } from 'react'
import { getItem, setItem } from '../../helpers/localStorage'
import { ChuckNorrisJoke } from '../jokeList/JokeList'

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
    <>
      <h6>Favourites</h6>
      {selectedJokes?.map(item => (
        <p key={item.id}>
          <button
            onClick={() => {
              deleteFavouriteJoke(item)
            }}
          >
            <i className="fa fa-heart" />
          </button>

          {item.value}
        </p>
      ))}
    </>
  )
}
