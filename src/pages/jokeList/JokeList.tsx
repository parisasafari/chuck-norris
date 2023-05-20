import { useEffect, useState } from 'react'

interface ChuckNorrisJoke {
  icon_url: string
  id: string
  url: string
  value: string
}

export const JokeList = () => {
  const [jokes, setJokes] = useState<ChuckNorrisJoke[]>([])

  useEffect(() => {
    fetch('https://api.chucknorris.io/jokes/random', {})
      .then(response => {
        return response.json()
      })
      .then((data: ChuckNorrisJoke) => {
        const newJoke = [...jokes, data]
        console.log('---', newJoke)
        setJokes(newJoke)
      })
      .catch(console.error)
  }, [])

  return <div>this is a joke list page: {jokes?.[0]?.value}</div>
}
