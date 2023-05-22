import Card from 'library/molecules/card/Card'
import Layout from 'library/atoms/layout/Layout'
import Link from 'library/atoms/link/Link'
import styled from '@emotion/styled'

export const NotFound = () => (
  <Layout>
    <StyledLinkWrapper>
      <Link to={'/favourites'}>favourite jokes</Link>
      <Link to={'/jokes'}>Joke List</Link>
    </StyledLinkWrapper>
    <Card>
      <img
        src={require('../../assets/chuck-norris.png')}
        alt="chuck-norris-sad-image"
        width="100"
        height="100"
      />
      <p> 404 Not found</p>
    </Card>
  </Layout>
)

const StyledLinkWrapper = styled.div(() => ({
  flexDirection: 'row',
  margin: 16,
}))
