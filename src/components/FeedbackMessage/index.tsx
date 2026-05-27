import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'

import { Container, Message } from './styles'

interface FeedbackMessageProps {
  message: string
}

export function FeedbackMessage({ message }: FeedbackMessageProps) {
  const { colors } = useTheme()

  return (
    <Container>
      <Feather name="alert-circle" size={16} color={colors.yellow500} />
      <Message>{message}</Message>
    </Container>
  )
}
