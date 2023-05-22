import styled from '@emotion/styled'

interface HeartIconProps {
  isSelected: boolean
}

const HeartIcon = ({ isSelected }: HeartIconProps) => {
  return <StyledHeart className="fa fa-heart" selected={isSelected} />
}

export default HeartIcon

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
