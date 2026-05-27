import styled from 'styled-components/native'

export const Container = styled.View`
  margin-bottom: 16px;
`

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.gray200};
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: 700;
  margin-bottom: 8px;
`

export const Input = styled.TextInput`
  background: ${({ theme }) => theme.colors.gray900};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.md}px;
  min-height: 54px;
  padding: 0 16px;
`

export const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.red300};
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  margin-top: 6px;
`
