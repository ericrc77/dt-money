import styled from 'styled-components/native'

interface ActiveProps {
  $isActive: boolean
}

export const Container = styled.View`
  margin-bottom: 16px;
`

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.gray200};
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: 700;
  margin-bottom: 8px;
`

export const CategoryButton = styled.TouchableOpacity<ActiveProps>`
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.green700 : theme.colors.gray700};
  border-radius: 8px;
  margin-right: 8px;
  padding: 10px 14px;
`

export const CategoryText = styled.Text<ActiveProps>`
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.white : theme.colors.gray200};
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: 700;
`
