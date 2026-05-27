# DT Money Mobile

Aplicativo financeiro mobile inspirado no DT Money da Rocketseat, desenvolvido com React Native, Expo e TypeScript. A proposta e simular uma entrega profissional de curso avancado: arquitetura organizada, navegacao entre telas, validacao de formulario, estado global, persistencia local e consumo de uma API fake com JSON Server.

## Tecnologias

- React Native com Expo
- TypeScript
- React Navigation com Stack e Bottom Tabs
- Styled Components
- Context API
- AsyncStorage
- Axios
- React Hook Form
- Zod
- FlatList
- JSON Server

## Funcionalidades

- Splash Screen de abertura.
- Dashboard com total de entradas, saidas e saldo.
- Cadastro de entradas e saidas com descricao, valor, categoria, tipo e data.
- Validacao com React Hook Form e Zod.
- Lista de transacoes com FlatList e paginacao incremental.
- Detalhes da transacao.
- Edicao e remocao de transacoes.
- Busca por descricao.
- Filtros por categoria e tipo.
- Persistencia local com AsyncStorage.
- Consumo de API fake com GET, POST, PATCH, DELETE, query string e paginacao.
- Fallback offline: se a API estiver indisponivel, o app continua usando os dados locais.

## Arquitetura

```txt
src/
  components/        Componentes reutilizaveis de UI
  contexts/          Estado global de transacoes
  hooks/             Hooks customizados
  routes/            Stack Navigation e Bottom Tabs
  screens/           Telas do aplicativo
  services/          Axios e servicos da API
  storage/           Persistencia com AsyncStorage
  styles/            Tema visual do app
  types/             Tipagens globais
  utils/             Formatadores, filtros e helpers
```

## Como instalar

```bash
npm install
```

## Como rodar o app

```bash
npm run start
```

Depois, escolha uma das opcoes do Expo:

- `a` para Android Emulator
- `i` para iOS Simulator
- ler o QR Code com Expo Go

## Como iniciar a API fake

```bash
npm run server
```

O JSON Server roda em:

```txt
http://localhost:3333/transactions
```

Para Android Emulator, o app usa por padrao:

```txt
http://10.0.2.2:3333
```

Se voce for testar em um celular fisico com Expo Go, crie um arquivo `.env` baseado no `.env.example` e troque o host pelo IP local da sua maquina:

```txt
EXPO_PUBLIC_API_URL=http://SEU_IP_LOCAL:3333
```

## Scripts

```bash
npm run start      # inicia o Expo
npm run android    # abre no Android
npm run ios        # abre no iOS
npm run web        # abre a versao web do Expo
npm run server     # inicia o JSON Server
npm run typecheck  # verifica TypeScript
npm run lint       # executa ESLint
```

## Fluxo principal

1. O app abre na Splash Screen.
2. O Dashboard carrega transacoes da API fake.
3. Se a API falhar, os dados persistidos no AsyncStorage sao exibidos.
4. O usuario cadastra uma transacao pela tela de cadastro.
5. A transacao e enviada para a API e tambem persistida localmente.
6. A lista e o resumo sao atualizados automaticamente pelo contexto global.
7. A tela de busca filtra os registros por descricao, tipo e categoria.

## Prints esperados

- Splash Screen com marca DT Money.
- Dashboard com tres cards: entradas, saidas e total.
- Lista com cards de transacoes e scroll infinito.
- Tela de cadastro com validacao de campos.
- Tela de detalhes com dados da transacao, editar e remover.
- Tela de busca com filtros por tipo e categoria.

## Observacoes de implementacao

- `TransactionsContext` concentra o gerenciamento do estado financeiro.
- `transactionsService` isola as chamadas HTTP com Axios.
- `transactionsStorage` isola a persistencia local com AsyncStorage.
- `useSummary` memoiza os calculos financeiros.
- `TransactionCard` usa `memo` para reduzir renders na FlatList.
- A API fake continua importante, mas o app nao fica inutilizavel quando ela estiver desligada.
