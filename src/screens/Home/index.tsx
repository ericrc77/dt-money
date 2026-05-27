import { useCallback } from 'react'
import { ScrollView } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { AppHeader } from '../../components/AppHeader'
import { EmptyState } from '../../components/EmptyState'
import { FeedbackMessage } from '../../components/FeedbackMessage'
import { LoadingState } from '../../components/LoadingState'
import { PrimaryButton } from '../../components/PrimaryButton'
import { SummaryCard } from '../../components/SummaryCard'
import { TransactionCard } from '../../components/TransactionCard'
import { useSummary } from '../../hooks/useSummary'
import { useTransactions } from '../../hooks/useTransactions'
import type { RootStackParamList } from '../../types/navigation'
import type { Transaction } from '../../types/transaction'
import {
  Actions,
  Container,
  Content,
  RecentHeader,
  RecentTitle,
  SummaryList,
} from './styles'

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList>

export function Home() {
  const navigation = useNavigation<HomeNavigationProp>()
  const { transactions, isLoading, isSyncing, errorMessage, fetchTransactions } =
    useTransactions()
  const summary = useSummary()
  const recentTransactions = transactions.slice(0, 4)

  useFocusEffect(
    useCallback(() => {
      fetchTransactions()
    }, [fetchTransactions]),
  )

  function handleOpenTransaction(transaction: Transaction) {
    navigation.navigate('TransactionDetails', { transactionId: transaction.id })
  }

  if (isLoading) {
    return <LoadingState label="Carregando carteira..." />
  }

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppHeader
          title="Dashboard"
          subtitle={isSyncing ? 'Sincronizando dados...' : 'Resumo da sua carteira'}
        />

        {errorMessage ? <FeedbackMessage message={errorMessage} /> : null}

        <SummaryList horizontal showsHorizontalScrollIndicator={false}>
          <SummaryCard title="Entradas" amount={summary.income} variant="income" />
          <SummaryCard title="Saidas" amount={summary.outcome} variant="outcome" />
          <SummaryCard title="Total" amount={summary.total} variant="total" />
        </SummaryList>

        <Content>
          <Actions>
            <PrimaryButton
              title="Nova transacao"
              icon="plus"
              onPress={() => navigation.navigate('CreateTransaction')}
            />
          </Actions>

          <RecentHeader>
            <RecentTitle>Recentes</RecentTitle>
          </RecentHeader>

          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onPress={handleOpenTransaction}
              />
            ))
          ) : (
            <EmptyState
              title="Nenhuma transacao"
              subtitle="Cadastre sua primeira entrada ou saida para visualizar o resumo."
            />
          )}
        </Content>
      </ScrollView>
    </Container>
  )
}
