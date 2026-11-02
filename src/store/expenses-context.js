import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EXPENSES_STORAGE_KEY = '@expenses';

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: (expenseData) => {},
  updateExpense: (id, expenseData) => {},
  deleteExpense: (id) => {},
  clearExpenses: () => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload.data } : item
      );
    case 'DELETE':
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadExpenses() {
      try {
        const storedExpenses = await AsyncStorage.getItem(EXPENSES_STORAGE_KEY);
        if (storedExpenses) {
          const parsed = JSON.parse(storedExpenses).map((item) => ({
            ...item,
            date: new Date(item.date),
          }));
          dispatch({ type: 'SET', payload: parsed });
        }
      } catch (error) {
        console.error('Erro ao carregar despesas:', error);
      } finally {
        setIsLoaded(true);
      }
    }
    loadExpenses();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    async function saveExpenses() {
      try {
        await AsyncStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(expensesState));
      } catch (error) {
        console.error('Erro ao salvar despesas:', error);
      }
    }
    saveExpenses();
  }, [expensesState, isLoaded]);

  function addExpense(expenseData) {
    const id = new Date().toISOString() + Math.random().toString();
    const newExpense = { ...expenseData, id };
    dispatch({ type: 'ADD', payload: newExpense });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function clearExpenses() {
    dispatch({ type: 'SET', payload: [] });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    updateExpense,
    deleteExpense,
    clearExpenses,
  };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses deve ser utilizado dentro de um ExpensesContextProvider');
  }
  return context;
}