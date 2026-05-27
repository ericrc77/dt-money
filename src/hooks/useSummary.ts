import { useMemo } from 'react'

import { useTransactions } from './useTransactions'

export function useSummary() {
  const { transactions } = useTransactions()

  return useMemo(() => {
    return transactions.reduce(
      (summary, transaction) => {
        if (transaction.type === 'income') {
          summary.income += transaction.amount
          summary.total += transaction.amount
        } else {
          summary.outcome += transaction.amount
          summary.total -= transaction.amount
        }

        return summary
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }, [transactions])
}
