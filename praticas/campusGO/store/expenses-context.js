import React, { createContext, useState, useContext } from 'react';

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: () => {},
});

export function ExpensesContextProvider({ children }) {
  const [expenses, setExpenses] = useState([
    { id: 'e1', description: 'Livro PDM', amount: 32.5, date: new Date() },
  ]);

  const addExpense = (expenseData) => {
    setExpenses((curExpenses) => [
      { id: Math.random().toString(), ...expenseData },
      ...curExpenses,
    ]);
  };

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpensesContext);
}