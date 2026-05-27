import { memo } from 'react'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'

import {
  Amount,
  Category,
  CategoryGroup,
  Container,
  DateText,
  Footer,
  Title,
} from './styles'
import type { Transaction } from '../../types/transaction'
import { currencyFormatter, formatDate } from '../../utils/formatters'

interface TransactionCardProps {
  transaction: Transaction
  onPress?: (transaction: Transaction) => void
}

function TransactionCardComponent({
  transaction,
  onPress,
}: TransactionCardProps) {
  const { colors } = useTheme()
  const isOutcome = transaction.type === 'outcome'
  const amount = isOutcome ? transaction.amount * -1 : transaction.amount

  return (
    <Container onPress={() => onPress?.(transaction)} activeOpacity={0.75}>
      <Title numberOfLines={1}>{transaction.description}</Title>
      <Amount $type={transaction.type}>{currencyFormatter.format(amount)}</Amount>

      <Footer>
        <CategoryGroup>
          <Feather
            name="tag"
            size={14}
            color={isOutcome ? colors.red300 : colors.green300}
          />
          <Category numberOfLines={1}>{transaction.category}</Category>
        </CategoryGroup>

        <DateText>{formatDate(transaction.date)}</DateText>
      </Footer>
    </Container>
  )
}

export const TransactionCard = memo(TransactionCardComponent)
