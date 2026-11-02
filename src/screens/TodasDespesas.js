import React from 'react';
import { useExpenses } from '../store/expenses-context';
import { DespesaSaida } from '../components/despesa/DespesaSaida';

export function TodasDespesas() {
  const { expenses } = useExpenses();

  return <DespesaSaida expenses={expenses} periodName="Total" />;
}