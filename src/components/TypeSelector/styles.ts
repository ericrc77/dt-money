import styled, { css } from 'styled-components/native'

import type { TransactionType } from '../../types/transaction'

interface TypeButtonProps {
  $isActive: boolean
  $type: TransactionType
}

export const Container = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-bottom: 16px;
`

export const TypeButton = styled.TouchableOpacity<TypeButtonProps>`
  align-items: center;
  background: ${({ theme }) => theme.colors.gray700};
  border-radius: 8px;
  flex: 1;
  flex-direction: row;
  gap: 8px;
  height: 54px;
  justify-content: center;

  ${({ $isActive, $type, theme }) =>
    $isActive &&
    css`
      background: ${$type === 'income'
        ? 'rgba(0, 179, 126, 0.14)'
        : 'rgba(247, 90, 104, 0.14)'};
      border: 1px solid
        ${$type === 'income' ? theme.colors.green300 : theme.colors.red300};
    `}
`

export const ButtonLabel = styled.Text`
  color: ${({ theme }) => theme.colors.gray100};
  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-weight: 700;
`
