import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  background: ${({ theme }) => theme.colors.gray800};
  flex: 1;
`

export const Content = styled.ScrollView`
  flex: 1;
  padding: 8px 24px 32px;
`

export const FormBlock = styled.View`
  background: ${({ theme }) => theme.colors.gray850};
  border-radius: 8px;
  padding: 20px;
`
