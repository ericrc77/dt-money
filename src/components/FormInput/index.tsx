import { TextInputProps } from 'react-native'

import { Container, ErrorText, Input, Label } from './styles'

interface FormInputProps extends TextInputProps {
  label: string
  error?: string
}

export function FormInput({ label, error, ...props }: FormInputProps) {
  return (
    <Container>
      <Label>{label}</Label>
      <Input placeholderTextColor="#7c7c8a" {...props} />
      {error ? <ErrorText>{error}</ErrorText> : null}
    </Container>
  )
}
