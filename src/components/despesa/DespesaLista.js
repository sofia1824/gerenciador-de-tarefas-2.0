import React from 'react';
import { FlatList, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import { DespesaItem } from './DespesaItem';

export function DespesaLista({ expenses }) {
  const scheme = useColorScheme();
  const theme = COLORS[scheme === 'dark' ? 'dark' : 'light'];
  const sortedExpenses = [...expenses].sort(
    (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
  );

  return (
    <FlatList
      data={sortedExpenses}
      keyExtractor={(expense) => expense.id}
      renderItem={({ item }) => <DespesaItem {...item} />}
      contentContainerStyle={styles.list}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            Nenhuma despesa neste período.
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    minHeight: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
