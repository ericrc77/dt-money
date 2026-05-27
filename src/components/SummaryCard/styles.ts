import styled, { css } from 'styled-components/native'

interface ContainerProps {
  $variant: 'income' | 'outcome' | 'total'
}

export const Container = styled.View<ContainerProps>`
  background: ${({ theme }) => theme.colors.gray700};
  border-radius: 8px;
  margin-right: 12px;
  min-height: 132px;
  padding: 20px;
  width: 280px;

  ${({ $variant, theme }) =>
    $variant === 'total' &&
    css`
      background: ${theme.colors.green700};
    `}
`

export const Header = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.gray100};
  font-size: ${({ theme }) => theme.fontSize.md}px;
`

export const Amount = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.xxl}px;
  font-weight: 700;
  margin-top: 28px;
`
