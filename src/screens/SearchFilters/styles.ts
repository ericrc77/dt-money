import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'

interface ActiveProps {
  $isActive: boolean
}

export const Container = styled.SafeAreaView`
  background: ${({ theme }) => theme.colors.gray800};
  flex: 1;
`

export const FilterBlock = styled.View`
  background: ${({ theme }) => theme.colors.gray850};
  border-radius: 8px;
  margin: 0 24px 16px;
  padding: 16px;
`

export const FilterLabel = styled.Text`
  color: ${({ theme }) => theme.colors.gray200};
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: 700;
  margin-bottom: 8px;
`

export const HorizontalFilters = styled.ScrollView`
  margin-bottom: 16px;
`

export const Chip = styled.TouchableOpacity<ActiveProps>`
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.green700 : theme.colors.gray700};
  border-radius: 8px;
  margin-right: 8px;
  padding: 10px 14px;
`

export const ChipText = styled.Text<ActiveProps>`
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.white : theme.colors.gray200};
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: 700;
`

export const ListContent = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
}).contentContainer
