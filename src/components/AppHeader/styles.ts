import styled from 'styled-components/native'

export const Container = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 24px 18px;
`

export const TitleGroup = styled.View`
  flex: 1;
  padding-right: 16px;
`

export const Eyebrow = styled.Text`
  color: ${({ theme }) => theme.colors.green300};
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: 700;
  margin-bottom: 4px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.xxl}px;
  font-weight: 700;
`

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.gray300};
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  margin-top: 4px;
`
