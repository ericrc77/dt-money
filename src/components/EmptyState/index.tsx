import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'

import { Container, Subtitle, Title } from './styles'

interface EmptyStateProps {
  title: string
  subtitle: string
}

export function EmptyState({ title, subtitle }: EmptyStateProps) {
  const { colors } = useTheme()

  return (
    <Container>
      <Feather name="inbox" size={38} color={colors.gray400} />
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  )
}
