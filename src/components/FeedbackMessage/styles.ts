import styled from 'styled-components/native'

export const Container = styled.View`
  align-items: center;
  background: rgba(245, 158, 11, 0.12);
  border-radius: 8px;
  flex-direction: row;
  gap: 8px;
  margin: 0 24px 16px;
  padding: 12px;
`

export const Message = styled.Text`
  color: ${({ theme }) => theme.colors.gray100};
  flex: 1;
  font-size: ${({ theme }) => theme.fontSize.sm}px;
`
