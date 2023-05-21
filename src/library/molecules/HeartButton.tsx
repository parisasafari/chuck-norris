import Button from '../atoms/Button'
import HeartIcon from '../atoms/HeartIcon'

interface HeartButtonProps {
  isSelected?: boolean
  onClick: () => void
}

const HeartButton = ({ isSelected = true, onClick }: HeartButtonProps) => {
  return (
    <Button onClick={onClick}>
      <HeartIcon isSelected={isSelected} />
    </Button>
  )
}

export default HeartButton
