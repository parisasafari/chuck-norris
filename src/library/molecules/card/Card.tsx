import styled from '@emotion/styled'
import { ReactNode } from 'react'

const Card = ({ children }: { children: ReactNode }) => {
  return <StyledCard>{children}</StyledCard>
}

export default Card

const StyledCard = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  border: '1px solid rgba(149, 157, 165, 0.2)',
  margin: 8,
  padding: 16,
  borderRadius: 8,
  color: '#7286a0',
  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  width: 'inherit',
}))
