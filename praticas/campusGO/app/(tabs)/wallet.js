import React from 'react';
import { View, Text, FlatList, Button, Share, StyleSheet } from 'react-native';
import { useExpenses } from '../../store/expenses-context';

export default function WalletScreen() {
  const { expenses, addExpense } = useExpenses();

  const handleAddExpense = () => {
    addExpense({
      description: 'Lanche no Campus',
      amount: 15.0,
      date: new Date(),
    });
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Eu tenho ${expenses.length} despesa(s) registrada(s) no CampusGo!`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Carteira</Text>
      
      <View style={styles.buttonRow}>
        <Button title="Adicionar Despesa" onPress={handleAddExpense} />
        <Button title="Compartilhar" onPress={handleShare} color="#2e7d32" />
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemDesc}>{item.description}</Text>
            <Text style={styles.itemAmount}>R$ {item.amount.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  item: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#fff', borderRadius: 8, marginBottom: 10 },
  itemDesc: { fontSize: 16 },
  itemAmount: { fontSize: 16, fontWeight: 'bold', color: '#d32f2f' },
});