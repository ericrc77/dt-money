import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  buildTransaction,
  createTransactionOnApi,
  getTransactionsFromApi,
  removeTransactionFromApi,
  updateTransactionOnApi,
} from '../services/transactionsService'
import {
  getStoredTransactions,
  removeStoredTransaction,
  saveStoredTransactions,
  upsertStoredTransaction,
} from '../storage/transactionsStorage'
import type {
  CreateTransactionDTO,
  Transaction,
  TransactionFilters,
  UpdateTransactionDTO,
} from '../types/transaction'
import { filterTransactions, sortTransactionsByDate } from '../utils/transactions'

interface TransactionsContextData {
  transactions: Transaction[]
  isLoading: boolean
  isSyncing: boolean
  errorMessage: string | null
  categories: string[]
  fetchTransactions: (filters?: TransactionFilters) => Promise<void>
  createTransaction: (data: CreateTransactionDTO) => Promise<Transaction>
  updateTransaction: (data: UpdateTransactionDTO) => Promise<Transaction>
  removeTransaction: (id: string) => Promise<void>
  findTransactionById: (id: string) => Transaction | undefined
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextData)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const persistAndSetTransactions = useCallback(
    async (nextTransactions: Transaction[]) => {
      const sortedTransactions = sortTransactionsByDate(nextTransactions)

      setTransactions(sortedTransactions)
      await saveStoredTransactions(sortedTransactions)
    },
    [],
  )

  const fetchTransactions = useCallback(
    async (filters: TransactionFilters = {}) => {
      try {
        setErrorMessage(null)
        setIsSyncing(true)

        const apiTransactions = await getTransactionsFromApi(filters)
        const sortedTransactions = sortTransactionsByDate(apiTransactions)

        setTransactions(sortedTransactions)

        // Apenas a busca completa substitui o cache local; filtros nao devem apagar dados fora do resultado.
        if (!filters.query && !filters.category && !filters.type) {
          await saveStoredTransactions(sortedTransactions)
        }
      } catch {
        const storedTransactions = await getStoredTransactions()
        const filteredStoredTransactions = filterTransactions(
          storedTransactions,
          filters,
        )

        setTransactions(filteredStoredTransactions)
        setErrorMessage('API indisponivel. Exibindo dados salvos no aparelho.')
      } finally {
        setIsLoading(false)
        setIsSyncing(false)
      }
    },
    [],
  )

  const createTransaction = useCallback(
    async (data: CreateTransactionDTO) => {
      const optimisticTransaction = buildTransaction(data)

      try {
        setErrorMessage(null)
        const apiTransaction = await createTransactionOnApi(optimisticTransaction)
        const nextTransactions = [apiTransaction, ...transactions]

        await persistAndSetTransactions(nextTransactions)

        return apiTransaction
      } catch {
        const nextTransactions = await upsertStoredTransaction(
          optimisticTransaction,
        )

        setTransactions(nextTransactions)
        setErrorMessage(
          'Transacao salva localmente. Sincronize quando a API estiver disponivel.',
        )

        return optimisticTransaction
      }
    },
    [persistAndSetTransactions, transactions],
  )

  const updateTransaction = useCallback(
    async ({ id, ...data }: UpdateTransactionDTO) => {
      const currentTransaction = transactions.find(
        (transaction) => transaction.id === id,
      )

      if (!currentTransaction) {
        throw new Error('Transaction not found')
      }

      const optimisticTransaction: Transaction = {
        ...currentTransaction,
        ...data,
        updatedAt: new Date().toISOString(),
      }

      try {
        setErrorMessage(null)
        const apiTransaction = await updateTransactionOnApi({
          id,
          ...data,
        })
        const nextTransactions = transactions.map((transaction) =>
          transaction.id === id ? apiTransaction : transaction,
        )

        await persistAndSetTransactions(nextTransactions)

        return apiTransaction
      } catch {
        const nextTransactions = await upsertStoredTransaction(
          optimisticTransaction,
        )

        setTransactions(nextTransactions)
        setErrorMessage('Alteracao salva localmente.')

        return optimisticTransaction
      }
    },
    [persistAndSetTransactions, transactions],
  )

  const removeTransaction = useCallback(
    async (id: string) => {
      try {
        setErrorMessage(null)
        await removeTransactionFromApi(id)
      } catch {
        setErrorMessage('Remocao aplicada localmente.')
      } finally {
        const nextTransactions = await removeStoredTransaction(id)

        setTransactions(nextTransactions)
      }
    },
    [],
  )

  const findTransactionById = useCallback(
    (id: string) => {
      return transactions.find((transaction) => transaction.id === id)
    },
    [transactions],
  )

  const categories = useMemo(() => {
    return Array.from(
      new Set(transactions.map((transaction) => transaction.category)),
    ).sort((current, next) => current.localeCompare(next))
  }, [transactions])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        isLoading,
        isSyncing,
        errorMessage,
        categories,
        fetchTransactions,
        createTransaction,
        updateTransaction,
        removeTransaction,
        findTransactionById,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
