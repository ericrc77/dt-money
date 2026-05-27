import { useCallback, useMemo, useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { AppHeader } from '../../components/AppHeader'
import { EmptyState } from '../../components/EmptyState'
import { FeedbackMessage } from '../../components/FeedbackMessage'
import { LoadingState } from '../../components/LoadingState'
import { PrimaryButton } from '../../components/PrimaryButton'
import { TransactionCard } from '../../components/TransactionCard'
import { useTransactions } from '../../hooks/useTransactions'
import type { RootStackParamList } from '../../types/navigation'
import type { Transaction } from '../../types/transaction'
import { Container, FooterLoader, ListContent } from './styles'

const PAGE_SIZE = 8

type TransactionsNavigationProp = NativeStackNavigationProp<RootStackParamList>

export function TransactionsList() {
  const navigation = useNavigation<TransactionsNavigationProp>()
  const { transactions, isLoading, isSyncing, errorMessage, fetchTransactions } =
    useTransactions()
  const [page, setPage] = useState(1)

  useFocusEffect(
    useCallback(() => {
      fetchTransactions()
      setPage(1)
    }, [fetchTransactions]),
  )

  const visibleTransactions = useMemo(() => {
    return transactions.slice(0, page * PAGE_SIZE)
  }, [page, transactions])

  const hasMoreTransactions = visibleTransactions.length < transactions.length

  const handleLoadMore = useCallback(() => {
    if (hasMoreTransactions) {
      setPage((currentPage) => currentPage + 1)
    }
  }, [hasMoreTransactions])

  const handleOpenTransaction = useCallback(
    (transaction: Transaction) => {
      navigation.navigate('TransactionDetails', {
        transactionId: transaction.id,
      })
    },
    [navigation],
  )

  if (isLoading) {
    return <LoadingState label="Carregando transacoes..." />
  }

  return (
    <Container>
      <AppHeader
        title="Transacoes"
        subtitle={`${transactions.length} registros encontrados`}
        action={
          <PrimaryButton
            title="Nova"
            icon="plus"
            onPress={() => navigation.navigate('CreateTransaction')}
          />
        }
      />

      {errorMessage ? <FeedbackMessage message={errorMessage} /> : null}

      <FlatList
        data={visibleTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionCard transaction={item} onPress={handleOpenTransaction} />
        )}
        contentContainerStyle={ListContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isSyncing}
            onRefresh={() => fetchTransactions()}
            tintColor="#00b37e"
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={7}
        removeClippedSubviews
        ListFooterComponent={
          hasMoreTransactions ? (
            <FooterLoader>Carregando mais transacoes...</FooterLoader>
          ) : null
        }
        ListEmptyComponent={
          <EmptyState
            title="Lista vazia"
            subtitle="As transacoes cadastradas aparecerao aqui."
          />
        }
      />
    </Container>
  )
}
