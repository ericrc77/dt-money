import { api } from './api'
import type {
  CreateTransactionDTO,
  Transaction,
  TransactionFilters,
  UpdateTransactionDTO,
} from '../types/transaction'

export async function getTransactionsFromApi(filters: TransactionFilters = {}) {
  const response = await api.get<Transaction[]>('/transactions', {
    params: {
      _sort: 'date',
      _order: 'desc',
      _page: filters.page,
      _limit: filters.limit,
      q: filters.query,
      category: filters.category,
      type: filters.type,
    },
  })

  return response.data
}

export async function createTransactionOnApi(transaction: Transaction) {
  const response = await api.post<Transaction>('/transactions', transaction)

  return response.data
}

export async function updateTransactionOnApi({
  id,
  ...data
}: UpdateTransactionDTO) {
  const response = await api.patch<Transaction>(`/transactions/${id}`, {
    ...data,
    updatedAt: new Date().toISOString(),
  })

  return response.data
}

export async function removeTransactionFromApi(id: string) {
  await api.delete(`/transactions/${id}`)
}

export function buildTransaction(data: CreateTransactionDTO): Transaction {
  const now = new Date().toISOString()

  return {
    ...data,
    id: `tx-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    createdAt: now,
    updatedAt: now,
  }
}
