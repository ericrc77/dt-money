export const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

export function formatDate(value: string) {
  return dateFormatter.format(new Date(value))
}

export function parseCurrency(value: string) {
  const normalizedValue = value
    .replace(/\s/g, '')
    .replace(/\./g, '')
    .replace(',', '.')
    .replace(/[^\d.-]/g, '')

  return Number(normalizedValue)
}

export function parseBrazilianDate(value: string) {
  const [day, month, year] = value.split('/').map(Number)

  return new Date(year, month - 1, day, 12)
}

export function formatDateInput(value: Date) {
  return dateFormatter.format(value)
}
