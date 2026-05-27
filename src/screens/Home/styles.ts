import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  background: ${({ theme }) => theme.colors.gray800};
  flex: 1;
`

export const SummaryList = styled.ScrollView`
  margin-bottom: 24px;
  padding-left: 24px;
`

export const Content = styled.View`
  padding: 0 24px 32px;
`

export const Actions = styled.View`
  margin-bottom: 28px;
`

export const RecentHeader = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
`

export const RecentTitle = styled.Text`
  color: ${({ theme }) => theme.colors.gray100};
  font-size: ${({ theme }) => theme.fontSize.lg}px;
  font-weight: 700;
`
