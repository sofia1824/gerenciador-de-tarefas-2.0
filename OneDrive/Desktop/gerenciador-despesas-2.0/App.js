import React from 'react';
import { Pressable, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from './src/constants/theme';
import { DespesasRecentes } from './src/screens/DespesasRecentes';
import { GerenciarDespesa } from './src/screens/GerenciarDespesa';
import { TodasDespesas } from './src/screens/TodasDespesas';
import { ExpensesContextProvider } from './src/store/expenses-context';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function DespesasTabs() {
  const scheme = useColorScheme();
  const theme = COLORS[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarStyle: { backgroundColor: theme.surface, borderTopColor: theme.border },
      }}
    >
      <Tabs.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{
          title: 'Todas',
          tabBarIcon: ({ color, size }) => <Ionicons name="receipt-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{
          title: 'Recentes',
          tabBarIcon: ({ color, size }) => <Ionicons name="time-outline" color={color} size={size} />,
        }}
      />
    </Tabs.Navigator>
  );
}

export default function App() {
  const scheme = useColorScheme();
  const theme = COLORS[scheme === 'dark' ? 'dark' : 'light'];
  const navigationTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ExpensesContextProvider>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
        <Stack.Navigator
          screenOptions={{
            contentStyle: { backgroundColor: theme.background },
            headerStyle: { backgroundColor: theme.surface },
            headerTintColor: theme.text,
          }}
        >
          <Stack.Screen
            name="Despesas"
            component={DespesasTabs}
            options={({ navigation }) => ({
              title: 'Minhas despesas',
              headerRight: () => (
                <Pressable
                  accessibilityLabel="Adicionar despesa"
                  onPress={() => navigation.navigate('GerenciarDespesa')}
                  hitSlop={10}
                >
                  <Ionicons name="add" size={28} color={theme.primary} />
                </Pressable>
              ),
            })}
          />
          <Stack.Screen
            name="GerenciarDespesa"
            component={GerenciarDespesa}
            options={{ title: 'Adicionar despesa' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesContextProvider>
  );
}
