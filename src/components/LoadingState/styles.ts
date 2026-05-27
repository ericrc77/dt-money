import styled from 'styled-components/native'

export const Container = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 32px;
`

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.gray300};
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  margin-top: 12px;
`
