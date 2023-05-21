import styled from '@emotion/styled'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick: () => void
}

const Button = ({ children, onClick }: ButtonProps) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>
}

export default Button

export const StyledButton = styled.button(() => ({
  border: 'none',
  backgroundColor: 'transparent',
  margin: 4,
  padding: 8,
  borderRadius: 8,
  cursor: 'pointer',
}))
