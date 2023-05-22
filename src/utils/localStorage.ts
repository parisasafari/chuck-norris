import { ChuckNorrisJoke } from 'types/interfaces'

export const setItem = (key: string, item: ChuckNorrisJoke[]) => {
  localStorage.setItem(key, JSON.stringify(item))
}

export const getItem = (key: string) => {
  const item = localStorage.getItem(key)
  if (item) {
    return JSON.parse(item)
  }
  return null
}
