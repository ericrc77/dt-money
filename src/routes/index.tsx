import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'

import { CreateTransaction } from '../screens/CreateTransaction'
import { Home } from '../screens/Home'
import { SearchFilters } from '../screens/SearchFilters'
import { TransactionDetails } from '../screens/TransactionDetails'
import { TransactionsList } from '../screens/TransactionsList'
import type {
  BottomTabParamList,
  RootStackParamList,
} from '../types/navigation'

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<BottomTabParamList>()

function BottomTabs() {
  const { colors } = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.green300,
        tabBarInactiveTintColor: colors.gray400,
        tabBarStyle: {
          backgroundColor: colors.gray900,
          borderTopColor: colors.gray700,
          height: 72,
          paddingBottom: 12,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Home}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Transactions"
        component={TransactionsList}
        options={{
          tabBarLabel: 'Transacoes',
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchFilters}
        options={{
          tabBarLabel: 'Busca',
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export function Routes() {
  const { colors } = useTheme()

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.gray800,
          },
        }}
      >
        <Stack.Screen name="MainTabs" component={BottomTabs} />
        <Stack.Screen name="CreateTransaction" component={CreateTransaction} />
        <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
