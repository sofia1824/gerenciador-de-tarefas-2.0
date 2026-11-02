import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DespesaLista } from './DespesaLista';
import { DespesaSumario } from './DespesaSumario';

export function DespesaSaida({ expenses, periodName }) {
  return (
    <View style={styles.container}>
      <DespesaSumario expenses={expenses} periodName={periodName} />
      <DespesaLista expenses={expenses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
