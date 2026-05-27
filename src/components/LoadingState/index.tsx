import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Container, Label } from './styles'

interface LoadingStateProps {
  label?: string
}

export function LoadingState({ label = 'Carregando...' }: LoadingStateProps) {
  const { colors } = useTheme()

  return (
    <Container>
      <ActivityIndicator color={colors.green300} size="large" />
      <Label>{label}</Label>
    </Container>
  )
}
