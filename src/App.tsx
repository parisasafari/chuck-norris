import { Favourites } from './pages/favourites'
import { JokeList } from './pages/jokeList'
import { Navigate, Route, Routes } from 'react-router-dom'
import { NotFound } from './pages/notFound'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/jokes" replace={true} />} />
      <Route path="/jokes" element={<JokeList />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}

export default App
