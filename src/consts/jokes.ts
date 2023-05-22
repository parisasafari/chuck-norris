export const URL = 'https://api.chucknorris.io/jokes/random'
export const BUFFER_SIZE = 10

export interface ChuckNorrisJoke {
  icon_url: string
  id: string
  url: string
  value: string
}
