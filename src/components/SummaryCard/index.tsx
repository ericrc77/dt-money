import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'

import { Amount, Container, Header, Label } from './styles'
import { currencyFormatter } from '../../utils/formatters'

type SummaryCardVariant = 'income' | 'outcome' | 'total'

interface SummaryCardProps {
  title: string
  amount: number
  variant: SummaryCardVariant
}

const iconByVariant = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
  total: 'dollar-sign',
} as const

export function SummaryCard({ title, amount, variant }: SummaryCardProps) {
  const { colors } = useTheme()
  const iconColor = variant === 'outcome' ? colors.red300 : colors.green300

  return (
    <Container $variant={variant}>
      <Header>
        <Label>{title}</Label>
        <Feather name={iconByVariant[variant]} size={22} color={iconColor} />
      </Header>

      <Amount>{currencyFormatter.format(amount)}</Amount>
    </Container>
  )
}
