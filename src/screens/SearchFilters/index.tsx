import { useCallback, useMemo, useState } from 'react'
import { FlatList } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { AppHeader } from '../../components/AppHeader'
import { EmptyState } from '../../components/EmptyState'
import { FormInput } from '../../components/FormInput'
import { PrimaryButton } from '../../components/PrimaryButton'
import { TransactionCard } from '../../components/TransactionCard'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { useTransactions } from '../../hooks/useTransactions'
import type { RootStackParamList } from '../../types/navigation'
import type { Transaction, TransactionType } from '../../types/transaction'
import { DEFAULT_CATEGORIES } from '../../utils/categories'
import { filterTransactions } from '../../utils/transactions'
import {
  Chip,
  ChipText,
  Container,
  FilterBlock,
  FilterLabel,
  HorizontalFilters,
  ListContent,
} from './styles'

type SearchNavigationProp = NativeStackNavigationProp<RootStackParamList>
type TypeFilter = TransactionType | 'all'

export function SearchFilters() {
  const navigation = useNavigation<SearchNavigationProp>()
  const { transactions, categories, fetchTransactions } = useTransactions()
  const [query, setQuery] = useState('')
  const [selectedType, setSelectedType] = useState<TypeFilter>('all')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const debouncedQuery = useDebouncedValue(query)

  useFocusEffect(
    useCallback(() => {
      fetchTransactions()
    }, [fetchTransactions]),
  )

  const categoryOptions = useMemo(() => {
    return ['Todas', ...Array.from(new Set([...DEFAULT_CATEGORIES, ...categories]))]
  }, [categories])

  const filteredTransactions = useMemo(() => {
    return filterTransactions(transactions, {
      query: debouncedQuery,
      category: selectedCategory === 'Todas' ? undefined : selectedCategory,
      type: selectedType === 'all' ? undefined : selectedType,
    })
  }, [debouncedQuery, selectedCategory, selectedType, transactions])

  function handleOpenTransaction(transaction: Transaction) {
    navigation.navigate('TransactionDetails', { transactionId: transaction.id })
  }

  function handleClearFilters() {
    setQuery('')
    setSelectedType('all')
    setSelectedCategory('Todas')
  }

  return (
    <Container>
      <AppHeader
        title="Busca"
        subtitle={`${filteredTransactions.length} resultados filtrados`}
      />

      <FilterBlock>
        <FormInput
          label="Pesquisar por descricao"
          placeholder="Ex: salario, mercado, aluguel"
          value={query}
          onChangeText={setQuery}
        />

        <FilterLabel>Tipo</FilterLabel>
        <HorizontalFilters horizontal showsHorizontalScrollIndicator={false}>
          {[
            { label: 'Todos', value: 'all' },
            { label: 'Entradas', value: 'income' },
            { label: 'Saidas', value: 'outcome' },
          ].map((item) => (
            <Chip
              key={item.value}
              $isActive={selectedType === item.value}
              activeOpacity={0.75}
              onPress={() => setSelectedType(item.value as TypeFilter)}
            >
              <ChipText $isActive={selectedType === item.value}>
                {item.label}
              </ChipText>
            </Chip>
          ))}
        </HorizontalFilters>

        <FilterLabel>Categoria</FilterLabel>
        <HorizontalFilters horizontal showsHorizontalScrollIndicator={false}>
          {categoryOptions.map((category) => (
            <Chip
              key={category}
              $isActive={selectedCategory === category}
              activeOpacity={0.75}
              onPress={() => setSelectedCategory(category)}
            >
              <ChipText $isActive={selectedCategory === category}>
                {category}
              </ChipText>
            </Chip>
          ))}
        </HorizontalFilters>

        <PrimaryButton
          title="Limpar filtros"
          icon="x"
          variant="secondary"
          onPress={handleClearFilters}
        />
      </FilterBlock>

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionCard transaction={item} onPress={handleOpenTransaction} />
        )}
        contentContainerStyle={ListContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={7}
        removeClippedSubviews
        ListEmptyComponent={
          <EmptyState
            title="Nada encontrado"
            subtitle="Ajuste os filtros ou cadastre novas transacoes."
          />
        }
      />
    </Container>
  )
}
