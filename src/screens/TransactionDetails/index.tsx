import { Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'

import { AppHeader } from '../../components/AppHeader'
import { EmptyState } from '../../components/EmptyState'
import { PrimaryButton } from '../../components/PrimaryButton'
import { useTransactions } from '../../hooks/useTransactions'
import type { RootStackParamList } from '../../types/navigation'
import { currencyFormatter, formatDate } from '../../utils/formatters'
import {
  ActionRow,
  Amount,
  Container,
  Content,
  DetailCard,
  DetailLabel,
  DetailRow,
  DetailValue,
  HeroCard,
  HeroTitle,
} from './styles'

type TransactionDetailsRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'TransactionDetails'
>['route']
type TransactionDetailsNavigationProp =
  NativeStackNavigationProp<RootStackParamList>

export function TransactionDetails() {
  const route = useRoute<TransactionDetailsRouteProp>()
  const navigation = useNavigation<TransactionDetailsNavigationProp>()
  const { findTransactionById, removeTransaction } = useTransactions()
  const transaction = findTransactionById(route.params.transactionId)

  async function handleRemoveTransaction() {
    Alert.alert(
      'Remover transacao',
      'Esta acao remove o registro do app e da API fake quando ela estiver disponivel.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            await removeTransaction(route.params.transactionId)
            navigation.goBack()
          },
        },
      ],
    )
  }

  if (!transaction) {
    return (
      <Container>
        <AppHeader
          title="Detalhes"
          action={
            <PrimaryButton
              title="Voltar"
              icon="arrow-left"
              variant="secondary"
              onPress={() => navigation.goBack()}
            />
          }
        />
        <EmptyState
          title="Registro nao encontrado"
          subtitle="A transacao pode ter sido removida ou ainda nao foi sincronizada."
        />
      </Container>
    )
  }

  const signedAmount =
    transaction.type === 'outcome' ? transaction.amount * -1 : transaction.amount

  return (
    <Container>
      <AppHeader
        title="Detalhes"
        subtitle="Analise e gerencie esta movimentacao."
        action={
          <PrimaryButton
            title="Voltar"
            icon="arrow-left"
            variant="secondary"
            onPress={() => navigation.goBack()}
          />
        }
      />

      <Content>
        <HeroCard>
          <HeroTitle>{transaction.description}</HeroTitle>
          <Amount $type={transaction.type}>
            {currencyFormatter.format(signedAmount)}
          </Amount>
        </HeroCard>

        <DetailCard>
          <DetailRow>
            <DetailLabel>Tipo</DetailLabel>
            <DetailValue>
              {transaction.type === 'income' ? 'Entrada' : 'Saida'}
            </DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Categoria</DetailLabel>
            <DetailValue>{transaction.category}</DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Data</DetailLabel>
            <DetailValue>{formatDate(transaction.date)}</DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Criada em</DetailLabel>
            <DetailValue>{formatDate(transaction.createdAt)}</DetailValue>
          </DetailRow>
        </DetailCard>

        <ActionRow>
          <PrimaryButton
            title="Editar"
            icon="edit-2"
            variant="secondary"
            onPress={() =>
              navigation.navigate('CreateTransaction', {
                transactionId: transaction.id,
              })
            }
          />
          <PrimaryButton
            title="Remover"
            icon="trash-2"
            variant="danger"
            onPress={handleRemoveTransaction}
          />
        </ActionRow>
      </Content>
    </Container>
  )
}
