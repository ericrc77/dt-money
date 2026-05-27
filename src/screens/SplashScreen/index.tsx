import { ActivityIndicator } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'

import { Brand, Container, Logo, Subtitle } from './styles'

export function SplashScreen() {
  const { colors } = useTheme()

  return (
    <Container>
      <Logo>
        <Feather name="dollar-sign" size={42} color={colors.green300} />
      </Logo>
      <Brand>DT Money</Brand>
      <Subtitle>Controle financeiro mobile</Subtitle>
      <ActivityIndicator color={colors.green300} size="small" />
    </Container>
  )
}
