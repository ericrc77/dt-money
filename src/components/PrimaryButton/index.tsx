import { ActivityIndicator, TouchableOpacityProps } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'

import { ButtonText, Container } from './styles'

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string
  icon?: keyof typeof Feather.glyphMap
  isLoading?: boolean
  variant?: 'primary' | 'secondary' | 'danger'
}

export function PrimaryButton({
  title,
  icon,
  isLoading = false,
  variant = 'primary',
  disabled,
  ...props
}: PrimaryButtonProps) {
  const { colors } = useTheme()
  const isDisabled = disabled || isLoading

  return (
    <Container
      $variant={variant}
      activeOpacity={0.78}
      disabled={isDisabled}
      $isDisabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <>
          {icon ? <Feather name={icon} size={18} color={colors.white} /> : null}
          <ButtonText>{title}</ButtonText>
        </>
      )}
    </Container>
  )
}
