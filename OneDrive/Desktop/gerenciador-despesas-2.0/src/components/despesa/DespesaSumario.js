import React from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { COLORS } from '../../constants/theme';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function DespesaSumario({ expenses, periodName }) {
  const scheme = useColorScheme();
  const theme = COLORS[scheme === 'dark' ? 'dark' : 'light'];
  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.total}>{currencyFormatter.format(total)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  period: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  total: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
