import type { Transaction, TransactionFilters } from '../types/transaction'

export function sortTransactionsByDate(transactions: Transaction[]) {
  return [...transactions].sort(
    (current, next) =>
      new Date(next.date).getTime() - new Date(current.date).getTime(),
  )
}

export function filterTransactions(
  transactions: Transaction[],
  filters: TransactionFilters,
) {
  const query = filters.query?.trim().toLowerCase()
  const category = filters.category?.trim().toLowerCase()

  return transactions.filter((transaction) => {
    const matchesQuery = query
      ? transaction.description.toLowerCase().includes(query)
      : true

    const matchesCategory = category
      ? transaction.category.toLowerCase() === category
      : true

    const matchesType = filters.type ? transaction.type === filters.type : true

    return matchesQuery && matchesCategory && matchesType
  })
}

export function paginateTransactions(
  transactions: Transaction[],
  page = 1,
  limit = 10,
) {
  const start = (page - 1) * limit
  const end = start + limit

  return transactions.slice(start, end)
}

export function createTransactionId() {
  const randomPart = Math.random().toString(36).slice(2, 10)

  return `tx-${Date.now()}-${randomPart}`
}
