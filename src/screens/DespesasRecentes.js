import React from 'react';
import { useExpenses } from '../store/expenses-context';
import { DespesaSaida } from '../components/despesa/DespesaSaida';

export function DespesasRecentes() {
  const { expenses } = useExpenses();

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return new Date(expense.date) >= date7DaysAgo;
  });

  return <DespesaSaida expenses={recentExpenses} periodName="Últimos 7 Dias" />;
}