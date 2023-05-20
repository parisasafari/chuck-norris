export interface LocalStorageHelpers {
  getItem: (key: string) => string | undefined
  setItem: (key: string, value: string) => string
}

export const setItem = (key: string, item: any) => {
  localStorage.setItem(key, JSON.stringify(item))
}

export const getItem = (key: string) => {
  const item = localStorage.getItem(key)
  if (item) {
    return JSON.parse(item)
  }
  return null
}
