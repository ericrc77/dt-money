import styled from 'styled-components/native'

import type { TransactionType } from '../../types/transaction'

interface AmountProps {
  $type: TransactionType
}

export const Container = styled.SafeAreaView`
  background: ${({ theme }) => theme.colors.gray800};
  flex: 1;
`

export const Content = styled.ScrollView`
  padding: 8px 24px 32px;
`

export const HeroCard = styled.View`
  background: ${({ theme }) => theme.colors.gray700};
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 24px;
`

export const HeroTitle = styled.Text`
  color: ${({ theme }) => theme.colors.gray200};
  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-weight: 700;
`

export const Amount = styled.Text<AmountProps>`
  color: ${({ $type, theme }) =>
    $type === 'income' ? theme.colors.green300 : theme.colors.red300};
  font-size: ${({ theme }) => theme.fontSize.xxl}px;
  font-weight: 700;
  margin-top: 16px;
`

export const DetailCard = styled.View`
  background: ${({ theme }) => theme.colors.gray850};
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 8px 20px;
`

export const DetailRow = styled.View`
  border-bottom-color: ${({ theme }) => theme.colors.gray700};
  border-bottom-width: 1px;
  padding: 16px 0;
`

export const DetailLabel = styled.Text`
  color: ${({ theme }) => theme.colors.gray400};
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  margin-bottom: 6px;
`

export const DetailValue = styled.Text`
  color: ${({ theme }) => theme.colors.gray100};
  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-weight: 700;
`

export const ActionRow = styled.View`
  gap: 12px;
`
