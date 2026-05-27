import AsyncStorage from '@react-native-async-storage/async-storage'

import type { Transaction, TransactionFilters } from '../types/transaction'
import {
  filterTransactions,
  paginateTransactions,
  sortTransactionsByDate,
} from '../utils/transactions'

const TRANSACTIONS_STORAGE_KEY = '@dt-money-mobile:transactions'

export async function getStoredTransactions(filters: TransactionFilters = {}) {
  const storage = await AsyncStorage.getItem(TRANSACTIONS_STORAGE_KEY)
  const transactions = storage ? (JSON.parse(storage) as Transaction[]) : []
  const filteredTransactions = filterTransactions(
    sortTransactionsByDate(transactions),
    filters,
  )

  if (filters.page || filters.limit) {
    return paginateTransactions(
      filteredTransactions,
      filters.page,
      filters.limit,
    )
  }

  return filteredTransactions
}

export async function saveStoredTransactions(transactions: Transaction[]) {
  await AsyncStorage.setItem(
    TRANSACTIONS_STORAGE_KEY,
    JSON.stringify(sortTransactionsByDate(transactions)),
  )
}

export async function upsertStoredTransaction(transaction: Transaction) {
  const transactions = await getStoredTransactions()
  const transactionIndex = transactions.findIndex(
    (item) => item.id === transaction.id,
  )

  if (transactionIndex >= 0) {
    transactions[transactionIndex] = transaction
  } else {
    transactions.unshift(transaction)
  }

  await saveStoredTransactions(transactions)

  return sortTransactionsByDate(transactions)
}

export async function removeStoredTransaction(id: string) {
  const transactions = await getStoredTransactions()
  const nextTransactions = transactions.filter(
    (transaction) => transaction.id !== id,
  )

  await saveStoredTransactions(nextTransactions)

  return nextTransactions
}
