import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { getItem, setItem } from 'helpers/localStorage'
import { BUFFER_SIZE, ChuckNorrisJoke, URL } from 'consts/jokes'
import HeartButton from 'library/molecules/HeartButton'
import Card from 'library/molecules/Card'
import Button from 'library/atoms/Button'
import Layout from 'library/atoms/Layout'
import Link from 'library/atoms/Link'
import Icons from 'assets/Icons'

export const JokeList = () => {
  const [jokes, setJokes] = useState<ChuckNorrisJoke[]>([])
  const [selectedJokes, setSelectedJokes] = useState<ChuckNorrisJoke[]>([])
  const [timer, setTimer] = useState<boolean>(false)
  const [popupVisibility, setPopupVisibility] = useState<boolean>(false)

  const fetchNewJoke = async () => {
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        setJokes(prevJokes => {
          if (prevJokes.length === BUFFER_SIZE) {
            prevJokes.unshift()
          }
          return [data, ...prevJokes]
        })
      })
      .catch(console.error)
  }

  const updateFavouriteList = (joke: ChuckNorrisJoke) => {
    const jokeIndex = selectedJokes?.findIndex(item => item.id === joke.id)
    if (jokeIndex === -1 && selectedJokes.length === BUFFER_SIZE) {
      setPopupVisibility(true)
      return
    }
    let updatedSelectedJokes

    if (jokeIndex === -1) {
      updatedSelectedJokes = [...selectedJokes, joke]
    } else {
      updatedSelectedJokes = [...selectedJokes]
      updatedSelectedJokes.splice(jokeIndex, 1)
    }
    setItem('selected-jokes', updatedSelectedJokes)
    setSelectedJokes(updatedSelectedJokes)
  }

  useEffect(() => {
    Promise.all(
      Array(BUFFER_SIZE)
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
    const selected = getItem('selected-jokes')
    if (selected) {
      setSelectedJokes(selected)
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(fetchNewJoke, 5000)
    return () => {
      clearInterval(timer)
    }
  }, [timer])

  const Loading = Icons['loading']

  return (
    <Layout>
      <Link to={'/favourites'}>favourite jokes</Link>

      {jokes?.length > 0 ? (
        jokes?.map(item => (
          <Card key={item.id}>
            <HeartButton
              onClick={() => {
                updateFavouriteList(item)
              }}
              isSelected={
                selectedJokes?.findIndex(joke => joke.id === item.id) > -1 ||
                false
              }
            />
            {item.value}
          </Card>
        ))
      ) : (
        <Loading />
      )}
      <StyledOverlay isVisible={popupVisibility}>
        <StyledPopUp isVisible={popupVisibility}>
          <StyledCloseButton onClick={() => setPopupVisibility(false)}>
            <StyledCloseIcon className="fa fa-window-close" />
          </StyledCloseButton>

          <h5>
            Your favorite list is currently at maximum capacity. Please remove
            an item to make space for adding new favorites.
          </h5>

          <p>You can click on the below link to manage your favourite list:</p>

          <Link to={'/favourites'}>favourite jokes</Link>
        </StyledPopUp>
      </StyledOverlay>
    </Layout>
  )
}

const StyledPopUp = styled.div<{ isVisible: boolean }>(
  () => ({
    padding: 40,
    borderRadius: 4,
    width: 500,
    height: 250,
    textAlign: 'center',
    position: 'relative',
    transition: 'all 5s ease-in-out',
    zIndex: 10,
    backgroundColor: 'white',
    margin: 'auto',
    marginTop: 100,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }),
  ({ isVisible }) =>
    isVisible
      ? {
          display: 'flex',
        }
      : { display: 'none' },
)
const StyledOverlay = styled.div<{ isVisible: boolean }>(
  () => ({
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    transition: 'opacity 500ms',
  }),
  ({ isVisible }) =>
    isVisible
      ? {
          visibility: 'visible',
          opacity: 1,
        }
      : { visibility: 'hidden', opacity: 0 },
)

const StyledCloseButton = styled(Button)(() => ({
  marginLeft: 'auto',
}))

const StyledCloseIcon = styled.i(() => ({
  color: '#c0b9bf',
  fontSize: 'large',
}))
