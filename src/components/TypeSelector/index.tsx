import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'

import { ButtonLabel, Container, TypeButton } from './styles'
import type { TransactionType } from '../../types/transaction'

interface TypeSelectorProps {
  value: TransactionType
  onChange: (value: TransactionType) => void
}

export function TypeSelector({ value, onChange }: TypeSelectorProps) {
  const { colors } = useTheme()

  return (
    <Container>
      <TypeButton
        $type="income"
        $isActive={value === 'income'}
        activeOpacity={0.78}
        onPress={() => onChange('income')}
      >
        <Feather name="arrow-up-circle" size={20} color={colors.green300} />
        <ButtonLabel>Entrada</ButtonLabel>
      </TypeButton>

      <TypeButton
        $type="outcome"
        $isActive={value === 'outcome'}
        activeOpacity={0.78}
        onPress={() => onChange('outcome')}
      >
        <Feather name="arrow-down-circle" size={20} color={colors.red300} />
        <ButtonLabel>Saida</ButtonLabel>
      </TypeButton>
    </Container>
  )
}
