import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation, useRoute } from '@react-navigation/native'
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import { z } from 'zod'

import { AppHeader } from '../../components/AppHeader'
import { CategorySelector } from '../../components/CategorySelector'
import { FormInput } from '../../components/FormInput'
import { PrimaryButton } from '../../components/PrimaryButton'
import { TypeSelector } from '../../components/TypeSelector'
import { useTransactions } from '../../hooks/useTransactions'
import type { RootStackParamList } from '../../types/navigation'
import type { TransactionFormData } from '../../types/transaction'
import {
  formatDateInput,
  parseBrazilianDate,
  parseCurrency,
} from '../../utils/formatters'
import { Container, Content, FormBlock } from './styles'

type CreateTransactionRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'CreateTransaction'
>['route']
type CreateTransactionNavigationProp =
  NativeStackNavigationProp<RootStackParamList>

const transactionFormSchema = z.object({
  description: z
    .string()
    .min(3, 'Informe uma descricao com pelo menos 3 caracteres.'),
  amount: z
    .string()
    .min(1, 'Informe o valor.')
    .refine((value) => parseCurrency(value) > 0, 'Informe um valor maior que zero.'),
  category: z.string().min(2, 'Selecione ou informe uma categoria.'),
  type: z.enum(['income', 'outcome']),
  date: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Use o formato dd/mm/aaaa.')
    .refine((value) => {
      const parsedDate = parseBrazilianDate(value)

      return !Number.isNaN(parsedDate.getTime())
    }, 'Informe uma data valida.'),
})

export function CreateTransaction() {
  const route = useRoute<CreateTransactionRouteProp>()
  const navigation = useNavigation<CreateTransactionNavigationProp>()
  const {
    categories,
    createTransaction,
    findTransactionById,
    updateTransaction,
  } = useTransactions()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const transactionId = route.params?.transactionId
  const transactionToEdit = transactionId
    ? findTransactionById(transactionId)
    : undefined

  const defaultValues = useMemo<TransactionFormData>(
    () => ({
      description: '',
      amount: '',
      category: 'Alimentacao',
      type: 'income',
      date: formatDateInput(new Date()),
    }),
    [],
  )

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues,
  })

  useEffect(() => {
    if (transactionToEdit) {
      reset({
        description: transactionToEdit.description,
        amount: String(transactionToEdit.amount).replace('.', ','),
        category: transactionToEdit.category,
        type: transactionToEdit.type,
        date: formatDateInput(new Date(transactionToEdit.date)),
      })
    }
  }, [reset, transactionToEdit])

  async function handleSaveTransaction(data: TransactionFormData) {
    try {
      setIsSubmitting(true)

      const payload = {
        description: data.description.trim(),
        amount: parseCurrency(data.amount),
        category: data.category.trim(),
        type: data.type,
        date: parseBrazilianDate(data.date).toISOString(),
      }

      if (transactionToEdit) {
        await updateTransaction({
          id: transactionToEdit.id,
          ...payload,
        })
      } else {
        await createTransaction(payload)
      }

      navigation.goBack()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <AppHeader
          title={transactionToEdit ? 'Editar' : 'Cadastro'}
          subtitle="Registre uma entrada ou saida financeira."
          action={
            <PrimaryButton
              title="Voltar"
              icon="arrow-left"
              variant="secondary"
              onPress={() => navigation.goBack()}
            />
          }
        />

        <Content
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <FormBlock>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Descricao"
                  placeholder="Ex: Salario, mercado, consultoria"
                  value={value}
                  error={errors.description?.message}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="amount"
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Valor"
                  placeholder="0,00"
                  keyboardType="decimal-pad"
                  value={value}
                  error={errors.amount?.message}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="date"
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Data"
                  placeholder="dd/mm/aaaa"
                  keyboardType="numeric"
                  maxLength={10}
                  value={value}
                  error={errors.date?.message}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, value } }) => (
                <TypeSelector value={value} onChange={onChange} />
              )}
            />

            <Controller
              control={control}
              name="category"
              render={({ field: { onChange, value } }) => (
                <CategorySelector
                  value={value}
                  categories={categories}
                  onChange={onChange}
                />
              )}
            />

            <PrimaryButton
              title={transactionToEdit ? 'Salvar alteracoes' : 'Cadastrar'}
              icon="check"
              isLoading={isSubmitting}
              onPress={handleSubmit(handleSaveTransaction)}
            />
          </FormBlock>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  )
}
