import React from 'react';
import { Pressable, View, Text, StyleSheet, Platform, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';

export function DespesaItem({ id, description, amount, date, category }) {
  const navigation = useNavigation();
  const scheme = useColorScheme();
  const theme = COLORS[scheme === 'dark' ? 'dark' : 'light'];

  const formattedDate = new Date(date).toLocaleDateString('pt-BR');

  function handlePress() {
    navigation.navigate('GerenciarDespesa', { expenseId: id });
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.cardBackground, borderColor: theme.border },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.infoContainer}>
        <Text style={[styles.description, { color: theme.text }]}>{description}</Text>
        <View style={styles.metaRow}>
          <Text style={[styles.categoryBadge, { backgroundColor: theme.chipBackground, color: theme.text }]}>
            {category || 'Geral'}
          </Text>
          <Text style={[styles.dateText, { color: theme.textSecondary }]}>{formattedDate}</Text>
        </View>
      </View>
      <View style={[styles.amountContainer, { backgroundColor: theme.primary }]}>
        <Text style={styles.amountText}>R$ {Number(amount).toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    marginVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  pressed: {
    opacity: 0.75,
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryBadge: {
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    overflow: 'hidden',
    fontWeight: '500',
  },
  dateText: {
    fontSize: 12,
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 90,
    alignItems: 'center',
  },
  amountText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});