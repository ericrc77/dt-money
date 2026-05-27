import { ReactNode } from 'react'

import { Container, Eyebrow, Subtitle, Title, TitleGroup } from './styles'

interface AppHeaderProps {
  title: string
  subtitle?: string
  action?: ReactNode
}

export function AppHeader({ title, subtitle, action }: AppHeaderProps) {
  return (
    <Container>
      <TitleGroup>
        <Eyebrow>DT Money</Eyebrow>
        <Title>{title}</Title>
        {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
      </TitleGroup>

      {action}
    </Container>
  )
}
