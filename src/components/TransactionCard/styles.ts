import styled from 'styled-components/native'

import type { TransactionType } from '../../types/transaction'

interface AmountProps {
  $type: TransactionType
}

export const Container = styled.TouchableOpacity`
  background: ${({ theme }) => theme.colors.gray700};
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 18px 20px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.gray100};
  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-weight: 600;
`

export const Amount = styled.Text<AmountProps>`
  color: ${({ $type, theme }) =>
    $type === 'income' ? theme.colors.green300 : theme.colors.red300};
  font-size: ${({ theme }) => theme.fontSize.xl}px;
  font-weight: 700;
  margin-top: 8px;
`

export const Footer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 18px;
`

export const CategoryGroup = styled.View`
  align-items: center;
  flex: 1;
  flex-direction: row;
  padding-right: 12px;
`

export const Category = styled.Text`
  color: ${({ theme }) => theme.colors.gray300};
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  margin-left: 6px;
`

export const DateText = styled.Text`
  color: ${({ theme }) => theme.colors.gray300};
  font-size: ${({ theme }) => theme.fontSize.sm}px;
`
