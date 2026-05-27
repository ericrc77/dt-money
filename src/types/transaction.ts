export type TransactionType = 'income' | 'outcome'

export interface Transaction {
  id: string
  description: string
  amount: number
  category: string
  type: TransactionType
  date: string
  createdAt: string
  updatedAt?: string
}

export interface TransactionFormData {
  description: string
  amount: string
  category: string
  type: TransactionType
  date: string
}

export interface CreateTransactionDTO {
  description: string
  amount: number
  category: string
  type: TransactionType
  date: string
}

export interface UpdateTransactionDTO extends Partial<CreateTransactionDTO> {
  id: string
}

export interface TransactionFilters {
  query?: string
  category?: string
  type?: TransactionType
  page?: number
  limit?: number
}
