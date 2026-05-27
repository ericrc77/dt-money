import styled from 'styled-components/native'

interface ContainerProps {
  $isDisabled: boolean
  $variant: 'primary' | 'secondary' | 'danger'
}

const variantColor = {
  primary: 'green500',
  secondary: 'gray600',
  danger: 'red500',
} as const

export const Container = styled.TouchableOpacity<ContainerProps>`
  align-items: center;
  background: ${({ $variant, theme }) => theme.colors[variantColor[$variant]]};
  border-radius: 8px;
  flex-direction: row;
  gap: 8px;
  height: 54px;
  justify-content: center;
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.6 : 1)};
  padding: 0 18px;
`

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-weight: 700;
`
