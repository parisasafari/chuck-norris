import styled from '@emotion/styled'
import { Link as ReactLink } from 'react-router-dom'
import { ReactNode } from 'react'

interface LinkProps {
  to: string
  children: ReactNode
}

const Link = ({ to, children }: LinkProps) => {
  return <StyledLink to={to}>{children}</StyledLink>
}

export default Link

const StyledLink = styled(ReactLink)(() => ({
  textDecoration: 'none',
  backgroundColor: '#ffe5f1',
  width: 'fit-content',
  margin: 4,
  padding: 12,
  borderRadius: 8,
}))
