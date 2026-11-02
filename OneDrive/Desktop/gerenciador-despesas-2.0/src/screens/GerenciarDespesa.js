import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
  useColorScheme,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../store/expenses-context';
import { COLORS } from '../constants/theme';

export function GerenciarDespesa({ route, navigation }) {
  const scheme = useColorScheme();
  const theme = COLORS[scheme === 'dark' ? 'dark' : 'light'];

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const selectedExpense = expenses.find((exp) => exp.id === editedExpenseId);

  const [amount, setAmount] = useState(selectedExpense ? selectedExpense.amount.toString() : '');
  const [description, setDescription] = useState(selectedExpense ? selectedExpense.description : '');
  const [category, setCategory] = useState(selectedExpense ? selectedExpense.category || '' : '');
  const [date, setDate] = useState(selectedExpense ? new Date(selectedExpense.date) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar Despesa' : 'Adicionar Despesa',
    });
  }, [navigation, isEditing]);

  function handleDelete() {
    Alert.alert('Excluir Despesa', 'Tem certeza que deseja excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteExpense(editedExpenseId);
          navigation.goBack();
        },
      },
    ]);
  }

  function handleCancel() {
    navigation.goBack();
  }

  function handleConfirm() {
    const parsedAmount = parseFloat(amount.replace(',', '.'));
    const isAmountValid = !isNaN(parsedAmount) && parsedAmount > 0;
    const isDescriptionValid = description.trim().length > 0;

    if (!isAmountValid || !isDescriptionValid) {
      Alert.alert('Dados inválidos', 'Por favor, verifique os campos preenchidos.');
      return;
    }

    const expenseData = {
      amount: parsedAmount,
      description: description.trim(),
      category: category.trim() || 'Geral',
      date: date.toISOString(),
    };

    if (isEditing) {
      updateExpense(editedExpenseId, expenseData);
    } else {
      addExpense(expenseData);
    }

    navigation.goBack();
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.form}>
        <Text style={[styles.label, { color: theme.text }]}>Valor (R$)</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.cardBackground, color: theme.text, borderColor: theme.border }]}
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
          placeholder="0,00"
          placeholderTextColor={theme.textSecondary}
        />

        <Text style={[styles.label, { color: theme.text }]}>Descrição</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.cardBackground, color: theme.text, borderColor: theme.border }]}
          value={description}
          onChangeText={setDescription}
          placeholder="Ex: Supermercado"
          placeholderTextColor={theme.textSecondary}
        />

        <Text style={[styles.label, { color: theme.text }]}>Categoria</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.cardBackground, color: theme.text, borderColor: theme.border }]}
          value={category}
          onChangeText={setCategory}
          placeholder="Ex: Alimentação, Lazer, Transporte"
          placeholderTextColor={theme.textSecondary}
        />

        <Text style={[styles.label, { color: theme.text }]}>Data</Text>
        <Pressable
          onPress={() => setShowDatePicker(true)}
          style={[styles.input, styles.dateInput, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
        >
          <Text style={{ color: theme.text }}>{date.toLocaleDateString('pt-BR')}</Text>
          <Ionicons name="calendar-outline" size={20} color={theme.textSecondary} />
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        <View style={styles.buttonsContainer}>
          <Pressable
            style={[styles.button, styles.cancelButton, { borderColor: theme.border }]}
            onPress={handleCancel}
          >
            <Text style={[styles.buttonText, { color: theme.text }]}>Cancelar</Text>
          </Pressable>

          <Pressable
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={handleConfirm}
          >
            <Text style={[styles.buttonText, { color: '#ffffff' }]}>
              {isEditing ? 'Atualizar' : 'Adicionar'}
            </Text>
          </Pressable>
        </View>

        {isEditing && (
          <View style={styles.deleteContainer}>
            <Pressable onPress={handleDelete} style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={28} color="#e53935" />
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteContainer: {
    marginTop: 32,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    alignItems: 'center',
  },
  deleteButton: {
    padding: 8,
  },
});