import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  background: ${({ theme }) => theme.colors.gray800};
  flex: 1;
`

export const ListContent = StyleSheet.create({
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
}).contentContainer

export const FooterLoader = styled.Text`
  color: ${({ theme }) => theme.colors.gray400};
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  padding: 16px 0;
  text-align: center;
`
