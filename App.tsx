import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ThemeProvider } from 'styled-components/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { TransactionsProvider } from './src/contexts/TransactionsContext'
import { Routes } from './src/routes'
import { SplashScreen } from './src/screens/SplashScreen'
import { theme } from './src/styles/theme'

export default function App() {
  const [isBooting, setIsBooting] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setIsBooting(false), 1200)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <TransactionsProvider>
          <StatusBar style="light" translucent />
          {isBooting ? <SplashScreen /> : <Routes />}
        </TransactionsProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
