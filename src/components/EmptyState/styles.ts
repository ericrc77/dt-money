import styled from 'styled-components/native'

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.gray100};
  font-size: ${({ theme }) => theme.fontSize.lg}px;
  font-weight: 700;
  margin-top: 16px;
`

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.gray400};
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  margin-top: 8px;
  text-align: center;
`
