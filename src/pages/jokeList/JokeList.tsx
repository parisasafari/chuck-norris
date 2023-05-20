import { useEffect, useState } from 'react'

const URL = 'https://api.chucknorris.io/jokes/random'

interface ChuckNorrisJoke {
  icon_url: string
  id: string
  url: string
  value: string
}

export const JokeList = () => {
  const [jokes, setJokes] = useState<ChuckNorrisJoke[]>([])
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
    const timer = setInterval(fetchNewJoke, 5000)
    return () => {
      clearInterval(timer)
    }
  }, [timer])

  return (
    <div>
      this is a joke list page:
      {jokes?.map(item => (
        <p key={item.id}>{item.value}</p>
      ))}
    </div>
  )
}
