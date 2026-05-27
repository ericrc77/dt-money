import styled from 'styled-components/native'

export const Container = styled.View`
  align-items: center;
  background: ${({ theme }) => theme.colors.gray900};
  flex: 1;
  justify-content: center;
  padding: 24px;
`

export const Logo = styled.View`
  align-items: center;
  background: ${({ theme }) => theme.colors.gray800};
  border-radius: 8px;
  height: 76px;
  justify-content: center;
  margin-bottom: 20px;
  width: 76px;
`

export const Brand = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.xxl}px;
  font-weight: 700;
`

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.gray300};
  font-size: ${({ theme }) => theme.fontSize.md}px;
  margin: 8px 0 28px;
`
