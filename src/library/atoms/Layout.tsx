import styled from '@emotion/styled'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return <StyledLayout>{children}</StyledLayout>
}

const StyledLayout = styled.div(() => ({
  width: 300,
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
  alignItems: 'center',
  marginTop: 16,
  '@media (min-width: 400px)': {
    width: 400,
  },
  '@media (min-width: 600px)': {
    width: 600,
  },
  '@media (min-width: 800px)': {
    width: 800,
  },
}))

export default Layout
