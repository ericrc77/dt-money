import type { NavigatorScreenParams } from '@react-navigation/native'

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<BottomTabParamList> | undefined
  CreateTransaction: { transactionId?: string } | undefined
  TransactionDetails: { transactionId: string }
}

export type BottomTabParamList = {
  Dashboard: undefined
  Transactions: undefined
  Search: undefined
}
