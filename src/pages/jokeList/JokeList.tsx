import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { getItem, setItem } from '../../helpers/localStorage'
import { Link } from 'react-router-dom'
import { ChuckNorrisJoke, URL } from '../../utils/jokes'

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
          if (prevJokes.length === 10) {
            prevJokes.unshift()
          }
          return [data, ...prevJokes]
        })
      })
      .catch(console.error)
  }

  const updateFavouriteList = (joke: ChuckNorrisJoke) => {
    const jokeIndex = selectedJokes?.findIndex(item => item.id === joke.id)
    console.log('selectedJokes.length', selectedJokes.length)
    if (jokeIndex === -1 && selectedJokes.length === 10) {
      setPopupVisibility(true)
      console.log('popupVisibility', popupVisibility)
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

  console.log('popupVisibility', popupVisibility)

  return (
    <StyledWrapper>
      <StyledLink to={'/favourites'}>favourite jokes</StyledLink>
      {jokes?.map(item => (
        <StyledCard key={item.id}>
          <StyledButton
            onClick={() => {
              updateFavouriteList(item)
            }}
          >
            <StyledHeart
              className="fa fa-heart"
              selected={
                selectedJokes?.findIndex(joke => joke.id === item.id) > -1 ||
                false
              }
            />
          </StyledButton>
          {item.value}
        </StyledCard>
      ))}
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

          <StyledLink to={'/favourites'}>favourite jokes</StyledLink>
        </StyledPopUp>
      </StyledOverlay>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div(() => ({
  width: 800,
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
}))

const StyledCard = styled.div(() => ({
  border: '1px solid rgba(149, 157, 165, 0.2)',
  margin: 8,
  padding: 16,
  borderRadius: 8,
  color: '#7286a0',
  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  // backgroundColor: 'aliceblue',
  // opacity: '0.9',
}))

const StyledButton = styled.button(() => ({
  border: 'none',
  backgroundColor: 'transparent',
  margin: 4,
  padding: 8,
  borderRadius: 8,
  cursor: 'pointer',
}))

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  backgroundColor: '#ffe5f1',
  width: 'fit-content',
  margin: 4,
  padding: 12,
  borderRadius: 8,
}))

const StyledHeart = styled.div<{ selected: boolean }>(
  () => ({
    padding: 4,
    borderRadius: 4,
    textAlign: 'center',
  }),
  ({ selected }) =>
    selected
      ? {
          color: '#ff7477',
        }
      : { color: '#b5d6d6' },
)

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

const StyledCloseButton = styled(StyledButton)(() => ({
  marginLeft: 'auto',
}))

const StyledCloseIcon = styled.i(() => ({
  color: '#c0b9bf',
  fontSize: 'large',
}))
